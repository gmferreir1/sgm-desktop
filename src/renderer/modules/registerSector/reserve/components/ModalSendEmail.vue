<template>
  <div>
    <div id="modalSendEmail" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl">
        <div class="modal-content roundbox boxshadow">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="ASSISTENTE PARA ENVIO DE EMAIL"/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important">
            <div class="row">
              <div class="col-md-12">
                <!-- step -->
                <el-steps :active="active" finish-status="success">
                  <el-step title="Informe o tipo de email"></el-step>
                  <el-step title="Informe os dados do cliente"></el-step>
                  <el-step title="Dados do email"></el-step>
                </el-steps>
                <!-- / step -->
              </div>
            </div>

            <!-- step 1 -->
            <div class="row" v-if="active === 0" style="margin-top: 10px;">
              <div class="col-md-12">
                <select class="form-control input-sm" v-model="form.type_email">
                  <option value>Selecione</option>
                  <option :value="list.value" v-for="list in select.type_emails">{{ list.name }}</option>
                </select>
              </div>
            </div>
            <!-- / step 1 -->

            <!-- step 2 -->
            <div class="row" v-if="active === 1" style="margin-top: 10px;">
              <div class="col-md-2">
                <label>Código do Cliente</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.client_code"
                  @keypress.enter="getClientData"
                >
                <div class="error">{{ validation.firstError('form.client_code') }}</div>
              </div>
              <div class="col-md-1" style="width: 30px; padding-left: 0px;; margin-top: 25px;">
                <div class="loader" v-if="loading_client_data"></div>
                <a href="#" @click.prevent="getClientData" v-if="!loading_client_data">
                  <img :src="icons.search">
                </a>
              </div>
              <div class="col-md-4">
                <label>Nome do Cliente</label>
                <input type="text" class="form-control input-sm" v-model="form.client_name">
                <div class="error">{{ validation.firstError('form.client_name') }}</div>
              </div>
              <div class="col-md-4">
                <label>Email do Cliente</label>
                <input type="text" class="form-control input-sm" v-model="form.client_email">
                <div class="error">{{ validation.firstError('form.client_email') }}</div>
              </div>
            </div>
            <!-- / step 2 -->

            <!-- step 3 -->
            <div class="row" v-show="active === 2" style="margin-top: 10px;">
              <div class="col-md-12">
                <editor
                  @textEditor="text => form.text_email = text"
                  v-show="form.type_email !== 'welcome_tenant' "
                />
                <img :src="images.welcome" v-show="form.type_email === 'welcome_tenant'">
              </div>
            </div>
            <!-- / step 3 -->

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <div class="loader pull-left" v-if="loading_text_data"></div>

                <button
                  class="button btn btn-sm btn-default"
                  @click="--active"
                  v-if="active > 0 && !loading_text_data"
                >Voltar</button>
                <button
                  class="button btn btn-sm btn-primary"
                  @click="next"
                  v-if="active === 0"
                  :disabled="!form.type_email"
                >Iniciar o processo</button>
                <button
                  class="button btn btn-sm btn-primary"
                  @click="validateForm"
                  v-if="active === 1 && !loading_text_data"
                >Próximo passo</button>
                <button
                  class="button btn btn-sm btn-danger"
                  :disabled="searchStringNotPermited"
                  v-if="active === 2 && !loading_text_data"
                  @click="sendEmail"
                >{{ searchStringNotPermited ? "Remova os @ para continuar" : "Finalizar/Enviar" }}</button>
              </div>
            </div>
          </div>

          <modal-footer>
            <button
              class="button btn btn-sm btn-default"
              @click="closeModal"
              v-if="!loading"
            >Fechar Janela</button>
          </modal-footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalHeader from "@/components/ModalHeader";
import ModalFooter from "@/components/ModalFooter";
import Editor from "@/components/Editor";

import rulesValidator from "../mixins/rules-validator-send-email";

export default {
  name: "ModalSendEmail",
  props: ["dataModal"],
  mixins: [rulesValidator],
  components: {
    ModalHeader,
    ModalFooter,
    Editor
  },
  data() {
    return {
      loading_client_data: false,
      loading_text_data: false,
      loading: false,
      active: 0,
      icons: {
        check: require("@/assets/icons/check.png"),
        search: require("@/assets/icons/search.png")
      },
      images: {
        welcome: ""
      },
      data_list: {
        data: []
      },
      select: {
        type_emails: [
          {
            value: "owner_notification_new_location",
            name: "Notificação proprietário da nova locação"
          },
          {
            value: "welcome_tenant",
            name: "Bem vindas ao inquilino"
          }
        ]
      },
      form: {
        reserve_id: "",
        type_email: "",
        client_code: "",
        client_name: "",
        client_email: "",
        text_email: ""
      }
    };
  },
  methods: {
    openModal() {
      $("#modalSendEmail").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    next() {
      if (this.active === 1) {
        this.getEmailData();
        return;
      }

      if (this.active++ > 2) this.active = 0;
    },
    /** Consulta os dados do cliente na API */
    getClientData() {
      this.loading_client_data = true;

      const queryParams = {
        params: {
          code: this.form.client_code
        }
      };

      http
        .get("register-sector/reserve/query/client", queryParams)
        .then(result => {
          const data = result.data;
          this.form.client_code = data.codigo;
          this.form.client_name = data.nome.toUpperCase();
          this.form.client_email = data.nome.toUpperCase();

          const email = data.email ? data.email.split(" ") : "";
          if (email.length === 2) {
            this.form.client_email = email[1];
          } else {
            this.form.client_email = "";
            _notification.error(
              "Email do cliente informado não localizado",
              350
            );
          }
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => (this.loading_client_data = false), 300);
        });
    },
    /** Busca os dados do email selecionado */
    getEmailData() {
      if (!this.form.type_email) {
        _notification.error("Informe o tipo de email");
        return;
      }
      this.loading_text_data = true;

      const queryParams = {
        params: this.form
      };

      http
        .get("register-sector/reserve/query/get-email-data", queryParams)
        .then(result => {
          /** Email de boas vindas ao inquilino */
          if (this.form.type_email === "welcome_tenant") {
            this.images.welcome = `data:image/png;base64,${
              result.data.base_64_image
            }`;
            this.active++;
            return;
          }

          this.form.text_email = result.data;
          this.$bus.$emit("setTextEditor", this.form.text_email);
          this.active++;
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => (this.loading_text_data = false), 300);
        });
    },
    /** Faz o envio do email */
    sendEmail() {
      this.loading_text_data = true;

      const queryParams = {
        params: {
          data: this.form
        }
      };
      http
        .get("register-sector/reserve/email/send", queryParams)
        .then(result => {
          _notification.success();
          setTimeout(() => {
            this.closeModal();
            this.cleanForm();
          }, 300);
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.loading_text_data = false), 300));
    },
    cleanForm() {
      this.form = {
        reserve_id: "",
        type_email: "",
        client_code: "",
        client_name: "",
        client_email: "",
        text_email: ""
      };
      this.$bus.$emit("cleanHistoric");
      this.active = 0;
      this.validation.reset();
    },
    closeModal() {
      $("#modalSendEmail").modal("hide");
    }
  },
  computed: {
    searchStringNotPermited() {
      const str = this.form.text_email;
      const check = str.indexOf("@@");

      if (check === -1) {
        return false;
      }
      return true;
    }
  },
  watch: {
    dataModal() {
      this.cleanForm();
      this.openModal();
    },
    "form.type_email"() {
      const reserveData = this.dataModal.reserve_data;

      this.form.client_code = reserveData.owner_code;
      this.form.client_name = reserveData.owner_name
        ? reserveData.owner_name.toUpperCase()
        : "";
      this.form.reserve_id = reserveData.id;
    }
  }
};
</script>

<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-danger">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-send"></span>
              ENVIO DE EMAIL
            </h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="padding-top: 0px;">
            <div class="row">
              <div class="col-md-12">
                <el-steps :active="active" finish-status="success">
                  <el-step title="Passo 1" description="Informe o Tipo de Email"></el-step>
                  <el-step title="Passo 2" description="Confira as Informações de Envio"></el-step>
                  <el-step title="Passo 3" description="Enviar Email"></el-step>
                </el-steps>
              </div>
            </div>

            <!-- passo 1 -->
            <div v-if="active === 0">
              <div class="row" style="margin-top: 10px;">
                <div class="col-md-6">
                  <select class="form-control input-sm has-warning" v-model="form.type_document">
                    <option value>Informe</option>
                    <option
                      value="owner_notification_new_location"
                    >Notificação Proprietário Nova Locação</option>
                    <option value="welcome_tenant">Boas Vindas ao Locatário</option>
                  </select>
                </div>
              </div>

              <div class="row" style="margin-top: 10px;">
                <div class="col-md-12">
                  <button
                    class="button btn btn-sm btn-primary"
                    :disabled="!form.type_document"
                    @click="getTextDocument"
                  >
                    Proxima Etapa / Dados de Envio
                    <span
                      class="fa fa-arrow-right"
                      style="margin-left: 10px;"
                    ></span>
                  </button>
                </div>
              </div>
            </div>
            <!-- / passo 1 -->
            <!-- passo 2 -->
            <div v-show="active === 1 && form.type_document === 'owner_notification_new_location'">
              <div class="row" style="margin-top: 10px;">
                <div class="col-md-12">
                  <editor @textEditor="text => form.text_editor = text"/>
                </div>
              </div>

              <div class="row" style="margin-top: 10px;">
                <div class="col-md-12">
                  <button class="button btn btn-sm btn-default" @click="active--">
                    <span class="fa fa-arrow-left"></span>
                    Voltar
                  </button>
                  
                  <button
                    class="button btn btn-sm btn-primary"
                    :disabled="search_string_not_permited || !form.text_editor"
                    @click="active++"
                  >
                    Proxima Etapa / Informações de Email
                    <span
                      class="fa fa-arrow-right"
                      style="margin-left: 10px;"
                    ></span>
                  </button>
                </div>
              </div>
            </div>

            <div v-show="active === 1 && form.type_document === 'welcome_tenant'">
              <div class="row">
                <div class="col-md-4">
                  <input type="text" class="form-control input-sm" v-model="form.client_name">
                </div>
              </div>
              <div class="row" style="margin-top: 10px;">
                <div class="col-md-12">Olá, {{ form.client_name }}</div>
              </div>
              <div class="row">
                <div class="col-md-12">
                  <img :src="images.folder_welcome">
                </div>
              </div>

              <div class="row" style="margin-top: 10px;">
                <div class="col-md-12">
                  <button class="button btn btn-sm btn-default" @click="active--">
                    <span class="fa fa-arrow-left"></span>
                    Voltar
                  </button>
                  
                  <button class="button btn btn-sm btn-primary" @click="active++">
                    Proxima Etapa / Informações de Email
                    <span
                      class="fa fa-arrow-right"
                      style="margin-left: 10px;"
                    ></span>
                  </button>
                </div>
              </div>
            </div>

            <!-- / passo 2 -->
            <!-- passo 3 -->
            <div v-show="active === 2">
              <div class="row" style="margin-top: 10px;">
                <div class="col-md-4">
                  <label>Verifique o email para continuar</label>
                  <input
                    type="text"
                    class="form-control input-sm"
                    v-model="form.client_email"
                    @keypress.enter="sendEmail"
                  >
                </div>
              </div>

              <div class="row" style="margin-top: 10px;">
                <div class="col-md-12">
                  <button class="button btn btn-sm btn-default" @click="active--">
                    <span class="fa fa-arrow-left"></span>
                    Voltar
                  </button>
                  <button
                    class="button btn btn-sm btn-danger"
                    :disabled="!form.client_email"
                    @click="sendEmail"
                  >
                    Finalizar / Enviar Email
                    <span class="fa fa-check" style="margin-left: 10px;"></span>
                  </button>
                </div>
              </div>
            </div>
            <!-- / passo 3 -->
          </div>
        </div>
      </div>
    </div>

    <table-list-send-email :dataComponent="data_emails_send" v-show="active === 0"/>
  </div>
</template>

<script>
import Editor from "../../../../components/Editor";
import TableListSendEmail from "../components/TableListSendEmail";

export default {
  components: { Editor, TableListSendEmail },
  data() {
    return {
      active: 0,
      form: {
        client_name: "",
        type_document: "",
        text_editor: "",
        client_email: ""
      },
      search_string_not_permited: true,
      images: {
        folder_welcome: require("../../../../assets/images/imagem.png")
      },
      data_emails_send: {}
    };
  },
  methods: {
    getEmailsSend() {
      http.get(`register/reserve/send-email/get-emails/${this.$route.params.reserve_id}`)
        .then(results => {
          this.data_emails_send = {
            data: results.data
          }
        }).catch(err => {})
    },
    next() {
      if (this.active++ > 2) this.active = 0;
    },
    getTextDocument() {
      this.$bus.$emit("openLoading", "Por favor, aguarde ...");

      const queryParams = {
        params: {
          type_document: this.form.type_document
        }
      };

      http
        .get(
          `register/reserve/send-email/get-text-email/${
            this.$route.params.reserve_id
          }`,
          queryParams
        )
        .then(result => {
          this.active++;
          this.$bus.$emit("setTextEditor", result.data.document_text);
          this.form.client_name = result.data.name.toUpperCase();
          this.form.client_email = result.data.email;
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    sendEmail() {
      if (!this.form.client_email) return;

      this.$bus.$emit("openLoading", "Enviando email, aguarde ...");
      this.form.reserve_id = this.$route.params.reserve_id;

      http
        .post("register/reserve/send-email", this.form)
        .then(result => {
          _notification.success();
          this.active = 0;
          this.getEmailsSend();
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    }
  },
  watch: {
    "form.text_editor"() {
      const str = this.form.text_editor;
      const check = str.indexOf("@@");

      if (check === -1) {
        this.search_string_not_permited = false;
      } else {
        this.search_string_not_permited = true;
      }
    }
  },
  mounted() {
    this.getEmailsSend();
  }
};
</script>

<style>
.el-step__title.is-process {
  font-weight: 700;
  color: red;
}

.el-step__description.is-process {
  color: red;
}

.el-step__head.is-process {
  color: red;
  border-color: red;
}
</style>


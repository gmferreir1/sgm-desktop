<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary" style="margin-bottom: 5px;">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <img :src="images.transfer" style="position: absolute; top: 1px;">
              <span style="margin-left: 35px;">FORMULÁRIO TRANSFERÊNCIA DE CONTRATO</span>
            </h3>

            <!-- button -->
            <div class="pull-right">
              <button
                class="button btn btn-sm btn-danger"
                @click="submitForm"
                :disabled="form.status === 'c' || blockReserve"
              >
                <span class="fa fa-check"></span>
                Salvar Dados
              </button>

              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-primary btn-sm btn-flat"
                  data-toggle="dropdown"
                >
                  <span class="fa fa-check-circle-o"></span>
                  Ações
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-sm btn-flat dropdown-toggle"
                  data-toggle="dropdown"
                >
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu pull-right" role="menu">
                  <li v-if="form.id">
                    <a
                      href="#"
                      @click.prevent="$emit('openModalHistoricTransfer', {transfer_id: form.id, status: status_before_update})"
                    >Históricos da transferência</a>
                  </li>
                  <li v-if="form.id && !blockReserve">
                    <a
                      href="#"
                      @click.prevent="$emit('openModalCancelTransfer', form.id)"
                    >Cancelar transferência</a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- / button -->
          </div>

          <div class="box-body" style="padding-top: 0px;">
            <!-- DADOS DO IMOVEL -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO IMÓVEL</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row">
              <div class="col-md-2 div-160">
                <label>Contrato</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.contract"
                  :disabled="disabledInput"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.contract') }}</div>
              </div>

              <div class="col-md-2 div-160">
                <label>Código Imóvel</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.immobile_code"
                  @keypress.enter="getImmobileData"
                  :disabled="disabledInput"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.immobile_code') }}</div>
              </div>

              <div class="col-md-1" style="width: 30px; padding-left: 0px;; margin-top: 25px;">
                <div class="loader" v-if="loading_immobile_data"></div>
                <a
                  href="#"
                  @click.prevent="getImmobileData"
                  v-if="!loading_immobile_data && form.immobile_code && !form.id"
                >
                  <img :src="images.search">
                </a>
              </div>

              <div class="col-md-3">
                <label>Endereço</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.address"
                  :disabled="disabledInput"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.address') }}</div>
              </div>

              <div class="col-md-3">
                <label>Bairro</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.neighborhood"
                  :disabled="disabledInput"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.neighborhood') }}</div>
              </div>

              <div class="col-md-3 div-120">
                <label>Valor</label>
                <money
                  class="form-control input-sm has-warning"
                  v-model="form.value"
                  autocomplete="off"
                />
                <div class="error">{{ validation.firstError('form.value') }}</div>
              </div>
            </div>
            <!-- // FIM DADOS DO IMOVEL -->

            <!-- DADOS DO PROPRIETÁRIO -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO PROPRIETÁRIO</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row">
              <div class="col-md-2 div-160">
                <label>Código</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.owner_code"
                  @keypress.enter="getClientData('owner')"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.owner_code') }}</div>
              </div>

              <div class="col-md-1" style="width: 30px; padding-left: 0px;; margin-top: 25px;">
                <div class="loader" v-if="loading_owner_data"></div>
                <a
                  href="#"
                  @click.prevent="getClientData('owner')"
                  v-if="!loading_owner_data && form.owner_code && !blockReserve"
                >
                  <img :src="images.search">
                </a>
              </div>

              <div class="col-md-3 col-lg-4">
                <label>Proprietário</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.owner_name"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.owner_name') }}</div>
              </div>

              <div class="col-md-2 div-160">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.owner_phone_01"
                  placeholder="som. números"
                />
                <div class="error">{{ validation.firstError('form.owner_phone_01') }}</div>
              </div>

              <div class="col-md-2 div-160">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.owner_phone_01"
                  placeholder="som. números"
                />
              </div>

              <div class="col-md-2 col-lg-3">
                <label>Email</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.owner_email"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.owner_email') }}</div>
              </div>
            </div>
            <!-- // FIM DADOS DO PROPRIETÁRIO -->

            <!-- DADOS DO TRANSFERÊNCIA -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DA TRANSFERÊNCIA</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row">
              <div class="col-md-2 div-160">
                <label title="Data da transferência">Data Transf</label>
                <date-picker
                  class="form-control input-sm has-warning"
                  v-model="form.transfer_date"
                  :disabled="disabledInput"
                />
                <div class="error">{{ validation.firstError('form.transfer_date') }}</div>
              </div>

              <div class="col-md-3 col-lg-3" style="min-width: 300px; padding-right: 0px">
                <label>Motivo</label>
                <multi-select
                  :id="'reason_id'"
                  :setValue="form.reason_id"
                  :dataSelect="select.reasons"
                  :multiple="false"
                  :search="true"
                  :maxHeight="300"
                  class="has-warning-select"
                  @value="value => form.reason_id = value"
                />
                <div class="error">{{ validation.firstError('form.reason_id') }}</div>
              </div>

              <div class="col-md-2">
                <label>Status</label>
                <select
                  class="form-control input-sm"
                  v-model="form.status"
                  :disabled="!form.id || blockReserve"
                >
                  <option value>Informe</option>
                  <option :value="list.value" v-for="list in select.status">{{ list.name }}</option>
                </select>
                <div class="error">{{ validation.firstError('form.status') }}</div>
              </div>

              <div class="col-md-2 div-140" v-if="form.status === 'r' ">
                <label>Novo Contrato</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.new_contract"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.new_contract') }}</div>
              </div>

              <div class="col-md-3 col-lg-3" style="min-width: 300px; padding-right: 0px">
                <label>Responsável</label>
                <multi-select
                  :id="'attendant_register'"
                  :setValue="form.responsible_transfer"
                  :dataSelect="select.users"
                  :multiple="false"
                  :search="true"
                  :maxHeight="300"
                  class="has-warning-select"
                  @value="value => form.responsible_transfer = value"
                />
                <div class="error">{{ validation.firstError('form.responsible_transfer') }}</div>
              </div>
              <div class="col-md-1" style="width: 30px; padding-left: 0px;; margin-top: 25px;">
                <a
                  href="#"
                  @click.prevent="$emit('openModalFluxAttendance', {module_name: 'register_transfer'})"
                  v-if="!blockReserve"
                >
                  <img :src="images.search">
                </a>
              </div>
            </div>
            <!-- / FIM DADOS DA TRANSFERÊNCIA -->

            <!-- DADOS DO SOLICITANTE -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO SOLICITANTE</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row">
              <div class="col-md-2 div-160">
                <label>Código</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.requester_code"
                  @keypress.enter="getClientData('requester')"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.requester_code') }}</div>
              </div>

              <div class="col-md-1" style="width: 30px; padding-left: 0px;; margin-top: 25px;">
                <div class="loader" v-if="loading_requester_data"></div>
                <a
                  href="#"
                  @click.prevent="getClientData('requester')"
                  v-if="!loading_requester_data && form.requester_code && !blockReserve"
                >
                  <img :src="images.search">
                </a>
              </div>

              <div class="col-md-3 col-lg-4">
                <label>Solicitante</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.requester_name"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.requester_name') }}</div>
              </div>

              <div class="col-md-2 div-160">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.requester_phone_01"
                  placeholder="som. números"
                />
                <div class="error">{{ validation.firstError('form.requester_phone_01') }}</div>
              </div>

              <div class="col-md-2 div-160">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.requester_phone_02"
                  placeholder="som. números"
                />
              </div>

              <div class="col-md-2 col-lg-3">
                <label>Email</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.requester_email"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.requester_email') }}</div>
              </div>
            </div>
            <!-- // FIM DADOS DO SOLICITANTE -->

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <button
                  class="button btn btn-sm btn-danger"
                  @click="submitForm"
                  :disabled="form.status === 'c' || blockReserve"
                >
                  <span class="fa fa-check"></span>
                  Salvar Dados
                </button>

                <router-link
                  :to="{name: 'registerSector_transfer_contract'}"
                  class="button btn btn-sm btn-default"
                >Cancelar Dados</router-link>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12">
                <required/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { toUpperCase } from "@/util/string";
import extraDataModule from "../extra-data-module";
import rulesValidator from "../mixins/rules-validator";
import DatePicker from "@/components/DatePicker";
import MultiSelect from "@/components/MultiSelect";
import Required from "@/components/Required";
import { dateFormat } from "@/util/dateTime";
import { mapActions } from "vuex";
import systemAlert from "@/mixins/systemAlert";

export default {
  name: "FormReserve",
  mixins: [rulesValidator, systemAlert],
  props: ["refreshData"],
  components: { DatePicker, MultiSelect, Required },
  data() {
    return {
      loading_immobile_data: false,
      loading_owner_data: false,
      loading_requester_data: false,
      confirm_end_transfer: false,
      images: {
        transfer: require("@/assets/icons/transfer.png"),
        search: require("@/assets/icons/search.png")
      },
      select: extraDataModule.select,
      form: {
        contract: "",
        immobile_code: "",
        address: "",
        neighborhood: "",
        value: 0,
        owner_code: "",
        owner_name: "",
        owner_phone_01: "",
        owner_phone_02: "",
        owner_email: "",
        transfer_date: moment().format("DD/MM/YYYY"),
        reason_id: "",
        status: "p",
        new_contract: "",
        responsible_transfer: "",
        requester_code: "",
        requester_name: "",
        requester_phone_01: "",
        requester_phone_02: "",
        requester_email: ""
      },
      status_before_update: ""
    };
  },
  methods: {
    dateFormat,
    ...mapActions("AdminUser", ["getAllUsers"]),
    /** Retorna os motivos da transferencia de contrato */
    getReasonsTransferContract() {
      const queryParams = {
        params: {
          module_name: "transfer_contract",
          type_reason: "transfer_contract"
        }
      };

      http
        .get("admin/reason/per-module", queryParams)
        .then(results => {
          this.select.reasons = results.data.map(data => {
            return {
              value: data.id,
              name: data.reason.toUpperCase()
            };
          });
        })
        .catch(err => {})
        .finally(() => {});
    },
    /** Consulta todos os usuários do sistema para inserir no select de responsável */
    getUsers() {
      this.getAllUsers()
        .then(results => {
          const usersForSelect = results.data.map(user => {
            return {
              name: `${user.name.toUpperCase()} ${user.last_name.toUpperCase()}`,
              value: user.id
            };
          });
          const collection = collect(usersForSelect);
          this.select.users = collection.sortBy("name").all();
        })
        .catch(err => {})
        .finally(() => setTimeout(() => this.$bus.$emit("closeLoading"), 300));
    },
    /** Busca os dados do imovel pelo código */
    getImmobileData() {
      this.loading_immobile_data = true;

      const queryParams = {
        params: {
          immobile_code: this.form.immobile_code
        }
      };

      http
        .get("api-query/immobile-data", queryParams)
        .then(result => {
          const data = toUpperCase(result.data.imovel);
          this.form.immobile_code = data.immobile_code;
          this.form.address = data.address;
          this.form.neighborhood = data.neighborhood;
          this.form.value = data.value_rent;
        })
        .catch(err => {})
        .finally(() =>
          setTimeout(() => (this.loading_immobile_data = false), 300)
        );
    },
    getClientData(typeClient) {
      if (typeClient === "owner") {
        this.loading_owner_data = true;
      }

      if (typeClient === "requester") {
        this.loading_requester_data = true;
      }

      const queryParams = {
        params: {
          client_code:
            typeClient === "owner"
              ? this.form.owner_code
              : this.form.requester_code
        }
      };
      http
        .get("api-query/client-data", queryParams)
        .then(result => {
          if (typeClient === "owner") {
            this.form.owner_code = result.data.client_code;
            this.form.owner_name = result.data.client_name.toUpperCase();
            this.form.owner_phone_01 = result.data.phones.phone_01;
            this.form.owner_phone_02 = result.data.phones.phone_02;
            this.form.owner_email = result.data.client_email;
          }

          if (typeClient === "requester") {
            this.form.requester_code = result.data.client_code;
            this.form.requester_name = result.data.client_name.toUpperCase();
            this.form.requester_phone_01 = result.data.phones.phone_01;
            this.form.requester_phone_02 = result.data.phones.phone_02;
            this.form.requester_email = result.data.client_email;
          }
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading_owner_data = false;
            this.loading_requester_data = false;
          }, 300);
        });
    },
    create() {
      this.$bus.$emit("openLoading");

      http
        .post("register-sector/transfer-contract", this.form)
        .then(result => {
          _notification.success();

          this.$router.push({
            name: "registerSector_transfer_contract_edit",
            params: { id: result.data }
          });
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.$bus.$emit("closeLoading");
          }, 300);
        });
    },
    edit(id) {
      http
        .get(`register-sector/transfer-contract/${id}`)
        .then(result => {
          const data = toUpperCase(result.data, [
            "status",
            "owner_email",
            "requester_email"
          ]);
          data.transfer_date = dateFormat(data.transfer_date, "DD/MM/YYYY");
          this.status_before_update = data.status;
          this.form = data;
        })
        .catch(err => {})
        .finally(() => {});
    },
    update() {
      if (this.form.status === "r" && !this.confirm_end_transfer) {
        let message = `Tem certeza que deseja finalizar a transferência ?
              <p style='font-weight: bold; color: red; font-size: 15px;'>Nenhuma alteração sera permitida depois desta ação !</p>`;

        this.showAlert(message).then(confirm => {
          if (confirm) {
            this.confirm_end_transfer = true;
            this.update();
          }
        });
        return;
      }

      this.$bus.$emit("openLoading");
      http
        .put(`register-sector/transfer-contract/${this.form.id}`, this.form)
        .then(result => {
          _notification.success();
          this.edit(this.form.id);
        })
        .catch(err => {
          this.confirm_end_transfer = false;
        })
        .finally(() => {
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        });
    }
  },
  computed: {
    disabledInput() {
      if (this.form.id) {
        return true;
      }
    },
    blockReserve() {
      if (this.status_before_update === "r") {
        return true;
      }
    }
  },
  watch: {
    "$route.name"() {
      if (this.$route.name === "registerSector_transfer_contract_edit") {
        this.edit(this.$route.params.id);
      }
    },
    refreshData() {
      this.edit(this.$route.params.id);
    }
  },
  mounted() {
    this.$bus.$emit("openLoading");
    this.getReasonsTransferContract();
    this.getUsers();

    this.$bus.$on("setAttendantRegisterSector", data => {
      this.form.responsible_transfer = data.user;
    });

    const routeData = this.$route;
    if (routeData.name === "registerSector_transfer_contract_edit") {
      this.edit(routeData.params.id);
    }
  }
};
</script>


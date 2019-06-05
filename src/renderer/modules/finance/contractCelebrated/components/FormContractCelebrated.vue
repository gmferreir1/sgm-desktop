<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary" style="margin-bottom: 5px;">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <img :src="images.handShake" style="position: absolute; top: 1px;">
              <span style="margin-left: 35px;">FORMULÁRIO CONTRATO CELEBRADO</span>
            </h3>
          </div>

          <div class="box-body" style="padding-top: 0px;">
            <!-- DADOS PROPRIETÁRIO -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO PROPRIETÁRIO</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row">
              <div class="col-md-2 div-160">
                <label>Código Proprietário</label>
                <input type="text" class="form-control input-sm" v-model="form.owner_code" disabled>
              </div>

              <div class="col-md-4">
                <label>Nome do Proprietário</label>
                <input type="text" class="form-control input-sm" v-model="form.owner_name" disabled>
              </div>
            </div>
            <!-- / DADOS DO PROPRIETÁRIO -->

            <!-- DADOS DO IMOVEL -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO IMÓVEL</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row">
              <div class="col-md-2 div-160">
                <label>Código Imóvel</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.immobile_code"
                  disabled
                >
              </div>

              <div class="col-md-3">
                <label>Endereço</label>
                <input type="text" class="form-control input-sm" v-model="form.address" disabled>
              </div>

              <div class="col-md-3">
                <label>Bairro</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.neighborhood"
                  disabled
                >
              </div>

              <div class="col-md-3">
                <label>Inscrição IPTU</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.subscription_iptu"
                  disabled
                >
              </div>
            </div>

            <!-- // FIM DADOS DO IMOVEL -->

            <!-- DADOS DO CONTRATO CELEBRADO -->
            <div class="row" style="margin-top: 20px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO CONTRATO</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2 div-160">
                <label>Contrato</label>
                <input type="text" class="form-control input-sm" v-model="form.contract" disabled>
              </div>

              <div class="col-md-2 div-140">
                <label>Dt Inicio Contrato</label>
                <date-picker
                  class="form-control input-sm"
                  id="date_init_contract"
                  v-model="form.date_init_contract"
                  disabled
                />
              </div>

              <div class="col-md-2 div-140">
                <label>Dt Venc Aluguel</label>
                <date-picker class="form-control input-sm" v-model="form.due_date_rent" disabled/>
              </div>

              <div class="col-md-2 div-140">
                <label>Prazo(meses)</label>
                <select class="form-control input-sm" v-model="form.deadline" disabled>
                  <option value>Informe</option>
                  <option :value="list.value" v-for="list in select.deadline">{{ list.name }}</option>
                </select>
              </div>

              <div class="col-md-2 div-140">
                <label>Ent. Chaves</label>
                <date-picker
                  type="text"
                  class="form-control input-sm"
                  v-model="form.delivery_key"
                  id="delivery_key"
                  disabled
                />
              </div>

              <div class="col-md-2">
                <label>Desc. Fidelidade</label>
                <select class="form-control input-sm" v-model="form.loyalty_discount" disabled>
                  <option value>Informe</option>
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
              </div>

              <div class="col-md-2">
                <label>Boleto</label>
                <select class="form-control input-sm" v-model="form.ticket" disabled>
                  <option value>Informe</option>
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2">
                <label>TX. Intermediaçao</label>
                <select class="form-control input-sm" v-model="form.tx_contract" disabled>
                  <option value>Informe</option>
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
              </div>

              <div class="col-md-2">
                <label>Tar. Bancária</label>
                <select class="form-control input-sm" v-model="form.bank_expense" disabled>
                  <option value>Informe</option>
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-4">
                <label>Responsável Setor Cadastro</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.responsible_register_sector"
                  disabled
                >
              </div>
            </div>
            <!-- // FIM DADOS DO CONTRATO CELEBRADO -->

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2 div-140">
                <p>Status Geral</p>
                <!-- Rounded switch -->
                <label class="switch">
                  <input type="checkbox" v-model="form.status_general" disabled>
                  <span class="slider round"></span>
                </label>
              </div>

              <div class="col-md-2 div-140">
                <p>Status IPTU</p>
                <!-- Rounded switch -->
                <label class="switch">
                  <input type="checkbox" v-model="form.status_iptu">
                  <span class="slider round"></span>
                </label>
              </div>

              <div class="col-md-2 div-140">
                <p>Status TCRS</p>
                <!-- Rounded switch -->
                <label class="switch">
                  <input type="checkbox" v-model="form.status_tcrs">
                  <span class="slider round"></span>
                </label>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <label>Observações Extras</label>
                <textarea
                  class="form-control"
                  cols="30"
                  rows="10"
                  v-model="form.observation"
                  placeholder="Informe aqui as observações que deseja ...."
                ></textarea>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-danger" @click="update">
                  <span class="fa fa-check"></span>
                  Salvar Dados
                </button>

                <router-link
                  :to="{name: 'registerSector_reserve_list'}"
                  class="button btn btn-sm btn-default"
                >Cancelar Dados</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DatePicker from "@/components/DatePicker";
import MultiSelect from "@/components/MultiSelect";
import Required from "@/components/Required";
import { toUpperCase } from "@/util/string";
import { dateFormat } from "@/util/dateTime";

export default {
  name: "FormContractCelebrated",
  components: { DatePicker, MultiSelect, Required },
  data() {
    return {
      images: {
        handShake: require("@/assets/icons/hand-shake.png")
      },
      select: {
        deadline: [
          { name: "12 Meses", value: 12 },
          { name: "24 Meses", value: 24 },
          { name: "36 Meses", value: 36 },
          { name: "48 Meses", value: 48 },
          { name: "60 Meses", value: 60 },
          { name: "72 Meses", value: 72 },
          { name: "84 Meses", value: 84 },
          { name: "96 Meses", value: 96 },
          { name: "108 Meses", value: 108 },
          { name: "120 Meses", value: 120 },
          { name: "132 Meses", value: 132 }
        ]
      },
      form: {
        owner_code: "",
        owner_name: "",
        immobile_code: "",
        address: "",
        neighborhood: "",
        subscription_iptu: "",
        contract: "",
        date_init_contract: "",
        due_date_rent: "",
        deadline: "",
        delivery_key: "",
        loyalty_discount: "",
        ticket: "",
        taxa: "",
        tx_contract: "",
        bank_expense: "",
        responsible_register_sector: "",
        observation: "",
        status_general: false,
        status_iptu: false,
        status_tcrs: false
      }
    };
  },
  methods: {
    toUpperCase,
    edit(id) {
      this.$bus.$emit("openLoading");
      http
        .get(`finance/contract-celebrated/${id}`)
        .then(result => {
          const data = toUpperCase(result.data, [
            "status_general",
            "status_iptu",
            "status_tcrs",
            "loyalty_discount",
            "ticket",
            "tx_contract",
            "bank_expense",
            "observation",
          ]);

          data.status_general = data.status_general === "p" ? false : true;
          data.status_iptu = data.status_iptu === "p" ? false : true;
          data.status_tcrs = data.status_tcrs === "p" ? false : true;
          data.date_init_contract = dateFormat(
            data.date_init_contract,
            "DD/MM/YYYY"
          );
          data.due_date_rent = dateFormat(data.due_date_rent, "DD/MM/YYYY");
          data.delivery_key = dateFormat(data.delivery_key, "DD/MM/YYYY");
          data.deadline = data.period_contract;

          const responsible = data.responsibleReleaseReserve
            ? `${data.responsibleReleaseReserve.name} ${
                data.responsibleReleaseReserve.last_name
              }`
            : "";

          data.responsible_register_sector = responsible
            ? responsible.toUpperCase()
            : "";

          console.log(data);

          this.form = data;
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        });
    },
    update() {
      this.$bus.$emit("openLoading");

      http
        .put(`finance/contract-celebrated/${this.form.id}`, this.form)
        .then(result => {
          _notification.success();
          this.edit(this.form.id);
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.$bus.$emit("closeLoading");
          }, 300);
        });
    }
  },
  watch: {
    "form.status_iptu"() {
      if (this.form.status_iptu && this.form.status_tcrs) {
        this.form.status_general = true;
      }
      if (!this.form.status_iptu || !this.form.status_tcrs) {
        this.form.status_general = false;
      }
    },
    "form.status_tcrs"() {
      if (this.form.status_iptu && this.form.status_tcrs) {
        this.form.status_general = true;
      }
      if (!this.form.status_iptu || !this.form.status_tcrs) {
        this.form.status_general = false;
      }
    }
  },
  mounted() {
    const routeData = this.$route;
    if (routeData.name === "finance_contract_celebrated_edit") {
      this.edit(routeData.params.id);
    }
  }
};
</script>
<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-danger">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-archive"></span>
              FORMULÁRIO INATIVAÇÃO DE CONTRATO
            </h3>

            <div class="pull-right">
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
                  <li>
                    <router-link :to="{name: 'termination_contract_rent_accessory'}" v-if="form.id">Acessorios da Locação</router-link>
                  </li>
                  <li v-if="form.id">
                    <a href="#" @click.prevent="openModalHistoric">Históricos da Rescisão</a>
                  </li>
                  <li v-if="form.id">
                    <a href="#" @click.prevent="openModalCancel" v-if="!disabledActions">Cancelar Rescisão</a>
                  </li>
                  <li v-if="form.id" class="divider"></li>
                  <li v-if="form.id">
                    <a href="#" @click.prevent="$emit('openModalSelectPrint')">Impressão de Fichas</a>
                  </li>
                  <li v-if="form.id" class="divider"></li>
                  <li v-if="form.id">
                    <router-link :to="{name: 'termination_contract_create'}">Nova Inativação</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'termination_contract_list'}">Lista de Rescisão</router-link>
                  </li>
                  
                </ul>
              </div>
            </div>
          </div>
          <!-- /.box-header -->

          <div class="box-body" style="padding-top: 0px;">
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO IMÓVEL</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>
            <!-- dados do imovel -->
            <div class="row">
              <div class="col-md-2 div-160">
                <label>Contrato</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.contract"
                  @keypress.enter="getContractData"
                  @keydown.tab="getContractData"
                  :disabled="disabledInputsForEdit"
                >
                <div class="error">{{ validation.firstError('form.contract') }}</div>
              </div>

              <div class="col-md-2 div-160">
                <label>Código</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.immobile_code"
                  :disabled="disabledInputsForEdit"
                >
                <div class="error">{{ validation.firstError('form.immobile_code') }}</div>
              </div>

              <div class="col-md-4">
                <label>Endereço</label>
                <input type="text" class="form-control input-sm has-warning" v-model="form.address" :disabled="disabledInputsForEdit">
                <div class="error">{{ validation.firstError('form.address') }}</div>
              </div>

              <div class="col-md-3">
                <label>Bairro</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.neighborhood"
                  :disabled="disabledInputsForEdit"
                >
                <div class="error">{{ validation.firstError('form.neighborhood') }}</div>
              </div>

              <div class="col-md-3 div-160">
                <label>Valor</label>
                <money class="form-control input-sm has-warning" v-model="form.value" :disabled="disabledInputsForEdit"/>
                <div class="error">{{ validation.firstError('form.value') }}</div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-3">
                <label>Tipo Imóvel</label>
                <select class="form-control input-sm has-warning" v-model="form.type_immobile" :disabled="disabledActions">
                  <option value>Informe</option>
                  <option
                    :value="list.type_immobile_id"
                    v-for="(list, index) in select.types_immobile"
                    :key="index"
                  >{{ list.name_type_immobile.toUpperCase() }}</option>
                </select>
                <div class="error">{{ validation.firstError('form.type_immobile') }}</div>
              </div>

              <div class="col-md-3">
                <label>Tipo Locação</label>
                <select class="form-control input-sm has-warning" v-model="form.type_location" :disabled="disabledActions">
                  <option value>Informe</option>
                  <option
                    :value="list.value"
                    v-for="(list, index) in select.types_location"
                    :key="index"
                  >{{ list.name.toUpperCase() }}</option>
                </select>
                <div class="error">{{ validation.firstError('form.type_location') }}</div>
              </div>
            </div>
            <!-- / dados do imovel -->

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO PROPRIETÁRIO</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>
            <!-- dados do proprietário -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-4">
                <label>Proprietário</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.owner_name"
                  :disabled="disabledActions"
                >
                <div class="error">{{ validation.firstError('form.owner_name') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm has-warning"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.owner_phone_01"
                  id="owner_phone_01"
                  placeholder="som. números"
                  autocomplete="off"
                  :disabled="disabledActions"
                />
                <div class="error">{{ validation.firstError('form.owner_phone_01') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.owner_phone_02"
                  placeholder="som. números"
                  autocomplete="off"
                  :disabled="disabledActions"
                />
              </div>

              <div class="col-md-2 div-140">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.owner_phone_03"
                  placeholder="som. números"
                  autocomplete="off"
                  :disabled="disabledActions"
                />
              </div>

              <div class="col-md-3">
                <label>Email</label>
                <input type="text" class="form-control input-sm" v-model="form.owner_email" :disabled="disabledActions">
              </div>
            </div>
            <!-- / dados do proprietário -->

            <!-- / dados do inquilino -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO INQUILINO</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-4">
                <label>Inquilino</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.tenant_name"
                  :disabled="disabledActions"
                >
                <div class="error">{{ validation.firstError('form.tenant_name') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm has-warning"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.tenant_phone_01"
                  placeholder="som. números"
                  autocomplete="off"
                  :disabled="disabledActions"
                />
                <div class="error">{{ validation.firstError('form.tenant_phone_01') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.tenant_phone_02"
                  placeholder="som. números"
                  autocomplete="off"
                  :disabled="disabledActions"
                />
              </div>

              <div class="col-md-2 div-140">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.tenant_phone_03"
                  placeholder="som. números"
                  autocomplete="off"
                  :disabled="disabledActions"
                />
              </div>

              <div class="col-md-3">
                <label>Email</label>
                <input type="text" class="form-control input-sm" v-model="form.tenant_email" :disabled="disabledActions">
              </div>
            </div>
            <!-- / dados do inquilino -->

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DA RESCISÃO</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2">
                <label>Ação</label>
                <select class="form-control input-sm has-warning" v-model="form.type_register" :disabled="disabledActions">
                  <option value="termination">Rescisão</option>
                  <option value="transfer">Transferência</option>
                </select>
                <div class="error">{{ validation.firstError('form.type_register') }}</div>
              </div>

              <div class="col-md-3">
                <label>Motivo</label>
                <select class="form-control input-sm has-warning" v-model="form.reason" :disabled="disabledActions">
                  <option value>Informe</option>
                  <option
                    :value="list.value"
                    v-for="(list, index) in select.reasons"
                    :key="index"
                  >{{ list.name.toUpperCase() }}</option>
                </select>
                <div class="error">{{ validation.firstError('form.reason') }}</div>
              </div>

              <div class="col-md-2">
                <label>Alugou Novamente ?</label>
                <select class="form-control input-sm has-warning" v-model="form.rent_again" :disabled="disabledActions">
                  <option value="n">Não</option>
                  <option value="y">Sim</option>
                </select>
                <div class="error">{{ validation.firstError('form.rent_again') }}</div>
              </div>

              <div class="col-md-3">
                <label>Destino</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.destination"
                  :disabled="form.rent_again !== 'y' || disabledActions"
                >
                  <option value>Informe</option>
                  <option
                    :value="list.value"
                    v-for="(list, index) in select.destinations"
                    :key="index"
                  >{{ list.name.toUpperCase() }}</option>
                </select>
                <div class="error">{{ validation.firstError('form.destination') }}</div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;" v-if="form.type_register === 'transfer' ">
              <div class="col-md-3">
                <label>Resp.Cadastro</label>
                <multi-select
                  :id="'rp_per_register_sector'"
                  :setValue="form.rp_register_sector"
                  :dataSelect="select.users"
                  :multiple="false"
                  :search="true"
                  class_name="has-warning-select"
                  @value="value => form.rp_register_sector = value"
                  :disabled="disabledActions"
                />
                <div class="error">{{ validation.firstError('form.rp_register_sector') }}</div>
              </div>

              <div class="col-md-2 div-160">
                <label>Novo Contrato</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.new_contract_code"
                  :disabled="disabledActions"
                >
                <div class="error">{{ validation.firstError('form.new_contract_code') }}</div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2">
                <label>Ressalvas</label>
                <select class="form-control input-sm has-warning" v-model="form.caveat" :disabled="disabledActions">
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
                <div class="error">{{ validation.firstError('form.caveat') }}</div>
              </div>

              <div class="col-md-3" style="padding-right: 0px !important; min-width: 300px">
                <label>Vistoriador</label>
                <multi-select
                  :id="'surveyor'"
                  :setValue="form.surveyor"
                  :dataSelect="select.users"
                  :multiple="false"
                  :search="true"
                  :maxHeight="300"
                  :disable="(form.survey_release === true ? true : false) || disabledActions"
                  @value="value => form.surveyor = value"
                  class_name="has-warning-select"
                />
                <div class="error">{{ validation.firstError('form.surveyor') }}</div>
              </div>

              <div class="col-md-1" style="margin-top: 30px; padding-left: 0px; width: 50px !important;">
                <input type="checkbox" v-model="form.release_survey" :disabled="disabledActions"> SV
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
               <div class="col-md-3" style="min-width: 300px;">
                <label>Resp.Inativação</label>
                <multi-select
                  :id="'rp_per_inactive'"
                  :setValue="form.rp_per_inactive"
                  :dataSelect="select.users"
                  :multiple="false"
                  :search="true"
                  :disable="disabledActions"
                  class_name="has-warning-select"
                  :maxHeight="280"
                  @value="value => form.rp_per_inactive = value"
                />
                <div class="error">{{ validation.firstError('form.rp_per_inactive') }}</div>
              </div>

              <div class="col-md-2">
                <label>Ul. Atendente</label>
                <p>definir</p>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2 div-160">
                <label style="color: red; font-weight: bold">INATIVAÇÃO</label>
                <date-picker
                  class="form-control input-sm has-warning"
                  v-model="form.termination_date"
                  placeholder="DD/MM/AAAA"
                  :disabled="disabledActions"
                />
                <div class="error">{{ validation.firstError('form.termination_date') }}</div>
              </div>

              <div class="col-md-3">
                <label>Status</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.status"
                  :disabled="disabledSelectStatus || disabledActions"
                >
                  <option value>Informe</option>
                  <option :value="list.value" v-for="(list, index) in select.status" :key="index">{{ list.name.toUpperCase() }}</option>
                </select>
                <div class="error">{{ validation.firstError('form.status') }}</div>
              </div>

               <div class="col-md-2 div-160" v-if="form.status === 'r' ">
                <label style="color: red; font-weight: bold">RESCISÃO</label>
                <date-picker
                  class="form-control input-sm has-warning"
                  v-model="form.end_process"
                  placeholder="DD/MM/AAAA"
                  :disabled="disabledActions"
                />
                <div class="error">{{ validation.firstError('form.termination_date') }}</div>
              </div>


            </div>

            <div class="row" style="margin-top: 12px">
              <div class="col-md-12">
                <textarea class="form-control" 
                  v-model="form.observation" rows="10" 
                  :disabled="(form.caveat === 'n' ? true : false) || disabledActions"></textarea>
              </div>
            </div>

            <div class="row" style="margin-top: 10px">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-primary" @click="submitForm" :disabled="disabledActions">
                  <span class="fa fa-check"></span>
                  Salvar Dados
                </button>
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
import { mapActions } from "vuex";
import MultiSelect from "../../../../components/MultiSelect";
import DatePicker from "../../../../components/DatePicker";
import EditorCaveat from "../components/EditorCaveat";
import validator from "../mixins/rules-validator";
import Required from "../../../../components/Required";
import { dateFormat } from "../../../../util/dateTime";

export default {
  components: { MultiSelect, DatePicker, EditorCaveat, Required },
  mixins: [validator],
  data() {
    return {
      form: {
        contract: "",
        immobile_code: "",
        address: "",
        neighborhood: "",
        value: 0,
        type_immobile: "",
        type_location: "",
        owner_name: "",
        owner_phone_01: "",
        owner_phone_02: "",
        owner_phone_03: "",
        owner_email: "",
        tenant_name: "",
        tenant_phone_01: "",
        tenant_phone_02: "",
        tenant_phone_03: "",
        tenant_email: "",
        type_register: "termination",
        reason: "",
        rent_again: "n",
        destination: "",
        caveat: "n",
        new_contract_code: "",
        rp_register_sector: "",
        surveyor: "",
        release_survey: false,
        rp_per_inactive: "",
        termination_date: "",
        status: "p",
        observation: ""
      },
      select: {
        types_immobile: [],
        types_location: [
          { name: "residencial", value: "re" },
          { name: "não residencial", value: "co" }
        ],
        reasons: [],
        destinations: [],
        users: [],
        status: [
          { name: "pendente", value: "p" },
          { name: "resolvido", value: "r" },
          { name: "acordo", value: "a" },
          { name: "justiça", value: "j" },
          { name: "cob.ext.jud", value: "cej" }
        ]
      },
      current_status: ""
    };
  },
  methods: {
    dateFormat,
    ...mapActions("AdminUser", ["getAllUsers"]),
    getImmobileTypes() {
      http
        .get("termination/contract/query/get-immobile-types")
        .then(results => {
          this.select.types_immobile = results.data;
        })
        .catch(err => {});
    },
    getReasonsDestinations() {
      http
        .get("termination/contract/query/get-reasons-and-destinations")
        .then(results => {
          const data = results.data;

          if (data.length) {
            data.forEach(element => {
              // reason
              if (element.type_reason === "reason") {
                this.select.reasons.push({
                  name: element.reason,
                  value: element.id
                });
              }
              // destination
              if (element.type_reason === "destination") {
                this.select.destinations.push({
                  name: element.reason,
                  value: element.id
                });
              }
            });

            const collectionReasons = collect(this.select.reasons);
            const collectionDestinations = collect(this.select.destinations);

            this.select.reasons = collectionReasons.sortBy("name").all();
            this.select.destinations = collectionDestinations
              .sortBy("name")
              .all();
          }

          return this.select.reasons;
          return this.select.destinations;
        })
        .catch(err => {});
    },
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
        .catch(err => {});
    },
    getNextAttendance() {
      http.get("termination/contract/query/get-next-attendance")
        .then(result => {
          setTimeout(() => this.form.rp_per_inactive = result.data.id, 100);
        }).catch(err => {})
    },
    getContractData() {
      if (this.form.contract.length < 4) return;
       this.$bus.$emit("openLoading");
      const queryParams = {
        params: {
          contract: this.form.contract
        }
      };

      http
        .get("termination/contract/query/get-contract-data", queryParams)
        .then(result => {
          const contractData = result.data;

          if (contractData.length === 1) {
            this.setFormContractData(contractData[0]);
          }

          if (contractData.length > 1) {
            this.$emit("openModalShowImmobile", contractData);
          }

          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    setFormContractData(contractData) {
      this.form.immobile_code = contractData.immobile_data
        ? contractData.immobile_data.immobile_code.toUpperCase()
        : "";
      this.form.address = contractData.immobile_data
        ? contractData.immobile_data.address.toUpperCase()
        : "";
      this.form.neighborhood = contractData.immobile_data
        ? contractData.immobile_data.neighborhood.toUpperCase()
        : "";
      this.form.type_immobile = contractData.immobile_data
        ? contractData.immobile_data.type_immobile
        : "";
      this.form.type_location = contractData.immobile_data ? contractData.immobile_data.type_location: "";
      this.form.value = contractData.value_rent;

      this.form.contract = contractData.contract.toUpperCase();
      this.form.owner_name = contractData.owner_data.client_name.toUpperCase();
      this.form.owner_phone_01 = contractData.owner_data.phone_01;
      this.form.owner_phone_02 = contractData.owner_data.phone_02;
      this.form.owner_phone_03 = contractData.owner_data.phone_03;
      this.form.owner_email = contractData.owner_data.client_email;

      this.form.tenant_name = contractData.tenant_data.client_name.toUpperCase();
      this.form.tenant_phone_01 = contractData.tenant_data.phone_01;
      this.form.tenant_phone_02 = contractData.tenant_data.phone_02;
      this.form.tenant_phone_03 = contractData.tenant_data.phone_03;
      this.form.tenant_email = contractData.tenant_data.client_email;

      this.form.value_last_payment = contractData.value_last_payment;
      this.form.payment_date = contractData.payment_date;
    },
    create() {
      this.$bus.$emit("openLoading");
      http
        .post("termination/contract", this.form)
        .then(result => {
          _notification.success();
          this.$router.push({ name: 'termination_contract_edit', params: { id: result.data } });
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    edit(id) {
      http
        .get(`termination/contract/${id}`)
        .then(result => {
          const data = result.data;
          data.contract = data.contract.toUpperCase();
          data.address = data.address.toUpperCase();
          data.neighborhood = data.neighborhood.toUpperCase();
          data.owner_name = data.owner_name.toUpperCase();
          data.tenant_name = data.tenant_name.toUpperCase();
          data.termination_date = dateFormat(data.termination_date, "DD/MM/YYYY");
          data.destination = !data.destination ? "" : data.destination;
          data.end_process = data.end_process ? dateFormat(data.end_process, "DD/MM/YYYY") : "";

          this.current_status = data.status;

          if (data.status === "c") {
            this.select.status.push({ name: "cancelado", value: "c" });
          }

          this.form = data;
        })
        .catch(err => {})
        .finally(() => this.$bus.$emit("closeLoading"), 300);
    },
    update() {
      this.$bus.$emit("openLoading");

      http.put(`termination/contract/${this.form.id}`, this.form)
        .then(result => {

          _notification.success();
          this.edit(this.form.id);

        }).catch(err => this.$bus.$emit("closeLoading"))
    },
    openModalHistoric() {
      this.$bus.$emit("Termination\Contract::openModalHistoric", this.form.id); 
    },
    openModalCancel() {
      this.$bus.$emit("Termination\Contract::openModalCancel", this.form.id); 
    },
    actionRoute() {
      const route = this.$route;
      if (route.name === "termination_contract_edit") {
        //this.$bus.$emit("openLoading");
        this.edit(route.params.id);
      } else {
        this.getNextAttendance();
        setTimeout(() => this.$bus.$emit("closeLoading"), 400);
      }
    },
    cleanForm() {
      this.form = {
        contract: "",
        immobile_code: "",
        address: "",
        neighborhood: "",
        value: 0,
        type_immobile: "",
        type_location: "",
        owner_name: "",
        owner_phone_01: "",
        owner_phone_02: "",
        owner_phone_03: "",
        owner_email: "",
        tenant_name: "",
        tenant_phone_01: "",
        tenant_phone_02: "",
        tenant_phone_03: "",
        tenant_email: "",
        type_register: "termination",
        reason: "",
        rent_again: "n",
        destination: "",
        caveat: "n",
        new_contract_code: "",
        rp_register_sector: "",
        surveyor: "",
        release_survey: false,
        rp_per_inactive: "",
        termination_date: "",
        status: "p",
        observation: ""
      };

      this.current_status = "";
      this.validation.reset();
    }
  },
  watch: {
    "form.release_survey"() {
      if (this.form.release_survey) {
        this.form.surveyor = "";
      }
    },
    "form.caveat"() {
      if (this.form.caveat === "n") {
        this.form.observation = "";
        this.$bus.$emit("cleanHistoric");
      }
    },
    "form.rent_again"() {
      if (this.form.rent_again === "n") {
        this.form.destination = "";
      }
    },
    "$route"() {
      if (this.$route.name === "termination_contract_create") {
        this.cleanForm();
        this.getNextAttendance();
      }
      if (this.$route.name === "termination_contract_edit") {
        this.edit(this.$route.params.id);
      }
    }
  },
  computed: {
    disabledSelectStatus() {
      if (!this.form.id) {
        return true;
      }

      return false;
    },
    disabledInputsForEdit() {
      if (this.form.id) {
        return true;
      }
      return false;
    },
    disabledActions() {

      if (this.current_status === "r" || this.current_status === "j" || this.current_status === "cej" || this.current_status === "c") {
        return true;
      }

      return false;
    }
  },
  mounted() {
    this.$bus.$emit("openLoading");
    this.getImmobileTypes();
    this.getReasonsDestinations();
    this.getUsers();

    this.$bus.$on("Sicadi::exportData", data => {
      this.setFormContractData(data);
    });

    this.$bus.$on("Termination\Contract::editTermination", () => {
      this.edit(this.$route.params.id);
    });

    this.actionRoute();
  }
};
</script>

          
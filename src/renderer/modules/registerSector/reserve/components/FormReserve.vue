<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <img :src="images.house" style="position: absolute; top: 1px;"/>
              <span style="margin-left: 35px;">FORMULÁRIO RESERVA DE IMÓVEL</span>
            </h3>

            <!-- button -->
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
                  <li v-if="form.status !== 'c' ">
                    <a href="#" @click.prevent="printRecord">Ficha Reserva</a>
                  </li>
                  <li>
                    <router-link :to="{name: 'registerSector_reserve_create'}">Nova Reserva</router-link>
                  </li>
                  <li class="divider" v-if="form.id && data_before_update.status !== 'c'"></li>
                  <li v-if="form.id && data_before_update.status !== 'c'">
                    <a href="#" @click.prevent="openModalCancelReserve">Cancelar Reserva</a>
                  </li>
                </ul>
              </div>
            </div>
            <!-- / button -->
          </div>
         
          <div class="box-body" style="padding-top: 0px;">
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2 div-160">
                <label style="font-weight: bold">CÓDIGO CRM</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.crm_code"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.crm_code') }}</div>
              </div>
            </div>


            <!-- DADOS DO IMOVEL -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO IMÓVEL</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row">
              <div class="col-md-2 div-140">
                <label>Código Imóvel</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.immobile_code"
                  @keypress.enter="queryImmobileData"
                  @keydown.tab="queryImmobileData"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.immobile_code') }}</div>
              </div>

              <div class="col-md-3">
                <label>Endereço</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.address"
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
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.neighborhood') }}</div>
              </div>

              <div class="col-md-2">
                <label>Tipo de Locação</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.type_location"
                >
                  <option value>Informe</option>
                  <option value="c">COMERCIAL</option>
                  <option value="r">RESIDENCIAL</option>
                </select>
                <div class="error">{{ validation.firstError('form.type_location') }}</div>
              </div>

              <div class="col-md-2">
                <label>Tipo do Imóvel</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.immobile_type"
                >
                  <option value>Informe</option>
                  <option
                    :value="list.type_immobile_id"
                    v-for="(list, index) in select.types_immobile"
                    :key="index"
                  >{{ list.name_type_immobile.toUpperCase() }}</option>
                </select>
                <div class="error">{{ validation.firstError('form.immobile_type') }}</div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-3 div-160">
                <label>Valor Anunciado</label>
                <money
                  class="form-control input-sm has-warning"
                  v-model="form.value"
                  autocomplete="off"
                />
                <div class="error">{{ validation.firstError('form.value') }}</div>
              </div>

              <div class="col-md-3 div-160">
                <label>Valor Negociado</label>
                <money
                  class="form-control input-sm has-warning"
                  v-model="form.value_negotiated"
                  autocomplete="off"
                />
                <div class="error">{{ validation.firstError('form.value_negotiated') }}</div>
              </div>
            </div>
            <!-- // FIM DADOS DO IMOVEL -->

            <!-- DADOS DA RESERVA -->
            <div class="row" style="margin-top: 20px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DA RESERVA</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row">
              <div class="col-md-2 div-140">
                <label>Reserva</label>
                <date-picker
                  class="form-control input-sm has-warning"
                  v-model="form.date_reserve"
                  autocomplete="off"
                />
                <div class="error">{{ validation.firstError('form.date_reserve') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Previsão</label>
                <date-picker
                  class="form-control input-sm has-warning"
                  v-model="form.prevision"
                  autocomplete="off"
                />
                <div class="error">{{ validation.firstError('form.prevision') }}</div>
              </div>

              <div class="col-md-2">
                <label>Status</label>
                <select class="form-control input-sm has-warning" v-model="form.status" :disabled="!form.id">
                  <option value="">Informe</option>
                  <option :value="list.value" v-for="list in select.status">{{ list.name }}</option>
                </select>
                <div class="error">{{ validation.firstError('form.status') }}</div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-3 col-lg-3" style="min-width: 300px;">
                <label>Responsável Cadastro</label>
                <multi-select
                  :id="'attendant_register'"
                  :setValue="form.attendant_register"
                  :dataSelect="select.users"
                  :multiple="false"
                  :search="true"
                  :maxHeight="300"
                  class="has-warning-select"
                  @value="value => form.attendant_register = value"
                />
                <div class="error">{{ validation.firstError('form.attendant_register') }}</div>
              </div>

              <div class="col-md-3 col-lg-3" style="min-width: 300px;">
                <label>Responsável Recepção</label>
                <multi-select
                  :id="'attendant_reception'"
                  :setValue="form.attendant_reception"
                  :dataSelect="select.users"
                  :multiple="false"
                  :search="true"
                  :maxHeight="300"
                  class="has-warning-select"
                  @value="value => form.attendant_reception = value"
                />
                <div class="error">{{ validation.firstError('form.attendant_reception') }}</div>
              </div>
            </div>
            <!-- // FIM DADOS DA RESERVA -->

            <!-- DADOS DO CONTRATO CELEBRADO -->
            <div class="row" style="margin-top: 20px;" v-if="showContractCelebratedData">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO CONTRATO</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row" v-if="showContractCelebratedData">
              <div class="col-md-2 div-160">
                <label>Contrato</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.contract"
                  @keypress.enter="checkContractExists"
                  @keydown.tab="checkContractExists"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.contract_data.contract') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Dt Inicio Contrato</label>
                <date-picker
                  class="form-control input-sm has-warning"
                  id="date_init_contract"
                  v-model="form.contract_data.date_init_contract"
                  autocomplete="off"
                />
                <div
                  class="error"
                >{{ validation.firstError('form.contract_data.date_init_contract') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Dt Venc Aluguel</label>
                <date-picker
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.due_date_rent"
                  autocomplete="off"
                />
                <div class="error">{{ validation.firstError('form.contract_data.due_date_rent') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Prazo(meses)</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.deadline"
                >
                  <option value>Informe</option>
                  <option :value="list.value" v-for="list in select.deadline">{{ list.name }}</option>
                </select>
                <div class="error">{{ validation.firstError('form.contract_data.deadline') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Ent. Chaves</label>
                <date-picker
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.delivery_key"
                  id="delivery_key"
                  autocomplete="off"
                />
                <div class="error">{{ validation.firstError('form.contract_data.delivery_key') }}</div>
              </div>

              <div class="col-md-2">
                <label>Desc. Fidelidade</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.loyalty_discount"
                >
                  <option value>Informe</option>
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
                <div
                  class="error"
                >{{ validation.firstError('form.contract_data.loyalty_discount') }}</div>
              </div>

              <div class="col-md-2">
                <label>Boleto</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.ticket"
                >
                  <option value>Informe</option>
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
                <div class="error">{{ validation.firstError('form.contract_data.ticket') }}</div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;" v-if="status_final">
              <div class="col-md-2">
                <label>Paga Aluguel Para Quem ?</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.observation"
                >
                  <option value>Informe</option>
                  <option value="1º aluguel">1º Aluguel</option>
                  <option value="master">Master</option>
                  <option value="master + 1">Master + 1</option>
                  <option value="particular">Particular</option>
                  <option value="other">Outros</option>
                </select>
                <div class="error">{{ validation.firstError('form.contract_data.observation') }}</div>
              </div>

              <div class="col-md-2" v-if="form.contract_data.observation === 'other'">
                <label>Outros/Informe</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.other_observation"
                  autocomplete="off"
                >
                <div
                  class="error"
                >{{ validation.firstError('form.contract_data.other_observation') }}</div>
              </div>

              <div class="col-md-3">
                <label>Cidade Origem</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.origin_city"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.contract_data.origin_city') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Estado de Origem</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.origin_state"
                >
                  <option value>Informe</option>
                  <option
                    :value="state.value"
                    v-for="(state, index) in select.states"
                    :key="index"
                  >{{ state.name }}</option>
                </select>
                <div class="error">{{ validation.firstError('form.contract_data.origin_state') }}</div>
              </div>

              <div class="col-md-2">
                <label>Finalidade</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.finality"
                >
                  <option value>Informe</option>
                  <option value="c">Comercio</option>
                  <option value="e">Estudante</option>
                  <option value="t">Trabalho</option>
                  <option value="r">Residencial</option>
                </select>
                <div class="error">{{ validation.firstError('form.contract_data.finality') }}</div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;" v-if="status_final">
              <div class="col-md-2 div-120">
                <label>Taxa Adm %</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.taxa"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.contract_data.taxa') }}</div>
              </div>

              <div class="col-md-2">
                <label>TX. Intermediaçao</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.tx_contract"
                >
                  <option value>Informe</option>
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
                <div class="error">{{ validation.firstError('form.contract_data.tx_contract') }}</div>
              </div>

              <div class="col-md-2">
                <label>Tar. Bancária</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.bank_expense"
                >
                  <option value>Informe</option>
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
                <div class="error">{{ validation.firstError('form.contract_data.bank_expense') }}</div>
              </div>
            </div>
            <!-- // FIM DADOS DO CONTRATO CELEBRADO -->

            <div class="row" style="margin-top: 20px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO CLIENTE</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row">
              <div class="col-md-2">
                <label>Tipo de Cliente</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.type_client"
                >
                  <option value="pf">Fisíca</option>
                  <option value="pj">Jurídica</option>
                </select>
                <div class="error">{{ validation.firstError('form.type_client') }}</div>
              </div>

              <div class="col-md-2" v-if="form.type_client === 'pf'">
                <label>CPF</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['###.###.###-##']"
                  placeholder="som. números"
                  v-model="form.client_cpf"
                  @keypress.enter.native="getClientData"
                  @keydown.tab.native="getClientData"
                />
                <div class="error">{{ validation.firstError('form.client_cpf') }}</div>
              </div>

              <div class="col-md-2" v-if="form.type_client === 'pj'">
                <label>CNPJ</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['##.###.###/####-##']"
                  placeholder="som. números"
                  v-model="form.client_cnpj"
                  @keypress.enter.native="getClientData"
                  @keydown.tab.native="getClientData"
                />
              </div>

              <div class="col-md-5 col-lg-3">
                <label>Nome Cliente</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.client_name"
                  autocomplete="off"
                >
                <div class="error">{{ validation.firstError('form.client_name') }}</div>
              </div>

              <div class="col-md-2" v-if="form.type_client === 'pf'">
                <label>RG</label>
                <input
                  type="text"
                  class="form-control input-sm border-warning"
                  v-model="form.client_rg"
                  autocomplete="off"
                >
              </div>
            </div>

            <div class="row" style="margin-top: 10px;" v-if="form.type_client === 'pf'">
              <div class="col-md-2">
                <label>Profissão</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.client_profession"
                  autocomplete="off"
                >
              </div>

              <div class="col-md-2">
                <label>Empresa</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.client_company"
                  autocomplete="off"
                >
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2">
                <label>CEP</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="'#####-###'"
                  v-model="form.client_zip_code"
                  @keypress.enter.native="queryZipCode"
                  placeholder="tecle enter consulta cep"
                />
              </div>

              <div class="col-md-3">
                <label>Endereço</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  id="client_address"
                  v-model="form.client_address"
                  autocomplete="off"
                >
              </div>

              <div class="col-md-2">
                <label>Bairro</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.client_neighborhood"
                  autocomplete="off"
                >
              </div>

              <div class="col-md-2">
                <label>Cidade</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.client_city"
                  autocomplete="off"
                >
              </div>

              <div class="col-md-2">
                <label>Estado</label>
                <select
                  class="form-control input-sm"
                  v-model="form.client_state"
                >
                  <option value>Informe</option>
                  <option
                    :value="state.value"
                    v-for="(state, index) in select.states"
                    :key="index"
                  >{{ state.name }}</option>
                </select>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm has-warning"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.client_phone_01"
                  placeholder="som. números"
                />
                <div class="error">{{ validation.firstError('form.client_phone_01') }}</div>
              </div>
              <div class="col-md-2">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.client_phone_02"
                  placeholder="som. números"
                />
              </div>
              <div class="col-md-2 div-180">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.client_phone_03"
                  placeholder="som. números"
                />
              </div>
              <div class="col-md-3">
                <label>Email</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.client_email"
                >
              </div>
            </div>
            <!-- ## end dados do cliente -->

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <button
                  class="button btn btn-sm btn-danger"
                  @click="submitForm"
                >
                  <span class="fa fa-check"></span>
                  Salvar Dados
                </button>
               
                <button
                  class="button btn btn-sm btn-default"
                  @click="submitForm"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--
    <historic @historic="historic => this.form.historic = historic" :disabled="blockTotal"/>
      -->
  </div>
</template>

<script>
import cpf from "gerador-validador-cpf";
import { mapActions } from "vuex";
import rulesValidation from "../mixins/rules-validator";
import dataSelect from "@/data/dataSelect";
import { dateFormat } from "@/util/dateTime";
import { getDataUserLogged } from "@/util/checkIsLogged";
import deletePrint from "@/mixins/deletePrint";
import { toUpperCase } from "@/util/string";

import data from "../data";
import dataForm from "../mixins/dataForm"
import DatePicker from "@/components/DatePicker";
import MultiSelect from "@/components/MultiSelect";
import Historic from "./HistoricReserve";

export default {
  name: "FormReserve",
  props: ["refreshForm"],
  mixins: [rulesValidation, deletePrint, dataForm],
  components: {
    DatePicker,
    MultiSelect,
    Historic
  },
  data() {
    return {
      images: {
        house: require("@/assets/icons/house.png")
      },
      data_before_update: {
        status: ""
      },
      select: {
        users: [],
        states:  dataSelect.select.states,
        status: data.select.status,
        deadline: data.select.deadline,
        types_immobile: []
      },
      status_final: false,
      confirm_end_reserve: false
    };
  },
  methods: {
    ...mapActions("AdminUser", ["getAllUsers"]),
    ...mapActions("RegisterReserve", [
      "createReserve",
      "getReserve",
      "updateReserve"
    ]),
    dateFormat,
    getDataUserLogged,
    toUpperCase,
    /**
     * Consulta os usuários cadastrados no sistema
     */
    async getUsers() {
      return this.getAllUsers()
        .then(results => {
          const usersForSelect = results.data.map(user => {
            return {
              name: `${user.name.toUpperCase()} ${user.last_name.toUpperCase()}`,
              value: user.id
            };
          });
          const collection = collect(usersForSelect);
          this.select.users = collection.sortBy("name").all();

          // retorna o proximo atendente
          if (this.$route.name === "registerSector_reserve_create") {
            this.getNextAttendance();
            const dataUserLogged = this.getDataUserLogged();
            // seta o responsável pela recepção o usuário logado no momento
            this.form.attendant_reception = dataUserLogged.id;
          }
        })
        .catch(err => {});
    },
    /**
     * Retorna o proximo atendente
     */
    getNextAttendance() {

    },
    /** Consulta os tipos de imoveis cadastrados no sistema */
    async getTypesImmobile() {
      return http.get("register-sector/reserve/query/types-immobile")
        .then(results => {
          this.select.types_immobile = results.data;
        }).catch(err => {})
    },
    /** Consulta dados do imovel pelo código */
    queryImmobileData() {
      if (this.form.immobile_code.length < 2) return;
      this.$bus.$emit("openLoading");
      const queryParams = {
        params: {
          type_query: "per_code",
          code: this.form.immobile_code
        }
      }

      http.get("register-sector/reserve/query/immobile-data", queryParams)
        .then(result => {

          const data = result.data;
          if (data.length === 1) {
            /** seta os dados direto no form */
            this.setFormData(data[0]);
          } 
          if(data.length > 1) {
            /** abre a modal para seleção do imovel  */
            this.$emit("openModalShowImmobile", data);
          }

        }).catch(err => {})
        .finally(() => setTimeout(() => this.$bus.$emit("closeLoading"), 300) )
     
    },
    /**
     * Seta os dados vindo da consulta do API(SICADI)
     */
    setFormData(data) {
      const dataForm = toUpperCase(data, ["type_location"]);
      this.form.immobile_code = dataForm.immobile_code;
      this.form.address = dataForm.address;
      this.form.neighborhood = dataForm.neighborhood;
      this.form.type_location = dataForm.type_location ? (dataForm.type_location === "re" ? "r" : "c") : "";
      this.form.immobile_type = dataForm.type_immobile_id ? dataForm.type_immobile_id : "";
      this.form.value = dataForm.value_rent;
    },
    /** Consulta os dados do cliente pelo CPF ou pelo CNPJ */
    getClientData() {
      const params = {};
      if (this.form.type_client === "pf" && cpf.validate(this.form.client_cpf)) {
        params.type_client = this.form.type_client;
        params.value = this.form.client_cpf;
      }

      if (this.form.type_client === "pj" && this.form.client_cnpj.length === 14) {
        params.type_client = this.form.type_client;
        params.value = this.form.client_cnpj;
      }

      if (params.value) {
        const queryParams = {
          params 
        }
        http.get("register-sector/reserve/query/client-data", queryParams)
          .then(result => {
            const clientData = toUpperCase(result.data, ["client_state", "type_client"]);
            if (!clientData) return;
            this.form.type_client = clientData.type_client;
            this.form.client_name = clientData.client_name;
            this.form.client_cpf = clientData.client_cpf;
            this.form.client_cnpj = clientData.client_cnpj;
            this.form.client_rg = clientData.client_rg;
            this.form.client_profession = clientData.client_profession;
            this.form.client_company = clientData.client_company;
            this.form.client_address = clientData.client_address;
            this.form.client_zip_code = clientData.client_zip_code;
            this.form.client_neighborhood = clientData.client_neighborhood;
            this.form.client_city = clientData.client_city;
            this.form.client_state = clientData.client_state;
            this.form.client_phone_01 = clientData.client_phone_01;
            this.form.client_phone_02 = clientData.client_phone_02;
            this.form.client_phone_03 = clientData.client_phone_03;
            this.form.client_email = clientData.client_email;
          })
          .catch(err => {})
      }
    },
    /** Consulta o CEP */
    queryZipCode() {
      if (this.form.client_zip_code.length !== 8) return;
      const queryParams = {
        params: {
          zip_code: this.form.client_zip_code
        }
      };

      http.get("query-zip-code", queryParams)
        .then(result => {
          const dataForm = result.data;
          this.form.client_address = dataForm.logradouro.toUpperCase();
          this.form.client_neighborhood = dataForm.bairro.toUpperCase();
          this.form.client_city = dataForm.localidade.toUpperCase();
          this.form.client_state = dataForm.uf;
          this.setFocus("client_address");
        }).catch(err => {})
    },
    /**
     * Verifica se o contrato existe no sistema
     */
    checkContractExists() {
      
    },
    setObservationData(dataEdit) {

    },
    openModalCancelReserve() {
      
    },
    /**
     * Impressão da ficha de reserva
     */
    printRecord() {
      
    },
    setFocus(id) {
      document.getElementById(id).focus();
    },
    cleanForm() {
     
    }
  },
  watch: {
    
  },
  computed: {
    showContractCelebratedData() {

      if (this.data_before_update.status === "as" || this.data_before_update.status === "ap" || this.data_before_update.status == "af") {
        return true;
      }

    }
  },
  mounted() {
    this.$bus.$emit("openLoading");

    (async () => {
      await this.getUsers();
      await this.getTypesImmobile();
      setTimeout(() => this.$bus.$emit("closeLoading"), 300);
    })()

    /** Escuta evento disparado pela modal de imoveis da API(SICADI) */
    this.$bus.$on("Sicadi::exportData", data => {
      this.setFormData(data);
    })
  }
};
</script>


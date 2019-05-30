<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary" style="margin-bottom: 5px;">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <img :src="images.house" style="position: absolute; top: 1px;">
              <span style="margin-left: 35px;">FORMULÁRIO RESERVA DE IMÓVEL</span>
            </h3>

            <!-- button -->
            <div class="pull-right">
              <button
                class="button btn btn-sm btn-danger"
                @click="submitForm"
                :disabled="blockTotalChanges"
              >
                <span class="fa fa-check"></span>
                Salvar Dados
              </button>

              <div class="btn-group">
                <button
                  type="button"
                  class="btn btn-primary btn-sm btn-flat"
                  data-toggle="dropdown"
                  v-if="form.id"
                >
                  <span class="fa fa-check-circle-o"></span>
                  Ações
                </button>
                <button
                  type="button"
                  class="btn btn-primary btn-sm btn-flat dropdown-toggle"
                  data-toggle="dropdown"
                  v-if="form.id"
                >
                  <span class="caret"></span>
                </button>
                <ul class="dropdown-menu pull-right" role="menu">
                  <li v-if="form.id">
                    <a
                      href="#"
                      @click.prevent="$emit('opeModalHistoricReserve', form.id)"
                    >Históricos da reserva</a>
                  </li>
                  <li v-if="!disabledCancelReserve">
                    <a href="#" @click.prevent="printRecord">Imprimir ficha de reserva</a>
                  </li>
                  <!--
                  <li v-if="disabledChangeContractData && form.status !== 'c' ">
                    <a href="#" @click.prevent="$emit('openModalSendEmail', form)">Envio de Emails</a>
                  </li>
                  -->
                  <li v-if="!disabledCancelReserve">
                    <a
                      href="#"
                      @click.prevent="$emit('openModalCancelReserve', form.id)"
                    >Cancelar reserva</a>
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
                  :disabled="disabledChangeContractData"
                >
              </div>
            </div>

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
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.owner_code"
                  @keypress.enter="getClientData(form.owner_code, 'owner')"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
                >
                <div class="error">{{ validation.firstError('form.owner_code') }}</div>
              </div>

              <div class="col-md-1" style="width: 30px; padding-left: 0px;; margin-top: 25px;">
                <div class="loader" v-if="loading_owner_data"></div>
                <a
                  href="#"
                  @click.prevent="getClientData(form.owner_code, 'owner')"
                  v-if="!loading_owner_data && form.owner_code"
                >
                  <img :src="images.search">
                </a>
              </div>

              <div class="col-md-4">
                <label>Nome do Proprietário</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.owner_name"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
                >
                <div class="error">{{ validation.firstError('form.owner_name') }}</div>
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
                  class="form-control input-sm has-warning"
                  v-model="form.immobile_code"
                  @keypress.enter="getImmobileData"
                  :disabled="disabledAction"
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
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
                >
                <div class="error">{{ validation.firstError('form.neighborhood') }}</div>
              </div>

              <div class="col-md-2">
                <label>Tipo de Locação</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.type_location"
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
                >
                  <option value>Informe</option>
                  <option
                    :value="list.value"
                    v-for="(list, index) in select.types_immobile"
                    :key="index"
                  >{{ list.name.toUpperCase() }}</option>
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
                  :disabled="disabledChangeContractData"
                />
                <div class="error">{{ validation.firstError('form.value') }}</div>
              </div>

              <div class="col-md-3 div-160">
                <label>Valor Negociado</label>
                <money
                  class="form-control input-sm has-warning"
                  v-model="form.value_negotiated"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
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
                  :disabled="form.id"
                />
                <div class="error">{{ validation.firstError('form.date_reserve') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Previsão</label>
                <date-picker
                  class="form-control input-sm has-warning"
                  v-model="form.prevision"
                  autocomplete="off"
                  :disabled="blockTotalChanges"
                />
                <div class="error">{{ validation.firstError('form.prevision') }}</div>
              </div>

              <div class="col-md-2">
                <label>Status</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.status"
                  :disabled="!form.id || blockTotalChanges"
                >
                  <option value>Informe</option>
                  <option :value="list.value" v-for="list in select.status">{{ list.name }}</option>
                </select>
                <div class="error">{{ validation.firstError('form.status') }}</div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-3 col-lg-3" style="min-width: 300px; padding-right: 0px">
                <label>Responsável Cadastro</label>
                <multi-select
                  :id="'attendant_register'"
                  :setValue="form.attendant_register"
                  :dataSelect="select.users"
                  :multiple="false"
                  :search="true"
                  :maxHeight="300"
                  :disable="disabledChangeContractData"
                  class="has-warning-select"
                  @value="value => form.attendant_register = value"
                />
                <div class="error">{{ validation.firstError('form.attendant_register') }}</div>
              </div>

              <div class="col-md-1" style="width: 30px; padding-left: 0px;; margin-top: 25px;">
                <a href="#" @click.prevent="$emit('openModalFluxAttendance')">
                  <img :src="images.search">
                </a>
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
                  :disable="disabledChangeContractData"
                  class="has-warning-select"
                  @value="value => form.attendant_reception = value"
                />
                <div class="error">{{ validation.firstError('form.attendant_reception') }}</div>
              </div>
            </div>
            <!-- // FIM DADOS DA RESERVA -->

            <!-- DADOS DO CONTRATO CELEBRADO -->
            <div class="row" style="margin-top: 20px;" v-if="reserveSigned">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">DADOS DO CONTRATO</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row" v-if="reserveSigned">
              <div class="col-md-2 div-160">
                <label>Código Inquilino</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.tenant_code"
                  @keypress.enter="getClientData(form.tenant_code, 'tenant')"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
                >
                <div class="error">{{ validation.firstError('form.tenant_code') }}</div>
              </div>

              <div class="col-md-1" style="width: 30px; padding-left: 0px;; margin-top: 25px;">
                <div class="loader" v-if="loading_tenant_data"></div>
                <a
                  href="#"
                  @click.prevent="getClientData(form.tenant_code, 'tenant')"
                  v-if="!loading_tenant_data && form.tenant_code"
                >
                  <img :src="images.search">
                </a>
              </div>

              <div class="col-md-4">
                <label>Nome do Inquilino</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.tenant_name"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
                >
                <div class="error">{{ validation.firstError('form.tenant_name') }}</div>
              </div>
            </div>

            <div class="row" v-if="reserveSigned" style="margin-top: 10px;">
              <div class="col-md-2 div-160">
                <label>Contrato</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.contract"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
                />
                <div class="error">{{ validation.firstError('form.contract_data.due_date_rent') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Prazo(meses)</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.deadline"
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
                />
                <div class="error">{{ validation.firstError('form.contract_data.delivery_key') }}</div>
              </div>

              <div class="col-md-2">
                <label>Desc. Fidelidade</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.loyalty_discount"
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
                >
                  <option value>Informe</option>
                  <option value="y">Sim</option>
                  <option value="n">Não</option>
                </select>
                <div class="error">{{ validation.firstError('form.contract_data.ticket') }}</div>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;" v-if="reserveSigned">
              <div class="col-md-2">
                <label>Paga Aluguel Para Quem ?</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.observation"
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
                >
                <div class="error">{{ validation.firstError('form.contract_data.origin_city') }}</div>
              </div>

              <div class="col-md-2 div-140">
                <label>Estado de Origem</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.origin_state"
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
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

            <div class="row" style="margin-top: 10px;" v-if="reserveSigned">
              <div class="col-md-2 div-120">
                <label>Taxa Adm %</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.taxa"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
                >
                <div class="error">{{ validation.firstError('form.contract_data.taxa') }}</div>
              </div>

              <div class="col-md-2">
                <label>TX. Intermediaçao</label>
                <select
                  class="form-control input-sm has-warning"
                  v-model="form.contract_data.tx_contract"
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
                />
              </div>

              <div class="col-md-5 col-lg-3">
                <label>Nome Cliente</label>
                <input
                  type="text"
                  class="form-control input-sm has-warning"
                  v-model="form.client_name"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
                >
              </div>

              <div class="col-md-2">
                <label>Empresa</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.client_company"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
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
                  placeholder="CEP + enter realiza consulta"
                  @keypress.enter.native="queryZipCode(form.client_zip_code)"
                  :disabled="disabledChangeContractData"
                />
              </div>

              <div class="col-md-1" style="width: 30px; padding-left: 0px;; margin-top: 25px;">
                <div class="loader" v-if="loading_query_zip_code_data"></div>
                <a
                  href="#"
                  @click.prevent="queryZipCode(form.client_zip_code)"
                  v-if="!loading_query_zip_code_data && form.client_zip_code"
                >
                  <img :src="images.search">
                </a>
              </div>

              <div class="col-md-3">
                <label>Endereço</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  id="client_address"
                  v-model="form.client_address"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
                >
              </div>

              <div class="col-md-2">
                <label>Bairro</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.client_neighborhood"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
                >
              </div>

              <div class="col-md-2">
                <label>Cidade</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.client_city"
                  autocomplete="off"
                  :disabled="disabledChangeContractData"
                >
              </div>

              <div class="col-md-2">
                <label>Estado</label>
                <select
                  class="form-control input-sm"
                  v-model="form.client_state"
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
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
                  :disabled="disabledChangeContractData"
                />
              </div>
              <div class="col-md-2 div-180">
                <label>Telefone</label>
                <the-mask
                  class="form-control input-sm"
                  :mask="['(##) ####-####', '(##) #####-####']"
                  v-model="form.client_phone_03"
                  placeholder="som. números"
                  :disabled="disabledChangeContractData"
                />
              </div>
              <div class="col-md-3">
                <label>Email</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.client_email"
                  :disabled="disabledChangeContractData"
                >
              </div>
            </div>
            <!-- ## end dados do cliente -->

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <button
                  class="button btn btn-sm btn-danger"
                  @click="submitForm"
                  :disabled="blockTotalChanges"
                >
                  <span class="fa fa-check"></span>
                  Salvar Dados
                </button>

                <router-link
                  :to="{name: 'registerSector_reserve_list'}"
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
import dataForm from "../mixins/data-form";
import rulesValidator from "../mixins/rules-validator";
import DatePicker from "@/components/DatePicker";
import MultiSelect from "@/components/MultiSelect";
import Required from "@/components/Required";
export default {
  name: "FormReserve",
  mixins: [dataForm, rulesValidator],
  components: { DatePicker, MultiSelect, Required }
};
</script>


<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-danger">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-sticky-note"></span>
              FORMULÁRIO ACESSÓRIOS DA LOCAÇÃO
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
                    <router-link :to="{name: 'termination_contract_list'}">Transferências no Sistema</router-link>
                  </li>
                  <li>
                    <router-link :to="{name: 'registerSector_create_transfer'}">Nova Transferência</router-link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <!-- /.box-header -->

          <div class="box-body" style="padding-top: 0px;">
            <!-- alugueis e encargos -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">ALUGUEIS E ENCARGOS DA LOCAÇÃO</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row">
              <div class="col-md-8 col-lg-8">
                <label>Multa Rescisória:</label>
                <textarea rows="2" class="form-control" v-model="form.fine_termination"></textarea>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Tipo</label>
                <select class="form-control input-sm" v-model="form.fine_termination_type_debit">
                  <option value="c">Crédito</option>
                  <option value="d">Débito</option>
                </select>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Valor</label>
                <money v-model="form.fine_termination_value_debit" class="form-control input-sm"/>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-8 col-lg-8">
                <label title="Multa Rescisoria">Condominio:</label>
                <textarea rows="2" class="form-control" v-model="form.condominium"></textarea>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Tipo</label>
                <select class="form-control input-sm" v-model="form.condominium_type_debit">
                  <option value="c">Crédito</option>
                  <option value="d">Débito</option>
                </select>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Valor</label>
                <money v-model="form.condominium_value_debit" class="form-control input-sm"/>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-10 col-lg-10">
                <label title="Cemig">Cemig:</label>
                <textarea rows="2" class="form-control" v-model="form.cemig"></textarea>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Valor</label>
                <money v-model="form.cemig_value_debit" class="form-control input-sm"/>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-10 col-lg-10">
                <label title="Cemig">Copasa:</label>
                <textarea rows="2" class="form-control" v-model="form.copasa"></textarea>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Valor</label>
                <money v-model="form.copasa_value_debit" class="form-control input-sm"/>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-8 col-lg-8">
                <label title="Iptu">IPTU:</label>
                <textarea rows="2" class="form-control" v-model="form.iptu"></textarea>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Tipo</label>
                <select class="form-control input-sm" v-model="form.iptu_type_debit">
                  <option value="c">Crédito</option>
                  <option value="d">Débito</option>
                </select>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Valor</label>
                <money v-model="form.iptu_value_debit" class="form-control input-sm"/>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-8 col-lg-8">
                <label title="Taxa de Lixo">Taxa de Lixo (a partir de 2014):</label>
                <textarea rows="2" class="form-control" v-model="form.garbage_rate"></textarea>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Tipo</label>
                <select class="form-control input-sm" v-model="form.garbage_rate_type_debit">
                  <option value="c">Crédito</option>
                  <option value="d">Débito</option>
                </select>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Valor</label>
                <money v-model="form.garbage_rate_value_debit" class="form-control input-sm"/>
              </div>
            </div>
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-8 col-lg-8">
                <label title="Pintura">Pintura:</label>
                <textarea rows="3" class="form-control" v-model="form.paint"></textarea>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Tipo</label>
                <select class="form-control input-sm" v-model="form.paint_type_debit">
                  <option value="c">Crédito</option>
                  <option value="d">Débito</option>
                </select>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Valor</label>
                <money v-model="form.paint_value_debit" class="form-control input-sm"/>
              </div>
            </div>
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-8 col-lg-8">
                <label>Pendências</label>
                <textarea rows="3" class="form-control" v-model="form.pendencies"></textarea>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Tipo</label>
                <select class="form-control input-sm" v-model="form.pendencies_type_debit">
                  <option value="c">Crédito</option>
                  <option value="d">Débito</option>
                </select>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Valor</label>
                <money v-model="form.pendencies_value_debit" class="form-control input-sm"/>
              </div>
            </div>
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-8 col-lg-8">
                <label title="Alugueis - Valor Atual" style="font-weight: bold; color: red">Alugueis - Valor Atual (conferir):</label>
                <textarea rows="6" class="form-control" v-model="form.value_rent"></textarea>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Tipo</label>
                <select class="form-control input-sm" v-model="form.value_rent_type_debit">
                  <option value="c">Crédito</option>
                  <option value="d">Débito</option>
                </select>
              </div>
              <div class="col-md-2 col-lg-2 div-160">
                <label>Valor</label>
                <money v-model="form.value_rent_value_debit" class="form-control input-sm"/>
              </div>
            </div>

            <div class="row">
              <div class="col-md-4 col-md-offset-8 col-lg-4 col-lg-offset-8">
                <button
                  type="button"
                  class="btn btn-sm btn-primary"
                  @click="calcDebit" :disabled="disabledUpdate" >Calcular Valores Lançados</button>
                <span style="font-weight: bold; margin-left: 10px;">Total:</span>
                <span :style="number_style">{{ total_debit }}</span>
              </div>
            </div>
            <!-- / alugueis e encargos  -->

            <!-- chaves e acessorios entregues -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">CHAVES E ACESSÓRIOS ENTREGUES</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2 div-140">
                <label>Chaves(Qt)</label>
                <input type="text" class="form-control input-sm" v-model="form.keys_delivery">
              </div>
              <div class="col-md-2 div-140">
                <label title="Controle de portão">C.Portão(Qt)</label>
                <input type="text" class="form-control input-sm" v-model="form.control_gate">
              </div>
              <div class="col-md-2 div-140">
                <label title="Controle do Alarme/Cerca">C.Alar/Cer(Qt)</label>
                <input type="text" class="form-control input-sm" v-model="form.control_alarm">
              </div>
              <div class="col-md-2 div-140">
                <label title="Chave Manual Portão">Ch.Man.Portão(Qt)</label>
                <input type="text" class="form-control input-sm" v-model="form.key_manual_gate">
              </div>
              <div class="col-md-2 div-140">
                <label title="Cartão de Feira">Car.Feira(Qt)</label>
                <input type="text" class="form-control input-sm" v-model="form.fair_card">
              </div>
            </div>
            <!-- / chaves e acessorios entregues -->

            <!-- informações do cliente -->
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-7">
                <span style="font-weight: bold; color: #E98531">INFORMAÇÕES DO CLIENTE</span>
                <hr style="margin-top:0px; margin-bottom: 10px;">
              </div>
            </div>
            <!-- / informações do cliente -->

            <div class="row" style="margin-top: 10px" element-loading-text="Consultando cep...">
              <div class="col-md-2">
                <label>CEP</label>

                <the-mask
                  class="form-control input-sm"
                  :mask="['#####-###']"
                  v-model="form.new_zip_code"
                  maxlength="9"
                  placeholder="som. números"
                  autocomplete="off"
                  @keypress.enter.native="queryZipCode"
                  @keydown.tab.native="queryZipCode"
                />

              </div>

              <div class="col-md-3 col-lg-3">
                <label>Endereço</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form.new_address"
                  ref="new_address"
                >
              </div>
              <div class="col-md-2 col-lg-2">
                <label>Bairro</label>
                <input type="text" class="form-control input-sm" v-model="form.new_neighborhood">
              </div>
              <div class="col-md-3 col-lg-3">
                <label>Cidade</label>
                <input type="text" class="form-control input-sm" v-model="form.new_city">
              </div>
              <div class="col-md-2 col-lg-2">
                <label>Estado</label>
                <select class="form-control input-sm" v-model="form.new_state">
                  <option value>Informe</option>
                  <option
                    :value="list.value"
                    v-for="(list, index) in select.states"
                    :key="index"
                  >{{ list.name }}</option>
                </select>
              </div>
            </div>
            <!-- / informações do cliente -->

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-primary" @click="update" :disabled="disabledUpdate">
                  <span class="fa fa-check"></span>
                  Salvar Dados
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { moneyFormat } from "../../../../util/string";
import stateSelect from "../../../../mixins/stateSelect";

export default {
  name: "FormRentAccessory",
  mixins: [stateSelect],
  data() {
    return {
      form: {
        id: null,
        termination_id: null,
        fine_termination: "",
        fine_termination_type_debit: "d",
        fine_termination_value_debit: 0,
        condominium: "",
        condominium_type_debit: "d",
        condominium_value_debit: 0,
        copasa: "",
        copasa_value_debit: 0,
        cemig: "",
        cemig_value_debit: 0,
        garbage_rate: null,
        garbage_rate_type_debit: "d",
        garbage_rate_value_debit: 0,
        iptu: "",
        iptu_type_debit: "d",
        iptu_value_debit: 0,
        pendencies: "",
        pendencies_type_debit: "d",
        pendencies_value_debit: 0,
        paint: "",
        paint_type_debit: "d",
        paint_value_debit: 0,
        value_rent: "",
        value_rent_type_debit: "d",
        value_rent_value_debit: 0,
        keys_delivery: null,
        control_gate: null,
        control_alarm: null,
        key_manual_gate: null,
        fair_card: null,
        new_zip_code: "",
        new_address: "",
        new_neighborhood: "",
        new_city: "",
        new_state: ""
      },
      number_style: {},
      total_debit: 0,
      termination_status: ""
    };
  },
  methods: {
    moneyFormat,
    calcDebit() {
      let data = {};

      data = Object.assign({}, this.form);

      if (data.fine_termination_type_debit === "d") {
        data.fine_termination_value_debit =
          data.fine_termination_value_debit * -1;
      }
      if (data.condominium_type_debit === "d") {
        data.condominium_value_debit = data.condominium_value_debit * -1;
      }
      if (data.iptu_type_debit === "d") {
        data.iptu_value_debit = data.iptu_value_debit * -1;
      }
      if (data.garbage_rate_type_debit === "d") {
        data.garbage_rate_value_debit = data.garbage_rate_value_debit * -1;
      }
      if (data.paint_type_debit === "d") {
        data.paint_value_debit = data.paint_value_debit * -1;
      }
      if (data.pendencies_type_debit === "d") {
        data.pendencies_value_debit = data.pendencies_value_debit * -1;
      }
      if (data.value_rent_type_debit === "d") {
        data.value_rent_value_debit = data.value_rent_value_debit * -1;
      }

      this.total_debit =
        data.fine_termination_value_debit +
        data.condominium_value_debit +
        data.iptu_value_debit +
        data.garbage_rate_value_debit +
        data.paint_value_debit +
        data.pendencies_value_debit +
        data.value_rent_value_debit +
        data.copasa_value_debit * -1 +
        data.cemig_value_debit * -1;

      if (this.total_debit === 0) {
        this.total_debit = "R$ " + moneyFormat(Math.abs(this.total_debit));
      }
      if (this.total_debit < 0) {
        this.number_style.color = "darkred";
        this.total_debit =
          "R$ " + moneyFormat(Math.abs(this.total_debit)) + " (d)";
      }
      if (this.total_debit > 0) {
        this.number_style.color = "darkgreen";
        this.total_debit =
          "R$ " + moneyFormat(Math.abs(this.total_debit)) + " (c)";
      }
    },
    getData() {
      this.$bus.$emit("openLoading");
      const termination_id = this.$route.params.id;
      http.get(`termination/contract/rent-accessory/${termination_id}`)
        .then(result => {
          const data = result.data.rent_accessory_data;
          this.termination_status = result.data.termination_status;
          this.edit(data);
        }).catch(err => {})
        .finally(() => setTimeout(() => this.$bus.$emit("closeLoading"), 300))
    },
    edit(data) {
      data.fine_termination_type_debit = !data.fine_termination_type_debit ? 'd' : data.fine_termination_type_debit;
      data.condominium_type_debit = !data.condominium_type_debit ? 'd' : data.condominium_type_debit;
      data.garbage_rate_type_debit = !data.garbage_rate_type_debit ? 'd' : data.garbage_rate_type_debit;
      data.iptu_type_debit = !data.iptu_type_debit ? 'd' : data.iptu_type_debit;
      data.pendencies_type_debit = !data.pendencies_type_debit ? 'd' : data.pendencies_type_debit;
      data.paint_type_debit = !data.paint_type_debit ? 'd' : data.paint_type_debit;
      data.value_rent_type_debit = !data.value_rent_type_debit ? 'd' : data.value_rent_type_debit;
      data.new_zip_code = !data.new_zip_code ? '' : data.new_zip_code;
      data.new_state = !data.new_state ? '' : data.new_state;
      data.new_address = !data.new_address ? '' : data.new_address.toUpperCase();
      data.new_city = !data.new_city ? '' : data.new_city.toUpperCase();

      data.fine_termination_value_debit = !data.fine_termination_value_debit ? 0 : data.fine_termination_value_debit;
      data.condominium_value_debit = !data.condominium_value_debit ? 0 : data.condominium_value_debit;
      data.copasa_value_debit = !data.copasa_value_debit ? 0 : data.copasa_value_debit;
      data.cemig_value_debit = !data.cemig_value_debit ? 0 : data.cemig_value_debit;
      data.garbage_rate_value_debit = !data.garbage_rate_value_debit ? 0 : data.garbage_rate_value_debit;
      data.iptu_value_debit = !data.iptu_value_debit ? 0 : data.iptu_value_debit;
      data.pendencies_value_debit = !data.pendencies_value_debit ? 0 : data.pendencies_value_debit;
      data.paint_value_debit = !data.paint_value_debit ? 0 : data.paint_value_debit;
      data.value_rent_value_debit = !data.value_rent_value_debit ? 0 : data.value_rent_value_debit;
      
      this.form = data;

      this.calcDebit();
    },
    /**
     * Salva os dados em localhost se o usuário tentar salvar os dados não for bem sucedida
     */
    preventLostData(data) {
      localStorage.setItem("prevent_lost_data", JSON.stringify(data));
    },
    /**
     * Verifica e recupera os dados não salvos
     */
    checkPreventLost(confirmCheck = true) {

      const localStorageData = JSON.parse(localStorage.getItem("prevent_lost_data"));
      
      if (localStorageData && confirmCheck) {
 
        if (localStorageData.termination_id !== parseInt(this.$route.params.id)) {return};
      
        swal({
            text: "Existem dados não salvos, deseja recuperar ?",
            closeOnClickOutside: false,
            closeOnEsc: false,
            buttons: {
              cancel: {
                text: "Cancelar",
                value: false,
                visible: true,
                className: "",
                closeModal: true,
              },
              confirm: {
                text: "Confirmar",
                value: true,
                visible: true,
                className: "",
                closeModal: true
              }
            }
            }).then((confirm) => {
              if (confirm) {
                this.form = localStorageData;
                localStorage.removeItem("prevent_lost_data");
              } else {
                localStorage.removeItem("prevent_lost_data");
                this.getData();
              }
            })

      } else {
        this.getData();
      }
    },
    /**
     * Consulta o cep
     */
    queryZipCode() {

      if (this.form.new_zip_code.length !== 8) return;

      this.$bus.$emit("openLoading");

      const queryParams = {
        params: {
          zip_code: this.form.new_zip_code
        }
      };

      http.get("query-zip-code", queryParams)
        .then(result => {
          this.form.new_address = result.data.logradouro.toUpperCase();
          this.form.new_neighborhood = result.data.bairro.toUpperCase();
          this.form.new_city = result.data.localidade.toUpperCase();
          this.form.new_state = result.data.uf;
          this.$refs.new_address.focus();

        }).catch((err) => console.log(err))
        .finally(() => this.$bus.$emit("closeLoading"))
    },
    update() {
      this.$bus.$emit("openLoading");
      http.put(`termination/contract/rent-accessory/${this.form.id}`, this.form)
        .then(result => {
          _notification.success();
          localStorage.removeItem("prevent_lost_data");
          this.getData();
        }).catch(() => {
          this.preventLostData(this.form);
        })
        .finally(() => setTimeout(() => this.$bus.$emit("closeLoading"), 300))
    }
  },
  computed: {
    disabledUpdate() {
      if (this.termination_status === "r" || this.termination_status === "j" || this.termination_status === "cej" || this.termination_status === "c") {
        return true;
      }

      return false;
    }
  },
  mounted() {
    this.checkPreventLost();
  }
};
</script>

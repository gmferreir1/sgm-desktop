<template>
  <div>
    <div id="modalSelectTypePrint" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content roundbox boxshadow">
          <!-- modal header -->
          <modal-header
            @closeModal="closeModal"
            title="SELEÇÃO DE RELATÓRIOS DIPONÍVEIS PARA IMPRESSÃO"
          />
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important">
            <div class="row">
              <div class="col-md-12">
                <label>Informe o Relatório</label>
                <select class="form-control input-sm" v-model="form.type_report">
                  <option value>Informe</option>
                  <option value="reservation_tracking">Acompanhamento de Reserva</option>
                  <option value="contract_celebrated">Contratos Celebrados</option>
                  <option value="reserve_list">Lista de Reservas</option>
                  <option
                    value="reserve_canceled"
                    v-if="show_reserve_canceled"
                  >Lista de Reservas Canceladas</option>
                </select>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;" v-if="loading_data_report">
              <div class="col-md-7">
                <!-- loader -->
                <div class="loader" style="margin-right: 100px;"></div>
                <!-- / loader -->
              </div>
            </div>

            <!-- somente para o relatorio de acompanhamento da reserva -->
            <div
              class="row"
              style="margin-top: 10px;"
              v-if="!loading_data_report && form.type_report === 'reservation_tracking' "
            >
              <div class="col-md-6">
                <label>Informe o Mês</label>
                <select class="form-control input-sm" v-model="form.month">
                  <option value>Informe</option>
                  <option value="1">Janeiro</option>
                  <option value="2">Fevereiro</option>
                  <option value="3">Março</option>
                  <option value="4">Abril</option>
                  <option value="5">Maio</option>
                  <option value="6">Junho</option>
                  <option value="7">Julho</option>
                  <option value="8">Agosto</option>
                  <option value="9">Setembro</option>
                  <option value="10">Outubro</option>
                  <option value="11">Novembro</option>
                  <option value="12">Dezembro</option>
                </select>
              </div>

              <div class="col-md-6">
                <label>Informe o Ano</label>
                <select class="form-control input-sm" v-model="form.year">
                  <option value>Informe</option>
                  <option :value="list" v-for="list in select.years">{{ list }}</option>
                </select>
              </div>
            </div>
            <!-- // somente para o relatorio de acompanhamento da reserva -->

            <!-- somente para contratos celebrados -->
            <div
              class="row"
              v-if="form.type_report === 'contract_celebrated' "
              style="margin-top: 10px;"
            >
              <div class="col-md-2 div-140">
                <label>Data Inicial</label>
                <date-picker class="form-control input-sm" v-model="form.init_date"/>
              </div>

              <div class="col-md-2 div-140">
                <label>Data Final</label>
                <date-picker class="form-control input-sm" v-model="form.end_date"/>
              </div>

              <div class="col-md-3">
                <label>Ordernar Por</label>
                <select class="form-control input-sm" v-model="form.order_by">
                  <option value>Informe</option>
                  <option value="contract">Contrato</option>
                  <option value="address">Endereço</option>
                  <option value="value_negotiated">Valor Negociado</option>
                </select>
              </div>

              <div class="col-md-3">
                <label>Tipo Ordenação</label>
                <select class="form-control input-sm" v-model="form.sort_by">
                  <option value>Informe</option>
                  <option value="asc">Ascendente</option>
                  <option value="desc">Descendente</option>
                </select>
              </div>
            </div>
            <!-- // somente para contratos celebrados -->

            <!-- somente para a lista de reservas -->
            <div class="row" v-if="form.type_report === 'reserve_list' ">
              <div class="col-md-12">
                <small>
                  <code>Atenção:</code>
                  Relatório será impresso de acordo o filtro aplicado.
                </small>
              </div>
            </div>
            <!-- // somente para a lista de reservas -->
          </div>
          <modal-footer>
            <!-- loader -->
            <div class="loader pull-right" style="margin-right: 100px;" v-if="loading"></div>
            <!-- / loader -->

            <button
              class="button btn btn-sm btn-danger"
              @click="printerReport"
              v-if="!loading"
            >Imprimir Relatório</button>
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
import DatePicker from "@/components/DatePicker";
import { dateFormat } from "@/util/dateTime";
import deletePrint from "@/mixins/deletePrint";

export default {
  name: "ModalSelectTypePrint",
  props: ["dataModal"],
  mixins: [deletePrint],
  components: {
    ModalHeader,
    ModalFooter,
    DatePicker
  },
  data() {
    return {
      loading: false,
      loading_data_report: false,
      show_reserve_canceled: false,
      form: {
        type_report: "",
        month: "",
        year: "",
        order_by: "",
        sort_by: ""
      },
      select: {
        years: []
      }
    };
  },
  methods: {
    openModal() {
      $("#modalSelectTypePrint").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    getYearsAvailableToReport() {
      this.loading_data_report = true;
      http
        .get("register-sector/reserve/query/get-years-available-to-report")
        .then(results => {
          this.select.years = results.data;
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => (this.loading_data_report = false), 300);
        });
    },
    printerReport() {
      this.loading = true;

      if (this.form.type_report === "reserve_list" || this.form.type_report === "reserve_canceled") {
        const sortData = JSON.parse(localStorage.getItem("sort"));
        this.form.filter = localStorage.getItem("filter");
        this.form.sort_by = sortData ? sortData.sort_by : "";
        this.form.sort_order = sortData ? sortData.sort_order : "";
      }

      const queryParams = {
        params: this.form
      };
      http
        .get("register-sector/reserve/printer/report", queryParams)
        .then(result => {
          const url = window.URL_API + "/" + result.data.file_name;
          this.$electron.ipcRenderer.send("printPdf", {
            url,
            file_type: "pdf"
          });

          this.deletePrint(result.data.file_and_path, false);
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.loading = false), 300));
    },
    cleanForm() {
      this.form = {
        type_report: "",
        month: "",
        year: "",
        order_by: "",
        sort_by: ""
      };
    },
    checkShowReserveCanceled() {
      this.show_reserve_canceled = false;
      const filter = JSON.parse(localStorage.getItem("filter"));

      if (filter && filter.status.length === 1 && filter.status[0] === "c") {
        this.show_reserve_canceled = true;
      }
    },
    closeModal() {
      $("#modalSelectTypePrint").modal("hide");
    }
  },
  watch: {
    dataModal() {
      this.checkShowReserveCanceled();
      this.cleanForm();
      this.openModal();
    },
    "form.type_report"() {
      if (this.form.type_report === "reservation_tracking") {
        this.getYearsAvailableToReport();
      }
    }
  }
};
</script>
<template>
<div>

  <div id="modalSelectTypeReportToPrint" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-sm">
      <div class="modal-content">

        <!-- modal header -->
        <modal-header @closeModal="closeModal" title="RELATÓRIOS DISPONÍVES PARA IMPRESSÃO" />
        <!-- / modal header -->

        <div class="modal-body" style="padding: 10px !important">
          <div class="row">
            <div class="col-md-12">
              <label>Informe o Tipo de Relatório</label>
              <select class="form-control input-sm" v-model="form.type_report">
                <option value="">Informe</option>
                <option value="monitoring_reserve">Acompanhamento de Reserva</option>
                <option value="contract_celebrated">Contratos Celebrados</option>
                <option value="reserve_list" v-if="show_reserves_list">Lista de Reservas</option>
                <option value="reserve_canceled" v-if="show_reserves_canceled">Reservas Canceladas</option>
              </select>
            </div>
          </div>

          <div class="row" style="margin-top: 10px;" v-if="form.type_report === 'contract_celebrated'">
            <div class="col-md-2 div-140">
              <label>Data Inicial</label>
              <date-picker class="form-control input-sm" v-model="form.init_date" />
            </div>

            <div class="col-md-2 div-140">
              <label>Data Final</label>
              <date-picker class="form-control input-sm" v-model="form.end_date" />
            </div>
          </div>

          <div class="row" v-if="form.type_report === 'monitoring_reserve'" style="margin-top: 10px;" >

            <div class="col-md-6">
              <label>Informe o Mês</label>
              <select class="form-control input-sm" v-model="form.month">
                <option value="">Informe</option>
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
              <label>Informe o ano</label>
              <select class="form-control input-sm" v-model="form.year">
                <option value="">Informe</option>
                <option :value="year" v-for="(year, index) in select.years_available" :key="index">{{ year }}</option>
              </select>
            </div>

          </div>
          
          <div class="row" v-if="form.type_report === 'reserve_list' || form.type_report === 'reserve_canceled' ">
            <div class="col-md-12">
              <small>
                <code>Atenção:</code>
                Relatório será impresso de acordo o filtro aplicado.</small>
            </div>
          </div>

          <div class="row" style="margin-top: 10px;">
            <div class="col-md-12">

               <!-- loader -->
              <div class="loader pull-left" v-if="loading"></div>
              <!-- / loader -->

              <button class="button btn btn-sm btn-primary" 
                @click="printerReport"
                :disabled="!form.type_report || form.type_report === 'monitoring_reserve' && !form.mounth && !form.year"
                v-if="!loading">Imprimir Relatório
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
import ModalHeader from "../../../../components/ModalHeader";
import DatePicker from "../../../../components/DatePicker";
import deletePrint from "../../../../mixins/deletePrint";

export default {
  name: "ModalClientData",
  mixins:[ deletePrint ],
  components: {
    ModalHeader,
    DatePicker
  },
  data() {
    return {
      loading: false,
      form: {
        type_report: "",
        init_date: moment().startOf("month").format("DD/MM/YYYY"),
        end_date: moment().endOf("month").format("DD/MM/YYYY"),
        month: "",
        year: ""
      },
      select: {
        years_available: []
      },
      show_reserves_list: false,
      show_reserves_canceled: false,
    }
  },
  methods: {
    openModal() {
      $('#modalSelectTypeReportToPrint').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    getYearsAvailableToReport() {
      http.get("register/query/years-available-for-report")
        .then(results => {
          this.select.years_available = results.data;
        }).catch(err => {})
    },
    printerReport() {
      this.loading = true;

      let filter = {};
      const filterLocalStorage = JSON.parse(localStorage.getItem("filter"));

      if (this.form.type_report === "reserve_list" || this.form.type_report === "reserve_canceled") {
        filter = { ...filterLocalStorage }
        filter.type_report = this.form.type_report;
      } else { 
        filter = { ...this.form }
      }

      const queryParams = {
        params: filter
      };

      http.get("register/printer/reserve/report", queryParams)
        .then(result => {
          const url = window.URL_API + "/" + result.data.file_name;
          this.$electron.ipcRenderer.send("printPdf", { url, file_type: "pdf" });
          //window.open(url);
          setTimeout(() => this.loading = false, 300);
          //pergunta se a impressão foi feita corretamente para remover
          this.deletePrint(result.data.file_and_path, false);
        }).catch(err => this.loading = false)
    },
    cleanForm() {
      this.form = {
        type_report: "",
        init_date: moment().startOf("month").format("DD/MM/YYYY"),
        end_date: moment().endOf("month").format("DD/MM/YYYY"),
        month: "",
        year: ""
      }
    },
    closeModal() {
      $('#modalSelectTypeReportToPrint').modal('hide')
    }
  },
  watch: {
    "form.type_report" () {
      if (this.form.type_report === "monitoring_reserve") {
        this.getYearsAvailableToReport();
      }
    }
  },
  mounted() {
    this.$bus.$on("Register\Reserve::openModalSelectPrint", _ => {

      // vefifica o filtro selecioanado pelo usuário se tem reservas canceladas
      const filter = JSON.parse(localStorage.getItem("filter"));

      if (filter) {
        this.show_reserves_list = true;
      }

      if (filter && filter.status.length) {
        const check = window._.find(filter.status, status => status === "c");
        if (check) {
          this.show_reserves_canceled = true;
        }
      }

      this.openModal();
    })
  }
}
</script>

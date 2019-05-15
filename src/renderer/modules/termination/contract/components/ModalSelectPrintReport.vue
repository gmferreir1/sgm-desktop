<template>
  <div>
    <div id="modalSelectPrintReport" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="SELEÇÃO PARA IMPRESSÃO DE RELATÓRIO"/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important">
            <div class="row">
              <div class="col-md-8">
                <label>Informe o Tipo do Relatório</label>
                <select class="form-control input-sm" v-model="type_report">
                  <option value>Informe</option>
                  <option value="owner_name">Com o Nome do Proprietário</option>
                  <option value="tenant_name">Com o Nome do Inquilino</option>
                </select>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <!-- loader -->
                <div class="loader" style="float: left" v-if="loading"></div>
                <!-- / loader -->

                <button
                  class="button btn btn-sm btn-primary"
                  :disabled="!type_report"
                  @click="printer" v-if="!loading">Gerar Impressão</button>
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
import Editor from "../../../../components/Editor";
import deletePrint from "../../../../mixins/deletePrint";

export default {
  name: "ModalSelectPrintReport",
  props: ["dataModal"],
  mixins: [ deletePrint ],
  components: {
    ModalHeader,
    Editor
  },
  data() {
    return {
      type_report: "",
      filter: {},
      loading: false
    };
  },
  methods: {
    openModal() {
      $("#modalSelectPrintReport").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    printer() {
      this.loading = true;

      this.filter.type_report = this.type_report;
      this.filter.print = true;
      const queryParams = {
        params: { ...this.filter }
      };

      http
        .get("termination/contract", queryParams)
        .then(result => {
          const url = window.URL_API + "/" + result.data.file_name;
           this.$electron.ipcRenderer.send("printPdf", url);
          //window.open(url);
          this.deletePrint(result.data.file_and_path);
        })
        .finally(() => setTimeout(() => (this.loading = false), 300));
    },
    closeModal() {
      $("#modalSelectPrintReport").modal("hide");
    }
  },
  watch: {
    dataModal() {
      this.openModal();
      this.filter = { ...this.dataModal.filter };
    }
  }
};
</script>


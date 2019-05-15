<template>
  <div>
    <div id="modalHistoric" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="AÇÕES E HISTÓRICOS DA RESCISÃO"/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important">
            <div class="row">
              <div class="col-md-12">
                <div class="box box-danger">
                  <div class="box-header with-border" style="padding-top: 3px">
                    <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
                      <span class="fa fa-list"></span>
                      AÇÕES E HISTÓRICOS
                    </h3>
                  </div>
                  <!-- /.box-header -->

                  <div class="box-body" style="padding-top: 0px; padding-bottom: 0px">
                    <!-- editor -->
                    <div class="row">
                      <div class="col-md-12">
                        <editor @textEditor="text => historic = text" :setText="historic" :disable="disabledUpdate"/>
                      </div>
                    </div>
                    <div class="row" style="margin-top: 10px;">
                      <div class="col-md-12">
                        <div class="loader" v-if="in_process" style="float:left"></div>

                        <button
                          class="button btn btn-sm btn-primary"
                          @click="create"
                          :disabled="disabledUpdate"
                          v-if="!in_process"
                        >
                          <span class="fa fa-check"></span>
                          Salvar Dados
                        </button>
                      </div>
                    </div>
                    <!-- /editor -->

                    <!-- loader -->
                    <div class="loader" v-if="loading"></div>
                    <!-- / loader -->

                    <!-- table -->
                    <div class="table-responsive tableFixHead" v-if="!loading">
                      <table class="table table-condensed table-hover" style="margin-top: 10px;">
                        <thead>
                          <tr>
                            <th>Histórico</th>
                            <th style="width: 100px">Responsável</th>
                            <th style="width: 120px" class="text-left">Data/Hota</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr v-for="(list, index) in data_list.data" :key="index">
                            <td v-html="list.text" class="historic_list">{{ list.text }}</td>
                            <td
                              :title="`${list.responsibleData.name.toUpperCase()} ${list.responsibleData.last_name.toUpperCase()}`"
                            >{{ list.responsibleData.name.toUpperCase() }}</td>
                            <td>{{ dateFormat(list.created_at, "DD/MM/YYYY HH:mm") }}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    <!-- / table -->
                  </div>
                </div>
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
import { dateFormat } from "../../../../util/dateTime";

export default {
  name: "ModalHistoic",
  props: ["dataModal"],
  components: {
    ModalHeader,
    Editor
  },
  data() {
    return {
      loading: true,
      data_list: {
        data: []
      },
      historic: "",
      termination_id: null,
      in_process: false,
      termination_status: ""
    };
  },
  methods: {
    dateFormat,
    openModal() {
      $("#modalHistoric").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    getData() {
      http
        .get(`termination/contract/historic/${this.termination_id}`)
        .then(results => {
          this.data_list.data = results.data.historic_data;
          this.termination_status = results.data.termination_status;
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.loading = false), 300));
    },
    create() {
      if (this.historic.length < 2) return;
      this.in_process = true;
      const data = {
        text: this.historic,
        id_register: this.termination_id
      };

      http
        .post("termination/contract/historic", data)
        .then(result => {
          _notification.success();
          this.historic = "";
          this.getData();
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.in_process = false), 300));
    },
    closeModal() {
      $("#modalHistoric").modal("hide");
    }
  },
  computed: {
    disabledUpdate() {
      if (
        this.termination_status === "r" ||
        this.termination_status === "j" ||
        this.termination_status === "cej" ||
        this.termination_status === "c"
      ) {
        return true;
      }

      return false;
    }
  },
  mounted() {
    this.$bus.$on("TerminationContract::openModalHistoric", termination_id => {
      this.loading = true;
      this.termination_id = termination_id;
      this.getData();
      this.openModal();
    });
  }
};
</script>

<style scoped>
.tableFixHead {
  overflow-y: auto;
  max-height: calc(100vh - 440px) !important;
}
</style>


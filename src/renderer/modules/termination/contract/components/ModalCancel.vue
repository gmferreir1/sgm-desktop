<template>
  <div>
    <div id="modalCancel" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="CANCELAMENTO DA RESCISÃO"/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important">
            <div class="row">
              <div class="col-md-12">
                <div class="box box-danger" style="padding: 5px; margin-bottom: 5px">
                  <div class="row" style="margin-top: 10px;">
                    <div class="col-md-12">
                      <label>Informe o Motivo do Cancelamento</label>
                      <textarea class="form-control" rows="5" v-model="reason"></textarea>
                    </div>
                  </div>

                  <div class="row" style="margin-top: 10px; margin-bottom: 5px;">
                    <div class="col-md-12">
                      <div class="loader" v-if="in_process" style="float:left"></div>
                      <button
                        class="button btn btn-sm btn-primary"
                        v-if="!in_process"
                        @click="submitData"
                        :disabled="reason.length < 5"
                      >
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
      </div>
    </div>
  </div>
</template>

<script>
import ModalHeader from "../../../../components/ModalHeader";
import Editor from "../../../../components/Editor";

export default {
  name: "ModalHistoic",
  props: ["dataModal"],
  components: {
    ModalHeader,
    Editor
  },
  data() {
    return {
      termination_id: null,
      reason: "",
      in_process: false
    };
  },
  methods: {
    openModal() {
      $("#modalCancel").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    submitData() {
      this.in_process = true;

      http
        .put(`termination/contract/cancel/${this.termination_id}`, {
          reason: this.reason
        })
        .then(result => {
          _notification.success();
          this.$bus.$emit("TerminationContract::editTermination");
          setTimeout(() => this.closeModal(), 300);
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.in_process = false), 300));
    },
    closeModal() {
      $("#modalCancel").modal("hide");
    }
  },
  mounted() {
    this.$bus.$on("TerminationContract::openModalCancel", termination_id => {
      this.termination_id = termination_id;
      this.openModal();
    });
  }
};
</script>


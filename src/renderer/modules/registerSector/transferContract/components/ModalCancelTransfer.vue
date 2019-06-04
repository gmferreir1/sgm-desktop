<template>
  <div>
    <div id="modalCancelTransfer" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content roundbox boxshadow">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="CANCELAMENTO DA TRANSFERÊNCIA"/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important">
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <label>Observações extra (não obrigatório)</label>
                <textarea
                  class="form-control"
                  cols="4"
                  rows="10"
                  v-model="form.observation"
                  placeholder="Digite aqui as informações adicionais"
                ></textarea>
              </div>
            </div>
          </div>
          <modal-footer>
            <!-- loader -->
            <div class="loader pull-right" style="margin-right: 100px;" v-if="loading"></div>
            <!-- / loader -->

            <button
              class="button btn btn-sm btn-danger"
              @click="cancelTransfer"
              v-if="!loading"
            >Salvar Dados</button>
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
import Editor from "@/components/Editor";
import NotFound from "@/components/NotFound";
import { dateFormat } from "@/util/dateTime";

export default {
  name: "ModalCancelTransfer",
  props: ["dataModal"],
  components: {
    ModalHeader,
    ModalFooter
  },
  data() {
    return {
      loading: false,
      form: {
        observation: ""
      }
    };
  },
  methods: {
    dateFormat,
    openModal() {
      $("#modalCancelTransfer").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    cancelTransfer() {
      this.loading = true;
      http
        .put(
          `register-sector/transfer-contract/${
            this.dataModal.transfer_id
          }/cancel-transfer`,
          this.form
        )
        .then(result => {
          _notification.success();
          this.$emit("refreshDataTransfer");
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
            this.closeModal();
          }, 400);
        });
    },
    cleanForm() {
      this.form = {
        observation: ""
      };
    },
    closeModal() {
      $("#modalCancelTransfer").modal("hide");
    }
  },
  watch: {
    dataModal() {
      this.cleanForm();
      this.openModal();
    }
  }
};
</script>


<style scoped>
.historic_list {
  text-transform: none !important;
}
</style>

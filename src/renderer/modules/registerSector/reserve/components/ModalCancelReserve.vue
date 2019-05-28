<template>
  <div>
    <div id="modalCancelReserve" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content roundbox boxshadow">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="CANCELAMENTO DA RESERVA"/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important">
            <div class="row" v-if="loading_reasons_cancel">
              <div class="col-md-12">
                <!-- loader -->
                <div class="loader"></div>
                <!-- / loader -->
              </div>
            </div>
            <div class="row" v-if="!loading_reasons_cancel">
              <div class="col-md-12">
                <label>Informe o motivo (obrigatório)</label>
                <select class="form-control input-sm has-warning" v-model="form.id_reason_cancel">
                  <option value>Informe</option>
                  <option
                    :value="list.id"
                    v-for="list in select.reasons"
                  >{{ list.reason.toUpperCase() }}</option>
                </select>
              </div>
            </div>
            <div class="row" style="margin-top: 10px;" v-if="!loading_reasons_cancel">
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
              @click="cancelReserve"
              :disabled="!form.id_reason_cancel"
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
  name: "ModalCancelReserve",
  props: ["dataModal"],
  components: {
    ModalHeader,
    ModalFooter
  },
  data() {
    return {
      loading: false,
      loading_reasons_cancel: true,
      form: {
        id_reason_cancel: "",
        observation: ""
      },
      select: {
        reasons: []
      }
    };
  },
  methods: {
    dateFormat,
    openModal() {
      $("#modalCancelReserve").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    /** Busca os motivos de cancelamento da reserva */
    getReasonsCancel() {
      http
        .get("register-sector/reserve/query/reasons-cancel")
        .then(results => {
          this.select.reasons = results.data;
        })
        .catch(err => {})
        .finally(() =>
          setTimeout(() => (this.loading_reasons_cancel = false), 300)
        );
    },
    cancelReserve() {
      this.loading = true;
      http
        .put(
          `register-sector/reserve/${this.dataModal.reserve_id}/cancel-reserve`,
          this.form
        )
        .then(result => {
          _notification.success();
          this.$emit("refreshDataReserve");
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
        id_reason_cancel: "",
        observation: ""
      };
    },
    closeModal() {
      $("#modalCancelReserve").modal("hide");
    }
  },
  watch: {
    dataModal() {
      this.loading_reasons_cancel = true;
      this.cleanForm();
      this.openModal();
      this.getReasonsCancel();
    }
  }
};
</script>


<style scoped>
.historic_list {
  text-transform: none !important;
}
</style>

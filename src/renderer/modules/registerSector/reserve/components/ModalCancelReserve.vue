<template>
  <div>
    <div id="modalCancelReserve" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-md">
        <div class="modal-content">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" :title="title_modal"/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 10px !important">
            <div class="row">
              <div class="col-md-12">
                <label>Informe o motivo pelo qual deseja cancelar a reserva</label>
                <select class="form-control input-sm has-warning" v-model="form.id_reason_cancel">
                  <option value>Informe</option>
                  <option
                    :value="list.id"
                    v-for="(list, index) in reasons_cancel"
                    :key="index"
                  >{{ list.reason.toUpperCase() }}</option>
                </select>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <label>Alguma observação (opcional)</label>
                <textarea
                  class="form-control input-sm"
                  rows="5"
                  v-model="form.observation"
                  :disabled="!form.id_reason_cancel"
                ></textarea>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <button
                  class="button btn btn-sm btn-danger"
                  :disabled="!form.id_reason_cancel"
                  @click="cancelReserve"
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
</template>

<script>
import ModalHeader from "../../../../components/ModalHeader";
import { mapActions } from "vuex";

export default {
  name: "ModalClientData",
  props: ["dataModal"],
  components: {
    ModalHeader
  },
  data() {
    return {
      reasons_cancel: [],
      reserve_data: {},
      title_modal: "",
      form: {
        id_reason_cancel: "",
        observation: ""
      }
    };
  },
  methods: {
    ...mapActions("Reason", ["getAllReasons"]),
    openModal() {
      $("#modalCancelReserve").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    getAllReasonsCancel() {
      const queryParams = {
        params: {
          module_name: "register_reserve",
          type_reason: "reason_cancel_contract"
        }
      };

      this.getAllReasons(queryParams)
        .then(results => {
          this.reasons_cancel = results.data;
        })
        .catch(err => {});
    },
    cancelReserve() {
      this.$bus.$emit("openLoading");
      http
        .put(
          `register/reserve/cancel-reserve/${this.reserve_data.id}`,
          this.form
        )
        .then(result => {
          _notification.success();
          this.$emit("updateFormReserve");
          this.closeModal();
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    closeModal() {
      $("#modalCancelReserve").modal("hide");
    }
  },
  watch: {
    dataModal() {
      this.form = {
        id_reason_cancel: "",
        observation: ""
      };

      this.reserve_data = this.dataModal.data;
      this.title_modal = `CANCELAMENTO DA RESERVA ${this.reserve_data.code_reserve}/${this.reserve_data.year_reserve}`;
      this.getAllReasonsCancel();
      this.openModal();
    }
  }
};
</script>

<style scoped>
tbody > tr > td {
  text-transform: uppercase !important;
}
</style>

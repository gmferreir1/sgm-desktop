<template>
  <div>
    <div id="modalActionContractSelected" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content roundbox boxshadow">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="AÇÕES PARA ITENS SELECIONADOS"/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important">
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2 div-140">
                <p>Status Geral</p>
                <!-- Rounded switch -->
                <label class="switch">
                  <input type="checkbox" v-model="form.status_general" disabled>
                  <span class="slider round"></span>
                </label>
              </div>

              <div class="col-md-2 div-140">
                <p>Status IPTU</p>
                <!-- Rounded switch -->
                <label class="switch">
                  <input type="checkbox" v-model="form.status_iptu">
                  <span class="slider round"></span>
                </label>
              </div>

              <div class="col-md-2 div-140">
                <p>Status TCRS</p>
                <!-- Rounded switch -->
                <label class="switch">
                  <input type="checkbox" v-model="form.status_tcrs">
                  <span class="slider round"></span>
                </label>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <!-- loader -->
                <div class="loader pull-left" v-if="loading"></div>
                <!-- / loader -->

                <button
                  class="button btn btn-sm btn-danger"
                  @click="saveData"
                  v-if="!loading"
                >Salvar Alterações Selecionadas</button>
              </div>
            </div>
          </div>

          <modal-footer>
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

export default {
  name: "ModalActionContractSelected",
  props: ["dataModal"],
  components: {
    ModalHeader,
    ModalFooter
  },
  data() {
    return {
      loading: false,
      form: {
        status_general: false,
        status_iptu: false,
        status_tcrs: false
      }
    };
  },
  methods: {
    openModal() {
      $("#modalActionContractSelected").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    saveData() {
      this.loading = true;
      const data_checked = this.dataModal.data_checked;
      const data_update = {
        data_checked,
        status_selected: this.form
      };

      http
        .put("finance/contract-celebrated/update-multiple/status", data_update)
        .then(results => {
          this.$emit("refreshListContractCelebrated");
          _notification.success();
          this.closeModal();
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => (this.loading = false), 300);
        });
    },
    cleanForm() {
      this.form = {
        status_general: false,
        status_iptu: false,
        status_tcrs: false
      };
    },
    closeModal() {
      $("#modalActionContractSelected").modal("hide");
    }
  },
  watch: {
    dataModal() {
      this.cleanForm();
      this.openModal();
    },
    "form.status_iptu"() {
      if (this.form.status_iptu && this.form.status_tcrs) {
        this.form.status_general = true;
      }
      if (!this.form.status_iptu || !this.form.status_tcrs) {
        this.form.status_general = false;
      }
    },
    "form.status_tcrs"() {
      if (this.form.status_iptu && this.form.status_tcrs) {
        this.form.status_general = true;
      }
      if (!this.form.status_iptu || !this.form.status_tcrs) {
        this.form.status_general = false;
      }
    }
  }
};
</script>

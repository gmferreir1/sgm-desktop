<template>
  <div>
    <div id="modalFluxAttendance" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content roundbox boxshadow">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="FLUXO DE ATENDIMENTO"/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important">
            <div class="row" v-if="loading">
              <div class="col-md-6 col-md-offset-3">
                <div class="loader"></div>
              </div>
            </div>

            <div class="row" v-if="!loading">
              <div class="col-md-12">
                <div class="table-responsive tableFixHead">
                  <table
                    class="table table-condensed table-hover"
                    style="margin-top: 5px; margin-bottom: 0px"
                  >
                    <thead>
                      <tr>
                        <th>Nome</th>
                        <th>Score</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="list in data_list.data">
                        <td>{{ `${list.userData.name} ${list.userData.last_name}` }}</td>
                        <td>{{ list.score }}</td>
                        <td>
                          <a
                            href="#"
                            @click.prevent="setAttendantRegisterSector(list)"
                            class="pull-right"
                          >
                            <img
                              :src="icons.check"
                              height="20"
                              width="20"
                              style="margin-right: 10px;"
                            >
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
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
import NotFound from "@/components/NotFound";

export default {
  name: "ModalFluxAttendance",
  props: ["dataModal"],
  components: {
    ModalHeader,
    ModalFooter
  },
  data() {
    return {
      loading: true,
      icons: {
        check: require("@/assets/icons/check.png")
      },
      data_list: {
        data: []
      }
    };
  },
  methods: {
    openModal() {
      $("#modalFluxAttendance").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    getData() {
      const queryParams = {
        params: {
          module_name: this.dataModal.module_name
        }
      };

      http
        .get("admin/flux-attendance/get-next-attendance", queryParams)
        .then(results => {
          this.data_list.data = results.data;
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.loading = false), 300));
    },
    setAttendantRegisterSector(scoreData) {
      this.$bus.$emit("setAttendantRegisterSector", scoreData);
      this.closeModal();
    },
    closeModal() {
      $("#modalFluxAttendance").modal("hide");
    }
  },
  watch: {
    dataModal() {
      this.loading = true;
      this.getData();
      this.openModal();
    }
  }
};
</script>

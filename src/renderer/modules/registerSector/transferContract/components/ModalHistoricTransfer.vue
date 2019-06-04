<template>
  <div>
    <div id="modalHistoricTransfer" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-xl">
        <div class="modal-content roundbox boxshadow">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="HISTÓRICOS DA TRANSFERÊNCIA"/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important">
            <!-- Editor -->
            <div class="row">
              <div class="col-md-12">
                <editor @textEditor="text => historic = text"/>
              </div>
            </div>
            <!-- / Editor -->

            <!-- not found component -->
            <div class="row" v-if="!data_list.data.length && !loading" style="margin-top: 10px;">
              <div class="col-md-6 col-md-offset-5">
                <not-found/>
              </div>
            </div>
            <!-- / end not found component -->

            <!-- loader -->
            <div class="loader" v-if="loading"></div>
            <!-- / loader -->

            <!-- table -->
            <div
              class="table-responsive tableFixHead"
              v-if="data_list.data.length"
              v-show="!loading"
            >
              <table class="table table-condensed table-hover historic" style="margin-top: 5px;">
                <thead>
                  <tr>
                    <th style="width: 70%">Histórico</th>
                    <th style="width: 15%">Responsável</th>
                    <th style="width: 15%;">Data</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(list, index) in data_list.data" :key="index">
                    <td style="width: 70%" v-html="list.text" class="historic_list"></td>
                    <td
                      :title="`${list.responsibleData.name.toUpperCase()} ${list.responsibleData.last_name.toUpperCase()}`"
                      style="width: 15%; text-transform: uppercase"
                    >{{ list.responsibleData.name }}</td>
                    <td style="width: 15%">{{ dateFormat(list.created_at, "DD/MM/YYYY HH:mm:ss") }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <modal-footer>
            <!-- loader -->
            <div class="loader pull-right" style="margin-right: 100px;" v-if="loading_create"></div>
            <!-- / loader -->

            <button
              class="button btn btn-sm btn-danger"
              @click="create"
              :disabled="historic.length < 3"
              v-if="!loading_create"
            >Salvar Dados</button>
            <button
              class="button btn btn-sm btn-default"
              @click="closeModal"
              v-if="!loading_create"
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
  name: "ModalHistoricTransfer",
  props: ["dataModal"],
  components: {
    ModalHeader,
    ModalFooter,
    Editor,
    NotFound
  },
  data() {
    return {
      loading: true,
      loading_create: false,
      historic: "",
      data_list: {
        data: []
      }
    };
  },
  methods: {
    dateFormat,
    openModal() {
      $("#modalHistoricTransfer").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    getData() {
      http
        .get(
          `register-sector/transfer-contract/historic/${
            this.dataModal.transfer_id
          }`
        )
        .then(results => {
          this.data_list.data = results.data;
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.loading = false), 300));
    },
    create() {
      this.loading_create = true;

      const data = {
        text: this.historic,
        id_register: this.dataModal.transfer_id
      };

      http
        .post("register-sector/transfer-contract/historic", data)
        .then(result => {
          this.$bus.$emit("cleanHistoric");
          this.loading = true;
          this.getData();
          _notification.success();
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.loading_create = false), 300));
    },
    closeModal() {
      $("#modalHistoricTransfer").modal("hide");
    }
  },
  watch: {
    dataModal() {
      console.log(this.dataModal)
      this.loading = true;
      this.$bus.$emit("cleanHistoric");
      this.openModal();
      this.getData();
    }
  }
};
</script>


<style scoped>
.historic_list {
  text-transform: none !important;
}
</style>

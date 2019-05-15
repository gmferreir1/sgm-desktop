<template>
<div>

  <div id="modalShowImmobile" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-md">
      <div class="modal-content">

        <!-- modal header -->
        <modal-header @closeModal="closeModal" title="LISTA DE IMOVEIS API EXTERNA" />
        <!-- / modal header -->

        <div class="modal-body" style="padding: 5px !important">

          <!-- not found component -->
          <div class="row" v-if="!data_list.data.length && !loading">
            <div class="col-md-6 col-md-offset-5">
              <not-found />
            </div>
          </div>
          <!-- / end not found component -->

          <!-- loader -->
          <div class="loader" v-if="loading"></div>
          <!-- / loader -->

          <!-- table -->
          <div class="table-responsive tableFixHead" v-if="data_list.data.length" v-show="!loading">

            <table class="table table-condensed table-hover" style="margin-top: 5px;">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Endereço</th>
                  <th>Tipo de Imóvel</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>

                <tr v-for="(list, index) in data_list.data" :key="index">
                  <td>{{ list.immobile_data ? list.immobile_data.immobile_code : list.immobile_code }}</td>
                  <td>{{ list.immobile_data ? `${list.immobile_data.address} ${list.immobile_data.neighborhood}` : `${list.address} ${list.neighborhood}` }}</td>
                  <td>{{ list.immobile_data ? list.immobile_data.type_immobile_name : list.type_immobile }}</td>
                  <td>
                    <a href="#" @click.prevent="exportData(list)" style="margin-left: 10px;">
                      <span class="fa fa-file" style="font-size: 16px"></span>
                    </a>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  </div>

</div>
</template>

<script>
import ModalHeader from "../../components/ModalHeader";
import NotFound from "../../components/NotFound";

export default {
  name: "ModalShowImmobile",
  props: ["dataModal"],
  components: {
    ModalHeader,
    NotFound
  },
  data() {
    return {
      loading: true,
      data_list: {
        data: []
      }
    }
  },
  methods: {
    openModal() {
      $('#modalShowImmobile').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    setTableData() {
      this.data_list.data = this.dataModal.data;
      setTimeout(() => this.loading = false, 1000);
    },
    exportData(data) {
      this.$bus.$emit("Sicadi::exportData", data);
      this.closeModal();
    },
    closeModal() {
      $('#modalShowImmobile').modal('hide')
    }
  },
  watch: {
    dataModal() {
      this.data_list.data = [];
      this.loading = true;
      this.openModal();
      this.setTableData();
    }
  }
}
</script>
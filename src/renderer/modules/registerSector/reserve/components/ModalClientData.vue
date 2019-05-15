<template>
<div>

  <div id="modalClientData" class="modal" tabindex="-1" role="dialog">
    <div class="modal-dialog modal-md">
      <div class="modal-content">

        <!-- modal header -->
        <modal-header @closeModal="closeModal" title="DADOS DO CLIENTE" />
        <!-- / modal header -->

        <div class="modal-body" style="padding: 5px !important">

          <div class="row">
            <div class="col-md-12">
              <span>Os seguintes dados do cliente foram encontrados no sistema.</span>
              <span>Caso deseja importar os dados clique no </span> <code>NOME</code>
              <span> do cliente</span>
            </div>
          </div>

          <!-- table -->
          <div class="table-responsive tableFixHead">

            <table class="table table-condensed table-hover" style="margin-top: 5px;" v-if="data_list.data.length">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Endereço</th>
                  <th>CPF</th>
                </tr>
              </thead>
              <tbody>

                <tr v-for="(list, index) in data_list.data" :key="index">
                  <td>
                    <a href="#" @click.prevent="exportClientData(list)">{{ list.client_name }}</a>
                  </td>
                  <td>
                    <span v-if="!list.client_address"> - </span>
                    <span v-else>{{ `${list.client_address} ${list.client_neighborhood}` }}</span>
                  </td>
                  <td>{{ list.client_cpf }}</td>
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
import ModalHeader from "../../../../components/ModalHeader";

export default {
  name: "ModalClientData",
  components: {
    ModalHeader
  },
  data() {
    return {
      data_list: {
        data: []
      }
    }
  },
  methods: {
    openModal() {
      $('#modalClientData').modal({
        keyboard: false,
        backdrop: 'static'
      })
    },
    exportClientData(data) {
      this.$bus.$emit("Register\Reserve::exportClientData", data);
      this.closeModal();
    },
    closeModal() {
      $('#modalClientData').modal('hide')
    }
  },
  mounted() {

    this.$bus.$on("Register\Reserve::openModalClientData", data => {
      this.data_list.data = [ data ] ;
      this.openModal();
    })
    
  }
}
</script>

<style scoped>
tbody>tr>td {
  text-transform: uppercase !important;
}
</style>

<template>
  <div>
    <div class="box box-danger">
      <div class="box-header">
        <h3 class="box-title box-title-up">
          Lista de Contratos Arquivados ( {{ data_list.data.length }} )
        </h3>
      </div>
      <!-- /.box-header -->
      <div class="box-body" style="padding-top: 0px;">
        <!-- not found component -->
        <div class="row" v-if="!data_list.data.length && !loading">
          <div class="col-md-6 col-md-offset-5">
            <not-found/>
          </div>
        </div>
        <!-- / end not found component -->
        <!-- loader -->
        <div class="loader" v-if="loading"></div>
        <!-- / loader -->
        
        <!-- table -->
        <div class="table-responsive tableFixHead" v-if="data_list.data.length && !loading">
          <table class="table table-condensed table-hover" style="margin-top: 5px;">
            <thead>
              <tr>
                <th>Contrato</th>
                <th>Rescisão</th>
                <th>Caixa</th>
                <th>Arquivo</th>
                <th>Status</th>
                <th>Ano</th>
                <th>Tipo</th>
                <th>Responsável</th>
                <th>Arquivamento</th> 
                <th class="text-center">-</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(list, index) in data_list.data" :key="index">
                <td class="text-center"></td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- / end table -->
      </div>
    </div>
  </div>
</template>

<script>
import NotFound from "../../../../components/NotFound";
import { dateFormat } from "../../../../util/dateTime";

export default {
  name: "TableListDeadFile",
  props: ["search"],
  components: { NotFound },
  data() {
    return {
      loading: false,
      data_list: {
        data: [{}]
      }
    };
  },
  methods: {
    dateFormat,
    getData() {
      http.get("termination/dead-file")
        .then(results => {
          this.data_list.data = results.data;
        }).finally(() => setTimeout(() => this.loading = false, 300))
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
tbody > tr > td {
  text-transform: uppercase !important;
}
</style>



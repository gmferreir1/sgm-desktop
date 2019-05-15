<template>
<div>

  <div class="box box-danger">
    <div class="box-header">
      <h3 class="box-title box-title-up">Lista de Tabelas Atualizadas ( {{ data_list.data.length }} )</h3>
    </div>
    <!-- /.box-header -->
    <div class="box-body" style="padding-top: 0px;">

      <!-- not found component -->
      <div class="row" v-if="!data_list.data.length">
        <div class="col-md-6 col-md-offset-5">
          <not-found />
        </div>
      </div>
      <!-- / end not found component -->

      <!-- table -->
      <div class="table-responsive tableFixHead" v-if="data_list.data.length">

        <table class="table table-condensed table-hover" style="margin-top: 5px;">
          <thead>
            <tr>
              <th>Nome da Tabela</th>
              <th>Status</th>
              <th>Data Atualização</th>
              <th>Responsável</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="(list, index) in data_list.data" :key="index">
              <td>{{ list.table_name }}</td>
              <td>{{ getStatus(list.status) }}</td>
              <td>{{ dateFormat(list.date, "DD/MM/YYYY HH:mm:ss") }}</td>
              <td>{{ `${list.responsibleData.name} ${list.responsibleData.last_name}` }}</td>
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
import {
  dateFormat
} from "../../../../util/dateTime"

export default {
  name: "TableListControlUpdate",
  components: {
    NotFound
  },
  data() {
    return {
      data_list: {
        data: []
      }
    }
  },
  methods: {
    dateFormat,
    getData() {
      http.get("admin/update-database/show-tables-updated")
        .then(results => {
          this.data_list.data = results.data;
          setTimeout(() => this.$bus.$emit("closeLoading"), 300)
        }).catch(err => this.$bus.$emit("closeLoading"))
    },
    getStatus(status) {
      if (status === "updating") {
        return "atualizando";
      }
      if (status === "updated") {
        return "atualizado";
      }
      if (status === "fail") {
        return "falha";
      }
    }
  },
  mounted() {
    this.$bus.$emit("openLoading");
    this.getData();
    this.$bus.$on("SystemAdmin\UpdateDb::refreshTableControlUpdate", () => this.getData())
  }
}
</script>

<style scoped>
tbody>tr>td {
  text-transform: uppercase !important;
}
</style>

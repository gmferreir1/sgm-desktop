<template>
<div>
  <div class="box box-danger">
    <div class="box-header">
      <h3 class="box-title box-title-up">Lista de Ações do Sistema ( {{ data_list.data.length }} )</h3>
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
              <th>Ação</th>
              <th>Modulo</th>
              <th>Responsável</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="(list, index) in data_list.data" :key="index">

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

export default {
  name: "TableListSystemActions",
  components: {
    NotFound
  },
  data() {
    return {
      data_list: {
        data: []
      },
      filter: {
        input: ""
      }
    }
  },
  methods: {
    getData() {
      const queryParams = {
        params: { ...this.filter
        }
      }
      http.get("admin/system-action", queryParams)
        .then(results => {
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        }).catch(err => this.$bus.$emit("closeLoading"))
    }
  },
  mounted() {
    this.$bus.$emit("openLoading");
    this.getData();

    this.$bus.$on("SystemAdmin\SystemAction::searchActions", filter => {
      this.$bus.$emit("openLoading");
      this.filter = filter;
      this.getData();
    })
  }
}
</script>

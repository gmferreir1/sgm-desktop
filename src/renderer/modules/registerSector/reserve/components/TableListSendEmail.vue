<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-danger">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-send"></span>
              CONTROLE DE EMAILS ENVIADOS
            </h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="padding-top: 0px;">
            <!-- loader -->
            <div class="loader" v-if="loading"></div>
            <!-- / loader -->

            <div class="row" style="margin-top: 10px;" v-if="!data_list.data.length && !loading">
              <div class="col-md-6 col-md-offset-5">
                <not-found/>
              </div>
            </div>

            <!-- table -->
            <div class="table-responsive tableFixHead" v-if="data_list.data.length && !loading">
              <table class="table table-condensed table-hover" style="margin-top: 5px;">
                <thead>
                  <tr>
                    <th>Tipo de Email</th>
                    <th>Responsável Pelo Envio</th>
                    <th>Data/Hora</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="( list, index ) in data_list.data" :key="index">
                    <td>{{ list.type_email_for_search }}</td>
                    <td>{{ `${list.responsibleData.name} ${list.responsibleData.last_name}` }}</td>
                    <td>{{ dateFormat(list.created_at, "DD/MM/YYYY HH:mm:ss") }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <!-- / end table -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dateFormat } from "../../../../util/dateTime";
import NotFound from "../../../../components//NotFound";

export default {
  name: "TableListSendEmail",
  components: {
    NotFound
  },
  props: ["dataComponent"],
  data() {
    return {
      loading: true,
      data_list: {
        data: []
      }
    };
  },
  methods: {
    dateFormat
  },
  watch: {
    dataComponent() {
      this.data_list.data = this.dataComponent.data;
      setTimeout(() => this.loading = false, 300);
    }
  },
  mounted() {
    this.loading = true;
  }
};
</script>

<style scoped>
tbody > tr > td {
  text-transform: uppercase !important;
}
</style>



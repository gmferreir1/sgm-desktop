<template>
  <div>
    <div class="box box-danger">
      <div class="box-header">
        <h3 class="box-title box-title-up">Lista de Motivos ( {{ data_list.data.length }} )</h3>
      </div>
      <!-- /.box-header -->
      <div class="box-body" style="padding-top: 0px;">
        <!-- not found component -->
        <div class="row" v-if="!data_list.data.length">
          <div class="col-md-6 col-md-offset-5">
            <not-found/>
          </div>
        </div>
        <!-- / end not found component -->

        <!-- table -->
        <div class="table-responsive tableFixHead" v-if="data_list.data.length">
          <table class="table table-condensed table-hover" style="margin-top: 5px;">
            <thead>
              <tr>
                <th>Motivo</th>
                <th>Tipo</th>
                <th>Modulo</th>
                <th>Responsável</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(list, index) in data_list.data" :key="index">
                <td>{{ list.reason }}</td>
                <td>{{ getTypeReason(list.type_reason) }}</td>
                <td>{{ getModuleName(list.module_name) }}</td>
                <td>{{ `${list.responsibleData.name} ${list.responsibleData.last_name}` }}</td>
                <td>
                  <a href="#" @click.prevent="edit(list)">
                    <span class="fa fa-pencil" style="font-size: 16px; color: red"></span>
                  </a>
                </td>
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
import { mapActions, mapState } from "vuex";
import sort from "../../../../mixins/sort";

export default {
  name: "TableListReasonCancel",
  components: {
    NotFound
  },
  mixins: [sort],
  data() {
    return {
      data_list: {
        data: []
      }
    };
  },
  methods: {
    ...mapActions("Reason", ["getAllReasons"]),
    getData() {
      this.getAllReasons()
        .then(results => {})
        .catch(err => {});
    },
    getModuleName(module) {
      if (module === "register_reserve") return "cadastro reserva";
      if (module === "transfer_contract") return "transf. contrato";
      if (module === "termination_contract") return "inativação de contrato";
    },
    edit(data) {
      this.$emit("edit", data);
    },
    getTypeReason(type) {
      if (type === "reason_cancel_contract") return "cancelamento contrato";
      if (type === "transfer_contract") return "transferencia de contrato";
      if (type === "reason") return "motivo para inativação";
      if (type === "destination") return "destino para inativação";
    }
  },
  computed: {
    ...mapState("Reason", ["reasons"])
  },
  watch: {
    reasons() {
      this.data_list.data = this.reasons;
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

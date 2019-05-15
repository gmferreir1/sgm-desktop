<template>
  <div>
    <div class="box box-danger">
      <div class="box-header">
        <h3
          class="box-title box-title-up"
        >Lista de Fluxos de Atendimento ( {{ data_list.data.length }} )</h3>
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
                <th>Usuário</th>
                <th>Score</th>
                <th>Modulo</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(list, index) in data_list.data" :key="index">
                <td>{{ list.user_name }}</td>
                <td>{{ list.score }}</td>
                <td>{{ getModuleName(list.module_name) }}</td>
                <td>
                  <a href="#" @click.prevent="edit(list)">
                    <span class="fa fa-pencil" style="font-size: 16px; color: red"></span>
                  </a>

                  <a href="#" @click.prevent="confirmRemove(list.id)" style="margin-left: 10px;">
                    <span class="fa fa-trash" style="font-size: 16px; color: red"></span>
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
import systemConfirm from "../../../../mixins/systemConfirm.js";

export default {
  name: "TableListFluxAttendance",
  components: {
    NotFound
  },
  mixins: [sort, systemConfirm],
  data() {
    return {
      data_list: {
        data: []
      }
    };
  },
  methods: {
    ...mapActions("FluxAttendance", ["getAllFlux", "removeFlux"]),
    getData() {
      this.getAllFlux()
        .then(results => {
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    getModuleName(module) {
      if (module === "register_reserve") {
        return "cadastro reserva";
      }
      if (module === "register_transfer") {
        return "transferência de contrato";
      }
      if (module === "termination_contract") {
        return "rescisão de contrato";
      }
    },
    confirmRemove(id) {
      this.confirm("Tem certeza que deseja remover o lançamento ?").then(
        confirm => {
          if (confirm) {
            this.remove(id);
          }
        }
      );
    },
    remove(id) {
      this.$bus.$emit("openLoading");
      this.removeFlux(id)
        .then(_ => {
          _notfication.success();
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    edit(data) {
      this.$emit("edit", data);
    }
  },
  computed: {
    ...mapState("FluxAttendance", ["flux_attendance"])
  },
  watch: {
    flux_attendance() {
      this.data_list.data = this.flux_attendance.map(data => {
        return {
          id: data.id,
          module_name: data.module_name,
          score: data.score,
          rp_last_action: data.rp_last_action,
          user_name: `${data.userData.name} ${data.userData.last_name}`,
          user: data.user
        };
      });
      this.sort("name", "asc");
    }
  },
  mounted() {
    this.$bus.$emit("openLoading");
    this.getData();
  }
};
</script>

<style scoped>
tbody > tr > td {
  text-transform: uppercase !important;
}
</style>

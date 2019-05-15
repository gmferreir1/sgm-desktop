<template>
  <div>
    <div class="box box-danger">
      <div class="box-header">
        <h3 class="box-title box-title-up">
          Lista de Inativações no Sistema ( {{ data_list.data.length }} ) - R$ {{ moneyFormat(total) }}
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
                <th>#</th>
                <th>Resp</th>
                <th>Contrato</th>
                <th>Tipo</th>
                <th>Locatário</th>
                <th>R/T</th>
                <th>Entrega</th>
                <th class="hidden-md">Aluguel</th>
                <th>Motivo</th>
                <th>Status</th>
                <th>Fim</th>
                <th class="text-center">TMP</th>
                <th class="text-center">-</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(list, index) in data_list.data" :key="index">
                <td>{{ list.id }}</td>
                <td>{{ list.responsibleTerminationData.name }}</td>
                <td>{{ list.contract }}</td>
                <td>{{ list.typeImmobileData.name_type_immobile }}</td>
                <td :title="list.tenant_name.toUpperCase()">{{ strLimit(list.tenant_name, 15) }}</td>
                <td>{{ list.type_register === "termination" ? "rescisão" : "transferência" }}</td>
                <td>{{ dateFormat(list.termination_date, "DD/MM/YYYY") }}</td>
                <td class="hidden-md">R$ {{ moneyFormat(list.value) }}</td>
                <td
                  :title="list.reasonTerminationData.reason.toUpperCase()"
                >{{ strLimit(list.reasonTerminationData.reason, 15) }}</td>
                <td>{{ getStatus(list.status) }}</td>
                <td>{{ list.end_process ? dateFormat(list.end_process, "DD/MM/YYYY") : " - " }}</td>
                <td class="text-center">{{ diffDays(list.termination_date, list.end_process) }}</td>
                <td class="text-center">
                  <router-link :to="{name: 'termination_contract_edit', params: { id: list.id } }">
                    <span
                      class="fa fa-pencil"
                      style="font-size: 16px; color: red; margin-left: 10px;"
                    ></span>
                  </router-link>

                  <a href="#" @click.prevent="$emit('openModalArchiveProcess', list)">
                    <span
                      class="fa fa-archive"
                      style="font-size: 16px; color: #40364D; margin-left: 10px;"
                    ></span>
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
import sort from "../../../../mixins/sort";
import { dateFormat, diffDays } from "../../../../util/dateTime";
import { moneyFormat, strLimit } from "../../../../util/string";

export default {
  name: "TableListTermination",
  props: ["search"],
  components: { NotFound },
  mixins: [sort],
  data() {
    return {
      loading: true,
      data_list: {
        data: []
      },
      filter: {},
      total: 0
    };
  },
  methods: {
    dateFormat,
    moneyFormat,
    diffDays,
    strLimit,
    getData() {
      
      const queryParams = {
        params: { ...this.filter }
      }

      http
        .get("termination/contract", queryParams)
        .then(results => {
          this.data_list.data = results.data;
          this.getTotal();
          setTimeout(() => (this.loading = false), 300);
        })
        .catch(err => {})
        .finally(() =>  setTimeout(() => this.loading = false, 300));
    },
    getStatus(status) {
      if (status === "p") return "pendente";
      if (status === "r") return "resolvido";
      if (status === "a") return "acordo";
      if (status === "j") return "justiça";
      if (status === "cej") return "cb.ext.just";
      if (status === "c") return "cancelado";
    },
    getTotal() {
      const collection = collect(this.data_list.data);
      this.total = collection.sum("value");
    }
  },
  beforeDestroy() {
    const routeName = this.$route.name;

    if (
      routeName !== "termination_contract_list" &&
      routeName !== "termination_contract_create" &&
      routeName !== "termination_contract_edit" &&
      routeName !== "termination_contract_rent_accessory"
    ) {
      localStorage.removeItem("sort");
      localStorage.removeItem("filter");
    }
  },
  watch: {
    search() {
      this.loading = true;
      this.filter = { ...this.search.filter }
      this.getData();
    }
  }
};
</script>

<style scoped>
tbody > tr > td {
  text-transform: uppercase !important;
}
</style>



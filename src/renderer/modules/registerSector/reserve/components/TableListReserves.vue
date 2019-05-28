<template>
  <div>
    <!-- painel de resultados -->
    <panel-results :totalQuantity="total_quantity"/>
    <!-- / painel de resultados -->

    <!-- painel de pesquisa -->
    <panel-search
      @search="getData"
      @openModalSelectTypePrint="$emit('openModalSelectTypePrint')"
      :searching="loading"
      :perPage="per_page"
    />
    <!-- / painel de pesquisa -->

    <div class="box box-primary">
      <div class="box-header">
        <h3 class="box-title box-title-up">Lista de Reservas ( {{ data_list.total }} resultados)</h3>
        <select
          class="form-control input-sm div-140"
          style="position: absolute; top: 2px; right: 20px;"
          v-model="per_page"
        >
          <option value="100">100 resultados</option>
          <option value="200">200 resultados</option>
          <option value="300">300 resultados</option>
          <option value="500">500 resultados</option>
        </select>
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
          <table
            class="table table-condensed table-hover"
            style="margin-top: 5px; margin-bottom: 0px"
          >
            <thead>
              <tr>
                <th class="hidden-md">
                  <a
                    href="#"
                    @click.prevent="sort('code_reserve', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'code_reserve' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'code_reserve'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Reserva
                  </a>
                </th>
                <th>
                  <a
                    href="#"
                    @click.prevent="sort('immobile_code', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'immobile_code' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'immobile_code'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Código
                  </a>
                </th>
                <th class="hidden-md">
                  <a
                    href="#"
                    @click.prevent="sort('contract', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'contract' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'contract'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Contrato
                  </a>
                </th>
                <th title="Data da reserva">
                  <a
                    href="#"
                    @click.prevent="sort('date_reserve', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'date_reserve' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'date_reserve'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Reserva
                  </a>
                </th>
                <th>
                  <a
                    href="#"
                    @click.prevent="sort('value_negotiated', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'value_negotiated' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'value_negotiated'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    VR.Neg
                  </a>
                </th>
                <th>
                  <a
                    href="#"
                    @click.prevent="sort('client_name', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'client_name' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'client_name'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Cliente
                  </a>
                </th>
                <th>
                  <a
                    href="#"
                    @click.prevent="sort('prevision', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'prevision' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'prevision'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Previsão
                  </a>
                </th>
                <th>
                  <a
                    href="#"
                    @click.prevent="sort('status', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'status' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'status'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Status
                  </a>
                </th>
                <th>Cadastro</th>
                <th>Recepção</th>
                <th>
                  <a
                    href="#"
                    @click.prevent="sort('conclusion', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'conclusion' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'conclusion'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Conclusão
                  </a>
                </th>
                <th>Tempo</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="list in data_list.data">
                <td class="hidden-md">{{ `${list.code_reserve}/${list.year_reserve}` }}</td>
                <td>{{ list.immobile_code }}</td>
                <td class="hidden-md">{{ !list.contract ? " - " : list.contract }}</td>
                <td>{{ dateFormat(list.date_reserve) }}</td>
                <td>R$ {{ moneyFormat(list.value_negotiated) }}</td>
                <td :title="list.client_name.toUpperCase()">
                  <span class="hidden-md">{{ list.client_name }}</span>
                  <span class="hidden-lg">{{ strLimit(list.client_name, 10) }}</span>
                </td>
                <td>{{ dateFormat(list.prevision) }}</td>
                <td>{{ getStatusName(list.status) }}</td>
                <td>{{ list.attendantRegisterData.name }}</td>
                <td>{{ list.attendantReceptionData.name }}</td>
                <td>{{ list.conclusion ? dateFormat(list.conclusion, "DD/MM/YYYY") : " - " }}</td>
                <td>{{diffDays(list.date_reserve, list.conclusion)}} d</td>
                <td>
                  <router-link
                    title="Editar"
                    :to="{name: 'registerSector_reserve_edit', params: { id: list.id } }"
                  >
                    <img :src="icons.edit" height="20" width="20">
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <paginate
          v-show="!loading && data_list.data.length"
          v-model="data_list.page"
          :page-count="data_list.lastPage"
          :click-handler="paginate"
          :prev-text="'Anterior'"
          :next-text="'Proxima'"
          :container-class="'pagination'"
        ></paginate>
        <!-- / end table -->
      </div>
    </div>
  </div>
</template>

<script>
import sort from "@/mixins/sort";
import { dateFormat, diffDays } from "@/util/dateTime";
import { moneyFormat, strLimit } from "@/util/string";

import NotFound from "@/components/NotFound";
import PanelResults from "./PanelResults";
import PanelSearch from "./PanelSearch";

export default {
  name: "TableListReserves",
  mixins: [sort],
  components: {
    NotFound,
    PanelResults,
    PanelSearch
  },
  data() {
    return {
      loading: false,
      per_page: "100",
      data_list: {
        data: [],
        lastPage: 0,
        page: 1
      },
      total_quantity: {},
      icons: {
        edit: require("@/assets/icons/edit.png")
      }
    };
  },
  methods: {
    dateFormat,
    moneyFormat,
    diffDays,
    strLimit,
    getData() {
      this.loading = true;

      const filter = localStorage.getItem("filter");
      const page = !JSON.parse(localStorage.getItem("paginate"))
        ? 1
        : JSON.parse(localStorage.getItem("paginate")).page;

      const queryParams = {
        params: {
          page,
          filter
        }
      };

      http
        .get("register-sector/reserve", queryParams)
        .then(results => {
          this.data_list = results.data.list;
          this.data_list.page = results.data.list.page;
          this.data_list.lastPage = results.data.list.lastPage;
          this.total_quantity = results.data.quantity;
          this.sort("code_reserve", "desc");
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.loading = false), 300));
    },
    getStatusName(status) {
      if (status === "r") return "reserva";
      if (status === "d") return "documentação";
      if (status === "a") return "analise";
      if (status === "cd") return "cadastro";
      if (status === "p") return "pendente";
      if (status === "as") return "assinado";
      if (status === "ap") return "assinado c/ pend";
      if (status === "af") return "ativ. finais";
      if (status === "c") return "cancelado";
    },
    paginate(page) {
      localStorage.setItem("paginate", JSON.stringify({ page }));
      this.getData(page);
    }
  },
  mounted() {
    const filterStorage = JSON.parse(localStorage.getItem("filter"));
    this.per_page = !filterStorage ? "100" : filterStorage.per_page;
  }
};
</script>

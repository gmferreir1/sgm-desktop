<template>
  <div>
    <!-- painel de pesquisa -->
    <panel-search
      @search="paginate"
      @openModalSelectTypePrint="$emit('openModalSelectTypePrint')"
      :searching="loading"
      :loadingPrinter="loading_printer"
      :perPage="per_page"
    />
    <!-- / painel de pesquisa-->

    <div class="box box-primary">
      <div class="box-header" v-if="!loading && data_list.data.length">
        <h3
          class="box-title box-title-up"
        >Lista de Contratos Celebrados ( {{ !data_list.total ? 0 : data_list.total }} resultados)</h3>

        <button
          class="button btn btn-sm btn-primary"
          style="position: absolute; top: 3px; right: 170px;"
          v-if="data_checked.length"
          @click="$emit('openModalActionSelected', data_checked)"
        >
          <span class="fa fa-check"></span>
          Ações com selecionados
        </button>

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
        <div class="row" v-if="!data_list.data.length && !loading" style="margin-top: 10px;">
          <div class="col-md-6 col-md-offset-5">
            <not-found/>
          </div>
        </div>
        <!-- / end not found component -->
        <!-- loader -->
        <div class="loader" v-if="loading" style="margin-top: 10px;"></div>
        <!-- / loader -->
        <!-- table -->
        <div class="table-responsive tableFixHead" v-if="!loading && data_list.data.length">
          <table
            class="table table-condensed table-hover"
            style="margin-top: 5px; margin-bottom: 0px"
          >
            <thead>
              <tr>
                <th>
                  <input type="checkbox" v-model="check_all">
                </th>
                <th>
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
                <th>
                  <a
                    href="#"
                    @click.prevent="sort('address', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'address' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'address'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Endereço
                  </a>
                </th>
                <th>
                  <a
                    href="#"
                    @click.prevent="sort('neighborhood', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'neighborhood' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'neighborhood'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Bairro
                  </a>
                </th>
                <th>Proprietário</th>
                <th>
                  <a
                    href="#"
                    @click.prevent="sort('delivery_key', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                    title="Data da entrega das chaves"
                  >
                    <span v-if="data_sort.sort_by === 'delivery_key' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'delivery_key'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Ent. Chaves
                  </a>
                </th>
                <th class="text-center">Status</th>
                <th class="text-center">Iptu</th>
                <th class="text-center">TCRS</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="( list, index ) in data_list.data">
                <td>
                  <input type="checkbox" v-model="data_checked" :value="list.id">
                </td>
                <td>
                  <span class="label label-danger" v-if="!list.opened">novo</span>
                  {{ list.contract }}
                </td>
                <td>{{ list.immobile_code }}</td>
                <td>{{ list.address }}</td>
                <td>{{ list.neighborhood }}</td>
                <td>{{ list.owner_name }}</td>
                <td>{{ dateFormat(list.delivery_key, "DD/MM/YYYY") }}</td>
                <td class="text-center">
                  <span
                    :class="{ error: list.status_general === 'p', success: list.status_general === 'r' }"
                  >{{ list.status_general }}</span>
                </td>
                <td class="text-center">
                  <span
                    :class="{ error: list.status_iptu === 'p', success: list.status_iptu === 'r' }"
                  >{{ list.status_iptu }}</span>
                </td>
                <td class="text-center">
                  <span
                    :class="{ error: list.status_tcrs === 'p', success: list.status_tcrs === 'r' }"
                  >{{ list.status_tcrs }}</span>
                </td>

                <td>
                  <router-link
                    title="Editar"
                    :to="{name: 'finance_contract_celebrated_edit', params: { id: list.id } }"
                  >
                    <img :src="icons.edit" height="20" width="20">
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <paginate
          v-show="data_list.data.length && !loading"
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
import PanelSearch from "./PanelSearch";

export default {
  name: "TableListContractCelebrated",
  props: ["refreshList"],
  mixins: [sort],
  components: {
    NotFound,
    PanelSearch
  },
  data() {
    return {
      loading: false,
      loading_printer: false,
      per_page: "100",
      check_all: false,
      data_checked: [],
      data_list: {
        data: [],
        lastPage: 0,
        page: 1,
        total: 0
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

      const paginate = JSON.parse(localStorage.getItem("paginate"));
      const filter = localStorage.getItem("filter");
      let sort = localStorage.getItem("sort");

      const queryParams = {
        params: {
          page: paginate.page,
          filter,
          sort
        }
      };

      http
        .get("finance/contract-celebrated", queryParams)
        .then(results => {
          this.data_list = results.data;
          this.data_checked = [];
          if (!sort) {
            this.sort("delivery_key", "desc");
          } else {
            sort = JSON.parse(sort);
            this.sort(sort.sort_by, sort.sort_order);
          }
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
          }, 300);
        });
    },
    paginate(page) {
      localStorage.setItem("paginate", JSON.stringify({ page }));
      this.getData(page);
    }
  },
  watch: {
    check_all() {
      if (this.check_all) {
        this.data_checked = this.data_list.data.map(value => value.id);
      } else {
        this.data_checked = [];
      }
    },
    refreshList() {
      this.getData();
    }
  },
  mounted() {
    const filterStorage = JSON.parse(localStorage.getItem("filter"));
    this.per_page = !filterStorage ? "100" : filterStorage.per_page;
  }
};
</script>

<style scoped>
</style>

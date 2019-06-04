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
        >Lista de Transferências ( {{ !data_list.total ? 0 : data_list.total }} resultados)</h3>
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
                  <a
                    href="#"
                    @click.prevent="sort('transfer_date', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'transfer_date' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'transfer_date'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Transferência
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
                    @click.prevent="sort('value', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'value' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'value'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Valor
                  </a>
                </th>
                <th>
                  <a
                    href="#"
                    @click.prevent="sort('requester_name', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'requester_name' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'requester_name'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      ></i>
                    </span>
                    <span v-else>
                      <i class="fa fa-sort" aria-hidden="true"></i>
                    </span>
                    Solicitante
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
                <th>Motivo</th>
                <th>Responsável</th>
                <th>Fim</th>
                <th>Duração</th>
                <th>-</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="list in data_list.data">
                <td>{{ dateFormat(list.transfer_date, "DD/MM/YYYY") }}</td>
                <td>{{ list.immobile_code }}</td>
                <td>{{ list.contract }}</td>
                <td>R$ {{ moneyFormat(list.value) }}</td>
                <td>{{ list.requester_name }}</td>
                <td>{{ getStatusName(list.status) }}</td>
                <td>{{ list.reasonTransfer.reason }}</td>
                <td>{{ list.responsibleTransfer.name }}</td>
                <td>{{ list.end_process ? dateFormat(list.end_process, "DD/MM/YYYY") : " - " }}</td>
                <td>{{ diffDays(list.transfer_date, list.end_process) }} (D)</td>
                <td>
                  <router-link
                    title="Editar"
                    :to="{name: 'registerSector_transfer_contract_edit', params: { id: list.id } }"
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
import deletePrint from "@/mixins/deletePrint";
import { dateFormat, diffDays } from "@/util/dateTime";
import { moneyFormat, strLimit } from "@/util/string";

import NotFound from "@/components/NotFound";
import PanelSearch from "./PanelSearch";

export default {
  name: "TableListReserves",
  mixins: [sort, deletePrint],
  components: {
    NotFound,
    PanelSearch
  },
  data() {
    return {
      loading: true,
      loading_printer: false,
      per_page: "100",
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
      const filter = localStorage.getItem("filter");
      const sort = localStorage.getItem("sort");
      const page = !JSON.parse(localStorage.getItem("paginate"))
        ? 1
        : JSON.parse(localStorage.getItem("paginate")).page;
      const queryParams = {
        params: { filter, sort, page }
      };

      const printer = JSON.parse(filter).print;

      this.loading = printer ? false : true;
      if (printer) {
        this.loading_printer = true;
      }

      http
        .get("register-sector/transfer-contract", queryParams)
        .then(results => {
          if (JSON.parse(filter).print) {
            const url = window.URL_API + "/" + results.data.file_name;
            this.$electron.ipcRenderer.send("printPdf", {
              url,
              file_type: "pdf"
            });

            this.deletePrint(results.data.file_and_path, false);
            return;
          }

          this.data_list.data = results.data.data;
          this.data_list.total = results.data.total;
          this.data_list.page = results.data.page;
          this.data_list.lastPage = results.data.lastPage;

          const sort = JSON.parse(localStorage.getItem("sort"));
          if (!sort) {
            this.sort("transfer_date", "desc");
          } else {
            this.sort(sort.sort_by, sort.sort_order);
          }
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading = false;
            this.loading_printer = false;
          }, 300);
        });
    },
    getStatusName(status) {
      if (status === "p") {
        return "pendente";
      }
      if (status === "r") {
        return "resolvido";
      }
      if (status === "c") {
        return "cancelado";
      }
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

<template>
  <div>

    <!-- painel de resultados -->
    <panel-results />
    <!-- / painel de resultados -->

    <!-- painel de pesquisa -->
    <panel-search />
    <!-- / painel de pesquisa -->

    <div class="box box-primary">
      <div class="box-header">
        <h3
          class="box-title box-title-up"
        >Lista de Reservas no Sistema ( {{ data_list.data.length }} )</h3>
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
              <tr></tr>
            </tbody>
          </table>
        </div>
        <!-- / end table -->
      </div>
    </div>
  </div>
</template>

<script>
import sort from "@/mixins/sort";

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
      data_list: {
        data: [{}]
      }
    };
  }
};
</script>

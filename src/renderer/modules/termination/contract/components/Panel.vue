<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-danger">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-search"></span>
              <span>PAINEL DE PESQUISA</span>
            </h3>
          </div>
          <!-- /.box-header -->

          <div class="box-body" style="padding-top: 0px;">
            <div class="row">
              <div class="col-md-3">
                <label>Pesquisa</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="filter.input"
                  @keypress.enter="search"
                >
              </div>

              <div class="col-md-3 col-lg-3" style="padding-right: 0px">
                <label>Tipo de Registro</label>
                <multi-select
                  :id="'type_register'"
                  :dataSelect="select.type_register"
                  :setValue="filter.type_register"
                  @value="value => filter.type_register = value"
                />
              </div>

              <div class="col-md-2 col-lg-2" style="padding-left: 0px; padding-right: 0px">
                <label>Status</label>
                <multi-select
                  :id="'status'"
                  :dataSelect="select.status"
                  :setValue="filter.status"
                  @value="value => filter.status = value"
                />
              </div>

              <div class="col-md-4 col-lg-4" style="padding-left: 0px;">
                <label>Responsável</label>
                <multi-select
                  :id="'responsible'"
                  :setValue="filter.responsible"
                  :dataSelect="select.responsibles"
                  @value="value => filter.responsible = value"
                />
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-3 div-160">
                <label>Inicial</label>
                <date-picker class="form-control input-sm" v-model="filter.init_date"/>
              </div>

              <div class="col-md-3 div-160">
                <label>Inicial</label>
                <date-picker class="form-control input-sm" v-model="filter.end_date"/>
              </div>

              <div class="col-md-3">
                <label>Pesquisa por</label>
                <select class="form-control input-sm" v-model="filter.type_search">
                  <option value="termination_date">Data Inativação</option>
                  <option value="end_process">Conclusão</option>
                </select>
              </div>

              <div class="col-md-4" style="margin-top: 24px;">
                <button class="button btn btn-sm btn-default" @click="search">
                  <span class="fa fa-search"></span>
                  Pesquisar Dados
                </button>

                <div class="btn-group">
                  <button
                    type="button"
                    class="btn btn-primary btn-sm btn-flat"
                    data-toggle="dropdown"
                  >
                    <span class="fa fa-check-circle-o"></span>
                    Ações
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary btn-sm btn-flat dropdown-toggle"
                    data-toggle="dropdown"
                  >
                    <span class="caret"></span>
                  </button>
                  <ul class="dropdown-menu" role="menu">
                    <li>
                      <router-link :to="{name: 'termination_contract_create'}">Nova Inativação</router-link>
                    </li>
                    <li class="divider"></li>
                    <li>
                      <a href="#" @click.prevent="openModalPrintReport">Imprimir Relatório</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
//import Multiselect from "vue-multiselect";
import DatePicker from "../../../../components/DatePicker";
import MultiSelect from "../../../../components/MultiSelect";

export default {
  name: "Panel",
  components: { MultiSelect, DatePicker },
  data() {
    return {
      filter: {
        input: "",
        type_register: [],
        status: [],
        responsible: [],
        init_date: "",
        end_date: "",
        type_search: "termination_date"
      },
      select: {
        status: [
          {
            name: "PENDENTE",
            value: "p"
          },
          {
            name: "RESOLVIDO",
            value: "r"
          },
          {
            name: "ACORDO",
            value: "a"
          },
          {
            name: "JUSTIÇA",
            value: "j"
          },
          {
            name: "COB.EXT.JUD",
            value: "cej"
          },
          {
            name: "CANCELADO",
            value: "c"
          }
        ],
        type_register: [
          {
            name: "RESCISÃO",
            value: "termination"
          },
          {
            name: "TRANSFERÊNCIA",
            value: "transfer"
          }
        ],
        responsibles: []
      }
    };
  },
  methods: {
    getResponsibles() {
      http
        .get("termination/contract/query/get-responsibles")
        .then(results => {
          if (results.data) {
            this.select.responsibles = results.data.map(responsible => {
              return {
                name: `${responsible.name.toUpperCase()} ${responsible.last_name.toUpperCase()}`,
                value: responsible.value
              };
            });
          }

          setTimeout(() => this.setDefaultFilter(), 100);
        })
        .catch(err => {});
    },
    search() {
      this.$emit("search", this.filter);
      localStorage.setItem("filter", JSON.stringify(this.filter));
    },
    setDefaultFilter() {
      // verifica se existe filtro no localstorage
      const localStorageFilter = JSON.parse(localStorage.getItem("filter"));
      if (localStorageFilter) {
        this.filter = { ...localStorageFilter };
      } else {
        this.filter.init_date = moment()
          .startOf("month")
          .format("DD/MM/YYYY");
        this.filter.end_date = moment()
          .endOf("month")
          .format("DD/MM/YYYY");
        this.filter.type_register = ["termination"];
        this.filter.status = ["p"];
        this.filter.responsible = this.select.responsibles.map(
          responsible => responsible.value
        );
      }
      this.search();
    },
    openModalPrintReport() {
      this.$emit("openModalSelectPrintReport", this.filter);
    }
  },
  mounted() {
    this.getResponsibles();
  }
};
</script>





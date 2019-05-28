<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <img :src="images.loupe" style="position: absolute; top: 1px;">
              <span style="margin-left: 35px;">PAINEL DE PESQUISA</span>
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

              <div class="col-md-3 col-lg-3">
                <label>Status</label>
                <multi-select
                  :id="'status'"
                  :dataSelect="select.status"
                  :setValue="filter.status"
                  @value="value => filter.status = value"
                />
              </div>

              <div class="col-md-3 col-lg-3">
                <label>Cadastro</label>
                <multi-select
                  :id="'responsible_register_sector'"
                  :dataSelect="select.responsible_register_sector"
                  :setValue="filter.responsible_register"
                  @value="value => filter.responsible_register = value"
                />
              </div>

              <div class="col-md-3 col-lg-3">
                <label>Recepção</label>
                <multi-select
                  :id="'responsible_reception'"
                  :dataSelect="select.responsible_reception"
                  :setValue="filter.responsible_reception"
                  @value="value => filter.responsible_reception = value"
                />
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-2 col-lg-1">
                <label>Inicial</label>
                <date-picker class="form-control input-sm" v-model="filter.init_date"/>
              </div>

              <div class="col-md-2 col-lg-1">
                <label>Final</label>
                <date-picker class="form-control input-sm" v-model="filter.end_date"/>
              </div>
              <div class="col-md-3 col-lg-2">
                <label>Pesquisa por</label>
                <select class="form-control input-sm" v-model="filter.type_date">
                  <option value="r">Reserva</option>
                  <option value="p">Previsão</option>
                  <option value="c">Conclusão</option>
                </select>
              </div>
              <div class="col-md-4" style="margin-top: 25px;">
                <button class="button btn btn-sm btn-default" @click="search" :disabled="searching">
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
                      <router-link :to="{name: 'registerSector_reserve_create'}">Nova Reserva</router-link>
                    </li>
                    <li class="divider"></li>
                    <li>
                      <a
                        href="#"
                        @click.prevent="$emit('openModalSelectTypePrint')"
                      >Impressão de Relatórios</a>
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
import extraDataModule from "../extra-data-module";
import MultiSelect from "@/components/MultiSelect";
import DatePicker from "@/components/DatePicker";

export default {
  name: "PanelSearch",
  props: {
    searching: {
      type: Boolean,
      default: false
    },
    perPage: {
      type: String
    }
  },
  components: {
    MultiSelect,
    DatePicker
  },
  data() {
    return {
      images: {
        loupe: require("@/assets/icons/loupe.png")
      },
      select: extraDataModule.select,
      per_page: "100",
      filter: {
        input: "",
        status: [],
        responsible_register: [],
        responsible_reception: [],
        init_date: "",
        end_date: "",
        type_date: "r"
      }
    };
  },
  methods: {
    async getAttendantsForFilter() {
      return http
        .get("register-sector/reserve/query/attendants-for-filter")
        .then(results => {
          this.select.responsible_register_sector = results.data.users_register.map(
            user => {
              return {
                value: user.id,
                name: user.full_name.toUpperCase()
              };
            }
          );

          this.select.responsible_reception = results.data.users_reception.map(
            user => {
              return {
                value: user.id,
                name: user.full_name.toUpperCase()
              };
            }
          );
        })
        .catch(err => {})
        .finally(() => {});
    },
    async setDefaultValuesFilter() {},
    storageFilter() {
      this.filter.per_page = this.per_page;
      localStorage.setItem("filter", JSON.stringify(this.filter));
      this.$emit("search");
    },
    search() {
      this.storageFilter();
    },
    setDefaultFilter() {
      const filterData = JSON.parse(
        localStorage.getItem("filter", JSON.stringify(this.filter))
      );
      if (!filterData) {
        this.filter.status = ["r", "d", "a", "cd"];
      } else {
        this.filter.status = filterData.status;
      }
    },
    print() {}
  },
  computed: {
    checkFilterExists() {}
  },
  watch: {
    perPage() {
      this.per_page = this.perPage;
    }
  },
  mounted() {
    const filterStorage = JSON.parse(localStorage.getItem("filter"));
    this.per_page = !filterStorage ? this.perPage : filterStorage.per_page;
    this.getAttendantsForFilter().then(result => {
      this.setDefaultFilter();
      this.search();
    });
  }
};
</script>
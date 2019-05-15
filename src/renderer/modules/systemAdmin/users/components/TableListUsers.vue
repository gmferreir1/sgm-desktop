<template>
<div>

  <div class="box box-danger">
    <div class="box-header">
      <h3 class="box-title box-title-up">Lista de Usuários no Sistema ( {{ data_list.data.length }} )</h3>
    </div>
    <!-- /.box-header -->
    <div class="box-body" style="padding-top: 0px;">

      <!-- not found component -->
      <div class="row" v-if="!data_list.data.length">
        <div class="col-md-6 col-md-offset-5">
          <not-found />
        </div>
      </div>
      <!-- / end not found component -->

      <!-- table -->
      <div class="table-responsive tableFixHead" v-if="data_list.data.length">

        <table class="table table-condensed table-hover" style="margin-top: 5px;">
          <thead>
            <tr>
              <th>
                <a
                    href="#"
                    @click.prevent="sort('name', toggle_sort === 'asc' ? 'desc' : 'asc' )"
                  >
                    <span v-if="data_sort.sort_by === 'name' ">
                      <i
                        class="fa"
                        v-if="data_sort.sort_by === 'name'"
                        :class="{'fa-sort-amount-desc': data_sort.sort_order === 'desc' , 'fa-sort-amount-asc': data_sort.sort_order === 'asc'}"
                        aria-hidden="true"
                      >
                      </i>
                    </span>
                    <span v-else>
                      <i
                        class="fa fa-sort"
                        aria-hidden="true"
                      ></i>
                    </span>
                    Name
                  </a>
              </th>
              <th>Status</th>
              <th>Email</th>
              <th>Administrador</th>
              <th> - </th>
            </tr>
          </thead>
          <tbody>

            <tr v-for="(list, index) in data_list.data" :key="index">
              <td>{{ `${list.name} ${list.last_name}` }}</td>
              <td :class="{inactive: !list.status}">{{ list.status === 1 ? "ativo" : "inativo" }}</td>
              <td>
                <span style="text-transform: lowercase">{{ list.email }}</span>
              </td>
              <td :class="{admin: list.admin}">{{ list.admin ? "sim" : "não" }}</td>
              <td>
                <router-link :to="{name: 'systemAdmin_users_edit', params: {id: list.id}}" title="Editar dados">

                  <span
                      class="fa fa-pencil"
                      style="font-size: 16px; color: red"
                    ></span>

                </router-link>
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
import {
  mapActions
} from "vuex";
import sort from '../../../../mixins/sort';

export default {
  name: "tableListUsers",
  mixins: [sort],
  components: {
    NotFound
  },
  data() {
    return {
      data_list: {
        data: []
      },
      filter: {
        input: ""
      }
    }
  },
  methods: {
    ...mapActions("AdminUser", ["getAllUsers"]),
    getData() {

      const queryParams = {
        params: { ...this.filter
        }
      }

      this.getAllUsers(queryParams)
        .then(results => {
          this.data_list.data = results.data;
          const sortLocal = JSON.parse(localStorage.getItem("sort_data"));
          if (sortLocal) {
            this.sort(sortLocal.sort_by, sortLocal.sort_order);
          } else {
            this.sort();
          }
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        }).catch(err => this.$bus.$emit("closeLoading"))
    },
    storeSort() {
      localStorage.setItem("sort_data", JSON.stringify(this.data_sort));
    }
  },
  mounted() {
    this.$bus.$emit("openLoading");
    this.getData();
    this.$bus.$on("SystemAdmin\Users::searchUsers", filter => {
      this.$bus.$emit("openLoading");
      this.filter = { ...filter
      };
      this.getData();
    })
  }
}
</script>

<style scoped>
tbody>tr>td {
  text-transform: uppercase !important;
}

.inactive,
.admin {
  color: red;
  font-weight: bold;
}
</style>

<template>
  <div>
    <div class="row">
      <div class="col-md-12 col-lg-8">
        <div class="box box-default">
          <div class="box-header with-border">
            <h3 class="box-title box-title-up">
              Painel de Pesquisa
            </h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body">

            <div class="row">
              <div class="col-md-4">
                <label>Pesquisa</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="filter.input"
                  @keypress.enter="search"
                >
              </div>

              <div
                class="col-md-1"
                style="margin-top: 25px;"
              >

                <button class="button btn btn-sm btn-default" @click="search">
                  <span class="fa fa-search"></span>
                  Pesquisar
                </button>
              </div>

              <div
                class="col-md-2"
                style="margin-top: 25px;"
              >
                <router-link
                  :to="{name: 'systemAdmin_users_create'}"
                  class="button btn btn-sm btn-primary"
                >
                  <span class="fa fa-plus"></span>
                  Novo Usuário
                </router-link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Panel",
  data() {
    return {
      filter: {
        input: ""
      }
    }
  },
  methods: {
    search() {
      this.$bus.$emit("SystemAdmin\Users::searchUsers", this.filter);
    }
  }
}
</script>
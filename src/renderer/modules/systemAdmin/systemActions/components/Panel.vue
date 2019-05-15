<template>
  <div>

    <div class="row">
      <div class="col-md-8">
        <div class="box box-danger">

          <div
            class="box-header with-border"
            style="padding-top: 3px"
          >
            <h3
              class="box-title"
              style="padding-bottom: 10px; padding-top: 5px;"
            >
              <span class="fa fa-search"></span>
              PAINEL DE PESQUISA
            </h3>
          </div>
          <!-- /.box-header -->

          <!-- /.box-header -->
          <div
            class="box-body"
            style="padding-top: 0px;"
          >
            <div class="row">
              <div class="col-md-6">
                <label>Pesquisa de Dados</label>
                <input
                  type="text"
                  class="form-control input-sm"
                  v-model="form_filter.input"
                  @keypress.enter="search"
                >
              </div>
            </div>
            <div
              class="row"
              style="margin-top: 10px;"
            >
              <div class="col-md-12">
                <button
                  class="button btn btn-sm btn-primary"
                  @click="search"
                >Pesquisar Dados</button>
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
      form_filter: {
        input: ""
      }
    }
  },
  methods: {
    search() {
      this.$bus.$emit("SystemAdmin\SystemAction::searchActions", this.form_filter);
    }
  }
}
</script>
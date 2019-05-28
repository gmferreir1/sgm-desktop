<template>
  <div>
    <div class="row">
      <!-- left column -->
      <div class="col-md-12">
        <!-- general form elements -->
        <div class="box box-primary">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 0px; padding-top: 0px;">
              <img :src="icons.database">
              Painel de Atualização Base de Dados
            </h3>
          </div>
          <!-- /.box-header -->

          <div class="box-body">
            <div class="row" style="margin-top: 10px;">
              <div class="col-md-3 col-sm-6 col-xs-12">
                <!-- loader -->
                <div class="loader" v-if="loading_type_immobile"></div>
                <!-- / loader -->

                <a
                  href="#"
                  @click.prevent="updateDatabase('types_immobile')"
                  style="color: inherit"
                  v-if="!loading_type_immobile"
                >
                  <div class="info-box">
                    <span class="info-box-icon bg-aqua">
                      <i class="fa fa-list"></i>
                    </span>
                    <div class="info-box-content">
                      <span class="info-box-text">Tipos de Imóvel</span>
                      <span class="info-box-text-sub">Atualiza os tipos de imóvel disponiveis na API</span>
                    </div>
                  </div>
                </a>
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
  name: "PanelUpdate",
  data() {
    return {
      loading_type_immobile: false,
      icons: {
        database: require("@/assets/icons/database.png")
      }
    };
  },
  methods: {
    updateDatabase(typeUpdate) {
      if (typeUpdate === "types_immobile") {
        this.loading_type_immobile = true;
      }

      const queryParams = {
        params: {
          type_update: typeUpdate
        }
      };

      http
        .get("admin/update-database", queryParams)
        .then(result => {
          _notification.success();
        })
        .catch(err => {})
        .finally(() => {
          this.loading_type_immobile = false;
        });
    }
  }
};
</script>

<style scoped>
.info-box {
  background: #f7f7f7;
}

.info-box-text-sub {
  font-size: 11px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

<template>
  <div>

    <div class="row">

      <div class="col-md-3 col-sm-6 col-xs-12">
        <router-link
          :to="{name: 'systemAdmin_users_list'}"
          style="color: inherit"
        >
          <div class="info-box">
            <span class="info-box-icon bg-aqua"><i class="fa fa-users"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">USUÁRIOS NO SISTEMA</span>
              <span class="info-box-number">{{ data_panel.total_users }}<small>QT</small></span>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <router-link
          :to="{name: 'systemAdmin_update_db'}"
          style="color: inherit"
        >
          <div class="info-box">
            <span class="info-box-icon bg-gray"><i class="fa fa-database"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">ATUALIZAÇÃO BASE DE DADOS</span>
              <span class="info-box-number info-box-text">{{ dateFormat(data_panel.last_update, "DD/MM/YYYY HH:mm:ss") }}</span>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <router-link
          :to="{name: 'systemAdmin_flux_attendance'}"
          style="color: inherit"
        >
          <div class="info-box">
            <span class="info-box-icon bg-green"><i class="fa fa-bandcamp"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">FLUXO DE ATENDIMENTO</span>
              <span class="info-box-number">{{ data_panel.total_flux }}<small>QT</small></span>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <router-link
          :to="{name: 'systemAdmin_system_actions'}"
          style="color: inherit"
        >
          <div class="info-box">
            <span class="info-box-icon bg-red"><i class="fa fa-address-book"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">AÇÕES DO SISTEMA</span>
              <span class="info-box-number"> - </span>
            </div>
          </div>
        </router-link>
      </div>

      <div class="clearfix visible-sm-block"></div>
    </div>

    <div class="row">

      <div class="col-md-3 col-sm-6 col-xs-12">
        <router-link
          :to="{name: 'systemAdmin_reason'}"
          style="color: inherit"
        >
          <div class="info-box">
            <span class="info-box-icon bg-black"><i class="fa fa-list"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">MOTIVOS</span>
              <span class="info-box-number">{{ data_panel.total_reasons }}<small>QT</small></span>
            </div>
          </div>
        </router-link>
      </div>

      <div class="col-md-3 col-sm-6 col-xs-12">
        <router-link
          :to="{name: 'systemAdmin_documents'}"
          style="color: inherit"
        >
          <div class="info-box">
            <span class="info-box-icon bg-black"><i class="fa fa-file"></i></span>
            <div class="info-box-content">
              <span class="info-box-text">DOCUMENTOS</span>
              <span class="info-box-number info-box-text"><small>CONFIGURAÇÃO DE CARTAS E EMAILS</small></span>
            </div>
          </div>
        </router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { dateFormat } from "../../../../util/dateTime";

export default {
  name: "DashboardSystemAdmin",
  data() {
    return {
      data_panel: {}
    }
  },
  methods: {
    dateFormat,
    getData() {
      http.get("admin/dashboard")
        .then(results => {
          this.data_panel = results.data;
        }).catch(err => { })
    }
  },
  mounted() {
    this.getData()
  }
}
</script>
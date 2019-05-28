<template>
  <div id="app" class="wrapper">
    <!-- modal spinner -->
    <modal-spinner/>
    <!-- / modal spinner -->

    <!-- modal check update -->
    <modal-check-update/>
    <!-- / modal check update -->

    <!-- Main Header -->
    <header class="main-header">
      <!-- Logo -->
      <a v-show="!hide_components" href="#" @click.prevent class="logo" style="position: fixed; background-color: #40364d">
        <span class="logo-mini">
          <b>S</b>GM
        </span>
        
        <span class="logo-lg">
          <b>SGM</b>MASTER
        </span>
      </a>

      <!-- Header Navbar-->

      <!-- navBar -->
      <nav-bar v-show="!hide_components"/>
      <!-- navBar-->
    </header>

    <!-- sideBar -->
    <side-bar v-show="!hide_components"/>
    <!-- / sideBar -->

    <!-- Content Wrapper. Contains page content -->
    <div class="content-wrapper" :style="styleObject">
      <!-- Content Header (Page header) -->
      <breadcrumb v-show="!hide_components" style="padding-top: 38px;"/>
      <!-- Content Header (Page header) -->

      <!-- Main content -->
      <section class="content container-fluid">
        <router-view/>
      </section>
      <!-- /.content -->
    </div>
    <!-- /.content-wrapper -->

    <div class="check-update" v-if="check_update && $route.name === 'auth' && $NODE_ENV === 'production' ">
      <div
        class="info-box"
        style=" padding-left: 30px; background-color: #967ADC; color: #ffffff; font-weight: bold; min-height: 60px;"
      >
        <div style="position: absolute; top: 20px; left: 80px;">Verificando atualização ...</div>
        <div class="loader" style="position: absolute; top: 10px;"></div>

        <!-- /.info-box-content -->
      </div>
    </div>

  </div>
  <!-- ./wrapper -->
</template>

<script>
import NavBar from "./templateParts/NavBar";
import SideBar from "./templateParts/SideBar";
import ControlSideBar from "./templateParts/ControlSideBar";
import TemplateFooter from "./templateParts/TemplateFooter";
import ModalSpinner from "./components/ModalSpinner";
import ModalCheckUpdate from "./components/ModalCheckUpdate";
import Breadcrumb from "./templateParts/Breadcrumb";

export default {
  components: {
    NavBar,
    SideBar,
    ControlSideBar,
    TemplateFooter,
    ModalSpinner,
    Breadcrumb,
    ModalCheckUpdate
  },
  data() {
    return {
      styleObject: {
        "margin-left": "0px !important"
      },
      hide_components: true,
      check_update: true
    };
  },
  watch: {
    "$route.name"() {
      if (this.$route.name != "auth") {
        this.hide_components = false;
        this.styleObject = {
          "margin-left": "45px !important"
        };
      } else {
        this.styleObject = {
          "margin-left": "0px !important"
        };
        this.hide_components = true;
      }
    }
  },
  mounted() {

    process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = true;


    setTimeout(() => this.$electron.ipcRenderer.send("init"), 5000);

    if (this.$route.name !== "auth") {
      this.styleObject = {
        "margin-left": "45px !important"
      };

      this.hide_components = false;
    } else {
      this.hide_components = true;
    }

    this.$electron.ipcRenderer.on("clearLocalStorage", (event, data) => {
      window.localStorage.clear();
    });

    this.$electron.ipcRenderer.send("checkUpdates");

    this.$electron.ipcRenderer.on("updateError", (event, data) => {
      this.check_update = false;
    });
    
    this.$electron.ipcRenderer.on("updateNotAvailable", (event, data) => {
      this.check_update = false;
    });

    this.$electron.ipcRenderer.on("updateAvailable", (event, data) => {
      this.check_update = false;
      this.$bus.$emit("openModalCheckUpdate");
    });

    this.$electron.ipcRenderer.on("downloadProgress", (event, data) => {
      this.$bus.$emit("modalCheckUpdateSetProgress", data);
    });
  }
};
</script>

<style>
@import "../../node_modules/bootstrap/dist/css/bootstrap.css";
@import "../../node_modules/font-awesome/css/font-awesome.css";
@import "../renderer/assets/css/adminLTE/AdminLTE.css";
@import "../renderer/assets/css/adminLTE/skins/skin-blue.css";
@import "../renderer/assets/css/style.css";
@import "../renderer/assets/css/spinner.css";
@import "../renderer/assets/css/multiselect.css";

.check-update {
  position: absolute;
  top: 10px;
  width: 300px;
}
</style>


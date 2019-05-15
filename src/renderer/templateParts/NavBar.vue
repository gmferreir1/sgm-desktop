<template>
  <div>
    <nav class="navbar navbar-static-top navbar-fixed-top" role="navigation" style="height: 30px;">
      <!-- Navbar Right Menu -->
      <div class="navbar-custom-menu">
        <ul class="nav navbar-nav">
          <!-- User Account Menu -->
          <li class="dropdown user user-menu" style="width: 50px;">
            <!-- Menu Toggle Button -->
            <a
              href="#"
              class="dropdown-toggle"
              style="margin-top: 3px; height: 30px; padding-left: 0px; width: 20px; margin-left: 10px;"
              data-toggle="dropdown"
            >
              <div
                id="profile-name"
                class="user-image img-circle"
                v-if="data_user_logged && data_user_logged.name"
              >{{ data_user_logged.name.substring(0,1).toUpperCase() }}</div>
            </a>
            <ul class="dropdown-menu" style="margin-top: 3px;">
              <!-- The user image in the menu -->
              <li class="user-header">
                <img :src="images.profile" class="img-circle" alt="User Image">

                <p
                  style="text-transform: uppercase"
                >{{ `${data_user_logged.name} ${data_user_logged.last_name}` }}</p>
              </li>
              <!-- Menu Body -->
              <li class="user-body">
                <div class="row">
                  <div class="col-xs-12 text-center">
                    <router-link :to="{name: 'systemAdmin_dashboard'}">Administração do Sistema</router-link>
                  </div>
                </div>
                <!-- /.row -->
              </li>
              <!-- Menu Footer-->
              <li class="user-footer">
                <div class="text-center">
                  <a
                    href="#"
                    @click.prevent="logout"
                    class="btn btn-primary btn-block"
                  >Sair do sistema</a>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      data_user_logged: {},
      images: {
        profile: require("@/assets/images/profile.png")
      }
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      setTimeout(() => window.location.reload());
    },
    getDataUserLogged() {
      const data = JSON.parse(localStorage.getItem("dataLogin"));
      if (data) {
        this.data_user_logged = data;
      }
    }
  },
  mounted() {
    this.getDataUserLogged();
  }
};
</script>

<style scoped>
#profile-name {
  background: #40364d !important;
  position: absolute;
  top: 1px;
  width: 30px !important;
  height: 30px !important;
  border-radius: 5px !important;
  padding: 5px 0px 0px 8px !important;
  font-weight: bold !important;
  color: #ffffff !important;
  font-size: 20px !important;
  border-radius: 40px !important;
}
</style>

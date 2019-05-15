<template>
  <div>
    <aside class="main-sidebar sidenav">
      <section class="sidebar">
        <ul class="sidebar-menu" data-widget="tree">
          <li class="treeview">
            <a href="#" @click.prevent>
              <img :src="images.contract">
              <span class="menu-title-sidebar">CADASTRO</span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link :to="{name: 'registerSector_reserve_list'}">
                  <i class="fa fa-circle-o"></i> Reserva
                </router-link>
              </li>

              <li>
                <router-link :to="{name: ''}">
                  <i class="fa fa-circle-o"></i> Transferência
                </router-link>
              </li>
            </ul>
          </li>

          <li class="treeview">
            <a href="#" @click.prevent>
              <img :src="images.termination">
              <span class="menu-title-sidebar">RESCISÃO</span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link :to="{name: 'termination_contract_list'}">
                  <i class="fa fa-circle-o"></i> Contratos
                </router-link>
              </li>
              <li>
                <router-link :to="{name: 'termination_contract_dead_file'}">
                  <i class="fa fa-circle-o"></i> Arquivo Morto
                </router-link>
              </li>
            </ul>
          </li>
        </ul>
      </section>
    </aside>
  </div>
</template>

<script>
export default {
  name: "SideBar",
  data() {
    return {
      images: {
        profile: require("@/assets/images/profile.png"),
        contract: require("@/assets/icons/contract.png"),
        termination: require("@/assets/icons/termination.png")
      }
    };
  }
};
</script>

<style scoped>
.setting {
  position: absolute;
  top: 95%;
  color: #ffffff;
  left: 15px;
}

.sidenav {
  height: 100%; /* Full-height: remove this if you want "auto" height */
  width: 160px; /* Set the width of the sidebar */
  position: fixed; /* Fixed Sidebar (stay in place on scroll) */
}

.skin-blue .sidebar-menu > li > a {
  border-left: 3px solid transparent;
  padding-left: 5px !important;
}
</style>

<template>
  <div>
    <aside class="main-sidebar sidenav">
      <section class="sidebar">
        <ul class="sidebar-menu" >
          <li class="treeview">
            <a href="#" @click.prevent>
              <img :src="icons.folder">
              <span class="menu-title-sidebar">CADASTRO</span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link :to="{name: 'registerSector_reserve_list'}">
                  <i class="fa fa-circle-o"></i> Reserva
                </router-link>
              </li>
              <li>
                <router-link :to="{name: 'registerSector_transfer_contract'}">
                  <i class="fa fa-circle-o"></i> Transferência
                </router-link>
              </li>
            </ul>
          </li>
          
          <li class="treeview">
            <a href="#" @click.prevent>
              <img :src="icons.finance">
              <span class="menu-title-sidebar">FINANCEIRO</span>
            </a>
            <ul class="treeview-menu">
              <li>
                <router-link :to="{name: 'finance_contract_celebrated'}">
                  <i class="fa fa-circle-o"></i> Contratos Celebrados
                </router-link>
              </li>
            </ul>
          </li>
          <!--
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
          -->
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
      icons: {
        folder: require("@/assets/icons/form.png"),
        finance: require("@/assets/icons/finance.png"),
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
  padding-left: 4px !important;
}
</style>

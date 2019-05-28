<template>
  <div>
    <table-list-reserves @openModalSelectTypePrint="openModalSelectTypePrint"/>

    <!-- MODAL SELEÇÃO DO RELATÓRIO PARA IMPRESSÃO -->
    <modal-select-type-print :dataModal="data_modal_select_type_print" />
    <!-- MODAL SELEÇÃO DO RELATÓRIO PARA IMPRESSÃO -->
  </div>
</template>

<script>
import TableListReserves from "../components/TableListReserves";
import ModalSelectTypePrint from "../components/ModalSelectTypePrint";

export default {
  name: "ReserveList",
  components: {
    TableListReserves,
    ModalSelectTypePrint
  },
  data() {
    return {
      data_modal_select_type_print: {}
    }
  },
  methods: {
    openModalSelectTypePrint() {
      this.data_modal_select_type_print = { data: "" }
    }
  },
  beforeDestroy() {
    const routeName = this.$route.name;

    if (
      routeName !== "registerSector_reserve_list" &&
      routeName !== "registerSector_reserve_edit" &&
      routeName !== "registerSector_reserve_create"
    ) {
      localStorage.removeItem("sort");
      localStorage.removeItem("filter");
    }
  }
};
</script>

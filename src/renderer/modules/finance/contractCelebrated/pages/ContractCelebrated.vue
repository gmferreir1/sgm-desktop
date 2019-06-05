<template>
  <div>
    <table-list-contract-celebrated
      @openModalActionSelected="data => data_modal_action_contract_selected = { data_checked: data }"
      :refreshList="refresh_list_contract_celebrated"
    />

    <!-- Abre a modal para ação dos contratos selecionados -->
    <modal-action-contract-selected
      :dataModal="data_modal_action_contract_selected"
      @refreshListContractCelebrated="refresh_list_contract_celebrated = !refresh_list_contract_celebrated"
    />
    <!-- / abre a modal para ação dos contratos selecionados -->
  </div>
</template>

<script>
import TableListContractCelebrated from "../components/TableListContractCelebrated";
import ModalActionContractSelected from "../components/ModalActionContractSelected";

export default {
  name: "ContractCelebrated",
  components: { TableListContractCelebrated, ModalActionContractSelected },
  data() {
    return {
      data_modal_action_contract_selected: {},
      refresh_list_contract_celebrated: false
    };
  },
  beforeDestroy() {
    const routeName = this.$route.name;

    if (
      routeName !== "finance_contract_celebrated" &&
      routeName !== "finance_contract_celebrated_edit"
    ) {
      localStorage.removeItem("sort");
      localStorage.removeItem("filter");
      localStorage.removeItem("paginate");
    }
  }
};
</script>
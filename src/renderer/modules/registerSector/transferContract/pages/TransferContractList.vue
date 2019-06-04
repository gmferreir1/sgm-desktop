<template>
  <div>
    <table-list-transfer-contract/>
  </div>
</template>

<script>
import TableListTransferContract from "../components/TableListTransferContract";

export default {
  name: "TransferContractList",
  components: { TableListTransferContract },
  beforeDestroy() {
    const routeName = this.$route.name;

    if (
      routeName !== "registerSector_transfer_contract" &&
      routeName !== "registerSector_transfer_contract_create" &&
      routeName !== "registerSector_transfer_contract_edit"
    ) {
      localStorage.removeItem("sort");
      localStorage.removeItem("filter");
    }
  }
};
</script>
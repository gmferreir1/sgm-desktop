<template>
  <div>
    <form-transfer-contract
      @openModalFluxAttendance="data => data_modal_flux_attendance = data"
      @openModalHistoricTransfer="data => data_modal_historic_transfer = data"
      @openModalCancelTransfer="data => data_modal_cancel_transfer = { transfer_id: data }"
      :refreshData="refresh_data"
    />

    <!-- Modal fluxo de atendimento -->
    <modal-flux-attendance :dataModal="data_modal_flux_attendance"/>
    <!-- / Modal fluxo de atendimento -->

    <!-- modal de listagem dos histórios -->
    <modal-historic-transfer :dataModal="data_modal_historic_transfer"/>
    <!-- / modal de listagem dos históricos -->

    <!-- Modal cancelamento da transferência -->
    <modal-cancel-transfer
      :dataModal="data_modal_cancel_transfer"
      @refreshDataTransfer="refresh_data = !refresh_data"
    />
    <!-- / modal cancelamento da transferência -->
  </div>
</template>

<script>
import FormTransferContract from "../components/FormTransferContract";
import ModalFluxAttendance from "@/components/ModalFluxAttendance";
import ModalHistoricTransfer from "../components/ModalHistoricTransfer";
import ModalCancelTransfer from "../components/ModalCancelTransfer";

export default {
  name: "CreateOrEditTransferContract",
  components: {
    FormTransferContract,
    ModalFluxAttendance,
    ModalHistoricTransfer,
    ModalCancelTransfer
  },
  data() {
    return {
      data_modal_flux_attendance: {},
      data_modal_historic_transfer: {},
      data_modal_cancel_transfer: {},
      refresh_data: false
    };
  },
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

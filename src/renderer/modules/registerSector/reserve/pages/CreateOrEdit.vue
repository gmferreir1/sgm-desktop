<template>
  <div>
    <form-reserve
      @opeModalHistoricReserve="reserve_id => data_modal_historic_reserve = { reserve_id }"
      @openModalCancelReserve="reserve_id => data_modal_cancel_reserve = { reserve_id }"
      :refreshDataReserve="refresh_data_reserve"
    />

    <!-- MODAL HISTORICOS RESERVA -->
    <modal-historic-reserve :dataModal="data_modal_historic_reserve"/>
    <!-- / MODAL HISTÓRICOS RESERVA -->

    <!-- MODAL PARA O CANCELAMENTO DA RESERVA -->
    <modal-cancel-reserve :dataModal="data_modal_cancel_reserve" @refreshDataReserve="refresh_data_reserve = !refresh_data_reserve"/>
    <!-- MODAL PARA O CANCELAMENTO DA RESERVA -->
  </div>
</template>

<script>
import FormReserve from "../components/FormReserve";
import ModalHistoricReserve from "../components/ModalHistoricReserve";
import ModalCancelReserve from "../components/ModalCancelReserve";

export default {
  name: "CreateOrEdit",
  components: {
    FormReserve,
    ModalHistoricReserve,
    ModalCancelReserve
  },
  data() {
    return {
      data_modal_historic_reserve: {},
      data_modal_cancel_reserve: {},
      refresh_data_reserve: false
    };
  }
};
</script>

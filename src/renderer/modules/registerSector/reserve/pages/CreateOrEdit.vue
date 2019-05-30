<template>
  <div>
    <form-reserve
      @opeModalHistoricReserve="reserve_id => data_modal_historic_reserve = { reserve_id }"
      @openModalCancelReserve="reserve_id => data_modal_cancel_reserve = { reserve_id }"
      @openModalFluxAttendance="data => data_modal_flux_attendance = { data } "
      @openModalSendEmail="reserve_data => data_modal_send_email = { reserve_data } "
      :refreshDataReserve="refresh_data_reserve"
    />

    <!-- MODAL HISTORICOS RESERVA -->
    <modal-historic-reserve :dataModal="data_modal_historic_reserve"/>
    <!-- / MODAL HISTÓRICOS RESERVA -->

    <!-- MODAL PARA O CANCELAMENTO DA RESERVA -->
    <modal-cancel-reserve :dataModal="data_modal_cancel_reserve" @refreshDataReserve="refresh_data_reserve = !refresh_data_reserve"/>
    <!-- / MODAL PARA O CANCELAMENTO DA RESERVA -->
   
    <!-- MODAL FLUXO DE ATENDIMENTO -->
    <modal-flux-attendance :dataModal="data_modal_flux_attendance"/>
    <!-- / MODAL FLUXO DE ATENDIMENTO -->

    <!-- MODAL ENVIO DE EMAIL -->
    <modal-send-email :dataModal="data_modal_send_email" />
    <!-- / MODAL ENVIO DE EMAIL -->

  </div>
</template>

<script>
import FormReserve from "../components/FormReserve";
import ModalHistoricReserve from "../components/ModalHistoricReserve";
import ModalCancelReserve from "../components/ModalCancelReserve";
import ModalFluxAttendance from "../components/ModalFluxAttendance";
import ModalSendEmail from "../components/ModalSendEmail";

export default {
  name: "CreateOrEdit",
  components: {
    FormReserve,
    ModalHistoricReserve,
    ModalCancelReserve,
    ModalFluxAttendance,
    ModalSendEmail
  },
  data() {
    return {
      data_modal_historic_reserve: {},
      data_modal_cancel_reserve: {},
      refresh_data_reserve: false,
      data_modal_flux_attendance: {},
      data_modal_send_email: {}
    };
  }
};
</script>

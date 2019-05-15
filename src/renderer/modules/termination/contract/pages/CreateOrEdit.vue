<template>
  <div>
    <form-termination @openModalShowImmobile="data => data_modal_sicadi_immobile = { data }" @openModalSelectPrint="openModalSelectPrint"/>

    <!-- modal lista os imoveis encontrados SICADI -->
    <modal-show-immobile :dataModal="data_modal_sicadi_immobile" />
    <!-- / modal lista os imoveis encontrados SICADI -->

    <!-- modal lista os historicos da rescisão -->
    <modal-historic />
    <!-- / modal lista os históricos da rescisão -->
   
    <!-- modal para cancelamento da rescisão -->
    <modal-cancel />
    <!-- / modal para cancelamento da rescisão -->

    <!-- modal para seleção das fichas de rescisão -->
    <modal-print-record :dataModal="data_modal_print_record" />
    <!-- / modal para seleção das fichas de rescisão -->

  </div>
</template>

<script>
import FormTermination from "../components/FormTermination";
import ModalShowImmobile from "../../../sicadi/ModalShowImmobile";
import ModalHistoric from "../components/ModalHistoric";
import ModalCancel from "../components/ModalCancel";
import ModalPrintRecord from "../components/ModalPrintRecord";

export default {
  name: "CreateOrEdit",
  components: {
    FormTermination,
    ModalShowImmobile,
    ModalHistoric,
    ModalCancel,
    ModalPrintRecord
  },
  data() {
    return {
      data_modal_sicadi_immobile: {},
      data_modal_print_record: {}
    };
  },
  methods: {
    openModalSelectPrint() {
      const termination_id  = this.$route.params.id;
      this.data_modal_print_record = { termination_id };
    }
  }
};
</script>


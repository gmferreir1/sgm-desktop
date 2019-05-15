<template>
  <div>
    <form-reserve @openModalShowImmobile="data => data_modal_show_immobile = { data } "/>

    <!-- modal lista os imoveis encontrados na API(SICADI) -->
    <modal-show-immobile :dataModal="data_modal_show_immobile" />
    <!-- // modal lista os imoveis encontrados na API(SICADI) -->
  </div>
</template>

<script>
import FormReserve from "../components/FormReserve";
import ModalShowImmobile from "@/modules/sicadi/ModalShowImmobile";

export default {
  name: "CreateOrEdit",
  components: {
    FormReserve,
    ModalShowImmobile
  },
  data() {
    return {
      data_modal_show_immobile: {}
    };
  }
};
</script>

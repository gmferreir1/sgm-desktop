<template>
  <div>
    <panel @search="filter => filter_data = { filter } " @openModalSelectPrintReport="filter => data_modal_select_print_report = { filter }"/>

    <table-list-termination :search="filter_data" @openModalArchiveProcess="termination_data => data_modal_archive_process = { termination_data } "/>

    <!-- modal para seleção do relatorio -->
    <modal-select-print-report :dataModal="data_modal_select_print_report" />
    <!-- / modal para seleção do relatorio -->

    <!-- modal para arquivamento do processo de rescisão -->
    <modal-archive-process :dataModal="data_modal_archive_process" />
    <!-- modal para arquivamento do processo de rescisão -->

  </div>
</template>

<script>

import Panel from "../components/Panel";
import TableListTermination from "../components/TableListTermination";
import ModalSelectPrintReport from "../components/ModalSelectPrintReport";
import ModalArchiveProcess from "../components/ModalArchiveProcess";

export default {
  name: "ContractList",
  components: { Panel, TableListTermination, ModalSelectPrintReport, ModalArchiveProcess },
  data() {
    return {
      filter_data: {},
      data_modal_select_print_report: {},
      data_modal_archive_process: {}
    }
  }
}
</script>


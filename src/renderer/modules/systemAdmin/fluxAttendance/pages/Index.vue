<template>
  <div>
    <form-flux :dataComponent="edit_flux_data" />
    <table-list-flux-attendance @edit="data => edit_flux_data = { data }" />
  </div>
</template>

<script>
import FormFlux from "../components/FormFlux";
import TableListFluxAttendance from "../components/TableListFluxAttendance";
export default {
  name: "IndexFuxAttendance",
  components: { FormFlux, TableListFluxAttendance },
  data() {
    return {
      edit_flux_data: {}
    }
  }
}
</script>
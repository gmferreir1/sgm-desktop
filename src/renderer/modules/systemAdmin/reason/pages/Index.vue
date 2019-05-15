<template>
  <div>
    
    <form-reason :dataEdit="data_edit" />

    <table-list-reason @edit="data => data_edit = { data }" />

  </div>
</template>

<script>
import FormReason from "../components/FormReason";
import TableListReason from "../components/TableListReason";

export default {
  name: "IndexReasonsCancel",
  components: { FormReason, TableListReason },
  data() {
    return {
      data_edit: {}
    }
  },
}
</script>
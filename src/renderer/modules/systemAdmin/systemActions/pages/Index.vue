<template>
  <div>
    <panel />
    <table-list-system-actions />
  </div>
</template>

<script>
import Panel from "../components/Panel";
import TableListSystemActions from "../components/TableListSystemActions";

export default {
  name: "IndexSystemActions",
  components: { Panel, TableListSystemActions }
}
</script>
<template>
  <div>
    <panel />
    <table-list-users/>
  </div>
</template>

<script>
import Panel from "../components/Panel";
import TableListUsers from "../components/TableListUsers";

export default {
  name: "ListUsers",
  components: { Panel, TableListUsers }
}
</script>
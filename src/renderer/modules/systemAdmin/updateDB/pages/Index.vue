<template>
  <div>

    <form-send-file />

    <table-list-control-update />

  </div>
</template>

<script>
import FormSendFile from "../components/FormSendFile";
import TableListControlUpdate from "../components/TableListControlUpdate";

export default {
  name: "IndexSystemAdminUpdateDB",
  components: { FormSendFile, TableListControlUpdate },
  data() {
    return {
      ws_connected: false
    }
  },
  methods: {
    initRealTime() {

      let updateDatabase;

      if (!ws.getSubscription('update-database')) {
        updateDatabase = ws.subscribe('update-database');
      }


      if (updateDatabase) {
        updateDatabase.on('message', (message) => {
          this.$bus.$emit("SystemAdmin\UpdateDb::refreshTableControlUpdate");
        })
      }

      //updateDatabase.on('ready', () => updateDatabase.emit('message', 'hello'))
    }
  },
  mounted() {
    this.initRealTime();
  }
}
</script>

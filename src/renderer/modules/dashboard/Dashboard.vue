<template>
<div>

  <p class="text-muted well well-sm no-shadow" style="margin-top: 10px;">
    Sistema na versão <code>{{ $systemVersion }}</code>
  </p>

</div>
</template>

<script>
import Bus from '../../util/bus'
export default {
  name: "Dashboard",
  data() {
    return {
      myDataVar: ''
    }
  },
  methods: {
    logout() {
      localStorage.clear()
    }
  },
  mounted() {

    /*
    this.$electron.ipcRenderer.on('logout', (event, data) => {
      this.logout()
    })
    */
  }
}
</script>

<style scoped>
</style>

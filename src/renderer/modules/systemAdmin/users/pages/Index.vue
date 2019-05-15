<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  beforeDestroy() {
    localStorage.removeItem("sort_data");
  }
}
</script>
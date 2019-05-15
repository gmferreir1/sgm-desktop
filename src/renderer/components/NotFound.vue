<template>
  <div class="row">
    <div class="offset-md-5 offset-sm-4">
      <img :src="images.not_found" height="40" width="40">
      <span style="font-size: 11px">Nenhum resultado encontrado</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "NotFound",
    data() {
      return {
        images: {
          not_found: require('@/assets/images/not-found.png')
        }
      }
    }
  }
</script>
<template>

  <div class="row">
    <div class="col-md-12">
      <span class="required">* </span>
      <span style="font-size: 11px; font-weight: bold">Campos em amarelo são obrigatórios</span>
    </div>
  </div>

</template>

<script>
export default {
  name: "Required"
}
</script>

<style scoped>
.required {
  color: red;
}
</style>
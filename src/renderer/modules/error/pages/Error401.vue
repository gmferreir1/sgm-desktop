<template>

  <section class="flexbox-container">
    <div class="col-md-4 offset-md-4 col-xs-10 offset-xs-1">
      <div class="card-header no-border bg-transparent p-0">
        <h2 class="error-code text-xs-center mb-2">401</h2>
        <h3 class="text-uppercase text-xs-center">
          <span style="font-size: 18px">Erro 401 - Acesso não autorizado.</span>
        </h3>
      </div>
      <div class="card-body collapse in">
        <div class="row py-2">
          <div class="col-xs-12 col-sm-6 col-md-6">
            <router-link :to="{name: 'dashboard'}" class="btn btn-primary btn-block font-small-3">
              <i class="icon-home"></i> Voltar para Home
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
  export default {
    name: "Error401",
  }
</script>

<style scoped>

  .error-code {
    font-size: 10rem;
  }

</style>
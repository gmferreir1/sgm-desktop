<template>
  <div>
    <footer class="main-footer">
      <!-- To the right -->
      <div class="pull-right hidden-xs">
        Versão: {{ $systemVersion }}
      </div>
      <!-- Default to the left -->
      <strong>Copyright &copy; 2019 <a href="#">Master RSM Imóveis</a>.</strong> Todos os direitos reservados.
    </footer>
  </div>
</template>

<script>
export default {
  name: "TemplateFooter"
}
</script>
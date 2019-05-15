<template>
  <input
    ref="input"
    v-bind:value="value"
    v-on:input="updateValue($event.target.value)"
    @blur="formatDate(value)"
    type="text"  />
</template>

<script>
export default {
  props: {
    value: {
      type: String
    }
  },
  mounted: function () {
    let self = this
    this.$nextTick(function () {
      $(this.$el).datepicker({
        changeMonth : true,
        changeYear : true,
        dateFormat: 'dd/mm/yy',
        dayNames: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'],
        dayNamesMin: ['D', 'S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
        dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'],
        monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        monthNamesShort: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
        nextText: 'Próximo',
        prevText: 'Anterior',
        onSelect: function (date) {
          self.updateValue(date)
        }
      })
    })
  },
  methods: {
    updateValue: function (value) {
      this.$emit('input', value)
    },
    formatDate (value) {
      if (value) {
        value = value.replace(/\D/g, '')

        value = value.replace(/(\d{2})(\d)/, '$1/$2')
        value = value.replace(/(\d{2})(\d)/, '$1/$2')

        value = value.replace(/(\d{2})(\d{2})$/, '$1$2')
        this.updateValue(value)
      }
    }
  }
}
</script>

<style>
  @import "../../renderer/assets/css/jquery.ui.datepicker.css";
</style>


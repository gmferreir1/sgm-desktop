<template>
<div id="app">
  <vue-editor v-model="text_editor" :disabled="disable" :editorToolbar="customToolbar" placeholder="Escreva aqui ..."></vue-editor>
</div>
</template>

<script>
import {
  VueEditor
} from "vue2-editor";
export default {
  props: ["setText", "disable"],
  name: 'Editor',
  components: {
    VueEditor
  },
  data() {
    return {
      text_editor: '',
      customToolbar: [
        [{
          header: [1, 2, false]
        }],
        ['bold', 'italic', 'underline'],
        [{
          color: ['black', 'red', 'blue', 'yellow', 'Silver']
        }],
        [{
          align: ''
        }, {
          align: 'center'
        }, {
          align: 'right'
        }, {
          align: 'justify'
        }]
      ]
    }
  },
  watch: {
    text_editor() {
      this.$emit('textEditor', this.text_editor)
    },
    setText() {
      this.text_editor = this.setText;
    }
  },
  mounted() {
    this.$bus.$on('cleanHistoric', () => {
      this.text_editor = '';
    })

    this.$bus.$on('setTextEditor', text => {
      this.text_editor = text;
    })
  }
}
</script>

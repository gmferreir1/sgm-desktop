<!--
/****
** Component VueJS multiselect que ultiliza o bootstrap multiselect
** http://davidstutz.de/bootstrap-multiselect/
** @versão 0.9.13-1
* */
-->

<template>
  <div style="margin-right: 20px;" :class="class_name">
    <select :id="id" multiple="multiple" v-model="value_selected">
      <option
        :value="list.value"
        :id="index"
        v-for="(list, index) in data_select"
        :key="index"
      >{{ list.name }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "Multiselect",
  props: {
    dataSelect: {
      required: true,
      type: Array
    },
    id: String,
    search: {
      default: false,
      type: Boolean
    },
    multiple: {
      default: true,
      type: Boolean
    },
    setValue: {
      required: false
    },
    disable: {
      type: Boolean,
      default: false
    },
    class_name: {
      type: String,
      required: false
    },
    maxHeight: {
      type: Number,
      required: false,
      default: 300
    }
  },
  data() {
    return {
      data_select: [],
      value_selected: []
    };
  },
  methods: {
    renderSelect() {
      setTimeout(() => {
        const self = this;

        $(`#${this.id}`).multiselect({
          nonSelectedText: "Nada selecionado",
          buttonWidth: "100%",
          allSelectedText: "Todos",
          nSelectedText: "selecionados",
          includeSelectAllOption: false,
          enableCaseInsensitiveFiltering: self.search,
          enableFiltering: self.search,
          filterPlaceholder: "Pesquisar",
          selectAllText: "Todos",
          maxHeight: self.maxHeight,
          onChange: function(option, checked, select) {
            if (!self.multiple) {
              self.value_selected = [];
              self.value_selected.push($(option).val());
              self.$emit("value", self.value_selected[0]);
              return;
            }

            if (checked) {
              self.value_selected.push($(option).val());
              self.$emit("value", self.value_selected);
            } else {
              const index = self.value_selected.indexOf($(option).val());
              self.value_selected.splice(index, 1);
              self.$emit("value", self.value_selected);
            }
          }
        });
      });

      if (this.disable) {
        setTimeout(() => $(`#${this.id}`).multiselect("disable"), 400);
      }
    },
    updateSelect() {
      setTimeout(() => $(`#${this.id}`).multiselect("rebuild"));
    }
  },
  watch: {
    dataSelect() {
      this.data_select = this.dataSelect;
      this.updateSelect();
    },
    setValue() {
      if (this.setValue && this.setValue.length === 1) {
        if (this.value_selected.indexOf(this.setValue[0]) === -1) {
          this.value_selected.push(this.setValue[0]);
        }

        setTimeout(
          () => $(`#${this.id}`).multiselect("select", this.value_selected[0]),
          10
        );
        this.$emit("value", this.value_selected);
      } else {
        this.value_selected = this.setValue;
        setTimeout(
          () => $(`#${this.id}`).multiselect("select", this.value_selected),
          10
        );
        this.$emit("value", this.value_selected);
      }
    },
    disable() {
      if (this.disable) {
        setTimeout(() => $(`#${this.id}`).multiselect("disable"), 400);
      } else {
        setTimeout(() => $(`#${this.id}`).multiselect("enable"), 400);
      }
    }
  },
  mounted() {
    
    require("../../../node_modules/bootstrap-multiselect/dist/js/bootstrap-multiselect");
    this.data_select = this.dataSelect;
    this.renderSelect();

    if (!this.multiple) {
      const element = document.getElementById(this.id);
      element.removeAttribute("multiple");
    }
    //$('.multiselect').addClass(this.class_name);
  }
};
</script>



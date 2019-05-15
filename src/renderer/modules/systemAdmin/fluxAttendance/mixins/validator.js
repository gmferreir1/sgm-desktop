export default {
  validators: {
    "form.user": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.score": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.module_name": function(value) {
      return Validator.value(value).required("Obrigatório");
    }
  },
  methods: {
    submitForm() {
      const self = this;
      this.$validate().then(function(success) {
        if (success) {
          if (!self.form.id) {
            self.create();
          } else {
            self.update();
          }
        }
      });
    }
  }
};

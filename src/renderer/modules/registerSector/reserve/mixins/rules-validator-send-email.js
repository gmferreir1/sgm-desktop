export default {
  validators: {
    "form.client_code": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.client_name": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.client_email": function(value) {
      return Validator.value(value)
        .required("Obrigatório")
        .email("Email inválido");
    }
  },
  methods: {
    validateForm() {
      const self = this;
      this.$validate().then(function(success) {
        if (success) {
          self.next();
        }
      });
    }
  }
};

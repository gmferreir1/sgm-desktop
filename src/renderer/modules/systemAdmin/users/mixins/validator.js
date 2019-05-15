export default {
  validators: {
    "form.name": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.last_name": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.email": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.status": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.admin": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.password": function(value) {
      return Validator.value(value)
        .required("Obrigatório")
        .minLength(6, "Minímo 6 caracteres");
    },
    "form.password_confirm, form.password": function(repeat, password) {
      return Validator.value(repeat)
        .required("Obrigatório")
        .minLength(6, "Minímo 6 caracteres")
        .match(password, "Senhas não conferem");
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

export default {
  validators: {
    "form.contract": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.immobile_code": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.address": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.neighborhood": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.value": function(value) {
      return Validator.custom(function() {
        var number = parseInt(value);
        if (number === 0) {
          return "Obrigatório";
        }
      });
    },
    "form.owner_code": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.owner_name": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.owner_phone_01": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.owner_email": function(value) {
      return Validator.value(value).email("Inválido");
    },
    "form.transfer_date": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.reason_id": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.status": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.new_contract": function(value) {
      if (this.form.status === "r") {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.responsible_transfer": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.requester_name": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.requester_phone_01": function(value) {
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

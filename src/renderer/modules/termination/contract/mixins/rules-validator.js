export default {
  validators: {
    "form.contract": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.immobile_code": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.address": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.neighborhood": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.value": function (value) {
      return Validator.custom(function () {
        var number = parseInt(value);
        if (number === 0) {
          return "Obrigatório";
        }
      });
    },
    "form.type_immobile": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.type_location": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.owner_name": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.owner_phone_01": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.tenant_name": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.tenant_phone_01": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.type_register": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.reason": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.rent_again": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.destination": function (value) {
      if (this.form.rent_again === "y") {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.rp_register_sector": function (value) {
      if (this.form.type_register === "transfer") {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.new_contract_code": function (value) {
      if (this.form.type_register === "transfer") {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.caveat": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.surveyor": function (value) {
      if (!this.form.release_survey) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.rp_per_inactive": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.termination_date": function (value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.status": function (value) {
      return Validator.value(value).required("Obrigatório");
    }
  },
  methods: {
    submitForm() {
      const self = this;
      this.$validate().then(function (success) {
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

import cpf from "gerador-validador-cpf";

export default {
  validators: {
    "form.owner_code": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.owner_name": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.tenant_code": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        if (this.form.crm_code) {
          return Validator.value(value).required("Obrigatório");
        }
      }
    },
    "form.tenant_name": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        if (this.form.crm_code) {
          return Validator.value(value).required("Obrigatório");
        }
      }
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
    "form.type_location": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.immobile_type": function(value) {
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
    "form.value_negotiated": function(value) {
      return Validator.custom(function() {
        var number = parseInt(value);
        if (number === 0) {
          return "Obrigatório";
        }
      });
    },
    // dados da reserva
    "form.date_reserve": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.prevision": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.status": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.contract_data.contract": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.delivery_key": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.deadline": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.taxa": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.custom(function() {
          if (!Validator.isEmpty(value)) {
            var number = parseInt(value);
            if (isNaN(value) || number < 0 || number > 100) {
              return "Inválido";
            }
          } else {
            return "Obrigatório";
          }
        });
      }
    },
    "form.contract_data.observation": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.other_observation": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        if (this.form.contract_data.observation === "other") {
          return Validator.value(value).required("Obrigatório");
        }
      }
    },
    "form.contract_data.origin_city": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.origin_state": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.finality": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.ticket": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.tx_contract": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.bank_expense": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.date_init_contract": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.due_date_rent": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    "form.contract_data.loyalty_discount": function(value) {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return Validator.value(value).required("Obrigatório");
      }
    },
    // end of dados reserva

    // dados do cliente
    "form.type_client": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.client_cpf": function(value) {
      if (this.form.type_client === "pf") {
        return Validator.custom(function() {
          if (!Validator.isEmpty(value)) {
            if (!cpf.validate(value)) {
              return "CPF inválido";
            }
          }
        });
      }
    },
    "form.client_name": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.client_phone_01": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    // end of dados do cliente

    // dados do atendente
    "form.attendant_register": function(value) {
      return Validator.value(value).required("Obrigatório");
    },
    "form.attendant_reception": function(value) {
      return Validator.value(value).required("Obrigatório");
    }
    // end dados do atendente
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

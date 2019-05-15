export default {
  data() {
    return {
      form: {
        crm_code: "",
        immobile_code: "",
        address: "",
        neighborhood: "",
        type_location: "",
        immobile_type: "",
        value_negotiated: 0,
        value: 0,
        code_reserve: "",
        date_reserve: window.moment().format("DD/MM/YYYY"),
        prevision: window
          .moment()
          .add(2, "days")
          .format("DD/MM/YYYY"),
        status: "r",
        contract_data: {
          contract: "",
          delivery_key: "", // entrega das chaves
          deadline: "",
          taxa: "",
          observation: "",
          other_observation: "",
          origin_city: "",
          origin_state: "",
          finality: "",
          ticket: "",
          tx_contract: "",
          bank_expense: "",
          due_date_rent: "",
          loyalty_discount: "",
          date_init_contract: ""
        },
        type_client: "pf",
        client_cpf: "",
        client_cnpj: "",
        client_name: "",
        client_rg: "",
        client_profession: "",
        client_company: "",
        client_zip_code: "",
        client_address: "",
        client_neighborhood: "",
        client_city: "",
        client_state: "",
        client_phone_01: "",
        client_phone_02: "",
        client_phone_03: "",
        client_email: "",
        attendant_register: "",
        attendant_reception: "",
        historic: ""
      }
    };
  },
  methods: {
    /**
     * Cria uma nova reserva
     */
    create() {},
    /**
     * Edit
     */
    edit(id) {},
    /**
     * Update
     */
    update() {}
  }
};

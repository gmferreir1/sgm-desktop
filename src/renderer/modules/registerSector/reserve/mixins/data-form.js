import { toUpperCase } from "@/util/string";
import { dateFormat } from "@/util/dateTime";
import extraDataModule from "../extra-data-module";
import systemAlert from "@/mixins/systemAlert";
import deletePrint from "@/mixins/deletePrint";
import { mapActions } from "vuex";

export default {
  props: ["refreshDataReserve"],
  mixins: [systemAlert, deletePrint],
  data() {
    return {
      loading_owner_data: false,
      loading_tenant_data: false,
      loading_immobile_data: false,
      loading_query_zip_code_data: false,
      loading: false,
      images: {
        house: require("@/assets/icons/house.png"),
        search: require("@/assets/icons/search.png")
      },
      confirm_end_reserve: false,
      select: extraDataModule.select,
      form: {
        crm_code: "",
        owner_code: "",
        owner_name: "",
        tenant_code: "",
        tenant_name: "",
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
      },
      data_before_update: {
        status: null
      },
      confirm_end_reserve: false
    };
  },
  methods: {
    ...mapActions("AdminUser", ["getAllUsers"]),
    dateFormat,
    /** Consulta os tipos de imovel na base de dados */
    getTypesImmobile() {
      http
        .get("register-sector/reserve/query/types-immobile")
        .then(results => {
          this.select.types_immobile = results.data;
        })
        .catch(err => {})
        .finally(() => {});
    },
    /** consulta os dados do proprietário ou inquilino */
    getClientData(code, type) {
      if (code.length < 1 || !type || this.disabledChangeContractData) return;

      this.loading_owner_data = type === "owner" ? true : false;
      this.loading_tenant_data = type === "tenant" ? true : false;

      const queryParams = {
        params: {
          code
        }
      };

      http
        .get("register-sector/reserve/query/client", queryParams)
        .then(result => {
          if (type === "owner") {
            this.form.owner_code = result.data.codigo;
            this.form.owner_name = result.data.nome.toUpperCase();
          }
          if (type === "tenant") {
            this.form.tenant_code = result.data.codigo;
            this.form.tenant_name = result.data.nome.toUpperCase();
          }
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => {
            this.loading_owner_data = false;
            this.loading_tenant_data = false;
          }, 300);
        });
    },
    /** Consulta os dados do imovel pelo código */
    getImmobileData() {
      if (this.form.immobile_code.length < 2 || this.disabledChangeContractData)
        return;

      this.loading_immobile_data = true;

      const queryParams = {
        params: {
          immobile_code: this.form.immobile_code
        }
      };

      http
        .get("register-sector/reserve/query/immobile", queryParams)
        .then(result => {
          const data = result.data.imovel;
          this.form.address = `${data.endereco}, ${data.numero}`.toUpperCase();
          this.form.neighborhood = `${data.bairro}`.toUpperCase();
          this.form.immobile_type = data.codigotipo;
          this.form.value =
            data.valor.split(" ").length > 1 ? data.valor.split(" ")[1] : 0;
          this.form.subscription_iptu = data.indiceiptu
            ? data.indiceiptu
            : null;
        })
        .catch(err => {
          this.form.address = "";
          this.form.neighborhood = "";
          this.form.immobile_type = "";
          this.form.value = 0;
          this.validation.reset();
        })
        .finally(() =>
          setTimeout(() => {
            this.loading_immobile_data = false;
          }, 300)
        );
    },
    /** Consulta todos os usuários do sistema para inserir no select de responsável */
    getUsers() {
      this.getAllUsers()
        .then(results => {
          const usersForSelect = results.data.map(user => {
            return {
              name: `${user.name.toUpperCase()} ${user.last_name.toUpperCase()}`,
              value: user.id
            };
          });
          const collection = collect(usersForSelect);
          this.select.users = collection.sortBy("name").all();
        })
        .catch(err => {});
    },
    /**
     * Consulta o cep
     * @param {*} zipCode
     */
    queryZipCode(zipCode) {
      if (zipCode.length !== 8 || this.disabledChangeContractData) return;
      this.loading_query_zip_code_data = true;

      const queryParams = {
        params: {
          zip_code: zipCode
        }
      };

      http
        .get("query-zip-code", queryParams)
        .then(result => {
          const data = toUpperCase(result.data, ["uf"]);
          this.form.client_address = data.logradouro;
          this.form.client_neighborhood = data.bairro;
          this.form.client_city = data.localidade;
          this.form.client_state = data.uf;
          this.setFocus("client_address");
        })
        .catch(err => {})
        .finally(() =>
          setTimeout(() => (this.loading_query_zip_code_data = false), 300)
        );
    },
    /** Cria uma nova reserva **/
    create() {
      this.$bus.$emit("openLoading");
      http
        .post("register-sector/reserve", this.form)
        .then(result => {
          _notification.success();
          this.$router.push({
            name: "registerSector_reserve_edit",
            params: { id: result.data }
          });
          this.$bus.$emit("cleanHistoric");
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        });
    },
    /**
     * Edit
     * @param {*} id
     */
    async edit(id, print = false) {
      this.$bus.$emit("openLoading");

      const queryParams = {
        params: {
          print
        }
      };

      return http
        .get(`register-sector/reserve/${id}`, queryParams)
        .then(result => {
          /** chama a impressão */
          if (print) {
            const url = window.URL_API + "/" + result.data.file_name;
            this.$electron.ipcRenderer.send("printPdf", {
              url,
              file_type: "pdf"
            });

            /** pergunta se a impressão foi feita corretamente para remover */
            this.deletePrint(result.data.file_and_path, false);
            return;
          }

          let contractData = result.data.contract_data;
          const reserveData = toUpperCase(result.data, [
            "type_location",
            "status",
            "type_client",
            "client_email",
            "client_state"
          ]);

          reserveData.prevision = dateFormat(reserveData.prevision);
          reserveData.date_reserve = dateFormat(reserveData.date_reserve);

          /** somente para cadastros antigos */
          reserveData.owner_code = !reserveData.owner_code
            ? ""
            : reserveData.owner_code;
          reserveData.owner_name = !reserveData.owner_name
            ? ""
            : reserveData.owner_name;
          if (
            !_.find(
              this.select.types_immobile,
              value => value.value === reserveData.immobile_type
            )
          ) {
            reserveData.immobile_type = "";
          }

          this.form = reserveData;
          this.data_before_update.status = reserveData.status;
          /** seta no formulário os dados do contrato */
          this.setContractData(contractData);
          return result;
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        });
    },
    /**
     * Seta no formulário os dados do contrato
     * @param {*} contractData
     */
    setContractData(contractData) {
      const exclude = [
        "loyalty_discount",
        "bank_expense",
        "ticket",
        "tx_contract",
        "origin_state",
        "observation",
        "finality"
      ];
      contractData = toUpperCase(contractData, exclude);
      contractData.date_init_contract = dateFormat(
        contractData.date_init_contract
      );
      contractData.due_date_rent = dateFormat(contractData.due_date_rent);
      contractData.delivery_key = dateFormat(contractData.delivery_key);
      this.form.contract_data = contractData;
    },
    /**
     * Update
     */
    update() {
      /** Mensagem de confirmação para finalização da reserva **/
      if (
        this.reserveSigned &&
        this.data_before_update.status !== "as" &&
        this.data_before_update.status !== "ap" &&
        this.data_before_update.status !== "af" &&
        !this.confirm_end_reserve
      ) {
        let message;
        if (this.form.status === "as") {
          message = `Tem certeza que deseja finalizar a reserva ?
              <p style='font-weight: bold; color: red; font-size: 15px;'>Nenhuma alteração sera permitida depois desta ação !</p>`;
        } else {
          message = `Tem certeza que deseja alterar o status da reserva ?
          <p style='font-weight: bold; color: red; font-size: 15px;'>Somente alterações básicas serão permitidas depois desta ação !</p>`;
        }

        this.showAlert(message).then(confirm => {
          if (confirm) {
            this.confirm_end_reserve = true;
            this.update();
          }
        });
        return;
      }

      this.$bus.$emit("openLoading");

      http
        .put(`register-sector/reserve/${this.form.id}`, this.form)
        .then(result => {
          _notification.success();
          this.edit(this.form.id);
        })
        .catch(err => {
          this.confirm_end_reserve = false;
        })
        .finally(() => {
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        });
    },
    checkStatusForSelect() {
      const dataForm = Object.assign({}, this.form);
      if (dataForm.status !== "c") {
        const selectStatus = this.select.status;
        const index = _.findIndex(selectStatus, select => select.value === "c");
        if (index !== -1) {
          this.select.status.splice(index, 1);
        }
      }
    },
    setFocus(id) {
      document.getElementById(id).focus();
    },
    /** Imprime a ficha de reserva */
    printRecord() {
      this.edit(this.form.id, true);
    }
  },
  computed: {
    reserveSigned() {
      if (
        this.form.status === "as" ||
        this.form.status === "ap" ||
        this.form.status === "af"
      ) {
        return true;
      }
    },
    disabledAction() {
      if (this.form.id) {
        return true;
      }
    },
    disabledChangeContractData() {
      if (
        this.data_before_update.status === "as" ||
        this.data_before_update.status === "ap" ||
        this.data_before_update.status === "af" ||
        this.data_before_update.status === "c"
      ) {
        return true;
      }
    },
    disabledCancelReserve() {
      if (
        this.data_before_update.status === "as" ||
        this.data_before_update.status === "ap" ||
        this.data_before_update.status === "af" ||
        this.data_before_update.status === "c"
      ) {
        return true;
      }
    },
    blockTotalChanges() {
      if (
        this.data_before_update.status === "as" ||
        this.data_before_update.status === "c"
      ) {
        return true;
      }
    }
  },
  async mounted() {
    this.getTypesImmobile();
    this.getUsers();

    /** verifica a url acessada pelo usuário, se é edição ou criação */
    const routeData = this.$route;
    if (routeData.name === "registerSector_reserve_edit") {
      await this.edit(routeData.params.id);
    }

    /** verifica se o contrato for diferente de cancelado para remover o status de cancelamento do select */
    this.checkStatusForSelect();
  },
  watch: {
    refreshDataReserve() {
      this.select.status.push({ value: "c", name: "CANCELADO" });
      setTimeout(() => this.edit(this.$route.params.id), 200);
    }
  }
};

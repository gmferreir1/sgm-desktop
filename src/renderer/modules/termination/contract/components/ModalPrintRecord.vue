<template>
  <div>
    <div id="modalPrintRecord" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="IMPRESSÃO DE FICHAS DA RESCISÃO"/>
          <!-- / modal header -->

          <div class="modal-body" style="padding: 5px !important;">
            <div class="row">
              <div class="col-md-12">
                <div class="box box-danger" style="margin-bottom: 0px !important">
                  <div class="box-header with-border" style="padding-top: 3px">
                    <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
                      <span class="fa fa-print"></span>
                      IMPRESSÃO DE FICHAS
                    </h3>
                  </div>
                  <!-- /.box-header -->

                  <div class="box-body" style="padding-top: 0px; padding-bottom: 10px">
                    <div class="row">
                      <div class="col-md-12">
                        <label>Informe o Tipo de Impressão</label>
                        <select class="form-control input-sm" v-model="form.type_record">
                          <option value>Informe</option>
                          <option value="termination_contract">Ficha Rescisão de Contrato</option>
                          <option value="transfer_contract">Ficha Transferência de Contrato</option>
                          <option value="delivery_keys_with_pendencies_pdf">Term. Entrega Chaves Com Ressalva (PDF)</option>
                          <option value="delivery_keys_with_pendencies_word">Term. Entrega Chaves Com Ressalva (WORD)</option>
                          <option value="delivery_keys_before_survey_pdf">Term. Entrega Chaves Antes da Vistoria (PDF)</option>
                          <option value="delivery_keys_before_survey_word">Term. Entrega Chaves Antes da Vistoria (WORD)</option>
                          <option value="delivery_keys_after_survey_pdf">Term. Entrega Chaves Após da Vistoria (PDF)</option>
                          <option value="delivery_keys_after_survey_word">Term. Entrega Chaves Após da Vistoria (WORD)</option>
                        </select>
                      </div>
                    </div>
                    
                    <!-- data da vistoria (ficha de pendencias) -->
                    <div class="row" v-if="form.type_record === 'delivery_keys_with_pendencies_word' || form.type_record === 'delivery_keys_with_pendencies_pdf' "
                      style="margin-top: 10px;">
                      <div class="col-md-6 div-160">
                        <label>Data da Vistoria</label>
                        <date-picker class="form-control input-sm has-warning" v-model="form.date_survey" placeholder="DD/MM/AAAA" />
                      </div>
                    </div>

                    <!-- entrega de chaves antes e depois da vistoria -->
                    <div class="row" style="margin-top: 10px;" 
                    v-if="form.type_record === 'delivery_keys_before_survey_pdf' || form.type_record === 'delivery_keys_before_survey_word' 
                    || form.type_record === 'delivery_keys_after_survey_pdf' || form.type_record === 'delivery_keys_after_survey_word'">
                        <div class="col-md-8">
                          <label>Nome</label>
                          <input type="text" class="form-control input-sm has-warning" v-model="form.name">
                        </div>
                        <div class="col-md-4">
                          <label>CPF</label>
                          <the-mask
                            class="form-control input-sm has-warning"
                            :mask="['###.###.###.##']"
                            v-model="form.cpf"
                            placeholder="som. números"
                            autocomplete="off"
                          />
                          <div class="error" v-if="invalid_cpf">CPF inválido</div>
                        </div>
                    </div>
                  </div>

                  <div class="row" style="padding: 0px 0px 0px 10px">
                    <div class="col-md-12">
                      <!-- loader -->
                      <div class="loader" style="float: left" v-if="loading"></div>
                      <!-- / loader -->

                      <button
                        class="button btn btn-sm btn-primary"
                        :disabled="disabledButtonPrint"
                        v-if="!loading"
                        @click="generatePrinter"
                      >Imprimir Ficha</button>
                    </div>
                  </div>

                  <div class="row" style="padding: 0px 0px 10px 10px">
                    <div class="col-md-12">
                      <required />
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cpf from "gerador-validador-cpf";
import ModalHeader from "../../../../components/ModalHeader";
import deletePrint from "../../../../mixins/deletePrint";
import DatePicker from "../../../../components/DatePicker";
import Required from "../../../../components/Required";

export default {
  name: "ModalPrintRecord",
  props: ["dataModal"],
  mixins: [ deletePrint ],
  components: { ModalHeader, DatePicker, Required },
  data() {
    return {
      form: {
        type_record: "",
        termination_id: null,
        date_survey: "",
        cpf: "",
      },
      loading: false,
      invalid_cpf: false
    };
  },
  methods: {
    openModal() {
      $("#modalPrintRecord").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    generatePrinter() {
      this.loading = true;

      const dataForm = Object.assign({}, this.form);

      if (dataForm.type_record === "delivery_keys_with_pendencies_pdf") {
        dataForm.extension = "pdf";
        dataForm.type_record = "delivery_keys_with_pendencies";
      }
      if (dataForm.type_record === "delivery_keys_with_pendencies_word") {
        dataForm.extension = "word";
        dataForm.type_record = "delivery_keys_with_pendencies";
      }
      

      if (dataForm.type_record === "delivery_keys_before_survey_pdf") {
        dataForm.extension = "pdf";
        dataForm.type_record = "delivery_keys_before_survey";
      }
      
      if (dataForm.type_record === "delivery_keys_before_survey_word") {
        dataForm.extension = "word";
        dataForm.type_record = "delivery_keys_before_survey";
      }

      if (dataForm.type_record === "delivery_keys_after_survey_pdf") {
        dataForm.extension = "pdf";
        dataForm.type_record = "delivery_keys_after_survey";
      }
      if (dataForm.type_record === "delivery_keys_after_survey_word") {
        dataForm.extension = "word";
        dataForm.type_record = "delivery_keys_after_survey";
      }

      const queryParams = {
        params: { ...dataForm }
      };
      http
        .get("termination/contract/generate/printer", queryParams)
        .then(result => {
          const url = window.URL_API + "/" + result.data.file_name;
          this.$electron.ipcRenderer.send("printPdf", { url, file_type: dataForm.extension });
          this.deletePrint(result.data.file_and_path, false);
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.loading = false), 300));
    },
    closeModal() {
      $("#modalPrintRecord").modal("hide");
    }
  },
  watch: {
    dataModal() {
      this.loading = false;
      this.invalid_cpf = false;
      this.form.termination_id = this.dataModal.termination_id;
      this.openModal();
    },
    "form.type_record"() {
      if (this.form.type_record !== "delivery_keys_with_pendencies_word") {
        this.form.date_survey = "";
      }
      this.form.cpf = "";
      this.invalid_cpf = false;
    },
    "form.cpf"() {
      if (this.form.cpf) {
        this.invalid_cpf = !cpf.validate(this.form.cpf);
      } else {
        this.invalid_cpf = false;
      }
    }
  },
  computed: {
    disabledButtonPrint() {
      if (!this.form.type_record || !this.form.termination_id 
        || this.form.type_record === 'delivery_keys_with_pendencies_word' && !this.form.date_survey 
        || this.form.type_record === 'delivery_keys_with_pendencies_pdf' 
        && !this.form.date_survey || this.form.type_record === 'delivery_keys_before_survey_pdf' && this.invalid_cpf
        || this.form.type_record === 'delivery_keys_before_survey_pdf' && !this.form.name
        || this.form.type_record === 'delivery_keys_after_survey_pdf' && this.invalid_cpf
        || this.form.type_record === 'delivery_keys_after_survey_pdf' && !this.form.name) {
          return true;
      }
      return false;
    }
  }
};
</script>


<template>
  <div>
    <div id="modalArchiveProcess" class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content">
          <!-- modal header -->
          <modal-header @closeModal="closeModal" title="ARQUIVAMENTO DO PROCESSO DE RESCISÃO"/>
          <!-- / modal header -->

          <div class="modal-body">
            <div class="row">
              <div class="col-md-12">
                <span
                  style="font-size: 15px;; margin-bottom: 0px;"
                >Tem certeza que deseja arquivar o processo ?</span>
              </div>
            </div>

            <div class="row">
              <div class="col-md-12">
                <span
                  style="font-weight: bold; color: red; font-size: 15px;"
                >Esta operação é irreversível após concluída !</span>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-8">
                <label>Informe o Tipo de Arquivamento</label>
                <select class="form-control input-sm" v-model="form.type_release" :disabled="loading">
                  <option value="">Informe</option>
                  <option value="rent">Arquivamento Aluguel</option>
                  <option value="justice">Arquivamento Justiça</option>
                </select>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">

                <!-- loader -->
                  <div class="loader" v-if="loading" style="float: left"></div>
                  <div style="float: left; margin-left: 10px;" v-if="loading">Aguarde, arquivando processo ...</div>
                <!-- / loader -->
        
                <button class="button btn btn-sm btn-danger" :disabled="!form.type_release" @click="archiveProcess" v-if="!loading">
                  <span class="fa fa-check"></span>
                  Arquivar Processo
                </button>
              
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalHeader from "../../../../components/ModalHeader";
import Editor from "../../../../components/Editor";
import deletePrint from "../../../../mixins/deletePrint";

export default {
  name: "ModalArchiveProcess",
  props: ["dataModal"],
  mixins: [deletePrint],
  components: {
    ModalHeader
  },
  data() {
    return {
      loading: false,
      form: {
        type_release: ""
      },
      images: {
        archive: require("../../../../assets/images/icon_database.png")
      }
    };
  },
  methods: {
    openModal() {
      $("#modalArchiveProcess").modal({
        keyboard: false,
        backdrop: "static"
      });
    },
    archiveProcess() {
      //this.loading = true;
      const terminationData = this.dataModal.termination_data;
      
      const dataArchive = {
        termination_id: terminationData.id,
        contract: terminationData.contract,
        termination_date: terminationData.end_process,
        year_release: moment().format("YYYYY"),
        type_release: this.form.type_release
      }

      console.log(dataArchive)
    },
    closeModal() {
      $("#modalArchiveProcess").modal("hide");
    }
  },
  watch: {
    dataModal() {

      // verifica se a inativação tem a data do fim do processo.
      if (!this.dataModal.termination_data.end_process && this.dataModal.termination_data.status === "r" || this.dataModal.termination_data.status === "cej") {
        _notification.error("A rescisão ainda não foi finalizada. Finalize antes de arquivar o processo", 500);
        return;
      }

      if (this.dataModal.termination_data.status === "j") {
        this.form.type_release = "justice";
      } else {
        this.form.type_release = "rent";
      }

      this.openModal();
    }
  }
};
</script>


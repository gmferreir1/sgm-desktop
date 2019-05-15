<template>
  <div>
    <div class="row">
      <div class="col-md-8">
        <div class="box box-danger">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-file"></span>
              CONFIGURAÇÕES DE DOCUMENTOS
            </h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="padding-top: 0px;">
            <div class="row">
              <div class="col-md-12">
                <label>Informe o Documento</label>
                <select class="form-control input-sm" v-model="form.type_document">
                  <option value>Selecione o documento</option>
                  <option
                    value="owner_notification_new_location"
                  >Notificação Proprietário da Nova Locação</option>
                </select>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <button
                  class="button btn btn-sm btn-default"
                  :disabled="!form.type_document"
                  @click="search"
                >Pesquisar Documento</button>
                
                <button
                  class="button btn btn-sm btn-danger"
                  @click="confirmSetDefaultText"
                  :disabled="!this.form.type_document"
                >Definir Texto Padrão</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PanelSelectDocument",
  data() {
    return {
      form: {
        type_document: ""
      }
    };
  },
  methods: {
    search() {
      this.$bus.$emit("openLoading");
      this.$emit("searchDocument", this.form.type_document);
    },
    confirmSetDefaultText() {
      this.$confirm(
        "Tem certeza que deseja definir o texto padrão para o documento selecionado ?",
        {
          confirmButtonText: "Sim, confirmar",
          cancelButtonText: "Não, cancelar",
          type: "warning"
        }
      )
        .then(() => {
          this.setDefaultText();
        })
        .catch(_ => {});
    },
    setDefaultText() {
      this.$bus.$emit("openLoading");
      const queryParams = {
        params: {
          type_document: this.form.type_document
        }
      };

      http
        .get("admin/document/set-default-text", queryParams)
        .then(result => {
          _notification.success();
          this.search();
        })
        .catch(err => this.$$bus.$emit("closeLoading"));
    }
  },
  watch: {
    "form.type_document"() {
      this.$emit("selectDocument", this.form.type_document);
    }
  }
};
</script>

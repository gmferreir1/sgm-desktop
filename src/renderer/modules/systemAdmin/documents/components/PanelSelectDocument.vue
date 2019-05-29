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
                  <option :value="list.value" v-for="list in select.documents">{{ list.name }}</option>
                </select>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <!-- loading -->
                <div class="loader pull-left" v-if="loading"></div>
                <!-- / loading -->
                <button
                  class="button btn btn-sm btn-default"
                  :disabled="!form.type_document"
                  v-if="!loading"
                  @click="search"
                >Pesquisar Documento</button>

                <button
                  class="button btn btn-sm btn-danger"
                  @click="confirmSetDefaultText"
                  :disabled="!this.form.type_document"
                  v-if="!loading"
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
import systemAlert from "@/mixins/systemAlert";

export default {
  name: "PanelSelectDocument",
  mixins: [systemAlert],
  data() {
    return {
      loading: false,
      form: {
        type_document: ""
      },
      select: {
        documents: [
          {
            value: "owner_notification_new_location",
            name: "notificação proprietário da nova locação"
          }
        ]
      }
    };
  },
  methods: {
    /** Pesquisa os dados do documento na base de dados */
    search() {
      this.loading = true;

      const queryParams = {
        params: this.form
      };

      http
        .get("admin/letter-and-documents/letter-text", queryParams)
        .then(result => {
          this.$emit("documentData", {
            type_document: this.form.type_document,
            text: result.data
          });
        })
        .catch(err => {})
        .finally(() => {
          setTimeout(() => (this.loading = false), 300);
        });
    },
    confirmSetDefaultText() {
      const message = "Tem certeza que deseja definir o texto para o padrão ?";
      this.showAlert(message).then(confirm => {
        if (confirm) {
          this.setDefaultText();
        }
      });
    },
    setDefaultText() {
      const queryParams = {
        params: {
          type_document: this.form.type_document
        }
      };

      http
        .delete("admin/letter-and-documents/letter-text", queryParams)
        .then(result => {
          _notification.success();
          this.search();
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.loading = false), 300));
    }
  },
  watch: {
    "form.type_document"() {
      this.$emit("selectDocument", this.form.type_document);
    }
  }
};
</script>

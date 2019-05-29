<template>
  <div>
    <panel-select-document @documentData="setText"/>

    <div class="row">
      <div class="col-md-12">
        <div class="box box-danger">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-edit"></span>
              EDITOR DE DOCUMENTOS
            </h3>
          </div>
          <!-- /.box-header -->
          <div class="box-body" style="padding-top: 0px;">
            <div class="row">
              <div class="col-md-12">
                <editor @textEditor="text => this.form.text = text"/>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <!-- loading -->
                <div class="loader pull-left" v-if="loading"></div>
                <!-- / loading -->

                <button
                  class="button btn btn-sm btn-primary"
                  @click="update"
                  :disabled="!this.form.text"
                  v-if="!loading"
                >
                  <span class="fa fa-check"></span>
                  Salvar Dados
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
import PanelSelectDocument from "./PanelSelectDocument";
import Editor from "@/components/Editor";

export default {
  name: "DocumentEditor",
  props: ["searchDocument"],
  components: {
    PanelSelectDocument,
    Editor
  },
  data() {
    return {
      loading: false,
      type_document: null,
      form: {
        text: ""
      },
      document_data: {}
    };
  },
  methods: {
    getData() {
      const queryParams = {
        params: {
          type_document: this.searchDocument.data
        }
      };

      http
        .get("admin/document", queryParams)
        .then(result => {
          this.form = result.data;
          this.$bus.$emit("setTextEditor", this.form.text);
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    setText(data) {
      this.document_data = data;
      this.$bus.$emit("setTextEditor", data.text);
    },
    update() {
      this.loading = true;
      const data = {
        text: this.form.text,
        type_letter: this.document_data.type_document
      };
      http
        .put("admin/letter-and-documents/letter-text", data)
        .then(result => {
          _notification.success();
        })
        .catch(err => {})
        .finally(() => setTimeout(() => (this.loading = false), 300));
    }
  },
  watch: {
    dataComponent() {
      if (!this.dataComponent.data) {
        this.$bus.$emit("cleanHistoric");
      }
    }
  }
};
</script>

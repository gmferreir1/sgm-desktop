<template>
  <div>
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
                <editor :disable="!dataComponent.data ? true : false" @textEditor="text => this.form.text = text"/>
              </div>
            </div>

            <div class="row" style="margin-top: 10px;">
              <div class="col-md-12">
                <button class="button btn btn-sm btn-primary" @click="submitForm" :disabled="!this.form.text">
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
import Editor from "../../../../components/Editor";

export default {
  name: "DocumentEditor",
  props: ["dataComponent", "searchDocument"],
  components: {
    Editor
  },
  data() {
    return {
      type_document: null,
      form: {
        text: ""
      }
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
    submitForm() {
      if (!this.form.id) {
        this.create();
        return;
      }
      this.update();
    },
    create() {
      this.$bus.$emit("openLoading");
      this.form.type_document = this.searchDocument.data;
      http
        .post("admin/document", this.form)
        .then(result => {
          _notification.success();
          this.getData();
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    update() {
      this.$bus.$emit("openLoading");
      this.form.type_document = this.searchDocument.data;
      http.put(`admin/document/${this.form.id}`, this.form)
        .then(result => {
          _notification.success();
          this.getData();
        }).catch(err => this.$bus.$emit("closeLoading"))
    }
  },
  watch: {
    dataComponent() {
      if (!this.dataComponent.data) {
        this.$bus.$emit("cleanHistoric");
      }
    },
    searchDocument() {
      
      this.form = {
        text: ""
      }

      this.getData();
    }
  }
};
</script>

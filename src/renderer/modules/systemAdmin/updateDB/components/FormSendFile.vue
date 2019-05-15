<template>
  <div>
    <div class="row">
      <!-- left column -->
      <div class="col-md-6">
        <!-- general form elements -->
        <div class="box box-primary">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <span class="fa fa-database"></span>
              FORMULÁRIO ENVIO DE ARQUIVO
            </h3>
          </div>
          <!-- /.box-header -->

          <div class="box-body">
            <form @submit.prevent="attachmentFile" id="form_report">
              <div class="row" style="margin-top: 10px;">
                <div class="col-md-12">
                  <label style="font-size: 12px">Envio da Base de Dados</label>
                  <input type="file" id="file" name="file">
                </div>
              </div>

              <div class="row" style="margin-top: 10px;">
                <div class="col-md-2">
                  
                  <div style="font-size: 12px;" v-if="loading">{{ message_send }}</div>

                  <!-- loader -->
                  <div class="loader" v-if="loading"></div>
                  <!-- / loader -->

                  <button
                    class="button btn btn-sm btn-primary"
                    v-if="!loading"
                    type="submit"
                  >Enviar Arquivo</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FormSendFile",
  data() {
    return {
      loading: false,
      files: [],
      message_send: null
    };
  },
  methods: {
    attachmentFile(e) {
      this.target_data = !e ? this.target_data : e.target[0];
      this.files = this.target_data.files;

      if (!this.files.length) return;
      this.loading = true;

      if (this.files.length > 0) {
        let form = new FormData();
        for (let i = 0; i < this.files.length; i++) {
          form.append("attachment", this.files[i]);

          const config = {
            onUploadProgress: progressEvent => {
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              this.message_send =
                progress != 100
                  ? "Enviando arquivo: " + progress + " %"
                  : "Gravando arquivo no servidor, aguarde ...";
            }
          };

          http
            .post("admin/update-database/upload-file", form, config)
            .then(result => {
              _notification.success();
              $("#file").val("");
              this.cleanForm();
              setTimeout(() => (this.loading = false));
            })
            .catch(err => {
              this.loading = false;
            });
        }
      }
    }
  }
};
</script>

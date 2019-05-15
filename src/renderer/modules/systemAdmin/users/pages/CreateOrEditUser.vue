<template>
  <div>

    <div class="box box-danger">
      <div class="box-header">
        <h3 class="box-title box-title-up">{{ title_page }}</h3>
      </div>
      <!-- /.box-header -->
      <div
        class="box-body"
        style="padding-top: 0px;"
      >

        <!-- form -->
        <div class="form-group">

          <div class="row">
            <div class="col-md-4">
              <label>Nome</label>
              <input
                type="text"
                class="form-control input-sm has-warning"
                v-model="form.name"
              >
              <div class="error">{{ validation.firstError('form.name') }}</div>
            </div>
            <div class="col-md-3">
              <label>Sobrenome</label>
              <input
                type="text"
                class="form-control input-sm has-warning"
                v-model="form.last_name"
              >
              <div class="error">{{ validation.firstError('form.last_name') }}</div>
            </div>
            <div class="col-md-3">
              <label>Email</label>
              <input
                type="text"
                class="form-control input-sm has-warning"
                v-model="form.email"
                :disabled="form.id"
              >
              <div class="error">{{ validation.firstError('form.email') }}</div>
            </div>
          </div>

          <div
            class="row"
            style="margin-top: 10px;"
          >
            <div class="col-md-2">
              <label>Perfil</label>
              <select
                class="form-control input-sm"
                v-model="form.admin"
              >
                <option value="1">Administrador</option>
                <option value="0">Normal</option>
              </select>
              <div class="error">{{ validation.firstError('form.admin') }}</div>
            </div>

            <div class="col-md-2">
              <label>Status</label>
              <select
                class="form-control input-sm"
                v-model="form.status"
              >
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
              </select>
              <div class="error">{{ validation.firstError('form.status') }}</div>
            </div>

            <div class="col-md-3">
              <label>Senha</label>
              <input
                type="password"
                class="form-control input-sm"
                v-model="form.password"
              >
              <div class="error">{{ validation.firstError('form.password') }}</div>
            </div>

            <div class="col-md-3">
              <label>Repita a Senha</label>
              <input
                type="password"
                class="form-control input-sm"
                v-model="form.password_confirm"
              >
              <div class="error">{{ validation.firstError('form.password_confirm') }}</div>
            </div>
          </div>

          <div
            class="row"
            style="margin-top: 10px;"
          >
            <div class="col-md-12">
              <button
                class="button btn btn-sm btn-danger"
                @click="submitForm"
              >
                <span class="fa fa-check"></span>
                Salvar Dados
              </button>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12">
              <required />
            </div>
          </div>

        </div>
        <!-- / end form -->

      </div>
    </div>

  </div>
</template>

<script>
import validator from "../mixins/validator";
import Required from "../../../../components/Required";

export default {
  name: "CreateOrEditUser",
  mixins: [validator],
  components: { Required },
  data() {
    return {
      title_page: "",
      form: {
        name: "",
        last_name: "",
        email: "",
        status: 1,
        admin: 0,
        password: "",
        password_confirm: ""
      }
    }
  },
  methods: {
    create() {
      this.$bus.$emit("openLoading");
      http.post("admin/user", this.form)
        .then(results => {
          _notification.success();
          this.cleanForm();
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        }).catch(err => this.$bus.$emit("closeLoading"))
    },
    edit(id) {
      http.get(`admin/user/${id}`)
        .then(result => {
          const dataEdit = result.data;
          dataEdit.name = dataEdit.name.toUpperCase();
          dataEdit.last_name = dataEdit.last_name.toUpperCase();
          dataEdit.password = "no_change_password";
          dataEdit.password_confirm = "no_change_password";
          this.form = dataEdit;
          setTimeout(() => this.$bus.$emit("closeLoading"), 300)
        }).catch(err => this.$bus.$emit("closeLoading"))
    },
    update() {
      this.$bus.$emit("openLoading");
      http.put(`admin/user/${this.form.id}`, this.form)
        .then(results => {
          _notification.success();
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        }).catch(err => this.$bus.$emit("closeLoading"))
    },
    cleanForm() {
      this.form = {
        name: "",
        last_name: "",
        email: "",
        status: 1,
        admin: 0,
        password: "",
        password_confirm: ""
      }
      this.validation.reset();
    }
  },
  mounted() {
    const routeData = this.$route
    if (routeData.name === "systemAdmin_users_edit") {
      this.$bus.$emit("openLoading");
      this.edit(routeData.params.id)
    }
    this.title_page = routeData.name === "systemAdmin_users_create" ? "Formulário Criação de Usuário" : "Formulário Edição de Usuário";
  }
}
</script>
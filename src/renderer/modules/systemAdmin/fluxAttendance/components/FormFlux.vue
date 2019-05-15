<template>
  <div>
    <div class="box box-danger">
      <div class="box-header">
        <h3 class="box-title box-title-up">Formulário Fluxo de Atendimento</h3>
      </div>
      <!-- /.box-header -->
      <div class="box-body" style="padding-top: 0px;">
        <!-- form -->
        <div class="form-group">
          <div class="row" style="margin-top: 10px;">
            <div class="col-md-4 col-lg-4">
              <label>Usuário</label>
              <multi-select
                :id="'user'"
                :setValue="form.user"
                :dataSelect="select.users"
                @value="value => form.user = value"
                :multiple="false"
                :search="true"
              />
              <div class="error">{{ validation.firstError('form.user') }}</div>
            </div>

            <div class="col-md-2">
              <label>Score</label>
              <input type="text" class="form-control input-sm has-warning" v-model="form.score">
              <div class="error">{{ validation.firstError('form.score') }}</div>
            </div>

            <div class="col-md-2">
              <label>Modulo</label>
              <select class="form-control input-sm has-warning" v-model="form.module_name">
                <option value>Informe</option>
                <option
                  :value="list.id"
                  v-for="(list, index) in select.modules_available"
                  :key="index"
                >{{ list.name.toUpperCase() }}</option>
              </select>
              <div class="error">{{ validation.firstError('form.module_name') }}</div>
            </div>
          </div>

          <div class="row" style="margin-top: 10px;">
            <div class="col-md-12">
              <button class="button btn btn-sm btn-primary" @click="submitForm">
                <span class="fa fa-check"></span>
                Salvar Dados
              </button>
              <button class="button btn btn-sm btn-default" @click="cleanForm">Cancelar</button>
            </div>
          </div>
        </div>
        <!-- / end form -->
      </div>
    </div>
  </div>
</template>

<script>
import MultiSelect from "../../../../components/MultiSelect";
import { mapActions } from "vuex";
import validator from "../mixins/validator";

export default {
  name: "FormFlux",
  props: ["dataComponent"],
  components: { MultiSelect },
  mixins: [validator],
  data() {
    return {
      form: {
        user: "",
        score: "",
        module_name: ""
      },
      select: {
        users: [],
        modules_available: [
          { id: "register_reserve", name: "reserva" },
          { id: "register_transfer", name: "Transferência" },
          { id: "termination_contract", name: "Rescisão de Contrato" },
        ]
      }
    };
  },
  methods: {
    ...mapActions("AdminUser", ["getAllUsers"]),
    ...mapActions("FluxAttendance", ["createFlux", "updateFlux"]),
    getData() {
      this.getAllUsers()
        .then(results => {
          const collection = collect(results.data);
          const users = collection.sortBy("name").all();
          this.select.users = users.map(user => {
            return {
              value: user.id,
              name: `${user.name.toUpperCase()} ${user.last_name.toUpperCase()}`
            };
          });
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    create() {
      this.$bus.$emit("openLoading");
      this.createFlux(this.form)
        .then(result => {
          _notification.success();
          this.cleanForm();
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    edit(data) {
      const dataEdit = Object.assign({}, data);
      this.form.id = dataEdit.id;
      this.form.user = dataEdit.user;
      this.form.score = dataEdit.score;
      this.form.module_name = dataEdit.module_name;
    },
    update() {
      this.$bus.$emit("openLoading");
      this.updateFlux(this.form)
        .then(result => {
          _notification.success();
          this.cleanForm();
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    cleanForm() {
      this.form = {
        user: "",
        score: "",
        module_name: ""
      };

      this.validation.reset();
    }
  },
  watch: {
    dataComponent() {
      this.edit(this.dataComponent.data);
    }
  },
  mounted() {
    this.$bus.$emit("openLoading");
    this.getData();
  }
};
</script>
<template>
  <div>
    <div class="box box-danger">
      <div class="box-header">
        <h3 class="box-title box-title-up">Formulário de Motivos</h3>
      </div>
      <!-- /.box-header -->
      <div class="box-body" style="padding-top: 0px;">
        <!-- form -->
        <div class="form-group">
          <div class="row" style="margin-top: 10px;">
            <div class="col-md-4">
              <label>Modulo</label>
              <select class="form-control input-sm has-warning" v-model="form.module_name">
                <option value>Informe</option>
                <option value="register_reserve">Cadastro Reserva</option>
                <option value="transfer_contract">Transferência de Contrato</option>
                <option value="termination_contract">Inativação de Contrato</option>
              </select>
            </div>
            
            <div class="col-md-2">
              <label>Tipo de Motivo</label>
              <select class="form-control input-sm has-warning" v-model="form.type_reason">
                <option value="">Informe</option>
                <option value="reason_cancel_contract" v-if="form.module_name === 'register_reserve' ">Cancelamento de Contrato</option>
                <option value="transfer_contract"  v-if="form.module_name === 'transfer_contract' ">Transferência de Contrato</option>
                <option value="reason"  v-if="form.module_name === 'termination_contract' ">Motivo</option>
                <option value="destination"  v-if="form.module_name === 'termination_contract' ">Destino</option>
              </select>
            </div>

            <div class="col-md-6 col-lg-5">
              <label>Informe o Texto</label>
              <input
                type="text"
                class="form-control input-sm has-warning"
                v-model="form.reason"
                @keypress.enter="submitData"
                ref="reason"
              >
              <span
                class="max"
                :class="{'max-danger': form.reason.length > 150}"
              >Max: 150/{{ form.reason.length }}</span>
            </div>
          </div>

          <div class="row" style="margin-top: 10px">
            <div class="col-md-8">
              <button
                class="button btn btn-sm btn-danger"
                :disabled="form.reason.length > 150 || !form.module_name"
                @click="submitData"
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

          <!-- / end form -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import Required from "../../../../components/Required";
import { mapActions } from "vuex";

export default {
  name: "FormReason",
  props: ["dataEdit"],
  components: { Required },
  data() {
    return {
      form: {
        reason: "",
        type_reason: "",
        module_name: ""
      }
    };
  },
  methods: {
    ...mapActions("Reason", ["createReason", "updateReason"]),
    submitData() {
      if (this.form.reason.length > 150 || !this.form.module_name) return;

      if (!this.form.id) {
        this.create();
        return;
      }

      this.update();
    },
    create() {
      this.$bus.$emit("openLoading");
      this.createReason(this.form)
        .then(result => {
          _notification.success();
          this.form.reason = "";
          setTimeout(() => this.$refs.reason.focus(), 50);
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    edit(data) {
      const dataEdit = Object.assign({}, data);
      this.form.id = dataEdit.id;
      this.form.reason = dataEdit.reason.toUpperCase();
      this.form.module_name = dataEdit.module_name;
    },
    update() {
      this.$bus.$emit("openLoading");
      this.updateReason(this.form)
        .then(result => {
          _notification.success();
          this.cleanForm();
          setTimeout(() => this.$refs.reason.focus(), 50);
          setTimeout(() => this.$bus.$emit("closeLoading"), 300);
        })
        .catch(err => this.$bus.$emit("closeLoading"));
    },
    cleanForm() {
      this.form = {
        reason: "",
        type_reason: "",
        module_name: ""
      };
    }
  },
  watch: {
    dataEdit() {
      this.edit(this.dataEdit.data);
    }
  },
  mounted() {
    this.cleanForm();
  }
};
</script>

<style scoped>
.max {
  font-size: 11px;
}

.max-danger {
  font-size: 11px;
  color: red;
}
</style>

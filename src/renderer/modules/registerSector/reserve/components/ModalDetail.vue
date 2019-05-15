<template>
<div>
  <!-- Modal -->
  <div class="modal right fade" id="modalDetail" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            ><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="myModalLabel2">Detalhes da Reserva - {{ `${data_reserve.code_reserve}/${data_reserve.year_reserve}` }}</h4>
        </div>

        <div class="modal-body">

          <div class="row" v-if="dataModal.data">

            <div class="col-md-2">
              <label>Código Reserva</label>
              <p>{{ `${data_reserve.code_reserve}/${data_reserve.year_reserve}` }}</p>
            </div>
            <div class="col-md-2">
              <label>Código Imóvel</label>
              <p>{{ `${data_reserve.immobile_code.toUpperCase()}` }}</p>
            </div>
            <div class="col-md-2">
              <label>Data Reserva</label>
              <p>{{ dateFormat(data_reserve.date_reserve, "DD/MM/YYYY") }}</p>
            </div>
            <div class="col-md-2">
              <label>Previsão</label>
              <p>{{ dateFormat(data_reserve.prevision, "DD/MM/YYYY") }}</p>
            </div>
            <div class="col-md-2">
              <label>Status</label>
              <p>{{ getStatus(data_reserve.status).toUpperCase() }}</p>
            </div>

          </div>

          <div class="row">
            <div class="col-md-6">
              <hr />
            </div>
          </div>

          <div class="row" v-if="dataModal.data">

            <div class="col-md-4 col-lg-3">
              <label>Endereço</label>
              <p style="text-transform: uppercase">{{ `${data_reserve.address} ${data_reserve.neighborhood}` }}</p>
            </div>
            <div class="col-md-4 col-lg-3">
              <label>Cliente</label>
              <p style="text-transform: uppercase">{{ data_reserve.client_name }}</p>
            </div>
            <div class="col-md-2">
              <label>Tel 01</label>
              <p>{{ maskPhone(data_reserve.client_phone_01) }}</p>
            </div>
            <div class="col-md-2 hidden-md">
              <label>Tel 02</label>
              <p>{{ data_reserve.client_phone_02 ? maskPhone(data_reserve.client_phone_02) : " - " }}</p>
            </div>
            <div class="col-md-2 hidden-md">
              <label>Tel 03</label>
              <p>{{ data_reserve.client_phone_03 ? maskPhone(data_reserve.client_phone_03) : " - " }}</p>
            </div>

          </div>

          <div class="row" v-if="dataModal.data">
            <div class="col-md-2 hidden-lg">
              <label>Tel 02</label>
              <p>{{ data_reserve.client_phone_02 ? maskPhone(data_reserve.client_phone_02) : " - " }}</p>
            </div>
            <div class="col-md-2 hidden-lg">
              <label>Tel 03</label>
              <p>{{ data_reserve.client_phone_03 ? maskPhone(data_reserve.client_phone_03) : " - " }}</p>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <hr />
            </div>
          </div>

          <div class="row" v-if="dataModal.data">
            <div class="col-md-4">
              <label>Responsável Setor Recepção</label>
              <p style="text-transform: uppercase">{{ `${data_reserve.attendantReceptionData.name} ${data_reserve.attendantReceptionData.last_name}` }}</p>
            </div>
            <div class="col-md-4">
              <label>Responsável Setor Cadastro</label>
              <p style="text-transform: uppercase">{{ `${data_reserve.attendantRegisterData.name} ${data_reserve.attendantRegisterData.last_name}` }}</p>
            </div>
          </div>

        </div>

      </div><!-- modal-content -->
    </div><!-- modal-dialog -->
  </div><!-- modal -->
</div>
</template>

<script>
import {
  dateFormat
} from "../../../../util/dateTime";
import {
  maskPhone
} from "../../../../util/string";

export default {
  name: "ModalDetail",
  props: ["dataModal"],
  data() {
    return {
      data_reserve: {}
    }
  },
  methods: {
    dateFormat,
    maskPhone,
    openModal() {
      $('#modalDetail').modal({
        keyboard: false,
        backdrop: 'static'
      });
    },
    getStatus(status) {
      if (status === "r") return "reserva";
      if (status === "d") return "documentação";
      if (status === "a") return "analise";
      if (status === "cd") return "cadastro";
      if (status === "p") return "pendente";
      if (status === "as") return "assinado";
      if (status === "ap") return "assinado c/ pend";
      if (status === "af") return "ativ. finais";
      if (status === "c") return "cancelado";
    },
    closeModal() {
      $('#modalDetail').modal('hide');
    }
  },
  watch: {
    dataModal() {
      this.data_reserve = this.dataModal.data;
      this.openModal();
    }
  }
}
</script>

<style scoped>
.modal.right .modal-dialog {
  position: fixed;
  margin: auto;
  width: 90%;
  height: 100%;
  -webkit-transform: translate3d(0%, 0, 0);
  -ms-transform: translate3d(0%, 0, 0);
  -o-transform: translate3d(0%, 0, 0);
  transform: translate3d(0%, 0, 0);
}

.modal.right .modal-content {
  height: 500px;
  overflow-y: auto;
}

.modal.right .modal-body {
  padding: 15px 15px 80px;
}

/*Right*/
.modal.right.fade .modal-dialog {
  right: -320px;
  -webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
  -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
  -o-transition: opacity 0.3s linear, right 0.3s ease-out;
  transition: opacity 0.3s linear, right 0.3s ease-out;
}

.modal.right.fade.in .modal-dialog {
  right: 0;
}

/* ----- MODAL STYLE ----- */
.modal-content {
  border-radius: 0;
  border: none;
}

.modal-header {
  border-bottom-color: #EEEEEE;
  background-color: #40364d !important;
  color: #ffffff;
  text-transform: uppercase;
}

.close {
  color: #ffffff
}

.modal-header h4 {
  font-weight: bold;
}

label {
  font-weight: bold;
  text-transform: uppercase;
}
</style>

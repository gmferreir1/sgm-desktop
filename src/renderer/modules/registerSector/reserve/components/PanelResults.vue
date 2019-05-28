<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <div class="box box-primary">
          <div class="box-header with-border" style="padding-top: 3px">
            <h3 class="box-title" style="padding-bottom: 10px; padding-top: 5px;">
              <img :src="images.bar_chart" />
              <span class="hidden-md">PAINEL DE RESULTADOS</span>
              <span class="hidden-lg">RESULTADOS</span>
            </h3>

            <span v-if="toggle" style="margin-left: 20px;">
              <span style="font-weight: bold">TOTAL({{ total_quantity.qt_total }})</span>
              R$ {{ moneyFormat(total_quantity.value_total) }}
            </span>

            <span v-if="toggle" style="margin-left: 20px;">
              <span style="font-weight: bold">RESERVAS({{ total_quantity.qt_total_reserve }})</span>
              R$ {{ moneyFormat(total_quantity.value_total_reserve) }}
            </span>

            <span v-if="toggle" style="margin-left: 20px;">
              <span style="font-weight: bold">DOC({{ total_quantity.qt_total_documentation }})</span>
              R$ {{ moneyFormat(total_quantity.value_total_documentation) }}
            </span>

            <span v-if="toggle" style="margin-left: 20px;">
              <span
                style="font-weight: bold"
                title="Análise"
              >ANAL.({{ total_quantity.qt_total_analising }})</span>
              R$ {{ moneyFormat(total_quantity.value_total_analising) }}
            </span>

            <span v-if="toggle" style="margin-left: 20px;">
              <span
                style="font-weight: bold"
                title="Cadastro"
              >CAD.({{ total_quantity.qt_total_register }})</span>
              R$ {{ moneyFormat(total_quantity.value_total_register) }}
            </span>

            <span v-if="toggle" style="margin-left: 20px;">
              <span
                style="font-weight: bold"
                title="Pendente"
              >PEN.({{ total_quantity.qt_total_pending }})</span>
              R$ {{ moneyFormat(total_quantity.value_total_pending) }}
            </span>

            <div style="float: right">
              <a href="#" @click.prevent="hideAndShowPanel">{{ !toggle ? "Ocultar" : "Mostrar" }}</a>
            </div>
          </div>
          <!-- /.box-header -->

          <div class="box-body" style="padding-top: 0px;" v-if="!toggle">
            <div class="row" style="padding: 5px;">
              <div class="col-md-3 status-total">
                <span>Total:</span>
                <span>({{ total_quantity.qt_total }}) - R$ {{ moneyFormat(total_quantity.value_total) }}</span>
              </div>

              <div class="col-md-3 status-reserve">
                <span>Reserva</span>
                <span>({{ total_quantity.qt_total_reserve }}) - R$ {{ moneyFormat(total_quantity.value_total_reserve) }}</span>
              </div>

              <div class="col-md-3 status-documentation">
                <span>Doc</span>
                <span>({{ total_quantity.qt_total_documentation }}) - R$ {{ moneyFormat(total_quantity.value_total_documentation) }}</span>
              </div>

              <div class="col-md-3 status-analyzing">
                <span>Análise:</span>
                <span>({{ total_quantity.qt_total_analising }}) - R$ {{ moneyFormat(total_quantity.value_total_analising) }}</span>
              </div>
            </div>

            <div class="box-header with-border" style="padding-top: 3px"></div>

            <div class="row" style="padding: 5px;">
              <div class="col-md-3 status-register">
                <span>Cad:</span>
                <span>({{ total_quantity.qt_total_register }}) - R$ {{ moneyFormat(total_quantity.value_total_register) }}</span>
              </div>

              <div class="col-md-3 status-pending">
                <span>Pendente:</span>
                <span>({{ total_quantity.qt_total_pending }}) - R$ {{ moneyFormat(total_quantity.value_total_pending) }}</span>
              </div>

              <div class="col-md-3 status-signed">
                <span>Assinado:</span>
                <span>({{ total_quantity.qt_total_assigned }}) - R$ {{ moneyFormat(total_quantity.value_total_assigned) }}</span>
              </div>

              <div class="col-md-3 status-signed-with-pending hidden-md">
                <span>Ass c/ Pend:</span>
                <span>({{ total_quantity.qt_total_assigned_with_pending }}) - R$ {{ moneyFormat(total_quantity.value_total_assigned_with_pending) }}</span>
              </div>
            </div>

            <div class="box-header with-border" style="padding-top: 3px"></div>

            <div class="row" style="padding: 5px 5px 0px 5px;">
              <div class="col-md-4 status-signed-with-pending hidden-lg">
                <span>Ass c/ Pend:</span>
                <span>({{ total_quantity.qt_total_assigned_with_pending }}) - R$ {{ moneyFormat(total_quantity.value_total_assigned_with_pending) }}</span>
              </div>

              <div class="col-md-3 status-final-activities">
                <span>Ativ. Finais:</span>
                <span>({{ total_quantity.qt_total_final_active }}) - R$ {{ moneyFormat(total_quantity.value_total_final_active) }}</span>
              </div>

              <div class="col-md-5 status-canceled">
                <span>Cancelados:</span>
                <span>({{ total_quantity.qt_total_canceled }}) - R$ {{ moneyFormat(total_quantity.value_total_canceled) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { moneyFormat } from "../../../../util/string";

export default {
  name: "PanelResults",
  props: ["totalQuantity", "perPage"],
  data() {
    return {
      toggle: true,
      total_quantity: {},
      images: {
        bar_chart: require("@/assets/icons/bar-chart.png")
      }
    };
  },
  methods: {
    moneyFormat,
    hideAndShowPanel() {
      this.toggle = !this.toggle;
    }
  },
  watch: {
    totalQuantity() {
      this.total_quantity = this.totalQuantity;
    }
  }
};
</script>

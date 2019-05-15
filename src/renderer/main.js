import Vue from "vue";
import axios from "axios";
import App from "./App";
import router from "./router";
import store from "./store";
import http from "./util/http";
import swal from 'sweetalert';
import ElementUI from "element-ui";
import locale from "element-ui/lib/locale/lang/pt-br";
window.swal = swal;
const version = require("../../package.json").version;


window.http = http;
Vue.prototype.$systemVersion = version;
Vue.prototype.$NODE_ENV = process.env.NODE_ENV;

// Event Bus
import EventBus from './plugins/event-bus'
Vue.use(EventBus)

require("./assets-template");
require("./util/interceptor");

// Element UI
require("../../node_modules/element-ui/lib/theme-chalk/index.css");
Vue.use(ElementUI, { locale })

// v-money
import money from 'v-money'
Vue.use(money, {
  decimal: ',',
  thousands: '.',
  prefix: 'R$ ',
  precision: 2,
  masked: false
})

// Validação de formulários
const SimpleVueValidation = require("simple-vue-validator");
window.Validator = SimpleVueValidation.Validator;
Vue.use(SimpleVueValidation);

// Numeral
window.numeral = require('numeral')
// load a locale
window.numeral.register('locale', 'pt-br', {
  delimiters: {
    thousands: '.',
    decimal: ','
  },
  currency: {
    symbol: 'R$'
  }
})
numeral.locale('pt-br');

window.moment = require("moment");

/*
 * Vue the mask
 */
import VueTheMask from 'vue-the-mask';
Vue.use(VueTheMask);

if (!process.env.IS_WEB) Vue.use(require("vue-electron"));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  store,
  template: "<App/>"
}).$mount("#app");

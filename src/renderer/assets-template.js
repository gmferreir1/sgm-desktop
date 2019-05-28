import Vue from "vue";
window.$ = window.jQuery = require("jquery");
require("bootstrap");
require("@/assets/js/adminlte");
window._notification = require("@/util/notification");
window.collect = require("collect.js");
window._ = require("lodash");
require("@/assets/js/jquery-ui.min");


/** Pagination */
const Paginate = require("vuejs-paginate");
Vue.component("paginate", Paginate);

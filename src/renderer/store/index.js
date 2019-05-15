import Vue from "vue";
import Vuex from "vuex";
import AdminUser from "../modules/systemAdmin/users/store";
import FluxAttendance from "../modules/systemAdmin/fluxAttendance/store";
import Reason from "../modules/systemAdmin/reason/store";
import RegisterReserve from "../modules/registerSector/reserve/store";

const modules = {
  AdminUser,
  FluxAttendance,
  Reason,
  RegisterReserve
};

Vue.use(Vuex);

export default new Vuex.Store({
  modules
});

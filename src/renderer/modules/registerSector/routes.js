import RegisterSector from "./Index";
import RegisterSector_ReserveList from "./reserve/pages/ReserveList";
import RegisterSector_ReserveCreate from "./reserve/pages/CreateOrEdit";

export default [
  {
    path: "/register-sector",
    name: "register_sector",
    component: RegisterSector,
    children: [
      {
        path: "reserve-list",
        name: "registerSector_reserve_list",
        component: RegisterSector_ReserveList
      },
      {
        path: "create",
        name: "registerSector_reserve_create",
        component: RegisterSector_ReserveCreate
      }
    ]
  }
];

import SystemAdmin from "../modules/systemAdmin/Index";
import SystemAdmin_Dashboard from "../modules/systemAdmin/dashboard/pages/Dashboard";
import SystemAdmin_User from "../modules/systemAdmin/users/pages/Index";
import SystemAdmin_Regions from "../modules/systemAdmin/regions/pages/Index";
import SystemAdmin_TypeRelease from "../modules/systemAdmin/typeRelease/pages/Index";


export default [
  {
    path: "/system-admin",
    component: SystemAdmin
  },
  {
    path: "/system-admin",
    name: "system_admin",
    component: SystemAdmin,
    children: [
      // dashboard
      {
        path: "dashboard",
        name: "systemAdmin_dashboard",
        component: SystemAdmin_Dashboard
      },
      // usuários
      {
        path: "users",
        name: "systemAdmin_user",
        component: SystemAdmin_User
      },
      // regiões
      {
        path: "regions",
        name: "systemAdmin_regions",
        component: SystemAdmin_Regions
      },
      // tipos de lançamento
      {
        path: "type-release",
        name: "systemAdmin_type_release",
        component: SystemAdmin_TypeRelease
      }
    ]
  }
];

import SystemAdmin from "./Index.vue";
import SystemAdmin_Dashboard from "./dashboard/pages/Dashboard";
import SystemAdmin_UpdateDB from "./updateDB/pages/Index";
import SystemAdmin_Users from "./users/pages/Index";
import SystemAdmin_ListUsers from "./users/pages/ListUsers";
import SystemAdmin_CreateOrEditUser from "./users/pages/CreateOrEditUser";
import SystemAdmin_FluxAttendance from "./fluxAttendance/pages/Index";
import SystemAdmin_SystemActions from "./systemActions/pages/Index";
import SystemAdmin_Reason from "./reason/pages/Index";
import SystemAdmin_Documents from "./documents/pages/Index";

export default [
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
      {
        path: "update-db",
        name: "systemAdmin_update_db",
        component: SystemAdmin_UpdateDB
      }
    ]
  },
  // administração de usuários
  {
    path: "/system-admin/users",
    component: SystemAdmin_Users,
    children: [
      {
        path: "list",
        name: "systemAdmin_users_list",
        component: SystemAdmin_ListUsers
      },
      {
        path: "/create",
        name: "systemAdmin_users_create",
        component: SystemAdmin_CreateOrEditUser
      },
      {
        path: "/edit/:id",
        name: "systemAdmin_users_edit",
        component: SystemAdmin_CreateOrEditUser
      }
    ]
  },
  // flux de atendimento
  {
    path: "/system-admin/flux-attendance",
    component: SystemAdmin_FluxAttendance,
    name: "systemAdmin_flux_attendance"
  },
  // ações do sistema
  {
    path: "/system-admin/system-action",
    component: SystemAdmin_SystemActions,
    name: "systemAdmin_system_actions"
  },
  // motivos para cancelamento
  {
    path: "/system-admin/reason",
    component: SystemAdmin_Reason,
    name: "systemAdmin_reason"
  },
  // documentos
  {
    path: "/system-admin/documents",
    component: SystemAdmin_Documents,
    name: "systemAdmin_documents"
  },
];

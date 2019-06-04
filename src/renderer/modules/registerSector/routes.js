import RegisterSector from "./Index";

/** Reserva */
import RegisterSector_ReserveList from "./reserve/pages/ReserveList";
import RegisterSector_ReserveCreateOrEdit from "./reserve/pages/CreateOrEdit";

/** Transferencia de contrato */
import RegisterSector_TransferContractList from "./transferContract/pages/TransferContractList";
import RegisterSector_TransferContractCreateOrEdit from "./transferContract/pages/CreateOrEditTransferContract.vue";

export default [
  {
    path: "/register-sector",
    name: "register_sector",
    component: RegisterSector,
    children: [
      /** Reservas */
      {
        path: "reserve-list",
        name: "registerSector_reserve_list",
        component: RegisterSector_ReserveList
      },
      {
        path: "create",
        name: "registerSector_reserve_create",
        component: RegisterSector_ReserveCreateOrEdit
      },
      {
        path: "edit/:id",
        name: "registerSector_reserve_edit",
        component: RegisterSector_ReserveCreateOrEdit
      },
      /** End reservas */

      /** Transferências */
      {
        path: "transfer-contract/transfer-contract-list",
        name: "registerSector_transfer_contract",
        component: RegisterSector_TransferContractList
      },
      {
        path: "trasfer-contract/create",
        name: "registerSector_transfer_contract_create",
        component: RegisterSector_TransferContractCreateOrEdit
      },
      {
        path: "trasfer-contract/edit/:id",
        name: "registerSector_transfer_contract_edit",
        component: RegisterSector_TransferContractCreateOrEdit
      }
      /** End transferências */
    ]
  }
];

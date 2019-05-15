import IndexTermination from "./Index";
import TerminationContractList from "./contract/pages/ContractList";
import Termination_CreateOrEdit from "./contract/pages/CreateOrEdit";
import Termination_RentAccesory from "./contract/pages/RentAcessory";
import Termination_DeadFile from "./deadFile/pages/DeadFileList";

export default [
  {
    path: "/termination",
    name: "termination",
    component: IndexTermination,
    children: [
      {
        path: "contract",
        name: "termination_contract_list",
        component: TerminationContractList
      },
      {
        path: "contract/create",
        name: "termination_contract_create",
        component: Termination_CreateOrEdit
      },
      {
        path: "contract/edit/:id",
        name: "termination_contract_edit",
        component: Termination_CreateOrEdit
      },
      // acessorios da locação
      {
        path: "contract/rent-accessory/:id",
        name: "termination_contract_rent_accessory",
        component: Termination_RentAccesory
      },
      //arquivo morto
      {
        path: "contract/dead-file",
        name: "termination_contract_dead_file",
        component: Termination_DeadFile
      }
    ]
  }
];

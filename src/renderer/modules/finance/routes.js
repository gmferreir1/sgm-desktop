import IndexFinance from "./Index";

/** contratos celebrados */
import ContractCelebrated from "./contractCelebrated/pages/ContractCelebrated"
import ContractCelebratedCreateOrEdit from "./contractCelebrated/pages/CreateOrEdit"

export default [
  {
    path: "/finance",
    name: "finance",
    component: IndexFinance,
    children: [
      {
        path: "contract-celebrated",
        name: "finance_contract_celebrated",
        component: ContractCelebrated
      },
      {
        path: "contract-celebrated/edit/:id",
        name: "finance_contract_celebrated_edit",
        component: ContractCelebratedCreateOrEdit
      }
    ]
  }
];

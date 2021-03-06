export default routeName => {
  if (routeName === "dashboard") {
    return [
      {
        name: "Dashboard",
        link: "dashboard"
      }
    ];
  }

  if (routeName === "systemAdmin_dashboard") {
    return [
      {
        name: "Painel de Administração",
        link: "systemAdmin_dashboard"
      }
    ];
  }

  if (routeName === "systemAdmin_update_db") {
    return [
      {
        name: "Painel de Administração",
        link: "systemAdmin_dashboard"
      },
      {
        name: "Atualização Base de Dados",
        link: "systemAdmin_update_db"
      }
    ];
  }

  if (routeName === "systemAdmin_users_list") {
    return [
      {
        name: "Painel de Administração",
        link: "systemAdmin_dashboard"
      },
      {
        name: "Usuários no Sistema",
        link: "systemAdmin_users_list"
      }
    ];
  }

  if (routeName === "systemAdmin_users_create") {
    return [
      {
        name: "Painel de Administração",
        link: "systemAdmin_dashboard"
      },
      {
        name: "Usuários no Sistema",
        link: "systemAdmin_users_list"
      },
      {
        name: "Criação de Novo Usuário",
        link: "systemAdmin_users_create"
      }
    ];
  }

  if (routeName === "systemAdmin_users_edit") {
    return [
      {
        name: "Painel de Administração",
        link: "systemAdmin_dashboard"
      },
      {
        name: "Usuários no Sistema",
        link: "systemAdmin_users_list"
      },
      {
        name: "Edição de Usuário",
        link: "systemAdmin_users_edit"
      }
    ];
  }

  if (routeName === "systemAdmin_flux_attendance") {
    return [
      {
        name: "Painel de Administração",
        link: "systemAdmin_dashboard"
      },
      {
        name: "Fluxo de Atendimento",
        link: "systemAdmin_flux_attendance"
      }
    ];
  }

  if (routeName === "systemAdmin_system_actions") {
    return [
      {
        name: "Painel de Administração",
        link: "systemAdmin_dashboard"
      },
      {
        name: "Ações do Sistema",
        link: "systemAdmin_system_actions"
      }
    ];
  }

  if (routeName === "systemAdmin_reason") {
    return [
      {
        name: "Painel de Administração",
        link: "systemAdmin_dashboard"
      },
      {
        name: "Motivos",
        link: "systemAdmin_reason"
      }
    ];
  }

  if (routeName === "systemAdmin_documents") {
    return [
      {
        name: "Painel de Administração",
        link: "systemAdmin_dashboard"
      },
      {
        name: "Configuração de Documentos",
        link: "systemAdmin_documents"
      }
    ];
  }

  /**
   * Reservas
   * - Reservas no sistema
   */
  if (routeName === "registerSector_reserve_list") {
    return [
      {
        name: "Dashboard",
        link: "dashboard"
      },
      {
        name: "Reservas no Sistema",
        link: "registerSector_reserve_list"
      }
    ];
  }

  if (routeName === "registerSector_reserve_create") {
    return [
      {
        name: "Dashboard",
        link: "dashboard"
      },
      {
        name: "Reservas no Sistema",
        link: "registerSector_reserve_list"
      },
      {
        name: "Nova Reserva",
        link: "registerSector_reserve_create"
      }
    ];
  }

  if (routeName === "registerSector_reserve_edit") {
    return [
      {
        name: "Dashboard",
        link: "dashboard"
      },
      {
        name: "Reservas no Sistema",
        link: "registerSector_reserve_list"
      },
      {
        name: "Edição de Reserva",
        link: "registerSector_reserve_edit"
      }
    ];
  }
  /** End reservas */

  /**
   * Transferencias
   * - Transferencias no sistema
   */
  if (routeName === "registerSector_transfer_contract") {
    return [
      {
        name: "Dashboard",
        link: "dashboard"
      },
      {
        name: "Transferências no Sistema",
        link: "registerSector_transfer_contract"
      }
    ];
  }

  if (routeName === "registerSector_transfer_contract_create") {
    return [
      {
        name: "Dashboard",
        link: "dashboard"
      },
      {
        name: "Transferências no Sistema",
        link: "registerSector_transfer_contract"
      },
      {
        name: "Nova Transferência",
        link: "registerSector_transfer_contract_create"
      }
    ];
  }

  if (routeName === "registerSector_transfer_contract_edit") {
    return [
      {
        name: "Dashboard",
        link: "dashboard"
      },
      {
        name: "Transferências no Sistema",
        link: "registerSector_transfer_contract"
      },
      {
        name: "Edição de Transferência",
        link: "registerSector_transfer_contract_edit"
      }
    ];
  }
  /** End transferencia */

  /**
   * Financeiro
   * - Contratos celebrados no sistema
   */
  if (routeName === "finance_contract_celebrated") {
    return [
      {
        name: "Dashboard",
        link: "dashboard"
      },
      {
        name: "Contratos Celebrados no Sistema",
        link: "finance_contract_celebrated"
      }
    ];
  }

  if (routeName === "finance_contract_celebrated_edit") {
    return [
      {
        name: "Dashboard",
        link: "dashboard"
      },
      {
        name: "Contratos Celebrados no Sistema",
        link: "finance_contract_celebrated"
      },
      {
        name: "Dados do Contrato Celebrado",
        link: "finance_contract_celebrated_edit"
      }
    ];
  }

  /** Contratos celebrados */
};

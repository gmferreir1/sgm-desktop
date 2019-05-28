import data from "@/data/dataSelect";
export default {
  select: {
    status: [
      {
        name: "RESERVA",
        value: "r"
      },
      {
        name: "DOCUMENTAÇÃO",
        value: "d"
      },
      {
        name: "ANÁLISE",
        value: "a"
      },
      {
        name: "CADASTRO",
        value: "cd"
      },
      {
        name: "PENDENTE",
        value: "p"
      },
      {
        name: "ASSINADO",
        value: "as"
      },
      {
        name: "ASSINADO C/ PENDÊNCIA",
        value: "ap"
      },
      {
        name: "ATIVIDADES FINAIS",
        value: "af"
      },
      {
        name: "CANCELADO",
        value: "c"
      }
    ],
    deadline: [
      { name: "12 Meses", value: 12 },
      { name: "24 Meses", value: 24 },
      { name: "36 Meses", value: 36 },
      { name: "48 Meses", value: 48 },
      { name: "60 Meses", value: 60 },
      { name: "72 Meses", value: 72 },
      { name: "84 Meses", value: 84 },
      { name: "96 Meses", value: 96 },
      { name: "108 Meses", value: 108 },
      { name: "120 Meses", value: 120 },
      { name: "132 Meses", value: 132 }
    ],
    types_immobile: [],
    responsible_register_sector: [],
    responsible_reception: [],
    users: [],
    states: data.select.states
  }
};

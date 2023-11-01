import {
  HouseLocation,
  HouseResidents,
  HouseType,
  Income,
  ItemAmount,
  WorkHours,
  WorkType,
} from "@/interfaces/quiz_Interfaces";

import { Quiz } from "@/interfaces/quiz_Interfaces";

interface RadioSelectorProps {
  radioContent?: {
    options: { label: string; value: string }[];
    initialValue: string;
    horizontal?: boolean;
  };
}

interface NumericInputProps {
  numericInputContent?: {
    precision: number;
    initialValue: number | string;
  };
}

interface TextAreaProps {
  isTextArea?: boolean;
}

interface Question
  extends RadioSelectorProps,
    NumericInputProps,
    TextAreaProps {
  title?: string;
  key: keyof Quiz;
}

export interface CardContent {
  title?: string;
  questions: Question[];
}

export enum YesOrNo {
  YES,
  NO,
}

const oneToFive: RadioSelectorProps = {
  radioContent: {
    options: [
      { label: "1", value: '1' },
      { label: "2", value: '2' },
      { label: "3", value: '3' },
      { label: "4", value: '4' },
      { label: "5", value: '5' },
    ],
    horizontal: true,
    initialValue: '1',
  },
};

const itemAmount: RadioSelectorProps = {
  radioContent: {
    options: [
      { label: "0", value: ItemAmount.ZERO },
      { label: "1", value: ItemAmount.ONE },
      { label: "2", value: ItemAmount.TWO },
      { label: "3+", value: ItemAmount.THREE_PLUS },
    ],
    horizontal: true,
    initialValue: ItemAmount.ZERO,
  },
};

const yesOrNoOptions: RadioSelectorProps = {
  radioContent: {
    options: [
      { label: "Sim", value: "true" },
      { label: "Não", value: "false" },
    ],
    horizontal: false,
    initialValue: "false",
  },
};

export const cards: CardContent[] = [
  {
    questions: [
      {
        key: "works",
        title: "Você trabalha ou já trabalhou?",
        ...yesOrNoOptions,
      },
    ],
  },
  {
    title: "Em que você trabalha atualmente?",
    questions: [
      {
        key: "worksCurrently",
        radioContent: {
          initialValue: WorkType.UNEMPLOYED,
          horizontal: false,
          options: [
            {
              label: "Na agricultura, no campo, na fazenda ou na pesca",
              value: WorkType.AGRICULTURE,
            },
            {
              label: "Na indústria ou construção civil",
              value: WorkType.INDUSTRY_OR_CONSTRUCTION,
            },
            {
              label:
                "No comércio, banco, transporte, hotelaria ou outros serviços",
              value: WorkType.SERVICES,
            },
            {
              label: "Como funcionário(a) público",
              value: WorkType.PUBLIC_AGENT,
            },
            {
              label:
                "Como profissional liberal ou trabalho fora de casa em atividades informais",
              value: WorkType.INFORMAL,
            },
            {
              label: "Trabalho em minha casa informalmente",
              value: WorkType.INFORMAL_HOME_OFFICE,
            },
            {
              label: "Faço trabalho doméstico em casa de outras pessoas",
              value: WorkType.DOMESTICS_SERVICE,
            },
            {
              label: "No lar (sem remuneração)",
              value: WorkType.HOME_WITHOUT_PAYMENT,
            },
            { label: "Outro", value: WorkType.OTHER },
            { label: "Não trabalho", value: WorkType.UNEMPLOYED },
          ],
        },
      },
    ],
  },
  {
    title:
      "Indique o grau de importância de cada um dos seus motivos abaixo na sua decisão de trabalhar. (Atenção: 1 indica nenhuma importância e 5 maior importância)",
    questions: [
      {
        key: "houseExpenses",
        title: "Ajudar nas despesas com a casa",
        ...oneToFive,
      },
      {
        key: "supportFamily",
        title: "Sustentar minha família",
        ...oneToFive,
      },
      {
        key: "independence",
        title: "Ser independente",
        ...oneToFive,
      },
      {
        key: "getExperience",
        title: "Adquirir experiência",
        ...oneToFive,
      },
      {
        key: "payStudies",
        title: "Ajudar nas despesas com a casa",
        ...oneToFive,
      },
    ],
  },
  {
    title: "Quantas horas semanais você trabalha?",
    questions: [
      {
        key: "workHours",
        radioContent: {
          initialValue: WorkHours.LESS_THAN_10,
          options: [
            {
              label: "Sem jornada fixa, até 10 horas semanais.",
              value: WorkHours.LESS_THAN_10,
            },
            {
              label: "De 11 a 20 horas semanais.",
              value: WorkHours.BETWEEN_11_AND_20,
            },
            {
              label: "De 21 a 30 horas semanais.",
              value: WorkHours.BETWEEN_21_AND_30,
            },
            {
              label: "De 31 a 44 horas semanais.",
              value: WorkHours.BETWEEN_31_AND_44,
            },
          ],
        },
      },
    ],
  },
  {
    title:
      "Somando a sua renda com a renda das pessoas que moram com você, quanto é, aproximadamente, a renda familiar mensal?",
    questions: [
      {
        key: "familyIncome",
        radioContent: {
          initialValue: Income.NOTHING,
          options: [
            {
              label: "Nenhuma renda",
              value: Income.NOTHING,
            },
            {
              label: "Até 1 salário mínimo",
              value: Income.LESS_THAN_1,
            },
            {
              label: "De 1 a 3 salários mínimos",
              value: Income.BETWEEN_1_AND_3,
            },
            {
              label: "De 3 a 6 salários mínimos",
              value: Income.BETWEEN_3_AND_6,
            },
            {
              label: "De 6 a 9 salários mínimos",
              value: Income.BETWEEN_6_AND_9,
            },
            {
              label: "De 9 a 12 salários mínimos",
              value: Income.BETWEEN_9_AND_12,
            },
            {
              label: "De 12 a 15 salários mínimos",
              value: Income.BETWEEN_12_AND_15,
            },
            {
              label: "Mais de 15 salários mínimos",
              value: Income.MORE_THAN_15,
            },
          ],
        },
      },
    ],
  },
  {
    title: "Quantas pessoas, ao total, moram em sua residência?",
    questions: [
      {
        key: "houseResidents",
        radioContent: {
          initialValue: HouseResidents.ALONE,
          options: [
            {
              label: "Moro sozinho",
              value: HouseResidents.ALONE,
            },
            {
              label: "Um a três",
              value: HouseResidents.ONE_TO_THREE,
            },
            {
              label: "Quatro a sete",
              value: HouseResidents.FOUR_TO_SEVEN,
            },
            {
              label: "Oito a dez",
              value: HouseResidents.EIGHT_TO_TEN,
            },
            {
              label: "Mais de dez",
              value: HouseResidents.MORE_THAN_TEN,
            },
          ],
        },
      },
    ],
  },
  {
    title: "Sua casa está localizada em?",
    questions: [
      {
        key: "houseLocation",
        radioContent: {
          initialValue: HouseLocation.RURAL,
          options: [
            {
              label: "Zona rural",
              value: HouseLocation.RURAL,
            },
            {
              label: "Zona Urbana",
              value: HouseLocation.URBAN,
            },
            {
              label: "Comunidade Indígena",
              value: HouseLocation.INDIGENOUS,
            },
          ],
        },
      },
    ],
  },
  {
    title: "A casa onde você mora é?",
    questions: [
      {
        key: "houseType",
        radioContent: {
          initialValue: HouseType.OWN,
          options: [
            {
              label: "Própria",
              value: HouseType.OWN,
            },
            {
              label: "Alugada",
              value: HouseType.RENTED,
            },
            {
              label: "Cedida",
              value: HouseType.ASSIGNED,
            },
          ],
        },
      },
    ],
  },
  {
    questions: [
      {
        key: "children",
        title: "Você tem filhos? Se sim, quantos?",
        numericInputContent: {
          initialValue: 0,
          precision: 0,
        },
      },
    ],
  },
  {
    questions: [
      {
        key: "alimony",
        title:
          "Você paga pensão alimentícia para filhos ou ex-cônjuge? Se sim, quanto?",
        numericInputContent: {
          initialValue: 0,
          precision: 2,
        },
      },
    ],
  },
  {
    questions: [
      {
        key: "receivedAlimony",
        title:
          "Você recebe pensão alimentícia para seus filhos? Se sim, quanto?",
        numericInputContent: {
          initialValue: 0,
          precision: 2,
        },
      },
    ],
  },

  {
    title: "Quantos dos itens abaixo há em sua casa:",
    questions: [
      {
        key: "microComputers",
        title: "Microcomputador",
        ...itemAmount,
      },
      {
        key: "vehicles",
        title: "Automóvel",
        ...itemAmount,
      },
      {
        key: "washerMachines",
        title: "Máquina de lavar roupas",
        ...itemAmount,
      },
      {
        title: "Geladeira",
        key: "refrigerators",
        ...itemAmount,
      },
      {
        title: "Notebook",
        key: "notebooks",
        ...itemAmount,
      },
      {
        title: "Telefone celular",
        key: "cellphones",
        ...itemAmount,
      },
      {
        key: "internetAccess",
        title: "Acesso à Intenet",
        ...yesOrNoOptions,
      },
      {
        key: "cableTvAccess",
        title: "Tv pós assinatura",
        ...yesOrNoOptions,
      },
      {
        key: "housekeeper",
        title: "Empregada mensalista",
        ...yesOrNoOptions,
      },
    ],
  },
  {
    title: "Motivo:",
    questions: [
      {
        key: "reason",
        isTextArea: true,
      },
    ],
  },
];

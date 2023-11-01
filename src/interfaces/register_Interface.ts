import { UserType } from "@/enums/userType";

export interface User {
  name: string;
  phone_number: string;
  address: Address;
  cep: string;
  email: string;
  password: string;
  cpf: string | null;
  cnpj: string | null;
  birth_date: Date | null;
  role: UserType | undefined;
}

export interface Address {
  zip: string;
  city: string;
  state: string;
  number: number;
}

export const EMPTY_USER_CONTENT: User = {
  name: "",
  phone_number: "",
  address: {
    city: "",
    number: 10,
    state: "",
    zip: "",
  },
  cep: "",
  email: "",
  password: "",
  cpf: null,
  cnpj: null,
  birth_date: null,
  role: undefined,
};

export interface HouseItems {
  microComputers: ItemAmount;
  vehicles: ItemAmount;
  washerMachines: ItemAmount;
  refrigerators: ItemAmount;
  notebooks: ItemAmount;
  cellphones: ItemAmount;
  internetAccess: boolean;
  cableTvAccess: boolean;
  housekeeper: boolean;
}

export interface Quiz extends HouseItems {
  works: boolean;
  worksCurrently: WorkType;
  houseExpenses: ImportanceDegree;
  supportFamily: ImportanceDegree;
  independence: ImportanceDegree;
  getExperience: ImportanceDegree;
  payStudies: ImportanceDegree;
  workHours: WorkHours;
  familyIncome: Income;
  houseResidents: HouseResidents;
  houseLocation: HouseLocation;
  houseType: HouseType;
  children: number;
  alimony: number;
  receivedAlimony: number;
  reason: string;
}

export enum ItemAmount {
  ZERO = "zero",
  ONE = "one",
  TWO = "two",
  THREE_PLUS = "three_plus",
}

export enum WorkType {
  AGRICULTURE = "agriculture",
  INDUSTRY_OR_CONSTRUCTION = "industry_or_construction",
  SERVICES = "services",
  PUBLIC_AGENT = "public_agent",
  INFORMAL = "informal",
  INFORMAL_HOME_OFFICE = "informal_home_office",
  DOMESTICS_SERVICE = "domestics_service",
  HOME_WITHOUT_PAYMENT = "home_without_payment",
  OTHER = "other",
  UNEMPLOYED = "unemployed",
}

export enum WorkHours {
  LESS_THAN_10 = "less_than_10",
  BETWEEN_11_AND_20 = "between_11_and_20",
  BETWEEN_21_AND_30 = "between_21_and_30",
  BETWEEN_31_AND_44 = "between_31_and_44",
}

export enum Income {
  NOTHING = "nothing",
  LESS_THAN_1 = "less_than_1",
  BETWEEN_1_AND_3 = "between_1_and_3",
  BETWEEN_3_AND_6 = "between_3_and_6",
  BETWEEN_6_AND_9 = "between_6_and_9",
  BETWEEN_9_AND_12 = "between_9_and_12",
  BETWEEN_12_AND_15 = "between_12_and_15",
  MORE_THAN_15 = "more_than_15",
}

export enum HouseResidents {
  ALONE = "alone",
  ONE_TO_THREE = "one_to_three",
  FOUR_TO_SEVEN = "four_to_seven",
  EIGHT_TO_TEN = "eight_to_ten",
  MORE_THAN_TEN = "more_than_ten",
}

export enum HouseLocation {
  RURAL = "rural",
  URBAN = "urban",
  INDIGENOUS = "indigenous",
}

export enum HouseType {
  OWN = "own",
  RENTED = "rented",
  ASSIGNED = "assigned",
}
type ImportanceDegree = 1 | 2 | 3 | 4 | 5;

export const EMPTY_QUIZ_CONTENT: Quiz = {
  microComputers: ItemAmount.ZERO,
  vehicles: ItemAmount.ZERO,
  washerMachines: ItemAmount.ZERO,
  refrigerators: ItemAmount.ZERO,
  notebooks: ItemAmount.ZERO,
  cellphones: ItemAmount.ZERO,
  internetAccess: false,
  cableTvAccess: false,
  housekeeper: false,
  works: false,
  worksCurrently: WorkType.UNEMPLOYED,
  houseExpenses: 1,
  supportFamily: 1,
  independence: 1,
  getExperience: 1,
  payStudies: 1,
  workHours: WorkHours.LESS_THAN_10,
  familyIncome: Income.NOTHING,
  houseResidents: HouseResidents.ALONE,
  houseLocation: HouseLocation.RURAL,
  houseType: HouseType.OWN,
  children: 0,
  alimony: 0,
  receivedAlimony: 0,
  reason: "",
};

interface NumericFieldRule {
  min: number;
  precision: number;
  minErrorMessage: string;
  precisionErrorMessage: string;
}

const fieldRules = new Map<keyof Quiz, NumericFieldRule>([
  [
    "children",
    {
      min: 0,
      precision: 0,
      minErrorMessage: "A quantidade de filhos deve ser maior ou igual a zero",
      precisionErrorMessage:
        "A quantidade de filhos deve ser um número inteiro",
    },
  ],
  [
    "alimony",
    {
      min: 0,
      precision: 2,
      minErrorMessage: "A pensão paga deve ser maior ou igual a zero",
      precisionErrorMessage:
        "A pensão paga deve possuir no máximo 2 casas decimais",
    },
  ],
  [
    "receivedAlimony",
    {
      min: 0,
      precision: 2,
      minErrorMessage: "A pensão recebida deve ser maior ou igual a zero",
      precisionErrorMessage:
        "A pensão recebida deve possuir no máximo 2 casas decimais",
    },
  ],
]);

function countDecimalPlaces(value: number) {
  const decimalPart = (value.toString().split(".")[1] || "").length;
  return decimalPart;
}

export function validateFields(obj: Quiz) {
  Array.from(fieldRules).forEach((fieldRule) => {
    const key = fieldRule[0];
    const rule = fieldRule[1];
    const value = Number(obj[key]);
    if (value < rule.min) {
      throw new Error(rule.minErrorMessage);
    }
    if (countDecimalPlaces(value) > rule.precision) {
      throw new Error(rule.precisionErrorMessage);
    }
  });
}
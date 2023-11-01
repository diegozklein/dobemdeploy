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
  ZERO = "ZERO",
  ONE = "ONE",
  TWO = "TWO",
  THREE_PLUS = "THREE_PLUS",
}

export enum WorkType {
  AGRICULTURE = "AGRICULTURE",
  INDUSTRY_OR_CONSTRUCTION = "INDUSTRY_OR_CONSTRUCTION",
  SERVICES = "SERVICES",
  PUBLIC_AGENT = "PUBLIC_AGENT",
  INFORMAL = "INFORMAL",
  INFORMAL_HOME_OFFICE = "INFORMAL_HOME_OFFICE",
  DOMESTICS_SERVICE = "DOMESTICS_SERVICE",
  HOME_WITHOUT_PAYMENT = "HOME_WITHOUT_PAYMENT",
  OTHER = "OTHER",
  UNEMPLOYED = "UNEMPLOYED",
}

export enum WorkHours {
  LESS_THAN_10 = "LESS_THAN_10",
  BETWEEN_11_AND_20 = "BETWEEN_11_AND_20",
  BETWEEN_21_AND_30 = "BETWEEN_21_AND_30",
  BETWEEN_31_AND_44 = "BETWEEN_31_AND_44",
}

export enum Income {
  NOTHING = "NOTHING",
  LESS_THAN_1 = "LESS_THAN_1",
  BETWEEN_1_AND_3 = "BETWEEN_1_AND_3",
  BETWEEN_3_AND_6 = "BETWEEN_3_AND_6",
  BETWEEN_6_AND_9 = "BETWEEN_6_AND_9",
  BETWEEN_9_AND_12 = "BETWEEN_9_AND_12",
  BETWEEN_12_AND_15 = "BETWEEN_12_AND_15",
  MORE_THAN_15 = "MORE_THAN_15",
}

export enum HouseResidents {
  ALONE = "ALONE",
  ONE_TO_THREE = "ONE_TO_THREE",
  FOUR_TO_SEVEN = "FOUR_TO_SEVEN",
  EIGHT_TO_TEN = "EIGHT_TO_TEN",
  MORE_THAN_TEN = "MORE_THAN_TEN",
}

export enum HouseLocation {
  RURAL = "RURAL",
  URBAN = "URBAN",
  INDIGENOUS = "INDIGENOUS",
}

export enum HouseType {
  OWN = "OWN",
  RENTED = "RENTED",
  ASSIGNED = "ASSIGNED",
}
type ImportanceDegree = "1" | "2" | "3" | "4" | "5";

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
  houseExpenses: "1",
  supportFamily: "1",
  independence: "1",
  getExperience: "1",
  payStudies: "1",
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

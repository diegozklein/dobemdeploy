import { UserType } from "../enums/userType";

export const userTypes = [
  { key: UserType.DONOR_PF, value: "Doador Pessoa Física" },
  { key: UserType.DONOR_PJ, value: "Doador Pessoa Jurídica" },
  { key: UserType.INTERMEDIARY, value: "Intermediário" },
  { key: UserType.RECEIVER, value: "Recebedor" },
];

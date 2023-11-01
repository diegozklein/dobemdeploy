import { Role, Company_type} from "@prisma/client";

interface User {
    name: string;
    phone_number: string;
    email: string;
    password: string;
    cpf: string | null; 
    cnpj: string | null; 
    birth_date: Date | null; 
    fk_company_size: string | null; 
    address : Address;
    role : Role;
    company_type : Company_type | null | undefined;
    donate_profit : boolean | null;
    donate_icms : boolean | null;
  }

  interface Address {
    zip : string;
    city : string;
    state : string;
    number : number;
  }

  export default User;
  
import Image from "next/image";
import InputField from "../../../components/InputField";
import Select from "../../../components/Select";
import Checkbox from "@/components/Checkbox";
import { userTypes } from "../../../mocks/userTypeSelect";
import { UserType } from "../../../enums/userType";
import styles from "./styles.module.css";
import { Address, User } from "@/interfaces/register_Interface";
import { useState } from "react";

interface UserInfoQuestionnaireProps {
  user: User;
  userType?: string;
  changeUserType: (role: string) => void;
  onChange: (
    value: string,
    key: keyof User,
    secondaryKey?: keyof Address | undefined
  ) => void;
}
const UserInfoQuestionnaire: React.FC<UserInfoQuestionnaireProps> = ({
  user,
  userType,
  changeUserType,
  onChange,
}) => {
  const [_, setAddressCep] = useState();

  //TODO: Improve this logic
  const getByCep = async (cep: string) => {
    if (cep.length == 8) {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const address = await response.json();
      if (!address.erro) {
        const zip = `${address.logradouro} - ${address.bairro}`
        onChange(zip, "address", "zip");
        onChange(address.localidade, "address", "city");
        onChange(address.uf, "address", "state");
        setAddressCep(address);
      }
    }
  }

  return (
    <div className={styles.form}>
      <div className={styles.inputIcon}>
        <Image
          src='/svgs/register.svg'
          width={24}
          height={24}
          alt=''
        />
        <InputField
          onChange={(value: string) => onChange(value, "name")}
          type='text'
          placeholder='Nome'
        />
      </div>
      <div className={styles.inputIcon}>
        <Image
          src='/svgs/phone.svg'
          width={24}
          height={24}
          alt=''
        />
        <InputField
          onChange={(value: string) => onChange(value, "phone_number")}
          type='text'
          placeholder='Telefone'
        />
      </div>
      <div className={styles.inputIcon}>
        <Image
          src='/svgs/region.svg'
          width={24}
          height={24}
          alt=''
        />
        <InputField
          onChange={(value: string) => { onChange(value, "cep"); getByCep(value) }}
          type='text'
          placeholder='CEP'
        />
      </div>
      <div className={styles.inputIcon}>
        <Image
          src='/svgs/house.svg'
          width={24}
          height={24}
          alt=''
        />
        <InputField
          initialValue={user.address.zip}
          onChange={(value: string) => onChange(value, "address", "zip")}
          type='text'
          placeholder='Endereço'
        />
      </div>
      <div className={styles.inputIcon}>
        <Image
          src='/svgs/city.svg'
          width={24}
          height={24}
          alt=''
        />
        <InputField
          initialValue={user.address.city}
          onChange={(value: string) => onChange(value, "address", "city")}
          type='text'
          placeholder='Cidade'
        />
      </div>
      <div className={styles.inputIcon}>
        <Image
          src='/svgs/globe.svg'
          width={24}
          height={24}
          alt=''
        />
        <InputField
          initialValue={user.address.state}
          onChange={(value: string) => onChange(value, "address", "state")}
          type='text'
          placeholder='Estado'
        />
      </div>
      <div className={styles.inputIcon}>
        <Image
          src='/svgs/email.svg'
          width={24}
          height={24}
          alt=''
        />
        <InputField
          onChange={(value: string) => onChange(value, "email")}
          type='text'
          placeholder='Email'
        />
      </div>
      <div className={styles.inputIcon}>
        <Image
          src='/svgs/password.svg'
          width={24}
          height={24}
          alt=''
        />
        <InputField
          onChange={(value: string) => onChange(value, "password")}
          type='password'
          placeholder='Senha'
        />
      </div>
      <div className={styles.inputIcon}>
        <Image
          src='/svgs/userType.svg'
          width={24}
          height={24}
          alt=''
        />
        <Select
          options={userTypes}
          value={user.role}
          setValue={changeUserType}
        />
      </div>
      {userType == UserType.DONOR_PJ || userType == UserType.INTERMEDIARY ? (
        <>
          <div className={styles.inputIcon}>
            <Image
              src='/svgs/cnpjcpf.svg'
              width={24}
              height={24}
              alt=''
            />
            <InputField
              onChange={(value: string) => onChange(value, "cnpj")}
              type='text'
              placeholder='CNPJ'
            />
          </div>
          <div className={styles.inputIcon}>
            <Image
              src='/svgs/birthday.svg'
              width={24}
              height={24}
              alt=''
            />
            <InputField
              onChange={(value: string) => onChange(value, "birth_date")}
              type='date'
              placeholder='Data de Criação'
            />
          </div>
        </>
      ) : (
        <>
          <div className={styles.inputIcon}>
            <Image
              src='/svgs/cnpjcpf.svg'
              width={24}
              height={24}
              alt=''
            />
            <InputField
              onChange={(value: string) => onChange(value, "cpf")}
              type='text'
              placeholder='CPF'
            />
          </div>
          <div className={styles.inputIcon}>
            <Image
              src='/svgs/birthday.svg'
              width={24}
              height={24}
              alt=''
            />
            <InputField
              onChange={(value: string) => onChange(value, "birth_date")}
              type='date'
              placeholder='Data de Nascimento'
            />
          </div>
        </>
      )}
      <div className={styles.checkbox}>
        <Checkbox label='Eu li e aceito os termos e condições.' />
      </div>
    </div>
  );
};

export default UserInfoQuestionnaire;

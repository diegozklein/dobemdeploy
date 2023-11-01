"use client";
import styles from "./styles.module.css";
import Input from "@/components/InputField";
import Button from "@/components/Button";
import { useState } from "react";
import { verifyCode } from "./services/verifyCode";
import ModalComponent from "@/components/ModalComponent";
import { DonationStatus } from "@prisma/client";
import { updateDonationStatus } from "../service/dashboardService";

interface ValidateCodeModalProps {
  isOpen: boolean;
  close: () => void;
  reFetchData: () => void;
}

export default function ValidateCodeModal({
  isOpen,
  close,
  reFetchData,
}: ValidateCodeModalProps) {
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  function onChange(value: string) {
    setCode(value);
  }

  const sendCode = async () => {
    try {
      const status = await verifyCode(code);
      if (status) {
        setMessage("Doação Entregue com sucesso");
        setStatus(true);
        reFetchData();
      } else {
        setMessage("Código Invalido");
      }
      close();
    } catch (error: any) {}
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      close={close}
    >
      <div className={styles.card}>
        <Input
          onChange={(value: string) => onChange(value)}
          placeholder='Código do pedido'
          type={"text"}
        ></Input>
        {!status && message && <p className={styles.position}>{message}</p>}
        <div className={styles.button}>
          <Button
            onClick={sendCode}
            label='Verificar'
          ></Button>
        </div>
      </div>
    </ModalComponent>
  );
}

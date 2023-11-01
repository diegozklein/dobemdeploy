import ModalComponent from "@/components/ModalComponent";
import Button from "@/components/Button";
import InputField from "@/components/InputField";
import Image from "next/image";
import { Donation } from "@prisma/client";
import styles from "./styles.module.css";
import { useState } from "react";
import { UserType } from "@/enums/userType";
import APICaller from "../../../utils/apiCaller";
import agendaIcon from "../../../../public/iconCalendario.svg";
import checkMarkIcon from "../../../../public/iconCheckMark.svg";

interface RescheduleModalProps {
  isOpen: boolean;
  userType: UserType;
  close: () => void;
  data: Donation;
}

export default function RescheduleModal({
  isOpen,
  close,
  data,
}: RescheduleModalProps) {
  const [newDate, setNewDate] = useState<string | undefined>("");
  const [message, setMessage] = useState("");
  const [reschedule, setReschedule] = useState(false);

  const handleReschedule = async () => {
    setMessage("");

    if (!newDate) {
      setMessage("Selecione uma data");
      return;
    }

    try {
      const response = await APICaller("/api/reschedule_donation", "PUT", {
        donationId: data.id,
        date: newDate,
      });

      if (response.data) {
        setMessage("Doação reagendada com sucesso");
        setReschedule(true);

        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else {
        setMessage("Erro ao reagendar doação, informe uma data válida");
      }
    } catch (error) {
      setMessage("Erro ao reagendar doação");
    }
  };

  const modalClose = () => {
    close();
    setMessage("");
  };

  return (
    <ModalComponent
      isOpen={isOpen}
      close={modalClose}
    >
      {reschedule ? (
        <Image
          src={checkMarkIcon}
          alt='Ícone CheckMark'
          className={styles.checkMark}
        />
      ) : (
        <div className={styles.card}>
          <p>Selecione a nova data para a retirada da sua doação:</p>
          <div className={styles.inputContainer}>
            <div className={styles.iconContainer}>
              <Image
                src={agendaIcon}
                alt='Ícone Calendário'
                className={styles.logo}
              />
            </div>
            <div className={styles.labelContainer}>
              <p>Data:</p>
            </div>
            <div className={styles.inputFieldContainer}>
              <InputField
                onChange={(value) => setNewDate(value)}
                type='date'
                placeholder='Nova data de retirada'
              />
            </div>
          </div>
          {message && (
            <p
              className={`${styles.error} ${
                reschedule ? styles["error-success"] : ""
              }`}
            >
              {message}
            </p>
          )}
          <div className={styles.button}>
            <Button
              onClick={handleReschedule}
              label='Confirmar'
            />
          </div>
        </div>
      )}
    </ModalComponent>
  );
}

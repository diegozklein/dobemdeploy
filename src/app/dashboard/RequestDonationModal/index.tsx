import Button from "@/components/Button";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import APICaller from "../../../utils/apiCaller";

export default function RequestDonationModal() {
  const [message, setMessage] = useState("");

  const handleRequestDonation = async () => {
    try {
      const response = await APICaller("/api/intermediary_list", "GET");
      const userId = response.message[0].user.id;

      if (userId) {
        setMessage("Doação solicitada com sucesso");
        const requestDonation = await APICaller(
          "/api/order_register",
          "POST",
          { intermediary_id: userId }
        );
      } else {
        setMessage(
          "Infelizmente, sua cidade não possui intermediários cadastrados, entre em contato com a DoBem e nos ajude a cadastrar mais empresas"
        );
      }
    } catch (error) {
      setMessage(
        "Infelizmente, sua cidade não possui intermediários cadastrados, entre em contato com a DoBem e nos ajude a cadastrar mais empresas"
      );
    }
  };

  return (
    <div>
      <div className={styles.card}>
        <p>{message}</p>
        <div className={styles.inputContainer}></div>
        <div className={styles.button}>
          {!message ? <Button
            onClick={handleRequestDonation}
            label='Solicitar doação'
          /> : null}
        </div>
      </div>
    </div>
  );
}

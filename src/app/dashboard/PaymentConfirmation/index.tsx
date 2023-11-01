"use client";
import Button from "@/components/Button";
import styles from "./styles.module.css";
import Image from "next/image";
import icone from "../../../../public/svgs/paymentConfirmation.svg";

export default function PaymentConfirmation({
  handleClose,
}: {
  handleClose: () => void;
}) {
  return (
    <div className={styles.container}>
      <div className={styles.paymentConfirmation}>
        <div className={styles.title}>
          <p>Agradecemos a sua doação!</p>
          <div className={styles.description}>
            <p>Você está tornando o mundo um lugar melhor!</p>
          </div>
        </div>
        <Image
          src={icone}
          alt='Ícone'
          className={styles.logo}
        />

        <Button
          onClick={handleClose}
          label='Fechar'
        />
      </div>
    </div>
  );
}

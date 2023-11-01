"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Button from "@/components/Button";
import CurrencyInput from "@/components/CurrencyInput";
import Image from "next/image";
import shoppingNest from "../../../../public/shoppingNest.svg";
import APICaller from "../../../utils/apiCaller";
import PaymentConfirmation from "..//PaymentConfirmation";

const PaymentForm = ({ handleClose }: { handleClose: () => void }) => {
  const [amount, setAmount] = useState("0,00");
  const [message, setMessage] = useState("");
  const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function convertToNumber(amount: string): number {
    const floatamount = parseFloat(amount.replace(".", "").replace(",", "."));
    return floatamount;
  }

  const handlePayment = async () => {
    setMessage("");
    if (convertToNumber(amount) < 5) {
      setMessage("Valor mínimo de doação é de R$ 5,00");
      return;
    }
    try {
      setIsLoading(true);
      const response = await APICaller("/api/donation_register", "POST", {
        amount: convertToNumber(amount),
      });
      if (response.data) {
        setIsLoading(false);
        setIsPaymentConfirmed(true);
      } else {
        setIsLoading(false);
        setMessage("Erro ao efetuar o pagamento");
        console.log(message);
      }
    } catch (error: any) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.paymentContainer}>
        {isPaymentConfirmed ? (
          <PaymentConfirmation handleClose={handleClose} />
        ) : (
          <>
            <div className={styles.payment}>
              <h3>Valor</h3>
              <Image
                src={shoppingNest}
                alt='Ícone'
              />
              <h2>R$ {amount}</h2>
              <div className={styles.inputFields}>
                <CurrencyInput
                  onChange={(receivedamount) => setAmount(receivedamount)}
                />
                {message && <p className={styles.error}>{message}</p>}
              </div>
            </div>
            <div className={styles.button}>
              <Button
                onClick={() => handlePayment()}
                label={isLoading ? "Carregando..." : "Efetuar doação"}
                theme='secondary'
                disabled={isLoading}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;

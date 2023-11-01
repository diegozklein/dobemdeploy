import React, { useState } from "react";
import styles from "./styles.module.css";

const MAX_VALUE = 100000000;

interface InputFieldProps {
  onChange: (value: any) => void;
}

const CurrencyInput = ({ onChange }: InputFieldProps) => {
  const [value, setValue] = useState(0);

  const handleInputChange = (e: any) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/[^0-9]/g, "");
    const newValue = parseFloat(numericValue);
    if (!isNaN(newValue) && newValue <= MAX_VALUE) {
      setValue(newValue);
    }
  };

  const formatCurrency = () => {
    const formattedValue = (value / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    });
    onChange(formattedValue.replace("R$", "").trim());
    return formattedValue;
  };

  return (
    <div className={styles.container}>
      <input
        spellCheck="false"
        className={styles.inputField}
        type="text"
        value={formatCurrency()}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default CurrencyInput;
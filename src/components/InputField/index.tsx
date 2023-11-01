import { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import styles from "./styles.module.css";

interface InputFieldProps {
  onChange: (value: string) => void;
  type: string;
  placeholder?: string;
  theme?: 'primary' | 'secondary';
  initialValue?: string | number;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function InputField({ onChange, type, placeholder, theme = 'primary', onKeyDown, initialValue }: InputFieldProps) {
  const [value, setValue] = useState(initialValue || "");

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  useEffect(() => {
    setValue(initialValue || '');
  }, [initialValue])

  return (
    <div className={styles.container}>
      <input
        className={`${styles.inputField} ${theme === 'secondary' ? `${styles.secondary}` : `${styles.primary}`}`}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={onKeyDown}
      />
    </div>
  );
}

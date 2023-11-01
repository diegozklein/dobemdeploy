import { useState, ChangeEvent } from "react";
import styles from "./styles.module.css";

interface TextAreaProps {
  onChange: (value: string) => void;
  placeholder?: string;
}

const TextArea: React.FC<TextAreaProps> = ({ onChange, placeholder }) => {
  const [value, setValue] = useState("");

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    onChange(newValue);
  };

  return (
    <textarea
      className={styles.textArea}
      value={value}
      placeholder={placeholder}
      onChange={handleTextAreaChange}
    />
  );
};

export default TextArea;
import { useState } from "react";
import styles from "./styles.module.css";

interface Option {
  label: string;
  value: string;
}
interface RadioSelectorProps {
  options: Option[];
  onChange: (value: string) => void;
  initialSelected: string;
  horizontal?: boolean;
}

const RadioSelector: React.FC<RadioSelectorProps> = ({
  options,
  onChange,
  initialSelected,
  horizontal,
}) => {
  const [selected, setSelected] = useState(initialSelected);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    onChange(value);
    setSelected(value);
  };

  return (
    <div className={horizontal ? styles.horizontalContainer : styles.container}>
      {options.map((option, index) => (
        <div className={styles.option} key={index}>
          <input
            className={styles.input}
            type="radio"
            value={option.value}
            checked={selected === option.value}
            onChange={handleRadioChange}
          />
          <div className={styles.text}>{option.label}</div>
        </div>
      ))}
    </div>
  );
};
export default RadioSelector;

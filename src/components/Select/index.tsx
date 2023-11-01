import styles from "./styles.module.css";
import { Option } from "@/types/option";

type SelectProps = {
  options: Option[];
  value: string | undefined;
  setValue: (role: string) => void;
};

function Select(select: SelectProps) {
  return (
    <div className={styles.container}>
      <select
        value={select.value}
        className={styles.select}
        onChange={(event) => select.setValue(event.target.value)}
      >
        <option value="">Selecione um item</option>
        {select.options.map((item, index) => {
          return (
            <option key={index} value={item.key}>
              {item.value}
            </option>
          );
        })}
      </select>
    </div>
  );
}

export default Select;

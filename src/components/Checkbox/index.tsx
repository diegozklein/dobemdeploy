import styles from "./styles.module.css"

interface CheckboxProps {
  label?: string;
}

const Checkbox = ({ label }: CheckboxProps) => {
  return (
    <div>
      <input type="checkbox" />
      <label className={styles.checkbox}>
        <span>{label}</span>
      </label>
    </div>
  );
};

export default Checkbox;

import styles from "./styles.module.css";

type ButtonProps = {
  onClick: () => void;
  label?: string;
  theme?: "primary" | "secondary";
  disabled?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  theme = "primary",
  disabled = false
}) => {
  return (
    <button
      className={`${styles.button} ${theme === "secondary" ? `${styles.secondary}` : `${styles.primary}`
        }`}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;

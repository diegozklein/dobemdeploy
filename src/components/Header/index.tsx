import styles from "./styles.module.css";

interface HeaderProps {
  onClick: () => void;
  showLeftArrow: boolean;
}

function Header({ onClick, showLeftArrow }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        {showLeftArrow && (
          <button
            className={styles.leftArrow}
            onClick={onClick}
          >
            <img src='/leftArrow.svg' />
          </button>
        )}
      </div>

      <h1 className={styles.doBem}>DoBem</h1>
      <img
        className={styles.doBemLogo}
        src='/doBemLogo.svg'
      />
    </header>
  );
}

export default Header;

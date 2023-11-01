"use client";
import styles from "./styles.module.css";

export default function WelcomeCard() {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.text}>
          <div className={styles.welcome}>{"Bem-vindo(a)"}</div>
          <div className={styles.smallerText}>
            Através do nosso site você tem a possibilidade de receber uma doação de alimentos
            única ou mensal conforme a sua necessidade.
          </div>
        </div>
      </div>
    </div>
  );
}

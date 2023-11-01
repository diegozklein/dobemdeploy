import styles from "./styles.module.css";

interface DonationCardProps {
  paymentType: string;
  value?: number;
  date?: String;
}

export default function DonationCard(props: DonationCardProps) {
  return (
    <div className={styles.container}>
      <div className={styles.donationCard}>
        <div className={styles.donationCard__header}>
          <h1 className={styles.title}>Doação - {props.paymentType}</h1>
        </div>
        <div className={styles.donationCard__content}>
          <p className={styles.value}>R$ {props.value}</p>
          <p className={styles.date}>{props.date}</p>
        </div>

      </div>
    </div>
  );
};


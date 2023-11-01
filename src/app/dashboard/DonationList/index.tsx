import { Donation, MoneyDonation } from "@prisma/client";
import styles from "./styles.module.css";
import { Fragment, useState } from "react";
import DonationInfoModal from "@/app/dashboard/DonationInfoModal";
import Button from "@/components/Button";
import { UserType } from "@/enums/userType";
import { convert8601 } from "../../../utils/transformers/date";
import { StatusTranslations } from "@/enums/statusTranslations";
import { PaymentType } from "@/enums/paymentType";
import { getValueMasked } from "@/utils/transformers/money";

interface ReceiverListProps {
  data: (Donation | MoneyDonation)[];
  userType: UserType;
  reFetchData?: () => void;
}

export default function DonationList({
  data,
  userType,
  reFetchData,
}: ReceiverListProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentDonation, setCurrentDonation] = useState<Donation>();

  function openModal(data: Donation) {
    setIsOpen(true);
    setCurrentDonation(data);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const AllFields = {
    [UserType.DONOR_PF]: {
      firstTitle: "Data",
      secondTitle: "Valor",
      firstItemKey: "creation_date",
      secondItemKey: "amount",
    },
    [UserType.DONOR_PJ]: {
      firstTitle: "Data",
      secondTitle: "Valor",
      firstItemKey: "creation_date",
      secondItemKey: "amount",
    },
    [UserType.RECEIVER]: {
      firstTitle: "Data",
      secondTitle: "Status",
      firstItemKey: "delivery_date",
      secondItemKey: "status",
    },
    [UserType.INTERMEDIARY]: {
      firstTitle: "Data",
      secondTitle: "Status",
      firstItemKey: "delivery_date",
      secondItemKey: "status",
    },
  };

  const fields = AllFields[userType] as {
    firstTitle: string;
    secondTitle: string;
    firstItemKey: keyof (typeof data)[0];
    secondItemKey: keyof (typeof data)[0];
  };

  function genericFilter(item: string | number | Date | null, key?: string) {
    if (!item) {
      return "";
    }

    if (key === "creation_date" || key === "delivery_date") {
      if (key === "delivery_date") {
        const formattedDate = convert8601(item as string);
        const parts = formattedDate.split(" - ");
        return parts[0];
      }
      return convert8601(item as string);
    }

    if (key === "status") {
      return StatusTranslations[item as keyof typeof StatusTranslations];
    }

    if (key === "payment_type") {
      return PaymentType[item as keyof typeof PaymentType];
    }
    return item.toString();
  }
  return (
    <div className={styles.component}>
      <div className={styles.tableHeader}>
        <div className={styles.titleElement}>{fields.firstTitle}</div>
        <div className={`${styles.mobileHiddlable} ${styles.titleElement}`}>{fields.secondTitle}</div>
      </div>
      <div className={styles.titleElement}></div>
      {data.map((item: Donation | MoneyDonation, index) => (
        <div
          key={index}
          className={styles.itemContainer}
        >
          <div className={styles.itemElement}>
            {genericFilter(
              item[fields.firstItemKey as keyof typeof item],
              fields.firstItemKey
            )}
          </div>
          <div className={`${styles.mobileHiddlable} ${styles.itemElement}`}>
            {
              fields.secondItemKey === "amount" ? getValueMasked(genericFilter(
                item[fields.secondItemKey as keyof typeof item],
                fields.secondItemKey
              )) : genericFilter(
                item[fields.secondItemKey as keyof typeof item],
                fields.secondItemKey
              )
            }
          </div>
          <div className={styles.itemElement}>
            <Button
              label='Detalhes'
              key={index}
              theme='secondary'
              onClick={() => openModal(item as Donation)}
            />
          </div>
        </div>
      ))}
      {currentDonation && (
        <DonationInfoModal
          close={() => closeModal()}
          isOpen={modalIsOpen}
          userType={userType}
          data={currentDonation}
          reFetchData={reFetchData}
        />
      )}
    </div>
  );
}

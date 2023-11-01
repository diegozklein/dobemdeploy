import ModalComponent from "@/components/ModalComponent";
import Button from "@/components/Button";
import { Donation, DonationStatus, MoneyDonation } from "@prisma/client";
import styles from "./styles.module.css";
import { Fragment, useState } from "react";
import { convert8601 } from "../../../utils/transformers/date";
import { UserType } from "@/enums/userType";
import { StatusTranslations } from "@/enums/statusTranslations";
import { PaymentType } from "@/enums/paymentType";
import RescheduleModal from "@/app/dashboard/rescheduleModal";
import { updateDonationStatus } from "../service/dashboardService";
import { getValueMasked } from "@/utils/transformers/money";

interface DonationInfoModalProps {
  isOpen: boolean;
  userType: UserType;
  close: () => void;
  data: Donation | MoneyDonation;
  reFetchData?: () => void;
}

export default function DonationInfoModal({
  isOpen,
  close,
  data,
  userType,
  reFetchData,
}: DonationInfoModalProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [currentDonation, setCurrentDonation] = useState<Donation>();

  const AllFields = {
    [UserType.DONOR_PF]: [
      { title: "Data", itemKey: "creation_date" },
      { title: "Valor", itemKey: "amount" },
      { title: "Forma de pagamento", itemKey: "payment_type" },
      { title: "Codigo", itemKey: "code" },
    ],
    [UserType.DONOR_PJ]: [
      { title: "Data", itemKey: "creation_date" },
      { title: "Valor", itemKey: "amount" },
      { title: "Forma de pagamento", itemKey: "payment_type" },
      { title: "Codigo", itemKey: "code" },
    ],
    [UserType.RECEIVER]: [
      { title: "Código para retirada", itemKey: "code" },
      { title: "Tipo de doação", itemKey: "food_type" },
      { title: "Quantidade", itemKey: "quantity" },
      { title: "Status do pedido", itemKey: "status" },
      { title: "Tipo do Estabelecimento", itemKey: "company_type" },
      { title: "Data limite de retirada", itemKey: "delivery_date" },
    ],
    [UserType.INTERMEDIARY]: [
      { title: "Tipo de doação", itemKey: "food_type" },
      { title: "Status do pedido", itemKey: "status" },
      { title: "Valor", itemKey: "amount" },
      { title: "Data de entrega", itemKey: "delivery_date" },
    ],
  };

  const fields = AllFields[userType] as {
    title: string;
    itemKey: keyof typeof data;
  }[];

  async function updateStatus(status: DonationStatus) {
    await updateDonationStatus(data.id, status);
    reFetchData && reFetchData();
    close();
  }

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

  function openModal(data: Donation) {
    setIsOpen(true);
    setCurrentDonation(data);
  }

  function closeModal() {
    setIsOpen(false);
  }

  function message(status: string) {
    if (status === "DECLINED") {
      return "Infelizmente o intermediário não aceitou a sua solicitação, tente fazer uma nova requisição.";
    }
    if (status === "PENDING") {
      return "Aguardando por uma doação.";
    }
    if (status === "ACCEPTED") {
      return "O intermediário aceitou sua solicitação, agora é só esperar ele finalizar o preparo.";
    }
    if (status === "READY") {
      return "Esta doação encontra-se pronta para retirada! Caso não puder comparecer até a data confirmada, clique em reagendar.";
    }
    if (status === "COMPLETED") {
      return "Essa doação já foi retirada por você.";
    }
    if (status === "CANCELED") {
      return "Você cancelou esta doação.";
    }
    if (status === "RESCHEDULED") {
      return "Você reagendou essa doação, compareça ao local de retirada na nova data confirmada.";
    }
  }

  if (userType != UserType.RECEIVER) {
    return (
      <ModalComponent
        isOpen={isOpen}
        close={close}
      >
        <div className={styles.card}>
          {fields.map((element, index) => {
            if (data[element.itemKey]) {
              return (
                <Fragment key={index}>
                  <span>{element.title}</span>
                  <div className={styles.data}>
                    {element.itemKey === "amount" ? getValueMasked(genericFilter(data[element.itemKey], element.itemKey)) : genericFilter(data[element.itemKey], element.itemKey)}
                  </div>
                </Fragment>
              );
            }
          })}
          {userType === UserType.INTERMEDIARY &&
            "status" in data &&
            data.status === DonationStatus.PENDING && (
              <Fragment>
                <div className={styles.manageStatusButton}>
                  <Button
                    label='Aceitar'
                    onClick={() => updateStatus(DonationStatus.ACCEPTED)}
                  />
                </div>
                <div className={styles.manageStatusButton}>
                  <Button
                    label='Rejeitar'
                    onClick={() => updateStatus(DonationStatus.DECLINED)}
                  />
                </div>
              </Fragment>
            )}
          {userType === UserType.INTERMEDIARY &&
            "status" in data &&
            data.status === DonationStatus.ACCEPTED && (
              <div className={styles.singleButton}>
                <Button
                  label='Pronto'
                  onClick={() => updateStatus(DonationStatus.READY)}
                />
              </div>
            )}
        </div>
      </ModalComponent>
    );
  } else {
    return (
      <ModalComponent
        isOpen={isOpen}
        close={close}
      >
        <div className={styles.card}>
          {fields.map((element, index) => {
            if (data[element.itemKey]) {
              return (
                <Fragment key={index}>
                  <span>{element.title}</span>
                  <div className={styles.data}>
                    {genericFilter(data[element.itemKey], element.itemKey)}
                  </div>
                </Fragment>
              );
            }
          })}
        </div>
        {"status" in data && (
          <div className={styles.obs}>
            <p>{message(data.status)}</p>
          </div>
        )}
        {data && "status" in data && data.status === "READY" && (
          <div>
            <div className={styles.button}>
              <Button
                label='Reagendar'
                onClick={() => openModal(data as Donation)}
              />
            </div>
            {currentDonation && (
              <RescheduleModal
                close={() => closeModal()}
                isOpen={modalIsOpen}
                userType={userType}
                data={currentDonation}
              />
            )}
          </div>
        )}
      </ModalComponent>
    );
  }
}

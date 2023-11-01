"use client";
import Button from "@/components/Button";
import styles from "./styles.module.css";
import WelcomeCard from "./welcomeCard";
import { ReactNode, useEffect, useState } from "react";
import { UserType } from "@/enums/userType";
import APICaller from "../../utils/apiCaller";
import DonationList from "./DonationList";
import ModalComponent from "@/components/ModalComponent";
import Payment from "@/app/dashboard/PaymentForm";
import Skeleton from "@/components/skeleton/skeleton.component";
import { useRouter } from "next/navigation";
import ValidateCodeModal from "./ValidateCodeModal";
import RequestDonationModal from "./RequestDonationModal";

type buttonProp = {
  onClick: () => void;
  label: string;
};

export default function Dashboard() {
  const [userType, setUserType] = useState<UserType>();
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ReactNode | null>();
  const [isLoading, setIsLoading] = useState(true);
  const [isValidationModalOpen, setIsValidationModalOpen] = useState(false);
  const [isRequestDonationModalOpen, setIsRequestDonationModalOpen] =
    useState(false);
  const router = useRouter();

  const buttons: {
    DonorPF: buttonProp[];
    DonorPJ: buttonProp[];
    Receiver: buttonProp[];
    Intermediary: buttonProp[];
  } = {
    [UserType.DONOR_PF]: [
      {
        label: "Doar",
        onClick: () => {
          setModalContent(<Payment handleClose={() => setIsOpen(false)} />);
          setIsOpen(true);
        },
      },
    ],
    [UserType.DONOR_PJ]: [
      {
        label: "Doar",
        onClick: () => {
          setModalContent(<Payment handleClose={() => setIsOpen(false)} />);
          setIsOpen(true);
        },
      },
    ],
    [UserType.RECEIVER]: [
      {
        label: "Pedir doação",
        onClick: () => {
          setModalContent(
            <RequestDonationModal
              isOpen={isRequestDonationModalOpen}
              close={() => setIsRequestDonationModalOpen(false)}
            />
          );
          setIsOpen(true);
        },
      },
    ],
    [UserType.INTERMEDIARY]: [
      // {
      //   label: "Horários disponíveis para atendimento",
      //   onClick: () => {},
      // },
      {
        label: "Validar código de pedido",
        onClick: () => {
          setIsValidationModalOpen(true);
        },
      },
    ],
  };

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await APICaller("/api/self", "GET");
        if (response.data) {
          const userType = response.data.role;
          setUserType(userType);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    }
    fetchUserInfo();
  }, []);

  async function fetchData(skipLoading?: boolean) {
    try {
      if (!skipLoading) {
        setIsLoading(true);
      }
      if (userType === undefined) return;
      const response = await APICaller(
        `/api/donation_info/${getUserRoute(userType)}`,
        "GET",
        {}
      );
      if (response) {
        const donations = response.donations;
        setData(donations);
        if (!skipLoading) {
          setIsLoading(false);
        }
      }
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [userType]);

  function getUserRoute(userType: UserType) {
    if (userType === UserType.DONOR_PF || userType === UserType.DONOR_PJ) {
      return "donor";
    }
    return userType.toLowerCase();
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          {isLoading ? (
            <Skeleton
              height='70vh'
              width='100%'
              borderRadius='0.5rem'
            />
          ) : (
            <div className={styles.welcomeCardContainer}>
              <WelcomeCard />
            </div>
          )}
          <div className={styles.buttonsContainer}>
            {userType && !isLoading ? (
              <>
                {buttons[userType].map((button: buttonProp, index: number) => {
                  return (
                    <Button
                      key={index}
                      theme='secondary'
                      onClick={button.onClick}
                      label={button.label}
                    ></Button>
                  );
                })}
              </>
            ) : null}
          </div>
        </div>
        {isLoading ? (
          <div className={styles.rightSide}>
            <Skeleton
              height='70vh'
              width='100%'
              borderRadius='0.5rem'
            />
          </div>
        ) : (
          <>
            {data?.length > 0 && userType ? (
              <div className={styles.rightSide}>
                <DonationList
                  data={data}
                  userType={userType}
                  reFetchData={() => fetchData(true)}
                />
              </div>
            ) : null}
          </>
        )}
      </div>
      {isOpen && (
        <ModalComponent
          isOpen={isOpen}
          close={() => setIsOpen(false)}
        >
          {modalContent}
        </ModalComponent>
      )}
      <ValidateCodeModal
        isOpen={isValidationModalOpen}
        close={() => setIsValidationModalOpen(false)}
        reFetchData={() => fetchData(true)}
      />
    </div>
  );
}

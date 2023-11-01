"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserType } from "../../enums/userType";
import {
  Address,
  EMPTY_USER_CONTENT,
  User,
} from "../../interfaces/register_Interface";
import { UserService } from "../services/user/userService";
import styles from "./page.module.css";
import Button from "../../components/Button";
import ReceiverQuestionnaire from "./ReceiverQuestionnaire";
import UserInfoQuestionnaire from "./UserInfoQuestionnaire";
import CompanySizeQuestionnaire from "./CompanySizeQuestionnaire";
import IntermediaryQuestionnaire from "./IntermediaryQuestionnaire";

export default function register() {
  const [user, setUser] = useState<User>({ ...EMPTY_USER_CONTENT });
  const [step, setStep] = useState<number>(0);
  const router = useRouter();
  const [userType, setUserType] = useState<string>("");

  async function createUser() {
    await UserService.register(user).then((_) => {
      router.push("../login");
    });
  }

  function onChange(
    value: string | number,
    key: string,
    secondaryKey?: keyof Address
  ) {
    if (secondaryKey && key === "address") {
      (user[key][secondaryKey] as string | number) = value;
    } else {
      (user[key as keyof typeof user] as string | number) = value;
    }

    setUser(user);
  }

  function changeUserType(role: string) {
    user.role = role as UserType;
    setUser(user);
    setUserType(role);
  }

  function handleNext() {
    if (userType === UserType.DONOR_PF) {
      createUser();
    } else {
      setStep(step + 1);
    }
  }

  function getFormStepView() {
    switch (step) {
      case 0:
        return (
          <UserInfoQuestionnaire
            user={user}
            changeUserType={changeUserType}
            onChange={onChange}
            userType={userType}
          />
        );
      case 1:
        if (userType === UserType.DONOR_PJ) {
          return <CompanySizeQuestionnaire onChange={onChange} />;
        } else if (userType === UserType.RECEIVER) {
          return <ReceiverQuestionnaire onChange={onChange} />;
        } else if (userType === UserType.INTERMEDIARY) {
          return (
            <>
              <CompanySizeQuestionnaire onChange={onChange} />
              <IntermediaryQuestionnaire onChange={onChange} />
            </>
          );
        }
      case 2:
        createUser();
        handleNext();
        return null;
      default:
        return null;
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        {getFormStepView()}
        {
          step > 2 ? null :
            <Button
              onClick={handleNext}
              label='Continuar'
            />
        }
      </div>
    </div>
  );
}

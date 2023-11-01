"use client";
import { useState } from "react";
import {
  Quiz,
  EMPTY_QUIZ_CONTENT,
} from "@/interfaces/quiz_Interfaces";
import { cards } from "@/app/api/register/quizData/questions";
import CardBody from "./cardBody";
import QuizCard from "./quizCard";
import styles from "./styles.module.css";
import { Address } from "@prisma/client";

interface QuizProps {
  onChange: (
    value: string | number | Quiz,
    key: string,
    secondaryKey?: keyof Address
  ) => void;
}

export default function Quiz({ onChange }: QuizProps) {
  const quiz: Quiz = { ...EMPTY_QUIZ_CONTENT };
  const [errorMessage, setErrorMessage] = useState("");

  function handleQuiz(key: keyof Quiz, value: number | string) {
    (quiz[key] as string | number) = value;
    onChange(quiz, "quiz");
  }

  return (
    <div className={styles.page}>
      {cards.map((card, index) => (
        <QuizCard key={index}>
          <CardBody
            onChange={(key: keyof Quiz, value: number | string) => {
              handleQuiz(key, value);
            }}
            title={card.title}
            questions={card.questions}
          />
        </QuizCard>
      ))}
      {errorMessage && (
        <QuizCard error={true}>
          <div className={styles.errorMessage}>{errorMessage}</div>
        </QuizCard>
      )}
    </div>
  );
}

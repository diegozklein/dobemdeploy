"use client";
import { CardContent } from "@/app/api/quiz/quizData/questions";
import RadioSelector from "@/components/RadioSelector";
import styles from "./index.module.css";
import InputField from "@/components/InputField";
import { Quiz } from "@/interfaces/quiz_Interfaces";
import TextArea from "@/components/TextArea";

interface CardBodyProps extends CardContent {
  onChange: (key: keyof Quiz, value: number | string) => void;
}

export default function CardBody({
  onChange,
  title,
  questions,
}: CardBodyProps) {
  return (
    <div className={styles.cardBody}>
      {title && <h3 className={styles.cardTitle}>{title}</h3>}
      {questions.map((question, index) => (
        <div className={styles.question} key={index}>
          <h4 className={styles.title}>{question.title}</h4>
          {question.radioContent && (
            <div
              className={
                styles.cardContent + " " + question.radioContent.horizontal
                  ? styles.horizontal
                  : styles.vertical
              }
            >
              <RadioSelector
                onChange={(value: number | string) => {
                  onChange(question.key, value);
                }}
                horizontal={question.radioContent.horizontal}
                options={question.radioContent.options}
                initialSelected={question.radioContent.initialValue}
              />
            </div>
          )}
          {question.numericInputContent && (
            <div className={styles.numberInput}>
              <InputField
                onChange={(value: number | string) => {
                  onChange(question.key, value);
                }}
                type="number"
                placeholder={question.numericInputContent.initialValue.toString()}
              />
            </div>
          )}
          {question.isTextArea && (
            <TextArea
              onChange={(value: number | string) => {
                onChange(question.key, value);
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
}

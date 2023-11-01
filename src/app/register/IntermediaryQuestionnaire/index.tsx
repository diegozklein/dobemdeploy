import { Address } from "@/interfaces/register_Interface";
import styles from "./styles.module.css";
import RadioSelector from "@/components/RadioSelector";

const questions = [
  {
    key: "donate_profit",
    title:
      "Gostaria de doar 10% do lucro obtido com a cesta basica que o recebedor retirar?",
    radioContent: {
      options: [
        { label: "Sim", value: "true" },
        { label: "Nao", value: "false" },
      ],
      horizontal: false,
      initialValue: "",
    },
  },
  {
    key: "donate_icms",
    title: "Gostaria de converter seu ICMS em doacoes?",
    radioContent: {
      options: [
        { label: "Sim", value: "true" },
        { label: "Nao", value: "false" },
      ],
      horizontal: false,
      initialValue: "",
    },
  },
  {
    key: "company_type",
    title: "Qual o tipo do seu negocio?",
    radioContent: {
      options: [
        { label: "Supermercado", value: "SuperMercado" },
        { label: "Padaria", value: "Padaria" },
        { label: "Restaurante", value: "Restaurante" },
      ],
      horizontal: false,
      initialValue: "",
    },
  },
];

interface IntermediaryQuestionnaireProps {
  onChange: (
    value: string | number,
    key: any,
    secondaryKey?: keyof Address
  ) => void;
}

const IntermediaryQuestionnaire: React.FC<IntermediaryQuestionnaireProps> = ({
  onChange,
}) => {
  return (
    <div className='container'>
      {questions.map((question, index) => (
        <div
          className={styles.question}
          key={index}
        >
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
                onChange={(value: string) => onChange(value, question.key)}
                options={question.radioContent.options}
                initialSelected={question.radioContent.initialValue}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default IntermediaryQuestionnaire;

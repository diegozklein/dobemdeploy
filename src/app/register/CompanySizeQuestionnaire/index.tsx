import styles from './styles.module.css';
import RadioSelector from '@/components/RadioSelector';
import { Address, User } from '@/interfaces/register_Interface';

const questions = [
  {
    key: 'fk_company_size',
    title: 'Qual o porte da sua empresa?',
    radioContent: {
      options: [
        { label: 'Microempresa', value: '0' },
        { label: 'Empresa de pequeno porte', value: '1' },
        { label: 'Grupo IV', value: '2' },
        { label: 'Grupo III', value: '3' },
        { label: 'Grupo II', value: '4' },
        { label: 'Grupo I', value: '5' },
      ],
      horizontal: false,
      initialValue: '',
    },
  },
];

interface CompanySizeProps {
  onChange: (
    value: string | number,
    key: string,
    secondaryKey?: keyof Address
  ) => void;
}

const CompanySizeQuestionnaire: React.FC<CompanySizeProps> = ({ onChange }) => {
  return (
    <div className={styles.container}>
      {questions.map((question, index) => (
        <div
          className={styles.question}
          key={index}
        >
          <h4 className={styles.title}>{question.title}</h4>
          {question.radioContent && (
            <div
              className={
                styles.cardContent + ' ' + question.radioContent.horizontal
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

export default CompanySizeQuestionnaire;

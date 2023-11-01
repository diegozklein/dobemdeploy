import { error } from 'console';
import styles from './index.module.css'

interface QuizCardProps {
  children: JSX.Element;
  error?: boolean;
}

export default function QuizCard({children,error}: QuizCardProps) {
  return <div className={error ? styles.error : styles.card}> {children}</ div>;
}

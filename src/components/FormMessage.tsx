import styles from './styles/FormMessage.module.css';

interface Props {
  type: 'success' | 'error' | null;
  message: string;
}

export default function FormMessage({ type, message }: Props) {
  if (!type) return null;
  return (
    <div className={`${styles.msg} ${type === 'success' ? styles.success : styles.error}`}>
      <span>{type === 'success' ? '✓' : '✕'}</span>
      {message}
    </div>
  );
}

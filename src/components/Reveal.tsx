import { useReveal } from '../hooks/useReveal';
import styles from './styles/Reveal.module.css';

interface Props {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function Reveal({ children, delay = 0, className = '' }: Props) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      className={`${styles.reveal} ${visible ? styles.visible : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

import styles from './styles/SectionHeader.module.css';

interface Props {
  label?: string;
  title: React.ReactNode;
  sub?: string;
  align?: 'left' | 'center';
  icon?: React.ReactNode;
}

export default function SectionHeader({ label, title, sub, align = 'left', icon }: Props) {
  return (
    <div className={`${styles.header} ${align === 'center' ? styles.center : ''}`}>
      <div className={styles.top}>
        {icon && <div className={styles.icon}>{icon}</div>}
        {label && <p className={styles.label}>{label}</p>}
      </div>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.divider} style={align === 'center' ? { margin: '20px auto 32px' } : {}} />
      {sub && <p className={styles.sub}>{sub}</p>}
    </div>
  );
}

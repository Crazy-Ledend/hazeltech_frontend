import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './styles/FilterSelector.module.css';

interface Props {
  value: string;
  label?: string;
  options: string[];
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
  error?: string;
}

export default function FilterSelector({ value, label, options, onChange, placeholder = 'Select...', className = '', error }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [isOpen]);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className={`${styles.container} ${className}`} ref={containerRef}>
      {label && <label className="form-label">{label}</label>}

      <button
        type="button"
        className={`${styles.trigger} ${isOpen ? styles.triggerActive : ''} ${error ? styles.error : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? styles.val : styles.placeholder}>
          {value || placeholder}
        </span>
        <svg
          width="12" height="8" viewBox="0 0 12 8" fill="none"
          className={`${styles.arrow} ${isOpen ? styles.arrowUp : ''}`}
        >
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.ul
            className={styles.dropdown}
            initial={{ opacity: 0, y: 10, scale: 0.95, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 8, scale: 0.96, filter: 'blur(10px)' }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            role="listbox"
          >
            {options.map((opt) => (
              <li
                key={opt}
                role="option"
                aria-selected={value === opt}
                className={`${styles.option} ${value === opt ? styles.optActive : ''}`}
                onClick={() => handleSelect(opt)}
              >
                {opt}
                {value === opt && (
                  <motion.span layoutId="active-dot" className={styles.activeDot} />
                )}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {error && <p className="field-err" style={{ marginTop: 4, fontSize: '0.73rem', color: '#f87171' }}>{error}</p>}
    </div>
  );
}

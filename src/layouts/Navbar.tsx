import { useEffect, useRef, useState, Fragment } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../hooks/useTheme';
import { NAV_LINKS } from '../routes/config';
import styles from './styles/Navbar.module.css';
import { useModal } from '../hooks/useModal';

/* Animated hamburger — morphs 3 bars → X */
function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeWidth="2" stroke="currentColor">
      {/* Top bar */}
      <motion.line
        x1="3" y1="6" x2="21" y2="6"
        animate={open ? { x1: 5, y1: 5, x2: 19, y2: 19, opacity: 1 } : { x1: 3, y1: 6, x2: 21, y2: 6, opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      />
      {/* Middle bar */}
      <motion.line
        x1="3" y1="12" x2="21" y2="12"
        animate={open ? { opacity: 0, x2: 12 } : { opacity: 1, x2: 21 }}
        transition={{ duration: 0.18 }}
      />
      {/* Bottom bar */}
      <motion.line
        x1="3" y1="18" x2="21" y2="18"
        animate={open ? { x1: 5, y1: 19, x2: 19, y2: 5, opacity: 1 } : { x1: 3, y1: 18, x2: 21, y2: 18, opacity: 1 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      />
    </svg>
  );
}

const menuVariants: any = {
  hidden: { opacity: 0, y: -6, scale: 0.98 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: {
      duration: 0.22, ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.04, delayChildren: 0.03,
    },
  },
  exit: {
    opacity: 0, y: -6, scale: 0.98,
    transition: { duration: 0.16, ease: 'easeInOut' },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 5 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.18 } },
};

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const { openContact } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  /* Scroll shadow */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  /* Close on resize to desktop */
  useEffect(() => {
    const fn = () => { if (window.innerWidth > 900) setMobileOpen(false); };
    window.addEventListener('resize', fn);
    return () => window.removeEventListener('resize', fn);
  }, []);

  /* Click-outside to close */
  useEffect(() => {
    if (!mobileOpen) return;
    const fn = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', fn);
    return () => document.removeEventListener('mousedown', fn);
  }, [mobileOpen]);

  return (
    <div className={`${styles.navWrapper} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav} ref={navRef}>
        <div className={styles.inner}>

          <Link to="/" className={styles.logo}>
            <img src="/assets/hazeltech.png" alt="Logo" width="32" height="32" className={styles.logoImg} />
            <span className={styles.logoText}>HazelTech 🦕</span>
          </Link>

          {/* Desktop links */}
          <ul className={styles.links}>
            {NAV_LINKS.map(({ label, path }) => (
              <li key={path}>
                {path === '/contact' ? (
                  <button onClick={openContact} className={styles.link}>{label}</button>
                ) : (
                  <NavLink
                    to={path}
                    end={path === '/'}
                    className={({ isActive }) => `${styles.link} ${isActive ? styles.active : ''}`}
                  >
                    {label}
                  </NavLink>
                )}
              </li>
            ))}
          </ul>

          {/* Right: toggle + hamburger */}
          <div className={styles.actions}>
            <div className={styles.toggleWrap}>
              <label className="switch" title="Toggle theme">
                <input
                  type="checkbox"
                  className="switch__input"
                  checked={theme === 'light'}
                  onChange={toggle}
                />
                <span className="switch__label">
                  <span className="switch__indicator" />
                  <span className="switch__decoration" />
                </span>
              </label>
            </div>

            <button
              className={styles.menuBtn}
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              className={styles.mobileMenu}
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className={styles.mobileList}>
                {NAV_LINKS.map(({ label, path }, index) => (
                  <Fragment key={path}>
                    <motion.div variants={itemVariants}>
                      {path === '/contact' ? (
                        <button
                          onClick={() => { openContact(); setMobileOpen(false); }}
                          className={styles.mobileLink}
                        >
                          {label}
                        </button>
                      ) : (
                        <NavLink
                          to={path}
                          end={path === '/'}
                          className={({ isActive }) =>
                            `${styles.mobileLink} ${isActive ? styles.mobileActive : ''}`
                          }
                          onClick={() => setMobileOpen(false)}
                        >
                          {label}
                        </NavLink>
                      )}
                    </motion.div>
                    {index < NAV_LINKS.length - 1 && (
                      <div className={styles.mobileSeparator} />
                    )}
                  </Fragment>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
}
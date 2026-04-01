import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import styles from './styles/RootLayout.module.css';
import { useModal } from '../hooks/useModal';
import Modal from '../components/Modal';
import ContactForm from '../components/ContactForm';
import StatusBadge from '../components/StatusBadge';

export default function RootLayout() {
  const { pathname } = useLocation();
  const { isContactOpen, closeContact } = useModal();

  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);

  return (
    <div className={styles.root}>
      <Navbar />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
      <StatusBadge />

      <Modal
        isOpen={isContactOpen}
        onClose={closeContact}
        title="Request"
        maxWidth={720}
      >
        <div style={{ marginTop: -10 }}>
          <p style={{ color: 'var(--text-2)', marginBottom: 32, fontSize: '0.95rem', lineHeight: 1.6 }}>
            Tell us about your project or vision. We'll get back to you with a tailored plan and quote, usually within 24 hours.
          </p>
          <ContactForm onSuccess={closeContact} />
        </div>
      </Modal>
    </div>
  );
}

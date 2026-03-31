import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import ContactForm from '../components/ContactForm';
import styles from './styles/Contact.module.css';

export default function Contact() {
  return (
    <div>
      <div className="container section-gap">
        <Reveal>
          <SectionHeader
            label="Get In Touch"
            title={<>Tell us what<br />you're building.</>}
            sub="We respond via Discord or email, usually within 24 hours."
          />
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.formWrap}>
            <div className={'glass-static ' + styles.formCard}>
              <ContactForm />
            </div>
          </Reveal>

          <Reveal delay={100} className={styles.sidebar}>
            <div className={styles.sideCard + ' glass-static'}>
              <p className="label">Response time</p>
              <p className={styles.sideVal}>Within 24h</p>
            </div>
            <div className={styles.sideCard + ' glass-static'}>
              <p className="label">Preferred contact</p>
              <p className={styles.sideVal}>Discord</p>
            </div>
            <div className={styles.sideCard + ' glass-static'}>
              <p className="label">Project minimum</p>
              <p className={styles.sideVal}>No minimum</p>
            </div>
            <div className={styles.sideNote}>
              <p className="mono" style={{ fontSize: '0.7rem', color: 'var(--text-3)', letterSpacing: '0.05em' }}>
                All fields marked <span style={{ color: 'var(--amber)' }}>*</span> are required.
                Budget is optional — mention it if you have a range in mind.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import styles from './styles/Services.module.css';

const SERVICES = [
  {
    icon: '🤖', title: 'Discord Bot Development', tagline: 'Custom bots. Real impact.',
    items: ['Command system architecture', 'Economy & leveling mechanics', 'Moderation automation', 'Webhook & event integration', 'Third-party API connections', 'MongoDB / PostgreSQL backends', 'Ongoing maintenance & updates']
  },
  {
    icon: '🌐', title: 'Web Development', tagline: 'Clean interfaces. Solid backends.',
    items: ['Landing pages & portfolios', 'Dashboard UI/UX', 'Full-stack React applications', 'FastAPI / Node.js backends', 'REST API design', 'Database schema & queries', 'Deployment & hosting setup']
  },
  {
    icon: '⚙️', title: 'Custom Systems', tagline: 'If it can be built, we build it.',
    items: ['Bespoke automation workflows', 'AI & LLM tool integration', 'Cross-platform system design', 'Performance profiling & optimisation', 'Legacy system refactoring', 'Technical consulting', 'Architecture planning']
  },
];

const PROCESS = [
  { num: '01', title: 'Discovery', desc: 'We start by understanding your goals, constraints, and what success looks like.' },
  { num: '02', title: 'Design', desc: 'Architecture and system design before a single line of code is written.' },
  { num: '03', title: 'Build', desc: 'Clean, documented code delivered in iterations. No black boxes.' },
  { num: '04', title: 'Deploy', desc: 'Launch support, testing, and handover documentation included.' },
];

export default function Services() {
  return (
    <div>
      <div className="container section-gap">
        <Reveal>
          <SectionHeader label="What We Offer" title="Precision-crafted for developers."
            sub="We don't do generic. Every engagement is scoped, designed, and delivered with care." />
        </Reveal>
        <div className={styles.grid}>
          {SERVICES.map(({ icon, title, tagline, items }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className={'glass ' + styles.card}>
                <div className={styles.iconWrap}>{icon}</div>
                <h3 className={styles.cardTitle}>{title}</h3>
                <p className={styles.tagline}>{tagline}</p>
                <div style={{ height: 1, background: 'var(--border)', margin: '14px 0' }} />
                <ul className={styles.list}>
                  {items.map(item => (
                    <li key={item}><span className={styles.bullet}>›</span>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <div style={{ marginTop: 72, marginBottom: 12 }}>
            <p className="label">How We Work</p>
            <h2 className={styles.processTitle}>The process</h2>
            <div className="divider" />
          </div>
        </Reveal>
        <div className={styles.processGrid}>
          {PROCESS.map(({ num, title, desc }, i) => (
            <Reveal key={num} delay={i * 70}>
              <div className={'glass ' + styles.processCard}>
                <span className={styles.processNum}>{num}</span>
                <h4 className={styles.processLabel}>{title}</h4>
                <p className={styles.processDesc}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150}>
          <div style={{ marginTop: 60, textAlign: 'center' }}>
            <p style={{ color: 'var(--text-2)', marginBottom: 18, fontSize: '0.95rem' }}>Ready to start?</p>
            <Link to="/contact" className="btn btn-primary btn-lg">Get in Touch</Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
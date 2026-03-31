import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import styles from './styles/About.module.css';

const PROCESS_STEPS = [
  {
    step: '01',
    title: 'Scope & Brief',
    icon: '📋',
    desc: 'We start with a detailed brief — understanding your goals, constraints, and timeline. No guesswork, no assumptions.',
    detail: 'You tell us what you need. We listen, ask the right questions, and define a clear scope before writing a single line of code.',
  },
  {
    step: '02',
    title: 'Architecture & Design',
    icon: '🏗️',
    desc: 'Every system is planned before it is built. We map out data flows, APIs, and module boundaries up front.',
    detail: 'We document the architecture in plain language so you understand what is being built and why each decision was made.',
  },
  {
    step: '03',
    title: 'Iterative Build',
    icon: '⚡',
    desc: 'We build in short cycles with regular check-ins. You see progress early and often — no long silences.',
    detail: 'Code is reviewed against the scope at each milestone. Edge cases are handled, not deferred.',
  },
  {
    step: '04',
    title: 'Testing & Hardening',
    icon: '🔍',
    desc: 'Before delivery, every system goes through structured testing. We break it so you don\'t have to.',
    detail: 'Rate limits, error handling, load spikes — these are tested, not hoped for.',
  },
  {
    step: '05',
    title: 'Delivery & Handoff',
    icon: '📦',
    desc: 'Clean delivery with documentation. You get the code, the context, and a clear path to extend it.',
    detail: 'No black boxes. We explain how it works and how to maintain it after the project is done.',
  },
];

const PRINCIPLES = [
  { icon: '⚡', title: 'Performance First', desc: 'Systems designed for real load, not toy traffic. We benchmark before we ship.' },
  { icon: '🏗️', title: 'Architecture Matters', desc: 'Thoughtful structure before code. Technical debt is expensive — good design is cheap.' },
  { icon: '🔍', title: 'Radical Clarity', desc: 'Clean code, clear docs, no mystery boxes. If you can\'t explain it, it\'s not done.' },
  { icon: '📈', title: 'Built to Scale', desc: 'Built to grow without panic-rewrites. Every decision considers what happens at 10×.' },
  { icon: '🤝', title: 'Client-First', desc: 'You\'re involved at every step. No surprises, no scope creep, no ghosting.' },
  { icon: '🔒', title: 'Security by Default', desc: 'Auth, rate limiting, and data safety are baked in — not bolted on later.' },
];

const STACK_SECTIONS = [
  {
    category: 'Backend',
    items: ['Python · FastAPI', 'MongoDB', 'PostgreSQL', 'Redis (caching)'],
    color: '#347CF8',
  },
  {
    category: 'Frontend',
    items: ['React · TypeScript', 'Framer Motion', 'CSS Modules', 'Vite'],
    color: '#a855f7',
  },
  {
    category: 'Discord',
    items: ['discord.py / disnake', 'Slash Commands', 'Button UI', 'Event-driven arch'],
    color: '#5865F2',
  },
  {
    category: 'Infrastructure',
    items: ['VPS / Cloud Hosting', 'Docker (containers)', 'GitHub CI', 'Environment Config'],
    color: '#22c55e',
  },
];

export default function About() {
  return (
    <div className={styles.page}>
      <div className="container section-gap">

        {/* ── HEADER ── */}
        <Reveal>
          <p className="label">How We Work</p>
          <h1 className={styles.title}>
            Built like it matters.<br />
            <span className={styles.titleAccent}>Because it does.</span>
          </h1>
          <div className="divider" />
          <p className={styles.lead}>
            HazelTech is a solo-led development studio that builds Discord bots, web systems, and AI integrations.
            Every project follows a consistent, documented process — so nothing slips through the cracks.
          </p>
        </Reveal>

        {/* ── PROCESS ── */}
        <Reveal delay={80}>
          <div className={styles.sectionBlock}>
            <p className="label">The Process</p>
            <h2 className={styles.sectionTitle}>How we take a project from idea to production</h2>
          </div>
        </Reveal>

        <div className={styles.processGrid}>
          {PROCESS_STEPS.map(({ step, title, icon, desc, detail }, i) => (
            <Reveal key={step} delay={i * 60}>
              <div className={'glass-static ' + styles.processCard}>
                <div className={styles.processTop}>
                  <span className={styles.stepNum}>{step}</span>
                  <span className={styles.stepIcon}>{icon}</span>
                </div>
                <h3 className={styles.processTitle}>{title}</h3>
                <p className={styles.processDesc}>{desc}</p>
                <p className={styles.processDetail}>{detail}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.glowDivider} />

        {/* ── PRINCIPLES ── */}
        <Reveal>
          <div className={styles.sectionBlock}>
            <p className="label">Design Principles</p>
            <h2 className={styles.sectionTitle}>What we believe about software</h2>
          </div>
        </Reveal>

        <div className={styles.principlesGrid}>
          {PRINCIPLES.map(({ icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 50}>
              <div className={'glass ' + styles.principleCard}>
                <span className={styles.principleIcon}>{icon}</span>
                <h4 className={styles.principleTitle}>{title}</h4>
                <p className={styles.principleDesc}>{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.glowDivider} />

        {/* ── STACK ── */}
        <Reveal>
          <div className={styles.sectionBlock}>
            <p className="label">Tech Stack</p>
            <h2 className={styles.sectionTitle}>The tools behind every project</h2>
          </div>
        </Reveal>

        <div className={styles.stackGrid}>
          {STACK_SECTIONS.map(({ category, items, color }, i) => (
            <Reveal key={category} delay={i * 60}>
              <div className={'glass-static ' + styles.stackCard}>
                <p className={styles.stackCategory} style={{ color }}>{category}</p>
                <div className={styles.stackDivider} style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <ul className={styles.stackList}>
                  {items.map(item => (
                    <li key={item} className={styles.stackItem}>
                      <span className={styles.stackDot} style={{ background: color }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <div className={styles.glowDivider} />

        {/* ── CTA ── */}
        <Reveal>
          <div className={'glass-static ' + styles.cta}>
            <div>
              <p className="label">Ready to start?</p>
              <h2 className={styles.ctaTitle}>Let's build something that lasts.</h2>
              <p className={styles.ctaSub}>Tell us what you're working on — we usually respond in under 24 hours.</p>
            </div>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className="btn btn-primary btn-lg">Start a Project</Link>
              <Link to="/apply" className="btn btn-outline btn-lg">Join the Team</Link>
            </div>
          </div>
        </Reveal>

      </div>
    </div>
  );
}
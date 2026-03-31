import { Link } from 'react-router-dom';
import { DISCORD_URL } from '../routes/config';
import Reveal from '../components/Reveal';
import styles from './styles/Home.module.css';

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 127.14 96.36" fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

const EconomyIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" />
  </svg>
);

const AIIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9Z" /><path d="M12 8v4l3 3" />
  </svg>
);

const AuctionIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14.5 12.5-8 8a2.11 2.11 0 1 1-3-3l8-8" /><path d="m16 14 3 3" />
  </svg>
);

const FEATURED = [
  { icon: EconomyIcon, name: 'Hazelnut', type: 'Economy System', desc: 'Scalable economy bot with custom shops, leaderboards, and engagement mechanics.', color: '#347CF8' },
  { icon: AIIcon, name: 'Muffins', type: 'AI Chatbot', desc: 'Context-aware AI conversations with customisable server personalities.', color: '#a855f7' },
  { icon: AuctionIcon, name: 'MewAucs', type: 'Auction System', desc: 'Live bidding with buyout support, built for the Mewbot ecosystem.', color: '#22c55e' },
];

const STATS = [
  { num: '3+', label: 'Production Bots' },
  { num: '∞', label: 'Scalability Focus' },
  { num: '1', label: 'Core Ecosystem' },
  { num: '100%', label: 'Custom-Built' },
];

export default function Home() {
  return (
    <div className={styles.page}>

      {/* ── HERO ── */}
      <section className={styles.hero}>
        <div className={styles.heroBg} />
        <div className="container">
          <div className={styles.heroInner}>
            <div>
              <Reveal>
                <div className={styles.heroBadge}>
                  <span className={styles.dot} />
                  Open for new projects
                </div>
              </Reveal>
              <Reveal delay={100}>
                <h1 className={styles.heroTitle}>
                  Building smart bots.<br />
                  <span className={styles.heroAccent}>Delivering real solutions.</span>
                </h1>
              </Reveal>
              <Reveal delay={200}>
                <p className={styles.heroSub}>
                  HazelTech is a development studio crafting Discord bots, AI systems, and web solutions that scale with your ambition.
                </p>
              </Reveal>
              <Reveal delay={300}>
                <div className={styles.heroBtns}>
                  <Link to="/products" className="btn btn-primary btn-lg">View Products</Link>
                  <Link to="/contact" className="btn btn-outline btn-lg">Start a Project</Link>
                  <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn btn-discord btn-lg">
                    <DiscordIcon /> Discord
                  </a>
                </div>
              </Reveal>
            </div>

            <Reveal className={styles.heroVisual} delay={400}>
              <div className={styles.heroGlow} />
              <div className={'glass ' + styles.heroCard}>
                <div className={styles.heroCardIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="10" rx="2" /><circle cx="12" cy="5" r="2" /><path d="M12 7v4" /><path d="M8 16h.01" /><path d="M16 16h.01" />
                  </svg>
                </div>
                <p className={styles.heroCardTitle}>Production Ready</p>
                <p className={styles.heroCardSub}>Built for communities that demand reliability</p>
              </div>
              <div className={styles.chip + ' ' + styles.chip1}>
                <span className={styles.chipDot} style={{ background: 'var(--accent)' }} /> Economy
              </div>
              <div className={styles.chip + ' ' + styles.chip2}>
                <span className={styles.chipDot} style={{ background: '#a855f7' }} /> AI Chat
              </div>
              <div className={styles.chip + ' ' + styles.chip3}>
                <span className={styles.chipDot} style={{ background: '#22c55e' }} /> Auctions
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <div className={styles.glowingLine} />

      {/* ── STATS ── */}
      <section className={styles.statsSection}>
        <div className="container">
          <Reveal>
            <div className={'glass-static ' + styles.statsCard}>
              <div className={styles.statsGrid}>
                {STATS.map(({ num, label }) => (
                  <div key={label} className={styles.statItem}>
                    <span className={styles.statNum}>{num}</span>
                    <span className={styles.statLabel}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <div className={styles.glowingLine} />

      {/* ── FEATURED PRODUCTS ── */}
      <section className="section-gap">
        <div className="container">
          <Reveal>
            <p className="label">Our Products</p>
            <h2 className={styles.sectionTitle}>Systems built to last</h2>
            <div className="divider" />
          </Reveal>
          <div className={styles.productsGrid}>
            {FEATURED.map(({ icon: Icon, name, type, desc, color }, i) => (
              <Reveal key={name} delay={i * 80}>
                <div className={'glass ' + styles.productCard}>
                  <div className={styles.productHeader}>
                    <div className={styles.productIconBox} style={{ background: `${color}15`, color: color, borderColor: `${color}33` }}>
                      <Icon />
                    </div>
                    <h3 className={styles.productName}>{name}</h3>
                  </div>

                  <span className="tag" style={{ color: color, background: `${color}11`, borderColor: `${color}44`, width: 'fit-content' }}>{type}</span>
                  <div className={styles.productDivider} style={{ background: `linear-gradient(90deg, ${color}cc, transparent)` }} />
                  <p className={styles.productDesc}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={200}>
            <div style={{ marginTop: 40, textAlign: 'center' }}>
              <Link to="/products" className="btn btn-outline">See All Systems →</Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className={styles.glowingLine} />

      {/* ── CTA ── */}
      <section className="section-gap-sm" style={{ marginBottom: 40 }}>
        <div className="container">
          <Reveal>
            <div className={'glass-static ' + styles.cta}>
              <div>
                <p className="label">Ready to build?</p>
                <h2 className={styles.ctaTitle}>Let's create something serious.</h2>
                <p style={{ color: 'var(--text-2)', marginTop: 8, fontSize: '0.95rem' }}>
                  From a single bot to a full system — HazelTech delivers.
                </p>
              </div>
              <div className={styles.ctaBtns}>
                <Link to="/contact" className="btn btn-primary btn-lg">Contact Us</Link>
                <Link to="/apply" className="btn btn-ghost btn-lg">Join the Team</Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

    </div>
  );
}
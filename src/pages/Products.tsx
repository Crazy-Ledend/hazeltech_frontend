import { Link } from 'react-router-dom';
import SectionHeader from '../components/SectionHeader';
import Reveal from '../components/Reveal';
import styles from './styles/Products.module.css';

const EconomyIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" />
  </svg>
);

const AIIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3a9 9 0 0 1 9 9 9 9 0 0 1-9 9 9 9 0 0 1-9-9 9 9 0 0 1 9-9Z" /><path d="M12 8v4l3 3" />
  </svg>
);

const AuctionIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14.5 12.5-8 8a2.11 2.11 0 1 1-3-3l8-8" /><path d="m16 14 3 3" />
  </svg>
);

const ArtIcon = ({ color }: { color: string }) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="13.5" cy="6.5" r=".5" fill={color} /><circle cx="17.5" cy="10.5" r=".5" fill={color} />
    <circle cx="8.5" cy="7.5" r=".5" fill={color} /><circle cx="6.5" cy="12.5" r=".5" fill={color} />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const PRODUCTS = [
  {
    icon: EconomyIcon, name: 'Hazelnut', type: 'Economy System',
    color: '#347CF8',
    desc: 'A fully-featured economy bot built for Discord communities that want depth, engagement, and long-term retention.',
    features: ['Advanced economy mechanics', 'Custom item shop & inventory', 'Leaderboard & stats tracking', 'Scalable MongoDB architecture', 'Role-gated perks & rewards', 'Anti-abuse rate limiting'],
  },
  {
    icon: AIIcon, name: 'Muffins', type: 'AI Chatbot',
    color: '#a855f7',
    desc: 'A context-aware AI conversation bot with customisable personalities, letting servers define their own assistant identity.',
    features: ['AI-powered conversations', 'Per-server personality config', 'Context memory per channel', 'Moderation-safe filters', 'Custom knowledge base support', 'Slash command integration'],
  },
  {
    icon: AuctionIcon, name: 'MewAucs', type: 'Auction System',
    color: '#22c55e',
    desc: 'A live auction system built natively for the Mewbot ecosystem with real-time bidding, buyouts, and automated tracking.',
    features: ['Native Mewbot integration', 'Live bid tracking', 'Buyout price support', 'Anti-snipe protection', 'Automated auction closure', 'Bid history & logs'],
  },
];

const COMMISSIONED = [
  {
    icon: ArtIcon,
    name: 'Pocket Fusions',
    type: 'Art Portfolio',
    color: '#f59e0b',
    status: 'Completed',
    desc: 'A curated artfolio of original Pokémon fusion artwork. A creative project blending species in unique and imaginative ways — each piece is individually crafted.',
    link: null as string | null,
  },
];

export default function Products() {
  return (
    <div>
      <div className="container section-gap">
        <Reveal>
          <SectionHeader
            label="Our Bots"
            title="Systems built with intention."
            sub="Every product is designed for production — scalable, maintainable, and built to grow with your community."
          />
        </Reveal>

        <div className={styles.grid}>
          {PRODUCTS.map(({ icon: Icon, name, type, color, desc, features }, i) => (
            <Reveal key={name} delay={i * 80}>
              <div className={'glass ' + styles.card}>
                <div className={styles.cardHeader}>
                  <div className={styles.iconBox} style={{ background: `${color}15`, borderColor: `${color}33` }}>
                    <Icon color={color} />
                  </div>
                  <div className={styles.headerInfo}>
                    <h2 className={styles.name}>{name}</h2>
                    <span className={styles.typeBadge} style={{ color: color, borderColor: `${color}44`, background: `${color}11` }}>{type}</span>
                  </div>
                </div>
                <p className={styles.desc}>{desc}</p>
                <div className={styles.divider} style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />
                <ul className={styles.features}>
                  {features.map(f => (
                    <li key={f}><span style={{ color: color, flexShrink: 0 }}>›</span> {f}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal delay={200}>
          <div className={'glass-static ' + styles.cta}>
            <div>
              <p className="label">Need something custom?</p>
              <p style={{ marginTop: 8, color: 'var(--text-2)', fontSize: '0.95rem' }}>
                We build tailored Discord bots to your exact specifications.
              </p>
            </div>
            <Link to="/contact" className="btn btn-primary btn-lg">Get a Custom Quote →</Link>
          </div>
        </Reveal>

        {/* ── COMMISSIONED SECTION ── */}
        <Reveal>
          <div className={styles.commissionedHeader}>
            <p className="label">Commissioned & Completed</p>
            <h2 className={styles.commissionedTitle}>Client projects & one-off builds</h2>
            <div className="divider" />
            <p className={styles.commissionedSub}>
              Requested projects delivered for clients — from concept to completion.
            </p>
          </div>
        </Reveal>

        <div className={styles.commissionedGrid}>
          {COMMISSIONED.map(({ icon: Icon, name, type, color, status, desc, link }, i) => (
            <Reveal key={name} delay={i * 80}>
              <div className={'glass ' + styles.commissionedCard}>
                {/* Status badge — top right corner */}
                <div className={styles.commissionedMeta}>
                  <div className={styles.cardHeader}>
                    <div className={styles.iconBox} style={{ background: `${color}15`, borderColor: `${color}33` }}>
                      <Icon color={color} />
                    </div>
                    <div className={styles.headerInfo}>
                      <h3 className={styles.name}>{name}</h3>
                      <span className={styles.typeBadge} style={{ color, borderColor: `${color}44`, background: `${color}11` }}>{type}</span>
                    </div>
                  </div>
                  <span className={styles.statusBadge}>{status}</span>
                </div>
                <p className={styles.desc}>{desc}</p>
                {link && (
                  <a href={link} target="_blank" rel="noreferrer" className={'btn btn-outline ' + styles.commissionedLink}>
                    View Project →
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}
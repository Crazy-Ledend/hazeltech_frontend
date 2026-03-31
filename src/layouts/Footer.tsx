import { Link } from 'react-router-dom';
import { NAV_LINKS, DISCORD_URL } from '../routes/config';
import styles from './styles/Footer.module.css';

const DiscordIcon = () => (
  <svg width="18" height="18" viewBox="0 0 127.14 96.36" fill="currentColor">
    <path d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.79,32.65-1.71,56.6.54,80.21h0A105.73,105.73,0,0,0,32.71,96.36,77.7,77.7,0,0,0,39.6,85.25a68.42,68.42,0,0,1-10.85-5.18c.91-.66,1.8-1.34,2.66-2a75.57,75.57,0,0,0,64.32,0c.87.71,1.76,1.39,2.66,2a68.68,68.68,0,0,1-10.87,5.19,77,77,0,0,0,6.89,11.1A105.25,105.25,0,0,0,126.6,80.22h0C129.24,52.84,122.09,29.11,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z" />
  </svg>
);

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.bgText} aria-hidden="true">HazelTech</div>

      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <Link to="/" className={styles.logo}>
              <img src="/assets/hazeltech.png" alt="Logo" width="38" height="38" />
              <span className={styles.logoText}>HazelTech 🦕</span>
            </Link>
            <p className={styles.tagline}>Crafting premium Discord experiences and digital systems that scale with your community.</p>
          </div>

          <div className={styles.nav}>
            <p className={styles.navLabel}>Sitemap</p>
            <div className={styles.links}>
              {NAV_LINKS.map(({ label, path }) => (
                <Link key={path} to={path} className={styles.link}>{label}</Link>
              ))}
            </div>
          </div>

          <div className={styles.right}>
            <p className={styles.navLabel}>Community</p>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer" className="btn btn-discord btn-sm" style={{ width: 'fit-content' }}>
              <DiscordIcon /> Join Discord
            </a>
            <div className={styles.meta}>
              <span className={styles.copy}>© 2026 HazelTech</span>
              <div className={styles.status}>
                <span className={styles.statusDot} />
                Systems Operational
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
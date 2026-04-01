import { useEffect, useRef, useState } from 'react';
import styles from './styles/StatusBadge.module.css';

type Status = 'online' | 'degraded' | 'offline' | 'loading';

interface HealthData {
  mongo: boolean;
  contact_webhook: boolean;
  apply_webhook: boolean;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const POLL_INTERVAL = 30_000;

function statusLabel(s: Status): string {
  switch (s) {
    case 'online': return 'All Systems Operational';
    case 'degraded': return 'Partially Degraded';
    case 'offline': return 'Service Offline';
    case 'loading': return 'Checking Status…';
  }
}

export default function StatusBadge() {
  const [status, setStatus] = useState<Status>('loading');
  const [latency, setLatency] = useState<number | null>(null);
  const [expanded, setExpanded] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const check = async () => {
    const t0 = performance.now();
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(8000) });
      const ms = Math.round(performance.now() - t0);
      if (!res.ok) { setStatus('offline'); setLatency(null); return; }
      const data: HealthData = await res.json();
      setLatency(ms);
      setStatus(data.mongo ? 'online' : 'degraded');
    } catch {
      setStatus('offline');
      setLatency(null);
    }
  };

  useEffect(() => {
    check();
    timerRef.current = setInterval(check, POLL_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  return (
    <div
      className={`${styles.badge} ${styles[status]} ${expanded ? styles.expanded : ''}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      onClick={() => setExpanded(v => !v)}
      role="status"
      aria-label={`API status: ${statusLabel(status)}`}
      title={statusLabel(status)}
    >
      <span className={styles.dot}>
        <span className={styles.pulse} />
      </span>

      <div className={styles.info}>
        <span className={styles.label}>{statusLabel(status)}</span>
        {latency !== null && (
          <span className={styles.latency}>{latency} ms</span>
        )}
      </div>
    </div>
  );
}

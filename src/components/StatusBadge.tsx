import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './styles/StatusBadge.module.css';

type Status = 'online' | 'degraded' | 'offline' | 'loading';

interface HealthData {
  mongo: boolean;
  uptime_seconds?: number;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const POLL_INTERVAL = 30_000;

const STATUS_TEXT: Record<Status, string> = {
  online:   'ALL_SYSTEMS_OPERATIONAL',
  degraded: 'PARTIAL_DEGRADATION',
  offline:  'SERVICE_UNREACHABLE',
  loading:  'RUNNING_DIAGNOSTICS',
};

const STATUS_CODE: Record<Status, string> = {
  online:   '200 OK',
  degraded: '206 PARTIAL',
  offline:  '503 DOWN',
  loading:  '---',
};

function formatUptime(s?: number): string {
  if (s == null) return 'N/A';
  if (s < 60)   return `${s}s`;
  if (s < 3600) return `${Math.floor(s / 60)}m ${s % 60}s`;
  return `${Math.floor(s / 3600)}h ${Math.floor((s % 3600) / 60)}m`;
}

export default function StatusBadge() {
  const [status, setStatus]       = useState<Status>('loading');
  const [latency, setLatency]     = useState<number | null>(null);
  const [uptime, setUptime]       = useState<number | undefined>(undefined);
  const [open, setOpen]           = useState(false);
  const [dbOk, setDbOk]          = useState<boolean | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timerRef   = useRef<ReturnType<typeof setInterval> | null>(null);

  const check = useCallback(async () => {
    const t0 = performance.now();
    try {
      const res = await fetch(`${API_BASE}/health`, { signal: AbortSignal.timeout(8000) });
      const ms  = Math.round(performance.now() - t0);
      if (!res.ok) { setStatus('offline'); setLatency(null); setDbOk(null); return; }
      const data: HealthData = await res.json();
      setLatency(ms);
      setDbOk(data.mongo);
      setUptime(data.uptime_seconds);
      setStatus(data.mongo ? 'online' : 'degraded');
    } catch {
      setStatus('offline');
      setLatency(null);
      setDbOk(null);
    }
  }, []);

  useEffect(() => {
    check();
    timerRef.current = setInterval(check, POLL_INTERVAL);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [check]);



  const now = new Date().toISOString().replace('T', ' ').slice(0, 19);

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {/* Panel — appears above the dot */}
      {open && (
        <div className={`${styles.panel} ${styles[status]}`} role="dialog" aria-label="API status panel">
          <div className={styles.panelHeader}>
            <span className={styles.headerDots}>
              <span /><span /><span />
            </span>
            <span className={styles.headerTitle}>hazeltech_status.sh</span>
          </div>

          <div className={styles.panelBody}>
            <Line prompt="$" cmd="curl /health" />
            <Line prompt=">" cmd={STATUS_TEXT[status]} status={status} highlight />
            <Line prompt="·" cmd={`HTTP   ${STATUS_CODE[status]}`} />
            <Line prompt="·" cmd={`PING   ${latency != null ? `${latency}ms` : 'N/A'}`} />
            <Line prompt="·" cmd={`DB     ${dbOk == null ? 'N/A' : dbOk ? 'CONNECTED' : 'DISCONNECTED'}`} />
            <Line prompt="·" cmd={`UPTIME ${formatUptime(uptime)}`} />
            <Line prompt="·" cmd={`AT     ${now} UTC`} muted />
            <span className={styles.cursor} />
          </div>
        </div>
      )}

      {/* The dot */}
      <div
        className={`${styles.dot} ${styles[status]}`}
        aria-label={`API status: ${STATUS_TEXT[status]}`}
        role="status"
      >
        <span className={styles.dotInner} />
        <span className={styles.pulse} />
        <span className={styles.pulse2} />
      </div>
    </div>
  );
}

function Line({
  prompt, cmd, status, highlight, muted,
}: {
  prompt: string;
  cmd: string;
  status?: Status;
  highlight?: boolean;
  muted?: boolean;
}) {
  return (
    <p className={`${styles.line} ${highlight && status ? styles[`line_${status}`] : ''} ${muted ? styles.muted : ''}`}>
      <span className={styles.prompt}>{prompt}</span>
      <span>{cmd}</span>
    </p>
  );
}

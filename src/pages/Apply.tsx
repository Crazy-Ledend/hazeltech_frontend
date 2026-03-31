import { useState, useRef } from 'react';
import { submitApply, type ApplyPayload } from '../services/api';
import SectionHeader from '../components/SectionHeader';
import FormMessage from '../components/FormMessage';
import Reveal from '../components/Reveal';
import styles from './styles/Apply.module.css';

type MsgState = { type: 'success' | 'error'; text: string } | null;

export default function Apply() {
  const [form, setForm] = useState<ApplyPayload>({
    name: '', contact: '', skills: '', experience: '', portfolio: '', reason: '',
  });
  const [errors, setErrors] = useState<Partial<ApplyPayload>>({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<MsgState>(null);
  const lastSubmit = useRef(0);

  const set = (k: keyof ApplyPayload) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    setErrors(er => ({ ...er, [k]: '' }));
  };

  const validate = (): boolean => {
    const e: Partial<ApplyPayload> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.contact.trim()) e.contact = 'Required';
    if (!form.skills.trim()) e.skills = 'Required';
    if (!form.experience.trim()) e.experience = 'Required';
    if (!form.reason.trim()) e.reason = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    if (Date.now() - lastSubmit.current < 30000) {
      setMsg({ type: 'error', text: 'Please wait 30 seconds before submitting again.' });
      return;
    }
    setLoading(true);
    setMsg(null);
    try {
      await submitApply(form);
      lastSubmit.current = Date.now();
      setMsg({ type: 'success', text: 'Application submitted! We\'ll review it and get back to you.' });
      setForm({ name: '', contact: '', skills: '', experience: '', portfolio: '', reason: '' });
    } catch {
      setMsg({ type: 'error', text: 'Could not reach the server. Make sure the backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  const err = (k: keyof ApplyPayload) => errors[k] ? <p className={styles.fieldErr}>{errors[k]}</p> : null;

  return (
    <div>
      <div className="container section-gap">
        <Reveal>
          <SectionHeader
            label="Join the Team"
            title={<>Developer<br /><em style={{ fontStyle: 'italic', color: 'var(--amber)' }}>Application</em></>}
            sub="HazelTech is growing. If you build with precision and care about the systems you ship, we want to hear from you."
          />
        </Reveal>

        <div className={styles.layout}>
          <Reveal className={styles.formWrap}>
            <div className={'glass-static ' + styles.formCard}>
              <form onSubmit={handleSubmit} noValidate>
                <div className={styles.row}>
                  <div className="form-field">
                    <label className="form-label">Name <span className="req">*</span></label>
                    <input className={`form-input${errors.name ? ' error' : ''}`} value={form.name} onChange={set('name')} placeholder="Your name" />
                    {err('name')}
                  </div>
                  <div className="form-field">
                    <label className="form-label">Contact <span className="req">*</span></label>
                    <input className={`form-input${errors.contact ? ' error' : ''}`} value={form.contact} onChange={set('contact')} placeholder="Discord or email" />
                    {err('contact')}
                  </div>
                </div>

                <div className="form-field">
                  <label className="form-label">Skills <span className="req">*</span></label>
                  <input className={`form-input${errors.skills ? ' error' : ''}`} value={form.skills} onChange={set('skills')} placeholder="e.g. Python, TypeScript, MongoDB, React..." />
                  {err('skills')}
                </div>

                <div className="form-field">
                  <label className="form-label">Experience <span className="req">*</span></label>
                  <textarea
                    className={`form-textarea${errors.experience ? ' error' : ''}`}
                    value={form.experience}
                    onChange={set('experience')}
                    placeholder="Tell us about your development experience — projects you've shipped, bots you've built, systems you've worked on..."
                    style={{ minHeight: 110 }}
                  />
                  {err('experience')}
                </div>

                <div className="form-field">
                  <label className="form-label">Portfolio <span style={{ color: 'var(--text-3)' }}>(optional)</span></label>
                  <input className="form-input" value={form.portfolio} onChange={set('portfolio')} placeholder="GitHub, personal site, or project links" />
                </div>

                <div className="form-field">
                  <label className="form-label">Why join HazelTech? <span className="req">*</span></label>
                  <textarea
                    className={`form-textarea${errors.reason ? ' error' : ''}`}
                    value={form.reason}
                    onChange={set('reason')}
                    placeholder="What draws you to HazelTech? What do you want to build here?"
                    style={{ minHeight: 110 }}
                  />
                  {err('reason')}
                </div>

                <button type="submit" className={'btn btn-primary ' + styles.submitBtn} disabled={loading}>
                  {loading ? <><span className={styles.spinner} /> Submitting...</> : 'Submit Application →'}
                </button>

                <FormMessage type={msg?.type ?? null} message={msg?.text ?? ''} />
              </form>
            </div>
          </Reveal>

          <Reveal delay={100} className={styles.sidebar}>
            <div className={styles.infoBlock + ' glass-static'}>
              <p className="label" style={{ marginBottom: 16 }}>What we look for</p>
              {[
                'Attention to system design',
                'Clean, documented code',
                'Self-directed work style',
                'Interest in Discord ecosystems',
                'Passion for scalable builds',
              ].map(item => (
                <div key={item} className={styles.infoItem}>
                  <span style={{ color: 'var(--amber)' }}>›</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className={styles.infoBlock + ' glass-static'}>
              <p className="label" style={{ marginBottom: 10 }}>Stack we use</p>
              {['Python · FastAPI', 'TypeScript · React', 'MongoDB', 'Discord.py / djs'].map(s => (
                <p key={s} className="mono" style={{ fontSize: '0.8rem', color: 'var(--text-2)', marginTop: 6 }}>{s}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

import { useState, useRef } from 'react';
import { submitContact, type ContactPayload } from '../services/api';
import FormMessage from './FormMessage';
import FilterSelector from './FilterSelector';
import styles from '../pages/styles/Contact.module.css';

const PROJECT_TYPES = [
  'Discord Bot Development',
  'Web Development',
  'Custom System',
  'AI Integration',
  'Consultation',
  'Other',
];

type MsgState = { type: 'success' | 'error'; text: string } | null;

interface Props {
  onSuccess?: () => void;
}

export default function ContactForm({ onSuccess }: Props) {
  const [form, setForm] = useState<ContactPayload>({
    name: '', contact: '', project_type: '', description: '', budget: '',
  });
  const [errors, setErrors] = useState<Partial<ContactPayload>>({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<MsgState>(null);
  const lastSubmit = useRef(0);

  const set = (k: keyof ContactPayload) => (val: string) => {
    setForm(f => ({ ...f, [k]: val }));
    setErrors(er => ({ ...er, [k]: '' }));
  };

  const validate = (): boolean => {
    const e: Partial<ContactPayload> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.contact.trim()) e.contact = 'Required';
    if (!form.project_type) e.project_type = 'Please select a type';
    if (!form.description.trim()) e.description = 'Required';
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
      await submitContact(form);
      lastSubmit.current = Date.now();
      setMsg({ type: 'success', text: 'Message sent! We\'ll be in touch soon.' });
      setForm({ name: '', contact: '', project_type: '', description: '', budget: '' });
      if (onSuccess) setTimeout(onSuccess, 2000);
    } catch {
      setMsg({ type: 'error', text: 'Could not reach the server. Make sure the backend is running.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className={styles.row}>
        <div className="form-field">
          <label className="form-label">Name <span className="req">*</span></label>
          <input
            className={`form-input${errors.name ? ' error' : ''}`}
            value={form.name}
            onChange={(e) => set('name')(e.target.value)}
            placeholder="Your name"
          />
          {errors.name && <p className={styles.fieldErr}>{errors.name}</p>}
        </div>
        <div className="form-field">
          <label className="form-label">Contact <span className="req">*</span></label>
          <input
            className={`form-input${errors.contact ? ' error' : ''}`}
            value={form.contact}
            onChange={(e) => set('contact')(e.target.value)}
            placeholder="Discord or email"
          />
          {errors.contact && <p className={styles.fieldErr}>{errors.contact}</p>}
        </div>
      </div>

      <div className="form-field">
        <FilterSelector
          label="Project Type"
          value={form.project_type}
          options={PROJECT_TYPES}
          onChange={(val) => set('project_type')(val)}
          error={errors.project_type}
        />
      </div>

      <div className="form-field">
        <label className="form-label">Description <span className="req">*</span></label>
        <textarea
          className={`form-textarea${errors.description ? ' error' : ''}`}
          value={form.description}
          onChange={(e) => set('description')(e.target.value)}
          placeholder="Describe your project, goals, and any relevant context..."
          style={{ minHeight: 130 }}
        />
        {errors.description && <p className={styles.fieldErr}>{errors.description}</p>}
      </div>

      <div className="form-field">
        <label className="form-label">Budget <span style={{ color: 'var(--text-3)' }}>(optional)</span></label>
        <input
          className="form-input"
          value={form.budget}
          onChange={(e) => set('budget')(e.target.value)}
          placeholder="e.g. $100–$500, or open to discuss"
        />
      </div>

      <button type="submit" className={'btn btn-primary ' + styles.submitBtn} disabled={loading}>
        {loading ? <><span className={styles.spinner} /> Sending...</> : 'Send Message →'}
      </button>

      <FormMessage type={msg?.type ?? null} message={msg?.text ?? ''} />
    </form>
  );
}

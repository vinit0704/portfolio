import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

const validate = ({ name, email, subject, message }) => {
  const e = {};
  if (!name.trim())    e.name    = 'Name is required';
  if (!email.trim())   e.email   = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(email)) e.email = 'Invalid email address';
  if (!subject.trim()) e.subject = 'Subject is required';
  if (!message.trim()) e.message = 'Message is required';
  return e;
};

const Contact = () => {
  const [form,     setForm]     = useState({ name:'', email:'', subject:'', message:'' });
  const [errors,   setErrors]   = useState({});
  const [sending,  setSending]  = useState(false);
  const [success,  setSuccess]  = useState(false);

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSending(true);
    try {
      await axios.post('/api/contact', form);
      setSuccess(true);
      setForm({ name:'', email:'', subject:'', message:'' });
      setTimeout(() => setSuccess(false), 6000);
    } catch { alert('Failed to send. Please try again.'); }
    finally { setSending(false); }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">{'<05>'}</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="contact-subtitle">Have a project in mind? Let's build something amazing!</p>
        </div>

        <div className="contact-grid">
          <div className="contact-info">
            {[
              { icon:'📧', label:'Email',    value:'kamblevinit3004@gmail.com'    },
              { icon:'📱', label:'Phone',    value:'+91 7020857437' },
              { icon:'📍', label:'Location', value:'Kolhapur, India' },
            ].map(({ icon, label, value }) => (
              <div key={label} className="info-card">
                <div className="info-icon">{icon}</div>
                <h3>{label}</h3>
                <p>{value}</p>
              </div>
            ))}
          </div>

          <form onSubmit={onSubmit} className="contact-form">
            {success && <div className="success-msg">✓ Message sent! We'll get back to you soon.</div>}

            {[
              { name:'name',    type:'text',  label:'Your Name *',     placeholder:'John Doe'             },
              { name:'email',   type:'email', label:'Email Address *',  placeholder:'john@example.com'     },
              { name:'subject', type:'text',  label:'Subject *',        placeholder:'Project inquiry...'   },
            ].map(({ name, type, label, placeholder }) => (
              <div key={name} className="form-group">
                <label>{label}</label>
                <input name={name} type={type} value={form[name]} onChange={onChange}
                  className={`form-input ${errors[name] ? 'has-error' : ''}`} placeholder={placeholder} />
                {errors[name] && <span className="error-msg">{errors[name]}</span>}
              </div>
            ))}

            <div className="form-group">
              <label>Message *</label>
              <textarea name="message" rows="5" value={form.message} onChange={onChange}
                className={`form-input ${errors.message ? 'has-error' : ''}`}
                placeholder="Tell me about your project..." />
              {errors.message && <span className="error-msg">{errors.message}</span>}
            </div>

            <button type="submit" className="submit-btn" disabled={sending}>
              {sending ? 'SENDING...' : 'SEND MESSAGE'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;

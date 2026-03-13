import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminSkills.css';

const BLANK = { name:'', category:'Frontend', proficiency:50, description:'', yearsOfExperience:0 };

const AdminSkills = () => {
  const [skills,   setSkills]   = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState(BLANK);

  useEffect(() => { fetchSkills(); }, []);

  const fetchSkills = () =>
    axios.get('/api/skills').then(r => setSkills(r.data)).catch(console.error);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: name === 'proficiency' || name === 'yearsOfExperience' ? +value : value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      editing
        ? await axios.put(`/api/skills/${editing._id}`, form)
        : await axios.post('/api/skills', form);
      fetchSkills(); reset();
    } catch (err) { alert(err.response?.data?.message || 'Error saving skill'); }
  };

  const startEdit = (skill) => { setEditing(skill); setForm({ name:skill.name, category:skill.category, proficiency:skill.proficiency, description:skill.description||'', yearsOfExperience:skill.yearsOfExperience||0 }); setShowForm(true); };
  const onDelete = async (id) => { if (window.confirm('Delete this skill?')) { await axios.delete(`/api/skills/${id}`); fetchSkills(); } };
  const reset = () => { setEditing(null); setForm(BLANK); setShowForm(false); };

  const grouped = skills.reduce((acc, s) => { (acc[s.category] = acc[s.category] || []).push(s); return acc; }, {});

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Skills</h1>
          <p className="page-sub">Manage your technical skills</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(v => !v)}>
          {showForm ? 'Cancel' : '+ Add Skill'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2 className="form-title">{editing ? 'Edit Skill' : 'New Skill'}</h2>
          <form onSubmit={onSubmit} className="skill-form">
            <div className="form-row">
              <div className="form-group">
                <label>Name *</label>
                <input name="name" value={form.name} onChange={onChange} required className="form-input" placeholder="e.g. React" />
              </div>
              <div className="form-group">
                <label>Category *</label>
                <select name="category" value={form.category} onChange={onChange} className="form-input">
                  {['Frontend','Backend','Database','Tools','Other'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Proficiency — {form.proficiency}%</label>
              <input type="range" name="proficiency" min="0" max="100" value={form.proficiency} onChange={onChange} className="range-input" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Years of Experience</label>
                <input type="number" name="yearsOfExperience" min="0" value={form.yearsOfExperience} onChange={onChange} className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={onChange} rows="2" className="form-input" placeholder="Brief description..." />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">{editing ? 'Update' : 'Add'} Skill</button>
              <button type="button" className="btn-secondary" onClick={reset}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      {Object.entries(grouped).map(([cat, catSkills]) => (
        <div key={cat} className="category-block">
          <h2 className="category-title">{cat}</h2>
          <div className="skills-grid">
            {catSkills.map(skill => (
              <div key={skill._id} className="skill-card">
                <div className="skill-head">
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-actions">
                    <button className="icon-btn" onClick={() => startEdit(skill)} title="Edit">✏️</button>
                    <button className="icon-btn danger" onClick={() => onDelete(skill._id)} title="Delete">🗑️</button>
                  </div>
                </div>
                <div className="progress-track">
                  <div className="progress-bar" style={{ width: `${skill.proficiency}%` }}>
                    <span className="progress-label">{skill.proficiency}%</span>
                  </div>
                </div>
                {skill.description && <p className="skill-desc">{skill.description}</p>}
                {skill.yearsOfExperience > 0 && <p className="skill-years">{skill.yearsOfExperience} yr exp</p>}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminSkills;

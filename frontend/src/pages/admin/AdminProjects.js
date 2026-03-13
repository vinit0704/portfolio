import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProjects.css';

const BLANK = { title:'', description:'', technologies:'', githubUrl:'', liveUrl:'', image:'', featured:false, category:'Web', status:'Completed' };

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editing,  setEditing]  = useState(null);
  const [form,     setForm]     = useState(BLANK);
  const [uploading, setUploading] = useState(false);

  useEffect(() => { fetchProjects(); }, []);

  const fetchProjects = () =>
    axios.get('/api/projects').then(r => setProjects(r.data)).catch(console.error);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const uploadImage = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    setUploading(true);
    try {
      const { data } = await axios.post('/api/upload', fd);
      setForm(prev => ({ ...prev, image: data.path }));
    } catch { alert('Upload failed'); }
    finally { setUploading(false); }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = { ...form, technologies: form.technologies.split(',').map(t => t.trim()).filter(Boolean) };
    try {
      editing
        ? await axios.put(`/api/projects/${editing._id}`, payload)
        : await axios.post('/api/projects', payload);
      fetchProjects(); reset();
    } catch (err) { alert(err.response?.data?.message || 'Error'); }
  };

  const startEdit = (p) => {
    setEditing(p);
    setForm({ ...p, technologies: p.technologies.join(', ') });
    setShowForm(true);
  };

  const onDelete = async (id) => { if (window.confirm('Delete project?')) { await axios.delete(`/api/projects/${id}`); fetchProjects(); } };
  const reset = () => { setEditing(null); setForm(BLANK); setShowForm(false); };

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Projects</h1>
          <p className="page-sub">Manage your portfolio projects</p>
        </div>
        <button className="btn-primary" onClick={() => setShowForm(v => !v)}>
          {showForm ? 'Cancel' : '+ Add Project'}
        </button>
      </div>

      {showForm && (
        <div className="form-card">
          <h2 className="form-title">{editing ? 'Edit Project' : 'New Project'}</h2>
          <form onSubmit={onSubmit} className="project-form">
            <div className="form-group">
              <label>Title *</label>
              <input name="title" value={form.title} onChange={onChange} required className="form-input" />
            </div>
            <div className="form-group">
              <label>Description *</label>
              <textarea name="description" value={form.description} onChange={onChange} required rows="4" className="form-input" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Category</label>
                <select name="category" value={form.category} onChange={onChange} className="form-input">
                  {['Web','Mobile','Desktop','Other'].map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Status</label>
                <select name="status" value={form.status} onChange={onChange} className="form-input">
                  {['Completed','In Progress','Planned'].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Technologies (comma separated)</label>
              <input name="technologies" value={form.technologies} onChange={onChange} className="form-input" placeholder="React, Node.js, MongoDB" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>GitHub URL</label>
                <input type="url" name="githubUrl" value={form.githubUrl} onChange={onChange} className="form-input" />
              </div>
              <div className="form-group">
                <label>Live URL</label>
                <input type="url" name="liveUrl" value={form.liveUrl} onChange={onChange} className="form-input" />
              </div>
            </div>
            <div className="form-group">
              <label>Project Image</label>
              <input type="file" accept="image/*" onChange={uploadImage} className="form-input" />
              {uploading && <span style={{ color:'var(--neon-cyan)', fontSize:13 }}>Uploading...</span>}
              {form.image && <img src={form.image} alt="preview" className="img-preview" />}
            </div>
            <div className="checkbox-row">
              <input type="checkbox" id="featured" name="featured" checked={form.featured} onChange={onChange} />
              <label htmlFor="featured">Featured Project</label>
            </div>
            <div className="form-actions">
              <button type="submit" className="btn-primary">{editing ? 'Update' : 'Add'} Project</button>
              <button type="button" className="btn-secondary" onClick={reset}>Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="projects-grid">
        {projects.map(p => (
          <div key={p._id} className="project-card">
            {p.image && <img src={p.image} alt={p.title} className="project-img" />}
            <div className="project-body">
              <div className="project-head">
                <h3 className="project-name">{p.title}</h3>
                <div className="skill-actions">
                  <button className="icon-btn" onClick={() => startEdit(p)}>✏️</button>
                  <button className="icon-btn danger" onClick={() => onDelete(p._id)}>🗑️</button>
                </div>
              </div>
              <p className="project-desc">{p.description.slice(0, 100)}{p.description.length > 100 ? '...' : ''}</p>
              <div className="project-tags">
                {p.technologies.map((t, i) => <span key={i} className="tag">{t}</span>)}
              </div>
              <div className="project-meta">
                <span className={`badge ${p.status.toLowerCase().replace(' ','-')}`}>{p.status}</span>
                {p.featured && <span className="featured-tag">⭐ Featured</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;

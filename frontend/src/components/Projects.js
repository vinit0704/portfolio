import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Projects.css';

const Projects = () => {
  const [projects,  setProjects]  = useState([]);
  const [filtered,  setFiltered]  = useState([]);
  const [tech,      setTech]      = useState('All');
  const [selected,  setSelected]  = useState(null);

  useEffect(() => {
    axios.get('/api/projects').then(r => { setProjects(r.data); setFiltered(r.data); }).catch(console.error);
  }, []);

  useEffect(() => {
    setFiltered(tech === 'All' ? projects : projects.filter(p => p.technologies.includes(tech)));
  }, [tech, projects]);

  const allTechs = ['All', ...new Set(projects.flatMap(p => p.technologies))].slice(0, 9);

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">{'<04>'}</span>
          <h2 className="section-title">Projects</h2>
        </div>

        <div className="tech-filter">
          {allTechs.map(t => (
            <button key={t} className={`filter-btn ${tech === t ? 'active' : ''}`} onClick={() => setTech(t)}>{t}</button>
          ))}
        </div>

        <div className="proj-grid">
          {filtered.map((p, i) => (
            <div key={p._id} className="proj-card" style={{ animationDelay: `${i * 0.08}s` }} onClick={() => setSelected(p)}>
              {p.image
                ? <div className="proj-img" style={{ backgroundImage: `url(${p.image})` }} />
                : <div className="proj-img no-img"><span>🚀</span></div>}
              <div className="proj-info">
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.description.slice(0, 90)}...</p>
                <div className="proj-tags">
                  {p.technologies.slice(0, 3).map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}>×</button>
            {selected.image && <img src={selected.image} alt={selected.title} className="modal-img" />}
            <h2 className="modal-title">{selected.title}</h2>
            <p className="modal-desc">{selected.description}</p>
            <div className="modal-techs">
              {selected.technologies.map((t, i) => <span key={i} className="tech-tag">{t}</span>)}
            </div>
            <div className="modal-links">
              {selected.githubUrl && <a href={selected.githubUrl} target="_blank" rel="noreferrer" className="link-btn secondary">GitHub</a>}
              {selected.liveUrl   && <a href={selected.liveUrl}   target="_blank" rel="noreferrer" className="link-btn primary">Live Demo</a>}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;

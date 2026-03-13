import React from 'react';
import { useOutletContext } from 'react-router-dom';
import './Overview.css';

const statCards = [
  { key: 'totalSkills',      icon: '⚡', label: 'Skills'           },
  { key: 'totalProjects',    icon: '🚀', label: 'Projects'         },
  { key: 'featuredProjects', icon: '⭐', label: 'Featured'         },
  { key: 'totalContacts',    icon: '✉️', label: 'Messages'         },
];

const Overview = () => {
  const { stats } = useOutletContext();
  if (!stats) return <p style={{ color: 'var(--neon-cyan)' }}>Loading stats...</p>;

  const { overview, recentProjects, recentContacts } = stats;

  return (
    <div className="overview-page">
      <h1 className="page-title">Dashboard Overview</h1>
      <p className="page-sub">Welcome to your admin panel</p>

      <div className="stats-grid">
        {statCards.map(({ key, icon, label }) => (
          <div key={key} className="stat-card">
            <div className="stat-icon">{icon}</div>
            <div className="stat-value">{overview[key] ?? 0}</div>
            <div className="stat-label">{label}</div>
            {key === 'totalContacts' && overview.newContacts > 0 && (
              <div className="new-badge">{overview.newContacts} new</div>
            )}
          </div>
        ))}
      </div>

      <div className="recent-grid">
        <div className="recent-section">
          <h2 className="section-heading">Recent Projects</h2>
          {recentProjects.length === 0
            ? <p className="empty">No projects yet</p>
            : recentProjects.map(p => (
              <div key={p._id} className="recent-card">
                <div className="recent-header">
                  <span className="recent-title">{p.title}</span>
                  <span className={`badge ${p.status.toLowerCase().replace(' ','-')}`}>{p.status}</span>
                </div>
                <div className="recent-tags">
                  {p.technologies.slice(0, 3).map((t, i) => <span key={i} className="tag">{t}</span>)}
                </div>
              </div>
          ))}
        </div>

        <div className="recent-section">
          <h2 className="section-heading">Recent Messages</h2>
          {recentContacts.length === 0
            ? <p className="empty">No messages yet</p>
            : recentContacts.map(c => (
              <div key={c._id} className="recent-card">
                <div className="recent-header">
                  <span className="recent-title">{c.name}</span>
                  <span className={`badge ${c.status}`}>{c.status}</span>
                </div>
                <p className="recent-subject">{c.subject}</p>
                <p className="recent-date">{new Date(c.createdAt).toLocaleDateString()}</p>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Overview;
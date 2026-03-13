import React, { useState, useEffect } from 'react';
import { useNavigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import './Dashboard.css';

const menuItems = [
  { path: '/admin/dashboard', icon: '📊', label: 'Overview' },
  { path: '/admin/skills',    icon: '⚡', label: 'Skills'   },
  { path: '/admin/projects',  icon: '🚀', label: 'Projects' },
  { path: '/admin/contacts',  icon: '✉️', label: 'Messages' },
];

const Dashboard = () => {
  const navigate  = useNavigate();
  const location  = useLocation();
  const { user, logout } = useAuth();
  const [open, setOpen]  = useState(true);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    axios.get('/api/admin/stats').then(r => setStats(r.data)).catch(console.error);
  }, []);

  const handleLogout = () => { logout(); navigate('/admin/login'); };

  return (
    <div className="admin-layout">
      <aside className={`sidebar ${open ? '' : 'closed'}`}>
        <div className="sidebar-header">
          {open && <h2 className="sidebar-logo">{'<ADMIN/>'}</h2>}
          <button className="toggle-btn" onClick={() => setOpen(!open)}>{open ? '←' : '→'}</button>
        </div>
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button key={item.path}
              className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}>
              <span>{item.icon}</span>
              {open && <span>{item.label}</span>}
            </button>
          ))}
        </nav>
        <div className="sidebar-footer">
          {open && (
            <div className="user-info">
              <div className="user-avatar">{user?.username?.charAt(0).toUpperCase()}</div>
              <div>
                <div className="user-name">{user?.username}</div>
                <div className="user-role">{user?.role}</div>
              </div>
            </div>
          )}
          <button className="logout-btn" onClick={handleLogout}>{open ? 'Logout' : '🚪'}</button>
        </div>
      </aside>
      <main className={`admin-main ${open ? '' : 'expanded'}`}>
        <div className="admin-content">
          <Outlet context={{ stats, refetch: () =>
            axios.get('/api/admin/stats').then(r => setStats(r.data)) }} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;

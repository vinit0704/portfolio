import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminContacts.css';

const AdminContacts = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get('/api/contact');
      setContacts(response.data);
    } catch (error) {
      console.error('Error fetching contacts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this message?')) {
      try {
        await axios.delete(`/api/contact/${id}`);
        fetchContacts();
      } catch (error) {
        alert('Error deleting message');
      }
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`/api/contact/${id}`, { status: newStatus });
      fetchContacts();
    } catch (error) {
      alert('Error updating status');
    }
  };

  if (loading) {
    return <div className="loading-text glow-text">LOADING MESSAGES...</div>;
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Messages</h1>
          <p className="page-sub">Contact form submissions</p>
        </div>
        <div className="contact-stats">
          <span className="stat-badge">
            Total: {contacts.length}
          </span>
          <span className="stat-badge new">
            New: {contacts.filter(c => c.status === 'new').length}
          </span>
        </div>
      </div>

      {contacts.length === 0 ? (
        <div className="empty-state">
          <p>No messages yet. When someone uses your contact form, they'll appear here.</p>
        </div>
      ) : (
        <div className="contacts-list">
          {contacts.map((contact) => (
            <div key={contact._id} className="contact-card">
              <div className="contact-header">
                <div className="contact-info">
                  <h3 className="contact-name">{contact.name}</h3>
                  <a href={`mailto:${contact.email}`} className="contact-email">
                    {contact.email}
                  </a>
                </div>
                <div className="contact-actions">
                  <select
                    value={contact.status}
                    onChange={(e) => handleStatusChange(contact._id, e.target.value)}
                    className={`status-select ${contact.status}`}
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                  <button
                    className="icon-btn danger"
                    onClick={() => handleDelete(contact._id)}
                    title="Delete"
                  >
                    🗑️
                  </button>
                </div>
              </div>

              <div className="contact-body">
                <div className="contact-subject">
                  <strong>Subject:</strong> {contact.subject}
                </div>
                <div className="contact-message">
                  <strong>Message:</strong>
                  <p>{contact.message}</p>
                </div>
                <div className="contact-meta">
                  <span className="contact-date">
                    📅 {new Date(contact.createdAt).toLocaleString()}
                  </span>
                  {contact.ipAddress && (
                    <span className="contact-ip">
                      🌐 {contact.ipAddress}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminContacts;
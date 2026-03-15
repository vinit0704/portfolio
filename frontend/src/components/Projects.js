import React, { useState, useEffect } from 'react';
import './Projects.css';

// Static projects data - edit this to add your projects
const staticProjects = [
  {
    _id: '1',
    title: 'E-Commerce Platform',
    description: 'Full-stack online shopping platform with user authentication, product catalog, shopping cart, wishlist, order management, and Stripe payment integration. Features include advanced search, product filtering, user reviews, and comprehensive admin dashboard for inventory management.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'Stripe', 'Redux', 'JWT'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://ecommerce-demo.com',
    image: '', // Leave empty or add image URL
    featured: true,
    category: 'Web',
    status: 'Completed'
  },
  {
    _id: '2',
    title: 'Task Management Application',
    description: 'Collaborative task management system with real-time updates, drag-and-drop Kanban boards, team collaboration features, deadline tracking, and notification system. Built with Firebase for real-time data synchronization.',
    technologies: ['React', 'Firebase', 'Material-UI', 'React Beautiful DnD'],
    githubUrl: 'https://github.com/yourusername/taskmanager',
    liveUrl: 'https://taskmanager-demo.com',
    image: '',
    featured: true,
    category: 'Web',
    status: 'Completed'
  },
  {
    _id: '3',
    title: 'Weather Dashboard',
    description: 'Beautiful weather application providing current conditions, 7-day forecasts, interactive weather maps, and historical data. Features location-based detection, multiple city tracking, severe weather alerts, and detailed meteorological information.',
    technologies: ['React', 'OpenWeather API', 'Chart.js', 'Mapbox', 'Geolocation API'],
    githubUrl: 'https://github.com/yourusername/weather',
    liveUrl: 'https://weather-demo.com',
    image: '',
    featured: false,
    category: 'Web',
    status: 'Completed'
  },
  {
    _id: '4',
    title: 'Social Media Platform',
    description: 'Full-featured social networking platform with post sharing, real-time messaging, friend connections, likes, comments, notifications, and image uploads. Built with Socket.io for real-time communication features.',
    technologies: ['React', 'Node.js', 'Socket.io', 'MongoDB', 'Express', 'AWS S3', 'Redis'],
    githubUrl: 'https://github.com/yourusername/social',
    liveUrl: '',
    image: '',
    featured: true,
    category: 'Web',
    status: 'In Progress'
  },
  {
    _id: '5',
    title: 'Portfolio Website',
    description: 'Professional portfolio website with modern cyberpunk design, admin dashboard for content management, contact form with email integration, and SEO optimization. Built with MERN stack.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Express', 'JWT', 'Nodemailer'],
    githubUrl: 'https://github.com/yourusername/portfolio',
    liveUrl: 'https://yourportfolio.com',
    image: '',
    featured: true,
    category: 'Web',
    status: 'Completed'
  },
  {
    _id: '6',
    title: 'Blog Platform',
    description: 'Modern blogging platform with markdown editor, syntax highlighting for code, tags and categories, search functionality, and user authentication. Features include draft saving and scheduled publishing.',
    technologies: ['Next.js', 'MongoDB', 'TailwindCSS', 'MDX', 'NextAuth'],
    githubUrl: 'https://github.com/yourusername/blog',
    liveUrl: '',
    image: '',
    featured: false,
    category: 'Web',
    status: 'Planned'
  }
];

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [tech, setTech] = useState('All');
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setProjects(staticProjects);
      setFiltered(staticProjects);
      setLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    setFiltered(
      tech === 'All' 
        ? projects 
        : projects.filter(p => p.technologies.includes(tech))
    );
  }, [tech, projects]);

  if (loading) {
    return (
      <section id="projects" className="projects-section">
        <div className="container">
          <div className="loading-text glow-text">LOADING PROJECTS...</div>
        </div>
      </section>
    );
  }

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
            <button 
              key={t} 
              className={`filter-btn ${tech === t ? 'active' : ''}`} 
              onClick={() => setTech(t)}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="proj-grid">
          {filtered.map((p, i) => (
            <div 
              key={p._id} 
              className="proj-card" 
              style={{ animationDelay: `${i * 0.08}s` }} 
              onClick={() => setSelected(p)}
            >
              {p.image ? (
                <div className="proj-img" style={{ backgroundImage: `url(${p.image})` }} />
              ) : (
                <div className="proj-img no-img"><span>🚀</span></div>
              )}
              <div className="proj-info">
                <h3 className="proj-title">{p.title}</h3>
                <p className="proj-desc">{p.description.slice(0, 90)}...</p>
                <div className="proj-tags">
                  {p.technologies.slice(0, 3).map((t, i) => (
                    <span key={i} className="tech-tag">{t}</span>
                  ))}
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
            {selected.image && (
              <img src={selected.image} alt={selected.title} className="modal-img" />
            )}
            <h2 className="modal-title">{selected.title}</h2>
            <p className="modal-desc">{selected.description}</p>
            <div className="modal-techs">
              {selected.technologies.map((t, i) => (
                <span key={i} className="tech-tag">{t}</span>
              ))}
            </div>
            <div className="modal-links">
              {selected.githubUrl && (
                <a href={selected.githubUrl} target="_blank" rel="noreferrer" className="link-btn secondary">
                  GitHub
                </a>
              )}
              {selected.liveUrl && (
                <a href={selected.liveUrl} target="_blank" rel="noreferrer" className="link-btn primary">
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Projects;
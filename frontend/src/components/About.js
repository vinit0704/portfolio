import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './About.css';

const About = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await axios.get('/api/profile');
      setProfile(response.data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Default data if API fails
      setProfile({
        name: 'Vinit Kamble',
        title: 'Full Stack Developer',
        bio: 'Building innovative digital experiences with cutting-edge technologies.',
        email: 'kamblevinit3004@gmail.com',
        phone: '+91 1234567890',
        location: 'India'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="about" className="about-section">
        <div className="container">
          <div className="loading-text glow-text">LOADING...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">{'<02>'}</span>
          <h2 className="section-title">About Me</h2>
        </div>

        <div className="about-grid">
          <div className="about-content">
            <h3 className="about-subtitle">Who I Am</h3>
            <p className="about-text">
              {profile?.bio || "I'm a passionate Full Stack Developer with expertise in building modern web applications. I specialize in React, Node.js, and MongoDB, creating seamless user experiences and robust backend systems."}
            </p>
            
            <p className="about-text">
              With a strong foundation in both frontend and backend technologies, I enjoy turning complex problems into simple, beautiful, and intuitive solutions. When I'm not coding, you'll find me exploring new technologies and contributing to open-source projects.
            </p>

            <div className="about-highlights">
              <div className="highlight-item">
                <div className="highlight-icon">💻</div>
                <div className="highlight-content">
                  <h4>Full Stack Development</h4>
                  <p>MERN Stack, REST APIs, Database Design</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">🎨</div>
                <div className="highlight-content">
                  <h4>UI/UX Design</h4>
                  <p>Responsive Design, Modern Interfaces</p>
                </div>
              </div>

              <div className="highlight-item">
                <div className="highlight-icon">🚀</div>
                <div className="highlight-content">
                  <h4>Performance</h4>
                  <p>Optimization, Best Practices, Clean Code</p>
                </div>
              </div>
            </div>

            {/* Resume Download Button */}
            <div className="resume-section">
              <a 
                href="/resume_v2.pdf" 
                download="Vinit_Kamble_Resume.pdf"
                className="cyber-btn primary resume-btn"
              >
                <span className="btn-icon">📄</span>
                Download Resume
              </a>
              <p className="resume-note">Get my complete resume in PDF format</p>
            </div>
          </div>

          <div className="about-stats">
            <div className="stat-box">
              <div className="stat-number">0</div>
              <div className="stat-label">Years Experience</div>
            </div>

            <div className="stat-box">
              <div className="stat-number">3</div>
              <div className="stat-label">Projects Completed</div>
            </div>

            <div className="stat-box">
              <div className="stat-number">15+</div>
              <div className="stat-label">Technologies</div>
            </div>

            <div className="stat-box">
              <div className="stat-number">100%</div>
              <div className="stat-label">Client Satisfaction</div>
            </div>

            <div className="tech-stack">
              <h4 className="tech-title">Tech Stack</h4>
              <div className="tech-tags">
                {['React', 'Node.js', 'MongoDB', 'Express', 'JavaScript', 'TypeScript', 
                  'Next.js', 'PostgreSQL', 'AWS', 'Docker', 'Git', 'REST APIs'].map((tech, i) => (
                  <span key={i} className="tech-tag">{tech}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
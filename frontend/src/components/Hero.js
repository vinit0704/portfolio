import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Hero.css';

const Hero = () => {
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
      // Set default data for demo
      setProfile({
        name: 'Vinit Kamble',
        title: 'Full Stack Developer',
        bio: 'Building innovative digital experiences with cutting-edge technologies.',
        email: 'kamblevinit3004@gmail.com'
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section id="home" className="hero">
        <div className="container">
          <div className="loading-text glow-text">LOADING...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="hero">
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-intro">
            <span className="intro-tag">{'<hello>'}</span>
            <h2>Hi, I'm</h2>
          </div>

          <h1 className="hero-name">
            <span className="glow-text">{profile?.name || 'Your Name'}</span>
          </h1>

          <h2 className="hero-title">
            <span className="typing-text">{profile?.title || 'Full Stack Developer'}</span>
            <span className="cursor">_</span>
          </h2>

          <p className="hero-bio">
            {profile?.bio || 'Building innovative digital experiences with cutting-edge technologies.'}
          </p>

          <div className="hero-cta">
            <a href="#projects" className="cyber-btn primary">
              View My Work
            </a>
            <a href="#contact" className="cyber-btn secondary">
              Get In Touch
            </a>
          </div>

          <div className="hero-social">
            {profile?.socialLinks?.github && (
              <a href={profile.socialLinks.github} target="_blank" rel="noopener noreferrer" className="social-link">
                <span>GitHub</span>
              </a>
            )}
            {profile?.socialLinks?.linkedin && (
              <a href={profile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="social-link">
                <span>LinkedIn</span>
              </a>
            )}
            {profile?.socialLinks?.twitter && (
              <a href={profile.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                <span>Twitter</span>
              </a>
            )}
          </div>
        </div>

        <div className="hero-visual">
          <div className="hologram-container">
            <div className="hologram-ring ring-1"></div>
            <div className="hologram-ring ring-2"></div>
            <div className="hologram-ring ring-3"></div>
            <div className="hologram-core">
              <div className="core-inner"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
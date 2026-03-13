import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Get In Touch</h3>
            <p className="footer-text">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
            <div className="contact-info">
              <a href="mailto:your.email@example.com" className="contact-link">
                <span className="contact-icon">{'>'}</span>
                kamblevinit3004@gmail.com
              </a>
              <a href="tel:+1234567890" className="contact-link">
                <span className="contact-icon">{'>'}</span>
                +91 7020584737
              </a>
            </div>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Quick Links</h3>
            <ul className="footer-links">
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#projects">Projects</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h3 className="footer-title">Connect</h3>
            <div className="social-links">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-btn">
                GitHub
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-btn">
                LinkedIn
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-btn">
                Twitter
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-divider"></div>
          <p className="copyright">
            <span className="code-bracket">{'<'}</span>
            © {currentYear} Portfolio. Built with React & Node.js
            <span className="code-bracket">{'/>'}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
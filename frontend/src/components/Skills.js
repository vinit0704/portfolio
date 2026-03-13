import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Skills.css';

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await axios.get('/api/skills');
      setSkills(response.data);
    } catch (error) {
      console.error('Error fetching skills:', error);
      // Set demo data
      setSkills([
        { _id: '1', name: 'React', category: 'Frontend', proficiency: 90 },
        { _id: '2', name: 'Node.js', category: 'Backend', proficiency: 85 },
        { _id: '3', name: 'MongoDB', category: 'Database', proficiency: 80 },
        { _id: '4', name: 'JavaScript', category: 'Frontend', proficiency: 95 },
        { _id: '5', name: 'Express.js', category: 'Backend', proficiency: 85 },
        { _id: '6', name: 'Git', category: 'Tools', proficiency: 90 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', ...new Set(skills.map(skill => skill.category))];
  const filteredSkills = selectedCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === selectedCategory);

  if (loading) {
    return (
      <section id="skills" className="skills">
        <div className="container">
          <div className="loading-text glow-text">LOADING SKILLS...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="skills">
      <div className="container">
        <div className="section-header">
          <span className="section-number">{'<03>'}</span>
          <h2 className="section-title">Skills & Technologies</h2>
        </div>

        <div className="skills-filter">
          {categories.map(category => (
            <button
              key={category}
              className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="skills-grid">
          {filteredSkills.map((skill, index) => (
            <div 
              key={skill._id} 
              className="skill-card neon-border"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="skill-header">
                <h3 className="skill-name">{skill.name}</h3>
                <span className="skill-category">{skill.category}</span>
              </div>
              
              <div className="skill-progress">
                <div className="progress-bar">
                  <div 
                    className="progress-fill"
                    style={{ width: `${skill.proficiency}%` }}
                  >
                    <span className="progress-label">{skill.proficiency}%</span>
                  </div>
                </div>
              </div>

              <div className="skill-corners">
                <span className="corner top-left"></span>
                <span className="corner top-right"></span>
                <span className="corner bottom-left"></span>
                <span className="corner bottom-right"></span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
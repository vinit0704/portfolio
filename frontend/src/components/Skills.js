import React, { useState, useEffect } from 'react';
import './Skills.css';

// Static data - edit this to add your skills
const staticSkills = [
  {
    _id: '1',
    name: 'React',
    category: 'Frontend',
    proficiency: 90,
    icon: '⚛️',
    description: 'Building modern, interactive user interfaces'
  },
  {
    _id: '2',
    name: 'JavaScript',
    category: 'Frontend',
    proficiency: 95,
    icon: '📜',
    description: 'Core programming language for web development'
  },
  {
    _id: '3',
    name: 'HTML5',
    category: 'Frontend',
    proficiency: 95,
    icon: '📄',
    description: 'Semantic markup and web structure'
  },
  {
    _id: '4',
    name: 'CSS3',
    category: 'Frontend',
    proficiency: 90,
    icon: '🎨',
    description: 'Styling, animations, and responsive design'
  },
  {
    _id: '5',
    name: 'Node.js',
    category: 'Backend',
    proficiency: 85,
    icon: '🟢',
    description: 'Server-side JavaScript runtime environment'
  },
  {
    _id: '6',
    name: 'Express',
    category: 'Backend',
    proficiency: 85,
    icon: '🚂',
    description: 'Fast, minimalist web framework for Node.js'
  },
  {
    _id: '7',
    name: 'MongoDB',
    category: 'Database',
    proficiency: 80,
    icon: '🍃',
    description: 'NoSQL database for modern applications'
  },
  {
    _id: '8',
    name: 'MySQL',
    category: 'Database',
    proficiency: 75,
    icon: '🐬',
    description: 'Relational database management system'
  },
  {
    _id: '9',
    name: 'Git',
    category: 'Tools',
    proficiency: 90,
    icon: '🔧',
    description: 'Version control and collaboration'
  },
  {
    _id: '10',
    name: 'VS Code',
    category: 'Tools',
    proficiency: 95,
    icon: '💻',
    description: 'Code editor and development environment'
  },
  {
    _id: '11',
    name: 'REST APIs',
    category: 'Backend',
    proficiency: 85,
    icon: '🔌',
    description: 'RESTful API design and implementation'
  },
  {
    _id: '12',
    name: 'Postman',
    category: 'Tools',
    proficiency: 85,
    icon: '📮',
    description: 'API testing and development tool'
  }
];

const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading for smooth UX
    setTimeout(() => {
      setSkills(staticSkills);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) {
    return (
      <section id="skills" className="skills-section">
        <div className="container">
          <div className="loading-text glow-text">LOADING SKILLS...</div>
        </div>
      </section>
    );
  }

  const categories = ['All', ...new Set(skills.map(s => s.category))];
  const filteredSkills = filter === 'All' 
    ? skills 
    : skills.filter(s => s.category === filter);

  const groupedSkills = filteredSkills.reduce((acc, skill) => {
    (acc[skill.category] = acc[skill.category] || []).push(skill);
    return acc;
  }, {});

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <div className="section-header">
          <span className="section-number">{'<03>'}</span>
          <h2 className="section-title">Skills & Expertise</h2>
        </div>

        <div className="category-filter">
          {categories.map(cat => (
            <button
              key={cat}
              className={`filter-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category} className="skill-category">
            <h3 className="category-title">{category}</h3>
            <div className="skills-grid">
              {categorySkills.map((skill, index) => (
                <div 
                  key={skill._id} 
                  className="skill-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="skill-icon">{skill.icon}</div>
                  <h4 className="skill-name">{skill.name}</h4>
                  <p className="skill-desc">{skill.description}</p>
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ width: `${skill.proficiency}%` }}
                    >
                      <span className="progress-text">{skill.proficiency}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
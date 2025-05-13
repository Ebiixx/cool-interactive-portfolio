import React from 'react';

const skillsData = [
  { name: 'React', level: 90 },
  { name: 'TypeScript', level: 85 },
  { name: 'HTML/CSS', level: 95 },
  { name: 'Node.js', level: 75 },
  { name: 'GraphQL', level: 70 },
  { name: 'UI/UX Design', level: 80 },
];

export const Skills: React.FC = () => {
  return (
    <div className="skills-page">
      <div className="container">
        <h2 className="section-title">Meine Fähigkeiten</h2>
        
        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div className="skill-item" key={index}>
              <div className="skill-name">{skill.name}</div>
              <div className="skill-bar">
                <div 
                  className="skill-level" 
                  style={{ width: `${skill.level}%` }}
                  data-level={`${skill.level}%`}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
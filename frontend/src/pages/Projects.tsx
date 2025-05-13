import React, { useState } from 'react';
import { AnimatedCards } from '../components/features/AnimatedCards';

const projectData = [
  {
    id: '1',
    title: 'E-Commerce Platform',
    description: 'Eine moderne E-Commerce-Plattform mit React, Node.js und MongoDB',
    image: 'https://via.placeholder.com/350x200?text=E-Commerce',
    tags: ['React', 'Node.js', 'MongoDB', 'Redux']
  },
  {
    id: '2',
    title: 'Social Media Dashboard',
    description: 'Ein Social Media Analytics Dashboard mit Echtzeit-Updates',
    image: 'https://via.placeholder.com/350x200?text=Dashboard',
    tags: ['React', 'D3.js', 'Firebase', 'Material UI']
  },
  {
    id: '3',
    title: 'Portfolio Website',
    description: 'Ein interaktives Portfolio mit 3D-Elementen und Animationen',
    image: 'https://via.placeholder.com/350x200?text=Portfolio',
    tags: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS']
  }
];

export const Projects: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  
  const filteredProjects = filter === 'all' 
    ? projectData 
    : projectData.filter(project => project.tags.includes(filter));
  
  return (
    <div className="projects-page">
      <div className="container">
        <h2 className="section-title">Meine Projekte</h2>
        
        <div className="project-filters">
          <button 
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            Alle
          </button>
          <button 
            className={`filter-btn ${filter === 'React' ? 'active' : ''}`}
            onClick={() => setFilter('React')}
          >
            React
          </button>
          <button 
            className={`filter-btn ${filter === 'Node.js' ? 'active' : ''}`}
            onClick={() => setFilter('Node.js')}
          >
            Node.js
          </button>
        </div>
        
        <AnimatedCards cards={filteredProjects.map(p => ({
          id: p.id,
          title: p.title,
          description: p.description,
          image: p.image
        }))} />
      </div>
    </div>
  );
};
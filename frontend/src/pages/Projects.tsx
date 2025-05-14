import React, { useState } from 'react';
import { useProjects } from '../hooks/useProjects';
import { Project } from '../services/api';
import './Projects.css'; // Stellen Sie sicher, dass die CSS-Datei erstellt wird

export const Projects: React.FC = () => {
  const { projects, loading, error, createProject } = useProjects();
  const [filter, setFilter] = useState<string>('all');
  
  if (loading) return <div className="loading">Projekte werden geladen...</div>;
  if (error) return <div className="error">{error}</div>;
  
  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(project => project.tags.includes(filter));
  
  // Alle verfügbaren Tags aus den Projekten extrahieren
  const allTags = [...new Set(projects.flatMap(project => project.tags))];
  
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
          {allTags.map(tag => (
            <button 
              key={tag}
              className={`filter-btn ${filter === tag ? 'active' : ''}`}
              onClick={() => setFilter(tag)}
            >
              {tag}
            </button>
          ))}
        </div>
        
        <div className="projects-grid">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <div className={`project-card ${project.featured ? 'featured-project' : ''}`}>
      <div className="project-image-container">
        {project.featured && (
          <div className="featured-badge">Featured</div>
        )}
        {project.imageUrl && (
          <div className="project-image">
            <img src={project.imageUrl} alt={project.title} />
          </div>
        )}
      </div>
      <div className="project-content">
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        
        <div className="project-tags">
          {project.tags.map(tag => (
            <span key={tag} className="project-tag">{tag}</span>
          ))}
        </div>
        
        <div className="project-links">
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="project-link project-link-demo">
              Live Demo
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="project-link project-link-github">
              GitHub
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
import React, { useState } from 'react';
import { useProjects } from '../../hooks/useProjects';
import { Project } from '../../services/api';
import { ImageUploader } from '../../components/ImageUploader';
import './ProjectsAdmin.css';

export const ProjectsAdmin: React.FC = () => {
  const { projects, loading, error, createProject, updateProject, deleteProject } = useProjects();
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState<Project>({
    title: '',
    description: '',
    imageUrl: '',
    demoUrl: '',
    githubUrl: '',
    tags: [],
    featured: false,
    order: 0
  });
  
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      demoUrl: '',
      githubUrl: '',
      tags: [],
      featured: false,
      order: 0
    });
    setEditingProject(null);
  };
  
  const handleShowForm = (project?: Project) => {
    if (project) {
      setFormData(project);
      setEditingProject(project);
    } else {
      resetForm();
    }
    setIsFormVisible(true);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };
  
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsInput = e.target.value;
    // Teilt den String bei Kommas und entfernt Leerzeichen
    const tagsArray = tagsInput.split(',').map(tag => tag.trim()).filter(tag => tag !== '');
    setFormData(prev => ({ ...prev, tags: tagsArray }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProject && editingProject.id) {
        await updateProject(editingProject.id, formData);
      } else {
        await createProject(formData);
      }
      setIsFormVisible(false);
      resetForm();
    } catch (err) {
      console.error('Error saving project:', err);
      alert('Failed to save project. Please try again.');
    }
  };
  
  const handleDelete = async (id?: number) => {
    if (!id || !window.confirm('Sind Sie sicher, dass Sie dieses Projekt löschen möchten?')) return;
    
    try {
      await deleteProject(id);
    } catch (err) {
      console.error('Error deleting project:', err);
      alert('Failed to delete project. Please try again.');
    }
  };
  
  if (loading) return <div className="loading">Projekte werden geladen...</div>;
  if (error) return <div className="error">{error}</div>;
  
  return (
    <div className="admin-page">
      <div className="admin-header">
        <h2>Projektverwaltung</h2>
        <button 
          className="btn btn-primary" 
          onClick={() => handleShowForm()}
        >
          Neues Projekt anlegen
        </button>
      </div>
      
      {isFormVisible && (
        <div className="project-form-container">
          <form onSubmit={handleSubmit} className="project-form">
            <h3>{editingProject ? 'Projekt bearbeiten' : 'Neues Projekt anlegen'}</h3>
            
            <div className="form-group">
              <label htmlFor="title">Titel *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Beschreibung *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                required
              ></textarea>
            </div>
            
            <div className="form-group">
              <label htmlFor="imageUrl">Projektbild</label>
              <ImageUploader 
                onImageUploaded={(imageUrl) => {
                  setFormData(prev => ({...prev, imageUrl}));
                }}
                currentImageUrl={formData.imageUrl}
              />
              <small className="form-hint">
                Du kannst ein Bild hochladen oder direkt eine URL eingeben:
              </small>
              <input
                type="text"
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="Bild-URL (optional wenn oben hochgeladen)"
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="demoUrl">Demo-URL</label>
              <input
                type="text"
                id="demoUrl"
                name="demoUrl"
                value={formData.demoUrl || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="githubUrl">GitHub-URL</label>
              <input
                type="text"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl || ''}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="tags">Tags (kommagetrennt)</label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags.join(', ')}
                onChange={handleTagsChange}
                placeholder="React, TypeScript, Node.js"
              />
            </div>
            
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="featured"
                name="featured"
                checked={formData.featured || false}
                onChange={handleChange}
              />
              <label htmlFor="featured">Hervorgehoben</label>
            </div>
            
            <div className="form-group">
              <label htmlFor="order">Reihenfolge</label>
              <input
                type="number"
                id="order"
                name="order"
                value={formData.order || 0}
                onChange={handleChange}
              />
            </div>
            
            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingProject ? 'Aktualisieren' : 'Erstellen'}
              </button>
              <button 
                type="button" 
                className="btn btn-secondary" 
                onClick={() => setIsFormVisible(false)}
              >
                Abbrechen
              </button>
            </div>
          </form>
        </div>
      )}
      
      <div className="projects-table-container">
        <table className="projects-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Titel</th>
              <th>Tags</th>
              <th>Featured</th>
              <th>Order</th>
              <th>Aktionen</th>
            </tr>
          </thead>
          <tbody>
            {projects.map(project => (
              <tr key={project.id}>
                <td>{project.id}</td>
                <td>{project.title}</td>
                <td>
                  <div className="table-tags">
                    {project.tags.map(tag => (
                      <span key={`${project.id}-${tag}`} className="tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>
                </td>
                <td>{project.featured ? 'Ja' : 'Nein'}</td>
                <td>{project.order}</td>
                <td>
                  <div className="table-actions">
                    <button 
                      className="btn btn-small btn-edit" 
                      onClick={() => handleShowForm(project)}
                    >
                      Bearbeiten
                    </button>
                    <button 
                      className="btn btn-small btn-delete" 
                      onClick={() => handleDelete(project.id)}
                    >
                      Löschen
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
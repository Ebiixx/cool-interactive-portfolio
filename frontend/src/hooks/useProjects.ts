import { useState, useEffect } from 'react';
import { Project, projectsApi } from '../services/api';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  const fetchProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await projectsApi.getAll();
      setProjects(data);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
    } finally {
      setLoading(false);
    }
  };
  
  const createProject = async (project: Project) => {
    try {
      const newProject = await projectsApi.create(project);
      setProjects(prev => [...prev, newProject]);
      return newProject;
    } catch (err) {
      console.error('Error creating project:', err);
      throw err;
    }
  };
  
  const updateProject = async (id: number, project: Project) => {
    try {
      const updatedProject = await projectsApi.update(id, project);
      setProjects(prev => 
        prev.map(p => p.id === id ? updatedProject : p)
      );
      return updatedProject;
    } catch (err) {
      console.error('Error updating project:', err);
      throw err;
    }
  };
  
  const deleteProject = async (id: number) => {
    try {
      await projectsApi.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error('Error deleting project:', err);
      throw err;
    }
  };
  
  useEffect(() => {
    fetchProjects();
  }, []);
  
  return {
    projects,
    loading,
    error,
    fetchProjects,
    createProject,
    updateProject,
    deleteProject
  };
}
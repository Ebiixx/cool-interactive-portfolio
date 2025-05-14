import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface Project {
  id?: number;
  title: string;
  description: string;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  tags: string[];
  featured?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

export const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const response = await api.get('/projects');
    return response.data;
  },
  
  getById: async (id: number): Promise<Project> => {
    const response = await api.get(`/projects/${id}`);
    return response.data;
  },
  
  create: async (project: Project): Promise<Project> => {
    const response = await api.post('/projects', project);
    return response.data;
  },
  
  update: async (id: number, project: Project): Promise<Project> => {
    const response = await api.put(`/projects/${id}`, project);
    return response.data;
  },
  
  delete: async (id: number): Promise<void> => {
    await api.delete(`/projects/${id}`);
  }
};
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api', // Adjust the base URL as needed
    headers: {
        'Content-Type': 'application/json',
    },
});

export const fetchProjects = async () => {
    try {
        const response = await apiClient.get('/projects');
        return response.data;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

export const createProject = async (projectData) => {
    try {
        const response = await apiClient.post('/projects', projectData);
        return response.data;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

export const fetchAIResponse = async (prompt) => {
    try {
        const response = await apiClient.post('/ai/chat', { prompt });
        return response.data;
    } catch (error) {
        console.error('Error fetching AI response:', error);
        throw error;
    }
};
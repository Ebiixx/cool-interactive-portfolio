import { Router } from 'express';
import { getProjects, createProject, updateProject, deleteProject } from '../controllers/projects.controller';

const router = Router();

// Route to get all projects
router.get('/', getProjects);

// Route to create a new project
router.post('/', createProject);

// Route to update an existing project
router.put('/:id', updateProject);

// Route to delete a project
router.delete('/:id', deleteProject);

export default router;
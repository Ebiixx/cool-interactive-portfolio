import express from 'express';
import { ProjectsController } from '../controllers/projects.controller';

const router = express.Router();

// Öffentliche Routen - kein Auth erforderlich
router.get('/', ProjectsController.getAllProjects);
router.get('/:id', ProjectsController.getProjectById);

// Admin-Routen - würden normalerweise Auth erfordern
router.post('/', ProjectsController.createProject);
router.put('/:id', ProjectsController.updateProject);
router.delete('/:id', ProjectsController.deleteProject);

export default router;
import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { isAuthenticated } from '../middleware/auth.middleware';

const router = express.Router();

// Öffentliche Routen
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.post('/admin', AuthController.createAdmin); // Nur für initiales Setup

// Geschützte Routen
router.get('/profile', isAuthenticated, AuthController.getProfile);

export default router;
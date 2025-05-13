import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const router = express.Router();

// Stelle sicher, dass AuthController.register definiert ist
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

export default router;
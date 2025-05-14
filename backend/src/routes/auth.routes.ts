import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { checkAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Prüfe, ob die AuthController-Methoden definiert sind
console.log('AuthController methods:', Object.getOwnPropertyNames(AuthController));
console.log('login method:', typeof AuthController.login);
console.log('register method:', typeof AuthController.register);
console.log('profile method:', typeof AuthController.profile);

// Authentifizierungsrouten
router.post('/login', AuthController.login);
router.post('/register', AuthController.register); // Falls vorhanden
router.get('/profile', checkAuth, AuthController.profile); // Hier scheint der Fehler zu sein

export default router;
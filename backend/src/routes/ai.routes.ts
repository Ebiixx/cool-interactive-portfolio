import { Router } from 'express';
import { getAIResponse } from '../controllers/ai.controller';

const router = Router();

// Route to handle AI requests
router.post('/chat', getAIResponse);

export default router;
import express from 'express';
import { UploadController } from '../controllers/upload.controller';
import { upload } from '../middleware/upload.middleware';
import { checkAuth } from '../middleware/auth.middleware';

const router = express.Router();

// Stelle sicher, dass die Funktion existiert, bevor du sie verwendest
console.log('UploadController:', UploadController);
console.log('uploadImage method:', UploadController.uploadImage);

// Route zum Hochladen von Bildern (nur für angemeldete Benutzer)
router.post('/image', checkAuth, upload.single('image'), UploadController.uploadImage);

export default router;
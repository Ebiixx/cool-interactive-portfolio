import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import projectsRoutes from './routes/projects.routes';
import messageRoutes from './routes/message.routes';
import uploadRoutes from './routes/upload.routes';
import path from 'path';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Statischen Ordner für Uploads einrichten
app.use('/uploads', express.static(path.join(__dirname, '../public/uploads')));

// API Routen
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectsRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/upload', uploadRoutes);

// Grundlegende Testroute
app.get('/', (req, res) => {
  res.send('Backend API is running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export default app;
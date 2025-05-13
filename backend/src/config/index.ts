import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 3000,
  db: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/cool-interactive-portfolio',
  },
  openai: {
    apiKey: process.env.OPENAI_API_KEY || '',
  },
};

export default config;
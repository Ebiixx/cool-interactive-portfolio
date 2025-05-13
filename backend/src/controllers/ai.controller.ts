import { Request, Response } from 'express';
import { OpenAIService } from '../services/openai.service';

const openAIService = new OpenAIService();

export const getAIResponse = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body;
        const response = await openAIService.getResponse(prompt);
        res.status(200).json({ response });
    } catch (error) {
        res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
};
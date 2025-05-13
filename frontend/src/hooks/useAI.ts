import { useState } from 'react';

export const useAI = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');

  const askAI = async (prompt: string) => {
    setLoading(true);
    try {
      // Mock-Implementierung - in einer realen App würdest du hier eine API-Anfrage machen
      await new Promise(resolve => setTimeout(resolve, 1000));
      setResponse(`AI response to: ${prompt}`);
    } catch (error) {
      console.error('Error in AI chat:', error);
      setResponse('Sorry, an error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return { loading, response, askAI };
};
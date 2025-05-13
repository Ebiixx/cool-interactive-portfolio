import { useState, useEffect } from 'react';
import { fetchAIResponse } from '../services/api';

const useAI = (prompt) => {
    const [response, setResponse] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!prompt) return;

        const getAIResponse = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchAIResponse(prompt);
                setResponse(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        getAIResponse();
    }, [prompt]);

    return { response, loading, error };
};

export default useAI;
import React, { useState } from 'react';
import AIChat from '../components/features/AIChat';
import DragDrop from '../components/features/DragDrop';
import AnimatedCards from '../components/features/AnimatedCards';
import './AIPlayground.css';

const AIPlayground = () => {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleSubmit = async () => {
        // Call the AI service with the input
        const result = await fetch('/api/ai', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt: input }),
        });
        const data = await result.json();
        setResponse(data.response);
    };

    return (
        <div className="ai-playground">
            <h1>AI Playground</h1>
            <div className="input-section">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your prompt here..."
                />
                <button onClick={handleSubmit}>Submit</button>
            </div>
            <div className="response-section">
                <h2>Response:</h2>
                <p>{response}</p>
            </div>
            <DragDrop />
            <AnimatedCards />
            <AIChat />
        </div>
    );
};

export default AIPlayground;
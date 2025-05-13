import React, { useState } from 'react';
import { useAI } from '../../hooks/useAI';
import './AIChat.css';

const AIChat: React.FC = () => {
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'ai' }[]>([]);
    const { sendMessage } = useAI();

    const handleSend = async () => {
        if (input.trim() === '') return;

        const userMessage = { text: input, sender: 'user' };
        setMessages((prev) => [...prev, userMessage]);

        const aiResponse = await sendMessage(input);
        const aiMessage = { text: aiResponse, sender: 'ai' };
        setMessages((prev) => [...prev, aiMessage]);

        setInput('');
    };

    return (
        <div className="ai-chat">
            <div className="messages">
                {messages.map((msg, index) => (
                    <div key={index} className={`message ${msg.sender}`}>
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    );
};

export default AIChat;
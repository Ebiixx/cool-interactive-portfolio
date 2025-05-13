import React from 'react';
import './AnimatedCards.css';

const AnimatedCards = () => {
    const cards = [
        { id: 1, title: 'Card 1', content: 'This is the first card.' },
        { id: 2, title: 'Card 2', content: 'This is the second card.' },
        { id: 3, title: 'Card 3', content: 'This is the third card.' },
    ];

    return (
        <div className="animated-cards">
            {cards.map(card => (
                <div key={card.id} className="card">
                    <h3>{card.title}</h3>
                    <p>{card.content}</p>
                </div>
            ))}
        </div>
    );
};

export default AnimatedCards;
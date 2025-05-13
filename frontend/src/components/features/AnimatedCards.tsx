import React from 'react';

interface CardType {
  id: string; 
  title: string; 
  description: string; 
  image?: string;
}

interface AnimatedCardsProps {
  cards?: CardType[];
}

export const AnimatedCards: React.FC<AnimatedCardsProps> = ({ cards = [] }) => {
  const defaultCards: CardType[] = [
    { id: '1', title: 'Card 1', description: 'Description for card 1', image: 'https://via.placeholder.com/150' },
    { id: '2', title: 'Card 2', description: 'Description for card 2', image: 'https://via.placeholder.com/150' },
    { id: '3', title: 'Card 3', description: 'Description for card 3', image: 'https://via.placeholder.com/150' },
  ];

  const displayCards = cards.length > 0 ? cards : defaultCards;

  return (
    <div className="animated-cards">
      {displayCards.map(card => (
        <div key={card.id} className="animated-card">
          {card.image && <img src={card.image} alt={card.title} />}
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>
  );
};
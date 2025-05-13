import React from 'react';
import './Card.css';

interface CardProps {
    title: string;
    content: string;
    imageUrl?: string;
    onClick?: () => void;
}

const Card: React.FC<CardProps> = ({ title, content, imageUrl, onClick }) => {
    return (
        <div className="card" onClick={onClick}>
            {imageUrl && <img src={imageUrl} alt={title} className="card-image" />}
            <div className="card-content">
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{content}</p>
            </div>
        </div>
    );
};

export default Card;
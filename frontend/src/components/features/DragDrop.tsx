import React, { useState } from 'react';

const DragDrop = () => {
    const [items, setItems] = useState<string[]>(['Item 1', 'Item 2', 'Item 3']);

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        e.dataTransfer.setData('text/plain', index.toString());
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, index: number) => {
        const draggedIndex = Number(e.dataTransfer.getData('text/plain'));
        const updatedItems = [...items];
        const [draggedItem] = updatedItems.splice(draggedIndex, 1);
        updatedItems.splice(index, 0, draggedItem);
        setItems(updatedItems);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    return (
        <div>
            <h2>Drag and Drop Example</h2>
            <div>
                {items.map((item, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={(e) => handleDragStart(e, index)}
                        onDrop={(e) => handleDrop(e, index)}
                        onDragOver={handleDragOver}
                        style={{
                            padding: '16px',
                            margin: '8px',
                            border: '1px solid #ccc',
                            backgroundColor: '#f9f9f9',
                            cursor: 'move'
                        }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default DragDrop;
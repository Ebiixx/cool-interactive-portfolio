import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import DragDrop from '../components/features/DragDrop';
import AnimatedCards from '../components/features/AnimatedCards';
import AIChat from '../components/features/AIChat';
import './Home.css';

const Home: React.FC = () => {
    return (
        <div className="home">
            <Header />
            <main>
                <h1>Welcome to My Interactive Portfolio</h1>
                <section>
                    <h2>Drag and Drop Feature</h2>
                    <DragDrop />
                </section>
                <section>
                    <h2>Animated Cards</h2>
                    <AnimatedCards />
                </section>
                <section>
                    <h2>AI Chat Integration</h2>
                    <AIChat />
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default Home;
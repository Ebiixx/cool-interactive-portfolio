import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Sidebar from './components/layout/Sidebar';
import Home from './pages/Home';
import Projects from './pages/Projects';
import AIPlayground from './pages/AIPlayground';
import './styles/global.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="main-content">
          <Sidebar />
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/projects" component={Projects} />
            <Route path="/ai-playground" component={AIPlayground} />
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
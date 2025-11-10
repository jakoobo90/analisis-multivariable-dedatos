import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [language, setLanguage] = useState('en');

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'en' ? 'es' : 'en');
  };

  return (
    <div className="App">
      <Navbar language={language} toggleLanguage={toggleLanguage} />
      <Dashboard language={language} />
    </div>
  );
}

export default App;

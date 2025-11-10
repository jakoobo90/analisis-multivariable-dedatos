import React from 'react';
import { getTranslation } from '../translations';

const Navbar = ({ language, toggleLanguage }) => {
  return (
    <nav style={{
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '2rem'
      }}>
        <div style={{ flex: 1 }}>
          <h1 style={{
            fontSize: '1.5rem',
            fontWeight: 'bold',
            margin: 0
          }}>
            {getTranslation(language, 'navTitle')}
          </h1>
        </div>
        <div style={{
          fontSize: '0.875rem',
          color: '#9ca3af',
          flex: 1,
          textAlign: 'center'
        }}>
          {getTranslation(language, 'navSubtitle')}
        </div>
        <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={toggleLanguage}
            style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.875rem',
              fontWeight: '500',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#2563eb'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#3b82f6'}
          >
            <span style={{ fontSize: '1.25rem' }}>🌐</span>
            <span>{language === 'en' ? 'Español' : 'English'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

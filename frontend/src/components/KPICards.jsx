import React from 'react';
import { getTranslation } from '../translations';

const KPICards = ({ summary, language }) => {
  if (!summary) {
    return <div>{getTranslation(language, 'loadingKPIs')}</div>;
  }

  const cards = [
    {
      title: getTranslation(language, 'kpiTotalCustomers'),
      value: summary.n,
      format: (v) => v.toLocaleString()
    },
    {
      title: getTranslation(language, 'kpiAvgIncome'),
      value: summary.mean_income,
      format: (v) => `$${v.toFixed(2)} MXN`
    },
    {
      title: getTranslation(language, 'kpiAvgFrequency'),
      value: summary.mean_frequency,
      format: (v) => v.toFixed(2)
    },
    {
      title: getTranslation(language, 'kpiAvgSpending'),
      value: summary.mean_spending,
      format: (v) => `$${v.toFixed(2)} MXN`
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1rem',
      marginBottom: '2rem'
    }}>
      {cards.map((card, idx) => (
        <div
          key={idx}
          style={{
            backgroundColor: 'white',
            padding: '1.5rem',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            border: '1px solid #e5e7eb'
          }}
        >
          <div style={{
            fontSize: '0.875rem',
            color: '#6b7280',
            marginBottom: '0.5rem',
            fontWeight: '500'
          }}>
            {card.title}
          </div>
          <div style={{
            fontSize: '2rem',
            fontWeight: 'bold',
            color: '#1f2937'
          }}>
            {card.format(card.value)}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KPICards;

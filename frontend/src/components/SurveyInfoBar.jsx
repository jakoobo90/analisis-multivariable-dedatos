import React, { useState } from 'react';
import { getTranslation } from '../translations';

const SurveyInfoBar = ({ summary, clusters, language }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!summary || !clusters) {
    return null;
  }

  const tabs = [
    { id: 'overview', label: getTranslation(language, 'surveyOverview') },
    { id: 'participants', label: getTranslation(language, 'surveyParticipants') },
    { id: 'areas', label: getTranslation(language, 'surveyAreas') },
    { id: 'variables', label: getTranslation(language, 'surveyVariables') },
    { id: 'details', label: getTranslation(language, 'surveyDetails') }
  ];

  return (
    <div style={{
      backgroundColor: 'white',
      borderRadius: '8px',
      boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
      border: '1px solid #e5e7eb',
      marginBottom: '2rem',
      overflow: 'hidden'
    }}>
      {/* Tabs Header */}
      <div style={{
        display: 'flex',
        borderBottom: '2px solid #e5e7eb',
        backgroundColor: '#f9fafb'
      }}>
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '1rem',
              border: 'none',
              backgroundColor: activeTab === tab.id ? 'white' : 'transparent',
              borderBottom: activeTab === tab.id ? '3px solid #3b82f6' : '3px solid transparent',
              color: activeTab === tab.id ? '#3b82f6' : '#6b7280',
              fontWeight: activeTab === tab.id ? '600' : '500',
              cursor: 'pointer',
              fontSize: '0.875rem',
              transition: 'all 0.2s',
              marginBottom: '-2px'
            }}
            onMouseOver={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.backgroundColor = '#f3f4f6';
              }
            }}
            onMouseOut={(e) => {
              if (activeTab !== tab.id) {
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div style={{ padding: '1.5rem' }}>
        {activeTab === 'overview' && (
          <OverviewTab summary={summary} clusters={clusters} language={language} />
        )}
        {activeTab === 'participants' && (
          <ParticipantsTab summary={summary} clusters={clusters} language={language} />
        )}
        {activeTab === 'areas' && (
          <AreasTab clusters={clusters} language={language} />
        )}
        {activeTab === 'variables' && (
          <VariablesTab language={language} />
        )}
        {activeTab === 'details' && (
          <DetailsTab summary={summary} language={language} />
        )}
      </div>
    </div>
  );
};

// Overview Tab Component
const OverviewTab = ({ summary, clusters, language }) => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
    <InfoCard
      title={getTranslation(language, 'surveyTotalRespondents')}
      value={summary.n}
      icon="👥"
    />
    <InfoCard
      title={getTranslation(language, 'surveyGenderDistribution')}
      value={`${summary.gender_counts.M}M / ${summary.gender_counts.F}F`}
      icon="⚧"
    />
    <InfoCard
      title={getTranslation(language, 'surveyCustomerGroups')}
      value={clusters.n_clusters}
      icon="📊"
    />
    <InfoCard
      title={getTranslation(language, 'surveyDataStatus')}
      value={getTranslation(language, 'surveyComplete')}
      icon="✅"
    />
  </div>
);

// Participants Tab Component
const ParticipantsTab = ({ summary, clusters, language }) => {
  const participantsList = clusters.data_points.slice(0, 10); // Show first 10

  return (
    <div>
      <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
        {getTranslation(language, 'surveyParticipantsList')} ({getTranslation(language, 'surveyShowingFirst')} 10 {getTranslation(language, 'surveyOf')} {summary.n})
      </h3>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '0.75rem'
      }}>
        {participantsList.map((participant) => (
          <div
            key={participant.customer_id}
            style={{
              padding: '0.75rem',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid #e5e7eb',
              fontSize: '0.875rem'
            }}
          >
            <div style={{ fontWeight: '600', color: '#1f2937', marginBottom: '0.25rem' }}>
              {getTranslation(language, 'surveyCustomer')} #{participant.customer_id}
            </div>
            <div style={{ color: '#6b7280' }}>
              {getTranslation(language, 'labelCluster')}: {participant.cluster}
            </div>
            <div style={{ color: '#6b7280' }}>
              {getTranslation(language, 'labelIncome')}: ${participant.monthly_income.toFixed(0)} MXN
            </div>
          </div>
        ))}
      </div>
      <div style={{
        marginTop: '1rem',
        padding: '0.75rem',
        backgroundColor: '#eff6ff',
        borderRadius: '6px',
        fontSize: '0.875rem',
        color: '#1e40af'
      }}>
        {getTranslation(language, 'surveyViewingSubset')} {participantsList.length} {getTranslation(language, 'surveyOf')} {summary.n} {getTranslation(language, 'surveyTotalParticipants')}
      </div>
    </div>
  );
};

// Areas Tab Component
const AreasTab = ({ clusters, language }) => {
  return (
    <div>
      <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
        {getTranslation(language, 'surveyGeographicDistribution')}
      </h3>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {clusters.cluster_statistics.map((cluster) => (
          <div
            key={cluster.cluster_id}
            style={{
              padding: '1rem',
              backgroundColor: '#f9fafb',
              borderRadius: '8px',
              border: '1px solid #e5e7eb'
            }}
          >
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#1f2937', margin: 0 }}>
                {getTranslation(language, 'labelCluster')} {cluster.cluster_id} - {getAreaName(cluster.cluster_id, language)}
              </h4>
              <span style={{
                backgroundColor: getClusterColor(cluster.cluster_id),
                color: 'white',
                padding: '0.25rem 0.75rem',
                borderRadius: '12px',
                fontSize: '0.75rem',
                fontWeight: '600'
              }}>
                {cluster.size} {getTranslation(language, 'surveyPeople')}
              </span>
            </div>
            <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              <div>{getTranslation(language, 'kpiAvgIncome')}: ${cluster.mean_income.toFixed(2)} MXN</div>
              <div>{getTranslation(language, 'kpiAvgSpending')}: ${cluster.mean_spending.toFixed(2)} MXN</div>
              <div>{getTranslation(language, 'kpiAvgFrequency')}: {cluster.mean_frequency.toFixed(2)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Variables Tab Component
const VariablesTab = ({ language }) => {
  const variables = [
    {
      variable: getTranslation(language, 'varDescID'),
      description: getTranslation(language, 'varDescIDDesc')
    },
    {
      variable: getTranslation(language, 'varDescAge'),
      description: getTranslation(language, 'varDescAgeDesc')
    },
    {
      variable: getTranslation(language, 'varDescGender'),
      description: getTranslation(language, 'varDescGenderDesc')
    },
    {
      variable: getTranslation(language, 'varDescMonthlyIncome'),
      description: getTranslation(language, 'varDescMonthlyIncomeDesc')
    },
    {
      variable: getTranslation(language, 'varDescPurchaseFrequency'),
      description: getTranslation(language, 'varDescPurchaseFrequencyDesc')
    },
    {
      variable: getTranslation(language, 'varDescAvgSpending'),
      description: getTranslation(language, 'varDescAvgSpendingDesc')
    },
    {
      variable: getTranslation(language, 'varDescSatisfaction'),
      description: getTranslation(language, 'varDescSatisfactionDesc')
    },
    {
      variable: getTranslation(language, 'varDescPreferredCategory'),
      description: getTranslation(language, 'varDescPreferredCategoryDesc')
    }
  ];

  return (
    <div>
      <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '1rem', color: '#1f2937' }}>
        {getTranslation(language, 'surveyVariables')}
      </h3>
      <div style={{ overflowX: 'auto' }}>
        <table style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '0.875rem'
        }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6' }}>
              <th style={{
                padding: '0.75rem',
                textAlign: 'left',
                fontWeight: '600',
                color: '#1f2937',
                borderBottom: '2px solid #e5e7eb'
              }}>
                {getTranslation(language, 'varDescVariable')}
              </th>
              <th style={{
                padding: '0.75rem',
                textAlign: 'left',
                fontWeight: '600',
                color: '#1f2937',
                borderBottom: '2px solid #e5e7eb'
              }}>
                {getTranslation(language, 'varDescDescription')}
              </th>
            </tr>
          </thead>
          <tbody>
            {variables.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{
                  padding: '0.75rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  backgroundColor: idx % 2 === 0 ? '#f9fafb' : 'white'
                }}>
                  {item.variable}
                </td>
                <td style={{
                  padding: '0.75rem',
                  color: '#6b7280',
                  backgroundColor: idx % 2 === 0 ? '#f9fafb' : 'white'
                }}>
                  {item.description}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Details Tab Component
const DetailsTab = ({ summary, language }) => {
  const details = [
    { label: getTranslation(language, 'surveyCollectionPeriod'), value: '2024-2025' },
    { label: getTranslation(language, 'surveyMethodology'), value: getTranslation(language, 'surveyRandomSampling') },
    { label: getTranslation(language, 'surveyDataType'), value: getTranslation(language, 'surveyQuantitative') },
    { label: getTranslation(language, 'surveyVariables'), value: '8' },
    { label: getTranslation(language, 'surveyIncomeRange'), value: `$${summary.min_income} - $${summary.max_income} MXN` },
    { label: getTranslation(language, 'surveyAnalysisTypes'), value: getTranslation(language, 'surveyMultivariate') }
  ];

  const analysisMethods = [
    {
      title: getTranslation(language, 'analysisMultipleRegression'),
      description: getTranslation(language, 'analysisMultipleRegressionDesc'),
      icon: '📈'
    },
    {
      title: getTranslation(language, 'analysisANOVA'),
      description: getTranslation(language, 'analysisANOVADesc'),
      icon: '📊'
    },
    {
      title: getTranslation(language, 'analysisPCA'),
      description: getTranslation(language, 'analysisPCADesc'),
      icon: '🔍'
    },
    {
      title: getTranslation(language, 'analysisCluster'),
      description: getTranslation(language, 'analysisClusterDesc'),
      icon: '🎯'
    }
  ];

  return (
    <div>
      {/* Survey Details */}
      <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '2rem' }}>
        {details.map((detail, idx) => (
          <div
            key={idx}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.75rem',
              backgroundColor: '#f9fafb',
              borderRadius: '6px',
              border: '1px solid #e5e7eb'
            }}
          >
            <span style={{ fontWeight: '600', color: '#1f2937', fontSize: '0.875rem' }}>
              {detail.label}
            </span>
            <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
              {detail.value}
            </span>
          </div>
        ))}
      </div>

      {/* Analysis Methods Section */}
      <div>
        <h3 style={{
          fontSize: '1rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: '#1f2937',
          paddingBottom: '0.5rem',
          borderBottom: '2px solid #e5e7eb'
        }}>
          {getTranslation(language, 'analysisMethodsTitle')}
        </h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {analysisMethods.map((method, idx) => (
            <div
              key={idx}
              style={{
                padding: '1rem',
                backgroundColor: '#f9fafb',
                borderRadius: '8px',
                border: '1px solid #e5e7eb',
                borderLeft: '4px solid #3b82f6'
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '0.5rem'
              }}>
                <span style={{ fontSize: '1.5rem' }}>{method.icon}</span>
                <h4 style={{
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  margin: 0
                }}>
                  {method.title}
                </h4>
              </div>
              <p style={{
                fontSize: '0.875rem',
                color: '#6b7280',
                margin: 0,
                lineHeight: '1.5'
              }}>
                {method.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper Components
const InfoCard = ({ title, value, icon }) => (
  <div style={{
    padding: '1rem',
    backgroundColor: '#f9fafb',
    borderRadius: '6px',
    border: '1px solid #e5e7eb',
    textAlign: 'center'
  }}>
    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{icon}</div>
    <div style={{ fontSize: '0.75rem', color: '#6b7280', marginBottom: '0.5rem' }}>
      {title}
    </div>
    <div style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1f2937' }}>
      {value}
    </div>
  </div>
);

// Helper Functions
const getAreaName = (clusterId, language) => {
  const names = {
    0: language === 'es' ? 'Zona Económica' : 'Economic Zone',
    1: language === 'es' ? 'Zona Moderada' : 'Moderate Zone',
    2: language === 'es' ? 'Zona Premium' : 'Premium Zone'
  };
  return names[clusterId] || `Zone ${clusterId}`;
};

const getClusterColor = (clusterId) => {
  const colors = ['#10b981', '#f59e0b', '#ef4444'];
  return colors[clusterId % colors.length];
};

export default SurveyInfoBar;

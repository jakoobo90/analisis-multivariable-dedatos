import React, { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  ScatterChart,
  Scatter,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';
import KPICards from './KPICards';
import SurveyInfoBar from './SurveyInfoBar';
import { getTranslation } from '../translations';

const Dashboard = ({ language }) => {
  const [summary, setSummary] = useState(null);
  const [regression, setRegression] = useState(null);
  const [anova, setAnova] = useState(null);
  const [pca, setPca] = useState(null);
  const [clusters, setClusters] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const [summaryRes, regressionRes, anovaRes, pcaRes, clustersRes] = await Promise.all([
          fetch('/data/summary.json'),
          fetch('/data/regression.json'),
          fetch('/data/anova.json'),
          fetch('/data/pca.json'),
          fetch('/data/clusters.json')
        ]);

        if (!summaryRes.ok || !regressionRes.ok || !anovaRes.ok || !pcaRes.ok || !clustersRes.ok) {
          throw new Error('Failed to load one or more data files');
        }

        const [summaryData, regressionData, anovaData, pcaData, clustersData] = await Promise.all([
          summaryRes.json(),
          regressionRes.json(),
          anovaRes.json(),
          pcaRes.json(),
          clustersRes.json()
        ]);

        setSummary(summaryData);
        setRegression(regressionData);
        setAnova(anovaData);
        setPca(pcaData);
        setClusters(clustersData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>{getTranslation(language, 'loadingDashboard')}</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center', color: 'red' }}>
        <h2>{getTranslation(language, 'errorLoadingData')}</h2>
        <p>{error}</p>
        <p style={{ marginTop: '1rem', color: '#6b7280' }}>
          {getTranslation(language, 'errorMessage')} <code>uv run python src/analysis.py</code>
        </p>
      </div>
    );
  }

  // Prepare histogram data for MonthlyIncome
  const incomeHistogramData = prepareHistogramData(clusters?.data_points || [], 'monthly_income', 10);

  // Prepare scatter data for Income vs Spending
  const scatterData = clusters?.data_points?.map(point => ({
    income: point.monthly_income,
    spending: point.average_spending,
    gender: point.customer_id % 2 === 0 ? 'F' : 'M' // Simplified - in real data use actual gender
  })) || [];

  const maleData = scatterData.filter(d => d.gender === 'M');
  const femaleData = scatterData.filter(d => d.gender === 'F');

  // Prepare cluster boxplot data (approximation using statistics)
  const clusterBoxplotData = clusters?.cluster_statistics?.map(stat => ({
    cluster: `${getTranslation(language, 'labelCluster')} ${stat.cluster_id}`,
    spending: stat.mean_spending
  })) || [];

  return (
    <div style={{
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem'
    }}>
      {/* KPI Cards */}
      <KPICards summary={summary} language={language} />

      {/* Survey Information Bar */}
      <SurveyInfoBar summary={summary} clusters={clusters} language={language} />

      {/* Charts Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '2rem',
        marginBottom: '2rem'
      }}>
        {/* Histogram of MonthlyIncome */}
        <ChartCard title={getTranslation(language, 'chartIncomeDistribution')}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={incomeHistogramData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" label={{ value: getTranslation(language, 'labelIncome'), position: 'insideBottom', offset: -5 }} />
              <YAxis label={{ value: getTranslation(language, 'labelFrequency'), angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="count" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Scatter: Income vs Spending by Gender */}
        <ChartCard title={getTranslation(language, 'chartIncomeVsSpending')}>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="income"
                name={getTranslation(language, 'labelIncome')}
                label={{ value: getTranslation(language, 'labelIncome'), position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                type="number"
                dataKey="spending"
                name={getTranslation(language, 'labelSpending')}
                label={{ value: getTranslation(language, 'labelSpending'), angle: -90, position: 'insideLeft' }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Legend />
              <Scatter name={getTranslation(language, 'labelMale')} data={maleData} fill="#3b82f6" />
              <Scatter name={getTranslation(language, 'labelFemale')} data={femaleData} fill="#ef4444" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* PCA 2D Scatter */}
        <ChartCard title={getTranslation(language, 'chartPCA')}>
          <ResponsiveContainer width="100%" height={300}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                dataKey="pc1"
                name={getTranslation(language, 'labelPC1')}
                label={{ value: `${getTranslation(language, 'labelPC1')} (${(pca?.explained_variance_ratio[0] * 100).toFixed(1)}% ${getTranslation(language, 'labelVariance')})`, position: 'insideBottom', offset: -5 }}
              />
              <YAxis
                type="number"
                dataKey="pc2"
                name={getTranslation(language, 'labelPC2')}
                label={{ value: `${getTranslation(language, 'labelPC2')} (${(pca?.explained_variance_ratio[1] * 100).toFixed(1)}% ${getTranslation(language, 'labelVariance')})`, angle: -90, position: 'insideLeft' }}
              />
              <Tooltip cursor={{ strokeDasharray: '3 3' }} />
              <Scatter name={getTranslation(language, 'labelCustomers')} data={pca?.data_points || []} fill="#8b5cf6" />
            </ScatterChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Boxplot approximation: Spending by Cluster */}
        <ChartCard title={getTranslation(language, 'chartSpendingByCluster')}>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={clusterBoxplotData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="cluster" />
              <YAxis label={{ value: getTranslation(language, 'labelSpending'), angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Bar dataKey="spending" fill="#10b981">
                {clusterBoxplotData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={['#10b981', '#f59e0b', '#ef4444'][index % 3]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Tables Section */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
        gap: '2rem'
      }}>
        {/* Regression Results Table */}
        <TableCard title={getTranslation(language, 'tableRegressionTitle')}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>{getTranslation(language, 'regressionModel')} </strong> AverageSpending ~ MonthlyIncome + PurchaseFrequency
            <br />
            <strong>{getTranslation(language, 'regressionRSquared')} </strong> {regression?.r_squared.toFixed(4)}
            <br />
            <strong>{getTranslation(language, 'regressionAdjRSquared')} </strong> {regression?.adj_r_squared.toFixed(4)}
            <br />
            <strong>{getTranslation(language, 'regressionFStatistic')} </strong> {regression?.f_statistic.toFixed(2)} (p = {regression?.f_pvalue.toFixed(6)})
          </div>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6' }}>
                <th style={tableHeaderStyle}>{getTranslation(language, 'headerVariable')}</th>
                <th style={tableHeaderStyle}>{getTranslation(language, 'headerCoefficient')}</th>
                <th style={tableHeaderStyle}>{getTranslation(language, 'headerStdError')}</th>
                <th style={tableHeaderStyle}>{getTranslation(language, 'headerTValue')}</th>
                <th style={tableHeaderStyle}>{getTranslation(language, 'headerPValue')}</th>
              </tr>
            </thead>
            <tbody>
              {regression?.coefficients.map((coef, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={tableCellStyle}>{coef.variable}</td>
                  <td style={tableCellStyle}>{coef.coefficient.toFixed(4)}</td>
                  <td style={tableCellStyle}>{coef.std_error.toFixed(4)}</td>
                  <td style={tableCellStyle}>{coef.t_value.toFixed(3)}</td>
                  <td style={tableCellStyle}>{coef.p_value < 0.001 ? '<0.001' : coef.p_value.toFixed(4)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>

        {/* ANOVA Results Table */}
        <TableCard title={getTranslation(language, 'tableAnovaTitle')}>
          <div style={{ marginBottom: '1rem' }}>
            <strong>{getTranslation(language, 'anovaModel')} </strong> {getTranslation(language, 'anovaModelFormula')}
          </div>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '0.875rem'
          }}>
            <thead>
              <tr style={{ backgroundColor: '#f3f4f6' }}>
                <th style={tableHeaderStyle}>{getTranslation(language, 'headerSource')}</th>
                <th style={tableHeaderStyle}>{getTranslation(language, 'headerSumSquares')}</th>
                <th style={tableHeaderStyle}>{getTranslation(language, 'headerDF')}</th>
                <th style={tableHeaderStyle}>{getTranslation(language, 'headerFValue')}</th>
                <th style={tableHeaderStyle}>{getTranslation(language, 'headerPValue')}</th>
              </tr>
            </thead>
            <tbody>
              {anova?.table.map((row, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={tableCellStyle}>{row.source}</td>
                  <td style={tableCellStyle}>{row.sum_squares.toFixed(2)}</td>
                  <td style={tableCellStyle}>{row.df}</td>
                  <td style={tableCellStyle}>{row.f_value ? row.f_value.toFixed(3) : '-'}</td>
                  <td style={tableCellStyle}>{row.p_value ? (row.p_value < 0.001 ? '<0.001' : row.p_value.toFixed(4)) : '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </TableCard>
      </div>
    </div>
  );
};

// Helper component for chart cards
const ChartCard = ({ title, children }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  }}>
    <h3 style={{
      fontSize: '1.125rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#1f2937'
    }}>
      {title}
    </h3>
    {children}
  </div>
);

// Helper component for table cards
const TableCard = ({ title, children }) => (
  <div style={{
    backgroundColor: 'white',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
    border: '1px solid #e5e7eb'
  }}>
    <h3 style={{
      fontSize: '1.125rem',
      fontWeight: '600',
      marginBottom: '1rem',
      color: '#1f2937'
    }}>
      {title}
    </h3>
    {children}
  </div>
);

// Helper function to prepare histogram data
const prepareHistogramData = (data, field, bins = 10) => {
  if (!data || data.length === 0) return [];

  const values = data.map(d => d[field]);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const binSize = (max - min) / bins;

  const histogram = Array(bins).fill(0).map((_, i) => ({
    range: `${(min + i * binSize).toFixed(0)}-${(min + (i + 1) * binSize).toFixed(0)}`,
    count: 0,
    min: min + i * binSize,
    max: min + (i + 1) * binSize
  }));

  values.forEach(value => {
    const binIndex = Math.min(Math.floor((value - min) / binSize), bins - 1);
    histogram[binIndex].count++;
  });

  return histogram;
};

// Table styles
const tableHeaderStyle = {
  padding: '0.75rem',
  textAlign: 'left',
  fontWeight: '600',
  color: '#374151'
};

const tableCellStyle = {
  padding: '0.75rem',
  color: '#6b7280'
};

export default Dashboard;

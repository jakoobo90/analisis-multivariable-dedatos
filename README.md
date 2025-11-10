# Multivariate Analysis Dashboard

A comprehensive data analysis and visualization project that performs multivariate statistical analysis on shopping data and presents the results through an interactive React dashboard.

## Features

### Backend Analysis (Python)
- **Descriptive Statistics**: Summary statistics including means, standard deviations, and distributions
- **Multiple Regression**: Predicts average spending from monthly income and purchase frequency
- **ANOVA Analysis**: Tests if average spending differs by gender
- **PCA (Principal Component Analysis)**: Dimensionality reduction to identify key patterns
- **K-Means Clustering**: Groups customers into 3 distinct segments

### Frontend Dashboard (React)
- **KPI Cards**: Display key metrics at a glance
- **Interactive Charts** (powered by Recharts):
  - Distribution of Monthly Income (Histogram)
  - Income vs Spending by Gender (Scatter plot)
  - PCA 2D Visualization (Scatter plot)
  - Average Spending by Cluster (Bar chart)
- **Results Tables**:
  - Regression coefficients with statistical significance
  - ANOVA results
- **Responsive Design**: Clean, modern UI that works on all screen sizes

## Project Structure

```
analisis-multivariable/
├── data/
│   └── shopping_data.csv          # Sample shopping data (100 customers)
├── src/
│   └── analysis.py                # Main analysis script
├── reports/
│   ├── json/                      # Exported JSON files
│   │   ├── summary.json
│   │   ├── regression.json
│   │   ├── anova.json
│   │   ├── pca.json
│   │   └── clusters.json
│   └── plots/                     # Generated plots (PNG)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── KPICards.jsx
│   │   │   └── Dashboard.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── public/
│       └── data/                  # JSON files copied here for frontend
├── pyproject.toml
└── README.md
```

## Prerequisites

- **Python**: 3.9 or higher
- **uv**: Python package manager ([install uv](https://github.com/astral-sh/uv))
- **Node.js**: 18 or higher
- **npm**: 9 or higher

## Installation

### 1. Install Python Dependencies

```bash
uv sync
```

This will install:
- pandas
- numpy
- matplotlib
- seaborn
- scikit-learn
- scipy
- statsmodels

### 2. Install Frontend Dependencies

```bash
cd frontend
npm install
```

This will install:
- React 19
- Vite
- Recharts (charting library)

## Usage

### Step 1: Run the Analysis

From the project root directory:

```bash
uv run python src/analysis.py
```

This script will:
1. Load the shopping data from `data/shopping_data.csv`
2. Perform all statistical analyses (regression, ANOVA, PCA, clustering)
3. Export results to JSON files in `reports/json/`
4. Generate visualization plots in `reports/plots/`
5. Copy JSON files to `frontend/public/data/` for the dashboard

Expected output:
```
============================================================
MULTIVARIATE ANALYSIS OF SHOPPING DATA
============================================================
Loaded 100 records
...
✓ Saved summary.json
✓ Saved regression.json
✓ Saved anova.json
✓ Saved pca.json
✓ Saved clusters.json
✓ Copied JSON files to frontend/public/data/
============================================================
ANALYSIS COMPLETE
============================================================
```

### Step 2: Start the Frontend Dashboard

```bash
cd frontend
npm run dev
```

The dashboard will be available at: **http://localhost:5173**

### Step 3: View the Dashboard

Open your browser and navigate to `http://localhost:5173`. You should see:

- **Top Navigation Bar**: Project title
- **KPI Cards**: Key metrics (Total Customers, Avg Income, Avg Frequency, Avg Spending)
- **Charts Section**: Four interactive visualizations
- **Tables Section**: Regression and ANOVA results

## Development

### Running in Development Mode

The frontend uses Vite's hot module replacement (HMR), so any changes to React components will be reflected immediately.

### Building for Production

```bash
cd frontend
npm run build
```

The production-ready files will be in `frontend/dist/`.

### Preview Production Build

```bash
cd frontend
npm run preview
```

## Analysis Details

### Regression Model

**Equation**: `AverageSpending ~ MonthlyIncome + PurchaseFrequency`

The model predicts customer spending based on their income and how frequently they shop.

### ANOVA Test

**Hypothesis**: Does average spending differ significantly between male and female customers?

### PCA Analysis

Reduces the dimensionality of the data (Income, Frequency, Spending) to 2 principal components for visualization.

### K-Means Clustering

Groups customers into 3 clusters based on their shopping behavior:
- **Cluster 0**: Low-income, infrequent shoppers
- **Cluster 1**: Medium-income, moderate shoppers
- **Cluster 2**: High-income, frequent shoppers

## Technologies Used

### Backend
- **Python 3.9+**
- **pandas**: Data manipulation
- **numpy**: Numerical computing
- **matplotlib & seaborn**: Plotting
- **scikit-learn**: PCA and clustering
- **statsmodels**: Regression and ANOVA
- **scipy**: Statistical functions

### Frontend
- **React 19**: UI framework
- **Vite**: Build tool and dev server
- **Recharts**: Charting library
- **JavaScript (ES6+)**: Programming language

## Data Description

The sample dataset (`shopping_data.csv`) contains 100 customer records with the following fields:

- `CustomerID`: Unique identifier
- `Gender`: M (Male) or F (Female)
- `MonthlyIncome`: Monthly income in dollars
- `PurchaseFrequency`: Number of purchases per year
- `AverageSpending`: Average spending per purchase
- `TotalSpending`: Total annual spending

## Troubleshooting

### Issue: "Failed to load data files" in dashboard

**Solution**: Make sure you've run the analysis script first:
```bash
uv run python src/analysis.py
```

### Issue: Module not found errors

**Solution**: Reinstall dependencies:
```bash
uv sync
cd frontend && npm install
```

### Issue: Port 5173 already in use

**Solution**: Kill the existing process or use a different port:
```bash
npm run dev -- --port 3000
```

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Created as a demonstration of multivariate analysis with modern web visualization techniques.

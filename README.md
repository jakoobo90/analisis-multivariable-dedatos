# Multivariate Analysis Dashboard

A comprehensive data analysis and visualization project that performs multivariate statistical analysis on shopping data and presents the results through an interactive React dashboard.

🌐 **Live Demo**: [https://jakoobo90.github.io/analisis-multivariable-dedatos/](https://jakoobo90.github.io/analisis-multivariable-dedatos/)

📊 **Interactive Dashboard** | 🔬 **Statistical Analysis** | 🌍 **Bilingual (EN/ES)**

## Quick Start

```bash
# 1. Install Python dependencies
uv sync

# 2. Run the analysis
uv run python src/analysis.py

# 3. Install frontend dependencies
cd frontend
npm install

# 4. Start the dashboard
npm run dev
```

Visit `http://localhost:5173` to see the dashboard!

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)
- [Deployment to GitHub Pages](#deployment-to-github-pages)
- [Analysis Details](#analysis-details)
- [Technologies Used](#technologies-used)
- [Data Description](#data-description)
- [Key Features Explained](#key-features-explained)
- [Troubleshooting](#troubleshooting)
- [Recent Updates](#recent-updates)
- [Contributing](#contributing)

## Features

### Backend Analysis (Python)
- **Descriptive Statistics**: Summary statistics including means, standard deviations, and distributions
- **Multiple Regression**: Predicts average spending from monthly income and purchase frequency
- **ANOVA Analysis**: Tests if average spending differs by gender
- **PCA (Principal Component Analysis)**: Dimensionality reduction to identify key patterns
- **K-Means Clustering**: Groups customers into 3 distinct segments

### Frontend Dashboard (React)
- **KPI Cards**: Display key metrics at a glance
  - Total number of customers surveyed
  - Average monthly income
  - Average purchase frequency
  - Average spending per purchase
- **Interactive Charts** (powered by Recharts):
  - Distribution of Monthly Income (Histogram)
  - Income vs Spending by Gender (Scatter plot)
  - PCA 2D Visualization (Scatter plot with variance explained)
  - Average Spending by Cluster (Multi-colored bar chart)
- **Results Tables**:
  - Regression coefficients with statistical significance (t-values, p-values)
  - ANOVA results with F-statistics and sum of squares
- **Bilingual Support**: Toggle between English and Spanish with a single click
- **Responsive Design**: Clean, modern UI that works on all screen sizes
- **Survey Information Bar**: Displays total respondents and number of clusters identified

## Project Structure

```
analisis-multivariable/
├── data/
│   └── shopping_data.csv          # Sample shopping data (100 customers)
├── src/
│   └── analysis.py                # Main analysis script (Python)
├── reports/
│   ├── json/                      # Exported JSON files from analysis
│   │   ├── summary.json           # Descriptive statistics
│   │   ├── regression.json        # Regression model results
│   │   ├── anova.json             # ANOVA test results
│   │   ├── pca.json               # PCA analysis results
│   │   └── clusters.json          # K-means clustering results
│   └── plots/                     # Generated plots (PNG)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Top navigation bar
│   │   │   ├── KPICards.jsx       # Key performance indicators
│   │   │   ├── SurveyInfoBar.jsx  # Survey information display
│   │   │   └── Dashboard.jsx      # Main dashboard with charts
│   │   ├── translations.js        # Bilingual text (EN/ES)
│   │   ├── App.jsx                # Main app component
│   │   ├── App.css                # App styles
│   │   ├── index.css              # Global styles
│   │   └── main.jsx               # Entry point
│   ├── public/
│   │   └── data/                  # JSON files copied here for frontend
│   ├── dist/                      # Production build output
│   ├── vite.config.js             # Vite configuration
│   ├── package.json               # Frontend dependencies
│   └── README.md                  # Frontend-specific README
├── .venv/                         # Python virtual environment
├── pyproject.toml                 # Python dependencies (uv)
├── uv.lock                        # Locked dependencies
└── README.md                      # This file
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

## Deployment to GitHub Pages

This project is configured to deploy to GitHub Pages automatically.

### Initial Setup

The project is already configured with:
- `vite.config.js` with the correct base path for GitHub Pages
- `gh-pages` package installed
- Deploy scripts in `package.json`

### Deploy to GitHub Pages

```bash
cd frontend
npm run deploy
```

This command will:
1. Build the production bundle (`npm run build`)
2. Deploy the `dist` folder to the `gh-pages` branch
3. Push to GitHub, making it available at your GitHub Pages URL

### Important Notes

- The data files (JSON) must be in `frontend/public/data/` before building
- Run `uv run python src/analysis.py` first to generate the latest data
- GitHub Pages may take 1-2 minutes to update after deployment
- The site will be available at: `https://<username>.github.io/<repository-name>/`

### Troubleshooting Deployment

If you encounter issues with data not loading on GitHub Pages:

1. Verify JSON files are in `frontend/public/data/`:
   ```bash
   ls frontend/public/data/
   ```

2. Check that the build includes data files:
   ```bash
   ls frontend/dist/data/
   ```

3. Ensure `vite.config.js` has the correct base path:
   ```javascript
   base: '/your-repository-name/'
   ```

4. Clear the gh-pages cache and redeploy:
   ```bash
   cd frontend
   npx gh-pages-clean
   npm run deploy
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

## Key Features Explained

### Bilingual Support (English/Spanish)

The dashboard includes a language toggle button in the navigation bar. All text, labels, and charts automatically update when switching between languages:

- **English**: Default language
- **Spanish (Español)**: Complete translation of all UI elements

Translations are managed in `frontend/src/translations.js` and include:
- Navigation labels
- KPI card titles
- Chart titles and axis labels
- Table headers
- Error messages
- All UI text

### Dashboard Components

#### 1. **KPI Cards**
Displays four key metrics in card format:
- Total Customers Surveyed
- Average Monthly Income
- Average Purchase Frequency
- Average Spending Per Purchase

#### 2. **Survey Information Bar**
Shows the survey scope with:
- Total number of respondents
- Number of customer segments (clusters) identified

#### 3. **Interactive Charts**

**Income Distribution Histogram**
- Shows the distribution of monthly income across all customers
- Bins customers into income ranges
- Helps identify income patterns in the customer base

**Income vs Spending Scatter Plot**
- Compares monthly income against average spending
- Color-coded by gender (Male/Female)
- Shows the relationship between income and spending behavior

**PCA Visualization**
- 2D projection of multidimensional data
- Shows variance explained by each principal component
- Helps identify natural groupings in customer behavior

**Spending by Cluster Bar Chart**
- Displays average spending for each customer segment
- Color-coded for easy identification
- Helps compare spending patterns across clusters

#### 4. **Statistical Tables**

**Regression Results**
- Displays coefficient estimates
- Standard errors
- t-statistics
- p-values (significance levels)
- Model fit statistics (R², Adjusted R², F-statistic)

**ANOVA Results**
- Source of variation breakdown
- Sum of squares
- Degrees of freedom
- F-values
- p-values

## Recent Updates

### v1.0.0 (Latest)
- ✅ Fixed GitHub Pages deployment issue with data file paths
- ✅ Implemented proper base URL handling for production deployment
- ✅ Added bilingual support (English/Spanish)
- ✅ Enhanced dashboard with Survey Information Bar
- ✅ Improved responsive design for mobile devices
- ✅ Added comprehensive documentation

## License

This project is open source and available under the MIT License.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Author

Created as a demonstration of multivariate analysis with modern web visualization techniques.

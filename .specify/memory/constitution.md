<!--
Sync Impact Report:
- Version change: 1.0.0 → 1.0.1
- Modified principles: None (principles unchanged)
- Added sections: Project Overview (clarification of project scope and dataset)
- Removed sections: None
- Templates requiring updates:
  ✅ .specify/templates/plan-template.md (reviewed, compatible)
  ✅ .specify/templates/spec-template.md (reviewed, compatible)
  ✅ .specify/templates/tasks-template.md (reviewed, compatible)
- Follow-up TODOs: None
- Change type: PATCH (added clarifying project overview, no semantic changes to governance)
-->

# Análisis Multivariable - Online Shopping Habits Constitution

## Project Overview

This project performs a multivariate data analysis of online shopping habits. It uses a dataset of 30 people with variables: ID, Age, Gender, MonthlyIncome, PurchaseFrequency, AverageSpending, Satisfaction (1–5), and PreferredCategory. The goal is to clean data, explore it, and apply Multiple Regression, ANOVA, Principal Component Analysis, and K-Means Clustering. The project will generate graphs, tables, and a short report with conclusions.

## Core Principles

### I. Reproducibility First

Every analysis, statistical test, and visualization MUST be fully reproducible from source data:
- All data transformations documented in code (no manual Excel edits)
- Random seeds fixed for stochastic methods (k-means, train/test splits)
- Environment dependencies pinned (requirements.txt with exact versions)
- Clear separation: raw data → processed data → results

**Rationale**: Scientific integrity requires that any reviewer can rerun the analysis and obtain identical results. Manual data manipulation introduces irreproducible steps that invalidate findings.

### II. Statistical Rigor

All statistical methods MUST meet their mathematical assumptions before interpretation:
- Regression diagnostics: check linearity, homoscedasticity, normality of residuals
- ANOVA: verify normality and homogeneity of variance (Levene's test)
- PCA: verify correlation matrix is appropriate (KMO, Bartlett's test)
- Document assumption violations and their handling (transformations, robust methods)

**Rationale**: Violating statistical assumptions produces misleading results. Documenting checks ensures conclusions are valid and defensible.

### III. Data Quality Gates

Dataset integrity MUST be verified before analysis begins:
- Completeness: missing value analysis and imputation strategy documented
- Validity: range checks for numeric variables, categorical levels verified
- Consistency: cross-field validation (e.g., age vs. income plausibility)
- Outlier detection and treatment explicitly documented

**Rationale**: Garbage in, garbage out. Invalid or inconsistent data undermines all subsequent analysis. Transparent documentation builds trust.

### IV. Interpretability Over Complexity

Favor simple, explainable models unless complexity demonstrably improves insight:
- Prefer linear regression before neural networks for relationships
- Document why complex methods chosen (e.g., non-linear patterns detected)
- All results must include plain-language interpretation for stakeholders
- Visualizations prioritized: every statistical result needs a chart

**Rationale**: Analysis serves decision-making. If stakeholders cannot understand results, the analysis fails regardless of technical sophistication.

### V. Code Modularity

Analysis code MUST be structured for clarity and reuse:
- Separate modules: data loading, cleaning, analysis, visualization, reporting
- Functions over scripts: reusable, testable units
- Clear naming conventions: descriptive variable/function names
- Jupyter notebooks for exploration; .py modules for production analysis

**Rationale**: Modular code enables incremental validation, easier debugging, and future extensibility as the project evolves.

## Data Governance

### Data Security & Privacy

- **Synthetic Data Only**: This project uses synthetic data; no real PII involved
- **Access Control**: Raw data in `/data/` folder; processed outputs in `/reports/`
- **Version Control**: DO NOT commit large data files (>10MB); use .gitignore
- **Documentation**: Data dictionary required (variable definitions, units, sources)

### Data Provenance

- **Source Documentation**: Document how synthetic data generated (script, parameters)
- **Transformation Log**: Track all cleaning/transformation steps in code comments
- **Versioning**: Tag data versions if regenerated (e.g., `encuesta_v1.csv`)

## Analysis Workflow

### Pre-Analysis Phase

1. **Data Validation**: Run quality checks (completeness, validity, consistency)
2. **Exploratory Data Analysis (EDA)**: Generate summary statistics, distributions, correlations
3. **Assumption Checks**: Verify statistical method prerequisites BEFORE running tests

### Analysis Execution

1. **Multiple Regression**: Age, gender, income → shopping frequency
   - Check multicollinearity (VIF < 10)
   - Verify residual assumptions (Q-Q plots, residual plots)
2. **ANOVA**: Satisfaction across product categories
   - Levene's test for homogeneity
   - Post-hoc tests if significant (Tukey HSD)
3. **PCA**: Dimensionality reduction
   - KMO > 0.6, Bartlett's p < 0.05
   - Scree plot for component selection
4. **K-Means Clustering**: Group by purchasing behavior
   - Elbow method / silhouette analysis for k selection
   - Validate clusters (descriptive statistics by cluster)

### Post-Analysis Phase

1. **Visualization**: Generate publication-ready figures (matplotlib/seaborn)
2. **Interpretation**: Document findings in plain language
3. **Report Generation**: Compile results into `/reports/final_report.md`

## Technical Standards

### Python Environment

- **Version**: Python 3.8+
- **Core Libraries**: pandas, numpy, scipy, statsmodels, scikit-learn, matplotlib, seaborn
- **Dependency Management**: requirements.txt with pinned versions
- **Code Style**: PEP 8 compliance; use black formatter

### Project Structure

```
analisis-multivariable/
├── data/
│   ├── encuesta.csv           # Raw synthetic dataset
│   └── processed/             # Cleaned data (gitignored if large)
├── src/
│   ├── analysis.py            # Main analysis pipeline
│   ├── data_cleaning.py       # Data quality functions
│   ├── statistical_tests.py   # Regression, ANOVA, PCA
│   ├── clustering.py          # K-means implementation
│   └── visualization.py       # Plotting utilities
├── reports/
│   ├── figures/               # Output charts (PNG/SVG)
│   ├── tables/                # Summary statistics (CSV)
│   └── final_report.md        # Presentation-ready findings
├── notebooks/                 # Exploratory Jupyter notebooks
├── tests/                     # Unit tests for functions (optional)
├── requirements.txt           # Python dependencies
└── README.md                  # Project overview & quickstart
```

### Output Standards

- **Figures**: 300 DPI for publication; labeled axes with units; legends required
- **Tables**: CSV format with headers; summary statistics include n, mean, SD, min, max
- **Reports**: Markdown format; include methodology, assumptions, results, interpretation

## Governance

### Amendment Process

1. **Proposal**: Document proposed change and rationale
2. **Review**: Verify impact on existing templates and workflows
3. **Approval**: Update constitution and increment version
4. **Migration**: Update dependent files (plan.md, spec.md, tasks.md)

### Version Semantics

- **MAJOR**: Breaking changes (e.g., removing a core principle, changing project structure)
- **MINOR**: Additive changes (e.g., new principle, expanded section)
- **PATCH**: Clarifications, typos, non-semantic refinements

### Compliance Review

- **Pre-Analysis**: Verify data quality gates passed before statistical tests
- **Mid-Analysis**: Check assumption diagnostics documented
- **Pre-Report**: Ensure all visualizations and interpretations present

All analysis workflows MUST verify compliance with statistical rigor and reproducibility principles before delivering results. Complexity must be justified; when simpler methods suffice, use them.

**Version**: 1.0.1 | **Ratified**: 2025-11-09 | **Last Amended**: 2025-11-09

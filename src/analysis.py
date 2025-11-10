"""
Multivariate Analysis Script for Shopping Data
Performs regression, ANOVA, PCA, and clustering analysis
Exports results as both plots and JSON files for the React dashboard
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
from scipy import stats
import statsmodels.api as sm
from statsmodels.formula.api import ols
import json
import os
import shutil

# Set style for plots
sns.set_style("whitegrid")
plt.rcParams['figure.figsize'] = (10, 6)

def load_data(filepath='data/shopping_data.csv'):
    """Load the shopping data"""
    df = pd.read_csv(filepath)
    print(f"Loaded {len(df)} records")
    print(f"Columns: {df.columns.tolist()}")
    return df

def descriptive_statistics(df):
    """Generate descriptive statistics and export to JSON"""
    print("\n=== Descriptive Statistics ===")
    desc = df.describe()
    print(desc)

    # Create summary JSON
    summary = {
        "n": int(len(df)),
        "mean_income": float(df['MonthlyIncome'].mean()),
        "mean_frequency": float(df['PurchaseFrequency'].mean()),
        "mean_spending": float(df['AverageSpending'].mean()),
        "std_income": float(df['MonthlyIncome'].std()),
        "std_frequency": float(df['PurchaseFrequency'].std()),
        "std_spending": float(df['AverageSpending'].std()),
        "min_income": float(df['MonthlyIncome'].min()),
        "max_income": float(df['MonthlyIncome'].max()),
        "gender_counts": df['Gender'].value_counts().to_dict()
    }

    # Save summary JSON
    os.makedirs('reports/json', exist_ok=True)
    with open('reports/json/summary.json', 'w') as f:
        json.dump(summary, f, indent=2)
    print("[OK] Saved summary.json")

    return summary

def multiple_regression(df):
    """Perform multiple regression analysis and export to JSON"""
    print("\n=== Multiple Regression Analysis ===")
    print("Predicting AverageSpending from MonthlyIncome and PurchaseFrequency")

    # Prepare data
    X = df[['MonthlyIncome', 'PurchaseFrequency']]
    X = sm.add_constant(X)
    y = df['AverageSpending']

    # Fit model
    model = sm.OLS(y, X).fit()
    print(model.summary())

    # Extract coefficients and statistics
    regression_results = {
        "r_squared": float(model.rsquared),
        "adj_r_squared": float(model.rsquared_adj),
        "f_statistic": float(model.fvalue),
        "f_pvalue": float(model.f_pvalue),
        "coefficients": [
            {
                "variable": "Intercept",
                "coefficient": float(model.params['const']),
                "std_error": float(model.bse['const']),
                "t_value": float(model.tvalues['const']),
                "p_value": float(model.pvalues['const'])
            },
            {
                "variable": "MonthlyIncome",
                "coefficient": float(model.params['MonthlyIncome']),
                "std_error": float(model.bse['MonthlyIncome']),
                "t_value": float(model.tvalues['MonthlyIncome']),
                "p_value": float(model.pvalues['MonthlyIncome'])
            },
            {
                "variable": "PurchaseFrequency",
                "coefficient": float(model.params['PurchaseFrequency']),
                "std_error": float(model.bse['PurchaseFrequency']),
                "t_value": float(model.tvalues['PurchaseFrequency']),
                "p_value": float(model.pvalues['PurchaseFrequency'])
            }
        ]
    }

    # Save regression JSON
    with open('reports/json/regression.json', 'w') as f:
        json.dump(regression_results, f, indent=2)
    print("[OK] Saved regression.json")

    return model, regression_results

def anova_analysis(df):
    """Perform ANOVA analysis and export to JSON"""
    print("\n=== ANOVA Analysis ===")
    print("Testing if AverageSpending differs by Gender")

    # Perform ANOVA
    model = ols('AverageSpending ~ C(Gender)', data=df).fit()
    anova_table = sm.stats.anova_lm(model, typ=2)
    print(anova_table)

    # Extract ANOVA results
    anova_results = {
        "groups": ["Gender", "Residual"],
        "table": [
            {
                "source": "Gender",
                "sum_squares": float(anova_table.loc['C(Gender)', 'sum_sq']),
                "df": int(anova_table.loc['C(Gender)', 'df']),
                "f_value": float(anova_table.loc['C(Gender)', 'F']),
                "p_value": float(anova_table.loc['C(Gender)', 'PR(>F)'])
            },
            {
                "source": "Residual",
                "sum_squares": float(anova_table.loc['Residual', 'sum_sq']),
                "df": int(anova_table.loc['Residual', 'df']),
                "f_value": None,
                "p_value": None
            }
        ],
        "means_by_group": df.groupby('Gender')['AverageSpending'].mean().to_dict()
    }

    # Save ANOVA JSON
    with open('reports/json/anova.json', 'w') as f:
        json.dump(anova_results, f, indent=2)
    print("[OK] Saved anova.json")

    return anova_results

def pca_analysis(df):
    """Perform PCA analysis and export to JSON"""
    print("\n=== PCA Analysis ===")

    # Select numerical features
    features = ['MonthlyIncome', 'PurchaseFrequency', 'AverageSpending']
    X = df[features]

    # Standardize
    scaler = StandardScaler()
    X_scaled = scaler.fit_transform(X)

    # Apply PCA
    pca = PCA(n_components=2)
    principal_components = pca.fit_transform(X_scaled)

    print(f"Explained variance ratio: {pca.explained_variance_ratio_}")
    print(f"Total variance explained: {pca.explained_variance_ratio_.sum():.2%}")

    # Create PCA results
    pca_results = {
        "explained_variance": pca.explained_variance_.tolist(),
        "explained_variance_ratio": pca.explained_variance_ratio_.tolist(),
        "components": pca.components_.tolist(),
        "feature_names": features,
        "data_points": [
            {
                "customer_id": int(row['CustomerID']),
                "pc1": float(principal_components[i, 0]),
                "pc2": float(principal_components[i, 1]),
                "gender": row['Gender']
            }
            for i, (_, row) in enumerate(df.iterrows())
        ]
    }

    # Save PCA JSON
    with open('reports/json/pca.json', 'w') as f:
        json.dump(pca_results, f, indent=2)
    print("[OK] Saved pca.json")

    # Create PCA plot
    os.makedirs('reports/plots', exist_ok=True)
    plt.figure(figsize=(10, 6))
    colors = {'M': 'blue', 'F': 'red'}
    for gender in df['Gender'].unique():
        mask = df['Gender'] == gender
        plt.scatter(principal_components[mask, 0],
                   principal_components[mask, 1],
                   c=colors[gender],
                   label=f'Gender {gender}',
                   alpha=0.6,
                   s=100)
    plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.2%} variance)')
    plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.2%} variance)')
    plt.title('PCA: Customer Shopping Behavior')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('reports/plots/pca_scatter.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("[OK] Saved pca_scatter.png")

    return pca_results, X_scaled

def clustering_analysis(df, X_scaled):
    """Perform K-Means clustering and export to JSON"""
    print("\n=== K-Means Clustering Analysis ===")

    # Perform K-Means with k=3
    n_clusters = 3
    kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init=10)
    clusters = kmeans.fit_predict(X_scaled)

    df['Cluster'] = clusters

    print(f"Cluster sizes: {pd.Series(clusters).value_counts().sort_index().to_dict()}")

    # Get cluster centers (in original scale)
    centers = kmeans.cluster_centers_

    # Create clustering results
    clustering_results = {
        "n_clusters": n_clusters,
        "cluster_labels": clusters.tolist(),
        "cluster_sizes": pd.Series(clusters).value_counts().sort_index().to_dict(),
        "cluster_centers_standardized": centers.tolist(),
        "feature_names": ['MonthlyIncome', 'PurchaseFrequency', 'AverageSpending'],
        "data_points": [
            {
                "customer_id": int(row['CustomerID']),
                "cluster": int(row['Cluster']),
                "monthly_income": float(row['MonthlyIncome']),
                "purchase_frequency": float(row['PurchaseFrequency']),
                "average_spending": float(row['AverageSpending'])
            }
            for _, row in df.iterrows()
        ],
        "cluster_statistics": []
    }

    # Add cluster statistics
    for i in range(n_clusters):
        cluster_data = df[df['Cluster'] == i]
        clustering_results['cluster_statistics'].append({
            "cluster_id": i,
            "size": int(len(cluster_data)),
            "mean_income": float(cluster_data['MonthlyIncome'].mean()),
            "mean_frequency": float(cluster_data['PurchaseFrequency'].mean()),
            "mean_spending": float(cluster_data['AverageSpending'].mean())
        })

    # Save clustering JSON
    with open('reports/json/clusters.json', 'w') as f:
        json.dump(clustering_results, f, indent=2)
    print("[OK] Saved clusters.json")

    # Create cluster visualization
    plt.figure(figsize=(10, 6))
    scatter = plt.scatter(df['MonthlyIncome'],
                         df['AverageSpending'],
                         c=clusters,
                         cmap='viridis',
                         alpha=0.6,
                         s=100,
                         edgecolors='black',
                         linewidth=0.5)
    plt.xlabel('Monthly Income ($)')
    plt.ylabel('Average Spending ($)')
    plt.title('K-Means Clustering (k=3)')
    plt.colorbar(scatter, label='Cluster')
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('reports/plots/clusters.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("[OK] Saved clusters.png")

    return clustering_results

def create_visualizations(df):
    """Create additional visualizations"""
    print("\n=== Creating Visualizations ===")

    # 1. Income distribution histogram
    plt.figure(figsize=(10, 6))
    plt.hist(df['MonthlyIncome'], bins=20, edgecolor='black', alpha=0.7, color='steelblue')
    plt.xlabel('Monthly Income ($)')
    plt.ylabel('Frequency')
    plt.title('Distribution of Monthly Income')
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('reports/plots/income_histogram.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("[OK] Saved income_histogram.png")

    # 2. Income vs Spending scatter by Gender
    plt.figure(figsize=(10, 6))
    colors = {'M': 'blue', 'F': 'red'}
    for gender in df['Gender'].unique():
        mask = df['Gender'] == gender
        plt.scatter(df[mask]['MonthlyIncome'],
                   df[mask]['AverageSpending'],
                   c=colors[gender],
                   label=f'Gender {gender}',
                   alpha=0.6,
                   s=100)
    plt.xlabel('Monthly Income ($)')
    plt.ylabel('Average Spending ($)')
    plt.title('Income vs Spending by Gender')
    plt.legend()
    plt.grid(True, alpha=0.3)
    plt.tight_layout()
    plt.savefig('reports/plots/income_vs_spending.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("[OK] Saved income_vs_spending.png")

    # 3. Spending by Cluster boxplot
    plt.figure(figsize=(10, 6))
    df.boxplot(column='AverageSpending', by='Cluster', grid=True)
    plt.xlabel('Cluster')
    plt.ylabel('Average Spending ($)')
    plt.title('Average Spending by Cluster')
    plt.suptitle('')  # Remove default title
    plt.tight_layout()
    plt.savefig('reports/plots/spending_by_cluster.png', dpi=300, bbox_inches='tight')
    plt.close()
    print("[OK] Saved spending_by_cluster.png")

def copy_json_to_frontend():
    """Copy JSON files to frontend public/data directory"""
    print("\n=== Copying JSON files to frontend ===")

    # Create frontend data directory if it doesn't exist
    frontend_data_dir = 'frontend/public/data'
    os.makedirs(frontend_data_dir, exist_ok=True)

    # Copy all JSON files
    json_files = ['summary.json', 'regression.json', 'anova.json', 'pca.json', 'clusters.json']
    for filename in json_files:
        src = f'reports/json/{filename}'
        dst = f'{frontend_data_dir}/{filename}'
        if os.path.exists(src):
            shutil.copy2(src, dst)
            print(f"[OK] Copied {filename} to frontend/public/data/")
        else:
            print(f"[WARN] Warning: {filename} not found")

def main():
    """Main analysis pipeline"""
    print("=" * 60)
    print("MULTIVARIATE ANALYSIS OF SHOPPING DATA")
    print("=" * 60)

    # Load data
    df = load_data()

    # Perform analyses
    summary = descriptive_statistics(df)
    regression_model, regression_results = multiple_regression(df)
    anova_results = anova_analysis(df)
    pca_results, X_scaled = pca_analysis(df)
    clustering_results = clustering_analysis(df, X_scaled)

    # Create visualizations
    create_visualizations(df)

    # Copy JSON files to frontend
    copy_json_to_frontend()

    print("\n" + "=" * 60)
    print("ANALYSIS COMPLETE")
    print("=" * 60)
    print(f"[OK] JSON files saved to: reports/json/")
    print(f"[OK] Plots saved to: reports/plots/")
    print(f"[OK] Data copied to: frontend/public/data/")
    print("\nNext steps:")
    print("1. cd frontend")
    print("2. npm install")
    print("3. npm run dev")
    print("4. Open http://localhost:5173")

if __name__ == "__main__":
    main()

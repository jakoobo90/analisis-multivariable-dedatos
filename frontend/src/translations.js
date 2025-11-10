export const translations = {
  en: {
    // Navbar
    navTitle: "Shopping Analytics Dashboard",
    navSubtitle: "Multivariate Analysis Visualization",

    // KPI Cards
    kpiTotalCustomers: "Total Customers",
    kpiAvgIncome: "Avg Monthly Income",
    kpiAvgFrequency: "Avg Purchase Frequency",
    kpiAvgSpending: "Avg Spending",

    // Loading states
    loadingKPIs: "Loading KPIs...",
    loadingDashboard: "Loading dashboard data...",

    // Error messages
    errorLoadingData: "Error loading data",
    errorMessage: "Please run the analysis script first:",

    // Chart titles
    chartIncomeDistribution: "Distribution of Monthly Income",
    chartIncomeVsSpending: "Income vs Spending by Gender",
    chartPCA: "PCA: Principal Components Analysis",
    chartSpendingByCluster: "Average Spending by Cluster",

    // Chart labels
    labelIncome: "Monthly Income (MXN)",
    labelFrequency: "Frequency",
    labelSpending: "Average Spending (MXN)",
    labelPC1: "PC1",
    labelPC2: "PC2",
    labelVariance: "variance",
    labelCustomers: "Customers",
    labelMale: "Male",
    labelFemale: "Female",
    labelCluster: "Cluster",

    // Table titles
    tableRegressionTitle: "Regression Results",
    tableAnovaTitle: "ANOVA Results",

    // Regression table
    regressionModel: "Model:",
    regressionRSquared: "R²:",
    regressionAdjRSquared: "Adj. R²:",
    regressionFStatistic: "F-statistic:",

    // Table headers
    headerVariable: "Variable",
    headerCoefficient: "Coefficient",
    headerStdError: "Std Error",
    headerTValue: "t-value",
    headerPValue: "p-value",
    headerSource: "Source",
    headerSumSquares: "Sum of Squares",
    headerDF: "df",
    headerFValue: "F-value",

    // Variables
    varIntercept: "Intercept",
    varMonthlyIncome: "MonthlyIncome",
    varPurchaseFrequency: "PurchaseFrequency",
    varGender: "Gender",
    varResidual: "Residual",

    // ANOVA model
    anovaModel: "Model:",
    anovaModelFormula: "AverageSpending ~ Gender",

    // Survey Info Bar
    surveyOverview: "Overview",
    surveyParticipants: "Participants",
    surveyAreas: "Areas",
    surveyDetails: "Details",
    surveyTotalRespondents: "Total Respondents",
    surveyGenderDistribution: "Gender Distribution",
    surveyCustomerGroups: "Customer Groups",
    surveyDataStatus: "Data Status",
    surveyComplete: "Complete",
    surveyParticipantsList: "Participants List",
    surveyShowingFirst: "Showing first",
    surveyOf: "of",
    surveyCustomer: "Customer",
    surveyViewingSubset: "Viewing",
    surveyTotalParticipants: "total participants",
    surveyGeographicDistribution: "Geographic Distribution",
    surveyPeople: "people",
    surveyCollectionPeriod: "Collection Period",
    surveyMethodology: "Methodology",
    surveyRandomSampling: "Random Sampling",
    surveyDataType: "Data Type",
    surveyQuantitative: "Quantitative",
    surveyVariables: "Variables",
    surveyIncomeRange: "Income Range",
    surveyAnalysisTypes: "Analysis Types",
    surveyMultivariate: "Regression, ANOVA, PCA, Clustering",

    // Variable descriptions
    varDescVariable: "Variable",
    varDescDescription: "Description",
    varDescID: "ID",
    varDescIDDesc: "Respondent identification",
    varDescAge: "Age",
    varDescAgeDesc: "Age of the respondent (in years)",
    varDescGender: "Gender",
    varDescGenderDesc: "Gender of the respondent (Male/Female)",
    varDescMonthlyIncome: "Monthly Income",
    varDescMonthlyIncomeDesc: "Monthly income of the respondent (in pesos)",
    varDescPurchaseFrequency: "Purchase Frequency",
    varDescPurchaseFrequencyDesc: "Number of online purchases made in the last month",
    varDescAvgSpending: "Average Spending",
    varDescAvgSpendingDesc: "Average spending per online purchase (in pesos)",
    varDescSatisfaction: "Satisfaction",
    varDescSatisfactionDesc: "Satisfaction level with online purchases (scale 1-5)",
    varDescPreferredCategory: "Preferred Category",
    varDescPreferredCategoryDesc: "Preferred product category (Electronics, Clothing, Food, etc.)",

    // Analysis Methods
    analysisMethodsTitle: "Statistical Analysis Methods",
    analysisMultipleRegression: "Multiple Regression",
    analysisMultipleRegressionDesc: "Evaluate how monthly income, age, and gender affect the frequency of online purchases.",
    analysisANOVA: "Analysis of Variance (ANOVA)",
    analysisANOVADesc: "Compare satisfaction levels across different product categories.",
    analysisPCA: "Principal Component Analysis (PCA)",
    analysisPCADesc: "Reduce data dimensionality and explore underlying structure.",
    analysisCluster: "Cluster Analysis",
    analysisClusterDesc: "Group respondents according to their shopping habits and average spending.",
  },
  es: {
    // Navbar
    navTitle: "Panel de Análisis de Compras",
    navSubtitle: "Visualización de Análisis Multivariable",

    // KPI Cards
    kpiTotalCustomers: "Total de Clientes",
    kpiAvgIncome: "Ingreso Mensual Promedio",
    kpiAvgFrequency: "Frecuencia de Compra Promedio",
    kpiAvgSpending: "Gasto Promedio",

    // Loading states
    loadingKPIs: "Cargando indicadores...",
    loadingDashboard: "Cargando datos del panel...",

    // Error messages
    errorLoadingData: "Error al cargar datos",
    errorMessage: "Por favor ejecute el script de análisis primero:",

    // Chart titles
    chartIncomeDistribution: "Distribución de Ingreso Mensual",
    chartIncomeVsSpending: "Ingreso vs Gasto por Género",
    chartPCA: "ACP: Análisis de Componentes Principales",
    chartSpendingByCluster: "Gasto Promedio por Grupo",

    // Chart labels
    labelIncome: "Ingreso Mensual (MXN)",
    labelFrequency: "Frecuencia",
    labelSpending: "Gasto Promedio (MXN)",
    labelPC1: "CP1",
    labelPC2: "CP2",
    labelVariance: "varianza",
    labelCustomers: "Clientes",
    labelMale: "Masculino",
    labelFemale: "Femenino",
    labelCluster: "Grupo",

    // Table titles
    tableRegressionTitle: "Resultados de Regresión",
    tableAnovaTitle: "Resultados de ANOVA",

    // Regression table
    regressionModel: "Modelo:",
    regressionRSquared: "R²:",
    regressionAdjRSquared: "R² Ajustado:",
    regressionFStatistic: "Estadístico F:",

    // Table headers
    headerVariable: "Variable",
    headerCoefficient: "Coeficiente",
    headerStdError: "Error Estándar",
    headerTValue: "Valor t",
    headerPValue: "Valor p",
    headerSource: "Fuente",
    headerSumSquares: "Suma de Cuadrados",
    headerDF: "gl",
    headerFValue: "Valor F",

    // Variables
    varIntercept: "Intercepto",
    varMonthlyIncome: "IngresoMensual",
    varPurchaseFrequency: "FrecuenciaCompra",
    varGender: "Género",
    varResidual: "Residual",

    // ANOVA model
    anovaModel: "Modelo:",
    anovaModelFormula: "GastoPromedio ~ Género",

    // Survey Info Bar
    surveyOverview: "Resumen",
    surveyParticipants: "Participantes",
    surveyAreas: "Áreas",
    surveyDetails: "Detalles",
    surveyTotalRespondents: "Total de Encuestados",
    surveyGenderDistribution: "Distribución por Género",
    surveyCustomerGroups: "Grupos de Clientes",
    surveyDataStatus: "Estado de Datos",
    surveyComplete: "Completo",
    surveyParticipantsList: "Lista de Participantes",
    surveyShowingFirst: "Mostrando primeros",
    surveyOf: "de",
    surveyCustomer: "Cliente",
    surveyViewingSubset: "Visualizando",
    surveyTotalParticipants: "participantes totales",
    surveyGeographicDistribution: "Distribución Geográfica",
    surveyPeople: "personas",
    surveyCollectionPeriod: "Período de Recolección",
    surveyMethodology: "Metodología",
    surveyRandomSampling: "Muestreo Aleatorio",
    surveyDataType: "Tipo de Datos",
    surveyQuantitative: "Cuantitativo",
    surveyVariables: "Variables",
    surveyIncomeRange: "Rango de Ingresos",
    surveyAnalysisTypes: "Tipos de Análisis",
    surveyMultivariate: "Regresión, ANOVA, ACP, Agrupamiento",

    // Variable descriptions
    varDescVariable: "Variable",
    varDescDescription: "Descripción",
    varDescID: "ID",
    varDescIDDesc: "Identificación del encuestado",
    varDescAge: "Edad",
    varDescAgeDesc: "Edad del encuestado (en años)",
    varDescGender: "Género",
    varDescGenderDesc: "Género del encuestado (Masculino/Femenino)",
    varDescMonthlyIncome: "Ingreso Mensual",
    varDescMonthlyIncomeDesc: "Ingreso mensual del encuestado (en pesos)",
    varDescPurchaseFrequency: "Frecuencia de Compras",
    varDescPurchaseFrequencyDesc: "Número de compras en línea realizadas en el último mes",
    varDescAvgSpending: "Gastos Promedio",
    varDescAvgSpendingDesc: "Gastos promedio por compra en línea (en pesos)",
    varDescSatisfaction: "Satisfacción",
    varDescSatisfactionDesc: "Nivel de satisfacción con las compras en línea (escala 1-5)",
    varDescPreferredCategory: "Categoría Preferida",
    varDescPreferredCategoryDesc: "Categoría de productos preferida (Electrónica, Ropa, Alimentos, etc.)",

    // Analysis Methods
    analysisMethodsTitle: "Métodos de Análisis Estadístico",
    analysisMultipleRegression: "Regresión Múltiple",
    analysisMultipleRegressionDesc: "Evaluar cómo el ingreso mensual, la edad y el género afectan la frecuencia de compras en línea.",
    analysisANOVA: "Análisis de Varianza (ANOVA)",
    analysisANOVADesc: "Comparar el nivel de satisfacción entre diferentes categorías de productos.",
    analysisPCA: "Análisis de Componentes Principales (PCA)",
    analysisPCADesc: "Reducir la dimensionalidad de los datos y explorar la estructura subyacente.",
    analysisCluster: "Análisis de Clúster",
    analysisClusterDesc: "Agrupar encuestados según sus hábitos de compra y gastos promedio.",
  }
};

export const getTranslation = (lang, key) => {
  return translations[lang]?.[key] || translations.en[key] || key;
};

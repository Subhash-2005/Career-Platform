module.exports = {
  role: "Data Analyst",

  sections: [

    // ========================= DATA ANALYSIS TOOLS =========================
    {
      title: "Data Analysis Tools",

      skills: [

        {
          topic: "Excel",
          levels: [

            {
              name: "Basics",
              explanation: "Excel is used for basic data analysis and manipulation.",
              keyIdeas: [
                "Cell referencing",
                "Basic formulas (SUM, AVERAGE)",
                "Sorting & Filtering"
              ],
              patterns: [
                "Data cleaning",
                "Basic aggregation"
              ],
              example: "Calculate total sales using SUM.",
              problems: [],
              tips: ["Master shortcuts to improve speed."]
            },

            {
              name: "Advanced Excel",
              explanation: "Advanced Excel helps in complex data analysis.",
              keyIdeas: [
                "Pivot Tables",
                "VLOOKUP / XLOOKUP",
                "Conditional formatting"
              ],
              patterns: [
                "Data summarization",
                "Lookup operations"
              ],
              example: "Create pivot table for sales analysis.",
              problems: [],
              tips: ["Practice real datasets."]
            }

          ]
        },

        {
          topic: "SQL",
          levels: [

            {
              name: "Basics",
              explanation: "SQL is used to query relational databases.",
              keyIdeas: [
                "SELECT, WHERE",
                "Filtering data",
                "Basic aggregation"
              ],
              patterns: [
                "Data retrieval",
                "Filtering queries"
              ],
              example: "Fetch all users with age > 25.",
              problems: [],
              tips: ["Practice queries daily."]
            },

            {
              name: "Joins & Aggregations",
              explanation: "Combine multiple tables using joins.",
              keyIdeas: [
                "INNER JOIN",
                "GROUP BY",
                "HAVING"
              ],
              patterns: [
                "Multi-table queries",
                "Aggregation queries"
              ],
              example: "Join orders and customers.",
              problems: [],
              tips: ["Understand join conditions clearly."]
            },

            {
              name: "Advanced SQL",
              explanation: "Advanced SQL handles complex queries.",
              keyIdeas: [
                "Subqueries",
                "Window functions",
                "CTEs"
              ],
              patterns: [
                "Ranking queries",
                "Running totals"
              ],
              example: "Top 3 salaries per department.",
              problems: [],
              tips: ["Window functions are important for interviews."]
            }

          ]
        }

      ]
    },

    // ========================= PROGRAMMING =========================
    {
      title: "Programming for Data Analysis",

      skills: [

        {
          topic: "Python",
          levels: [

            {
              name: "Basics",
              explanation: "Python is widely used for data analysis.",
              keyIdeas: [
                "Variables",
                "Loops",
                "Functions"
              ],
              patterns: [
                "Data processing",
                "Automation"
              ],
              example: "Loop through dataset.",
              problems: [],
              tips: ["Focus on logic building."]
            },

            {
              name: "Pandas",
              explanation: "Pandas is used for data manipulation.",
              keyIdeas: [
                "DataFrames",
                "Filtering",
                "Groupby"
              ],
              patterns: [
                "Data cleaning",
                "Aggregation"
              ],
              example: "Filter rows based on condition.",
              problems: [],
              tips: ["Practice on CSV datasets."]
            },

            {
              name: "NumPy",
              explanation: "NumPy is used for numerical operations.",
              keyIdeas: [
                "Arrays",
                "Vectorization"
              ],
              patterns: [
                "Mathematical computations"
              ],
              example: "Perform matrix operations.",
              problems: [],
              tips: ["Useful for performance optimization."]
            }

          ]
        }

      ]
    },

    // ========================= DATA VISUALIZATION =========================
    {
      title: "Data Visualization",

      skills: [

        {
          topic: "Power BI",
          levels: [

            {
              name: "Basics",
              explanation: "Power BI helps create dashboards.",
              keyIdeas: [
                "Charts",
                "Filters",
                "Reports"
              ],
              patterns: [
                "Dashboard creation"
              ],
              example: "Create sales dashboard.",
              problems: [],
              tips: ["Focus on storytelling."]
            }

          ]
        },

        {
          topic: "Tableau",
          levels: [

            {
              name: "Visualization",
              explanation: "Tableau is used for advanced visualizations.",
              keyIdeas: [
                "Charts",
                "Dashboards"
              ],
              patterns: [
                "Data storytelling"
              ],
              example: "Build interactive dashboard.",
              problems: [],
              tips: ["Keep visuals simple."]
            }

          ]
        },

        {
          topic: "Matplotlib & Seaborn",
          levels: [

            {
              name: "Basics",
              explanation: "Libraries for Python visualization.",
              keyIdeas: [
                "Line plots",
                "Bar charts",
                "Heatmaps"
              ],
              patterns: [
                "Data visualization"
              ],
              example: "Plot data trends.",
              problems: [],
              tips: ["Use for quick analysis."]
            }

          ]
        }

      ]
    },

    // ========================= STATISTICS =========================
    {
      title: "Statistics",

      skills: [

        {
          topic: "Statistics",
          levels: [

            {
              name: "Basics",
              explanation: "Statistics helps interpret data.",
              keyIdeas: [
                "Mean, Median, Mode",
                "Variance",
                "Standard deviation"
              ],
              patterns: [
                "Data distribution"
              ],
              example: "Calculate average salary.",
              problems: [],
              tips: ["Very important for interviews."]
            },

            {
              name: "Probability",
              explanation: "Probability helps in predictions.",
              keyIdeas: [
                "Conditional probability",
                "Bayes theorem"
              ],
              patterns: [
                "Event probability"
              ],
              example: "Probability of event A.",
              problems: [],
              tips: ["Understand basics clearly."]
            }

          ]
        }

      ]
    },

    // ========================= ADVANCED ANALYTICS & DATA ENGINEERING =========================
    {
      title: "Advanced Analytics & ETL",

      skills: [
        {
          topic: "A/B Testing & Experimentation",
          levels: [
            {
              name: "A/B Testing Framework",
              explanation: "Conducting controlled experiments to make product decisions.",
              keyIdeas: [
                "Hypothesis testing",
                "Sample size and statistical significance",
                "P-value and confidence intervals"
              ],
              patterns: [
                "Experiment design",
                "Metrics selection"
              ],
              example: "Test if a green button increases signups vs a red button.",
              problems: [],
              tips: ["Crucial for Product Analyst roles at big tech companies."]
            }
          ]
        },
        {
          topic: "Data Warehousing & ETL",
          levels: [
            {
              name: "Cloud Data Warehouses",
              explanation: "Understanding modern data storage solutions.",
              keyIdeas: [
                "Snowflake & BigQuery",
                "Star Schema vs Snowflake Schema",
                "ETL vs ELT pipelines"
              ],
              patterns: [
                "Data modeling",
                "Pipeline architecture"
              ],
              example: "Extract data from API, load to Snowflake, and transform with dbt.",
              problems: [],
              tips: ["Data Analysts frequently query data warehouses directly."]
            }
          ]
        }
      ]
    },

    // ========================= MACHINE LEARNING =========================
    {
      title: "Machine Learning Basics",

      skills: [

        {
          topic: "Machine Learning Basics",
          levels: [

            {
              name: "Supervised Learning",
              explanation: "Algorithms that learn from labeled data.",
              keyIdeas: [
                "Linear Regression",
                "Logistic Regression",
                "Decision Trees"
              ],
              patterns: [
                "Predictive modeling",
                "Classification"
              ],
              example: "Predict house prices based on size.",
              problems: [],
              tips: ["Understand the math behind the models."]
            },

            {
              name: "Unsupervised Learning",
              explanation: "Algorithms that learn from unlabeled data.",
              keyIdeas: [
                "K-Means Clustering",
                "PCA"
              ],
              patterns: [
                "Customer segmentation"
              ],
              example: "Group customers based on spending habits.",
              problems: [],
              tips: ["Focus on determining the right number of clusters."]
            }

          ]
        }

      ]
    },

    // ========================= PROJECTS =========================
    {
      title: "Projects",

      skills: [

        {
          topic: "Data Analysis Projects",
          levels: [

            {
              name: "Beginner Project",
              explanation: "Analyze dataset and generate insights.",
              keyIdeas: [
                "Data cleaning",
                "Visualization"
              ],
              patterns: [],
              example: "Analyze sales dataset.",
              problems: [],
              tips: ["Start with Kaggle datasets."]
            },

            {
              name: "Advanced Project",
              explanation: "End-to-end analytics project.",
              keyIdeas: [
                "Data pipeline",
                "Dashboard creation"
              ],
              patterns: [],
              example: "Build business dashboard.",
              problems: [],
              tips: ["Deploy your project."]
            }

          ]
        }

      ]
    }

  ]
};
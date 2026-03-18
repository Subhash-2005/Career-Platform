module.exports = {
  role: "Machine Learning Engineer",

  sections: [

    // ========================= PROGRAMMING & DATA =========================
    {
      title: "Programming & Data Processing",

      skills: [
        {
          topic: "Python for ML",
          levels: [
            {
              name: "Data Manipulation",
              explanation: "Using Pandas and NumPy to clean and prepare data for models.",
              keyIdeas: [
                "Vectorized operations",
                "Data imputation",
                "Feature engineering"
              ],
              patterns: [
                "Data cleaning pipeline",
                "Feature extraction"
              ],
              example: "Fill missing values with median using Pandas.",
              problems: [],
              tips: ["Data preparation is 80% of an ML Engineer's job."]
            }
          ]
        }
      ]
    },

    // ========================= MATH & STATS =========================
    {
      title: "Mathematics & Statistics",

      skills: [
        {
          topic: "Linear Algebra & Calculus",
          levels: [
            {
              name: "Math Foundations",
              explanation: "The mathematical backbone of algorithms and backpropagation.",
              keyIdeas: [
                "Matrices and Vectors",
                "Eigenvalues & Eigenvectors",
                "Derivatives & Gradients"
              ],
              patterns: [
                "Gradient Descent",
                "Dimensionality Reduction"
              ],
              example: "Calculate the gradient of the loss function.",
              problems: [],
              tips: ["Crucial for deeply understanding Deep Learning."]
            }
          ]
        }
      ]
    },

    // ========================= CORE MACHINE LEARNING =========================
    {
      title: "Machine Learning",

      skills: [
        {
          topic: "Feature Engineering & Selection",
          levels: [
            {
              name: "Advanced Preprocessing",
              explanation: "Extracting optimal signals from raw data to maximize model performance.",
              keyIdeas: [
                "Encoding (One-Hot, Target)",
                "Scaling & Normalization",
                "Feature Importance (SHAP values)"
              ],
              patterns: [
                "Handling Imbalance",
                "Outlier Detection"
              ],
              example: "Use SMOTE to fix an imbalanced dataset.",
              problems: [],
              tips: ["Better features usually beat better models."]
            }
          ]
        },
        {
          topic: "Supervised Learning Models",
          levels: [
            {
              name: "Classification & Regression",
              explanation: "Training algorithms on labeled data to predict outcomes.",
              keyIdeas: [
                "Linear & Logistic Regression",
                "Random Forests",
                "XGBoost / Gradient Boosting"
              ],
              patterns: [
                "Ensemble methods",
                "Tree-based modeling"
              ],
              example: "Predict customer churn using XGBoost.",
              problems: [],
              tips: ["XGBoost is the winning algorithm for tabular data."]
            }
          ]
        },
        {
          topic: "Unsupervised Learning Models",
          levels: [
            {
              name: "Clustering & PCA",
              explanation: "Finding hidden patterns or grouping unlabeled data.",
              keyIdeas: [
                "K-Means Clustering",
                "Principal Component Analysis (PCA)",
                "Anomaly Detection"
              ],
              patterns: [
                "Dimensionality Reduction",
                "Customer Segmentation"
              ],
              example: "Reduce features from 100 to 10 using PCA.",
              problems: [],
              tips: ["PCA is very common in ML system design interviews."]
            }
          ]
        },
        {
          topic: "Machine Learning Evaluation",
          levels: [
            {
              name: "Metrics & Validation",
              explanation: "Measuring the performance of your trained models.",
              keyIdeas: [
                "Precision, Recall, F1 Score",
                "ROC / AUC",
                "Cross-Validation"
              ],
              patterns: [
                "Train/Test Splits",
                "Hyperparameter Tuning"
              ],
              example: "Use 5-fold cross-validation with GridSearch.",
              problems: [],
              tips: ["Always know when to use F1 score vs Accuracy."]
            }
          ]
        }
      ]
    },

    // ========================= DEEP LEARNING =========================
    {
      title: "Deep Learning & AI",

      skills: [
        {
          topic: "Deep Learning Fundamentals",
          levels: [
            {
              name: "Neural Networks",
              explanation: "Designing and training deep neural architectures.",
              keyIdeas: [
                "Backpropagation",
                "Activation Functions (ReLU, Sigmoid)",
                "CNNs & RNNs/Transformers"
              ],
              patterns: [
                "Computer Vision (CNN)",
                "NLP (Transformers)"
              ],
              example: "Build a PyTorch network for image classification.",
              problems: [],
              tips: ["Understand PyTorch/TensorFlow thoroughly."]
            }
          ]
        }
      ]
    },

    // ========================= SPECIALIZED AI DOMAINS =========================
    {
      title: "Specialized AI Domains",

      skills: [
        {
          topic: "Natural Language Processing (NLP)",
          levels: [
            {
              name: "Text Data & LLMs",
              explanation: "Processing human languages to extract meaning and build GenAI tools.",
              keyIdeas: [
                "Tokenization & Embeddings (Word2Vec, BERT)",
                "Sequence to Sequence models",
                "Attention Mechanism & Transformers"
              ],
              patterns: [
                "Sentiment Analysis",
                "Retrieval-Augmented Generation (RAG)"
              ],
              example: "Build a chatbot using an LLM and vector database.",
              problems: [],
              tips: ["The hottest field in AI right now."]
            }
          ]
        },
        {
          topic: "Computer Vision (CV)",
          levels: [
            {
              name: "Image Processing",
              explanation: "Teaching computers to derive high-level understanding from digital images.",
              keyIdeas: [
                "OpenCV basics",
                "Object Detection (YOLO, R-CNN)",
                "Image Segmentation"
              ],
              patterns: [
                "Transfer Learning",
                "Data Augmentation"
              ],
              example: "Fine-tune ResNet-50 on a custom image dataset.",
              problems: [],
              tips: ["Learn augmenting images to prevent CNN overfitting."]
            }
          ]
        },
        {
          topic: "Time Series Forecasting",
          levels: [
            {
              name: "Sequential Data",
              explanation: "Predicting future numerical values based on previously observed values.",
              keyIdeas: [
                "ARIMA / Prophet",
                "LSTMs & GRUs",
                "Stationarity & Autocorrelation"
              ],
              patterns: [
                "Stock price prediction",
                "Demand forecasting"
              ],
              example: "Use Facebook Prophet to predict quarterly sales.",
              problems: [],
              tips: ["Time series data has strict ordering—never shuffle during train/test split!"]
            }
          ]
        }
      ]
    },

    // ========================= MLOps =========================
    {
      title: "MLOps & Deployment",

      skills: [
        {
          topic: "ML Deployment & Docker",
          levels: [
            {
              name: "Model Serving",
              explanation: "Taking a trained model and serving it via API in production.",
              keyIdeas: [
                "FastAPI / Flask",
                "Docker containerization",
                "Model Registries (MLflow)"
              ],
              patterns: [
                "Microservice architecture",
                "CI/CD for ML"
              ],
              example: "Wrap a model in FastAPI and Dockerize it.",
              problems: [],
              tips: ["MLOps separates entry-level from Senior ML Engineers."]
            }
          ]
        }
      ]
    }

  ]
};
module.exports = {
  role: "Backend Developer",

  sections: [

    // ========================= BACKEND CORE & APIS =========================
    {
      title: "Core Backend & APIs",

      skills: [
        {
          topic: "Advanced Node.js",
          levels: [
            {
              name: "Internals & Performance",
              explanation: "Mastering the V8 engine, the event loop, and asynchronous I/O operations.",
              keyIdeas: [
                "Event Loop Phases",
                "Streams & Buffers",
                "Worker Threads & Child Processes"
              ],
              patterns: [
                "Non-blocking I/O",
                "CPU Profiling"
              ],
              example: "Process a 10GB CSV file using Node.js Streams.",
              problems: [],
              tips: ["The Event Loop is the most frequently asked Node.js interview topic."]
            }
          ]
        },
        {
          topic: "API Design & GraphQL",
          levels: [
            {
              name: "Architecting Endpoints",
              explanation: "Designing clean, stateless, and scalable communication layers.",
              keyIdeas: [
                "REST Maturity Levels",
                "GraphQL (Queries, Mutations, Subscriptions)",
                "gRPC & Protocol Buffers"
              ],
              patterns: [
                "Idempotency",
                "Pagination & Filtering"
              ],
              example: "Implement cursor-based pagination in GraphQL.",
              problems: [],
              tips: ["Always version your APIs in production environments."]
            }
          ]
        },
        {
          topic: "WebSockets & Real-Time",
          levels: [
            {
              name: "Bidirectional Communication",
              explanation: "Enabling instant, real-time data flow between the server and clients.",
              keyIdeas: [
                "WebSockets (wss://)",
                "Server-Sent Events (SSE)",
                "Socket.io & WebRTC"
              ],
              patterns: [
                "Pub/Sub Architecture",
                "Connection Scaling"
              ],
              example: "Build a real-time multiplayer cursor tracker.",
              problems: [],
              tips: ["WebSockets are stateful; scaling them across multiple servers requires a Redis adapter."]
            }
          ]
        }
      ]
    },

    // ========================= DATABASES & CACHING =========================
    {
      title: "Databases & Caching",

      skills: [
        {
          topic: "Relational Databases (SQL)",
          levels: [
            {
              name: "PostgreSQL & MySQL",
              explanation: "Structuring and querying strictly relational schemas with ACID compliance.",
              keyIdeas: [
                "Joins, Indexes & Foreign Keys",
                "ACID Properties & Transactions",
                "Query Optimization & Execution Plans"
              ],
              patterns: [
                "Normalization / Denormalization",
                "Connection Pooling"
              ],
              example: "Write a window function to find the top 3 salaries per department.",
              problems: [],
              tips: ["Understand B-Tree indexes intimately for database interviews."]
            }
          ]
        },
        {
          topic: "NoSQL & Document Stores",
          levels: [
            {
              name: "MongoDB & DynamoDB",
              explanation: "Handling unstructured or highly dynamic data at scale.",
              keyIdeas: [
                "Document-based modeling",
                "Eventual vs Strong Consistency",
                "Sharding & Replicasets"
              ],
              patterns: [
                "Single-Table Design",
                "Embedded Documents"
              ],
              example: "Design a DynamoDB schema for a fast chat application.",
              problems: [],
              tips: ["NoSQL does not mean 'No Schema', it means careful access-pattern planning!"]
            }
          ]
        },
        {
          topic: "Caching & Redis",
          levels: [
            {
              name: "In-Memory Operations",
              explanation: "Drastically reducing latency by storing frequent data in RAM.",
              keyIdeas: [
                "Redis Data Structures (Hashes, Sets, ZSets)",
                "Cache Invalidation & Eviction (LRU/LFU)",
                "Memcached vs Redis"
              ],
              patterns: [
                "Cache-Aside pattern",
                "Write-Through / Write-Behind"
              ],
              example: "Rate-limit an API using a Redis Sorted Set.",
              problems: [],
              tips: ["Cache invalidation is one of the hardest problems in computer science."]
            }
          ]
        }
      ]
    },

    // ========================= ARCHITECTURE =========================
    {
      title: "System Design & Architecture",

      skills: [
        {
          topic: "Microservices Architecture",
          levels: [
            {
              name: "Distributed Systems",
              explanation: "Deconstructing monoliths into independent, highly-available services.",
              keyIdeas: [
                "Service Discovery & API Gateways",
                "Sagas & Distributed Transactions",
                "Circuit Breakers"
              ],
              patterns: [
                "Strangler Fig Pattern",
                "CQRS (Command Query Responsibility Segregation)"
              ],
              example: "Implement the Saga pattern for an E-commerce checkout flow.",
              problems: [],
              tips: ["Microservices introduce immense operational complexity; use wisely."]
            }
          ]
        },
        {
          topic: "Message Queues & Event-Driven",
          levels: [
            {
              name: "Asynchronous Processing",
              explanation: "Decoupling systems using high-throughput message brokers.",
              keyIdeas: [
                "Kafka, RabbitMQ, SQS",
                "Pub/Sub vs Point-to-Point",
                "Consumer Groups & Partitioning"
              ],
              patterns: [
                "Event Sourcing",
                "Dead Letter Queues"
              ],
              example: "Process millions of analytics events per second using Kafka.",
              problems: [],
              tips: ["Kafka is technically an event streaming platform, not just a queue."]
            }
          ]
        },
        {
          topic: "Backend System Design",
          levels: [
            {
              name: "Scaling to Millions",
              explanation: "Interview-ready knowledge of scaling components horizontally and vertically.",
              keyIdeas: [
                "Load Balancing (L4 vs L7)",
                "Database Sharding & Partitioning",
                "CAP Theorem & PACELC"
              ],
              patterns: [
                "Consistent Hashing",
                "Read Replicas"
              ],
              example: "Design WhatsApp or a massive distributed URL Shortener.",
              problems: [],
              tips: ["The single most important interview round for Senior Backend engineers."]
            }
          ]
        }
      ]
    },

    // ========================= DEVOPS & SECURITY =========================
    {
      title: "DevOps & Security",

      skills: [
        {
          topic: "Containerization & K8s",
          levels: [
            {
              name: "Docker & Kubernetes",
              explanation: "Packaging applications identically across varying environments.",
              keyIdeas: [
                "Dockerfiles & Multi-stage builds",
                "K8s Pods, Deployments, and Services",
                "Container Orchestration"
              ],
              patterns: [
                "Infrastructure as Code (Terraform)",
                "Sidecar Pattern"
              ],
              example: "Write a K8s deployment object for an Express app.",
              problems: [],
              tips: ["Kubernetes is the absolute industry standard for container orchestration."]
            }
          ]
        },
        {
          topic: "Web Security & Auth",
          levels: [
            {
              name: "Protecting the Backend",
              explanation: "Securing routes, encrypting data, and managing distributed identities.",
              keyIdeas: [
                "OAuth 2.0 & OIDC",
                "JWT (JSON Web Tokens) vs Sessions",
                "Hashing (Bcrypt) & Salting"
              ],
              patterns: [
                "Role-Based Access Control (RBAC)",
                "Token Refresh Rotation"
              ],
              example: "Implement stateless authentication via short-lived JWTs.",
              problems: [],
              tips: ["Never store plaintext passwords under any circumstances."]
            }
          ]
        },
        {
          topic: "Cloud Computing (AWS/GCP)",
          levels: [
            {
              name: "Infrastructure Engineering",
              explanation: "Designing and deploying services on major cloud providers.",
              keyIdeas: [
                "Compute (EC2, Lambda/Serverless)",
                "Storage (S3, EFS)",
                "IAM (Identity & Access Management)"
              ],
              patterns: [
                "VPC Architecture",
                "Managed Services vs Self-Hosted"
              ],
              example: "Deploy a Node app using AWS Elastic Beanstalk.",
              problems: [],
              tips: ["Understanding IAM roles is absolutely critical for cloud security."]
            }
          ]
        },
        {
          topic: "Observability & Monitoring",
          levels: [
            {
              name: "System Visibility",
              explanation: "Logging, tracing, and monitoring to discover when and why distributed systems fail.",
              keyIdeas: [
                "Distributed Tracing (OpenTelemetry)",
                "Metrics (Prometheus & Grafana)",
                "Centralized Logging (ELK Stack)"
              ],
              patterns: [
                "Correlation IDs",
                "Alerting Rules"
              ],
              example: "Use Datadog to trace a slow database query across microservices.",
              problems: [],
              tips: ["You can't fix what you can't measure. Observability is mandatory in production."]
            }
          ]
        },
        {
          topic: "Backend Testing & TDD",
          levels: [
            {
              name: "Reliability Engineering",
              explanation: "Automating the verification of API endpoints and database logic.",
              keyIdeas: [
                "Unit vs Integration Testing",
                "Mocking External APIs",
                "Test-Driven Development (TDD)"
              ],
              patterns: [
                "Test Databases",
                "Dependency Injection"
              ],
              example: "Write an integration test for a checkout endpoint using Supertest.",
              problems: [],
              tips: ["Testing is what separates junior coders from senior engineers."]
            }
          ]
        }
      ]
    },

    // ========================= INTERVIEWS =========================
    {
      title: "Algorithms & Interviews",

      skills: [
        {
          topic: "DSA for Backend",
          levels: [
            {
              name: "Optimization & Logic",
              explanation: "The core data structures necessary to heavily optimize server logic.",
              keyIdeas: [
                "Graphs (BFS, DFS, Dijkstra)",
                "Trees & Tries",
                "Concurrency Algorithms"
              ],
              patterns: [
                "Sliding Window",
                "Dynamic Programming"
              ],
              example: "Implement an LRU Cache from scratch.",
              problems: [],
              tips: ["Backend DSA heavily focuses on fast retrieval (Hash Maps, Trees) and graph logic."]
            }
          ]
        }
      ]
    }

  ]
};
import React, { useState, useEffect } from 'react';

// Common Structure + Role Specific Day 1 to Day 30 Datasets
const ALL_ROLES_30_DAYS = {
  'Machine Learning Engineer': {
    title: 'Machine Learning Engineer',
    icon: '🤖',
    badgeColor: 'border-indigo-500/40 bg-indigo-950/60 text-indigo-300',
    mentorPersona: 'Senior ML Research Lead',
    days: [
      { day: 1, phase: 'Phase 1: Foundations', topic: 'Python Vectors & NumPy Linear Algebra', task: 'Implement dot product, tensor reshaping, and matrix inverse without libraries', prompt: 'Did you verify matrix dimension shapes before running matrix operations?' },
      { day: 2, phase: 'Phase 1: Foundations', topic: 'Pandas Wrangling & Outlier Detection', task: 'Clean tabular datasets using IQR thresholds and one-hot encoding pipelines', prompt: 'Which imputation technique preserved your target data distribution best?' },
      { day: 3, phase: 'Phase 1: Foundations', topic: 'Exploratory Data Analysis & Feature Skew', task: 'Plot correlation heatmaps, pairplots and identify multi-collinear attributes', prompt: 'What feature showed the highest Pearson correlation with the target variable?' },
      { day: 4, phase: 'Phase 1: Foundations', topic: 'Linear Regression & Cost Optimization', task: 'Derive and code Mean Squared Error gradient descent step-by-step', prompt: 'Did the loss curve converge smoothly or oscillate due to high learning rate?' },
      { day: 5, phase: 'Phase 1: Foundations', topic: 'Logistic Regression & Binary Cross-Entropy', task: 'Train logistic classifier with Sigmoid activation and Log-Loss calculation', prompt: 'Why is Cross-Entropy loss preferred over MSE for classification tasks?' },
      { day: 6, phase: 'Phase 1: Foundations', topic: 'Regularization (L1 Lasso vs L2 Ridge)', task: 'Compare weight shrinkage and sparsity on high-dimensional datasets', prompt: 'Did L1 regularization drive non-essential feature weights to zero?' },
      { day: 7, phase: 'Phase 1: Foundations', topic: 'Phase 1 Review & Baseline Assessment', task: 'Take comprehensive ML diagnostic quiz and evaluate linear model error', prompt: 'What was your baseline diagnostic score across vector algebra and stats?' },

      { day: 8, phase: 'Phase 2: Core Models & DSA', topic: 'Two Pointers for Streaming Feature Tables', task: 'Solve 2 LeetCode Mediums on rolling window feature calculations in O(N)', prompt: 'How did you avoid O(N^2) time complexity during rolling window operations?' },
      { day: 9, phase: 'Phase 2: Core Models & DSA', topic: 'Decision Trees & Information Split', task: 'Calculate Gini Impurity and Shannon Entropy splits manually on test samples', prompt: 'What max-depth or min-leaf split criteria did you use to prevent overfitting?' },
      { day: 10, phase: 'Phase 2: Core Models & DSA', topic: 'Random Forests & Bagging Ensembles', task: 'Train a 100-estimator ensemble and evaluate out-of-bag (OOB) variance', prompt: 'How much did out-of-bag error differ from your validation split score?' },
      { day: 11, phase: 'Phase 2: Core Models & DSA', topic: 'Gradient Boosting (XGBoost & LightGBM)', task: 'Tune learning_rate and tree depths for optimal Kaggle metric performance', prompt: 'Did gradient boosting outperform the Random Forest baseline model?' },
      { day: 12, phase: 'Phase 2: Core Models & DSA', topic: 'K-Means & Unsupervised Clustering', task: 'Run Elbow Method and Silhouette Analysis to choose optimal K clusters', prompt: 'At what value of K did the inertia curve show the distinct elbow inflection?' },
      { day: 13, phase: 'Phase 2: Core Models & DSA', topic: 'Principal Component Analysis (PCA)', task: 'Perform Eigen-decomposition and project 25 features down to 3 components', prompt: 'What percentage of total variance did the top 3 principal components retain?' },
      { day: 14, phase: 'Phase 2: Core Models & DSA', topic: 'SQL Window Functions for Feature Engineering', task: 'Write ROW_NUMBER, LAG, and LEAD queries over time-series user events', prompt: 'How did partition pruning improve your SQL feature query latency?' },
      { day: 15, phase: 'Phase 2: Core Models & DSA', topic: 'Phase 2 Midterm: Tree Traversal DSA', task: 'Solve 2 Binary Tree problems and review model validation benchmarks', prompt: 'Are your DSA coding sessions completed within standard 45-min interview limits?' },

      { day: 16, phase: 'Phase 3: Deep Learning', topic: 'Neural Network Multilayer Perceptron', task: 'Code forward pass and backpropagation from scratch with chain rule', prompt: 'How did you resolve the vanishing gradient issue in early layer weights?' },
      { day: 17, phase: 'Phase 3: Deep Learning', topic: 'PyTorch Tensors, Autograd & Custom Dataset', task: 'Build custom PyTorch Dataset with batch shuffling and GPU memory offload', prompt: 'Did GPU memory usage remain stable across mini-batch training epochs?' },
      { day: 18, phase: 'Phase 3: Deep Learning', topic: 'Convolutional Neural Networks (CNNs)', task: 'Stack Conv2D, MaxPool, and BatchNormalization layers for image data', prompt: 'What receptive field size yielded the highest validation accuracy?' },
      { day: 19, phase: 'Phase 3: Deep Learning', topic: 'Recurrent Networks & LSTMs', task: 'Train an LSTM for sequence modeling with hidden state persistence', prompt: 'Why do LSTM forget gates prevent the exponential vanishing gradient problem?' },
      { day: 20, phase: 'Phase 3: Deep Learning', topic: 'Transformer Architecture & Self-Attention', task: 'Compute Scaled Dot-Product Attention: Softmax((Q * K^T) / sqrt(d_k)) * V', prompt: 'Why is the square root of dimension d_k essential in the denominator?' },
      { day: 21, phase: 'Phase 3: Deep Learning', topic: 'HuggingFace Transformers & LoRA Adapters', task: 'Fine-tune a pretrained BERT model using Low-Rank Adaptation (PEFT)', prompt: 'How many trainable parameters were reduced using low-rank adaptation?' },
      { day: 22, phase: 'Phase 3: Deep Learning', topic: 'FastAPI Model Inference & Async Serving', task: 'Wrap the PyTorch model inside an async endpoint with Pydantic schemas', prompt: 'What was your average single-query inference latency in milliseconds?' },
      { day: 23, phase: 'Phase 3: Deep Learning', topic: 'Phase 3 Deep Learning Checkpoint', task: 'Benchmark throughput, memory footprint, and test containerized latency', prompt: 'Did you notice any bottleneck during CPU vs GPU inference testing?' },

      { day: 24, phase: 'Phase 4: Capstone & Placement', topic: 'MLOps Pipeline (Docker & MLflow)', task: 'Log parameters, metrics and register model artifacts in MLflow tracker', prompt: 'How did experiment tracking clarify the top hyperparameter run?' },
      { day: 25, phase: 'Phase 4: Capstone & Placement', topic: 'Vector Databases & Embeddings (RAG)', task: 'Index documentation embeddings into ChromaDB / Pinecone for vector retrieval', prompt: 'What chunk size and overlap yielded the most relevant semantic search hits?' },
      { day: 26, phase: 'Phase 4: Capstone & Placement', topic: 'System Design: Recommendation Feed', task: 'Design scalable collaborative filtering & candidate generation pipeline', prompt: 'How did your architecture handle the cold-start user problem?' },
      { day: 27, phase: 'Phase 4: Capstone & Placement', topic: 'System Design: Real-Time Fraud Detection', task: 'Architect low-latency Kafka event consumer and real-time model scoring', prompt: 'What was your P99 latency SLA for high-throughput transactional scoring?' },
      { day: 28, phase: 'Phase 4: Capstone & Placement', topic: 'Technical Mock: ML Theory & DSA', task: 'Simulate 60-minute technical interview covering bias-variance & LeetCode Hard', prompt: 'Did you articulate the algorithmic trade-offs clearly before coding?' },
      { day: 29, phase: 'Phase 4: Capstone & Placement', topic: 'Portfolio Project Final Polish & Pitch', task: 'Finalize GitHub README, architecture diagrams and live demo video link', prompt: 'Does your project repository highlight quantitative business impact?' },
      { day: 30, phase: 'Phase 4: Capstone & Placement', topic: '30-Day Master Milestone & Readiness', task: 'Conduct complete career readiness review and lock in interview applications', prompt: 'What was your initial vs final diagnostic score improvement over 30 days?' }
    ]
  },

  'Full Stack Developer': {
    title: 'Full Stack Developer',
    icon: '💻',
    badgeColor: 'border-blue-500/40 bg-blue-950/60 text-blue-300',
    mentorPersona: 'Staff Systems Architect',
    days: [
      { day: 1, phase: 'Phase 1: Frontend Engine', topic: 'Modern React Architecture & Component Tree', task: 'Structure scalable folder architecture, custom hooks, and state boundaries', prompt: 'Did you structure components to keep re-render triggers localized?' },
      { day: 2, phase: 'Phase 1: Frontend Engine', topic: 'Tailwind CSS & Responsive Layout Systems', task: 'Build glassmorphic navigation, mobile drawers and dark mode palettes', prompt: 'Are all flexbox and grid layouts rendering seamlessly across 320px to 1440px?' },
      { day: 3, phase: 'Phase 1: Frontend Engine', topic: 'Advanced State: Context & Custom Reducers', task: 'Manage complex multi-step user configuration state without prop-drilling', prompt: 'How did custom hooks clean up business logic from your UI components?' },
      { day: 4, phase: 'Phase 1: Frontend Engine', topic: 'React Performance (useMemo & useCallback)', task: 'Profile rendering bottlenecks using React DevTools Profiler', prompt: 'Which heavy list calculation benefited most from useMemo caching?' },
      { day: 5, phase: 'Phase 1: Frontend Engine', topic: 'Forms, Zod Validation & Accessibility', task: 'Implement controlled input states with schema-level validation errors', prompt: 'Did your error feedback provide clear inline recovery guidance?' },
      { day: 6, phase: 'Phase 1: Frontend Engine', topic: 'TanStack Query & Optimistic Mutations', task: 'Handle API caching, automatic background invalidation and optimistic updates', prompt: 'How did instant optimistic updates improve perceived application speed?' },
      { day: 7, phase: 'Phase 1: Frontend Engine', topic: 'Phase 1 Frontend Checkpoint & Build', task: 'Audit lighthouse scores, run production build and verify bundle sizes', prompt: 'What was your initial First Contentful Paint (FCP) benchmark?' },

      { day: 8, phase: 'Phase 2: Backend & APIs', topic: 'Node.js & Express RESTful Architecture', task: 'Structure MVC routers, error-handling middleware, and async catch handlers', prompt: 'How did centralized error middleware simplify your route handlers?' },
      { day: 9, phase: 'Phase 2: Backend & APIs', topic: 'PostgreSQL Relational Schema Design', task: 'Model foreign keys, cascade deletes, and check constraints for users & orders', prompt: 'Did you verify third-normal-form (3NF) compliance on relational tables?' },
      { day: 10, phase: 'Phase 2: Backend & APIs', topic: 'Prisma ORM Migrations & Relations', task: 'Run Prisma schema migrations and write relational queries using `include`', prompt: 'How did you avoid N+1 query performance penalties in Prisma?' },
      { day: 11, phase: 'Phase 2: Backend & APIs', topic: 'JWT Auth & Refresh Token Rotation', task: 'Implement secure HttpOnly cookies with access token rotation logic', prompt: 'Why are HttpOnly cookies superior to localStorage for token storage?' },
      { day: 12, phase: 'Phase 2: Backend & APIs', topic: 'Role-Based Access Control (RBAC)', task: 'Build authorization middleware protecting admin vs standard user routes', prompt: 'Did unauthorized requests correctly yield HTTP 403 Forbidden responses?' },
      { day: 13, phase: 'Phase 2: Backend & APIs', topic: 'API Rate Limiting & Helmet Security', task: 'Configure redis-backed rate limiters and standard HTTP security headers', prompt: 'How did rate-limiting protect sensitive authentication endpoints?' },
      { day: 14, phase: 'Phase 2: Backend & APIs', topic: 'DSA: Two Pointers & Hash Tables', task: 'Solve 2 LeetCode Medium problems commonly asked in backend interviews', prompt: 'What was the exact Space and Time complexity of your best submission?' },
      { day: 15, phase: 'Phase 2: Backend & APIs', topic: 'Phase 2 Backend Integration Audit', task: 'Write comprehensive integration tests for full CRUD user flows', prompt: 'Did all automated endpoints pass test validation on a clean test database?' },

      { day: 16, phase: 'Phase 3: Realtime & Design', topic: 'Real-Time WebSockets (Socket.io)', task: 'Implement duplex bidirectional chat room events with typing indicators', prompt: 'How did you handle client disconnects and room re-joining?' },
      { day: 17, phase: 'Phase 3: Realtime & Design', topic: 'Redis Caching & Session Invalidation', task: 'Cache frequently accessed endpoints in Redis with 10-minute TTL', prompt: 'What percentage reduction in SQL queries did caching achieve?' },
      { day: 18, phase: 'Phase 3: Realtime & Design', topic: 'Background Jobs & Message Queues (BullMQ)', task: 'Offload transactional email sending to an asynchronous worker queue', prompt: 'Did asynchronous job processing keep the HTTP response under 50ms?' },
      { day: 19, phase: 'Phase 3: Realtime & Design', topic: 'Database Indexing & Query Optimization', task: 'Analyze EXPLAIN ANALYZE execution plans and add compound B-tree indexes', prompt: 'By what factor did index creation drop table scan duration?' },
      { day: 20, phase: 'Phase 3: Realtime & Design', topic: 'System Design: High-Traffic URL Shortener', task: 'Design hashing strategy, base62 encoding, and distributed key generation', prompt: 'How did you design cache eviction (LRU) for the top 20% viral links?' },
      { day: 21, phase: 'Phase 3: Realtime & Design', topic: 'System Design: Notification Service', task: 'Architect fan-out queues for SMS, email, and mobile push notifications', prompt: 'How did your queue architecture prevent third-party API rate limit fails?' },
      { day: 22, phase: 'Phase 3: Realtime & Design', topic: 'DSA: Binary Trees & Graph Traversal', task: 'Solve BFS and DFS traversal problems on hierarchical organization data', prompt: 'How did you track visited state to prevent infinite loops in cyclic graphs?' },
      { day: 23, phase: 'Phase 3: Realtime & Design', topic: 'Phase 3 Real-Time System Benchmark', task: 'Conduct stress testing with 500 simulated concurrent WebSocket clients', prompt: 'Did Node.js event loop lag remain under 20ms during peak load?' },

      { day: 24, phase: 'Phase 4: DevOps & Placement', topic: 'Docker Containerization & Multi-Stage Builds', task: 'Containerize frontend Vite app and Node backend with Alpine images', prompt: 'How many megabytes did multi-stage Docker builds shave off the image?' },
      { day: 25, phase: 'Phase 4: DevOps & Placement', topic: 'CI/CD Pipelines (GitHub Actions)', task: 'Build automated pipeline running linting, unit tests, and Docker build', prompt: 'Did GitHub Actions catch any uncommitted lint errors automatically?' },
      { day: 26, phase: 'Phase 4: DevOps & Placement', topic: 'Cloud Deployment (AWS / Vercel / Render)', task: 'Deploy production database, configure SSL certificates and environment secrets', prompt: 'Are production database connection strings protected behind secret managers?' },
      { day: 27, phase: 'Phase 4: DevOps & Placement', topic: 'Web Security (OWASP Top 10 Mitigation)', task: 'Audit CSRF, SQL Injection, XSS sanitization, and CORS origin whitelisting', prompt: 'Did security headers pass all Mozilla Observatory test suites?' },
      { day: 28, phase: 'Phase 4: DevOps & Placement', topic: 'Full Stack Live Mock Technical Interview', task: 'Simulate live coding challenge (React component + REST API endpoint)', prompt: 'Were you able to clearly articulate architectural trade-offs to the interviewer?' },
      { day: 29, phase: 'Phase 4: DevOps & Placement', topic: 'Production Portfolio Project Showcase', task: 'Record video demonstration, publish live demo link, and polish repository', prompt: 'Does the live README clearly instruct how to run locally with one command?' },
      { day: 30, phase: 'Phase 4: DevOps & Placement', topic: '30-Day Engineering Capstone Mastery', task: 'Finalize comprehensive placement roadmap and celebrate 100% completion', prompt: 'How confident do you feel delivering full-stack engineering features end-to-end?' }
    ]
  },

  'DSA & Placement Aspirant': {
    title: 'DSA & Placement Aspirant',
    icon: '⚡',
    badgeColor: 'border-amber-500/40 bg-amber-950/60 text-amber-300',
    mentorPersona: 'Competitive Programming Coach',
    days: [
      { day: 1, phase: 'Phase 1: Linear Patterns', topic: 'Time Complexity Analysis & Two Pointers', task: 'Solve Two Sum II (Sorted), Valid Palindrome, and Squares of Sorted Array', prompt: 'Did you solve all 3 problems in strict O(N) Time and O(1) Auxiliary Space?' },
      { day: 2, phase: 'Phase 1: Linear Patterns', topic: 'Sliding Window (Fixed vs Variable)', task: 'Solve Maximum Sum Subarray (Size K) and Minimum Size Subarray Sum', prompt: 'How did you determine when to expand vs shrink the window boundaries?' },
      { day: 3, phase: 'Phase 1: Linear Patterns', topic: 'Fast & Slow Pointers (Floyd\'s Cycle)', task: 'Solve Linked List Cycle I & II, and Find the Duplicate Number', prompt: 'Can you mathematically prove why the slow and fast pointers always intersect?' },
      { day: 4, phase: 'Phase 1: Linear Patterns', topic: 'Hash Maps & Prefix Sum Optimization', task: 'Solve Subarray Sum Equals K and Continuous Subarray Sum', prompt: 'Why is Prefix Sum with Hash Map lookup faster than nested loops?' },
      { day: 5, phase: 'Phase 1: Linear Patterns', topic: 'Monotonic Stack (Next Greater Element)', task: 'Solve Daily Temperatures and Next Greater Element I & II', prompt: 'Did you maintain a strictly decreasing stack to find the next greater item?' },
      { day: 6, phase: 'Phase 1: Linear Patterns', topic: 'Binary Search On Answer Spaces', task: 'Solve Koko Eating Bananas and Capacity To Ship Packages Within D Days', prompt: 'What were the lower and upper bounds of your binary search range?' },
      { day: 7, phase: 'Phase 1: Linear Patterns', topic: 'Phase 1 DSA Timed Contest (3 Problems)', task: 'Solve 3 timed problems in 60 minutes without IDE autocomplete', prompt: 'Did you submit working code within the 60-minute contest timer?' },

      { day: 8, phase: 'Phase 2: Trees & Heaps', topic: 'Binary Tree Traversal (DFS Recursion)', task: 'Solve Maximum Depth, Invert Binary Tree, and Diameter of Binary Tree', prompt: 'Did your diameter solution calculate height and diameter in a single DFS pass?' },
      { day: 9, phase: 'Phase 2: Trees & Heaps', topic: 'Level Order Traversal (BFS Queue)', task: 'Solve Binary Tree Level Order Traversal and Zigzag Level Order', prompt: 'How did taking `queue.length` at the start of each loop isolate tree levels?' },
      { day: 10, phase: 'Phase 2: Trees & Heaps', topic: 'Binary Search Tree (BST) Properties', task: 'Solve Validate BST, Kth Smallest Element in BST, and Lowest Common Ancestor', prompt: 'Did you leverage in-order traversal to verify sorted order in O(N)?' },
      { day: 11, phase: 'Phase 2: Trees & Heaps', topic: 'Lowest Common Ancestor (LCA) in Trees', task: 'Implement LCA for general binary trees and optimized BST versions', prompt: 'What base condition returned the root when nodes matched p or q?' },
      { day: 12, phase: 'Phase 2: Trees & Heaps', topic: 'Heaps & Priority Queues (Top-K Patterns)', task: 'Solve Kth Largest Element in an Array and Top K Frequent Elements', prompt: 'Why does a Min-Heap of size K achieve O(N log K) instead of O(N log N)?' },
      { day: 13, phase: 'Phase 2: Trees & Heaps', topic: 'Merge K Sorted Lists / Two Heaps', task: 'Solve Merge K Sorted Lists and Find Median from Data Stream', prompt: 'How did balancing two heaps keep median retrieval at exact O(1) time?' },
      { day: 14, phase: 'Phase 2: Trees & Heaps', topic: 'Backtracking & Permutations / Subsets', task: 'Solve Subsets, Permutations, and Combination Sum without duplicates', prompt: 'Did you properly undo (backtrack) state choices before the next iteration?' },
      { day: 15, phase: 'Phase 2: Trees & Heaps', topic: 'Phase 2 Midterm: Tree & Heap Contest', task: 'Complete 2 Medium + 1 Hard problem within 90 minutes', prompt: 'Did you handle empty node and single-element edge conditions smoothly?' },

      { day: 16, phase: 'Phase 3: Graphs & DP', topic: 'Graph Representation & Breadth-First Search', task: 'Solve Number of Islands, Rotting Oranges, and Clone Graph', prompt: 'Did you mark visited nodes in-place or maintain a separate visited Set?' },
      { day: 17, phase: 'Phase 3: Graphs & DP', topic: 'Depth-First Search & Cycle Detection', task: 'Solve Course Schedule I & II using Topological Sort (Kahn\'s Algorithm)', prompt: 'How did in-degree tracking pinpoint circular prerequisite dependencies?' },
      { day: 18, phase: 'Phase 3: Graphs & DP', topic: 'Shortest Path: Dijkstra\'s Algorithm', task: 'Solve Network Delay Time and Path With Minimum Effort using Min-Heap', prompt: 'Why does Dijkstra fail on graphs with negative edge weights?' },
      { day: 19, phase: 'Phase 3: Graphs & DP', topic: '1D Dynamic Programming (Memoization)', task: 'Solve Climbing Stairs, Min Cost Climbing Stairs, and House Robber I & II', prompt: 'How did transitioning from recursion to iterative tabulation save call stack space?' },
      { day: 20, phase: 'Phase 3: Graphs & DP', topic: 'Coin Change & Knapsack Patterns', task: 'Solve Coin Change (Unbounded) and Partition Equal Subset Sum (0/1)', prompt: 'Did your DP state check for unreachable coin values with Infinity guards?' },
      { day: 21, phase: 'Phase 3: Graphs & DP', topic: 'Longest Increasing Subsequence (LIS)', task: 'Solve LIS using O(N^2) DP, then optimize to O(N log N) with Binary Search', prompt: 'How does patience sorting with tails array speed up LIS to O(N log N)?' },
      { day: 22, phase: 'Phase 3: Graphs & DP', topic: '2D Dynamic Programming (Grid Paths)', task: 'Solve Unique Paths I & II and Longest Common Subsequence (LCS)', prompt: 'What was your recurrence relation for matching characters in LCS?' },
      { day: 23, phase: 'Phase 3: Graphs & DP', topic: 'Phase 3 Graph & DP Timed Assessment', task: 'Complete 2 Graph Mediums and 1 2D DP Hard problem in 90 minutes', prompt: 'Did you construct the DP state transition table on paper first?' },

      { day: 24, phase: 'Phase 4: Hard Patterns', topic: 'Word Break & Edit Distance (String DP)', task: 'Solve Word Break and Edit Distance with insertion/deletion cost matrix', prompt: 'What were your base cases for comparing empty source vs target strings?' },
      { day: 25, phase: 'Phase 4: Hard Patterns', topic: 'Disjoint Set Union (Union-Find)', task: 'Solve Redundant Connection and Number of Provinces with Path Compression', prompt: 'Why does path compression with union-by-rank yield near O(1) amortized time?' },
      { day: 26, phase: 'Phase 4: Hard Patterns', topic: 'Trie (Prefix Tree) Data Structure', task: 'Implement Trie (Prefix Tree) and Design Add and Search Words Data Structure', prompt: 'How does a 26-element pointer array speed up prefix lookups?' },
      { day: 27, phase: 'Phase 4: Hard Patterns', topic: 'Segment Tree & Range Sum Queries', task: 'Build Segment Tree for Range Sum Query - Mutable in O(log N)', prompt: 'How did binary tree splitting partition range queries recursively?' },
      { day: 28, phase: 'Phase 4: Hard Patterns', topic: 'FAANG / Tier-1 Live Mock Interview', task: 'Complete 45-minute live technical problem-solving interview simulation', prompt: 'Did you think out loud and validate requirements before writing code?' },
      { day: 29, phase: 'Phase 4: Hard Patterns', topic: 'Blind 75 & NeetCode 150 Revision', task: 'Rapidly review solutions for top 15 most frequently asked placement questions', prompt: 'Can you identify the required pattern within 60 seconds of reading a prompt?' },
      { day: 30, phase: 'Phase 4: Hard Patterns', topic: '30-Day Algorithm Mastery & Placement Ready', task: 'Review complete 30-day DSA streak, log final scores, and celebrate mastery', prompt: 'What is your overall problem-solving speedup compared to Day 1?' }
    ]
  },

  'AI & Data Scientist': {
    title: 'AI & Data Scientist',
    icon: '📊',
    badgeColor: 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300',
    mentorPersona: 'Chief Data Scientist',
    days: [
      { day: 1, phase: 'Phase 1: Stats & Inference', topic: 'Probability Distributions & Central Limit Theorem', task: 'Simulate Normal, Poisson, and Binomial distributions using SciPy', prompt: 'Did sampling means converge to a normal distribution as sample size N grew?' },
      { day: 2, phase: 'Phase 1: Stats & Inference', topic: 'Hypothesis Testing & Z-Score / T-Tests', task: 'Perform two-sample t-test to evaluate statistical significance (p < 0.05)', prompt: 'Was the null hypothesis rejected with sufficient confidence margin?' },
      { day: 3, phase: 'Phase 1: Stats & Inference', topic: 'ANOVA & Chi-Square Independence Tests', task: 'Evaluate categorical associations in customer conversion cohorts', prompt: 'Did the Chi-Square statistic exceed the critical value for degrees of freedom?' },
      { day: 4, phase: 'Phase 1: Stats & Inference', topic: 'A/B Test Design & Sample Size Sizing', task: 'Calculate required sample size given MDE, statistical power, and alpha', prompt: 'What was your Minimum Detectable Effect (MDE) calculation threshold?' },
      { day: 5, phase: 'Phase 1: Stats & Inference', topic: 'Advanced Pandas & GroupBy Aggregations', task: 'Execute multi-level indexing, rolling windows, and pivot table analysis', prompt: 'How did memory profiling optimize dataframe column storage types?' },
      { day: 6, phase: 'Phase 1: Stats & Inference', topic: 'Data Visualization & Storytelling', task: 'Build interactive distribution and violin charts using Plotly', prompt: 'Did your visual dashboard clearly highlight the actionable business metric?' },
      { day: 7, phase: 'Phase 1: Stats & Inference', topic: 'Phase 1 Statistical Foundations Check', task: 'Complete statistics assessment quiz and calibrate diagnostic score', prompt: 'What was your score across probability theory and hypothesis testing?' },

      { day: 8, phase: 'Phase 2: Feature Engineering', topic: 'Missing Data Imputation (MICE & KNN)', task: 'Compare iterative multivariate imputation vs mean/median baseline', prompt: 'Did multivariate imputation preserve correlation across paired columns?' },
      { day: 9, phase: 'Phase 2: Feature Engineering', topic: 'Categorical Encoding (Target & Weight of Evidence)', task: 'Implement out-of-fold target encoding to eliminate data leakage', prompt: 'How did cross-validation folds prevent target encoding target leakage?' },
      { day: 10, phase: 'Phase 2: Feature Engineering', topic: 'Feature Scaling & Power Transformations', task: 'Apply Yeo-Johnson and Box-Cox transforms to normalize skewed features', prompt: 'Did the power transformation reduce feature skewness to near zero?' },
      { day: 11, phase: 'Phase 2: Feature Engineering', topic: 'Dimensionality Reduction (t-SNE & UMAP)', task: 'Project high-dimensional text embeddings into 2D cluster visual maps', prompt: 'Did UMAP preserve local vs global cluster structure better than t-SNE?' },
      { day: 12, phase: 'Phase 2: Feature Engineering', topic: 'SQL for Analytics: Window Functions & CTEs', task: 'Write recursive CTEs and cohort retention matrices over transaction data', prompt: 'What was your Day-30 user cohort retention percentage in SQL?' },
      { day: 13, phase: 'Phase 2: Feature Engineering', topic: 'Supervised Learning: LightGBM vs CatBoost', task: 'Benchmark CatBoost on categorical features against LightGBM', prompt: 'Which gradient boosting library delivered the highest ROC-AUC score?' },
      { day: 14, phase: 'Phase 2: Feature Engineering', topic: 'Imbalanced Datasets (SMOTE vs Class Weights)', task: 'Evaluate Precision-Recall AUC on 1:99 imbalanced fraud detection data', prompt: 'Why is ROC-AUC misleading when evaluating heavy imbalanced datasets?' },
      { day: 15, phase: 'Phase 2: Feature Engineering', topic: 'Phase 2 Predictive Modeling Milestone', task: 'Review feature importance charts using SHAP (Shapley Additive Values)', prompt: 'Which single feature exerted the strongest global SHAP importance?' },

      { day: 16, phase: 'Phase 3: Deep Learning & NLP', topic: 'Text Preprocessing & TF-IDF Vectors', task: 'Build tokenization, lemmatization and TF-IDF sparse matrix pipeline', prompt: 'Did n-gram tokenization (bi-grams) improve sentiment classification?' },
      { day: 17, phase: 'Phase 3: Deep Learning & NLP', topic: 'Word Embeddings (Word2Vec & GloVe)', task: 'Compute cosine similarity and semantic vector arithmetic (King - Man + Woman)', prompt: 'What was the cosine similarity score between related industry terms?' },
      { day: 18, phase: 'Phase 3: Deep Learning & NLP', topic: 'Transformer Embeddings (Sentence-BERT)', task: 'Generate dense embeddings using MiniLM for semantic document search', prompt: 'Did dense embeddings outperform TF-IDF on semantic search queries?' },
      { day: 19, phase: 'Phase 3: Deep Learning & NLP', topic: 'Time-Series Forecasting (ARIMA vs Prophet)', task: 'Decompose trend, seasonality, and residual noise in revenue metrics', prompt: 'Was the residual time-series stationary according to the ADF test?' },
      { day: 20, phase: 'Phase 3: Deep Learning & NLP', topic: 'Neural Networks: Multilayer Perceptron in PyTorch', task: 'Build custom PyTorch module with Dropout, ReLU, and Adam optimizer', prompt: 'How did dropout regularization impact your validation loss curve?' },
      { day: 21, phase: 'Phase 3: Deep Learning & NLP', topic: 'Model Interpretability & SHAP Waterfall', task: 'Generate individual instance SHAP waterfall explanations for predictions', prompt: 'Were you able to explain why the model made a false positive error?' },
      { day: 22, phase: 'Phase 3: Deep Learning & NLP', topic: 'Vector DB Search with FAISS', task: 'Build fast nearest-neighbor search index over 50,000 vector embeddings', prompt: 'What was the search retrieval speedup using inverted file indexing (IVF)?' },
      { day: 23, phase: 'Phase 3: Deep Learning & NLP', topic: 'Phase 3 NLP & Deep Learning Assessment', task: 'Evaluate end-to-end embedding pipeline with latency and memory profiling', prompt: 'Did vector search latency remain within the sub-10ms target threshold?' },

      { day: 24, phase: 'Phase 4: Capstone & MLOps', topic: 'Retrieval-Augmented Generation (RAG) Architecture', task: 'Connect vector retriever with an LLM prompt template using LangChain', prompt: 'How did context chunk re-ranking reduce model hallucinations?' },
      { day: 25, phase: 'Phase 4: Capstone & MLOps', topic: 'Data Pipeline Orchestration (Airflow / Prefect)', task: 'Write a scheduled DAG extracting raw data, transforming, and saving tables', prompt: 'Did your DAG handle upstream task failures with automatic retries?' },
      { day: 26, phase: 'Phase 4: Capstone & MLOps', topic: 'Model Monitoring & Data Drift Detection (Evidently)', task: 'Run Kolmogorov-Smirnov test to detect distribution drift between train & prod', prompt: 'Which production feature triggered a significant data drift alert?' },
      { day: 27, phase: 'Phase 4: Capstone & MLOps', topic: 'System Design: Real-Time Recommendation Engine', task: 'Architect two-stage recommender: Candidate Retrieval + Neural Ranking', prompt: 'How did you handle the trade-off between latency and ranking precision?' },
      { day: 28, phase: 'Phase 4: Capstone & MLOps', topic: 'Data Science Live Technical Interview Mock', task: 'Simulate business case study, A/B test analysis, and statistical deep-dive', prompt: 'Did you frame the data findings around clear commercial business ROI?' },
      { day: 29, phase: 'Phase 4: Capstone & MLOps', topic: 'Portfolio Project Presentation & Executive Deck', task: 'Finalize presentation deck, GitHub repository, and video walk-through', prompt: 'Does your portfolio report articulate clear data hypotheses and outcomes?' },
      { day: 30, phase: 'Phase 4: Capstone & MLOps', topic: '30-Day Data Science Master Graduation', task: 'Review 30-day streak, measure final skill score gains, and celebrate!', prompt: 'What data science capability improved the most across the 30-day curriculum?' }
    ]
  }
};

// 4 Common Protocol Verification Rules across all 4 roles
const COMMON_DISCIPLINE_CHECKLIST = [
  'Zero Unscheduled Breaks: Maintained deep flow blocks without phone/social checks',
  'Code Quality: Dry-ran solutions, handled edge conditions & wrote clean variable names',
  'Documentation: Recorded key blockers, solutions, and algorithmic trade-offs',
  'Spaced Retention: Revised 1 fundamental concept or problem from an earlier phase'
];

export default function DailyReview({ user, onReviewSubmitted }) {
  // Bind user role, fallback smoothly
  const currentRole = user?.goal || 'Machine Learning Engineer';
  const roleConfig = ALL_ROLES_30_DAYS[currentRole] || ALL_ROLES_30_DAYS['Machine Learning Engineer'];

  // Current selected day state
  const [selectedDay, setSelectedDay] = useState(1);

  // Common Reflection & Assessment inputs
  const [productivityScore, setProductivityScore] = useState(8);
  const [focusHours, setFocusHours] = useState('4.0');
  const [distractionLevel, setDistractionLevel] = useState('Low');
  const [reflectionAnswer, setReflectionAnswer] = useState('');
  const [dayChecklist, setDayChecklist] = useState({ 0: true, 1: true, 2: false, 3: true });
  const [taskDone, setTaskDone] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  // Scoped persistence map across all 30 days
  const [reviewsMap, setReviewsMap] = useState(() => {
    try {
      const stored = localStorage.getItem(`mentor_30days_${user?.email || 'default'}_${currentRole}`);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  const activeDay = roleConfig.days.find(d => d.day === selectedDay) || roleConfig.days[0];

  // Populate data when selecting a different day
  useEffect(() => {
    const existing = reviewsMap[selectedDay];
    if (existing) {
      setProductivityScore(existing.score ?? 8);
      setFocusHours(existing.hours ?? '4.0');
      setDistractionLevel(existing.distraction ?? 'Low');
      setReflectionAnswer(existing.reflection ?? '');
      setDayChecklist(existing.checklist ?? { 0: true, 1: true, 2: false, 3: true });
      setTaskDone(!!existing.completed);
    } else {
      setProductivityScore(8);
      setFocusHours('4.0');
      setDistractionLevel('Low');
      setReflectionAnswer('');
      setDayChecklist({ 0: false, 1: false, 2: false, 3: false });
      setTaskDone(false);
    }
  }, [selectedDay, reviewsMap]);

  // Overall 30-day stats
  const completedDaysCount = Object.values(reviewsMap).filter(r => r.completed).length;
  const progressPercent = Math.round((completedDaysCount / 30) * 100);

  // Dynamic Adaptive Mentor Guidance based on user performance
  const generateMentorAdvice = () => {
    if (productivityScore >= 8 && taskDone) {
      return `Zabardast! Aapka Day ${selectedDay} ka execution flawless raha. ${roleConfig.title} ke liye yeh consistency interviews crack karne mein direct lead degi. Next topic par badhein!`;
    }
    if (productivityScore < 6) {
      return `Notice kiya ki aaj productivity score ${productivityScore}/10 raha aur distraction "${distractionLevel}" hai. Kal 45-min Focus Timer ke sath Pomodoro sprints follow karein taaki cognitive load balance rahe.`;
    }
    return `Solid effort on Day ${selectedDay}! Assigned task (${activeDay.topic}) par edge cases verify karein aur submission ko clean format mein commit karein.`;
  };

  const handleSaveReview = (e) => {
    e.preventDefault();

    const reviewEntry = {
      day: selectedDay,
      role: currentRole,
      phase: activeDay.phase,
      topic: activeDay.topic,
      task: activeDay.task,
      score: productivityScore,
      hours: focusHours,
      distraction: distractionLevel,
      reflection: reflectionAnswer,
      checklist: dayChecklist,
      completed: taskDone,
      mentorFeedback: generateMentorAdvice(),
      savedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMap = {
      ...reviewsMap,
      [selectedDay]: reviewEntry
    };

    setReviewsMap(updatedMap);
    localStorage.setItem(`mentor_30days_${user?.email || 'default'}_${currentRole}`, JSON.stringify(updatedMap));

    setIsSaved(true);
    if (onReviewSubmitted) {
      onReviewSubmitted(reviewEntry);
    }

    setTimeout(() => {
      setIsSaved(false);
    }, 3200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* 1. TOP HEADER BANNER (COMMON STRUCTURE) */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner">
            {roleConfig.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white tracking-wide">30-Day Career Roadmap Review</h1>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${roleConfig.badgeColor}`}>
                {roleConfig.title}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Unified progress evaluation & daily reflection engine [CodeSprint 2026]
            </p>
          </div>
        </div>

        {/* 30-Day Completion Progress Meter */}
        <div className="p-3.5 px-4 rounded-2xl bg-[#070b18] border border-slate-800 flex items-center gap-4 min-w-[250px]">
          <div className="relative h-11 w-11 flex items-center justify-center rounded-full bg-slate-900 border border-indigo-500/40 shrink-0">
            <span className="text-xs font-black text-indigo-400">{progressPercent}%</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-white">Curriculum Progress</span>
              <span className="text-[10px] text-slate-400 font-mono">{completedDaysCount}/30 Days</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. INTERACTIVE DAY 1 TO DAY 30 SELECTOR GRID (COMMON PILLS) */}
      <div className="p-5 rounded-3xl bg-[#0f172a]/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Curriculum Calendar (Day 1 — 30)
          </span>
          <span className="text-[10px] text-slate-400 font-mono">
            {activeDay.phase}
          </span>
        </div>

        <div className="grid grid-cols-6 sm:grid-cols-10 lg:grid-cols-15 gap-2">
          {roleConfig.days.map((item) => {
            const isCompleted = reviewsMap[item.day]?.completed;
            const isCurrent = selectedDay === item.day;

            return (
              <button
                type="button"
                key={item.day}
                onClick={() => setSelectedDay(item.day)}
                className={`py-2 px-1 rounded-xl text-xs font-bold transition flex flex-col items-center justify-center cursor-pointer border ${
                  isCurrent
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-600/40 scale-105'
                    : isCompleted
                    ? 'bg-emerald-950/40 border-emerald-700/80 text-emerald-400'
                    : 'bg-[#070b18] border-slate-800/80 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                <span>D{item.day}</span>
                <span className="text-[8px] opacity-75">{isCompleted ? '✓' : '•'}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. DYNAMIC DAY OBJECTIVE & ASSIGNED TASK */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 space-y-5">
        
        {/* Day Header with Completion Checkbox */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black font-mono px-2.5 py-0.5 rounded bg-indigo-950 border border-indigo-700 text-indigo-300">
                DAY {activeDay.day} OF 30
              </span>
              <span className="text-[11px] font-bold text-slate-400">{activeDay.phase}</span>
            </div>
            <h2 className="text-base font-extrabold text-white mt-1.5">{activeDay.topic}</h2>
          </div>

          <label className={`p-2.5 px-4 rounded-xl border flex items-center gap-2.5 cursor-pointer transition shrink-0 ${
            taskDone
              ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300'
              : 'bg-[#070b18] border-slate-800 text-slate-400 hover:border-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={taskDone}
              onChange={(e) => setTaskDone(e.target.checked)}
              className="h-4 w-4 rounded accent-indigo-600 cursor-pointer"
            />
            <span className="text-xs font-bold">
              {taskDone ? '✓ Day Marked Complete' : 'Mark Day Complete (+)'}
            </span>
          </label>
        </div>

        {/* Role-Specific Assigned Task Box */}
        <div className="p-4 rounded-2xl bg-[#070b18] border border-slate-800/80 flex items-start gap-3">
          <span className="text-lg">🎯</span>
          <div>
            <div className="text-[11px] font-bold text-indigo-400 uppercase tracking-wider">
              {roleConfig.title} Assigned Task
            </div>
            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
              {activeDay.task}
            </p>
          </div>
        </div>

        {/* 4. UNIFIED METRIC KNOBS (COMMON FOR ALL 4 ROLES) */}
        <form onSubmit={handleSaveReview} className="space-y-6 pt-2">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Productivity Score Knob */}
            <div className="p-4 rounded-2xl bg-[#070b18] border border-slate-800 flex flex-col justify-between">
              <div className="flex justify-between items-center mb-2">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Productivity</span>
                <span className="text-sm font-black text-indigo-400 font-mono">{productivityScore} / 10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={productivityScore}
                onChange={(e) => setProductivityScore(parseInt(e.target.value, 10))}
                className="w-full accent-indigo-500 cursor-pointer h-1.5 bg-slate-900 rounded-lg"
              />
            </div>

            {/* Deep Work Hours */}
            <div className="p-4 rounded-2xl bg-[#070b18] border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Focus Time</span>
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="24"
                  value={focusHours}
                  onChange={(e) => setFocusHours(e.target.value)}
                  className="w-20 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-mono text-xs font-bold focus:outline-none focus:border-indigo-500"
                />
                <span className="text-xs text-slate-400">Hours spent</span>
              </div>
            </div>

            {/* Distraction Intensity */}
            <div className="p-4 rounded-2xl bg-[#070b18] border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">Distraction Level</span>
              <div className="grid grid-cols-3 gap-1.5">
                {['Low', 'Medium', 'High'].map((lvl) => (
                  <button
                    type="button"
                    key={lvl}
                    onClick={() => setDistractionLevel(lvl)}
                    className={`py-1 rounded-lg text-xs font-bold border transition cursor-pointer ${
                      distractionLevel === lvl
                        ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                        : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* 5. ROLE-SPECIFIC REFLECTION PROMPT */}
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-200">
              <span className="text-indigo-400 mr-1.5">Technical Prompt:</span> {activeDay.prompt}
            </label>
            <textarea
              rows={3}
              value={reflectionAnswer}
              onChange={(e) => setReflectionAnswer(e.target.value)}
              placeholder="Record technical trade-offs, test results, or architectural decisions here..."
              className="w-full p-3.5 rounded-2xl bg-[#070b18] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          {/* 6. COMMON 4-POINT PROTOCOL VERIFICATION CHECKLIST */}
          <div className="p-4 rounded-2xl bg-[#070b18] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                Common Discipline Verification Protocol
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Standard QA</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
              {COMMON_DISCIPLINE_CHECKLIST.map((item, idx) => (
                <label
                  key={idx}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 cursor-pointer transition ${
                    dayChecklist[idx]
                      ? 'bg-emerald-950/20 border-emerald-800/80 text-emerald-300'
                      : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={!!dayChecklist[idx]}
                    onChange={() => setDayChecklist({ ...dayChecklist, [idx]: !dayChecklist[idx] })}
                    className="h-3.5 w-3.5 rounded accent-indigo-600 cursor-pointer"
                  />
                  <span className="text-[11px] font-semibold leading-tight">{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* 7. DYNAMIC ADAPTIVE MENTOR FEEDBACK MESSAGE */}
          <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-800/60 flex items-start gap-3">
            <span className="text-xl">💬</span>
            <div>
              <div className="text-[11px] font-bold text-indigo-300 uppercase tracking-wider">
                Adaptive AI Mentor Advice ({roleConfig.mentorPersona})
              </div>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                {reviewsMap[selectedDay]?.mentorFeedback || generateMentorAdvice()}
              </p>
            </div>
          </div>

          {/* 8. SUBMIT ACTION BUTTON */}
          <div className="flex items-center justify-between pt-2">
            {isSaved ? (
              <div className="p-2.5 px-4 rounded-xl bg-emerald-950/80 border border-emerald-700 text-emerald-400 text-xs font-bold animate-pulse">
                ✓ Day {selectedDay} Review Saved & Synced with MentorAI!
              </div>
            ) : (
              <span className="text-[11px] text-slate-500">
                Saving updates 30-day streak, skill metrics, and dashboard logs.
              </span>
            )}

            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer"
            >
              Save Day {selectedDay} Review →
            </button>
          </div>

        </form>

      </div>

    </div>
  );
}
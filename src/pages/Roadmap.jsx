import React, { useState, useEffect } from 'react';

// Real-world Industry Roadmaps with in-depth topics, interview traps, and production deliverables
const ROLE_ROADMAPS = {
  'Machine Learning Engineer': {
    title: 'Machine Learning Engineer',
    icon: '🤖',
    badgeColor: 'border-indigo-500/40 bg-indigo-950/60 text-indigo-300',
    curriculumDuration: '16 Weeks Industry Path',
    careerTarget: 'Tier-1 AI Labs & ML Infrastructure Teams',
    readinessBenchmark: '85% Milestone Completion required for Live Technical Interviews',
    stages: [
      {
        id: 'ml_01',
        number: '01',
        title: 'Tensor Algebra & Mathematical Optimization Foundations',
        duration: '3 Weeks',
        tag: 'Base Prerequisite',
        status: 'Completed',
        overview: 'Vector calculus gradients, tensor broadcasting, Hessian matrices, and convex cost optimization for modern learning algorithms.',
        prerequisites: ['Python 3.11 Syntax', 'Basic Calculus'],
        topics: [
          'Vector spaces, Eigenvalues, Eigenvectors, and Spectral Decomposition',
          'Matrix calculus: Jacobians, Hessians, and Chain Rule vectorization',
          'Convexity proofs and cost surfaces: MSE vs Binary Cross-Entropy',
          'Gradient Descent variants: Batch, Mini-batch, Momentum & Adam optimizer'
        ],
        interviewTrap: 'Why does division by sqrt(d_k) prevent softmax gradient vanishing in dot-product attention?',
        deliverableProject: 'Scratch-built NumPy Neural Network with automated backpropagation and dynamic batch training.',
        milestones: [
          'Derived MSE and Cross-Entropy backpropagation formulas by hand',
          'Built vector matrix multiplier utilizing NumPy broadcasting in O(N)',
          'Calibrated gradient step convergence against learning rate oscillations'
        ]
      },
      {
        id: 'ml_02',
        number: '02',
        title: 'Targeted Data Structures & Streaming Algorithms',
        duration: '3 Weeks',
        tag: 'Weak Area Focus',
        status: 'In Progress',
        overview: 'Overcoming DSA bottlenecks commonly targeted in Tier-1 technical screening rounds: rolling windows, heaps, and tree traversals.',
        prerequisites: ['Stage 01: Tensor Algebra'],
        topics: [
          'Two Pointers & Sliding Window for streaming real-time feature extraction',
          'Binary Tree & BST traversals for custom decision partition trees',
          'Min/Max Heaps for Top-K candidate recommendations and streaming medians',
          'Prefix Sums and Hash Map lookups to eliminate O(N^2) inner loops'
        ],
        interviewTrap: 'How does an in-memory Min-Heap of size K maintain streaming Top-K items in O(N log K) time?',
        deliverableProject: 'Real-time sliding window event aggregation pipeline for streaming transaction data.',
        milestones: [
          'Solved 30 LeetCode Mediums covering Sliding Window & Trees without hints',
          'Dry-ran edge conditions (empty lists, duplicates, bounds) before coding',
          'Passed 45-minute timed algorithmic mock coding challenge'
        ]
      },
      {
        id: 'ml_03',
        number: '03',
        title: 'Classical Machine Learning & Ensemble Pipelines',
        duration: '4 Weeks',
        tag: 'Core ML Engine',
        status: 'Active',
        overview: 'End-to-end predictive modeling: regularization, ensemble bagging/boosting, feature leakage prevention, and model interpretability.',
        prerequisites: ['Stage 01: Tensor Algebra', 'Stage 02: DSA Fundamentals'],
        topics: [
          'Regularization: L1 Lasso sparsity proofs vs L2 Ridge weight shrinkage',
          'Random Forest Bagging: Decorrelating trees via bootstrap sampling',
          'Gradient Boosting: Residual fitting with XGBoost, LightGBM & CatBoost',
          'Model Explainability: Global and local SHAP (Shapley Additive) values'
        ],
        interviewTrap: 'Why does ROC-AUC remain deceptively high on 99:1 imbalanced datasets while PR-AUC exposes actual model failure?',
        deliverableProject: 'Production-ready customer churn prediction system featuring out-of-fold target encoding and SHAP waterfall explainability.',
        milestones: [
          'Eliminated data leakage across stratified cross-validation folds',
          'Tuned XGBoost hyper-parameters (subsample, colsample, max_depth)',
          'Plotted SHAP summary charts to explain feature importance to non-tech stakeholders'
        ]
      },
      {
        id: 'ml_04',
        number: '04',
        title: 'Deep Learning, Transformers & Scaled LLM Fine-Tuning',
        duration: '6 Weeks',
        tag: 'Advanced AI & MLOps',
        status: 'Upcoming',
        overview: 'Modern architectures: Multi-Head Self-Attention, LoRA PEFT adapters, vector databases (FAISS/Pinecone), and low-latency FastAPI inference.',
        prerequisites: ['Stage 03: Classical Machine Learning'],
        topics: [
          'Transformer Architecture: Multi-Head Attention, Positional Encoding, LayerNorm',
          'Parameter-Efficient Fine-Tuning: LoRA, QLoRA (4-bit quantization), and PEFT',
          'Retrieval-Augmented Generation (RAG): Dense embeddings, chunking, and Cross-Encoder re-rankers',
          'MLOps & Production Serving: Docker containers, MLflow experiment tracking, and Triton inference'
        ],
        interviewTrap: 'Explain how LoRA decomposes the weight update matrix delta W into B * A and why rank r << d preserves expressiveness.',
        deliverableProject: 'Enterprise Document RAG Assistant with Hybrid Vector Search (FAISS + BM25) and sub-200ms LLM streaming responses.',
        milestones: [
          'Fine-tuned open-source LLM using LoRA on custom instructions',
          'Dockerized PyTorch inference endpoint with async worker threads',
          'Implemented Kolmogorov-Smirnov drift detection on streaming inputs'
        ]
      }
    ]
  },

  'Full Stack Developer': {
    title: 'Full Stack Developer',
    icon: '💻',
    badgeColor: 'border-blue-500/40 bg-blue-950/60 text-blue-300',
    curriculumDuration: '16 Weeks Industry Path',
    careerTarget: 'High-Scale SaaS & Product Unicorns',
    readinessBenchmark: '85% Milestone Completion required for Full Stack System Design rounds',
    stages: [
      {
        id: 'fs_01',
        number: '01',
        title: 'Modern React Architecture & Frontend Systems',
        duration: '3 Weeks',
        tag: 'Frontend Engine',
        status: 'Completed',
        overview: 'Production React architecture: Fiber reconciliation, custom hook encapsulation, layout performance, and Tailwind UI design.',
        prerequisites: ['Modern ES6+ JavaScript', 'DOM APIs'],
        topics: [
          'React Fiber architecture, concurrent rendering, and re-render profiling',
          'Custom hooks for business logic decoupling and state isolation',
          'Tailwind CSS layout design: Glassmorphic layers, responsive breakpoints, and accessibility',
          'State boundaries: Context API vs TanStack Query for server state caching'
        ],
        interviewTrap: 'Why does an inline object or function reference passed as a prop trigger unnecessary re-renders in memoized child components?',
        deliverableProject: 'High-performance interactive dashboard with glassmorphism, zero layout shift (CLS < 0.05), and keyboard navigation.',
        milestones: [
          'Refactored prop-drilling into clean context boundaries and custom hooks',
          'Eliminated redundant renders using React DevTools Profiler',
          'Passed lighthouse accessibility and mobile responsiveness audits'
        ]
      },
      {
        id: 'fs_02',
        number: '02',
        title: 'Backend API Engineering & PostgreSQL Data Modeling',
        duration: '4 Weeks',
        tag: 'Backend Core',
        status: 'Active',
        overview: 'Building secure, scalable RESTful APIs with Node.js, Express, Prisma ORM, and high-performance relational PostgreSQL modeling.',
        prerequisites: ['Stage 01: React Architecture'],
        topics: [
          'Express MVC structure, async error-handling middleware, and input sanitization',
          'PostgreSQL schema design: Compound indexes, foreign keys, and cascading rules',
          'Prisma ORM migrations and resolving the N+1 relational query bottleneck',
          'Authentication security: JWT rotation, HttpOnly cookie storage, and CSRF protection'
        ],
        interviewTrap: 'How does an index on (tenant_id, created_at DESC) optimize multi-tenant chronological queries compared to single-column indexes?',
        deliverableProject: 'Multi-tenant SaaS REST API with role-based access control (RBAC) and automated Prisma migrations.',
        milestones: [
          'Designed 3NF database schema with foreign key constraints',
          'Implemented secure refresh token rotation stored in HttpOnly cookies',
          'Wrote integration tests covering all critical CRUD endpoints'
        ]
      },
      {
        id: 'fs_03',
        number: '03',
        title: 'Real-Time WebSockets & Distributed Cache Architecture',
        duration: '4 Weeks',
        tag: 'Weak Area Focus',
        status: 'In Progress',
        overview: 'Low-latency distributed communication: bidirectional WebSockets, Redis pub/sub broadcasting, and background job queues.',
        prerequisites: ['Stage 02: Backend Engineering'],
        topics: [
          'WebSockets (Socket.io) duplex channels, rooms, and heartbeat health checks',
          'Redis Pub/Sub adapter to sync socket events across multiple clustered server processes',
          'Cache-Aside caching strategy with Redis TTLs to reduce SQL load by 80%',
          'Background message queues with BullMQ for async transactional jobs'
        ],
        interviewTrap: 'What happens when a WebSocket server cluster scales behind a round-robin load balancer without IP stickiness or a Redis adapter?',
        deliverableProject: 'Collaborative real-time canvas and chat hub capable of synchronizing state across 500 simulated users.',
        milestones: [
          'Setup Redis Pub/Sub adapter connecting two independent server instances',
          'Configured Redis rate-limiting on sensitive authentication endpoints',
          'Offloaded asynchronous PDF invoice generation to BullMQ workers'
        ]
      },
      {
        id: 'fs_04',
        number: '04',
        title: 'Microservices, Docker, CI/CD & Cloud Infrastructure',
        duration: '5 Weeks',
        tag: 'DevOps & Capstone',
        status: 'Upcoming',
        overview: 'Containerization, automated delivery pipelines, cloud deployment (AWS/Render), and OWASP web security hardening.',
        prerequisites: ['Stage 03: Real-Time Systems'],
        topics: [
          'Multi-stage Docker builds to reduce image footprints from 1.2GB to 85MB',
          'GitHub Actions CI/CD pipeline: Automated linting, test suites, and Docker push',
          'System Design: Distributed URL Shortener, Notification Fan-out, and Rate Limiters',
          'OWASP Security Hardening: Helmet headers, CORS origin whitelisting, and SQL injection audits'
        ],
        interviewTrap: 'In distributed system design, how do you handle cache stampedes when a high-traffic cache key expires simultaneously?',
        deliverableProject: 'Fully automated cloud-deployed web SaaS application running on containerized infrastructure with CI/CD.',
        milestones: [
          'Built multi-stage Alpine Dockerfile under 100MB footprint',
          'Configured automated GitHub Actions pipeline with zero failing steps',
          'Conducted security audit achieving A+ rating on Mozilla Observatory'
        ]
      }
    ]
  },

  'DSA & Placement Aspirant': {
    title: 'DSA & Placement Aspirant',
    icon: '⚡',
    badgeColor: 'border-amber-500/40 bg-amber-950/60 text-amber-300',
    curriculumDuration: '14 Weeks Placement Sprint',
    careerTarget: 'FAANG & Tier-1 Software Engineering Roles',
    readinessBenchmark: '85% Milestone Completion required for Tier-1 Coding Rounds',
    stages: [
      {
        id: 'dsa_01',
        number: '01',
        title: 'Linear Algorithms, Two-Pointers & Binary Search',
        duration: '3 Weeks',
        tag: 'Core Foundation',
        status: 'Completed',
        overview: 'Pattern identification on linear arrays: Two Pointers, Sliding Windows, Fast-Slow pointers, and Binary Search over answer spaces.',
        prerequisites: ['Time & Space Complexity Basics'],
        topics: [
          'Two Pointers (Left-Right inward and Fast-Slow runner patterns)',
          'Sliding Window invariants (Fixed size vs dynamic shrink/expand)',
          'Floyd Cycle Detection: Mathematical proof for loop start detection',
          'Binary Search on Answer Spaces: Monotonic predicate function ranges'
        ],
        interviewTrap: 'In binary search, why does `mid = low + (high - low) / 2` avoid bugs that occur in `(low + high) / 2`?',
        deliverableProject: 'Mastered 40 LeetCode Medium/Easy problems covering Two Pointers and Sliding Window.',
        milestones: [
          'Solved Two Sum II, 3Sum, and Minimum Window Substring in optimal time',
          'Analyzed exact space complexity trade-offs on paper before typing code',
          'Completed 30-minute timed algorithm sprint without IDE assistance'
        ]
      },
      {
        id: 'dsa_02',
        number: '02',
        title: 'Non-Linear Structures: Trees, BSTs & Priority Queues',
        duration: '3 Weeks',
        tag: 'Data Structures',
        status: 'Active',
        overview: 'Mastering hierarchical relationships: Binary Tree recursion, BST search properties, Tree Diameter, and Heap priority queues.',
        prerequisites: ['Stage 01: Linear Algorithms'],
        topics: [
          'Binary Tree DFS traversals (In-order, Pre-order, Post-order recursion)',
          'Level-Order Traversal (BFS) using Queue structures for shortest level paths',
          'Binary Search Tree properties: Validation, Kth Smallest, and Lowest Common Ancestor (LCA)',
          'Heaps & Priority Queues: Min-Heap for Top-K Frequent and Two-Heap Median tracking'
        ],
        interviewTrap: 'How does balancing a Max-Heap and a Min-Heap guarantee exact median retrieval in O(1) time?',
        deliverableProject: 'Built an in-memory priority scheduler using custom Binary Min-Heap logic.',
        milestones: [
          'Solved Lowest Common Ancestor (LCA) in both general binary trees and BSTs',
          'Implemented Find Median from Data Stream using balanced two heaps',
          'Achieved 100% test case pass rate on Binary Tree Diameter within 20 mins'
        ]
      },
      {
        id: 'dsa_03',
        number: '03',
        title: 'Graphs, Topological Sorting & Shortest Path Algorithms',
        duration: '4 Weeks',
        tag: 'Advanced Algorithms',
        status: 'In Progress',
        overview: 'Graph representations, BFS/DFS traversal, dependency resolution via Kahn Topological Sort, and Dijkstra shortest path.',
        prerequisites: ['Stage 02: Trees & Heaps'],
        topics: [
          'Graph representations: Adjacency Lists vs Matrices with space trade-offs',
          'Connected components, Island counting, and multi-source BFS grids',
          'Directed Acyclic Graphs (DAG): Kahn Algorithm and circular dependency detection',
          'Dijkstra Shortest Path using Min-Heap and Disjoint Set Union (Union-Find)'
        ],
        interviewTrap: 'Why does Dijkstra algorithm produce incorrect shortest paths on graphs containing negative edge weights?',
        deliverableProject: 'Dependency resolution package manager algorithm modeling prerequisite package installs as a DAG.',
        milestones: [
          'Implemented Kahn topological sort to solve Course Schedule I & II',
          'Coded Dijkstra shortest path algorithm from scratch in under 25 minutes',
          'Mastered Union-Find with Path Compression and Union by Rank'
        ]
      },
      {
        id: 'dsa_04',
        number: '04',
        title: 'Dynamic Programming (1D, 2D & Knapsack Patterns)',
        duration: '4 Weeks',
        tag: 'Weak Area Focus',
        status: 'Upcoming',
        overview: 'Overcoming the hardest placement hurdle: overlapping subproblems, optimal substructure, memoization, and iterative space compression.',
        prerequisites: ['Stage 03: Graph Algorithms'],
        topics: [
          '1D DP: Climbing Stairs, House Robber, and Coin Change (Unbounded)',
          '2D DP: Unique Paths, Longest Common Subsequence (LCS), and Edit Distance',
          '0/1 Knapsack patterns: Subset Sum, Partition Equal Subset Sum',
          'Longest Increasing Subsequence (LIS): From O(N^2) DP to O(N log N) patience sort'
        ],
        interviewTrap: 'How do you optimize 2D DP auxiliary space from O(N * W) down to O(W) in 0/1 Knapsack problems?',
        deliverableProject: 'Comprehensive repository of 50 classic Dynamic Programming patterns solved with time/space derivations.',
        milestones: [
          'Drew DP recurrence relations on paper before writing iterative code',
          'Optimized 2D grid path state space down to a single rolling 1D array',
          'Completed FAANG live coding mock interview simulation with high marks'
        ]
      }
    ]
  },

  'AI & Data Scientist': {
    title: 'AI & Data Scientist',
    icon: '📊',
    badgeColor: 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300',
    curriculumDuration: '16 Weeks Industry Path',
    careerTarget: 'Strategic Analytics, Quant Finance & AI Product Teams',
    readinessBenchmark: '85% Milestone Completion required for Data Scientist Case Rounds',
    stages: [
      {
        id: 'ds_01',
        number: '01',
        title: 'Statistical Inference, Probability & A/B Experimentation',
        duration: '3 Weeks',
        tag: 'Core Statistics',
        status: 'Completed',
        overview: 'Rigorous experimentation: Central Limit Theorem, hypothesis testing, p-values, sample sizing, and avoiding Type I/II errors.',
        prerequisites: ['Calculus & Linear Algebra Basics'],
        topics: [
          'Probability distributions: Gaussian, Binomial, Poisson, and Heavy Tails',
          'Hypothesis testing: Two-sample T-test, Z-score, ANOVA, and Chi-Square tests',
          'A/B Testing design: Statistical power (1 - Beta), significance level (Alpha), and MDE',
          'Experimentation pitfalls: Simpson Paradox, Peeking Bias, and Multiple Testing Corrections'
        ],
        interviewTrap: 'Variant B increased conversion by 4% with p = 0.03, but total revenue dropped 2%. Would you roll out to production?',
        deliverableProject: 'Automated A/B experiment evaluation engine with statistical power calculation and sample sizing.',
        milestones: [
          'Simulated Central Limit Theorem convergence over non-normal distributions',
          'Calculated minimum sample size required for high-confidence A/B tests',
          'Identified and corrected for variance skewness using log transforms'
        ]
      },
      {
        id: 'ds_02',
        number: '02',
        title: 'Advanced Feature Engineering & SQL Data Warehousing',
        duration: '4 Weeks',
        tag: 'Data Wrangling',
        status: 'Active',
        overview: 'Data pipelines: Multivariate imputation, out-of-fold target encoding, Yeo-Johnson transforms, and complex SQL window analytics.',
        prerequisites: ['Stage 01: Statistical Inference'],
        topics: [
          'Handling missing values: MICE (Multivariate Imputation by Chained Equations) vs KNN',
          'Categorical encoding: Out-of-fold target encoding without label leakage',
          'Power transforms: Box-Cox vs Yeo-Johnson for negative and zero numerical inputs',
          'SQL for Analytics: Recursive CTEs, ROW_NUMBER, LAG, LEAD, and Cohort retention matrices'
        ],
        interviewTrap: 'Why does calculating target encoding averages across the full training set cause severe data leakage during validation?',
        deliverableProject: 'Cohort Retention & Customer Lifetime Value (LTV) analytics pipeline built with recursive SQL queries.',
        milestones: [
          'Eliminated categorical label leakage via cross-validation folds',
          'Wrote recursive SQL queries computing Day-30 user retention cohorts',
          'Applied Yeo-Johnson transformations to eliminate long-tail feature skew'
        ]
      },
      {
        id: 'ds_03',
        number: '03',
        title: 'Predictive Modeling, Tree Boosting & Model Explainability',
        duration: '4 Weeks',
        tag: 'Predictive Modeling',
        status: 'In Progress',
        overview: 'Supervised modeling: CatBoost vs LightGBM, handling severe 1:99 class imbalances, and game-theoretic SHAP explainability.',
        prerequisites: ['Stage 02: Feature Engineering'],
        topics: [
          'Gradient boosting on tabular data: LightGBM vs CatBoost on categorical features',
          'Severe class imbalance: Precision-Recall AUC optimization, Cost-sensitive matrices, and SMOTE',
          'Model Explainability: Shapley Additive exPlanations (SHAP) global and local waterfall charts',
          'Dimensionality Reduction: UMAP and t-SNE for high-dimensional feature visualization'
        ],
        interviewTrap: 'Why is ROC-AUC misleading when evaluating fraud detection models where 99.8% of cases are non-fraudulent?',
        deliverableProject: 'Credit Card Fraud Detection Engine with PR-AUC optimization and individual SHAP decision waterfalls.',
        milestones: [
          'Benchmarked LightGBM against baseline Random Forest models',
          'Plotted SHAP waterfall charts explaining individual prediction errors',
          'Achieved superior PR-AUC on heavily imbalanced evaluation splits'
        ]
      },
      {
        id: 'ds_04',
        number: '04',
        title: 'Dense NLP Embeddings, Vector Search & RAG Systems',
        duration: '5 Weeks',
        tag: 'Weak Area Focus',
        status: 'Upcoming',
        overview: 'Semantic AI: Dense embeddings (Sentence-BERT), vector similarity search (FAISS), Cross-Encoder re-rankers, and data drift monitoring.',
        prerequisites: ['Stage 03: Predictive Modeling'],
        topics: [
          'Dense semantic embeddings vs sparse TF-IDF representations',
          'Vector Databases: Inverted File Indexing (IVF-PQ) and cosine similarity in FAISS',
          'Retrieval-Augmented Generation (RAG): Parent-child chunking and context re-rankers',
          'Production Monitoring: Kolmogorov-Smirnov distribution drift detection (Evidently AI)'
        ],
        interviewTrap: 'What is the role of a Cross-Encoder Re-Ranker in RAG pipelines and why not use it for all 10,000 document chunks?',
        deliverableProject: 'Semantic Document Intelligence Search Engine querying 100,000 PDFs with sub-15ms vector retrieval.',
        milestones: [
          'Built dense vector search index utilizing FAISS IVF-PQ clustering',
          'Integrated Cross-Encoder re-ranker to boost top-5 retrieval precision',
          'Setup automated data drift alerts detecting distribution shifts in prod'
        ]
      }
    ]
  }
};

export default function Roadmap({ user }) {
  const currentRole = user?.goal || 'Machine Learning Engineer';
  const roadmapData = ROLE_ROADMAPS[currentRole] || ROLE_ROADMAPS['Machine Learning Engineer'];

  // Persistent Milestones State
  const [checkedMilestones, setCheckedMilestones] = useState(() => {
    try {
      const saved = localStorage.getItem(`mentor_roadmap_milestones_${user?.email || 'default'}_${currentRole}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Active Stage Focus
  const [selectedStageId, setSelectedStageId] = useState(roadmapData.stages[1].id);
  // Stage Detail Modal / Drawer State
  const [activeModalStage, setActiveModalStage] = useState(null);

  useEffect(() => {
    localStorage.setItem(
      `mentor_roadmap_milestones_${user?.email || 'default'}_${currentRole}`,
      JSON.stringify(checkedMilestones)
    );
  }, [checkedMilestones, user?.email, currentRole]);

  const toggleMilestone = (milestoneKey) => {
    setCheckedMilestones(prev => ({
      ...prev,
      [milestoneKey]: !prev[milestoneKey]
    }));
  };

  // Metrics Calculation
  const allMilestonesCount = roadmapData.stages.reduce((acc, st) => acc + st.milestones.length, 0);
  const completedMilestonesCount = Object.values(checkedMilestones).filter(Boolean).length;
  const roadmapCompletionPercentage = Math.round((completedMilestonesCount / allMilestonesCount) * 100);

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner">
            {roadmapData.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white tracking-wide">Goal-Based Adaptive Learning Roadmap</h1>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${roadmapData.badgeColor}`}>
                {roadmapData.title}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Ordered learning stages, skill prerequisites & adaptive milestones
            </p>
          </div>
        </div>

        {/* Overall Completion Progress Meter */}
        <div className="p-3.5 px-4 rounded-2xl bg-[#070b18] border border-slate-800 flex items-center gap-4 min-w-[260px]">
          <div className="relative h-12 w-12 flex items-center justify-center rounded-full bg-slate-900 border border-indigo-500/40 shrink-0">
            <span className="text-xs font-black text-indigo-400">{roadmapCompletionPercentage}%</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-white">Roadmap Milestones</span>
              <span className="text-[10px] text-slate-400 font-mono">{completedMilestonesCount}/{allMilestonesCount} Done</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${roadmapCompletionPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Target Benchmark Bar */}
      <div className="p-5 rounded-3xl bg-[#0f172a]/90 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-xl">🎯</span>
          <div>
            <div className="text-xs font-bold text-white uppercase tracking-wider">
              Career Target: {roadmapData.careerTarget}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {roadmapData.readinessBenchmark}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-800/80 px-3 py-1 rounded-full">
            ● Stage 01 Verified
          </span>
          <span className="text-indigo-400 font-bold bg-indigo-950/60 border border-indigo-800/80 px-3 py-1 rounded-full animate-pulse">
            ⚡ Stage 02 Active Target
          </span>
        </div>
      </div>

      {/* 3. Ordered Learning Stages Timeline */}
      <div className="relative space-y-4">
        {roadmapData.stages.map((stage, idx) => {
          const isSelected = selectedStageId === stage.id;
          const stageMilestones = stage.milestones;
          const stageCompletedCount = stageMilestones.filter((_, mIdx) => checkedMilestones[`${stage.id}_${mIdx}`]).length;
          const isStageFinished = stageCompletedCount === stageMilestones.length;

          let statusBadgeClass = 'bg-slate-900 border-slate-800 text-slate-400';
          if (stage.status === 'Completed' || isStageFinished) {
            statusBadgeClass = 'bg-emerald-950/60 border-emerald-700/80 text-emerald-300';
          } else if (stage.status === 'In Progress') {
            statusBadgeClass = 'bg-indigo-950/60 border-indigo-700/80 text-indigo-300';
          } else if (stage.status === 'Active') {
            statusBadgeClass = 'bg-blue-950/60 border-blue-700/80 text-blue-300';
          }

          return (
            <div
              key={stage.id}
              className={`p-6 rounded-3xl border transition-all duration-300 ${
                isSelected
                  ? 'bg-[#0f172a]/95 border-indigo-500/80 shadow-2xl shadow-indigo-950/40 ring-1 ring-indigo-500/40'
                  : 'bg-[#0f172a]/80 border-slate-800/90 hover:border-slate-700'
              }`}
            >
              {/* Stage Top Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`h-11 w-11 rounded-2xl flex items-center justify-center text-sm font-black font-mono shrink-0 ${
                    stage.status === 'Completed' || isStageFinished
                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30'
                      : isSelected
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'bg-slate-900 border border-slate-800 text-slate-400'
                  }`}>
                    {stage.status === 'Completed' || isStageFinished ? '✓' : stage.number}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono font-bold text-indigo-400 uppercase">
                        STAGE {stage.number} • {stage.duration}
                      </span>
                      <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {stage.tag}
                      </span>
                    </div>
                    <h2 className="text-sm font-bold text-white mt-0.5">{stage.title}</h2>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${statusBadgeClass}`}>
                    {isStageFinished ? 'Stage Mastered' : stage.status}
                  </span>
                  <button
                    onClick={() => setActiveModalStage(stage)}
                    className="px-3 py-1 rounded-xl bg-indigo-600/20 border border-indigo-500/40 text-indigo-300 text-xs font-semibold hover:bg-indigo-600/30 transition cursor-pointer"
                  >
                    Deep Dive 🔍
                  </button>
                  <button
                    onClick={() => setSelectedStageId(isSelected ? '' : stage.id)}
                    className="px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold hover:bg-slate-800 transition cursor-pointer"
                  >
                    {isSelected ? 'Collapse ▴' : 'Milestones ▾'}
                  </button>
                </div>
              </div>

              {/* Stage Overview & Prerequisites */}
              <div className="py-3">
                <p className="text-xs text-slate-300 leading-relaxed">{stage.overview}</p>
                <div className="flex items-center gap-2 mt-2.5">
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Prerequisites:</span>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {stage.prerequisites.map((p, pIdx) => (
                      <span key={pIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#070b18] border border-slate-800 text-slate-400">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Deliverable Project Card */}
              <div className="p-3.5 rounded-2xl bg-[#070b18] border border-slate-800/80 flex items-start gap-2.5">
                <span className="text-sm shrink-0 mt-0.5">🚀</span>
                <div>
                  <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Production Deliverable</div>
                  <p className="text-xs text-slate-300 mt-0.5 leading-relaxed">{stage.deliverableProject}</p>
                </div>
              </div>

              {/* Interactive Milestones Checkbox Grid (Expandable) */}
              {isSelected && (
                <div className="mt-3 pt-3 border-t border-slate-800/80 space-y-2.5 animate-fadeIn">
                  <div className="flex items-center justify-between text-[11px] font-bold text-slate-400">
                    <span className="uppercase tracking-wider">Required Stage Milestones</span>
                    <span className="font-mono">{stageCompletedCount} / {stageMilestones.length} Completed</span>
                  </div>

                  <div className="space-y-2">
                    {stageMilestones.map((milestone, mIdx) => {
                      const mKey = `${stage.id}_${mIdx}`;
                      const isDone = !!checkedMilestones[mKey];

                      return (
                        <label
                          key={mIdx}
                          className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                            isDone
                              ? 'bg-emerald-950/20 border-emerald-800/60 text-emerald-300'
                              : 'bg-[#070b18] border-slate-800/80 text-slate-300 hover:border-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="checkbox"
                              checked={isDone}
                              onChange={() => toggleMilestone(mKey)}
                              className="h-4 w-4 rounded accent-indigo-600 cursor-pointer"
                            />
                            <span className="text-xs font-semibold leading-relaxed">{milestone}</span>
                          </div>
                          <span className={`text-[10px] font-bold font-mono px-2 py-0.5 rounded ${
                            isDone ? 'bg-emerald-900/60 text-emerald-300' : 'bg-slate-900 text-slate-500'
                          }`}>
                            {isDone ? '✓ Verified' : 'Pending'}
                          </span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* 4. Deep-Dive Modal Drawer (Client-Grade Analysis View) */}
      {activeModalStage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-2xl p-6 rounded-3xl bg-[#0f172a] border border-slate-700 shadow-2xl max-h-[85vh] overflow-y-auto space-y-5">
            
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-indigo-950 border border-indigo-700 text-indigo-300">
                  STAGE {activeModalStage.number} DEEP DIVE
                </span>
                <span className="text-sm font-bold text-white">{activeModalStage.title}</span>
              </div>
              <button
                onClick={() => setActiveModalStage(null)}
                className="h-8 w-8 rounded-full bg-slate-900 border border-slate-800 text-slate-400 hover:text-white flex items-center justify-center text-xs font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* In-depth Topic Matrix */}
            <div>
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Architectural Focus Areas</h4>
              <div className="space-y-1.5">
                {activeModalStage.topics.map((t, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[#070b18] border border-slate-800 text-xs text-slate-200 flex items-center gap-2">
                    <span className="text-indigo-400 font-bold">›</span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technical Interview Trap Card */}
            <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-800/40">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <span>⚠️</span> Common Interview Failure Trap
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                "{activeModalStage.interviewTrap}"
              </p>
            </div>

            {/* Deliverable Project */}
            <div className="p-4 rounded-2xl bg-indigo-950/20 border border-indigo-800/40">
              <div className="text-xs font-bold text-indigo-300 uppercase tracking-wider mb-1">
                Production Deliverable Requirement
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activeModalStage.deliverableProject}
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setActiveModalStage(null)}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg transition cursor-pointer"
              >
                Close Deep Dive
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 5. Adaptive Recommendation Footnote */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h4 className="text-xs font-bold text-white uppercase tracking-wider">
            Adaptive Recommendation Engine
          </h4>
          <p className="text-[11px] text-slate-400 mt-0.5">
            Stage difficulty calibrates automatically based on diagnostic quiz scores and daily task logs.
          </p>
        </div>

        <button
          onClick={() => {
            alert(`Curriculum roadmap verified for ${roadmapData.title}! Continue tracking milestones on the Dashboard.`);
          }}
          className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer shrink-0"
        >
          Confirm Roadmap Alignment →
        </button>
      </div>

    </div>
  );
}
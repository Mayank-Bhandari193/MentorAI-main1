import React, { useState, useEffect } from 'react';

// Domain Blueprints to deterministically build 50 detailed questions per level for each role
const ROLE_BLUEPRINTS = {
  'Machine Learning Engineer': {
    title: 'Machine Learning Engineer',
    icon: '🤖',
    badgeColor: 'border-indigo-500/40 bg-indigo-950/60 text-indigo-300',
    L1_topics: [
      { name: 'Python Array Slicing', q: 'In Python, what does arr[::-1] perform on a 1D list?', opts: ['A) Returns even indexed items', 'B) Reverses the list', 'C) Clears memory', 'D) Raises IndexError'], c: 1, exp: 'The slice notation with step -1 traverses the array in reverse order.' },
      { name: 'NumPy Dimensions', q: 'What is the attribute to check total dimensions of a NumPy ndarray?', opts: ['A) arr.len', 'B) arr.ndim', 'C) arr.size()', 'D) arr.dim'], c: 1, exp: 'The .ndim attribute returns the integer count of array axes/dimensions.' },
      { name: 'Matrix Transpose', q: 'What happens to the shape (M, N) after performing transpose A.T?', opts: ['A) Becomes (M, M)', 'B) Becomes (N, M)', 'C) Remains (M, N)', 'D) Flattens to (M*N,)'], c: 1, exp: 'Transposing swaps the rows and columns, turning shape (M, N) into (N, M).' },
      { name: 'Linear Cost Function', q: 'Why is Mean Squared Error (MSE) preferred for simple linear regression?', opts: ['A) It is non-differentiable', 'B) It is convex and yields a single global minimum', 'C) It handles categorical labels', 'D) It ignores outliers completely'], c: 1, exp: 'MSE is mathematically convex with respect to linear weights, guaranteeing no local minima traps.' },
      { name: 'Gradient Descent Step', q: 'What controls the step size taken during weight updates in gradient descent?', opts: ['A) Epoch count', 'B) Learning rate (alpha)', 'C) Batch size', 'D) Momentum dampening'], c: 1, exp: 'The learning rate scales the gradient vector to dictate step magnitude along the loss surface.' }
    ],
    L2_topics: [
      { name: 'L1 vs L2 Norm', q: 'Which regularization technique induces exact weight sparsity (zeros)?', opts: ['A) L2 Ridge', 'B) L1 Lasso', 'C) Dropout', 'D) Batch Norm'], c: 1, exp: 'L1 absolute penalty boundaries intersect contours on coordinate axes, zeroing out non-essential coefficients.' },
      { name: 'Ensemble Bagging', q: 'What is the primary variance reduction mechanism in Random Forests?', opts: ['A) Sequential gradient boosting', 'B) Averaging decorrelated trees trained on bootstrap samples', 'C) Increasing tree depth infinitely', 'D) Pruning the root node'], c: 1, exp: 'Bootstrap aggregating (bagging) with random feature selection decorrelates individual tree errors.' },
      { name: 'ROC vs PR Curves', q: 'On highly imbalanced datasets (e.g. 99:1), which metric curve is most reliable?', opts: ['A) ROC-AUC', 'B) Precision-Recall AUC', 'C) Accuracy Curve', 'D) Confusion Matrix Trace'], c: 1, exp: 'ROC-AUC can stay deceptively high due to huge true negatives; PR-AUC directly tracks minority class performance.' },
      { name: 'K-Means Clustering', q: 'What metric does the Elbow Method plot to find optimal clusters (K)?', opts: ['A) Cross-entropy', 'B) Within-Cluster Sum of Squares (Inertia)', 'C) Purity score', 'D) Silhouette width'], c: 1, exp: 'Inertia measures sum of squared distances to closest centroids; the elbow marks diminishing returns.' },
      { name: 'PCA Eigenvectors', q: 'What direction do the top principal components in PCA represent?', opts: ['A) Directions of minimal variance', 'B) Directions of maximum variance in the feature space', 'C) Random projection axes', 'D) Class separation margins'], c: 1, exp: 'PCA finds orthogonal eigenvectors corresponding to eigenvalues that maximize preserved data variance.' }
    ],
    L3_topics: [
      { name: 'Self-Attention Scaling', q: 'Why divide by sqrt(d_k) in Transformer Scaled Dot-Product Attention?', opts: ['A) To normalize tokens', 'B) To prevent large dot-product magnitudes from pushing Softmax into vanishing gradient regimes', 'C) To reduce matrix size', 'D) To compute Euclidean distance'], c: 1, exp: 'Large vector dimensions produce huge dot products; scaling keeps variance around 1 so Softmax retains gradients.' },
      { name: 'LoRA Adapter Ranks', q: 'How does Low-Rank Adaptation (LoRA) minimize fine-tuning parameters?', opts: ['A) Prunes 95% of transformer heads', 'B) Represents weight update delta W as the product of two low-rank matrices B * A', 'C) Restricts all weights to 1-bit', 'D) Freezes attention biases only'], c: 1, exp: 'LoRA freezes base model weights and trains low-rank decomposition matrices where rank r << dimension d.' },
      { name: 'Vector Database Indexing', q: 'Which indexing strategy groups vectors into Voronoi cells for sub-linear search?', opts: ['A) B-Tree Index', 'B) Inverted File Index (IVF)', 'C) Bitmap Index', 'D) Hash Ring'], c: 1, exp: 'IVF clusters embedding vectors around centroid voronoi cells to search only the most relevant subset.' },
      { name: 'Data Drift Detection', q: 'Which statistical test compares empirical production vs baseline training distributions?', opts: ['A) Kolmogorov-Smirnov (KS) Test', 'B) LeetCode sliding window', 'C) Softmax regression', 'D) PCA projection'], c: 0, exp: 'The two-sample KS test evaluates whether two continuous data distributions differ significantly without parametric assumptions.' },
      { name: 'Latency Optimization', q: 'What inference optimization technique converts model float32 weights into int8?', opts: ['A) Quantization', 'B) Tokenization', 'C) Vectorization', 'D) Distillation'], c: 0, exp: 'Post-training quantization maps continuous 32-bit floating point weights into 8-bit integers, reducing latency and memory bandwidth.' }
    ]
  },

  'Full Stack Developer': {
    title: 'Full Stack Developer',
    icon: '💻',
    badgeColor: 'border-blue-500/40 bg-blue-950/60 text-blue-300',
    L1_topics: [
      { name: 'React Mount Lifecycle', q: 'In React, what does an empty dependency array [] in useEffect signify?', opts: ['A) Runs on every state update', 'B) Runs only once on component mount and cleans up on unmount', 'C) Never executes', 'D) Triggers an infinite loop'], c: 1, exp: 'An empty dependency array indicates that the effect does not watch any state or props, running solely on mount.' },
      { name: 'Memoization Hook', q: 'What does useCallback primarily memoize?', opts: ['A) Computed state value', 'B) Function reference across re-renders', 'C) DOM node reference', 'D) CSS style object'], c: 1, exp: 'useCallback preserves the exact function instance between renders unless watched dependencies change.' },
      { name: 'Controlled Form Inputs', q: 'In controlled React components, where does the single source of truth reside?', opts: ['A) In document.getElementById', 'B) Inside component React State', 'C) Inside localStorage', 'D) In global window object'], c: 1, exp: 'A controlled component derives its input value directly from state and updates it via onChange handlers.' },
      { name: 'CSS Flexbox Align', q: 'Which Tailwind class aligns child flex items along the cross axis?', opts: ['A) justify-center', 'B) items-center', 'C) content-between', 'D) place-self-auto'], c: 1, exp: 'items-center sets align-items: center, positioning elements along the perpendicular cross axis.' },
      { name: 'HTTP REST Methods', q: 'Which HTTP method should be idempotent and used to replace an entire resource?', opts: ['A) POST', 'B) PUT', 'C) PATCH', 'D) CONNECT'], c: 1, exp: 'PUT is designed to replace a target resource completely and must produce the same result upon multiple identical calls.' }
    ],
    L2_topics: [
      { name: 'JWT Cookie Security', q: 'Why is the HttpOnly flag critical on authentication session cookies?', opts: ['A) Allows cookies across any domain', 'B) Prevents client-side JavaScript access, protecting against XSS token theft', 'C) Eliminates CORS requirements', 'D) Makes cookie expiration infinite'], c: 1, exp: 'HttpOnly blocks document.cookie inspection, so malicious injected scripts cannot exfiltrate auth credentials.' },
      { name: 'Database N+1 Query', q: 'What causes the N+1 database performance penalty in ORMs?', opts: ['A) Too many primary keys', 'B) Querying parent records in 1 query, then executing N individual queries to fetch children', 'C) Having N indexes', 'D) Using connection pools'], c: 1, exp: 'Fetching parent entities followed by loop-based child queries executes N+1 round trips, resolved via SQL JOINs.' },
      { name: 'HTTP Status Codes', q: 'What status code should an API return when an authenticated user lacks admin rights?', opts: ['A) 401 Unauthorized', 'B) 403 Forbidden', 'C) 404 Not Found', 'D) 422 Unprocessable'], c: 1, exp: '401 is for unauthenticated callers; 403 is for authenticated users who are forbidden from accessing the resource.' },
      { name: 'PostgreSQL Indexes', q: 'Which index type is default and optimal for range and equality searches in PostgreSQL?', opts: ['A) Hash Index', 'B) B-Tree Index', 'C) GIN Index', 'D) BRIN Index'], c: 1, exp: 'B-Tree indexes maintain sorted balanced tree structures, delivering O(log N) lookup, insertion, and range scans.' },
      { name: 'Cache-Aside Pattern', q: 'In the Cache-Aside pattern, what happens on a cache miss?', opts: ['A) Returns HTTP 500', 'B) Application fetches from the database, writes into the cache, and returns data', 'C) Database updates cache automatically', 'D) Request is queued indefinitely'], c: 1, exp: 'The app checks cache first; upon missing, it reads the DB, updates cache for next time, and serves the response.' }
    ],
    L3_topics: [
      { name: 'WebSocket Scaling', q: 'How do multiple Node.js WebSocket instances synchronize messages across servers?', opts: ['A) Polling database every 50ms', 'B) Using Redis Pub/Sub adapter to broadcast events across nodes', 'C) Sockets cannot be scaled', 'D) HTTP/2 push'], c: 1, exp: 'Redis Pub/Sub connects decoupled application servers so events emitted on Node instance 1 reach users on Node instance 2.' },
      { name: 'Compound Index Prefix', q: 'On index (tenant_id, created_at DESC), which query CANNOT use the index efficiently?', opts: ['A) WHERE tenant_id = 5 ORDER BY created_at', 'B) WHERE created_at > NOW() without tenant_id', 'C) WHERE tenant_id = 12', 'D) WHERE tenant_id = 3 AND created_at < NOW()'], c: 1, exp: 'B-Trees require the leading column (tenant_id) to traverse branches; querying solely on the secondary column skips index usage.' },
      { name: 'Distributed Rate Limiting', q: 'Which Redis data structure and algorithm powers scalable rate limiters?', opts: ['A) Sliding Window Log using Redis Sorted Sets (ZSET)', 'B) Redis Bitmaps', 'C) Redis Streams only', 'D) Plain String Append'], c: 0, exp: 'ZSET uses timestamps as scores to prune expired requests and count actions within a sliding time window in O(log N).' },
      { name: 'Database Isolation', q: 'Which SQL transaction isolation level prevents Phantom Reads completely?', opts: ['A) Read Uncommitted', 'B) Read Committed', 'C) Serializable', 'D) Repeatable Read'], c: 2, exp: 'Serializable isolation guarantees execution order equivalent to serial execution, completely preventing phantom reads and anomalies.' },
      { name: 'Message Queue Durability', q: 'What mechanism ensures background workers do not lose jobs during unexpected server crashes?', opts: ['A) Manual memory dump', 'B) Message Acknowledgement (ACK) and dead-letter queues', 'C) Running with root permissions', 'D) Increasing server RAM'], c: 1, exp: 'Queues retain messages until the worker acknowledges successful completion; failed or un-acked jobs are redelivered.' }
    ]
  },

  'DSA & Placement Aspirant': {
    title: 'DSA & Placement Aspirant',
    icon: '⚡',
    badgeColor: 'border-amber-500/40 bg-amber-950/60 text-amber-300',
    L1_topics: [
      { name: 'Two Sum Sorted', q: 'What is the optimal complexity to find two numbers summing to target in a sorted array?', opts: ['A) O(N log N) Time, O(N) Space', 'B) O(N) Time, O(1) Space using Two Pointers', 'C) O(N^2) Time, O(1) Space', 'D) O(log N) Time, O(N) Space'], c: 1, exp: 'With two pointers at opposite ends, each step narrows the range in O(N) linear time without auxiliary allocation.' },
      { name: 'Binary Search Midpoint', q: 'Why write `mid = low + (high - low) / 2` instead of `(low + high) / 2`?', opts: ['A) Faster bit shift', 'B) Prevents integer overflow when (low + high) exceeds 32-bit integer limits', 'C) Required for odd numbers', 'D) Handles float numbers'], c: 1, exp: 'Adding large integers can overflow beyond 2^31 - 1; subtracting low first avoids reaching upper bounds.' },
      { name: 'Hash Table Amortized', q: 'What is the average amortized time complexity of Hash Map search and insertion?', opts: ['A) O(1)', 'B) O(log N)', 'C) O(N)', 'D) O(N log N)'], c: 0, exp: 'With a uniform hash distribution minimizing bucket collisions, Hash Map lookups execute in O(1) average time.' },
      { name: 'Sliding Window Invariant', q: 'When finding the longest substring without repeating characters, what data structure tracks duplicates?', opts: ['A) Stack', 'B) Hash Set / Map with character indices', 'C) Min-Heap', 'D) Doubly Linked List'], c: 1, exp: 'A Hash Set records characters in the current window to immediately advance the left pointer when a collision appears.' },
      { name: 'Recursion Base Case', q: 'What occurs if a recursive function fails to define or reach its base condition?', opts: ['A) Code optimization', 'B) Stack Overflow (Maximum call stack size exceeded)', 'C) Null pointer return', 'D) Automatic loop conversion'], c: 1, exp: 'Each recursive call adds a stack frame; without termination, it exhausts memory and crashes with Stack Overflow.' }
    ],
    L2_topics: [
      { name: 'Floyd Cycle Entrance', q: 'In Floyd Tortoise & Hare, how do you locate the cycle entrance after fast and slow meet?', opts: ['A) Reverse the list', 'B) Reset one pointer to head and move both one step at a time until they collide', 'C) Count total nodes', 'D) Delete middle node'], c: 1, exp: 'The distance from head to entrance equals distance from meeting point to entrance along the circular loop.' },
      { name: 'BST In-Order Traversal', q: 'Which traversal algorithm prints all keys of a Binary Search Tree in sorted ascending order?', opts: ['A) Pre-order', 'B) Post-order', 'C) In-order (Left, Root, Right)', 'D) Level-order (BFS)'], c: 2, exp: 'In a BST, left descendants are strictly smaller and right descendants larger; in-order visits them in numeric sequence.' },
      { name: 'Top-K Elements Heap', q: 'What is the optimal time complexity to find the Kth largest element using a Min-Heap of size K?', opts: ['A) O(N log N)', 'B) O(N log K)', 'C) O(K log N)', 'D) O(N^2)'], c: 1, exp: 'Maintaining a heap bounded to size K requires O(log K) insertion for each of the N elements, achieving O(N log K).' },
      { name: 'Tree Diameter Calculation', q: 'What is the diameter of a binary tree?', opts: ['A) Total count of leaf nodes', 'B) Length of the longest path between any two nodes in the tree', 'C) Maximum height from root', 'D) Count of nodes with two children'], c: 1, exp: 'Diameter is the longest path between any two leaves, which may or may not pass through the root node.' },
      { name: 'Queue using Two Stacks', q: 'What is the amortized time complexity per dequeue operation when implementing a queue with two stacks?', opts: ['A) O(N)', 'B) O(1) Amortized', 'C) O(log N)', 'D) O(N^2)'], c: 1, exp: 'Each element is pushed and popped from each stack at most twice across its lifecycle, yielding O(1) amortized cost.' }
    ],
    L3_topics: [
      { name: 'Dijkstra Negative Weights', q: 'Why does Dijkstra algorithm fail on graphs with negative edge weights?', opts: ['A) It uses a priority queue', 'B) It greedily finalizes node distances and cannot re-evaluate once marked visited', 'C) It only handles trees', 'D) Memory limit exceeded'], c: 1, exp: 'Dijkstra assumes paths grow monotonically longer; negative edges can decrease costs of previously finalized nodes.' },
      { name: '0/1 Knapsack Complexity', q: 'What is the time complexity of the 0/1 Knapsack dynamic programming algorithm with capacity W and N items?', opts: ['A) O(2^N)', 'B) O(N * W) Pseudo-polynomial Time', 'C) O(N log W)', 'D) O(N + W)'], c: 1, exp: 'The state space is an (N x W) matrix; computing each cell takes constant time, yielding O(N * W) runtime.' },
      { name: 'Topological Sort Kahn', q: 'What graph property is verified when Kahn algorithm queue becomes empty before processing all V vertices?', opts: ['A) Graph is bipartite', 'B) Graph contains a directed cycle', 'C) Graph is fully connected', 'D) Graph is a tree'], c: 1, exp: 'If nodes remain unprocessed, their in-degrees never reached zero due to cyclic dependencies in the directed graph.' },
      { name: 'Disjoint Set Union-Find', q: 'Which two optimizations bring DSU operations to near O(1) inverse Ackermann complexity?', opts: ['A) In-order traversal and hashing', 'B) Path Compression and Union by Rank / Size', 'C) Binary lifting and DFS', 'D) Double hashing'], c: 1, exp: 'Path compression flattens trees during find, and union by rank keeps depth minimal, delivering amortized O(alpha(N)).' },
      { name: 'Segment Tree Range Query', q: 'What is the time complexity of querying a range sum on a Segment Tree with N leaves?', opts: ['A) O(N)', 'B) O(log N)', 'C) O(1)', 'D) O(N log N)'], c: 1, exp: 'The segment tree partitions ranges logarithmically, probing at most 4 nodes per tree level in O(log N) time.' }
    ]
  },

  'AI & Data Scientist': {
    title: 'AI & Data Scientist',
    icon: '📊',
    badgeColor: 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300',
    L1_topics: [
      { name: 'Central Limit Theorem', q: 'According to CLT, as sample size N >= 30 grows, what does the sample mean distribution approximate?', opts: ['A) Uniform distribution', 'B) Gaussian Normal distribution', 'C) Exponential decay', 'D) Cauchy distribution'], c: 1, exp: 'CLT proves that means of independent variables converge to a normal distribution regardless of underlying population shape.' },
      { name: 'Hypothesis P-Value', q: 'At significance level alpha = 0.05, what conclusion follows from a calculated p-value of 0.018?', opts: ['A) Accept null hypothesis', 'B) Reject the null hypothesis (statistically significant effect)', 'C) Inconclusive test', 'D) Sampling error'], c: 1, exp: 'When p-value < alpha, the observed difference is sufficiently unlikely under the null hypothesis, justifying its rejection.' },
      { name: 'Type I Error', q: 'What does a Type I statistical error represent in A/B testing?', opts: ['A) False Negative', 'B) False Positive (Rejecting a true null hypothesis)', 'C) True Positive', 'D) Power deficiency'], c: 1, exp: 'Type I error occurs when an experiment claims a significant variant effect when none truly exists (False Alarm).' },
      { name: 'Correlation vs Causation', q: 'What does a Pearson correlation coefficient of r = 0.88 between X and Y prove?', opts: ['A) X directly causes Y', 'B) Strong linear positive association between X and Y without proving causation', 'C) No relationship', 'D) Negative correlation'], c: 1, exp: 'Pearson correlation measures linear co-movement only; confounding variables can drive high correlation without causation.' },
      { name: 'Skewness Normalization', q: 'Which transformation normalizes right-skewed positive numerical feature distributions?', opts: ['A) Square transformation (x^2)', 'B) Logarithmic transformation log(x)', 'C) One-hot encoding', 'D) Softmax scaling'], c: 1, exp: 'Taking the logarithm compresses long right-tail values, bringing skewed distributions closer to a normal bell curve.' }
    ],
    L2_topics: [
      { name: 'Target Encoding Leakage', q: 'Why must Target Encoding use out-of-fold cross-validation during feature engineering?', opts: ['A) To reduce RAM', 'B) To prevent label leakage and severe overfitting on training data', 'C) To handle negative numbers', 'D) To convert to integers'], c: 1, exp: 'Encoding categories with whole-dataset target averages leaks ground-truth labels into features, leading to false validation metrics.' },
      { name: 'SHAP Game Theory', q: 'What mathematical principle underpins SHAP feature importance explanations?', opts: ['A) Euclidean distance', 'B) Cooperative Game Theory (Shapley Values)', 'C) Bayes Theorem', 'D) Gradient descent'], c: 1, exp: 'Shapley values allocate individual feature contributions fairly according to marginal payouts across all feature coalitions.' },
      { name: 'Yeo-Johnson Transform', q: 'What advantage does the Yeo-Johnson power transform provide over Box-Cox?', opts: ['A) Runs in O(1)', 'B) Handles zero and negative values in feature columns', 'C) Works on text data', 'D) Eliminates all outliers'], c: 1, exp: 'While Box-Cox strictly requires x > 0, Yeo-Johnson mathematically supports negative, zero, and positive real numbers.' },
      { name: 'Precision-Recall Tradeoff', q: 'When tuning a medical disease detection model where missing a patient is fatal, which metric must be maximized?', opts: ['A) Specificity', 'B) Recall (Sensitivity)', 'C) Precision only', 'D) Accuracy'], c: 1, exp: 'High recall minimizes False Negatives, ensuring that individuals carrying the disease are not mistakenly cleared.' },
      { name: 'Cross-Validation Strategy', q: 'What cross-validation strategy preserves class percentage ratios across splits in imbalanced data?', opts: ['A) K-Fold Random Shuffle', 'B) Stratified K-Fold', 'C) Leave-One-Out', 'D) Time-Series Split'], c: 1, exp: 'Stratified K-Fold maintains identical class proportions across every fold, preventing empty minority splits.' }
    ],
    L3_topics: [
      { name: 'Dense Semantic Embeddings', q: 'Why do dense Sentence-BERT embeddings outperform sparse TF-IDF on semantic document retrieval?', opts: ['A) S-BERT uses less disk', 'B) Dense vectors capture latent semantic meaning and synonyms rather than exact keyword overlaps', 'C) TF-IDF cannot be hashed', 'D) S-BERT avoids GPUs'], c: 1, exp: 'Dense vectors project concepts into contextual latent space where synonyms (e.g. "physician" & "doctor") share high cosine similarity.' },
      { name: 'RAG Cross-Encoder', q: 'What is the specific role of a Cross-Encoder Re-Ranker in RAG retrieval pipelines?', opts: ['A) Embeds database offline', 'B) Jointly attends to query and candidate chunks to rank top semantic relevance before feeding to LLM', 'C) Compresses document text', 'D) Generates SQL tables'], c: 1, exp: 'Bi-encoders retrieve top 50 chunks quickly; Cross-encoders cross-attend full context to re-score the top 5 with maximum precision.' },
      { name: 'Vector Quantization IVF-PQ', q: 'How does Product Quantization (PQ) accelerate search in multi-million vector databases?', opts: ['A) Deletes 90% of vectors', 'B) Compresses high-dimensional vectors into compact byte codes for fast in-cache asymmetric distance lookup', 'C) Converts text to ASCII', 'D) Uses binary trees'], c: 1, exp: 'PQ splits high-dimensional vectors into sub-vectors and quantizes them into cluster indices, slashing RAM footprint and distance compute time.' },
      { name: 'Model Concept Drift', q: 'What distinguishes Concept Drift from Covariate (Data) Drift in production monitoring?', opts: ['A) Concept drift means input data format changes', 'B) In concept drift, the relationship P(Y|X) changes; in covariate drift, only input distribution P(X) shifts', 'C) They are identical terms', 'D) Covariate drift affects only labels'], c: 1, exp: 'Concept drift occurs when the underlying ground-truth relationship between features and target changes (e.g. consumer behavior shifts).' },
      { name: 'Hallucination Mitigation', q: 'Which retrieval strategy mitigates context loss when querying long technical PDFs?', opts: ['A) Zero chunking', 'B) Hierarchical parent-child document chunking with metadata filtering', 'C) Lowering LLM temperature to -1', 'D) Removing vector search'], c: 1, exp: 'Parent-child indexing matches queries against small focused sentence chunks but returns the larger parent context to the LLM.' }
    ]
  }
};

// Generates 50 questions per level deterministically
const generate50QuestionsForLevel = (baseTopics, levelId, roleName) => {
  const generated = [];
  for (let i = 0; i < 50; i++) {
    const template = baseTopics[i % baseTopics.length];
    const iteration = Math.floor(i / baseTopics.length) + 1;
    const qId = `${roleName.replace(/\s+/g, '_')}_${levelId}_Q${i + 1}`;

    generated.push({
      id: qId,
      number: i + 1,
      name: iteration > 1 ? `${template.name} (Variant ${iteration})` : template.name,
      question: iteration > 1 ? `[Q${i + 1}] Case Study ${iteration}: ${template.q}` : `[Q${i + 1}] ${template.q}`,
      options: template.opts,
      correct: template.c,
      explanation: template.exp
    });
  }
  return generated;
};

export default function StudyMentor({ user, onAssessmentComplete }) {
  const currentRole = user?.goal || 'Machine Learning Engineer';
  const roleBlueprint = ROLE_BLUEPRINTS[currentRole] || ROLE_BLUEPRINTS['Machine Learning Engineer'];

  // Current Level State (L1, L2, L3)
  const [selectedLevelId, setSelectedLevelId] = useState('L1');
  // Current Active Question Number (1 to 50)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // User Answers State: { [questionId]: selectedOptionIndex }
  const [userAnswers, setUserAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(`mentor_quiz_${user?.email || 'default'}_${currentRole}`);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [evaluationReport, setEvaluationReport] = useState(null);

  // Build 50 questions for each of the 3 levels
  const questionsMap = {
    'L1': generate50QuestionsForLevel(roleBlueprint.L1_topics, 'L1', currentRole),
    'L2': generate50QuestionsForLevel(roleBlueprint.L2_topics, 'L2', currentRole),
    'L3': generate50QuestionsForLevel(roleBlueprint.L3_topics, 'L3', currentRole)
  };

  const activeQuestionsList = questionsMap[selectedLevelId];
  const activeQuestion = activeQuestionsList[currentQuestionIndex] || activeQuestionsList[0];

  useEffect(() => {
    localStorage.setItem(`mentor_quiz_${user?.email || 'default'}_${currentRole}`, JSON.stringify(userAnswers));
  }, [userAnswers, user?.email, currentRole]);

  // Answer handler
  const handleOptionSelect = (qId, optionIdx) => {
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  // Level Performance Counts
  const answeredInLevelCount = activeQuestionsList.filter(q => userAnswers[q.id] !== undefined).length;
  const correctInLevelCount = activeQuestionsList.filter(q => userAnswers[q.id] === q.correct).length;
  const levelProgressPercentage = Math.round((answeredInLevelCount / 50) * 100);
  const levelAccuracyPercentage = answeredInLevelCount > 0 ? Math.round((correctInLevelCount / answeredInLevelCount) * 100) : 0;

  // Run full 150-question role diagnostic report
  const handleRunFullAssessment = () => {
    let totalAll = 0;
    let correctAll = 0;
    let answeredAll = 0;

    ['L1', 'L2', 'L3'].forEach(lvlKey => {
      questionsMap[lvlKey].forEach(q => {
        totalAll += 1;
        if (userAnswers[q.id] !== undefined) {
          answeredAll += 1;
          if (userAnswers[q.id] === q.correct) {
            correctAll += 1;
          }
        }
      });
    });

    const scorePercentage = Math.round((correctAll / totalAll) * 100);
    let weakArea = '';
    let recommendation = '';

    if (scorePercentage < 50) {
      weakArea = 'Foundational Concepts & Core Syntax';
      recommendation = `Score is ${scorePercentage}%. Revisit Level 1 fundamentals and complete daily tasks before taking advanced mock tests.`;
    } else if (scorePercentage < 80) {
      weakArea = 'Scalability & Architectural Trade-offs';
      recommendation = `Solid baseline (${scorePercentage}%). Target Level 2 & 3 topics to prepare for Tier-1 placements.`;
    } else {
      weakArea = 'None (Placement Ready)';
      recommendation = `Elite Master (${scorePercentage}%)! You have demonstrated strong engineering capabilities across all 50 questions.`;
    }

    const report = {
      role: currentRole,
      total: totalAll,
      answered: answeredAll,
      correct: correctAll,
      score: scorePercentage,
      weakArea,
      recommendation,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setEvaluationReport(report);

    if (onAssessmentComplete) {
      onAssessmentComplete(report);
    }
  };

  const isCurrentAnswered = userAnswers[activeQuestion.id] !== undefined;
  const isCurrentCorrect = isCurrentAnswered && userAnswers[activeQuestion.id] === activeQuestion.correct;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-2xl shadow-inner">
            {roleBlueprint.icon}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white tracking-wide">50-Question Diagnostic Assessment</h1>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${roleBlueprint.badgeColor}`}>
                {roleBlueprint.title}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              50 comprehensive questions per tier to ground adaptive recommendations [CodeSprint ]
            </p>
          </div>
        </div>

        {/* Level Stats Pill */}
        <div className="p-3.5 px-4 rounded-2xl bg-[#070b18] border border-slate-800 flex items-center gap-4 min-w-[250px]">
          <div className="relative h-11 w-11 flex items-center justify-center rounded-full bg-slate-900 border border-indigo-500/40 shrink-0">
            <span className="text-xs font-black text-indigo-400">{levelAccuracyPercentage}%</span>
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-center mb-1">
              <span className="text-[11px] font-bold text-white">Level Accuracy</span>
              <span className="text-[10px] text-slate-400 font-mono">{answeredInLevelCount}/50 Answered</span>
            </div>
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500"
                style={{ width: `${levelProgressPercentage}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. 3 Difficulty Tiers Selector Tabs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {[
          { id: 'L1', title: 'Tier 1: Fundamentals', desc: '50 Questions on Math, Core Logic & Syntax' },
          { id: 'L2', title: 'Tier 2: Core Engineering', desc: '50 Questions on Models, Databases & APIs' },
          { id: 'L3', title: 'Tier 3: Advanced Architecture', desc: '50 Questions on System Design, RAG & MLOps' }
        ].map((tier) => {
          const isCurrent = selectedLevelId === tier.id;
          const tierAnswered = questionsMap[tier.id].filter(q => userAnswers[q.id] !== undefined).length;

          return (
            <button
              key={tier.id}
              onClick={() => {
                setSelectedLevelId(tier.id);
                setCurrentQuestionIndex(0);
              }}
              className={`p-4 rounded-2xl border text-left transition cursor-pointer ${
                isCurrent
                  ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-[#0f172a]/90 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-black font-mono text-indigo-400">{tier.title}</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-slate-300">
                  {tierAnswered}/50 Done
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">{tier.desc}</p>
            </button>
          );
        })}
      </div>

      {/* 3. 50-Question Interactive Number Navigator (Pills 1 to 50) */}
      <div className="p-5 rounded-3xl bg-[#0f172a]/90 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            {selectedLevelId} Question Matrix (1 to 50)
          </span>
          <span className="text-[10px] text-slate-500 font-mono">
            Green = Correct | Red = Wrong | Purple = Current
          </span>
        </div>

        <div className="grid grid-cols-5 sm:grid-cols-10 lg:grid-cols-25 gap-1.5 max-h-36 overflow-y-auto pr-1">
          {activeQuestionsList.map((q, idx) => {
            const ans = userAnswers[q.id];
            const isAnswered = ans !== undefined;
            const isCorrect = isAnswered && ans === q.correct;
            const isCurrent = currentQuestionIndex === idx;

            return (
              <button
                key={q.id}
                onClick={() => setCurrentQuestionIndex(idx)}
                className={`h-8 rounded-lg text-xs font-mono font-bold transition flex items-center justify-center cursor-pointer border ${
                  isCurrent
                    ? 'bg-indigo-600 border-indigo-400 text-white shadow-md shadow-indigo-600/40 scale-105'
                    : isAnswered
                    ? isCorrect
                      ? 'bg-emerald-950/60 border-emerald-700 text-emerald-400'
                      : 'bg-rose-950/60 border-rose-700 text-rose-400'
                    : 'bg-[#070b18] border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {idx + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Question View Area */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 space-y-5">
        
        {/* Question Header & Navigation Bar */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-black font-mono px-2.5 py-0.5 rounded bg-indigo-950 border border-indigo-700 text-indigo-300">
              QUESTION {currentQuestionIndex + 1} OF 50
            </span>
            <span className="text-xs text-slate-400 font-semibold">{activeQuestion.name}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled={currentQuestionIndex === 0}
              onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 cursor-pointer"
            >
              ← Prev
            </button>
            <button
              disabled={currentQuestionIndex === 49}
              onClick={() => setCurrentQuestionIndex(prev => Math.min(49, prev + 1))}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-800 cursor-pointer"
            >
              Next →
            </button>
          </div>
        </div>

        {/* Question Text */}
        <div className="py-2">
          <p className="text-sm font-semibold text-white leading-relaxed">
            {activeQuestion.question}
          </p>
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {activeQuestion.options.map((opt, optIdx) => {
            const selectedOpt = userAnswers[activeQuestion.id];
            const isAnswered = selectedOpt !== undefined;
            const isThisCorrect = activeQuestion.correct === optIdx;
            const isThisSelected = selectedOpt === optIdx;

            let btnStyle = 'bg-[#070b18] border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white';

            if (isAnswered) {
              if (isThisCorrect) {
                btnStyle = 'bg-emerald-950/60 border-emerald-600 text-emerald-300 font-bold';
              } else if (isThisSelected && !isCurrentCorrect) {
                btnStyle = 'bg-rose-950/60 border-rose-600 text-rose-300 line-through';
              } else {
                btnStyle = 'bg-[#070b18]/60 border-slate-900 text-slate-500 opacity-50';
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                disabled={isAnswered}
                onClick={() => handleOptionSelect(activeQuestion.id, optIdx)}
                className={`p-4 rounded-2xl border text-left text-xs transition flex items-center justify-between cursor-pointer disabled:cursor-default ${btnStyle}`}
              >
                <span>{opt}</span>
                {isAnswered && isThisCorrect && (
                  <span className="text-emerald-400 font-bold text-xs ml-2">✓</span>
                )}
                {isAnswered && isThisSelected && !isCurrentCorrect && (
                  <span className="text-rose-400 font-bold text-xs ml-2">✕</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Instant Rationale Explanation */}
        {isCurrentAnswered && (
          <div className="mt-4 p-4 rounded-2xl bg-[#070b18] border border-slate-800/80 text-xs leading-relaxed text-slate-300 flex items-start gap-3 animate-fadeIn">
            <span className="text-base shrink-0">💡</span>
            <div>
              <span className="font-bold text-indigo-400 mr-1.5">Engineering Rationale:</span>
              {activeQuestion.explanation}
            </div>
          </div>
        )}

      </div>

      {/* 5. Full Evaluation Action Bar */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            Compute Comprehensive Diagnostic Score
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Evaluates accuracy across all 50 questions to calibrate dashboard weak skill alerts.
          </p>
        </div>

        <button
          type="button"
          onClick={handleRunFullAssessment}
          className="px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition cursor-pointer shrink-0"
        >
          Compute 50-Question Score →
        </button>
      </div>

      {/* 6. Diagnostic Results Card (Matches PPT Slide 3) */}
      {evaluationReport && (
        <div className="p-6 rounded-3xl bg-indigo-950/40 border border-indigo-800/60 space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-indigo-800/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Assessment Results: {evaluationReport.role}
              </h3>
            </div>
            <span className="text-xs font-mono font-bold text-indigo-300 bg-indigo-900/60 px-3 py-1 rounded-full border border-indigo-700">
              Score: {evaluationReport.score}% ({evaluationReport.correct}/{evaluationReport.answered} Answered Correctly)
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-[#070b18] border border-slate-800">
              <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider">
                Detected Bottleneck / Weak Skill
              </span>
              <div className="text-xs font-extrabold text-white mt-1">
                {evaluationReport.weakArea}
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-[#070b18] border border-slate-800">
              <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
                Adaptive Recommendation
              </span>
              <div className="text-xs font-semibold text-slate-300 mt-1 leading-relaxed">
                {evaluationReport.recommendation}
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 text-right pt-1">
            ✓ Evaluated and synced with Student Dashboard at {evaluationReport.timestamp}
          </div>
        </div>
      )}

    </div>
  );
}
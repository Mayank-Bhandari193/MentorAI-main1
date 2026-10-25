import React, { useState, useEffect } from 'react';
import FocusTimer from './FocusTimer';
import DailyReview from './DailyReview';
import StudyMentor from './StudyMentor';
import InterviewPrep from './InterviewPrep';
import Roadmap from './Roadmap';
import MorningRoutine from './MorningRoutine';
import AIAssistant from './AIAssistant';
import EnglishPractice from './EnglishPractice';
import AILearning from './AILearning';
import DSAPractice from './DSAPractice';

// Role configurations mapped to CodeSprint 2026 PPT
const ROLE_CONFIGS = {
  'Machine Learning Engineer': {
    title: 'Machine Learning Engineer',
    defaultSkills: [
      { id: 'py', name: 'Python Basics', score: 82, color: 'bg-emerald-500' },
      { id: 'ml', name: 'Machine Learning', score: 71, color: 'bg-indigo-500' },
      { id: 'sql', name: 'SQL Databases', score: 67, color: 'bg-blue-500' },
      { id: 'eng', name: 'English Communication', score: 60, color: 'bg-purple-500' },
      { id: 'dsa', name: 'DSA & Algorithms', score: 45, color: 'bg-rose-500', isWeak: true }
    ],
    tasks: [
      { id: 'ml_1', title: 'Two Pointers & Sliding Window DSA Drill', category: 'dsa', duration: '45m', boost: { skillId: 'dsa', amount: 15 }, completed: false },
      { id: 'ml_2', title: 'NumPy Vectorization & Pandas Data Cleaning Pipeline', category: 'ml', duration: '60m', boost: { skillId: 'ml', amount: 10 }, completed: false },
      { id: 'ml_3', title: 'SQL Joins, Aggregations & Window Functions', category: 'sql', duration: '40m', boost: { skillId: 'sql', amount: 12 }, completed: false },
      { id: 'ml_4', title: 'Binary Search Tree Traversal (Targeted Drill)', category: 'dsa', duration: '45m', boost: { skillId: 'dsa', amount: 18 }, completed: false },
      { id: 'ml_5', title: 'English Tech Mock: Explaining Random Forests & Overfitting', category: 'eng', duration: '30m', boost: { skillId: 'eng', amount: 15 }, completed: false }
    ],
    roadmap: [
      { step: '01', title: 'Python, NumPy & Vector Algebra Foundations', status: 'Completed', tag: 'Core Base' },
      { step: '02', title: 'Targeted DSA (Arrays & Strings Interview Patterns)', status: 'In Progress', tag: 'Weak Area Focus' },
      { step: '03', title: 'Classical ML Algorithms & Scikit-Learn Pipelines', status: 'Active', tag: 'Prerequisite' },
      { step: '04', title: 'Deep Learning, PyTorch & LLM Fine-Tuning', status: 'Upcoming', tag: 'Advanced' }
    ],
    dsaProblem: 'LeetCode #1: Two Sum (Hash Map O(N) Pattern)'
  },

  'Full Stack Developer': {
    title: 'Full Stack Developer',
    defaultSkills: [
      { id: 'fe', name: 'React & Frontend', score: 84, color: 'bg-emerald-500' },
      { id: 'be', name: 'Node.js & Express APIs', score: 72, color: 'bg-indigo-500' },
      { id: 'db', name: 'PostgreSQL & Prisma', score: 68, color: 'bg-blue-500' },
      { id: 'ui', name: 'Tailwind CSS & Styling', score: 75, color: 'bg-purple-500' },
      { id: 'sys', name: 'System Design & DSA', score: 42, color: 'bg-rose-500', isWeak: true }
    ],
    tasks: [
      { id: 'fs_1', title: 'Build JWT Authentication with Refresh Token Cookie Flow', category: 'be', duration: '55m', boost: { skillId: 'be', amount: 12 }, completed: false },
      { id: 'fs_2', title: 'Solve 2 Hash Map & Two-Pointers LeetCode Mediums', category: 'sys', duration: '45m', boost: { skillId: 'sys', amount: 16 }, completed: false },
      { id: 'fs_3', title: 'Setup Prisma PostgreSQL Migrations, Indices & Relations', category: 'db', duration: '40m', boost: { skillId: 'db', amount: 14 }, completed: false },
      { id: 'fs_4', title: 'Optimize React Custom Hooks & Prevent Layout Re-renders', category: 'fe', duration: '35m', boost: { skillId: 'fe', amount: 10 }, completed: false },
      { id: 'fs_5', title: 'Design Low-Latency WebSocket Chat Architecture', category: 'sys', duration: '50m', boost: { skillId: 'sys', amount: 18 }, completed: false }
    ],
    roadmap: [
      { step: '01', title: 'Modern React Architecture, Hooks & Tailwind', status: 'Completed', tag: 'Frontend' },
      { step: '02', title: 'RESTful Backend with Node, Express & Prisma ORM', status: 'Active', tag: 'Backend' },
      { step: '03', title: 'High-Concurrency System Design & Caching', status: 'In Progress', tag: 'Weak Area Focus' },
      { step: '04', title: 'Docker Containers, CI/CD & AWS Deployment', status: 'Upcoming', tag: 'DevOps' }
    ],
    dsaProblem: 'LeetCode #146: LRU Cache (Doubly Linked List + Hash Map)'
  },

  'DSA & Placement Aspirant': {
    title: 'DSA & Placement Aspirant',
    defaultSkills: [
      { id: 'math', name: 'Complexity & Math', score: 80, color: 'bg-emerald-500' },
      { id: 'arr', name: 'Arrays & Two Pointers', score: 70, color: 'bg-indigo-500' },
      { id: 'hash', name: 'Hash Maps & Sets', score: 65, color: 'bg-blue-500' },
      { id: 'tree', name: 'Binary Trees & BFS', score: 50, color: 'bg-purple-500' },
      { id: 'dp', name: 'Dynamic Programming', score: 35, color: 'bg-rose-500', isWeak: true }
    ],
    tasks: [
      { id: 'dsa_1', title: 'Solve 1D Dynamic Programming: Climbing Stairs & House Robber', category: 'dp', duration: '60m', boost: { skillId: 'dp', amount: 20 }, completed: false },
      { id: 'dsa_2', title: 'Invert Binary Tree & Max Depth via Recursion', category: 'tree', duration: '40m', boost: { skillId: 'tree', amount: 15 }, completed: false },
      { id: 'dsa_3', title: 'Longest Substring Without Repeating Characters', category: 'arr', duration: '45m', boost: { skillId: 'arr', amount: 12 }, completed: false },
      { id: 'dsa_4', title: 'Two Sum & 3Sum Pattern Optimization in O(N log N)', category: 'hash', duration: '35m', boost: { skillId: 'hash', amount: 14 }, completed: false },
      { id: 'dsa_5', title: '0/1 Knapsack Problem with 2D Tabulation', category: 'dp', duration: '55m', boost: { skillId: 'dp', amount: 25 }, completed: false }
    ],
    roadmap: [
      { step: '01', title: 'Arrays, Two Pointers & Sliding Window Mastery', status: 'Completed', tag: 'Core Pattern' },
      { step: '02', title: 'Binary Trees, BSTs & BFS/DFS Traversal', status: 'Active', tag: 'Data Structures' },
      { step: '03', title: 'Dynamic Programming (Memoization to Tabulation)', status: 'In Progress', tag: 'Weak Area Focus' },
      { step: '04', title: 'FAANG / Tier-1 Live Timed Mock Coding Drill', status: 'Upcoming', tag: 'Placement' }
    ],
    dsaProblem: 'LeetCode #198: House Robber (1D Dynamic Programming)'
  },

  'AI & Data Scientist': {
    title: 'AI & Data Scientist',
    defaultSkills: [
      { id: 'stat', name: 'Probability & Stats', score: 85, color: 'bg-emerald-500' },
      { id: 'eda', name: 'EDA & Visuals', score: 78, color: 'bg-indigo-500' },
      { id: 'sql', name: 'SQL & Data Warehousing', score: 70, color: 'bg-blue-500' },
      { id: 'feat', name: 'Feature Engineering', score: 62, color: 'bg-purple-500' },
      { id: 'dl', name: 'Deep Learning & NLP', score: 40, color: 'bg-rose-500', isWeak: true }
    ],
    tasks: [
      { id: 'ds_1', title: 'Implement Backpropagation & Loss Function in NumPy', category: 'dl', duration: '60m', boost: { skillId: 'dl', amount: 20 }, completed: false },
      { id: 'ds_2', title: 'Multivariate Regression & Outlier Removal with IQR', category: 'feat', duration: '45m', boost: { skillId: 'feat', amount: 15 }, completed: false },
      { id: 'ds_3', title: 'Build Text Tokenization & Sentiment Analysis Model', category: 'dl', duration: '50m', boost: { skillId: 'dl', amount: 18 }, completed: false },
      { id: 'ds_4', title: 'Write Complex Recursive CTEs & Window Rank Queries', category: 'sql', duration: '40m', boost: { skillId: 'sql', amount: 12 }, completed: false },
      { id: 'ds_5', title: 'Hypothesis Testing (A/B Test Z-Score Evaluation)', category: 'stat', duration: '35m', boost: { skillId: 'stat', amount: 10 }, completed: false }
    ],
    roadmap: [
      { step: '01', title: 'Probability, Linear Algebra & Statistical Hypothesis', status: 'Completed', tag: 'Core Math' },
      { step: '02', title: 'Exploratory Data Analysis & Feature Selection', status: 'Active', tag: 'Data Wrangling' },
      { step: '03', title: 'Deep Neural Networks & Transformer Models', status: 'In Progress', tag: 'Weak Area Focus' },
      { step: '04', title: 'Model Registry, MLOps & Production Inference APIs', status: 'Upcoming', tag: 'MLOps' }
    ],
    dsaProblem: 'Vector Search & Cosine Similarity Algorithm'
  }
};

export default function Dashboard({ user, onLogout }) {
  const [currentUser] = useState(() => {
    return user || {
      name: 'Mayank Bhandari',
      email: 'mayankbhandari267@gmail.com',
      goal: 'Machine Learning Engineer'
    };
  });

  const userGoal = currentUser.goal || 'Machine Learning Engineer';
  const roleData = ROLE_CONFIGS[userGoal] || ROLE_CONFIGS['Machine Learning Engineer'];

  const [activePage, setActivePage] = useState('Dashboard');

  const [skills, setSkills] = useState(() => {
    const saved = localStorage.getItem(`skills_${currentUser.email}_${userGoal}`);
    return saved ? JSON.parse(saved) : roleData.defaultSkills;
  });

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem(`tasks_${currentUser.email}_${userGoal}`);
    return saved ? JSON.parse(saved) : roleData.tasks;
  });

  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem(`stats_${currentUser.email}`);
    return saved ? JSON.parse(saved) : {
      studySessions: 7,
      dsaSessions: 3,
      activitiesLogged: 10,
      avgScore: '98%'
    };
  });

  const [recentActivities, setRecentActivities] = useState(() => {
    const saved = localStorage.getItem(`activities_${currentUser.email}`);
    return saved ? JSON.parse(saved) : [
      { id: 1, title: `Completed Task: ${roleData.tasks[0].title}`, time: 'Just now', type: 'dsa' },
      { id: 2, title: 'Solved 1 DSA Algorithm', time: 'Just now', type: 'dsa' },
      { id: 3, title: 'Started Guided Study Session', time: 'Just now', type: 'study' },
      { id: 4, title: 'Completed New Study Session', time: 'Just now', type: 'study' },
      { id: 5, title: 'Started Focus Timer', time: 'Just now', type: 'study' }
    ];
  });

  const completedCount = tasks.filter(t => t.completed).length;
  const overallProgressPercentage = Math.round((completedCount / tasks.length) * 100);

  useEffect(() => {
    localStorage.setItem(`skills_${currentUser.email}_${userGoal}`, JSON.stringify(skills));
  }, [skills, currentUser.email, userGoal]);

  useEffect(() => {
    localStorage.setItem(`tasks_${currentUser.email}_${userGoal}`, JSON.stringify(tasks));
  }, [tasks, currentUser.email, userGoal]);

  useEffect(() => {
    localStorage.setItem(`stats_${currentUser.email}`, JSON.stringify(stats));
  }, [stats, currentUser.email]);

  useEffect(() => {
    localStorage.setItem(`activities_${currentUser.email}`, JSON.stringify(recentActivities));
  }, [recentActivities, currentUser.email]);

  const logActivity = (title, type) => {
    const item = { id: Date.now(), title, time: 'Just now', type };
    setRecentActivities(prev => [item, ...prev]);
    setStats(prev => ({
      studySessions: type === 'study' ? prev.studySessions + 1 : prev.studySessions,
      dsaSessions: type === 'dsa' ? prev.dsaSessions + 1 : prev.dsaSessions,
      activitiesLogged: prev.activitiesLogged + 1,
      avgScore: `${Math.min(99, 88 + ((prev.activitiesLogged + 1) % 11))}%`
    }));
  };

  const handleToggleTask = (taskId) => {
    const targetTask = tasks.find(t => t.id === taskId);
    if (!targetTask) return;

    const willBeCompleted = !targetTask.completed;

    const updatedTasks = tasks.map(t => {
      if (t.id === taskId) {
        return { ...t, completed: willBeCompleted };
      }
      return t;
    });
    setTasks(updatedTasks);

    if (targetTask.boost) {
      setSkills(prevSkills => {
        return prevSkills.map(skill => {
          if (skill.id === targetTask.boost.skillId) {
            const delta = willBeCompleted ? targetTask.boost.amount : -targetTask.boost.amount;
            const newScore = Math.max(10, Math.min(100, skill.score + delta));
            return {
              ...skill,
              score: newScore,
              isWeak: newScore < 55
            };
          }
          return skill;
        });
      });
    }

    if (willBeCompleted) {
      const type = targetTask.category === 'dsa' ? 'dsa' : 'study';
      logActivity(`Completed Task: ${targetTask.title}`, type);
    }
  };

  const currentWeakestSkill = [...skills].sort((a, b) => a.score - b.score)[0];

  const sidebarLinks = [
    { id: 'Dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'Focus Timer', label: 'Focus Timer', icon: '⏱️' },
    { id: 'Study Mentor', label: 'Study Mentor', icon: '📖' },
    { id: 'DSA Practice', label: 'DSA Practice', icon: '💻' },
    { id: 'English Practice', label: 'English Practice', icon: '🗣️' },
    { id: 'AI Learning', label: 'AI Learning', icon: '🤖' },
    { id: 'Activity Tracker', label: 'Activity Tracker', icon: '📈' },
    { id: 'Morning Routine', label: 'Morning Routine', icon: '☀️' },
    { id: 'Daily Review', label: 'Daily Review', icon: '📋' },
    { id: 'AI Assistant', label: 'AI Assistant', icon: '💬' },
    { id: 'Interview Prep', label: 'Interview Prep', icon: '💼' },
    { id: 'AI Roadmap', label: 'AI Roadmap', icon: '🗺️' },
    { id: 'Leaderboard', label: 'Leaderboard', icon: '🏆' }
  ];

  const bgMain = 'bg-[#070b18] text-slate-100';
  const sidebarBg = 'bg-[#0d1424] border-slate-800/80';
  const topNavBg = 'bg-[#0d1424]/95 border-slate-800/80 backdrop-blur';
  const cardBg = 'bg-[#131b2e]/90 border-slate-800/80 text-slate-100 shadow-xl shadow-black/40';
  const subText = 'text-slate-400';

  return (
    <div className={`flex min-h-screen font-sans ${bgMain}`}>
      
      {/* 1. SIDEBAR */}
      <aside className={`w-64 border-r flex flex-col justify-between shrink-0 sticky top-0 h-screen overflow-y-auto ${sidebarBg}`}>
        <div>
          <div className="p-5 border-b border-slate-800/80 flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-indigo-600/30">
              🧠
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">AI Life Mentor</h2>
              <span className="text-[11px] text-slate-400 font-medium">Discipline Assistant</span>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {sidebarLinks.map((item) => (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition cursor-pointer ${
                  activePage === item.id
                    ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {activePage === item.id && <span className="text-xs">›</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* User Profile Card */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-900/60">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-8 w-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'M'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold truncate text-white">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout || (() => { localStorage.clear(); window.location.href = '/login'; })}
            className="text-[11px] font-semibold text-rose-400 hover:text-rose-300 transition block text-left cursor-pointer"
          >
            Sign Out →
          </button>
        </div>
      </aside>

      {/* 2. MAIN VIEW AREA */}
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Top Navbar */}
        <header className={`h-16 border-b px-8 flex items-center justify-between sticky top-0 z-20 ${topNavBg}`}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Section</span>
            <span className="text-xs text-slate-600">/</span>
            <span className="text-sm font-bold text-white">{activePage}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900 border border-slate-700 text-slate-300">
              <span>🌙 Dark Mode</span>
            </div>

            <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-semibold bg-indigo-950/90 border border-indigo-700/80 text-indigo-300">
              <span>🎯 Goal:</span>
              <span className="font-bold text-white">{userGoal}</span>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-6xl mx-auto w-full">

          {/* PAGE 1: MAIN DASHBOARD */}
          {activePage === 'Dashboard' && (
            <div>
              <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold tracking-tight text-white">
                    Welcome back, <span className="text-indigo-400">{currentUser.name}</span>!
                  </h1>
                  <p className={`text-xs mt-1 ${subText}`}>
                    {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} — Let's make today count.
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border flex items-center gap-4 min-w-[270px] ${cardBg}`}>
                  <div className="relative h-13 w-13 flex items-center justify-center rounded-full bg-slate-950 border border-indigo-500/40 shrink-0">
                    <span className="text-sm font-black text-indigo-400">{overallProgressPercentage}%</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-bold text-white">Overall Plan Progress</span>
                      <span className="text-[10px] text-slate-400">{completedCount}/{tasks.length} Tasks</span>
                    </div>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full transition-all duration-500"
                        style={{ width: `${overallProgressPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 4 Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div onClick={() => setActivePage('Study Mentor')} className={`p-5 rounded-2xl border flex items-center gap-4 cursor-pointer hover:border-indigo-500 transition ${cardBg}`}>
                  <div className="h-12 w-12 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center text-xl shrink-0 font-bold">📖</div>
                  <div>
                    <p className={`text-xs font-semibold ${subText}`}>Study Sessions</p>
                    <h3 className="text-2xl font-bold text-white mt-0.5">{stats.studySessions}</h3>
                    <span className="text-[10px] text-slate-400">today</span>
                  </div>
                </div>

                <div onClick={() => setActivePage('DSA Practice')} className={`p-5 rounded-2xl border flex items-center gap-4 cursor-pointer hover:border-indigo-500 transition ${cardBg}`}>
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl shrink-0 font-mono font-bold">&lt;/&gt;</div>
                  <div>
                    <p className={`text-xs font-semibold ${subText}`}>DSA Sessions</p>
                    <h3 className="text-2xl font-bold text-white mt-0.5">{stats.dsaSessions}</h3>
                    <span className="text-[10px] text-slate-400">today</span>
                  </div>
                </div>

                <div onClick={() => setActivePage('Activity Tracker')} className={`p-5 rounded-2xl border flex items-center gap-4 cursor-pointer hover:border-indigo-500 transition ${cardBg}`}>
                  <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl shrink-0 font-bold">⚡</div>
                  <div>
                    <p className={`text-xs font-semibold ${subText}`}>Activities Logged</p>
                    <h3 className="text-2xl font-bold text-white mt-0.5">{stats.activitiesLogged}</h3>
                    <span className="text-[10px] text-slate-400">recent</span>
                  </div>
                </div>

                <div onClick={() => setActivePage('Daily Review')} className={`p-5 rounded-2xl border flex items-center gap-4 cursor-pointer hover:border-indigo-500 transition ${cardBg}`}>
                  <div className="h-12 w-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-xl shrink-0 font-bold">🎯</div>
                  <div>
                    <p className={`text-xs font-semibold ${subText}`}>Avg Score</p>
                    <h3 className="text-2xl font-bold text-white mt-0.5">{stats.avgScore}</h3>
                    <span className="text-[10px] text-slate-400">today</span>
                  </div>
                </div>
              </div>

              {/* Diagnostic Skill Gap Analysis */}
              <div className={`p-6 rounded-3xl border mb-8 ${cardBg}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-white">Diagnostic Skill Analysis: {roleData.title}</h2>
                    <p className={`text-[11px] ${subText}`}>Skill scores adapt live as you complete the daily tasks below</p>
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
                    currentWeakestSkill.score < 55
                      ? 'bg-rose-950/60 border-rose-800 text-rose-400'
                      : 'bg-emerald-950/60 border-emerald-800 text-emerald-400'
                  }`}>
                    {currentWeakestSkill.score < 55 ? `⚠️ Weak Skill: ${currentWeakestSkill.name} (${currentWeakestSkill.score}%)` : `✅ All Skills Strong (>55%)`}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                  {skills.map((s) => (
                    <div key={s.id} className="p-3.5 rounded-2xl bg-slate-950/90 border border-slate-800">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-semibold text-slate-200">{s.name}</span>
                        <span className={`text-xs font-bold ${s.score < 55 ? 'text-rose-400' : 'text-indigo-400'}`}>
                          {s.score}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all duration-500 ${s.color}`}
                          style={{ width: `${s.score}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Today's Adaptive Plan (0% to 100% Tasks) */}
              <div className={`p-6 rounded-3xl border mb-8 ${cardBg}`}>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-sm font-bold text-white">📋 Today's Adaptive Plan (0% to 100% Complete)</h2>
                    <p className={`text-[11px] ${subText}`}>Tailored roadmap tasks for {roleData.title}</p>
                  </div>
                  <button
                    onClick={() => {
                      const resetTasks = tasks.map(t => ({ ...t, completed: false }));
                      setTasks(resetTasks);
                      setSkills(roleData.defaultSkills);
                    }}
                    className="text-[11px] text-slate-400 hover:text-white transition underline cursor-pointer"
                  >
                    Reset All Tasks
                  </button>
                </div>

                <div className="space-y-3">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      onClick={() => handleToggleTask(task.id)}
                      className={`p-4 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                        task.completed
                          ? 'bg-emerald-950/20 border-emerald-800/60'
                          : 'bg-slate-950/70 border-slate-800 hover:border-indigo-500'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs font-bold border transition ${
                          task.completed
                            ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                            : 'border-slate-600 bg-slate-900 text-transparent hover:border-indigo-400'
                        }`}>
                          ✓
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className={`text-xs font-bold ${task.completed ? 'line-through text-slate-400' : 'text-white'}`}>
                              {task.title}
                            </h4>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 text-indigo-400 border border-slate-800">
                              {task.duration}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-400 mt-0.5">
                            Boosts: <span className="text-emerald-400 font-semibold">+{task.boost.amount}%</span> in {skills.find(s => s.id === task.boost.skillId)?.name}
                          </p>
                        </div>
                      </div>

                      <button
                        className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition cursor-pointer ${
                          task.completed
                            ? 'bg-emerald-600/20 border-emerald-500 text-emerald-400'
                            : 'bg-indigo-600 hover:bg-indigo-500 border-indigo-500 text-white shadow'
                        }`}
                      >
                        {task.completed ? 'Completed' : 'Mark Done (+)'}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions (9 Buttons Directing to pages) */}
              <div className="mb-8">
                <h2 className="text-sm font-bold text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                  {[
                    { label: 'Start Focus', icon: '⏱️', page: 'Focus Timer' },
                    { label: 'Study Session', icon: '📖', page: 'Study Mentor' },
                    { label: 'DSA Practice', icon: '💻', page: 'DSA Practice' },
                    { label: 'English', icon: '🗣️', page: 'English Practice' },
                    { label: 'AI Learning', icon: '🤖', page: 'AI Learning' }
                  ].map((btn, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePage(btn.page)}
                      className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-2 hover:border-indigo-400 hover:shadow-indigo-500/20 hover:shadow-lg transition group cursor-pointer ${cardBg}`}
                    >
                      <span className="text-2xl group-hover:scale-110 transition">{btn.icon}</span>
                      <span className="text-xs font-semibold text-slate-200">{btn.label}</span>
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Morning', icon: '☀️', page: 'Morning Routine' },
                    { label: 'Log Activity', icon: '📈', page: 'Activity Tracker' },
                    { label: 'Daily Review', icon: '📋', page: 'Daily Review' },
                    { label: 'AI Chat', icon: '💬', page: 'AI Assistant' }
                  ].map((btn, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActivePage(btn.page)}
                      className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-2 hover:border-indigo-400 hover:shadow-indigo-500/20 hover:shadow-lg transition group cursor-pointer ${cardBg}`}
                    >
                      <span className="text-2xl group-hover:scale-110 transition">{btn.icon}</span>
                      <span className="text-xs font-semibold text-slate-200">{btn.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Start Now (4 Cards) */}
              <div className="mb-8">
                <h2 className="text-sm font-bold text-white mb-4">Start Now</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    onClick={() => setActivePage('Study Mentor')}
                    className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer hover:border-indigo-500 transition ${cardBg}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-xl shrink-0 font-bold">📖</div>
                      <div>
                        <h4 className="text-sm font-bold text-white">New Study Session</h4>
                        <p className={`text-xs mt-0.5 ${subText}`}>Diagnostic quiz for {roleData.title}</p>
                      </div>
                    </div>
                    <span className="text-slate-400 font-bold text-base">›</span>
                  </div>

                  <div
                    onClick={() => setActivePage('DSA Practice')}
                    className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer hover:border-indigo-500 transition ${cardBg}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-xl shrink-0 font-mono font-bold">&lt;/&gt;</div>
                      <div>
                        <h4 className="text-sm font-bold text-white">DSA Practice Sandbox</h4>
                        <p className={`text-xs mt-0.5 ${subText}`}>{roleData.dsaProblem}</p>
                      </div>
                    </div>
                    <span className="text-slate-400 font-bold text-base">›</span>
                  </div>

                  <div
                    onClick={() => setActivePage('Interview Prep')}
                    className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer hover:border-indigo-500 transition ${cardBg}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center text-xl shrink-0 font-bold">💼</div>
                      <div>
                        <h4 className="text-sm font-bold text-white">Mock Interview</h4>
                        <p className={`text-xs mt-0.5 ${subText}`}>AI technical interviewer for {roleData.title}</p>
                      </div>
                    </div>
                    <span className="text-slate-400 font-bold text-base">›</span>
                  </div>

                  <div
                    onClick={() => setActivePage('AI Roadmap')}
                    className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer hover:border-indigo-500 transition ${cardBg}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-rose-500/10 text-rose-400 flex items-center justify-center text-xl shrink-0 font-bold">🗺️</div>
                      <div>
                        <h4 className="text-sm font-bold text-white">AI Roadmap</h4>
                        <p className={`text-xs mt-0.5 ${subText}`}>Prerequisite-aware plan for your goal</p>
                      </div>
                    </div>
                    <span className="text-slate-400 font-bold text-base">›</span>
                  </div>
                </div>
              </div>

              {/* Recent Activity */}
              <div>
                <h2 className="text-sm font-bold text-white mb-4">Recent Activity</h2>
                <div className={`p-6 rounded-2xl border ${cardBg}`}>
                  {recentActivities.length === 0 ? (
                    <p className={`text-sm text-center py-4 ${subText}`}>No activities logged yet. Start tracking your day!</p>
                  ) : (
                    <div className="divide-y divide-slate-800">
                      {recentActivities.slice(0, 5).map((act) => (
                        <div key={act.id} className="py-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-indigo-500" />
                            <span className="text-xs font-semibold text-slate-200">{act.title}</span>
                          </div>
                          <span className={`text-[11px] ${subText}`}>{act.time}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* PAGE 2: FOCUS TIMER */}
          {activePage === 'Focus Timer' && (
            <FocusTimer
              user={currentUser}
              onCompleteSession={(mins) => logActivity(`Completed ${mins}m Deep Focus Sprint`, 'study')}
            />
          )}

          {/* PAGE 3: DAILY REVIEW */}
          {activePage === 'Daily Review' && (
            <DailyReview
              user={currentUser}
              onReviewSubmitted={(review) => {
                logActivity(`Completed Day ${review.day} Review (${review.topic})`, 'study');
              }}
            />
          )}

          {/* PAGE 4: STUDY MENTOR */}
          {activePage === 'Study Mentor' && (
            <StudyMentor
              user={currentUser}
              onAssessmentComplete={(report) => {
                logActivity(`Completed 50-Question Diagnostic Assessment (${report.score}%)`, 'study');
              }}
            />
          )}

          {/* PAGE 5: INTERVIEW PREP */}
          {activePage === 'Interview Prep' && (
            <InterviewPrep
              user={currentUser}
              onCompleteSession={(result) => {
                logActivity(`Completed Mock Interview (${result.verdict || result.overallStatus})`, 'study');
              }}
            />
          )}

          {/* PAGE 6: AI ROADMAP */}
          {activePage === 'AI Roadmap' && (
            <Roadmap user={currentUser} />
          )}

          {/* PAGE 7: MORNING ROUTINE */}
          {activePage === 'Morning Routine' && (
            <MorningRoutine
              user={currentUser}
              onCompleteRoutine={(data) => {
                logActivity(`Logged Morning Routine (${data.percentage}% Alignment)`, 'study');
              }}
            />
          )}

          {/* PAGE 8: AI ASSISTANT */}
          {activePage === 'AI Assistant' && (
            <AIAssistant user={currentUser} />
          )}

          {/* PAGE 9: ENGLISH PRACTICE */}
          {activePage === 'English Practice' && (
            <EnglishPractice
              user={currentUser}
              onCompleteSession={(report) => {
                logActivity(`Completed English Communication Drill (${report.overallGrade})`, 'study');
              }}
            />
          )}

          {/* PAGE 10: AI LEARNING */}
          {activePage === 'AI Learning' && (
            <AILearning
              user={currentUser}
              onCompleteLesson={(lessonTitle) => {
                logActivity(`Mastered AI Lesson: ${lessonTitle}`, 'study');
              }}
            />
          )}

          {/* PAGE 11: DSA PRACTICE (LEETCODE ARENA) */}
          {activePage === 'DSA Practice' && (
            <DSAPractice
              user={currentUser}
              onSolveProblem={(problem) => {
                logActivity(`Solved LeetCode #${problem.number}: ${problem.title}`, 'dsa');
              }}
            />
          )}

          {/* FALLBACK FOR REMAINING TABS (Activity Tracker, Leaderboard) */}
          {!['Dashboard', 'Focus Timer', 'Daily Review', 'Study Mentor', 'Interview Prep', 'AI Roadmap', 'Morning Routine', 'AI Assistant', 'English Practice', 'AI Learning', 'DSA Practice'].includes(activePage) && (
            <div className={`p-10 text-center rounded-3xl border ${cardBg}`}>
              <span className="text-4xl block mb-2">⚡</span>
              <h2 className="text-lg font-bold text-white mb-1">{activePage} Module</h2>
              <p className={`text-xs mb-6 ${subText}`}>Active module for {roleData.title}.</p>
              <button
                onClick={() => {
                  logActivity(`Logged milestone in ${activePage}`, 'study');
                  alert(`Task completed in ${activePage}!`);
                }}
                className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow cursor-pointer"
              >
                Log Completion (+1)
              </button>
            </div>
          )}

        </div>
      </main>

    </div>
  );
}
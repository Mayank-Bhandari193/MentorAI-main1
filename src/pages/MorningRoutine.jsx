import React, { useState, useEffect } from 'react';

// Common Morning Habits across all tech roles
const COMMON_HABITS = [
  { id: 'water', icon: '💧', title: '500ml Hydration & Electrolytes', desc: 'Kickstarts metabolic rate and rehydrates brain tissues after 7-8 hours of sleep.' },
  { id: 'sun', icon: '☀️', title: '10-Minute Morning Sunlight Exposure', desc: 'Sets circadian cortisol rhythm and triggers dopamine release for sustained alertness.' },
  { id: 'stretch', icon: '🧘', title: 'Mobility & Posture Activation', desc: 'Opens hip flexors and thoracic spine to prepare for prolonged coding sessions.' },
  { id: 'offline', icon: '📵', title: 'Zero Phone / Social Feeds for First 45 Mins', desc: 'Protects prefrontal cortex from reactive cheap dopamine traps.' }
];

// Role-Specific Morning Prime Sessions (30-minute warmup)
const ROLE_PRIME_CONFIGS = {
  'Machine Learning Engineer': {
    title: 'Machine Learning Engineer',
    icon: '🤖',
    badgeColor: 'border-indigo-500/40 bg-indigo-950/60 text-indigo-300',
    primeTask: 'Review 1 Math Formulation or Loss Function Gradient Proof',
    primeDesc: 'Spend 20 mins analyzing backpropagation chain rule or attention dot-product scaling on paper.',
    dailyAffirmation: 'Engineering excellence comes from rigorous mathematical intuition and clean data pipelines.',
    actionPills: ['NumPy Vector Math', 'Cross-Entropy Proof', 'GPU Pipeline Check']
  },
  'Full Stack Developer': {
    title: 'Full Stack Developer',
    icon: '💻',
    badgeColor: 'border-blue-500/40 bg-blue-950/60 text-blue-300',
    primeTask: 'Architecture & Terminal Standup Audit',
    primeDesc: 'Check server logs, review open GitHub PRs, and outline today’s 2 core backend/frontend deliverables.',
    dailyAffirmation: 'I write maintainable, performant, and type-safe systems that scale gracefully under load.',
    actionPills: ['Prisma Schema Review', 'Clean Git Commit Log', 'Zero Render Leak Audit']
  },
  'DSA & Placement Aspirant': {
    title: 'DSA & Placement Aspirant',
    icon: '⚡',
    badgeColor: 'border-amber-500/40 bg-amber-950/60 text-amber-300',
    primeTask: 'Morning 1-Problem Dry-Run Sprint',
    primeDesc: 'Pick 1 classic Medium pattern (Sliding Window / Tree BFS) and trace test cases on paper before typing.',
    dailyAffirmation: 'I conquer algorithmic challenges through pattern recognition, invariant mastery, and discipline.',
    actionPills: ['Two-Pointer Invariants', 'Tree LCA Traversal', 'Monotonic Stack Trace']
  },
  'AI & Data Scientist': {
    title: 'AI & Data Scientist',
    icon: '📊',
    badgeColor: 'border-emerald-500/40 bg-emerald-950/60 text-emerald-300',
    primeTask: 'Statistical Hypothesis & Metric Calibrator',
    primeDesc: 'Review A/B test power calculation formulas and inspect feature distribution skewness charts.',
    dailyAffirmation: 'Data without rigor is noise. I transform raw empirical signals into quantitative business impact.',
    actionPills: ['P-Value & MDE Checks', 'Out-of-Fold Encoding', 'SHAP Waterfall Analysis']
  }
};

export default function MorningRoutine({ user, onCompleteRoutine }) {
  const currentRole = user?.goal || 'Machine Learning Engineer';
  const roleConfig = ROLE_PRIME_CONFIGS[currentRole] || ROLE_PRIME_CONFIGS['Machine Learning Engineer'];

  // Completed Checklist State (persisted per day)
  const todayDateStr = new Date().toISOString().split('T')[0];
  const storageKey = `mentor_morning_${user?.email || 'default'}_${todayDateStr}`;

  const [routineState, setRoutineState] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : {
        habits: {},
        primeDone: false,
        streakCount: 6,
        intentionNotes: ''
      };
    } catch {
      return { habits: {}, primeDone: false, streakCount: 6, intentionNotes: '' };
    }
  });

  const [isSavedNotice, setIsSavedNotice] = useState(false);

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(routineState));
  }, [routineState, storageKey]);

  const toggleHabit = (habitId) => {
    setRoutineState(prev => ({
      ...prev,
      habits: {
        ...prev.habits,
        [habitId]: !prev.habits[habitId]
      }
    }));
  };

  const togglePrime = () => {
    setRoutineState(prev => ({
      ...prev,
      primeDone: !prev.primeDone
    }));
  };

  // Calculate Completion Progress
  const totalItems = COMMON_HABITS.length + 1; // 4 common habits + 1 role prime task
  const completedCount = Object.values(routineState.habits).filter(Boolean).length + (routineState.primeDone ? 1 : 0);
  const completionPercentage = Math.round((completedCount / totalItems) * 100);

  const handleFinishRoutine = () => {
    const updatedStreak = routineState.streakCount + 1;
    setRoutineState(prev => ({ ...prev, streakCount: updatedStreak }));

    if (onCompleteRoutine) {
      onCompleteRoutine({
        role: currentRole,
        completedItems: completedCount,
        percentage: completionPercentage
      });
    }

    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 3000);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-2xl shadow-inner">
            ☀️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white tracking-wide">Morning Alignment & Focus Priming</h1>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${roleConfig.badgeColor}`}>
                {roleConfig.title}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Calibrate mental energy, posture, and technical intent before your first coding sprint.
            </p>
          </div>
        </div>

        {/* Streak & Completion Bar */}
        <div className="flex items-center gap-3">
          <div className="p-3 px-4 rounded-2xl bg-[#070b18] border border-slate-800 flex items-center gap-3">
            <span className="text-xl">🔥</span>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400">Morning Streak</div>
              <div className="text-sm font-black font-mono text-white">{routineState.streakCount} Days Active</div>
            </div>
          </div>

          <div className="p-3 px-4 rounded-2xl bg-[#070b18] border border-slate-800 flex items-center gap-3 min-w-[160px]">
            <div className="relative h-10 w-10 flex items-center justify-center rounded-full bg-slate-900 border border-amber-500/40 shrink-0">
              <span className="text-xs font-black text-amber-400">{completionPercentage}%</span>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400">Readiness</div>
              <div className="text-xs font-bold text-white font-mono">{completedCount}/{totalItems} Items</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Daily Cognitive Affirmation Banner */}
      <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-950/30 via-[#0f172a] to-indigo-950/30 border border-slate-800/80 flex items-center gap-4">
        <span className="text-2xl shrink-0">✨</span>
        <div className="flex-1">
          <div className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">Today's Engineering Intention</div>
          <p className="text-xs text-slate-200 italic mt-0.5 font-medium leading-relaxed">
            "{roleConfig.dailyAffirmation}"
          </p>
        </div>
      </div>

      {/* 3. Common Bio-Discipline Habits (4 Cards) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Foundation Health & Energy Habits
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Standard QA</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {COMMON_HABITS.map((habit) => {
            const isDone = !!routineState.habits[habit.id];

            return (
              <div
                key={habit.id}
                onClick={() => toggleHabit(habit.id)}
                className={`p-4 rounded-2xl border transition-all duration-200 flex items-start gap-3.5 cursor-pointer ${
                  isDone
                    ? 'bg-emerald-950/20 border-emerald-800/60 shadow-lg shadow-emerald-950/20'
                    : 'bg-[#0f172a]/90 border-slate-800/80 hover:border-slate-700'
                }`}
              >
                <div className={`h-6 w-6 rounded-lg flex items-center justify-center text-xs font-bold border transition shrink-0 mt-0.5 ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                    : 'border-slate-700 bg-slate-900 text-transparent'
                }`}>
                  ✓
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{habit.icon}</span>
                    <h4 className={`text-xs font-bold ${isDone ? 'line-through text-slate-400' : 'text-white'}`}>
                      {habit.title}
                    </h4>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                    {habit.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Role-Specific Mental Warmup Prime Task */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <span className="text-lg">🎯</span>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                {roleConfig.title} — Morning Technical Warmup
              </h3>
              <p className="text-[11px] text-slate-400">30-minute cognitive priming before jumping into code</p>
            </div>
          </div>

          <label className={`p-2.5 px-4 rounded-xl border flex items-center gap-2.5 cursor-pointer transition shrink-0 ${
            routineState.primeDone
              ? 'bg-emerald-950/40 border-emerald-700 text-emerald-300'
              : 'bg-[#070b18] border-slate-800 text-slate-400 hover:border-slate-700'
          }`}>
            <input
              type="checkbox"
              checked={routineState.primeDone}
              onChange={togglePrime}
              className="h-4 w-4 rounded accent-indigo-600 cursor-pointer"
            />
            <span className="text-xs font-bold">
              {routineState.primeDone ? '✓ Warmup Completed' : 'Mark Warmup Completed'}
            </span>
          </label>
        </div>

        <div className="p-4 rounded-2xl bg-[#070b18] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h4 className="text-xs font-bold text-indigo-400">{roleConfig.primeTask}</h4>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{roleConfig.primeDesc}</p>
          </div>

          <div className="flex items-center gap-1.5 flex-wrap shrink-0">
            {roleConfig.actionPills.map((pill, idx) => (
              <span key={idx} className="text-[10px] font-mono px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-300">
                {pill}
              </span>
            ))}
          </div>
        </div>

        {/* Daily Technical Log Note */}
        <div className="space-y-1.5 pt-1">
          <label className="block text-xs font-bold text-slate-300">
            Top Priority Deliverable for Today:
          </label>
          <input
            type="text"
            value={routineState.intentionNotes}
            onChange={(e) => setRoutineState({ ...routineState, intentionNotes: e.target.value })}
            placeholder="e.g. Finish sliding window medium problems and optimize PostgreSQL connection pool..."
            className="w-full p-3 px-4 rounded-2xl bg-[#070b18] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
          />
        </div>
      </div>

      {/* 5. Complete Morning Protocol Action Bar */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {isSavedNotice ? (
          <div className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700 px-4 py-2 rounded-xl animate-pulse">
            ✓ Morning Routine Logged! Daily streak updated.
          </div>
        ) : (
          <p className="text-xs text-slate-400">
            Checking off items calibrates your daily discipline metrics on the Student Dashboard.
          </p>
        )}

        <button
          onClick={handleFinishRoutine}
          className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition cursor-pointer shrink-0"
        >
          Lock Morning Alignment ({completionPercentage}%) →
        </button>
      </div>

    </div>
  );
}
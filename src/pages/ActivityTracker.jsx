import React, { useState, useEffect } from 'react';

// Preset fast-logging action templates
const ACTION_TEMPLATES = [
  { id: 'dsa', icon: '💻', label: 'Solved LeetCode Problem', category: 'DSA Practice', duration: '45m', color: 'text-amber-400 bg-amber-950/60 border-amber-800/80' },
  { id: 'study', icon: '📖', label: 'Completed Diagnostic Quiz', category: 'Study Session', duration: '35m', color: 'text-indigo-400 bg-indigo-950/60 border-indigo-800/80' },
  { id: 'focus', icon: '⏱️', label: 'Deep Focus Sprint', category: 'Focus Timer', duration: '50m', color: 'text-emerald-400 bg-emerald-950/60 border-emerald-800/80' },
  { id: 'mock', icon: '💼', label: 'Completed Technical Mock', category: 'Interview Prep', duration: '60m', color: 'text-purple-400 bg-purple-950/60 border-purple-800/80' },
  { id: 'review', icon: '📋', label: 'Submitted Daily Review', category: 'Daily Review', duration: '20m', color: 'text-blue-400 bg-blue-950/60 border-blue-800/80' }
];

export default function ActivityTracker({ user, onActivityLogged }) {
  const currentRole = user?.goal || 'Machine Learning Engineer';
  const userEmail = user?.email || 'default';
  const storageKey = `mentor_activity_feed_${userEmail}`;

  // Activity Feed State
  const [activities, setActivities] = useState(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : [
        { id: 1, title: 'Solved LeetCode #1: Two Sum (O(N) Hash Map)', category: 'DSA Practice', time: '10 mins ago', duration: '45m', type: 'dsa' },
        { id: 2, title: 'Deep Focus Sprint: Backpropagation Gradients', category: 'Focus Timer', time: '1 hour ago', duration: '50m', type: 'focus' },
        { id: 3, title: 'Completed Technical Mock: ML System Design', category: 'Interview Prep', time: '3 hours ago', duration: '60m', type: 'mock' },
        { id: 4, title: 'Completed Diagnostic Assessment (94%)', category: 'Study Session', time: 'Yesterday', duration: '35m', type: 'study' },
        { id: 5, title: 'Morning Alignment: Math Proofs Verified', category: 'Morning Routine', time: 'Yesterday', duration: '30m', type: 'review' }
      ];
    } catch {
      return [];
    }
  });

  // Custom log inputs
  const [customTitle, setCustomTitle] = useState('');
  const [customCategory, setCustomCategory] = useState('DSA Practice');
  const [customDuration, setCustomDuration] = useState('45m');

  // Heatmap generation (84 days / 12 weeks)
  const [heatmapData] = useState(() => {
    const arr = [];
    for (let i = 83; i >= 0; i--) {
      // Deterministic realistic density simulation
      const count = (i % 7 === 0 || i % 5 === 0) ? Math.floor((i % 4) + 1) : (i % 3 === 0 ? 1 : 0);
      arr.push({ dayIndex: i, count });
    }
    return arr;
  });

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(activities));
  }, [activities, storageKey]);

  // Log from template
  const handleLogTemplate = (template) => {
    const newEntry = {
      id: Date.now(),
      title: template.label,
      category: template.category,
      duration: template.duration,
      time: 'Just now',
      type: template.id
    };

    setActivities(prev => [newEntry, ...prev]);

    if (onActivityLogged) {
      onActivityLogged(newEntry);
    }
  };

  // Log custom entry
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newEntry = {
      id: Date.now(),
      title: customTitle.trim(),
      category: customCategory,
      duration: customDuration,
      time: 'Just now',
      type: 'dsa'
    };

    setActivities(prev => [newEntry, ...prev]);
    setCustomTitle('');

    if (onActivityLogged) {
      onActivityLogged(newEntry);
    }
  };

  // Metrics calculation
  const totalCount = activities.length;
  const dsaCount = activities.filter(a => a.category.toLowerCase().includes('dsa')).length;
  const studyCount = activities.filter(a => a.category.toLowerCase().includes('study') || a.category.toLowerCase().includes('focus')).length;
  const interviewCount = activities.filter(a => a.category.toLowerCase().includes('interview')).length;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-amber-600 to-indigo-600 flex items-center justify-center text-2xl shadow-inner">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white tracking-wide">Developer Activity & Consistency Tracker</h1>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-amber-500/40 bg-amber-950/60 text-amber-300">
                {currentRole}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Live audit of study sessions, algorithmic drills, and mock technical interviews.
            </p>
          </div>
        </div>

        {/* Aggregate Stats */}
        <div className="flex items-center gap-3">
          <div className="p-3 px-4 rounded-2xl bg-[#070b18] border border-slate-800 flex items-center gap-3">
            <span className="text-xl">🔥</span>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400">Current Streak</div>
              <div className="text-sm font-black font-mono text-white">12 Days Active</div>
            </div>
          </div>

          <div className="p-3 px-4 rounded-2xl bg-[#070b18] border border-slate-800 flex items-center gap-3">
            <span className="text-xl">⏱️</span>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400">Total Logged</div>
              <div className="text-sm font-black font-mono text-indigo-400">{totalCount} Sessions</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. GitHub-Style Contribution Heatmap Matrix (12 Weeks) */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              84-Day Activity Consistency Grid
            </span>
            <span className="text-[10px] text-slate-400 font-mono">12 Weeks Audit</span>
          </div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
            <span>Less</span>
            <span className="h-2.5 w-2.5 rounded bg-slate-900 border border-slate-800" />
            <span className="h-2.5 w-2.5 rounded bg-indigo-950 border border-indigo-800" />
            <span className="h-2.5 w-2.5 rounded bg-indigo-600" />
            <span className="h-2.5 w-2.5 rounded bg-emerald-400" />
            <span>More</span>
          </div>
        </div>

        <div className="pt-2 overflow-x-auto">
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 w-max">
            {heatmapData.map((item, idx) => {
              let cellColor = 'bg-slate-900 border border-slate-800/80';
              if (item.count >= 3) cellColor = 'bg-emerald-400 shadow shadow-emerald-500/20';
              else if (item.count === 2) cellColor = 'bg-indigo-600';
              else if (item.count === 1) cellColor = 'bg-indigo-950 border border-indigo-800';

              return (
                <div
                  key={idx}
                  title={`Day ${84 - item.dayIndex}: ${item.count} activities completed`}
                  className={`h-3 w-3 rounded-sm transition-all duration-200 hover:scale-125 cursor-pointer ${cellColor}`}
                />
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Quick Action Loggers & Custom Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Column: Preset 1-Click Action Buttons */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            ⚡ 1-Click Fast Activity Logging
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {ACTION_TEMPLATES.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => handleLogTemplate(tmpl)}
                className={`p-3 rounded-2xl border text-left transition hover:scale-[1.02] cursor-pointer flex items-center justify-between ${tmpl.color}`}
              >
                <div className="flex items-center gap-2.5 truncate">
                  <span className="text-lg">{tmpl.icon}</span>
                  <span className="text-xs font-bold text-white truncate">{tmpl.label}</span>
                </div>
                <span className="text-[10px] font-mono font-bold text-slate-300 bg-black/40 px-2 py-0.5 rounded-lg shrink-0">
                  +{tmpl.duration}
                </span>
              </button>
            ))}
          </div>

          {/* Quick Metrics Breakdown */}
          <div className="pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center">
            <div className="p-3 rounded-xl bg-[#070b18] border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase">DSA Drills</div>
              <div className="text-lg font-black text-amber-400 mt-0.5">{dsaCount}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#070b18] border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Focus Sprints</div>
              <div className="text-lg font-black text-emerald-400 mt-0.5">{studyCount}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#070b18] border border-slate-800">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Mock Interviews</div>
              <div className="text-lg font-black text-purple-400 mt-0.5">{interviewCount}</div>
            </div>
          </div>
        </div>

        {/* Right Column: Custom Log Form */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              ✍️ Custom Activity Entry
            </div>

            <form onSubmit={handleCustomSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Activity Title:</label>
                <input
                  type="text"
                  placeholder="e.g. Read FlashAttention paper, Docker config..."
                  value={customTitle}
                  onChange={(e) => setCustomTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-[#070b18] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Category:</label>
                  <select
                    value={customCategory}
                    onChange={(e) => setCustomCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl bg-[#070b18] border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="DSA Practice">DSA Practice</option>
                    <option value="Study Session">Study Session</option>
                    <option value="Focus Timer">Focus Timer</option>
                    <option value="Interview Prep">Interview Prep</option>
                    <option value="Architecture">Architecture</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Duration:</label>
                  <input
                    type="text"
                    value={customDuration}
                    onChange={(e) => setCustomDuration(e.target.value)}
                    placeholder="45m"
                    className="w-full p-2.5 rounded-xl bg-[#070b18] border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!customTitle.trim()}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                Log Custom Activity →
              </button>
            </form>
          </div>
        </div>

      </div>

      {/* 4. Real-time Activity Feed List */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Chronological Activity Feed
            </span>
            <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950 px-2 py-0.5 rounded border border-indigo-800">
              {activities.length} Recorded
            </span>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Kya aap saari logged activities reset karna chahte hain?")) {
                setActivities([]);
              }
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 transition cursor-pointer"
          >
            Clear Log
          </button>
        </div>

        <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1">
          {activities.length === 0 ? (
            <div className="text-center py-8 text-slate-500 text-xs">
              No recent activities. Use 1-Click logging above to record your progress!
            </div>
          ) : (
            activities.map((act) => (
              <div
                key={act.id}
                className="p-3.5 px-4 rounded-2xl bg-[#070b18] border border-slate-800/80 flex items-center justify-between hover:border-slate-700 transition"
              >
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  <div>
                    <h4 className="text-xs font-bold text-slate-200">{act.title}</h4>
                    <span className="text-[10px] text-indigo-400 font-medium">{act.category}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-right">
                  <span className="text-[10px] font-mono text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {act.duration || '30m'}
                  </span>
                  <span className="text-[11px] text-slate-500 font-mono">{act.time}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

    </div>
  );
}
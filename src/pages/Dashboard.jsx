import React, { useState, useEffect } from 'react';

export default function Dashboard({ user, onLogout }) {
  // Dynamic user fallback
  const [currentUser] = useState(() => {
    return user || {
      name: 'Mayank Bhandari',
      email: 'mayankbhandari267@gmail.com',
      goal: 'Get First Dev Job'
    };
  });

  const [activeTab, setActiveTab] = useState('Dashboard');

  // Dark Mode / Light Mode state
  const [isDarkMode, setIsDarkMode] = useState(() => {
    return localStorage.getItem('theme_mode') === 'dark';
  });

  // Dynamic Metrics starting clean from 0
  const [stats, setStats] = useState(() => {
    const saved = localStorage.getItem('user_stats');
    return saved ? JSON.parse(saved) : {
      studySessions: 0,
      dsaSessions: 0,
      activitiesLogged: 0,
      avgScore: '—'
    };
  });

  // Pomodoro Focus Timer State
  const [timerSeconds, setTimerSeconds] = useState(1500);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Recent Activity Feed
  const [recentActivities, setRecentActivities] = useState(() => {
    const saved = localStorage.getItem('user_activities');
    return saved ? JSON.parse(saved) : [];
  });

  // Sync theme
  useEffect(() => {
    localStorage.setItem('theme_mode', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Persist metrics
  useEffect(() => {
    localStorage.setItem('user_stats', JSON.stringify(stats));
  }, [stats]);

  useEffect(() => {
    localStorage.setItem('user_activities', JSON.stringify(recentActivities));
  }, [recentActivities]);

  // Pomodoro Timer Hook
  useEffect(() => {
    let interval = null;
    if (isTimerRunning && timerSeconds > 0) {
      interval = setInterval(() => setTimerSeconds(prev => prev - 1), 1000);
    } else if (timerSeconds === 0) {
      setIsTimerRunning(false);
      logAction('Completed 25m Focus Session', 'study');
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, timerSeconds]);

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const logAction = (title, type) => {
    const newEntry = {
      id: Date.now(),
      title,
      type,
      time: 'Just now'
    };

    setRecentActivities(prev => [newEntry, ...prev]);

    setStats(prev => {
      const updatedStudy = type === 'study' ? prev.studySessions + 1 : prev.studySessions;
      const updatedDsa = type === 'dsa' ? prev.dsaSessions + 1 : prev.dsaSessions;
      const updatedLogged = prev.activitiesLogged + 1;
      const calculatedScore = `${Math.min(98, 70 + updatedLogged * 4)}%`;

      return {
        studySessions: updatedStudy,
        dsaSessions: updatedDsa,
        activitiesLogged: updatedLogged,
        avgScore: calculatedScore
      };
    });
  };

  const menuItems = [
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

  // Theme Styling
  const bgMain = isDarkMode ? 'bg-[#0f172a] text-slate-100' : 'bg-[#f8fafc] text-slate-800';
  const sidebarBg = isDarkMode ? 'bg-[#1e293b] border-slate-800' : 'bg-white border-slate-200';
  const headerBg = isDarkMode ? 'bg-[#1e293b] border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900';
  const cardBg = isDarkMode ? 'bg-[#1e293b] border-slate-800 text-white' : 'bg-white border-slate-200/80 text-slate-900 shadow-sm';
  const subText = isDarkMode ? 'text-slate-400' : 'text-slate-500';

  return (
    <div className={`flex min-h-screen font-sans ${bgMain}`}>
      
      {/* ================= LEFT SIDEBAR (EXACT SAME AS SCREENSHOT) ================= */}
      <aside className={`w-64 border-r flex flex-col justify-between shrink-0 ${sidebarBg}`}>
        <div>
          {/* Logo & Assistant Title */}
          <div className="p-6 border-b border-slate-100/10 flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white text-xl font-bold shadow-md shadow-indigo-500/20">
              🧠
            </div>
            <div>
              <h2 className="text-sm font-bold leading-tight">AI Life Mentor</h2>
              <span className="text-[11px] text-slate-400">Discipline Assistant</span>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="p-3 space-y-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === item.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
                {activeTab === item.id && <span className="text-xs">›</span>}
              </button>
            ))}
          </nav>
        </div>

        {/* Dynamic User Profile Card at Sidebar Bottom */}
        <div className={`p-4 border-t ${isDarkMode ? 'border-slate-800 bg-slate-900/60' : 'border-slate-100 bg-slate-50/50'}`}>
          <div className="flex items-center gap-2.5 mb-2">
            <div className="h-8 w-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shrink-0">
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold truncate">{currentUser.name}</p>
              <p className="text-[10px] text-slate-400 truncate">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="w-full py-1 text-[11px] font-semibold text-rose-500 hover:underline text-left pl-1"
          >
            Sign Out →
          </button>
        </div>
      </aside>

      {/* ================= RIGHT MAIN DASHBOARD ================= */}
      <main className="flex-1 flex flex-col overflow-y-auto">
        
        {/* Top Header */}
        <header className={`h-16 border-b px-8 flex items-center justify-between ${headerBg}`}>
          <span className="text-base font-bold tracking-tight">{activeTab}</span>
          
          <div className="flex items-center gap-3">
            {/* Dynamic Goal Badge */}
            <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${
              isDarkMode ? 'bg-indigo-950/40 border-indigo-800 text-indigo-300' : 'bg-indigo-50 border-indigo-100 text-indigo-700'
            }`}>
              🎯 Goal: {currentUser.goal || 'Full Stack Engineer'}
            </div>

            {/* Dark Mode / Light Mode Switch */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
                isDarkMode 
                  ? 'bg-slate-800 border-slate-700 text-amber-300 hover:bg-slate-700' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{isDarkMode ? '☀️' : '🌙'}</span>
              <span>{isDarkMode ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </header>

        {/* Dashboard Body */}
        <div className="p-8 max-w-6xl">

          {/* AI Roadmap Tab (Standalone Inline Component) */}
          {activeTab === 'AI Roadmap' ? (
            <div className={`p-6 rounded-3xl border ${cardBg}`}>
              <h2 className="text-xl font-bold mb-2">🗺️ AI Step-by-Step Roadmap</h2>
              <p className={`text-xs mb-6 ${subText}`}>Customized for {currentUser.goal || 'Software Development'}</p>
              
              <div className="space-y-4">
                {[
                  { step: '01', title: 'Data Structures & Algorithms', desc: 'Arrays, Two Pointers, Hash Maps & Trees (LeetCode Pattern Master)', status: 'In Progress' },
                  { step: '02', title: 'Full Stack Web Architecture', desc: 'React, Next.js, REST APIs, Tailwind CSS & Prisma ORM', status: 'Active' },
                  { step: '03', title: 'System Design & Real-Time Apps', desc: 'Authentication flows, DB Sharding, Caching & Microservices', status: 'Upcoming' },
                  { step: '04', title: 'Interview & Behavioral Mock Drill', desc: 'Technical problem-solving communication & live mock interviews', status: 'Upcoming' }
                ].map((item, idx) => (
                  <div key={idx} className={`p-4 rounded-2xl border flex items-center justify-between ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
                    <div className="flex items-center gap-4">
                      <span className="text-sm font-black text-indigo-500 font-mono">{item.step}</span>
                      <div>
                        <h4 className="text-xs font-bold">{item.title}</h4>
                        <p className={`text-[11px] ${subText}`}>{item.desc}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-indigo-600/10 text-indigo-400">
                      {item.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* 1. Header Welcome Text (EXACT SAME AS SCREENSHOT) */}
              <div className="mb-8">
                <h1 className="text-3xl font-extrabold tracking-tight">
                  Welcome back, <span className="text-indigo-500">{currentUser.name}</span>!
                </h1>
                <p className={`text-sm mt-1 ${subText}`}>
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} — Let's make today count.
                </p>
              </div>

              {/* 2. Top 4 Metric Cards (EXACT SAME AS SCREENSHOT) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                
                {/* Study Sessions */}
                <div className={`p-5 rounded-2xl border flex items-center gap-4 ${cardBg}`}>
                  <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shrink-0">
                    📖
                  </div>
                  <div>
                    <p className={`text-xs ${subText}`}>Study Sessions</p>
                    <h3 className="text-2xl font-bold mt-0.5">{stats.studySessions}</h3>
                    <span className={`text-[11px] ${subText}`}>today</span>
                  </div>
                </div>

                {/* DSA Sessions */}
                <div className={`p-5 rounded-2xl border flex items-center gap-4 ${cardBg}`}>
                  <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0 font-mono font-bold">
                    &lt;/&gt;
                  </div>
                  <div>
                    <p className={`text-xs ${subText}`}>DSA Sessions</p>
                    <h3 className="text-2xl font-bold mt-0.5">{stats.dsaSessions}</h3>
                    <span className={`text-[11px] ${subText}`}>today</span>
                  </div>
                </div>

                {/* Activities Logged */}
                <div className={`p-5 rounded-2xl border flex items-center gap-4 ${cardBg}`}>
                  <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
                    ⚡
                  </div>
                  <div>
                    <p className={`text-xs ${subText}`}>Activities Logged</p>
                    <h3 className="text-2xl font-bold mt-0.5">{stats.activitiesLogged}</h3>
                    <span className={`text-[11px] ${subText}`}>recent</span>
                  </div>
                </div>

                {/* Avg Score */}
                <div className={`p-5 rounded-2xl border flex items-center gap-4 ${cardBg}`}>
                  <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl shrink-0">
                    🎯
                  </div>
                  <div>
                    <p className={`text-xs ${subText}`}>Avg Score</p>
                    <h3 className="text-2xl font-bold mt-0.5">{stats.avgScore}</h3>
                    <span className={`text-[11px] ${subText}`}>today</span>
                  </div>
                </div>

              </div>

              {/* 3. Quick Actions (EXACT SAME 2 ROWS AS SCREENSHOT) */}
              <div className="mb-8">
                <h2 className="text-sm font-bold mb-4">Quick Actions</h2>
                
                {/* Row 1 */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 mb-4">
                  {[
                    { label: 'Start Focus', icon: '⏱️', act: () => { setIsTimerRunning(true); logAction('Started Focus Timer', 'study'); } },
                    { label: 'Study Session', icon: '📖', act: () => logAction('Completed New Study Session', 'study') },
                    { label: 'DSA Practice', icon: '💻', act: () => logAction('Solved 1 DSA Coding Problem', 'dsa') },
                    { label: 'English', icon: '🗣️', act: () => logAction('Completed Spoken English Drill', 'study') },
                    { label: 'AI Learning', icon: '🤖', act: () => logAction('Reviewed AI Learning Module', 'study') }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.act}
                      className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-2 hover:border-indigo-400 hover:shadow-md transition group ${cardBg}`}
                    >
                      <span className="text-2xl group-hover:scale-110 transition">{item.icon}</span>
                      <span className="text-xs font-semibold">{item.label}</span>
                    </button>
                  ))}
                </div>

                {/* Row 2 */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: 'Morning', icon: '☀️', act: () => logAction('Completed Morning Routine Check', 'study') },
                    { label: 'Log Activity', icon: '📈', act: () => logAction('Logged Productivity Session', 'study') },
                    { label: 'Daily Review', icon: '📋', act: () => logAction('Submitted Daily Review', 'study') },
                    { label: 'AI Chat', icon: '💬', act: () => logAction('Interacted with AI Life Mentor', 'study') }
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={item.act}
                      className={`p-5 rounded-2xl border flex flex-col items-center justify-center gap-2 hover:border-indigo-400 hover:shadow-md transition group ${cardBg}`}
                    >
                      <span className="text-2xl group-hover:scale-110 transition">{item.icon}</span>
                      <span className="text-xs font-semibold">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* 4. Start Now (EXACT SAME 4 CARDS AS SCREENSHOT) */}
              <div className="mb-8">
                <h2 className="text-sm font-bold mb-4">Start Now</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* New Study Session */}
                  <div 
                    onClick={() => logAction('Started Guided Study Session', 'study')}
                    className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer hover:border-indigo-500 hover:shadow-md transition ${cardBg}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl shrink-0">
                        📖
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">New Study Session</h4>
                        <p className={`text-xs mt-0.5 ${subText}`}>Pick a topic & start learning</p>
                      </div>
                    </div>
                    <span className="text-slate-400 font-bold">›</span>
                  </div>

                  {/* DSA Practice */}
                  <div 
                    onClick={() => logAction('Solved 1 DSA Algorithm', 'dsa')}
                    className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer hover:border-indigo-500 hover:shadow-md transition ${cardBg}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0 font-mono font-bold">
                        &lt;/&gt;
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">DSA Practice</h4>
                        <p className={`text-xs mt-0.5 ${subText}`}>Solve a coding problem now</p>
                      </div>
                    </div>
                    <span className="text-slate-400 font-bold">›</span>
                  </div>

                  {/* Mock Interview */}
                  <div 
                    onClick={() => logAction('Simulated Mock Tech Interview', 'study')}
                    className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer hover:border-indigo-500 hover:shadow-md transition ${cardBg}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl shrink-0">
                        💼
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">Mock Interview</h4>
                        <p className={`text-xs mt-0.5 ${subText}`}>AI plays the interviewer</p>
                      </div>
                    </div>
                    <span className="text-slate-400 font-bold">›</span>
                  </div>

                  {/* AI Roadmap */}
                  <div 
                    onClick={() => setActiveTab('AI Roadmap')}
                    className={`p-5 rounded-2xl border flex items-center justify-between cursor-pointer hover:border-indigo-500 hover:shadow-md transition ${cardBg}`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl shrink-0">
                        🗺️
                      </div>
                      <div>
                        <h4 className="text-sm font-bold">AI Roadmap</h4>
                        <p className={`text-xs mt-0.5 ${subText}`}>Day-by-day plan for your goal</p>
                      </div>
                    </div>
                    <span className="text-slate-400 font-bold">›</span>
                  </div>

                </div>
              </div>

              {/* 5. Recent Activity (EXACT SAME AS SCREENSHOT) */}
              <div>
                <h2 className="text-sm font-bold mb-4">Recent Activity</h2>
                <div className={`p-8 rounded-2xl border text-center ${cardBg}`}>
                  {recentActivities.length === 0 ? (
                    <p className={`text-sm ${subText}`}>
                      No activities logged yet. Start tracking your day!
                    </p>
                  ) : (
                    <div className="divide-y divide-slate-100/10 text-left">
                      {recentActivities.slice(0, 5).map(act => (
                        <div key={act.id} className="py-2.5 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <span className="h-2 w-2 rounded-full bg-indigo-500" />
                            <span className="text-xs font-semibold">{act.title}</span>
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

        </div>
      </main>

    </div>
  );
}
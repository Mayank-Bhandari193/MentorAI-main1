import React, { useState, useEffect } from 'react';

export default function Leaderboard({ user, onClaimPoints }) {
  const userName = user?.name || 'Mayank Bhandari';
  const userEmail = user?.email || 'mayankbhandari267@gmail.com';
  const userRole = user?.goal || 'Machine Learning Engineer';

  const userStatsKey = `mentor_user_stats_${userEmail}`;
  const registryKey = 'mentor_global_leaderboard_registry';

  // Current logged in user score state
  const [userStats, setUserStats] = useState(() => {
    try {
      const saved = localStorage.getItem(userStatsKey);
      return saved ? JSON.parse(saved) : { xp: 0, streak: 1, solvedCount: 0 };
    } catch {
      return { xp: 0, streak: 1, solvedCount: 0 };
    }
  });

  const [leaderboardList, setLeaderboardList] = useState([]);
  const [justBoosted, setJustBoosted] = useState(false);
  const [boostNotice, setBoostNotice] = useState('');

  // Sync state & register user in real-time
  const syncUserToLeaderboard = (stats) => {
    try {
      const saved = localStorage.getItem(registryKey);
      let list = saved ? JSON.parse(saved) : [];

      // Determine dynamic badge
      let badge = 'Rookie Scout';
      let badgeColor = 'border-slate-700 bg-slate-900 text-slate-300';
      if (stats.xp >= 1500) {
        badge = 'Grandmaster';
        badgeColor = 'border-amber-500/80 bg-amber-950/80 text-amber-300';
      } else if (stats.xp >= 800) {
        badge = 'Master';
        badgeColor = 'border-purple-500/80 bg-purple-950/80 text-purple-300';
      } else if (stats.xp >= 300) {
        badge = 'Diamond Elite';
        badgeColor = 'border-indigo-500/80 bg-indigo-950/80 text-indigo-300';
      } else if (stats.xp > 0) {
        badge = 'Active Explorer';
        badgeColor = 'border-emerald-500/80 bg-emerald-950/80 text-emerald-300';
      }

      const existingIndex = list.findIndex(u => u.email === userEmail);
      const userObj = {
        id: `user_${userEmail}`,
        name: userName,
        email: userEmail,
        role: userRole,
        avatar: '⭐',
        xp: stats.xp,
        streak: stats.streak,
        solvedCount: stats.solvedCount,
        badge,
        badgeColor
      };

      if (existingIndex !== -1) {
        list[existingIndex] = userObj;
      } else {
        list.push(userObj);
      }

      localStorage.setItem(registryKey, JSON.stringify(list));
      localStorage.setItem(userStatsKey, JSON.stringify(stats));
      setLeaderboardList(list);
    } catch (e) {
      console.error(e);
    }
  };

  // Initial Sync on load + Listen to system-wide custom event
  useEffect(() => {
    syncUserToLeaderboard(userStats);

    const handleCustomXPEvent = (e) => {
      const addedXP = e.detail?.points || 150;
      const reason = e.detail?.reason || 'Task Completed';

      setUserStats(prev => {
        const nextStats = {
          ...prev,
          xp: prev.xp + addedXP,
          solvedCount: prev.solvedCount + 1
        };
        syncUserToLeaderboard(nextStats);
        return nextStats;
      });

      setBoostNotice(`+${addedXP} XP: ${reason}`);
      setJustBoosted(true);
      setTimeout(() => setJustBoosted(false), 2500);
    };

    window.addEventListener('mentor_xp_event', handleCustomXPEvent);
    return () => window.removeEventListener('mentor_xp_event', handleCustomXPEvent);
  }, [userEmail, userName, userRole]);

  // Handle direct button click inside Leaderboard page
  const handleAddLivePoints = (pts, taskTitle) => {
    const nextStats = {
      ...userStats,
      xp: userStats.xp + pts,
      solvedCount: userStats.solvedCount + 1
    };
    setUserStats(nextStats);
    syncUserToLeaderboard(nextStats);

    setBoostNotice(`+${pts} XP earned for "${taskTitle}"!`);
    setJustBoosted(true);
    setTimeout(() => setJustBoosted(false), 2500);

    if (onClaimPoints) {
      onClaimPoints(pts, taskTitle);
    }
  };

  // Live rank calculation
  const rankedList = [...leaderboardList]
    .sort((a, b) => b.xp - a.xp)
    .map((candidate, idx) => ({
      ...candidate,
      rank: idx + 1,
      isCurrentUser: candidate.email === userEmail
    }));

  const myRank = rankedList.find(u => u.isCurrentUser)?.rank || 1;

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      
      {/* 1. Header Banner */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-indigo-600 flex items-center justify-center text-2xl shadow-inner">
            🏆
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white tracking-wide">Developer Arena Leaderboard</h1>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/40 bg-emerald-950/60 text-emerald-300">
                ● Live Auto-Sync Active
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Dashboard tasks aur DSA Practice complete karte hi points yahan live add hote hain.
            </p>
          </div>
        </div>

        {/* User Standing & Points */}
        <div className="flex items-center gap-3">
          <div className="p-3 px-4 rounded-2xl bg-[#070b18] border border-slate-800 flex items-center gap-3">
            <span className="text-xl">🎖️</span>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400">Live Standing</div>
              <div className="text-sm font-black font-mono text-amber-400">Rank #{myRank}</div>
            </div>
          </div>

          <div className="p-3 px-4 rounded-2xl bg-[#070b18] border border-slate-800 flex items-center gap-3">
            <span className="text-xl">⚡</span>
            <div>
              <div className="text-[10px] font-bold uppercase text-slate-400">Total Score</div>
              <div className="text-sm font-black font-mono text-white">{userStats.xp.toLocaleString()} XP</div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Fast Accelerator Buttons */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">
              ⚡ Instant XP Claim Buttons
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Click karke test karein—points instant board par add honge:
            </p>
          </div>

          {justBoosted && (
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 border border-emerald-700 px-3 py-1 rounded-full animate-bounce">
              ✓ {boostNotice}
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <button
            onClick={() => handleAddLivePoints(150, 'DSA Problem Solved')}
            className="p-3.5 rounded-2xl bg-[#070b18] border border-amber-800/60 hover:border-amber-500 text-left transition cursor-pointer flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-bold text-white">Solve DSA Problem</div>
              <div className="text-[10px] text-slate-400">LeetCode Two Sum / Array</div>
            </div>
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-950/80 px-2 py-1 rounded-lg">
              +150 XP
            </span>
          </button>

          <button
            onClick={() => handleAddLivePoints(200, 'Mock Interview Cleared')}
            className="p-3.5 rounded-2xl bg-[#070b18] border border-purple-800/60 hover:border-purple-500 text-left transition cursor-pointer flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-bold text-white">Mock Interview</div>
              <div className="text-[10px] text-slate-400">Technical Evaluation</div>
            </div>
            <span className="text-xs font-mono font-bold text-purple-400 bg-purple-950/80 px-2 py-1 rounded-lg">
              +200 XP
            </span>
          </button>

          <button
            onClick={() => handleAddLivePoints(100, 'Morning Routine Completed')}
            className="p-3.5 rounded-2xl bg-[#070b18] border border-emerald-800/60 hover:border-emerald-500 text-left transition cursor-pointer flex items-center justify-between group"
          >
            <div>
              <div className="text-xs font-bold text-white">Morning Routine</div>
              <div className="text-[10px] text-slate-400">Habit & Priming Check</div>
            </div>
            <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-950/80 px-2 py-1 rounded-lg">
              +100 XP
            </span>
          </button>
        </div>
      </div>

      {/* 3. Live Registered Candidates Table */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Active Registered Candidates
            </span>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              {rankedList.length} User(s) Tracked
            </span>
          </div>

          <button
            onClick={() => {
              if (window.confirm("Kya aap apna score 0 XP par reset karna chahte hain?")) {
                const zeroStats = { xp: 0, streak: 1, solvedCount: 0 };
                setUserStats(zeroStats);
                syncUserToLeaderboard(zeroStats);
              }
            }}
            className="text-[11px] text-slate-500 hover:text-rose-400 transition cursor-pointer"
          >
            Reset My XP
          </button>
        </div>

        {/* Dynamic Rows */}
        <div className="space-y-2.5">
          {rankedList.map((competitor) => (
            <div
              key={competitor.id}
              className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                competitor.isCurrentUser
                  ? 'bg-indigo-950/40 border-indigo-500/80 shadow-lg shadow-indigo-950/40 ring-1 ring-indigo-500/50'
                  : 'bg-[#070b18] border-slate-800/80 hover:border-slate-700'
              }`}
            >
              {/* Left Column: Rank + Name + Role */}
              <div className="flex items-center gap-3.5">
                <span className="w-7 text-center font-black font-mono text-sm text-amber-400">
                  #{competitor.rank}
                </span>

                <div className="h-9 w-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-lg shrink-0">
                  {competitor.avatar}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-bold text-white">
                      {competitor.name} {competitor.isCurrentUser && <span className="text-indigo-400 font-normal">(You)</span>}
                    </h4>
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border ${competitor.badgeColor}`}>
                      {competitor.badge}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5">{competitor.role}</p>
                </div>
              </div>

              {/* Right Column: Tasks Solved + XP */}
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-xs font-bold text-slate-200">{competitor.solvedCount}</div>
                  <div className="text-[9px] text-slate-500 uppercase">Tasks Done</div>
                </div>

                <div className="text-right min-w-[80px]">
                  <div className="text-sm font-black font-mono text-white">{competitor.xp.toLocaleString()}</div>
                  <div className="text-[9px] text-indigo-400 font-bold uppercase">XP Points</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
import React, { useState, useEffect, useRef } from 'react';

const SPRINT_MODES = [
  { id: 20, mins: 20, label: '20 Min', title: '⚡ Rapid Review', icon: '⚡', desc: 'Quick recap, bug fixing ya revision sprint', tag: 'Fast Pace' },
  { id: 25, mins: 25, label: '25 Min', title: '🎯 Classic Pomodoro', icon: '🎯', desc: 'Standard deep cognitive problem solving sprint', tag: 'Recommended' },
  { id: 45, mins: 45, label: '45 Min', title: '💻 DSA Drill', icon: '💻', desc: 'Continuous LeetCode Medium/Hard algorithm challenge', tag: 'High Intensity' },
  { id: 75, mins: 75, label: '75 Min', title: '🏗️ Architecture Sprint', icon: '🏗️', desc: 'Database schema, API integration aur system design', tag: 'Deep Work' },
  { id: 90, mins: 90, label: '90 Min', title: '🧠 Ultradian Flow', icon: '🧠', desc: 'Full 90-minute natural human brain focus cycle', tag: 'Mastery' },
  { id: 100, mins: 100, label: '100 Min', title: '🚀 Hackathon Sprint', icon: '🚀', desc: 'Intensive end-to-end full feature build sprint', tag: 'Extreme' }
];

const MOTIVATION_LINES = [
  "Focus is not about doing 10 things, it's about finishing ONE great thing.",
  "Deep Work creates unfair career advantages in technical domains.",
  "Distraction is the enemy of craft. Stay in the zone.",
  "Every solved problem compounds your engineering intuition."
];

export default function FocusTimer({ user, onCompleteSession }) {
  const [selectedMins, setSelectedMins] = useState(25);
  // TimeLeft state hamesha current remaining time ko yaad rakhega
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [completedCycles, setCompletedCycles] = useState(() => {
    return parseInt(localStorage.getItem('user_completed_cycles') || '4', 10);
  });

  const [ambientAudio, setAmbientAudio] = useState('none');
  const audioContextRef = useRef(null);
  const noiseSourceRef = useRef(null);

  const activeSprint = SPRINT_MODES.find(m => m.mins === selectedMins) || SPRINT_MODES[1];

  // Agar user dusra time tab select kare tabhi new duration set hogi
  const handleSelectMode = (mins) => {
    if (mins === selectedMins) {
      // Agar usi mode par click kiya toh time reset nahi hoga
      return;
    }
    setIsRunning(false);
    setSelectedMins(mins);
    setTimeLeft(mins * 60);
  };

  // Play / Pause Toggle Button Logic (Jahan ruka hai, wahi se chalega)
  const handleTogglePlayPause = () => {
    setIsRunning(prev => !prev);
  };

  // Reset Button (Sirf is button se purane time par reset hoga)
  const handleResetTimer = () => {
    setIsRunning(false);
    setTimeLeft(selectedMins * 60);
  };

  // Timer Tick Mechanism
  useEffect(() => {
    let timer = null;
    if (isRunning && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      stopAmbient();
      const updated = completedCycles + 1;
      setCompletedCycles(updated);
      localStorage.setItem('user_completed_cycles', updated.toString());
      if (onCompleteSession) onCompleteSession(selectedMins);
      alert(`🎉 Zabardast! ${selectedMins} Minute ka Deep Focus Sprint safalta-purvak complete hua!`);
    }
    return () => clearInterval(timer);
  }, [isRunning, timeLeft, selectedMins, completedCycles, onCompleteSession]);

  // Web Audio Synthesizer
  const toggleAmbient = (type) => {
    stopAmbient();
    if (type === 'none') {
      setAmbientAudio('none');
      return;
    }
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = type === 'rain' ? 'lowpass' : 'bandpass';
      filter.frequency.value = type === 'rain' ? 750 : 450;

      const gain = ctx.createGain();
      gain.gain.value = 0.12;

      whiteNoise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      whiteNoise.start(0);
      noiseSourceRef.current = whiteNoise;
      setAmbientAudio(type);
    } catch (e) {
      console.log('Audio Context error:', e);
    }
  };

  const stopAmbient = () => {
    if (noiseSourceRef.current) {
      try { noiseSourceRef.current.stop(); } catch (e) {}
      noiseSourceRef.current = null;
    }
    if (audioContextRef.current) {
      try { audioContextRef.current.close(); } catch (e) {}
      audioContextRef.current = null;
    }
    setAmbientAudio('none');
  };

  useEffect(() => {
    return () => stopAmbient();
  }, []);

  // Formatted Time values
  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;
  const formattedMinutes = m.toString().padStart(2, '0');
  const formattedSeconds = s.toString().padStart(2, '0');

  // SVG Calculations
  const size = 300;
  const strokeWidth = 10;
  const center = size / 2;
  const radius = center - strokeWidth - 10;
  const circumference = 2 * Math.PI * radius;
  const totalSecs = selectedMins * 60;
  const progressRatio = totalSecs > 0 ? (totalSecs - timeLeft) / totalSecs : 0;
  const dashoffset = circumference - (progressRatio * circumference);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      
      {/* Top Header Card */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">⏱️</span>
          <div>
            <h1 className="text-lg font-black text-white tracking-wide">Multi-Sprint Deep Work Hub</h1>
            <p className="text-xs text-slate-400 mt-0.5">
              Targeted sprint cycles for <span className="text-indigo-400 font-bold">{user?.goal || 'Machine Learning Engineer'}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-indigo-950/70 border border-indigo-700/60">
          <span className="text-xl">🔥</span>
          <div>
            <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-wider">Completed Sprints</div>
            <div className="text-sm font-black text-white">{completedCycles} Deep Sessions</div>
          </div>
        </div>
      </div>

      {/* 6 Sprint Duration Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {SPRINT_MODES.map((item) => (
          <button
            key={item.id}
            onClick={() => handleSelectMode(item.mins)}
            className={`p-3 rounded-2xl border flex flex-col items-center justify-center gap-1.5 transition-all duration-300 cursor-pointer ${
              selectedMins === item.mins
                ? 'bg-gradient-to-b from-indigo-600 to-indigo-700 border-indigo-400 text-white shadow-lg shadow-indigo-600/30 scale-105 font-bold'
                : 'bg-[#0f172a]/80 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs font-black">{item.label}</span>
            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
              selectedMins === item.mins ? 'bg-indigo-900/90 text-white' : 'bg-slate-900 text-slate-400'
            }`}>
              {item.tag}
            </span>
          </button>
        ))}
      </div>

      {/* Main Focus Centerpiece */}
      <div className="relative overflow-hidden p-8 rounded-3xl bg-[#0f172a]/95 border border-slate-800 shadow-2xl flex flex-col items-center justify-center">
        
        {/* Glow Background */}
        <div className={`absolute w-96 h-96 rounded-full blur-3xl pointer-events-none transition-all duration-1000 ${
          isRunning ? 'bg-indigo-600/25 scale-110' : 'bg-purple-600/10 scale-95'
        }`} />

        <div className="text-center mb-6 z-10">
          <h2 className="text-xl font-bold text-white tracking-wide">{activeSprint.title}</h2>
          <p className="text-xs text-slate-400 mt-1">{activeSprint.desc}</p>
        </div>

        {/* 100% Centered SVG Progress Ring */}
        <div className="relative flex items-center justify-center z-10 w-[300px] h-[300px]">
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#a855f7" />
              </linearGradient>
            </defs>

            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="rgba(30, 41, 59, 0.7)"
              strokeWidth={strokeWidth}
              fill="transparent"
            />

            <circle
              cx={center}
              cy={center}
              r={radius}
              stroke="url(#timerGradient)"
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={dashoffset}
              strokeLinecap="round"
              fill="transparent"
              style={{
                transition: 'stroke-dashoffset 1s linear'
              }}
            />
          </svg>

          {/* Time Display Perfectly Inside Center */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-slate-400 text-xs mb-1 font-mono">
              {isRunning ? '❚❚ RUNNING' : (timeLeft < totalSecs ? '⏸ PAUSED' : '▶ READY')}
            </span>

            <div className="text-5xl font-black font-mono tracking-wider text-white select-none drop-shadow-md">
              {formattedMinutes}:{formattedSeconds}
            </div>

            <div className={`mt-3 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
              isRunning
                ? 'bg-emerald-950/80 border-emerald-700 text-emerald-400 animate-pulse'
                : (timeLeft < totalSecs ? 'bg-amber-950/80 border-amber-700 text-amber-400' : 'bg-slate-900 border-slate-800 text-slate-400')
            }`}>
              {isRunning ? '● Sprint Active' : (timeLeft < totalSecs ? 'Paused (Resume Available)' : 'Ready to Start')}
            </div>
          </div>
        </div>

        {/* Action Controls: Click karein to Pause hoga, dobara click karne par wahi se RESUME hoga */}
        <div className="flex items-center justify-center gap-4 mt-8 z-10 w-full">
          <button
            onClick={handleTogglePlayPause}
            className={`px-8 py-3.5 rounded-2xl text-xs font-bold transition shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
              isRunning
                ? 'bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-amber-500/20'
                : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/40'
            }`}
          >
            <span>
              {isRunning
                ? '⏸ Pause Sprint'
                : (timeLeft < totalSecs ? '▶ Resume Sprint' : `▶ Start ${selectedMins} Min Sprint`)}
            </span>
          </button>

          <button
            onClick={handleResetTimer}
            className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold transition cursor-pointer"
          >
            ↺ Reset
          </button>
        </div>

        {/* Quote */}
        <div className="mt-8 text-center max-w-md z-10 border-t border-slate-900 pt-5">
          <p className="text-xs italic text-slate-400">
            "{MOTIVATION_LINES[completedCycles % MOTIVATION_LINES.length]}"
          </p>
        </div>
      </div>

      {/* Bottom Audio & Checklist Panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-[#0f172a]/90 border border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-base">🎧</span>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Flowstate Audio Engine</h3>
            </div>
            {ambientAudio !== 'none' && (
              <span className="text-[10px] font-bold text-emerald-400 animate-pulse">● Sound On</span>
            )}
          </div>
          <p className="text-[11px] text-slate-400 mb-4">
            Binaural flow sounds background noise ko cancel karke deep cognitive focus banaye rakhte hain.
          </p>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'rain', label: 'Rain Noise', icon: '🌧️' },
              { id: 'focus', label: 'Binaural', icon: '🌊' },
              { id: 'none', label: 'Mute', icon: '🔇' }
            ].map(snd => (
              <button
                key={snd.id}
                onClick={() => toggleAmbient(snd.id)}
                className={`py-2 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition cursor-pointer ${
                  ambientAudio === snd.id
                    ? 'bg-indigo-600/30 border-indigo-500 text-indigo-300'
                    : 'bg-[#070b18] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <span>{snd.icon}</span>
                <span>{snd.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[#0f172a]/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">📋</span>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Deep Work Checklist</h3>
            </div>
            <ul className="text-[11px] text-slate-400 space-y-1.5 list-disc pl-4 mt-2">
              <li>Phone ko silent karein aur browser par irrelevant tabs band rakhein</li>
              <li>Chune gaye minute ({selectedMins}m) tak sirf 1 single task par dhyan dein</li>
              <li>Sprint complete hone ke baad 5 minute screen se door stretch karein</li>
            </ul>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500 text-right">
            MentorAI Adaptive Focus Engine
          </div>
        </div>
      </div>

    </div>
  );
}
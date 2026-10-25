import React, { useState, useEffect, useRef } from 'react';

// 4 Specialized English Practice Tracks for Tech Professionals
const PRACTICE_TRACKS = [
  {
    id: 'tech_pitch',
    icon: '🎙️',
    title: 'Technical Project Pitching',
    desc: 'Practice explaining complex system architecture and algorithms clearly within 60 seconds.',
    prompt: 'Explain your recent flagship project architecture, technical stack choices, and how you handled high concurrency or latency.',
    sampleStarters: [
      'In this project, our primary bottleneck was...',
      'We made an architectural tradeoff by choosing...',
      'To ensure high availability and sub-50ms latency, we...'
    ]
  },
  {
    id: 'star_method',
    icon: '⭐',
    title: 'STAR Behavioral Scenarios',
    desc: 'Structure behavioral answers using Situation, Task, Action, and measurable Results.',
    prompt: 'Tell me about a time when a critical production bug appeared right before a release. How did you coordinate under pressure?',
    sampleStarters: [
      'The situation occurred when our deployment triggered...',
      'My primary responsibility was to isolate the root cause...',
      'As a result of our automated rollback, zero customer data was lost...'
    ]
  },
  {
    id: 'corp_email',
    icon: '✉️',
    title: 'Executive & Client Email Polishing',
    desc: 'Draft concise, polite, and persuasive technical messages for cross-functional managers.',
    prompt: 'Draft an email to your engineering lead explaining why a sprint deadline needs to be pushed by 2 days due to unexpected database migration blockers.',
    sampleStarters: [
      'Hi Team, I wanted to provide a quick update regarding...',
      'Due to unforeseen schema migration conflicts...',
      'To prevent customer-facing regressions, I recommend...'
    ]
  },
  {
    id: 'fluency_filler',
    icon: '🗣️',
    title: 'Fluency & Filler Word Reducer',
    desc: 'Eliminate "um", "uh", "actually", and "basically" while answering high-stakes questions.',
    prompt: 'Why should our company hire you over other candidates who have identical technical degrees?',
    sampleStarters: [
      'My unique advantage lies at the intersection of...',
      'Beyond writing scalable code, I actively prioritize...',
      'I approach engineering problems with commercial product intuition...'
    ]
  }
];

// Vocabulary & Idiomatic Boosters for Tech Interviews
const VOCAB_BOOSTERS = [
  { phrase: 'Double-edged sword', meaning: 'Ek aisi technique jiske fayde aur nuksan dono ho (e.g. In-memory caching)' },
  { phrase: 'Single point of failure (SPOF)', meaning: 'Ek aisi component jo fail hote hi pura system crash kar de' },
  { phrase: 'Benchmarking & profiling', meaning: 'Code ya database ki actual performance measure karna' },
  { phrase: 'Technical debt tradeoff', meaning: 'Jaldi deliver karne ke liye temporary shortcuts lena jo baad mein refactor karni padein' }
];

export default function EnglishPractice({ user, onCompleteSession }) {
  const currentRole = user?.goal || 'Machine Learning Engineer';

  // Active track selection
  const [selectedTrackId, setSelectedTrackId] = useState('tech_pitch');
  const activeTrack = PRACTICE_TRACKS.find(t => t.id === selectedTrackId) || PRACTICE_TRACKS[0];

  // User Response State
  const [userSpeechText, setUserSpeechText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isListeningSupported, setIsListeningSupported] = useState(true);
  const [evaluationReport, setEvaluationReport] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const recognitionRef = useRef(null);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        let transcript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setUserSpeechText(prev => prev ? `${prev} ${transcript}` : transcript);
      };

      recognition.onerror = () => setIsRecording(false);
      recognition.onend = () => setIsRecording(false);

      recognitionRef.current = recognition;
    } else {
      setIsListeningSupported(false);
    }
  }, []);

  // Mic Toggle Handler
  const toggleRecording = () => {
    if (!recognitionRef.current) {
      alert("Browser mein voice recognition available nahi hai. Aap answer directly box mein type kar sakte hain.");
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        setIsRecording(false);
      }
    }
  };

  // Add starter template to user input
  const handleInsertStarter = (starter) => {
    setUserSpeechText(prev => (prev ? `${prev} ${starter}` : starter));
  };

  // Evaluate Response
  const handleEvaluateAnswer = () => {
    if (!userSpeechText.trim()) return;

    setIsEvaluating(true);
    setEvaluationReport(null);

    setTimeout(() => {
      const words = userSpeechText.trim().split(/\s+/);
      const wordCount = words.length;

      // Detect fillers like um, uh, basically, actually
      const lower = userSpeechText.toLowerCase();
      const fillersFound = (lower.match(/\b(um|uh|actually|basically|like|you know)\b/g) || []).length;

      let fluencyScore = 92;
      if (fillersFound > 4) fluencyScore -= 15;
      else if (fillersFound > 1) fluencyScore -= 7;

      let vocabularyScore = wordCount > 40 ? 94 : wordCount > 20 ? 84 : 70;
      let clarityScore = wordCount > 30 ? 90 : 75;

      const report = {
        wordCount,
        fillersFound,
        fluencyScore: `${fluencyScore}%`,
        vocabularyScore: `${vocabularyScore}%`,
        clarityScore: `${clarityScore}%`,
        overallGrade: fluencyScore >= 85 && vocabularyScore >= 85 ? 'Elite Communicator' : 'Proficient (Minor Polish)',
        feedback: wordCount > 35
          ? 'Strong structural explanation with good technical tone. Sentences have logical continuity.'
          : 'A bit brief. Try providing one specific numerical metric (e.g. "reduced latency by 35%") to strengthen the impact.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setEvaluationReport(report);
      setIsEvaluating(false);

      if (onCompleteSession) {
        onCompleteSession(report);
      }
    }, 1200);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 font-sans">
      
      {/* 1. Header Card */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-2xl shadow-inner">
            🗣️
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black text-white tracking-wide">English Technical Communication Hub</h1>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-purple-950 border border-purple-700/60 text-purple-300">
                Active for {currentRole}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Refine spoken fluency, eliminate filler words, and master executive pitch delivery.
            </p>
          </div>
        </div>

        {/* Status Pill */}
        <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-[#070b18] border border-slate-800 text-xs text-slate-300">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[11px]">Speech Engine Online</span>
        </div>
      </div>

      {/* 2. 4 Track Selector Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {PRACTICE_TRACKS.map((track) => {
          const isSelected = selectedTrackId === track.id;
          return (
            <button
              key={track.id}
              onClick={() => {
                setSelectedTrackId(track.id);
                setEvaluationReport(null);
                setUserSpeechText('');
              }}
              className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${
                isSelected
                  ? 'bg-indigo-600/25 border-indigo-500 text-white shadow-lg shadow-indigo-600/20 ring-1 ring-indigo-500/50'
                  : 'bg-[#0f172a]/90 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-white'
              }`}
            >
              <div className="text-xl mb-1.5">{track.icon}</div>
              <h3 className="text-xs font-bold text-white mb-1">{track.title}</h3>
              <p className="text-[11px] text-slate-400 leading-snug line-clamp-2">{track.desc}</p>
            </button>
          );
        })}
      </div>

      {/* 3. Interactive Prompt Arena */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 shadow-2xl space-y-4">
        
        {/* Scenario Header */}
        <div className="border-b border-slate-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
              {activeTrack.title} • Practice Scenario
            </div>
            <h2 className="text-sm font-semibold text-white mt-1 leading-relaxed">
              "{activeTrack.prompt}"
            </h2>
          </div>

          {/* Voice Mic Record Button */}
          {isListeningSupported && (
            <button
              onClick={toggleRecording}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 cursor-pointer shrink-0 ${
                isRecording
                  ? 'bg-rose-950/90 border-rose-500 text-rose-300 animate-pulse'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-indigo-500 hover:text-white'
              }`}
            >
              <span>{isRecording ? '🔴 Listening (Click to Stop)' : '🎤 Speak Answer'}</span>
            </button>
          )}
        </div>

        {/* Clickable Sentence Starter Pills */}
        <div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
            Recommended Sentence Starters (Click to Insert):
          </span>
          <div className="flex flex-wrap gap-2">
            {activeTrack.sampleStarters.map((starter, idx) => (
              <button
                key={idx}
                onClick={() => handleInsertStarter(starter)}
                className="p-2 px-3 rounded-xl bg-[#070b18] border border-slate-800 text-xs text-slate-300 hover:border-indigo-500 hover:text-white transition cursor-pointer"
              >
                + "{starter}"
              </button>
            ))}
          </div>
        </div>

        {/* Textarea Input Box */}
        <div className="space-y-1.5 pt-1">
          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <span>Type or speak your delivery:</span>
            <span className="font-mono">{userSpeechText.trim() ? userSpeechText.trim().split(/\s+/).length : 0} words</span>
          </div>
          <textarea
            rows={5}
            value={userSpeechText}
            onChange={(e) => setUserSpeechText(e.target.value)}
            placeholder="Start speaking via microphone or type your response here in formal English..."
            className="w-full p-4 rounded-2xl bg-[#070b18] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition leading-relaxed"
          />
        </div>

        {/* Evaluation Trigger Button */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={() => setUserSpeechText('')}
            className="text-xs text-slate-500 hover:text-slate-300 transition cursor-pointer"
          >
            Clear Draft
          </button>

          <button
            onClick={handleEvaluateAnswer}
            disabled={!userSpeechText.trim() || isEvaluating}
            className="px-8 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            {isEvaluating ? 'Evaluating Speech Structure...' : 'Analyze Fluency & Vocabulary →'}
          </button>
        </div>
      </div>

      {/* 4. Instant Communication Scorecard (Client-grade output) */}
      {evaluationReport && (
        <div className="p-6 rounded-3xl bg-indigo-950/40 border border-indigo-800/60 space-y-4 animate-fadeIn">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-indigo-800/60 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl">🏆</span>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Communication Scorecard
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-700">
              Verdict: {evaluationReport.overallGrade}
            </span>
          </div>

          {/* 3 Metric Scores */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#070b18] border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Spoken Fluency</div>
              <div className="text-xl font-black text-indigo-400 mt-0.5">{evaluationReport.fluencyScore}</div>
              <div className="text-[9px] text-slate-500 mt-0.5">Fillers: {evaluationReport.fillersFound} detected</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#070b18] border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Technical Vocabulary</div>
              <div className="text-xl font-black text-emerald-400 mt-0.5">{evaluationReport.vocabularyScore}</div>
              <div className="text-[9px] text-slate-500 mt-0.5">Depth rating based on words</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-[#070b18] border border-slate-800 text-center">
              <div className="text-[10px] text-slate-400 font-bold uppercase">Clarity & Brevity</div>
              <div className="text-xl font-black text-amber-400 mt-0.5">{evaluationReport.clarityScore}</div>
              <div className="text-[9px] text-slate-500 mt-0.5">Total Length: {evaluationReport.wordCount} words</div>
            </div>
          </div>

          {/* Constructive AI Feedback */}
          <div className="p-4 rounded-2xl bg-[#070b18] border border-slate-800">
            <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider">
              AI Communication Coach Feedback
            </span>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              {evaluationReport.feedback}
            </p>
          </div>
        </div>
      )}

      {/* 5. Executive Idioms & Tech Phrases Panel */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/90 border border-slate-800 space-y-3">
        <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
          High-Impact Corporate & Engineering Idioms
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {VOCAB_BOOSTERS.map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-2xl bg-[#070b18] border border-slate-800/80">
              <div className="text-xs font-bold text-white font-mono text-indigo-300">"{item.phrase}"</div>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">{item.meaning}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
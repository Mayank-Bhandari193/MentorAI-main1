import React, { useState, useEffect, useRef } from 'react';

// Domain Knowledge Matrix with Instant Intelligent Engine Responses
const QUERY_KNOWLEDGE_BASE = [
  {
    keywords: ['weak', 'improve', 'score', 'kam', 'badhao', 'skills', 'diagnostic'],
    response: `🎯 **Diagnostic Skill Gap Strategy:**\n\n1. **Target the Lowest Metric First**: Dashboard par jo skill 55% se kam (Rose badge) hai, uspar daily pehle do sprints lagayein.\n2. **Task Boost Leverage**: Dashboard ke daily tasks check karein; har task +10% se +20% specific score boost karta hai.\n3. **30-Min Spaced Repetition**: Roz shaam ko 1 puraana concept revise karein taaki cognitive decay na ho.`
  },
  {
    keywords: ['dsa', 'leetcode', 'two sum', 'sliding window', 'algorithm', 'complexity', 'array'],
    response: `💻 **Algorithmic Mastery Pattern:**\n\n* **Hash Map Lookup (O(N) Time, O(N) Space)**: Nested brute-force loops O(N^2) ko hatane ke liye complement store karein: \`target - current\`.\n* **Two Pointers**: Agar input array sorted hai, toh opposite ends par do pointers rakh kar boundary shrink karein (O(1) Space).\n* **Sliding Window**: Subarray sum ya substring problems mein right pointer expand karein aur condition violate hone par left shrink karein.`
  },
  {
    keywords: ['react', 'next', 'frontend', 're-render', 'performance', 'tailwind', 'hooks'],
    response: `⚡ **Frontend Performance & React Internals:**\n\n* **Eliminate Re-renders**: Heavy calculations ko \`useMemo\` mein wrap karein aur callbacks ko \`useCallback\` se memoize karein taaki reference equality break na ho.\n* **State Colocation**: Global Context mein wahi data rakhein jo pure app ko chahiye. Local form state ko isolated component boundary mein rakhein.\n* **Layout Shifts (CLS)**: Skeleton loaders aur explicit image aspect ratios use karke layout shifts ko < 0.05 par lock karein.`
  },
  {
    keywords: ['interview', 'prep', 'mock', 'faang', 'crack', 'placement', 'company'],
    response: `💼 **FAANG / Tier-1 Interview Execution Protocol:**\n\n1. **Clarify Before Code (3 mins)**: Traffic QPS, constraints (negative numbers, empty array limits) interviewer se poochhein.\n2. **Think Out Loud (5 mins)**: Pehle brute-force bata kar Big-O time complexity derive karein, fir optimal approach pitch karein.\n3. **Proactive Dry Run (7 mins)**: Code submit karne se pehle paper par edge cases trace karein.`
  },
  {
    keywords: ['machine learning', 'ml', 'loss', 'gradient', 'model', 'overfitting', 'regularization'],
    response: `🤖 **ML Architecture & Generalization:**\n\n* **Overfitting Control**: Agar train error kam hai aur validation error badh rahi hai, toh L2 Weight Decay ya Dropout (0.2–0.5) introduce karein.\n* **Cross-Entropy vs MSE**: Classification mein sigmoid ke saath Cross-Entropy cost surface convex rehti hai, jisse gradient vanishing avoid hoti hai.\n* **Data Leakage Guard**: Preprocessing scaling aur target encoding hamesha cross-validation folds ke andar fit karein.`
  },
  {
    keywords: ['sql', 'database', 'prisma', 'postgres', 'backend', 'index', 'query'],
    response: `🗄️ **Backend & Database Optimization:**\n\n* **Prevent N+1 Queries**: Prisma ORM mein hamesha \`include\` ya nested \`select\` ka use karein taaki single join query execute ho.\n* **Compound B-Tree Indexes**: Multiple filters waali tables par \`(tenant_id, created_at DESC)\` index lagayein.\n* **Connection Pool Exhaustion**: Serverless architectures mein PgBouncer ya Prisma Accelerate use karke connection limits manage karein.`
  },
  {
    keywords: ['focus', 'distraction', 'routine', 'pomodoro', 'morning', 'discipline'],
    response: `🔥 **Deep Work & Cognitive Flow:**\n\n* **Ultradian Sprints**: 90-minute natural biological focus cycle follow karein, uske baad 10-minute screen break lein.\n* **Binaural Audio Engine**: Background white noise ya rain sounds ambient cortex ko distract hone se rokte hain.\n* **First 45 Mins Rule**: Subah uthte hi phone ya social feeds mat check karein; directly Morning Alignment task par jaayein.`
  }
];

// Quick Action Prompts
const QUICK_PROMPTS = [
  "🎯 Mera weak skill kaise jaldi improve hoga?",
  "💻 Two Sum O(N) optimal pattern explain karo",
  "⚡ React component unwanted re-renders kaise rokein?",
  "💼 FAANG technical interview crack karne ka formula",
  "🤖 L1 vs L2 regularization kab use karein?",
  "🗄️ PostgreSQL N+1 query problem kaise fix karein?"
];

export default function AIAssistant({ user }) {
  const currentRole = user?.goal || 'Machine Learning Engineer';
  const userName = user?.name || 'Candidate';

  const [chatMessages, setChatMessages] = useState(() => {
    return [
      {
        id: 'msg_0',
        sender: 'ai',
        text: `Namaste **${userName}**! Main aapka 24/7 AI Career Mentor hoon. Aapka target role **${currentRole}** set hai.\n\nAap niche diye gaye chips par click kar sakte hain ya apna koi bhi technical sawal type karein. Main solution provide karunga!`,
        time: 'Just now'
      }
    ];
  });

  const [inputQuery, setInputQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState(null);
  const [isSpeakingId, setIsSpeakingId] = useState(null);

  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  // Speech Output
  const handleSpeak = (msgId, textToSpeak) => {
    if (!('speechSynthesis' in window)) return;
    
    if (isSpeakingId === msgId) {
      window.speechSynthesis.cancel();
      setIsSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = textToSpeak.replace(/[*#`_$\\]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.05;
    utterance.onend = () => setIsSpeakingId(null);
    utterance.onerror = () => setIsSpeakingId(null);

    setIsSpeakingId(msgId);
    window.speechSynthesis.speak(utterance);
  };

  // Copy Message to Clipboard
  const handleCopy = (msgId, text) => {
    navigator.clipboard.writeText(text);
    setCopiedId(msgId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Query Execution
  const executeQuery = (queryText) => {
    if (!queryText.trim()) return;

    const userMsgId = `user_${Date.now()}`;
    const nowTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    setChatMessages(prev => [
      ...prev,
      { id: userMsgId, sender: 'user', text: queryText, time: nowTime }
    ]);
    setInputQuery('');
    setIsTyping(true);

    setTimeout(() => {
      const lowerQuery = queryText.toLowerCase();
      let matchedResponse = null;

      for (const item of QUERY_KNOWLEDGE_BASE) {
        if (item.keywords.some(kw => lowerQuery.includes(kw))) {
          matchedResponse = item.response;
          break;
        }
      }

      if (!matchedResponse) {
        matchedResponse = `🚀 **Tailored Strategy for ${currentRole}:**\n\n* **Immediate Action**: Aapne jo question poocha hai, uspar mastery ke liye Dashboard ke **Study Mentor** mein jaakar diagnostic test lein.\n* **Implementation**: Coding sandbox mein dry-run karein aur Daily Review mein logged hours note karein.\n* **Next Step**: Har practice code ko clean Git commits ke saath apne project repository par sync karein!`;
      }

      const aiMsgId = `ai_${Date.now()}`;
      setChatMessages(prev => [
        ...prev,
        { id: aiMsgId, sender: 'ai', text: matchedResponse, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
      ]);
      setIsTyping(false);
    }, 1400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    executeQuery(inputQuery);
  };

  // Export Chat
  const handleExportChat = () => {
    const chatExport = chatMessages
      .map(m => `[${m.time}] ${m.sender.toUpperCase()}:\n${m.text}\n-------------------`)
      .join('\n\n');
    const blob = new Blob([chatExport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MentorAI_Chat_${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-4 font-sans">
      
      {/* Header Bar */}
      <div className="p-5 rounded-3xl bg-[#0f172a]/95 border border-slate-800 shadow-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="h-11 w-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-xl shadow-lg shadow-indigo-600/30">
            🤖
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-black text-white tracking-wide">AI Mentor Companion</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-ping" /> Live 2s Engine
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Active Context: <span className="text-indigo-400 font-semibold">{currentRole}</span> | User: <span className="text-white font-semibold">{userName}</span>
            </p>
          </div>
        </div>

        {/* Action Toolbar */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportChat}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold hover:text-white hover:bg-slate-800 transition cursor-pointer flex items-center gap-1.5"
          >
            <span>📥 Export Log</span>
          </button>
          <button
            onClick={() => setChatMessages([chatMessages[0]])}
            className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-400 text-xs font-semibold hover:text-rose-400 hover:border-rose-900 transition cursor-pointer"
          >
            ↺ Reset
          </button>
        </div>
      </div>

      {/* Quick Questions Chips */}
      <div className="p-4 rounded-2xl bg-[#0f172a]/80 border border-slate-800/80 space-y-2">
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          <span>⚡ Suggested Quick Inquiries</span>
          <span className="text-[10px] text-indigo-400 font-mono">1-Click Auto Run</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {QUICK_PROMPTS.map((promptText, idx) => (
            <button
              key={idx}
              onClick={() => executeQuery(promptText.replace(/^[^a-zA-Z0-9]+/, '').trim())}
              className="p-2 px-3 rounded-xl bg-[#070b18] border border-slate-800 text-xs text-slate-300 hover:border-indigo-500 hover:text-white transition cursor-pointer flex items-center gap-1.5"
            >
              <span>{promptText}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Chat Stream Container */}
      <div className="p-6 rounded-3xl bg-[#0f172a]/95 border border-slate-800 shadow-2xl flex flex-col h-[520px]">
        
        {/* Messages Scroll Area */}
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            const isSpeaking = isSpeakingId === msg.id;

            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} animate-fadeIn`}
              >
                {/* Header info */}
                <div className="flex items-center gap-2 mb-1 text-[10px] text-slate-500 font-mono">
                  <span>{isUser ? `${userName} (You)` : 'MentorAI Brain'}</span>
                  <span>• {msg.time}</span>
                </div>

                {/* Bubble Container */}
                <div
                  className={`max-w-[85%] p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-line shadow-lg ${
                    isUser
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-tr-none'
                      : 'bg-[#070b18] border border-slate-800 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>

                {/* AI Bubble Action Bar */}
                {!isUser && (
                  <div className="flex items-center gap-2 mt-1.5 pl-1 text-[10px]">
                    <button
                      onClick={() => handleCopy(msg.id, msg.text)}
                      className="text-slate-500 hover:text-slate-300 transition cursor-pointer"
                    >
                      {copiedId === msg.id ? '✓ Copied' : '📋 Copy'}
                    </button>
                    <span className="text-slate-700">•</span>
                    <button
                      onClick={() => handleSpeak(msg.id, msg.text)}
                      className={`transition cursor-pointer ${isSpeaking ? 'text-indigo-400 font-bold animate-pulse' : 'text-slate-500 hover:text-slate-300'}`}
                    >
                      {isSpeaking ? '🔊 Stop' : '🔈 Listen'}
                    </button>
                  </div>
                )}
              </div>
            );
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex flex-col items-start animate-pulse">
              <span className="text-[10px] text-slate-500 font-mono mb-1">MentorAI Brain • Typing solution...</span>
              <div className="p-3.5 px-4 rounded-2xl bg-[#070b18] border border-slate-800 text-xs text-indigo-400 flex items-center gap-2 rounded-tl-none">
                <span className="h-2 w-2 rounded-full bg-indigo-500 animate-ping" />
                <span>Formulating engineering breakdown...</span>
              </div>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Input Box Form */}
        <form onSubmit={handleSubmit} className="mt-4 pt-3 border-t border-slate-800 flex gap-2">
          <input
            type="text"
            disabled={isTyping}
            placeholder="Ask anything (e.g., 'Weak score kaise badhaye?', 'Two Sum pattern', 'React re-render')..."
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            className="flex-1 px-4 py-3 rounded-2xl bg-[#070b18] border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isTyping || !inputQuery.trim()}
            className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition shadow-lg shadow-indigo-600/30 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            Send ⚡
          </button>
        </form>

      </div>

    </div>
  );
}
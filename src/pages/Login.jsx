import React, { useState } from 'react';

export default function Login({ onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(true);

  // Registration Fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetGoal, setTargetGoal] = useState('Machine Learning Engineer');

  // Sign In Fields
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Status & Feedback
  const [feedback, setFeedback] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setFeedback({ text: '', type: '' });

    if (!name.trim() || !email.trim() || !password) {
      setFeedback({ text: 'Kripya sabhi fields ko bharein!', type: 'error' });
      return;
    }
    if (password !== confirmPassword) {
      setFeedback({ text: 'Passwords match nahi kar rahe hain!', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const alreadyExists = existing.some(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      );

      if (alreadyExists) {
        setIsLoading(false);
        setFeedback({ text: 'Yeh email pehle se registered hai! Kripya Sign In karein.', type: 'error' });
        return;
      }

      const newUser = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        goal: targetGoal,
        registeredAt: new Date().toISOString()
      };

      existing.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(existing));

      setIsLoading(false);
      setIsRegister(false);
      setLoginEmail(newUser.email);
      setFeedback({
        text: 'Account safalta-purvak ban gaya! Ab Sign In karein.',
        type: 'success'
      });
    }, 300);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setFeedback({ text: '', type: '' });

    if (!loginEmail.trim() || !loginPassword) {
      setFeedback({ text: 'Email aur password dono enter karein.', type: 'error' });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const existing = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const matchedUser = existing.find(
        (u) =>
          u.email.toLowerCase() === loginEmail.trim().toLowerCase() &&
          u.password === loginPassword
      );

      if (!matchedUser) {
        setIsLoading(false);
        setFeedback({
          text: 'Galat Email ya Password! Pehle Register tab se account banayein.',
          type: 'error'
        });
        return;
      }

      const sessionData = {
        name: matchedUser.name,
        email: matchedUser.email,
        goal: matchedUser.goal || 'Machine Learning Engineer',
        token: `session_${Date.now()}`
      };

      localStorage.setItem('currentUser', JSON.stringify(sessionData));
      localStorage.setItem('user', JSON.stringify(sessionData));

      setIsLoading(false);
      if (onLoginSuccess) {
        onLoginSuccess(sessionData);
      } else {
        window.location.reload();
      }
    }, 300);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 font-sans text-slate-100 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-md rounded-3xl bg-slate-900/90 backdrop-blur-xl border border-slate-800 p-8 shadow-2xl">
        <div className="text-center mb-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg mb-3 text-2xl font-black">
            🧠
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {isRegister ? 'Pehle Register Karein' : 'Sign In to Dashboard'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isRegister ? 'Step 1: Apna target role chunein aur account banayein' : 'Step 2: Apne registered credentials se login karein'}
          </p>
        </div>

        <div className="flex bg-slate-800 p-1 rounded-xl mb-6 border border-slate-700">
          <button
            type="button"
            onClick={() => { setIsRegister(true); setFeedback({ text: '', type: '' }); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              isRegister ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Register
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(false); setFeedback({ text: '', type: '' }); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              !isRegister ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Sign In
          </button>
        </div>

        {feedback.text && (
          <div className={`mb-5 p-3 rounded-xl border text-xs font-medium text-center ${
            feedback.type === 'error' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            {feedback.text}
          </div>
        )}

        {isRegister ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Full Name</label>
              <input
                type="text"
                required
                placeholder="Aapka Poora Naam"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                placeholder="Password banayein"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Confirm Password</label>
              <input
                type="password"
                required
                placeholder="Wahi password dobara likhein"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Target Career Goal </label>
              <select
                value={targetGoal}
                onChange={(e) => setTargetGoal(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Machine Learning Engineer">🤖 Machine Learning Engineer</option>
                <option value="Full Stack Developer">💻 Full Stack Developer</option>
                <option value="DSA & Placement Aspirant">⚡ DSA & Placement Aspirant</option>
                <option value="AI & Data Scientist">📊 AI & Data Scientist</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md shadow-indigo-600/30 disabled:opacity-50"
            >
              {isLoading ? 'Creating Account...' : 'Register & Proceed to Sign In →'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Registered Email</label>
              <input
                type="email"
                required
                placeholder="name@example.com"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">Password</label>
              <input
                type="password"
                required
                placeholder="Apna password enter karein"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full mt-3 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition shadow-md shadow-indigo-600/30 disabled:opacity-50"
            >
              {isLoading ? 'Signing In...' : 'Sign In to Dashboard →'}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-xs text-slate-400">
          {isRegister ? 'Already registered?' : 'Naya account banana hai?'}{' '}
          <button
            type="button"
            onClick={() => { setIsRegister(!isRegister); setFeedback({ text: '', type: '' }); }}
            className="text-indigo-400 font-semibold hover:underline ml-1"
          >
            {isRegister ? 'Direct Sign In karein' : 'Register yahan karein'}
          </button>
        </div>
      </div>
    </div>
  );
}
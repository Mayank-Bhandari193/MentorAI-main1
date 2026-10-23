import React, { useState } from 'react';

export default function Login() {
  const [isRegister, setIsRegister] = useState(true);
  
  // Register inputs
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [targetGoal, setTargetGoal] = useState('Get First Dev Job');

  // Sign In inputs
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Status feedback
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!name.trim() || !email.trim() || !password) {
      setMessage({ text: 'Kripya sabhi fields ko bharein!', type: 'error' });
      return;
    }
    if (password !== confirmPassword) {
      setMessage({ text: 'Passwords match nahi ho rahe hain!', type: 'error' });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const userExists = existingUsers.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());

      if (userExists) {
        setLoading(false);
        setMessage({ text: 'Yeh email pehle se registered hai! Sign In karein.', type: 'error' });
        return;
      }

      const newUser = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password: password,
        goal: targetGoal,
        registeredAt: new Date().toISOString()
      };

      existingUsers.push(newUser);
      localStorage.setItem('registered_users', JSON.stringify(existingUsers));

      setLoading(false);
      setIsRegister(false);
      setLoginEmail(newUser.email);
      setMessage({
        text: 'Account ban gaya! Ab Dashboard kholne ke liye Sign In karein.',
        type: 'success'
      });
    }, 500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setMessage({ text: '', type: '' });

    if (!loginEmail.trim() || !loginPassword) {
      setMessage({ text: 'Email aur password dono daalna zaroori hai.', type: 'error' });
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const foundUser = existingUsers.find(
        (u) => u.email.toLowerCase() === loginEmail.trim().toLowerCase() && u.password === loginPassword
      );

      if (!foundUser) {
        setLoading(false);
        setMessage({
          text: 'Galat Email ya Password! Pehle Create Account se register karein.',
          type: 'error'
        });
        return;
      }

      const sessionUser = {
        name: foundUser.name,
        email: foundUser.email,
        goal: foundUser.goal,
        token: 'auth-session-' + Date.now(),
        isLoggedIn: true
      };

      localStorage.setItem('currentUser', JSON.stringify(sessionUser));
      localStorage.setItem('user', JSON.stringify(sessionUser));

      setLoading(false);
      window.location.href = '/';
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-slate-950 p-4 font-sans text-slate-100">
      
      {/* Main Card */}
      <div className="relative w-full max-w-md rounded-3xl bg-slate-900 border border-slate-800 p-8 shadow-2xl">
        
        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg mb-3 text-2xl font-black">
            🧠
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {isRegister ? 'Pehle Register Karein' : 'Ab Sign In Karein'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {isRegister 
              ? 'Step 1: Apna account banayein' 
              : 'Step 2: Apne registered account se dashboard kholein'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-800 p-1 rounded-xl mb-6 border border-slate-700">
          <button
            type="button"
            onClick={() => { setIsRegister(true); setMessage({ text: '', type: '' }); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              isRegister ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            1. Register
          </button>
          <button
            type="button"
            onClick={() => { setIsRegister(false); setMessage({ text: '', type: '' }); }}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition ${
              !isRegister ? 'bg-indigo-600 text-white shadow' : 'text-slate-400 hover:text-white'
            }`}
          >
            2. Sign In
          </button>
        </div>

        {/* Alert Box */}
        {message.text && (
          <div className={`mb-5 p-3 rounded-xl border text-xs font-medium text-center ${
            message.type === 'error'
              ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
              : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
          }`}>
            {message.text}
          </div>
        )}

        {/* Register Form */}
        {isRegister ? (
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                Full Name
              </label>
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
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                Email Address
              </label>
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
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                Password
              </label>
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
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                Confirm Password
              </label>
              <input
                type="password"
                required
                placeholder="Password dobara likhein"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-4 py-2.5 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                Career Goal
              </label>
              <select
                value={targetGoal}
                onChange={(e) => setTargetGoal(e.target.value)}
                className="w-full rounded-xl bg-slate-800 border border-slate-700 px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-indigo-500"
              >
                <option value="Get First Dev Job">🚀 Get First Dev Job</option>
                <option value="Crack Tech Interviews">💼 Crack Tech Interviews</option>
                <option value="Master DSA">⚡ Master DSA</option>
                <option value="AI & Full Stack Engineer">🤖 AI & Full Stack Engineer</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register & Proceed to Sign In →'}
            </button>
          </form>
        ) : (
          /* Sign In Form */
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                Registered Email
              </label>
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
              <label className="block text-xs font-semibold text-slate-300 mb-1 uppercase tracking-wider">
                Password
              </label>
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
              disabled={loading}
              className="w-full mt-3 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition disabled:opacity-50"
            >
              {loading ? 'Signing In...' : 'Sign In to Dashboard →'}
            </button>
          </form>
        )}

        {/* Switch Link */}
        <div className="mt-6 text-center text-xs text-slate-400">
          {isRegister ? 'Already registered?' : 'Naya account banana hai?'}{' '}
          <button
            type="button"
            onClick={() => {
              setIsRegister(!isRegister);
              setMessage({ text: '', type: '' });
            }}
            className="text-indigo-400 font-semibold hover:underline ml-1"
          >
            {isRegister ? 'Direct Sign In karein' : 'Register yahan karein'}
          </button>
        </div>

      </div>
    </div>
  );
}
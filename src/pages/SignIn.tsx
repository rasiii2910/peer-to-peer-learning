import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <h2 className="text-3xl font-extrabold text-neutral-900 dark:text-white">Login</h2>
      <p className="mt-2 text-sm text-purple-700 dark:text-purple-200">Please enter your username and password to sign in.</p>

      <form className="mt-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-purple-200/90">Username</label>
          <div className="relative mt-2">
            <input
              id="email"
              type="text"
              autoComplete="username"
              required
              className="w-full border-b border-purple-400/40 bg-transparent py-2 pr-10 text-neutral-900 dark:text-white placeholder-purple-300 focus:outline-none focus:border-purple-300"
              placeholder="your.username"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2 text-purple-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-purple-200/90">Password</label>
            <Link to="/forgot-password" className="text-sm font-medium text-purple-200/90 hover:underline">Forgot?</Link>
          </div>
          <div className="relative mt-2">
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              className="w-full border-b border-purple-400/40 bg-transparent py-2 pr-10 text-neutral-900 dark:text-white placeholder-purple-300 focus:outline-none focus:border-purple-300"
              placeholder="••••••••"
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2 text-purple-300">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-5 w-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 10-8 0v4" />
                <rect x="4" y="11" width="16" height="10" rx="2" />
              </svg>
            </div>
          </div>
        </div>

        <button type="submit" className="w-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 py-2.5 text-white font-semibold shadow-lg shadow-purple-600/30 hover:scale-[0.995] transition">Login</button>
      </form>

      <p className="mt-6 text-center text-sm text-purple-700 dark:text-purple-200">Don&apos;t have an account? <Link to="/signup" className="text-purple-300 font-semibold hover:underline">Sign Up</Link></p>
    </div>
  );
}

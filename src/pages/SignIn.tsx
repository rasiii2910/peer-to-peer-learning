import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignIn() {
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <h2 className="text-3xl font-extrabold text-purple-800 dark:text-purple-200">Login</h2>
      <p className="mt-2 text-sm text-purple-700 dark:text-purple-200">Please enter your username and password to sign in.</p>

      <form className="mt-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-purple-700 dark:text-purple-200">Username</label>
          <div className="relative mt-2">
            <input
              id="email"
              type="text"
              autoComplete="username"
              required
              className="w-full border-b border-purple-400/40 bg-transparent py-2 pr-10 text-neutral-900 dark:text-white placeholder-purple-300 focus:outline-none focus:border-purple-300"
              
            />
            <div className="absolute right-0 top-1/2 -translate-y-1/2 pr-2 text-purple-500">
              {/* email icon */}
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                <path d="M1.5 6.75A2.25 2.25 0 0 1 3.75 4.5h16.5A2.25 2.25 0 0 1 22.5 6.75v10.5A2.25 2.25 0 0 1 20.25 19.5H3.75A2.25 2.25 0 0 1 1.5 17.25V6.75zM21 7.5l-8.25 6L4.5 7.5" />
              </svg>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label htmlFor="password" className="block text-sm font-medium text-purple-700 dark:text-purple-200">Password</label>
            <Link to="/forgot-password" className="text-sm font-medium text-purple-700 dark:text-purple-200 hover:underline">Forgot?</Link>
          </div>
          <div className="relative mt-2">
            <input
              id="password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              required
              className="w-full border-b border-purple-400/40 bg-transparent py-2 pr-10 text-neutral-900 dark:text-white placeholder-purple-300 focus:outline-none focus:border-purple-300"
              
            />

            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="absolute right-0 top-1/2 -translate-y-1/2 pr-1 text-purple-500"
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M3.172 3.172a.75.75 0 011.06 0l16.596 16.596a.75.75 0 11-1.06 1.06L3.172 4.232a.75.75 0 010-1.06z" />
                  <path d="M8.53 8.53a3 3 0 004.94 4.94" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                  <path d="M2.47 12.53a11.95 11.95 0 012.8-3.02A11.73 11.73 0 0112 6.75c4.477 0 8.268 2.943 9.542 7-.55 1.75-1.58 3.29-2.92 4.54l-1.43-1.43A8.96 8.96 0 0021 12.75C19.727 8.693 15.936 5.75 11.46 5.75c-2.11 0-4.042.67-5.652 1.81l1.66 1.66A8.46 8.46 0 0112 7.75c3.86 0 7.08 2.16 8.51 5.25a9.94 9.94 0 01-1.98 2.77l-1.44-1.44A7.44 7.44 0 0012 10.75a3 3 0 00-3 3 3 3 0 003 3c.66 0 1.26-.22 1.74-.59l1.5 1.5A4.5 4.5 0 0112 18.75a8.44 8.44 0 01-7.53-4.22z" />
                </svg>
              )}
            </button>
          </div>
        </div>

        <button type="submit" className="w-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 py-2.5 text-white font-semibold shadow-lg shadow-purple-600/30 hover:scale-[0.995] transition">Login</button>
      </form>

      <p className="mt-6 text-center text-sm text-purple-700 dark:text-purple-200">Don&apos;t have an account? <Link to="/signup" className="text-purple-600 font-semibold hover:underline">Sign Up</Link></p>
    </div>
  );
}

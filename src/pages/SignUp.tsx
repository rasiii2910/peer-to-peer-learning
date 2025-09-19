import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <h2 className="text-2xl font-bold tracking-tight text-neutral-900 dark:text-white">Create account</h2>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">Join us and get started in seconds.</p>

      <form className="mt-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">Name</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            placeholder="Jane Doe"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">Email</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">Password</label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="block text-sm font-medium text-neutral-700 dark:text-neutral-200">Confirm password</label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            required
            className="mt-1 w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-neutral-900 placeholder-neutral-400 shadow-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-500/30 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
            placeholder="••••••••"
          />
        </div>
        <button type="submit" className="mt-2 w-full rounded-lg bg-purple-600 px-4 py-2.5 font-semibold text-white shadow-lg shadow-purple-600/30 transition hover:bg-purple-700 active:scale-[0.99]">Create account</button>
      </form>

      <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-300">
        Already have an account?{' '}
        <Link to="/signin" className="font-semibold text-purple-600 hover:text-purple-700">Sign in</Link>
      </p>
    </div>
  );
}

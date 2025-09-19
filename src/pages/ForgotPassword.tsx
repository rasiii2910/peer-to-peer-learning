import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className={`transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
      <h2 className="text-3xl font-extrabold text-purple-800 dark:text-purple-200">Forgot password</h2>
      <p className="mt-2 text-sm text-purple-700 dark:text-purple-200">Enter your email and we'll send reset instructions.</p>

      <form className="mt-6 space-y-6" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-purple-200/90">Email</label>
          <input id="email" type="email" required className="mt-2 w-full border-b border-purple-400/40 bg-transparent py-2 text-neutral-900 dark:text-white placeholder-purple-300 focus:outline-none focus:border-purple-300" placeholder="you@example.com" />
        </div>

        <button type="submit" className="w-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 py-2.5 text-white font-semibold shadow-lg shadow-purple-600/30 hover:scale-[0.995] transition">Send reset link</button>
      </form>

      <p className="mt-6 text-center text-sm text-purple-700 dark:text-purple-200">Remembered your password? <Link to="/signin" className="text-purple-300 font-semibold hover:underline">Back to sign in</Link></p>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="relative bg-purple-900 min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Squares Background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`absolute bg-purple-400/40 animate-float-rotate rounded-sm`}
            style={{
              width: `${20 + Math.random() * 40}px`,
              height: `${20 + Math.random() * 40}px`,
              left: `${Math.random() * 100}%`,
              bottom: `-${Math.random() * 100}px`,
              animationDuration: `${8 + Math.random() * 6}s`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Signup Form */}
      <div
        className={`relative z-10 p-8 rounded-xl bg-purple-800/40 backdrop-blur-lg shadow-xl w-full max-w-md transition-all duration-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
          }`}
      >
        <h2 className="text-3xl font-extrabold text-white">Create account</h2>
        <p className="mt-2 text-sm text-purple-200/80">
          Join us and get started in seconds.
        </p>

        <form
          className="mt-6 space-y-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-purple-200/90"
            >
              Name
            </label>
            <input
              id="name"
              type="text"
              required
              className="mt-2 w-full border-b border-purple-400/40 bg-transparent py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-300"
              placeholder="Jane Doe"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-purple-200/90"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              className="mt-2 w-full border-b border-purple-400/40 bg-transparent py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-300"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-purple-200/90"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              className="mt-2 w-full border-b border-purple-400/40 bg-transparent py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-300"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label
              htmlFor="confirm"
              className="block text-sm font-medium text-purple-200/90"
            >
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              required
              className="mt-2 w-full border-b border-purple-400/40 bg-transparent py-2 text-white placeholder-purple-300 focus:outline-none focus:border-purple-300"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-gradient-to-r from-purple-500 to-indigo-600 py-2.5 text-white font-semibold shadow-lg shadow-purple-600/30 hover:scale-[0.995] transition"
          >
            Sign up
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-purple-200/80">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-purple-300 font-semibold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

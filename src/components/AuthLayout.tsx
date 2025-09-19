import React from 'react';
import { ThemeToggle } from './ThemeToggle';
import FloatingSquares from './FloatingSquares';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-black dark:bg-black flex items-center justify-center p-6">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-purple-950 to-black opacity-90" />

      {/* Neon glow background */}
      <div className="pointer-events-none absolute inset-0 -z-20">
        <div className="absolute -left-48 -top-48 h-96 w-96 rounded-full bg-purple-700/20 blur-3xl animate-float" />
        <div className="absolute -right-48 -bottom-48 h-96 w-96 rounded-full bg-fuchsia-600/20 blur-3xl animate-float-slow" />
      </div>

      <header className="absolute top-6 left-6 right-6 flex items-center justify-between z-30">
        <h1 className="text-neutral-900 dark:text-white text-lg font-bold tracking-tight">Welcome</h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </header>

      <div className="relative w-full max-w-4xl">
        {/* Gradient border */}
        <div
          className="rounded-xl p-[2px]"
          style={{ background: 'linear-gradient(90deg,#7c3aed,#8b5cf6)' }}
        >
          <div
            className="relative overflow-hidden rounded-lg bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white"
            style={{
              boxShadow:
                '0 6px 30px rgba(124,58,237,0.35), inset 0 0 30px rgba(124,58,237,0.06)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Left: form area */}
              <div className="p-8 md:p-10 lg:p-12">
                <div className="max-w-md">{children}</div>
              </div>

              {/* Right: purple welcome panel with diagonal cut */}
              <div className="hidden md:block relative">
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(135deg,#4c1d95,#9f7aea)',
                  }}
                />

                {/* floating squares behind the text */}
                <FloatingSquares />

                {/* diagonal overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    clipPath:
                      'polygon(10% 0, 100% 0, 100% 100%, 0 100%)',
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))',
                  }}
                />

                {/* text content */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-neutral-900 dark:text-white">
                  <h2 className="brand-title text-4xl md:text-5xl">
                    GES LearnNet
                  </h2>
                  <p className="brand-tagline mt-3 max-w-xs text-sm">
                    Your Skills, Their Growth—A Community of Learners, by
                    Learners
                  </p>
                </div>
              </div>
            </div>

            {/* Neon inner border glow */}
            <div
              className="pointer-events-none absolute inset-0 rounded-lg"
              style={{ boxShadow: '0 0 40px rgba(124,58,237,0.35)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

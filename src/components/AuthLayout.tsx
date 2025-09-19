import React from 'react';
import { ThemeToggle } from './ThemeToggle';

export function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-violet-600 via-fuchsia-600 to-purple-700 dark:from-violet-900 dark:via-fuchsia-900 dark:to-purple-950 text-white relative overflow-hidden">
      {/* Animated background blobs */}
      <div className="pointer-events-none absolute -top-20 -left-20 h-72 w-72 rounded-full bg-fuchsia-400/30 blur-3xl animate-float-slow" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-purple-400/30 blur-3xl animate-float" />

      <header className="absolute inset-x-0 top-0 flex items-center justify-between p-4">
        <h1 className="text-lg font-semibold tracking-tight drop-shadow-sm">Welcome</h1>
        <ThemeToggle />
      </header>

      <main className="relative z-10 flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white/90 p-6 shadow-2xl backdrop-blur-md transition-colors duration-300 dark:bg-neutral-900/80">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

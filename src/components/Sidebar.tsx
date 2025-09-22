import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ThemeToggle } from './ThemeToggle';

const NavItem = ({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) => {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all text-sm font-medium w-full ${
        active
          ? 'bg-white/8 text-white shadow-lg translate-x-0'
          : 'text-neutral-300 hover:text-white hover:bg-white/5'
      }`}
    >
      <div className={`p-2 rounded-md ${active ? 'bg-white/10' : 'bg-transparent'}`}>
        {icon}
      </div>
      <div className="flex-1 text-left font-semibold tracking-tight">{label}</div>
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col fixed left-8 top-10 h-[calc(100vh-4rem)] w-64 p-4 rounded-lg bg-gradient-to-b from-purple-700/70 to-indigo-700/40 backdrop-blur-md shadow-xl z-40">
      {/* Top brand */}
      <div className="text-center mb-4">
        <h2 className="brand-title text-2xl font-extrabold text-white">SkillSwap</h2>
        <p className="brand-tagline mt-1 text-xs text-white/90">Your Skills, Their Growth — A community of learners, by learners</p>
      </div>

      <div className="h-px bg-white/10 my-3 rounded" />

      <nav className="flex flex-col gap-2 mt-2">
        <NavItem
          to="/profile"
          icon={(
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 text-purple-100">
              <path d="M12 12a5 5 0 100-10 5 5 0 000 10zM2 20a10 10 0 0120 0H2z" />
            </svg>
          )}
          label="My Profile"
        />

        <NavItem
          to="/dashboard"
          icon={(
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 text-purple-100">
              <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zM13 21h8V11h-8v10zM13 3v6h8V3h-8z" />
            </svg>
          )}
          label="Dashboard"
        />

        <NavItem
          to="/messages"
          icon={(
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="h-5 w-5 text-purple-100">
              <path d="M20 2H4a2 2 0 00-2 2v14l4-2h14a2 2 0 002-2V4a2 2 0 00-2-2z" />
            </svg>
          )}
          label="Messages"
        />
      </nav>

      <div className="mt-auto pt-4 border-t border-white/5">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-white/10 flex items-center justify-center text-white font-bold">R</div>
          <div className="flex-1">
            <div className="text-sm font-semibold text-white">Rasika Thakur</div>
            <div className="text-xs text-white/70">Student</div>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <ThemeToggle />
          <button className="ml-auto text-sm px-3 py-1 rounded-md bg-white/6 text-white hover:bg-white/10">Sign out</button>
        </div>
      </div>
    </aside>
  );
}

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavItem = ({ to, children }: { to: string; children: React.ReactNode }) => {
  const loc = useLocation();
  const active = loc.pathname === to;
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium ${
        active ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow' : 'text-neutral-300 hover:text-white hover:bg-white/5'
      }`}
    >
      {children}
    </Link>
  );
};

export default function Sidebar() {
  return (
    <aside className="w-full md:w-56 flex-shrink-0">
      <div className="sticky top-6 space-y-4 p-4">
        <div className="px-2 py-3">
          <h3 className="text-white font-extrabold text-lg">Student</h3>
          <p className="text-purple-100 text-xs mt-1">Profile</p>
        </div>

        <nav className="flex md:flex-col gap-2">
          <NavItem to="/dashboard">Dashboard</NavItem>
          <NavItem to="/profile">Profile</NavItem>
        </nav>

        <div className="mt-6 px-2">
          <p className="text-xs text-white/70">Tip: Toggle theme with the button at the top.</p>
        </div>
      </div>
    </aside>
  );
}

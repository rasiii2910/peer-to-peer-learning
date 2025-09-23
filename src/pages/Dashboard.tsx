import React from 'react';
import { useTheme } from '../theme/ThemeProvider';

function StatCard({ title, value, accent }: { title: string; value: string | number; accent?: string }) {
  return (
    <div className="p-4 rounded-lg shadow-sm bg-neutral-100 dark:bg-neutral-800/50">
      <div className="text-xs text-neutral-500 dark:text-neutral-300">{title}</div>
      <div className="mt-2 text-2xl font-extrabold text-neutral-900 dark:text-white">{value}</div>
    </div>
  );
}

export default function Dashboard() {
  const { theme } = useTheme();

  const skills = [
    { name: 'Java', pct: 80 },
    { name: 'Python', pct: 65 },
    { name: 'React', pct: 40 },
  ];

  const bookings = [
    { id: 1, name: 'Prof. Mehta', date: '2025-09-05 10:00', status: 'Confirmed' },
    { id: 2, name: 'Dr. Singh', date: '2025-09-09 16:00', status: 'Pending' },
  ];

  const notifications = [
    { id: 1, text: '2 new messages from John', type: 'chat' },
    { id: 2, text: 'Mentorship request from Priya', type: 'request' },
    { id: 3, text: 'Reminder: rate your last session', type: 'reminder' },
  ];

  return (
    <div className="min-h-screen w-full p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT main (large) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Greeting */}
            <div className="rounded-lg p-6 bg-gradient-to-r from-purple-500 to-indigo-600 text-white shadow-md">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <div className="text-sm">Hello, <span className="font-bold">Rasika Thakur</span> 👋</div>
                  <div className="mt-1 text-sm opacity-90">Here's your learning journey today</div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">RT</div>
                </div>
              </div>
            </div>

            {/* Stats cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <StatCard title="Taught" value={120} />
              <StatCard title="Learnt From" value={45} />
              <StatCard title="Mastered Skills" value={12} />
              <StatCard title="Rating" value={'4.6 / 5'} />
            </div>

            {/* Skills overview */}
            <div className="rounded-lg p-4 bg-neutral-100 dark:bg-neutral-800/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Your Skills</h3>
                <button className="text-sm px-3 py-1 rounded bg-gradient-to-r from-purple-600 to-indigo-600 text-white">+ Add Skill</button>
              </div>

              <div className="mt-4 flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {skills.map((s) => (
                  <div key={s.name} className="min-w-[160px] p-3 rounded-lg bg-white/5">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-sm text-neutral-400">{s.pct}%</div>
                    </div>
                    <div className="mt-2 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500" style={{ width: `${s.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming bookings */}
            <div className="rounded-lg p-4 bg-neutral-100 dark:bg-neutral-800/50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Your Upcoming Sessions</h3>
                <button className="text-sm px-3 py-1 rounded bg-white/5">View Calendar</button>
              </div>

              <div className="mt-3 space-y-3">
                {bookings.map((b) => (
                  <div key={b.id} className="p-3 rounded-md bg-white/5 flex items-center justify-between">
                    <div>
                      <div className="font-semibold">{b.name}</div>
                      <div className="text-xs text-neutral-400">{b.date}</div>
                    </div>
                    <div className="text-sm text-purple-600 dark:text-purple-300">{b.status}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* RIGHT sidebar (small) */}
          <aside className="space-y-6">
            {/* Notifications */}
            <div className="rounded-lg p-4 bg-neutral-100 dark:bg-neutral-800/50">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">Notifications</h4>
                <div className="text-xs text-neutral-400">3</div>
              </div>

              <div className="mt-3 max-h-48 overflow-auto hide-scrollbar space-y-2">
                {notifications.map((n) => (
                  <div key={n.id} className="p-2 rounded-md bg-white/5 text-sm">{n.text}</div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="rounded-lg p-4 bg-neutral-100 dark:bg-neutral-800/50">
              <h4 className="font-semibold">Quick Actions</h4>
              <div className="mt-3 grid grid-cols-2 gap-3">
                <button className="p-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm">Find Mentor</button>
                <button className="p-3 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-sm">Take Test</button>
                <button className="p-3 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm">+ Add Skill</button>
                <button className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm">View Progress</button>
              </div>
            </div>

            {/* Badges / points */}
            <div className="rounded-lg p-4 bg-neutral-100 dark:bg-neutral-800/50">
              <h4 className="font-semibold">Badges</h4>
              <div className="mt-3">
                <div className="text-sm">Best Student: <span className="font-semibold">—</span></div>
                <div className="text-sm">Best Mentor: <span className="font-semibold">—</span></div>
                <div className="mt-3 text-xs text-neutral-400">Points: <span className="font-bold">1240</span></div>
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}

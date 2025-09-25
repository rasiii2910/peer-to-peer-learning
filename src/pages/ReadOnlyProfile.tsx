import React from 'react';
import { useParams } from 'react-router-dom';

const sampleProfiles: Record<string, any> = {
  u1: { id: 'u1', name: 'John Doe', initials: 'J', yearBranch: '4th Year - CS', email: 'john@example.com', bio: 'Full-stack dev', skills: [{ name: 'React', level: 'Advanced' }, { name: 'Node', level: 'Intermediate' }], rating: 4 },
  u2: { id: 'u2', name: 'Priya Verma', initials: 'P', yearBranch: '2nd Year - IT', email: 'priya@example.com', bio: 'Competitive programmer', skills: [{ name: 'Algorithms', level: 'Advanced' }], rating: 5 },
  u3: { id: 'u3', name: 'Amit Sharma', initials: 'A', yearBranch: '3rd Year - DS', email: 'amit@example.com', bio: 'Data Science enthusiast', skills: [{ name: 'Python', level: 'Advanced' }], rating: 4 },
};

export default function ReadOnlyProfile() {
  const { id } = useParams();
  const p = id ? sampleProfiles[id] : null;
  if (!p) return <div className="p-6">Profile not found</div>;

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <div className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">{p.initials}</div>
        <div>
          <div className="text-2xl font-bold">{p.name}</div>
          <div className="text-sm text-neutral-500">{p.yearBranch} • {p.email}</div>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="font-semibold">Bio</h3>
        <p className="text-neutral-600 dark:text-neutral-300 mt-2">{p.bio}</p>
      </section>

      <section className="mt-6">
        <h3 className="font-semibold">Skills</h3>
        <div className="mt-3 flex gap-2 flex-wrap">
          {p.skills.map((s:any) => (
            <div key={s.name} className="px-3 py-1 rounded-full bg-white/5">{s.name} • {s.level}</div>
          ))}
        </div>
      </section>

      <section className="mt-6">
        <h3 className="font-semibold">Rating</h3>
        <div className="mt-2">{p.rating} / 5</div>
      </section>
    </div>
  );
}

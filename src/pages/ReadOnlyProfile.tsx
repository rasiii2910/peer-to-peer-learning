import React from 'react';
import { useParams } from 'react-router-dom';
import ProfilePage from './ProfilePage';

export const sampleProfiles: Record<string, any> = {
  u1: { id: 'u1', name: 'John Doe', initials: 'J', yearBranch: '4th Year - CS', email: 'john@example.com', bio: 'Full-stack dev', skills: [{ id: 's1', name: 'React', level: 'Advanced' }, { id: 's2', name: 'Node', level: 'Intermediate' }], feedback: [], profiles: [], avatar: null },
  u2: { id: 'u2', name: 'Priya Verma', initials: 'P', yearBranch: '2nd Year - IT', email: 'priya@example.com', bio: 'Competitive programmer', skills: [{ id: 's1', name: 'Algorithms', level: 'Advanced' }], feedback: [], profiles: [], avatar: null },
  u3: { id: 'u3', name: 'Amit Sharma', initials: 'A', yearBranch: '3rd Year - DS', email: 'amit@example.com', bio: 'Data Science enthusiast', skills: [{ id: 's1', name: 'Python', level: 'Advanced' }], feedback: [], profiles: [], avatar: null },
};

export default function ReadOnlyProfile() {
  const { id } = useParams();
  const p = id ? sampleProfiles[id] : null;
  if (!p) return <div className="p-6">Profile not found</div>;

  return <ProfilePage readOnly initialData={p} />;
}

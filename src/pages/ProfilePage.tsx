import React, { useMemo, useState } from 'react';
import Sidebar from '../components/Sidebar';
import { useTheme } from '../theme/ThemeProvider';

type Skill = { id: string; name: string; level: 'Beginner' | 'Intermediate' | 'Advanced' };
type Feedback = { id: string; mentor: string; rating: number; text: string; date: string };

function Stars({ value }: { value: number }) {
  const stars = Array.from({ length: 5 }).map((_, i) => i < value);
  return (
    <div className="flex gap-1 text-yellow-400">
      {stars.map((on, i) => (
        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-4 w-4 ${on ? 'opacity-100' : 'opacity-30'}`}>
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.38 2.455c-.784.57-1.839-.196-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.623 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
        </svg>
      ))}
    </div>
  );
}

// Profiles widget allows adding external profiles (github, hackerrank, codechef, leetcode, portfolio)
function ProfilesWidget({ profiles, onAdd, onRemove, readOnly }:{ profiles:{ id: string; key: string; url: string }[]; onAdd:(k:string,u:string)=>void; onRemove:(id:string)=>void; readOnly?: boolean }) {
  const isReadOnly = !!readOnly;
  const services = [
    { key: 'github', label: 'GitHub', domain: 'github.com', icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.528 2.341 1.087 2.91.832.091-.647.35-1.087.636-1.337-2.22-.253-4.555-1.11-4.555-4.942 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.272.098-2.65 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.91-1.294 2.748-1.025 2.748-1.025.546 1.378.202 2.397.1 2.65.64.699 1.028 1.592 1.028 2.683 0 3.842-2.338 4.686-4.566 4.935.359.31.679.92.679 1.853 0 1.337-.012 2.417-.012 2.747 0 .268.18.58.688.482A10.012 10.012 0 0022 12c0-5.523-4.477-10-10-10z"/></svg>) },
    { key: 'hackerrank', label: 'HackerRank', domain: 'hackerrank.com', icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>) },
    { key: 'codechef', label: 'CodeChef', domain: 'codechef.com', icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/></svg>) },
    { key: 'leetcode', label: 'LeetCode', domain: 'leetcode.com', icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2L2 7v10l10 5 10-5V7L12 2z"/></svg>) },
    { key: 'portfolio', label: 'Portfolio', domain: '', icon: (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4"><path d="M12 2l10 5v10l-10 5L2 17V7l10-5z"/></svg>) },
  ];

  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(services[0].key);
  const [url, setUrl] = useState('');
  const [error, setError] = useState<string | null>(null);

  function isValidUrl(val: string) {
    try {
      // ensure protocol present
      const u = new URL(val);
      return !!u.hostname;
    } catch (e) {
      return false;
    }
  }

  function matchesDomain(key: string, val: string) {
    if (!val) return false;
    try {
      const u = new URL(val);
      const svc = services.find((s) => s.key === key);
      if (!svc) return false;
      if (!svc.domain) return true; // portfolio or custom
      return u.hostname.includes(svc.domain);
    } catch {
      return false;
    }
  }

  function addProfile() {
    setError(null);
    if (!isValidUrl(url)) {
      setError('Enter a valid URL (include https://)');
      return;
    }
    if (!matchesDomain(selected, url)) {
      const svc = services.find((s) => s.key === selected);
      setError(svc?.domain ? `URL must be from ${svc?.domain}` : 'Invalid URL');
      return;
    }
    onAdd(selected, url);
    setUrl('');
  }

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h3 className="text-md font-semibold">Profiles</h3>
        {!isReadOnly && (
          <button onClick={() => setOpen((s) => !s)} className="text-sm text-purple-700 dark:text-purple-200 bg-white/5 px-2 py-1 rounded-md">
            {open ? 'Close' : 'Add / Manage'}
          </button>
        )}
      </div>

      {open && !isReadOnly && (
        <div className="mt-3 p-4 rounded-md bg-neutral-100 dark:bg-neutral-800/50">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <select value={selected} onChange={(e) => setSelected(e.target.value)} className="rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-200/50 dark:border-neutral-700 px-3 py-2">
              {services.map((s) => (
                <option key={s.key} value={s.key}>{s.label}</option>
              ))}
            </select>

            <input value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://yourprofile.com/username" className="rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-200/50 dark:border-neutral-700 px-3 py-2 col-span-2 sm:col-span-2" />

            <div className="sm:col-span-3 flex items-center gap-3">
              <button onClick={addProfile} className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">Add</button>
              <div className="text-sm text-rose-400">{error}</div>
            </div>
          </div>

          {/* list of profiles */}
          <div className="mt-4 grid gap-2">
            {profiles.map((p) => {
              const svc = services.find((s) => s.key === p.key)!;
              return (
                <div key={p.id} className="p-3 rounded-md bg-neutral-100 dark:bg-neutral-800/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-neutral-200 dark:bg-white/5 p-2 rounded">{svc.icon}</div>
                    <div className="min-w-0">
                      <div className="font-semibold text-white text-sm truncate">{svc.label}</div>
                      <a className="text-xs text-purple-200 truncate block max-w-xs" href={p.url} target="_blank" rel="noreferrer">{p.url}</a>
                    </div>
                  </div>

                  {!isReadOnly && (
                    <div className="flex items-center gap-2">
                      <button onClick={() => window.open(p.url, '_blank')} className="text-sm text-white/80 px-2 py-1 rounded bg-white/5">View</button>
                      <button onClick={() => onRemove(p.id)} className="text-sm text-rose-400 px-2 py-1 rounded bg-transparent">Remove</button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* always-visible profile cards */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {profiles.map((p) => {
          const svc = services.find((s) => s.key === p.key)!;
          return (
            <a key={`card-${p.id}`} href={p.url} target="_blank" rel="noreferrer" className="group block p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded bg-white/5">{svc.icon}</div>
                <div className="min-w-0">
                  <div className="font-semibold text-white truncate">{svc.label}</div>
                  <div className="text-xs text-purple-200 truncate">{p.url.replace(/^https?:\/\//, '')}</div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}

export default function ProfilePage({ readOnly = false, initialData = undefined }:{ readOnly?: boolean; initialData?: any } = {}) {
  const { theme } = useTheme();
  const [avatar, setAvatar] = useState<string | null>(initialData?.avatar ?? null);
  const [editingInfo, setEditingInfo] = useState(false);
  const [name, setName] = useState(initialData?.name ?? 'Rasika Thakur');
  const [yearBranch, setYearBranch] = useState(initialData?.yearBranch ?? '3rd Year – Computer Science');
  const [email, setEmail] = useState(initialData?.email ?? 'rasika@example.com');
  const [phone, setPhone] = useState(initialData?.phone ?? '');

  // Profiles state lifted to the page so they can be visualized elsewhere
  const [profiles, setProfiles] = useState<{ id: string; key: string; url: string }[]>([]);

  function handleAddProfile(key: string, url: string) {
    setProfiles((p) => [...p, { id: String(Date.now()), key, url }]);
  }

  function handleRemoveProfile(id: string) {
    setProfiles((p) => p.filter((x) => x.id !== id));
  }

  const [bio, setBio] = useState(
    'I am passionate about Java, Python, and Web Development. I enjoy mentoring juniors and learning collaboratively.'
  );
  const [editingBio, setEditingBio] = useState(false);

  const [skills, setSkills] = useState<Skill[]>([
    { id: 's1', name: 'Java', level: 'Advanced' },
    { id: 's2', name: 'React', level: 'Intermediate' },
    { id: 's3', name: 'Python', level: 'Advanced' },
  ]);
  const [showAddSkill, setShowAddSkill] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<Skill['level']>('Beginner');

  const [feedback, setFeedback] = useState<Feedback[]>([
    { id: 'f1', mentor: 'Prof. Mehta', rating: 5, text: 'Great mentorship and commitment.', date: '2025-08-01' },
    { id: 'f2', mentor: 'Dr. Singh', rating: 4, text: 'Very helpful on project architecture.', date: '2025-07-12' },
  ]);
  const [sort, setSort] = useState<'latest' | 'highest'>('latest');

  const avgRating = useMemo(() => Math.round((feedback.reduce((s, f) => s + f.rating, 0) / Math.max(1, feedback.length)) || 0), [feedback]);

  // Avatar change triggers crop modal
  const [cropSrc, setCropSrc] = useState<string | null>(null);
  const [cropZoom, setCropZoom] = useState(1);
  const [cropX, setCropX] = useState(0);
  const [cropY, setCropY] = useState(0);
  const [showCrop, setShowCrop] = useState(false);

  function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    const url = URL.createObjectURL(f);
    setCropSrc(url);
    setCropZoom(1);
    setCropX(0);
    setCropY(0);
    setShowCrop(true);
  }

  async function saveCropped() {
    if (!cropSrc) return;
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const i = new Image();
      i.crossOrigin = 'anonymous';
      i.onload = () => res(i);
      i.onerror = rej;
      i.src = cropSrc;
    });

    const size = 256; // output size
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d')!;

    // fill with transparent
    ctx.clearRect(0, 0, size, size);

    // compute source rectangle from image based on zoom and offsets
    const zoom = Math.max(1, cropZoom);
    const srcW = img.naturalWidth / zoom;
    const srcH = img.naturalHeight / zoom;

    // offsets are percentage -50..50 -> map to pixel shift
    const offsetX = (cropX / 100) * img.naturalWidth;
    const offsetY = (cropY / 100) * img.naturalHeight;

    const srcX = Math.max(0, (img.naturalWidth - srcW) / 2 + offsetX - srcW / 2);
    const srcY = Math.max(0, (img.naturalHeight - srcH) / 2 + offsetY - srcH / 2);

    // draw image to canvas filling whole canvas
    // create circular clip
    ctx.save();
    ctx.beginPath();
    ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();

    ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, size, size);
    ctx.restore();

    const dataUrl = canvas.toDataURL('image/png');
    setAvatar(dataUrl);
    setShowCrop(false);
    // revoke object URL
    try { URL.revokeObjectURL(cropSrc); } catch (e) {}
    setCropSrc(null);
  }

  function addSkill() {
    if (!newSkillName.trim()) return;
    setSkills((s) => [...s, { id: String(Date.now()), name: newSkillName.trim(), level: newSkillLevel }]);
    setNewSkillName('');
    setNewSkillLevel('Beginner');
    setShowAddSkill(false);
  }

  function removeSkill(id: string) {
    setSkills((s) => s.filter((x) => x.id !== id));
  }

  function sortedFeedback() {
    if (sort === 'latest') return [...feedback].sort((a, b) => +new Date(b.date) - +new Date(a.date));
    return [...feedback].sort((a, b) => b.rating - a.rating || +new Date(b.date) - +new Date(a.date));
  }

  return (
    <div className="min-h-screen w-full flex items-start justify-center p-6 relative">
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black via-purple-950 to-black opacity-90" />

      <div className="relative w-full max-w-6xl rounded-xl p-[2px] mx-auto" style={{ background: 'linear-gradient(90deg,#7c3aed,#8b5cf6)' }}>
        <div
          className="relative overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
          style={{ boxShadow: '0 6px 30px rgba(124,58,237,0.35), inset 0 0 30px rgba(124,58,237,0.06)' }}
        >
          <div className="grid grid-cols-1 md:grid-cols-4">
            {/* Sidebar */}
            <div className="hidden md:block md:col-span-1 bg-gradient-to-b from-purple-700/60 to-indigo-700/40 relative p-6 rounded-l-lg overflow-hidden">
              <Sidebar />
            </div>

            {/* Main content */}
            <main className="col-span-1 md:col-span-3 p-6 md:p-10 max-h-[calc(100vh-4rem)] overflow-auto hide-scrollbar">
              <div className="flex items-start justify-between gap-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="h-28 w-28 rounded-full bg-purple-200/30 overflow-hidden ring-4 ring-white/10">
                      {avatar ? (
                        // eslint-disable-next-line jsx-a11y/img-redundant-alt
                        <img src={avatar} alt="avatar" className="h-full w-full object-cover" />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-purple-400 to-indigo-500 flex items-center justify-center text-white text-2xl font-bold">RT</div>
                      )}
                    </div>

                    {!readOnly && (
                      <label className="absolute bottom-0 right-0 -mr-1 -mb-1 bg-white/10 rounded-full p-1 hover:bg-white/20 cursor-pointer">
                        <input type="file" accept="image/*" onChange={onAvatarChange} className="hidden" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4 text-white">
                          <path d="M12 2a2 2 0 00-2 2v1H8.5A2.5 2.5 0 006 7.5V9h12V7.5A2.5 2.5 0 0015.5 5H14V4a2 2 0 00-2-2zM6 11v7.5A2.5 2.5 0 008.5 21H15.5A2.5 2.5 0 0018 18.5V11H6z" />
                        </svg>
                      </label>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center gap-3">
                      <h1 className="text-2xl md:text-3xl font-extrabold text-neutral-900 dark:text-white">{name}</h1>
                      {!readOnly && (
                        <button
                          onClick={() => setEditingInfo((s) => !s)}
                          className="text-sm text-purple-700 dark:text-purple-200 bg-white/5 px-2 py-1 rounded-md"
                        >
                          {editingInfo ? 'Save' : 'Edit'}
                        </button>
                      )}
                    </div>

                    {editingInfo ? (
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 gap-3">
                        <input value={name} onChange={(e) => setName(e.target.value)} className="rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-200/50 dark:border-neutral-700 px-3 py-2" />
                        <input value={yearBranch} onChange={(e) => setYearBranch(e.target.value)} className="rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-200/50 dark:border-neutral-700 px-3 py-2" />
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-200/50 dark:border-neutral-700 px-3 py-2" />
                        <input value={phone} onChange={(e) => setPhone(e.target.value)} className="rounded-md bg-neutral-100 dark:bg-neutral-700 text-neutral-900 dark:text-neutral-100 border border-neutral-200/50 dark:border-neutral-700 px-3 py-2" />
                      </div>
                    ) : (
                      <div className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                        <div className="font-medium">{yearBranch}</div>
                        <div className="mt-1 text-sm text-purple-700 dark:text-purple-200">{email}{phone ? ` • ${phone}` : ''}</div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="hidden md:flex flex-col items-end gap-3">
                  <div className="flex items-center gap-2">
                    <div className="text-sm text-neutral-500">Average Rating</div>
                    <div className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-md">
                      <Stars value={avgRating} />
                      <div className="text-sm font-semibold">{avgRating}.0</div>
                    </div>
                  </div>

                  <div className="text-xs text-neutral-400">Member since 2023</div>
                </div>
              </div>

              {/* Bio */}
              <section className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Bio</h2>
                  {!readOnly && (
                    <button onClick={() => setEditingBio((s) => !s)} className="text-sm text-purple-700 dark:text-purple-200 bg-white/5 px-2 py-1 rounded-md">
                      {editingBio ? 'Save' : 'Edit'}
                    </button>
                  )}
                </div>
                {editingBio ? (
                  <textarea value={bio} onChange={(e) => setBio(e.target.value)} className="mt-3 w-full min-h-[100px] rounded-md bg-transparent border border-neutral-200/5 p-3" />
                ) : (
                  <p className="mt-3 text-neutral-700 dark:text-neutral-300 leading-relaxed">{bio}</p>
                )}

                {/* Profiles dropdown for adding external profiles */}
                <ProfilesWidget profiles={profiles} onAdd={handleAddProfile} onRemove={handleRemoveProfile} readOnly={readOnly} />
              </section>

              {/* Skills */}
              <section className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Skills</h2>
                  <div className="flex items-center gap-2">
                    {!readOnly && (
                      <button onClick={() => setShowAddSkill(true)} className="text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 px-3 py-1 rounded-full">
                        Add Skill
                      </button>
                    )}
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {skills.map((s) => (
                    <div key={s.id} className="p-3 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{s.name}</div>
                        <div className="text-xs text-neutral-400">{s.level}</div>
                        <div className="mt-2 h-2 w-36 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full bg-purple-500`} style={{ width: s.level === 'Beginner' ? '30%' : s.level === 'Intermediate' ? '65%' : '100%' }} />
                        </div>
                      </div>

                      {!readOnly && (
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex gap-2">
                            <button onClick={() => { const name = prompt('Edit skill name', s.name); if (name) setSkills((prev) => prev.map((x) => x.id === s.id ? { ...x, name } : x)); }} className="text-sm text-neutral-300">Edit</button>
                            <button onClick={() => removeSkill(s.id)} className="text-sm text-rose-400">Remove</button>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Ratings & Feedback */}
              <section className="mt-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold">Ratings & Feedback</h2>
                  <div className="flex items-center gap-3">
                    <select value={sort} onChange={(e) => setSort(e.target.value as any)} className="bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-100 border border-neutral-200/50 dark:border-neutral-700 text-sm rounded-md px-2 py-1">
                      <option value="latest">Latest</option>
                      <option value="highest">Highest</option>
                    </select>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {sortedFeedback().map((f) => (
                    <div key={f.id} className="p-4 rounded-lg bg-neutral-100 dark:bg-neutral-800/50">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="font-semibold">{f.mentor}</div>
                          <div className="text-xs text-neutral-400">{new Date(f.date).toLocaleDateString()}</div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Stars value={f.rating} />
                          <div className="text-sm font-medium">{f.rating}</div>
                        </div>
                      </div>

                      <p className="mt-3 text-neutral-700 dark:text-neutral-300">{f.text}</p>
                    </div>
                  ))}
                </div>
              </section>
            </main>
          </div>

          <div className="pointer-events-none absolute inset-0 rounded-lg" style={{ boxShadow: '0 0 40px rgba(124,58,237,0.35)' }} />
        </div>
      </div>

      {/* Add Skill Modal */}
      {showAddSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50" onClick={() => setShowAddSkill(false)} />
          <div className="relative z-10 w-full max-w-md rounded-lg bg-neutral-50 dark:bg-neutral-900 p-6 text-neutral-900 dark:text-neutral-100">
            <h3 className="text-lg font-bold">Add Skill</h3>
            <div className="mt-4 grid gap-3">
              <input value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} placeholder="Skill name" className="w-full rounded-md bg-transparent border border-neutral-200/5 px-3 py-2" />
              <select value={newSkillLevel} onChange={(e) => setNewSkillLevel(e.target.value as Skill['level'])} className="w-full rounded-md bg-transparent border border-neutral-200/5 px-3 py-2">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button onClick={() => setShowAddSkill(false)} className="px-3 py-2 rounded-md bg-white/5">Cancel</button>
              <button onClick={addSkill} className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">Add</button>
            </div>
          </div>
        </div>
      )}

      {/* Crop Modal */}
      {showCrop && cropSrc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60" onClick={() => { setShowCrop(false); setCropSrc(null); }} />
          <div className="relative z-10 w-full max-w-2xl rounded-lg bg-neutral-50 dark:bg-neutral-900 p-6 text-neutral-900 dark:text-neutral-100">
            <h3 className="text-lg font-bold">Crop Avatar</h3>
            <div className="mt-4 flex flex-col md:flex-row gap-4">
              <div className="w-full md:w-1/2 flex items-center justify-center">
                <div className="w-56 h-56 rounded-full overflow-hidden bg-black/5 relative">
                  <img src={cropSrc} alt="crop" draggable={false} className="absolute inset-0 w-full h-full object-cover" style={{ transform: `translate(${cropX}%, ${cropY}%) scale(${cropZoom})` }} />
                  <div className="pointer-events-none absolute inset-0 rounded-full border-2 border-white/30" />
                </div>
              </div>

              <div className="flex-1">
                <div className="mb-3">
                  <label className="block text-sm font-medium">Zoom</label>
                  <input type="range" min={1} max={3} step={0.01} value={cropZoom} onChange={(e) => setCropZoom(Number(e.target.value))} className="w-full" />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium">Horizontal</label>
                  <input type="range" min={-50} max={50} step={1} value={cropX} onChange={(e) => setCropX(Number(e.target.value))} className="w-full" />
                </div>

                <div className="mb-3">
                  <label className="block text-sm font-medium">Vertical</label>
                  <input type="range" min={-50} max={50} step={1} value={cropY} onChange={(e) => setCropY(Number(e.target.value))} className="w-full" />
                </div>

                <div className="mt-4 flex items-center justify-end gap-3">
                  <button onClick={() => { setShowCrop(false); setCropSrc(null); }} className="px-3 py-2 rounded-md bg-white/5">Cancel</button>
                  <button onClick={saveCropped} className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

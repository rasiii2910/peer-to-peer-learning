import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const sampleUsers: Record<string, { id: string; name: string; initials: string; bio?: string }> = {
  u1: { id: 'u1', name: 'John Doe', initials: 'J', bio: 'Interested in full-stack development' },
  u2: { id: 'u2', name: 'Priya Verma', initials: 'P', bio: 'Competitive programmer & mentor' },
  u3: { id: 'u3', name: 'Amit Sharma', initials: 'A', bio: 'Data Science enthusiast' },
};

export default function ChatView() {
  const { id } = useParams();
  const user = id ? sampleUsers[id] : null;
  const navigate = useNavigate();
  const [messages, setMessages] = useState<{ id: string; fromMe: boolean; text: string; time: string }[]>([
    { id: 'm1', fromMe: false, text: 'Hey, are you free tomorrow?', time: '10:12 AM' },
    { id: 'm2', fromMe: true, text: 'Yes, I am. Want to schedule a session?', time: '10:15 AM' },
  ]);
  const [text, setText] = useState('');

  function send() {
    if (!text.trim()) return;
    setMessages((m) => [...m, { id: String(Date.now()), fromMe: true, text: text.trim(), time: new Date().toLocaleTimeString() }]);
    setText('');
  }

  if (!user) return <div>User not found</div>;

  return (
    <div className="flex flex-col h-full min-h-[calc(100vh-4rem)]">
      {/* header - clicking left area navigates to profile */}
      <div className="sticky top-0 z-10 bg-neutral-50 dark:bg-neutral-900">
        <div className="flex items-center justify-between p-3 border-b border-white/5">
          <button onClick={() => navigate(`/profile/view/${user.id}`)} className="flex items-center gap-3 text-left">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-indigo-500 flex items-center justify-center text-white font-semibold">{user.initials}</div>
            <div>
              <div className="font-semibold">{user.name}</div>
              <div className="text-xs text-neutral-400">{user.bio}</div>
            </div>
          </button>

          <div className="flex items-center gap-2">
            <button className="text-sm text-neutral-400">•••</button>
          </div>
        </div>
      </div>

      {/* messages */}
      <div className="flex-1 overflow-auto hide-scrollbar p-4 space-y-3">
        {messages.map((m) => (
          <div key={m.id} className={`max-w-[70%] p-3 rounded-lg ${m.fromMe ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white ml-auto' : 'bg-white/5 text-neutral-900 dark:text-neutral-100'}`}>
            <div className="text-sm">{m.text}</div>
            <div className="text-xs text-neutral-400 mt-1">{m.time}</div>
          </div>
        ))}
      </div>

      {/* input toolbar anchored at bottom */}
      <div className="sticky bottom-0 z-10 bg-neutral-50 dark:bg-neutral-900">
        <div className="p-3 border-t border-white/5 flex items-center gap-3">
          <button className="p-2 rounded-lg bg-white/5 text-neutral-400" title="Emoji">🙂</button>
          <button className="p-2 rounded-lg bg-white/5 text-neutral-400" title="Attach">📎</button>
          <button className="p-2 rounded-lg bg-white/5 text-neutral-400" title="Schedule">📅</button>
          <input value={text} onChange={(e) => setText(e.target.value)} className="flex-1 rounded-lg bg-neutral-100 dark:bg-neutral-800/50 px-3 py-2" placeholder="Type a message..." />
          <button onClick={send} className="p-3 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white" title="Send">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="h-4 w-4">
              <path d="M2 21l21-9L2 3v7l15 2-15 2v7z" fill="currentColor" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

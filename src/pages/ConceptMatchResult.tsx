import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function ConceptMatchResult() {
  const loc = useLocation();
  const navigate = useNavigate();
  const state: any = (loc && (loc.state as any)) || history.state || {};
  const total = state?.total ?? 10;
  const correct = state?.correct ?? 0;
  const language = state?.language ?? 'JavaScript';

  const score = Math.round((correct / total) * 100);
  const stars = Math.round((correct / total) * 5);
  // rudimentary rank: lower is better
  const rank = Math.max(1, 100 - Math.round((correct / total) * 90));

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-6">
        <h1 className="text-3xl font-extrabold">Results — Concept Match</h1>
        <p className="text-sm text-neutral-500">Language: {language}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
          <div className="text-sm">Score</div>
          <div className="text-3xl font-bold mt-2">{score}</div>
          <div className="text-xs mt-2">points</div>
        </div>

        <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900">
          <div className="text-sm">Correct Answers</div>
          <div className="text-2xl font-bold mt-2">{correct} / {total}</div>
          <div className="mt-4 text-sm text-neutral-500">Stars earned</div>
          <div className="mt-2 flex items-center gap-1 text-yellow-400">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={`h-5 w-5 ${i < stars ? '' : 'opacity-30'}`}>
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.97a1 1 0 00.95.69h4.175c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.97c.3.922-.755 1.688-1.54 1.118L10 13.347l-3.38 2.455c-.784.57-1.839-.196-1.54-1.118l1.287-3.97a1 1 0 00-.364-1.118L2.623 9.397c-.783-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.97z" />
              </svg>
            ))}
          </div>
        </div>

        <div className="p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900">
          <div className="text-sm">Rank Position</div>
          <div className="text-2xl font-bold mt-2">#{rank}</div>
          <div className="mt-4 text-sm text-neutral-500">Higher rank means better performance among peers</div>
        </div>
      </div>

          <div className="mt-6">
        <h3 className="text-lg font-semibold mb-3">Review Answers</h3>

        <div className="space-y-3">
          {(state.questions || []).map((q: any, i: number) => {
            const ans = (state.answers || []).find((a: any) => a.qid === q.id) || { chosen: null, correct: q.correct };
            const chosen = ans.chosen;
            const isCorrect = chosen === q.correct;
            return (
              <div key={q.id} className="p-4 rounded-lg bg-neutral-50 dark:bg-neutral-900">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="font-semibold">{i + 1}. {q.question}</div>
                    <div className="mt-2 space-y-2">
                      {q.options.map((opt: string, idx: number) => {
                        const correctOpt = idx === q.correct;
                        const chosenOpt = idx === chosen;
                        return (
                          <div key={idx} className={`p-2 rounded-md flex items-center gap-3 ${correctOpt ? 'bg-green-600/10' : chosenOpt && !correctOpt ? 'bg-rose-600/10' : ''}`}>
                            <div className="w-6 text-xs text-neutral-500">{String.fromCharCode(65 + idx)}</div>
                            <div className="flex-1 text-sm">{opt}</div>
                            <div className="w-24 text-right text-sm">
                              {correctOpt && <span className="text-emerald-500 font-semibold">Correct</span>}
                              {chosenOpt && !correctOpt && <span className="text-rose-400 font-semibold">Your answer</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {!isCorrect && (
                      <div className="mt-2 text-sm text-emerald-500">Correct answer: <strong>{q.options[q.correct]}</strong></div>
                    )}

                  </div>

                  <div className="ml-4 text-sm text-neutral-500">
                    {isCorrect ? <span className="text-emerald-500">✓</span> : <span className="text-rose-400">✕</span>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-3">
          <button onClick={() => navigate('/tests')} className="px-4 py-2 rounded-md bg-white/5">Back to tests</button>
          <button onClick={() => navigate('/profile')} className="px-4 py-2 rounded-md bg-gradient-to-r from-purple-600 to-indigo-600 text-white">View Profile</button>
        </div>
      </div>
    </div>
  );
}

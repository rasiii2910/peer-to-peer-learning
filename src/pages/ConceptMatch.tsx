import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Q = { id: string; question: string; options: string[]; correct: number };

const sampleQuestions: Q[] = [
  { id: 'q1', question: 'A data structure that follows FIFO order', options: ['Stack', 'Queue', 'Tree', 'Graph'], correct: 1 },
  { id: 'q2', question: 'Technique to find shortest path in weighted graph', options: ['DFS', 'BFS', "Dijkstra's", 'Prim'], correct: 2 },
  { id: 'q3', question: 'Language primarily used for statistical computing', options: ['Python', 'R', 'Go', 'Rust'], correct: 1 },
  { id: 'q4', question: 'HTML stands for', options: ['Hyper Trainer Markup Language', 'HyperText Markup Language', 'HyperText Markdown Language', 'Hyperlink Text Markup Language'], correct: 1 },
  { id: 'q5', question: 'What is polymorphism in OOP?', options: ['Code reuse', 'Multiple forms', 'Data hiding', 'Inheritance only'], correct: 1 },
  { id: 'q6', question: 'Which sorting algorithm is stable?', options: ['QuickSort', 'MergeSort', 'HeapSort', 'SelectionSort'], correct: 1 },
  { id: 'q7', question: 'Which HTTP method is idempotent?', options: ['POST', 'GET', 'PATCH', 'CONNECT'], correct: 1 },
  { id: 'q8', question: 'Which is a NoSQL database?', options: ['MySQL', 'Postgres', 'MongoDB', 'SQLite'], correct: 2 },
  { id: 'q9', question: 'Which keyword creates a class in Java?', options: ['struct', 'class', 'def', 'object'], correct: 1 },
  { id: 'q10', question: 'Which operator is used for exponentiation in Python?', options: ['^', '**', 'pow', '%'], correct: 1 },
];

export default function ConceptMatch() {
  const navigate = useNavigate();
  const loc = useLocation();
  const state: any = (loc && (loc.state as any)) || (history.state || {});
  const language = state?.language || 'JavaScript';

  const questions = useMemo(() => {
    // shuffle sampleQuestions and take 10
    const arr = [...sampleQuestions];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.slice(0, 10);
  }, []);

  const total = questions.length;
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [answers, setAnswers] = useState<{ qid: string; chosen: number | null; correct: number }[]>([]);

  // timer and rocket progress
  const duration = 30; // seconds per question
  const [remaining, setRemaining] = useState(duration);
  const rafRef = useRef<number | null>(null);
  const startTsRef = useRef<number | null>(null);

  useEffect(() => {
    startQuestion();
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function startQuestion() {
    setSelected(null);
    setRemaining(duration);
    startTsRef.current = performance.now();
    const tick = () => {
      const now = performance.now();
      const elapsed = ((now - (startTsRef.current || now)) / 1000);
      const rem = Math.max(0, duration - elapsed);
      setRemaining(rem);
      if (rem <= 0) {
        // time up for this question
        recordAnswer(null);
      } else {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(tick);
  }

  function recordAnswer(chosen: number | null) {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    const q = questions[index];
    const isCorrect = chosen === q.correct;
    if (isCorrect) setCorrectCount((c) => c + 1);
    setAnswers((a) => [...a, { qid: q.id, chosen, correct: q.correct }]);

    // brief pause, then next question or finish
    setTimeout(() => {
      if (index + 1 >= total) {
        // finish
        const finalAnswers = answers.concat({ qid: q.id, chosen, correct: q.correct });
        const result = { total, correct: isCorrect ? correctCount + 1 : correctCount, answers: finalAnswers };
        navigate('/tests/concept-match/result', { state: { ...result, language, questions } });
      } else {
        setIndex((i) => i + 1);
      }
    }, 700);
  }

  function choose(i: number) {
    if (selected !== null) return; // already chosen
    setSelected(i);
    recordAnswer(i);
  }

  const progress = remaining / duration; // 1 to 0

  return (
    <div className="w-full max-w-4xl">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold">Concept Match — {language}</h2>
        <div className="text-sm text-neutral-500">Question {index + 1} / {total}</div>
      </div>

      <div className="relative h-40 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-lg overflow-hidden mb-6">
        {/* rocket background animation: rocket moves up as progress decreases (start at bottom when progress=1) */}
        <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0" style={{ pointerEvents: 'none' }}>
          <div style={{ transform: `translateY(${(1 - progress) * -140}px)`, transition: 'transform 0.2s linear' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z" fill="#7c3aed" />
            </svg>
          </div>
        </div>
      </div>

      <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900">
        <div className="text-lg font-semibold">{questions[index].question}</div>

        <div className="mt-4 grid gap-3">
          {questions[index].options.map((opt, i) => {
            const isSelected = selected === i;
            return (
              <button key={i} onClick={() => choose(i)} className={`text-left p-3 rounded-md border ${isSelected ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'border-transparent bg-white/0 hover:bg-white/5'} transition`}>{opt}</button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

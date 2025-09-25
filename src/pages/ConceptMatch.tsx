// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// type Q = { id: string; question: string; options: string[]; correct: number };

// const sampleQuestions: Q[] = [
//   { id: 'q1', question: 'A data structure that follows FIFO order', options: ['Stack', 'Queue', 'Tree', 'Graph'], correct: 1 },
//   { id: 'q2', question: 'Technique to find shortest path in weighted graph', options: ['DFS', 'BFS', "Dijkstra's", 'Prim'], correct: 2 },
//   { id: 'q3', question: 'Language primarily used for statistical computing', options: ['Python', 'R', 'Go', 'Rust'], correct: 1 },
//   { id: 'q4', question: 'HTML stands for', options: ['Hyper Trainer Markup Language', 'HyperText Markup Language', 'HyperText Markdown Language', 'Hyperlink Text Markup Language'], correct: 1 },
//   { id: 'q5', question: 'What is polymorphism in OOP?', options: ['Code reuse', 'Multiple forms', 'Data hiding', 'Inheritance only'], correct: 1 },
//   { id: 'q6', question: 'Which sorting algorithm is stable?', options: ['QuickSort', 'MergeSort', 'HeapSort', 'SelectionSort'], correct: 1 },
//   { id: 'q7', question: 'Which HTTP method is idempotent?', options: ['POST', 'GET', 'PATCH', 'CONNECT'], correct: 1 },
//   { id: 'q8', question: 'Which is a NoSQL database?', options: ['MySQL', 'Postgres', 'MongoDB', 'SQLite'], correct: 2 },
//   { id: 'q9', question: 'Which keyword creates a class in Java?', options: ['struct', 'class', 'def', 'object'], correct: 1 },
//   { id: 'q10', question: 'Which operator is used for exponentiation in Python?', options: ['^', '**', 'pow', '%'], correct: 1 },
// ];

// // Space background component (transparent canvas that draws blue glowing dots)
// function SpaceBackground({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const animationRef = useRef<number | null>(null);
//   const dotsRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number }[]>([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const container = containerRef?.current;
//     if (!canvas || !container) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     function resizeCanvas() {
//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;
//     }

//     resizeCanvas();

//     // initialize dots
//     const dots: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
//     for (let i = 0; i < 50; i++) {
//       dots.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.5,
//         vy: (Math.random() - 0.5) * 0.5,
//         size: Math.random() * 3 + 1,
//       });
//     }
//     dotsRef.current = dots;

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       for (const dot of dotsRef.current) {
//         dot.x += dot.vx;
//         dot.y += dot.vy;
//         if (dot.x < 0) dot.x = canvas.width;
//         if (dot.x > canvas.width) dot.x = 0;
//         if (dot.y < 0) dot.y = canvas.height;
//         if (dot.y > canvas.height) dot.y = 0;

//         const grad = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.size * 6);
//         grad.addColorStop(0, 'rgba(59,130,246,0.9)');
//         grad.addColorStop(0.4, 'rgba(59,130,246,0.35)');
//         grad.addColorStop(1, 'rgba(59,130,246,0)');

//         ctx.fillStyle = grad;
//         ctx.beginPath();
//         ctx.arc(dot.x, dot.y, dot.size * 6, 0, Math.PI * 2);
//         ctx.fill();

//         ctx.beginPath();
//         ctx.fillStyle = 'rgba(59,130,246,0.9)';
//         ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);
//     window.addEventListener('resize', resizeCanvas);

//     return () => {
//       if (animationRef.current) cancelAnimationFrame(animationRef.current);
//       window.removeEventListener('resize', resizeCanvas);
//     };
//   }, [containerRef]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 w-full h-full rounded-lg pointer-events-none"
//       style={{ zIndex: 0 }}
//     />
//   );
// }

// export default function ConceptMatch() {
//   const navigate = useNavigate();
//   const loc = useLocation();
//   const state: any = (loc && (loc.state as any)) || history.state || {};
//   const language = state?.language || 'JavaScript';

//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const questions = useMemo(() => {
//     const arr = [...sampleQuestions];
//     for (let i = arr.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr.slice(0, 10);
//   }, []);

//   const total = questions.length;
//   const [index, setIndex] = useState(0);
//   const [selected, setSelected] = useState<number | null>(null);
//   const [answers, setAnswers] = useState<{ qid: string; chosen: number | null; correct: number }[]>([]);

//   // timer and rocket progress
//   const duration = 30; // seconds per question
//   const [remaining, setRemaining] = useState(duration);
//   const rafRef = useRef<number | null>(null);
//   const startTsRef = useRef<number | null>(null);

//   useEffect(() => {
//     startQuestion();
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [index]);

//   function startQuestion() {
//     setSelected(null);
//     setRemaining(duration);
//     startTsRef.current = performance.now();
//     const tick = () => {
//       const now = performance.now();
//       const elapsed = ((now - (startTsRef.current || now)) / 1000);
//       const rem = Math.max(0, duration - elapsed);
//       setRemaining(rem);
//       if (rem <= 0) {
//         recordAnswer(null);
//       } else {
//         rafRef.current = requestAnimationFrame(tick);
//       }
//     };
//     if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     rafRef.current = requestAnimationFrame(tick);
//   }

//   function recordAnswer(chosen: number | null) {
//     if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
//     const q = questions[index];
//     const finalAnswers = [...answers, { qid: q.id, chosen, correct: q.correct }];

//     // move to next question or finish
//     setTimeout(() => {
//       if (index + 1 >= total) {
//         // finish and navigate to results
//         const correctCount = finalAnswers.filter((a) => a.chosen === a.correct).length;
//         const result = { total, correct: correctCount, answers: finalAnswers };
//         navigate('/tests/concept-match/result', { state: { ...result, language, questions } });
//       } else {
//         setAnswers(finalAnswers);
//         setIndex((i) => i + 1);
//       }
//     }, 400);
//   }

//   function choose(i: number) {
//     if (selected !== null) return; // already chosen
//     setSelected(i);
//     // Immediately record answer (will advance after short timeout)
//     setAnswers((prev) => [...prev, { qid: questions[index].id, chosen: i, correct: questions[index].correct }]);
//     recordAnswer(i);
//   }

//   const progress = remaining / duration;

//   return (
//     <div className="min-h-screen relative flex items-start justify-center p-6">
//       <div ref={containerRef} className="relative w-full max-w-6xl rounded-xl p-[2px]" style={{ background: 'linear-gradient(90deg,#7c3aed,#8b5cf6)' }}>
//         <div className="relative overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100" style={{ boxShadow: '0 6px 30px rgba(124,58,237,0.35), inset 0 0 30px rgba(124,58,237,0.06)' }}>

//           {/* Space dots inside this container */}
//           <SpaceBackground containerRef={containerRef} />

//           {/* Rocket Animation (centered) */}
//           <div className="absolute inset-0 pointer-events-none z-20 flex items-start justify-center">
//             <div style={{ marginTop: `${10 + (1 - progress) * 60}%`, transition: 'margin-top 0.15s linear' }}>
//               <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//                 <path d="M20 5 L30 45 L25 50 L20 45 L15 50 L10 45 L20 5 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1"/>
//                 <path d="M20 5 L25 20 L15 20 L20 5 Z" fill="#3b82f6"/>
//                 <circle cx="20" cy="15" r="3" fill="#1e40af"/>
//                 <path d="M10 45 L5 55 L10 50 Z" fill="#dc2626"/>
//                 <path d="M30 45 L35 55 L30 50 Z" fill="#dc2626"/>
//               </svg>
//             </div>
//           </div>

//           {/* Main question area */}
//           <div className="relative z-10 p-8">
//             <div className="max-w-4xl mx-auto">
//               <div className="mb-4">
//                 <div className="text-2xl font-semibold mb-2">{questions[index].question}</div>
//                 <div className="text-sm text-neutral-500 mb-4">Question {index + 1} / {total}</div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {questions[index].options.map((opt, i) => {
//                   const isSelected = selected === i;
//                   const isCorrect = i === questions[index].correct;
//                   const showResult = selected !== null;

//                   return (
//                     <button
//                       key={i}
//                       onClick={() => choose(i)}
//                       disabled={selected !== null}
//                       className={`text-left p-4 rounded-xl border-2 transition-all duration-300 font-medium flex items-start gap-3 h-28 ${showResult
//                         ? (isCorrect
//                           ? 'border-green-400 bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-300'
//                           : isSelected
//                             ? 'border-red-400 bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300'
//                             : 'border-neutral-200/50 bg-white/5 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300'
//                         )
//                         : 'border-neutral-200/20 bg-white/10 dark:bg-neutral-800 hover:bg-white/20 hover:dark:bg-neutral-700 cursor-pointer'
//                       }`}
//                     >
//                       <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-semibold text-sm">{String.fromCharCode(65 + i)}</div>
//                       <div className="flex-1 text-sm">{opt}</div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

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

// Space background component (transparent canvas that draws blue glowing dots)
function SpaceBackground({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const dotsRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number }[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef?.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resizeCanvas() {
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
    }

    resizeCanvas();

    // initialize dots
    const dots: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
    for (let i = 0; i < 50; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1,
      });
    }
    dotsRef.current = dots;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const dot of dotsRef.current) {
        dot.x += dot.vx;
        dot.y += dot.vy;
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        const grad = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.size * 6);
        grad.addColorStop(0, 'rgba(59,130,246,0.9)');
        grad.addColorStop(0.4, 'rgba(59,130,246,0.35)');
        grad.addColorStop(1, 'rgba(59,130,246,0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.fillStyle = 'rgba(59,130,246,0.9)';
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    window.addEventListener('resize', resizeCanvas);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [containerRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full rounded-lg pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}

export default function ConceptMatch() {
  const navigate = useNavigate();
  const loc = useLocation();
  const state: any = (loc && (loc.state as any)) || history.state || {};
  const language = state?.language || 'JavaScript';

  const containerRef = useRef<HTMLDivElement | null>(null);

  const questions = useMemo(() => {
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
    const finalAnswers = [...answers, { qid: q.id, chosen, correct: q.correct }];

    // move to next question or finish
    setTimeout(() => {
      if (index + 1 >= total) {
        // finish and navigate to results
        const correctCount = finalAnswers.filter((a) => a.chosen === a.correct).length;
        const result = { total, correct: correctCount, answers: finalAnswers };
        navigate('/tests/concept-match/result', { state: { ...result, language, questions } });
      } else {
        setAnswers(finalAnswers);
        setIndex((i) => i + 1);
      }
    }, 400);
  }

  function choose(i: number) {
    if (selected !== null) return; // already chosen
    setSelected(i);
    // Immediately record answer (will advance after short timeout)
    setAnswers((prev) => [...prev, { qid: questions[index].id, chosen: i, correct: questions[index].correct }]);
    recordAnswer(i);
  }

  const progress = remaining / duration;

  return (
    <div ref={containerRef} className="h-full min-h-[calc(100vh-3rem)] relative flex flex-col md:flex-row">
      {/* Space background covers entire container */}
      <SpaceBackground containerRef={containerRef} />

      {/* Two-column layout */}
      <div className="relative z-10 flex-1 flex flex-col md:flex-row">
        {/* Left column: rocket + space animation - takes full height */}
        <div className="w-full md:w-1/2 h-64 md:h-auto relative flex items-center justify-center bg-black/20">
          <div
            style={{
              marginTop: `${10 + (1 - progress) * 60}%`,
              transition: 'margin-top 0.15s linear',
            }}
          >
            <svg width="60" height="80" viewBox="0 0 60 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 5 L45 55 L35 65 L30 55 L25 65 L15 55 L30 5 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1" />
              <path d="M30 5 L35 25 L25 25 L30 5 Z" fill="#3b82f6" />
              <circle cx="30" cy="20" r="4" fill="#1e40af" />
              <path d="M15 55 L5 70 L15 65 Z" fill="#dc2626" />
              <path d="M45 55 L55 70 L45 65 Z" fill="#dc2626" />
            </svg>
          </div>
        </div>

        {/* Right column: question and options - stacked vertically */}
        <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col">
          <div className="flex-1">
            <div className="text-2xl font-semibold mb-2">{questions[index].question}</div>
            <div className="text-sm text-neutral-500 mb-6">Question {index + 1} / {total}</div>

            <div className="grid grid-cols-2 gap-4">
              {questions[index].options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === questions[index].correct;
                const showResult = selected !== null;

                return (
                  <button
                    key={i}
                    onClick={() => choose(i)}
                    disabled={selected !== null}
                    className={`text-left p-4 rounded-xl border-2 transition-all duration-300 font-medium flex items-start gap-3 min-h-20 ${showResult
                      ? (isCorrect
                        ? 'border-green-400 bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-300'
                        : isSelected
                          ? 'border-red-400 bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300'
                          : 'border-neutral-200/50 bg-white/5 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300'
                      )
                      : 'border-neutral-200/20 bg-white/10 dark:bg-neutral-800 hover:bg-white/20 hover:dark:bg-neutral-700 cursor-pointer'
                      }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-semibold text-sm">{String.fromCharCode(65 + i)}</div>
                    <div className="flex-1 text-sm">{opt}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Timer progress bar */}
          <div className="mt-6">
            <div className="w-full bg-neutral-200/20 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all duration-150"
                style={{ width: `${progress * 100}%` }}
              ></div>
            </div>
            <div className="text-xs text-neutral-500 mt-2 text-center">
              Time remaining: {Math.ceil(remaining)}s
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// import React, { useEffect, useMemo, useRef, useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';

// type Q = { id: string; question: string; options: string[]; correct: number };

// const sampleQuestions: Q[] = [
//   { id: 'q1', question: 'A data structure that follows FIFO order', options: ['Stack', 'Queue', 'Tree', 'Graph'], correct: 1 },
//   { id: 'q2', question: 'Technique to find shortest path in weighted graph', options: ['DFS', 'BFS', "Dijkstra's", 'Prim'], correct: 2 },
//   { id: 'q3', question: 'Language primarily used for statistical computing', options: ['Python', 'R', 'Go', 'Rust'], correct: 1 },
//   { id: 'q4', question: 'HTML stands for', options: ['Hyper Trainer Markup Language', 'HyperText Markup Language', 'HyperText Markdown Language', 'Hyperlink Text Markup Language'], correct: 1 },
//   { id: 'q5', question: 'What is polymorphism in OOP?', options: ['Code reuse', 'Multiple forms', 'Data hiding', 'Inheritance only'], correct: 1 },
//   { id: 'q6', question: 'Which sorting algorithm is stable?', options: ['QuickSort', 'MergeSort', 'HeapSort', 'SelectionSort'], correct: 1 },
//   { id: 'q7', question: 'Which HTTP method is idempotent?', options: ['POST', 'GET', 'PATCH', 'CONNECT'], correct: 1 },
//   { id: 'q8', question: 'Which is a NoSQL database?', options: ['MySQL', 'Postgres', 'MongoDB', 'SQLite'], correct: 2 },
//   { id: 'q9', question: 'Which keyword creates a class in Java?', options: ['struct', 'class', 'def', 'object'], correct: 1 },
//   { id: 'q10', question: 'Which operator is used for exponentiation in Python?', options: ['^', '**', 'pow', '%'], correct: 1 },
// ];

// // Space background component (transparent canvas that draws blue glowing dots)
// function SpaceBackground({ containerRef }: { containerRef: React.RefObject<HTMLElement> }) {
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const animationRef = useRef<number | null>(null);
//   const dotsRef = useRef<{ x: number; y: number; vx: number; vy: number; size: number }[]>([]);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     const container = containerRef?.current;
//     if (!canvas || !container) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     function resizeCanvas() {
//       canvas.width = container.clientWidth;
//       canvas.height = container.clientHeight;
//     }

//     resizeCanvas();

//     // initialize dots
//     const dots: { x: number; y: number; vx: number; vy: number; size: number }[] = [];
//     for (let i = 0; i < 50; i++) {
//       dots.push({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.5,
//         vy: (Math.random() - 0.5) * 0.5,
//         size: Math.random() * 3 + 1,
//       });
//     }
//     dotsRef.current = dots;

//     const animate = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);

//       for (const dot of dotsRef.current) {
//         dot.x += dot.vx;
//         dot.y += dot.vy;
//         if (dot.x < 0) dot.x = canvas.width;
//         if (dot.x > canvas.width) dot.x = 0;
//         if (dot.y < 0) dot.y = canvas.height;
//         if (dot.y > canvas.height) dot.y = 0;

//         const grad = ctx.createRadialGradient(dot.x, dot.y, 0, dot.x, dot.y, dot.size * 6);
//         grad.addColorStop(0, 'rgba(59,130,246,0.9)');
//         grad.addColorStop(0.4, 'rgba(59,130,246,0.35)');
//         grad.addColorStop(1, 'rgba(59,130,246,0)');

//         ctx.fillStyle = grad;
//         ctx.beginPath();
//         ctx.arc(dot.x, dot.y, dot.size * 6, 0, Math.PI * 2);
//         ctx.fill();

//         ctx.beginPath();
//         ctx.fillStyle = 'rgba(59,130,246,0.9)';
//         ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
//         ctx.fill();
//       }

//       animationRef.current = requestAnimationFrame(animate);
//     };

//     animationRef.current = requestAnimationFrame(animate);
//     window.addEventListener('resize', resizeCanvas);

//     return () => {
//       if (animationRef.current) cancelAnimationFrame(animationRef.current);
//       window.removeEventListener('resize', resizeCanvas);
//     };
//   }, [containerRef]);

//   return (
//     <canvas
//       ref={canvasRef}
//       className="absolute inset-0 w-full h-full rounded-lg pointer-events-none"
//       style={{ zIndex: 0 }}
//     />
//   );
// }

// export default function ConceptMatch() {
//   const navigate = useNavigate();
//   const loc = useLocation();
//   const state: any = (loc && (loc.state as any)) || history.state || {};
//   const language = state?.language || 'JavaScript';

//   const containerRef = useRef<HTMLDivElement | null>(null);

//   const questions = useMemo(() => {
//     const arr = [...sampleQuestions];
//     for (let i = arr.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [arr[i], arr[j]] = [arr[j], arr[i]];
//     }
//     return arr.slice(0, 10);
//   }, []);

//   const total = questions.length;
//   const [index, setIndex] = useState(0);
//   const [selected, setSelected] = useState<number | null>(null);
//   const [answers, setAnswers] = useState<{ qid: string; chosen: number | null; correct: number }[]>([]);

//   // timer and rocket progress
//   const duration = 30; // seconds per question
//   const [remaining, setRemaining] = useState(duration);
//   const rafRef = useRef<number | null>(null);
//   const startTsRef = useRef<number | null>(null);

//   useEffect(() => {
//     startQuestion();
//     return () => {
//       if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [index]);

//   function startQuestion() {
//     setSelected(null);
//     setRemaining(duration);
//     startTsRef.current = performance.now();
//     const tick = () => {
//       const now = performance.now();
//       const elapsed = ((now - (startTsRef.current || now)) / 1000);
//       const rem = Math.max(0, duration - elapsed);
//       setRemaining(rem);
//       if (rem <= 0) {
//         recordAnswer(null);
//       } else {
//         rafRef.current = requestAnimationFrame(tick);
//       }
//     };
//     if (rafRef.current) cancelAnimationFrame(rafRef.current);
//     rafRef.current = requestAnimationFrame(tick);
//   }

//   function recordAnswer(chosen: number | null) {
//     if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
//     const q = questions[index];
//     const finalAnswers = [...answers, { qid: q.id, chosen, correct: q.correct }];

//     // move to next question or finish
//     setTimeout(() => {
//       if (index + 1 >= total) {
//         // finish and navigate to results
//         const correctCount = finalAnswers.filter((a) => a.chosen === a.correct).length;
//         const result = { total, correct: correctCount, answers: finalAnswers };
//         navigate('/tests/concept-match/result', { state: { ...result, language, questions } });
//       } else {
//         setAnswers(finalAnswers);
//         setIndex((i) => i + 1);
//       }
//     }, 400);
//   }

//   function choose(i: number) {
//     if (selected !== null) return; // already chosen
//     setSelected(i);
//     // Immediately record answer (will advance after short timeout)
//     setAnswers((prev) => [...prev, { qid: questions[index].id, chosen: i, correct: questions[index].correct }]);
//     recordAnswer(i);
//   }

//   const progress = remaining / duration;

//   return (
//     <div className="min-h-screen relative flex items-start justify-center p-6">
//       <div ref={containerRef} className="relative w-full max-w-6xl rounded-xl p-[2px]" style={{ background: 'linear-gradient(90deg,#7c3aed,#8b5cf6)' }}>
//         <div className="relative overflow-hidden rounded-lg bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100" style={{ boxShadow: '0 6px 30px rgba(124,58,237,0.35), inset 0 0 30px rgba(124,58,237,0.06)' }}>

//           {/* Space dots inside this container */}
//           <SpaceBackground containerRef={containerRef} />

//           {/* Two-column layout */}
//           <div className="relative z-10 p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Left column: rocket + space animation */}
//             <div className="relative flex items-center justify-center">
//               <div
//                 style={{
//                   marginTop: `${10 + (1 - progress) * 60}%`,
//                   transition: 'margin-top 0.15s linear',
//                 }}
//               >
//                 <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
//                   <path d="M20 5 L30 45 L25 50 L20 45 L15 50 L10 45 L20 5 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1"/>
//                   <path d="M20 5 L25 20 L15 20 L20 5 Z" fill="#3b82f6"/>
//                   <circle cx="20" cy="15" r="3" fill="#1e40af"/>
//                   <path d="M10 45 L5 55 L10 50 Z" fill="#dc2626"/>
//                   <path d="M30 45 L35 55 L30 50 Z" fill="#dc2626"/>
//                 </svg>
//               </div>
//             </div>

//             {/* Right column: question and options */}
//             <div>
//               <div className="text-2xl font-semibold mb-2">{questions[index].question}</div>
//               <div className="text-sm text-neutral-500 mb-4">Question {index + 1} / {total}</div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//                 {questions[index].options.map((opt, i) => {
//                   const isSelected = selected === i;
//                   const isCorrect = i === questions[index].correct;
//                   const showResult = selected !== null;

//                   return (
//                     <button
//                       key={i}
//                       onClick={() => choose(i)}
//                       disabled={selected !== null}
//                       className={`text-left p-4 rounded-xl border-2 transition-all duration-300 font-medium flex items-start gap-3 h-28 ${showResult
//                         ? (isCorrect
//                           ? 'border-green-400 bg-green-50 dark:bg-green-900/10 text-green-800 dark:text-green-300'
//                           : isSelected
//                             ? 'border-red-400 bg-red-50 dark:bg-red-900/10 text-red-800 dark:text-red-300'
//                             : 'border-neutral-200/50 bg-white/5 dark:bg-neutral-800 text-neutral-900 dark:text-neutral-300'
//                         )
//                         : 'border-neutral-200/20 bg-white/10 dark:bg-neutral-800 hover:bg-white/20 hover:dark:bg-neutral-700 cursor-pointer'
//                       }`}
//                     >
//                       <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center font-semibold text-sm">{String.fromCharCode(65 + i)}</div>
//                       <div className="flex-1 text-sm">{opt}</div>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }
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

// export default function ConceptMatch() {
//   const navigate = useNavigate();
//   const loc = useLocation();
//   const state: any = (loc && (loc.state as any)) || (history.state || {});
//   const language = state?.language || 'JavaScript';

//   const questions = useMemo(() => {
//     // shuffle sampleQuestions and take 10
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
//   const [correctCount, setCorrectCount] = useState(0);
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
//         // time up for this question
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
//     const isCorrect = chosen === q.correct;
//     if (isCorrect) setCorrectCount((c) => c + 1);
//     setAnswers((a) => [...a, { qid: q.id, chosen, correct: q.correct }]);

//     // brief pause, then next question or finish
//     setTimeout(() => {
//       if (index + 1 >= total) {
//         // finish
//         const finalAnswers = answers.concat({ qid: q.id, chosen, correct: q.correct });
//         const result = { total, correct: isCorrect ? correctCount + 1 : correctCount, answers: finalAnswers };
//         navigate('/tests/concept-match/result', { state: { ...result, language, questions } });
//       } else {
//         setIndex((i) => i + 1);
//       }
//     }, 700);
//   }

//   function choose(i: number) {
//     if (selected !== null) return; // already chosen
//     setSelected(i);
//     recordAnswer(i);
//   }

//   const progress = remaining / duration; // 1 to 0

//   return (
//     <div className="w-full max-w-4xl">
//       <div className="mb-4 flex items-center justify-between">
//         <h2 className="text-2xl font-bold">Concept Match — {language}</h2>
//         <div className="text-sm text-neutral-500">Question {index + 1} / {total}</div>
//       </div>

//       <div className="relative h-40 bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 rounded-lg overflow-hidden mb-6">
//         {/* rocket background animation: rocket moves up as progress decreases (start at bottom when progress=1) */}
//         <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0" style={{ pointerEvents: 'none' }}>
//           <div style={{ transform: `translateY(${(1 - progress) * -140}px)`, transition: 'transform 0.2s linear' }}>
//             <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//               <path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7l3-7z" fill="#7c3aed" />
//             </svg>
//           </div>
//         </div>
//       </div>

//       <div className="p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900">
//         <div className="text-lg font-semibold">{questions[index].question}</div>

//         <div className="mt-4 grid gap-3">
//           {questions[index].options.map((opt, i) => {
//             const isSelected = selected === i;
//             return (
//               <button key={i} onClick={() => choose(i)} className={`text-left p-3 rounded-md border ${isSelected ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'border-transparent bg-white/0 hover:bg-white/5'} transition`}>{opt}</button>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useMemo, useRef, useState } from 'react';

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

// Space background component
function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const dotsRef = useRef<Array<{x: number, y: number, vx: number, vy: number, size: number}>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize dots
    const dots = [];
    for (let i = 0; i < 50; i++) {
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1
      });
    }
    dotsRef.current = dots;

    const animate = () => {
      ctx.fillStyle = 'rgba(10, 10, 30, 1)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw stars/dots
      dotsRef.current.forEach(dot => {
        dot.x += dot.vx;
        dot.y += dot.vy;

        // Wrap around edges
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;

        // Draw dot with blue glow
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, 0.8)`;
        ctx.fill();
        
        // Add glow effect
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59, 130, 246, 0.2)`;
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full"
      style={{ zIndex: -1 }}
    />
  );
}

export default function ConceptMatch() {
  const language = 'JavaScript'; // Default language

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
  const [gameOver, setGameOver] = useState(false);

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
        setGameOver(true);
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

  function resetGame() {
    setIndex(0);
    setSelected(null);
    setCorrectCount(0);
    setAnswers([]);
    setGameOver(false);
  }

  const progress = remaining / duration; // 1 to 0

  if (gameOver) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <SpaceBackground />
        <div className="relative z-10 max-w-2xl mx-auto p-8">
          <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-center">
              <h2 className="text-4xl font-bold text-white mb-4">Quiz Complete! 🚀</h2>
              <div className="text-6xl font-bold text-blue-400 mb-4">
                {correctCount}/{total}
              </div>
              <p className="text-xl text-gray-300 mb-6">
                {correctCount >= total * 0.8 ? 'Excellent work!' : 
                 correctCount >= total * 0.6 ? 'Good job!' : 
                 'Keep practicing!'}
              </p>
              <button
                onClick={resetGame}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
              >
                Play Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <SpaceBackground />
      
      {/* Rocket Animation */}
      <div className="fixed inset-0 pointer-events-none z-5">
        <div className="relative w-full h-full">
          <div 
            className="absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ease-linear"
            style={{ 
              bottom: `${progress * 80 + 10}%`, // Start at 10% from bottom, go to 90%
              transform: `translateX(-50%) ${progress < 0.1 ? 'rotate(180deg)' : 'rotate(0deg)'}` // Flip when falling
            }}
          >
            <div className="relative">
              {/* Rocket body */}
              <svg width="40" height="60" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Main rocket body */}
                <path d="M20 5 L30 45 L25 50 L20 45 L15 50 L10 45 L20 5 Z" fill="#e5e7eb" stroke="#9ca3af" strokeWidth="1"/>
                {/* Nose cone */}
                <path d="M20 5 L25 20 L15 20 L20 5 Z" fill="#3b82f6"/>
                {/* Window */}
                <circle cx="20" cy="15" r="3" fill="#1e40af"/>
                {/* Fins */}
                <path d="M10 45 L5 55 L10 50 Z" fill="#dc2626"/>
                <path d="M30 45 L35 55 L30 50 Z" fill="#dc2626"/>
                {/* Flame effect when going up */}
                {progress > 0.1 && (
                  <>
                    <path d="M15 50 L20 58 L25 50 Z" fill="#f59e0b"/>
                    <path d="M17 50 L20 55 L23 50 Z" fill="#ef4444"/>
                  </>
                )}
              </svg>
              
              {/* Exhaust trail when rocket is moving up */}
              {progress > 0.1 && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-b from-orange-400 to-transparent rounded-full opacity-60"
                      style={{
                        height: `${(i + 1) * 8}px`,
                        marginTop: `${i * 2}px`,
                        marginLeft: `${Math.sin(Date.now() / 1000 + i) * 2}px`
                      }}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/10">
              <h2 className="text-3xl font-bold text-white mb-2">Concept Match — {language}</h2>
              <div className="text-blue-300">Question {index + 1} / {total}</div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-black/70 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
            <div className="text-2xl font-semibold text-white mb-6">
              {questions[index].question}
            </div>

            <div className="grid gap-4">
              {questions[index].options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === questions[index].correct;
                const showResult = selected !== null;
                
                return (
                  <button 
                    key={i} 
                    onClick={() => choose(i)} 
                    disabled={selected !== null}
                    className={`
                      text-left p-4 rounded-xl border-2 transition-all duration-300 font-medium
                      ${showResult 
                        ? (isCorrect 
                          ? 'border-green-400 bg-green-400/20 text-green-200' 
                          : isSelected 
                            ? 'border-red-400 bg-red-400/20 text-red-200'
                            : 'border-white/20 bg-white/5 text-gray-400'
                        )
                        : 'border-white/20 bg-white/10 text-white hover:bg-white/20 hover:border-blue-400 cursor-pointer'
                      }
                      ${selected !== null ? 'cursor-not-allowed' : ''}
                    `}
                  >
                    <span className="inline-block w-8 h-8 rounded-full bg-white/20 text-center leading-8 mr-3 text-sm">
                      {String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
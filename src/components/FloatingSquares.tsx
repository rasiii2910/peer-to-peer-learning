import React from 'react';

export default function FloatingSquares() {
  const squares = Array.from({ length: 12 });

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {squares.map((_, i) => {
        const size = Math.floor(Math.random() * 40) + 20; // px
        const left = Math.random() * 100; // percent
        const delay = Math.random() * 5; // s
        const duration = Math.random() * 10 + 10; // 10s–20s

        return (
          <div
            key={i}
            className="absolute bg-purple-300/30 rounded-sm animate-float"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              bottom: `-${size}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}

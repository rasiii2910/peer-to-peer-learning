// FloatingSquares.jsx
export default function FloatingSquares() {
  const squares = Array.from({ length: 12 });

  return (
    <div className="w-full h-full pointer-events-none relative">
      {squares.map((_, i) => {
        const size = Math.floor(Math.random() * 40) + 20; // 20–60px
        const left = Math.random() * 100;
        const delay = Math.random() * 5;
        const duration = Math.random() * 10 + 10;

        return (
          <div
            key={i}
            className="absolute bg-purple-300/30 rounded-sm animate-float will-change-transform"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
              bottom: `-60px`, // start below view
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          />
        );
      })}
    </div>
  );
}

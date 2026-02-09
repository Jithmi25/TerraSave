import { useState, useEffect } from 'react';

interface GameLevel1Props {
  onLevelComplete: () => void;
}

type Plant = '🌱' | '🌿' | '🍀' | '🌾' | '🌳' | null;

const PLANTS: Plant[] = ['🌱', '🌿', '🍀', '🌾', '🌳'];
const GRID_SIZE = 6;
const TARGET_SCORE = 500;
const MAX_MOVES = 25;
const TIME_LIMIT = 120;

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export function GameLevel1({ onLevelComplete }: GameLevel1Props) {
  const [grid, setGrid] = useState<Plant[][]>([]);
  const [selectedCell, setSelectedCell] = useState<[number, number] | null>(null);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(MAX_MOVES);
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [timeUp, setTimeUp] = useState(false);
  const [isQuiet, setIsQuiet] = useState(false);

  // Initialize grid
  useEffect(() => {
    const newGrid = Array(GRID_SIZE)
      .fill(null)
      .map(() =>
        Array(GRID_SIZE)
          .fill(null)
          .map(() => PLANTS[Math.floor(Math.random() * PLANTS.length)])
      );
    setGrid(newGrid);
  }, []);

  useEffect(() => {
    if (gameOver || won || timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((t) => Math.max(t - 1, 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [gameOver, won, timeLeft]);

  // Check for matches
  const findMatches = (currentGrid: Plant[][]): Set<string> => {
    const matches = new Set<string>();

    // Check horizontal
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE - 2; col++) {
        if (
          currentGrid[row][col] &&
          currentGrid[row][col] === currentGrid[row][col + 1] &&
          currentGrid[row][col] === currentGrid[row][col + 2]
        ) {
          matches.add(`${row},${col}`);
          matches.add(`${row},${col + 1}`);
          matches.add(`${row},${col + 2}`);
        }
      }
    }

    // Check vertical
    for (let col = 0; col < GRID_SIZE; col++) {
      for (let row = 0; row < GRID_SIZE - 2; row++) {
        if (
          currentGrid[row][col] &&
          currentGrid[row][col] === currentGrid[row + 1][col] &&
          currentGrid[row][col] === currentGrid[row + 2][col]
        ) {
          matches.add(`${row},${col}`);
          matches.add(`${row + 1},${col}`);
          matches.add(`${row + 2},${col}`);
        }
      }
    }

    return matches;
  };

  // Remove matches and cascade
  const processMatches = async (currentGrid: Plant[][]) => {
    let matches = findMatches(currentGrid);

    while (matches.size > 0) {
      // Remove matched plants
      const newGrid = currentGrid.map((row) => [...row]);
      let matchCount = 0;

      matches.forEach((match) => {
        const [row, col] = match.split(',').map(Number);
        newGrid[row][col] = null;
        matchCount++;
      });

      setScore((s) => s + matchCount * 10);

      // Cascade
      for (let col = 0; col < GRID_SIZE; col++) {
        const column = newGrid.map((row) => row[col]);
        const plants = column.filter((p) => p !== null);
        const nullCount = column.length - plants.length;
        newGrid.forEach((row, rowIndex) => {
          row[col] = rowIndex < nullCount ? null : plants[rowIndex - nullCount];
        });
      }

      // Fill empty spaces with new plants
      for (let row = 0; row < GRID_SIZE; row++) {
        for (let col = 0; col < GRID_SIZE; col++) {
          if (newGrid[row][col] === null) {
            newGrid[row][col] = PLANTS[Math.floor(Math.random() * PLANTS.length)];
          }
        }
      }

      setGrid(newGrid);
      currentGrid = newGrid;
      matches = findMatches(currentGrid);

      await new Promise((resolve) => setTimeout(resolve, 300));
    }
  };

  const handleCellClick = async (row: number, col: number) => {
    if (moves === 0 || gameOver || won || timeLeft === 0) return;

    if (!selectedCell) {
      setSelectedCell([row, col]);
      return;
    }

    const [selectedRow, selectedCol] = selectedCell;

    // Check if adjacent
    const isAdjacent =
      (Math.abs(selectedRow - row) === 1 && selectedCol === col) ||
      (Math.abs(selectedCol - col) === 1 && selectedRow === row);

    if (!isAdjacent) {
      setSelectedCell([row, col]);
      return;
    }

    // Swap
    const newGrid = grid.map((r) => [...r]);
    [newGrid[selectedRow][selectedCol], newGrid[row][col]] = [
      newGrid[row][col],
      newGrid[selectedRow][selectedCol],
    ];

    const matches = findMatches(newGrid);

    if (matches.size > 0) {
      setGrid(newGrid);
      setMoves(moves - 1);
      setSelectedCell(null);
      await processMatches(newGrid);

      if (score + matches.size * 10 >= TARGET_SCORE) {
        setWon(true);
      }
    } else {
      // Swap back if no match
      setSelectedCell(null);
    }
  };

  useEffect(() => {
    if (moves === 0 && score < TARGET_SCORE) {
      setGameOver(true);
    }
  }, [moves, score]);

  useEffect(() => {
    if (timeLeft === 0 && !won) {
      setGameOver(true);
      setTimeUp(true);
    }
  }, [timeLeft, won]);

  if (gameOver || won) {
    const passed = score >= TARGET_SCORE;

    return (
      <div className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/image/bg.jpg"
            alt="Background"
            className="absolute inset-0 w-full h-full object-cover brightness-75"
          />
        </div>
        <div className="absolute inset-0 opacity-20">
          <img
            src="/image/1.png"
            alt="Pattern"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 max-w-md w-full text-center">
            {timeUp ? (
              <img src="/image/win.png" alt="Time Up" className="w-28 h-28 mx-auto mb-4" />
            ) : (
              <div className="text-6xl mb-4">{passed ? '🎉' : '🌱'}</div>
            )}
            <h2 className="text-3xl font-bold text-white mb-4">
              {passed ? 'Level Complete!' : timeUp ? "Time's Up!" : 'Keep Trying!'}
            </h2>
            <p className="text-white/90 mb-2">
              Final Score: <span className="text-emerald-400 font-bold">{score}</span>
            </p>
            <p className="text-white/80 mb-6 text-sm">
              Target: {TARGET_SCORE} | Moves Used: {MAX_MOVES - moves} | Time Left: {formatTime(timeLeft)}
            </p>
            {!passed && !timeUp && (
              <p className="text-white/80 mb-6 text-sm">
                You need {TARGET_SCORE - score} more points. Try again!
              </p>
            )}
            {timeUp && !passed && (
              <p className="text-white/80 mb-6 text-sm">
                Time is over. Try again and match faster to reach the target!
              </p>
            )}
            <button
              onClick={onLevelComplete}
              className={`w-full px-6 py-3 rounded-full font-bold transition-all ${
                passed
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white'
                  : 'bg-amber-500 hover:bg-amber-600 text-white'
              }`}
            >
              {passed ? 'Continue to Next Level' : 'Try Again'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/image/bg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
      </div>
      <div className="absolute inset-0 opacity-20">
        <img
          src="/image/1.png"
          alt="Pattern"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 min-h-screen px-4 py-10">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white drop-shadow-lg mb-2">Plant Match Puzzle</h1>
            <p className="text-white/80">Level 1: Plant Alignment Challenge</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => setIsQuiet((q) => !q)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                  isQuiet
                    ? 'bg-emerald-500/30 border-emerald-400 text-emerald-100'
                    : 'bg-white/10 border-white/30 text-white/80 hover:bg-white/20'
                }`}
              >
                {isQuiet ? 'Quiet Mode: On' : 'Quiet Mode: Off'}
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/30 text-center">
              <p className="text-white/80 text-sm mb-1">Score</p>
              <p className="text-2xl font-bold text-emerald-400">{score}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/30 text-center">
              <p className="text-white/80 text-sm mb-1">Moves Left</p>
              <p className="text-2xl font-bold text-amber-400">{moves}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/30 text-center">
              <p className="text-white/80 text-sm mb-1">Time</p>
              <p className="text-2xl font-bold text-white">{formatTime(timeLeft)}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/30 text-center">
              <p className="text-white/80 text-sm mb-1">Target</p>
              <p className="text-2xl font-bold text-white">{TARGET_SCORE}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-full p-2 mb-6 border border-white/30">
            <div
              className="h-2 bg-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((score / TARGET_SCORE) * 100, 100)}%` }}
            />
          </div>

          {/* Game Grid */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/30 mb-6">
            <div className="grid grid-cols-6 gap-2">
              {grid.map((row, rowIndex) =>
                row.map((plant, colIndex) => {
                  const isSelected =
                    selectedCell && selectedCell[0] === rowIndex && selectedCell[1] === colIndex;

                  return (
                    <button
                      key={`${rowIndex}-${colIndex}`}
                      onClick={() => handleCellClick(rowIndex, colIndex)}
                      className={`aspect-square rounded-lg text-3xl transition-all border-2 ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-500/40 scale-110'
                          : 'border-white/20 bg-white/10 hover:bg-white/20'
                      }`}
                    >
                      {plant}
                    </button>
                  );
                })
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/30">
            <p className="text-white/90 text-sm text-center">
              Swap adjacent plants to match three or more in a row to score points
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


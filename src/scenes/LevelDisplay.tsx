import { useState } from 'react';
import { GameLevel1 } from './GameLevel1';

interface LevelDisplayProps {
  selectedTree: string;
  landId: string;
  onBack: () => void;
}

export function LevelDisplay({ selectedTree, landId, onBack }: LevelDisplayProps) {
  const [completedLevels, setCompletedLevels] = useState<number[]>([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playingLevel, setPlayingLevel] = useState<number | null>(null);
  const totalLevels = 20;

  const handleLevelClick = (level: number) => {
    if (level === currentLevel && !completedLevels.includes(level)) {
      setPlayingLevel(level);
    }
  };

  const isAllLevelsComplete = completedLevels.length === totalLevels;

  if (playingLevel === 1) {
    return (
      <GameLevel1
        onLevelComplete={() => {
          setCompletedLevels([...completedLevels, 1]);
          if (1 < totalLevels) {
            setCurrentLevel(2);
          }
          setPlayingLevel(null);
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
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
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Level Journey</h1>
              <p className="text-white/90 mt-2">
                Complete all {totalLevels} levels to grow your tree
              </p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition"
            >
              Back
            </button>
          </div>

          {/* Progress Bar */}
          <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/30 mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-white text-lg font-semibold">
                Progress: {completedLevels.length} / {totalLevels}
              </span>
              <span className="text-white/80 text-sm">
                {Math.round((completedLevels.length / totalLevels) * 100)}%
              </span>
            </div>
            <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 transition-all duration-500"
                style={{ width: `${(completedLevels.length / totalLevels) * 100}%` }}
              />
            </div>
          </div>

          {/* Success Message */}
          {isAllLevelsComplete && (
            <div className="bg-emerald-500/20 backdrop-blur-md rounded-3xl p-8 border-2 border-emerald-400 mb-8 animate-pulse">
              <div className="text-center">
                <div className="text-6xl mb-4">🌳</div>
                <h2 className="text-3xl font-bold text-white mb-3">Congratulations!</h2>
                <p className="text-xl text-white/90 mb-4">
                  Your tree is officially part of the TerraSave forest.
                </p>
                <p className="text-white/80">
                  We will plant a real tree in your honor. Check the contribute section for details.
                </p>
              </div>
            </div>
          )}

          {/* Tree Growing Visual */}
          <div className="grid lg:grid-cols-[1fr_2fr] gap-8 mb-8">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/30">
              <h3 className="text-white text-xl font-semibold mb-4">Your Tree Growth</h3>
              <div className="flex flex-col items-center">
                <div className="relative w-full h-64 flex items-center justify-center">
                  <img
                    src={selectedTree}
                    alt="Growing Tree"
                    className={`object-contain transition-all duration-700 ${
                      completedLevels.length < 5
                        ? 'w-20 opacity-50'
                        : completedLevels.length < 10
                        ? 'w-32 opacity-60'
                        : completedLevels.length < 15
                        ? 'w-48 opacity-80'
                        : 'w-64 opacity-100'
                    }`}
                  />
                </div>
                <p className="text-white/90 mt-4 text-center">
                  Tree Growth: {Math.round((completedLevels.length / totalLevels) * 100)}%
                </p>
              </div>
            </div>

            {/* Level Grid */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/30">
              <h3 className="text-white text-xl font-semibold mb-4">Levels</h3>
              <div className="grid grid-cols-5 gap-3">
                {Array.from({ length: totalLevels }, (_, i) => i + 1).map((level) => {
                  const isCompleted = completedLevels.includes(level);
                  const isCurrent = level === currentLevel;
                  const isLocked = level > currentLevel;

                  return (
                    <button
                      key={level}
                      onClick={() => handleLevelClick(level)}
                      disabled={isLocked || isCompleted}
                      className={`aspect-square rounded-xl font-bold text-lg transition-all ${
                        isCompleted
                          ? 'bg-emerald-500 text-white shadow-lg'
                          : isCurrent
                          ? 'bg-amber-500 text-white animate-pulse shadow-lg'
                          : 'bg-white/20 text-white/50 cursor-not-allowed'
                      } ${!isLocked && !isCompleted ? 'hover:scale-110' : ''}`}
                    >
                      {isCompleted ? '✓' : level}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

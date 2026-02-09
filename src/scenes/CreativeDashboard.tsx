import { useState } from 'react';
import { useAuth } from '../components/AuthContext';
import type { CharacterChoice } from './CharacterSelect';

interface CreativeDashboardProps {
  character: CharacterChoice;
  onOpenProfile: () => void;
  onContinueJourney: (treeImage: string) => void;
}

const treeOptions = [
  { id: 'tree1', name: 'Emerald Pine', image: '/image/tree1.png' },
  { id: 'tree2', name: 'Sunrise Oak', image: '/image/tree2.png' },
  { id: 'tree3', name: 'Skyline Maple', image: '/image/tree3.png' },
];

export function CreativeDashboard({ character, onOpenProfile, onContinueJourney }: CreativeDashboardProps) {
  const { user } = useAuth();
  const [selectedTree, setSelectedTree] = useState(treeOptions[0].id);
  const characterImage = character === 'boy' ? '/image/mascot_boy.png' : '/image/mascot_girl.png';

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

      <div className="relative z-10 min-h-screen px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Creative Dashboard</h1>
              <p className="text-white/90 mt-2">
                Welcome, {user?.email || 'Explorer'} — your journey starts here.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={onOpenProfile}
                className="px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition"
              >
                Profile
              </button>
              <button className="px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition">
                Settings
              </button>
            </div>
          </div>

          {/* Guide + Content */}
          <div className="grid lg:grid-cols-[1.1fr_1.9fr] gap-8">
            {/* Character Guide */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/30">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-full bg-emerald-500/80 flex items-center justify-center text-white font-bold">
                  G
                </div>
                <div>
                  <h2 className="text-white text-xl font-semibold">Your Guide</h2>
                  <p className="text-white/80 text-sm">Follow the steps to begin</p>
                </div>
              </div>

              <div className="flex flex-col items-center">
                <img
                  src={characterImage}
                  alt="Guide"
                  className="w-64 md:w-72 drop-shadow-2xl animate-bounce"
                />
                <div className="mt-6 text-center text-white/90">
                  <p className="text-lg font-medium">"Pick a tree to start your forest!"</p>
                </div>
              </div>
            </div>

            {/* Tree Selection */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/30">
              <h2 className="text-white text-2xl font-semibold mb-4">Select Your First Tree</h2>
              <p className="text-white/80 mb-6">
                Choose one of the three trees to plant in your virtual forest.
              </p>

              <div className="grid sm:grid-cols-3 gap-4">
                {treeOptions.map((tree) => {
                  const isActive = selectedTree === tree.id;
                  return (
                    <button
                      key={tree.id}
                      onClick={() => setSelectedTree(tree.id)}
                      className={`rounded-2xl p-4 border-2 transition-all ${
                        isActive
                          ? 'border-emerald-400 bg-emerald-500/20 shadow-lg shadow-emerald-500/40'
                          : 'border-white/20 bg-white/5 hover:bg-white/10'
                      }`}
                    >
                      <img src={tree.image} alt={tree.name} className="w-full h-32 object-contain" />
                      <p className="text-white mt-3 font-medium text-center">{tree.name}</p>
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-white/90">
                  <p className="text-sm">Selected Tree</p>
                  <p className="text-lg font-semibold">
                    {treeOptions.find((t) => t.id === selectedTree)?.name}
                  </p>
                </div>
                <button
                  onClick={() => {
                    const treeImage = treeOptions.find((t) => t.id === selectedTree)?.image || '';
                    onContinueJourney(treeImage);
                  }}
                  className="px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition shadow-lg shadow-emerald-500/40"
                >
                  Continue Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

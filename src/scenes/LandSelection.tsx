import { useState } from 'react';
import { type CharacterChoice } from './CharacterSelect';

interface LandSelectionProps {
  selectedTree: string;
  selectedCharacter: CharacterChoice;
  onSelectLand: (landId: string) => void;
  onBack: () => void;
}

const projects = [
  {
    id: 'land1',
    name: 'Plant-for-the-Planet',
    subtitle: 'Trillion Tree Campaign',
    description: 'Join the global movement to plant one trillion trees worldwide',
    color: 'emerald',
  },
  {
    id: 'land2',
    name: 'One Tree Planted',
    subtitle: 'Global Reforestation Projects',
    description: 'Support reforestation efforts across the globe',
    color: 'amber',
  },
  {
    id: 'land3',
    name: "Let's Plant",
    subtitle: 'Ethiopia',
    description: 'Help restore the forests of Ethiopia and combat deforestation',
    color: 'blue',
  },
];

export function LandSelection({ selectedTree, selectedCharacter, onSelectLand, onBack }: LandSelectionProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const mascotGif = selectedCharacter === 'girl' ? '/image/mscot girl.gif' : '/image/mascot boy.gif';

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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Select Your Contribution Project</h1>
              <p className="text-white/90 mt-2">Choose a project where your tree will make a real impact</p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition"
            >
              Back
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {projects.map((project) => {
              const isActive = selectedProject === project.id;
              return (
                <button
                  key={project.id}
                  onClick={() => setSelectedProject(project.id)}
                  className={`rounded-3xl p-6 border-2 transition-all ${
                    isActive
                      ? 'border-emerald-400 bg-emerald-500/20 shadow-2xl shadow-emerald-500/40 scale-105'
                      : 'border-white/20 bg-white/10 hover:bg-white/15'
                  }`}
                >
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center text-4xl">
                      🌳
                    </div>
                    <h3 className="text-white text-xl font-bold mb-1">{project.name}</h3>
                    <p className="text-white/80 text-xs mb-2">{project.subtitle}</p>
                    <p className="text-white/80 text-sm">{project.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex justify-center">
            <button
              onClick={() => selectedProject && onSelectLand(selectedProject)}
              disabled={!selectedProject}
              className={`px-8 py-4 rounded-full text-lg font-bold transition-all ${
                selectedProject
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg shadow-emerald-500/40'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              {selectedProject ? 'Select Project' : 'Choose a Project'}
            </button>
          </div>
        </div>
      </div>

      {/* Mascot GIF at bottom */}
      <div className="fixed bottom-4 right-4 z-20">
        <img
          src={mascotGif}
          alt="Mascot"
          className="w-32 h-32 object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}

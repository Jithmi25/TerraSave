import { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useAuth } from '../components/AuthContext';

export type CharacterChoice = 'boy' | 'girl';

interface CharacterSelectProps {
  onPlay: (character: CharacterChoice) => void;
}
export function CharacterSelect({ onPlay }: CharacterSelectProps) {
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterChoice | null>(null);
  const mountRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    camera.position.z = 5;

    // Floating animation
    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      
      // Add subtle floating effect to camera
      camera.position.y = Math.sin(time) * 0.1;
      
      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const handlePlay = () => {
    if (selectedCharacter) {
      onPlay(selectedCharacter);
    }
  };

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
      
      {/* Overlay pattern */}
      <div className="absolute inset-0 opacity-20">
        <img 
          src="/image/1.png" 
          alt="Pattern"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {/* Three.js canvas */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* UI Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-4">
        <div className="max-w-6xl w-full">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
              Choose Your Character
            </h1>
            <p className="text-xl text-white/90 drop-shadow-md">
              Welcome, {user?.email}! Select your forest guardian
            </p>
          </div>

          {/* Character Selection */}
          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-2xl mx-auto">
            {/* Boy Character */}
            <button
              onClick={() => setSelectedCharacter('boy')}
              className={`relative group transition-all duration-300 transform hover:scale-105 ${
                selectedCharacter === 'boy' ? 'scale-105' : ''
              }`}
            >
              <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 border-4 transition-all ${
                selectedCharacter === 'boy' 
                  ? 'border-emerald-400 shadow-2xl shadow-emerald-500/50' 
                  : 'border-white/30 hover:border-white/50'
              }`}>
                <div className="relative">
                  <img
                    src="/image/mascot_boy.png"
                    alt="Boy Character"
                    className="w-full h-auto drop-shadow-2xl"
                  />
                  {selectedCharacter === 'boy' && (
                    <div className="absolute -top-4 -right-4 bg-emerald-500 rounded-full p-3">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mt-3 drop-shadow-lg">
                  Forest Guardian Boy
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  Brave and adventurous explorer
                </p>
              </div>
            </button>

            {/* Girl Character */}
            <button
              onClick={() => setSelectedCharacter('girl')}
              className={`relative group transition-all duration-300 transform hover:scale-105 ${
                selectedCharacter === 'girl' ? 'scale-105' : ''
              }`}
            >
              <div className={`bg-white/10 backdrop-blur-md rounded-2xl p-4 border-4 transition-all ${
                selectedCharacter === 'girl' 
                  ? 'border-emerald-400 shadow-2xl shadow-emerald-500/50' 
                  : 'border-white/30 hover:border-white/50'
              }`}>
                <div className="relative">
                  <img
                    src="/image/mascot_girl.png"
                    alt="Girl Character"
                    className="w-full h-auto drop-shadow-2xl"
                  />
                  {selectedCharacter === 'girl' && (
                    <div className="absolute -top-4 -right-4 bg-emerald-500 rounded-full p-3">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-white mt-3 drop-shadow-lg">
                  Forest Guardian Girl
                </h3>
                <p className="text-white/80 text-sm mt-1">
                  Wise and nature-loving protector
                </p>
              </div>
            </button>
          </div>

          {/* Play Button */}
          <div className="flex justify-center">
            <button
              onClick={handlePlay}
              disabled={!selectedCharacter}
              className={`px-12 py-4 rounded-full text-xl font-bold transition-all duration-300 transform ${
                selectedCharacter
                  ? 'bg-emerald-500 hover:bg-emerald-600 text-white hover:scale-110 shadow-2xl hover:shadow-emerald-500/50'
                  : 'bg-gray-400 text-gray-200 cursor-not-allowed'
              }`}
            >
              <span className="flex items-center gap-3">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                {selectedCharacter ? 'Start Your Journey' : 'Select a Character'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

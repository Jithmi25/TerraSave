import { Leaf, Trophy, Users, Globe, ArrowRight } from 'lucide-react';

interface HomePageProps {
  onSignIn: () => void;
  onSignUp: () => void;
}

export function HomePage({ onSignIn, onSignUp }: HomePageProps) {
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

      {/* Header */}
      <nav className="relative z-10 px-6 py-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <img
              src="/image/mscot girl.gif"
              alt="Mascot Girl"
              className="w-20 h-20 object-contain"
            />
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={onSignIn}
              className="px-6 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition font-semibold"
            >
              Sign In
            </button>
            <button
              onClick={onSignUp}
              className="px-6 py-2 rounded-full bg-emerald-500 text-white hover:bg-emerald-600 transition font-semibold shadow-lg shadow-emerald-500/40"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <img
              src="/image/logo.png"
              alt="TerraSave Logo"
              className="w-68 h-60 object-contain mx-auto mb-3"
            />
            <h2 className="text-6xl font-bold text-white mb-6 drop-shadow-2xl">
              Play Games, Plant Real Trees
            </h2>
            <p className="text-2xl text-white/90 mb-8 drop-shadow-lg max-w-3xl mx-auto">
              Join the global movement to combat climate change through gaming. Every level you complete helps plant real trees around the world.
            </p>
            <button
              onClick={onSignUp}
              className="px-10 py-4 rounded-full bg-emerald-500 text-white text-xl font-bold hover:bg-emerald-600 transition shadow-2xl shadow-emerald-500/50 hover:scale-105 transform flex items-center gap-3 mx-auto"
            >
              Start Your Journey
              <ArrowRight className="w-6 h-6" />
            </button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 text-center hover:bg-white/15 transition">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Trophy className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Play & Learn</h3>
              <p className="text-white/80 text-lg">
                Enjoy engaging puzzle games while learning about environmental conservation and sustainability.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 text-center hover:bg-white/15 transition">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Leaf className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Real Impact</h3>
              <p className="text-white/80 text-lg">
                Your gameplay directly contributes to planting real trees through our NGO partnerships worldwide.
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/30 text-center hover:bg-white/15 transition">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-emerald-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">Join Community</h3>
              <p className="text-white/80 text-lg">
                Connect with thousands of eco-warriors worldwide making a difference one game at a time.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-6 mb-20">
            <div className="bg-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-400/30 text-center">
              <p className="text-5xl font-bold text-emerald-400 mb-2">50K+</p>
              <p className="text-white/90 text-lg">Trees Planted</p>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-400/30 text-center">
              <p className="text-5xl font-bold text-emerald-400 mb-2">10K+</p>
              <p className="text-white/90 text-lg">Active Players</p>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-400/30 text-center">
              <p className="text-5xl font-bold text-emerald-400 mb-2">25+</p>
              <p className="text-white/90 text-lg">Countries</p>
            </div>
            <div className="bg-emerald-500/20 backdrop-blur-md rounded-2xl p-6 border border-emerald-400/30 text-center">
              <p className="text-5xl font-bold text-emerald-400 mb-2">15+</p>
              <p className="text-white/90 text-lg">NGO Partners</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-8 border-t border-white/20">
        <div className="max-w-7xl mx-auto text-center text-white/70">
          <p>© 2026 TerraSave. Making the world greener, one game at a time.</p>
        </div>
      </footer>

      {/* Mascots at bottom */}
      <div className="fixed bottom-4 right-4 z-20">
        <img
          src="/image/mascot boy.gif"
          alt="Mascot Boy"
          className="w-32 h-32 object-contain drop-shadow-2xl"
        />
      </div>
    </div>
  );
}

import { useState } from 'react';
import { AuthProvider, useAuth } from './components/AuthContext';
import { HomePage } from './scenes/HomePage';
import { SignIn } from './scenes/SignIn';
import { SignUp } from './scenes/SignUp';
import { CharacterSelect, type CharacterChoice } from './scenes/CharacterSelect';
import { CreativeDashboard } from './scenes/CreativeDashboard';
import { Profile } from './scenes/Profile';
import { LandSelection } from './scenes/LandSelection';
import { LevelDisplay } from './scenes/LevelDisplay';
import { NGODashboard } from './scenes/NGODashboard';
import { AdminDashboard } from './scenes/AdminDashboard';
import { Loader2 } from 'lucide-react';

function AppContent() {
  const { user, loading } = useAuth();
  const [authView, setAuthView] = useState<'home' | 'signin' | 'signup'>('home');
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterChoice | null>(null);
  const [selectedTreeImage, setSelectedTreeImage] = useState<string>('');
  const [selectedLand, setSelectedLand] = useState<string>('');
  const [view, setView] = useState<'dashboard' | 'profile' | 'land' | 'levels'>('dashboard');

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <p className="text-gray-600">Loading your forest...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (authView === 'signup') {
      return <SignUp onSwitchToSignIn={() => setAuthView('signin')} />;
    } else if (authView === 'signin') {
      return <SignIn onSwitchToSignUp={() => setAuthView('signup')} />;
    } else {
      return (
        <HomePage
          onSignIn={() => setAuthView('signin')}
          onSignUp={() => setAuthView('signup')}
        />
      );
    }
  }

  // Route to NGO dashboard
  if (user.userType === 'ngo') {
    return <NGODashboard ngoEmail={user.email} />;
  }

  // Route to Admin dashboard
  if (user.userType === 'admin') {
    return <AdminDashboard adminEmail={user.email} />;
  }

  // Player flow (original flow)
  if (!selectedCharacter) {
    return <CharacterSelect onPlay={(character) => setSelectedCharacter(character)} />;
  }

  if (view === 'profile') {
    return <Profile onBack={() => setView('dashboard')} />;
  }

  if (view === 'land') {
    return (
      <LandSelection
        selectedTree={selectedTreeImage}
        selectedCharacter={selectedCharacter}
        onSelectLand={(landId) => {
          setSelectedLand(landId);
          setView('levels');
        }}
        onBack={() => setView('dashboard')}
      />
    );
  }

  if (view === 'levels') {
    return (
      <LevelDisplay
        selectedTree={selectedTreeImage}
        selectedCharacter={selectedCharacter}
        landId={selectedLand}
        onBack={() => setView('land')}
      />
    );
  }

  return (
    <CreativeDashboard
      character={selectedCharacter}
      onOpenProfile={() => setView('profile')}
      onContinueJourney={(treeImage) => {
        setSelectedTreeImage(treeImage);
        setView('land');
      }}
    />
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

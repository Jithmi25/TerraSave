import { useState } from 'react';
import { Bell, HelpCircle, Award, Trophy, Info, Share2, Download, Copy, Users, Settings } from 'lucide-react';
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
  const [showNotifications, setShowNotifications] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [inviteLink] = useState('https://terrasave.com/invite?ref=' + user?.email);
  const [copySuccess, setCopySuccess] = useState(false);
  const characterImage = character === 'boy' ? '/image/mascot_boy.png' : '/image/mascot_girl.png';
  const mascotGif = character === 'girl' ? '/image/mscot girl.gif' : '/image/mascot boy.gif';

  const handleCopyInviteLink = () => {
    navigator.clipboard.writeText(inviteLink);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000);
  };

  const handleShareWhatsApp = () => {
    const text = `🌳 I just earned my Plant Certificate on TerraSave! Join me in making a difference - plant trees by playing games! ${inviteLink}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareTwitter = () => {
    const text = `🌳 I just earned my Plant Certificate on TerraSave! Join me in making a difference - plant trees by playing games! ${inviteLink}`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleShareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(inviteLink)}`, '_blank');
  };

  const notifications = [
    { id: 1, message: 'Welcome to TerraSave! Start your journey by planting your first tree.', time: 'Just now', read: false },
    { id: 2, message: 'Complete Level 1 to unlock new achievements!', time: '5 min ago', read: true },
    { id: 3, message: '🎉 Congratulations! You won new batch. Claim it now.', time: '2 min ago', read: false },
    { id: 4, message: '🌍 Congratulations! Your plant successfully planted in Europe Plant-for-the-Planet project, 2026.01.02', time: '1 min ago', read: false },
  ];

  const leaderboardData = [
    { rank: 1, name: 'EcoWarrior123', trees: 1250, score: 45000 },
    { rank: 2, name: 'GreenThumb', trees: 1100, score: 39000 },
    { rank: 3, name: 'ForestGuardian', trees: 980, score: 35000 },
    { rank: 4, name: user?.email || 'You', trees: 0, score: 0 },
    { rank: 5, name: 'NatureLover', trees: 850, score: 28000 },
  ];

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
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Dashboard</h1>
              <p className="text-white/90 mt-2">
                Welcome, {user?.email || 'Explorer'} — your journey starts here.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition flex items-center gap-2"
              >
                <Bell className="w-5 h-5" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              <button
                onClick={() => setShowLeaderboard(!showLeaderboard)}
                className="px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition flex items-center gap-2"
              >
                <Trophy className="w-5 h-5" />
                Leaderboard
              </button>
              <button
                onClick={() => setShowCertificate(!showCertificate)}
                className="px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition flex items-center gap-2"
              >
                <Award className="w-5 h-5" />
                Certificate
              </button>
              <button
                onClick={() => setShowHelp(!showHelp)}
                className="px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition flex items-center gap-2"
              >
                <HelpCircle className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowAbout(!showAbout)}
                className="px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition flex items-center gap-2"
              >
                <Info className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition flex items-center gap-2"
              >
                <Settings className="w-5 h-5" />
              </button>
              <button
                onClick={onOpenProfile}
                className="px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition"
              >
                Profile
              </button>
            </div>
          </div>

          {/* Modals/Panels */}
          {/* Notifications Panel */}
          {showNotifications && (
            <div className="mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Bell className="w-6 h-6" />
                  Notifications
                </h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
              <div className="space-y-3">
                {notifications.map((notif) => (
                  <div
                    key={notif.id}
                    className={`p-4 rounded-xl ${
                      notif.read ? 'bg-white/5' : 'bg-white/10 border border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-2 h-2 rounded-full mt-2 ${notif.read ? 'bg-white/30' : 'bg-emerald-400'}`} />
                      <div className="flex-1">
                        <p className={`${notif.read ? 'text-white/60' : 'text-white'}`}>
                          {notif.message}
                        </p>
                        <p className="text-white/40 text-xs mt-1">{notif.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Leaderboard Panel */}
          {showLeaderboard && (
            <div className="mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-amber-400" />
                  Global Leaderboard
                </h3>
                <button
                  onClick={() => setShowLeaderboard(false)}
                  className="text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
              <div className="space-y-2">
                {leaderboardData.map((player) => (
                  <div
                    key={player.rank}
                    className={`p-4 rounded-xl flex items-center justify-between ${
                      player.name === user?.email || player.name === 'You'
                        ? 'bg-emerald-500/20 border border-emerald-500/40'
                        : 'bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                          player.rank === 1
                            ? 'bg-amber-500 text-white'
                            : player.rank === 2
                            ? 'bg-gray-400 text-white'
                            : player.rank === 3
                            ? 'bg-orange-600 text-white'
                            : 'bg-white/20 text-white'
                        }`}
                      >
                        #{player.rank}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{player.name}</p>
                        <p className="text-white/60 text-sm">{player.trees} trees planted</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-emerald-400 font-bold text-lg">{player.score.toLocaleString()}</p>
                      <p className="text-white/60 text-xs">points</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Help Panel */}
          {showHelp && (
            <div className="mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <HelpCircle className="w-6 h-6" />
                  How to Play
                </h3>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
              <div className="space-y-4 text-white/90">
                <div>
                  <h4 className="font-semibold text-white mb-2">🌱 Step 1: Choose Your Tree</h4>
                  <p className="text-sm">Select one of three tree types to start your virtual forest journey.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">🎮 Step 2: Complete Levels</h4>
                  <p className="text-sm">Play match-three puzzle games across 20 levels. Each completed level helps your tree grow!</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">🌳 Step 3: Grow Your Forest</h4>
                  <p className="text-sm">As you progress, your virtual tree grows and becomes part of the TerraSave forest.</p>
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-2">🏆 Step 4: Earn Rewards</h4>
                  <p className="text-sm">Complete all levels to receive a plant certificate and contribute to real tree planting!</p>
                </div>
              </div>
            </div>
          )}

          {/* About TerraSave Panel */}
          {showAbout && (
            <div className="mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Info className="w-6 h-6" />
                  What is TerraSave?
                </h3>
                <button
                  onClick={() => setShowAbout(false)}
                  className="text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
              <div className="space-y-4 text-white/90">
                <p>
                  <strong className="text-white">TerraSave</strong> is a gamified platform that connects gaming with real-world environmental impact.
                </p>
                <p>
                  🌍 <strong>Our Mission:</strong> Make environmental conservation fun, engaging, and accessible to everyone through interactive games and challenges.
                </p>
                <p>
                  🌳 <strong>How it Works:</strong> Players complete puzzle games to grow virtual trees. When all levels are completed, we partner with NGOs to plant real trees in your name.
                </p>
                <p>
                  🤝 <strong>Community Impact:</strong> Join thousands of players worldwide who have contributed to planting over 50,000 real trees across the globe.
                </p>
                <p>
                  📜 <strong>Get Certified:</strong> Complete your journey and receive an official plant certificate recognizing your contribution to the planet.
                </p>
              </div>
            </div>
          )}

          {/* Settings Panel */}
          {showSettings && (
            <div className="mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Settings className="w-6 h-6" />
                  Settings
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
              <div className="space-y-6">
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Sound & Audio</h4>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white/90">Music Volume</span>
                    <input type="range" min="0" max="100" defaultValue="70" className="w-32" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white/90">Sound Effects</span>
                    <input type="range" min="0" max="100" defaultValue="80" className="w-32" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Display</h4>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white/90">Brightness</span>
                    <input type="range" min="0" max="100" defaultValue="100" className="w-32" />
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white/90">Screen Shake</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Notifications</h4>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white/90">Push Notifications</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white/90">Email Updates</span>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
                    </label>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-white font-semibold">Language</h4>
                  <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl">
                    <span className="text-white/90">Select Language</span>
                    <select className="bg-white/10 text-white px-4 py-2 rounded-lg border border-white/30">
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Plant Certificate Panel */}
          {showCertificate && (
            <div className="mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Award className="w-6 h-6 text-amber-400" />
                  Plant Certificate
                </h3>
                <button
                  onClick={() => setShowCertificate(false)}
                  className="text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
              
              {/* Certificate Card */}
              <div className="bg-gradient-to-br from-emerald-50 to-green-100 rounded-2xl p-8 border-4 border-emerald-600 shadow-xl">
                {/* Logo Header */}
                <div className="flex items-center justify-center gap-3 mb-6">
                  <div className="w-16 h-16 bg-emerald-600 rounded-full flex items-center justify-center">
                    <span className="text-3xl">🌳</span>
                  </div>
                  <div className="text-left">
                    <h2 className="text-3xl font-bold text-emerald-700">TerraSave</h2>
                    <p className="text-sm text-emerald-600">Plant Trees. Save Earth.</p>
                  </div>
                </div>

                {/* Decorative Line */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex-1 h-px bg-emerald-300"></div>
                  <span className="text-2xl">🏆</span>
                  <div className="flex-1 h-px bg-emerald-300"></div>
                </div>

                {/* Certificate Content */}
                <div className="text-center">
                  <h4 className="text-2xl font-bold text-gray-800 mb-4">Certificate of Environmental Contribution</h4>
                  <p className="text-gray-600 mb-2">This certificate is proudly presented to</p>
                  <div className="bg-white/60 rounded-lg px-6 py-3 mb-4 border-2 border-emerald-400">
                    <p className="text-3xl font-bold text-emerald-700">{user?.email || 'Explorer'}</p>
                  </div>
                  <p className="text-gray-700 mb-6 max-w-md mx-auto leading-relaxed">
                    For successfully completing <strong>20 levels</strong> of environmental challenges 
                    and contributing to the planting of <strong>1 real tree</strong> through TerraSave's global initiative
                  </p>
                  
                  {/* Stats */}
                  <div className="flex items-center justify-center gap-8 mb-6 bg-white/60 rounded-lg py-4 px-6 border border-emerald-300">
                    <div>
                      <p className="text-3xl font-bold text-emerald-600">1</p>
                      <p className="text-sm text-gray-700 font-medium">Tree Planted</p>
                    </div>
                    <div className="w-px h-12 bg-emerald-300"></div>
                    <div>
                      <p className="text-3xl font-bold text-emerald-600">0/20</p>
                      <p className="text-sm text-gray-700 font-medium">Levels Completed</p>
                    </div>
                    <div className="w-px h-12 bg-emerald-300"></div>
                    <div>
                      <p className="text-3xl font-bold text-emerald-600">5kg</p>
                      <p className="text-sm text-gray-700 font-medium">CO₂ Offset</p>
                    </div>
                  </div>

                  {/* Date */}
                  <p className="text-sm text-gray-600 mb-6">
                    Issued on: <strong>{new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</strong>
                  </p>

                  {/* Status Message */}
                  <div className="bg-amber-100 border border-amber-400 rounded-lg p-3 mb-6">
                    <p className="text-sm text-amber-800">
                      ⚠️ Complete all 20 levels to unlock full certificate and download option
                    </p>
                  </div>
                </div>
              </div>

              {/* Share and Invite Section */}
              <div className="mt-6 space-y-4">
                {/* Share Buttons */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Share2 className="w-5 h-5 text-white" />
                    <h4 className="text-white font-semibold">Share Your Achievement</h4>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleShareWhatsApp}
                      className="flex-1 min-w-[140px] px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      WhatsApp
                    </button>
                    <button
                      onClick={handleShareTwitter}
                      className="flex-1 min-w-[140px] px-4 py-3 bg-black hover:bg-gray-800 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      X
                    </button>
                    <button
                      onClick={handleShareFacebook}
                      className="flex-1 min-w-[140px] px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                      </svg>
                      Facebook
                    </button>
                    <button
                      className="px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium transition flex items-center justify-center gap-2 opacity-50 cursor-not-allowed"
                      disabled
                    >
                      <Download className="w-5 h-5" />
                      Download
                    </button>
                  </div>
                </div>

                {/* Invite Friends */}
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-white" />
                    <h4 className="text-white font-semibold">Invite Friends to Join TerraSave</h4>
                  </div>
                  <p className="text-white/80 text-sm mb-3">
                    Share your referral link and help friends start their environmental journey!
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inviteLink}
                      readOnly
                      className="flex-1 px-4 py-2 bg-white/10 border border-white/30 rounded-lg text-white text-sm"
                    />
                    <button
                      onClick={handleCopyInviteLink}
                      className={`px-4 py-2 rounded-lg font-medium transition flex items-center gap-2 ${
                        copySuccess
                          ? 'bg-green-600 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Copy className="w-4 h-4" />
                      {copySuccess ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={handleShareWhatsApp}
                      className="flex-1 px-3 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition"
                    >
                      Invite via WhatsApp
                    </button>
                    <button
                      onClick={() => {
                        const subject = 'Join me on TerraSave!';
                        const body = `Hi! I've been playing TerraSave and planting real trees by completing game levels. Join me and make a difference for the planet! ${inviteLink}`;
                        window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
                      }}
                      className="flex-1 px-3 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg text-sm font-medium transition"
                    >
                      Invite via Email
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                  className="w-64 md:w-72 drop-shadow-2xl"
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

import { useState } from 'react';
import { useAuth } from '../components/AuthContext';

interface ProfileProps {
  onBack: () => void;
}

export function Profile({ onBack }: ProfileProps) {
  const { user } = useAuth();
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name ?? 'Forest Explorer');
  const [displayName, setDisplayName] = useState((user?.email || 'explorer').split('@')[0]);
  const [email, setEmail] = useState(user?.email ?? 'explorer@terrasave.com');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white drop-shadow-lg">Profile</h1>
              <p className="text-white/80 mt-2">Manage your account details and security.</p>
            </div>
            <button
              onClick={onBack}
              className="px-4 py-2 rounded-full bg-white/20 text-white backdrop-blur-md border border-white/30 hover:bg-white/30 transition"
            >
              Back to Dashboard
            </button>
          </div>

          <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
            {/* Profile Image */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/30">
              <h2 className="text-white text-xl font-semibold mb-4">Profile Image</h2>
              <div className="flex flex-col items-center">
                <div className="w-40 h-40 rounded-full bg-white/20 border-4 border-white/40 flex items-center justify-center text-white text-4xl font-bold">
                  {displayName.slice(0, 1).toUpperCase()}
                </div>
                <button className="mt-4 px-4 py-2 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition">
                  Change Avatar
                </button>
              </div>
            </div>

            {/* Profile Form */}
            <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/30">
              <h2 className="text-white text-2xl font-semibold mb-4">Account Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-white/80 text-sm mb-2">Full Name</label>
                  <input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-white/80 text-sm mb-2">Display Name</label>
                  <input
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="Display name"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-white/80 text-sm mb-2">Email</label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-white text-xl font-semibold mb-4">Password Settings</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-white/80 text-sm mb-2">Confirm Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg bg-white/20 text-white placeholder-white/60 border border-white/30 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button className="px-6 py-3 rounded-full bg-emerald-500 text-white font-semibold hover:bg-emerald-600 transition">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

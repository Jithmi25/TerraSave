import { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../components/AuthContext';

export function SignIn({ onSwitchToSignUp }: { onSwitchToSignUp: () => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email');
      return;
    }

    if (!password) {
      setError('Please enter your password');
      return;
    }

    setLoading(true);
    try {
      await signIn(email, password);
      setEmail('');
      setPassword('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign in failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-emerald-50 to-teal-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex flex-col items-center mb-6">
            <img src="/image/logo.png" alt="TerraSave Logo" className="h-14 mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900">Log in</h2>
            <p className="text-sm text-gray-600 mt-1">
              Welcome back! <br />continue your impact
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="you@example.com"
                autoComplete="email"
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="••••••••"
                autoComplete="current-password"
                disabled={loading}
              />
            </div>

            <div className="flex items-center justify-between gap-4 text-sm">
              <label className="inline-flex items-center gap-2 text-gray-600 whitespace-nowrap">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
                  disabled={loading}
                />
                Remember me
              </label>
              <button
                type="button"
                className="text-emerald-600 hover:text-emerald-700 font-medium whitespace-nowrap"
                disabled={loading}
              >
                Forgot password?
              </button>
            </div>

            {error && (
              <div className="flex items-center gap-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-gray-400 text-white font-semibold py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin" />}
              {loading ? 'Signing In...' : 'Log In'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Don&apos;t have an account?{' '}
            <button
              onClick={onSwitchToSignUp}
              className="text-emerald-600 hover:text-emerald-700 font-semibold transition"
            >
              Sign Up
            </button>
          </p>
        </div>

        <p className="text-center text-xs text-gray-600 mt-6">
          Your forest is waiting. Let&apos;s grow together.
        </p>
      </div>
    </div>
  );
}
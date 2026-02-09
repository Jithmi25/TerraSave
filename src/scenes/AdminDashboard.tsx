import { useState } from 'react';
import { Users, Settings, CheckCircle, XCircle, Eye, Trash2, TrendingUp, Briefcase, LogOut } from 'lucide-react';
import { useAuth } from '../components/AuthContext';

interface PendingProject {
  id: string;
  ngoEmail: string;
  name: string;
  location: string;
  description: string;
  verificationDoc: string;
  submittedAt: string;
}

interface User {
  id: string;
  email: string;
  userType: 'player' | 'ngo';
  fullName: string;
  joinedAt: string;
  status: 'Active' | 'Suspended';
}

interface AdminDashboardProps {
  adminEmail: string;
}

export function AdminDashboard({ adminEmail }: AdminDashboardProps) {
  const { signOut } = useAuth();
  const [view, setView] = useState<'overview' | 'projects' | 'users'>('overview');
  const [selectedProject, setSelectedProject] = useState<PendingProject | null>(null);
  
  const [pendingProjects, setPendingProjects] = useState<PendingProject[]>([
    {
      id: '1',
      ngoEmail: 'ngo@terrasave.com',
      name: 'Ethiopian Forest Restoration',
      location: 'Ethiopia',
      description: 'Restoring degraded forest lands in the Ethiopian highlands',
      verificationDoc: 'ethiopian_ngo_certificate.pdf',
      submittedAt: '2024-02-08',
    },
    {
      id: '2',
      ngoEmail: 'greenearth@example.com',
      name: 'Urban Tree Initiative',
      location: 'USA/New York',
      description: 'Planting trees in urban areas to improve air quality',
      verificationDoc: 'green_earth_registration.pdf',
      submittedAt: '2024-02-09',
    },
    {
      id: '3',
      ngoEmail: 'rainforest@conservation.org',
      name: 'Congo Basin Conservation',
      location: 'Democratic Republic of Congo',
      description: 'Protecting and restoring the Congo rainforest biodiversity',
      verificationDoc: 'congo_conservation_docs.pdf',
      submittedAt: '2024-02-09',
    },
  ]);

  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      email: 'player@terrasave.com',
      userType: 'player',
      fullName: 'John Player',
      joinedAt: '2024-01-15',
      status: 'Active',
    },
    {
      id: '2',
      email: 'ngo@terrasave.com',
      userType: 'ngo',
      fullName: 'Green NGO Organization',
      joinedAt: '2024-01-20',
      status: 'Active',
    },
    {
      id: '3',
      email: 'player2@example.com',
      userType: 'player',
      fullName: 'Sarah Green',
      joinedAt: '2024-02-01',
      status: 'Active',
    },
  ]);

  // Mock stats
  const stats = {
    totalUsers: 2140,
    totalPlayers: 1890,
    totalNGOs: 250,
    totalProjects: 45,
    activeProjects: 38,
    pendingProjects: pendingProjects.length,
    totalTreesPlanted: 125000,
    totalEngagements: 54320,
  };

  const approveProject = (projectId: string) => {
    if (window.confirm('Approve this project? It will be available for players.')) {
      setPendingProjects(pendingProjects.filter(p => p.id !== projectId));
      setSelectedProject(null);
      alert('Project approved successfully!');
    }
  };

  const declineProject = (projectId: string) => {
    if (window.confirm('Decline this project? The NGO will be notified.')) {
      setPendingProjects(pendingProjects.filter(p => p.id !== projectId));
      setSelectedProject(null);
      alert('Project declined. NGO has been notified.');
    }
  };

  const suspendUser = (userId: string) => {
    if (window.confirm('Suspend this user account?')) {
      setUsers(users.map(u => u.id === userId ? { ...u, status: 'Suspended' } : u));
      alert('User account suspended.');
    }
  };

  const deleteUser = (userId: string) => {
    if (window.confirm('Permanently delete this user? This action cannot be undone.')) {
      setUsers(users.filter(u => u.id !== userId));
      alert('User account deleted.');
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/image/bg.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover brightness-50"
        />
      </div>
      <div className="absolute inset-0 opacity-10">
        <img
          src="/image/1.png"
          alt="Pattern"
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      <div className="relative z-10 min-h-screen">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md border-b border-white/30">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-2xl">
                  ⚙️
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
                  <p className="text-sm text-white/70">{adminEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setView('overview')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    view === 'overview'
                      ? 'bg-white/20 text-white border border-white/40'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  Overview
                </button>
                <button
                  onClick={() => setView('projects')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    view === 'projects'
                      ? 'bg-white/20 text-white border border-white/40'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  Projects ({pendingProjects.length})
                </button>
                <button
                  onClick={() => setView('users')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    view === 'users'
                      ? 'bg-white/20 text-white border border-white/40'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  Users
                </button>
                <button
                  onClick={signOut}
                  className="px-4 py-2 rounded-lg font-medium transition-all text-white/70 hover:bg-red-500/20 hover:text-red-200 flex items-center gap-2"
                >
                  <LogOut className="w-5 h-5" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {view === 'overview' && (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-5 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center">
                  <p className="text-white/70 text-sm mb-3">Total Users</p>
                  <p className="text-4xl font-bold text-white mb-2">{stats.totalUsers.toLocaleString()}</p>
                  <p className="text-xs text-white/50">
                    {stats.totalPlayers} Players • {stats.totalNGOs} NGOs
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center">
                  <p className="text-white/70 text-sm mb-3">Active Projects</p>
                  <p className="text-4xl font-bold text-white mb-2">{stats.activeProjects}</p>
                  <p className="text-xs text-white/50">
                    Live on platform
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center">
                  <p className="text-white/70 text-sm mb-3">Pending Projects</p>
                  <p className="text-4xl font-bold text-white mb-2">{stats.pendingProjects}</p>
                  <p className="text-xs text-white/50">
                    Awaiting approval
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center">
                  <p className="text-white/70 text-sm mb-3">Trees Planted</p>
                  <p className="text-4xl font-bold text-white mb-2">{stats.totalTreesPlanted.toLocaleString()}</p>
                  <p className="text-xs text-emerald-300">+2,340 this month</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center">
                  <p className="text-white/70 text-sm mb-3">User Engagements</p>
                  <p className="text-4xl font-bold text-white mb-2">{stats.totalEngagements.toLocaleString()}</p>
                  <p className="text-xs text-emerald-300">+15% from last month</p>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30">
                <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                    <p className="text-white/90 text-sm">New NGO project submitted: Ethiopian Forest Restoration</p>
                    <span className="text-white/50 text-xs ml-auto">2 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <p className="text-white/90 text-sm">45 new players registered today</p>
                    <span className="text-white/50 text-xs ml-auto">4 hours ago</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <p className="text-white/90 text-sm">Project milestone reached: 10,000 trees planted</p>
                    <span className="text-white/50 text-xs ml-auto">1 day ago</span>
                  </div>
                </div>
              </div>
            </>
          )}

          {view === 'projects' && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">Pending Project Approvals</h2>
              
              {pendingProjects.length === 0 ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/30 text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <p className="text-white text-lg">No pending projects</p>
                  <p className="text-white/60 text-sm">All projects have been reviewed</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {pendingProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{project.name}</h3>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/30 text-amber-200">
                              Pending Review
                            </span>
                          </div>
                          <p className="text-white/70 text-sm mb-2">📧 {project.ngoEmail}</p>
                          <p className="text-white/70 text-sm mb-2">📍 {project.location}</p>
                          <p className="text-white/80 text-sm mb-3">{project.description}</p>
                          <p className="text-white/60 text-xs">
                            Submitted: {project.submittedAt} • Document: {project.verificationDoc}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/30 rounded-lg font-medium transition-all"
                        >
                          <Eye className="w-4 h-4" />
                          View Details
                        </button>
                        <button
                          onClick={() => approveProject(project.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/30 rounded-lg font-medium transition-all"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve
                        </button>
                        <button
                          onClick={() => declineProject(project.id)}
                          className="flex items-center gap-2 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 rounded-lg font-medium transition-all"
                        >
                          <XCircle className="w-4 h-4" />
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Project Detail Modal */}
              {selectedProject && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Details</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                        <p className="text-gray-900 font-semibold">{selectedProject.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">NGO Email</label>
                        <p className="text-gray-900">{selectedProject.ngoEmail}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                        <p className="text-gray-900">{selectedProject.location}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <p className="text-gray-700">{selectedProject.description}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Verification Document</label>
                        <p className="text-gray-900 font-mono text-sm">{selectedProject.verificationDoc}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Submitted Date</label>
                        <p className="text-gray-900">{selectedProject.submittedAt}</p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={() => {
                          approveProject(selectedProject.id);
                        }}
                        className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all"
                      >
                        Approve Project
                      </button>
                      <button
                        onClick={() => {
                          declineProject(selectedProject.id);
                        }}
                        className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg font-medium transition-all"
                      >
                        Decline Project
                      </button>
                      <button
                        onClick={() => setSelectedProject(null)}
                        className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {view === 'users' && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
              
              <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/30 overflow-hidden">
                <table className="w-full">
                  <thead className="bg-white/10">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {users.map((user) => (
                      <tr key={user.id} className="hover:bg-white/5 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-white font-medium">{user.fullName}</p>
                            <p className="text-white/60 text-sm">{user.email}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.userType === 'player'
                              ? 'bg-blue-500/30 text-blue-200'
                              : 'bg-purple-500/30 text-purple-200'
                          }`}>
                            {user.userType === 'player' ? '🌱 Player' : '🏢 NGO'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-white/80 text-sm">
                          {user.joinedAt}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === 'Active'
                              ? 'bg-emerald-500/30 text-emerald-200'
                              : 'bg-red-500/30 text-red-200'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            {user.status === 'Active' ? (
                              <button
                                onClick={() => suspendUser(user.id)}
                                className="px-3 py-1 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/30 rounded text-xs font-medium transition-all"
                              >
                                Suspend
                              </button>
                            ) : (
                              <button
                                onClick={() => setUsers(users.map(u => u.id === user.id ? { ...u, status: 'Active' } : u))}
                                className="px-3 py-1 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/30 rounded text-xs font-medium transition-all"
                              >
                                Activate
                              </button>
                            )}
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-200 border border-red-500/30 rounded text-xs font-medium transition-all flex items-center gap-1"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

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
  treesPlanted: number;
  playersEngaged: number;
  status: 'Pending Review' | 'On Going' | 'Completed';
  paymentAmount?: number;
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
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'bank_transfer' | 'paypal' | 'stripe'>('bank_transfer');
    const [projectStatusFilter, setProjectStatusFilter] = useState<'all' | 'Pending Review' | 'On Going' | 'Completed'>('all');
  
  const [pendingProjects, setPendingProjects] = useState<PendingProject[]>([
    {
      id: '1',
      ngoEmail: 'ngo@terrasave.com',
      name: 'Ethiopian Forest Restoration',
      location: 'Ethiopia',
      description: 'Restoring degraded forest lands in the Ethiopian highlands',
      verificationDoc: 'ethiopian_ngo_certificate.pdf',
      submittedAt: '2024-02-08',
      treesPlanted: 4200,
      playersEngaged: 860,
      status: 'Pending Review',
    },
    {
      id: '2',
      ngoEmail: 'greenearth@example.com',
      name: 'Urban Tree Initiative',
      location: 'USA/New York',
      description: 'Planting trees in urban areas to improve air quality',
      verificationDoc: 'green_earth_registration.pdf',
      submittedAt: '2024-02-09',
      treesPlanted: 1500,
      playersEngaged: 430,
      status: 'Pending Review',
    },
    {
      id: '3',
      ngoEmail: 'rainforest@conservation.org',
      name: 'Congo Basin Conservation',
      location: 'Democratic Republic of Congo',
      description: 'Protecting and restoring the Congo rainforest biodiversity',
      verificationDoc: 'congo_conservation_docs.pdf',
      submittedAt: '2024-02-09',
      treesPlanted: 7800,
      playersEngaged: 1240,
      status: 'Pending Review',
    },
    {
      id: '4',
      ngoEmail: 'savethecoast@ngo.org',
      name: 'Mangrove Shield Program',
      location: 'Indonesia',
      description: 'Rebuilding coastal mangroves to protect communities and wildlife',
      verificationDoc: 'mangrove_program_docs.pdf',
      submittedAt: '2024-02-10',
      treesPlanted: 2300,
      playersEngaged: 520,
      status: 'On Going',
    },
    {
      id: '5',
      ngoEmail: 'highlandgreen@ngo.org',
      name: 'Himalayan Reforestation Drive',
      location: 'Nepal',
      description: 'Planting native species to restore mountain ecosystems',
      verificationDoc: 'himalayan_reforest_docs.pdf',
      submittedAt: '2024-02-10',
      treesPlanted: 3100,
      playersEngaged: 670,
      status: 'On Going',
    },
    {
      id: '6',
      ngoEmail: 'amazon.restore@ngo.org',
      name: 'Amazon Rainforest Recovery',
      location: 'Brazil',
      description: 'Successfully completed reforestation of 50 hectares in the Amazon basin',
      verificationDoc: 'amazon_completion_report.pdf',
      submittedAt: '2024-01-15',
      treesPlanted: 12500,
      playersEngaged: 2340,
      status: 'Completed',
      paymentAmount: 25000,
    },
    {
      id: '7',
      ngoEmail: 'sahel.green@ngo.org',
      name: 'Sahel Green Belt Initiative',
      location: 'Mali',
      description: 'Completed desert barrier planting to prevent soil erosion',
      verificationDoc: 'sahel_completion_docs.pdf',
      submittedAt: '2024-01-20',
      treesPlanted: 8900,
      playersEngaged: 1560,
      status: 'Completed',
      paymentAmount: 17800,
    },
    {
      id: '8',
      ngoEmail: 'urban.forest@ngo.org',
      name: 'Metropolitan Green Spaces',
      location: 'Singapore',
      description: 'Successfully created urban forest corridors across the city',
      verificationDoc: 'singapore_urban_completion.pdf',
      submittedAt: '2024-01-25',
      treesPlanted: 5600,
      playersEngaged: 980,
      status: 'Completed',
      paymentAmount: 11200,
    },
    {
      id: '9',
      ngoEmail: 'coastal.protect@ngo.org',
      name: 'Pacific Coastal Shield',
      location: 'Philippines',
      description: 'Completed coastal mangrove restoration protecting 20km of coastline',
      verificationDoc: 'pacific_coastal_completion.pdf',
      submittedAt: '2024-01-30',
      treesPlanted: 9800,
      playersEngaged: 1890,
      status: 'Completed',
      paymentAmount: 19600,
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
    {
      id: '4',
      email: 'eco.helper@example.com',
      userType: 'player',
      fullName: 'Kevin Woods',
      joinedAt: '2024-02-05',
      status: 'Suspended',
    },
    {
      id: '5',
      email: 'forestfriends@ngo.org',
      userType: 'ngo',
      fullName: 'Forest Friends Initiative',
      joinedAt: '2024-02-06',
      status: 'Active',
    },
    {
      id: '6',
      email: 'player3@example.com',
      userType: 'player',
      fullName: 'Amina K.',
      joinedAt: '2024-02-07',
      status: 'Active',
    },
    {
      id: '7',
      email: 'trees4life@ngo.org',
      userType: 'ngo',
      fullName: 'Trees4Life',
      joinedAt: '2024-02-08',
      status: 'Suspended',
    },
    {
      id: '8',
      email: 'player4@example.com',
      userType: 'player',
      fullName: 'Lucas Park',
      joinedAt: '2024-02-09',
      status: 'Active',
    },
  ]);

  const [userTypeFilter, setUserTypeFilter] = useState<'all' | User['userType']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | User['status']>('all');

  const filteredUsers = users.filter((user) => {
    const matchesType = userTypeFilter === 'all' || user.userType === userTypeFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    return matchesType && matchesStatus;
  });

    const filteredProjects = pendingProjects.filter((project) => {
      if (projectStatusFilter !== 'all' && project.status !== projectStatusFilter) return false;
      return true;
    });

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

  const processPayment = (project: PendingProject) => {
    setSelectedProject(project);
    setShowPaymentModal(true);
  };

  const confirmPayment = () => {
    if (selectedProject) {
      alert(`Payment of $${selectedProject.paymentAmount?.toLocaleString()} processed successfully via ${paymentMethod.replace('_', ' ')}! NGO has been notified.`);
      setShowPaymentModal(false);
      setSelectedProject(null);
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
                  Projects
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
                  <p className="text-white/70 text-sm mb-3">Finished Projects</p>
                  <p className="text-4xl font-bold text-white mb-2">{String(stats.pendingProjects).padStart(2, '0')}</p>
                  <p className="text-xs text-white/50">
                    Payment completed projects
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

              {/* Finished Projects Table */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 mt-8">
                <h3 className="text-xl font-bold text-white mb-4">Finished Projects</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-white/10">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Project Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Organization Name
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Payment Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          Trees Planted
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-white uppercase tracking-wider">
                          User Engagement
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10">
                      {pendingProjects
                        .filter((p) => p.status === 'Completed')
                        .map((project) => (
                          <tr key={project.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-4">
                              <p className="text-white font-medium">{project.name}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-white/80">{project.ngoEmail}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-emerald-400 font-semibold">
                                ${project.paymentAmount?.toLocaleString()}
                              </p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-white/80">{project.treesPlanted.toLocaleString()}</p>
                            </td>
                            <td className="px-4 py-4">
                              <p className="text-white/80">{project.playersEngaged.toLocaleString()}</p>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {view === 'projects' && (
            <>
              <h2 className="text-2xl font-bold text-white mb-6 text-justify text-center">Projects</h2>
              
                {/* Project Status Filter */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/30 mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-white font-medium text-sm">Filter by Status:</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setProjectStatusFilter('all')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          projectStatusFilter === 'all'
                            ? 'bg-white/20 text-white border border-white/40'
                            : 'bg-white/5 text-white/70 border border-white/20 hover:bg-white/10'
                        }`}
                      >
                        All ({pendingProjects.length})
                      </button>
                      <button
                        onClick={() => setProjectStatusFilter('Pending Review')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          projectStatusFilter === 'Pending Review'
                            ? 'bg-amber-500/30 text-amber-200 border border-amber-500/40'
                            : 'bg-white/5 text-white/70 border border-white/20 hover:bg-white/10'
                        }`}
                      >
                        Pending Review ({pendingProjects.filter(p => p.status === 'Pending Review').length})
                      </button>
                      <button
                        onClick={() => setProjectStatusFilter('On Going')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          projectStatusFilter === 'On Going'
                            ? 'bg-emerald-500/30 text-emerald-200 border border-emerald-500/40'
                            : 'bg-white/5 text-white/70 border border-white/20 hover:bg-white/10'
                        }`}
                      >
                        On Going ({pendingProjects.filter(p => p.status === 'On Going').length})
                      </button>
                      <button
                        onClick={() => setProjectStatusFilter('Completed')}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          projectStatusFilter === 'Completed'
                            ? 'bg-blue-500/30 text-blue-200 border border-blue-500/40'
                            : 'bg-white/5 text-white/70 border border-white/20 hover:bg-white/10'
                        }`}
                      >
                        Completed ({pendingProjects.filter(p => p.status === 'Completed').length})
                      </button>
                    </div>
                  </div>
                </div>

                {filteredProjects.length === 0 ? (
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/30 text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-400 mx-auto mb-4" />
                  <p className="text-white text-lg">No pending projects</p>
                  <p className="text-white/60 text-sm">All projects have been reviewed</p>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  {filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{project.name}</h3>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              project.status === 'Completed'
                                ? 'bg-blue-500/30 text-blue-200'
                                : project.status === 'On Going'
                                ? 'bg-emerald-500/30 text-emerald-200'
                                : 'bg-amber-500/30 text-amber-200'
                            }`}>
                              {project.status}
                            </span>
                          </div>
                          <p className="text-white/70 text-sm mb-2">📧 {project.ngoEmail}</p>
                          <p className="text-white/70 text-sm mb-2">📍 {project.location}</p>
                          <p className="text-white/80 text-sm mb-3">{project.description}</p>
                          <div className="text-white/70 text-xs mb-3">
                            <span className="font-semibold text-white/80">Current Status:</span>{' '}
                            {project.treesPlanted.toLocaleString()} trees planted • {project.playersEngaged.toLocaleString()} players engaged • {project.location}
                          </div>
                          <p className="text-white/60 text-xs">
                            Submitted: {project.submittedAt} • Document: {project.verificationDoc}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {project.status === 'Completed' ? (
                          <>
                            <button
                              onClick={() => processPayment(project)}
                              className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-500/30 rounded-lg font-medium transition-all"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Payment
                            </button>
                            <button
                              onClick={() => setSelectedProject(project)}
                              className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-200 border border-purple-500/30 rounded-lg font-medium transition-all"
                            >
                              <Eye className="w-4 h-4" />
                              Project Status
                            </button>
                          </>
                        ) : project.status === 'On Going' ? (
                          <button
                            onClick={() => setSelectedProject(project)}
                            className="flex items-center gap-2 px-4 py-2 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/30 rounded-lg font-medium transition-all"
                          >
                            <TrendingUp className="w-4 h-4" />
                            Current Status
                          </button>
                        ) : (
                          <>
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
                          </>
                        )}
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Status</label>
                        <p className="text-gray-700">
                          {selectedProject.treesPlanted.toLocaleString()} trees planted • {selectedProject.playersEngaged.toLocaleString()} players engaged • {selectedProject.location}
                        </p>
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
                      {selectedProject.status === 'Completed' && (
                        <button
                          onClick={() => {
                            processPayment(selectedProject);
                          }}
                          className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-all"
                        >
                          Process Payment
                        </button>
                      )}
                      {selectedProject.status === 'Pending Review' && (
                        <>
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
                        </>
                      )}
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

              {/* Payment Modal */}
              {showPaymentModal && selectedProject && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Process Payment</h3>
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trees Planted</label>
                        <p className="text-gray-900">{selectedProject.treesPlanted.toLocaleString()} trees</p>
                      </div>
                      <div className="border-t pt-4">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount</label>
                        <p className="text-3xl font-bold text-emerald-600">${selectedProject.paymentAmount?.toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                        <div className="space-y-2">
                          <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                            <input
                              type="radio"
                              name="payment_method"
                              value="bank_transfer"
                              checked={paymentMethod === 'bank_transfer'}
                              onChange={(e) => setPaymentMethod(e.target.value as any)}
                              className="w-4 h-4 text-emerald-600"
                            />
                            <div>
                              <p className="font-medium text-gray-900">Bank Transfer</p>
                              <p className="text-sm text-gray-500">Direct transfer to NGO account</p>
                            </div>
                          </label>
                          <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                            <input
                              type="radio"
                              name="payment_method"
                              value="paypal"
                              checked={paymentMethod === 'paypal'}
                              onChange={(e) => setPaymentMethod(e.target.value as any)}
                              className="w-4 h-4 text-emerald-600"
                            />
                            <div>
                              <p className="font-medium text-gray-900">PayPal</p>
                              <p className="text-sm text-gray-500">Fast and secure online payment</p>
                            </div>
                          </label>
                          <label className="flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer hover:bg-gray-50 transition">
                            <input
                              type="radio"
                              name="payment_method"
                              value="stripe"
                              checked={paymentMethod === 'stripe'}
                              onChange={(e) => setPaymentMethod(e.target.value as any)}
                              className="w-4 h-4 text-emerald-600"
                            />
                            <div>
                              <p className="font-medium text-gray-900">Stripe</p>
                              <p className="text-sm text-gray-500">Credit/Debit card payment</p>
                            </div>
                          </label>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={confirmPayment}
                        className="flex-1 px-4 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all"
                      >
                        Confirm Payment
                      </button>
                      <button
                        onClick={() => {
                          setShowPaymentModal(false);
                          setSelectedProject(null);
                        }}
                        className="px-4 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
                      >
                        Cancel
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
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <label className="text-white/80 text-sm">User Type:</label>
                  <select
                    value={userTypeFilter}
                    onChange={(e) => setUserTypeFilter(e.target.value as 'all' | User['userType'])}
                    className="bg-white/10 text-white text-sm px-3 py-2 rounded-lg border border-white/30 focus:outline-none"
                  >
                    <option value="all">All</option>
                    <option value="player">Player</option>
                    <option value="ngo">NGO</option>
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <label className="text-white/80 text-sm">Status:</label>
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as 'all' | User['status'])}
                    className="bg-white/10 text-white text-sm px-3 py-2 rounded-lg border border-white/30 focus:outline-none"
                  >
                    <option value="all">All</option>
                    <option value="Active">Active</option>
                    <option value="Suspended">Suspended</option>
                  </select>
                </div>
                <div className="text-white/60 text-sm">
                  Showing {filteredUsers.length} of {users.length} users
                </div>
              </div>
              
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
                    {filteredUsers.map((user) => (
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

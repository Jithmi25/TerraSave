import { useState } from 'react';
import { Plus, Settings, User, Play, Pause, MapPin, Bell, Upload, CheckCircle, Clock, LogOut } from 'lucide-react';
import { useAuth } from '../components/AuthContext';

interface Project {
  id: string;
  name: string;
  location: string;
  description: string;
  status: 'active' | 'completed' | 'pending';
  playerCount: number;
  treesPlanted: number;
  treesTarget: number;
  createdAt: string;
  verificationDoc?: string;
}

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning';
  timestamp: string;
  read: boolean;
}

interface NGODashboardProps {
  ngoEmail: string;
}

export function NGODashboard({ ngoEmail }: NGODashboardProps) {
  const { signOut } = useAuth();
  const [view, setView] = useState<'projects' | 'profile' | 'settings'>('projects');
  const [showAddProject, setShowAddProject] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'Plant-for-the-Planet',
      location: 'Global/Mexico',
      description: 'Trillion Tree Campaign - Empowering youth to plant trees globally',
      status: 'active',
      playerCount: 1250,
      treesPlanted: 45000,
      treesTarget: 100000,
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: 'Amazon Reforestation',
      location: 'Brazil',
      description: 'Restoring the Amazon rainforest ecosystem',
      status: 'active',
      playerCount: 890,
      treesPlanted: 32000,
      treesTarget: 75000,
      createdAt: '2024-03-20',
    },
    {
      id: '3',
      name: 'Urban Green Spaces',
      location: 'India',
      description: 'Creating green parks and gardens in urban areas to combat pollution and improve quality of life',
      status: 'pending',
      playerCount: 0,
      treesPlanted: 0,
      treesTarget: 15000,
      createdAt: '2024-02-08',
      verificationDoc: 'registration_certificate.pdf',
    },
    {
      id: '4',
      name: 'Coastal Mangrove Revival',
      location: 'Philippines',
      description: 'Restoring mangroves to protect coastlines and boost biodiversity',
      status: 'completed',
      playerCount: 620,
      treesPlanted: 28000,
      treesTarget: 40000,
      createdAt: '2024-04-05',
    },
  ]);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      message: 'Your project "Plant-for-the-Planet" has been approved by admin',
      type: 'success',
      timestamp: '2024-01-15 10:30 AM',
      read: false,
    },
    {
      id: '2',
      message: 'New milestone: 1000 players joined your projects!',
      type: 'info',
      timestamp: '2024-02-01 3:45 PM',
      read: false,
    },
  ]);
  const [newProject, setNewProject] = useState({
    name: '',
    location: '',
    description: '',
    treesTarget: '',
    verificationDoc: null as File | null,
  });

  const handleAddProject = () => {
    if (
      !newProject.name ||
      !newProject.location ||
      !newProject.description ||
      !newProject.treesTarget ||
      !newProject.verificationDoc
    ) {
      alert('Please fill all fields and upload verification document');
      return;
    }

    const project: Project = {
      id: Date.now().toString(),
      name: newProject.name,
      location: newProject.location,
      description: newProject.description,
      status: 'pending',
      playerCount: 0,
      treesPlanted: 0,
      treesTarget: Number(newProject.treesTarget),
      createdAt: new Date().toISOString().split('T')[0],
      verificationDoc: newProject.verificationDoc.name,
    };

    setProjects([...projects, project]);
    
    // Add notification
    const notification: Notification = {
      id: Date.now().toString(),
      message: `Project "${newProject.name}" has been submitted for admin approval`,
      type: 'info',
      timestamp: new Date().toLocaleString(),
      read: false,
    };
    setNotifications([notification, ...notifications]);

    setNewProject({ name: '', location: '', description: '', treesTarget: '', verificationDoc: null });
    setShowAddProject(false);
    setShowSuccessMessage(true);
    
    setTimeout(() => setShowSuccessMessage(false), 5000);
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  const toggleProjectStatus = (id: string) => {
    setProjects(
      projects.map((p) =>
        p.id === id ? { ...p, status: p.status === 'active' ? 'completed' : 'active' } : p
      )
    );
  };
  const formatCount = (count: number) => count.toString().padStart(2, '0');

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
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-2xl">
                  🏢
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">HYSNGO Dashboard</h1>
                  <p className="text-sm text-white/70">{ngoEmail}</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
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
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative px-4 py-2 rounded-lg font-medium transition-all text-white/70 hover:bg-white/10"
                >
                  <Bell className="w-5 h-5" />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                      {unreadCount}
                    </span>
                  )}
                </button>
                <button
                  onClick={() => setView('profile')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    view === 'profile'
                      ? 'bg-white/20 text-white border border-white/40'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  <User className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setView('settings')}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    view === 'settings'
                      ? 'bg-white/20 text-white border border-white/40'
                      : 'text-white/70 hover:bg-white/10'
                  }`}
                >
                  <Settings className="w-5 h-5" />
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
          {/* Success Message */}
          {showSuccessMessage && (
            <div className="mb-6 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/40 rounded-xl p-4 flex items-center gap-3">
              <CheckCircle className="w-6 h-6 text-emerald-300" />
              <div>
                <p className="text-white font-semibold">Project Submitted Successfully!</p>
                <p className="text-white/80 text-sm">Your project has been sent to admin for approval. You will be notified once it's reviewed.</p>
              </div>
            </div>
          )}

          {/* Notifications Panel */}
          {showNotifications && (
            <div className="mb-6 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Notifications</h3>
                <button
                  onClick={() => setShowNotifications(false)}
                  className="text-white/70 hover:text-white text-sm"
                >
                  Close
                </button>
              </div>
              <div className="space-y-3">
                {notifications.length === 0 ? (
                  <p className="text-white/60 text-center py-4">No notifications</p>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markNotificationAsRead(notification.id)}
                      className={`p-4 rounded-xl cursor-pointer transition-all ${
                        notification.read
                          ? 'bg-white/5'
                          : 'bg-white/10 border border-white/20'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.read ? 'bg-white/30' : 'bg-emerald-400'
                        }`} />
                        <div className="flex-1">
                          <p className={`${
                            notification.read ? 'text-white/60' : 'text-white'
                          }`}>
                            {notification.message}
                          </p>
                          <p className="text-white/40 text-xs mt-1">{notification.timestamp}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {view === 'projects' && (
            <>
              {/* Stats */}
              <div className="grid grid-cols-5 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center">
                  <p className="text-white/70 text-sm mb-3">Total Players</p>
                  <p className="text-4xl font-bold text-white">
                    {projects.reduce((sum, p) => sum + p.playerCount, 0).toLocaleString()}
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center">
                  <p className="text-white/70 text-sm mb-3">Active Projects</p>
                  <p className="text-4xl font-bold text-white">
                    {formatCount(projects.filter((p) => p.status === 'active').length)}
                  </p>
                  <p className="text-xs text-white/50 mt-2">Live projects</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center">
                  <p className="text-white/70 text-sm mb-3">Pending Projects</p>
                  <p className="text-4xl font-bold text-white">
                    {formatCount(projects.filter((p) => p.status === 'pending').length)}
                  </p>
                  <p className="text-xs text-white/50 mt-2">Awaiting approval</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center">
                  <p className="text-white/70 text-sm mb-3">Trees Planted</p>
                  <p className="text-4xl font-bold text-white">
                    {projects.reduce((sum, p) => sum + p.treesPlanted, 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-emerald-300 mt-2">Total impact</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30 text-center">
                  <p className="text-white/70 text-sm mb-3">Completed Projects</p>
                  <p className="text-4xl font-bold text-white">
                    {formatCount(projects.filter((p) => p.status === 'completed').length)}
                  </p>
                  <p className="text-xs text-white/50 mt-2">Successfully delivered</p>
                </div>
              </div>

              {/* Projects Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Your Projects</h2>
                <button
                  onClick={() => setShowAddProject(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all"
                >
                  <Plus className="w-5 h-5" />
                  Add Project
                </button>
              </div>

              {/* Add Project Modal */}
              {showAddProject && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-2xl p-8 max-w-lg w-full">
                    <h3 className="text-2xl font-bold text-gray-900 mb-6">Add New Project</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Project Name
                        </label>
                        <input
                          type="text"
                          value={newProject.name}
                          onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., Plant-for-the-Planet"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Location
                        </label>
                        <input
                          type="text"
                          value={newProject.location}
                          onChange={(e) =>
                            setNewProject({ ...newProject, location: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., Global/Mexico"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Description
                        </label>
                        <textarea
                          value={newProject.description}
                          onChange={(e) =>
                            setNewProject({ ...newProject, description: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none"
                          rows={3}
                          placeholder="Describe your project..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Trees in Project
                        </label>
                        <input
                          type="number"
                          min={1}
                          value={newProject.treesTarget}
                          onChange={(e) =>
                            setNewProject({ ...newProject, treesTarget: e.target.value })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          placeholder="e.g., 25000"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Verification Document <span className="text-red-500">*</span>
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-500 transition-all">
                          <input
                            type="file"
                            id="verification-doc"
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                            onChange={(e) => {
                              const file = e.target.files?.[0] || null;
                              setNewProject({ ...newProject, verificationDoc: file });
                            }}
                            className="hidden"
                          />
                          <label htmlFor="verification-doc" className="cursor-pointer">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            {newProject.verificationDoc ? (
                              <p className="text-sm text-emerald-600 font-medium">
                                {newProject.verificationDoc.name}
                              </p>
                            ) : (
                              <>
                                <p className="text-sm text-gray-600 mb-1">
                                  Click to upload verification document
                                </p>
                                <p className="text-xs text-gray-500">
                                  PDF, DOC, DOCX, JPG, PNG (max 10MB)
                                </p>
                              </>
                            )}
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          Upload official documents proving your organization's legitimacy (registration certificate, tax ID, etc.)
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3 mt-6">
                      <button
                        onClick={handleAddProject}
                        className="flex-1 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all"
                      >
                        Create Project
                      </button>
                      <button
                        onClick={() => setShowAddProject(false)}
                        className="flex-1 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg font-medium transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects List */}
              <div className="grid grid-cols-2 gap-6">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/30"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-bold text-white">{project.name}</h3>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              project.status === 'active'
                                ? 'bg-emerald-500/30 text-emerald-200'
                                : project.status === 'completed'
                                ? 'bg-blue-500/30 text-blue-200'
                                : 'bg-amber-500/30 text-amber-200'
                            }`}
                          >
                            {project.status === 'active'
                              ? 'Active'
                              : project.status === 'completed'
                              ? 'Completed'
                              : 'Pending Approval'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                          <MapPin className="w-4 h-4" />
                          {project.location}
                        </div>
                        <p className="text-white/80 text-sm mb-4">{project.description}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-white/60 text-xs mb-1">Players Engaged</p>
                        <p className="text-white text-lg font-bold">
                          {project.playerCount.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-white/60 text-xs mb-1">Trees Target</p>
                        <p className="text-white text-lg font-bold">
                          {project.treesTarget.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-white/60 text-xs mb-1">Trees Planted</p>
                        <p className="text-white text-lg font-bold">
                          {project.treesPlanted.toLocaleString()}
                        </p>
                      </div>
                      <div className="bg-white/5 rounded-lg p-3">
                        <p className="text-white/60 text-xs mb-1">Created</p>
                        <p className="text-white text-lg font-bold">{project.createdAt}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      {project.status === 'pending' ? (
                        <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-200">
                          <Clock className="w-4 h-4" />
                          <span className="text-sm font-medium">Awaiting Admin Approval</span>
                        </div>
                      ) : (
                        <button
                          onClick={() => toggleProjectStatus(project.id)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                            project.status === 'active'
                              ? 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-200 border border-emerald-500/30'
                              : 'bg-blue-500/20 hover:bg-blue-500/30 text-blue-200 border border-blue-500/30'
                          }`}
                        >
                          {project.status === 'active' ? (
                            <>
                              <Pause className="w-4 h-4" />
                              End Project
                            </>
                          ) : (
                            <>
                              <Play className="w-4 h-4" />
                              Reactivate
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {view === 'profile' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30">
                <h2 className="text-2xl font-bold text-white mb-6">NGO Profile</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Organization Email
                    </label>
                    <input
                      type="email"
                      value={ngoEmail}
                      disabled
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Organization Name
                    </label>
                    <input
                      type="text"
                      placeholder="Your Organization Name"
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Contact Person
                    </label>
                    <input
                      type="text"
                      placeholder="Contact Name"
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-white/70 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      placeholder="https://your-organization.org"
                      className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <button className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {view === 'settings' && (
            <div className="max-w-2xl mx-auto">
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/30">
                <h2 className="text-2xl font-bold text-white mb-6">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-3">Notifications</h3>
                    <div className="space-y-3">
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-5 h-5 rounded border-white/20 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className="text-white/90">New player engagement</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-5 h-5 rounded border-white/20 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className="text-white/90">Project milestones</span>
                      </label>
                      <label className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          className="w-5 h-5 rounded border-white/20 text-emerald-500 focus:ring-emerald-500"
                        />
                        <span className="text-white/90">Weekly reports</span>
                      </label>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-white/20">
                    <h3 className="text-lg font-semibold text-white mb-3">Account</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          placeholder="Enter current password"
                          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Create a new password"
                          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-white/70 mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          placeholder="Re-enter new password"
                          className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>
                    </div>
                  </div>
                  <button className="w-full px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-all">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

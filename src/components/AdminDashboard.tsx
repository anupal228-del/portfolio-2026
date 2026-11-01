import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Lock, Key, Save, Download, RotateCcw, Plus, Trash2, 
  Check, FileJson, User, Film, Briefcase, Sparkles 
} from 'lucide-react';
import { PortfolioContent, ProjectItem } from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  data: PortfolioContent;
  onSaveData: (newData: PortfolioContent) => void;
  onResetData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  data,
  onSaveData,
  onResetData,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [pin, setPin] = useState('');
  const [pinError, setPinError] = useState(false);
  
  const [activeTab, setActiveTab] = useState<'profile' | 'projects' | 'experience' | 'export'>('profile');
  const [localData, setLocalData] = useState<PortfolioContent>(data);
  const [saveNotification, setSaveNotification] = useState(false);

  if (!isOpen) return null;

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === 'anurag2026' || pin === 'admin') {
      setIsAuthenticated(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  };

  const handleProfileChange = (field: string, value: string) => {
    setLocalData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    onSaveData(localData);
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
  };

  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(localData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'portfolioData.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteProject = (id: string) => {
    setLocalData((prev) => ({
      ...prev,
      projects: prev.projects.filter((p) => p.id !== id),
    }));
  };

  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: 'proj-' + Date.now(),
      title: 'New Commercial Edit',
      category: 'short-content',
      subtitle: 'Brand Campaign',
      client: 'Client Name',
      role: 'Video Editor',
      description: 'Project description here...',
      tools: ['Premiere Pro'],
      aspectRatio: '9:16',
      mediaType: 'video',
      mediaUrl: '/media/ugc/chotu%20ugc.mp4',
      tags: ['Video', 'Editing'],
      badge: 'New Reel',
    };
    setLocalData((prev) => ({
      ...prev,
      projects: [newProj, ...prev.projects],
    }));
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6"
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          className="relative max-w-4xl w-full max-h-[90vh] bg-[#121316] text-white border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col font-mono"
        >
          {/* Header */}
          <div className="px-6 py-4 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/50">
            <div className="flex items-center gap-2">
              <Lock size={16} className="text-amber-400" />
              <span className="text-sm font-bold tracking-wider uppercase text-white">
                Portfolio CMS / Admin Suite
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-800 text-neutral-400">
                Step 5 Centralized Editor
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-neutral-400 hover:text-white p-1 rounded-full transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Body */}
          {!isAuthenticated ? (
            /* PIN Unlock Screen */
            <div className="p-12 flex flex-col items-center justify-center text-center max-w-sm mx-auto space-y-4">
              <div className="w-12 h-12 rounded-full bg-neutral-800 flex items-center justify-center text-amber-400">
                <Key size={20} />
              </div>
              <h4 className="text-lg font-bold text-white">Enter Editor Passcode</h4>
              <p className="text-xs text-neutral-400">
                Default PIN is <code className="text-amber-400 font-bold">anurag2026</code>
              </p>
              <form onSubmit={handlePinSubmit} className="w-full space-y-3">
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="PIN"
                  className="w-full text-center tracking-widest text-lg px-4 py-2 rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-amber-400"
                />
                {pinError && (
                  <p className="text-xs text-rose-400">Incorrect PIN. Try: anurag2026</p>
                )}
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-white text-black font-bold text-xs hover:bg-neutral-200 transition-colors"
                >
                  Unlock CMS
                </button>
              </form>
            </div>
          ) : (
            /* CMS Workspace */
            <div className="flex-1 flex flex-col min-h-0">
              {/* Navigation Tabs */}
              <div className="flex border-b border-neutral-800 bg-neutral-900/30 px-6 gap-2 text-xs">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`py-3 px-3 border-b-2 flex items-center gap-1.5 font-bold transition-colors ${
                    activeTab === 'profile'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  <User size={13} />
                  <span>Profile & Bio</span>
                </button>
                <button
                  onClick={() => setActiveTab('projects')}
                  className={`py-3 px-3 border-b-2 flex items-center gap-1.5 font-bold transition-colors ${
                    activeTab === 'projects'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  <Film size={13} />
                  <span>Projects ({localData.projects.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('experience')}
                  className={`py-3 px-3 border-b-2 flex items-center gap-1.5 font-bold transition-colors ${
                    activeTab === 'experience'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  <Briefcase size={13} />
                  <span>Experience</span>
                </button>
                <button
                  onClick={() => setActiveTab('export')}
                  className={`py-3 px-3 border-b-2 flex items-center gap-1.5 font-bold transition-colors ${
                    activeTab === 'export'
                      ? 'border-amber-400 text-amber-400'
                      : 'border-transparent text-neutral-400 hover:text-white'
                  }`}
                >
                  <FileJson size={13} />
                  <span>Export JSON</span>
                </button>
              </div>

              {/* Tab Content */}
              <div className="flex-1 p-6 overflow-y-auto text-xs space-y-6">
                
                {/* PROFILE TAB */}
                {activeTab === 'profile' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-neutral-400 block mb-1">Display Name</label>
                      <input
                        type="text"
                        value={localData.profile.name}
                        onChange={(e) => handleProfileChange('name', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Title</label>
                      <input
                        type="text"
                        value={localData.profile.title}
                        onChange={(e) => handleProfileChange('title', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="text-neutral-400 block mb-1">Bio</label>
                      <textarea
                        rows={3}
                        value={localData.profile.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white resize-none"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Email</label>
                      <input
                        type="email"
                        value={localData.profile.email}
                        onChange={(e) => handleProfileChange('email', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">WhatsApp URL</label>
                      <input
                        type="text"
                        value={localData.profile.whatsapp}
                        onChange={(e) => handleProfileChange('whatsapp', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Education</label>
                      <input
                        type="text"
                        value={localData.profile.education}
                        onChange={(e) => handleProfileChange('education', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                      />
                    </div>
                    <div>
                      <label className="text-neutral-400 block mb-1">Specialization</label>
                      <input
                        type="text"
                        value={localData.profile.specialization}
                        onChange={(e) => handleProfileChange('specialization', e.target.value)}
                        className="w-full px-3 py-2 rounded-lg bg-neutral-900 border border-neutral-700 text-white"
                      />
                    </div>
                  </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === 'projects' && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-neutral-800">
                      <span className="text-neutral-400">Total Projects: {localData.projects.length}</span>
                      <button
                        onClick={handleAddProject}
                        className="px-3 py-1.5 rounded-lg bg-amber-500 text-black font-bold flex items-center gap-1 hover:bg-amber-400"
                      >
                        <Plus size={13} />
                        <span>Add Project</span>
                      </button>
                    </div>

                    <div className="space-y-3">
                      {localData.projects.map((proj, idx) => (
                        <div
                          key={proj.id}
                          className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between gap-4"
                        >
                          <div className="flex-1">
                            <span className="text-[10px] text-amber-400 font-bold uppercase">
                              {proj.category}
                            </span>
                            <h5 className="font-bold text-white text-sm">{proj.title}</h5>
                            <p className="text-[11px] text-neutral-400 truncate">{proj.description}</p>
                            <span className="text-[10px] text-neutral-500">{proj.mediaUrl}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleDeleteProject(proj.id)}
                              className="p-2 text-rose-400 hover:text-rose-300 hover:bg-neutral-800 rounded-lg transition-colors"
                              title="Delete project"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* EXPERIENCE TAB */}
                {activeTab === 'experience' && (
                  <div className="space-y-4">
                    {localData.experiences.map((exp, idx) => (
                      <div key={idx} className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 space-y-2">
                        <div className="flex justify-between">
                          <span className="font-bold text-white text-sm">{exp.company}</span>
                          <span className="text-neutral-400">{exp.dateRange}</span>
                        </div>
                        <p className="text-neutral-300 font-semibold">{exp.role}</p>
                        <p className="text-neutral-400 text-[11px]">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* EXPORT TAB */}
                {activeTab === 'export' && (
                  <div className="space-y-4">
                    <p className="text-neutral-300">
                      You can download the full portfolio content JSON file anytime to commit into Git or back up your edits:
                    </p>
                    <div className="flex gap-3">
                      <button
                        onClick={handleExportJSON}
                        className="px-4 py-2.5 rounded-xl bg-white text-black font-bold flex items-center gap-2 hover:bg-neutral-200"
                      >
                        <Download size={14} />
                        <span>Download portfolioData.json</span>
                      </button>
                      <button
                        onClick={onResetData}
                        className="px-4 py-2.5 rounded-xl bg-neutral-800 text-neutral-300 font-bold flex items-center gap-2 hover:bg-neutral-700"
                      >
                        <RotateCcw size={14} />
                        <span>Reset to Defaults</span>
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* Footer Save Actions */}
              <div className="px-6 py-4 border-t border-neutral-800 bg-neutral-900/50 flex items-center justify-between">
                <div>
                  {saveNotification && (
                    <span className="text-emerald-400 text-xs flex items-center gap-1 font-bold">
                      <Check size={14} /> Changes Applied & Saved to Browser!
                    </span>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl bg-neutral-800 text-neutral-300 text-xs hover:bg-neutral-700 transition-colors"
                  >
                    Close
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 rounded-xl bg-amber-400 text-black text-xs font-bold hover:bg-amber-300 flex items-center gap-1.5 transition-colors shadow-md"
                  >
                    <Save size={13} />
                    <span>Save & Apply Live</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

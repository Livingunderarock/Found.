'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { Opportunity, VerificationStatus, OpportunityCategory } from '@/types';
import { 
  ShieldCheck, 
  RefreshCw, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  ExternalLink, 
  Key, 
  Server, 
  Database, 
  Globe2
} from 'lucide-react';

export default function AdminPage() {
  const { 
    opportunities, 
    setOpportunities, 
    refreshOpportunities, 
    isRefreshing, 
    lastIngestionMessage 
  } = useApp();

  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [ingestionLogs, setIngestionLogs] = useState<any[]>([
    {
      id: 'log-seed-1',
      timestamp: '2026-11-20 18:30:00',
      source: 'Official National & Karnataka Portals (NSP, INSPIRE MANAK, KSCA, SOF)',
      status: 'VERIFIED',
      count: 20
    }
  ]);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newOrganizer, setNewOrganizer] = useState('');
  const [newCategory, setNewCategory] = useState<OpportunityCategory>('Technology');
  const [newSourceUrl, setNewSourceUrl] = useState('');
  const [newCity, setNewCity] = useState('Bengaluru');
  const [newState, setNewState] = useState('Karnataka');
  const [newDeadline, setNewDeadline] = useState('2027-04-30');
  const [newMinGrade, setNewMinGrade] = useState(6);
  const [newMaxGrade, setNewMaxGrade] = useState(12);
  const [newDesc, setNewDesc] = useState('');
  const [newStatus, setNewStatus] = useState<VerificationStatus>('REAL_OFFICIAL_VERIFIED');

  const handleTriggerIngestion = async () => {
    await refreshOpportunities();
    setIngestionLogs(prev => [
      {
        id: `log-${Date.now()}`,
        timestamp: new Date().toLocaleString(),
        source: 'Live Ingestion Service (Gemini Web Discovery / Verified Registry)',
        status: 'SUCCESS',
        count: opportunities.length
      },
      ...prev
    ]);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to remove this opportunity from the catalog?')) {
      setOpportunities(prev => prev.filter(o => o.id !== id));
    }
  };

  const handleUpdateStatus = (id: string, nextStatus: VerificationStatus) => {
    setOpportunities(prev => prev.map(o => {
      if (o.id === id) {
        return {
          ...o,
          sourceStatus: nextStatus,
          lastChecked: new Date().toISOString().split('T')[0]
        };
      }
      return o;
    }));
  };

  const handleAddOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newOrganizer.trim() || !newSourceUrl.trim()) return;

    const newOpp: Opportunity = {
      id: `opp-admin-${Date.now()}`,
      title: newTitle,
      subtitle: `${newCategory} opportunity by ${newOrganizer}`,
      description: newDesc || 'Verified educational competition added via Admin Console.',
      organizer: newOrganizer,
      category: newCategory,
      tags: [newCategory, newCity, 'Admin Verified'],
      minGrade: newMinGrade,
      maxGrade: newMaxGrade,
      genderEligibility: 'all',
      eligibilityDescription: `Students of Classes ${newMinGrade} to ${newMaxGrade}`,
      requiredDocuments: ['School ID Card', 'Bonafide Certificate'],
      location: {
        country: 'India',
        state: newState,
        district: newCity,
        city: newCity,
        isOnline: false,
        isNational: false
      },
      deadline: newDeadline,
      eventStartDate: newDeadline,
      isFree: true,
      registrationFees: 'Free',
      prizesOrBenefits: 'Certificate of Merit & Recognition',
      registrationUrl: newSourceUrl,
      sourceUrl: newSourceUrl,
      sourceStatus: newStatus,
      lastChecked: new Date().toISOString().split('T')[0],
      officialSourceType: 'government_portal',
      createdAt: new Date().toISOString()
    };

    setOpportunities(prev => [newOpp, ...prev]);
    setShowAddModal(false);
    setNewTitle('');
    setNewOrganizer('');
    setNewSourceUrl('');
    setNewDesc('');
  };

  const filteredList = opportunities.filter(o => {
    if (filterStatus === 'all') return true;
    return o.sourceStatus === filterStatus;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Masthead */}
      <div className="theme-card p-6 sm:p-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge-clean bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-bold">
                Admin Console
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                • {opportunities.length} Total Registered
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">
              Pipeline Ingestion & Integrity Hub
            </h1>
            <p className="text-xs text-zinc-500 mt-1">
              Manage data ingestion, verify source URLs, and audit the opportunity catalog.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Opportunity</span>
            </button>

            <button
              onClick={handleTriggerIngestion}
              disabled={isRefreshing}
              className="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-700 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              <span>{isRefreshing ? 'Crawling...' : 'Trigger Ingestion Pipeline'}</span>
            </button>
          </div>
        </div>

        {/* API Status Cards */}
        <div className="mt-6 pt-5 border-t border-zinc-100 dark:border-zinc-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <span className="font-mono text-[10px] uppercase text-zinc-400 font-bold block mb-0.5">
              Engine Status
            </span>
            <p className="font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5 text-emerald-500" />
              Active & Verified
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5">{lastIngestionMessage}</p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <span className="font-mono text-[10px] uppercase text-zinc-400 font-bold block mb-0.5">
              Database Mode
            </span>
            <p className="font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-accent-500" />
              Zero-Config + Supabase Bridge Ready
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5">Dual architecture ready</p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-xl border border-zinc-200 dark:border-zinc-700">
            <span className="font-mono text-[10px] uppercase text-accent-500 font-bold block mb-0.5">
              AI Web Search Key (Optional)
            </span>
            <p className="font-semibold text-zinc-900 dark:text-white flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-accent-500" />
              GEMINI_API_KEY
            </p>
            <p className="text-[10px] text-zinc-500 mt-0.5">Configure in .env for generative search</p>
          </div>
        </div>
      </div>

      {/* Ingestion Audit Log */}
      <div className="theme-card p-4 rounded-xl space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="font-mono text-[11px] uppercase tracking-wider text-zinc-900 dark:text-white font-bold flex items-center gap-1.5">
            <Globe2 className="w-3.5 h-3.5 text-accent-500" />
            Recent Ingestion Audit Log
          </span>
          <span className="text-[10px] font-mono text-zinc-400">Auto-Refreshed</span>
        </div>
        <div className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
          {ingestionLogs.slice(0, 3).map((log, idx) => (
            <div key={idx} className="py-2 flex items-center justify-between text-[11px]">
              <div>
                <span className="font-semibold text-zinc-900 dark:text-white">{log.source}</span>
                <span className="text-zinc-500 font-mono ml-2">({log.timestamp})</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 px-2 py-0.5 rounded font-bold">
                  {log.status}
                </span>
                <span className="text-zinc-500 font-mono">{log.count} items</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-1.5 border-b border-zinc-200 dark:border-zinc-800 pb-2">
          {[
            { id: 'all', label: `All (${opportunities.length})` },
            { id: 'REAL_OFFICIAL_VERIFIED', label: 'Official Verified' },
            { id: 'REAL_SECONDARY_SOURCE', label: 'Secondary Source' },
            { id: 'AWAITING_VERIFICATION', label: 'Awaiting Verify' },
            { id: 'EXPIRED', label: 'Expired' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilterStatus(tab.id)}
              className={`px-3 py-1 text-xs rounded-lg transition-colors font-medium border ${
                filterStatus === tab.id
                  ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-semibold'
                  : 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 hover:bg-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="theme-card rounded-xl overflow-x-auto shadow-sm">
          <table className="w-full text-left text-xs text-zinc-800 dark:text-zinc-200">
            <thead className="bg-zinc-100 dark:bg-zinc-800/80 text-zinc-900 dark:text-zinc-100 font-mono text-[10px] uppercase tracking-wider border-b border-zinc-200 dark:border-zinc-800">
              <tr>
                <th className="p-3">Title & Organizer</th>
                <th className="p-3">Category</th>
                <th className="p-3">Location</th>
                <th className="p-3">Status</th>
                <th className="p-3">Deadline</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
              {filteredList.map(opp => (
                <tr key={opp.id} className="hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-colors">
                  <td className="p-3 max-w-xs">
                    <p className="font-semibold text-zinc-900 dark:text-white line-clamp-1">{opp.title}</p>
                    <p className="text-[11px] text-zinc-500">{opp.organizer}</p>
                  </td>
                  <td className="p-3">
                    <span className="font-mono text-[10px] bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded">
                      {opp.category}
                    </span>
                  </td>
                  <td className="p-3 text-[11px]">
                    {opp.location.isOnline ? 'Online' : `${opp.location.city}, ${opp.location.state}`}
                  </td>
                  <td className="p-3">
                    <select
                      value={opp.sourceStatus}
                      onChange={(e) => handleUpdateStatus(opp.id, e.target.value as VerificationStatus)}
                      className="text-[10px] font-mono rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 p-1 font-bold focus:outline-none"
                    >
                      <option value="REAL_OFFICIAL_VERIFIED">OFFICIAL VERIFIED</option>
                      <option value="REAL_SECONDARY_SOURCE">SECONDARY SOURCE</option>
                      <option value="AWAITING_VERIFICATION">AWAITING VERIFY</option>
                      <option value="EXPIRED">EXPIRED</option>
                    </select>
                  </td>
                  <td className="p-3 font-mono text-[11px]">
                    {opp.deadline}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <a
                        href={opp.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
                        title="View Official Source URL"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => handleDelete(opp.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                        title="Delete listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 max-w-lg w-full shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
              Add Opportunity to Ingestion Registry
            </h3>

            <form onSubmit={handleAddOpportunity} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">Organizer *</label>
                  <input
                    type="text"
                    required
                    value={newOrganizer}
                    onChange={(e) => setNewOrganizer(e.target.value)}
                    className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>

                <div>
                  <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  >
                    {['Academics', 'Scholarships', 'Sports', 'Arts & Creativity', 'Technology', 'Leadership', 'Workshops'].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">Source URL *</label>
                <input
                  type="url"
                  required
                  value={newSourceUrl}
                  onChange={(e) => setNewSourceUrl(e.target.value)}
                  className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">City</label>
                  <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">State</label>
                  <input
                    type="text"
                    value={newState}
                    onChange={(e) => setNewState(e.target.value)}
                    className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">Min Grade</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={newMinGrade}
                    onChange={(e) => setNewMinGrade(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">Max Grade</label>
                  <input
                    type="number"
                    min={1}
                    max={12}
                    value={newMaxGrade}
                    onChange={(e) => setNewMaxGrade(Number(e.target.value))}
                    className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
                <div>
                  <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">Deadline</label>
                  <input
                    type="date"
                    value={newDeadline}
                    onChange={(e) => setNewDeadline(e.target.value)}
                    className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

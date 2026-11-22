'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { TalentRadar } from '@/components/talent/TalentRadar';
import { Achievement, OpportunityCategory } from '@/types';
import { 
  Award, 
  BookOpen, 
  Building2, 
  MapPin, 
  CheckCircle2, 
  Plus, 
  Target, 
  Sparkles,
  MessageSquare,
  Star
} from 'lucide-react';

export default function ProfilePage() {
  const { studentProfile, updateStudentProfile, opportunities, t } = useApp();

  const [showAddAchievementModal, setShowAddAchievementModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<OpportunityCategory>('Academics');
  const [newBadge, setNewBadge] = useState<Achievement['badgeType']>('Curious Mind');
  const [newIssuer, setNewIssuer] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const badges = [
    { type: 'Curious Mind', icon: '🧠' },
    { type: 'Young Innovator', icon: '⚡' },
    { type: 'Rising Athlete', icon: '🏃' },
    { type: 'Creative Explorer', icon: '🎨' },
    { type: 'Community Leader', icon: '🤝' },
    { type: 'First Competition', icon: '🎯' },
  ];

  const handleAddAchievement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAch: Achievement = {
      id: `ach-custom-${Date.now()}`,
      title: newTitle,
      category: newCategory,
      badgeType: newBadge,
      dateEarned: new Date().toISOString().split('T')[0],
      description: newDesc || 'Recorded by student in their verified talent portfolio.',
      issuer: newIssuer || studentProfile.demographics.schoolName,
      isVerifiedByTeacher: false
    };

    updateStudentProfile({
      achievements: [newAch, ...(studentProfile.achievements || [])]
    });

    setNewTitle('');
    setNewDesc('');
    setNewIssuer('');
    setShowAddAchievementModal(false);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Profile Header */}
      <section className="theme-card p-6 sm:p-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b border-zinc-100 dark:border-zinc-800 pb-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-serif font-bold text-2xl sm:text-3xl shadow-sm">
              {studentProfile.demographics.preferredName[0]}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white">
                  {studentProfile.demographics.fullName}
                </h1>
                <span className="badge-clean bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300">
                  Private Profile
                </span>
              </div>
              <p className="text-xs text-zinc-500 mt-1 flex flex-wrap items-center gap-3">
                {studentProfile.demographics.schoolName && (
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                    Class {studentProfile.demographics.grade} • {studentProfile.demographics.schoolName}
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-accent-500" />
                  {studentProfile.demographics.locality || studentProfile.demographics.city}, {studentProfile.demographics.state}
                </span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/onboarding?mode=update"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 flex items-center gap-1.5 transition-colors shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />
              <span>{t.nav.updateTalent}</span>
            </Link>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs">
          <div>
            <span className="font-mono text-[10px] uppercase text-zinc-400 font-bold block mb-1">
              Primary Archetype
            </span>
            <p className="font-serif font-bold text-base text-zinc-900 dark:text-white">
              {studentProfile.analysis.primaryArchetype}
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase text-zinc-400 font-bold block mb-1">
              Career Interests
            </span>
            <p className="font-medium text-zinc-700 dark:text-zinc-300">
              {studentProfile.questionnaire.careerAmbitions?.join(', ') || 'Exploring multiple paths'}
            </p>
          </div>

          <div>
            <span className="font-mono text-[10px] uppercase text-zinc-400 font-bold block mb-1">
              Teacher Rating
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              {studentProfile.teacherPerformanceRating ? (
                <>
                  <Star className="w-4 h-4 fill-amber-500" />
                  <span>{studentProfile.teacherPerformanceRating} / 5 Stars</span>
                </>
              ) : (
                <span className="text-zinc-400 font-normal">Pending educator evaluation</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Teacher Comments & Feedback (if any) */}
      {studentProfile.teacherComments && studentProfile.teacherComments.length > 0 && (
        <section className="theme-card p-6 rounded-2xl border-l-4 border-l-accent-500 space-y-3">
          <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-accent-500" />
            {t.dashboard.teacherFeedback}
          </h3>
          <div className="space-y-3">
            {studentProfile.teacherComments.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/50 text-xs">
                <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed italic text-sm">
                  &ldquo;{c.comment}&rdquo;
                </p>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono mt-2 pt-2 border-t border-zinc-200/50 dark:border-zinc-700/50">
                  <span>Educator: {c.teacherName}</span>
                  <span>{c.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Talent Radar & Comprehensive Breakdown */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-6 theme-card p-6 rounded-2xl flex flex-col items-center justify-center">
          <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white mb-2">
            Verified Talent Radar
          </h3>
          <p className="text-[11px] text-zinc-400 text-center mb-4 font-mono">
            Scores across 7 indicative dimensions
          </p>
          <TalentRadar scores={studentProfile.analysis.scores} size={280} />
        </div>

        <div className="lg:col-span-6 space-y-4">
          <div className="theme-card p-6 rounded-2xl">
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent-500" />
              {t.dashboard.topStrengths}
            </h3>
            <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              {studentProfile.analysis.keyStrengths.map((str, i) => (
                <li key={i} className="flex items-start gap-2 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-lg">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="font-medium">{str}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="theme-card p-6 rounded-2xl">
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
              <Target className="w-4 h-4 text-accent-500" />
              Suggested Constructive Actions
            </h3>
            <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300">
              {studentProfile.analysis.recommendedActivityTypes.map((act, i) => (
                <li key={i} className="flex items-start gap-2 bg-zinc-50 dark:bg-zinc-800/50 p-2.5 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                  <span>{act}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Teacher Mentorship & Performance Review */}
      <section className="theme-card p-6 sm:p-8 rounded-2xl space-y-4 border-l-4 border-l-accent-500">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-accent-500" />
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white">
              {t.dashboard.teacherFeedback}
            </h2>
          </div>
          {studentProfile.teacherPerformanceRating && (
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-full text-xs font-semibold text-amber-700 dark:text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
              <span>Performance: {studentProfile.teacherPerformanceRating} / 5 Stars</span>
            </div>
          )}
        </div>

        {studentProfile.teacherComments && studentProfile.teacherComments.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            {studentProfile.teacherComments.map(c => (
              <div key={c.id} className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/60 text-xs space-y-2">
                <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed italic font-serif">
                  &ldquo;{c.comment}&rdquo;
                </p>
                <div className="flex items-center justify-between text-[11px] text-zinc-400 font-mono pt-1 border-t border-zinc-200 dark:border-zinc-700">
                  <span className="font-semibold text-zinc-600 dark:text-zinc-300">— {c.teacherName}</span>
                  <span>{c.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-zinc-500 italic py-2">
            No mentor comments recorded yet. Comments added by your teachers from the Educator Hub will be archived here.
          </p>
        )}
      </section>

      {/* Badges & Achievements Portfolio */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div>
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-accent-500" />
              Achievements & Milestone Badges
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Certificates, competitions, and recognized school activities.
            </p>
          </div>

          <button
            onClick={() => setShowAddAchievementModal(true)}
            className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Achievement</span>
          </button>
        </div>

        {/* Milestone Badges Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {badges.map((b, idx) => {
            const isEarned = studentProfile.achievements?.some(a => a.badgeType === b.type);
            return (
              <div 
                key={idx}
                className={`p-3 rounded-xl border text-center transition-all ${
                  isEarned 
                    ? 'bg-zinc-100 dark:bg-zinc-800 border-zinc-300 dark:border-zinc-700 shadow-sm font-semibold' 
                    : 'bg-zinc-50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 opacity-40 grayscale'
                }`}
              >
                <div className="text-2xl mb-1">{b.icon}</div>
                <p className="text-[11px] font-bold text-zinc-900 dark:text-white leading-tight">{b.type}</p>
                <span className="text-[9px] font-mono mt-1 block uppercase text-zinc-500">
                  {isEarned ? 'Unlocked' : 'In Progress'}
                </span>
              </div>
            );
          })}
        </div>

        {/* Achievements List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          {studentProfile.achievements?.map(ach => (
            <div key={ach.id} className="theme-card p-4 rounded-xl space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="badge-clean bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-mono text-[9px]">
                    {ach.badgeType}
                  </span>
                  <h4 className="font-serif font-bold text-base text-zinc-900 dark:text-white mt-1">
                    {ach.title}
                  </h4>
                </div>
                {ach.isVerifiedByTeacher ? (
                  <span className="text-[10px] font-mono font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Verified
                  </span>
                ) : (
                  <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                    Logged
                  </span>
                )}
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {ach.description}
              </p>

              <div className="flex items-center justify-between text-[11px] text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800 font-mono">
                <span>Issuer: {ach.issuer}</span>
                <span>{ach.dateEarned}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Add Achievement Modal */}
      {showAddAchievementModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <h3 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
              Record Achievement / Award
            </h3>

            <form onSubmit={handleAddAchievement} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. 1st Place Inter-School Essay Contest"
                  className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
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

                <div>
                  <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">Badge</label>
                  <select
                    value={newBadge}
                    onChange={(e) => setNewBadge(e.target.value as any)}
                    className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100"
                  >
                    {badges.map(b => (
                      <option key={b.type} value={b.type}>{b.type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">Issuing School / Org</label>
                <input
                  type="text"
                  value={newIssuer}
                  onChange={(e) => setNewIssuer(e.target.value)}
                  placeholder="e.g. Science Club"
                  className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  placeholder="Details of performance..."
                  className="w-full p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setShowAddAchievementModal(false)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

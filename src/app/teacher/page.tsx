'use client';

import React, { useState, useEffect } from 'react';
import { useApp } from '@/context/AppContext';
import { TalentRadar } from '@/components/talent/TalentRadar';
import { StudentProfile } from '@/types';
import { 
  Users, 
  Send, 
  Building2, 
  CheckCircle2, 
  MessageSquare,
  Star,
  Save,
  GraduationCap
} from 'lucide-react';

export default function TeacherPage() {
  const { 
    opportunities, 
    registeredStudents, 
    currentUser, 
    recommendOpportunityToStudent, 
    updateStudentPerformance,
    addTeacherComment,
    t 
  } = useApp();

  const [selectedStudentId, setSelectedStudentId] = useState<string>(registeredStudents[0]?.id || '');
  const [recommendOppId, setRecommendOppId] = useState<string>(opportunities[0]?.id || '');
  const [recommendMessage, setRecommendMessage] = useState('');
  const [recommendSuccess, setRecommendSuccess] = useState(false);

  // Performance rating & comment states
  const [newComment, setNewComment] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);
  const [rating, setRating] = useState<number>(5);
  const [performanceSuccess, setPerformanceSuccess] = useState(false);

  useEffect(() => {
    if (!selectedStudentId && registeredStudents.length > 0) {
      setSelectedStudentId(registeredStudents[0].id);
    }
  }, [registeredStudents, selectedStudentId]);

  const activeStudent: StudentProfile | undefined = registeredStudents.find(s => s.id === selectedStudentId) || registeredStudents[0];

  useEffect(() => {
    if (activeStudent) {
      setRating(activeStudent.teacherPerformanceRating || 5);
    }
  }, [activeStudent?.id, activeStudent?.teacherPerformanceRating]);

  const handleRecommendOpportunity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStudent || !recommendOppId) return;

    recommendOpportunityToStudent(activeStudent.id, recommendOppId, recommendMessage);
    setRecommendSuccess(true);
    setRecommendMessage('');
    setTimeout(() => setRecommendSuccess(false), 3500);
  };

  const handlePostComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStudent || !newComment.trim()) return;

    addTeacherComment(activeStudent.id, newComment, rating);
    setCommentSuccess(true);
    setNewComment('');
    setTimeout(() => setCommentSuccess(false), 3500);
  };

  const handleSavePerformance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeStudent) return;

    updateStudentPerformance(activeStudent.id, {}, rating);
    setPerformanceSuccess(true);
    setTimeout(() => setPerformanceSuccess(false), 3500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Teacher Portal Banner */}
      <div className="theme-card p-6 sm:p-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="badge-clean bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold">
                Educator Hub & Classroom
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                • {registeredStudents.length} Students Enrolled
              </span>
            </div>
            <h1 className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">
              {currentUser?.name || 'Educator Portal'}
            </h1>
            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
              <Building2 className="w-3.5 h-3.5 text-zinc-400" />
              <span>{t.teacher.subtitle}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Classroom Enrolled Students Roster */}
      <section className="space-y-4">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-2 flex items-center justify-between">
          <div>
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
              <Users className="w-4 h-4 text-accent-500" />
              {t.teacher.rosterTitle}
            </h3>
            <p className="text-xs text-zinc-500">{t.teacher.rosterSubtitle}</p>
          </div>
          <span className="text-xs font-mono text-zinc-400">
            {registeredStudents.length} student{registeredStudents.length === 1 ? '' : 's'} registered
          </span>
        </div>

        {registeredStudents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {registeredStudents.map(st => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedStudentId(st.id)}
                className={`p-4 rounded-xl text-left border transition-all ${
                  activeStudent?.id === st.id
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-md font-semibold'
                    : 'theme-card text-zinc-800 dark:text-zinc-200 hover:border-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm">{st.demographics.fullName}</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200">
                    Class {st.demographics.grade}
                  </span>
                </div>
                <p className="text-[11px] font-serif italic mt-0.5 opacity-80">{st.analysis.primaryArchetype}</p>
                <p className="text-[10px] font-mono mt-2 opacity-60">
                  {st.demographics.locality ? `${st.demographics.locality}, ` : ''}{st.demographics.city}
                </p>
              </button>
            ))}
          </div>
        ) : (
          <div className="theme-card p-8 rounded-xl text-center text-zinc-500 space-y-2">
            <p className="font-bold">{t.teacher.noStudentsRegistered}</p>
            <p className="text-xs">{t.teacher.noStudentsDesc}</p>
          </div>
        )}
      </section>

      {/* Selected Student Deep Dive & Actions */}
      {activeStudent && (
        <div className="space-y-8">
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Student Radar */}
            <div className="lg:col-span-5 theme-card p-6 rounded-2xl flex flex-col items-center justify-center">
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white mb-2">
                {activeStudent.demographics.preferredName}&apos;s Talent Radar
              </h3>
              <TalentRadar scores={activeStudent.analysis.scores} size={260} />
            </div>

            {/* Strengths & Overview */}
            <div className="lg:col-span-7 theme-card p-6 rounded-2xl space-y-4">
              <div>
                <h4 className="font-serif font-bold text-xl text-zinc-900 dark:text-white">
                  {activeStudent.demographics.fullName}
                </h4>
                <p className="text-xs text-zinc-500">
                  {activeStudent.demographics.schoolName} • Class {activeStudent.demographics.grade}
                </p>
              </div>

              <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed bg-zinc-50 dark:bg-zinc-800/50 p-3 rounded-lg italic font-serif">
                &ldquo;{activeStudent.analysis.narrativeSummary}&rdquo;
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase text-zinc-500 font-bold block mb-1">
                    Prominent Strengths:
                  </span>
                  <ul className="space-y-1">
                    {activeStudent.analysis.keyStrengths.map((str, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-[11px] text-zinc-700 dark:text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{str}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <span className="font-mono text-[10px] uppercase text-accent-500 font-bold block mb-1">
                    Mentorship Focus:
                  </span>
                  <ul className="space-y-1">
                    {activeStudent.analysis.developmentAreas.map((dev, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-[11px] text-zinc-700 dark:text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent-500 shrink-0" />
                        <span>{dev}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Form 1: Recommend Opportunity Directly to Student */}
          <section className="theme-card p-6 rounded-2xl space-y-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white flex items-center gap-2">
                <Send className="w-4 h-4 text-accent-500" />
                {t.teacher.recommendTitle} ({activeStudent.demographics.preferredName})
              </h3>
              <p className="text-xs text-zinc-500">
                {t.teacher.recommendSubtitle}
              </p>
            </div>

            <form onSubmit={handleRecommendOpportunity} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                    {t.teacher.selectOpportunity} *
                  </label>
                  <select
                    value={recommendOppId}
                    onChange={(e) => setRecommendOppId(e.target.value)}
                    className="w-full p-2.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                  >
                    {opportunities.map(opp => (
                      <option key={opp.id} value={opp.id}>
                        [{opp.category}] {opp.title} ({opp.location.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                    {t.teacher.teacherNote}
                  </label>
                  <input
                    type="text"
                    value={recommendMessage}
                    onChange={(e) => setRecommendMessage(e.target.value)}
                    placeholder="e.g. Your physics project would be great for this competition!"
                    className="w-full p-2.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                {recommendSuccess && (
                  <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Recommended! Will now display prominently on {activeStudent.demographics.preferredName}&apos;s opportunities page.
                  </span>
                )}
                <button
                  type="submit"
                  className="ml-auto px-5 py-2.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Send className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />
                  <span>{t.teacher.sendRecommendation}</span>
                </button>
              </div>
            </form>
          </section>

          {/* Form 2: Leave Mentor Comment & Performance Rating */}
          <section className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Add Comment Form */}
            <div className="theme-card p-6 rounded-2xl space-y-4">
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent-500" />
                {t.teacher.addCommentTitle}
              </h3>
              <form onSubmit={handlePostComment} className="space-y-3 text-xs">
                <textarea
                  rows={3}
                  required
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={t.teacher.commentPlaceholder}
                  className="w-full p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                />

                <div className="flex items-center justify-between">
                  {commentSuccess && (
                    <span className="text-xs text-emerald-500 font-mono">Comment posted to student portfolio!</span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                  >
                    {t.teacher.saveComment}
                  </button>
                </div>
              </form>
            </div>

            {/* Performance Score Update Form */}
            <div className="theme-card p-6 rounded-2xl space-y-4">
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-500" />
                {t.teacher.updatePerformanceTitle}
              </h3>
              <form onSubmit={handleSavePerformance} className="space-y-3 text-xs">
                <div>
                  <label className="text-zinc-700 dark:text-zinc-300 block mb-1">
                    {t.teacher.performanceRatingLabel}
                  </label>
                  <div className="flex items-center gap-2 pt-1">
                    {[1, 2, 3, 4, 5].map(st => (
                      <button
                        key={st}
                        type="button"
                        onClick={() => setRating(st)}
                        className={`p-2 rounded-lg border text-sm transition-all ${
                          rating >= st
                            ? 'bg-amber-100 dark:bg-amber-950/50 border-amber-300 dark:border-amber-700 text-amber-600'
                            : 'bg-zinc-100 dark:bg-zinc-800 border-zinc-200 dark:border-zinc-700 text-zinc-400'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                    <span className="font-mono text-zinc-500 text-xs ml-2">({rating} of 5 Stars)</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4">
                  {performanceSuccess && (
                    <span className="text-xs text-emerald-500 font-mono">Performance rating saved!</span>
                  )}
                  <button
                    type="submit"
                    className="ml-auto px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900"
                  >
                    {t.teacher.savePerformance}
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Active Student Recommendations & Comments Archive */}
          {((activeStudent.teacherRecommendations && activeStudent.teacherRecommendations.length > 0) || 
            (activeStudent.teacherComments && activeStudent.teacherComments.length > 0)) && (
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {/* Recommendations for this student */}
              <div className="theme-card p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                    <Send className="w-3.5 h-3.5 text-accent-500" />
                    Recommendations Sent to {activeStudent.demographics.preferredName} ({activeStudent.teacherRecommendations?.length || 0})
                  </h4>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {activeStudent.teacherRecommendations?.map(rec => {
                    const opp = opportunities.find(o => o.id === rec.opportunityId);
                    return (
                      <div key={rec.id} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-zinc-900 dark:text-zinc-100">{opp?.title || rec.opportunityId}</p>
                          <span className="text-[10px] font-mono text-zinc-400">{rec.date}</span>
                        </div>
                        {rec.note && (
                          <p className="text-[11px] text-zinc-600 dark:text-zinc-400 italic font-serif">
                            &ldquo;{rec.note}&rdquo;
                          </p>
                        )}
                        <p className="text-[10px] text-zinc-400 font-mono">— Recommended by {rec.teacherName}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Comments for this student */}
              <div className="theme-card p-5 rounded-2xl space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-accent-500" />
                    Mentor Comments for {activeStudent.demographics.preferredName} ({activeStudent.teacherComments?.length || 0})
                  </h4>
                </div>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {activeStudent.teacherComments?.map(comm => (
                    <div key={comm.id} className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">— {comm.teacherName}</span>
                        <span className="text-[10px] font-mono text-zinc-400">{comm.createdAt}</span>
                      </div>
                      <p className="text-[11px] text-zinc-800 dark:text-zinc-200 italic font-serif">
                        &ldquo;{comm.comment}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}

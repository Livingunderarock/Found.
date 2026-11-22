'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { filterAndRankOpportunities } from '@/lib/matching';
import { TalentRadar } from '@/components/talent/TalentRadar';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { OpportunityModal } from '@/components/opportunities/OpportunityModal';
import { Opportunity } from '@/types';
import { 
  Sparkles, 
  MapPin, 
  Award, 
  Calendar, 
  Bookmark, 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Clock, 
  BookOpen, 
  Target,
  GraduationCap,
  MessageSquare
} from 'lucide-react';

export default function DashboardPage() {
  const { studentProfile, opportunities, t } = useApp();
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);

  // Derive ranked opportunities
  const allRanked = filterAndRankOpportunities(opportunities, studentProfile);

  const localRanked = allRanked.filter(r => r.locationScope === 'local_area' || r.locationScope === 'city');
  const nationalRanked = allRanked.filter(r => r.locationScope === 'state' || r.locationScope === 'national');
  const savedList = opportunities.filter(o => studentProfile.savedOpportunityIds.includes(o.id));

  const sortedUpcoming = [...opportunities]
    .filter(o => new Date(o.deadline) >= new Date())
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 3);

  const teacherRecCount = studentProfile.teacherRecommendations?.length || 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Teacher Recommendation Notice Alert if present */}
      {teacherRecCount > 0 && (
        <div className="p-4 rounded-xl bg-accent-50 dark:bg-accent-950/40 border border-accent-200 dark:border-accent-800/60 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-accent-500 text-white flex items-center justify-center shrink-0">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-xs text-accent-900 dark:text-accent-100">
                {t.dashboard.teacherRecommended} ({teacherRecCount})
              </p>
              <p className="text-[11px] text-accent-800/80 dark:text-accent-300/80">
                Your educator recommended specific competitions and grants for your profile.
              </p>
            </div>
          </div>
          <Link
            href="/opportunities"
            className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold whitespace-nowrap shadow-sm hover:opacity-90"
          >
            View Recommendations
          </Link>
        </div>
      )}

      {/* Top Welcome Card */}
      <section className="theme-card p-6 sm:p-8 rounded-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="badge-clean bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                Class {studentProfile.demographics.grade} Student
              </span>
              <span className="badge-clean bg-accent-50 text-accent-700 border border-accent-200 dark:bg-accent-950/40 dark:text-accent-300 dark:border-accent-800/50 font-bold">
                {studentProfile.analysis.primaryArchetype}
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
              {studentProfile.demographics.preferredName || studentProfile.demographics.fullName || 'Student'}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-400">
              {studentProfile.demographics.schoolName && (
                <span className="flex items-center gap-1 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-zinc-400" />
                  {studentProfile.demographics.schoolName}
                </span>
              )}
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-accent-500" />
                {studentProfile.demographics.locality || studentProfile.demographics.city}, {studentProfile.demographics.state}
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 w-full md:w-auto">
            <Link
              href="/onboarding?mode=update"
              className="px-4 py-2.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <BookOpen className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />
              <span>{t.nav.updateTalent}</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Talent Map & Narrative Summary Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Radar Chart */}
        <div className="lg:col-span-5 theme-card p-6 rounded-2xl flex flex-col items-center justify-center">
          <div className="w-full flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
              {t.dashboard.myTalentMap}
            </h3>
            <span className="text-[10px] font-mono text-accent-500 font-semibold uppercase">
              7 Dimensions
            </span>
          </div>

          <TalentRadar scores={studentProfile.analysis.scores} size={280} />

          <p className="text-[11px] text-zinc-400 text-center font-mono mt-3">
            Indicative curiosity scores derived from your questionnaire responses.
          </p>
        </div>

        {/* Right: Personal Insights, Strengths & Growth Areas */}
        <div className="lg:col-span-7 space-y-6">
          <div className="theme-card p-6 rounded-2xl border-l-4 border-l-zinc-900 dark:border-l-white">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-500 font-bold block mb-1">
              Personalized Talent Summary
            </span>
            <p className="font-serif text-base text-zinc-800 dark:text-zinc-200 leading-relaxed italic mb-4">
              &ldquo;{studentProfile.analysis.narrativeSummary}&rdquo;
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-zinc-100 dark:border-zinc-800 pt-4">
              {/* Strengths */}
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-900 dark:text-white font-bold mb-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                  {t.dashboard.topStrengths}
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                  {studentProfile.analysis.keyStrengths.map((str, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white mt-1.5 shrink-0" />
                      <span>{str}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Growth Areas */}
              <div>
                <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent-500 font-bold mb-2 flex items-center gap-1.5">
                  <TrendingUp className="w-3.5 h-3.5 text-accent-500" />
                  {t.dashboard.growthAreas}
                </h4>
                <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
                  {studentProfile.analysis.developmentAreas.map((dev, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent-500 mt-1.5 shrink-0" />
                      <span>{dev}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Teacher Remarks if any */}
          {studentProfile.teacherComments && studentProfile.teacherComments.length > 0 && (
            <div className="theme-card p-5 rounded-2xl space-y-2 border-l-4 border-l-accent-500">
              <h4 className="font-serif font-bold text-sm text-zinc-900 dark:text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-accent-500" />
                {t.dashboard.teacherFeedback}
              </h4>
              <div className="space-y-2">
                {studentProfile.teacherComments.map(c => (
                  <div key={c.id} className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/50 text-xs">
                    <p className="text-zinc-800 dark:text-zinc-200 leading-relaxed italic">
                      &ldquo;{c.comment}&rdquo;
                    </p>
                    <p className="text-[10px] text-zinc-400 mt-1 font-mono">
                      — {c.teacherName} ({c.createdAt})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Goals Tracker */}
          <div className="theme-card p-5 rounded-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-accent-500" />
                Personal Academic & Talent Goals
              </h3>
            </div>
            <div className="space-y-2">
              {studentProfile.goals?.map(g => (
                <div key={g.id} className="flex items-center justify-between p-2.5 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className={`w-3.5 h-3.5 ${g.isCompleted ? 'text-emerald-500' : 'text-zinc-400'}`} />
                    <span className={g.isCompleted ? 'line-through text-zinc-400' : 'font-medium text-zinc-900 dark:text-zinc-100'}>
                      {g.title}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-400">Target: {g.targetDate}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Recommended Opportunities: Local Proximity First */}
      <section className="space-y-4">
        <div className="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-500 font-bold">
              Proximity Matched
            </span>
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
              {t.dashboard.localOpportunities}
            </h2>
            <p className="text-xs text-zinc-500 mt-0.5">
              Verified competitions near {studentProfile.demographics.locality || studentProfile.demographics.city}.
            </p>
          </div>

          <Link
            href="/opportunities"
            className="text-xs font-semibold text-zinc-900 dark:text-white hover:text-accent-500 flex items-center gap-1 transition-colors"
          >
            <span>{t.dashboard.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {localRanked.slice(0, 3).map(res => (
            <OpportunityCard
              key={res.opportunity.id}
              matchResult={res}
              onOpenDetails={setSelectedOpportunity}
            />
          ))}
        </div>
      </section>

      {/* State & National Opportunities */}
      <section className="space-y-4">
        <div className="flex items-end justify-between border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold">
              State & National
            </span>
            <h2 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
              {t.dashboard.nationalOpportunities}
            </h2>
          </div>

          <Link
            href="/opportunities"
            className="text-xs font-semibold text-zinc-900 dark:text-white hover:text-accent-500 flex items-center gap-1 transition-colors"
          >
            <span>{t.dashboard.viewAll}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {nationalRanked.slice(0, 3).map(res => (
            <OpportunityCard
              key={res.opportunity.id}
              matchResult={res}
              onOpenDetails={setSelectedOpportunity}
            />
          ))}
        </div>
      </section>

      {/* Bottom Grid: Saved & Closing Deadlines */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 border-t border-zinc-200 dark:border-zinc-800 pt-8">
        <div className="theme-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
              <Bookmark className="w-4 h-4 text-accent-500" />
              {t.dashboard.savedOpportunities} ({savedList.length})
            </h3>
            <Link href="/opportunities" className="text-xs text-zinc-500 hover:underline">
              Browse More
            </Link>
          </div>

          {savedList.length > 0 ? (
            <div className="space-y-3">
              {savedList.map(opp => (
                <div 
                  key={opp.id}
                  onClick={() => setSelectedOpportunity(opp)}
                  className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg hover:border-zinc-400 cursor-pointer transition-colors flex items-center justify-between gap-3 text-xs"
                >
                  <div className="overflow-hidden">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{opp.title}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{opp.organizer} • {opp.location.city}</p>
                  </div>
                  <span className="text-[10px] font-mono text-accent-500 font-bold shrink-0">
                    Due {opp.deadline}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-zinc-400 py-4 text-center italic">
              No saved opportunities yet. Click the bookmark icon on any card to save it here.
            </p>
          )}
        </div>

        <div className="theme-card p-5 rounded-2xl">
          <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-2">
            <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-zinc-400" />
              {t.dashboard.upcomingDeadlines}
            </h3>
            <span className="text-xs text-zinc-400 font-mono">Live</span>
          </div>

          <div className="space-y-3">
            {sortedUpcoming.map(opp => (
              <div 
                key={opp.id}
                onClick={() => setSelectedOpportunity(opp)}
                className="p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg hover:border-zinc-400 cursor-pointer transition-colors flex items-center justify-between gap-3 text-xs"
              >
                <div className="overflow-hidden">
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100 truncate">{opp.title}</p>
                  <p className="text-[11px] text-zinc-500">{t.options[opp.category] || opp.category} • {opp.location.city}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-zinc-900 dark:text-zinc-100 block">
                    {new Date(opp.deadline).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunity Detail Modal */}
      <OpportunityModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />
    </div>
  );
}

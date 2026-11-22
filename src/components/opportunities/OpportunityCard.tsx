'use client';

import React from 'react';
import { Opportunity, OpportunityMatchResult, VerificationStatus } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  Calendar, 
  MapPin, 
  Building2, 
  CheckCircle2, 
  ShieldCheck, 
  Bookmark, 
  ArrowUpRight, 
  Sparkles,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';

interface OpportunityCardProps {
  matchResult: OpportunityMatchResult;
  onOpenDetails: (opportunity: Opportunity) => void;
}

export function OpportunityCard({ matchResult, onOpenDetails }: OpportunityCardProps) {
  const { opportunity, matchScore, distanceKm, isTeacherRecommended, teacherRecommendationNote, reasons } = matchResult;
  const { toggleSaveOpportunity, isOpportunitySaved, t } = useApp();

  const isSaved = isOpportunitySaved(opportunity.id);

  const getStatusBadge = (status: VerificationStatus) => {
    switch (status) {
      case 'REAL_OFFICIAL_VERIFIED':
        return (
          <span className="badge-clean bg-emerald-50 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800/50 flex items-center gap-1 font-semibold">
            <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600 dark:text-emerald-400" />
            {t.status.verified}
          </span>
        );
      case 'REAL_SECONDARY_SOURCE':
        return (
          <span className="badge-clean bg-indigo-50 text-indigo-800 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800/50 flex items-center gap-1 font-semibold">
            <ShieldCheck className="w-2.5 h-2.5 text-indigo-600 dark:text-indigo-400" />
            {t.status.secondary}
          </span>
        );
      case 'AWAITING_VERIFICATION':
        return (
          <span className="badge-clean bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800/50 flex items-center gap-1 font-semibold">
            <AlertTriangle className="w-2.5 h-2.5 text-amber-600" />
            {t.status.awaiting}
          </span>
        );
      case 'EXPIRED':
        return (
          <span className="badge-clean bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800/50 flex items-center gap-1 font-semibold">
            {t.status.expired}
          </span>
        );
      case 'DEMO_DATA':
      default:
        return (
          <span className="badge-clean bg-zinc-100 text-zinc-700 border border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700 flex items-center gap-1 font-semibold">
            {t.status.demo}
          </span>
        );
    }
  };

  const formattedDeadline = new Date(opportunity.deadline).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  });

  return (
    <div className={`theme-card rounded-lg p-5 flex flex-col justify-between relative group ${
      isTeacherRecommended ? 'ring-2 ring-accent-500/40 dark:ring-accent-400/40' : ''
    }`}>
      <div>
        {/* Teacher Recommended Spotlight Banner if recommended */}
        {isTeacherRecommended && (
          <div className="mb-3 p-2.5 rounded bg-accent-50 dark:bg-accent-950/50 border border-accent-200 dark:border-accent-800/60 text-xs">
            <div className="flex items-center gap-1.5 font-bold text-accent-700 dark:text-accent-300 text-[11px] uppercase tracking-wider">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t.dashboard.teacherRecommended}</span>
            </div>
            {teacherRecommendationNote && (
              <p className="text-[11px] text-accent-900/80 dark:text-accent-200/80 mt-1 italic">
                &ldquo;{teacherRecommendationNote}&rdquo;
              </p>
            )}
          </div>
        )}

        {/* Top Badges & Match % */}
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
              {t.options[opportunity.category] || opportunity.category}
            </span>
            {getStatusBadge(opportunity.sourceStatus)}
          </div>

          <div className="flex items-center gap-1 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-2 py-0.5 rounded text-xs font-mono font-bold shrink-0">
            <Sparkles className="w-3 h-3 text-accent-400 dark:text-accent-600" />
            <span>{matchScore}%</span>
          </div>
        </div>

        {/* Title */}
        <h3 
          onClick={() => onOpenDetails(opportunity)}
          className="font-serif font-bold text-lg text-zinc-900 dark:text-zinc-100 hover:text-accent-600 dark:hover:text-accent-400 cursor-pointer transition-colors leading-snug mb-1"
        >
          {opportunity.title}
        </h3>

        {opportunity.subtitle && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 italic mb-3 line-clamp-1">
            {opportunity.subtitle}
          </p>
        )}

        {/* Organizer */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-600 dark:text-zinc-300 mb-3">
          <Building2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
          <span className="font-medium truncate">{opportunity.organizer}</span>
        </div>

        {/* Location & Proximity */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 mb-3 bg-zinc-50 dark:bg-zinc-900/80 p-2 rounded border border-zinc-200 dark:border-zinc-800">
          <MapPin className="w-3.5 h-3.5 text-accent-500 shrink-0" />
          <div className="flex items-center gap-1.5 overflow-hidden text-ellipsis whitespace-nowrap">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {opportunity.location.isOnline 
                ? 'Online / Pan-India' 
                : `${opportunity.location.locality ? `${opportunity.location.locality}, ` : ''}${opportunity.location.city}, ${opportunity.location.state}`}
            </span>
            {distanceKm !== undefined && (
              <span className="text-[10px] font-mono bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 px-1.5 py-0.2 rounded font-bold">
                {distanceKm} km
              </span>
            )}
          </div>
        </div>

        {/* Match Reason Snippet */}
        {reasons && reasons.length > 0 && (
          <div className="mb-3 text-[11px] text-zinc-700 dark:text-zinc-300 bg-zinc-100/70 dark:bg-zinc-800/50 p-2 rounded border-l-2 border-accent-500">
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">Why for you: </span>
            <span>{reasons[0]}</span>
          </div>
        )}

        {/* Eligibility & Benefits Summary */}
        <div className="space-y-1 mb-4 text-xs text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-2.5">
          <div className="flex justify-between items-center text-[11px]">
            <span>{t.opportunities.eligibility}:</span>
            <span className="font-medium text-zinc-900 dark:text-zinc-100">Classes {opportunity.minGrade} – {opportunity.maxGrade}</span>
          </div>
          {opportunity.prizesOrBenefits && (
            <div className="flex justify-between items-start text-[11px] gap-2">
              <span className="shrink-0">Benefits:</span>
              <span className="font-medium text-accent-600 dark:text-accent-400 text-right truncate">{opportunity.prizesOrBenefits}</span>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Footer: Deadline & Actions */}
      <div className="border-t border-zinc-200 dark:border-zinc-800 pt-3 flex items-center justify-between gap-2">
        <div className="flex items-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 font-mono">
          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
          <span>Due: <strong className="text-zinc-900 dark:text-zinc-100">{formattedDeadline}</strong></span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => toggleSaveOpportunity(opportunity.id)}
            className={`p-1.5 rounded border transition-colors ${
              isSaved 
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900' 
                : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
            title={isSaved ? 'Saved' : 'Save'}
          >
            <Bookmark className="w-3.5 h-3.5" fill={isSaved ? 'currentColor' : 'none'} />
          </button>

          <button
            onClick={() => onOpenDetails(opportunity)}
            className="px-2.5 py-1 text-xs font-semibold rounded bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 transition-colors"
          >
            Details
          </button>

          <a
            href={opportunity.registrationUrl || opportunity.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1 text-xs font-semibold rounded bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 flex items-center gap-1 transition-colors shadow-sm"
          >
            <span>Apply</span>
            <ArrowUpRight className="w-3 h-3 text-accent-400 dark:text-accent-600" />
          </a>
        </div>
      </div>
    </div>
  );
}

'use client';

import React from 'react';
import { Opportunity } from '@/types';
import { useApp } from '@/context/AppContext';
import { 
  X, 
  Building2, 
  MapPin, 
  Calendar, 
  Award, 
  FileText, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Bookmark
} from 'lucide-react';

interface OpportunityModalProps {
  opportunity: Opportunity | null;
  onClose: () => void;
}

export function OpportunityModal({ opportunity, onClose }: OpportunityModalProps) {
  const { toggleSaveOpportunity, isOpportunitySaved, t } = useApp();

  if (!opportunity) return null;

  const isSaved = isOpportunitySaved(opportunity.id);

  const formattedDeadline = new Date(opportunity.deadline).toLocaleDateString('en-IN', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  const formattedStartDate = new Date(opportunity.eventStartDate).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div 
        className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="bg-zinc-900 dark:bg-black text-white p-5 sm:p-6 flex items-start justify-between gap-4 border-b border-zinc-800">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase bg-accent-600 text-white px-2 py-0.5 rounded font-bold">
                {t.options[opportunity.category] || opportunity.category}
              </span>
              <span className="text-[10px] font-mono uppercase bg-zinc-800 text-zinc-300 px-2 py-0.5 rounded border border-zinc-700">
                {opportunity.sourceStatus.replace(/_/g, ' ')}
              </span>
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-white leading-tight">
              {opportunity.title}
            </h2>
            <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1.5 font-medium">
              <Building2 className="w-3.5 h-3.5 text-accent-400" />
              {opportunity.organizer}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 text-xs text-zinc-700 dark:text-zinc-300">
          {opportunity.subtitle && (
            <p className="font-serif italic text-sm text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800/60 p-3 rounded border-l-2 border-accent-500">
              &ldquo;{opportunity.subtitle}&rdquo;
            </p>
          )}

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-accent-600 dark:text-accent-400 font-bold mb-1.5">
              About This Opportunity
            </h4>
            <p className="leading-relaxed text-zinc-800 dark:text-zinc-200 text-sm">
              {opportunity.description}
            </p>
          </div>

          <div className="bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-lg p-4 space-y-2.5">
            <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              Eligibility Criteria
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">Class / Grade Eligibility:</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  Classes {opportunity.minGrade} to {opportunity.maxGrade}
                </span>
              </div>
              <div>
                <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">Age Requirement:</span>
                <span className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {opportunity.minAge ? `${opportunity.minAge} – ${opportunity.maxAge} years` : 'Open based on school grade level'}
                </span>
              </div>
              <div className="sm:col-span-2">
                <span className="text-zinc-500 dark:text-zinc-400 block text-[11px]">Detailed Criteria:</span>
                <span className="text-zinc-800 dark:text-zinc-200 font-medium">
                  {opportunity.eligibilityDescription}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
              <span className="font-mono text-[10px] uppercase text-zinc-500 dark:text-zinc-400 font-bold block mb-1 flex items-center gap-1">
                <MapPin className="w-3 h-3 text-accent-500" />
                Geographic Venue
              </span>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                {opportunity.location.isOnline ? 'Online / Remote Participation' : opportunity.location.city}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                {opportunity.location.address || `${opportunity.location.district}, ${opportunity.location.state}`}
              </p>
            </div>

            <div className="bg-zinc-50 dark:bg-zinc-800/30 border border-zinc-200 dark:border-zinc-800 rounded-lg p-3">
              <span className="font-mono text-[10px] uppercase text-zinc-500 dark:text-zinc-400 font-bold block mb-1 flex items-center gap-1">
                <Calendar className="w-3 h-3 text-zinc-400" />
                Important Timeline
              </span>
              <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                Deadline: {formattedDeadline}
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                Event Starts: {formattedStartDate}
              </p>
            </div>
          </div>

          {opportunity.requiredDocuments && opportunity.requiredDocuments.length > 0 && (
            <div>
              <h4 className="font-mono text-[11px] uppercase tracking-wider text-zinc-900 dark:text-zinc-100 font-bold mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-zinc-400" />
                Required Documents Checklist
              </h4>
              <ul className="space-y-1.5">
                {opportunity.requiredDocuments.map((doc, idx) => (
                  <li key={idx} className="flex items-center gap-2 text-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-500"></span>
                    <span>{doc}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700 rounded-lg p-3 text-[11px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                Source Verification Record
              </span>
              <span className="font-mono text-[10px] text-zinc-500">
                Checked on: {opportunity.lastChecked}
              </span>
            </div>
            <p className="text-zinc-600 dark:text-zinc-400">
              Official URL:{' '}
              <a 
                href={opportunity.sourceUrl} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="underline hover:text-accent-500 font-mono break-all"
              >
                {opportunity.sourceUrl}
              </a>
            </p>
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="bg-zinc-50 dark:bg-zinc-900/90 border-t border-zinc-200 dark:border-zinc-800 p-4 sm:px-6 flex items-center justify-between gap-3">
          <button
            onClick={() => toggleSaveOpportunity(opportunity.id)}
            className={`px-3 py-2 rounded text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
              isSaved
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900'
                : 'bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-700'
            }`}
          >
            <Bookmark className="w-4 h-4" fill={isSaved ? 'currentColor' : 'none'} />
            <span>{isSaved ? 'Saved in Portfolio' : 'Save to Portfolio'}</span>
          </button>

          <a
            href={opportunity.registrationUrl || opportunity.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2 rounded text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 flex items-center gap-2 transition-colors shadow-sm"
          >
            <span>Register on Official Portal</span>
            <ExternalLink className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />
          </a>
        </div>
      </div>
    </div>
  );
}

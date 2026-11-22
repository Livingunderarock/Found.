'use client';

import React, { useState } from 'react';
import { useApp } from '@/context/AppContext';
import { filterAndRankOpportunities } from '@/lib/matching';
import { OpportunityCard } from '@/components/opportunities/OpportunityCard';
import { OpportunityModal } from '@/components/opportunities/OpportunityModal';
import { LocationFilter } from '@/components/opportunities/LocationFilter';
import { Opportunity, OpportunityCategory } from '@/types';
import { 
  Search, 
  MapPin, 
  ShieldCheck, 
  RefreshCw, 
  ChevronDown,
  ArrowUpDown,
  GraduationCap
} from 'lucide-react';

export default function OpportunitiesPage() {
  const { 
    opportunities, 
    studentProfile, 
    t, 
    activeLocationFilter, 
    setActiveLocationFilter,
    refreshOpportunities,
    isRefreshing
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedScope, setSelectedScope] = useState<any>('all');
  const [selectedRadius, setSelectedRadius] = useState<number>(50);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [freeOnly, setFreeOnly] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState<number | 'all'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'nearest' | 'deadline' | 'recent'>('match');

  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null);
  const [showLocationDrawer, setShowLocationDrawer] = useState(false);

  const categories: (OpportunityCategory | 'All')[] = [
    'All',
    'Academics',
    'Scholarships',
    'Sports',
    'Arts & Creativity',
    'Technology',
    'Leadership',
    'Workshops'
  ];

  let rankedResults = filterAndRankOpportunities(opportunities, studentProfile, {
    category: selectedCategory,
    scope: selectedScope,
    maxRadiusKm: selectedRadius,
    verifiedOnly,
    freeOnly,
    searchQuery,
    targetLocation: {
      state: activeLocationFilter.state,
      city: activeLocationFilter.city,
      locality: activeLocationFilter.locality,
      coordinates: activeLocationFilter.coordinates
    }
  });

  if (selectedGrade !== 'all') {
    rankedResults = rankedResults.filter(r => 
      (selectedGrade as number) >= r.opportunity.minGrade && 
      (selectedGrade as number) <= r.opportunity.maxGrade
    );
  }

  if (sortBy === 'nearest') {
    rankedResults.sort((a, b) => (a.distanceKm ?? 9999) - (b.distanceKm ?? 9999));
  } else if (sortBy === 'deadline') {
    rankedResults.sort((a, b) => new Date(a.opportunity.deadline).getTime() - new Date(b.opportunity.deadline).getTime());
  } else if (sortBy === 'recent') {
    rankedResults.sort((a, b) => new Date(b.opportunity.createdAt).getTime() - new Date(a.opportunity.createdAt).getTime());
  }

  const teacherRecommendedResults = rankedResults.filter(r => r.isTeacherRecommended);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-200 dark:border-zinc-800 pb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="badge-clean bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 font-bold">
              Opportunity Engine
            </span>
            <span className="text-xs text-zinc-500 font-mono">
              • {rankedResults.length} active opportunities found
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white">
            Discover Opportunities
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Real internet-verified competitions, scholarships, science fairs, and sports trials tailored to you.
          </p>
        </div>

        <button
          onClick={() => refreshOpportunities()}
          disabled={isRefreshing}
          className="px-3.5 py-2 rounded-lg bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center justify-center gap-2 transition-colors shadow-sm"
        >
          <RefreshCw className={`w-3.5 h-3.5 text-accent-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Ingesting...' : 'Sync Live Sources'}</span>
        </button>
      </div>

      {/* Teacher Recommended Spotlight Section (if student has teacher recommendations) */}
      {teacherRecommendedResults.length > 0 && (
        <div className="theme-card p-5 rounded-2xl border-2 border-accent-500/30 dark:border-accent-400/30 space-y-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-accent-500 text-white flex items-center justify-center">
              <GraduationCap className="w-3.5 h-3.5" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-base text-zinc-900 dark:text-white">
                {t.opportunities.teacherRecommendedBanner}
              </h3>
              <p className="text-[11px] text-zinc-500">
                Your educator selected these opportunities specifically for your talents.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-1">
            {teacherRecommendedResults.map(res => (
              <OpportunityCard
                key={res.opportunity.id}
                matchResult={res}
                onOpenDetails={setSelectedOpportunity}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search Bar & Controls */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row items-stretch gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.opportunities.searchPlaceholder}
              className="w-full text-xs sm:text-sm pl-10 pr-4 py-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:border-zinc-400 shadow-sm"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          <button
            onClick={() => setShowLocationDrawer(!showLocationDrawer)}
            className={`px-4 py-2.5 rounded-lg text-xs font-semibold border flex items-center justify-center gap-2 transition-colors shrink-0 shadow-sm ${
              showLocationDrawer || selectedScope !== 'all'
                ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white'
                : 'bg-white dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-accent-500" />
            <span>
              {activeLocationFilter.locality 
                ? `${activeLocationFilter.locality}, ${activeLocationFilter.city}`
                : activeLocationFilter.city || 'Location Filter'}
            </span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showLocationDrawer ? 'rotate-180' : ''}`} />
          </button>
        </div>

        {/* Expandable Location Filter Bar */}
        {showLocationDrawer && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-200">
            <LocationFilter
              currentScope={selectedScope}
              onScopeChange={setSelectedScope}
              currentRadius={selectedRadius}
              onRadiusChange={setSelectedRadius}
              selectedCity={activeLocationFilter.city}
              onCityChange={(city) => setActiveLocationFilter(p => ({ ...p, city }))}
              selectedLocality={activeLocationFilter.locality}
              onLocalityChange={(locality, coords) => setActiveLocationFilter(p => ({ ...p, locality, coordinates: coords }))}
              selectedState={activeLocationFilter.state}
              onStateChange={(state) => setActiveLocationFilter(p => ({ ...p, state }))}
            />
          </div>
        )}

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-all border font-medium ${
                selectedCategory === cat
                  ? 'bg-zinc-900 text-white border-zinc-900 dark:bg-white dark:text-zinc-900 dark:border-white shadow-sm font-semibold'
                  : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800'
              }`}
            >
              {t.options[cat] || cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter & Sorting Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs theme-card p-3 rounded-lg">
          <div className="flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-zinc-800 dark:text-zinc-200">
              <input
                type="checkbox"
                checked={verifiedOnly}
                onChange={(e) => setVerifiedOnly(e.target.checked)}
                className="rounded text-zinc-900 focus:ring-zinc-900"
              />
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                {t.opportunities.verifiedOnly}
              </span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer font-medium text-zinc-800 dark:text-zinc-200">
              <input
                type="checkbox"
                checked={freeOnly}
                onChange={(e) => setFreeOnly(e.target.checked)}
                className="rounded text-zinc-900 focus:ring-zinc-900"
              />
              <span>{t.opportunities.freeOnly}</span>
            </label>

            <div className="flex items-center gap-1.5">
              <span className="text-zinc-500 font-mono text-[11px]">{t.opportunities.gradeFilter}:</span>
              <select
                value={selectedGrade}
                onChange={(e) => setSelectedGrade(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-1.5 py-0.5 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              >
                <option value="all">All Classes</option>
                {[6, 7, 8, 9, 10, 11, 12].map(g => (
                  <option key={g} value={g}>Class {g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <ArrowUpDown className="w-3.5 h-3.5 text-zinc-400" />
            <span className="text-zinc-500 font-mono text-[11px]">{t.opportunities.sortBy}:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded px-2 py-0.5 font-medium text-zinc-900 dark:text-zinc-100 focus:outline-none"
            >
              <option value="match">Best Match Percentage</option>
              <option value="nearest">Nearest to Me</option>
              <option value="deadline">Closing Soon</option>
              <option value="recent">Recently Added</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid */}
      {rankedResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {rankedResults.map(res => (
            <OpportunityCard
              key={res.opportunity.id}
              matchResult={res}
              onOpenDetails={setSelectedOpportunity}
            />
          ))}
        </div>
      ) : (
        <div className="theme-card p-12 rounded-2xl text-center space-y-4">
          <h3 className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
            {t.opportunities.noResults}
          </h3>
          <p className="text-xs text-zinc-500 max-w-md mx-auto">
            {t.opportunities.noResultsDesc}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedScope('all');
              setVerifiedOnly(false);
              setFreeOnly(false);
              setSearchQuery('');
              setSelectedGrade('all');
            }}
            className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      )}

      {/* Modal */}
      <OpportunityModal
        opportunity={selectedOpportunity}
        onClose={() => setSelectedOpportunity(null)}
      />
    </div>
  );
}

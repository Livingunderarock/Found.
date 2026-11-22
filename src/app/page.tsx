'use client';

import React from 'react';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { 
  ArrowRight, 
  MapPin, 
  CheckCircle2, 
  Compass, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  Globe2,
  Sparkles,
  Users,
  ChevronRight
} from 'lucide-react';
import { TalentRadar } from '@/components/talent/TalentRadar';

export default function HomePage() {
  const { studentProfile, currentUser, currentRole, t } = useApp();

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Welcome Section */}
      <section className="relative overflow-hidden pt-16 pb-20 px-4 sm:px-6 lg:px-8 border-b border-zinc-200 dark:border-zinc-800">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-mono uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            <span className="w-2 h-2 rounded-full bg-accent-500"></span>
            <span>Location-Aware Talent Discovery</span>
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl font-bold tracking-tight text-zinc-950 dark:text-white leading-[1.1]">
            {t.hero.title}{' '}
            <span className="italic font-normal block mt-1 text-zinc-500 dark:text-zinc-400">
              {t.hero.highlight}
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
            {t.hero.description}
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
            <Link
              href="/onboarding?mode=new"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-sm transition-all shadow-md flex items-center justify-center gap-2 group"
            >
              <span>{t.hero.ctaCreateProfile}</span>
              <ArrowRight className="w-4 h-4 text-accent-400 dark:text-accent-600 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto px-7 py-3.5 rounded-lg bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-900 dark:text-white font-semibold text-sm transition-all border border-zinc-200 dark:border-zinc-800 flex items-center justify-center gap-2"
            >
              <span>{t.hero.ctaSignIn}</span>
            </Link>

            {currentUser && (
              <Link
                href={currentRole === 'teacher' ? '/teacher' : '/dashboard'}
                className="w-full sm:w-auto px-5 py-3.5 rounded-lg text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white text-xs font-semibold flex items-center justify-center gap-1.5"
              >
                <span>Continue to {currentRole === 'teacher' ? 'Educator Hub' : 'My Dashboard'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto pt-10 border-t border-zinc-200 dark:border-zinc-800 text-center">
            <div className="p-3">
              <p className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">100%</p>
              <p className="text-[11px] font-mono uppercase text-zinc-500 mt-0.5">{t.hero.statsOpportunities}</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-2xl font-bold text-accent-500">25+ Dist.</p>
              <p className="text-[11px] font-mono uppercase text-zinc-500 mt-0.5">Location-Aware</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">7 Stages</p>
              <p className="text-[11px] font-mono uppercase text-zinc-500 mt-0.5">Talent Radar</p>
            </div>
            <div className="p-3">
              <p className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">Dual Login</p>
              <p className="text-[11px] font-mono uppercase text-zinc-500 mt-0.5">Students & Teachers</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3 Step Concept Walkthrough */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-2 mb-10">
          <span className="text-[10px] font-mono uppercase tracking-widest text-accent-500 font-bold">
            How It Works
          </span>
          <h2 className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">
            From Questionnaire to Real Opportunities
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="theme-card p-6 rounded-xl space-y-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-900 dark:text-white font-mono">
              01
            </div>
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
              Create Your Profile
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Answer questions across academics, sports, arts, and technology. Select your city and locality for precise proximity matching.
            </p>
          </div>

          <div className="theme-card p-6 rounded-xl space-y-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-900 dark:text-white font-mono">
              02
            </div>
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
              Analyze Your Strengths
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Generate an interactive 7-axis Talent Radar, identify your prominent strengths, and receive constructive developmental suggestions.
            </p>
          </div>

          <div className="theme-card p-6 rounded-xl space-y-3">
            <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-900 dark:text-white font-mono">
              03
            </div>
            <h3 className="font-serif font-bold text-lg text-zinc-900 dark:text-white">
              Discover Real Events
            </h3>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Explore internet-verified competitions, sports trials, and scholarships in your area, alongside recommendations from your teacher.
            </p>
          </div>
        </div>
      </section>

      {/* Interactive Radar Visual Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="theme-card p-8 sm:p-12 rounded-2xl flex flex-col md:flex-row items-center gap-10">
          <div className="md:w-1/2 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-accent-500 font-bold">
              Multi-Dimensional Talent Map
            </span>
            <h3 className="font-serif text-3xl font-bold text-zinc-900 dark:text-white">
              No Rigid Labels. Just Pure Potential.
            </h3>
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
              We never permanently categorize students into a single box. The talent radar evolves as students explore new interests and update their profile.
            </p>
            <div className="pt-2">
              <Link
                href="/onboarding?mode=new"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold text-xs transition-colors shadow-sm"
              >
                <span>Start the Talent Quiz</span>
                <ChevronRight className="w-4 h-4 text-accent-500" />
              </Link>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <TalentRadar scores={studentProfile.analysis.scores} size={280} />
          </div>
        </div>
      </section>
    </div>
  );
}

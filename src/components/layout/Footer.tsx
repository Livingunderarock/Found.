import React from 'react';
import Link from 'next/link';
import { ShieldCheck, Lock, ExternalLink } from 'lucide-react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function Footer() {
  return (
    <footer className="bg-white dark:bg-black text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800 pt-12 pb-8 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          {/* Column 1: Brand & Philosophy */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="relative w-6 h-6 flex items-center justify-center">
                <img 
                  src={`${basePath}/logo.png`} 
                  alt="Found. Logo" 
                  className="w-full h-full object-contain block dark:hidden" 
                />
                <img 
                  src={`${basePath}/logo-white.png`} 
                  alt="Found. Logo" 
                  className="w-full h-full object-contain hidden dark:block" 
                />
              </div>
              <span className="font-serif text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                Found.
              </span>
            </div>
            <p className="font-serif italic text-sm text-zinc-800 dark:text-zinc-200 mb-3 leading-relaxed">
              &ldquo;Every student has potential. Found. helps them discover it.&rdquo;
            </p>
            <p className="text-xs text-zinc-500 leading-relaxed">
              A location-aware student talent discovery & authentic opportunity aggregation platform.
            </p>
          </div>

          {/* Column 2: Official Sources */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-900 dark:text-zinc-200 font-bold mb-3">
              Internet Sources
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="https://scholarships.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 group">
                  <span>National Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="https://inspireawards-dst.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 group">
                  <span>INSPIRE Awards MANAK</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="https://ssp.karnataka.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 group">
                  <span>Karnataka State Scholarship Portal</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="https://kheloindia.gov.in" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 group">
                  <span>Khelo India Sports Portal</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
              <li>
                <a href="https://sofworld.org" target="_blank" rel="noopener noreferrer" className="hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 group">
                  <span>Science Olympiad Foundation</span>
                  <ExternalLink className="w-3 h-3 opacity-60 group-hover:opacity-100" />
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-900 dark:text-zinc-200 font-bold mb-3">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li><Link href="/dashboard" className="hover:text-zinc-900 dark:hover:text-white">Student Dashboard</Link></li>
              <li><Link href="/opportunities" className="hover:text-zinc-900 dark:hover:text-white">Opportunity Explorer</Link></li>
              <li><Link href="/onboarding" className="hover:text-zinc-900 dark:hover:text-white">Talent Quiz</Link></li>
              <li><Link href="/profile" className="hover:text-zinc-900 dark:hover:text-white">Student Portfolio</Link></li>
              <li><Link href="/teacher" className="hover:text-zinc-900 dark:hover:text-white">Educator Hub</Link></li>
              <li><Link href="/admin" className="hover:text-zinc-900 dark:hover:text-white">Admin Console</Link></li>
            </ul>
          </div>

          {/* Column 4: Student Safety & Privacy */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-900 dark:text-zinc-200 font-bold mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-accent-500" />
              Privacy by Design
            </h4>
            <p className="text-xs text-zinc-500 leading-relaxed mb-3">
              Profiles are private by default. Geolocation is optional with full manual city/locality selection.
            </p>
            <div className="flex items-center gap-2 text-[11px] bg-zinc-100 dark:bg-zinc-900 p-2 rounded border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300">
              <Lock className="w-3 h-3 text-accent-500 shrink-0" />
              <span>Zero ads. No data selling.</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 flex flex-col sm:flex-row justify-between items-center text-xs text-zinc-400">
          <p>© {new Date().getFullYear()} Found. All rights reserved.</p>
          <p className="mt-2 sm:mt-0 font-mono text-[11px]">
            Discover Yourself. Find Your Possibilities.
          </p>
        </div>
      </div>
    </footer>
  );
}

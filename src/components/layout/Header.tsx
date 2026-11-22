'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { 
  Compass, 
  Sparkles, 
  BookOpen, 
  Award, 
  Users, 
  ShieldCheck, 
  Bell, 
  MapPin, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  LogIn
} from 'lucide-react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function Header() {
  const pathname = usePathname();
  const { 
    theme, 
    toggleTheme, 
    currentUser, 
    currentRole, 
    studentProfile, 
    language, 
    setLanguage, 
    t, 
    logout 
  } = useApp();

  const [showNotifMenu, setShowNotifMenu] = useState(false);
  const unreadNotifs = studentProfile?.notifications?.filter(n => !n.isRead) || [];

  // Navigation Links based on role
  const studentNavLinks = [
    { href: '/dashboard', label: t.nav.dashboard, icon: Compass },
    { href: '/opportunities', label: t.nav.opportunities, icon: Sparkles },
    { href: '/onboarding?mode=update', label: t.nav.updateTalent, icon: BookOpen },
    { href: '/profile', label: t.nav.profile, icon: Award },
  ];

  const teacherNavLinks = [
    { href: '/teacher', label: t.nav.teacher, icon: Users },
    { href: '/admin', label: t.nav.admin, icon: ShieldCheck },
    { href: '/opportunities', label: t.nav.opportunities, icon: Sparkles },
  ];

  const navLinks = currentRole === 'teacher' ? teacherNavLinks : studentNavLinks;

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-black/90 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 transition-colors">
      {/* Top Ticker Bar */}
      <div className="bg-zinc-950 text-zinc-300 text-xs py-1 px-4 sm:px-8 flex justify-between items-center border-b border-zinc-800">
        <div className="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent-500 animate-pulse"></span>
          <span className="font-mono text-[10px] tracking-wider uppercase text-zinc-400">
            {t.hero.liveTicker}
          </span>
          <span className="hidden md:inline text-[11px] text-zinc-500">
            — {t.subTagline}
          </span>
        </div>

        <div className="flex items-center gap-3 text-xs">
          {/* Location Badge */}
          {studentProfile?.demographics && (
            <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-zinc-400">
              <MapPin className="w-3 h-3 text-accent-400" />
              <span>{studentProfile.demographics.locality || studentProfile.demographics.city}, {studentProfile.demographics.state}</span>
            </div>
          )}

          {/* Bilingual Switcher */}
          <div className="flex items-center gap-1 bg-zinc-900 p-0.5 rounded border border-zinc-800">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                language === 'en' 
                  ? 'bg-zinc-800 text-white font-bold' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('kn')}
              className={`px-2 py-0.5 text-[10px] font-mono rounded transition-colors ${
                language === 'kn' 
                  ? 'bg-zinc-800 text-white font-bold' 
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              ಕನ್ನಡ
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo strictly "Found." */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-8 h-8 flex items-center justify-center transition-transform group-hover:scale-105">
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
            <div>
              <span className="font-serif text-2xl font-black tracking-tight text-zinc-900 dark:text-white">
                Found.
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-1">
            {currentUser && navLinks.map(link => {
              const Icon = link.icon;
              const isActive = (pathname?.replace(/\/$/, '') || '/') === link.href.split('?')[0];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-sm font-semibold'
                      : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="flex items-center gap-2">
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
              aria-label="Toggle Dark Mode"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Notifications */}
            {currentUser && (
              <div className="relative">
                <button
                  onClick={() => setShowNotifMenu(!showNotifMenu)}
                  className="relative p-2 rounded-full text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                  aria-label="Notifications"
                >
                  <Bell className="w-4 h-4" />
                  {unreadNotifs.length > 0 && (
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent-500 rounded-full"></span>
                  )}
                </button>

                {showNotifMenu && (
                  <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-zinc-900 rounded-lg shadow-xl border border-zinc-200 dark:border-zinc-800 py-2 z-50">
                    <div className="px-3 py-1.5 border-b border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-xs">
                      <span className="font-bold text-zinc-900 dark:text-zinc-100">Notifications</span>
                      <span className="text-[10px] text-zinc-400 font-mono">{unreadNotifs.length} new</span>
                    </div>
                    <div className="max-h-60 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
                      {studentProfile?.notifications?.length > 0 ? (
                        studentProfile.notifications.map(n => (
                          <div key={n.id} className="p-3 hover:bg-zinc-50 dark:hover:bg-zinc-800/40 text-xs">
                            <p className="font-semibold text-zinc-900 dark:text-zinc-100 flex justify-between">
                              {n.title}
                              <span className="text-[10px] font-mono text-zinc-400">{n.date}</span>
                            </p>
                            <p className="text-zinc-600 dark:text-zinc-400 text-[11px] mt-0.5">{n.message}</p>
                          </div>
                        ))
                      ) : (
                        <p className="p-4 text-center text-xs text-zinc-400">No new notifications</p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Auth Button or User Menu */}
            {currentUser ? (
              <div className="flex items-center gap-2 pl-2">
                <div className="flex items-center gap-2 py-1 px-2 rounded-md bg-zinc-100 dark:bg-zinc-800 text-xs">
                  <div className="w-5 h-5 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center font-bold text-[10px]">
                    {currentUser.name[0]}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100 leading-none text-xs">
                      {currentUser.name}
                    </p>
                    <p className="text-[10px] text-zinc-500 font-mono capitalize leading-none mt-0.5">
                      {currentUser.role}
                    </p>
                  </div>
                </div>

                <Link
                  href="/login"
                  onClick={logout}
                  className="p-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-3 py-1.5 rounded-md text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  {t.nav.login}
                </Link>
                <Link
                  href="/onboarding?mode=new"
                  className="px-3.5 py-1.5 rounded-md text-xs font-semibold bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors shadow-sm"
                >
                  {t.nav.createProfile}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {currentUser && (
          <div className="md:hidden flex items-center gap-1 overflow-x-auto py-2 border-t border-zinc-200 dark:border-zinc-800 no-scrollbar">
            {navLinks.map(link => {
              const Icon = link.icon;
              const isActive = (pathname?.replace(/\/$/, '') || '/') === link.href.split('?')[0];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </header>
  );
}

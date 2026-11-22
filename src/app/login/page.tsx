'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useApp } from '@/context/AppContext';
import { User, Users, GraduationCap, ArrowRight, PlusCircle, Check } from 'lucide-react';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export default function LoginPage() {
  const router = useRouter();
  const { registeredStudents, loginAsStudent, loginAsTeacher, t } = useApp();

  const [activeTab, setActiveTab] = useState<'student' | 'teacher'>('student');
  const [selectedStudentId, setSelectedStudentId] = useState<string>(registeredStudents[0]?.id || '');
  const [teacherName, setTeacherName] = useState('Mr. K. V. Ramesh');

  const handleStudentLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsStudent(selectedStudentId);
    router.push('/dashboard');
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsTeacher(teacherName);
    router.push('/teacher');
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="theme-card p-6 sm:p-8 rounded-2xl shadow-xl space-y-6">
        {/* Title */}
        <div className="text-center space-y-1">
          <div className="relative w-12 h-12 mx-auto mb-2 flex items-center justify-center">
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
          <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white">
            Sign in to be Found.
          </h1>
          <p className="text-xs text-zinc-500">
            Select your role to access your personalized portal.
          </p>
        </div>

        {/* Dual Login Tabs */}
        <div className="grid grid-cols-2 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-lg text-xs font-semibold">
          <button
            type="button"
            onClick={() => setActiveTab('student')}
            className={`py-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'student'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Student Login</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('teacher')}
            className={`py-2 rounded-md transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'teacher'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Teacher Login</span>
          </button>
        </div>

        {/* STUDENT LOGIN FORM */}
        {activeTab === 'student' && (
          <form onSubmit={handleStudentLogin} className="space-y-4 text-xs">
            {registeredStudents.length > 0 ? (
              <div>
                <label className="font-medium text-zinc-700 dark:text-zinc-300 block mb-1.5">
                  Select Registered Student Profile:
                </label>
                <div className="space-y-2">
                  {registeredStudents.map(st => (
                    <div
                      key={st.id}
                      onClick={() => setSelectedStudentId(st.id)}
                      className={`p-3 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                        selectedStudentId === st.id
                          ? 'border-zinc-900 dark:border-white bg-zinc-50 dark:bg-zinc-800/80 font-semibold'
                          : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
                      }`}
                    >
                      <div>
                        <p className="text-zinc-900 dark:text-zinc-100">{st.demographics.fullName}</p>
                        <p className="text-[11px] text-zinc-500 font-normal">
                          Class {st.demographics.grade} • {st.demographics.city}
                        </p>
                      </div>
                      {selectedStudentId === st.id && (
                        <Check className="w-4 h-4 text-zinc-900 dark:text-white" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-5 rounded-xl bg-zinc-50 dark:bg-zinc-800/50 text-center text-zinc-500 space-y-2 border border-dashed border-zinc-200 dark:border-zinc-700">
                <p className="font-medium text-zinc-700 dark:text-zinc-300">No student profiles created yet.</p>
                <p className="text-[11px] text-zinc-400">Complete the 7-stage questionnaire to create your unique talent profile.</p>
              </div>
            )}

            {registeredStudents.length > 0 ? (
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs transition-colors shadow-sm"
              >
                Enter Student Dashboard
              </button>
            ) : (
              <Link
                href="/onboarding?mode=new"
                className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs transition-colors shadow-sm flex items-center justify-center gap-1.5"
              >
                <PlusCircle className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />
                <span>Create Student Profile</span>
              </Link>
            )}

            {registeredStudents.length > 0 && (
              <div className="text-center pt-2 border-t border-zinc-200 dark:border-zinc-800">
                <Link
                  href="/onboarding?mode=new"
                  className="inline-flex items-center gap-1.5 text-xs text-accent-600 dark:text-accent-400 font-semibold hover:underline"
                >
                  <PlusCircle className="w-3.5 h-3.5" />
                  <span>Create Another Student Profile</span>
                </Link>
              </div>
            )}
          </form>
        )}

        {/* TEACHER LOGIN FORM */}
        {activeTab === 'teacher' && (
          <form onSubmit={handleTeacherLogin} className="space-y-4 text-xs">
            <div>
              <label className="font-medium text-zinc-700 dark:text-zinc-300 block mb-1.5">
                Educator / Mentor Name:
              </label>
              <input
                type="text"
                required
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="e.g. Mr. K. V. Ramesh"
                className="w-full p-2.5 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>

            <div className="p-3 rounded-lg bg-zinc-50 dark:bg-zinc-800/40 text-[11px] text-zinc-500 leading-relaxed">
              As a Teacher, you will gain access to the <strong>Educator Hub</strong> to inspect classroom students, evaluate performance, post mentor comments, and recommend opportunities directly to students.
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 font-semibold text-xs transition-colors shadow-sm"
            >
              Enter Educator Hub
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

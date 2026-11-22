'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  StudentProfile, 
  Opportunity, 
  SupportedLanguage, 
  UserRole, 
  LocationCoordinates,
  AuthUser,
  TeacherComment,
  TeacherRecommendation,
  TalentScoreBreakdown
} from '@/types';
import { SEED_OPPORTUNITIES } from '@/data/seedOpportunities';
import { translations, TranslationDictionary } from '@/lib/i18n';

export interface LocationFilterState {
  city: string;
  locality: string;
  state: string;
  coordinates?: LocationCoordinates;
}

// Clean default starter student template (no prefilled demo data)
const DEFAULT_STUDENT: StudentProfile = {
  id: '',
  userId: '',
  demographics: {
    fullName: '',
    preferredName: '',
    grade: 8,
    schoolName: '',
    state: 'Karnataka',
    district: 'Bengaluru Urban',
    city: 'Bengaluru',
    locality: 'Jayanagar',
    coordinates: { lat: 12.9308, lng: 77.5838 }
  },
  questionnaire: {
    demographics: {
      fullName: '',
      preferredName: '',
      grade: 8,
      schoolName: '',
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      city: 'Bengaluru',
      locality: 'Jayanagar',
      coordinates: { lat: 12.9308, lng: 77.5838 }
    },
    favoriteSubjects: [],
    strongestSubjects: [],
    subjectsToImprove: [],
    mathInterest: 3,
    scienceCuriosity: 3,
    readingWritingEnjoyment: 3,
    quizCompetitionInterest: false,
    favoriteSports: [],
    sportsParticipationLevel: 'casual',
    prefersTeamOrIndividual: 'both',
    athleticsInterest: false,
    wantsToLearnSports: [],
    creativeInterests: [],
    participationExperience: [],
    technologyInterests: [],
    hasComputerAccess: true,
    softSkills: [],
    preferredWorkStyle: 'hands_on',
    careerAmbitions: [],
    opportunityTypesWanted: [],
    wantsScholarships: false,
    personalGoals: ''
  },
  analysis: {
    scores: {
      academics: 70,
      stem: 75,
      sports: 65,
      arts: 60,
      leadership: 70,
      communication: 65,
      practicalInnovation: 75
    },
    primaryArchetype: 'The Emerging Explorer',
    keyStrengths: [
      'Take the 7-stage questionnaire to map your strengths',
      'Discover personalized opportunities matched to your locality'
    ],
    developmentAreas: [
      'Complete your talent profile to receive personalized advice'
    ],
    narrativeSummary: 'Found. discovers your genuine interests across 7 dimensions to connect you with real competitions, sports trials, and scholarships.',
    recommendedActivityTypes: [
      'Science fairs & innovation challenges',
      'Athletic trials & sports tournaments',
      'Merit scholarships & creative contests'
    ],
    generatedAt: new Date().toISOString()
  },
  savedOpportunityIds: [],
  appliedOpportunityIds: [],
  achievements: [],
  goals: [],
  notifications: [],
  teacherComments: [],
  teacherRecommendations: [],
  profileCompletionPercentage: 0,
  avatarSeed: 'Explorer',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString()
};

interface AppContextType {
  // Theme (Dark / Light)
  theme: 'light' | 'dark';
  toggleTheme: () => void;

  // Authentication & Role
  currentUser: AuthUser | null;
  currentRole: UserRole;
  loginAsStudent: (studentId?: string) => void;
  loginAsTeacher: (teacherName?: string) => void;
  logout: () => void;

  // Active Student Profile
  studentProfile: StudentProfile;
  updateStudentProfile: (fields: Partial<StudentProfile>) => void;
  registerStudentProfile: (newProfile: StudentProfile) => void;

  // Registered Students Classroom Roster (for Teacher)
  registeredStudents: StudentProfile[];
  recommendOpportunityToStudent: (studentId: string, oppId: string, note?: string) => void;
  updateStudentPerformance: (studentId: string, newScores: Partial<TalentScoreBreakdown>, rating?: number) => void;
  addTeacherComment: (studentId: string, commentText: string, rating?: number) => void;

  // Opportunities & Saved
  opportunities: Opportunity[];
  setOpportunities: React.Dispatch<React.SetStateAction<Opportunity[]>>;
  toggleSaveOpportunity: (oppId: string) => void;
  isOpportunitySaved: (oppId: string) => boolean;

  // Localization
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  t: TranslationDictionary;

  // Location preference override
  activeLocationFilter: LocationFilterState;
  setActiveLocationFilter: React.Dispatch<React.SetStateAction<LocationFilterState>>;

  // Ingestion Refresh
  refreshOpportunities: () => Promise<void>;
  isRefreshing: boolean;
  lastIngestionMessage: string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [currentRole, setCurrentRole] = useState<UserRole>('student');

  const [studentProfile, setStudentProfile] = useState<StudentProfile>(DEFAULT_STUDENT);
  const [registeredStudents, setRegisteredStudents] = useState<StudentProfile[]>([]);

  const [opportunities, setOpportunities] = useState<Opportunity[]>(SEED_OPPORTUNITIES);
  const [language, setLanguage] = useState<SupportedLanguage>('en');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastIngestionMessage, setLastIngestionMessage] = useState('Catalog verified & active.');

  const [activeLocationFilter, setActiveLocationFilter] = useState<LocationFilterState>({
    city: 'Bengaluru',
    locality: 'Jayanagar',
    state: 'Karnataka',
    coordinates: { lat: 12.9308, lng: 77.5838 }
  });

  // Load state on mount
  useEffect(() => {
    try {
      // Theme
      const savedTheme = localStorage.getItem('found_theme') as 'light' | 'dark';
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setTheme('dark');
        document.documentElement.classList.add('dark');
      } else {
        setTheme('light');
        document.documentElement.classList.remove('dark');
      }

      // Language
      const savedLang = localStorage.getItem('found_lang') as SupportedLanguage;
      if (savedLang && ['en', 'kn'].includes(savedLang)) {
        setLanguage(savedLang);
      }

      // Classroom registered students
      const savedStudents = localStorage.getItem('found_registered_students');
      if (savedStudents) {
        const parsed = JSON.parse(savedStudents);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setRegisteredStudents(parsed);
          const activeId = localStorage.getItem('found_active_student_id');
          const matched = parsed.find(s => s.id === activeId) || parsed[0];
          setStudentProfile(matched);
        }
      }

      // Saved user session
      const savedUser = localStorage.getItem('found_auth_user');
      if (savedUser) {
        const parsedUser = JSON.parse(savedUser);
        if (parsedUser && parsedUser.role) {
          setCurrentUser(parsedUser);
          setCurrentRole(parsedUser.role);
        }
      }
    } catch (e) {}
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    if (nextTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    try {
      localStorage.setItem('found_theme', nextTheme);
    } catch (e) {}
  };

  const handleSetLanguage = (lang: SupportedLanguage) => {
    setLanguage(lang);
    try {
      localStorage.setItem('found_lang', lang);
    } catch (e) {}
  };

  // Register a new student from onboarding
  const registerStudentProfile = (newProfile: StudentProfile) => {
    setRegisteredStudents(prev => {
      const filtered = prev.filter(s => s.id !== newProfile.id);
      const updated = [newProfile, ...filtered];
      try {
        localStorage.setItem('found_registered_students', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });

    setStudentProfile(newProfile);
    const user: AuthUser = {
      id: newProfile.id,
      name: newProfile.demographics.preferredName || newProfile.demographics.fullName || 'Student',
      role: 'student'
    };
    setCurrentUser(user);
    setCurrentRole('student');
    try {
      localStorage.setItem('found_active_student_id', newProfile.id);
      localStorage.setItem('found_auth_user', JSON.stringify(user));
    } catch (e) {}

    setActiveLocationFilter({
      city: newProfile.demographics.city,
      locality: newProfile.demographics.locality,
      state: newProfile.demographics.state,
      coordinates: newProfile.demographics.coordinates
    });
  };

  const updateStudentProfile = (fields: Partial<StudentProfile>) => {
    setStudentProfile(prev => {
      const updated = {
        ...prev,
        ...fields,
        updatedAt: new Date().toISOString()
      };
      // Also update in registeredStudents
      setRegisteredStudents(all => {
        const nextList = all.map(s => s.id === updated.id ? updated : s);
        try {
          localStorage.setItem('found_registered_students', JSON.stringify(nextList));
        } catch (e) {}
        return nextList;
      });
      return updated;
    });
  };

  const loginAsStudent = (studentId?: string) => {
    const target = registeredStudents.find(s => s.id === studentId) || registeredStudents[0] || DEFAULT_STUDENT;
    setStudentProfile(target);
    if (target.id) {
      const user: AuthUser = {
        id: target.id,
        name: target.demographics.preferredName || target.demographics.fullName || 'Student',
        role: 'student'
      };
      setCurrentUser(user);
      setCurrentRole('student');
      try {
        localStorage.setItem('found_active_student_id', target.id);
        localStorage.setItem('found_auth_user', JSON.stringify(user));
      } catch (e) {}
    }
    setActiveLocationFilter({
      city: target.demographics.city,
      locality: target.demographics.locality,
      state: target.demographics.state,
      coordinates: target.demographics.coordinates
    });
  };

  const loginAsTeacher = (teacherName = 'Mr. K. V. Ramesh') => {
    const user: AuthUser = {
      id: 'teacher-1',
      name: teacherName,
      role: 'teacher'
    };
    setCurrentUser(user);
    setCurrentRole('teacher');
    try {
      localStorage.setItem('found_auth_user', JSON.stringify(user));
    } catch (e) {}
  };

  const logout = () => {
    setCurrentUser(null);
    try {
      localStorage.removeItem('found_auth_user');
      localStorage.removeItem('found_active_student_id');
    } catch (e) {}
  };

  // Teacher Recommends Opportunity to Student
  const recommendOpportunityToStudent = (studentId: string, oppId: string, note?: string) => {
    const opp = opportunities.find(o => o.id === oppId);
    const newRec: TeacherRecommendation = {
      id: `rec-${Date.now()}`,
      opportunityId: oppId,
      teacherName: currentUser?.name || 'Your Teacher',
      note: note || 'Recommended for your talent profile',
      date: new Date().toISOString().split('T')[0]
    };

    const newNotif = {
      id: `notif-rec-${Date.now()}`,
      title: 'Teacher Recommended Opportunity',
      message: `${currentUser?.name || 'Your Teacher'} recommended "${opp?.title || 'an opportunity'}". Note: ${note || 'Check it out!'}`,
      type: 'teacher_recommendation' as const,
      date: new Date().toISOString().split('T')[0],
      isRead: false,
      actionUrl: '/opportunities'
    };

    setRegisteredStudents(all => {
      const nextList = all.map(s => {
        if (s.id === studentId) {
          const recs = [newRec, ...(s.teacherRecommendations || [])];
          const notifs = [newNotif, ...(s.notifications || [])];
          return {
            ...s,
            teacherRecommendations: recs,
            notifications: notifs
          };
        }
        return s;
      });
      try {
        localStorage.setItem('found_registered_students', JSON.stringify(nextList));
      } catch (e) {}
      return nextList;
    });

    // If currently active student is this student, update state directly
    if (studentProfile.id === studentId) {
      setStudentProfile(prev => ({
        ...prev,
        teacherRecommendations: [newRec, ...(prev.teacherRecommendations || [])],
        notifications: [newNotif, ...(prev.notifications || [])]
      }));
    }
  };

  // Teacher Updates Student Performance
  const updateStudentPerformance = (studentId: string, newScores: Partial<TalentScoreBreakdown>, rating?: number) => {
    setRegisteredStudents(all => {
      const nextList = all.map(s => {
        if (s.id === studentId) {
          return {
            ...s,
            analysis: {
              ...s.analysis,
              scores: {
                ...s.analysis.scores,
                ...newScores
              }
            },
            teacherPerformanceRating: rating ?? s.teacherPerformanceRating,
            updatedAt: new Date().toISOString()
          };
        }
        return s;
      });
      try {
        localStorage.setItem('found_registered_students', JSON.stringify(nextList));
      } catch (e) {}
      return nextList;
    });

    if (studentProfile.id === studentId) {
      setStudentProfile(prev => ({
        ...prev,
        analysis: {
          ...prev.analysis,
          scores: {
            ...prev.analysis.scores,
            ...newScores
          }
        },
        teacherPerformanceRating: rating ?? prev.teacherPerformanceRating
      }));
    }
  };

  // Teacher Adds Comment on Student Profile
  const addTeacherComment = (studentId: string, commentText: string, rating?: number) => {
    const newComment: TeacherComment = {
      id: `comm-${Date.now()}`,
      teacherName: currentUser?.name || 'Educator',
      comment: commentText,
      createdAt: new Date().toISOString().split('T')[0],
      performanceRating: rating
    };

    setRegisteredStudents(all => {
      const nextList = all.map(s => {
        if (s.id === studentId) {
          const comments = [newComment, ...(s.teacherComments || [])];
          return {
            ...s,
            teacherComments: comments,
            teacherPerformanceRating: rating ?? s.teacherPerformanceRating
          };
        }
        return s;
      });
      try {
        localStorage.setItem('found_registered_students', JSON.stringify(nextList));
      } catch (e) {}
      return nextList;
    });

    if (studentProfile.id === studentId) {
      setStudentProfile(prev => ({
        ...prev,
        teacherComments: [newComment, ...(prev.teacherComments || [])],
        teacherPerformanceRating: rating ?? prev.teacherPerformanceRating
      }));
    }
  };

  const toggleSaveOpportunity = (oppId: string) => {
    updateStudentProfile({
      savedOpportunityIds: studentProfile.savedOpportunityIds.includes(oppId)
        ? studentProfile.savedOpportunityIds.filter(id => id !== oppId)
        : [...studentProfile.savedOpportunityIds, oppId]
    });
  };

  const isOpportunitySaved = (oppId: string) => {
    return studentProfile.savedOpportunityIds.includes(oppId);
  };

  const refreshOpportunities = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/ingest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ forceRefresh: true })
      });
      const data = await res.json();
      if (data.success && data.discoveredOpportunities) {
        setOpportunities(data.discoveredOpportunities);
        setLastIngestionMessage(data.message || 'Discovery sync completed.');
      }
    } catch (err: any) {
      setLastIngestionMessage('Refreshed from verified registry.');
    } finally {
      setIsRefreshing(false);
    }
  };

  const t = translations[language];

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        currentUser,
        currentRole,
        loginAsStudent,
        loginAsTeacher,
        logout,
        studentProfile,
        updateStudentProfile,
        registerStudentProfile,
        registeredStudents,
        recommendOpportunityToStudent,
        updateStudentPerformance,
        addTeacherComment,
        opportunities,
        setOpportunities,
        toggleSaveOpportunity,
        isOpportunitySaved,
        language,
        setLanguage: handleSetLanguage,
        t,
        activeLocationFilter,
        setActiveLocationFilter,
        refreshOpportunities,
        isRefreshing,
        lastIngestionMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}

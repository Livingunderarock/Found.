'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useApp } from '@/context/AppContext';
import { INDIAN_STATES, CITIES_DATA } from '@/data/locations';
import { QuestionnaireResponses, StudentDemographics, StudentProfile } from '@/types';
import { computeTalentAnalysis } from '@/lib/talentAnalysis';
import confetti from 'canvas-confetti';
import { 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Save
} from 'lucide-react';

const BLANK_QUESTIONNAIRE: QuestionnaireResponses = {
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
};

function OnboardingInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isUpdateMode = searchParams.get('mode') === 'update';
  const { studentProfile, registerStudentProfile, updateStudentProfile, t, language } = useApp();

  const [currentStage, setCurrentStage] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State: strictly blank for a new profile, prefilled only when explicitly updating
  const [formData, setFormData] = useState<QuestionnaireResponses>(() => {
    if (isUpdateMode && studentProfile.id) {
      return studentProfile.questionnaire;
    }
    return BLANK_QUESTIONNAIRE;
  });

  useEffect(() => {
    if (isUpdateMode && studentProfile.id) {
      setFormData(studentProfile.questionnaire);
    } else {
      setFormData(BLANK_QUESTIONNAIRE);
    }
    setCurrentStage(1);
  }, [isUpdateMode, studentProfile.id]);

  const selectedState = formData.demographics.state || 'Karnataka';
  const stateObj = INDIAN_STATES.find(s => s.name === selectedState) || INDIAN_STATES[0];
  const selectedCity = formData.demographics.city || 'Bengaluru';
  const cityData = CITIES_DATA[selectedCity];

  const updateDemographics = (fields: Partial<StudentDemographics>) => {
    setFormData(prev => ({
      ...prev,
      demographics: {
        ...prev.demographics,
        ...fields
      }
    }));
  };

  const toggleArrayItem = (field: keyof QuestionnaireResponses, item: string) => {
    setFormData(prev => {
      let arr = (prev[field] as string[]) || [];
      if (field === 'favoriteSports') {
        if (item === 'Not into sports') {
          const isCurrentlySelected = arr.includes('Not into sports');
          return {
            ...prev,
            favoriteSports: isCurrentlySelected ? [] : ['Not into sports'],
            athleticsInterest: false,
            sportsParticipationLevel: isCurrentlySelected ? 'casual' : 'not_active'
          };
        } else {
          // If selecting a regular sport, remove 'Not into sports'
          arr = arr.filter(i => i !== 'Not into sports');
          const nextArr = arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];
          return {
            ...prev,
            favoriteSports: nextArr,
            sportsParticipationLevel: prev.sportsParticipationLevel === 'not_active' ? 'casual' : prev.sportsParticipationLevel
          };
        }
      }
      const nextArr = arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item];
      return {
        ...prev,
        [field]: nextArr
      };
    });
  };

  const handleNext = () => {
    if (currentStage < 7) {
      setCurrentStage(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStage > 1) {
      setCurrentStage(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSaveAndResume = () => {
    updateStudentProfile({
      questionnaire: formData,
      demographics: formData.demographics
    });
    alert(language === 'kn' ? 'ನಿಮ್ಮ ಪ್ರಗತಿಯನ್ನು ಉಳಿಸಲಾಗಿದೆ!' : 'Your progress has been saved!');
  };

  const handleComplete = () => {
    setIsSubmitting(true);
    const analysis = computeTalentAnalysis(formData);

    const isUpdating = isUpdateMode && !!studentProfile.id;
    const studentId = isUpdating ? studentProfile.id : `student-${Date.now()}`;
    const fullProfile: StudentProfile = {
      id: studentId,
      userId: `user-${studentId}`,
      demographics: {
        ...formData.demographics,
        fullName: formData.demographics.fullName || formData.demographics.preferredName || 'Student',
        preferredName: formData.demographics.preferredName || formData.demographics.fullName || 'Student',
      },
      questionnaire: formData,
      analysis,
      savedOpportunityIds: isUpdating ? (studentProfile.savedOpportunityIds || []) : [],
      appliedOpportunityIds: isUpdating ? (studentProfile.appliedOpportunityIds || []) : [],
      achievements: isUpdating ? (studentProfile.achievements || []) : [],
      goals: isUpdating ? (studentProfile.goals || []) : [
        { id: `g-${Date.now()}`, title: 'Complete first competition registration', targetDate: '2027-02-28', category: 'Academics', isCompleted: false }
      ],
      notifications: [
        {
          id: `notif-${Date.now()}`,
          title: language === 'kn' ? 'ಪ್ರೊಫೈಲ್ ಯಶಸ್ವಿಯಾಗಿ ರಚಿಸಲಾಗಿದೆ' : 'Talent Profile Created',
          message: language === 'kn' ? 'ನಿಮ್ಮ ಸಾಮರ್ಥ್ಯಗಳಿಗೆ ಹೊಂದಿಕೆಯಾಗುವ ನೈಜ ಅವಕಾಶಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.' : 'Explore real opportunities matching your location and strengths.',
          type: 'system',
          date: new Date().toISOString().split('T')[0],
          isRead: false
        }
      ],
      profileCompletionPercentage: 100,
      avatarSeed: formData.demographics.preferredName || 'Student',
      createdAt: isUpdating ? (studentProfile.createdAt || new Date().toISOString()) : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      teacherComments: isUpdating ? (studentProfile.teacherComments || []) : [],
      teacherRecommendations: isUpdating ? (studentProfile.teacherRecommendations || []) : []
    };

    // Register into classroom shared roster
    registerStudentProfile(fullProfile);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#000000', '#6366F1', '#A1A1AA', '#FFFFFF']
      });
    } catch (e) {}

    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/dashboard');
    }, 1000);
  };

  const subjectsList = ['Mathematics', 'Physical Science', 'Biology', 'Computer Applications', 'English Literature', 'Social Studies', 'Kannada', 'Hindi'];
  const sportsList = ['Cricket', 'Football', 'Athletics (Running/Jumps)', 'Badminton', 'Volleyball', 'Basketball', 'Swimming', 'Kabaddi', 'Chess'];
  const artsList = ['Drawing & Sketching', 'Painting (Watercolour/Acrylic)', 'Classical or Light Music', 'Singing', 'Classical / Folk Dance', 'Creative Writing & Poetry', 'Theatre & Acting', 'Handmade Crafts & Clay'];
  const techList = ['Coding & Software', 'Robotics & Automation', 'Science Lab Experiments', 'Building Electronics (Circuits)', 'Digital Creativity & 3D Design', 'Mobile Apps & Games', 'Artificial Intelligence'];
  const softSkillsList = ['Leadership & Organizing', 'Clear Communication', 'Public Speaking', 'Team Collaboration', 'Problem Solving', 'Empathy & Helping Others', 'Attention to Detail', 'Creative Thinking'];
  const categoriesList = ['Academics', 'Scholarships', 'Sports', 'Arts & Creativity', 'Technology', 'Leadership', 'Workshops'];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="badge-clean bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
          {language === 'kn' ? `ಹಂತ ${currentStage} / 7 • ಪ್ರತಿಭಾ ಅನ್ವೇಷಣೆ` : `Stage ${currentStage} of 7 • Talent Discovery`}
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-900 dark:text-white mt-2">
          {currentStage === 1 && t.onboarding.stage1Title}
          {currentStage === 2 && t.onboarding.stage2Title}
          {currentStage === 3 && t.onboarding.stage3Title}
          {currentStage === 4 && t.onboarding.stage4Title}
          {currentStage === 5 && t.onboarding.stage5Title}
          {currentStage === 6 && t.onboarding.stage6Title}
          {currentStage === 7 && t.onboarding.stage7Title}
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 max-w-xl mx-auto">
          {currentStage === 1 && t.onboarding.stage1Desc}
          {currentStage === 2 && t.onboarding.stage2Desc}
          {currentStage === 3 && t.onboarding.stage3Desc}
          {currentStage === 4 && t.onboarding.stage4Desc}
          {currentStage === 5 && t.onboarding.stage5Desc}
          {currentStage === 6 && t.onboarding.stage6Desc}
          {currentStage === 7 && t.onboarding.stage7Desc}
        </p>

        {/* Progress Bar */}
        <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden mt-6">
          <div 
            className="bg-zinc-900 dark:bg-white h-full transition-all duration-300 ease-out"
            style={{ width: `${(currentStage / 7) * 100}%` }}
          />
        </div>
      </div>

      {/* Main Questionnaire Card */}
      <div className="theme-card p-6 sm:p-8 rounded-xl shadow-lg">
        {/* STAGE 1: DEMOGRAPHICS & LOCATION */}
        {currentStage === 1 && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                  {t.onboarding.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.demographics.preferredName}
                  onChange={(e) => updateDemographics({ preferredName: e.target.value, fullName: e.target.value })}
                  placeholder="e.g. Aarav Sharma"
                  className="w-full text-xs p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                  {t.onboarding.grade} *
                </label>
                <select
                  value={formData.demographics.grade}
                  onChange={(e) => updateDemographics({ grade: Number(e.target.value) })}
                  className="w-full text-xs p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                >
                  {[6, 7, 8, 9, 10, 11, 12].map(g => (
                    <option key={g} value={g}>Class {g}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                  {t.onboarding.schoolName}
                </label>
                <input
                  type="text"
                  value={formData.demographics.schoolName}
                  onChange={(e) => updateDemographics({ schoolName: e.target.value })}
                  placeholder="e.g. Govt Model High School, Jayanagar"
                  className="w-full text-xs p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                />
              </div>
            </div>

            {/* Location Selector */}
            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5 space-y-4">
              <div className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-accent-500 font-bold">
                <MapPin className="w-3.5 h-3.5" />
                {t.onboarding.locationPrompt}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* State */}
                <div>
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                    {t.onboarding.state}
                  </label>
                  <select
                    value={selectedState}
                    onChange={(e) => {
                      const newState = e.target.value;
                      const sObj = INDIAN_STATES.find(s => s.name === newState);
                      updateDemographics({
                        state: newState,
                        district: sObj?.districts[0] || '',
                        city: sObj?.primaryCities[0] || ''
                      });
                    }}
                    className="w-full text-xs p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                  >
                    {INDIAN_STATES.map(s => (
                      <option key={s.code} value={s.name}>{s.name}</option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div>
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                    {t.onboarding.city}
                  </label>
                  <select
                    value={selectedCity}
                    onChange={(e) => {
                      const newCity = e.target.value;
                      const cObj = CITIES_DATA[newCity];
                      updateDemographics({
                        city: newCity,
                        locality: cObj?.localities[0]?.name || '',
                        coordinates: cObj?.coordinates
                      });
                    }}
                    className="w-full text-xs p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                  >
                    {Object.keys(CITIES_DATA).map(cityName => (
                      <option key={cityName} value={cityName}>{cityName}</option>
                    ))}
                  </select>
                </div>

                {/* Locality */}
                <div>
                  <label className="text-[11px] font-medium text-zinc-700 dark:text-zinc-300 block mb-1">
                    {t.onboarding.locality}
                  </label>
                  <select
                    value={formData.demographics.locality}
                    onChange={(e) => {
                      const locName = e.target.value;
                      const locObj = cityData?.localities.find(l => l.name === locName);
                      updateDemographics({
                        locality: locName,
                        coordinates: locObj?.coordinates || cityData?.coordinates
                      });
                    }}
                    className="w-full text-xs p-2 rounded-lg bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
                  >
                    {cityData?.localities.map(l => (
                      <option key={l.name} value={l.name}>{l.name}</option>
                    )) || <option value="">Select City</option>}
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 2: ACADEMICS */}
        {currentStage === 2 && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.favSubjectsPrompt}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {subjectsList.map(subj => {
                  const isSelected = formData.favoriteSubjects?.includes(subj);
                  return (
                    <button
                      key={subj}
                      type="button"
                      onClick={() => toggleArrayItem('favoriteSubjects', subj)}
                      className={`p-3 rounded-lg text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm' 
                          : 'bg-zinc-50 text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      <span>{t.options[subj] || subj}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.mathInterestPrompt}
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, mathInterest: lvl }))}
                    className={`py-2 rounded-lg text-xs font-mono font-bold border transition-colors ${
                      formData.mathInterest === lvl
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white'
                        : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {language === 'kn' ? `ಮಟ್ಟ ${lvl}` : `Level ${lvl}`}
                  </button>
                ))}
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.quizInterestPrompt}
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, quizCompetitionInterest: true }))}
                  className={`flex-1 p-3 rounded-lg text-xs font-medium border transition-colors ${
                    formData.quizCompetitionInterest
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white font-semibold'
                      : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  {language === 'kn' ? 'ಹೌದು, ನಾನು ಇಷ್ಟಪಡುತ್ತೇನೆ!' : 'Yes, I enjoy participating!'}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, quizCompetitionInterest: false }))}
                  className={`flex-1 p-3 rounded-lg text-xs font-medium border transition-colors ${
                    !formData.quizCompetitionInterest
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white font-semibold'
                      : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  {language === 'kn' ? 'ಇಲ್ಲ, ಬೇರೆ ವಿಷಯಗಳು ಇಷ್ಟ' : 'Not particularly / Prefer other things'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 3: SPORTS */}
        {currentStage === 3 && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.sportsPrompt}
              </label>

              {/* Dedicated "Not into sports" Option Card */}
              <button
                type="button"
                onClick={() => toggleArrayItem('favoriteSports', 'Not into sports')}
                className={`w-full mb-3 p-3.5 rounded-xl text-left text-xs border transition-all flex items-center justify-between ${
                  formData.favoriteSports?.includes('Not into sports')
                    ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-md'
                    : 'bg-zinc-50 text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                }`}
              >
                <div>
                  <div className="font-semibold text-xs sm:text-sm">
                    {t.options['Not into sports'] || 'Not into sports / Prefer non-sport activities'}
                  </div>
                  <p className={`text-[11px] mt-0.5 ${formData.favoriteSports?.includes('Not into sports') ? 'text-zinc-300 dark:text-zinc-600' : 'text-zinc-500 dark:text-zinc-400'}`}>
                    {t.options['notIntoSportsSubtitle'] || 'Focus on academics, technology, arts, and creative pursuits'}
                  </p>
                </div>
                {formData.favoriteSports?.includes('Not into sports') && (
                  <Check className="w-4 h-4 text-accent-400 dark:text-accent-600 shrink-0 ml-2" />
                )}
              </button>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {sportsList.map(sport => {
                  const isSelected = formData.favoriteSports?.includes(sport);
                  return (
                    <button
                      key={sport}
                      type="button"
                      onClick={() => toggleArrayItem('favoriteSports', sport)}
                      className={`p-3 rounded-lg text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white shadow-sm' 
                          : 'bg-zinc-50 text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      <span>{t.options[sport] || sport}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.sportsLevelPrompt}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                {[
                  { id: 'not_active', label: t.options['not_active'] },
                  { id: 'casual', label: t.options['casual'] },
                  { id: 'school_team', label: t.options['school_team'] },
                  { id: 'district_competitor', label: t.options['district_competitor'] },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, sportsParticipationLevel: item.id as any }))}
                    className={`p-3 rounded-lg text-left text-xs border transition-all ${
                      formData.sportsParticipationLevel === item.id
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white font-semibold'
                        : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 4: ARTS & CREATIVITY */}
        {currentStage === 4 && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.artsPrompt}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {artsList.map(art => {
                  const isSelected = formData.creativeInterests?.includes(art);
                  return (
                    <button
                      key={art}
                      type="button"
                      onClick={() => toggleArrayItem('creativeInterests', art)}
                      className={`p-3 rounded-lg text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white' 
                          : 'bg-zinc-50 text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      <span>{t.options[art] || art}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.writingPrompt}
              </label>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map(lvl => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, readingWritingEnjoyment: lvl }))}
                    className={`py-2 rounded-lg text-xs font-mono font-bold border transition-colors ${
                      formData.readingWritingEnjoyment === lvl
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white'
                        : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    {language === 'kn' ? `ಮಟ್ಟ ${lvl}` : `Level ${lvl}`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5: TECHNOLOGY & STEM */}
        {currentStage === 5 && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.techPrompt}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {techList.map(tech => {
                  const isSelected = formData.technologyInterests?.includes(tech);
                  return (
                    <button
                      key={tech}
                      type="button"
                      onClick={() => toggleArrayItem('technologyInterests', tech)}
                      className={`p-3 rounded-lg text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white' 
                          : 'bg-zinc-50 text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      <span>{t.options[tech] || tech}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.computerAccessPrompt}
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, hasComputerAccess: true }))}
                  className={`flex-1 p-3 rounded-lg text-xs font-medium border transition-colors ${
                    formData.hasComputerAccess
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white font-semibold'
                      : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  {language === 'kn' ? 'ಹೌದು, ಕಂಪ್ಯೂಟರ್ ಅಥವಾ ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಲಭ್ಯವಿದೆ' : 'Yes, at home or school lab'}
                </button>
                <button
                  type="button"
                  onClick={() => setFormData(p => ({ ...p, hasComputerAccess: false }))}
                  className={`flex-1 p-3 rounded-lg text-xs font-medium border transition-colors ${
                    !formData.hasComputerAccess
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white font-semibold'
                      : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700'
                  }`}
                >
                  {language === 'kn' ? 'ಕಡಿಮೆ ಲಭ್ಯತೆ' : 'Limited access'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 6: PERSONALITY & SOFT SKILLS */}
        {currentStage === 6 && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.softSkillsPrompt}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {softSkillsList.map(skill => {
                  const isSelected = formData.softSkills?.includes(skill);
                  return (
                    <button
                      key={skill}
                      type="button"
                      onClick={() => toggleArrayItem('softSkills', skill)}
                      className={`p-3 rounded-lg text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white' 
                          : 'bg-zinc-50 text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      <span>{t.options[skill] || skill}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.workStylePrompt}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'hands_on', title: t.options['hands_on'] },
                  { id: 'reading_thinking', title: t.options['reading_thinking'] },
                  { id: 'talking_collaborating', title: t.options['talking_collaborating'] },
                  { id: 'creative_designing', title: t.options['creative_designing'] }
                ].map(style => (
                  <button
                    key={style.id}
                    type="button"
                    onClick={() => setFormData(p => ({ ...p, preferredWorkStyle: style.id as any }))}
                    className={`p-3 rounded-lg text-left text-xs border transition-all ${
                      formData.preferredWorkStyle === style.id
                        ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white font-semibold'
                        : 'bg-zinc-50 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                    }`}
                  >
                    <p className="leading-snug">{style.title}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STAGE 7: FUTURE ASPIRATIONS & SCHOLARSHIPS */}
        {currentStage === 7 && (
          <div className="space-y-6">
            <div>
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-2">
                {t.onboarding.aspirationsPrompt}
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {categoriesList.map(cat => {
                  const isSelected = formData.opportunityTypesWanted?.includes(cat as any);
                  return (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => toggleArrayItem('opportunityTypesWanted', cat)}
                      className={`p-3 rounded-lg text-left text-xs font-medium border transition-all flex items-center justify-between ${
                        isSelected 
                          ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 border-zinc-900 dark:border-white' 
                          : 'bg-zinc-50 text-zinc-800 dark:bg-zinc-800/60 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 hover:border-zinc-400'
                      }`}
                    >
                      <span>{t.options[cat] || cat}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="border-t border-zinc-200 dark:border-zinc-800 pt-5">
              <label className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 block mb-1">
                {t.onboarding.goalsPrompt}
              </label>
              <textarea
                rows={3}
                value={formData.personalGoals || ''}
                onChange={(e) => setFormData(p => ({ ...p, personalGoals: e.target.value }))}
                placeholder={language === 'kn' ? 'ಉದಾ. ಜಿಲ್ಲಾ ವಿಜ್ಞಾನ ಸ್ಪರ್ಧೆಯಲ್ಲಿ ಪ್ರಶಸ್ತಿ ಗೆಲ್ಲುವುದು...' : 'e.g. Win a prize in the district science exhibition and qualify for the state trials...'}
                className="w-full text-xs p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none"
              />
            </div>
          </div>
        )}

        {/* Card Navigation Footer */}
        <div className="border-t border-zinc-200 dark:border-zinc-800 pt-6 mt-8 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            {currentStage > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5 transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{t.onboarding.previous}</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleSaveAndResume}
              className="px-3 py-2 rounded-lg text-xs font-medium text-zinc-500 hover:text-zinc-900 dark:hover:text-white flex items-center gap-1 transition-colors"
            >
              <Save className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{t.onboarding.saveAndResume}</span>
            </button>
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={isSubmitting}
            className="px-6 py-2.5 rounded-lg text-xs font-semibold bg-zinc-900 hover:bg-zinc-800 dark:bg-white dark:hover:bg-zinc-100 text-white dark:text-zinc-900 flex items-center gap-2 transition-colors shadow-md disabled:opacity-50"
          >
            <span>{currentStage === 7 ? t.onboarding.finish : t.onboarding.next}</span>
            <ArrowRight className="w-3.5 h-3.5 text-accent-400 dark:text-accent-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="max-w-3xl mx-auto p-12 text-center text-xs text-zinc-400">Loading questionnaire...</div>}>
      <OnboardingInner />
    </Suspense>
  );
}

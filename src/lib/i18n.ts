import { SupportedLanguage } from '../types';

export interface TranslationDictionary {
  brandName: string;
  tagline: string;
  subTagline: string;
  nav: {
    dashboard: string;
    opportunities: string;
    onboarding: string;
    updateTalent: string;
    profile: string;
    teacher: string;
    admin: string;
    login: string;
    logout: string;
    createProfile: string;
  };
  hero: {
    title: string;
    highlight: string;
    description: string;
    ctaCreateProfile: string;
    ctaSignIn: string;
    ctaExplore: string;
    liveTicker: string;
    statsSchools: string;
    statsOpportunities: string;
    statsVerified: string;
  };
  onboarding: {
    stage1Title: string;
    stage1Desc: string;
    stage2Title: string;
    stage2Desc: string;
    stage3Title: string;
    stage3Desc: string;
    stage4Title: string;
    stage4Desc: string;
    stage5Title: string;
    stage5Desc: string;
    stage6Title: string;
    stage6Desc: string;
    stage7Title: string;
    stage7Desc: string;
    fullName: string;
    grade: string;
    schoolName: string;
    locationPrompt: string;
    state: string;
    city: string;
    locality: string;
    next: string;
    previous: string;
    finish: string;
    saveAndResume: string;
    favSubjectsPrompt: string;
    mathInterestPrompt: string;
    quizInterestPrompt: string;
    sportsPrompt: string;
    sportsLevelPrompt: string;
    artsPrompt: string;
    writingPrompt: string;
    techPrompt: string;
    computerAccessPrompt: string;
    softSkillsPrompt: string;
    workStylePrompt: string;
    aspirationsPrompt: string;
    goalsPrompt: string;
  };
  dashboard: {
    welcome: string;
    myTalentMap: string;
    topStrengths: string;
    growthAreas: string;
    recommendedForYou: string;
    localOpportunities: string;
    nationalOpportunities: string;
    upcomingDeadlines: string;
    savedOpportunities: string;
    achievements: string;
    viewAll: string;
    applyNow: string;
    saved: string;
    teacherFeedback: string;
    teacherRecommended: string;
  };
  opportunities: {
    searchPlaceholder: string;
    locationFilter: string;
    categoryFilter: string;
    gradeFilter: string;
    radiusFilter: string;
    sortBy: string;
    verifiedOnly: string;
    freeOnly: string;
    officialSource: string;
    deadline: string;
    eligibility: string;
    matchScore: string;
    noResults: string;
    noResultsDesc: string;
    teacherRecommendedBanner: string;
    teacherNoteLabel: string;
  };
  teacher: {
    title: string;
    subtitle: string;
    rosterTitle: string;
    rosterSubtitle: string;
    selectStudentPrompt: string;
    noStudentsRegistered: string;
    noStudentsDesc: string;
    recommendTitle: string;
    recommendSubtitle: string;
    selectOpportunity: string;
    teacherNote: string;
    sendRecommendation: string;
    updatePerformanceTitle: string;
    performanceRatingLabel: string;
    addCommentTitle: string;
    commentPlaceholder: string;
    saveComment: string;
    savePerformance: string;
  };
  status: {
    verified: string;
    secondary: string;
    awaiting: string;
    expired: string;
    demo: string;
  };
  options: Record<string, string>;
}

export const translations: Record<SupportedLanguage, TranslationDictionary> = {
  en: {
    brandName: 'Found.',
    tagline: 'Discover Yourself. Find Your Possibilities.',
    subTagline: 'Location-aware student talent discovery and real opportunity aggregation.',
    nav: {
      dashboard: 'Dashboard',
      opportunities: 'Opportunities',
      onboarding: 'Talent Quiz',
      updateTalent: 'Update Talent',
      profile: 'My Portfolio',
      teacher: 'Educator Hub',
      admin: 'Admin Console',
      login: 'Sign In',
      logout: 'Sign Out',
      createProfile: 'Create Profile'
    },
    hero: {
      title: 'Every student has potential.',
      highlight: 'Found. helps them discover it.',
      description: 'An intelligent platform connecting students to real scholarships, science exhibitions, sports trials, olympiads, and innovation opportunities in their own area and across India.',
      ctaCreateProfile: 'Create Your Profile',
      ctaSignIn: 'Sign In',
      ctaExplore: 'Explore Opportunities',
      liveTicker: 'LIVE OPPORTUNITY FEED',
      statsSchools: 'Targeting All Schools',
      statsOpportunities: '100% Real Internet Sources',
      statsVerified: 'Official Govt & Foundation Portals'
    },
    onboarding: {
      stage1Title: 'About You & Your Location',
      stage1Desc: 'Help us find opportunities close to your home and school in your city or locality.',
      stage2Title: 'Academic Curiosity',
      stage2Desc: 'What subjects spark your imagination when you read and learn?',
      stage3Title: 'Sports & Movement',
      stage3Desc: 'Tell us about your sporting passions, athletic goals, and favorite games.',
      stage4Title: 'Arts & Creative Expression',
      stage4Desc: 'Do you enjoy painting, singing, dance, theatre, or creative storytelling?',
      stage5Title: 'Technology & Building Things',
      stage5Desc: 'Your interest in coding, robotics, science experiments, and making things work.',
      stage6Title: 'Personality & Leadership',
      stage6Desc: 'How do you like to collaborate, speak, solve problems, and help others?',
      stage7Title: 'Your Dreams & Future Goals',
      stage7Desc: 'What kind of competitions, scholarships, or career paths inspire you?',
      fullName: 'Full Name / Preferred Name',
      grade: 'Class / Grade',
      schoolName: 'School Name',
      locationPrompt: 'Where would you like to discover opportunities?',
      state: 'State',
      city: 'City / Town',
      locality: 'Area / Locality',
      next: 'Continue',
      previous: 'Back',
      finish: 'Complete & Unlock Dashboard',
      saveAndResume: 'Save & Resume',
      favSubjectsPrompt: 'What are your favorite subjects? (Select all that apply)',
      mathInterestPrompt: 'How excited do you get when solving tricky math or logic problems?',
      quizInterestPrompt: 'Do you enjoy school quizzes, debates, or olympiad competitions?',
      sportsPrompt: 'Which sports do you enjoy playing or watching?',
      sportsLevelPrompt: 'What is your level of sporting participation?',
      artsPrompt: 'Which creative mediums excite you the most?',
      writingPrompt: 'How often do you write stories, poetry, or keep a personal journal?',
      techPrompt: 'What technology topics are you curious about?',
      computerAccessPrompt: 'Do you have regular access to a computer or smartphone?',
      softSkillsPrompt: 'Which strengths best describe you when working with classmates?',
      workStylePrompt: 'What is your preferred style of learning and working?',
      aspirationsPrompt: 'What opportunities are you most eager to discover right now?',
      goalsPrompt: 'Tell us about your personal ambition or goal for this academic year:'
    },
    dashboard: {
      welcome: '',
      myTalentMap: 'My Talent Map',
      topStrengths: 'Prominent Strengths',
      growthAreas: 'Constructive Growth Areas',
      recommendedForYou: 'Recommended For You',
      localOpportunities: 'In Your Area & City',
      nationalOpportunities: 'State & National Competitions',
      upcomingDeadlines: 'Closing Soon',
      savedOpportunities: 'Saved Opportunities',
      achievements: 'Milestones & Badges',
      viewAll: 'View All',
      applyNow: 'Apply on Official Site',
      saved: 'Saved',
      teacherFeedback: 'Teacher Feedback & Remarks',
      teacherRecommended: 'Recommended by Your Teacher'
    },
    opportunities: {
      searchPlaceholder: 'Search by title, subject, sports, skills, or organizer...',
      locationFilter: 'Location Scope',
      categoryFilter: 'Category',
      gradeFilter: 'Class / Grade',
      radiusFilter: 'Search Radius',
      sortBy: 'Sort By',
      verifiedOnly: 'Official Verified Only',
      freeOnly: 'Free Registration',
      officialSource: 'Official Portal Checked',
      deadline: 'Deadline',
      eligibility: 'Eligibility',
      matchScore: 'Match',
      noResults: 'No opportunities found matching this filter',
      noResultsDesc: 'Try expanding your location radius or clearing specific filters.',
      teacherRecommendedBanner: 'Teacher Recommended For You',
      teacherNoteLabel: 'Teacher Note'
    },
    teacher: {
      title: 'Educator Hub & Classroom',
      subtitle: 'Inspect enrolled students, evaluate progress, and recommend tailored opportunities.',
      rosterTitle: 'Enrolled Students in Your Classroom',
      rosterSubtitle: 'Students who created their profile on Found.',
      selectStudentPrompt: 'Select a student to view details and evaluate',
      noStudentsRegistered: 'No Students in Classroom Yet',
      noStudentsDesc: 'When students create their profile on Found, they will appear here automatically.',
      recommendTitle: 'Recommend an Opportunity',
      recommendSubtitle: 'This opportunity will be featured directly on the student’s opportunities page.',
      selectOpportunity: 'Select Opportunity from Registry',
      teacherNote: 'Personal Teacher Note / Advice',
      sendRecommendation: 'Send Recommendation to Student',
      updatePerformanceTitle: 'Update Performance Score',
      performanceRatingLabel: 'Overall Performance Rating (1–5 Stars)',
      addCommentTitle: 'Leave a Mentor Comment',
      commentPlaceholder: 'Write a constructive feedback or encouragement comment for this student...',
      saveComment: 'Post Comment to Student Portfolio',
      savePerformance: 'Save Performance Updates'
    },
    status: {
      verified: 'REAL — OFFICIAL SOURCE CHECKED',
      secondary: 'REAL — SECONDARY SOURCE',
      awaiting: 'AWAITING VERIFICATION',
      expired: 'EXPIRED',
      demo: 'DEMO DATA'
    },
    options: {
      // Subjects
      'Mathematics': 'Mathematics',
      'Physical Science': 'Physical Science',
      'Biology': 'Biology',
      'Computer Applications': 'Computer Applications',
      'English Literature': 'English Literature',
      'Social Studies': 'Social Studies',
      'Kannada': 'Kannada',
      'Hindi': 'Hindi',
      // Sports
      'Cricket': 'Cricket',
      'Football': 'Football',
      'Athletics (Running/Jumps)': 'Athletics (Running/Jumps)',
      'Badminton': 'Badminton',
      'Volleyball': 'Volleyball',
      'Basketball': 'Basketball',
      'Swimming': 'Swimming',
      'Kabaddi': 'Kabaddi',
      'Chess': 'Chess',
      'Not into sports': 'Not into sports / Prefer non-sport activities',
      'notIntoSportsSubtitle': 'Focus on academics, technology, arts, and creative pursuits',
      // Sports Levels
      'not_active': 'Not active in sports / Prefer non-sport pursuits',
      'casual': 'Casual / Playground with friends',
      'school_team': 'School Team / Inter-school',
      'district_competitor': 'District or State Competitor',
      // Arts
      'Drawing & Sketching': 'Drawing & Sketching',
      'Painting (Watercolour/Acrylic)': 'Painting (Watercolour/Acrylic)',
      'Classical or Light Music': 'Classical or Light Music',
      'Singing': 'Singing',
      'Classical / Folk Dance': 'Classical / Folk Dance',
      'Creative Writing & Poetry': 'Creative Writing & Poetry',
      'Theatre & Acting': 'Theatre & Acting',
      'Handmade Crafts & Clay': 'Handmade Crafts & Clay',
      // Tech
      'Coding & Software': 'Coding & Software',
      'Robotics & Automation': 'Robotics & Automation',
      'Science Lab Experiments': 'Science Lab Experiments',
      'Building Electronics (Circuits)': 'Building Electronics (Circuits)',
      'Digital Creativity & 3D Design': 'Digital Creativity & 3D Design',
      'Mobile Apps & Games': 'Mobile Apps & Games',
      'Artificial Intelligence': 'Artificial Intelligence',
      // Soft Skills
      'Leadership & Organizing': 'Leadership & Organizing',
      'Clear Communication': 'Clear Communication',
      'Public Speaking': 'Public Speaking',
      'Team Collaboration': 'Team Collaboration',
      'Problem Solving': 'Problem Solving',
      'Empathy & Helping Others': 'Empathy & Helping Others',
      'Attention to Detail': 'Attention to Detail',
      'Creative Thinking': 'Creative Thinking',
      // Work Styles
      'hands_on': 'Hands-on Building (Making physical models and experiments)',
      'reading_thinking': 'Reading & Thinking (Deep contemplation and analysis)',
      'talking_collaborating': 'Talking & Collaborating (Discussions and teamwork)',
      'creative_designing': 'Creative Designing (Visual sketching and aesthetics)',
      // Categories
      'All': 'All Categories',
      'Academics': 'Academics',
      'Scholarships': 'Scholarships',
      'Sports': 'Sports',
      'Arts & Creativity': 'Arts & Creativity',
      'Technology': 'Technology',
      'Leadership': 'Leadership',
      'Workshops': 'Workshops'
    }
  },
  kn: {
    brandName: 'Found.',
    tagline: 'ನಿಮ್ಮನ್ನು ನೀವು ಕಂಡುಕೊಳ್ಳಿ. ಸಾಧ್ಯತೆಗಳನ್ನು ಅನ್ವೇಷಿಸಿ.',
    subTagline: 'ಸ್ಥಳ-ಆಧಾರಿತ ವಿದ್ಯಾರ್ಥಿ ಪ್ರತಿಭಾ ಅನ್ವೇಷಣೆ ಮತ್ತು ನೈಜ ಅವಕಾಶಗಳ ವೇದಿಕೆ.',
    nav: {
      dashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
      opportunities: 'ಅವಕಾಶಗಳು',
      onboarding: 'ಪ್ರತಿಭಾ ರಸಪ್ರಶ್ನೆ',
      updateTalent: 'ಪ್ರತಿಭೆ ನವೀಕರಿಸಿ',
      profile: 'ನನ್ನ ಪ್ರೊಫೈಲ್',
      teacher: 'ಶಿಕ್ಷಕರ ವಿಭಾಗ',
      admin: 'ಆಡಳಿತ ಮಂಡಳಿ',
      login: 'ಪ್ರವೇಶಿಸಿ',
      logout: 'ನಿರ್ಗಮಿಸಿ',
      createProfile: 'ಪ್ರೊಫೈಲ್ ರಚಿಸಿ'
    },
    hero: {
      title: 'ಪ್ರತಿಯೊಬ್ಬ ವಿದ್ಯಾರ್ಥಿಯಲ್ಲೂ ಸಾಮರ್ಥ್ಯವಿದೆ.',
      highlight: 'Found. ಅದನ್ನು ಗುರುತಿಸಲು ನೆರವಾಗುತ್ತದೆ.',
      description: 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ತಮ್ಮದೇ ಪ್ರದೇಶದಲ್ಲಿ ಮತ್ತು ಭಾರತದಾದ್ಯಂತ ಲಭ್ಯವಿರುವ ನೈಜ ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು, ವಿಜ್ಞಾನ ಪ್ರದರ್ಶನಗಳು, ಕ್ರೀಡಾ ಆಯ್ಕೆಗಳು ಮತ್ತು ಸ್ಪರ್ಧೆಗಳನ್ನು ಸಂಪರ್ಕಿಸುವ ಬುದ್ಧಿವಂತ ವೇದಿಕೆ.',
      ctaCreateProfile: 'ನಿಮ್ಮ ಪ್ರೊಫೈಲ್ ರಚಿಸಿ',
      ctaSignIn: 'ಲಾಗಿನ್ ಮಾಡಿ',
      ctaExplore: 'ಅವಕಾಶಗಳನ್ನು ನೋಡಿ',
      liveTicker: 'ದೃಢೀಕೃತ ನೈಜ ಅವಕಾಶಗಳ ನೇರ ಮಾಹಿತಿ',
      statsSchools: 'ಎಲ್ಲಾ ಶಾಲೆಗಳ ಗುರಿ',
      statsOpportunities: '100% ಅಧಿಕೃತ ಇಂಟರ್ನೆಟ್ ಮೂಲಗಳು',
      statsVerified: 'ಸರ್ಕಾರಿ ಮತ್ತು ಪ್ರತಿಷ್ಠಾನ ಪೋರ್ಟಲ್‌ಗಳು'
    },
    onboarding: {
      stage1Title: 'ನಿಮ್ಮ ಬಗ್ಗೆ ಮತ್ತು ನಿಮ್ಮ ಸ್ಥಳ',
      stage1Desc: 'ನಿಮ್ಮ ಊರು, ಜಿಲ್ಲೆ ಮತ್ತು ಶಾಲೆಯ ಸಮೀಪದ ಅವಕಾಶಗಳನ್ನು ಹುಡುಕಲು ನೆರವಾಗುತ್ತದೆ.',
      stage2Title: 'ಶೈಕ್ಷಣಿಕ ಆಸಕ್ತಿ',
      stage2Desc: 'ಕಲಿಯುವಾಗ ಯಾವ ವಿಷಯಗಳು ನಿಮ್ಮ ಕುತೂಹಲವನ್ನು ಹೆಚ್ಚಿಸುತ್ತವೆ?',
      stage3Title: 'ಕ್ರೀಡೆ ಮತ್ತು ಚಟುವಟಿಕೆ',
      stage3Desc: 'ನಿಮ್ಮ ಕ್ರೀಡಾ ಆಸಕ್ತಿಗಳು ಮತ್ತು ನೆಚ್ಚಿನ ಆಟಗಳ ಬಗ್ಗೆ ತಿಳಿಸಿ.',
      stage4Title: 'ಕಲೆ ಮತ್ತು ಸೃಜನಶೀಲತೆ',
      stage4Desc: 'ಚಿತ್ರಕಲೆ, ಸಂಗೀತ, ನೃತ್ಯ ಅಥವಾ ಸಾಹಿತ್ಯದಲ್ಲಿ ನಿಮಗೆ ಆಸಕ್ತಿಯಿದೆಯೇ?',
      stage5Title: 'ತಂತ್ರಜ್ಞಾನ ಮತ್ತು ನಾವೀನ್ಯತೆ',
      stage5Desc: 'ಕೋಡಿಂಗ್, ರೋಬೋಟಿಕ್ಸ್ ಮತ್ತು ವಿಜ್ಞಾನ ಪ್ರಯೋಗಗಳ ಕುರಿತು ನಿಮ್ಮ ಆಸಕ್ತಿ.',
      stage6Title: 'ವ್ಯಕ್ತಿತ್ವ ಮತ್ತು ನಾಯಕತ್ವ',
      stage6Desc: 'ನೀವು ಸಮಸ್ಯೆಗಳನ್ನು ಹೇಗೆ ಪರಿಹರಿಸುತ್ತೀರಿ ಮತ್ತು ಇತರರೊಂದಿಗೆ ಹೇಗೆ ಸಹಕರಿಸುತ್ತೀರಿ?',
      stage7Title: 'ನಿಮ್ಮ ಗುರಿಗಳು ಮತ್ತು ಕನಸುಗಳು',
      stage7Desc: 'ಮುಂದೆ ನೀವು ಯಾವ ರೀತಿಯ ಸ್ಪರ್ಧೆಗಳು ಮತ್ತು ವಿದ್ಯಾರ್ಥಿವೇತನಗಳನ್ನು ಬಯಸುತ್ತೀರಿ?',
      fullName: 'ಪೂರ್ಣ ಹೆಸರು / ಇಷ್ಟದ ಹೆಸರು',
      grade: 'ತರಗತಿ',
      schoolName: 'ಶಾಲೆಯ ಹೆಸರು',
      locationPrompt: 'ನೀವು ಎಲ್ಲಿ ಅವಕಾಶಗಳನ್ನು ಹುಡುಕಲು ಬಯಸುತ್ತೀರಿ?',
      state: 'ರಾಜ್ಯ',
      city: 'ನಗರ / ಪಟ್ಟಣ',
      locality: 'ಪ್ರದೇಶ / ಬಡಾವಣೆ',
      next: 'ಮುಂದೆ',
      previous: 'ಹಿಂದೆ',
      finish: 'ಪೂರ್ಣಗೊಳಿಸಿ ಡ್ಯಾಶ್‌ಬೋರ್ಡ್ ತೆರೆಯಿರಿ',
      saveAndResume: 'ಉಳಿಸಿ ಮತ್ತು ಮುಂದುವರಿಸಿ',
      favSubjectsPrompt: 'ನಿಮ್ಮ ನೆಚ್ಚಿನ ವಿಷಯಗಳು ಯಾವುವು? (ಅನ್ವಯವಾಗುವ ಎಲ್ಲವನ್ನೂ ಆಯ್ಕೆಮಾಡಿ)',
      mathInterestPrompt: 'ಗಣಿತ ಅಥವಾ ತಾರ್ಕಿಕ ಸಮಸ್ಯೆಗಳನ್ನು ಬಿಡಿಸುವಾಗ ನಿಮಗೆ ಎಷ್ಟು ಆಸಕ್ತಿ ಬರುತ್ತದೆ?',
      quizInterestPrompt: 'ಶಾಲಾ ರಸಪ್ರಶ್ನೆಗಳು ಅಥವಾ ಒಲಿಂಪಿಯಾಡ್ ಸ್ಪರ್ಧೆಗಳಲ್ಲಿ ಭಾಗವಹಿಸಲು ಇಷ್ಟಪಡುತ್ತೀರಾ?',
      sportsPrompt: 'ನೀವು ಯಾವ ಆಟಗಳನ್ನು ಆಡಲು ಅಥವಾ ನೋಡಲು ಇಷ್ಟಪಡುತ್ತೀರಿ?',
      sportsLevelPrompt: 'ಕ್ರೀಡೆಯಲ್ಲಿ ನಿಮ್ಮ ಭಾಗವಹಿಸುವಿಕೆಯ ಮಟ್ಟವೇನು?',
      artsPrompt: 'ಯಾವ ಸೃಜನಶೀಲ ಕಲೆಗಳು ನಿಮಗೆ ಹೆಚ್ಚು ಆಸಕ್ತಿದಾಯಕವಾಗಿವೆ?',
      writingPrompt: 'ನೀವು ಕಥೆಗಳು, ಕವನಗಳು ಅಥವಾ ಡೈರಿ ಬರೆಯುತ್ತೀರಾ?',
      techPrompt: 'ಯಾವ ತಂತ್ರಜ್ಞಾನ ವಿಷಯಗಳ ಬಗ್ಗೆ ನೀವು ಕುತೂಹಲ ಹೊಂದಿದ್ದೀರಿ?',
      computerAccessPrompt: 'ನಿಮಗೆ ಕಂಪ್ಯೂಟರ್ ಅಥವಾ ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಲಭ್ಯವಿದೆಯೇ?',
      softSkillsPrompt: 'ಸಹಪಾಠಿಗಳೊಂದಿಗೆ ಕೆಲಸ ಮಾಡುವಾಗ ನಿಮ್ಮ ಪ್ರಮುಖ ಸಾಮರ್ಥ್ಯಗಳು ಯಾವುವು?',
      workStylePrompt: 'ನಿಮ್ಮ ಕಲಿಕೆ ಮತ್ತು ಕೆಲಸ ಮಾಡುವ ಶೈಲಿ ಯಾವುದು?',
      aspirationsPrompt: 'ನೀವು ಈಗ ಯಾವ ರೀತಿಯ ಅವಕಾಶಗಳನ್ನು ಅನ್ವೇಷಿಸಲು ಬಯಸುತ್ತೀರಿ?',
      goalsPrompt: 'ಈ ಶೈಕ್ಷಣಿಕ ವರ್ಷದಲ್ಲಿ ನಿಮ್ಮ ವೈಯಕ್ತಿಕ ಗುರಿ ಏನು?'
    },
    dashboard: {
      welcome: '',
      myTalentMap: 'ನನ್ನ ಪ್ರತಿಭಾ ನಕ್ಷೆ',
      topStrengths: 'ಪ್ರಮುಖ ಸಾಮರ್ಥ್ಯಗಳು',
      growthAreas: 'ಅಭಿವೃದ್ಧಿಪಡಿಸಿಕೊಳ್ಳಬೇಕಾದ ಕ್ಷೇತ್ರಗಳು',
      recommendedForYou: 'ನಿಮಗಾಗಿ ಶಿಫಾರಸು ಮಾಡಲಾದವು',
      localOpportunities: 'ನಿಮ್ಮ ಸ್ಥಳ ಮತ್ತು ನಗರದಲ್ಲಿ',
      nationalOpportunities: 'ರಾಜ್ಯ ಮತ್ತು ರಾಷ್ಟ್ರೀಯ ಸ್ಪರ್ಧೆಗಳು',
      upcomingDeadlines: 'ಮುಕ್ತಾಯವಾಗುತ್ತಿರುವ ದಿನಾಂಕಗಳು',
      savedOpportunities: 'ಉಳಿಸಲಾದ ಅವಕಾಶಗಳು',
      achievements: 'ಸಾಧನೆಗಳು ಮತ್ತು ಬ್ಯಾಡ್ಜ್‌ಗಳು',
      viewAll: 'ಎಲ್ಲವನ್ನೂ ನೋಡಿ',
      applyNow: 'ಅಧಿಕೃತ ತಾಣದಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ',
      saved: 'ಉಳಿಸಲಾಗಿದೆ',
      teacherFeedback: 'ಶಿಕ್ಷಕರ ಅಭಿಪ್ರಾಯ ಮತ್ತು ಸಲಹೆಗಳು',
      teacherRecommended: 'ನಿಮ್ಮ ಶಿಕ್ಷಕರು ಶಿಫಾರಸು ಮಾಡಿದ ಅವಕಾಶ'
    },
    opportunities: {
      searchPlaceholder: 'ವಿಷಯ, ಕ್ರೀಡೆ, ಕೌಶಲ್ಯ ಅಥವಾ ಸಂಘಟಕರ ಹೆಸರಿನಿಂದ ಹುಡುಕಿ...',
      locationFilter: 'ಸ್ಥಳದ ವ್ಯಾಪ್ತಿ',
      categoryFilter: 'ವರ್ಗ',
      gradeFilter: 'ತರಗತಿ',
      radiusFilter: 'ಹುಡುಕಾಟದ ಅಂತರ (ಕಿ.ಮೀ)',
      sortBy: 'ವಿಂಗಡಿಸಿ',
      verifiedOnly: 'ಅಧಿಕೃತ ದೃಢೀಕೃತ ಮಾತ್ರ',
      freeOnly: 'ಉಚಿತ ನೋಂದಣಿ',
      officialSource: 'ಅಧಿಕೃತ ಪೋರ್ಟಲ್ ಪರಿಶೀಲಿಸಲಾಗಿದೆ',
      deadline: 'ಕೊನೆಯ ದಿನಾಂಕ',
      eligibility: 'ಅರ್ಹತೆ',
      matchScore: 'ಹೊಂದಾಣಿಕೆ',
      noResults: 'ಈ ಫಿಲ್ಟರ್‌ಗೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ಅವಕಾಶಗಳು ಕಂಡುಬಂದಿಲ್ಲ',
      noResultsDesc: 'ದಯವಿಟ್ಟು ಹುಡುಕಾಟದ ಅಂತರವನ್ನು ಹೆಚ್ಚಿಸಿ ಅಥವಾ ಫಿಲ್ಟರ್‌ಗಳನ್ನು ಬದಲಾಯಿಸಿ.',
      teacherRecommendedBanner: 'ನಿಮ್ಮ ಶಿಕ್ಷಕರು ನಿಮಗಾಗಿ ಶಿಫಾರಸು ಮಾಡಿದ್ದಾರೆ',
      teacherNoteLabel: 'ಶಿಕ್ಷಕರ ಟಿಪ್ಪಣಿ'
    },
    teacher: {
      title: 'ಶಿಕ್ಷಕರ ವಿಭಾಗ ಮತ್ತು ತರಗತಿ',
      subtitle: 'ನೋಂದಾಯಿತ ವಿದ್ಯಾರ್ಥಿಗಳ ಪ್ರತಿಭೆ ಪರಿಶೀಲಿಸಿ, ಕಾರ್ಯಕ್ಷಮತೆ ನವೀಕರಿಸಿ ಮತ್ತು ಅವಕಾಶಗಳನ್ನು ಶಿಫಾರಸು ಮಾಡಿ.',
      rosterTitle: 'ತರಗತಿಯಲ್ಲಿ ನೋಂದಾಯಿತ ವಿದ್ಯಾರ್ಥಿಗಳು',
      rosterSubtitle: 'Found. ನಲ್ಲಿ ಪ್ರೊಫೈಲ್ ರಚಿಸಿದ ವಿದ್ಯಾರ್ಥಿಗಳು.',
      selectStudentPrompt: 'ವಿದ್ಯಾರ್ಥಿಯನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      noStudentsRegistered: 'ತರಗತಿಯಲ್ಲಿ ಇನ್ನೂ ಯಾವುದೇ ವಿದ್ಯಾರ್ಥಿಗಳು ನೋಂದಾಯಿಸಿಕೊಂಡಿಲ್ಲ',
      noStudentsDesc: 'ವಿದ್ಯಾರ್ಥಿಗಳು ತಮ್ಮ ಪ್ರೊಫೈಲ್ ರಚಿಸಿದ ತಕ್ಷಣ, ಅವರು ಇಲ್ಲಿ ತಾನಾಗಿಯೇ ಕಾಣಿಸಿಕೊಳ್ಳುತ್ತಾರೆ.',
      recommendTitle: 'ವಿದ್ಯಾರ್ಥಿಗೆ ಅವಕಾಶ ಶಿಫಾರಸು ಮಾಡಿ',
      recommendSubtitle: 'ಈ ಅವಕಾಶವು ಆ ವಿದ್ಯಾರ್ಥಿಯ ಅವಕಾಶಗಳ ಪುಟದಲ್ಲಿ ಪ್ರಮುಖವಾಗಿ ಕಾಣಿಸುತ್ತದೆ.',
      selectOpportunity: 'ಅವಕಾಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ',
      teacherNote: 'ವೈಯಕ್ತಿಕ ಶಿಕ್ಷಕರ ಸಲಹೆ / ಟಿಪ್ಪಣಿ',
      sendRecommendation: 'ಶಿಫಾರಸು ಕಳುಹಿಸಿ',
      updatePerformanceTitle: 'ಕಾರ್ಯಕ್ಷಮತೆಯ ಅಂಕಗಳನ್ನು ನವೀಕರಿಸಿ',
      performanceRatingLabel: 'ಒಟ್ಟಾರೆ ಕಾರ್ಯಕ್ಷಮತೆ ರೇಟಿಂಗ್ (1–5 ನಕ್ಷತ್ರಗಳು)',
      addCommentTitle: 'ಮಾರ್ಗದರ್ಶನ ಅಭಿಪ್ರಾಯ / ಕಾಮೆಂಟ್ ಸೇರಿಸಿ',
      commentPlaceholder: 'ಈ ವಿದ್ಯಾರ್ಥಿಗೆ ಪ್ರೋತ್ಸಾಹಕರ ಮತ್ತು ಮಾರ್ಗದರ್ಶಕ ಅಭಿಪ್ರಾಯ ಬರೆಯಿರಿ...',
      saveComment: 'ಪ್ರೊಫೈಲ್‌ಗೆ ಕಾಮೆಂಟ್ ಸೇರಿಸಿ',
      savePerformance: 'ಕಾರ್ಯಕ್ಷಮತೆ ನವೀಕರಣ ಉಳಿಸಿ'
    },
    status: {
      verified: 'ನೈಜ — ಅಧಿಕೃತ ಮೂಲದಿಂದ ದೃಢೀಕರಿಸಲಾಗಿದೆ',
      secondary: 'ನೈಜ — ದ್ವಿತೀಯ ಮೂಲ',
      awaiting: 'ಪರಿಶೀಲನೆ ಬಾಕಿ ಇದೆ',
      expired: 'ಅವಧಿ ಮೀರಿದೆ',
      demo: 'ಡೆಮೊ ಮಾಹಿತಿ'
    },
    options: {
      // Subjects
      'Mathematics': 'ಗಣಿತ',
      'Physical Science': 'ಭೌತ ವಿಜ್ಞಾನ',
      'Biology': 'ಜೀವ ವಿಜ್ಞಾನ',
      'Computer Applications': 'ಗಣಕಯಂತ್ರ (ಕಂಪ್ಯೂಟರ್)',
      'English Literature': 'ಇಂಗ್ಲಿಷ್ ಸಾಹಿತ್ಯ',
      'Social Studies': 'ಸಮಾಜ ವಿಜ್ಞಾನ',
      'Kannada': 'ಕನ್ನಡ',
      'Hindi': 'ಹಿಂದಿ',
      // Sports
      'Cricket': 'ಕ್ರಿಕೆಟ್',
      'Football': 'ಫುಟ್‌ಬಾಲ್',
      'Athletics (Running/Jumps)': 'ಅಥ್ಲೆಟಿಕ್ಸ್ (ಓಟ/ಜಿಗಿತ)',
      'Badminton': 'ಬ್ಯಾಡ್ಮಿಂಟನ್',
      'Volleyball': 'ವಾಲಿಬಾಲ್',
      'Basketball': 'ಬಾಸ್ಕೆಟ್‌ಬಾಲ್',
      'Swimming': 'ಈಜು',
      'Kabaddi': 'ಕಬಡ್ಡಿ',
      'Chess': 'ಚದುರಂಗ (ಚೆಸ್)',
      'Not into sports': 'ಕ್ರೀಡೆಗಳಲ್ಲಿ ಆಸಕ್ತಿಯಿಲ್ಲ / ಇತರೆ ಚಟುವಟಿಕೆಗಳು ಇಷ್ಟ',
      'notIntoSportsSubtitle': 'ಶೈಕ್ಷಣಿಕ, ತಂತ್ರಜ್ಞಾನ, ಕಲೆ ಮತ್ತು ಸೃಜನಶೀಲತೆಯ ಕಡೆಗೆ ಹೆಚ್ಚಿನ ಒಲವು',
      // Sports Levels
      'not_active': 'ಕ್ರೀಡೆಯಲ್ಲಿ ಭಾಗವಹಿಸುವುದಿಲ್ಲ / ಕ್ರೀಡೇತರ ವಿಷಯಗಳಲ್ಲಿ ಆಸಕ್ತಿ',
      'casual': 'ಸ್ನೇಹಿತರೊಂದಿಗೆ ಮೈದಾನದಲ್ಲಿ ಸಾಮಾನ್ಯ ಆಟ',
      'school_team': 'ಶಾಲಾ ತಂಡ / ಶಾಲಾ ಮಟ್ಟದ ಸ್ಪರ್ಧೆ',
      'district_competitor': 'ಜಿಲ್ಲಾ ಅಥವಾ ರಾಜ್ಯ ಮಟ್ಟದ ಕ್ರೀಡಾಪಟು',
      // Arts
      'Drawing & Sketching': 'ಚಿತ್ರ ಬಿಡಿಸುವುದು / ರೇಖಾಚಿತ್ರ',
      'Painting (Watercolour/Acrylic)': 'ಚಿತ್ರಕಲೆ (ಜಲವರ್ಣ/ಆಕ್ರಿಲಿಕ್)',
      'Classical or Light Music': 'ಶಾಸ್ತ್ರೀಯ ಅಥವಾ ಸುಗಮ ಸಂಗೀತ',
      'Singing': 'ಹಾಡುಗಾರಿಕೆ',
      'Classical / Folk Dance': 'ಶಾಸ್ತ್ರೀಯ / ಜಾನಪದ ನೃತ್ಯ',
      'Creative Writing & Poetry': 'ಸೃಜನಶೀಲ ಬರವಣಿಗೆ ಮತ್ತು ಕವನ',
      'Theatre & Acting': 'ನಾಟಕ ಮತ್ತು ನಟನೆ',
      'Handmade Crafts & Clay': 'ಕರಕುಶಲ ಕಲೆ ಮತ್ತು ಜೇಡಿಮಣ್ಣಿನ ಕಲೆ',
      // Tech
      'Coding & Software': 'ಕೋಡಿಂಗ್ ಮತ್ತು ತಂತ್ರಾಂಶ',
      'Robotics & Automation': 'ರೋಬೋಟಿಕ್ಸ್ ಮತ್ತು ಯಾಂತ್ರೀಕರಣ',
      'Science Lab Experiments': 'ವಿಜ್ಞಾನ ಪ್ರಯೋಗಶಾಲೆ ಪ್ರಯೋಗಗಳು',
      'Building Electronics (Circuits)': 'ಎಲೆಕ್ಟ್ರಾನಿಕ್ಸ್ ಸರ್ಕ್ಯೂಟ್ ನಿರ್ಮಾಣ',
      'Digital Creativity & 3D Design': 'ಡಿಜಿಟಲ್ ಕಲೆ ಮತ್ತು 3D ವಿನ್ಯಾಸ',
      'Mobile Apps & Games': 'ಮೊಬೈಲ್ ಆ್ಯಪ್ ಮತ್ತು ಆಟಗಳ ರಚನೆ',
      'Artificial Intelligence': 'ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆ (AI)',
      // Soft Skills
      'Leadership & Organizing': 'ನಾಯಕತ್ವ ಮತ್ತು ಸಂಘಟನೆ',
      'Clear Communication': 'ಸ್ಪಷ್ಟ ಸಂವಹನ',
      'Public Speaking': 'ಭಾಷಣ ಕಲೆ / ಸಾರ್ವಜನಿಕ ಮಾತು',
      'Team Collaboration': 'ತಂಡದಲ್ಲಿ ಸಹಕಾರ',
      'Problem Solving': 'ಸಮಸ್ಯೆ ಪರಿಹಾರ ಸಾಮರ್ಥ್ಯ',
      'Empathy & Helping Others': 'ಸಹಾನುಭೂತಿ ಮತ್ತು ಇತರರಿಗೆ ನೆರವು',
      'Attention to Detail': 'ಸೂಕ್ಷ್ಮ ವಿವರಗಳ ಗಮನ',
      'Creative Thinking': 'ಸೃಜನಾತ್ಮಕ ಆಲೋಚನೆ',
      // Work Styles
      'hands_on': 'ಪ್ರಾಯೋಗಿಕ ನಿರ್ಮಾಣ (ಪ್ರಯೋಗಗಳು ಮತ್ತು ಮಾದರಿಗಳನ್ನು ತಯಾರಿಸುವುದು)',
      'reading_thinking': 'ಓದುವುದು ಮತ್ತು ಆಲೋಚಿಸುವುದು (ಆಳವಾದ ವಿಶ್ಲೇಷಣೆ)',
      'talking_collaborating': 'ಚರ್ಚೆ ಮತ್ತು ಸಹಯೋಗ (ಸಂವಾದ ಮತ್ತು ಗುಂಪು ಚಟುವಟಿಕೆ)',
      'creative_designing': 'ಸೃಜನಾತ್ಮಕ ವಿನ್ಯಾಸ (ಚಿತ್ರ ಬಿಡಿಸುವುದು ಮತ್ತು ಕಲ್ಪನೆ)',
      // Categories
      'All': 'ಎಲ್ಲಾ ವರ್ಗಗಳು',
      'Academics': 'ಶೈಕ್ಷಣಿಕ',
      'Scholarships': 'ವಿದ್ಯಾರ್ಥಿವೇತನಗಳು',
      'Sports': 'ಕ್ರೀಡೆಗಳು',
      'Arts & Creativity': 'ಕಲೆ ಮತ್ತು ಸೃಜನಶೀಲತೆ',
      'Technology': 'ತಂತ್ರಜ್ಞಾನ',
      'Leadership': 'ನಾಯಕತ್ವ',
      'Workshops': 'ಕಾರ್ಯಾಗಾರಗಳು'
    }
  }
};

export type UserRole = 'student' | 'teacher' | 'admin';

export interface AuthUser {
  id: string;
  name: string;
  email?: string;
  role: 'student' | 'teacher';
}

export type VerificationStatus = 
  | 'REAL_OFFICIAL_VERIFIED'
  | 'REAL_SECONDARY_SOURCE'
  | 'AWAITING_VERIFICATION'
  | 'EXPIRED'
  | 'DEMO_DATA';

export type OpportunityCategory = 
  | 'Academics'
  | 'Scholarships'
  | 'Sports'
  | 'Arts & Creativity'
  | 'Technology'
  | 'Leadership'
  | 'Workshops'
  | 'Other';

export interface LocationCoordinates {
  lat: number;
  lng: number;
}

export interface OpportunityLocation {
  country: string;
  state: string;
  district: string;
  city: string;
  locality?: string;
  address?: string;
  coordinates?: LocationCoordinates;
  isOnline: boolean;
  isNational: boolean;
}

export interface Opportunity {
  id: string;
  title: string;
  subtitle?: string;
  description: string;
  organizer: string;
  category: OpportunityCategory;
  tags: string[];
  
  // Eligibility
  minGrade: number; // e.g. 6
  maxGrade: number; // e.g. 12
  minAge?: number;
  maxAge?: number;
  genderEligibility?: 'all' | 'female_only' | 'male_only';
  academicStream?: string[];
  eligibilityDescription: string;
  requiredDocuments: string[];
  
  // Location & Format
  location: OpportunityLocation;
  
  // Timeline
  applicationOpeningDate?: string;
  deadline: string; // ISO date string
  eventStartDate: string; // ISO date string
  eventEndDate?: string;
  
  // Costs & Prizes
  isFree: boolean;
  registrationFees?: string;
  prizesOrBenefits?: string;
  
  // URLs & Verification Integrity
  registrationUrl: string;
  sourceUrl: string;
  sourceStatus: VerificationStatus;
  lastChecked: string;
  officialSourceType: 'government_portal' | 'official_foundation' | 'state_association' | 'verified_secondary';
  
  // Admin & Meta
  featured?: boolean;
  createdAt: string;
}

export interface StudentDemographics {
  fullName: string;
  preferredName: string;
  grade: number; // 6 - 12
  schoolName: string;
  schoolType?: 'government' | 'aided' | 'private' | 'other';
  state: string;
  district: string;
  city: string;
  locality: string;
  coordinates?: LocationCoordinates;
}

export interface QuestionnaireResponses {
  // Stage 1: Demographics
  demographics: StudentDemographics;
  
  // Stage 2: Academics
  favoriteSubjects: string[];
  strongestSubjects: string[];
  subjectsToImprove: string[];
  mathInterest: number; // 1 - 5
  scienceCuriosity: number; // 1 - 5
  readingWritingEnjoyment: number; // 1 - 5
  quizCompetitionInterest: boolean;
  
  // Stage 3: Sports
  favoriteSports: string[];
  sportsParticipationLevel: 'casual' | 'school_team' | 'district_competitor' | 'beginner' | 'not_active';
  prefersTeamOrIndividual: 'team' | 'individual' | 'both';
  athleticsInterest: boolean;
  wantsToLearnSports: string[];
  
  // Stage 4: Arts & Creativity
  creativeInterests: string[];
  participationExperience: string[];
  
  // Stage 5: Technology & STEM
  technologyInterests: string[];
  hasComputerAccess: boolean;
  
  // Stage 6: Personality & Soft Skills
  softSkills: string[];
  preferredWorkStyle: 'hands_on' | 'reading_thinking' | 'talking_collaborating' | 'creative_designing';
  
  // Stage 7: Aspirations
  careerAmbitions: string[];
  opportunityTypesWanted: OpportunityCategory[];
  wantsScholarships: boolean;
  personalGoals: string;
}

export interface TalentScoreBreakdown {
  academics: number;      // 0 - 100
  stem: number;           // 0 - 100
  sports: number;         // 0 - 100
  arts: number;           // 0 - 100
  leadership: number;     // 0 - 100
  communication: number;  // 0 - 100
  practicalInnovation: number; // 0 - 100
}

export interface TalentAnalysis {
  scores: TalentScoreBreakdown;
  primaryArchetype: string;
  keyStrengths: string[];
  developmentAreas: string[];
  narrativeSummary: string;
  recommendedActivityTypes: string[];
  generatedAt: string;
}

export interface TeacherComment {
  id: string;
  teacherName: string;
  comment: string;
  createdAt: string;
  performanceRating?: number; // 1 to 5
}

export interface TeacherRecommendation {
  id: string;
  opportunityId: string;
  teacherName: string;
  note?: string;
  date: string;
}

export interface StudentProfile {
  id: string;
  userId: string;
  demographics: StudentDemographics;
  questionnaire: QuestionnaireResponses;
  analysis: TalentAnalysis;
  savedOpportunityIds: string[];
  appliedOpportunityIds: string[];
  achievements: Achievement[];
  goals: StudentGoal[];
  notifications: AppNotification[];
  profileCompletionPercentage: number;
  avatarSeed: string;
  
  // Teacher Feedback & Sync
  teacherComments?: TeacherComment[];
  teacherRecommendations?: TeacherRecommendation[];
  teacherPerformanceRating?: number;
  
  createdAt: string;
  updatedAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  category: OpportunityCategory;
  badgeType: 'First Competition' | 'Curious Mind' | 'Creative Explorer' | 'Rising Athlete' | 'Young Innovator' | 'Community Leader';
  dateEarned: string;
  description: string;
  issuer: string;
  certificateUrl?: string;
  isVerifiedByTeacher: boolean;
}

export interface StudentGoal {
  id: string;
  title: string;
  targetDate: string;
  category: OpportunityCategory;
  isCompleted: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  message: string;
  type: 'opportunity_match' | 'deadline_warning' | 'teacher_recommendation' | 'badge_earned' | 'system';
  date: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface OpportunityMatchResult {
  opportunity: Opportunity;
  matchScore: number;
  distanceKm?: number;
  locationScope: 'local_area' | 'city' | 'district' | 'state' | 'national' | 'online';
  reasons: string[];
  isEligibleGrade: boolean;
  isEligibleAge: boolean;
  isTeacherRecommended?: boolean;
  teacherRecommendationNote?: string;
}

export interface IngestionLog {
  id: string;
  timestamp: string;
  sourceName: string;
  status: 'SUCCESS' | 'PARTIAL' | 'ERROR';
  itemsDiscovered: number;
  itemsVerified: number;
  itemsRejected: number;
  message: string;
}

export type SupportedLanguage = 'en' | 'kn';

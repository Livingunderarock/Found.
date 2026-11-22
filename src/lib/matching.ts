import { Opportunity, OpportunityMatchResult, StudentProfile, LocationCoordinates } from '../types';
import { calculateDistanceKm } from '../data/locations';

export interface MatchFilterOptions {
  scope?: 'local_area' | 'city' | 'district' | 'state' | 'national' | 'online' | 'all';
  maxRadiusKm?: number;
  category?: string;
  minGrade?: number;
  maxGrade?: number;
  verifiedOnly?: boolean;
  freeOnly?: boolean;
  searchQuery?: string;
  targetLocation?: {
    state?: string;
    city?: string;
    locality?: string;
    coordinates?: LocationCoordinates;
  };
}

export function matchOpportunityForStudent(
  opportunity: Opportunity,
  profile: StudentProfile,
  customLocation?: {
    state?: string;
    city?: string;
    locality?: string;
    coordinates?: LocationCoordinates;
  }
): OpportunityMatchResult {
  const studentLoc = customLocation || profile.demographics;
  const reasons: string[] = [];
  let score = 50;

  // Check if recommended by teacher
  const teacherRec = profile.teacherRecommendations?.find(r => r.opportunityId === opportunity.id);
  const isTeacherRecommended = Boolean(teacherRec);
  const teacherRecommendationNote = teacherRec?.note;

  if (isTeacherRecommended) {
    score += 35;
    reasons.unshift(`Teacher Recommended: "${teacherRecommendationNote || 'Recommended for your talent profile'}"`);
  }

  // 1. Grade Eligibility Check
  const studentGrade = profile.demographics.grade;
  const isEligibleGrade = studentGrade >= opportunity.minGrade && studentGrade <= opportunity.maxGrade;
  
  if (isEligibleGrade) {
    score += 15;
    reasons.push(`Eligible for Class ${studentGrade} (Accepts Classes ${opportunity.minGrade}–${opportunity.maxGrade})`);
  } else if (studentGrade < opportunity.minGrade) {
    score -= 20;
    reasons.push(`Requires minimum Class ${opportunity.minGrade}`);
  } else {
    score -= 20;
    reasons.push(`Restricted up to Class ${opportunity.maxGrade}`);
  }

  const isEligibleAge = true;

  // 2. Category & Interest Match
  const scores = profile.analysis.scores;
  if (opportunity.category === 'Academics') {
    if (scores.academics >= 75) {
      score += 20;
      reasons.push('Aligns with your academic interest & logical reasoning');
    }
  } else if (opportunity.category === 'Technology') {
    if (scores.stem >= 75 || scores.practicalInnovation >= 75) {
      score += 22;
      reasons.push('Matches your curiosity for technology, coding, and prototyping');
    }
  } else if (opportunity.category === 'Sports') {
    if (scores.sports >= 70) {
      score += 25;
      reasons.push('Tailored to your sporting passion and competitive goals');
    }
  } else if (opportunity.category === 'Arts & Creativity') {
    if (scores.arts >= 70) {
      score += 22;
      reasons.push('Nurtures your creative arts and storytelling abilities');
    }
  } else if (opportunity.category === 'Leadership') {
    if (scores.leadership >= 70 || scores.communication >= 70) {
      score += 18;
      reasons.push('Develops your communication and leadership potential');
    }
  } else if (opportunity.category === 'Scholarships') {
    if (profile.questionnaire.wantsScholarships) {
      score += 15;
      reasons.push('Matches your interest in educational scholarships');
    }
  }

  // 3. Location Proximity
  let locationScope: OpportunityMatchResult['locationScope'] = 'national';
  let distanceKm: number | undefined = undefined;

  const oppLoc = opportunity.location;

  if (oppLoc.isOnline) {
    locationScope = 'online';
    score += 5;
    reasons.push('Available online from anywhere');
  } else if (oppLoc.isNational) {
    locationScope = 'national';
    reasons.push('National-level opportunity');
  } else {
    const stateMatches = oppLoc.state.toLowerCase() === studentLoc.state?.toLowerCase() || oppLoc.state === 'All States';
    const cityMatches = oppLoc.city.toLowerCase() === studentLoc.city?.toLowerCase() || oppLoc.city === 'Pan-Karnataka' || oppLoc.city === 'Pan-India';
    const localityMatches = !!(oppLoc.locality && studentLoc.locality && oppLoc.locality.toLowerCase().includes(studentLoc.locality.toLowerCase()));

    if (oppLoc.coordinates && studentLoc.coordinates) {
      distanceKm = calculateDistanceKm(studentLoc.coordinates, oppLoc.coordinates);
    }

    if (localityMatches || (distanceKm !== undefined && distanceKm <= 10)) {
      locationScope = 'local_area';
      score += 20;
      reasons.push(`Near your locality in ${studentLoc.locality || studentLoc.city}${distanceKm ? ` (${distanceKm} km away)` : ''}`);
    } else if (cityMatches) {
      locationScope = 'city';
      score += 15;
      reasons.push(`In your city (${studentLoc.city})`);
    } else if (stateMatches) {
      locationScope = 'state';
      score += 10;
      reasons.push(`State-level program in ${studentLoc.state}`);
    } else {
      locationScope = 'national';
      score -= 10;
    }
  }

  const finalScore = Math.min(99, Math.max(15, Math.round(score)));

  return {
    opportunity,
    matchScore: finalScore,
    distanceKm,
    locationScope,
    reasons: reasons.slice(0, 3),
    isEligibleGrade,
    isEligibleAge,
    isTeacherRecommended,
    teacherRecommendationNote
  };
}

export function filterAndRankOpportunities(
  opportunities: Opportunity[],
  profile: StudentProfile,
  filters: MatchFilterOptions = {}
): OpportunityMatchResult[] {
  let matched = opportunities.map(opp => 
    matchOpportunityForStudent(opp, profile, filters.targetLocation)
  );

  if (filters.category && filters.category !== 'All') {
    matched = matched.filter(m => m.opportunity.category === filters.category);
  }

  if (filters.verifiedOnly) {
    matched = matched.filter(m => m.opportunity.sourceStatus === 'REAL_OFFICIAL_VERIFIED');
  }

  if (filters.freeOnly) {
    matched = matched.filter(m => m.opportunity.isFree);
  }

  if (filters.scope && filters.scope !== 'all') {
    if (filters.scope === 'local_area') {
      matched = matched.filter(m => m.locationScope === 'local_area' || (m.distanceKm !== undefined && m.distanceKm <= 15));
    } else if (filters.scope === 'city') {
      matched = matched.filter(m => m.locationScope === 'local_area' || m.locationScope === 'city');
    } else if (filters.scope === 'state') {
      matched = matched.filter(m => m.locationScope === 'local_area' || m.locationScope === 'city' || m.locationScope === 'state');
    } else if (filters.scope === 'online') {
      matched = matched.filter(m => m.opportunity.location.isOnline);
    } else if (filters.scope === 'national') {
      matched = matched.filter(m => m.opportunity.location.isNational);
    }
  }

  if (filters.maxRadiusKm && filters.maxRadiusKm > 0) {
    matched = matched.filter(m => {
      if (m.opportunity.location.isOnline || m.opportunity.location.isNational) return true;
      if (m.distanceKm === undefined) return true;
      return m.distanceKm <= (filters.maxRadiusKm as number);
    });
  }

  if (filters.searchQuery && filters.searchQuery.trim().length > 0) {
    const q = filters.searchQuery.toLowerCase().trim();
    matched = matched.filter(m => {
      const opp = m.opportunity;
      return (
        opp.title.toLowerCase().includes(q) ||
        opp.organizer.toLowerCase().includes(q) ||
        opp.description.toLowerCase().includes(q) ||
        opp.category.toLowerCase().includes(q) ||
        opp.location.city.toLowerCase().includes(q) ||
        opp.location.state.toLowerCase().includes(q) ||
        opp.tags.some(t => t.toLowerCase().includes(q))
      );
    });
  }

  // Teacher recommended items sort to top, then by matchScore descending
  return matched.sort((a, b) => {
    if (a.isTeacherRecommended && !b.isTeacherRecommended) return -1;
    if (!a.isTeacherRecommended && b.isTeacherRecommended) return 1;
    return b.matchScore - a.matchScore;
  });
}

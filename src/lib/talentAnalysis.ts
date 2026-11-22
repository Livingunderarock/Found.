import { QuestionnaireResponses, TalentAnalysis, TalentScoreBreakdown } from '../types';

export function computeTalentAnalysis(responses: QuestionnaireResponses): TalentAnalysis {
  // 1. Compute Academics Score
  let academicScore = 40;
  if (responses.favoriteSubjects?.some(s => ['Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology'].includes(s))) academicScore += 20;
  if (responses.strongestSubjects?.some(s => ['Mathematics', 'Science', 'Physics'].includes(s))) academicScore += 15;
  academicScore += (responses.mathInterest || 3) * 3;
  academicScore += (responses.scienceCuriosity || 3) * 3;
  if (responses.quizCompetitionInterest) academicScore += 10;
  academicScore = Math.min(100, Math.max(25, academicScore));

  // 2. Compute STEM / Tech Score
  let stemScore = 30;
  stemScore += (responses.technologyInterests?.length || 0) * 12;
  if (responses.technologyInterests?.includes('Coding')) stemScore += 10;
  if (responses.technologyInterests?.includes('Robotics')) stemScore += 10;
  stemScore += (responses.scienceCuriosity || 3) * 4;
  if (responses.preferredWorkStyle === 'hands_on') stemScore += 8;
  stemScore = Math.min(100, Math.max(20, stemScore));

  // 3. Compute Sports Score
  const isNotIntoSports = responses.favoriteSports?.includes('Not into sports') || responses.sportsParticipationLevel === 'not_active';
  const actualSports = responses.favoriteSports?.filter(s => s !== 'Not into sports') || [];
  
  let sportsScore = 20;
  if (isNotIntoSports) {
    sportsScore = 15;
  } else {
    if (responses.sportsParticipationLevel === 'district_competitor') sportsScore += 45;
    else if (responses.sportsParticipationLevel === 'school_team') sportsScore += 35;
    else if (responses.sportsParticipationLevel === 'casual') sportsScore += 20;
    else if (responses.sportsParticipationLevel === 'beginner') sportsScore += 10;
    sportsScore += actualSports.length * 8;
    if (responses.athleticsInterest) sportsScore += 12;
  }
  sportsScore = Math.min(100, Math.max(15, sportsScore));

  // 4. Compute Arts & Creativity Score
  let artsScore = 30;
  artsScore += (responses.creativeInterests?.length || 0) * 10;
  if (responses.creativeInterests?.includes('Painting') || responses.creativeInterests?.includes('Drawing')) artsScore += 10;
  if (responses.creativeInterests?.includes('Singing') || responses.creativeInterests?.includes('Dance')) artsScore += 10;
  if (responses.readingWritingEnjoyment >= 4) artsScore += 10;
  if (responses.preferredWorkStyle === 'creative_designing') artsScore += 10;
  artsScore = Math.min(100, Math.max(20, artsScore));

  // 5. Compute Leadership Score
  let leadershipScore = 40;
  if (responses.softSkills?.includes('Leadership')) leadershipScore += 20;
  if (responses.softSkills?.includes('Teamwork')) leadershipScore += 15;
  if (responses.prefersTeamOrIndividual === 'team') leadershipScore += 12;
  if (responses.softSkills?.includes('Problem Solving')) leadershipScore += 10;
  leadershipScore = Math.min(100, Math.max(25, leadershipScore));

  // 6. Compute Communication Score
  let commScore = 40;
  if (responses.softSkills?.includes('Communication')) commScore += 20;
  if (responses.softSkills?.includes('Public Speaking')) commScore += 20;
  if (responses.readingWritingEnjoyment >= 4) commScore += 10;
  if (responses.preferredWorkStyle === 'talking_collaborating') commScore += 10;
  commScore = Math.min(100, Math.max(25, commScore));

  // 7. Practical Innovation
  let practicalScore = 35;
  if (responses.technologyInterests?.includes('Science Experiments')) practicalScore += 18;
  if (responses.technologyInterests?.includes('Building Electronics')) practicalScore += 18;
  if (responses.preferredWorkStyle === 'hands_on') practicalScore += 15;
  practicalScore = Math.min(100, Math.max(25, practicalScore));

  const scores: TalentScoreBreakdown = {
    academics: academicScore,
    stem: stemScore,
    sports: sportsScore,
    arts: artsScore,
    leadership: leadershipScore,
    communication: commScore,
    practicalInnovation: practicalScore
  };

  // Determine Primary Archetype based on relative scores
  const scorePairs = [
    { key: 'academics', score: scores.academics, archetype: 'The Analytical Scholar' },
    { key: 'stem', score: scores.stem, archetype: 'The Scientific Inventor' },
    { key: 'sports', score: scores.sports, archetype: 'The Athletic Champion' },
    { key: 'arts', score: scores.arts, archetype: 'The Creative Storyteller' },
    { key: 'leadership', score: scores.leadership, archetype: 'The Youth Changemaker' }
  ].sort((a, b) => b.score - a.score);

  const primary = scorePairs[0];

  // Derive prominent strengths
  const keyStrengths: string[] = [];
  if (scores.academics >= 75) keyStrengths.push('Strong grasp of fundamental concepts and logical deduction');
  if (scores.stem >= 75) keyStrengths.push('Curiosity for hands-on engineering, coding, and technological experiments');
  if (scores.sports >= 75) keyStrengths.push('Exceptional physical agility, motor discipline, and competitive spirit');
  if (scores.arts >= 75) keyStrengths.push('Vivid imagination, aesthetic sensitivity, and creative storytelling');
  if (scores.leadership >= 75) keyStrengths.push('Infectious collaborative energy and natural leadership initiative');
  if (scores.communication >= 75) keyStrengths.push('Articulate expression and comfortable interpersonal communication');

  if (keyStrengths.length === 0) {
    keyStrengths.push('Broad-spectrum curiosity across academic subjects');
    keyStrengths.push('Openness to trying new creative and physical activities');
  }

  // Derive development areas based on student self-indicated needs
  const developmentAreas: string[] = [];
  if (responses.subjectsToImprove && responses.subjectsToImprove.length > 0) {
    developmentAreas.push(`Building structured study habits for ${responses.subjectsToImprove.join(' & ')}`);
  }
  if (scores.communication < 70) {
    developmentAreas.push('Practicing oral presentations and active debate in school forums');
  }
  if (scores.stem < 65 && responses.hasComputerAccess) {
    developmentAreas.push('Exploring introductory block coding (Scratch) or science lab toolkits');
  }
  if (developmentAreas.length === 0) {
    developmentAreas.push('Balancing intensive preparation with holistic rest and recovery');
  }

  // Recommended activities
  const recommendedActivityTypes: string[] = [];
  if (scores.academics >= 70) recommendedActivityTypes.push('Mathematics and Science Olympiads');
  if (scores.stem >= 70) recommendedActivityTypes.push('Science Exhibitions & INSPIRE MANAK Prototyping');
  if (scores.sports >= 70) recommendedActivityTypes.push('District sports selection trials & Khelo India Camps');
  if (scores.arts >= 70) recommendedActivityTypes.push('Kalashree Children\'s Art Contests & Creative Writing');
  if (scores.leadership >= 70) recommendedActivityTypes.push('Model Youth Parliaments & Student Leadership Initiatives');
  recommendedActivityTypes.push('Government Pre-Matric and Merit Scholarships');

  // Narrative summary
  const studentName = responses.demographics?.preferredName || 'You';
  const narrativeSummary = `${studentName} exhibits a distinctive affinity as "${primary.archetype}". Responses reflect lively curiosity in ${responses.favoriteSubjects?.slice(0, 2).join(' and ') || 'academic learning'} alongside a growing interest in ${responses.creativeInterests?.slice(0, 2).join(' or ') || actualSports.slice(0, 2).join(' or ') || 'innovative exploration'}. With dedicated mentorship and timely exposure to district and national opportunities, ${studentName} has high potential to excel in upcoming competitions and merit programs.`;

  return {
    scores,
    primaryArchetype: primary.archetype,
    keyStrengths: keyStrengths.slice(0, 3),
    developmentAreas: developmentAreas.slice(0, 2),
    narrativeSummary,
    recommendedActivityTypes: recommendedActivityTypes.slice(0, 4),
    generatedAt: new Date().toISOString()
  };
}

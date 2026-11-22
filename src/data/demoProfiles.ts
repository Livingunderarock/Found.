import { StudentProfile } from '../types';

export const DEMO_PROFILES: Record<string, StudentProfile> = {
  // Student A: Academic Explorer (Bengaluru / Jayanagar)
  'student-a': {
    id: 'demo-student-a',
    userId: 'user-aarav-sharma',
    demographics: {
      fullName: 'Aarav Sharma',
      preferredName: 'Aarav',
      grade: 9,
      schoolName: 'Govt Model High School, Jayanagar',
      schoolType: 'government',
      state: 'Karnataka',
      district: 'Bengaluru Urban',
      city: 'Bengaluru',
      locality: 'Jayanagar',
      coordinates: { lat: 12.9308, lng: 77.5838 }
    },
    questionnaire: {
      demographics: {
        fullName: 'Aarav Sharma',
        preferredName: 'Aarav',
        grade: 9,
        schoolName: 'Govt Model High School, Jayanagar',
        schoolType: 'government',
        state: 'Karnataka',
        district: 'Bengaluru Urban',
        city: 'Bengaluru',
        locality: 'Jayanagar',
        coordinates: { lat: 12.9308, lng: 77.5838 }
      },
      favoriteSubjects: ['Mathematics', 'Physical Science', 'Computer Applications'],
      strongestSubjects: ['Mathematics', 'Physics'],
      subjectsToImprove: ['English Communication', 'Social Studies'],
      mathInterest: 5,
      scienceCuriosity: 5,
      readingWritingEnjoyment: 4,
      quizCompetitionInterest: true,
      favoriteSports: ['Cricket', 'Chess'],
      sportsParticipationLevel: 'casual',
      prefersTeamOrIndividual: 'both',
      athleticsInterest: false,
      wantsToLearnSports: ['Badminton'],
      creativeInterests: ['Writing', 'Crafts'],
      participationExperience: ['School Science Club'],
      technologyInterests: ['Coding', 'Robotics', 'Science Experiments', 'Building Electronics'],
      hasComputerAccess: true,
      softSkills: ['Problem Solving', 'Logical Reasoning', 'Curiosity'],
      preferredWorkStyle: 'hands_on',
      careerAmbitions: ['Aerospace Engineering', 'Software Research', 'ISRO Scientist'],
      opportunityTypesWanted: ['Academics', 'Technology', 'Scholarships', 'Workshops'],
      wantsScholarships: true,
      personalGoals: 'Qualify for the national level in INSPIRE Awards and win a medal in the SOF Mathematics Olympiad.'
    },
    analysis: {
      scores: {
        academics: 94,
        stem: 96,
        sports: 48,
        arts: 52,
        leadership: 70,
        communication: 65,
        practicalInnovation: 92
      },
      primaryArchetype: 'The Scientific Inventor',
      keyStrengths: [
        'Advanced mathematical modeling & deductive logic',
        'Deep scientific curiosity & enthusiasm for prototyping',
        'Strong problem-solving persistence on complex challenges'
      ],
      developmentAreas: [
        'Public speaking & oral project defense before judging panels',
        'Broadening collaborative teamwork with diverse peers'
      ],
      narrativeSummary: 'Aarav shows exceptional analytical acumen in Mathematics and Physical Sciences, coupled with an innate urge to build practical inventions. He thrives in problem-oriented settings like Olympiads, science fairs, and tech hackathons. With focused support on communication and presentation skills, he is prime candidate for national research fellowships and innovation grants.',
      recommendedActivityTypes: [
        'Mathematics Olympiads & Advanced Problem Circles',
        'Grassroots Prototyping Competitions (INSPIRE MANAK)',
        'Hands-on Astronomy & Physics Labs at VITM & Planetarium',
        'Merit-based Government and Foundation Scholarships'
      ],
      generatedAt: '2026-11-20T10:00:00Z'
    },
    savedOpportunityIds: ['opp-inspire-manak', 'opp-sof-imo', 'opp-vitm-innovation', 'opp-ssp-karnataka'],
    appliedOpportunityIds: ['opp-sof-imo'],
    achievements: [
      {
        id: 'ach-1',
        title: 'District Science Exhibition 2nd Prize',
        category: 'Technology',
        badgeType: 'Young Innovator',
        dateEarned: '2026-09-15',
        description: 'Built a solar-powered soil moisture monitoring unit using recycled sensors.',
        issuer: 'Dept of School Education Karnataka (Bengaluru South)',
        isVerifiedByTeacher: true
      },
      {
        id: 'ach-2',
        title: 'School Mathematics Quiz Champion',
        category: 'Academics',
        badgeType: 'Curious Mind',
        dateEarned: '2026-10-04',
        description: 'First rank in inter-house Ramanujan Memorial Quiz.',
        issuer: 'Govt Model High School, Jayanagar',
        isVerifiedByTeacher: true
      }
    ],
    goals: [
      { id: 'g-1', title: 'Submit working prototype for INSPIRE Awards MANAK', targetDate: '2027-01-30', category: 'Technology', isCompleted: false },
      { id: 'g-2', title: 'Complete 5 past IMO Level 1 papers', targetDate: '2026-12-10', category: 'Academics', isCompleted: true },
      { id: 'g-3', title: 'Apply for Karnataka SSP Pre-Matric Grant', targetDate: '2026-12-20', category: 'Scholarships', isCompleted: false }
    ],
    notifications: [
      {
        id: 'notif-1',
        title: 'Deadline Approaching: SOF IMO 2026-27',
        message: 'Your saved registration for the International Mathematics Olympiad closes on Dec 15.',
        type: 'deadline_warning',
        date: '2026-11-21',
        isRead: false,
        actionUrl: '/opportunities'
      },
      {
        id: 'notif-2',
        title: 'Teacher Recommendation',
        message: 'Mr. K.V. Ramesh recommended the VITM Science Model Making Competition for you!',
        type: 'teacher_recommendation',
        date: '2026-11-20',
        isRead: false,
        actionUrl: '/opportunities'
      }
    ],
    profileCompletionPercentage: 100,
    avatarSeed: 'Aarav',
    createdAt: '2026-08-10',
    updatedAt: '2026-11-20'
  },

  // Student B: Sports Explorer (Mysuru / Vijayanagar)
  'student-b': {
    id: 'demo-student-b',
    userId: 'user-priya-nayak',
    demographics: {
      fullName: 'Priya Nayak',
      preferredName: 'Priya',
      grade: 8,
      schoolName: 'Vijayanagar High School, Mysuru',
      schoolType: 'aided',
      state: 'Karnataka',
      district: 'Mysuru',
      city: 'Mysuru',
      locality: 'Vijayanagar',
      coordinates: { lat: 12.3350, lng: 76.6110 }
    },
    questionnaire: {
      demographics: {
        fullName: 'Priya Nayak',
        preferredName: 'Priya',
        grade: 8,
        schoolName: 'Vijayanagar High School, Mysuru',
        schoolType: 'aided',
        state: 'Karnataka',
        district: 'Mysuru',
        city: 'Mysuru',
        locality: 'Vijayanagar',
        coordinates: { lat: 12.3350, lng: 76.6110 }
      },
      favoriteSubjects: ['Physical Education', 'General Science', 'Kannada'],
      strongestSubjects: ['Physical Education', 'Social Studies'],
      subjectsToImprove: ['Mathematics'],
      mathInterest: 2,
      scienceCuriosity: 3,
      readingWritingEnjoyment: 3,
      quizCompetitionInterest: false,
      favoriteSports: ['Cricket', 'Athletics (100m, 400m)', 'Volleyball'],
      sportsParticipationLevel: 'district_competitor',
      prefersTeamOrIndividual: 'team',
      athleticsInterest: true,
      wantsToLearnSports: ['Badminton', 'Taekwondo'],
      creativeInterests: ['Dance', 'Singing'],
      participationExperience: ['Mysuru District Athletic Meet', 'School Cricket XI'],
      technologyInterests: ['Digital Creativity'],
      hasComputerAccess: false,
      softSkills: ['Teamwork', 'Leadership', 'Resilience', 'Discipline'],
      preferredWorkStyle: 'hands_on',
      careerAmbitions: ['State / National Cricket Player', 'DYES Sports Officer'],
      opportunityTypesWanted: ['Sports', 'Scholarships', 'Leadership'],
      wantsScholarships: true,
      personalGoals: 'Get selected for the KSCA Under-14 Mysuru Zonal Cricket squad and qualify for Khelo India trials.'
    },
    analysis: {
      scores: {
        academics: 58,
        stem: 50,
        sports: 98,
        arts: 60,
        leadership: 88,
        communication: 76,
        practicalInnovation: 64
      },
      primaryArchetype: 'The Athletic Leader',
      keyStrengths: [
        'Superior spatial-motor coordination & athletic endurance',
        'Natural on-field leadership and team motivation',
        'Competitive grit under high-pressure match situations'
      ],
      developmentAreas: [
        'Time management balancing rigorous training with academic revision',
        'Structured nutritional and athletic recovery habits'
      ],
      narrativeSummary: 'Priya is a standout athletic talent with commanding team leadership. Her competitive focus in cricket and sprinting puts her in the top percentile of youth sports prospects in the Mysuru region. She responds exceptionally well to structured coaching, trials, and sports scholarships that support both her athletic dreams and schooling.',
      recommendedActivityTypes: [
        'KSCA Mofussil & Zonal Junior Cricket Selection Trials',
        'Khelo India Grassroots Talent Scouting Camps',
        'Karnataka DYES Sports Merit Grants',
        'District Inter-School Athletic Meets'
      ],
      generatedAt: '2026-11-20T10:00:00Z'
    },
    savedOpportunityIds: ['opp-ksca-mysuru', 'opp-khelo-india', 'opp-ksca-trials', 'opp-ssp-karnataka'],
    appliedOpportunityIds: ['opp-ksca-mysuru'],
    achievements: [
      {
        id: 'ach-b1',
        title: 'Mysuru Taluk 400m Sprint Gold',
        category: 'Sports',
        badgeType: 'Rising Athlete',
        dateEarned: '2026-10-18',
        description: 'First position in Mysuru Taluk Junior Athletics Meet.',
        issuer: 'Dept of Youth Empowerment & Sports Karnataka',
        isVerifiedByTeacher: true
      },
      {
        id: 'ach-b2',
        title: 'Inter-School Cricket Captain of the Tournament',
        category: 'Sports',
        badgeType: 'Community Leader',
        dateEarned: '2026-08-25',
        description: 'Led school team to finals, scored 142 runs and took 7 wickets.',
        issuer: 'Mysuru District Sports Council',
        isVerifiedByTeacher: true
      }
    ],
    goals: [
      { id: 'gb-1', title: 'Attend KSCA Under-14 selection trials in Manasagangothri', targetDate: '2027-03-20', category: 'Sports', isCompleted: false },
      { id: 'gb-2', title: 'Submit SSP Pre-Matric application', targetDate: '2027-01-15', category: 'Scholarships', isCompleted: false }
    ],
    notifications: [
      {
        id: 'notif-b1',
        title: 'Local Event Discovered in Mysuru!',
        message: 'KSCA Mysuru Zone Junior Selection Trials matches your cricket profile.',
        type: 'opportunity_match',
        date: '2026-11-20',
        isRead: false,
        actionUrl: '/opportunities'
      }
    ],
    profileCompletionPercentage: 100,
    avatarSeed: 'Priya',
    createdAt: '2026-09-01',
    updatedAt: '2026-11-20'
  },

  // Student C: Creative Explorer (Mangaluru / Hampankatta)
  'student-c': {
    id: 'demo-student-c',
    userId: 'user-ananya-rao',
    demographics: {
      fullName: 'Ananya Rao',
      preferredName: 'Ananya',
      grade: 10,
      schoolName: 'St. Aloysius High School, Mangaluru',
      schoolType: 'aided',
      state: 'Karnataka',
      district: 'Mangaluru (Dakshina Kannada)',
      city: 'Mangaluru',
      locality: 'Hampankatta',
      coordinates: { lat: 12.8680, lng: 74.8420 }
    },
    questionnaire: {
      demographics: {
        fullName: 'Ananya Rao',
        preferredName: 'Ananya',
        grade: 10,
        schoolName: 'St. Aloysius High School, Mangaluru',
        schoolType: 'aided',
        state: 'Karnataka',
        district: 'Mangaluru (Dakshina Kannada)',
        city: 'Mangaluru',
        locality: 'Hampankatta',
        coordinates: { lat: 12.8680, lng: 74.8420 }
      },
      favoriteSubjects: ['English Literature', 'Art & Craft', 'History', 'Kannada'],
      strongestSubjects: ['Art', 'Languages', 'Environmental Studies'],
      subjectsToImprove: ['Physics', 'Algebra'],
      mathInterest: 2,
      scienceCuriosity: 3,
      readingWritingEnjoyment: 5,
      quizCompetitionInterest: true,
      favoriteSports: ['Badminton', 'Swimming'],
      sportsParticipationLevel: 'casual',
      prefersTeamOrIndividual: 'individual',
      athleticsInterest: false,
      wantsToLearnSports: ['Yoga'],
      creativeInterests: ['Drawing', 'Painting', 'Singing', 'Dance', 'Writing', 'Theatre'],
      participationExperience: ['District Kalashree Participant', 'School Choir Lead'],
      technologyInterests: ['Digital Creativity'],
      hasComputerAccess: true,
      softSkills: ['Empathy', 'Creative Expression', 'Public Speaking', 'Storytelling'],
      preferredWorkStyle: 'creative_designing',
      careerAmbitions: ['Visual Designer', 'Children\'s Book Illustrator', 'Cultural Journalist'],
      opportunityTypesWanted: ['Arts & Creativity', 'Scholarships', 'Workshops'],
      wantsScholarships: true,
      personalGoals: 'Win a state-level award in painting and publish an illustrated story in a youth magazine.'
    },
    analysis: {
      scores: {
        academics: 78,
        stem: 45,
        sports: 40,
        arts: 98,
        leadership: 72,
        communication: 92,
        practicalInnovation: 82
      },
      primaryArchetype: 'The Creative Storyteller',
      keyStrengths: [
        'Vivid aesthetic sensibility & mastery across visual arts',
        'Nuanced expressive writing and classical vocal aptitude',
        'Deep empathetic connection and narrative intuition'
      ],
      developmentAreas: [
        'Digital design software tools (Figma, Procreate, Vector art)',
        'Commercial portfolio curation and project pitching'
      ],
      narrativeSummary: 'Ananya embodies an inspiring balance of visual arts, literary depth, and vocal expression. Her sensitivity to color, story, and tradition sets her apart. She will flourish when connected with fine arts fellowships, creative writing competitions, youth cultural festivals, and mentorship from established artists and illustrators.',
      recommendedActivityTypes: [
        'State Kalashree Arts & Painting Competitions',
        'National School Essay & Creative Writing Contests (Tata Building India)',
        'Coastal Karnataka Classical Vocal Festivals',
        'Youth Cultural Grants and Literature Festivals'
      ],
      generatedAt: '2026-11-20T10:00:00Z'
    },
    savedOpportunityIds: ['opp-bal-bhavan-art', 'opp-tata-essay', 'opp-mangaluru-music', 'opp-ssp-karnataka'],
    appliedOpportunityIds: ['opp-bal-bhavan-art'],
    achievements: [
      {
        id: 'ach-c1',
        title: 'Coastal Children\'s Art Fest 1st Prize',
        category: 'Arts & Creativity',
        badgeType: 'Creative Explorer',
        dateEarned: '2026-07-22',
        description: 'Watercolour landscape depicting Mangalore port life.',
        issuer: 'Dakshina Kannada Art Society',
        isVerifiedByTeacher: true
      },
      {
        id: 'ach-c2',
        title: 'Young Author Certificate of Merit',
        category: 'Arts & Creativity',
        badgeType: 'Curious Mind',
        dateEarned: '2026-09-12',
        description: 'Short story featured in Karnataka Children\'s Literary Journal.',
        issuer: 'Karnataka Sahitya Parishat Youth Wing',
        isVerifiedByTeacher: true
      }
    ],
    goals: [
      { id: 'gc-1', title: 'Submit 2 watercolour paintings to Bal Bhavan Kalashree', targetDate: '2027-02-15', category: 'Arts & Creativity', isCompleted: false },
      { id: 'gc-2', title: 'Draft and polish essay for Tata Building India', targetDate: '2027-01-10', category: 'Arts & Creativity', isCompleted: false }
    ],
    notifications: [
      {
        id: 'notif-c1',
        title: 'New Arts Opportunity Available',
        message: 'Bal Bhavan Karnataka Kalashree Drawing Contest is now open for Class 10 students.',
        type: 'opportunity_match',
        date: '2026-11-20',
        isRead: false,
        actionUrl: '/opportunities'
      }
    ],
    profileCompletionPercentage: 100,
    avatarSeed: 'Ananya',
    createdAt: '2026-08-05',
    updatedAt: '2026-11-20'
  }
};

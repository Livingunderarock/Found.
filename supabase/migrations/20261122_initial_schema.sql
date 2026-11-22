-- FOUND. Database Migration
-- PostgreSQL / Supabase Schema for Location-Aware Student Talent Discovery Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Schools Table
CREATE TABLE IF NOT EXISTS public.schools (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    school_code TEXT UNIQUE,
    school_type TEXT NOT NULL CHECK (school_type IN ('government', 'aided', 'private', 'international', 'other')),
    board TEXT NOT NULL, -- 'Karnataka State Board', 'CBSE', 'ICSE', etc.
    state TEXT NOT NULL DEFAULT 'Karnataka',
    district TEXT NOT NULL,
    city TEXT NOT NULL,
    locality TEXT,
    pincode TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Student Profiles
CREATE TABLE IF NOT EXISTS public.student_profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE,
    school_id UUID REFERENCES public.schools(id) ON DELETE SET NULL,
    full_name TEXT NOT NULL,
    preferred_name TEXT NOT NULL,
    grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 12),
    state TEXT NOT NULL DEFAULT 'Karnataka',
    district TEXT NOT NULL,
    city TEXT NOT NULL,
    locality TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    primary_archetype TEXT,
    academic_score INTEGER DEFAULT 50,
    stem_score INTEGER DEFAULT 50,
    sports_score INTEGER DEFAULT 50,
    arts_score INTEGER DEFAULT 50,
    leadership_score INTEGER DEFAULT 50,
    communication_score INTEGER DEFAULT 50,
    practical_score INTEGER DEFAULT 50,
    narrative_summary TEXT,
    profile_completion_percentage INTEGER DEFAULT 100,
    is_private BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Teachers Table
CREATE TABLE IF NOT EXISTS public.teachers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE,
    school_id UUID REFERENCES public.schools(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    department TEXT NOT NULL,
    designation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Opportunity Categories
CREATE TABLE IF NOT EXISTS public.opportunity_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT
);

-- 5. Opportunities Table
CREATE TABLE IF NOT EXISTS public.opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    subtitle TEXT,
    description TEXT NOT NULL,
    organizer TEXT NOT NULL,
    category TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    min_grade INTEGER NOT NULL DEFAULT 6,
    max_grade INTEGER NOT NULL DEFAULT 12,
    min_age INTEGER,
    max_age INTEGER,
    gender_eligibility TEXT DEFAULT 'all',
    eligibility_description TEXT NOT NULL,
    required_documents TEXT[] DEFAULT '{}',
    country TEXT NOT NULL DEFAULT 'India',
    state TEXT NOT NULL DEFAULT 'Karnataka',
    district TEXT NOT NULL,
    city TEXT NOT NULL,
    locality TEXT,
    address TEXT,
    latitude DOUBLE PRECISION,
    longitude DOUBLE PRECISION,
    is_online BOOLEAN DEFAULT FALSE,
    is_national BOOLEAN DEFAULT FALSE,
    deadline DATE NOT NULL,
    event_start_date DATE NOT NULL,
    event_end_date DATE,
    is_free BOOLEAN DEFAULT TRUE,
    registration_fees TEXT DEFAULT 'Free',
    prizes_or_benefits TEXT,
    registration_url TEXT NOT NULL,
    source_url TEXT NOT NULL,
    source_status TEXT NOT NULL CHECK (source_status IN ('REAL_OFFICIAL_VERIFIED', 'REAL_SECONDARY_SOURCE', 'AWAITING_VERIFICATION', 'EXPIRED', 'DEMO_DATA')),
    official_source_type TEXT NOT NULL DEFAULT 'government_portal',
    last_checked DATE DEFAULT CURRENT_DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_opportunities_category ON public.opportunities(category);
CREATE INDEX IF NOT EXISTS idx_opportunities_city ON public.opportunities(city);
CREATE INDEX IF NOT EXISTS idx_opportunities_state ON public.opportunities(state);
CREATE INDEX IF NOT EXISTS idx_opportunities_deadline ON public.opportunities(deadline);
CREATE INDEX IF NOT EXISTS idx_opportunities_grades ON public.opportunities(min_grade, max_grade);
CREATE INDEX IF NOT EXISTS idx_opportunities_status ON public.opportunities(source_status);

-- 6. Saved Opportunities (Bookmarks)
CREATE TABLE IF NOT EXISTS public.saved_opportunities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    opportunity_id UUID REFERENCES public.opportunities(id) ON DELETE CASCADE,
    saved_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(student_id, opportunity_id)
);

-- 7. Student Achievements & Badges
CREATE TABLE IF NOT EXISTS public.student_achievements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    student_id UUID REFERENCES public.student_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    category TEXT NOT NULL,
    badge_type TEXT NOT NULL,
    date_earned DATE NOT NULL,
    description TEXT,
    issuer TEXT NOT NULL,
    is_verified_by_teacher BOOLEAN DEFAULT FALSE,
    verified_by_teacher_id UUID REFERENCES public.teachers(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Ingestion Logs
CREATE TABLE IF NOT EXISTS public.ingestion_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    source_name TEXT NOT NULL,
    status TEXT NOT NULL,
    items_discovered INTEGER NOT NULL,
    items_verified INTEGER NOT NULL,
    items_rejected INTEGER NOT NULL,
    message TEXT
);

-- 9. Row Level Security Policies (RLS)
ALTER TABLE public.student_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_opportunities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.student_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.opportunities ENABLE ROW LEVEL SECURITY;

-- Read opportunities is public
CREATE POLICY "Opportunities are readable by all authenticated and anonymous users"
    ON public.opportunities FOR SELECT USING (true);

-- Student profiles are private by default
CREATE POLICY "Students can view and update their own profile"
    ON public.student_profiles FOR ALL
    USING (auth.uid() = user_id);

-- Teachers can view authorized students
CREATE POLICY "Teachers can view students in their school"
    ON public.student_profiles FOR SELECT
    USING (
        EXISTS (
            SELECT 1 FROM public.teachers
            WHERE teachers.user_id = auth.uid()
            AND teachers.school_id = student_profiles.school_id
        )
    );

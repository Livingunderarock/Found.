import { NextResponse } from 'next/server';
import { SEED_OPPORTUNITIES } from '@/data/seedOpportunities';
import { Opportunity } from '@/types';

// In-memory runtime storage for demo & local execution (falls back cleanly if no remote DB)
let runtimeOpportunities: Opportunity[] = [...SEED_OPPORTUNITIES];

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const city = searchParams.get('city');
    const query = searchParams.get('q');
    const verifiedOnly = searchParams.get('verifiedOnly') === 'true';

    let list = [...runtimeOpportunities];

    if (category && category !== 'All') {
      list = list.filter(o => o.category === category);
    }

    if (city && city !== 'All') {
      list = list.filter(o => 
        o.location.isNational || 
        o.location.isOnline || 
        o.location.city.toLowerCase() === city.toLowerCase()
      );
    }

    if (verifiedOnly) {
      list = list.filter(o => o.sourceStatus === 'REAL_OFFICIAL_VERIFIED');
    }

    if (query) {
      const q = query.toLowerCase().trim();
      list = list.filter(o =>
        o.title.toLowerCase().includes(q) ||
        o.organizer.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        o.category.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      count: list.length,
      data: list
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.title || !body.organizer || !body.sourceUrl) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: title, organizer, and sourceUrl are mandatory' },
        { status: 400 }
      );
    }

    const newOpportunity: Opportunity = {
      id: `opp-custom-${Date.now()}`,
      title: body.title,
      subtitle: body.subtitle || '',
      description: body.description || '',
      organizer: body.organizer,
      category: body.category || 'Other',
      tags: body.tags || ['User Submitted'],
      minGrade: Number(body.minGrade) || 6,
      maxGrade: Number(body.maxGrade) || 12,
      genderEligibility: 'all',
      eligibilityDescription: body.eligibilityDescription || 'Open to school students',
      requiredDocuments: body.requiredDocuments || ['School ID Card'],
      location: body.location || {
        country: 'India',
        state: 'Karnataka',
        district: 'Bengaluru Urban',
        city: 'Bengaluru',
        isOnline: false,
        isNational: false
      },
      deadline: body.deadline || '2027-03-31',
      eventStartDate: body.eventStartDate || '2027-04-15',
      isFree: Boolean(body.isFree),
      registrationFees: body.registrationFees || 'Free',
      prizesOrBenefits: body.prizesOrBenefits || 'Merit Certificate',
      registrationUrl: body.registrationUrl || body.sourceUrl,
      sourceUrl: body.sourceUrl,
      sourceStatus: body.sourceStatus || 'AWAITING_VERIFICATION',
      lastChecked: new Date().toISOString().split('T')[0],
      officialSourceType: body.officialSourceType || 'verified_secondary',
      createdAt: new Date().toISOString()
    };

    runtimeOpportunities.unshift(newOpportunity);

    return NextResponse.json({
      success: true,
      message: 'Opportunity successfully recorded in registry',
      data: newOpportunity
    }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

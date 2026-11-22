import { LocationCoordinates } from '../types';

export interface LocalityInfo {
  name: string;
  pincode?: string;
  coordinates: LocationCoordinates;
}

export interface CityInfo {
  name: string;
  district: string;
  state: string;
  coordinates: LocationCoordinates;
  localities: LocalityInfo[];
}

export interface StateInfo {
  name: string;
  code: string;
  districts: string[];
  primaryCities: string[];
}

export const INDIAN_STATES: StateInfo[] = [
  {
    name: 'Karnataka',
    code: 'KA',
    districts: [
      'Bengaluru Urban',
      'Bengaluru Rural',
      'Mysuru',
      'Mangaluru (Dakshina Kannada)',
      'Hubballi-Dharwad',
      'Belagavi',
      'Kalaburagi',
      'Ballari',
      'Davangere',
      'Shivamogga',
      'Tumakuru',
      'Udupi',
      'Hassan',
      'Chikkamagaluru',
      'Mandya',
      'Kolar'
    ],
    primaryCities: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi', 'Belagavi', 'Shivamogga', 'Tumakuru']
  },
  {
    name: 'Tamil Nadu',
    code: 'TN',
    districts: ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli'],
    primaryCities: ['Chennai', 'Coimbatore', 'Madurai']
  },
  {
    name: 'Telangana',
    code: 'TS',
    districts: ['Hyderabad', 'Ranga Reddy', 'Medchal-Malkajgiri', 'Warangal', 'Nizamabad'],
    primaryCities: ['Hyderabad', 'Warangal']
  },
  {
    name: 'Andhra Pradesh',
    code: 'AP',
    districts: ['Visakhapatnam', 'Vijayawada (NTR)', 'Guntur', 'Tirupati', 'Kurnool'],
    primaryCities: ['Visakhapatnam', 'Vijayawada', 'Tirupati']
  },
  {
    name: 'Maharashtra',
    code: 'MH',
    districts: ['Mumbai City', 'Mumbai Suburban', 'Pune', 'Nagpur', 'Thane', 'Nashik'],
    primaryCities: ['Mumbai', 'Pune', 'Nagpur']
  },
  {
    name: 'Kerala',
    code: 'KL',
    districts: ['Thiruvananthapuram', 'Ernakulam', 'Kozhikode', 'Thrissur', 'Kollam'],
    primaryCities: ['Kochi', 'Thiruvananthapuram', 'Kozhikode']
  },
  {
    name: 'Delhi NCR',
    code: 'DL',
    districts: ['Central Delhi', 'South Delhi', 'North Delhi', 'New Delhi'],
    primaryCities: ['New Delhi', 'Delhi']
  }
];

export const CITIES_DATA: Record<string, CityInfo> = {
  'Bengaluru': {
    name: 'Bengaluru',
    district: 'Bengaluru Urban',
    state: 'Karnataka',
    coordinates: { lat: 12.9716, lng: 77.5946 },
    localities: [
      { name: 'Jayanagar', pincode: '560011', coordinates: { lat: 12.9308, lng: 77.5838 } },
      { name: 'Whitefield', pincode: '560066', coordinates: { lat: 12.9698, lng: 77.7499 } },
      { name: 'Malleshwaram', pincode: '560003', coordinates: { lat: 13.0031, lng: 77.5702 } },
      { name: 'Indiranagar', pincode: '560038', coordinates: { lat: 12.9784, lng: 77.6408 } },
      { name: 'Koramangala', pincode: '560034', coordinates: { lat: 12.9352, lng: 77.6245 } },
      { name: 'Basavanagudi', pincode: '560004', coordinates: { lat: 12.9416, lng: 77.5737 } },
      { name: 'Yelahanka', pincode: '560064', coordinates: { lat: 13.1007, lng: 77.5963 } },
      { name: 'Electronic City', pincode: '560100', coordinates: { lat: 12.8399, lng: 77.6770 } },
      { name: 'HSR Layout', pincode: '560102', coordinates: { lat: 12.9121, lng: 77.6446 } },
      { name: 'Rajajinagar', pincode: '560010', coordinates: { lat: 12.9915, lng: 77.5532 } }
    ]
  },
  'Mysuru': {
    name: 'Mysuru',
    district: 'Mysuru',
    state: 'Karnataka',
    coordinates: { lat: 12.2958, lng: 76.6394 },
    localities: [
      { name: 'Vijayanagar', pincode: '570017', coordinates: { lat: 12.3350, lng: 76.6110 } },
      { name: 'Kuvempunagar', pincode: '570023', coordinates: { lat: 12.2850, lng: 76.6270 } },
      { name: 'Jayalakshmipuram', pincode: '570012', coordinates: { lat: 12.3210, lng: 76.6280 } },
      { name: 'Saraswathipuram', pincode: '570009', coordinates: { lat: 12.3050, lng: 76.6340 } },
      { name: 'Gokulam', pincode: '570002', coordinates: { lat: 12.3320, lng: 76.6310 } }
    ]
  },
  'Mangaluru': {
    name: 'Mangaluru',
    district: 'Mangaluru (Dakshina Kannada)',
    state: 'Karnataka',
    coordinates: { lat: 12.9141, lng: 74.8560 },
    localities: [
      { name: 'Hampankatta', pincode: '575001', coordinates: { lat: 12.8680, lng: 74.8420 } },
      { name: 'Kadri', pincode: '575002', coordinates: { lat: 12.8780, lng: 74.8620 } },
      { name: 'Bejai', pincode: '575004', coordinates: { lat: 12.8870, lng: 74.8510 } }
    ]
  },
  'Chennai': {
    name: 'Chennai',
    district: 'Chennai',
    state: 'Tamil Nadu',
    coordinates: { lat: 13.0827, lng: 80.2707 },
    localities: [
      { name: 'Adyar', pincode: '600020', coordinates: { lat: 13.0012, lng: 80.2565 } },
      { name: 'Anna Nagar', pincode: '600040', coordinates: { lat: 13.0850, lng: 80.2101 } },
      { name: 'T. Nagar', pincode: '600017', coordinates: { lat: 13.0418, lng: 80.2341 } }
    ]
  },
  'Hyderabad': {
    name: 'Hyderabad',
    district: 'Hyderabad',
    state: 'Telangana',
    coordinates: { lat: 17.3850, lng: 78.4867 },
    localities: [
      { name: 'Gachibowli', pincode: '500032', coordinates: { lat: 17.4401, lng: 78.3489 } },
      { name: 'Hitec City', pincode: '500081', coordinates: { lat: 17.4474, lng: 78.3762 } },
      { name: 'Banjara Hills', pincode: '500034', coordinates: { lat: 17.4156, lng: 78.4357 } }
    ]
  }
};

/**
 * Calculates distance in kilometers between two geographic coordinates using Haversine formula
 */
export function calculateDistanceKm(
  coord1?: LocationCoordinates,
  coord2?: LocationCoordinates
): number | undefined {
  if (!coord1 || !coord2) return undefined;
  
  const R = 6371; // Earth's radius in km
  const dLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const dLng = ((coord2.lng - coord1.lng) * Math.PI) / 180;
  
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((coord1.lat * Math.PI) / 180) *
      Math.cos((coord2.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
      
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal place
}

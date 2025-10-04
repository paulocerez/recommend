import { Destination, UserPreferences, AlgorithmWeights, TravelProfile } from '../types';

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Paris',
    country: 'France',
    image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&h=600&fit=crop',
    temperature: 15,
    costLevel: 4,
    bestSeason: ['Spring', 'Summer', 'Fall'],
    tags: ['Romance', 'Art', 'Fashion', 'History', 'Cuisine'],
    climate: 'temperate',
    activities: ['culture', 'shopping', 'food', 'history'],
    culture: 'historic',
    coordinates: { lat: 48.8566, lng: 2.3522 },
    recommendationScore: 0,
    algorithmBreakdown: {
      contentBased: 0,
      collaborative: 0,
      popularity: 0,
      diversity: 0,
      explanation: ''
    },
    userActions: {
      liked: false,
      bookmarked: false,
      beenHere: false,
      wantToVisit: false
    }
  },
  {
    id: '2',
    name: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.unsplash.com/photo-1552465011-b4e21bf6e79a?w=800&h=600&fit=crop',
    temperature: 32,
    costLevel: 2,
    bestSeason: ['Winter', 'Spring'],
    tags: ['Temples', 'Street Food', 'Shopping', 'Nightlife', 'Culture'],
    climate: 'tropical',
    activities: ['culture', 'food', 'shopping', 'nightlife'],
    culture: 'traditional',
    coordinates: { lat: 13.7563, lng: 100.5018 },
    recommendationScore: 0,
    algorithmBreakdown: {
      contentBased: 0,
      collaborative: 0,
      popularity: 0,
      diversity: 0,
      explanation: ''
    },
    userActions: {
      liked: false,
      bookmarked: false,
      beenHere: false,
      wantToVisit: false
    }
  },
  {
    id: '3',
    name: 'New York',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&h=600&fit=crop',
    temperature: 12,
    costLevel: 4,
    bestSeason: ['Spring', 'Fall'],
    tags: ['Skyscrapers', 'Broadway', 'Museums', 'Shopping', 'Culture'],
    climate: 'temperate',
    activities: ['culture', 'shopping', 'nightlife', 'food'],
    culture: 'modern',
    coordinates: { lat: 40.7128, lng: -74.0060 },
    recommendationScore: 0,
    algorithmBreakdown: {
      contentBased: 0,
      collaborative: 0,
      popularity: 0,
      diversity: 0,
      explanation: ''
    },
    userActions: {
      liked: false,
      bookmarked: false,
      beenHere: false,
      wantToVisit: false
    }
  },
  {
    id: '4',
    name: 'Rome',
    country: 'Italy',
    image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop',
    temperature: 18,
    costLevel: 3,
    bestSeason: ['Spring', 'Fall'],
    tags: ['History', 'Colosseum', 'Vatican', 'Food', 'Art'],
    climate: 'temperate',
    activities: ['culture', 'history', 'food', 'photography'],
    culture: 'historic',
    coordinates: { lat: 41.9028, lng: 12.4964 },
    recommendationScore: 0,
    algorithmBreakdown: {
      contentBased: 0,
      collaborative: 0,
      popularity: 0,
      diversity: 0,
      explanation: ''
    },
    userActions: {
      liked: false,
      bookmarked: false,
      beenHere: false,
      wantToVisit: false
    }
  },
  {
    id: '5',
    name: 'Cape Town',
    country: 'South Africa',
    image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=800&h=600&fit=crop',
    temperature: 20,
    costLevel: 2,
    bestSeason: ['Spring', 'Summer', 'Fall'],
    tags: ['Table Mountain', 'Wine', 'Beaches', 'Wildlife', 'Culture'],
    climate: 'temperate',
    activities: ['nature', 'wine-tasting', 'adventure', 'culture'],
    culture: 'mixed',
    coordinates: { lat: -33.9249, lng: 18.4241 },
    recommendationScore: 0,
    algorithmBreakdown: {
      contentBased: 0,
      collaborative: 0,
      popularity: 0,
      diversity: 0,
      explanation: ''
    },
    userActions: {
      liked: false,
      bookmarked: false,
      beenHere: false,
      wantToVisit: false
    }
  },
  {
    id: '6',
    name: 'Barcelona',
    country: 'Spain',
    image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=800&h=600&fit=crop',
    temperature: 19,
    costLevel: 3,
    bestSeason: ['Spring', 'Summer', 'Fall'],
    tags: ['Gaudi', 'Beaches', 'Food', 'Art', 'Architecture'],
    climate: 'temperate',
    activities: ['culture', 'relaxation', 'food', 'photography'],
    culture: 'historic',
    coordinates: { lat: 41.3851, lng: 2.1734 },
    recommendationScore: 0,
    algorithmBreakdown: {
      contentBased: 0,
      collaborative: 0,
      popularity: 0,
      diversity: 0,
      explanation: ''
    },
    userActions: {
      liked: false,
      bookmarked: false,
      beenHere: false,
      wantToVisit: false
    }
  },
  {
    id: '7',
    name: 'Singapore',
    country: 'Singapore',
    image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&h=600&fit=crop',
    temperature: 28,
    costLevel: 3,
    bestSeason: ['Winter', 'Spring'],
    tags: ['Modern', 'Food', 'Shopping', 'Gardens', 'Culture'],
    climate: 'tropical',
    activities: ['shopping', 'food', 'culture', 'relaxation'],
    culture: 'modern',
    coordinates: { lat: 1.3521, lng: 103.8198 },
    recommendationScore: 0,
    algorithmBreakdown: {
      contentBased: 0,
      collaborative: 0,
      popularity: 0,
      diversity: 0,
      explanation: ''
    },
    userActions: {
      liked: false,
      bookmarked: false,
      beenHere: false,
      wantToVisit: false
    }
  },
  {
    id: '8',
    name: 'Vancouver',
    country: 'Canada',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    temperature: 11,
    costLevel: 3,
    bestSeason: ['Spring', 'Summer', 'Fall'],
    tags: ['Mountains', 'Ocean', 'Nature', 'Modern', 'Outdoor'],
    climate: 'temperate',
    activities: ['nature', 'adventure', 'relaxation', 'photography'],
    culture: 'modern',
    coordinates: { lat: 49.2827, lng: -123.1207 },
    recommendationScore: 0,
    algorithmBreakdown: {
      contentBased: 0,
      collaborative: 0,
      popularity: 0,
      diversity: 0,
      explanation: ''
    },
    userActions: {
      liked: false,
      bookmarked: false,
      beenHere: false,
      wantToVisit: false
    }
  },
  {
    id: '9',
    name: 'Istanbul',
    country: 'Turkey',
    image: 'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&h=600&fit=crop',
    temperature: 16,
    costLevel: 2,
    bestSeason: ['Spring', 'Fall'],
    tags: ['History', 'Bosphorus', 'Mosques', 'Bazaars', 'Culture'],
    climate: 'temperate',
    activities: ['culture', 'history', 'shopping', 'food'],
    culture: 'historic',
    coordinates: { lat: 41.0082, lng: 28.9784 },
    recommendationScore: 0,
    algorithmBreakdown: {
      contentBased: 0,
      collaborative: 0,
      popularity: 0,
      diversity: 0,
      explanation: ''
    },
    userActions: {
      liked: false,
      bookmarked: false,
      beenHere: false,
      wantToVisit: false
    }
  },
  {
    id: '10',
    name: 'Melbourne',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    temperature: 17,
    costLevel: 3,
    bestSeason: ['Spring', 'Summer', 'Fall'],
    tags: ['Coffee', 'Art', 'Culture', 'Food', 'Modern'],
    climate: 'temperate',
    activities: ['culture', 'food', 'nightlife', 'shopping'],
    culture: 'modern',
    coordinates: { lat: -37.8136, lng: 144.9631 },
    recommendationScore: 0,
    algorithmBreakdown: {
      contentBased: 0,
      collaborative: 0,
      popularity: 0,
      diversity: 0,
      explanation: ''
    },
    userActions: {
      liked: false,
      bookmarked: false,
      beenHere: false,
      wantToVisit: false
    }
  }
];

export const defaultUserPreferences: UserPreferences = {
  climate: {
    tropical: 0.3,
    temperate: 0.4,
    cold: 0.2,
    arid: 0.1,
    continental: 0.0
  },
  budget: {
    low: 0.1,
    medium: 0.4,
    high: 0.4,
    luxury: 0.1
  },
  activities: {
    adventure: 0.3,
    culture: 0.4,
    relaxation: 0.5,
    nightlife: 0.2,
    nature: 0.4,
    history: 0.3
  },
  travelStyle: {
    luxury: 0.2,
    backpacker: 0.3,
    family: 0.1,
    solo: 0.4,
    business: 0.0
  }
};

export const defaultAlgorithmWeights: AlgorithmWeights = {
  contentBased: 0.4,
  collaborative: 0.3,
  popularity: 0.2,
  diversity: 0.1
};

export const defaultTravelProfile: TravelProfile = {
  learnedPreferences: ['Tropical destinations', 'Cultural experiences', 'Relaxation'],
  travelHistory: ['Bali', 'Thailand', 'Greece'],
  currentSeason: 'summer',
  budgetRange: [1000, 3000],
  filterBubbleWarning: false
};

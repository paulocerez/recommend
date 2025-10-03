import { Destination, UserPreferences, AlgorithmWeights, TravelProfile } from '../types';

export const mockDestinations: Destination[] = [
  {
    id: '1',
    name: 'Santorini',
    country: 'Greece',
    image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=800&h=600&fit=crop',
    temperature: 25,
    costLevel: 3,
    bestSeason: ['Spring', 'Summer', 'Fall'],
    tags: ['Beaches', 'Romance', 'Sunset', 'White Buildings', 'Volcanic'],
    climate: 'temperate',
    activities: ['relaxation', 'culture', 'photography', 'wine-tasting'],
    culture: 'traditional',
    coordinates: { lat: 36.3932, lng: 25.4615 },
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
    name: 'Bali',
    country: 'Indonesia',
    image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&h=600&fit=crop',
    temperature: 28,
    costLevel: 2,
    bestSeason: ['Spring', 'Summer', 'Fall', 'Winter'],
    tags: ['Tropical', 'Beaches', 'Temples', 'Rice Terraces', 'Wellness'],
    climate: 'tropical',
    activities: ['relaxation', 'culture', 'adventure', 'wellness'],
    culture: 'traditional',
    coordinates: { lat: -8.3405, lng: 115.0920 },
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
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop',
    temperature: 18,
    costLevel: 4,
    bestSeason: ['Spring', 'Fall'],
    tags: ['Modern', 'Technology', 'Temples', 'Food', 'Shopping'],
    climate: 'temperate',
    activities: ['culture', 'nightlife', 'shopping', 'food'],
    culture: 'modern',
    coordinates: { lat: 35.6762, lng: 139.6503 },
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
    name: 'Reykjavik',
    country: 'Iceland',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
    temperature: 5,
    costLevel: 4,
    bestSeason: ['Summer'],
    tags: ['Northern Lights', 'Geysers', 'Volcanoes', 'Hot Springs', 'Midnight Sun'],
    climate: 'cold',
    activities: ['adventure', 'nature', 'photography', 'wellness'],
    culture: 'modern',
    coordinates: { lat: 64.1466, lng: -21.9426 },
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
    name: 'Marrakech',
    country: 'Morocco',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73c6e?w=800&h=600&fit=crop',
    temperature: 22,
    costLevel: 2,
    bestSeason: ['Spring', 'Fall'],
    tags: ['Souks', 'Palaces', 'Desert', 'Spices', 'Architecture'],
    climate: 'arid',
    activities: ['culture', 'shopping', 'adventure', 'history'],
    culture: 'traditional',
    coordinates: { lat: 31.6295, lng: -7.9811 },
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
    name: 'Sydney',
    country: 'Australia',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    temperature: 20,
    costLevel: 3,
    bestSeason: ['Spring', 'Summer', 'Fall'],
    tags: ['Harbor', 'Beaches', 'Opera House', 'Bridges', 'Modern'],
    climate: 'temperate',
    activities: ['relaxation', 'culture', 'nightlife', 'adventure'],
    culture: 'modern',
    coordinates: { lat: -33.8688, lng: 151.2093 },
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
    name: 'Costa Rica',
    country: 'Costa Rica',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
    temperature: 26,
    costLevel: 2,
    bestSeason: ['Winter', 'Spring'],
    tags: ['Rainforest', 'Wildlife', 'Beaches', 'Adventure', 'Eco-tourism'],
    climate: 'tropical',
    activities: ['adventure', 'nature', 'wildlife', 'relaxation'],
    culture: 'mixed',
    coordinates: { lat: 9.7489, lng: -83.7534 },
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
    name: 'Prague',
    country: 'Czech Republic',
    image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop',
    temperature: 12,
    costLevel: 2,
    bestSeason: ['Spring', 'Summer', 'Fall'],
    tags: ['Castles', 'Bridges', 'Beer', 'History', 'Architecture'],
    climate: 'temperate',
    activities: ['culture', 'history', 'nightlife', 'photography'],
    culture: 'historic',
    coordinates: { lat: 50.0755, lng: 14.4378 },
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
    name: 'Dubai',
    country: 'UAE',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=600&fit=crop',
    temperature: 30,
    costLevel: 4,
    bestSeason: ['Winter', 'Spring'],
    tags: ['Luxury', 'Shopping', 'Skyscrapers', 'Desert', 'Modern'],
    climate: 'arid',
    activities: ['shopping', 'nightlife', 'adventure', 'culture'],
    culture: 'modern',
    coordinates: { lat: 25.2048, lng: 55.2708 },
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
    name: 'New Zealand',
    country: 'New Zealand',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
    temperature: 15,
    costLevel: 3,
    bestSeason: ['Spring', 'Summer', 'Fall'],
    tags: ['Mountains', 'Lakes', 'Adventure', 'Nature', 'Lord of the Rings'],
    climate: 'temperate',
    activities: ['adventure', 'nature', 'photography', 'hiking'],
    culture: 'mixed',
    coordinates: { lat: -40.9006, lng: 174.8860 },
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

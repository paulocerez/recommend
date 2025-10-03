export interface Destination {
  id: string;
  name: string;
  country: string;
  image: string;
  temperature: number;
  costLevel: 1 | 2 | 3 | 4; // $ to $$$$
  bestSeason: string[];
  tags: string[];
  climate: 'tropical' | 'temperate' | 'cold' | 'arid' | 'continental';
  activities: string[];
  culture: 'modern' | 'traditional' | 'mixed' | 'historic';
  coordinates: {
    lat: number;
    lng: number;
  };
  recommendationScore: number;
  algorithmBreakdown: AlgorithmBreakdown;
  userActions: UserActions;
}

export interface AlgorithmBreakdown {
  contentBased: number;
  collaborative: number;
  popularity: number;
  diversity: number;
  explanation: string;
}

export interface UserActions {
  liked: boolean;
  bookmarked: boolean;
  beenHere: boolean;
  wantToVisit: boolean;
}

export interface UserPreferences {
  climate: {
    tropical: number;
    temperate: number;
    cold: number;
    arid: number;
    continental: number;
  };
  budget: {
    low: number;
    medium: number;
    high: number;
    luxury: number;
  };
  activities: {
    adventure: number;
    culture: number;
    relaxation: number;
    nightlife: number;
    nature: number;
    history: number;
  };
  travelStyle: {
    luxury: number;
    backpacker: number;
    family: number;
    solo: number;
    business: number;
  };
}

export interface AlgorithmWeights {
  contentBased: number;
  collaborative: number;
  popularity: number;
  diversity: number;
}

export interface RecommendationExplanation {
  mainReason: string;
  secondaryReasons: string[];
  similarUsers: string[];
  seasonalAdjustment: string;
  budgetImpact: string;
}

export interface TravelProfile {
  learnedPreferences: string[];
  travelHistory: string[];
  currentSeason: 'spring' | 'summer' | 'fall' | 'winter';
  budgetRange: [number, number];
  filterBubbleWarning: boolean;
}

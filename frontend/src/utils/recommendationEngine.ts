import { Destination, UserPreferences, AlgorithmWeights, AlgorithmBreakdown, RecommendationExplanation } from '../types';

export class RecommendationEngine {
  private destinations: Destination[];
  private userPreferences: UserPreferences;
  private algorithmWeights: AlgorithmWeights;

  constructor(
    destinations: Destination[],
    userPreferences: UserPreferences,
    algorithmWeights: AlgorithmWeights
  ) {
    this.destinations = destinations;
    this.userPreferences = userPreferences;
    this.algorithmWeights = algorithmWeights;
  }

  calculateRecommendations(): Destination[] {
    return this.destinations.map(destination => {
      const breakdown = this.calculateAlgorithmBreakdown(destination);
      const totalScore = this.calculateTotalScore(breakdown);
      
      return {
        ...destination,
        recommendationScore: totalScore,
        algorithmBreakdown: {
          ...breakdown,
          explanation: this.generateExplanation(destination, breakdown as AlgorithmBreakdown)
        }
      };
    }).sort((a, b) => b.recommendationScore - a.recommendationScore);
  }

  private calculateAlgorithmBreakdown(destination: Destination): Omit<AlgorithmBreakdown, 'explanation'> {
    // Content-based filtering
    const contentBased = this.calculateContentBasedScore(destination);
    
    // Collaborative filtering (simulated)
    const collaborative = this.calculateCollaborativeScore(destination);
    
    // Popularity score (simulated)
    const popularity = this.calculatePopularityScore(destination);
    
    // Diversity score (simulated)
    const diversity = this.calculateDiversityScore(destination);

    return {
      contentBased,
      collaborative,
      popularity,
      diversity
    };
  }

  private calculateContentBasedScore(destination: Destination): number {
    let score = 0;
    
    // Climate preference
    const climateScore = this.userPreferences.climate[destination.climate] || 0;
    score += climateScore * 0.3;
    
    // Budget preference
    const budgetKey = this.getBudgetKey(destination.costLevel);
    const budgetScore = this.userPreferences.budget[budgetKey] || 0;
    score += budgetScore * 0.25;
    
    // Activity preferences
    const activityScore = destination.activities.reduce((acc, activity) => {
      const activityKey = activity as keyof typeof this.userPreferences.activities;
      return acc + (this.userPreferences.activities[activityKey] || 0);
    }, 0) / destination.activities.length;
    score += activityScore * 0.25;
    
    // Travel style preference
    const styleScore = this.calculateTravelStyleScore(destination);
    score += styleScore * 0.2;
    
    return Math.min(score, 1);
  }

  private calculateCollaborativeScore(destination: Destination): number {
    // Simulate collaborative filtering based on similar user preferences
    const baseScore = 0.6;
    const variation = (Math.random() - 0.5) * 0.4; // Add some randomness
    return Math.max(0, Math.min(1, baseScore + variation));
  }

  private calculatePopularityScore(destination: Destination): number {
    // Simulate popularity based on destination characteristics
    const popularityMap: { [key: string]: number } = {
      'Santorini': 0.9,
      'Bali': 0.85,
      'Tokyo': 0.8,
      'Reykjavik': 0.7,
      'Marrakech': 0.75,
      'Sydney': 0.8,
      'Costa Rica': 0.7,
      'Prague': 0.75,
      'Dubai': 0.8,
      'New Zealand': 0.75
    };
    
    return popularityMap[destination.name] || 0.5;
  }

  private calculateDiversityScore(destination: Destination): number {
    // Encourage diversity by giving higher scores to less common destinations
    const diversityMap: { [key: string]: number } = {
      'Santorini': 0.3,
      'Bali': 0.2,
      'Tokyo': 0.4,
      'Reykjavik': 0.8,
      'Marrakech': 0.7,
      'Sydney': 0.5,
      'Costa Rica': 0.6,
      'Prague': 0.6,
      'Dubai': 0.4,
      'New Zealand': 0.7
    };
    
    return diversityMap[destination.name] || 0.5;
  }

  private calculateTravelStyleScore(destination: Destination): number {
    let score = 0;
    
    // Luxury destinations
    if (destination.costLevel >= 4) {
      score += this.userPreferences.travelStyle.luxury;
    }
    
    // Budget destinations
    if (destination.costLevel <= 2) {
      score += this.userPreferences.travelStyle.backpacker;
    }
    
    // Family-friendly destinations (simplified)
    if (destination.activities.includes('relaxation') && destination.costLevel <= 3) {
      score += this.userPreferences.travelStyle.family;
    }
    
    // Solo travel friendly (adventure, culture, modern destinations)
    if (destination.activities.includes('adventure') || 
        destination.activities.includes('culture') || 
        destination.culture === 'modern') {
      score += this.userPreferences.travelStyle.solo;
    }
    
    return Math.min(score, 1);
  }

  private getBudgetKey(costLevel: number): keyof typeof this.userPreferences.budget {
    switch (costLevel) {
      case 1: return 'low';
      case 2: return 'medium';
      case 3: return 'high';
      case 4: return 'luxury';
      default: return 'medium';
    }
  }

  private calculateTotalScore(breakdown: Omit<AlgorithmBreakdown, 'explanation'>): number {
    return (
      breakdown.contentBased * this.algorithmWeights.contentBased +
      breakdown.collaborative * this.algorithmWeights.collaborative +
      breakdown.popularity * this.algorithmWeights.popularity +
      breakdown.diversity * this.algorithmWeights.diversity
    );
  }

  private generateExplanation(destination: Destination, breakdown: AlgorithmBreakdown): string {
    const reasons = [];
    
    if (breakdown.contentBased > 0.7) {
      reasons.push(`matches your ${destination.climate} climate preference`);
    }
    
    if (breakdown.collaborative > 0.7) {
      reasons.push('is popular among travelers with similar tastes');
    }
    
    if (breakdown.popularity > 0.8) {
      reasons.push('is a highly popular destination');
    }
    
    if (breakdown.diversity > 0.7) {
      reasons.push('offers a unique travel experience');
    }
    
    if (reasons.length === 0) {
      return 'This destination matches some of your preferences';
    }
    
    return `Recommended because it ${reasons.join(' and ')}`;
  }

  generateRecommendationExplanation(destinations: Destination[]): RecommendationExplanation {
    const topDestination = destinations[0];
    const similarUsers = ['Sarah M.', 'Alex K.', 'Maria L.'];
    
    return {
      mainReason: `You prefer ${topDestination.climate} climates and ${topDestination.activities[0]} activities`,
      secondaryReasons: [
        'Similar travelers enjoyed these destinations',
        'Matches your budget preferences',
        'Good weather for current season'
      ],
      similarUsers,
      seasonalAdjustment: 'Summer destinations are prioritized for current season',
      budgetImpact: 'Destinations within your budget range are highlighted'
    };
  }

  updateUserPreferences(newPreferences: Partial<UserPreferences>): void {
    this.userPreferences = { ...this.userPreferences, ...newPreferences };
  }

  updateAlgorithmWeights(newWeights: Partial<AlgorithmWeights>): void {
    this.algorithmWeights = { ...this.algorithmWeights, ...newWeights };
  }
}

import React, { useState, useEffect, useMemo } from 'react';
import { Destination, UserPreferences, AlgorithmWeights, TravelProfile, RecommendationExplanation } from './types';
import { mockDestinations, defaultUserPreferences, defaultAlgorithmWeights, defaultTravelProfile } from './data/mockData';
import { RecommendationEngine } from './utils/recommendationEngine';
import DestinationCard from './components/DestinationCard';
import AlgorithmPanel from './components/AlgorithmPanel';
import SeasonalAdjustment from './components/SeasonalAdjustment';
import BudgetImpact from './components/BudgetImpact';
import Banner from './components/Banner';
import { Card, CardContent, CardHeader, CardTitle } from './components/ui/Card';
import { Button } from './components/ui/Button';
import { 
  Plane, 
  Filter, 
  RotateCcw, 
  BarChart3, 
  Eye,
  EyeOff,
  Settings,
  Menu,
  X
} from 'lucide-react';

function App() {
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultUserPreferences);
  const [algorithmWeights, setAlgorithmWeights] = useState<AlgorithmWeights>(defaultAlgorithmWeights);
  const [travelProfile, setTravelProfile] = useState<TravelProfile>(defaultTravelProfile);
  const [showAlgorithmPanel, setShowAlgorithmPanel] = useState(true);
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [seasonalAdjustmentEnabled, setSeasonalAdjustmentEnabled] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Initialize recommendation engine
  const recommendationEngine = useMemo(() => 
    new RecommendationEngine(destinations, userPreferences, algorithmWeights),
    [destinations, userPreferences, algorithmWeights]
  );

  // Calculate recommendations when preferences change
  const recommendedDestinations = useMemo(() => {
    return recommendationEngine.calculateRecommendations();
  }, [recommendationEngine]);

  // Generate explanation
  const explanation: RecommendationExplanation = useMemo(() => {
    return recommendationEngine.generateRecommendationExplanation(recommendedDestinations);
  }, [recommendationEngine, recommendedDestinations]);

  // Handle destination actions
  const handleDestinationAction = (destinationId: string, action: keyof Destination['userActions']) => {
    setDestinations(prev => 
      prev.map(dest => 
        dest.id === destinationId 
          ? { ...dest, userActions: { ...dest.userActions, [action]: !dest.userActions[action] } }
          : dest
      )
    );
  };

  // Handle preferences change
  const handlePreferencesChange = (newPreferences: Partial<UserPreferences>) => {
    setUserPreferences(prev => ({ ...prev, ...newPreferences }));
  };

  // Handle algorithm weights change
  const handleWeightsChange = (newWeights: Partial<AlgorithmWeights>) => {
    setAlgorithmWeights(prev => ({ ...prev, ...newWeights }));
  };

  // Reset profile
  const handleResetProfile = () => {
    setUserPreferences(defaultUserPreferences);
    setAlgorithmWeights(defaultAlgorithmWeights);
    setTravelProfile(defaultTravelProfile);
    setSeasonalAdjustmentEnabled(true);
    setDestinations(mockDestinations.map(dest => ({
      ...dest,
      userActions: {
        liked: false,
        bookmarked: false,
        beenHere: false,
        wantToVisit: false
      }
    })));
  };

  // Handle season change
  const handleSeasonChange = (season: 'spring' | 'summer' | 'fall' | 'winter') => {
    setTravelProfile(prev => ({ ...prev, currentSeason: season }));
  };

  // Handle budget range change
  const handleBudgetRangeChange = (range: [number, number]) => {
    setTravelProfile(prev => ({ ...prev, budgetRange: range }));
  };

  // Check for filter bubble warning
  useEffect(() => {
    const diversityScore = recommendedDestinations.slice(0, 5).reduce((acc, dest) => 
      acc + dest.algorithmBreakdown.diversity, 0) / 5;
    
    setTravelProfile(prev => ({
      ...prev,
      filterBubbleWarning: diversityScore < 0.3
    }));
  }, [recommendedDestinations]);

  return (
    <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {/* Desktop Header */}
          <div className="hidden md:flex justify-between items-center w-full">
            <div className="flex items-center">
              <Banner message="Helping you understand what items are shown to you why" />
            </div>
            <div className="flex items-center space-x-8">
              <a
                href="#recommender"
                className="text-gray-700 font-medium hover:text-gray-900 hover:underline"
              >
                Recommender
              </a>
              <a
                href="#theory"
                className="text-gray-700 font-medium hover:text-gray-900 hover:underline"
              >
                Theory
              </a>
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetProfile}
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4 mr-1" />
                Reset and start from scratch
              </Button>
            </div>
          </div>

          {/* Mobile Header */}
          <div className="md:hidden flex justify-end items-center w-full">
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleResetProfile}
                className="text-gray-700 border-gray-300 hover:bg-gray-50"
              >
                <RotateCcw className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-gray-700 hover:bg-gray-50"
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          {isMobileMenuOpen && (
            <div className="md:hidden mt-4 p-4 bg-white border border-gray-200 rounded-lg shadow-lg">
              <div className="space-y-3">
                <div className="text-sm text-gray-600 mb-3">
                  Helping you understand what items are shown to you why
                </div>
                <div className="flex flex-col space-y-2">
                  <a
                    href="#recommender"
                    className="text-gray-700 font-medium hover:text-gray-900 hover:underline py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Recommender
                  </a>
                  <a
                    href="#theory"
                    className="text-gray-700 font-medium hover:text-gray-900 hover:underline py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Theory
                  </a>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      handleResetProfile();
                      setIsMobileMenuOpen(false);
                    }}
                    className="text-gray-700 border-gray-300 hover:bg-gray-50 justify-start"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset and start from scratch
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

      {/* Main Content */}
      <div id="recommender" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column - Destinations */}
          <div className={`${showAlgorithmPanel ? 'lg:col-span-8' : 'lg:col-span-12'}`}>
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Recommended Destinations
              </h2>
              <p className="text-gray-600">
                Discover why each destination was recommended and how your preferences influence the algorithm
              </p>
            </div>

            {/* Destinations Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recommendedDestinations.map((destination, index) => (
                <div
                  key={destination.id}
                  className="transform transition-all duration-500 ease-out hover:scale-[1.02]"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeInUp 0.6s ease-out forwards'
                  }}
                >
                  <DestinationCard
                    destination={destination}
                    onAction={handleDestinationAction}
                    isCompact={true}
                  />
                </div>
              ))}
            </div>

            {/* No destinations message */}
            {recommendedDestinations.length === 0 && (
              <Card>
                <CardContent className="text-center py-12">
                  <Plane className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No destinations found
                  </h3>
                  <p className="text-muted-foreground">
                    Try adjusting your preferences to see more recommendations
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Algorithm Panel */}
          {showAlgorithmPanel && (
            <div className="lg:col-span-4">
              <div className="sticky top-8 space-y-6">
                <SeasonalAdjustment
                  currentSeason={travelProfile.currentSeason}
                  onSeasonChange={handleSeasonChange}
                  seasonalAdjustmentEnabled={seasonalAdjustmentEnabled}
                  onToggleSeasonalAdjustment={setSeasonalAdjustmentEnabled}
                />
                <BudgetImpact
                  budgetRange={travelProfile.budgetRange}
                  onBudgetRangeChange={handleBudgetRangeChange}
                  maxBudget={10000}
                />
                <AlgorithmPanel
                  userPreferences={userPreferences}
                  algorithmWeights={algorithmWeights}
                  travelProfile={travelProfile}
                  explanation={explanation}
                  onPreferencesChange={handlePreferencesChange}
                  onWeightsChange={handleWeightsChange}
                  onResetProfile={handleResetProfile}
                />
              </div>
            </div>
          )}
        </div>

        {/* Comparison Mode */}
        {isComparisonMode && (
          <div className="mt-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Algorithm Comparison
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Current Configuration</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Content-Based:</span>
                        <span>{Math.round(algorithmWeights.contentBased * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Collaborative:</span>
                        <span>{Math.round(algorithmWeights.collaborative * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Popularity:</span>
                        <span>{Math.round(algorithmWeights.popularity * 100)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Diversity:</span>
                        <span>{Math.round(algorithmWeights.diversity * 100)}%</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Alternative Configuration</h4>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex justify-between">
                        <span>Content-Based:</span>
                        <span>60%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Collaborative:</span>
                        <span>20%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Popularity:</span>
                        <span>10%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Diversity:</span>
                        <span>10%</span>
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      This would show more personalized results but less diversity
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              This is an educational demonstration of recommendation algorithms for travel destinations.
              All data is simulated for learning purposes.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

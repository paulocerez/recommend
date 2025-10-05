import React, { useState, useEffect, useMemo } from 'react';
import { Destination, UserPreferences, AlgorithmWeights, TravelProfile, RecommendationExplanation } from '../types';
import { mockDestinations, defaultUserPreferences, defaultAlgorithmWeights, defaultTravelProfile } from '../data/mockData';
import { RecommendationEngine } from '../utils/recommendationEngine';
import DestinationCard from './DestinationCard';
import DestinationDialog from './DestinationDialog';
import Banner from './Banner';
import ParametersModal from './ParametersModal';
import OnboardingDialog from './OnboardingDialog';
import { Card, CardContent } from './ui/Card';
import { Button } from './ui/Button';
import { 
  Plane, 
  RotateCcw, 
  BarChart3, 
  Settings,
  Menu,
  X
} from 'lucide-react';
import ReasoningPanel from './ReasoningPanel';
import TheoryContent from './TheoryContent';
import { SimpleEditor } from './tiptap-templates/simple/simple-editor';

export default function HomePage() {
  const [destinations, setDestinations] = useState<Destination[]>(mockDestinations);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(defaultUserPreferences);
  const [algorithmWeights, setAlgorithmWeights] = useState<AlgorithmWeights>(defaultAlgorithmWeights);
  const [travelProfile, setTravelProfile] = useState<TravelProfile>(defaultTravelProfile);
  const [showReasoningPanel, setShowReasoningPanel] = useState(true);
  const [seasonalAdjustmentEnabled, setSeasonalAdjustmentEnabled] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isParametersModalOpen, setIsParametersModalOpen] = useState(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [isDestinationDialogOpen, setIsDestinationDialogOpen] = useState(false);
  const [previousRankings, setPreviousRankings] = useState<{ [key: string]: number }>({});
  const [currentView, setCurrentView] = useState<'recommender' | 'theory' | 'editor'>('recommender');
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

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

  // Update previous rankings when recommendations change
  useEffect(() => {
    const newPreviousRankings: { [key: string]: number } = {};
    recommendedDestinations.forEach((destination, index) => {
      newPreviousRankings[destination.id] = previousRankings[destination.id] || index + 1;
    });
    setPreviousRankings(newPreviousRankings);
  }, [recommendedDestinations]);

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

  // Handle reset profile
  const handleResetProfile = () => {
    setUserPreferences(defaultUserPreferences);
    setAlgorithmWeights(defaultAlgorithmWeights);
    setTravelProfile(defaultTravelProfile);
    setDestinations(prev => prev.map(dest => ({
      ...dest,
      userActions: {
        liked: false,
        bookmarked: false,
        beenHere: false,
        wantToVisit: false
      }
    })));
    setIsOnboardingOpen(true);
  };

  // Handle onboarding completion
  const handleOnboardingComplete = (userInfo: any) => {
    setIsOnboardingOpen(false);
    setHasCompletedOnboarding(true);
    
    // Reset all data
    setUserPreferences(defaultUserPreferences);
    setAlgorithmWeights(defaultAlgorithmWeights);
    setTravelProfile(defaultTravelProfile);
    setDestinations(prev => prev.map(dest => ({
      ...dest,
      userActions: {
        liked: false,
        bookmarked: false,
        beenHere: false,
        wantToVisit: false
      }
    })));
    
    // Here you could use the userInfo to personalize the recommendations
    console.log('User onboarding completed:', userInfo);
  };

  // Handle destination click
  const handleDestinationClick = (destination: Destination) => {
    setSelectedDestination(destination);
    setIsDestinationDialogOpen(true);
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
            <button
              onClick={() => setCurrentView('recommender')}
              className={`font-medium ${
                currentView === 'recommender' 
                  ? 'text-gray-900 border-b border-gray-900' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Recommender
            </button>
            <button
              onClick={() => setCurrentView('theory')}
              className={`font-medium ${
                currentView === 'theory' 
                  ? 'text-gray-900 border-b border-gray-900' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Theory
            </button>
            <button
              onClick={() => setCurrentView('editor')}
              className={`font-medium ${
                currentView === 'editor' 
                  ? 'text-gray-900 border-b border-gray-900' 
                  : 'text-gray-700 hover:text-gray-900'
              }`}
            >
              Editor
            </button>
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
                <button
                  onClick={() => {
                    setCurrentView('recommender');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-medium py-2 ${
                    currentView === 'recommender' 
                      ? 'text-gray-900 border-b border-gray-900' 
                      : 'text-gray-700 hover:text-gray-900 hover:underline'
                  }`}
                >
                  Recommender
                </button>
                <button
                  onClick={() => {
                    setCurrentView('theory');
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left font-medium py-2 ${
                    currentView === 'theory' 
                      ? 'text-gray-900 border-b border-gray-900' 
                      : 'text-gray-700 hover:text-gray-900 hover:underline'
                  }`}
                >
                  Theory
                </button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setIsParametersModalOpen(true);
                    setIsMobileMenuOpen(false);
                  }}
                  className="text-gray-700 border-gray-300 hover:bg-gray-50 justify-start"
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Parameters
                </Button>
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'recommender' ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Destinations */}
            <div className={`${showReasoningPanel ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
              <div className="mb-12">
                <h2 className="text-3xl font-medium text-gray-900 mb-2">
                  Destination Ranking
                </h2>
                <p className="text-gray-600 text-base">
                  Discover why each destination was ranked and how your preferences influence the algorithm. See explanations on changing rankings in the right panel.
                </p>
              </div>

              {/* Destinations Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Places 1-5 */}
                <div className="space-y-4">
                  {recommendedDestinations.slice(0, 5).map((destination, index) => (
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
                        rank={index + 1}
                        previousRank={previousRankings[destination.id]}
                        onClick={handleDestinationClick}
                        isCompact={true}
                      />
                    </div>
                  ))}
                </div>

                {/* Right Column - Places 6+ */}
                <div className="space-y-4">
                  {recommendedDestinations.slice(5).map((destination, index) => (
                    <div
                      key={destination.id}
                      className="transform transition-all duration-500 ease-out hover:scale-[1.02]"
                      style={{
                        animationDelay: `${(index + 5) * 100}ms`,
                        animation: 'fadeInUp 0.6s ease-out forwards'
                      }}
                    >
                      <DestinationCard
                        destination={destination}
                        rank={index + 6}
                        previousRank={previousRankings[destination.id]}
                        onClick={handleDestinationClick}
                        isCompact={true}
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* No destinations message */}
              {recommendedDestinations.length === 0 && (
                <Card>
                  <CardContent className="text-center py-12">
                    <Plane className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">No destinations found</h3>
                    <p className="text-gray-600 mb-4">
                      Try adjusting your preferences to see more recommendations.
                    </p>
                    <Button onClick={() => setIsParametersModalOpen(true)}>
                      <Settings className="h-4 w-4 mr-2" />
                      Adjust Parameters
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Right Column - Algorithm Panel */}
            {showReasoningPanel && (
              <div className="lg:col-span-5">
                <ReasoningPanel
                  userPreferences={userPreferences}
                  algorithmWeights={algorithmWeights}
                  travelProfile={travelProfile}
                  explanation={explanation}
                  hasCompletedOnboarding={hasCompletedOnboarding}
                  onPreferencesChange={(preferences) => setUserPreferences(prev => ({ ...prev, ...preferences }))}
                  onWeightsChange={(weights) => setAlgorithmWeights(prev => ({ ...prev, ...weights }))}
                  onResetProfile={handleResetProfile}
                  onOpenParameters={() => setIsParametersModalOpen(true)}
                />
              </div>
            )}
          </div>
        ) : currentView === 'theory' ? (
          // Theory Content
          <TheoryContent />
        ) : (
          <SimpleEditor />
        )}

        {/* Filter Bubble Warning - Only show in recommender view */}
        {currentView === 'recommender' && travelProfile.filterBubbleWarning && (
          <div className="mt-8">
            <Card className="border-orange-200 bg-orange-50">
              <CardContent className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <BarChart3 className="h-5 w-5 text-orange-600" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-orange-800">
                      Filter Bubble Warning
                    </h3>
                    <p className="mt-1 text-sm text-orange-700">
                      Your recommendations are becoming too similar. Try adjusting your preferences 
                      or enabling diversity mode to discover new types of destinations.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Parameters Modal */}
      <ParametersModal
        isOpen={isParametersModalOpen}
        onClose={() => setIsParametersModalOpen(false)}
        userPreferences={userPreferences}
        onPreferencesChange={(preferences) => setUserPreferences(prev => ({ ...prev, ...preferences }))}
        algorithmWeights={algorithmWeights}
        onWeightsChange={(weights) => setAlgorithmWeights(prev => ({ ...prev, ...weights }))}
        travelProfile={travelProfile}
        onSeasonChange={handleSeasonChange}
        onBudgetRangeChange={handleBudgetRangeChange}
        seasonalAdjustmentEnabled={seasonalAdjustmentEnabled}
        onToggleSeasonalAdjustment={setSeasonalAdjustmentEnabled}
      />

      {/* Onboarding Dialog */}
      <OnboardingDialog
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onComplete={handleOnboardingComplete}
      />

      {/* Destination Dialog */}
      <DestinationDialog
        destination={selectedDestination}
        isOpen={isDestinationDialogOpen}
        onClose={() => {
          setIsDestinationDialogOpen(false);
          setSelectedDestination(null);
        }}
        onAction={handleDestinationAction}
      />
    </div>
  );
}

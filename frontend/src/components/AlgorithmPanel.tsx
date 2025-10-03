import React from 'react';
import { UserPreferences, AlgorithmWeights, RecommendationExplanation, TravelProfile } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Slider } from './ui/Slider';
import { Progress } from './ui/Progress';
import { Button } from './ui/Button';
import { 
  Settings, 
  Users, 
  TrendingUp, 
  Shuffle, 
  AlertTriangle,
  Sun,
  Snowflake,
  Leaf,
  Flame,
  Mountain,
  DollarSign,
  Activity,
  Heart,
  MapPin,
  Calendar
} from 'lucide-react';

interface AlgorithmPanelProps {
  userPreferences: UserPreferences;
  algorithmWeights: AlgorithmWeights;
  travelProfile: TravelProfile;
  explanation: RecommendationExplanation;
  onPreferencesChange: (preferences: Partial<UserPreferences>) => void;
  onWeightsChange: (weights: Partial<AlgorithmWeights>) => void;
  onResetProfile: () => void;
}

const AlgorithmPanel: React.FC<AlgorithmPanelProps> = ({
  userPreferences,
  algorithmWeights,
  travelProfile,
  explanation,
  onPreferencesChange,
  onWeightsChange,
  onResetProfile
}) => {
  const getClimateIcon = (climate: string) => {
    const icons = {
      tropical: <Sun className="h-4 w-4 text-yellow-500" />,
      temperate: <Leaf className="h-4 w-4 text-green-500" />,
      cold: <Snowflake className="h-4 w-4 text-blue-500" />,
      arid: <Flame className="h-4 w-4 text-orange-500" />,
      continental: <Mountain className="h-4 w-4 text-gray-500" />
    };
    return icons[climate as keyof typeof icons] || <Sun className="h-4 w-4" />;
  };

  const getActivityIcon = (activity: string) => {
    const icons = {
      adventure: <Mountain className="h-4 w-4 text-red-500" />,
      culture: <Heart className="h-4 w-4 text-purple-500" />,
      relaxation: <Sun className="h-4 w-4 text-green-500" />,
      nightlife: <Activity className="h-4 w-4 text-pink-500" />,
      nature: <Leaf className="h-4 w-4 text-emerald-500" />,
      history: <MapPin className="h-4 w-4 text-amber-500" />
    };
    return icons[activity as keyof typeof icons] || <Activity className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6 algorithm-panel">
      {/* Algorithm Weights */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="flex items-center text-lg">
            <Settings className="h-5 w-5 mr-2" />
            Algorithm Weights
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Content-Based</span>
              <span>{Math.round(algorithmWeights.contentBased * 100)}%</span>
            </div>
            <Slider
              value={algorithmWeights.contentBased}
              onValueChange={(value) => onWeightsChange({ contentBased: value })}
              min={0}
              max={1}
              step={0.1}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Collaborative</span>
              <span>{Math.round(algorithmWeights.collaborative * 100)}%</span>
            </div>
            <Slider
              value={algorithmWeights.collaborative}
              onValueChange={(value) => onWeightsChange({ collaborative: value })}
              min={0}
              max={1}
              step={0.1}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Popularity</span>
              <span>{Math.round(algorithmWeights.popularity * 100)}%</span>
            </div>
            <Slider
              value={algorithmWeights.popularity}
              onValueChange={(value) => onWeightsChange({ popularity: value })}
              min={0}
              max={1}
              step={0.1}
            />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span>Diversity</span>
              <span>{Math.round(algorithmWeights.diversity * 100)}%</span>
            </div>
            <Slider
              value={algorithmWeights.diversity}
              onValueChange={(value) => onWeightsChange({ diversity: value })}
              min={0}
              max={1}
              step={0.1}
            />
          </div>
        </CardContent>
      </Card>

      {/* Climate Preferences */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg">Climate Preferences</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(userPreferences.climate).map(([climate, value]) => (
            <div key={climate}>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center">
                  {getClimateIcon(climate)}
                  <span className="ml-2 capitalize">{climate}</span>
                </div>
                <span>{Math.round(value * 100)}%</span>
              </div>
              <Slider
                value={value}
                onValueChange={(newValue) => 
                  onPreferencesChange({
                    climate: { ...userPreferences.climate, [climate]: newValue }
                  })
                }
                min={0}
                max={1}
                step={0.1}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Budget Preferences */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <DollarSign className="h-5 w-5 mr-2" />
            Budget Level
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(userPreferences.budget).map(([budget, value]) => (
            <div key={budget}>
              <div className="flex justify-between text-sm mb-2">
                <span className="capitalize">{budget}</span>
                <span>{Math.round(value * 100)}%</span>
              </div>
              <Slider
                value={value}
                onValueChange={(newValue) => 
                  onPreferencesChange({
                    budget: { ...userPreferences.budget, [budget]: newValue }
                  })
                }
                min={0}
                max={1}
                step={0.1}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Activity Preferences */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg">Activity Types</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {Object.entries(userPreferences.activities).map(([activity, value]) => (
            <div key={activity}>
              <div className="flex items-center justify-between text-sm mb-2">
                <div className="flex items-center">
                  {getActivityIcon(activity)}
                  <span className="ml-2 capitalize">{activity}</span>
                </div>
                <span>{Math.round(value * 100)}%</span>
              </div>
              <Slider
                value={value}
                onValueChange={(newValue) => 
                  onPreferencesChange({
                    activities: { ...userPreferences.activities, [activity]: newValue }
                  })
                }
                min={0}
                max={1}
                step={0.1}
              />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Live Explanation */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            Live Explanation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg">
              <p className="text-sm font-medium text-blue-900">
                {explanation.mainReason}
              </p>
            </div>
            <div className="space-y-2">
              {explanation.secondaryReasons.map((reason, index) => (
                <div key={index} className="text-sm text-muted-foreground">
                  • {reason}
                </div>
              ))}
            </div>
            <div className="text-sm text-muted-foreground">
              <strong>Similar travelers:</strong> {explanation.similarUsers.join(', ')}
            </div>
            <div className="text-sm text-muted-foreground">
              <strong>Seasonal adjustment:</strong> {explanation.seasonalAdjustment}
            </div>
            <div className="text-sm text-muted-foreground">
              <strong>Budget impact:</strong> {explanation.budgetImpact}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Travel Profile */}
      <Card className="card-hover">
        <CardHeader>
          <CardTitle className="text-lg flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Your Travel Profile
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-sm mb-2">Learned Preferences</h4>
              <div className="flex flex-wrap gap-2">
                {travelProfile.learnedPreferences.map((pref, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                  >
                    {pref}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium text-sm mb-2">Travel History</h4>
              <div className="flex flex-wrap gap-2">
                {travelProfile.travelHistory.map((destination, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                  >
                    {destination}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="h-4 w-4 mr-1" />
              Current season: {travelProfile.currentSeason}
            </div>
            <div className="flex items-center text-sm text-muted-foreground">
              <DollarSign className="h-4 w-4 mr-1" />
              Budget range: ${travelProfile.budgetRange[0]} - ${travelProfile.budgetRange[1]}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Filter Bubble Warning */}
      {travelProfile.filterBubbleWarning && (
        <Card className="border-orange-200 bg-orange-50 card-hover">
          <CardContent className="pt-6">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
              <div>
                <h4 className="font-medium text-orange-900">Filter Bubble Warning</h4>
                <p className="text-sm text-orange-700 mt-1">
                  Your recommendations are getting narrow. Try exploring new types of destinations!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reset Profile */}
      <Card className="card-hover">
        <CardContent className="pt-6">
          <Button
            variant="outline"
            className="w-full"
            onClick={onResetProfile}
          >
            <Shuffle className="h-4 w-4 mr-2" />
            Reset My Profile
          </Button>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            Demonstrates the cold-start problem
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlgorithmPanel;

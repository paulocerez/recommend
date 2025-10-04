import React from 'react';
import { UserPreferences, AlgorithmWeights, TravelProfile } from '../types';
import { Button } from './ui/Button';
import { Slider } from './ui/Slider';
import { Switch } from './ui/Switch';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/Dialog';
import { 
  Settings, 
  Sun,
  Snowflake,
  Leaf,
  Flame,
  Mountain,
  DollarSign,
  Activity,
  Calendar,
  Wind,
  TrendingUp,
  TrendingDown,
  Check
} from 'lucide-react';

interface ParametersModalProps {
  isOpen: boolean;
  onClose: () => void;
  userPreferences: UserPreferences;
  algorithmWeights: AlgorithmWeights;
  travelProfile: TravelProfile;
  seasonalAdjustmentEnabled: boolean;
  onPreferencesChange: (preferences: Partial<UserPreferences>) => void;
  onWeightsChange: (weights: Partial<AlgorithmWeights>) => void;
  onSeasonChange: (season: 'spring' | 'summer' | 'fall' | 'winter') => void;
  onBudgetRangeChange: (range: [number, number]) => void;
  onToggleSeasonalAdjustment: (enabled: boolean) => void;
}

export default function ParametersModal({
  isOpen,
  onClose,
  userPreferences,
  algorithmWeights,
  travelProfile,
  seasonalAdjustmentEnabled,
  onPreferencesChange,
  onWeightsChange,
  onSeasonChange,
  onBudgetRangeChange,
  onToggleSeasonalAdjustment
}: ParametersModalProps) {

  const getClimateIcon = (climate: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      tropical: <Sun className="h-4 w-4 text-yellow-500" />,
      temperate: <Leaf className="h-4 w-4 text-green-500" />,
      cold: <Snowflake className="h-4 w-4 text-blue-500" />,
    };
    return icons[climate as keyof typeof icons] || <Sun className="h-4 w-4" />;
  };

  const getActivityIcon = (activity: string) => {
    const icons: { [key: string]: React.ReactNode } = {
      adventure: <Mountain className="h-4 w-4 text-orange-500" />,
      culture: <Activity className="h-4 w-4 text-purple-500" />,
      relaxation: <Sun className="h-4 w-4 text-yellow-500" />,
      nightlife: <Flame className="h-4 w-4 text-red-500" />,
      wildlife: <Leaf className="h-4 w-4 text-green-500" />,
    };
    return icons[activity as keyof typeof icons] || <Activity className="h-4 w-4" />;
  };

  const getBudgetLevel = (budget: number) => {
    if (budget < 1000) return { level: 'Budget', color: 'text-green-600', icon: <TrendingDown className="h-4 w-4" /> };
    if (budget < 3000) return { level: 'Mid-range', color: 'text-yellow-600', icon: <TrendingUp className="h-4 w-4" /> };
    if (budget < 6000) return { level: 'Luxury', color: 'text-orange-600', icon: <TrendingUp className="h-4 w-4" /> };
    return { level: 'Ultra-luxury', color: 'text-red-600', icon: <TrendingUp className="h-4 w-4" /> };
  };

  const handleMinBudgetChange = (value: number) => {
    onBudgetRangeChange([value, Math.max(value, travelProfile.budgetRange[1])]);
  };

  const handleMaxBudgetChange = (value: number) => {
    onBudgetRangeChange([Math.min(value, travelProfile.budgetRange[0]), value]);
  };

  const seasons = [
    { key: 'spring', label: 'Spring', icon: <Leaf className="h-4 w-4" />, color: 'text-green-500' },
    { key: 'summer', label: 'Summer', icon: <Sun className="h-4 w-4" />, color: 'text-yellow-500' },
    { key: 'fall', label: 'Fall', icon: <Wind className="h-4 w-4" />, color: 'text-orange-500' },
    { key: 'winter', label: 'Winter', icon: <Snowflake className="h-4 w-4" />, color: 'text-blue-500' }
  ] as const;

  const minBudgetLevel = getBudgetLevel(travelProfile.budgetRange[0]);
  const maxBudgetLevel = getBudgetLevel(travelProfile.budgetRange[1]);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[95vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center text-xl font-semibold text-gray-900">
            Algorithm Parameters
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-1">
            Customize your recommendation algorithm by adjusting these parameters
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-6 space-y-8">
          {/* Algorithm Weights */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900">Algorithm Weights</h3>
              <div className="text-xs text-black bg-gray-50 px-2 py-1 rounded font-semibold">
                Total: {Math.round((algorithmWeights.contentBased + algorithmWeights.collaborative + algorithmWeights.popularity + algorithmWeights.diversity) * 100)}%
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                { key: 'contentBased', label: 'Content-Based', description: 'Matches your preferences' },
                { key: 'collaborative', label: 'Collaborative', description: 'Similar users\' choices' },
                { key: 'popularity', label: 'Popularity', description: 'Trending destinations' },
                { key: 'diversity', label: 'Diversity', description: 'Variety in recommendations' }
              ].map(({ key, label, description }) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium text-gray-900">{label}</span>
                      <p className="text-xs text-gray-500">{description}</p>
                    </div>
                    <span className="text-sm font-semibold text-black min-w-[3rem] text-right">
                      {Math.round(algorithmWeights[key as keyof typeof algorithmWeights] * 100)}%
                    </span>
                  </div>
                  <Slider
                    value={algorithmWeights[key as keyof typeof algorithmWeights]}
                    onValueChange={(value) => onWeightsChange({ [key]: value })}
                    min={0}
                    max={1}
                    step={0.05}
                    className="w-full"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Seasonal Adjustments */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-gray-900 flex items-center">
                Seasonal Adjustments
              </h3>
              <Switch
                checked={seasonalAdjustmentEnabled}
                onCheckedChange={onToggleSeasonalAdjustment}
              />
            </div>
            
            {seasonalAdjustmentEnabled && (
              <div className="space-y-3">
                <p className="text-xs text-gray-600">
                  Click to select your preferred travel season
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {seasons.map((season) => (
                    <button
                      key={season.key}
                      className={`flex items-center justify-between h-9 text-xs px-3 py-2 rounded-lg border transition-all duration-200 ${
                        travelProfile.currentSeason === season.key
                          ? 'bg-gray-100 text-gray-900 border-gray-200 shadow-sm'
                          : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                      }`}
                      onClick={() => onSeasonChange(season.key)}
                    >
                      <div className="flex items-center">
                        <span className={`mr-2 ${travelProfile.currentSeason === season.key ? season.color.replace('text-', 'text-') : season.color}`}>
                          {season.icon}
                        </span>
                        {season.label}
                      </div>
                      {travelProfile.currentSeason === season.key && (
                        <Check className="h-3 w-3 text-green-600" />
                      )}
                    </button>
                  ))}
                </div>
                <div className="text-xs text-gray-600 bg-gray-50 p-2 rounded border border-gray-200">
                  <strong>Selected:</strong> {travelProfile.currentSeason} - Recommendations adjusted for optimal weather and activities
                </div>
              </div>
            )}
          </div>

          {/* Budget Impact */}
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              Budget Range
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Minimum Budget</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-black">${travelProfile.budgetRange[0].toLocaleString()}</span>
                    <span className={`text-xs ${minBudgetLevel.color} flex items-center`}>
                      {minBudgetLevel.icon}
                      <span className="ml-1">{minBudgetLevel.level}</span>
                    </span>
                  </div>
                </div>
                <Slider
                  value={travelProfile.budgetRange[0]}
                  onValueChange={handleMinBudgetChange}
                  min={0}
                  max={10000}
                  step={100}
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-900">Maximum Budget</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-black">${travelProfile.budgetRange[1].toLocaleString()}</span>
                    <span className={`text-xs ${maxBudgetLevel.color} flex items-center`}>
                      {maxBudgetLevel.icon}
                      <span className="ml-1">{maxBudgetLevel.level}</span>
                    </span>
                  </div>
                </div>
                <Slider
                  value={travelProfile.budgetRange[1]}
                  onValueChange={handleMaxBudgetChange}
                  min={0}
                  max={10000}
                  step={100}
                  className="w-full"
                />
              </div>

              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-gray-900">Range</span>
                  <span className="text-sm font-semibold text-black">
                    ${travelProfile.budgetRange[0].toLocaleString()} - ${travelProfile.budgetRange[1].toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-600">
                  Destinations outside this range will be deprioritized
                </p>
              </div>
            </div>
          </div>

          {/* Climate Preferences */}
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              Climate Preferences
            </h3>
            <p className="text-xs text-gray-600">Click to select/deselect climate preferences</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(userPreferences.climate).map(([climate, value]) => (
                <button
                  key={climate}
                  className={`flex items-center justify-between h-9 text-xs px-3 py-2 rounded-lg border transition-all duration-200 ${
                    value > 0
                      ? 'bg-gray-100 text-gray-900 border-gray-200 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                  onClick={() => 
                    onPreferencesChange({
                      climate: { ...userPreferences.climate, [climate]: value > 0 ? 0 : 1 }
                    })
                  }
                >
                  <div className="flex items-center">
                    {getClimateIcon(climate)}
                    <span className="ml-2 text-xs font-medium capitalize">{climate}</span>
                  </div>
                  {value > 0 && (
                    <Check className="h-3 w-3 text-green-600" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Budget Level Preferences */}
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              Budget Level Preferences
            </h3>
            <p className="text-xs text-gray-600">Click to select/deselect budget levels</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(userPreferences.budget).map(([budget, value]) => (
                <button
                  key={budget}
                  className={`flex items-center justify-between h-9 text-xs px-3 py-2 rounded-lg border transition-all duration-200 ${
                    value > 0
                      ? 'bg-gray-100 text-gray-900 border-gray-200 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                  onClick={() => 
                    onPreferencesChange({
                      budget: { ...userPreferences.budget, [budget]: value > 0 ? 0 : 1 }
                    })
                  }
                >
                  <span className="text-xs font-medium capitalize">{budget}</span>
                  {value > 0 && (
                    <Check className="h-3 w-3 text-green-600" />
                  )}
                </button>
              ))}
            </div>
          </div>


          {/* Activity Preferences */}
          <div className="space-y-6">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              Activity Types
            </h3>
            <p className="text-xs text-gray-600">Click to select/deselect activity types</p>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(userPreferences.activities).map(([activity, value]) => (
                <button
                  key={activity}
                  className={`flex items-center justify-between h-9 text-xs px-3 py-2 rounded-lg border transition-all duration-200 ${
                    value > 0
                      ? 'bg-gray-100 text-gray-900 border-gray-200 shadow-sm'
                      : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                  onClick={() => 
                    onPreferencesChange({
                      activities: { ...userPreferences.activities, [activity]: value > 0 ? 0 : 1 }
                    })
                  }
                >
                  <div className="flex items-center">
                    {getActivityIcon(activity)}
                    <span className="ml-2 text-xs font-medium capitalize">{activity}</span>
                  </div>
                  {value > 0 && (
                    <Check className="h-3 w-3 text-green-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};


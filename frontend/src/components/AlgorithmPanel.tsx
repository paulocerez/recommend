import React, { useState, useEffect } from 'react';
import { UserPreferences, AlgorithmWeights, RecommendationExplanation, TravelProfile } from '../types';
import { Button } from './ui/Button';
import { 
  Shuffle, 
  Settings,
} from 'lucide-react';

interface AlgorithmPanelProps {
  userPreferences: UserPreferences;
  algorithmWeights: AlgorithmWeights;
  travelProfile: TravelProfile;
  explanation: RecommendationExplanation;
  hasCompletedOnboarding: boolean;
  onPreferencesChange: (preferences: Partial<UserPreferences>) => void;
  onWeightsChange: (weights: Partial<AlgorithmWeights>) => void;
  onResetProfile: () => void;
  onOpenParameters: () => void;
}

interface Update {
  id: string;
  type: 'main' | 'secondary' | 'context';
  content: string;
  timestamp: Date;
  icon?: React.ReactNode;
}

export default function AlgorithmPanel({
  explanation,
  hasCompletedOnboarding,
  onResetProfile,
  onOpenParameters
}: AlgorithmPanelProps) {
  const [updates, setUpdates] = useState<Update[]>([]);

  // Generate updates from explanation only after onboarding is completed
  useEffect(() => {
    if (!hasCompletedOnboarding) {
      setUpdates([]);
      return;
    }

    const newUpdates: Update[] = [
      {
        id: 'main',
        type: 'main',
        content: explanation.mainReason,
        timestamp: new Date(),
      },
      ...explanation.secondaryReasons.map((reason, index) => ({
        id: `secondary-${index}`,
        type: 'secondary' as const,
        content: reason,
        timestamp: new Date(Date.now() - (index + 1) * 30000), // 30 seconds apart
      })),
      {
        id: 'similar-users',
        type: 'context' as const,
        content: `Similar travelers: ${explanation.similarUsers.join(', ')}`,
        timestamp: new Date(Date.now() - 120000), // 2 minutes ago
      },
      {
        id: 'seasonal',
        type: 'context' as const,
        content: explanation.seasonalAdjustment,
        timestamp: new Date(Date.now() - 150000), // 2.5 minutes ago
      },
      {
        id: 'budget',
        type: 'context' as const,
        content: explanation.budgetImpact,
        timestamp: new Date(Date.now() - 180000), // 3 minutes ago
      }
    ];
    
    setUpdates(newUpdates);
  }, [explanation, hasCompletedOnboarding]);

  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Just now';
    if (minutes === 1) return '1 minute ago';
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours === 1) return '1 hour ago';
    return `${hours} hours ago`;
  };

  return (
    <div className="bg-white border border-gray-100 shadow-md rounded-lg p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium text-gray-900">Recommendation Reasoning</span>
        </div>
      </div>

      {/* Updates feed */}
      <div className="max-h-[60vh] overflow-y-auto space-y-1">
        {updates.map((update, index) => (
          <div key={update.id} className="py-2">
            <div className="flex items-start space-x-3">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {update.content}
                </p>
                <div className="flex items-center mt-1">
                  <span className="text-xs text-gray-400">
                    {formatTime(update.timestamp)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>


      <div className="grid grid-cols-2 gap-2">
        <Button
          variant="outline"
          className="w-full bg-white hover:bg-gray-50 border-gray-200 text-gray-700 text-sm"
          onClick={onOpenParameters}
        >
          Adjust Parameters
        </Button>
        
        <Button
          variant="outline"
          className="w-full bg-white hover:bg-gray-50 border-gray-200 text-gray-700 text-sm"
          onClick={onResetProfile}
        >
          Onboarding
        </Button>
      </div>
    </div>
  );
};


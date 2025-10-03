import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Calendar, Sun, Snowflake, Leaf, Wind } from 'lucide-react';
import { Switch } from './ui/Switch';

interface SeasonalAdjustmentProps {
  currentSeason: 'spring' | 'summer' | 'fall' | 'winter';
  onSeasonChange: (season: 'spring' | 'summer' | 'fall' | 'winter') => void;
  seasonalAdjustmentEnabled: boolean;
  onToggleSeasonalAdjustment: (enabled: boolean) => void;
}

const SeasonalAdjustment: React.FC<SeasonalAdjustmentProps> = ({
  currentSeason,
  onSeasonChange,
  seasonalAdjustmentEnabled,
  onToggleSeasonalAdjustment
}) => {
  const seasons = [
    { key: 'spring', label: 'Spring', icon: <Leaf className="h-4 w-4" />, color: 'text-green-500' },
    { key: 'summer', label: 'Summer', icon: <Sun className="h-4 w-4" />, color: 'text-yellow-500' },
    { key: 'fall', label: 'Fall', icon: <Wind className="h-4 w-4" />, color: 'text-orange-500' },
    { key: 'winter', label: 'Winter', icon: <Snowflake className="h-4 w-4" />, color: 'text-blue-500' }
  ] as const;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <Calendar className="h-5 w-5 mr-2" />
          Seasonal Adjustments
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Enable seasonal recommendations</span>
          <Switch
            checked={seasonalAdjustmentEnabled}
            onCheckedChange={onToggleSeasonalAdjustment}
          />
        </div>
        
        {seasonalAdjustmentEnabled && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Choose your preferred travel season to see how recommendations change:
            </p>
            <div className="grid grid-cols-2 gap-2">
              {seasons.map((season) => (
                <Button
                  key={season.key}
                  variant={currentSeason === season.key ? "default" : "outline"}
                  size="sm"
                  className="justify-start"
                  onClick={() => onSeasonChange(season.key)}
                >
                  <span className={`mr-2 ${season.color}`}>
                    {season.icon}
                  </span>
                  {season.label}
                </Button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground bg-muted p-2 rounded">
              <strong>Current season:</strong> {currentSeason} - Recommendations are adjusted for optimal weather and activities.
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SeasonalAdjustment;

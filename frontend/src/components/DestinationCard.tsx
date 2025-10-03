import React, { useState } from 'react';
import { Destination } from '../types';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Button } from './ui/Button';
import { Progress } from './ui/Progress';
import { 
  Heart, 
  Bookmark, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Thermometer,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Star
} from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  onAction: (destinationId: string, action: keyof Destination['userActions']) => void;
  isCompact?: boolean;
}

const DestinationCard: React.FC<DestinationCardProps> = ({ destination, onAction, isCompact = false }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCardExpanded, setIsCardExpanded] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'bg-green-500';
    if (score >= 0.6) return 'bg-yellow-500';
    if (score >= 0.4) return 'bg-orange-500';
    return 'bg-red-500';
  };

  const getCostSymbols = (level: number) => {
    return '$'.repeat(level);
  };

  const getClimateColor = (climate: string) => {
    const colors = {
      tropical: 'bg-green-100 text-green-800',
      temperate: 'bg-blue-100 text-blue-800',
      cold: 'bg-cyan-100 text-cyan-800',
      arid: 'bg-yellow-100 text-yellow-800',
      continental: 'bg-gray-100 text-gray-800'
    };
    return colors[climate as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getActivityColor = (activity: string) => {
    const colors = {
      adventure: 'bg-red-100 text-red-800',
      culture: 'bg-purple-100 text-purple-800',
      relaxation: 'bg-green-100 text-green-800',
      nightlife: 'bg-pink-100 text-pink-800',
      nature: 'bg-emerald-100 text-emerald-800',
      history: 'bg-amber-100 text-amber-800',
      photography: 'bg-indigo-100 text-indigo-800',
      wellness: 'bg-teal-100 text-teal-800',
      shopping: 'bg-rose-100 text-rose-800',
      food: 'bg-orange-100 text-orange-800',
      'wine-tasting': 'bg-violet-100 text-violet-800',
      hiking: 'bg-lime-100 text-lime-800',
      wildlife: 'bg-emerald-100 text-emerald-800'
    };
    return colors[activity as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  if (isCompact) {
    return (
      <Card className="overflow-hidden destination-card animate-fade-in-up">
        <div className="relative">
          <img
            src={destination.image}
            alt={destination.name}
            className="w-full h-32 object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className={`h-6 w-6 bg-white/90 hover:bg-white ${
                destination.userActions.liked ? 'text-red-500' : 'text-gray-500'
              }`}
              onClick={() => onAction(destination.id, 'liked')}
            >
              <Heart className={`h-3 w-3 ${destination.userActions.liked ? 'fill-current' : ''}`} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className={`h-6 w-6 bg-white/90 hover:bg-white ${
                destination.userActions.bookmarked ? 'text-blue-500' : 'text-gray-500'
              }`}
              onClick={() => onAction(destination.id, 'bookmarked')}
            >
              <Bookmark className={`h-3 w-3 ${destination.userActions.bookmarked ? 'fill-current' : ''}`} />
            </Button>
          </div>
          <div className="absolute bottom-2 left-2">
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${getClimateColor(destination.climate)}`}>
              {destination.climate}
            </div>
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <CardTitle className="text-lg">{destination.name}</CardTitle>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <MapPin className="h-3 w-3 mr-1" />
                {destination.country}
              </div>
            </div>
            <div className="text-right ml-2">
              <div className="text-lg font-bold text-primary">
                {Math.round(destination.recommendationScore * 100)}%
              </div>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Basic Stats */}
          <div className="grid grid-cols-3 gap-2 mb-3">
            <div className="flex items-center text-xs">
              <Thermometer className="h-3 w-3 mr-1 text-muted-foreground" />
              {destination.temperature}°C
            </div>
            <div className="flex items-center text-xs">
              <DollarSign className="h-3 w-3 mr-1 text-muted-foreground" />
              {getCostSymbols(destination.costLevel)}
            </div>
            <div className="flex items-center text-xs">
              <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
              {destination.bestSeason[0]}
            </div>
          </div>

          {/* Recommendation Score Bar */}
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Score</span>
              <span>{Math.round(destination.recommendationScore * 100)}%</span>
            </div>
            <Progress 
              value={destination.recommendationScore * 100} 
              className="h-1 progress-bar"
            />
          </div>

          {/* Expand/Collapse Button */}
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto text-xs"
            onClick={() => setIsCardExpanded(!isCardExpanded)}
          >
            <span className="font-medium">More details</span>
            {isCardExpanded ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
          </Button>

          {/* Expanded Content */}
          {isCardExpanded && (
            <div className="mt-3 space-y-3">
              {/* Tags */}
              <div className="flex flex-wrap gap-1">
                {destination.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
                {destination.tags.length > 3 && (
                  <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                    +{destination.tags.length - 3}
                  </span>
                )}
              </div>

              {/* Activities */}
              <div className="flex flex-wrap gap-1">
                {destination.activities.slice(0, 3).map((activity, index) => (
                  <span
                    key={index}
                    className={`px-2 py-1 text-xs rounded-full ${getActivityColor(activity)}`}
                  >
                    {activity}
                  </span>
                ))}
                {destination.activities.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                    +{destination.activities.length - 3}
                  </span>
                )}
              </div>

              {/* Algorithm Contributions */}
              <div className="space-y-1">
                <div className="text-xs font-medium">Algorithm Contributions</div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="flex justify-between">
                    <span>Content:</span>
                    <span>{Math.round(destination.algorithmBreakdown.contentBased * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Collaborative:</span>
                    <span>{Math.round(destination.algorithmBreakdown.collaborative * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Popularity:</span>
                    <span>{Math.round(destination.algorithmBreakdown.popularity * 100)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Diversity:</span>
                    <span>{Math.round(destination.algorithmBreakdown.diversity * 100)}%</span>
                  </div>
                </div>
              </div>

              {/* Why Recommended */}
              <div className="p-2 bg-muted rounded text-xs text-muted-foreground">
                {destination.algorithmBreakdown.explanation}
              </div>

              {/* User Actions */}
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex-1 text-xs h-7 ${
                    destination.userActions.beenHere ? 'bg-green-50 border-green-200 text-green-700' : ''
                  }`}
                  onClick={() => onAction(destination.id, 'beenHere')}
                >
                  <CheckCircle className="h-3 w-3 mr-1" />
                  {destination.userActions.beenHere ? 'Visited' : 'Visit'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className={`flex-1 text-xs h-7 ${
                    destination.userActions.wantToVisit ? 'bg-blue-50 border-blue-200 text-blue-700' : ''
                  }`}
                  onClick={() => onAction(destination.id, 'wantToVisit')}
                >
                  <Star className="h-3 w-3 mr-1" />
                  {destination.userActions.wantToVisit ? 'Want' : 'Want'}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Original full-size card
  return (
    <Card className="mb-6 overflow-hidden destination-card animate-fade-in-up">
      <div className="relative">
        <img
          src={destination.image}
          alt={destination.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="icon"
            variant="ghost"
            className={`bg-white/90 hover:bg-white ${
              destination.userActions.liked ? 'text-red-500' : 'text-gray-500'
            }`}
            onClick={() => onAction(destination.id, 'liked')}
          >
            <Heart className={`h-4 w-4 ${destination.userActions.liked ? 'fill-current' : ''}`} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className={`bg-white/90 hover:bg-white ${
              destination.userActions.bookmarked ? 'text-blue-500' : 'text-gray-500'
            }`}
            onClick={() => onAction(destination.id, 'bookmarked')}
          >
            <Bookmark className={`h-4 w-4 ${destination.userActions.bookmarked ? 'fill-current' : ''}`} />
          </Button>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getClimateColor(destination.climate)}`}>
            {destination.climate}
          </div>
        </div>
      </div>

      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{destination.name}</CardTitle>
            <div className="flex items-center text-sm text-muted-foreground mt-1">
              <MapPin className="h-3 w-3 mr-1" />
              {destination.country}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">
              {Math.round(destination.recommendationScore * 100)}%
            </div>
            <div className="text-xs text-muted-foreground">Match Score</div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        {/* Quick Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="flex items-center text-sm">
            <Thermometer className="h-4 w-4 mr-1 text-muted-foreground" />
            {destination.temperature}°C
          </div>
          <div className="flex items-center text-sm">
            <DollarSign className="h-4 w-4 mr-1 text-muted-foreground" />
            {getCostSymbols(destination.costLevel)}
          </div>
          <div className="flex items-center text-sm">
            <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
            {destination.bestSeason[0]}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.tags.slice(0, 4).map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
          {destination.tags.length > 4 && (
            <span className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
              +{destination.tags.length - 4} more
            </span>
          )}
        </div>

        {/* Activities */}
        <div className="flex flex-wrap gap-2 mb-4">
          {destination.activities.map((activity, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs rounded-full ${getActivityColor(activity)}`}
            >
              {activity}
            </span>
          ))}
        </div>

        {/* Recommendation Score Bar */}
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-2">
            <span>Recommendation Score</span>
            <span>{Math.round(destination.recommendationScore * 100)}%</span>
          </div>
          <Progress 
            value={destination.recommendationScore * 100} 
            className="h-2 progress-bar"
          />
        </div>

        {/* Algorithm Contribution Bars */}
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Algorithm Contributions</div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span>Content-Based</span>
              <div className="flex items-center">
                <div className="w-16 h-1 bg-gray-200 rounded mr-2">
                  <div 
                    className={`h-1 rounded ${getScoreColor(destination.algorithmBreakdown.contentBased)}`}
                    style={{ width: `${destination.algorithmBreakdown.contentBased * 100}%` }}
                  />
                </div>
                <span>{Math.round(destination.algorithmBreakdown.contentBased * 100)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Collaborative</span>
              <div className="flex items-center">
                <div className="w-16 h-1 bg-gray-200 rounded mr-2">
                  <div 
                    className={`h-1 rounded ${getScoreColor(destination.algorithmBreakdown.collaborative)}`}
                    style={{ width: `${destination.algorithmBreakdown.collaborative * 100}%` }}
                  />
                </div>
                <span>{Math.round(destination.algorithmBreakdown.collaborative * 100)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Popularity</span>
              <div className="flex items-center">
                <div className="w-16 h-1 bg-gray-200 rounded mr-2">
                  <div 
                    className={`h-1 rounded ${getScoreColor(destination.algorithmBreakdown.popularity)}`}
                    style={{ width: `${destination.algorithmBreakdown.popularity * 100}%` }}
                  />
                </div>
                <span>{Math.round(destination.algorithmBreakdown.popularity * 100)}%</span>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <span>Diversity</span>
              <div className="flex items-center">
                <div className="w-16 h-1 bg-gray-200 rounded mr-2">
                  <div 
                    className={`h-1 rounded ${getScoreColor(destination.algorithmBreakdown.diversity)}`}
                    style={{ width: `${destination.algorithmBreakdown.diversity * 100}%` }}
                  />
                </div>
                <span>{Math.round(destination.algorithmBreakdown.diversity * 100)}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Why Recommended Section */}
        <div className="border-t pt-4">
          <Button
            variant="ghost"
            className="w-full justify-between p-0 h-auto"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            <span className="font-medium">Why recommended?</span>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </Button>
          {isExpanded && (
            <div className="mt-3 p-3 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                {destination.algorithmBreakdown.explanation}
              </p>
            </div>
          )}
        </div>

        {/* User Actions */}
        <div className="flex gap-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className={`flex-1 ${
              destination.userActions.beenHere ? 'bg-green-50 border-green-200 text-green-700' : ''
            }`}
            onClick={() => onAction(destination.id, 'beenHere')}
          >
            <CheckCircle className="h-4 w-4 mr-1" />
            {destination.userActions.beenHere ? 'Been Here' : 'Mark Visited'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={`flex-1 ${
              destination.userActions.wantToVisit ? 'bg-blue-50 border-blue-200 text-blue-700' : ''
            }`}
            onClick={() => onAction(destination.id, 'wantToVisit')}
          >
            <Star className="h-4 w-4 mr-1" />
            {destination.userActions.wantToVisit ? 'Want to Visit' : 'Add to Wishlist'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default DestinationCard;

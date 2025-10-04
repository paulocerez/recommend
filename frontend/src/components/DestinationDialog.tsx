import React from 'react';
import { Destination } from '../types';
import { Button } from './ui/Button';
import { Progress } from './ui/Progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/Dialog';
import { 
  Heart, 
  Bookmark, 
  X
} from 'lucide-react';

interface DestinationDialogProps {
  destination: Destination | null;
  isOpen: boolean;
  onClose: () => void;
  onAction: (destinationId: string, action: keyof Destination['userActions']) => void;
}

export default function DestinationDialog({ 
  destination, 
  isOpen, 
  onClose, 
  onAction 
}: DestinationDialogProps) {
  if (!destination) return null;

  const getCostSymbols = (level: number) => {
    return '$'.repeat(level);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl max-h-[70vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl font-bold">{destination.name}</DialogTitle>
              <DialogDescription className="text-lg mt-1">
                {destination.country}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto space-y-6">
          {/* Basic Info */}
          <div className="space-y-2">
            <div className="text-sm text-gray-600">
              {destination.temperature}°C • {getCostSymbols(destination.costLevel)} • {destination.bestSeason[0]}
            </div>
            <div className="text-sm text-gray-600 capitalize">
              {destination.climate}
            </div>
          </div>

          {/* Recommendation Score */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="font-medium">Recommendation Score</span>
              <span className="text-xl font-bold">
                {Math.round(destination.recommendationScore * 100)}%
              </span>
            </div>
            <Progress 
              value={destination.recommendationScore * 100} 
              className="h-2"
            />
          </div>

          {/* Main Actions */}
          <div className="space-y-3">
            <h3 className="font-medium">Help improve recommendations</h3>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className={`justify-start ${
                  destination.userActions.wantToVisit 
                    ? 'bg-gray-100 border-gray-300 text-gray-900' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onAction(destination.id, 'wantToVisit')}
              >
                {destination.userActions.wantToVisit ? 'On my wishlist' : 'Add to wishlist'}
              </Button>
              <Button
                variant="outline"
                className={`justify-start ${
                  destination.userActions.beenHere 
                    ? 'bg-gray-100 border-gray-300 text-gray-900' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onAction(destination.id, 'beenHere')}
              >
                {destination.userActions.beenHere ? 'I\'ve been here' : 'I\'ve visited this place'}
              </Button>


              <Button
                variant="outline"
                className={`justify-start ${
                  destination.userActions.liked 
                    ? 'bg-gray-100 border-gray-300 text-gray-900' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => onAction(destination.id, 'liked')}
              >
                {destination.userActions.liked ? 'I don\'t like it' : 'I don\'t like it'}
              </Button>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <h3 className="font-medium">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {destination.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Activities */}
          <div className="space-y-2">
            <h3 className="font-medium">Activities</h3>
            <div className="flex flex-wrap gap-2">
              {destination.activities.map((activity, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-gray-100 text-gray-700 text-sm rounded"
                >
                  {activity}
                </span>
              ))}
            </div>
          </div>

          {/* Algorithm Breakdown */}
          <div className="space-y-3">
            <h3 className="font-medium">Algorithm breakdown</h3>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Content-based</span>
                <span>{Math.round(destination.algorithmBreakdown.contentBased * 100)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Collaborative</span>
                <span>{Math.round(destination.algorithmBreakdown.collaborative * 100)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Popularity</span>
                <span>{Math.round(destination.algorithmBreakdown.popularity * 100)}%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Diversity</span>
                <span>{Math.round(destination.algorithmBreakdown.diversity * 100)}%</span>
              </div>
            </div>
          </div>

          {/* Explanation */}
          {destination.algorithmBreakdown.explanation && (
            <div className="space-y-2">
              <h3 className="font-medium">Why recommended</h3>
              <p className="text-sm text-gray-600">
                {destination.algorithmBreakdown.explanation}
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

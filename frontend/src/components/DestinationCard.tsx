import React from 'react';
import { Destination } from '../types';
import { 
  Item,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemContent
} from './ui/item';
import { 
  MapPin,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';

interface DestinationCardProps {
  destination: Destination;
  rank: number;
  previousRank?: number;
  onClick: (destination: Destination) => void;
  isCompact?: boolean;
}

export default function DestinationCard({ 
  destination, 
  rank, 
  previousRank,
  onClick, 
  isCompact = false 
}: DestinationCardProps) {
  const handleItemClick = () => {
    onClick(destination);
  };

  const getPositionChange = () => {
    if (!previousRank) return null;
    
    const change = previousRank - rank;
    if (change > 0) {
      return { type: 'up', value: change };
    } else if (change < 0) {
      return { type: 'down', value: Math.abs(change) };
    } else {
      return { type: 'same', value: 0 };
    }
  };

  const positionChange = getPositionChange();

  return (
    <Item 
      className="cursor-pointer hover:bg-gray-50 transition-colors duration-200 border border-gray-200 rounded-md"
      onClick={handleItemClick}
    >
      <ItemHeader>
        <ItemContent>
          <div className="flex items-center gap-4">
            <div className="flex-shrink-0">
              <div className="text-xs text-gray-600 bg-gray-100 border border-gray-300 rounded px-1.5 py-0.5">{rank}</div>
            </div>
            
            <div className="flex flex-col justify-center">
              <ItemTitle className="text-sm font-medium text-left">
                {destination.name}
              </ItemTitle>
              <ItemDescription className="text-xs text-gray-500 text-left">
                {destination.country}
              </ItemDescription>
            </div>
          </div>
        </ItemContent>

        <div className="flex items-center gap-1 text-xs text-gray-500">
          {positionChange ? (
            <>
              {positionChange.type === 'up' && (
                <>
                  <ArrowUp className="h-3 w-3 text-green-600" />
                  <span className="text-green-600 font-medium">{positionChange.value}</span>
                </>
              )}
              {positionChange.type === 'down' && (
                <>
                  <ArrowDown className="h-3 w-3 text-red-600" />
                  <span className="text-red-600 font-medium">{positionChange.value}</span>
                </>
              )}
              {positionChange.type === 'same' && (
                <>
                  <Minus className="h-3 w-3 text-gray-400" />
                  <span className="text-gray-400">—</span>
                </>
              )}
            </>
          ) : (
            <span className="text-gray-400">—</span>
          )}
        </div>
      </ItemHeader>
    </Item>
  );
}

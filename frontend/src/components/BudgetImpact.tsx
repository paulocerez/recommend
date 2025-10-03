import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/Card';
import { Slider } from './ui/Slider';
import { DollarSign, TrendingUp, TrendingDown } from 'lucide-react';

interface BudgetImpactProps {
  budgetRange: [number, number];
  onBudgetRangeChange: (range: [number, number]) => void;
  maxBudget: number;
}

const BudgetImpact: React.FC<BudgetImpactProps> = ({
  budgetRange,
  onBudgetRangeChange,
  maxBudget = 10000
}) => {
  const handleMinBudgetChange = (value: number) => {
    onBudgetRangeChange([value, Math.max(value, budgetRange[1])]);
  };

  const handleMaxBudgetChange = (value: number) => {
    onBudgetRangeChange([Math.min(value, budgetRange[0]), value]);
  };

  const getBudgetLevel = (budget: number) => {
    if (budget < 1000) return { level: 'Budget', color: 'text-green-600', icon: <TrendingDown className="h-4 w-4" /> };
    if (budget < 3000) return { level: 'Mid-range', color: 'text-yellow-600', icon: <TrendingUp className="h-4 w-4" /> };
    if (budget < 6000) return { level: 'Luxury', color: 'text-orange-600', icon: <TrendingUp className="h-4 w-4" /> };
    return { level: 'Ultra-luxury', color: 'text-red-600', icon: <TrendingUp className="h-4 w-4" /> };
  };

  const minBudgetLevel = getBudgetLevel(budgetRange[0]);
  const maxBudgetLevel = getBudgetLevel(budgetRange[1]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center">
          <DollarSign className="h-5 w-5 mr-2" />
          Budget Impact
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Minimum Budget</span>
            <span className="font-medium">${budgetRange[0].toLocaleString()}</span>
          </div>
          <Slider
            value={budgetRange[0]}
            onValueChange={handleMinBudgetChange}
            min={0}
            max={maxBudget}
            step={100}
          />
          <div className="flex items-center mt-1">
            <span className={`text-xs ${minBudgetLevel.color} flex items-center`}>
              {minBudgetLevel.icon}
              <span className="ml-1">{minBudgetLevel.level}</span>
            </span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Maximum Budget</span>
            <span className="font-medium">${budgetRange[1].toLocaleString()}</span>
          </div>
          <Slider
            value={budgetRange[1]}
            onValueChange={handleMaxBudgetChange}
            min={0}
            max={maxBudget}
            step={100}
          />
          <div className="flex items-center mt-1">
            <span className={`text-xs ${maxBudgetLevel.color} flex items-center`}>
              {maxBudgetLevel.icon}
              <span className="ml-1">{maxBudgetLevel.level}</span>
            </span>
          </div>
        </div>

        <div className="bg-muted p-3 rounded-lg">
          <div className="text-sm">
            <div className="flex justify-between mb-1">
              <span>Budget Range:</span>
              <span className="font-medium">
                ${budgetRange[0].toLocaleString()} - ${budgetRange[1].toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              Destinations outside this range will be deprioritized in recommendations
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetImpact;

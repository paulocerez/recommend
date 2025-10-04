import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/Dialog';
import { Button } from './ui/Button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  User, 
  MapPin, 
  Calendar, 
  Heart, 
  Plane,
  Check
} from 'lucide-react';

interface OnboardingDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (userInfo: UserInfo) => void;
}

interface UserInfo {
  age: string;
  location: string;
  travelExperience: string;
  interests: string[];
  budgetPreference: string;
  travelStyle: string;
}

export default function OnboardingDialog({
  isOpen,
  onClose,
  onComplete
}: OnboardingDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    age: '',
    location: '',
    travelExperience: '',
    interests: [],
    budgetPreference: '',
    travelStyle: ''
  });

  const totalSteps = 4;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    onComplete(userInfo);
    onClose();
  };

  const handleInterestToggle = (interest: string) => {
    setUserInfo(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return userInfo.age && userInfo.location;
      case 2:
        return userInfo.travelExperience;
      case 3:
        return userInfo.interests.length > 0;
      case 4:
        return userInfo.budgetPreference && userInfo.travelStyle;
      default:
        return false;
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Age Range</label>
          <Select
            value={userInfo.age}
            onValueChange={(value: string) => setUserInfo(prev => ({ ...prev, age: value }))}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select age range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="18-25">18-25</SelectItem>
              <SelectItem value="26-35">26-35</SelectItem>
              <SelectItem value="36-45">36-45</SelectItem>
              <SelectItem value="46-55">46-55</SelectItem>
              <SelectItem value="56-65">56-65</SelectItem>
              <SelectItem value="65+">65+</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">Location</label>
          <Input
            type="text"
            value={userInfo.location}
            onChange={(e) => setUserInfo(prev => ({ ...prev, location: e.target.value }))}
            placeholder="City, Country"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="text-left">
        <p className="text-sm text-gray-600">How would you describe your travel experience?</p>
      </div>
      
      <div className="space-y-3">
        {[
          { value: 'beginner', label: 'Beginner', description: 'New to traveling, prefer guided experiences' },
          { value: 'intermediate', label: 'Intermediate', description: 'Some travel experience, comfortable exploring' },
          { value: 'experienced', label: 'Experienced', description: 'Well-traveled, independent and adventurous' },
          { value: 'expert', label: 'Expert', description: 'Extensive travel experience, off-the-beaten-path' }
        ].map((option) => (
          <button
            key={option.value}
            onClick={() => setUserInfo(prev => ({ ...prev, travelExperience: option.value }))}
            className={`w-full p-2 text-left rounded-lg border transition-all duration-200 ${
              userInfo.travelExperience === option.value
                ? 'bg-gray-100 text-gray-900 border-gray-200 shadow-sm'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">{option.label}</div>
                <div className="text-xs text-gray-600">{option.description}</div>
              </div>
              {userInfo.travelExperience === option.value && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <div className="text-left">
        <p className="text-sm text-gray-600">What interests you?</p>
      </div>
      
      <div className="grid grid-cols-2 gap-3">
        {[
          'Adventure', 'Culture', 'Nature', 'Food',
          'History', 'Art', 'Music', 'Sports',
          'Relaxation', 'Nightlife', 'Wildlife', 'Photography'
        ].map((interest) => (
          <button
            key={interest}
            onClick={() => handleInterestToggle(interest)}
            className={`p-3 rounded-lg border transition-all duration-200 ${
              userInfo.interests.includes(interest)
                ? 'bg-gray-100 text-gray-900 border-gray-200 shadow-sm'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">{interest}</span>
              {userInfo.interests.includes(interest) && (
                <Check className="h-3 w-3 text-green-600" />
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <div className="text-left">
        <p className="text-sm text-gray-600">Travel Preferences</p>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">Budget Preference</label>
          <div className="grid grid-cols-2 gap-3">
            {['Budget', 'Mid-range', 'Luxury', 'Ultra-luxury'].map((budget) => (
              <button
                key={budget}
                onClick={() => setUserInfo(prev => ({ ...prev, budgetPreference: budget }))}
                className={`p-3 rounded-lg border transition-all duration-200 ${
                  userInfo.budgetPreference === budget
                    ? 'bg-gray-100 text-gray-900 border-gray-200 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{budget}</span>
                  {userInfo.budgetPreference === budget && (
                    <Check className="h-3 w-3 text-green-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">Travel Style</label>
          <div className="space-y-2">
            {[
              { value: 'solo', label: 'Solo Travel' },
              { value: 'couple', label: 'Couple' },
              { value: 'family', label: 'Family' },
              { value: 'friends', label: 'Friends' },
              { value: 'group', label: 'Group Tours' }
            ].map((style) => (
              <button
                key={style.value}
                onClick={() => setUserInfo(prev => ({ ...prev, travelStyle: style.value }))}
                className={`w-full p-3 rounded-lg border transition-all duration-200 ${
                  userInfo.travelStyle === style.value
                    ? 'bg-gray-100 text-gray-900 border-gray-200 shadow-sm'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">{style.label}</span>
                  {userInfo.travelStyle === style.value && (
                    <Check className="h-3 w-3 text-green-600" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1();
      case 2: return renderStep2();
      case 3: return renderStep3();
      case 4: return renderStep4();
      default: return renderStep1();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader className="pb-4">
          <DialogTitle className="flex items-center text-xl font-semibold text-gray-900">
            Welcome! Let's personalize your experience
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600 mt-1">
            Step {currentStep} of {totalSteps}
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex-1 overflow-y-auto py-6">
          {renderCurrentStep()}
        </div>

        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? onClose : handleBack}
            className="bg-white hover:bg-gray-50 border-gray-300"
          >
            {currentStep === 1 ? 'Skip' : 'Back'}
          </Button>
          
          <div className="flex items-center space-x-2">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full ${
                  i + 1 <= currentStep ? 'bg-black' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={currentStep === totalSteps ? handleComplete : handleNext}
            disabled={!isStepValid()}
            className="bg-black hover:bg-gray-800 text-white"
          >
            {currentStep === totalSteps ? 'Complete' : 'Next'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

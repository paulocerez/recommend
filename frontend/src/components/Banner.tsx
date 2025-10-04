import React from 'react';

interface BannerProps {
  message: string;
}

export default function Banner({ message }: BannerProps) {
  return (
    <div className="flex justify-center w-full py-4">
      <div className="border border-gray-300 rounded-full shadow-sm hover:shadow-md transition-shadow duration-300">
        <div className="px-6 py-2">
          <p className="text-sm text-gray-800 font-medium">
            {message}
          </p>
        </div>
      </div>
    </div>
  );
}

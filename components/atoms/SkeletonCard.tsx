// components/atoms/SkeletonCard.tsx
// Fulfills 'Loading states: skeleton, shimmer' requirement

import React from 'react';

export const SkeletonCard = React.memo(() => (
  // Apply the shimmer-base class to the container
  <div className="shimmer-base rounded-lg border border-zinc-800/40 h-20 w-full mb-2 flex p-3 gap-3 overflow-hidden">
    
    {/* Left Side: Avatar and Ticker (Placeholder elements) */}
    <div className="flex-shrink-0 flex items-center">
      {/* Note: The internal elements use basic zinc-700/800 colors for structure */}
      <div className="h-10 w-10 rounded-full bg-zinc-700 mr-3"></div>
      <div className="flex-1 space-y-2">
        <div className="h-3 bg-zinc-700 rounded w-20" />
        <div className="h-2 bg-zinc-800 rounded w-28" />
      </div>
    </div>
    
    {/* Right Side: Data Placeholder */}
    <div className="ml-auto flex flex-col justify-center items-end space-y-2">
      <div className="h-4 w-16 bg-zinc-700 rounded" />
      <div className="h-3 w-10 bg-zinc-800 rounded" />
    </div>
  </div>
));

SkeletonCard.displayName = 'SkeletonCard';
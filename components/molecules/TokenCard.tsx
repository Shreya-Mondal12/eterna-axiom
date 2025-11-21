// components/molecules/TokenCard.tsx
'use client';

import { getShimmerDelay, getShimmerOpacity } from "@/lib/utils";

import React from 'react';
import {
  ChevronRight,
  Globe,
  Send,
  Search,
  Users,
  Trophy,
  Flag,
  Coins,
  X,
  Info,
  Clock,
  TrendingUp,
  DollarSign,
  Zap
} from 'lucide-react';

import { Token, ColumnId } from '@/lib/types';
import { useTokenData } from '@/hooks/use-token-data';

interface TokenCardProps {
  token: Token;
  columnId: ColumnId;
}

export const TokenCard = React.memo(({ token, columnId }: TokenCardProps) => {
  const { state, dispatch } = useTokenData();
  const isSelected = state.selectedTokenId === token.id;

  const formatK = (value: number | undefined) => {
    if (!value) return '$0K';
    return `$${(value / 1000).toFixed(1)}K`;
  };

  const safePrice = (token.currentPrice ?? 0).toFixed(5);

  const handleCardClick = () => {
    dispatch({ type: 'SELECT_TOKEN', payload: isSelected ? null : token.id });
  };

  const cardClasses = `relative flex flex-col p-3 rounded-l transition-all duration-150 cursor-pointer text-white
    bg-[#0F0F12] ${isSelected ? 'ring-2 ring-indigo-600' : 'hover:ring-1 hover:ring-zinc-700'} shadow-sm`;

  const renderPulsingRingIcon = (color: string) => (
    <div className={`relative w-4 h-4 flex items-center justify-center`}>
      <div className={`absolute inline-block w-4 h-4 rounded-full ${color} opacity-40 animate-ping`} />
      <div className={`relative inline-block w-2.5 h-2.5 rounded-full ${color} border border-black`} />
    </div>
  );

  const getTokenGradient = (tokenId: string) => {
  const gradients = [
    "from-purple-500 via-fuchsia-500 to-pink-500",
    "from-blue-500 via-cyan-500 to-green-500",
    "from-indigo-500 via-purple-500 to-fuchsia-500",
    "from-orange-500 via-amber-500 to-yellow-500",
    "from-rose-500 via-pink-500 to-fuchsia-500",
    "from-teal-500 via-cyan-500 to-blue-500",
  ];

  // stable hash → repeatable gradient selection
  let hash = 0;
  for (let i = 0; i < tokenId.length; i++) {
    hash = tokenId.charCodeAt(i) + ((hash << 5) - hash);
  }

  return gradients[Math.abs(hash % gradients.length)];
};


  return (
    <div
      className={`${cardClasses} w-full my-1 overflow-hidden relative`}
      onClick={handleCardClick}
    >

      {/*  Glossy shimmer sweep layer */}
      <div
  className="token-gloss-layer"
  style={{
    animationDelay: getShimmerDelay(token.id),
    ['--gloss-opacity' as any]: getShimmerOpacity(token.id)
  }}
></div>


      {/* ROW 1 */}
      <div className="flex items-start justify-between gap-3 relative z-10">
        <div className="flex items-start gap-3 min-w-0">

          <div className="relative w-16 h-16 flex-shrink-0">

  {/* Outer Glow Ring */}
  <div
    className={`
      absolute inset-0 rounded-xl blur-md opacity-60
      bg-gradient-to-br ${getTokenGradient(token.id)}
    `}
  ></div>

  {/* Actual Avatar */}
  <div
    className={`
      relative w-full h-full rounded-xl overflow-hidden
      bg-gradient-to-br ${getTokenGradient(token.id)}
      flex items-center justify-center
    `}
  >
    {/* Glossy inner shine */}
    {/*<div className="absolute inset-0 bg-white/10 opacity-20 mix-blend-overlay"></div>*/}

    {/* Token ticker initials */}
    <span className="text-[11px] font-extrabold tracking-wider uppercase opacity-80">
      {token.ticker.slice(0, 3)}
    </span>
  </div>

  {/* Online status indicator */}
  <div className="absolute bottom-1 right-1 w-3 h-3 rounded-full bg-green-400 border border-black shadow-md"></div>
</div>


          <div className="flex flex-col min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold uppercase truncate">{token.ticker}</span>
              <span className="text-zinc-400 text-xs truncate max-w-[160px]">{token.name}</span>
              <span className="text-zinc-500 text-xs">📃</span>
            </div>

            <div className="mt-1 flex items-center gap-1 text-xs text-zinc-400 flex-wrap">
              <div className="flex items-center gap-1">
                <Clock size={14} className="text-teal-400" />
                <span className="text-teal-400 font-semibold">{token.timeSinceLaunch}</span>
              </div>

              <div className="flex items-center gap-1">
                <Users size={14} className="text-blue-400" />
                <span className="text-blue-400 font-semibold">{token.globeScore}</span>
              </div>

              <div className="flex items-center gap-1">
                <Trophy size={14} className="text-yellow-400" />
                <span className="text-yellow-400 font-semibold">{token.trophyScore}</span>
              </div>

              <div className="flex items-center gap-1">
                <Flag size={14} className="text-purple-400" />
                <span className="text-purple-400 font-semibold">{token.flagScore}</span>
              </div>

              <div className="flex items-center gap-1 font-mono font-bold text-sm text-green-400">
                <Coins size={12} />
                <span className='font-semibold text-xs'>{safePrice}</span>
              </div>

              <div 
              key ={token.txnsToday} className="flex items-center gap-1 font-mono font-bold text-sm text-pink-400 tx-flicker">
                <X size={14} />
                <span className='font-semibold text-xs'>TX {token.txnsToday}</span>
              </div>

            </div>

            <div className="mt-1 text-zinc-500 text-[11px] truncate max-w-[260px]">HagG...pump</div>
          </div>
        </div>

        <div className="flex flex-col items-end gap-0 text-sm text-right shrink-0">
          <div className="text-xs text-zinc-500">V</div>
          <div className="text-white font-mono font-bold text-xs">{formatK(token.volume24h)}</div>

          <div className="text-xs text-zinc-500">MC</div>
          <div className="text-white font-mono font-bold text-xs">{formatK(token.marketCap)}</div>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="flex items-center gap-2 mt-2 flex-wrap relative z-10">
        <div className="flex items-center text-xs font-semibold bg-zinc-900/40 rounded-full px-1 py-1 text-red-400 border border-zinc-800">
          <Zap size={9} className="mr-1" />
          <span>{token.buyPressure}%</span>
        </div>

        <div className="flex items-center text-xs font-semibold bg-zinc-900/40 rounded-full px-1 py-1 text-blue-400 border border-zinc-800">
          <span className="mr-1">🐳</span>
          <span>{token.whaleActivity}</span>
        </div>

        <div className="flex items-center text-xs font-semibold bg-zinc-900/40 rounded-full px-1 py-1 text-green-400 border border-zinc-800">
          <TrendingUp size={9} className="mr-1" />
          <span>{token.devScore}%</span>
        </div>

        <div className="flex items-center text-xs font-semibold bg-zinc-900/40 rounded-full px-1 py-1 text-pink-500 border border-zinc-800">
          <DollarSign size={9} className="mr-1" />
          <span>{token.taxBuy}%</span>
        </div>

        <div className="flex items-center text-xs font-semibold bg-zinc-900/40 rounded-full px-1 py-1 text-green-500 border border-zinc-800">
          <X size={9} className="mr-1" />
          <span>{token.taxSell}%</span>
        </div>

        <div className="ml-1 flex items-center gap-1">
          <div className="w-6 h-6 flex items-center justify-center">
            {renderPulsingRingIcon('bg-red-500')}
          </div>

          <ChevronRight size={1} className="text-zinc-600" />

          <div className="w-4 h-4 flex items-center justify-center">
            {renderPulsingRingIcon('bg-yellow-400')}
          </div>
        </div>
      </div>

      <div className="absolute right-2 top-2 z-10">
        
      </div>

    </div>
  );
});

TokenCard.displayName = 'TokenCard';

'use client';

import React, { useState, useRef } from 'react';
import { Rabbit, Fuel, Disc, Slash } from 'lucide-react';

interface ColumnModeTooltipProps {
  mode: 'P1' | 'P2' | 'P3';
  isActive: boolean;
  onClick: (mode: 'P1' | 'P2' | 'P3') => void;
  onDoubleClick: () => void;
}

export const ColumnModeTooltip = React.memo(
({ mode, isActive, onClick, onDoubleClick }: ColumnModeTooltipProps) => {

  const [showTooltip, setShowTooltip] = useState(false);
  const clickTimeout = useRef<NodeJS.Timeout | null>(null);

  // --- SINGLE CLICK (mode switch)
  const handleClick = () => {
    // open tooltip on click
    setShowTooltip(true);

    clickTimeout.current = setTimeout(() => {
      onClick(mode);
    }, 200);
  };

  // --- DOUBLE CLICK (open TradingModal)
  const handleDoubleClick = () => {
    if (clickTimeout.current) clearTimeout(clickTimeout.current);
    setShowTooltip(false); // tooltip closes
    onDoubleClick();
  };

  const getButtonClass = () =>
    `px-1 py-0.5 text-[9px] rounded-md border transition-colors ${
      isActive
        ? 'bg-zinc-200 text-black border-zinc-200 font-bold'
        : 'text-zinc-600 hover:text-zinc-300 bg-zinc-900/50 hover:bg-zinc-800 border-transparent hover:border-zinc-700'
    }`;

  //  FILTER VALUES FOR EACH MODE
  const tooltipData = {
    P1: [
      { icon: <Rabbit size={12} />, label: '221%' },
      { icon: <Fuel size={12} />, label: '0.022' },
      { icon: <Disc size={12} />, label: '0.029' },
      { icon: <Slash size={12} />, label: 'Off' },
    ],
    P2: [
      { icon: <Rabbit size={12} />, label: '102%' },
      { icon: <Fuel size={12} />, label: '0.013' },
      { icon: <Disc size={12} />, label: '0.018' },
      { icon: <Slash size={12} />, label: 'Off' },
    ],
    P3: [
      { icon: <Rabbit size={12} />, label: '55%' },
      { icon: <Fuel size={12} />, label: '0.009' },
      { icon: <Disc size={12} />, label: '0.014' },
      { icon: <Slash size={12} />, label: 'Off' },
    ],
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <button
        className={getButtonClass()}
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
      >
        {mode}
      </button>

      {/* === FILTER TOOLTIP UI (MATCHING YOUR IMAGE) === */}
      {showTooltip && (
        <div className="
          absolute z-50 top-full mt-1 left-1/2 -translate-x-1/2
          bg-[#1a1a1d] border border-zinc-700/50 rounded-lg
          p-2 shadow-lg text-[11px] text-white w-24 space-y-1
        ">

          {tooltipData[mode].map((row, i) => (
            <div key={i} className="flex items-center gap-2 text-zinc-300">
              {row.icon}
              <span className="tracking-tight">{row.label}</span>
            </div>
          ))}

        </div>
      )}

    </div>
  );
});

ColumnModeTooltip.displayName = 'ColumnModeTooltip';

// components/organisms/Column.tsx
'use client';

import React from 'react';
import { SlidersHorizontal, Zap } from 'lucide-react';

import { ColumnId, Token, ViewMode } from '@/lib/types';
import { useTokenData } from '@/hooks/use-token-data';

import { SkeletonCard } from '@/components/atoms/SkeletonCard';
import { TokenCard } from '@/components/molecules/TokenCard';
import { ColumnModeTooltip } from '@/components/molecules/ColumnModeTooltip';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';

const ColumnMeta: Record<ColumnId, { title: string }> = {
    new_pairs: { title: 'New Pairs' },
    final_stretch: { title: 'Final Stretch' },
    migrated: { title: 'Migrated' },
};

interface ColumnProps {
    id: ColumnId;
    tokens: Token[];
}

export const Column = React.memo(({ id, tokens }: ColumnProps) => {
    const { state, dispatch } = useTokenData();
    const { title } = ColumnMeta[id];

    const activeMode = state.columnModes?.[id] || 'P1';

    // ❗ Hydration-safe client flag
    const [isClient, setIsClient] = React.useState(false);
    React.useEffect(() => {
        setIsClient(true);
    }, []);

    // 🎯 Parameters state (with p0 for 0.0 input)
    const [params, setParams] = React.useState({
        p0: "",
        p1: "",
        p2: "",
        p3: ""
    });

    const handleOpenFilter = React.useCallback(() => {
        dispatch({ type: 'OPEN_FILTER_MODAL', payload: id });
    }, [dispatch, id]);

    // 🎯 NEW HANDLER DEFINITION: Opens the Trading Settings Modal for P-Mode double-click
    const handleOpenTradingSettingsModal = React.useCallback(() => {
        // Dispatches the global action to open the modal rendered in DashboardLayout.tsx
        dispatch({ type: 'TOGGLE_SETTINGS_MODAL', payload: true });
    }, [dispatch]);

    // Handler for Column Mode switch
    const handleSetMode = React.useCallback((mode: ViewMode) => {
        dispatch({ type: 'SET_COLUMN_MODE', payload: { col: id, mode } });
    }, [dispatch, id]);

    return (
        <div className="
            flex flex-col h-full
            bg-[#050506]
            border-r border-l border-x border-zinc-700/50
            last:border-r-0 
            first:border-l-0
        ">
            {/* HEADER */}
            <div className="sticky top-0 z-20 bg-[#0c0c0e] relative rounded-t-[5px]">
                <div className="absolute left-0 right-0 bottom-0 h-px bg-zinc-700/40" />

                <div className="px-2">
                    <div className="flex items-center justify-between mb-1">

                        <div className="flex items-center gap-2">
                            <h3 className="font-normal text-sm tracking-tight text-white">
                                {title}
                            </h3>
                        </div>

                        <div className="flex items-center gap-1">

                            {/* 🌟 Hydration-Safe 0.0 Input */}
                            <div className="flex items-center bg-zinc-900 border border-zinc-700 rounded-lg py-1 px-1.5 text-zinc-400 text-xs font-mono">
                                <Zap size={10} className="mr-1" />

                                {isClient ? (
                                    <input
                                        type="text"
                                        value={params.p0}
                                        onChange={(e) => {
                                            const v = e.target.value;
                                            if (/^\d*\.?\d*$/.test(v)) {
                                                setParams(prev => ({ ...prev, p0: v }));
                                            }
                                        }}
                                        placeholder="0.0"
                                        className="
                                            bg-transparent 
                                            text-white 
                                            text-xs 
                                            font-mono 
                                            w-10 
                                            focus:outline-none
                                        "
                                    />
                                ) : (
                                    <span className="text-white">0.0</span>
                                )}
                            </div>

                            {/* SETTINGS BUTTON (Opens Trading Settings Modal on single-click) */}
                            <button
                                className="p-1 rounded-full text-zinc-500 hover:text-white transition-colors"
                                onClick={handleOpenTradingSettingsModal} // 🎯 Uses the new handler
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path
                                        d="M4 12H20M4 6H20M4 18H20"
                                        stroke="url(#g1)"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                    <defs>
                                        <linearGradient id="g1" x1="4" y1="12" x2="20" y2="12">
                                            <stop stopColor="#9333ea" />
                                            <stop offset="0.5" stopColor="#3b82f6" />
                                            <stop offset="1" stopColor="#10b981" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </button>

                            {/* P1 / P2 / P3 BUTTONS */}
                            <div className="flex items-center gap-2 p-0.5">
                                {(['P1', 'P2', 'P3'] as ViewMode[]).map((mode) => (
                                    <ColumnModeTooltip
                                        key={mode}
                                        mode={mode}
                                        isActive={activeMode === mode}
                                        onClick={handleSetMode} // Single click: Change view mode
                                        onDoubleClick={handleOpenTradingSettingsModal} // 🎯 Double click: Opens Trading Settings Modal
                                    />
                                ))}
                            </div>

                            {/* FILTER BUTTON */}
                            <button
                                onClick={handleOpenFilter}
                                className="p-1 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white transition-colors ml-1"
                            >
                                <SlidersHorizontal size={14} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* CONTENT */}
            <div className="flex-1 p-2 overflow-y-auto custom-scrollbar min-h-[100px] max-h-[calc(100vh-220px)]">
                <ErrorBoundary fallback={<div className="text-red-400 p-4">Error loading tokens</div>}>
                    {state.isLoading
                        ? Array(6).fill(0).map((_, i) => <SkeletonCard key={i} />)
                        : tokens.map((token) => (
                            <TokenCard key={token.id} token={token} columnId={id} />
                        ))}
                </ErrorBoundary>

                {!state.isLoading && tokens.length === 0 && (
                    <div className="h-32 flex flex-col items-center justify-center text-zinc-700 text-xs">
                        No tokens active or matching filters.
                    </div>
                )}
            </div>
        </div>
    );
});

Column.displayName = 'Column';
// components/organisms/MainNavbar.tsx
'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import {
  Search,
  Coins,
  ChevronDown,
  User,
  Bell,
  Star,
  Triangle,
  X,
  Clock,
  ChartLine,
  ChartNoAxesColumn,
  Droplet, Wallet
} from 'lucide-react';

type Network = 'SOL' | 'BNB';

export const MainNavbar = React.memo(() => {
  /* ------------------------------ NAV ITEMS ------------------------------ */
  const navItems = [
    { name: 'Discover' },
    { name: 'Pulse' },
    { name: 'Trackers' },
    { name: 'Perpetuals' },
    { name: 'Yield' },
    { name: 'Vision' },
    { name: 'Portfolio' },
    { name: 'Rewards' },
  ];

  const activeItem = 'Pulse';

  /* ------------------------------ NETWORK DROPDOWN ------------------------------ */
  const [networkMenuOpen, setNetworkMenuOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState<Network>('SOL');
  const networkRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!networkRef.current) return;
      if (!networkRef.current.contains(e.target as Node)) {
        setNetworkMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  /* ------------------------------ SEARCH MODAL ------------------------------ */
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const modalRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const chips = ['Pump', 'Bonk', 'Bags', 'USD1', 'OG Mode', 'Graduated'];

  const history = ['MERICA', 'PEPPER', 'BAOVERSE'];

  // click outside to close
  useEffect(() => {
    if (!isSearchOpen) return;

    const handler = (e: MouseEvent) => {
      if (!modalRef.current) return;
      if (!modalRef.current.contains(e.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isSearchOpen]);

  // ESC key to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // open search & autofocus
  const openSearch = () => {
    setIsSearchOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  const clearSearch = () => {
    setSearchValue('');
    inputRef.current?.focus();
  };

  /* ------------------------------ RENDER ------------------------------ */
  return (
    <>
      <nav className="h-14 bg-black border-b border-zinc-800 flex items-center justify-between px-4 lg:px-6 shrink-0">

        {/* -------------------------------- LEFT SECTION -------------------------------- */}
        <div className="flex items-center gap-6">

          {/* Logo */}
          <div className="flex items-center cursor-pointer text-white">
            <Image
              src="/AxiomLogo.png"
              alt="Axiom Logo"
              width={24}
              height={24}
              className="rounded-sm object-cover mr-1"
            />
            <span className="text-xl font-extrabold tracking-tight mr-1">AXIOM</span>
            <span className="text-[10px] text-zinc-500 font-bold">PRO</span>
          </div>

          {/* Horizontal nav items */}
          <div className="flex items-center gap-2 ml-2">
            {navItems.map((item) => {
              const isActive = item.name === activeItem;
              return (
                <button
                  key={item.name}
                  className={`text-sm px-1.5 font-medium transition-all ${
                    isActive ? 'text-indigo-600 font-bold' : 'text-zinc-300 hover:text-zinc-400'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* -------------------------------- RIGHT SECTION -------------------------------- */}
        <div className="flex items-center gap-3">

          {/*  SEARCH BUTTON — triggers modal */}
          <button
            onClick={openSearch}
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-[#101114] border border-zinc-700/60 text-zinc-300 hover:bg-[#18191d] transition-colors"
          >
            <Search size={18} />
          </button>

          {/*  NETWORK SELECTOR */}
          <div className="relative" ref={networkRef}>
            <button
              onClick={() => setNetworkMenuOpen((s) => !s)}
              className="flex items-center h-10 px-4 rounded-lg bg-[#101114] border border-green-900/40 hover:bg-[#18191d] transition-all gap-2"
            >
              {selectedNetwork === 'SOL' ? (
                <Image
                  src="//logotyp.us/file/solana.svg"
                  width={20}
                  height={20}
                  alt="sol"
                  className="object-contain"
                />
              ) : (
                <Image
                  src="/bnb1.png"
                  width={20}
                  height={20}
                  alt="bnb"
                />
              )}
              <span className="text-sm text-zinc-200 font-semibold">{selectedNetwork}</span>
              <ChevronDown size={16} className="text-zinc-500" />
            </button>

            {networkMenuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-[#0c0c0e] border border-zinc-800 rounded-lg shadow-xl p-2">
                {/* SOL */}
                <button
                  onClick={() => { setSelectedNetwork('SOL'); setNetworkMenuOpen(false); }}
                  className="w-full px-3 py-2 rounded-md hover:bg-zinc-800/40 flex items-center gap-3 text-sm"
                >
                  <Image src="//logotyp.us/file/solana.svg" width={20} height={20} alt="sol" />
                  <span>SOL</span>
                </button>

                {/* BNB */}
                <button
                  onClick={() => { setSelectedNetwork('BNB'); setNetworkMenuOpen(false); }}
                  className="w-full px-3 py-2 rounded-md hover:bg-zinc-800/40 flex items-center gap-3 text-sm"
                >
                  <Image src="/bnb1.png" width={20} height={20} alt="bnb" />
                  <span>BNB</span>
                </button>
              </div>
            )}
          </div>

          {/* 🔵 Deposit */}
          <button className="px-5 h-10 flex items-center justify-center rounded-full bg-indigo-600 hover:bg-indigo-500 text-black font-semibold text-sm transition-colors">
            Deposit
          </button>

          {/* ⭐ Favorite */}
          <button className="w-12 h-10 flex items-center justify-center rounded-full bg-[#101114] border border-zinc-700 text-zinc-300 hover:bg-[#18191d]">
            <Star size={18} />
          </button>

          {/* 🔔 Bell */}
          <button className="relative w-12 h-10 flex items-center justify-center rounded-full bg-[#101114] border border-zinc-700 text-zinc-300 hover:bg-[#18191d]">
            <Bell size={18} />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-teal-400 ring-2 ring-[#101114]"></span>
          </button>

          {/* 💰 Wallet */}
          <button className="flex items-center gap-2 bg-[#1c1d22] h-10 px-4 rounded-full border border-zinc-700 text-zinc-200 hover:bg-[#232428] transition-colors">
            <Wallet  width={30} height={20}/>
            <Image src="//logotyp.us/file/solana.svg" width={30} height={18} alt="sol" />
            <span className="text-sm font-semibold ">0</span>
             <span className="text-lg font-thin text-zinc-500"> |</span>
            <Image src="/money1.png" width={28} height={30} alt="radio" />
            <span className="text-sm font-semibold">0</span>

            <ChevronDown size={20} className="text-zinc-400" />
          </button>

          {/* 👤 Profile */}
          <button className="w-12 h-9 flex items-center justify-center rounded-full bg-[#101114] border border-zinc-700 text-zinc-300 hover:bg-[#18191d] transition-colors">
            <User size={20} className="text-zinc-300" />
          </button>
        </div>
      </nav>

      {/* -------------------------------- SEARCH MODAL -------------------------------- */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm">
          <div
            ref={modalRef}
            className="mt-10 w-[min(650px,87%)] max-h-[88vh] bg-[#0f1011] rounded-xl border border-zinc-800 shadow-2xl overflow-hidden flex flex-col"
          >
            {/* Chips Row */}
            <div className="p-4 border-b border-zinc-800">
              <div className="flex items-center gap-1 flex-wrap">
                {chips.map((c) => (
                  <button
                    key={c}
                    className="text-sm bg-zinc-900/40 text-zinc-200 px-3 py-1.5 rounded-full border border-zinc-800 hover:bg-zinc-800"
                  >
                    {c}
                  </button>
                ))}

                <div className="ml-auto flex items-center gap-2">
                  <div className="text-xs text-zinc-400 pr-3">Sort by</div>
                  <Clock className="w-4 h-4 text-zinc-400 hover:text-indigo-400 cursor-pointer" />
                  <ChartLine className="w-4 h-4 text-zinc-400 hover:text-indigo-400 cursor-pointer" />
                  <ChartNoAxesColumn className="w-4 h-4 text-zinc-400 hover:text-indigo-400 cursor-pointer" />
                  <Droplet className="w-4 h-4 text-zinc-400 hover:text-indigo-400 cursor-pointer" />
                </div>
              </div>
            </div>

            {/* Search Input */}
            <div className="p-6">
              <div className="flex items-center gap-3">
                <Search size={20} className="text-zinc-400" />
                <input
                  ref={inputRef}
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="bg-transparent w-full text-xl text-zinc-300 placeholder:text-zinc-600 focus:outline-none"
                  placeholder="Search by name, ticker, or CA..."
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="px-3 py-1 rounded-2xl bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
                >
                  Esc
                </button>
              </div>
            </div>

            {/* History */}
            <div className="border-t border-zinc-800" />
            <div className="flex flex-1 overflow-hidden">
              <div className="w-full p-6 overflow-auto">
                <div className="text-zinc-400 text-sm">History</div>
                <div className="mt-3 grid gap-2">
                  {history.map((h) => (
                    <div
                      key={h}
                      className="text-zinc-300 text-sm py-2 px-3 rounded hover:bg-zinc-900/40 cursor-pointer"
                    >
                      {h}
                    </div>
                  ))}
                </div>

                {searchValue.length > 0 && (
                  <div className="mt-6">
                    <div className="text-zinc-400 text-sm mb-2">Results</div>
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between bg-zinc-900/20 px-3 py-2 rounded">
                        <div>
                          <div className="text-zinc-200 font-semibold">MERICA</div>
                          <div className="text-zinc-400 text-xs">
                            {searchValue} — 0xCA...1234
                          </div>
                        </div>
                        <div className="text-zinc-400 text-xs">Price: $0.435</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
});

MainNavbar.displayName = 'MainNavbar';

// lib/mock-data.ts

import { Token, ColumnId } from './types'; 


export const initializeMockDb = (): Token[] => {
  const tokens: Token[] = [];
  const tickers = ['PEPE', 'WOJAK', 'CHAD', 'DOGE', 'ELON', 'MOON', 'GPT', 'AI', 'SOL', 'BONK', 'TRUMP', 'MAGA'];
  const names = ['BAOVERSE', 'PUMPVERSE', 'DegenX', 'AlphaMeme', 'TheCatalyst', 'HyperDoge'];
  const images = [
    'bg-red-500', 'bg-blue-600', 'bg-green-500', 'bg-purple-600', 'bg-yellow-500', 
    'bg-pink-600', 'bg-indigo-500', 'bg-orange-600', 'bg-teal-500', 'bg-cyan-600'
  ];
  const whaleActivities = ['DS 3mo', 'WL 1mo', 'PS 6mo', 'NO'];

  for (let i = 0; i < 60; i++) { 
    const ticker = `${tickers[Math.floor(Math.random() * tickers.length)]}`;
    const r = Math.random();
    let col: ColumnId = 'new_pairs';
    let bond = Math.floor(Math.random() * 30);

    if (r > 0.4 && r < 0.75) {
      col = 'final_stretch';
      bond = 85 + Math.floor(Math.random() * 14); 
    } else if (r >= 0.75) {
      col = 'migrated';
      bond = 100;
    }

    tokens.push({
      id: `token-${i}`,
      ticker,
      name: names[Math.floor(Math.random() * names.length)],
      imgUrl: images[Math.floor(Math.random() * images.length)],
      marketCap: 1000 + Math.random() * 50000,
      volume24h: 500 + Math.random() * 15000,
      price: 0.000001 + Math.random() * 0.0001,
      prevPrice: 0.000001 + Math.random() * 0.0001,
      bondingCurve: bond,
      createdAt: Date.now() - Math.floor(Math.random() * 3600000),
      column: col,
      devHolding: Math.random() * 20,
      insiderHolding: Math.random() * 30,
      holderCount: 50 + Math.floor(Math.random() * 2000),
      liquidity: 1000 + Math.random() * 50000,
      txns24h: 50 + Math.floor(Math.random() * 5000),

      
      timeSinceLaunch: `${Math.floor(Math.random() * 60)}m`,
      globeScore: Math.floor(Math.random() * 5),
      signalScore: Math.floor(Math.random() * 3),
      trophyScore: Math.floor(Math.random() * 1),
      flagScore: (Math.random() > 0.5 ? 'F' : 'T'),
      currentPrice: 0.0 + Math.random() * 0.0001,
      txnsToday: Math.floor(Math.random() * 10),
      buyPressure: Math.floor(20 + Math.random() * 60),
      whaleActivity: whaleActivities[Math.floor(Math.random() * whaleActivities.length)],
      devScore: Math.floor(Math.random() * 10),
      taxBuy: Math.floor(Math.random() * 50),
      taxSell: Math.floor(Math.random() * 50),

      cardImage: '/baoverse_card.png'
    });
  }
  return tokens;
};
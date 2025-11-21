// lib/util.ts

/**
 * Stable hash generator from a string (tokenId)
 * Produces consistent numbers across reloads.
 */
export const stableHash = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
};

/**
 * Returns a random shimmer delay between 0–2.5 seconds,
 * but stable per token.
 */
export const getShimmerDelay = (tokenId: string): string => {
  const hash = stableHash(tokenId);
  const delay = (hash % 10) * 0.25; // 0 – 2.5s
  return `${delay}s`;
};

/**
 * Returns slight shimmer opacity variation (0.3–0.5)
 * stable per token.
 */
export const getShimmerOpacity = (tokenId: string): number => {
  const hash = stableHash(tokenId);
  const val = 0.3 + (hash % 3) * 0.1;
  return Number(val.toFixed(2));
};

/**
 * Example future helper:
 * random color selection based on token
 */
export const pickStableColor = (tokenId: string, colors: string[]) => {
  const hash = stableHash(tokenId);
  return colors[hash % colors.length];
};

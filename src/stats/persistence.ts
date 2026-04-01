/**
 * localStorage persistence for stats.
 */

import type { TrackerState } from './tracker.ts';

const STORAGE_KEY = 'fretboard-trainer-v1';

interface StoredData {
  version: 1;
  stats: TrackerState;
  lastSessionDate: string;
}

export function loadStats(): TrackerState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const data: StoredData = JSON.parse(raw);
    if (data.version !== 1) return null;
    return data.stats;
  } catch {
    return null;
  }
}

export function saveStats(stats: TrackerState): void {
  const data: StoredData = {
    version: 1,
    stats,
    lastSessionDate: new Date().toISOString().slice(0, 10),
  };
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // Storage full or unavailable — silently fail
  }
}

export function clearStats(): void {
  localStorage.removeItem(STORAGE_KEY);
}

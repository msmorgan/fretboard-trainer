/**
 * Accuracy tracking per fretboard position and per note name.
 */

export interface Tally {
  correct: number;
  total: number;
}

export interface TrackerState {
  /** Key: "s{string}f{fret}" */
  positions: Record<string, Tally>;
  /** Key: note name (e.g., "C", "F#") */
  notes: Record<string, Tally>;
  totalCorrect: number;
  totalIncorrect: number;
  bestStreak: number;
}

function posKey(string: number, fret: number): string {
  return `s${string}f${fret}`;
}

function emptyState(): TrackerState {
  return {
    positions: {},
    notes: {},
    totalCorrect: 0,
    totalIncorrect: 0,
    bestStreak: 0,
  };
}

export class StatsTracker {
  private _state: TrackerState;

  constructor(initial?: TrackerState) {
    this._state = initial ?? emptyState();
  }

  get state(): TrackerState {
    return this._state;
  }

  record(string: number, fret: number, noteName: string, correct: boolean) {
    // Position tally
    const pk = posKey(string, fret);
    if (!this._state.positions[pk]) {
      this._state.positions[pk] = { correct: 0, total: 0 };
    }
    this._state.positions[pk].total++;
    if (correct) this._state.positions[pk].correct++;

    // Note tally
    if (!this._state.notes[noteName]) {
      this._state.notes[noteName] = { correct: 0, total: 0 };
    }
    this._state.notes[noteName].total++;
    if (correct) this._state.notes[noteName].correct++;

    // Totals
    if (correct) {
      this._state.totalCorrect++;
    } else {
      this._state.totalIncorrect++;
    }
  }

  updateBestStreak(streak: number) {
    if (streak > this._state.bestStreak) {
      this._state.bestStreak = streak;
    }
  }

  accuracy(string: number, fret: number): number | null {
    const tally = this._state.positions[posKey(string, fret)];
    if (!tally || tally.total === 0) return null;
    return tally.correct / tally.total;
  }

  attempts(string: number, fret: number): number {
    return this._state.positions[posKey(string, fret)]?.total ?? 0;
  }

  overallAccuracy(): number | null {
    const total = this._state.totalCorrect + this._state.totalIncorrect;
    if (total === 0) return null;
    return this._state.totalCorrect / total;
  }

  /** Get the weakest positions (lowest accuracy with >= minAttempts) */
  weakSpots(minAttempts = 5, count = 10): Array<{ string: number; fret: number; accuracy: number }> {
    const spots: Array<{ string: number; fret: number; accuracy: number }> = [];

    for (const [key, tally] of Object.entries(this._state.positions)) {
      if (tally.total < minAttempts) continue;
      const match = key.match(/^s(\d+)f(\d+)$/);
      if (!match) continue;
      spots.push({
        string: parseInt(match[1]),
        fret: parseInt(match[2]),
        accuracy: tally.correct / tally.total,
      });
    }

    spots.sort((a, b) => a.accuracy - b.accuracy);
    return spots.slice(0, count);
  }

  reset() {
    this._state = emptyState();
  }
}

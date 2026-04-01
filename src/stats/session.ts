/**
 * Current session stats — lightweight in-memory tracking.
 */

export interface SessionStats {
  correct: number;
  incorrect: number;
  currentStreak: number;
  bestStreak: number;
  startTime: number;
}

export function createSession(): SessionStats {
  return {
    correct: 0,
    incorrect: 0,
    currentStreak: 0,
    bestStreak: 0,
    startTime: Date.now(),
  };
}

export function recordAnswer(session: SessionStats, correct: boolean): SessionStats {
  if (correct) {
    const newStreak = session.currentStreak + 1;
    return {
      ...session,
      correct: session.correct + 1,
      currentStreak: newStreak,
      bestStreak: Math.max(session.bestStreak, newStreak),
    };
  }
  return {
    ...session,
    incorrect: session.incorrect + 1,
    currentStreak: 0,
  };
}

export function sessionAccuracy(session: SessionStats): number | null {
  const total = session.correct + session.incorrect;
  if (total === 0) return null;
  return session.correct / total;
}

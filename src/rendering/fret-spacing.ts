/**
 * Physically accurate fret spacing using the 12th root of 2.
 *
 * On a real guitar, fret n is positioned at:
 *   distance_from_nut(n) = scaleLength * (1 - 1 / 2^(n/12))
 *
 * This module works in normalized coordinates (0 to 1) for easy
 * scaling to any viewport width.
 */

/** Normalized position (0–1) of fret n from the nut */
export function fretPosition(fret: number): number {
  return 1 - 1 / Math.pow(2, fret / 12);
}

/**
 * Compute normalized positions for frets 1 through maxFret.
 * Returns an array where index 0 = fret 1's position, etc.
 * The nut is implicitly at position 0.
 */
export function computeFretPositions(maxFret: number): number[] {
  const positions: number[] = [];
  for (let f = 1; f <= maxFret; f++) {
    positions.push(fretPosition(f));
  }
  return positions;
}

/**
 * Get the midpoint X between two frets (for placing dots, hit targets, etc.).
 * For fret 0 (open string), returns a position to the left of fret 1.
 */
export function fretMidpoint(fret: number): number {
  if (fret === 0) {
    // Open string: place marker to the left of the nut.
    // Use a negative normalized value so toX() puts it before the nut.
    return -0.015;
  }
  // Midpoint between this fret wire and the previous one (or nut for fret 1)
  const thisPos = fretPosition(fret);
  const prevPos = fret > 1 ? fretPosition(fret - 1) : 0;
  return (thisPos + prevPos) / 2;
}

/** Standard fret marker positions (dots on 3,5,7,9; double dot on 12,15,17,19,21,24) */
export const SINGLE_DOT_FRETS = [3, 5, 7, 9, 15, 17, 19, 21] as const;
export const DOUBLE_DOT_FRETS = [12, 24] as const;

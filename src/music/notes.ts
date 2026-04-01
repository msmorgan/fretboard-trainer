/**
 * Core music theory: pitch classes, chromatic scale, note-at-fret calculation.
 */

/** The 12 pitch classes (0 = C, 1 = C#/Db, ... 11 = B) */
export type PitchClass = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

/** Unicode symbols for accidentals */
export const SHARP = '\u266F'; // ♯
export const FLAT = '\u266D';  // ♭

/** Sharp spellings for each pitch class */
export const SHARP_NAMES: readonly string[] = [
  'C', `C${SHARP}`, 'D', `D${SHARP}`, 'E', 'F',
  `F${SHARP}`, 'G', `G${SHARP}`, 'A', `A${SHARP}`, 'B',
];

/** Flat spellings for each pitch class */
export const FLAT_NAMES: readonly string[] = [
  'C', `D${FLAT}`, 'D', `E${FLAT}`, 'E', 'F',
  `G${FLAT}`, 'G', `A${FLAT}`, 'A', `B${FLAT}`, 'B',
];

/**
 * Dual-enharmonic names for display when no specific key context applies.
 * Natural notes get their plain name; accidentals show both (e.g. "C♯/D♭").
 */
export const DUAL_NAMES: readonly string[] = [
  'C', `C${SHARP}/D${FLAT}`, 'D', `D${SHARP}/E${FLAT}`, 'E', 'F',
  `F${SHARP}/G${FLAT}`, 'G', `G${SHARP}/A${FLAT}`, 'A', `A${SHARP}/B${FLAT}`, 'B',
];

/** Pitch class indices that are accidentals (black keys) */
export const ACCIDENTAL_PCS: readonly PitchClass[] = [1, 3, 6, 8, 10];

/** Whether a pitch class is an accidental (black key) */
export function isAccidental(pc: PitchClass): boolean {
  return ACCIDENTAL_PCS.includes(pc);
}

/** Convert a pitch class to its MIDI-standard sharp name */
export function sharpName(pc: PitchClass): string {
  return SHARP_NAMES[pc];
}

/** Convert a pitch class to its flat name */
export function flatName(pc: PitchClass): string {
  return FLAT_NAMES[pc];
}

/** Get the pitch class at a given fret, starting from an open string's pitch class */
export function pitchClassAtFret(openStringPC: PitchClass, fret: number): PitchClass {
  return ((openStringPC + fret) % 12) as PitchClass;
}

/** Convert a MIDI note number to a frequency in Hz (A4 = 440 Hz = MIDI 69) */
export function midiToFrequency(midi: number): number {
  return 440 * Math.pow(2, (midi - 69) / 12);
}

/** Convert a frequency to the nearest MIDI note number */
export function frequencyToMidi(freq: number): number {
  return Math.round(12 * Math.log2(freq / 440) + 69);
}

/** Get the cents deviation from the nearest MIDI note */
export function frequencyCents(freq: number): { midi: number; cents: number } {
  const exactMidi = 12 * Math.log2(freq / 440) + 69;
  const midi = Math.round(exactMidi);
  const cents = (exactMidi - midi) * 100;
  return { midi, cents };
}

/** Pitch class from MIDI note number */
export function midiToPitchClass(midi: number): PitchClass {
  return ((midi % 12 + 12) % 12) as PitchClass;
}

/**
 * Given any note name string (key-specific spelling), return its pitch class index.
 * Returns -1 if not found.
 */
export function pitchClassFromName(name: string): PitchClass | -1 {
  const idx = SHARP_NAMES.indexOf(name);
  if (idx >= 0) return idx as PitchClass;
  const flatIdx = FLAT_NAMES.indexOf(name);
  if (flatIdx >= 0) return flatIdx as PitchClass;
  return -1;
}

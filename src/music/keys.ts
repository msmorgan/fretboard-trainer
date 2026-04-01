/**
 * Key signatures and context-aware accidental spelling.
 *
 * Each key defines the preferred enharmonic spelling for all 12 pitch classes.
 * This ensures notes display correctly in musical context (e.g., F# in G major,
 * not Gb).
 */

import {
  type PitchClass,
  SHARP, FLAT,
  SHARP_NAMES, FLAT_NAMES,
} from './notes.ts';

export interface Key {
  name: string;
  mode: 'major' | 'minor';
  /** Preferred note name for each of the 12 pitch classes in this key */
  spelling: readonly string[];
}

const S = SHARP;
const F = FLAT;

/**
 * Build a spelling table for a key given its scale degrees.
 * For pitch classes not in the scale, pick the accidental direction
 * that's consistent with the key's signature (sharp keys use sharps,
 * flat keys use flats).
 */
function makeKey(
  name: string,
  mode: 'major' | 'minor',
  scaleDegrees: readonly string[],
  useSharps: boolean,
): Key {
  // Map note names to pitch classes
  const nameToPC: Record<string, number> = {
    'C': 0, [`C${S}`]: 1, [`D${F}`]: 1, 'D': 2, [`D${S}`]: 3, [`E${F}`]: 3,
    'E': 4, [`F${F}`]: 4, [`E${S}`]: 5, 'F': 5, [`F${S}`]: 6, [`G${F}`]: 6,
    'G': 7, [`G${S}`]: 8, [`A${F}`]: 8, 'A': 9, [`A${S}`]: 10, [`B${F}`]: 10,
    'B': 11, [`C${F}`]: 11,
  };

  const defaults = useSharps ? [...SHARP_NAMES] : [...FLAT_NAMES];

  // Override with the scale's own note names
  for (const degree of scaleDegrees) {
    const pc = nameToPC[degree];
    if (pc !== undefined) {
      defaults[pc] = degree;
    }
  }

  return { name, mode, spelling: defaults };
}

// ── Major keys ──────────────────────────────────────────────

const C_MAJOR = makeKey('C major', 'major',
  ['C', 'D', 'E', 'F', 'G', 'A', 'B'], true);

const G_MAJOR = makeKey('G major', 'major',
  ['G', 'A', 'B', 'C', 'D', 'E', `F${S}`], true);

const D_MAJOR = makeKey('D major', 'major',
  ['D', 'E', `F${S}`, 'G', 'A', 'B', `C${S}`], true);

const A_MAJOR = makeKey('A major', 'major',
  ['A', 'B', `C${S}`, 'D', 'E', `F${S}`, `G${S}`], true);

const E_MAJOR = makeKey('E major', 'major',
  ['E', `F${S}`, `G${S}`, 'A', 'B', `C${S}`, `D${S}`], true);

const B_MAJOR = makeKey('B major', 'major',
  ['B', `C${S}`, `D${S}`, 'E', `F${S}`, `G${S}`, `A${S}`], true);

const F_SHARP_MAJOR = makeKey(`F${S} major`, 'major',
  [`F${S}`, `G${S}`, `A${S}`, 'B', `C${S}`, `D${S}`, `E${S}`], true);

const F_MAJOR = makeKey('F major', 'major',
  ['F', 'G', 'A', `B${F}`, 'C', 'D', 'E'], false);

const Bb_MAJOR = makeKey(`B${F} major`, 'major',
  [`B${F}`, 'C', 'D', `E${F}`, 'F', 'G', 'A'], false);

const Eb_MAJOR = makeKey(`E${F} major`, 'major',
  [`E${F}`, 'F', 'G', `A${F}`, `B${F}`, 'C', 'D'], false);

const Ab_MAJOR = makeKey(`A${F} major`, 'major',
  [`A${F}`, `B${F}`, 'C', `D${F}`, `E${F}`, 'F', 'G'], false);

const Db_MAJOR = makeKey(`D${F} major`, 'major',
  [`D${F}`, `E${F}`, 'F', `G${F}`, `A${F}`, `B${F}`, 'C'], false);

const Gb_MAJOR = makeKey(`G${F} major`, 'major',
  [`G${F}`, `A${F}`, `B${F}`, `C${F}`, `D${F}`, `E${F}`, 'F'], false);

// ── Minor keys (natural minor) ─────────────────────────────

const A_MINOR = makeKey('A minor', 'minor',
  ['A', 'B', 'C', 'D', 'E', 'F', 'G'], false);

const E_MINOR = makeKey('E minor', 'minor',
  ['E', `F${S}`, 'G', 'A', 'B', 'C', 'D'], true);

const B_MINOR = makeKey('B minor', 'minor',
  ['B', `C${S}`, 'D', 'E', `F${S}`, 'G', 'A'], true);

const F_SHARP_MINOR = makeKey(`F${S} minor`, 'minor',
  [`F${S}`, `G${S}`, 'A', 'B', `C${S}`, 'D', 'E'], true);

const C_SHARP_MINOR = makeKey(`C${S} minor`, 'minor',
  [`C${S}`, `D${S}`, 'E', `F${S}`, `G${S}`, 'A', 'B'], true);

const G_SHARP_MINOR = makeKey(`G${S} minor`, 'minor',
  [`G${S}`, `A${S}`, 'B', `C${S}`, `D${S}`, 'E', `F${S}`], true);

const D_MINOR = makeKey('D minor', 'minor',
  ['D', 'E', 'F', 'G', 'A', `B${F}`, 'C'], false);

const G_MINOR = makeKey('G minor', 'minor',
  ['G', 'A', `B${F}`, 'C', 'D', `E${F}`, 'F'], false);

const C_MINOR = makeKey('C minor', 'minor',
  ['C', 'D', `E${F}`, 'F', 'G', `A${F}`, `B${F}`], false);

const F_MINOR = makeKey('F minor', 'minor',
  ['F', 'G', `A${F}`, `B${F}`, 'C', `D${F}`, `E${F}`], false);

const Bb_MINOR = makeKey(`B${F} minor`, 'minor',
  [`B${F}`, 'C', `D${F}`, `E${F}`, 'F', `G${F}`, `A${F}`], false);

const Eb_MINOR = makeKey(`E${F} minor`, 'minor',
  [`E${F}`, 'F', `G${F}`, `A${F}`, `B${F}`, `C${F}`, `D${F}`], false);

/** All available keys */
export const ALL_KEYS: readonly Key[] = [
  C_MAJOR, G_MAJOR, D_MAJOR, A_MAJOR, E_MAJOR, B_MAJOR, F_SHARP_MAJOR,
  F_MAJOR, Bb_MAJOR, Eb_MAJOR, Ab_MAJOR, Db_MAJOR, Gb_MAJOR,
  A_MINOR, E_MINOR, B_MINOR, F_SHARP_MINOR, C_SHARP_MINOR, G_SHARP_MINOR,
  D_MINOR, G_MINOR, C_MINOR, F_MINOR, Bb_MINOR, Eb_MINOR,
];

/** The most practical keys for drilling (avoids double-sharps/flats) */
export const PRACTICAL_KEYS: readonly Key[] = [
  C_MAJOR, G_MAJOR, D_MAJOR, A_MAJOR, E_MAJOR, B_MAJOR,
  F_MAJOR, Bb_MAJOR, Eb_MAJOR, Ab_MAJOR,
  A_MINOR, E_MINOR, B_MINOR, F_SHARP_MINOR,
  D_MINOR, G_MINOR, C_MINOR, F_MINOR,
];

/** Spell a pitch class in the context of a given key */
export function spellNote(pc: PitchClass, key: Key): string {
  return key.spelling[pc];
}

/** Pick a random key from the practical set */
export function randomKey(): Key {
  return PRACTICAL_KEYS[Math.floor(Math.random() * PRACTICAL_KEYS.length)];
}

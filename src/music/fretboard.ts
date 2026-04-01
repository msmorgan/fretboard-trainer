/**
 * Guitar fretboard model — maps (string, fret) positions to notes.
 * Standard tuning: E2 A2 D3 G3 B3 E4 (strings 6 to 1, low to high).
 */

import { type PitchClass, pitchClassAtFret, midiToFrequency } from './notes.ts';

export interface FretPosition {
  /** Guitar string number (1 = high E, 6 = low E) */
  string: number;
  /** Fret number (0 = open) */
  fret: number;
}

export interface NoteInfo {
  pitchClass: PitchClass;
  /** MIDI note number */
  midi: number;
  /** Frequency in Hz */
  frequency: number;
  /** Octave number */
  octave: number;
}

/**
 * MIDI note numbers for open strings in standard tuning.
 * Index 0 = string 1 (high E), index 5 = string 6 (low E).
 */
const STANDARD_TUNING_MIDI: readonly number[] = [64, 59, 55, 50, 45, 40];

/** Pitch classes for open strings (derived from MIDI) */
const STANDARD_TUNING_PC: readonly PitchClass[] = STANDARD_TUNING_MIDI.map(
  (midi) => ((midi % 12) as PitchClass),
);

/** String names for display (string number → note name) */
export const STRING_NAMES: readonly string[] = ['high E', 'B', 'G', 'D', 'A', 'low E'];

/** Get the note info at a given fretboard position */
export function noteAt(pos: FretPosition): NoteInfo {
  const idx = pos.string - 1; // string 1 → index 0
  const openMidi = STANDARD_TUNING_MIDI[idx];
  const midi = openMidi + pos.fret;
  const pitchClass = pitchClassAtFret(STANDARD_TUNING_PC[idx], pos.fret);
  const octave = Math.floor(midi / 12) - 1; // MIDI octave convention
  const frequency = midiToFrequency(midi);

  return { pitchClass, midi, octave, frequency };
}

/** Get the open string pitch class for a given string number (1-6) */
export function openStringPC(stringNum: number): PitchClass {
  return STANDARD_TUNING_PC[stringNum - 1];
}

/** Get the open string MIDI note for a given string number (1-6) */
export function openStringMidi(stringNum: number): number {
  return STANDARD_TUNING_MIDI[stringNum - 1];
}

/** Total number of strings */
export const STRING_COUNT = 6;

/** Generate all valid positions for a given fret range */
export function allPositions(maxFret: number): FretPosition[] {
  const positions: FretPosition[] = [];
  for (let string = 1; string <= STRING_COUNT; string++) {
    for (let fret = 0; fret <= maxFret; fret++) {
      positions.push({ string, fret });
    }
  }
  return positions;
}

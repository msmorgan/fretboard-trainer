/**
 * Game Mode 3: Audio Challenge
 * App prompts a note + string, player plays it on their guitar,
 * pitch detection checks the answer.
 */

import type { GameMode, GameConfig, Prompt } from './game-engine.ts';
import { noteAt, STRING_COUNT, STRING_NAMES } from '../music/fretboard.ts';
import { spellNote } from '../music/keys.ts';
import type { PitchClass } from '../music/notes.ts';

export type AudioDifficulty = 'naturals' | 'sharps-flats' | 'chromatic';

/** Pitch classes that are natural notes: C D E F G A B */
const NATURAL_PCS: PitchClass[] = [0, 2, 4, 5, 7, 9, 11];


export class AudioChallengeMode implements GameMode {
  name = 'Audio Challenge';
  difficulty: AudioDifficulty = 'naturals';

  generatePrompt(config: GameConfig): Prompt {
    // Pick a random string
    const string = Math.floor(Math.random() * STRING_COUNT) + 1;

    // Pick a random fret, filtering by difficulty
    let fret: number;
    let attempts = 0;
    do {
      fret = Math.floor(Math.random() * (config.maxFret + 1));
      const note = noteAt({ string, fret });
      if (this._isAllowed(note.pitchClass)) break;
      attempts++;
    } while (attempts < 100);

    const note = noteAt({ string, fret });
    const noteName = spellNote(note.pitchClass, config.key);
    const stringName = STRING_NAMES[string - 1];

    return {
      position: { string, fret },
      text: `Play ${noteName} on the ${stringName} string`,
      correctAnswer: noteName,
      correctPC: note.pitchClass,
    };
  }

  private _isAllowed(pc: PitchClass): boolean {
    switch (this.difficulty) {
      case 'naturals':
        return NATURAL_PCS.includes(pc);
      case 'sharps-flats':
        return true; // All notes, but bias toward accidentals
      case 'chromatic':
        return true;
      default:
        return true;
    }
  }

  /** Check if a detected frequency matches the target note within tolerance */
  static isCorrectPitch(
    detectedFreq: number,
    targetMidi: number,
    toleranceCents = 50,
  ): boolean {
    const targetFreq = 440 * Math.pow(2, (targetMidi - 69) / 12);
    const centsDiff = 1200 * Math.log2(detectedFreq / targetFreq);
    return Math.abs(centsDiff) <= toleranceCents;
  }
}

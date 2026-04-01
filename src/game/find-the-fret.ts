/**
 * Game Mode 2: Find the Fret
 * A note name and string are shown. The player must click the correct fret.
 */

import type { GameMode, GameConfig, Prompt } from './game-engine.ts';
import { noteAt, STRING_COUNT, STRING_NAMES } from '../music/fretboard.ts';
import { spellNote } from '../music/keys.ts';

export class FindTheFretMode implements GameMode {
  name = 'Find the Fret';

  generatePrompt(config: GameConfig): Prompt {
    const string = Math.floor(Math.random() * STRING_COUNT) + 1;
    const fret = Math.floor(Math.random() * (config.maxFret + 1));
    const note = noteAt({ string, fret });
    const noteName = spellNote(note.pitchClass, config.key);
    const stringName = STRING_NAMES[string - 1];

    return {
      position: { string, fret },
      text: `Find ${noteName} on the ${stringName} string`,
      correctAnswer: `${string}-${fret}`,
      correctPC: note.pitchClass,
    };
  }
}

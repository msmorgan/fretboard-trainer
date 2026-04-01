/**
 * Game Mode 1: Name the Note
 * A position is highlighted on the fretboard. The player must identify the note.
 */

import type { GameMode, GameConfig, Prompt } from './game-engine.ts';
import { noteAt, STRING_COUNT } from '../music/fretboard.ts';
import { spellNote } from '../music/keys.ts';

export class NameTheNoteMode implements GameMode {
  name = 'Name the Note';

  generatePrompt(config: GameConfig): Prompt {
    const string = Math.floor(Math.random() * STRING_COUNT) + 1;
    const fret = Math.floor(Math.random() * (config.maxFret + 1));
    const note = noteAt({ string, fret });
    const noteName = spellNote(note.pitchClass, config.key);

    return {
      position: { string, fret },
      text: 'What note is this?',
      correctAnswer: noteName,
      correctPC: note.pitchClass,
    };
  }
}

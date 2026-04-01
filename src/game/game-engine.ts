/**
 * Core game engine — state machine that orchestrates game modes.
 */

import type { FretPosition } from '../music/fretboard.ts';
import type { PitchClass } from '../music/notes.ts';
import type { Key } from '../music/keys.ts';

export type GameState = 'idle' | 'prompting' | 'awaiting-input' | 'showing-result';

export interface Prompt {
  /** Position on the fretboard being quizzed */
  position: FretPosition;
  /** Display text for the prompt (e.g., "What note is this?" or "Play A on the G string") */
  text: string;
  /** The correct answer as a note name (key-specific spelling) */
  correctAnswer: string;
  /** The correct pitch class (for matching regardless of enharmonic spelling) */
  correctPC: PitchClass;
}

export interface AnswerResult {
  correct: boolean;
  givenAnswer: string;
  correctAnswer: string;
  position: FretPosition;
}

export interface GameMode {
  name: string;
  generatePrompt(config: GameConfig): Prompt;
}

export interface GameConfig {
  maxFret: number;
  key: Key;
}

export type GameEventCallback = (event: GameEvent) => void;

export type GameEvent =
  | { type: 'state-change'; state: GameState }
  | { type: 'new-prompt'; prompt: Prompt }
  | { type: 'answer-result'; result: AnswerResult };

export class GameEngine {
  private _state: GameState = 'idle';
  private _currentPrompt: Prompt | null = null;
  private _mode: GameMode | null = null;
  private _config: GameConfig | null = null;
  private _listeners: GameEventCallback[] = [];
  private _resultTimeoutId: ReturnType<typeof setTimeout> | null = null;

  get state(): GameState {
    return this._state;
  }

  get currentPrompt(): Prompt | null {
    return this._currentPrompt;
  }

  on(callback: GameEventCallback): () => void {
    this._listeners.push(callback);
    return () => {
      this._listeners = this._listeners.filter((l) => l !== callback);
    };
  }

  private _emit(event: GameEvent) {
    for (const listener of this._listeners) {
      listener(event);
    }
  }

  private _setState(state: GameState) {
    this._state = state;
    this._emit({ type: 'state-change', state });
  }

  start(mode: GameMode, config: GameConfig) {
    this._mode = mode;
    this._config = config;
    this._nextPrompt();
  }

  stop() {
    if (this._resultTimeoutId) {
      clearTimeout(this._resultTimeoutId);
      this._resultTimeoutId = null;
    }
    this._state = 'idle';
    this._currentPrompt = null;
    this._emit({ type: 'state-change', state: 'idle' });
  }

  submitAnswer(answer: string, answerPC?: PitchClass) {
    if (this._state !== 'awaiting-input' || !this._currentPrompt) return;

    // Match by pitch class if provided, otherwise fall back to string match
    const correct = answerPC !== undefined
      ? answerPC === this._currentPrompt.correctPC
      : answer === this._currentPrompt.correctAnswer;
    const result: AnswerResult = {
      correct,
      givenAnswer: answer,
      correctAnswer: this._currentPrompt.correctAnswer,
      position: this._currentPrompt.position,
    };

    this._setState('showing-result');
    this._emit({ type: 'answer-result', result });

    // Automatically advance to next prompt after a delay
    this._resultTimeoutId = setTimeout(() => {
      this._resultTimeoutId = null;
      this._nextPrompt();
    }, correct ? 800 : 1500);
  }

  private _nextPrompt() {
    if (!this._mode || !this._config) return;

    this._setState('prompting');
    const prompt = this._mode.generatePrompt(this._config);
    this._currentPrompt = prompt;
    this._emit({ type: 'new-prompt', prompt });
    this._setState('awaiting-input');
  }
}

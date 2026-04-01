import { LitElement, html, css } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import './fretboard-view.ts';
import './note-buttons.ts';
import type { NoteSelectedEvent } from './note-buttons.ts';
import { GameEngine, type Prompt, type AnswerResult } from '../game/game-engine.ts';
import { NameTheNoteMode } from '../game/name-the-note.ts';
import { FindTheFretMode } from '../game/find-the-fret.ts';
import { AudioChallengeMode, type AudioDifficulty } from '../game/audio-challenge.ts';
import { type Key, PRACTICAL_KEYS, randomKey, spellNote } from '../music/keys.ts';
import { noteAt } from '../music/fretboard.ts';
import { type PitchClass, frequencyCents, DUAL_NAMES } from '../music/notes.ts';
import type { FretClickEvent } from './fretboard-view.ts';
import type { Orientation } from '../rendering/fretboard-renderer.ts';
import { StatsTracker } from '../stats/tracker.ts';
import { loadStats, saveStats } from '../stats/persistence.ts';
import { MicInput } from '../audio/mic-input.ts';
import { AudioChallengeMode as ACMode } from '../game/audio-challenge.ts';

export type GameModeId = 'name-the-note' | 'find-the-fret' | 'audio-challenge';

@customElement('app-shell')
export class AppShell extends LitElement {
  static styles = css`
    :host {
      display: block;
      min-height: 100vh;
      background: var(--color-bg);
      color: var(--color-text);
      font-family: 'Inter', system-ui, -apple-system, sans-serif;
    }

    header {
      text-align: center;
      padding: 1.5rem 1rem 0.5rem;
    }

    h1 {
      font-size: 1.4rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: -0.02em;
    }

    .subtitle {
      font-size: 0.85rem;
      color: var(--color-text-muted);
      margin: 0.25rem 0 0;
    }

    .toolbar {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 0.5rem 1rem;
      flex-wrap: wrap;
    }

    .toolbar label {
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }

    .toolbar select {
      padding: 0.3rem 0.5rem;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background: var(--color-surface);
      color: var(--color-text);
      font-size: 0.85rem;
      font-family: inherit;
    }

    .heatmap-toggle {
      padding: 0.3rem 0.6rem;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background: var(--color-surface);
      color: var(--color-text-muted);
      font-size: 0.8rem;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.15s ease;
    }

    .heatmap-toggle[aria-pressed="true"] {
      background: var(--color-accent-dim);
      border-color: var(--color-accent);
      color: var(--color-accent);
    }

    .mode-selector {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      padding: 0.75rem 1rem;
      flex-wrap: wrap;
    }

    .mode-btn {
      padding: 0.5rem 1rem;
      border: 1px solid var(--color-border);
      border-radius: 6px;
      background: var(--color-surface);
      color: var(--color-text);
      cursor: pointer;
      font-size: 0.85rem;
      transition: all 0.15s ease;
      font-family: inherit;
    }

    .mode-btn:hover {
      border-color: var(--color-accent);
      background: var(--color-surface-hover);
    }

    .mode-btn[aria-pressed="true"] {
      background: var(--color-accent);
      border-color: var(--color-accent);
      color: var(--color-bg);
      font-weight: 600;
    }

    .fretboard-container {
      padding: 0.5rem 1rem;
    }

    .controls {
      max-width: 960px;
      margin: 0 auto;
      padding: 1rem;
    }

    .prompt-text {
      text-align: center;
      font-size: 1.1rem;
      margin-bottom: 1rem;
      min-height: 1.5em;
    }

    .result-text {
      text-align: center;
      font-size: 1rem;
      margin-top: 0.75rem;
      font-weight: 600;
      min-height: 1.5em;
    }

    .result-text.correct {
      color: var(--color-correct);
    }

    .result-text.incorrect {
      color: var(--color-incorrect);
    }

    .score-bar {
      display: flex;
      gap: 1.5rem;
      justify-content: center;
      padding: 0.5rem;
      font-size: 0.85rem;
      color: var(--color-text-muted);
    }

    .score-bar .correct {
      color: var(--color-correct);
    }

    .score-bar .incorrect {
      color: var(--color-incorrect);
    }

    .score-bar .streak {
      color: var(--color-accent);
    }

    .find-fret-prompt {
      text-align: center;
      font-size: 1.2rem;
      padding: 1rem;
      color: var(--color-accent);
      font-weight: 600;
    }

    .audio-controls {
      text-align: center;
    }

    .audio-prompt {
      font-size: 1.2rem;
      font-weight: 600;
      color: var(--color-accent);
      margin-bottom: 0.75rem;
    }

    .audio-status {
      font-size: 0.9rem;
      color: var(--color-text-muted);
      margin-bottom: 0.5rem;
    }

    .audio-status.listening {
      color: var(--color-correct);
    }

    .detected-note {
      font-size: 1.5rem;
      font-weight: 700;
      margin: 0.5rem 0;
      min-height: 2em;
    }

    .mic-btn {
      padding: 0.6rem 1.2rem;
      border: 1px solid var(--color-accent);
      border-radius: 6px;
      background: var(--color-accent-dim);
      color: var(--color-accent);
      font-size: 0.9rem;
      cursor: pointer;
      font-family: inherit;
      transition: all 0.15s ease;
    }

    .mic-btn:hover {
      background: var(--color-accent);
      color: var(--color-bg);
    }

    .mic-btn.active {
      background: var(--color-incorrect);
      border-color: var(--color-incorrect);
      color: white;
    }

    .difficulty-selector {
      display: flex;
      gap: 0.5rem;
      justify-content: center;
      margin-top: 0.75rem;
    }

    .diff-btn {
      padding: 0.3rem 0.7rem;
      border: 1px solid var(--color-border);
      border-radius: 4px;
      background: var(--color-surface);
      color: var(--color-text-muted);
      font-size: 0.8rem;
      cursor: pointer;
      font-family: inherit;
    }

    .diff-btn[aria-pressed="true"] {
      background: var(--color-accent-dim);
      border-color: var(--color-accent);
      color: var(--color-accent);
    }
  `;

  @state() private _modeId: GameModeId = 'name-the-note';
  @state() private _maxFret = 12;
  @state() private _key: Key = PRACTICAL_KEYS[0];
  @state() private _useRandomKey = true;
  @state() private _showHeatmap = false;
  @state() private _orientation: Orientation = 'horizontal';

  // Game state
  @state() private _prompt: Prompt | null = null;
  @state() private _lastResult: AnswerResult | null = null;
  @state() private _selectedPC: PitchClass | null = null;
  @state() private _showResult = false;
  @state() private _score = { correct: 0, incorrect: 0, streak: 0 };

  // Audio state
  @state() private _micActive = false;
  @state() private _detectedNote = '';
  @state() private _detectedCents = 0;
  @state() private _audioDifficulty: AudioDifficulty = 'naturals';

  private _engine = new GameEngine();
  private _nameMode = new NameTheNoteMode();
  private _findMode = new FindTheFretMode();
  private _audioMode = new AudioChallengeMode();
  private _tracker = new StatsTracker(loadStats() ?? undefined);
  private _mic = new MicInput();
  private _stableCount = 0;
  private _lastDetectedMidi = -1;
  private _awaitingSilence = false;

  connectedCallback() {
    super.connectedCallback();
    this._engine.on((event) => {
      if (event.type === 'new-prompt') {
        this._prompt = event.prompt;
        this._lastResult = null;
        this._selectedPC = null;
        this._showResult = false;
        this._detectedNote = '';
        this._detectedCents = 0;
        this._stableCount = 0;
        this._lastDetectedMidi = -1;
        this._awaitingSilence = true;
      } else if (event.type === 'answer-result') {
        this._lastResult = event.result;
        this._showResult = true;

        if (event.result.correct) {
          this._score = {
            ...this._score,
            correct: this._score.correct + 1,
            streak: this._score.streak + 1,
          };
        } else {
          this._score = {
            ...this._score,
            incorrect: this._score.incorrect + 1,
            streak: 0,
          };
        }

        const pos = event.result.position;
        const key = this._useRandomKey ? this._key : this._key;
        const note = noteAt(pos);
        const noteName = spellNote(note.pitchClass, key);
        this._tracker.record(pos.string, pos.fret, noteName, event.result.correct);
        this._tracker.updateBestStreak(this._score.streak);
        saveStats(this._tracker.state);
        this.requestUpdate();
      }
    });

    this._mic.onPitch((result) => {
      if (this._modeId !== 'audio-challenge' || this._showResult || !this._prompt) return;

      // Wait for silence before accepting input for a new prompt
      // (prevents the previous note's sustain from counting against the next prompt)
      if (result === null) {
        if (this._awaitingSilence) {
          this._awaitingSilence = false;
          this._stableCount = 0;
          this._lastDetectedMidi = -1;
        }
        return;
      }
      if (this._awaitingSilence) return;

      const { midi, cents } = frequencyCents(result.frequency);
      const key = this._useRandomKey ? this._key : this._key;
      const pc = ((midi % 12 + 12) % 12) as PitchClass;
      this._detectedNote = spellNote(pc, key);
      this._detectedCents = Math.round(cents);

      // Require stable detection for a few frames before accepting
      if (midi === this._lastDetectedMidi) {
        this._stableCount++;
      } else {
        this._stableCount = 1;
        this._lastDetectedMidi = midi;
      }

      this.requestUpdate();

      // Accept after 12 stable detections (~500ms sustain)
      if (this._stableCount >= 12) {
        const targetNote = noteAt(this._prompt.position);
        if (ACMode.isCorrectPitch(result.frequency, targetNote.midi)) {
          this._engine.submitAnswer(this._prompt.correctAnswer);
        } else if (this._stableCount >= 18) {
          // After ~750ms of stable wrong note, mark as incorrect
          this._engine.submitAnswer(this._detectedNote);
        }
      }
    });

    this._startGame();
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this._mic.stop();
  }

  private _startGame() {
    const key = this._useRandomKey ? randomKey() : this._key;
    if (this._useRandomKey) {
      this._key = key; // Store the randomly selected key
    }
    let mode;
    if (this._modeId === 'find-the-fret') {
      mode = this._findMode;
    } else if (this._modeId === 'audio-challenge') {
      this._audioMode.difficulty = this._audioDifficulty;
      mode = this._audioMode;
    } else {
      mode = this._nameMode;
    }
    this._score = { correct: 0, incorrect: 0, streak: 0 };
    this._engine.start(mode, { maxFret: this._maxFret, key });
  }

  private _setMode(modeId: GameModeId) {
    if (modeId === this._modeId) return;
    this._engine.stop();
    if (this._modeId === 'audio-challenge') {
      this._mic.stop();
      this._micActive = false;
    }
    this._modeId = modeId;
    this._startGame();
  }

  private _handleNoteSelected(e: CustomEvent<NoteSelectedEvent>) {
    if (this._showResult) return;
    this._selectedPC = e.detail.pc;
    this._engine.submitAnswer(e.detail.label, e.detail.pc);
  }

  private _handleFretClick(e: CustomEvent<FretClickEvent>) {
    if (this._showResult || this._modeId !== 'find-the-fret') return;
    const { string, fret } = e.detail;
    this._engine.submitAnswer(`${string}-${fret}`);
  }

  private _handleKeyChange(e: Event) {
    const select = e.target as HTMLSelectElement;
    if (select.value === 'random') {
      this._useRandomKey = true;
    } else {
      this._useRandomKey = false;
      this._key = PRACTICAL_KEYS[parseInt(select.value)];
    }
    this._engine.stop();
    this._startGame();
  }

  private _toggleHeatmap() {
    this._showHeatmap = !this._showHeatmap;
  }

  private async _toggleMic() {
    if (this._micActive) {
      this._mic.stop();
      this._micActive = false;
    } else {
      await this._mic.start();
      this._micActive = true;
    }
  }

  private _setAudioDifficulty(diff: AudioDifficulty) {
    this._audioDifficulty = diff;
    this._audioMode.difficulty = diff;
    this._engine.stop();
    this._startGame();
  }

  private _getNoteNames(): string[] {
    if (this._useRandomKey) {
      // In random mode, show both enharmonics for accidentals
      return [...DUAL_NAMES];
    }
    return Array.from({ length: 12 }, (_, i) => spellNote(i as PitchClass, this._key));
  }

  /** Get the display name for a pitch class using current note names */
  private _displayName(pc: PitchClass): string {
    return this._getNoteNames()[pc];
  }

  /** Get the prompt text, substituting dual note names in random mode */
  private _promptText(): string {
    if (!this._prompt) return '';
    if (!this._useRandomKey) return this._prompt.text;
    // Replace the key-specific note name in the prompt with the display name
    const displayNote = this._displayName(this._prompt.correctPC);
    return this._prompt.text.replace(this._prompt.correctAnswer, displayNote);
  }

  render() {
    return html`
      <header>
        <h1>Fretboard Trainer</h1>
        <p class="subtitle">Learn the notes on your guitar</p>
      </header>

      <div class="toolbar">
        <label for="key-select">Key:</label>
        <select id="key-select" @change=${this._handleKeyChange}>
          ${PRACTICAL_KEYS.map(
            (k, i) => html`<option value=${i} ?selected=${!this._useRandomKey && this._key === k}>${k.name}</option>`,
          )}
          <option value="random" ?selected=${this._useRandomKey}>Random</option>
        </select>

        <label for="fret-select">Frets:</label>
        <select id="fret-select" @change=${(e: Event) => {
          this._maxFret = parseInt((e.target as HTMLSelectElement).value);
          this._engine.stop();
          this._startGame();
        }}>
          ${[12, 15, 17, 19, 20].map(
            (n) => html`<option value=${n} ?selected=${n === this._maxFret}>${n}</option>`,
          )}
        </select>

        <label for="orient-select">View:</label>
        <select id="orient-select" @change=${(e: Event) => {
          this._orientation = (e.target as HTMLSelectElement).value as Orientation;
        }}>
          <option value="horizontal" ?selected=${this._orientation === 'horizontal'}>Horizontal</option>
          <option value="vertical" ?selected=${this._orientation === 'vertical'}>Vertical</option>
          <option value="classical" ?selected=${this._orientation === 'classical'}>Classical</option>
        </select>

        <button class="heatmap-toggle"
          aria-pressed="${this._showHeatmap}"
          @click=${this._toggleHeatmap}>
          Heatmap
        </button>
      </div>

      <nav class="mode-selector">
        ${this._renderModeButton('name-the-note', 'Name the Note')}
        ${this._renderModeButton('find-the-fret', 'Find the Fret')}
        ${this._renderModeButton('audio-challenge', 'Audio Challenge')}
      </nav>

      <div class="score-bar">
        <span class="correct">${this._score.correct} correct</span>
        <span class="incorrect">${this._score.incorrect} wrong</span>
        <span class="streak">streak: ${this._score.streak}</span>
      </div>

      <div class="fretboard-container">
        <fretboard-view
          .maxFret=${this._maxFret}
          .interactive=${this._modeId === 'find-the-fret'}
          .orientation=${this._orientation}
          .tracker=${this._tracker}
          .showHeatmap=${this._showHeatmap}
          .highlightString=${this._modeId === 'name-the-note' && this._prompt
            ? this._prompt.position.string
            : null}
          .highlightFret=${this._modeId === 'name-the-note' && this._prompt
            ? this._prompt.position.fret
            : null}
          .feedbackString=${this._showResult && this._lastResult
            ? this._lastResult.position.string
            : null}
          .feedbackFret=${this._showResult && this._lastResult
            ? this._lastResult.position.fret
            : null}
          .feedbackColor=${this._showResult && this._lastResult
            ? this._lastResult.correct
              ? 'var(--color-correct)'
              : 'var(--color-incorrect)'
            : null}
          @fret-click=${this._handleFretClick}
        ></fretboard-view>
      </div>

      <div class="controls">
        ${this._renderControls()}
      </div>
    `;
  }

  private _renderControls() {
    if (this._modeId === 'name-the-note') {
      return html`
        <p class="prompt-text">${this._promptText()}</p>
        <note-buttons
          .notes=${this._getNoteNames()}
          .disabled=${this._showResult}
          .selectedPC=${this._selectedPC}
          .correctPC=${this._showResult && this._prompt
            ? this._prompt.correctPC
            : null}
          .showResult=${this._showResult}
          @note-selected=${this._handleNoteSelected}
        ></note-buttons>
        ${this._renderResultText()}
      `;
    }

    if (this._modeId === 'find-the-fret') {
      return html`
        <p class="find-fret-prompt">${this._promptText()}</p>
        ${this._renderResultText()}
      `;
    }

    // Audio challenge mode
    return html`
      <div class="audio-controls">
        <p class="audio-prompt">${this._promptText() || 'Starting...'}</p>

        <button class="mic-btn ${this._micActive ? 'active' : ''}"
          @click=${this._toggleMic}>
          ${this._micActive ? 'Stop Listening' : 'Start Listening'}
        </button>

        <p class="audio-status ${this._micActive ? 'listening' : ''}">
          ${this._micActive
            ? this._detectedNote
              ? `Hearing: ${this._detectedNote} (${this._detectedCents >= 0 ? '+' : ''}${this._detectedCents}c)`
              : 'Listening...'
            : 'Click to start microphone'}
        </p>

        ${this._renderResultText()}

        <div class="difficulty-selector">
          ${this._renderDiffButton('naturals', 'Naturals')}
          ${this._renderDiffButton('sharps-flats', '+ Accidentals')}
          ${this._renderDiffButton('chromatic', 'Full Chromatic')}
        </div>
      </div>
    `;
  }

  private _renderDiffButton(diff: AudioDifficulty, label: string) {
    return html`
      <button class="diff-btn"
        aria-pressed="${this._audioDifficulty === diff}"
        @click=${() => this._setAudioDifficulty(diff)}>
        ${label}
      </button>
    `;
  }

  private _renderResultText() {
    if (!this._showResult || !this._lastResult) {
      return html`<p class="result-text">&nbsp;</p>`;
    }
    if (this._lastResult.correct) {
      return html`<p class="result-text correct">Correct!</p>`;
    }
    const displayAnswer = this._prompt
      ? this._displayName(this._prompt.correctPC)
      : this._lastResult.correctAnswer;
    return html`<p class="result-text incorrect">
      Wrong — it was ${displayAnswer}
    </p>`;
  }

  private _renderModeButton(mode: GameModeId, label: string) {
    return html`
      <button class="mode-btn"
        aria-pressed="${this._modeId === mode}"
        @click=${() => this._setMode(mode)}>
        ${label}
      </button>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-shell': AppShell;
  }
}

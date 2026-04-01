import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import type { PitchClass } from '../music/notes.ts';

/**
 * Piano-keyboard layout for note selection.
 *
 * The `notes` array has 12 entries (pitch classes 0–11, i.e. C through B).
 * White keys: indices 0,2,4,5,7,9,11 (C,D,E,F,G,A,B)
 * Black keys: indices 1,3,6,8,10 (C#/Db, D#/Eb, F#/Gb, G#/Ab, A#/Bb)
 *
 * Black keys are positioned above and between their neighboring white keys,
 * matching real piano geometry.
 *
 * Selection and results are tracked by pitch class index, not by display string,
 * so enharmonic spellings never cause mismatches.
 */

/** Pitch class indices that map to white keys */
const WHITE_INDICES = [0, 2, 4, 5, 7, 9, 11];

/** Black key index -> center position as fraction along the white key row (0-7). */
const BLACK_KEY_POSITIONS: Record<number, number> = {
  1: 0.95,    // C#/Db — between C and D
  3: 2.05,    // D#/Eb — between D and E
  6: 3.9,    // F#/Gb — between F and G
  8: 5,    // G#/Ab — between G and A
  10: 6.1,   // A#/Bb — between A and B
};

const BLACK_INDICES = [1, 3, 6, 8, 10];

export interface NoteSelectedEvent {
  pc: PitchClass;
  label: string;
}

@customElement('note-buttons')
export class NoteButtons extends LitElement {
  static styles = css`
    :host {
      display: block;
    }

    .piano {
      position: relative;
      max-width: 420px;
      margin: 0 auto;
      height: 96px;
    }

    .white-keys {
      display: flex;
      gap: 3px;
      height: 100%;
    }

    .key {
      border: none;
      cursor: pointer;
      font-family: inherit;
      font-weight: 600;
      transition: all 0.12s ease;
      display: flex;
      align-items: flex-end;
      justify-content: center;
      padding-bottom: 8px;
    }

    .key:disabled {
      opacity: 0.5;
      cursor: default;
    }

    .key.white {
      flex: 1;
      height: 100%;
      background: #e8e6ec;
      color: #1a1d27;
      font-size: 0.85rem;
      border-radius: 0 0 5px 5px;
      border: 1px solid #bbb;
      border-top: none;
    }

    .key.white:hover:not(:disabled) {
      background: #fff;
    }

    .key.black {
      position: absolute;
      top: 0;
      width: 11%;
      height: 58%;
      background: #1a1d27;
      color: #c0b8cc;
      font-size: 0.7rem;
      border-radius: 0 0 4px 4px;
      border: 1px solid #333;
      border-top: none;
      z-index: 1;
      align-items: flex-end;
      padding-bottom: 5px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.4);
      overflow: visible;
      white-space: nowrap;
      transform: translateX(-50%);
    }

    .key.black.dual {
      font-size: 0.6rem;
      line-height: 1.2;
      white-space: normal;
      text-align: center;
    }

    .key.black:hover:not(:disabled) {
      background: #2e3345;
    }

    /* ── Result states ── */

    .key.correct {
      background: var(--color-correct) !important;
      border-color: var(--color-correct) !important;
      color: var(--color-bg) !important;
    }

    .key.incorrect {
      background: var(--color-incorrect) !important;
      border-color: var(--color-incorrect) !important;
      color: var(--color-bg) !important;
    }

    .key.reveal {
      background: var(--color-correct) !important;
      border-color: var(--color-correct) !important;
      color: var(--color-bg) !important;
      opacity: 0.7;
    }
  `;

  /** 12-element array of display labels, one per pitch class (0=C .. 11=B) */
  @property({ type: Array }) notes: string[] = [];
  @property({ type: Boolean }) disabled = false;

  /** Pitch class of the selected note (after clicking) */
  @property({ type: Number }) selectedPC: PitchClass | null = null;
  /** Pitch class of the correct answer (shown after answering) */
  @property({ type: Number }) correctPC: PitchClass | null = null;
  @property({ type: Boolean }) showResult = false;

  private _handleClick(pc: PitchClass) {
    if (this.disabled) return;
    this.dispatchEvent(
      new CustomEvent<NoteSelectedEvent>('note-selected', {
        detail: { pc, label: this.notes[pc] },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private _resultClass(pc: number): string {
    if (!this.showResult) return '';
    if (pc === this.selectedPC && pc === this.correctPC) return 'correct';
    if (pc === this.selectedPC && pc !== this.correctPC) return 'incorrect';
    if (pc === this.correctPC) return 'reveal';
    return '';
  }

  render() {
    if (this.notes.length < 12) return html``;

    return html`
      <div class="piano">
        <div class="white-keys">
          ${WHITE_INDICES.map((i) => html`
            <button class="key white ${this._resultClass(i)}"
              ?disabled=${this.disabled}
              @click=${() => this._handleClick(i as PitchClass)}>
              ${this.notes[i]}
            </button>
          `)}
        </div>
        ${BLACK_INDICES.map((i) => {
          const leftPct = (BLACK_KEY_POSITIONS[i] / 7) * 100;
          const parts = this.notes[i].split('/');
          const isDual = parts.length > 1;
          return html`
            <button class="key black ${isDual ? 'dual' : ''} ${this._resultClass(i)}"
              style="left: ${leftPct}%"
              ?disabled=${this.disabled}
              @click=${() => this._handleClick(i as PitchClass)}>
              ${isDual
                ? html`${parts[0]}<br>${parts[1]}`
                : this.notes[i]}
            </button>
          `;
        })}
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'note-buttons': NoteButtons;
  }
}

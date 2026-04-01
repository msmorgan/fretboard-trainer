import { LitElement, html, css, svg } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  renderNut,
  renderFrets,
  renderStrings,
  renderFretMarkers,
  renderFretNumbers,
  renderStringLabels,
  renderHitTargets,
  renderHighlight,
  renderHighlightWithLabel,
  computeBridgeX,
  type Orientation,
  orientationAngle,
  rotatedViewBox,
  ROTATION_CX,
  ROTATION_CY,
} from '../rendering/fretboard-renderer.ts';
import { renderHeatmap } from '../rendering/heatmap.ts';
import type { StatsTracker } from '../stats/tracker.ts';

export interface FretClickEvent {
  string: number;
  fret: number;
}

@customElement('fretboard-view')
export class FretboardView extends LitElement {
  static styles = css`
    :host {
      display: block;
      width: 100%;
      max-width: 960px;
      margin: 0 auto;
    }

    :host([orientation="vertical"]) {
      max-width: 280px;
    }

    :host([orientation="classical"]) {
      max-width: 700px;
    }

    svg {
      width: 100%;
      height: auto;
      display: block;
    }

    .highlight {
      transition: opacity 0.2s ease;
    }

    .hit-target:hover {
      fill: rgba(255, 255, 255, 0.05);
    }
  `;

  @property({ type: Number }) maxFret = 12;
  @property({ type: Boolean }) interactive = false;
  @property({ reflect: true }) orientation: Orientation = 'horizontal';

  /** Highlighted position (if any) */
  @property({ type: Number }) highlightString: number | null = null;
  @property({ type: Number }) highlightFret: number | null = null;
  @property({ attribute: false }) highlightLabel: string | null = null;
  @property() highlightColor = 'var(--color-highlight)';

  /** Feedback highlight (correct/incorrect answer) */
  @property({ type: Number }) feedbackString: number | null = null;
  @property({ type: Number }) feedbackFret: number | null = null;
  @property() feedbackColor: string | null = null;

  /** Heatmap overlay */
  @property({ attribute: false }) tracker: StatsTracker | null = null;
  @property({ type: Boolean }) showHeatmap = false;

  private _handleClick(string: number, fret: number) {
    this.dispatchEvent(
      new CustomEvent<FretClickEvent>('fret-click', {
        detail: { string, fret },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    const angle = orientationAngle(this.orientation);
    const vb = rotatedViewBox(this.orientation);
    const counterRotate = angle !== 0 ? -angle : 0;
    const stretch = this.orientation !== 'classical';
    const bridgeX = computeBridgeX(this.maxFret, stretch);

    // For non-horizontal, wrap content in a rotated <g>
    const content = svg`
      ${renderFretMarkers(this.maxFret, bridgeX)}
      ${renderFrets(this.maxFret, bridgeX)}
      ${renderNut()}
      ${renderStrings(bridgeX)}
      ${renderStringLabels(counterRotate)}
      ${renderFretNumbers(this.maxFret, counterRotate, bridgeX)}
      ${this.showHeatmap && this.tracker
        ? renderHeatmap(this.tracker, this.maxFret, bridgeX)
        : svg``}
      ${this._renderHighlights(bridgeX)}
      ${this.interactive
        ? renderHitTargets(this.maxFret, (s, f) => this._handleClick(s, f), bridgeX)
        : svg``}
    `;

    return html`
      <svg viewBox="${vb.x} ${vb.y} ${vb.w} ${vb.h}"
           xmlns="http://www.w3.org/2000/svg">
        ${angle !== 0
          ? svg`<g transform="rotate(${angle}, ${ROTATION_CX}, ${ROTATION_CY})">${content}</g>`
          : content}
      </svg>
    `;
  }

  private _renderHighlights(bridgeX?: number) {
    const highlights = [];

    if (this.highlightString != null && this.highlightFret != null) {
      if (this.highlightLabel) {
        highlights.push(
          renderHighlightWithLabel(
            this.highlightString,
            this.highlightFret,
            this.highlightLabel,
            this.highlightColor,
            bridgeX,
          ),
        );
      } else {
        highlights.push(
          renderHighlight(
            this.highlightString,
            this.highlightFret,
            this.highlightColor,
            bridgeX,
          ),
        );
      }
    }

    if (this.feedbackString != null && this.feedbackFret != null && this.feedbackColor) {
      highlights.push(
        renderHighlight(this.feedbackString, this.feedbackFret, this.feedbackColor, bridgeX),
      );
    }

    return svg`${highlights}`;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'fretboard-view': FretboardView;
  }
}

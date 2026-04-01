/**
 * Heatmap overlay — shows accuracy per position as colored circles on the fretboard.
 */

import { svg, type SVGTemplateResult } from 'lit';
import { STRING_COUNT } from '../music/fretboard.ts';
import { fretMidpoint } from './fret-spacing.ts';
import { toX, stringY } from './fretboard-renderer.ts';
import type { StatsTracker } from '../stats/tracker.ts';

/** Map accuracy (0–1) to a color */
function accuracyColor(accuracy: number): string {
  if (accuracy < 0.5) {
    // Red to orange
    const t = accuracy / 0.5;
    const r = 248;
    const g = Math.round(113 + t * (187 - 113));
    const b = Math.round(113 - t * 77);
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  }
  if (accuracy < 0.75) {
    // Orange to yellow
    const t = (accuracy - 0.5) / 0.25;
    const r = Math.round(248 - t * 7);
    const g = Math.round(187 + t * (191 - 187));
    const b = Math.round(36 + t * 0);
    return `rgba(${r}, ${g}, ${b}, 0.45)`;
  }
  // Yellow to green
  const t = (accuracy - 0.75) / 0.25;
  const r = Math.round(241 - t * 167);
  const g = Math.round(191 + t * (222 - 191));
  const b = Math.round(36 + t * (92));
  return `rgba(${r}, ${g}, ${b}, 0.4)`;
}

const MIN_ATTEMPTS = 3;

export function renderHeatmap(
  tracker: StatsTracker,
  maxFret: number,
  bridgeX?: number,
): SVGTemplateResult {
  const circles: SVGTemplateResult[] = [];

  for (let s = 1; s <= STRING_COUNT; s++) {
    for (let f = 0; f <= maxFret; f++) {
      const attempts = tracker.attempts(s, f);
      if (attempts < MIN_ATTEMPTS) continue;

      const accuracy = tracker.accuracy(s, f);
      if (accuracy === null) continue;

      const cx = toX(fretMidpoint(f), bridgeX);
      const cy = stringY(s);
      const color = accuracyColor(accuracy);

      circles.push(svg`
        <circle cx="${cx}" cy="${cy}" r="9"
          fill="${color}" class="heatmap-dot" />
      `);
    }
  }

  return svg`<g class="heatmap">${circles}</g>`;
}

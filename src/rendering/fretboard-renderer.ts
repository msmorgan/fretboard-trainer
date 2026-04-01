/**
 * SVG fretboard generation as Lit template results.
 * Produces SVG elements for strings, frets, markers, hit targets, and overlays.
 */

import { svg, type SVGTemplateResult } from 'lit';
import { STRING_COUNT } from '../music/fretboard.ts';
import {
  fretPosition,
  computeFretPositions,
  fretMidpoint,
  SINGLE_DOT_FRETS,
  DOUBLE_DOT_FRETS,
} from './fret-spacing.ts';

// ── Layout constants (in SVG viewBox units) ─────────────────

const VIEWBOX_WIDTH = 1000;
const VIEWBOX_HEIGHT = 200;
const NUT_X = 30;
const FULL_BRIDGE_X = 980;
const TOP_MARGIN = 20;
const BOTTOM_MARGIN = 20;
const FULL_FRETBOARD_WIDTH = FULL_BRIDGE_X - NUT_X;
const PLAYABLE_HEIGHT = VIEWBOX_HEIGHT - TOP_MARGIN - BOTTOM_MARGIN;

export { VIEWBOX_WIDTH, VIEWBOX_HEIGHT, NUT_X, TOP_MARGIN, BOTTOM_MARGIN };

/**
 * Compute the bridge X position for a given maxFret.
 * When `stretch` is true, the last fret is scaled to fill the viewbox width.
 * When false, physical fret proportions are preserved (showing dead space past the last fret).
 */
export function computeBridgeX(maxFret: number, stretch: boolean): number {
  if (!stretch) return FULL_BRIDGE_X;
  const lastFretNorm = fretPosition(maxFret);
  if (lastFretNorm <= 0) return FULL_BRIDGE_X;
  // Scale so the last fret sits near the right edge, with a small margin
  return NUT_X + (FULL_FRETBOARD_WIDTH * 0.97) / lastFretNorm;
}

// ── Orientation support ─────────────────────────────────────

export type Orientation = 'horizontal' | 'vertical' | 'classical';

/** Rotation angles for each orientation (degrees, CW positive in SVG) */
export function orientationAngle(orientation: Orientation): number {
  switch (orientation) {
    case 'horizontal': return 0;
    case 'vertical': return 90;
    case 'classical': return 55;
  }
}

/** Rotation center (center of the fretboard content) */
export const ROTATION_CX = VIEWBOX_WIDTH / 2;
export const ROTATION_CY = VIEWBOX_HEIGHT / 2;

/**
 * Compute the bounding box of the original content after rotation.
 * Returns { x, y, width, height } for the SVG viewBox.
 */
export function rotatedViewBox(orientation: Orientation): { x: number; y: number; w: number; h: number } {
  if (orientation === 'horizontal') {
    return { x: -5, y: 0, w: VIEWBOX_WIDTH + 10, h: VIEWBOX_HEIGHT };
  }

  const angle = orientationAngle(orientation);
  const rad = (angle * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  const cx = ROTATION_CX;
  const cy = ROTATION_CY;

  // Rotate the four corners of the original content bounds
  // Use slightly expanded bounds to include string labels (x starts at ~0) and fret numbers
  const corners = [
    { x: -5, y: -5 },
    { x: VIEWBOX_WIDTH + 5, y: -5 },
    { x: VIEWBOX_WIDTH + 5, y: VIEWBOX_HEIGHT + 5 },
    { x: -5, y: VIEWBOX_HEIGHT + 5 },
  ];

  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (const c of corners) {
    const dx = c.x - cx;
    const dy = c.y - cy;
    const rx = cx + dx * cos + dy * sin;
    const ry = cy - dx * sin + dy * cos;
    minX = Math.min(minX, rx);
    minY = Math.min(minY, ry);
    maxX = Math.max(maxX, rx);
    maxY = Math.max(maxY, ry);
  }

  const pad = 10;
  return {
    x: Math.floor(minX - pad),
    y: Math.floor(minY - pad),
    w: Math.ceil(maxX - minX + pad * 2),
    h: Math.ceil(maxY - minY + pad * 2),
  };
}

/** Convert normalized fret position (0–1) to SVG x coordinate */
export function toX(normalized: number, bridgeX = FULL_BRIDGE_X): number {
  return NUT_X + normalized * (bridgeX - NUT_X);
}

/** Get the Y coordinate for a string (1 = bottom/high E, 6 = top/low E) */
export function stringY(stringNum: number): number {
  // String 6 (low E) at top, string 1 (high E) at bottom
  const spacing = PLAYABLE_HEIGHT / (STRING_COUNT - 1);
  return TOP_MARGIN + (stringNum - 1) * spacing;
}

// ── SVG generation functions ────────────────────────────────

export function renderNut(): SVGTemplateResult {
  return svg`
    <line class="nut"
      x1="${NUT_X}" y1="${TOP_MARGIN - 5}"
      x2="${NUT_X}" y2="${VIEWBOX_HEIGHT - BOTTOM_MARGIN + 5}"
      stroke="var(--color-nut)" stroke-width="4" />
  `;
}

export function renderFrets(maxFret: number, bridgeX = FULL_BRIDGE_X): SVGTemplateResult {
  const positions = computeFretPositions(maxFret);
  return svg`
    ${positions.map((pos, i) => svg`
      <line class="fret"
        x1="${toX(pos, bridgeX)}" y1="${TOP_MARGIN - 2}"
        x2="${toX(pos, bridgeX)}" y2="${VIEWBOX_HEIGHT - BOTTOM_MARGIN + 2}"
        stroke="var(--color-fret)" stroke-width="${i === 0 ? 2 : 1.5}"
        data-fret="${i + 1}" />
    `)}
  `;
}

export function renderStrings(bridgeX = FULL_BRIDGE_X): SVGTemplateResult {
  const strings = Array.from({ length: STRING_COUNT }, (_, i) => i + 1);
  return svg`
    ${strings.map((s) => {
      const y = stringY(s);
      // Thicker strings for lower notes
      const thickness = 0.5 + (s - 1) * 0.3;
      return svg`
        <line class="string"
          x1="${NUT_X}" y1="${y}"
          x2="${bridgeX}" y2="${y}"
          stroke="var(--color-string)" stroke-width="${thickness}"
          data-string="${s}" />
      `;
    })}
  `;
}

export function renderFretMarkers(maxFret: number, bridgeX = FULL_BRIDGE_X): SVGTemplateResult {
  const centerY = VIEWBOX_HEIGHT / 2;
  const dotOffset = PLAYABLE_HEIGHT / 6;

  return svg`
    ${SINGLE_DOT_FRETS.filter((f) => f <= maxFret).map((f) => {
      const x = toX(fretMidpoint(f), bridgeX);
      return svg`
        <circle class="fret-marker" cx="${x}" cy="${centerY}" r="5"
          fill="var(--color-marker)" opacity="0.3" />
      `;
    })}
    ${DOUBLE_DOT_FRETS.filter((f) => f <= maxFret).map((f) => {
      const x = toX(fretMidpoint(f), bridgeX);
      return svg`
        <circle class="fret-marker" cx="${x}" cy="${centerY - dotOffset}" r="5"
          fill="var(--color-marker)" opacity="0.3" />
        <circle class="fret-marker" cx="${x}" cy="${centerY + dotOffset}" r="5"
          fill="var(--color-marker)" opacity="0.3" />
      `;
    })}
  `;
}

export function renderFretNumbers(maxFret: number, counterRotate = 0, bridgeX = FULL_BRIDGE_X): SVGTemplateResult {
  const markerFrets = [...SINGLE_DOT_FRETS, ...DOUBLE_DOT_FRETS].filter((f) => f <= maxFret);
  return svg`
    ${markerFrets.map((f) => {
      const x = toX(fretMidpoint(f), bridgeX);
      const y = VIEWBOX_HEIGHT - 3;
      const rot = counterRotate ? `rotate(${counterRotate}, ${x}, ${y})` : '';
      return svg`
        <text class="fret-number" x="${x}" y="${y}"
          text-anchor="middle" fill="var(--color-fret-number)"
          font-size="9" font-family="sans-serif"
          ${rot ? svg`transform="${rot}"` : svg``}>${f}</text>
      `;
    })}
  `;
}

export function renderStringLabels(counterRotate = 0): SVGTemplateResult {
  const labels = ['E', 'B', 'G', 'D', 'A', 'E'];
  return svg`
    ${labels.map((name, i) => {
      const x = 4;
      const y = stringY(i + 1) + 4;
      const rot = counterRotate ? `rotate(${counterRotate}, ${x}, ${y})` : '';
      return svg`
        <text class="string-label" x="${x}" y="${y}"
          text-anchor="middle" fill="var(--color-string-label)"
          font-size="11" font-family="sans-serif" font-weight="bold"
          ${rot ? svg`transform="${rot}"` : svg``}>${name}</text>
      `;
    })}
  `;
}

export interface HitTarget {
  string: number;
  fret: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function computeHitTargets(maxFret: number, bridgeX = FULL_BRIDGE_X): HitTarget[] {
  const targets: HitTarget[] = [];
  const stringSpacing = PLAYABLE_HEIGHT / (STRING_COUNT - 1);
  const halfStringGap = stringSpacing / 2;

  const positions = computeFretPositions(maxFret);

  for (let s = 1; s <= STRING_COUNT; s++) {
    for (let f = 0; f <= maxFret; f++) {
      const cy = stringY(s);

      let x: number;
      let width: number;

      if (f === 0) {
        // Open string: hit target sits to the left of the nut
        width = 28;
        x = NUT_X - width;
      } else {
        // Fretted note: spans from previous fret wire (or nut) to this fret wire
        const leftEdge = f > 1 ? toX(positions[f - 2], bridgeX) : NUT_X;
        const rightEdge = toX(positions[f - 1], bridgeX);
        x = leftEdge;
        width = rightEdge - leftEdge;
      }

      targets.push({
        string: s,
        fret: f,
        x,
        y: cy - halfStringGap,
        width,
        height: stringSpacing,
      });
    }
  }

  return targets;
}

export function renderHitTargets(
  maxFret: number,
  onClick: (string: number, fret: number) => void,
  bridgeX = FULL_BRIDGE_X,
): SVGTemplateResult {
  const targets = computeHitTargets(maxFret, bridgeX);
  return svg`
    ${targets.map((t) => svg`
      <rect class="hit-target"
        x="${t.x}" y="${t.y}" width="${t.width}" height="${t.height}"
        fill="transparent" cursor="pointer"
        data-string="${t.string}" data-fret="${t.fret}"
        @click="${() => onClick(t.string, t.fret)}" />
    `)}
  `;
}

export function renderHighlight(
  string: number,
  fret: number,
  color = 'var(--color-highlight)',
  bridgeX = FULL_BRIDGE_X,
): SVGTemplateResult {
  const cx = toX(fretMidpoint(fret), bridgeX);
  const cy = stringY(string);
  return svg`
    <circle class="highlight" cx="${cx}" cy="${cy}" r="10"
      fill="${color}" opacity="0.9">
    </circle>
  `;
}

export function renderHighlightWithLabel(
  string: number,
  fret: number,
  label: string,
  color = 'var(--color-highlight)',
  bridgeX = FULL_BRIDGE_X,
): SVGTemplateResult {
  const cx = toX(fretMidpoint(fret), bridgeX);
  const cy = stringY(string);
  return svg`
    <circle class="highlight" cx="${cx}" cy="${cy}" r="12"
      fill="${color}" opacity="0.9" />
    <text x="${cx}" y="${cy + 4}" text-anchor="middle"
      fill="var(--color-bg)" font-size="10" font-weight="bold"
      font-family="sans-serif">${label}</text>
  `;
}

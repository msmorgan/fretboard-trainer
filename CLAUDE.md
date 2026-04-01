# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Purpose

A drilling/fluency tool for learning fretboard note positions — not a theory teaching app. Design decisions should favor fast, repetitive practice (quick rounds, minimal friction, auto-advance) over explanation or gamification.

## Commands

- **Dev server**: `npm run dev` (Vite)
- **Build**: `npm run build` (runs `tsc && vite build`)
- **Type check only**: `npx tsc --noEmit`
- **Preview production build**: `npm run preview`

No test framework is configured.

## Architecture

Vanilla TypeScript app using **Lit** web components, bundled with **Vite**. Entry point is `index.html` which loads `<app-shell>` via `src/main.ts`.

### Layers

- **`src/music/`** — Music theory primitives. `notes.ts` defines pitch classes (0-11) and note naming. `fretboard.ts` maps (string, fret) pairs to notes using standard tuning. `keys.ts` provides key-signature-aware note spelling (e.g. F# vs Gb).

- **`src/game/`** — Game logic. `game-engine.ts` is a state machine (`idle → prompting → awaiting-input → showing-result`) that orchestrates modes and emits events. Three modes implement `GameMode`: `name-the-note` (identify highlighted position), `find-the-fret` (click correct fret), `audio-challenge` (play note on real guitar via mic).

- **`src/components/`** — Lit web components. `app-shell.ts` is the central orchestrator holding all game config/state and wiring events between the engine, UI, stats, and audio. `fretboard-view.ts` renders an SVG fretboard with highlighting, heatmap overlay, and click targets. `note-buttons.ts` renders a piano-keyboard-style pitch selector.

- **`src/rendering/`** — Pure SVG rendering functions (no components). `fretboard-renderer.ts` generates all fretboard SVG elements. `fret-spacing.ts` computes physically accurate fret positions. `heatmap.ts` renders accuracy overlay circles.

- **`src/stats/`** — Per-position and per-note accuracy tracking (`tracker.ts`), with localStorage persistence (`persistence.ts`, key `'fretboard-trainer-v1'`).

- **`src/audio/`** — Microphone input via Web Audio API (`mic-input.ts`) and YIN pitch detection algorithm (`pitch-detection.ts`).

### Key patterns

- All note matching uses **pitch class** (0-11), making enharmonic equivalents interchangeable.
- GameEngine communicates via **custom events** (`new-prompt`, `answer-result`); AppShell listens and updates Lit reactive state.
- Fretboard supports three orientations (horizontal, vertical, classical/55-degree) via SVG rotation with recomputed viewBox bounds. Horizontal and vertical modes stretch frets to fill the width; classical keeps physically accurate proportions. Stretching is controlled by `computeBridgeX()` and threaded via a `bridgeX` parameter through all render functions.
- Audio mode requires **stability** (12+ consistent frames ~500ms) before accepting a correct pitch, 18+ frames for incorrect. A **silence gate** (`_awaitingSilence`) blocks detection after each new prompt until the previous note decays, preventing carryover.
- `useDefineForClassFields: false` and `experimentalDecorators: true` in tsconfig — required for Lit's decorator-based reactivity (`@state`, `@property`).

## Style

- Dark theme with accent color `#6c8cff`.
- Global styles in `src/style.css`; component styles are scoped via Lit's `static styles`.

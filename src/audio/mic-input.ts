/**
 * Microphone input — wraps Web Audio API for pitch detection.
 * Uses AnalyserNode + requestAnimationFrame polling.
 */

import { detectPitch, type PitchResult } from './pitch-detection.ts';

export type PitchCallback = (result: PitchResult | null) => void;

export class MicInput {
  private _audioContext: AudioContext | null = null;
  private _analyser: AnalyserNode | null = null;
  private _stream: MediaStream | null = null;
  private _running = false;
  private _rafId: number | null = null;
  private _callback: PitchCallback | null = null;
  private _buffer: Float32Array<ArrayBuffer> | null = null;

  get running(): boolean {
    return this._running;
  }

  onPitch(callback: PitchCallback) {
    this._callback = callback;
  }

  async start(): Promise<void> {
    if (this._running) return;

    const stream = await navigator.mediaDevices.getUserMedia({
      audio: {
        echoCancellation: false,
        noiseSuppression: false,
        autoGainControl: false,
      },
    });

    this._stream = stream;
    this._audioContext = new AudioContext();
    const source = this._audioContext.createMediaStreamSource(stream);

    this._analyser = this._audioContext.createAnalyser();
    this._analyser.fftSize = 4096; // ~93ms at 44.1kHz
    this._analyser.smoothingTimeConstant = 0;

    source.connect(this._analyser);

    this._buffer = new Float32Array(this._analyser.fftSize) as Float32Array<ArrayBuffer>;
    this._running = true;
    this._poll();
  }

  stop(): void {
    this._running = false;

    if (this._rafId != null) {
      cancelAnimationFrame(this._rafId);
      this._rafId = null;
    }

    if (this._stream) {
      for (const track of this._stream.getTracks()) {
        track.stop();
      }
      this._stream = null;
    }

    if (this._audioContext) {
      this._audioContext.close();
      this._audioContext = null;
    }

    this._analyser = null;
    this._buffer = null;
  }

  private _poll() {
    if (!this._running || !this._analyser || !this._buffer || !this._audioContext) return;

    this._analyser.getFloatTimeDomainData(this._buffer);

    // Check if there's actually signal (not silence)
    let maxAmp = 0;
    for (let i = 0; i < this._buffer.length; i++) {
      const amp = Math.abs(this._buffer[i]);
      if (amp > maxAmp) maxAmp = amp;
    }

    // Only attempt detection if signal is loud enough
    if (maxAmp > 0.05) {
      const result = detectPitch(this._buffer, this._audioContext.sampleRate);
      if (result && this._callback) {
        this._callback(result);
      }
    } else if (this._callback) {
      this._callback(null);
    }

    this._rafId = requestAnimationFrame(() => this._poll());
  }
}

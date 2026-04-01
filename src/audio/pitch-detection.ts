/**
 * YIN pitch detection algorithm.
 *
 * Based on: de Cheveigne, A. & Kawahara, H. (2002).
 * "YIN, a fundamental frequency estimator for speech and music."
 *
 * Steps:
 * 1. Difference function
 * 2. Cumulative mean normalized difference (CMND)
 * 3. Absolute threshold to find first dip below threshold
 * 4. Parabolic interpolation for sub-sample accuracy
 * 5. Convert period to frequency
 */

export interface PitchResult {
  frequency: number;
  confidence: number;
}

const DEFAULT_THRESHOLD = 0.15;

/**
 * Detect the fundamental pitch in an audio buffer.
 *
 * @param buffer   Float32Array of audio samples
 * @param sampleRate  Sample rate in Hz (e.g. 44100)
 * @param threshold  YIN threshold (lower = stricter, default 0.15)
 * @returns Detected pitch or null if no confident detection
 */
export function detectPitch(
  buffer: Float32Array,
  sampleRate: number,
  threshold = DEFAULT_THRESHOLD,
): PitchResult | null {
  const halfLen = Math.floor(buffer.length / 2);

  // Step 1: Difference function
  const diff = new Float32Array(halfLen);
  for (let tau = 0; tau < halfLen; tau++) {
    let sum = 0;
    for (let j = 0; j < halfLen; j++) {
      const delta = buffer[j] - buffer[j + tau];
      sum += delta * delta;
    }
    diff[tau] = sum;
  }

  // Step 2: Cumulative mean normalized difference
  const cmnd = new Float32Array(halfLen);
  cmnd[0] = 1;
  let runningSum = 0;
  for (let tau = 1; tau < halfLen; tau++) {
    runningSum += diff[tau];
    cmnd[tau] = diff[tau] / (runningSum / tau);
  }

  // Step 3: Absolute threshold — find first tau where cmnd dips below threshold
  // Skip very short periods (high frequencies above guitar range)
  const minTau = Math.floor(sampleRate / 1200); // ~1200 Hz max
  const maxTau = Math.floor(sampleRate / 60);    // ~60 Hz min (below low E)

  let bestTau = -1;
  for (let tau = minTau; tau < Math.min(maxTau, halfLen); tau++) {
    if (cmnd[tau] < threshold) {
      // Walk forward to find the local minimum
      while (tau + 1 < halfLen && cmnd[tau + 1] < cmnd[tau]) {
        tau++;
      }
      bestTau = tau;
      break;
    }
  }

  if (bestTau === -1) return null;

  // Step 4: Parabolic interpolation for sub-sample accuracy
  let refinedTau: number;
  if (bestTau > 0 && bestTau < halfLen - 1) {
    const s0 = cmnd[bestTau - 1];
    const s1 = cmnd[bestTau];
    const s2 = cmnd[bestTau + 1];
    const shift = (s0 - s2) / (2 * (s0 - 2 * s1 + s2));
    refinedTau = bestTau + (isFinite(shift) ? shift : 0);
  } else {
    refinedTau = bestTau;
  }

  // Step 5: Convert to frequency
  const frequency = sampleRate / refinedTau;
  const confidence = 1 - cmnd[bestTau];

  return { frequency, confidence };
}

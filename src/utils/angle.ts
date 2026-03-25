/**
 * Angle utilities for click wheel gesture processing.
 * All angles are in radians unless otherwise noted.
 */

/** Convert degrees to radians */
export function degToRad(degrees: number): number {
  'worklet';
  return (degrees * Math.PI) / 180;
}

/** Convert radians to degrees */
export function radToDeg(radians: number): number {
  'worklet';
  return (radians * 180) / Math.PI;
}

/** Calculate angle from center point to touch point */
export function getAngle(x: number, y: number, cx: number, cy: number): number {
  'worklet';
  return Math.atan2(y - cy, x - cx);
}

/** Calculate distance from center point to touch point */
export function getDistance(x: number, y: number, cx: number, cy: number): number {
  'worklet';
  return Math.sqrt((x - cx) ** 2 + (y - cy) ** 2);
}

/**
 * Calculate the angular delta between two angles, handling the -PI/PI wrapping boundary.
 * Returns a value in [-PI, PI].
 */
export function angleDelta(current: number, previous: number): number {
  'worklet';
  let delta = current - previous;
  if (delta > Math.PI) delta -= 2 * Math.PI;
  if (delta < -Math.PI) delta += 2 * Math.PI;
  return delta;
}

/**
 * Determine which tap zone an angle falls in.
 * Angle is measured from center of wheel, 0 = right, PI/2 = down, -PI/2 = up.
 * Returns the zone name for the iPod click wheel.
 */
export type TapZone = 'menu' | 'forward' | 'play_pause' | 'back';

export function getTapZone(angle: number): TapZone {
  'worklet';
  // Normalize to [0, 2PI) with 0 = top
  let normalized = angle + Math.PI / 2;
  if (normalized < 0) normalized += 2 * Math.PI;

  const degrees = (normalized * 180) / Math.PI;

  if (degrees >= 315 || degrees < 45) return 'menu';
  if (degrees >= 45 && degrees < 135) return 'forward';
  if (degrees >= 135 && degrees < 225) return 'play_pause';
  return 'back';
}

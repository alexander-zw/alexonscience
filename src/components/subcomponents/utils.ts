/**
 * Util functions that might be useful.
 */

export const EPSILON = 0.001; // No need to be too precise.

export function floatEqual(x: number, y: number) {
    return Math.abs(x - y) < EPSILON;
}

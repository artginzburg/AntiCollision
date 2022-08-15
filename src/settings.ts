export const settings = {
  drawTraces: true,
  /** If `true`, the balls will be colliding, but will not lose momentum. This could be seen as if the friction force was removed from the system. */
  useAntiCollisionBug: true,
  strokeBalls: false,
  dragWithMouseOver: false,
};

// @ts-expect-error to be able to control that from browser console
window.settings = settings;

export function toggleDrawTraces() {
  settings.drawTraces = !settings.drawTraces;
}

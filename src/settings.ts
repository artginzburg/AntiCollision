export const settings = {
  drawTraces: true,
};

// @ts-expect-error to be able to control that from browser console
window.settings = settings;

export function toggleDrawTraces() {
  settings.drawTraces = !settings.drawTraces;
}

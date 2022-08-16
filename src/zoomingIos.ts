/**
 * Disable pinch, tap, focus Zoom
 * on mobile devices.
 *
 * @see https://stackoverflow.com/a/61167156
 *
 * - {@link AddEventListenerOptions.passive} should be set to `false`.
 * - Tested in iOS Safari & Chrome only.
 */
export function preventNativeMobileZoom(event: TouchEventWithScale) {
  if (event.scale !== defaultBrowserScale) {
    event.preventDefault();
  }
}

export const defaultBrowserScale = 1;

type TouchEventWithScale = TouchEvent & {
  /**
   * @default 1
   * @see {@link defaultBrowserScale}
   */
  scale: number; // For some reason, TouchEvent doesn't have `scale`, bit it surely exists in iOS Safari & Chrome.
};

export function touchEventHasScale(event: TouchEvent): event is TouchEventWithScale {
  return (event as TouchEventWithScale).scale !== undefined;
}

export function isDeviceIOSLike() {
  return navigator.userAgent.match(/iPhone|iPad|iPod/i) !== null;
}

export function addKeyListener(key: string, callback: () => void) {
  window.addEventListener('keyup', (event) => {
    if (event.code === key || event.key === key) callback();
  });
}

/** The {@link duration} and {@link animationWait} are fine-tuned by hand to match iOS 15.5 */
export function addTouchHoldListener<T>(
  holdHandler: (ev?: TouchEvent) => T,
  /** Time in milliseconds that should pass until gesture is recognized. */
  duration = 500,
  /** Time in milliseconds that passes from gesture recognition to handler activation. */
  animationWait = 200,
) {
  window.addEventListener('touchstart', (ev) => {
    const holdTimeout = setTimeout(() => {
      setTimeout(() => {
        holdHandler(ev);
      }, animationWait);
    }, duration);

    window.addEventListener('touchend', clearHoldTimeout);
    window.addEventListener('touchmove', clearHoldTimeout);

    function clearHoldTimeout() {
      clearTimeout(holdTimeout);
    }
  });
}

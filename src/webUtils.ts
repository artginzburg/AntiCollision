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

/**
 * A tap listener that doesn't interfere with other mobile gestures (e.g. zoom).
 *
 * - Works with any number of fingers.
 *
 * @returns the listener function that can be used to remove the listener.
 */
export function addTapListener(
  tapHandler: (touchstartEvent: TouchEvent) => unknown,
  timeout = 300 as const,
): (ev: WindowEventMap['touchstart']) => void {
  window.addEventListener('touchstart', touchstartListener);

  function touchstartListener(touchstartEvent: WindowEventMap['touchstart']) {
    const touchendListener = () => {
      tapHandler(touchstartEvent);
      removeTouchmoveListener();
    };

    window.addEventListener('touchend', touchendListener, {
      once: true,
    });
    window.addEventListener('touchmove', removeTouchendListener, {
      once: true,
    });

    setTimeout(() => {
      removeTouchendListener();
      removeTouchmoveListener();
    }, timeout);

    function removeTouchendListener() {
      window.removeEventListener('touchend', touchendListener);
    }
    function removeTouchmoveListener() {
      window.removeEventListener('touchmove', removeTouchendListener);
    }
  }

  return touchstartListener;
}

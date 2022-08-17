export function addKeyListener(
  key: string,
  callback: () => void,
  /**
   * Most modern devices have a "Key Repeat" keyboard preference,
   * so `onDown` set to `true` will act as "hold to repeat callback".
   */
  onDown = false,
) {
  window.addEventListener(onDown ? 'keydown' : 'keyup', (event) => {
    if (event.code === key || event.key === key) callback();
  });
}

/**
 * The {@link duration} and {@link animationWait} are fine-tuned by hand to match iOS 15.5
 *
 * @returns the listener function that can be used to remove the listener.
 */
export function addTouchHoldListener<T>(
  holdHandler: (ev?: TouchEvent) => T,
  /** Time in milliseconds that should pass until gesture is recognized. */
  duration = 500,
  /** Time in milliseconds that passes from gesture recognition to handler activation. */
  animationWait = 200,
): (ev: WindowEventMap['touchstart']) => void {
  window.addEventListener('touchstart', touchstartListener);

  function touchstartListener(ev: WindowEventMap['touchstart']) {
    const holdTimeout = setTimeout(() => {
      setTimeout(() => {
        holdHandler(ev);
      }, animationWait);
      cleanupListeners();
    }, duration);

    window.addEventListener('touchend', touchendListener, {
      once: true,
    });
    window.addEventListener('touchmove', touchmoveListener, {
      once: true,
    });

    function touchendListener() {
      clearHoldTimeout();
      window.removeEventListener('touchmove', touchmoveListener);
    }
    function touchmoveListener() {
      clearHoldTimeout();
      window.removeEventListener('touchend', touchendListener);
    }

    function clearHoldTimeout() {
      clearTimeout(holdTimeout);
    }

    function cleanupListeners() {
      window.removeEventListener('touchend', touchendListener);
      window.removeEventListener('touchmove', touchmoveListener);
    }
  }

  return touchstartListener;
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

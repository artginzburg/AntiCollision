import { isDeviceIOSLike, preventNativeMobileZoom, touchEventHasScale } from './zoomingIos';

export let scale = 0.35

const minScale = 0.1
const maxScale = 3

const scalingSensitivity = {
  desktopInverted: 5000,
  mobileInverted: 500,
};

export function enableZoomingFeature() {
  let wheelPos = 0.1

  enableCustomDesktopZoom();

  const isIOSLike = isDeviceIOSLike();

  enableCustomMobileZoom();

  function enableCustomMobileZoom() {
    let lastDistance: number | null = null

    window.addEventListener('touchstart', ({ touches }) => {
      if (touches.length > 1) {
        lastDistance = distanceTouches(touches[0], touches[1])
      }
    })

    window.addEventListener('touchend', () => {
      lastDistance = null
    })

    window.addEventListener('touchmove', (event) => {
      if (isIOSLike) {
        if (!touchEventHasScale(event)) return; // TODO maybe we should not disable scroll completely if device has iOS, but `event.scale` is not present.
        preventNativeMobileZoom(event);
      }

      const { touches } = event;

      if (lastDistance !== null) {
        const distance = distanceTouches(touches[0], touches[1])
        const diff = distance - lastDistance
        updateScale(diff / scalingSensitivity.mobileInverted * getProportionalScalingFactor())
        lastDistance = distance
      }
    }, isIOSLike ? {
      /**
       * Required for event prevention.
       * @see preventNativeMobileZoom
       */
      passive: false,
    } : undefined)
  }

  function enableCustomDesktopZoom() {
    window.addEventListener('wheel', ({ deltaY }) => {
      updateScale(-deltaY / scalingSensitivity.desktopInverted * getProportionalScalingFactor())
    })
  }

  function updateScale(pos: number) {
    wheelPos += pos
    if (wheelPos < 0) wheelPos = 0
    if (wheelPos > 1) wheelPos = 1
    scale = wheelPos * (maxScale - minScale) + minScale
  }
}

function distanceTouches(touch1: Touch, touch2: Touch) {
  return getDistance(touch1.clientX, touch1.clientY, touch2.clientX, touch2.clientY);
}
function getDistance(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

/**
 * Makes sure that zooming feels the same no matter the current `scale`.
 *
 * Problem:
 * with the current `updateScale()` implementation, the scale gets harder to change when it gets higher (closer to the max scale). Respectively, it gets too easy to change when it gets closer to zero (or the min scale).
 * This happens due to the `wheelPos` getting multiplied by a constant, so the resulting scale changes exponentially instead of linearly.
 *
 * Solution: multiply the intended scale change by a factor that changes proportionally to the current scale, but is also affected by the median of possible scale.
 *
 * - Not sure exactly how this works, just tossed some numbers around.
 *
 * @returns (currently) a factor from 0.18 (aka `config.scalingEasiness`) to 5.39(9)
 */
function getProportionalScalingFactor() {
  const config = {
    /** Fine-tuned by trial and error. */
    scalingEasiness: 0.18,
  } as const;

  const medianBetweenMinMax = (minScale + maxScale) / 2; // 1.55

  /**
   * Seems to be tied to how fast the scaling actually happens if proportional scaling is not implemented.
   *
   * Called "abstract" because it doesn't correspond to any high-level logic introduced in the code.
   */
  const abstractDistanceToMax = Math.abs(-medianBetweenMinMax / scale);

  const maximumAbstractDistanceToMax = medianBetweenMinMax * 10;
  /**
   * Value from 1 to 0.03(3).
   * 1 means the scale is at its minimum.
   * 0.03(3) means the scale is at its maximum.
   */
  const percentageAbstractDistanceToMax = abstractDistanceToMax / maximumAbstractDistanceToMax;

  return config.scalingEasiness / percentageAbstractDistanceToMax;
}

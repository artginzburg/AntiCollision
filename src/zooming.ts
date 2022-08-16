import { defaultBrowserScale, isDeviceIOSLike, preventNativeMobileZoom, touchEventHasScale } from './zoomingIos';

export let scale = 0.35

const minScale = 0.1
const maxScale = 3

const scalingSensitivity = {
  desktopInverted: 5000,
  mobileInverted: 1000,
  iOS: 0.2,
};

export function enableZoomingFeature() {
  let wheelPos = 0.1

  enableCustomDesktopZoom();

  isDeviceIOSLike() ? enableCustomIOSZoom() : enableCustomMobileZoom();

  function enableCustomMobileZoom() {
    let initialDistance: number | null = null

    window.addEventListener('touchstart', ({ touches }) => {
      if (touches.length > 1) {
        initialDistance = distanceTouches(touches[0], touches[1])
      }
    })

    window.addEventListener('touchend', () => {
      initialDistance = null
    })

    window.addEventListener('touchmove', ({ touches }) => {
      if (initialDistance !== null) {
        const distance = distanceTouches(touches[0], touches[1])
        const diff = distance - initialDistance
        updateScale(diff / scalingSensitivity.mobileInverted)
      }
    })
  }

  function enableCustomDesktopZoom() {
    window.addEventListener('wheel', ({ deltaY }) => {
      updateScale(-deltaY / scalingSensitivity.desktopInverted)
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

function enableCustomIOSZoom() {
  window.addEventListener('touchmove', (event) => {
    if (!touchEventHasScale(event)) return;

    preventNativeMobileZoom(event);

    scale = calculateCustomIOSZoom(event.scale);
  }, {
    /**
     * Required for event prevention.
     * @see preventNativeMobileZoom
     */
    passive: false,
  });
}

function calculateCustomIOSZoom(eventScale: number) {
  const scaleChange = eventScale - defaultBrowserScale;
  const nextScale = scale + (scaleChange * scalingSensitivity.iOS);
  const nextScaleConstrained = Math.min(maxScale, Math.max(minScale, nextScale));

  return nextScaleConstrained;
}

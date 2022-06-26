export let scale = 0.35
export function enableZoomingFeature() {
  const minScale = 0.1
  let wheelPos = 0.1
  const maxScale = 3
  window.addEventListener('wheel', ({ deltaY }) => {
    updateScale(-deltaY / 5000)
  })

  let initialDistance: number | null = null

  window.addEventListener('touchstart', ({ touches }) => {
    if (touches.length > 1) {
      initialDistance = Math.sqrt(
        Math.pow(touches[0].clientX - touches[1].clientX, 2)
        + Math.pow(touches[0].clientY - touches[1].clientY, 2)
      )
    }
  })

  window.addEventListener('touchend', () => {
    initialDistance = null
  })

  window.addEventListener('touchmove', ({ touches }) => {
    if (initialDistance !== null) {
      const distance = Math.sqrt(
        Math.pow(touches[0].clientX - touches[1].clientX, 2)
        + Math.pow(touches[0].clientY - touches[1].clientY, 2)
      )
      const diff = distance - initialDistance
      updateScale(diff / 1000)
    }
  })

  function updateScale(pos: number) {
    wheelPos += pos
    if (wheelPos < 0) wheelPos = 0
    if (wheelPos > 1) wheelPos = 1
    scale = wheelPos * (maxScale - minScale) + minScale
  }
}

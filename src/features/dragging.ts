import { focusedBall } from '../focusBallAtMousePosition';
import { addKeyListener } from '../webUtils';
import { scale } from '../zooming';

import type { Vector2Literal } from '../types';
import type { Vector2 } from '../vector';

let isDragging = false;
export let lastDraggedTo: Vector2Literal | null = null;

/**
 * @todo
 * - Implement the same on mobiles.
 * - Don't interfere with ball focusing.
 */
export function enableDraggingFeature() {
  window.addEventListener('mouseup', () => {
    dragEnd();
  });
  addKeyListener('Escape', () => {
    dragReset();
  });
}

export function updateLastDraggedTo(event: Pick<MouseEvent, 'movementX' | 'movementY'>) {
  if (!isDragging || !lastDraggedTo || focusedBall) return;

  lastDraggedTo = {
    x: lastDraggedTo.x - event.movementX / scale,
    y: lastDraggedTo.y - event.movementY / scale,
  };
}

export function dragStart(center_of_mass: Vector2) {
  if (focusedBall) return;
  isDragging = true;

  if (!lastDraggedTo) {
    lastDraggedTo = { x: center_of_mass.x, y: center_of_mass.y };
  }
}
function dragEnd() {
  isDragging = false;
}

function dragReset() {
  lastDraggedTo = null;
}

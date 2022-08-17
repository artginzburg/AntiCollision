import type { Ball } from './ball';
import type { Vector2Literal } from './types';
import type { Vector2 } from './vector';
import { addKeyListener, addTapListener } from './webUtils';

export let focusedBall: Ball | null;

export function enableFocusBallAtMousePositionFeature(
  balls: Ball[],
  getCtxMousePosition: (position: Vector2Literal) => Vector2,
  getBallAt: (position: Vector2, ballsForGet: Ball[]) => Ball | null,
) {
  window.addEventListener('click', focusBall);
  addTapListener((event) => {
    if (event.touches.length !== 1) return;

    const touch = event.touches[0];
    focusBall({
      x: touch.clientX,
      y: touch.clientY,
    });
  });
  addKeyListener('Escape', () => {
    focusedBall = null;
  });

  function focusBall(pointerPosition: Vector2Literal) {
    const mousePosition = getCtxMousePosition(pointerPosition);
    const ball = getBallAt(mousePosition, balls);

    setFocusedBall(ball);
  }
}

function setFocusedBall(clickedBall: Ball | null) {
  if (!clickedBall) return;

  const isClickedBallAlreadyFocused = focusedBall === clickedBall;
  focusedBall = isClickedBallAlreadyFocused ? null : clickedBall;
}

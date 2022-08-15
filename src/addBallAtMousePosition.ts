import type { Vector2 } from './vector';
import { getRange } from './random';
import { Ball } from './ball';

export function enableAddBallAtMousePositionFeature(balls: Ball[], getCtxMousePosition: (position: { x: number; y: number }) => Vector2, minSize: number, maxSize: number) {
  window.addEventListener('click', (event) => {
    const newBallPosition = getCtxMousePosition(event);
    balls.push(
      new Ball(
        newBallPosition.x,
        newBallPosition.y,
        getRange(minSize, maxSize),
      )
    )
  });
}

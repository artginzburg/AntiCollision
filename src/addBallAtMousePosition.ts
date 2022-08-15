import type { Vector2 } from './vector';
import { getRange } from './random';
import { Ball } from './ball';
import type { Vector2Literal } from './types';

export function enableAddBallAtMousePositionFeature(balls: Ball[], getCtxMousePosition: (position: Vector2Literal) => Vector2, minSize: number, maxSize: number) {
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

import type { Vector2 } from './vector';
import { getRange } from './random';
import { Ball } from './ball';
import type { Vector2Literal } from './types';
import { handleNewBallStableScore } from './ballScoring';

/**
 * Add a ball by right-clicking on the canvas.
 */
export function enableAddBallAtMousePositionFeature(balls: Ball[], getCtxMousePosition: (position: Vector2Literal) => Vector2, minSize: number, maxSize: number) {
  window.addEventListener('contextmenu', (event) => {
    event.preventDefault();

    const newBallPosition = getCtxMousePosition(event);
    const newBall = new Ball(
      newBallPosition.x,
      newBallPosition.y,
      getRange(minSize, maxSize),
    );

    handleNewBallStableScore(balls, newBall);

    balls.push(
      newBall
    )
  });
}

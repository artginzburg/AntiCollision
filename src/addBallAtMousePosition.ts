import { Vector2 } from './vector';
import { getRange } from './random';
import { Ball } from './ball';
import { scale } from './zooming';

export function enableAddBallAtMousePositionFeature(balls: Ball[], getCtxTranslation: () => readonly [number, number], minSize: number, maxSize: number) {
  window.addEventListener('click', (event) => {
    const mousePosition = new Vector2(event.x, event.y);

    const [ctxTranslationX, ctxTranslationY] = getCtxTranslation();
    const ctxTranslation = new Vector2(ctxTranslationX, ctxTranslationY);

    const newBallPosition = mousePosition.div(scale).sub(ctxTranslation);
    balls.push(
      new Ball(
        newBallPosition.x,
        newBallPosition.y,
        getRange(minSize, maxSize),
      )
    )
  });
}

import { settings } from './settings';
import type { Ball } from './ball';
import type { Vector2Literal } from './types';
import type { Vector2 } from './vector';

const mouseAttractionMultiplier = {
  /**
   * Controls the "stickiness" of the mouse (how much does the ball "click in" to the mouse position).
   *
   * - Value larger than `0.02` is not recommended since it makes the ball tremble (teleport) weirdly, sometimes even further than the ball's radius.
   * @default 0.01
   */
  position: 0.01,
  /**
   * Controls how much do the ball's direction and speed change towards the mouse position.
   *
   * Examples:
   * - `0` keeps the ball's velocity as it is.
   * - `0.2` makes the ball's movement wobbly, but also smooth.
   * - `1` makes the mouse able to "launch" the ball easily.
   * @default 0.5
   */
  velocity: 0.5,
} as const;

export function constructDragWithMouseOver(
  getCtxMousePosition: (position: Vector2Literal) => Vector2,
  mousePos: Vector2Literal,
) {
  if (!settings.dragWithMouseOver) return undefined;

  const ctxMousePosition = getCtxMousePosition(mousePos);

  return function dragWithMouseOver(current_ball: Ball) {
    const mouse_collide_vec = ctxMousePosition.sub(current_ball.position);
    const mouse_dist = Math.sqrt(
      mouse_collide_vec.x * mouse_collide_vec.x + mouse_collide_vec.y * mouse_collide_vec.y,
    );
    const min_mouse_dist = current_ball.r;

    if (mouse_dist < min_mouse_dist) {
      current_ball.position = current_ball.position.add(
        mouse_collide_vec.mul(mouseAttractionMultiplier.position * (min_mouse_dist - mouse_dist)),
      );
      current_ball.velocity = current_ball.velocity.add(
        mouse_collide_vec.mul(mouseAttractionMultiplier.velocity * (min_mouse_dist - mouse_dist)),
      );
    }
  };
}

import type { Ball } from '../ball';
import { settings } from '../settings';
import type { Vector2 } from '../vector';

export function bounceOnCollision(
  collide_axe: Vector2,
  minDist: number,
  current_ball: Ball,
  collider: Ball,
) {
  const bounciness = settings.bounciness * 100; // fine-tuned by hand.
  const bounce_vec = collide_axe.mul(minDist * bounciness * -1);
  current_ball.velocity = current_ball.velocity.sub(bounce_vec.div(current_ball.r));
  collider.velocity = collider.velocity.add(bounce_vec.div(collider.r));
}

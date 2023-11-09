import type { Ball } from './ball';
import { Vector3ColorTools } from './vector';

// For usage inside the Scene (such class is not constructed yet, but it would be logically called that).

/** The ball with the least score is considered the most interesting to watch. */
export function updateBallHasLeastStableScore(ballsToUpdate: Ball[]) {
  // TODO track whether the user is focused on the ball with least stable score (for stats).
  const ballWithLeastStableScore = ballsToUpdate.reduce((acc, ball) => acc.stableScore < ball.stableScore ? acc : ball);
  ballsToUpdate.forEach(ball => {
    ball.hasLeastStableScore = false;
  });
  ballWithLeastStableScore.hasLeastStableScore = true;
}
export function updateBallStableScore(ball: Ball) {
  ball.stableScore += ball.stableCount;
}

// For usage when spawning a new ball.
export function handleNewBallStableScore(balls: Ball[], newBall: Ball) {
  const ballWithLeastStableScore = balls.find(ball => ball.hasLeastStableScore);
  if (ballWithLeastStableScore) {
    newBall.stableScore = ballWithLeastStableScore.stableScore;
  }
}

// For usage inside the Ball class.
export function drawBallStableScore(ctx: CanvasRenderingContext2D, ball: Ball) {
  if (!ball.hasLeastStableScore) return;

  ctx.fillStyle = Vector3ColorTools.invert(ball.color!).toRGBA(0.87); // 0.87 = HEX d

  ctx.beginPath();
  ctx.arc(ball.position.x, ball.position.y, ball.r / 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.closePath();
}

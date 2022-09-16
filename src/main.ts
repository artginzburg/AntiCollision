import { Ball } from './ball';
import { getRange, getUnder } from './random';
import { settings, toggleDrawTraces } from './settings';
import { stable_color, unstable_color } from './shared';
import { Vector2, Vector2Tools } from './vector';
import { enableAddBallAtMousePositionFeature } from './addBallAtMousePosition';
import { enableZoomingFeature, scale } from './zooming';
import { constructDragWithMouseOver } from './dragWithMouseOver';
import { enableFocusBallAtMousePositionFeature, focusedBall } from './focusBallAtMousePosition';
import { addKeyListener, addTouchHoldListener } from './webUtils';
import type { Vector2Literal } from './types';
import { enableBallControls } from './ballControls';
import { updateBallHasLeastStableScore, updateBallStableScore } from './ballScoring';

const $canvas = document.querySelector('canvas')!;
const ctx = $canvas.getContext('2d')!;

handleResize()

window.addEventListener('resize', handleResize)

function handleResize() {
  $canvas.width = window.innerWidth;
  $canvas.height = window.innerHeight;
}

enableZoomingFeature();

let speedDownFactor = 1;
let speedDownCounter = 1;
let waitingSpeedFactor = 1;
let speedDownFactorGoal = 1;


const nBalls = 20;
const maxSize = 5;
const minSize = 70;

let iterations = 0

const spawn_range_factor = 0.5;
const balls: Ball[] = [];
for (let i = 0; i < nBalls; i++) {
  const angle = getUnder(2 * Math.PI);
  const radius = 350.0;

  const start_x = radius * Math.cos(angle);
  const start_y = radius * Math.sin(angle);

  balls.push(
    new Ball(
      start_x + $canvas.width * 0.5,
      start_y + $canvas.height * 0.5,
      getRange(minSize, maxSize)
    )
  );
}

enableAddBallAtMousePositionFeature(balls, getCtxMousePosition, minSize, maxSize);
enableFocusBallAtMousePositionFeature(balls, getCtxMousePosition, getBallAt);
enableBallControls();

addKeyListener('Space', toggleSlowMotion);
addTouchHoldListener(toggleSlowMotion);
addKeyListener('a', toggleDrawTraces)

function toggleSlowMotion() {
  speedDownFactorGoal = speedDownFactor === 1 ? 10.0 : 1.0;
}

let ok_count = 0;

const mousePos = { x: 0, y: 0 };
window.addEventListener('mousemove', (event) => {
  mousePos.x = event.x;
  mousePos.y = event.y;
});

window.requestAnimationFrame(animate);

let center_of_mass: Vector2;

function animate(delta: DOMHighResTimeStamp): void {
  if (waitingSpeedFactor !== speedDownFactorGoal) {
    waitingSpeedFactor += speedDownFactorGoal - waitingSpeedFactor;
  }

  let stable = true;
  if (!speedDownCounter) {
    for (const ball of balls) {
      ball.stable = true;
      ball.save();
    }

    stable = update(balls, 1);
    if (!stable && ok_count < 200) {
      ok_count = 0;
    }

    if (stable) {
      ++ok_count;
    }

    if (waitingSpeedFactor) {
      speedDownFactor = waitingSpeedFactor;
    }
    speedDownCounter = speedDownFactor;
  }

  updatePos(balls, speedDownFactor);

  center_of_mass = new Vector2(0, 0);

  for (const b of balls) {
    const stable_ratio =
      ok_count > 199 ? 1.0 : Math.min(1.0, b.stableCount / 255.0);
    const color = stable_color
      .mul(stable_ratio)
      .add(unstable_color.mul(1.0 - stable_ratio));

    let r = b.r;

    if (speedDownFactor > 1) r = b.r;

    center_of_mass = center_of_mass.add(b.position);

    b.color = color
  }
  center_of_mass = center_of_mass.div(balls.length);

  ctx.clearRect(0, 0, $canvas.width, $canvas.height);
  ctx.save()
  ctx.scale(scale, scale)
  ctx.translate(...getCtxTranslation())

  balls.forEach(b => b.draw(ctx))
  ctx.fillStyle = 'purple'
  ctx.beginPath()
  ctx.arc(center_of_mass.x, center_of_mass.y, 10, 0, Math.PI * 2)
  ctx.fill()
  ctx.closePath()
  ctx.restore()

  iterations++;

  window.requestAnimationFrame(animate);
}

function getCtxTranslation() {
  return calculateFocus(focusedBall ? focusedBall.position : center_of_mass);
}
function calculateFocus(position: Vector2Literal) {
  return [
    -position.x + $canvas.width * 0.5 * 1 / scale,
    -position.y + $canvas.height * 0.5 * 1 / scale
  ] as const;
}
function getCtxMousePosition(position: Vector2Literal) {
  const mousePosition = new Vector2(position.x, position.y);
  const [ctxTranslationX, ctxTranslationY] = getCtxTranslation();
  const ctxTranslation = new Vector2(ctxTranslationX, ctxTranslationY);
  return mousePosition.div(scale).sub(ctxTranslation);
}

function update(ballsToUpdate: Ball[], speed: number) {
  let stable = true;

  updateBallHasLeastStableScore(ballsToUpdate);

  const nBallsForUpdate = ballsToUpdate.length;
  const attraction_force_bug = 0.01;
  const center_position = new Vector2($canvas.width * 0.5, $canvas.width * 0.5);

  const dragWithMouseOver = constructDragWithMouseOver(getCtxMousePosition, mousePos);

  for (let i = 0; i < nBallsForUpdate; i++) {
    const current_ball = ballsToUpdate[i];
    // Attraction to center
    const to_center = center_position.sub(current_ball.position);
    current_ball.velocity = current_ball.velocity.add(
      to_center.mul(attraction_force_bug)
    );

    dragWithMouseOver?.(current_ball);

    for (let k = i + 1; k < nBallsForUpdate; k++) {
      const collider = ballsToUpdate[k];
      const collide_vec = current_ball.position.sub(collider.position);
      const dist = Vector2Tools.length(collide_vec);

      const minDist = current_ball.r + collider.r;

      if (dist < minDist) {
        // Collision happened.
        // This also includes the case when the balls are barely touching each other.
        stable = false;

        current_ball.stable = false;
        collider.stable = false;

        const collide_axe = collide_vec.div(dist);

        current_ball.position = current_ball.position.add(
          collide_axe.mul(0.5 * (minDist - dist))
        );
        collider.position = collider.position.sub(
          collide_axe.mul(0.5 * (minDist - dist))
        );
        if (!settings.useAntiCollisionBug) {
          current_ball.velocity = current_ball.velocity.add(
            collide_axe.mul(0.5 * (minDist - dist))
          );
          collider.velocity = collider.velocity.sub(
            collide_axe.mul(0.5 * (minDist - dist))
          );
        }
      }
    }
  }

  for (let i = 0; i < nBallsForUpdate; i++) {
    if (ballsToUpdate[i].stable) ballsToUpdate[i].stableCount++;
    else ballsToUpdate[i].stableCount = 0;

    updateBallStableScore(ballsToUpdate[i]);
  }

  return stable;
}

function getBallAt(position: Vector2, ballsForGet: Ball[]) {
  for (const ball of ballsForGet) {
    const v = position.sub(ball.position);
    const dist = Vector2Tools.length(v);
    if (dist < ball.r) {
      return ball;
    }
  }

  return null;
}

function updatePos(
  ballsToUpdatePos: Ball[],
  speedDownFactorForUpdatePos: number,
) {
  const dt = 0.016;
  for (const currentBall of ballsToUpdatePos) {
    currentBall.position = currentBall.position.add(
      currentBall.velocity.mul(dt / speedDownFactorForUpdatePos)
    );
  }

  speedDownCounter--;
}

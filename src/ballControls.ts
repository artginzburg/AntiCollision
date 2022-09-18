import type { Ball } from './ball';
import { focusedBall } from './focusBallAtMousePosition';
import { Vector2Tools } from './vector';
import { addKeyListener } from './webUtils';

const controls = {
  radius: {
    increment: ']',
    decrement: '[',
    /** Shift + Right Bracket = Right Curly Bracket */
    incrementFast: '}',
    /** Shift + Left Bracket = Left Curly Bracket */
    decrementFast: '{',
  },
  velocity: {
    increment: 'ArrowUp',
    decrement: 'ArrowDown',
    rotateLeft: 'ArrowLeft',
    rotateRight: 'ArrowRight',
  },
} as const;
const sensitivities = {
  radius: {
    default: 0.1,
    fast: 0.3,
  },
  velocity: {
    default: 0.2,
  },
} as const;

export function enableBallControls(balls: Ball[]) {
  enableBallRadiusControl(balls);
  enableBallVelocityControl(balls);
}

function enableBallRadiusControl(balls: Ball[]) {
  addKeyListener(
    controls.radius.increment,
    () => {
      doForFocusedOrAllBalls(balls, (ball) => {
        ballUpdateRadius(ball, sensitivities.radius.default);
      });
    },
    true,
  );
  addKeyListener(
    controls.radius.decrement,
    () => {
      doForFocusedOrAllBalls(balls, (ball) => {
        ballUpdateRadius(ball, -sensitivities.radius.default);
      });
    },
    true,
  );
  addKeyListener(
    controls.radius.incrementFast,
    () => {
      doForFocusedOrAllBalls(balls, (ball) => {
        ballUpdateRadius(ball, sensitivities.radius.fast);
      });
    },
    true,
  );
  addKeyListener(
    controls.radius.decrementFast,
    () => {
      doForFocusedOrAllBalls(balls, (ball) => {
        ballUpdateRadius(ball, -sensitivities.radius.fast);
      });
    },
    true,
  );
}
function enableBallVelocityControl(balls: Ball[]) {
  addKeyListener(
    controls.velocity.increment,
    () => {
      doForFocusedOrAllBalls(balls, ballIncreaseVelocity);
    },
    true,
  );
  addKeyListener(
    controls.velocity.decrement,
    () => {
      doForFocusedOrAllBalls(balls, ballDecreaseVelocity);
    },
    true,
  );
  addKeyListener(
    controls.velocity.rotateLeft,
    () => {
      doForFocusedOrAllBalls(balls, ballSteerLeft);
    },
    true,
  );
  addKeyListener(
    controls.velocity.rotateRight,
    () => {
      doForFocusedOrAllBalls(balls, ballSteerRight);
    },
    true,
  );
}

/** @mutates {@link Ball.r} */
function ballUpdateRadius(ball: Ball, rChangePercentage: number) {
  const rNext = ball.r + ball.r * rChangePercentage;
  /** Same as `minSize` from [main.ts](./main.ts) for now. */
  const minSize = 5;
  ball.r = Math.max(rNext, minSize);
}

function doForFocusedOrAllBalls(balls: Ball[], callback: (ball: Ball) => void) {
  if (focusedBall) {
    callback(focusedBall);
  } else {
    for (const ball of balls) {
      callback(ball);
    }
  }
}

function ballIncreaseVelocity(ball: Ball) {
  ball.velocity = ball.velocity.mul(1 + sensitivities.velocity.default);
}
function ballDecreaseVelocity(ball: Ball) {
  ball.velocity = ball.velocity.mul(1 - sensitivities.velocity.default);
}

function ballSteerLeft(ball: Ball) {
  ball.velocity = Vector2Tools.rotate(
    ball.velocity,
    sensitivities.velocity.default,
    Vector2Tools.RotationDirection.Left,
  );
}
function ballSteerRight(ball: Ball) {
  ball.velocity = Vector2Tools.rotate(
    ball.velocity,
    sensitivities.velocity.default,
    Vector2Tools.RotationDirection.Right,
  );
}

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

export function enableBallControls() {
  enableBallRadiusControl();
  enableBallVelocityControl();
}

function enableBallRadiusControl() {
  addKeyListener(
    controls.radius.increment,
    () => {
      if (focusedBall) {
        ballUpdateRadius(focusedBall, sensitivities.radius.default);
      }
    },
    true,
  );
  addKeyListener(
    controls.radius.decrement,
    () => {
      if (focusedBall) {
        ballUpdateRadius(focusedBall, -sensitivities.radius.default);
      }
    },
    true,
  );
  addKeyListener(
    controls.radius.incrementFast,
    () => {
      if (focusedBall) {
        ballUpdateRadius(focusedBall, sensitivities.radius.fast);
      }
    },
    true,
  );
  addKeyListener(
    controls.radius.decrementFast,
    () => {
      if (focusedBall) {
        ballUpdateRadius(focusedBall, -sensitivities.radius.fast);
      }
    },
    true,
  );
}
function enableBallVelocityControl() {
  addKeyListener(
    controls.velocity.increment,
    () => {
      if (focusedBall) {
        focusedBall.velocity = focusedBall.velocity.mul(1 + sensitivities.velocity.default);
      }
    },
    true,
  );
  addKeyListener(
    controls.velocity.decrement,
    () => {
      if (focusedBall) {
        focusedBall.velocity = focusedBall.velocity.mul(1 - sensitivities.velocity.default);
      }
    },
    true,
  );
  addKeyListener(
    controls.velocity.rotateLeft,
    () => {
      if (focusedBall) {
        focusedBall.velocity = Vector2Tools.rotate(
          focusedBall.velocity,
          sensitivities.velocity.default,
          Vector2Tools.RotationDirection.Left,
        );
      }
    },
    true,
  );
  addKeyListener(
    controls.velocity.rotateRight,
    () => {
      if (focusedBall) {
        focusedBall.velocity = Vector2Tools.rotate(
          focusedBall.velocity,
          sensitivities.velocity.default,
          Vector2Tools.RotationDirection.Right,
        );
      }
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

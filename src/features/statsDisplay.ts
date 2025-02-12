import { roundToDecimals } from '../modules/common';
import type { EngineWithStats } from '../modules/engine';
import type { Ball } from '../ball';

const statsDisplay: HTMLSpanElement = document.querySelector('#stats')!;

export function updateStatsDisplay(engine: EngineWithStats, speedDownFactor: number, scale: number, balls: Ball[]) {
  if (window.getComputedStyle(statsDisplay).opacity === '0') return;

  const stats = [
    `FPS: ${engine.getFPS()}`,
    `Speed: ${engine.getUPS()}${speedDownFactor === 1 ? '' : ` / ${speedDownFactor}`}`,
    `Zoom: ${roundToDecimals(scale, 2)}`,
    `Balls: ${balls.length}`,
    `Approximate Stability: ${percentageOf(balls, (ball) => ball.stableCount > 255)}`,
    `Recommended Maximum Speed: ${engine.getRecommendedMaximumUPS()}`
  ];
  statsDisplay.innerText = stats.join('; ');
}

let statsDisplayHidingTimeout: number | undefined;
/** @todo add an option to focus on a specific stat (darkening others) */
export function makeStatsDisplayVisibleBriefly(hideAfter = 500) {
  clearTimeout(statsDisplayHidingTimeout);

  statsDisplay.style.opacity = '1';
  statsDisplayHidingTimeout = setTimeout(() => {
    statsDisplay.style.opacity = '';
  }, hideAfter);
}

function percentageOf<T>(arr: T[], predicate: (value: T, index: number, array: T[]) => unknown) {
  return `${Math.round((arr.filter(predicate).length / arr.length) * 100)}%`;
}

import { roundToDecimals } from '../modules/common';
import type { EngineWithStats } from '../modules/engine';
import type { Ball } from '../ball';

const statsDisplay: HTMLSpanElement = document.querySelector('#stats')!;

let statsDisplayLastUpdated = 0;
const maxStatsDisplayUpdatesPerSecond = 30;
const minTimeDifferenceToUpdate = 1 / maxStatsDisplayUpdatesPerSecond * 1000;
export function updateStatsDisplay(engine: EngineWithStats, speedDownFactor: number, scale: number, balls: Ball[]) {
  if (window.getComputedStyle(statsDisplay).opacity === '0') return;

  const newStatsDisplayLastUpdated = Date.now();
  const timeDifferenceBetweenUpdates = newStatsDisplayLastUpdated - statsDisplayLastUpdated;
  if (timeDifferenceBetweenUpdates < minTimeDifferenceToUpdate) return;

  const stats = [
    `FPS: ${engine.getFPS()}`,
    `Speed: ${engine.getUPS()}${speedDownFactor === 1 ? '' : ` / ${speedDownFactor}`}`,
    `Zoom: ${roundToDecimals(scale, 2)}`,
    `Balls: ${balls.length}`,
    `Approximate Stability: ${percentageOf(balls, (ball) => ball.stableCount > 255)}`,
    `Recommended Maximum Speed: ${engine.getRecommendedMaximumUPS()}`
  ];
  statsDisplay.innerText = stats.join('; ');

  statsDisplayLastUpdated = newStatsDisplayLastUpdated;
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

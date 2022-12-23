import { addKeyListener } from './webUtils';
import { EngineWithStats } from './modules/engine';
import type { Engine } from './modules/engine';
import { makeStatsDisplayVisibleBriefly } from './features/statsDisplay';

export function enableEngineControls(engine: AnyEngine) {
  addKeyListener('KeyJ', getDecreaseSimulationSpeed(engine), true);
  addKeyListener('KeyL', getIncreaseSimulationSpeed(engine), true);
}

function getDecreaseSimulationSpeed(engine: AnyEngine) {
  return () => {
    makeStatsDisplayVisibleBriefly();
    engine.time_step = Math.min(600, engine.time_step * 1.1);
  };
}

function getIncreaseSimulationSpeed(engine: AnyEngine) {
  const controlTimeStepMultiplier = 0.9;

  const engineHasStats = engine instanceof EngineWithStats;

  return () => {
    makeStatsDisplayVisibleBriefly();
    const new_time_step = engine.time_step * controlTimeStepMultiplier;

    if (engineHasStats) {
      const upsOfNewTimeStep = Math.round(1000 / new_time_step);

      const fineTunedMaximumUPSMultiplier = 0.9; // This system cannot perfectly measure how much updates can we do per second (or it can, but it's not very consistent), so I'm lowering that value a bit in order to prevent us from going into lagging.
      const fineTunedMaximumUPS = engine.getRecommendedMaximumUPS() * fineTunedMaximumUPSMultiplier;

      const hasNotReachedMaximumUPS = upsOfNewTimeStep <= fineTunedMaximumUPS;

      if (hasNotReachedMaximumUPS) {
        engine.time_step = new_time_step;
      } else {
        // TODO show the user that he has reached the maximum recommended UPS.
        const activeCorrectionTimeStep = 1000 / fineTunedMaximumUPS;
        if (activeCorrectionTimeStep < engine.time_step) {
          engine.time_step = activeCorrectionTimeStep; // This is kinda "active correction", but it's jumpy, so I don't really like it.
        }
      }
    } else {
      engine.time_step = new_time_step;
    }
  };
}

type AnyEngine = Engine | EngineWithStats;

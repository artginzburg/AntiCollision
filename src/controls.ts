import { addKeyListener } from './webUtils';
import type { Engine } from './modules/engine';

export function enableEngineControls(engine: Engine) {
  addKeyListener('KeyJ', () => {
    engine.time_step = Math.min(600, engine.time_step * 1.1);
  }, true);
  addKeyListener('KeyL', () => {
    engine.time_step = engine.time_step * 0.9;
  }, true);
}

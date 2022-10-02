/**
 * A fixed time-step loop simulation engine.
 * @author Frank Poth <https://github.com/frankarendpoth>
 */
export class Engine {

  animation_frame_request: number | undefined;
  accumulated_time: number;
  time: number;
  private startCycle: (time_stamp: number) => void;

  constructor(
    public update: CallableFunction,
    public render: CallableFunction,
    /**
     * @example
     * 1000/30 // Run 30 Frames Per Second
     */
    public time_step: number,
  ) {

    this.animation_frame_request = undefined;

    this.accumulated_time = time_step;
    this.time = 0;

    this.startCycle = (time_stamp) => { this.cycle(time_stamp); };

  }

  protected cycle(time_stamp: number) {

    this.animation_frame_request = window.requestAnimationFrame(this.startCycle);

    this.accumulated_time += time_stamp - this.time;
    this.time = time_stamp;

    let updated = false;

    if (this.accumulated_time > 1000) this.accumulated_time = this.time_step;

    while(this.accumulated_time > this.time_step) {

      this.accumulated_time -= this.time_step;

      this.update(time_stamp);

      updated = true;

    }

    if (updated) this.render();

    return updated;

  }

  public start() {

    this.animation_frame_request = window.requestAnimationFrame(this.startCycle);

  }

  public stop() {

    window.cancelAnimationFrame(this.animation_frame_request!);

  }

}

export class EngineWithStats extends Engine {

  private renderHistory: number[] = [];

  /** How much renders happened in the last second of time. */
  getFPS() {

    this.renderHistory = this.renderHistory.filter(
      (renderDate) => renderDate > (Date.now() - 1000),
    );

    return this.renderHistory.length;

  }

  /** Updates per second goal. */
  getUPS() {

    return Math.round(1000 / this.time_step);

  }

  protected override cycle(time_stamp: number) {

    const rendered = super.cycle(time_stamp);

    if (rendered) {
      this.renderHistory.push(Date.now());
    }

    return rendered;
  }

}

/**
 * A fixed time-step loop simulation engine.
 * @author Frank Poth
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

  private cycle(time_stamp: number) {

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

  }

  public start() {

    this.animation_frame_request = window.requestAnimationFrame(this.startCycle);

  }

  public stop() {

    window.cancelAnimationFrame(this.animation_frame_request!);

  }

}

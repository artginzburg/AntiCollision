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
  private maximumSpeedHistory: number[] = [];

  /**
   * How much renders happened in the last second of time.
   *
   * @todo this method requires a lot of processing power. Simplify it. Can be tested by putting `engine.getFPS()` into some part of code that runs frequently. The recommended maximum UPS will drop significantly.
   */
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

    const updateStartedAt = performance.now();

    const rendered = super.cycle(time_stamp);

    const updateEndedAt = performance.now();

    const thisUpdateCycleTook = updateEndedAt - updateStartedAt; // milliseconds

    this.handleMaximumUPSCalculation(thisUpdateCycleTook);

    if (rendered) {
      this.renderHistory.push(Date.now());
    }

    return rendered;
  }

  private handleMaximumUPSCalculation(thisUpdateCycleTook: number) {
    const fpsGoal = Math.max(30, this.getFPS()); // TODO! set the actual framerate of the monitor here. Without this, the feature is useless for anyone with another framerate.

    const howMuchUpdateCyclesCanWeProcessInASecond = 1000 / thisUpdateCycleTook;

    const howMuchDoesItLag = fpsGoal / howMuchUpdateCyclesCanWeProcessInASecond; // If this value is > 1, the simulation will lag (e.g. not being able to exceed 30 fps).

    const howMuchTimesCanWeIncreaseUPSGoalToNotLag = 1 / howMuchDoesItLag;

    const upsGoal = this.getUPS();

    const maximumSpeed = upsGoal * howMuchTimesCanWeIncreaseUPSGoalToNotLag;

    const doesFPSLagNow = howMuchDoesItLag > 1;

    if (maximumSpeed !== Infinity) {
      if (!doesFPSLagNow) {
        this.maximumSpeedHistory.push(maximumSpeed);
      } else {
        const fineTunedHowMuchDoesItLagMultiplier = 0.9;
        this.maximumSpeedHistory.push(maximumSpeed / (howMuchDoesItLag * fineTunedHowMuchDoesItLagMultiplier));
      }
    }

    const maximumSpeedHistoryMaxLength = 50;

    if (this.maximumSpeedHistory.length >= maximumSpeedHistoryMaxLength) {
      this.maximumSpeedHistory.shift();
    }
  }

  /** This works inconsistently right now. E.g. if the current UPS goal is 60, it shows the recommended cap at around 1000 UPS, whilst in reality I can set it at 100000 without any lag (though the cap corrects over time if the user starts to increase the UPS goal). */
  public getRecommendedMaximumUPS() {
    return Math.round(this.maximumSpeedHistory.reduce((prev, cur) => prev + cur, 0) / this.maximumSpeedHistory.length)
  }

}

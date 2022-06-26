import { getRange } from './random';
import { settings } from './settings';
import { Vector2, Vector3 } from './vector';

const max_history = 100

export class Ball {
  position: Vector2;
  public velocity: Vector2;
  color: Vector3 | undefined;

  private readonly position_history: Vector2[];
  private current_idx: number;

  public stable: boolean | undefined;
  public stableCount: number;

  constructor(
    x: number,
    y: number,
    /** Radius */
    readonly r: number
  ) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(getRange(-4, 4), getRange(-4, 4));
    this.r = r;
    this.position_history = [];
    this.current_idx = 0;

    for (let i = 0; i < max_history; i += 1) {
      // TODO why not use `Array.fill()` instead of a loop?
      this.position_history.push(new Vector2(x, y)); // TODO why not use `this.position` instead of `new Vector2(x, y)`?
    }
    this.stableCount = 0;
  }

  public save() {
    this.position_history[this.current_idx] = this.position;
    this.current_idx = ++this.current_idx % max_history;
  }

  private getVA() {
    const va: Ball[] = [];
    for (let i = 0; i < max_history; ++i) {
      const actual_idx = (i + this.current_idx) % max_history;
      const ratio = i / max_history;
      if (!va[i]) {
        va[i] = {} as Ball;
      }
      va[i].position = this.position_history[actual_idx];
      const color = ratio * 255;
      va[i].color = new Vector3(0, color, 0);
    }

    return va;
  }

  public draw(ctx: CanvasRenderingContext2D) {
    if (settings.drawTraces) this.drawTrace(ctx);
    ctx.fillStyle = this.color!.toRGB()
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    // console.log(this.position)
  }

  private drawTrace(ctx: CanvasRenderingContext2D) {
    const trace = this.getVA();
    const farthestTracePointPosition = trace[0].position;

    ctx.beginPath()
    trace.forEach((ball) => {
      ctx.lineTo(ball.position.x, ball.position.y);
    })
    ctx.moveTo(farthestTracePointPosition.x, farthestTracePointPosition.y);
    ctx.closePath()

    // ctx.lineWidth = 1; // Trail width
    this.applyTraceColor(ctx, farthestTracePointPosition);
  }

  /**
   * Known issue: if the ball changes direction rapidly, the trace will "glitch" (disappear) and then redraw normally. This happens because the current implementation of the trace opacity gradient only has two points — end and start: it is a straight line, which cannot represent curved shapes.
   *
   * This can be solved by adding more color stops conditionally when the direction change is too rapid, or by creating a separate gradient for each pair of history items, or by forcing the gradient itself to reflect the trace's shape.
   */
  private applyTraceColor(ctx: CanvasRenderingContext2D, farthestTracePointPosition: Vector2) {
    const gradient = ctx.createLinearGradient(farthestTracePointPosition.x, farthestTracePointPosition.y, this.position.x, this.position.y);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, stable_color_rgb);

    ctx.strokeStyle = gradient; // Trail color
    ctx.stroke();
  }
}

const stable_color = new Vector3(0, 255, 0); // TODO dedupe: already exists in main.ts
const stable_color_rgb = stable_color.toRGB();

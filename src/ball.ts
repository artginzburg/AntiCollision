import { getRange } from './random';
import { settings } from './settings';
import { unstable_color_rgb } from './shared';
import { Vector2, Vector3, Vector3ColorTools } from './vector';
import { drawBallStableScore } from './ballScoring';
import { maxScale, scale } from './zooming';

const max_history = 100

export class Ball {
  position: Vector2;
  public velocity: Vector2;
  color: Vector3 | undefined;

  private readonly position_history: Vector2[];
  private current_idx: number;

  public stable: boolean | undefined;
  public stableCount: number;

  /** The stable score should be initialized with the minimum stable score across all of the current balls. So, it's indeed 0 at the start, but if new balls are spawned later on — 0 is not the right value. */
  public stableScore = 0;
  public hasLeastStableScore = false;

  constructor(
    x: number,
    y: number,
    /** Radius */
    public r: number
  ) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(getRange(-4, 4), getRange(-4, 4));
    this.r = r;
    this.position_history = Array(max_history).fill(this.position);
    this.current_idx = 0;

    this.stableCount = 0;
  }

  public save() {
    this.position_history[this.current_idx] = this.position;
    this.current_idx = ++this.current_idx % max_history;
  }

  /**
   * Returns the ball history ordered chronologically (unlike {@link Ball.position_history}). That is, `va[0]` is the oldest point in history, and `va[va.length - 1]` is the newest.
   *
   * The returned array does not include the current ball state.
   */
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

  public draw(ctx: CanvasRenderingContext2D, ctxTraces: CanvasRenderingContext2D) {
    if (settings.drawTraces) this.drawTrace(ctxTraces);
    ctx.fillStyle = this.color!.toRGB()
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2)
    if (settings.strokeBalls) this.drawStroke(ctx);
    ctx.fill()
    ctx.closePath()
    this.drawStableScore(ctx);
    // console.log(this.position)
  }

  private drawStroke(ctx: CanvasRenderingContext2D) {
    ctx.lineWidth = Math.min(maxScale / scale, 10); // min(from 1 to 30, 10)
    ctx.strokeStyle = Vector3ColorTools.invert(this.color!).toRGBA(0.67) // 0.67 = HEX a
    ctx.stroke()
  }

  private drawTrace(ctx: CanvasRenderingContext2D) {
    const trace = this.getVA();
    const farthestTracePointPosition = trace[0].position;

    ctx.beginPath()
    trace.forEach((ball) => {
      ctx.lineTo(ball.position.x, ball.position.y);
    })
    ctx.lineTo(this.position.x, this.position.y); // Makes the trace path actually end in the center of the ball (otherwise, the trace would be detached from the ball on a higher velocity).
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
    gradient.addColorStop(1, unstable_color_rgb);

    ctx.strokeStyle = gradient; // Trail color
    ctx.stroke();
  }

  /**
   * After some testing, I think the ball found by this score system is the most interesting to watch.
   * The logic behind is that the highlighted ball is the one that spent the least amount of time being stable.
   */
  private drawStableScore(ctx: CanvasRenderingContext2D) {
    drawBallStableScore(ctx, this);
  }
}

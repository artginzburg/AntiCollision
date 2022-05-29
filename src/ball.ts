import { getRange } from './random';
import { settings } from './settings';
import { Vector2, Vector3 } from './vector';

const max_history = 100

export class Ball {
  position: Vector2;
  velocity: Vector2;
  r: number;
  color: Vector3 | undefined;

  position_history: Vector2[];
  current_idx: number;

  stable: boolean | undefined;
  stableCount: number;

  constructor(x: number, y: number, arg_r: number) {
    this.position = new Vector2(x, y);
    this.velocity = new Vector2(getRange(-4, 4), getRange(-4, 4));
    this.r = arg_r;
    this.position_history = [];
    this.current_idx = 0;

    for (let i = 0; i < max_history; i += 1) {
      this.position_history.push(new Vector2(x, y));
    }
    this.stableCount = 0;
  }

  save() {
    this.position_history[this.current_idx] = this.position;
    this.current_idx = ++this.current_idx % max_history;
  }

  getVA() {
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

  draw(ctx: CanvasRenderingContext2D) {
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

    ctx.beginPath()
    trace.forEach((ball) => {
      ctx.lineTo(ball.position.x, ball.position.y);
    })
    ctx.moveTo(trace[0].position.x, trace[0].position.y);
    ctx.closePath()

    // ctx.lineWidth = 1; // Trail width
    const gradient = ctx.createLinearGradient(0, 0, this.position.x, this.position.y);
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, stable_color_rgb);
    ctx.strokeStyle = gradient; // Trail color
    ctx.stroke();
  }
}

const stable_color = new Vector3(0, 255, 0); // TODO dedupe: already exists in main.ts
const stable_color_rgb = stable_color.toRGB();

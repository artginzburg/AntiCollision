import { getRange } from './random';
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
      va[i].position = this.position_history[actual_idx];
      const color = ratio * 255;
      va[i].color = new Vector3(0, color, 0);
    }

    return va;
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.drawTrail(ctx);
    ctx.fillStyle = this.color!.toRGB()
    ctx.beginPath()
    ctx.arc(this.position.x, this.position.y, this.r, 0, Math.PI * 2)
    ctx.fill()
    ctx.closePath()
    // console.log(this.position)
  }

  private drawTrail(ctx: CanvasRenderingContext2D) {
    const shape: Vector2[] = [];
    this.position_history.forEach((historyItem) => {
      shape.push(historyItem);
      // ctx.strokeRect(historyItem.x - 1, historyItem.y - 1, 1, 1); // The only working thing here :D
    });

    const distances = shape.map((point, pointIndex) => {
      const previousPoint = shape[pointIndex - 1] ?? shape[shape.length - 1];

      const distance = point.sub(previousPoint);

      return distance;
    })

    const totalDistances = distances.map((distance) => Math.abs(distance.x + distance.y));

    const maximumDistance = Math.max(...totalDistances);
    const minimumDistance = Math.min(...totalDistances);

    const averageDistance = (maximumDistance + minimumDistance) / 2;

    ctx.beginPath()

    shape.forEach((point, pointIndex) => {
      const previousPoint = shape[pointIndex - 1] ?? shape[shape.length - 1];

      const distance = point.sub(previousPoint);

      const absoluteDistance = Math.abs(distance.x + distance.y);

      if (absoluteDistance * 2 < averageDistance) {
        ctx.lineTo(point.x, point.y);
      } else {
        const nextPoint = shape[pointIndex + 1] ?? shape[0];
        ctx.moveTo(nextPoint.x, nextPoint.y);
        // ctx.lineTo(nextPoint.x, nextPoint.y);
      }
    })

    ctx.closePath()

    // ctx.lineWidth = 1; // Trail width
    ctx.strokeStyle = stable_color_rgb; // Trail color
    ctx.stroke();
  }
}

const stable_color = new Vector3(0, 255, 0); // TODO dedupe: already exists in main.ts
const stable_color_rgb = stable_color.toRGB();

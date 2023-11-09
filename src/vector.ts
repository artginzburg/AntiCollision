export class Vector3 {
  constructor(private readonly x: number, private readonly y: number, private readonly z: number) {}

  public add(v: Vector3) {
    return new Vector3(this.x + v.x, this.y + v.y, this.z + v.z)
  }

  public sub(v: Vector3) {
    return new Vector3(this.x - v.x, this.y - v.y, this.z - v.z)
  }

  public mul(v: number) {
    return new Vector3(this.x * v, this.y * v, this.z * v)
  }

  public div(v: number) {
    return new Vector3(this.x / v, this.y / v, this.z / v)
  }

  public toRGB() {
    return `rgb(${this.x} ${this.y} ${this.z})`
  }

  public toRGBA(a: number) {
    return `rgba(${this.x}, ${this.y}, ${this.z}, ${a})`
  }
}

export namespace Vector3ColorTools {
  const maxColor = new Vector3(255, 255, 255);
  export function invert(v: Vector3) {
    return maxColor.sub(v);
  }
}

export class Vector2 {
  constructor(readonly x: number, readonly y: number) {}

  public add(v: Vector2) {
    return new Vector2(this.x + v.x, this.y + v.y)
  }

  public sub(v: Vector2) {
    return new Vector2(this.x - v.x, this.y - v.y)
  }

  public mul(v: number) {
    return new Vector2(this.x * v, this.y * v)
  }

  public div(v: number) {
    return new Vector2(this.x / v, this.y / v)
  }
}

export namespace Vector2Tools {
  function dot(v1: Vector2, v2: Vector2) {
    return v1.x * v2.x + v1.y * v2.y;
  }
  export function length(v: Vector2) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
  }
  function normalize(v: Vector2) {
    return v.div(Vector2Tools.length(v));
  }

  export function rotate(
    velocity: Vector2,
    /** From `0` to `4`. `0` — 0º rotation, `1` — 90º rotation. */
    sensitivity: number,
    direction: RotationDirection
  ) {
    const angle = Math.atan2(velocity.y, velocity.x);
    const newAngle = angle - (Math.PI / 2) * sensitivity * direction;
    return new Vector2(Math.cos(newAngle), Math.sin(newAngle)).mul(Vector2Tools.length(velocity));
  }
  /** @todo research why `no-shadow` considers enum a problem. Probably, `typescript-eslint` has a custom rule for this. */
  // eslint-disable-next-line no-shadow
  export enum RotationDirection {
    Left = 1,
    Right = -1,
  }
}

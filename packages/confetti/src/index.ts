const CIRCLE = Math.PI * 2;
const holidayColors = () => {
  const now = new Date();
  const date = now.getDate();
  const month = now.getMonth() + 1;
  if (date === 14 && month === 2) return ['orchid', 'pink', 'white', 'crimson', 'violet'];
  if (date === 4 && month === 7) return ['red', 'white', 'blue'];
  if (date === 31 && month === 10) return ['black', 'orange'];
  if (date === 25 && month === 12) return ['red', 'green'];
};
const randRange = (min: number, max: number) => {
  [min, max] = [Math.min(min, max), Math.max(min, max)];
  return Math.random() * (max - min) + min;
};

class Confetto {
  #canvas: HTMLCanvasElement;
  #ctx: CanvasRenderingContext2D;
  #color: string;
  #drag: number;
  #gravity: number;
  #position: { x: number; y: number };
  #rotation: number;
  #scale: { x: number; y: number };
  #size: { x: number; y: number };
  #termVelocity: number;
  #turnSpeed: number;
  #velocity: { x: number; y: number };

  constructor({ canvas, colors, ctx, drag, gravity, termVelocity }: ConfettoConfig) {
    this.#canvas = canvas;
    this.#color = colors[randRange(0, colors.length) | 0];
    this.#ctx = ctx;
    this.#drag = drag;
    this.#gravity = gravity;
    this.#position = { x: randRange(0, canvas.width), y: canvas.height - 1 };
    this.#rotation = randRange(0, CIRCLE);
    this.#size = { x: randRange(10, 20), y: randRange(10, 30) };
    this.#scale = { x: 1, y: 1 };
    this.#termVelocity = termVelocity;
    this.#turnSpeed = randRange(0, 0.0875);
    this.#velocity = { x: randRange(-25, 25), y: randRange(-30, 0) };
  }

  draw(idx: number, confetti: Confetto[]) {
    this.#updateContext();
    this.#updateVelocity();
    this.#updateLocation();
    if (!this.#handleOffscreen(idx, confetti)) this.#render();
  }

  #handleOffscreen(idx: number, confetti: Confetto[]) {
    if (this.#position.y >= this.#canvas.height) {
      confetti.splice(idx, 1);
      this.#ctx.setTransform(1, 0, 0, 1, 0, 0);
      return true;
    }
    if (this.#position.x > this.#canvas.width) this.#position.x = 0;
    if (this.#position.x < 0) this.#position.x = this.#canvas.width;
  }
  #render() {
    this.#ctx.fillStyle = Math.sign(this.#scale.x) === Math.sign(this.#scale.y) ? this.#color : `dark${this.#color}`;
    const h = this.#size.y * this.#scale.y;
    const w = this.#size.x * this.#scale.x;
    this.#ctx.fillRect(-w / 2, -h / 2, w, h);
    this.#ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  #updateContext() {
    this.#ctx.translate(this.#position.x, this.#position.y);
    this.#ctx.rotate(this.#rotation);
  }
  #updateLocation() {
    this.#position.x += this.#velocity.x;
    this.#position.y += this.#velocity.y;
    this.#rotation = (this.#rotation + this.#turnSpeed) % CIRCLE;
    this.#scale.x = Math.sin(this.#position.x * 0.1);
    this.#scale.y = Math.cos(this.#position.y * 0.1);
  }
  #updateVelocity() {
    this.#velocity.x -= this.#velocity.x * this.#drag;
    this.#velocity.y = Math.min(this.#velocity.y + this.#gravity, this.#termVelocity);
    this.#velocity.x += (Math.random() > 0.5 ? 1 : -1) * Math.random();
  }
}

export default ({
  colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'turquoise'],
  count = 300,
  drag = 0.075,
  gravity = 0.25,
  holidays = true,
  termVelocity = 5,
}: ConfettiConfig = {}) => {
  const canvas = document.createElement('canvas');
  canvas.style.left = '0';
  canvas.style.pointerEvents = 'none';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.zIndex = '999999';
  const ctx = canvas.getContext('2d')!;
  const confetti: Confetto[] = [];
  const confettoCfg: ConfettoConfig = { canvas, colors, ctx, drag, gravity, termVelocity };
  let frameRequest: number;
  const init = () => {
    resize();
    document.body.append(canvas);
    addEventListener('resize', resize);
    if (holidays) colors = holidayColors() ?? colors;
    if (!confetti.length) return void confetti.push(...[...Array(count)].map(() => new Confetto(confettoCfg)));
    cancelAnimationFrame(frameRequest);
    confetti.splice(0, confetti.length);
  };
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach((confetto, idx) => confetto.draw(idx, confetti));
    if (confetti.length) return void (frameRequest = requestAnimationFrame(render));
    cancelAnimationFrame(frameRequest);
    canvas.remove();
    removeEventListener('resize', resize);
  };
  const resize = () => Object.assign(canvas, { height: innerHeight, width: innerWidth });
  return { init, render };
};

type ConfettoConfig = {
  canvas: HTMLCanvasElement;
  colors: string[];
  ctx: CanvasRenderingContext2D;
  drag: number;
  gravity: number;
  termVelocity: number;
};
export type ConfettiConfig = {
  colors?: string[];
  count?: number;
  drag?: number;
  gravity?: number;
  holidays?: boolean;
  termVelocity?: number;
};

const randRange = (n, m) => Math.random() * (m - n) + n;
const CIRCLE = Math.PI * 2;

export default ({
  holidays = true,
  count = 300,
  gravity = 0.25,
  termVelocity = 5,
  drag = 0.075,
  colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'turquoise'],
} = {}) => {
  const canvas = document.createElement('canvas');
  canvas.style = 'left:0;pointer-events:none;position:fixed;top:0;z-index:999999';
  const ctx = canvas.getContext('2d');
  let confetti = [];
  let frameRequest;
  const resize = () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;
  };
  const holidayColors = () => {
    const now = new Date();
    const date = now.getDate();
    const month = now.getMonth() + 1;
    if (date === 14 && month === 2) {
      canvas.title = 'Happy Valentines Day';
      return ['orchid', 'pink', 'white', 'crimson', 'violet'];
    }
    if (date === 4 && month === 7) {
      canvas.title = 'Happy 4th of July';
      return ['red', 'white', 'blue'];
    }
    if (date === 31 && month === 10) {
      canvas.title = 'Happy Halloween';
      return ['black', 'orange'];
    }
    if (date === 25 && month === 12) {
      canvas.title = 'Happy Christmas';
      return ['red', 'green'];
    }
    return colors;
  };
  const newConfetto = () => ({
    color: colors[randRange(0, colors.length) | 0],
    size: { x: randRange(10, 20), y: randRange(10, 30) },
    position: { x: randRange(0, canvas.width), y: canvas.height - 1 },
    rotation: randRange(0, CIRCLE),
    turnSpeed: randRange(0, 0.0875),
    scale: { x: 1, y: 1 },
    velocity: { x: randRange(-25, 25), y: randRange(-30, 0) },
  });
  const init = () => {
    resize();
    document.body.append(canvas);
    addEventListener('resize', resize);
    if (holidays) colors = holidayColors();
    confetti = !confetti.length ? [...Array(count)].map(newConfetto) : (cancelAnimationFrame(frameRequest), []);
  };
  const drawConfetto = (confetto, idx) => {
    const w = confetto.size.x * confetto.scale.x;
    const h = confetto.size.y * confetto.scale.y;
    ctx.translate(confetto.position.x, confetto.position.y);
    ctx.rotate(confetto.rotation);
    confetto.velocity.x -= confetto.velocity.x * drag;
    confetto.velocity.y = Math.min(confetto.velocity.y + gravity, termVelocity);
    confetto.velocity.x += (Math.random() > 0.5 ? 1 : -1) * Math.random();
    confetto.position.x += confetto.velocity.x;
    confetto.position.y += confetto.velocity.y;
    confetto.rotation = (confetto.rotation + confetto.turnSpeed) % CIRCLE;
    if (confetto.position.y >= canvas.height) confetti.splice(idx, 1);
    if (confetto.position.x > canvas.width) confetto.position.x = 0;
    if (confetto.position.x < 0) confetto.position.x = canvas.width;
    confetto.scale.x = Math.sin(confetto.position.x * 0.1);
    confetto.scale.y = Math.cos(confetto.position.y * 0.1);
    ctx.fillStyle =
      Math.sign(confetto.scale.x) === Math.sign(confetto.scale.y) ? confetto.color : `dark${confetto.color}`;
    ctx.fillRect(-w / 2, -h / 2, w, h);
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
  const render = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confetti.forEach(drawConfetto);
    if (confetti.length) frameRequest = requestAnimationFrame(render);
    else cancelAnimationFrame(frameRequest), canvas.remove(), removeEventListener('resize', resize);
  };
  return { init, render };
};

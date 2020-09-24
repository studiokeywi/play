export default ({
  c = 300,
  g = 0.25,
  t = 5,
  d = 0.075,
  h = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'turquoise'],
} = {}) => {
  const v = document.createElement('canvas');
  v.style.position = 'absolute';
  v.style.top = '0';
  v.style.left = '0';
  v.style.zIndex = '999999';
  const x = v.getContext('2d');
  let f = [];
  const n = (n, m) => Math.random() * (m - n) + n;
  const C = Math.PI * 2;
  let q;
  const z = () => {
    v.width = innerWidth;
    v.height = innerHeight;
  };
  const i = () => {
    z();
    document.body.append(v);
    addEventListener('resize', z);
    f = !f.length
      ? Array(c)
          .fill()
          .map(() => ({
            h: h[n(0, h.length) | 0],
            z: { x: n(10, 20), y: n(10, 30) },
            p: { x: n(0, v.width), y: v.height - 1 },
            r: n(0, C),
            t: n(0, 0.0875),
            c: { x: 1, y: 1 },
            v: { x: n(-25, 25), y: n(-30, 0) },
          }))
      : (cancelAnimationFrame(q), []);
  };
  const r = () => {
    x.clearRect(0, 0, v.width, v.height);
    f.forEach((c, i) => {
      const w = c.z.x * c.c.x;
      const h = c.z.y * c.c.y;
      x.translate(c.p.x, c.p.y);
      x.rotate(c.r);
      c.v.x -= c.v.x * d;
      c.v.y = Math.min(c.v.y + g, t);
      c.v.x += (Math.random() > 0.5 ? 1 : -1) * Math.random();
      c.p.x += c.v.x;
      c.p.y += c.v.y;
      c.r = (c.r + c.t) % C;
      if (c.p.y >= v.height) f.splice(i, 1);
      if (c.p.x > v.width) c.p.x = 0;
      if (c.p.x < 0) c.p.x = v.width;
      c.c.x = Math.sin(c.p.x * 0.1);
      c.c.y = Math.cos(c.p.y * 0.1);
      x.fillStyle = Math.sign(c.c.x) === Math.sign(c.c.y) ? c.h : `dark${c.h}`;
      x.fillRect(-w / 2, -h / 2, w, h);
      x.setTransform(1, 0, 0, 1, 0, 0);
    });
    if (f.length) q = requestAnimationFrame(r);
    else cancelAnimationFrame(q), v.remove(), removeEventListener('resize', z);
  };
  return { i, r };
};

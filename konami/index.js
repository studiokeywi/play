export default ({ o = true, p = kc => console.log('payload', kc), s = false } = {}) => {
  const d = [0, 38, 2, 38, -1, 40, -3, 42, 24, 41, ...(s ? [-25, 38] : [-28])];
  const e = [38];
  const l = () => document.addEventListener('keyup', h);
  const h = ({ keyCode }) => (
    e.push(keyCode - e[e.length - 1]),
    !e.slice(1, e.length).every((k, i) => k === d[i])
      ? r()
      : e.length > d.length
      ? (o && u(), r(), p({ l, u }))
      : void 0
  );
  const r = () => e.splice(0, e.length, 38);
  const u = () => document.removeEventListener('keyup', h);
  return l;
};

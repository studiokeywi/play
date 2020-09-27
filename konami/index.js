export default ({ once = true, payload = konami => console.log('payload', konami), secondPlayer = false } = {}) => {
  const deltas = [0, 38, 2, 38, -1, 40, -3, 42, 24, 41, ...(secondPlayer ? [-25, 38] : [-28])];
  const entries = [38];
  const load = () => document.addEventListener('keyup', handler);
  const handler = ({ keyCode }) => (
    entries.push(keyCode - entries[entries.length - 1]),
    !entries.slice(1, entries.length).every((code, idx) => code === deltas[idx])
      ? reset()
      : entries.length > deltas.length
      ? (once && unload(), reset(), payload(konami))
      : void 0
  );
  const reset = () => entries.splice(0, entries.length, 38);
  const unload = () => document.removeEventListener('keyup', handler);
  const konami = { load, unload };
  return konami;
};

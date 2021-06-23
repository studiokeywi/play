const one = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
  'Enter',
];
const two = [...one.slice(0, one.length - 1), 'Shift', [...one].pop()];

export default ({ once = true, payload = konami => console.log('payload', konami), secondPlayer = false } = {}) => {
  const keys = secondPlayer ? two : one;
  const entries = [];
  const load = () => document.addEventListener('keydown', handler);
  const handler = ({ key }) => (
    entries.push(key),
    !entries.every((entry, idx) => entry === keys[idx])
      ? reset()
      : entries.length === keys.length
      ? (once && unload(), reset(), payload(konami))
      : void 0
  );
  const reset = () => entries.splice(0, entries.length);
  const unload = () => document.removeEventListener('keydown', handler);
  const konami = { load, unload };
  return konami;
};

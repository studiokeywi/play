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

export default ({ once = true, payload = console.log.bind(null, 'payload'), secondPlayer = false } = {}) => {
  const keys = secondPlayer ? two : one;
  const entries = [];
  const load = () => document.addEventListener('keydown', handler);
  const handler = ({ key }) => {
    entries.push(key);
    if (!entries.every((entry, idx) => entry === keys[idx])) return reset();
    if (entries.length === keys.length) {
      if (once) unload();
      reset();
      payload(konami);
    }
  };
  const reset = () => void entries.splice(0, entries.length);
  const unload = () => document.removeEventListener('keydown', handler);
  const konami = { load, unload };
  return konami;
};

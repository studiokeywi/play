const a = 'a';
const b = 'b';
const down = 'arrowdown';
const left = 'arrowleft';
const right = 'arrowright';
const select = 'shift';
const start = 'enter';
const up = 'arrowup';

const one = [up, up, down, down, left, right, left, right, b, a, start];
const two = [up, up, down, down, left, right, left, right, b, a, select, start];

export default ({
  once = true,
  payload = console.log.bind(null, 'payload'),
  secondPlayer = false,
}: KonamiConfig = {}) => {
  const keys = secondPlayer ? two : one;
  const entries: string[] = [];
  const load = () => document.addEventListener('keydown', handler);
  const handler = ({ key }: KeyboardEvent) => {
    entries.push(key.toLowerCase());
    if (!entries.every((entry, idx) => entry === keys[idx])) return reset();
    if (entries.length !== keys.length) return;
    if (once) unload();
    reset();
    payload(konami);
  };
  const reset = () => void entries.splice(0, entries.length);
  const unload = () => document.removeEventListener('keydown', handler);
  const konami = { load, unload };
  return konami;
};

export type KonamiConfig = {
  once?: boolean;
  payload?: Function;
  secondPlayer?: boolean;
};

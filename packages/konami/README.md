# Konami Code

Unlock the retro power of the Konami Code on your websites! Creates an event listener that handles detection of keyboard inputs and executes a provided payload function if the user inputs the Konami Code correctly.

This version of the code substitutes keyboard arrows for the directional pad. It also requires "Enter/Return" (as the start button) as the last key to execute the payload function, and supports optional "2 Player" mode, where "Shift" (select) is the next to last input.

<small>Konami is &trade; by the Konami Corporation and is in no way affiliated with studioKeywi. The use of the phrase "Konami Code" refers to a sequence of button inputs introduced by the game Gradius (&reg; by Konami) and popularized by the game Contra (&trade; by Konami).</small>

## Simple Usage

```html
<html>
  <head>
    <script type="module">
      import buildKonami from 'https://cdn.jsdelivr.net/gh/studiokeywi/play/konami/index.js';

      const payload = () => alert('You did it!');
      const { load } = buildKonami({ payload });

      // Use load() to begin Konami Code detection on the current page
      document.querySelector('#konami').addEventListener('click', () => {
        load();
      });
    </script>
  </head>
  <body>
    <button type="button" id="konami">Enable Konami Detection</button>
  </body>
</html>
```

## Configuration

```js
const konamiConfig = {
  once: Boolean, // default: true
  payload: Function, // default: konami => console.log('payload', konami)
  secondPlayer: Boolean, // default: false
};
```

## Advanced Usage

The payload function provided to the builder will be executed with access to the `konami.load()` and `konami.unload()` functions via the first parameter. This allows more custom behavior in enabling/disabling the Konami Code detection

```js
import buildKonami from 'https://cdn.jsdelivr.net/gh/studiokeywi/play/packages/konami/dist/index.jds';

// Example: Builds a Konami Code detector that executes in "2P mode" a single time by default, or repeats if the user agrees
buildKonami({
  payload: konami => confirm('Re-enable this konami code payload?') && konami.load(),
  secondPlayer: true,
}).load(); // Attach immediately
```

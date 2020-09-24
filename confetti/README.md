# Confetti Thrower

Shower the screen with faux confetti. Creates a canvas element to render confetti above the rest of the document. Automatically resets after confetti has left screen, or when `init()` is called while confetti is actively falling.

## Simple Usage

```html
<html>
  <head>
    <script type="module">
      import buildConfetti from 'https://cdn.jsdelivr.net/gh/studiokeywi/play/confetti/index.js';

      const { i: init, r: render } = buildConfetti();

      // Use init() to generate the intial confetti burst; use render() to begin animation
      document.querySelector('#confetti').addEventListener('click', () => {
        init();
        render();
      });
    </script>
  </head>
  <body>
    <button type="button" id="confetti">Confetti Time!</button>
  </body>
</html>
```

## Configuration

```js
const confettiConfig = {
  c: Number,   // particle count;   default: 300
  g: Number,   // gravity;          default: 0.25
  t: Number,   // terminalVelocity; default: 5
  d: Number,   // horizontalDrag;   default: 0.075
  h: String[], // hues;             default: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'turquoise']
};
```

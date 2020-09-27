# Confetti Thrower

Shower the screen with faux confetti. Creates a canvas element to render confetti above the rest of the document. Automatically resets after confetti has left screen, or when `init()` is called while confetti is actively falling.

## Simple Usage

```html
<html>
  <head>
    <script type="module">
      import buildConfetti from 'https://cdn.jsdelivr.net/gh/studiokeywi/play/confetti/index.js';

      const { init, render } = buildConfetti();

      // init() generates new confetti; render() begins animation
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
  holidays:     Boolean,  // default: true
  count:        Number,   // default: 300
  gravity:      Number,   // default: 0.25
  termVelocity: Number,   // default: 5
  drag:         Number,   // default: 0.075
  colors:       String[], // default: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'turquoise']
};
```

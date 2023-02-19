# Confetti Thrower

Shower the screen with faux confetti. Creates a canvas element to render confetti above the rest of the document. Automatically resets after confetti has left screen, or when `init()` is called while confetti is actively falling.

## Simple Usage

```html
<html>
  <head>
    <script type="module">
      import buildConfetti from 'https://cdn.jsdelivr.net/gh/studiokeywi/play/packages/confetti/dist/index.js';

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

```javascript
const confettiConfig = {
  colors:       String[], // default: ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'turquoise']
  count:        Number,   // default: 300
  drag:         Number,   // default: 0.075
  gravity:      Number,   // default: 0.25
  holidays:     Boolean,  // default: true
  termVelocity: Number,   // default: 5
};
```

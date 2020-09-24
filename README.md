# studioKeywi: play

Fun bits and bobs for anyone to use!

## Contents

- ### Confetti

  Generate a shower of confetti on your webpage

- ### Konami

  Enable the Konami Code as a way to execute JS functions

## Samples and Examples

### Throw Confetti with Konami Code

```html
<script type="module" defer>
  import { buildConfetti, buildKonami } from '//cdn.jsdelivr.net/gh/studiokeywi/play/index.js';
  const { i, r } = buildConfetti();
  buildKonami({ o: false, p: () => (i(), r()) })();
</script>
```

# studioKeywi: play

Fun bits and bobs for anyone to use!

[![](https://data.jsdelivr.com/v1/package/gh/studiokeywi/play/badge?style=rounded)](https://www.jsdelivr.com/package/gh/studiokeywi/play)

## Contents

- ### [Confetti](https://github.studiokeywi.dev/play/tree/primary/packages/confetti)

  Generate a shower of confetti on your webpage

- ### [Konami](https://github.studiokeywi.dev/play/tree/primary/packages/konami)

  Enable the Konami Code as a way to execute JS functions

## Samples and Examples

### Throw Confetti with Konami Code

```html
<script type="module" defer>
  import { confetti, konami } from 'https://cdn.jsdelivr.net/gh/studiokeywi/play/dist/index.js';

  const { init, render } = confetti();

  const payload = () => (init(), render());

  const { load, unload } = konami({ once: false, payload });

  load();
</script>
```

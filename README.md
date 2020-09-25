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
  import { confetti, konami } from '//cdn.jsdelivr.net/gh/studiokeywi/play/index.js';
  const { init, render } = confetti();
  const payload = () => (init(), render());
  konami({ once: false, payload })();
</script>
```

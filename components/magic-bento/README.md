# Portfolio MagicBento

MagicBento source supplied by the portfolio owner, from React Bits by David Haz.
License: ../../resource/react-bits-LICENSE.md.

PortfolioBento.jsx preserves the portfolio's six expertise cards, technology chips,
icons, and concise descriptions. MagicBento supplies border glow, spotlight,
tilt, hover particles, and click ripples. The shared portfolio-motion.js supplies
scroll entrances on the outer cells so they do not conflict with card tilt. Card links lead
to related portfolio sections. Touch views skip pointer effects. Scroll entrances respect reduced motion.
The original hero is preserved.

Build locally with `npm ci && npm run build` in this directory. This writes
../../js/magic-bento.js and ../../js/magic-bento.css. The factory consumes the
React instance already shipped by js/bundle.js, avoiding a second React runtime.

Adaptations to MagicBento.jsx: pause while the document is hidden and skip pointer
motion when animations are disabled or the interaction is touch-based.

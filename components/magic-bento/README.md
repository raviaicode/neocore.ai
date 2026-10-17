# Portfolio MagicBento

MagicBento source supplied by the portfolio owner, from React Bits by David Haz.
License: ../../resource/react-bits-LICENSE.md.

PortfolioBento.jsx preserves the portfolio's six expertise cards, technology chips,
icons, and experience highlights. MagicBento supplies border glow, spotlight,
tilt, hover particles, click ripples, and the entrance animation. Card links lead
to related portfolio sections. Mobile and reduced-motion views are static.
The original hero is preserved.

Build locally with `npm ci && npm run build` in this directory. This writes
../../js/magic-bento.js and ../../js/magic-bento.css. The factory consumes the
React instance already shipped by js/bundle.js, avoiding a second React runtime.

Adaptations to MagicBento.jsx: pause while the document is hidden and skip pointer
motion when animations are disabled or the interaction is touch-based.

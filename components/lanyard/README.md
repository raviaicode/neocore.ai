# About Me photo Lanyard

Lanyard.jsx and Lanyard.css are the React Bits source supplied by the portfolio
owner, adapted for the standalone build and persistent portrait rendering. See
../../resource/react-bits-LICENSE.md for the source license.

ProfileLanyard.jsx supplies the owner's photo, matte finish, graphite hardware,
and restrained physics. CSS renders the original image and canvas in grayscale;
the source photo is preserved unchanged, including its existing watermarks.

The About component lazy-loads the Three.js build near the section across screen sizes.
Reduced-motion views start with a static portrait. A Play/Pause control lets visitors
choose whether to animate. Touch and narrow screens support the interactive card. A static fallback remains
visible until the portrait texture has rendered, or if WebGL is unavailable or
its context is lost. Context restoration repaints the textures and resumes the
animation. The renderer preserves its last frame while rendering is paused.

Run `npm ci && npm run build` in this directory to rebuild
../../js/profile-lanyard.js and ../../js/profile-lanyard.css. The factory reuses
the React instance from the existing portfolio bundle.

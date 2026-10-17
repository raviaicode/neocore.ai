import { build } from 'esbuild';
import { writeFile } from 'node:fs/promises';
const result = await build({
  entryPoints: [new URL('./PortfolioBento.jsx', import.meta.url).pathname],
  bundle: true, write: false, format: 'cjs', platform: 'browser', minify: true,
  external: ['react','react/jsx-runtime'], outfile: 'magic-bento.js', jsx: 'transform',
  legalComments: 'inline'
});
const js = result.outputFiles.find(file=>file.path.endsWith('.js')).text;
const css = result.outputFiles.find(file=>file.path.endsWith('.css')).text;
const wrapper = `/* MagicBento by David Haz / React Bits. See resource/react-bits-LICENSE.md. */
window.createPortfolioBento = function (React) {
  const module = { exports: {} };
  const exports = module.exports;
  const jsx = (type, props, key) => React.createElement(type, key === undefined ? props : { ...props, key });
  const require = name => {
    if (name === 'react') return React;
    if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: React.Fragment };
    throw new Error('Unexpected component dependency: ' + name);
  };
${js}
  return module.exports.default;
};
`;
await writeFile(new URL('../../js/magic-bento.js', import.meta.url), wrapper);
await writeFile(new URL('../../js/magic-bento.css', import.meta.url), css);

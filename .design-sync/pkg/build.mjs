import { build } from '../../.ds-sync/node_modules/esbuild/lib/main.js';
await build({
  entryPoints: ['.design-sync/pkg/src/index.ts'],
  bundle: true, format: 'esm', outfile: '.design-sync/pkg/dist/index.mjs',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  jsx: 'automatic', tsconfig: '.design-sync/pkg/tsconfig.json', logLevel: 'info',
});
console.log('bundled');

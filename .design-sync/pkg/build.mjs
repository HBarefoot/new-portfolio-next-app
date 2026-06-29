import { build } from '../../.ds-sync/node_modules/esbuild/lib/main.js';
import { resolve } from 'node:path';
const shim = (f) => resolve(process.cwd(), '.design-sync/pkg/shims', f);
await build({
  entryPoints: ['.design-sync/pkg/src/index.ts'],
  bundle: true, format: 'esm', outfile: '.design-sync/pkg/dist/index.mjs',
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  jsx: 'automatic', tsconfig: '.design-sync/pkg/tsconfig.json', logLevel: 'info',
  alias: {
    'next/link': shim('next-link.tsx'),
    'next/image': shim('next-image.tsx'),
    'next/dynamic': shim('next-dynamic.tsx'),
    'next/navigation': shim('next-navigation.tsx'),
    'next-themes': shim('next-themes.tsx'),
  },
});
console.log('bundled with shims');

import { readFileSync, writeFileSync } from 'node:fs';
const idx = readFileSync('.design-sync/pkg/src/index.ts', 'utf8');
// Collect exported identifiers (handles `export { A, B as C }` and `export { default as D }`).
const names = new Set();
for (const m of idx.matchAll(/export\s*\{([^}]*)\}/g)) {
  for (let part of m[1].split(',')) {
    part = part.trim();
    if (!part) continue;
    const as = part.match(/\bas\s+([A-Za-z0-9_]+)$/);
    const name = as ? as[1] : part.replace(/^default\s+as\s+/, '').trim();
    if (name && name !== 'default') names.add(name);
  }
}
// Rich-typed primitives are declared explicitly; everything else gets a loose component decl.
const rich = new Set(['Button', 'buttonVariants', 'Card', 'CardHeader', 'CardFooter', 'CardTitle', 'CardAction', 'CardDescription', 'CardContent', 'Input']);
const head = `import * as React from 'react';

export type ButtonProps = React.ComponentProps<'button'> & {
  /** Visual style of the button. */
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  /** Size of the button. */
  size?: 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg';
  /** Render as the child element (Radix Slot) instead of a <button>. */
  asChild?: boolean;
};
/** Primary action control. Variants and sizes via props; supports asChild. */
export declare function Button(props: ButtonProps): React.JSX.Element;
export declare const buttonVariants: (opts?: { variant?: string; size?: string; className?: string }) => string;

export type CardProps = React.ComponentProps<'div'>;
/** Surface container. Compose with CardHeader / CardTitle / CardDescription / CardContent / CardFooter / CardAction. */
export declare function Card(props: CardProps): React.JSX.Element;
export declare function CardHeader(props: React.ComponentProps<'div'>): React.JSX.Element;
export declare function CardTitle(props: React.ComponentProps<'div'>): React.JSX.Element;
export declare function CardDescription(props: React.ComponentProps<'div'>): React.JSX.Element;
export declare function CardAction(props: React.ComponentProps<'div'>): React.JSX.Element;
export declare function CardContent(props: React.ComponentProps<'div'>): React.JSX.Element;
export declare function CardFooter(props: React.ComponentProps<'div'>): React.JSX.Element;

export type InputProps = React.ComponentProps<'input'>;
/** Text input field, styled with the design-system tokens. */
export declare function Input(props: InputProps): React.JSX.Element;
`;
const rest = [...names].filter((n) => !rich.has(n)).sort();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const body = rest.map((n) => `export declare function ${n}(props?: any): React.JSX.Element;`).join('\n');
writeFileSync('.design-sync/pkg/dist/index.d.ts', head + '\n' + body + '\n');
console.log('wrote index.d.ts:', names.size, 'exports (', rest.length, 'loose +', rich.size, 'rich )');

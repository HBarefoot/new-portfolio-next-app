import * as React from 'react';

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
/** Text input field, styled with the design system tokens. */
export declare function Input(props: InputProps): React.JSX.Element;

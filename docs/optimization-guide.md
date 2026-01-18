# Technical Optimization Guide

This guide documents the performance optimization strategy for the Portfolio CMS. Following these practices ensures the application maintains its high Core Web Vitals scores (90+ Performance on Mobile).

## 1. Image Optimization Strategy

We use `next/image` to automatically serve optimized image formats (AVIF/WebP) and properly size images for different devices.

### Best Practices
- **Always use `next/image`** instead of `<img>` tags.
- **Responsive Sizing**: Use the `sizes` prop to tell the browser how large the image will be at different breakpoints.
  ```tsx
  <Image 
    src={uri} 
    fill 
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" 
  />
  ```
- **LCP Optimization**: For the "Largest Contentful Paint" element (usually the Hero image), always add the `priority` prop. This tells the browser to load this image immediately.
  ```tsx
  <Image src={heroImage} priority ... />
  ```
- **Fill Mode**: Use `fill` with a parent container that has `relative` positioning and `aspect-ratio` to prevent Layout Shift (CLS).

### Markdown Content
A custom renderer in `BlogPostContent.tsx` automatically converts standard markdown image syntax `![alt](url)` into optimized `next/image` components.

## 2. Script Loading Policy

Third-party scripts are the biggest killer of performance. We manage them strictly using `next/script`.

- **Google Tag Manager**: Loaded with `strategy="lazyOnload"`. This means it waits until the main content is fetched and the browser is idle.
- **Chat Widgets**: Should only be loaded on user interaction (e.g., clicking a "Chat" button) or deferred significantly.
- **Avoid Synchronous Scripts**: Never put `<script src="...">` in the `<head>` or body.

## 3. Code Splitting & Lazy Loading

Next.js splits code by route automatically. We enhance this by lazy loading heavy components that are below the fold.

- **Dynamic Imports**: Components like `HeroBackground`, `Footer`, or distinct "Demo" components are imported dynamically.
  ```tsx
  const HeroBackground = dynamic(() => import('@/components/HeroBackground'), { 
    ssr: false 
  });
  ```
- **Route Prefetching**: `Link` components prefetch routes in the background when they enter the viewport, making navigation instant.

## 4. Animation Performance

- **LCP-Sensitive**: Do not animate the opacity or position of the main Heading (`h1`) or Hero Text on initial load. Hiding this text until JS loads hurts LCP significantly.
- **GPU Acceleration**: Use `transform` and `opacity` for animations (handled by Framer Motion) to avoid expensive layout reflows.

## 5. Interpreting Scores

- **Localhost vs. Production**: 
  - **Local**: Scores will be lower (e.g., ~80). You may see warnings like **"Minify JavaScript"** or **"Reduce unused JavaScript"**. These appear because you are likely running in **Development Mode** (`npm run dev`), which keeps code uncompressed for debugging.
  - **Production**: Scores are higher (90+) because Vercel automatically compresses (minifies) your code and caches optimization at the Edge.
- **Animation Warnings**:
  - You might see "Avoid non-composited animations". This is caused by the **Hero Background** SVG network, which animates connection lines (`x1`, `y1`).
  - **Verdict**: Since your production score is 93+, this visual effect is acceptable. However, keep an eye on "Main Thread Work" if you add more complex animations later.
- **Mobile vs. Desktop**: Always optimize for Mobile. If Mobile is fast (90+), Desktop will be perfect (100).
- **Core Web Vitals**: Focus on passing these three metrics over just the "Score":
  - **LCP** (Loading Speed): < 2.5s
  - **INP** (Responsiveness): < 200ms
  - **CLS** (Visual Stability): < 0.1

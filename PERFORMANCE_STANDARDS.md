# Frontend Performance Standards - Quick Reference

**⚠️ ADD THIS TO YOUR FRONTEND REPO ROOT**

Copy this file to the root of `new-portfolio-next-app` or any frontend project.

---

## 🎯 Performance Requirements

**BEFORE EVERY DEPLOYMENT:**

```bash
# Run PageSpeed Insights test
https://pagespeed.web.dev/analysis?url=https://YOUR-STAGING-URL

# Required scores (Mobile):
Performance:     94+ ✅
Accessibility:  100  ✅
Best Practices: 100  ✅
SEO:            100  ✅
```

**Current Baseline:** https://next.henrybarefoot.com/
- Performance: 94
- All others: 100

---

## 🚨 Critical Rules

1. **Never deploy if scores drop below baseline**
2. **Test on staging before production**
3. **Optimize images, fonts, and scripts**
4. **Document any performance changes in PR**

---

## 📋 Pre-Deployment Checklist

- [ ] Run PageSpeed Insights on staging
- [ ] All scores ≥ baseline (94+, 100, 100, 100)
- [ ] Images optimized (WebP format)
- [ ] JavaScript code-split by route
- [ ] Fonts optimized (`font-display: swap`)
- [ ] No layout shifts (CLS < 0.1)
- [ ] Tested on real mobile device

---

## 🛠️ Quick Optimization Guide

### Images
```bash
# Use WebP format
npm install sharp
npx sharp input.jpg -o output.webp

# Or use Squoosh.app for manual compression
```

### Fonts
```js
// In your font config
font-display: 'swap'
```

### Code Splitting
```js
// Next.js - use dynamic imports
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
})
```

### Bundle Analysis
```bash
# Next.js
npm run build
# Opens bundle analyzer automatically
```

---

## 📖 Full Documentation

See: `/home/hbarefoot/clawd/PERFORMANCE_STANDARDS.md`

Or on GitHub: TBD (add link after pushing)

---

## ⚡ Remember

> "Performance is a feature. Your site scores 94+. Keep it that way."

**Questions?** Check PERFORMANCE_STANDARDS.md for detailed guidelines.

---

**Last Updated:** 2026-01-29

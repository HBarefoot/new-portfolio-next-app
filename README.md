# Henry Barefoot - Portfolio Website

A modern, responsive single-page portfolio website built with Next.js 14, React, TypeScript, and Tailwind CSS, showcasing the professional work and expertise of Henry Barefoot, Senior Web Developer.

## 🚀 Features

- **Modern Tech Stack**: Next.js 14 with App Router, React 18, TypeScript, Tailwind CSS
- **Responsive Design**: Mobile-first approach with seamless cross-device experience
- **Smooth Animations**: Framer Motion for engaging user interactions
- **Interactive Components**: Dynamic contact form, smooth scrolling navigation
- **Professional Sections**: Hero, About, Skills, Experience, Projects, Contact
- **SEO Optimized**: Meta tags, structured data, and performance optimization
- **Accessibility**: WCAG compliant with proper semantic HTML and ARIA labels

## 🛠️ Built With

- [Next.js 14](https://nextjs.org/) - React framework with App Router
- [React 18](https://reactjs.org/) - UI library
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide React](https://lucide.dev/) - Icon library

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the portfolio.

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Main page with all sections
│   └── globals.css         # Global styles and animations
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx            # Hero section with intro
│   ├── About.tsx           # About/profile section
│   ├── Skills.tsx          # Technical skills showcase
│   ├── Experience.tsx      # Work experience timeline
│   ├── Projects.tsx        # Featured projects grid
│   ├── Contact.tsx         # Contact form and info
│   └── Footer.tsx          # Footer with links
├── types/
│   └── index.ts            # TypeScript type definitions
public/
├── henry-barefoot-resume.pdf  # Resume download file
└── favicon.ico             # Site favicon
```

## 🎨 Customization

### Adding Your Resume
1. Replace `public/henry-barefoot-resume.pdf` with your actual resume
2. The download button in the Hero section will automatically use this file

### Updating Content
- **Personal Info**: Edit the Hero component (`src/components/Hero.tsx`)
- **Skills**: Update the skills array in (`src/components/Skills.tsx`)
- **Experience**: Modify the experiences array in (`src/components/Experience.tsx`)
- **Projects**: Add your projects in (`src/components/Projects.tsx`)
- **Contact**: Update contact information in (`src/components/Contact.tsx`)

### Styling
- **Colors**: Modify CSS variables in `src/app/globals.css`
- **Fonts**: Update font imports in `src/app/layout.tsx`
- **Animations**: Customize Framer Motion animations in component files

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🎯 SEO & Performance

- Optimized meta tags and Open Graph data
- Semantic HTML structure
- Image optimization with Next.js Image component
- Fast loading with Next.js optimization
- Accessibility compliance (WCAG 2.1)

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Deploy automatically with each push

### Other Platforms
- **Netlify**: Drag and drop the build folder
- **GitHub Pages**: Use GitHub Actions for deployment
- **Custom Server**: Build and serve the static files

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contact

Henry Barefoot - [henrybarefoot1987@gmail.com](mailto:henrybarefoot1987@gmail.com)

Project Link: [https://next.henrybarefoot.com](https://next.henrybarefoot.com)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

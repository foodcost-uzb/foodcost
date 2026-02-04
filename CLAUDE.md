# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Modern landing page for FOODCOST — restaurant consulting company (HoReCa sector). Built with Next.js 15, TypeScript, Tailwind CSS 4, and Framer Motion.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: npm

## Commands

```bash
# Development
npm run dev       # Start dev server at http://localhost:3000

# Build
npm run build     # Production build
npm run start     # Start production server

# Linting
npm run lint      # Run ESLint
```

## Project Structure

```
src/
├── app/
│   ├── globals.css    # Global styles, CSS variables, animations
│   ├── layout.tsx     # Root layout with metadata
│   └── page.tsx       # Home page (assembles all sections)
├── components/
│   ├── Header.tsx     # Navigation with mobile menu
│   ├── Hero.tsx       # Hero section with stats
│   ├── Services.tsx   # Bento grid services layout
│   ├── About.tsx      # Company info section
│   ├── Cases.tsx      # Case studies/portfolio
│   ├── Calculator.tsx # Interactive food cost calculator
│   ├── Testimonials.tsx # Client reviews carousel
│   ├── ContactForm.tsx  # Contact form with social links
│   ├── Footer.tsx     # Site footer
│   └── FloatingButtons.tsx # Fixed WhatsApp/Phone buttons
└── lib/
    └── utils.ts       # Utility functions (cn for classnames)
```

## Design System

CSS variables defined in `globals.css`:
- `--primary`: #f97316 (orange)
- `--secondary`: #1e293b (slate)
- `--accent`: #fbbf24 (amber)

Key classes:
- `.gradient-text` - Orange to amber gradient text
- `.glass` - Glassmorphism effect
- `.bento-item` - Animated card hover effect
- `.animate-float` - Floating animation
- `.animate-pulse-glow` - Glowing pulse effect

## Notes

- All components use Framer Motion for scroll-triggered animations
- Images use Unsplash URLs (replace with actual images for production)
- Contact form is frontend-only (add backend integration as needed)
- Phone numbers are placeholders — update in Header, ContactForm, Footer, FloatingButtons

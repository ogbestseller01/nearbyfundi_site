# NearbyFundi Website

A polished, motion-rich marketing website for NearbyFundi built with React, TypeScript, Vite, Tailwind CSS and Framer Motion.

## Highlights

- **Hero animations** — staggered entrance, floating badges, gradient orbs, live mockup gallery (WOW.js-style reveals using Framer Motion)
- **Scroll reveals** on About, Services and more
- **Animated mobile menu**
- English / Swahili toggle + dark mode
- Fully responsive

## Sections

- Home (enhanced hero)
- About
- Services
- Blog / product stories
- Careers
- FAQ
- Support
- Contact
- Partners

## Run

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Project structure

```text
src/
  components/
    Footer.tsx
    Hero.tsx
    Motion.tsx      # Reveal / Stagger helpers (Framer Motion)
    Navbar.tsx
    PhoneMockup.tsx
    Sections.tsx
  data/
    content.ts
    services.ts
  App.tsx
  index.css
  main.tsx
```

The contact form is intentionally static. Connect it to your Laravel/API endpoint when the backend is ready.

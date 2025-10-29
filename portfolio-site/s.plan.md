<!-- 0d15c139-6c72-444f-8c73-b8cb679d5b37 aaeeab56-495e-4549-8cd6-c17a415cfcaa -->
# Professional, Sleek Developer Portfolio

## Recommendation

- **Navigation**: Sleek section-based scrolling with subtle parallax and a horizontal project carousel; no scroll-jacking. Smooth, inertial scroll.
- **Animation stack**: **Framer Motion** for interactions + **Lenis** for smooth scrolling; optional **GSAP** timeline only if needed. Keep 3D as tasteful accent (R3F hero background), not core navigation.
- **Visual style**: **Glassmorphism** (frosted glass) with soft gradients, subtle noise, gradient borders, and tasteful glow accents.
- **Priorities**: Performance, accessibility (keyboard/ARIA), mobile-first responsiveness, crisp typography.

## Architecture

- **Framework**: Next.js (App Router) already present.
- **Styling**: CSS variables + utilities in `app/globals.css`. Add glass tokens: `--glass-bg`, `--glass-border`, `--glass-shadow`, `--blur`.
- **Animation**: `framer-motion`, `@studio-freight/lenis`.
- **Content**: Centralized `lib/projects.ts` for project metadata.
- **UI Primitives**: Add `GlassCard`, `GlassNav`, `GlassButton`, `GlassModal`, `MotionInView`.

## Glassmorphism UI & React Bits

- **Glass primitives**: Backdrop blur, translucent gradients, 1px gradient border, subtle inner/outer glows, noise overlay.
- **Components (react-bits inspired)**:
- **Dock / Floating navbar** with glass background and active indicator.
- **Bento grid / Spotlight cards** for hero and projects overview.
- **Marquee / Logo loop** with glass chips.
- **Hover spotlight** effect on cards and CTA areas.
- **Modal / Sheet** with glass and spring transitions for project case studies.

## Pages & Sections

- `app/page.tsx`: One-page layout with anchored sections and top nav.
- `components/HeroSection.tsx`: Headline, typewriter, glass CTA dock, subtle 3D/particle accent.
- `components/TechStack.tsx`: Logo loop as glass chips, tooltips.
- `components/Projects.tsx`: Horizontal gallery of glass cards, case study glass modal.
- `components/About.tsx`: Glass panels with accolades and highlights.
- `components/Contact.tsx`: Glass form with validation and direct email.

## Motion & Interactions

- Smooth scrolling via Lenis with reduced motion fallback.
- Framer Motion: section reveals, magnetic buttons, hover tilt, spotlight cursor.
- Scroll-linked effects: progress indicator, parallax in hero, staggered project cards.

## Performance & SEO

- Next/Image for assets; preloading key fonts; throttle rAF effects; tree-shake motion features.
- Metadata in `app/layout.tsx`; OpenGraph image; sitemap/robots.

## Accessibility

- Reduced motion respect, focus-visible styles on glass components, semantic landmarks, ARIA labels.

## Files to Add/Change (key)

- `lib/projects.ts` (data)
- `components/Projects.tsx`, `components/About.tsx`, `components/Contact.tsx`
- Enhance `components/HeroSection.tsx`, `components/TechStack.tsx`, `components/LogoLoop.tsx`
- `components/ui/GlassCard.tsx`, `components/ui/GlassButton.tsx`, `components/ui/GlassNav.tsx`, `components/ui/GlassModal.tsx`
- `components/ui/MotionInView.tsx`, `components/ui/Spotlight.tsx`, `components/ui/Dock.tsx`
- Update `app/globals.css` with glass variables and utilities

## Implementation Notes

- Replace removed `hooks/useParallax.ts` with Framer scroll/transform utilities.
- Glass tokens example: `--glass-bg: rgba(255,255,255,0.06)`, `--blur: 12px`, gradient border via mask, subtle `drop-shadow`.
- Keep interactions crisp: 200–400ms durations; easing `easeOut`. Ensure keyboard and touch parity.

### To-dos

- [ ] Add Framer Motion and Lenis dependencies and initialize smooth scroll
- [ ] Create lib/projects.ts with project metadata and images
- [ ] Add ui primitives Section, Container, MotionInView components
- [ ] Enhance HeroSection with typewriter, parallax layers, CTA
- [ ] Polish TechStack and LogoLoop with motion and tooltips
- [ ] Build Projects horizontal gallery with modals and keyboard nav
- [ ] Create About section with bio and highlights
- [ ] Create Contact section with form (server action) and validation
- [ ] Add top nav, anchors, and scroll progress indicator
- [ ] Implement reduced-motion, focus styles, ARIA labels, skip link
- [ ] Optimize images, fonts; add metadata, OG image, robots/sitemap


# WorkVisas.work Landing Page - Design Specification

## Project Context
A professional landing page for WorkVisas.work (powered by MoveHub) targeting New Zealand employers seeking reliable, pre-screened workers from China for agriculture, meat processing, forestry, logistics, and hospitality industries.

---

## 1. Expanded Design Brief

### Hero Section (Video-Led)
- **Primary**: Full-viewport cinematic video showcasing New Zealand's stunning agricultural landscapes with workers in action
- **Video Style**: Slow-motion, golden hour cinematography featuring rolling green hills, orchards, dairy farms, and forestry
- **Overlay**: Semi-transparent dark gradient for text legibility
- **Typography**: Massive, bold headline with warm undertones
- **CTA**: Two buttons - "Get Started" (primary) and "Learn More" (secondary)

### Typography Strategy
- **Headlines**: Bold, confident sans-serif (Inter or similar)
- **Body**: Clean, readable sans-serif
- **Scale**: Hero 64-80px, Section headers 36-48px, Body 16-18px

### Layout Philosophy
- Clean, spacious sections with generous white space
- Card-based layouts for features and industries
- Alternating section backgrounds for visual rhythm
- Smooth scroll animations

### Motion Design
- Fade-in on scroll for sections
- Subtle hover effects on cards and buttons
- Smooth parallax on hero video
- Number counters for statistics

---

## 2. Tech Strategy

### Stack
- Single HTML file with embedded CSS and minimal JS
- TailwindCSS via CDN for rapid styling
- Intersection Observer for scroll animations
- CSS Grid and Flexbox for responsive layouts

### Asset Protocol
- Hero video: 1080p cinematic loop (6 seconds)
- Industry icons: SVG inline
- All media paths verified before deployment

---

## 3. Design System

### Color Palette (NO BLUE/PURPLE)

**Primary Colors**:
- Forest Green: `#2D5A3D` - Trust, nature, growth
- Warm Earth: `#8B6914` - Warmth, reliability
- Soft Cream: `#FDF8F0` - Clean backgrounds

**Secondary Colors**:
- Deep Charcoal: `#1A1A1A` - Headlines, strong text
- Warm Gray: `#4A4A4A` - Body text
- Light Sage: `#E8F0E8` - Section backgrounds
- Soft Orange Accent: `#D97706` - CTAs, highlights

**Gradients**:
- Hero overlay: `linear-gradient(135deg, rgba(26,26,26,0.7), rgba(45,90,61,0.5))`
- CTA buttons: `linear-gradient(135deg, #D97706, #B45309)`

### Typography Scale
```
Hero Title: 72px / 900 weight
Section Title: 48px / 700 weight
Subsection: 32px / 600 weight
Body Large: 20px / 400 weight
Body: 16px / 400 weight
Caption: 14px / 400 weight
```

### Spacing System (8px base)
```
Section padding: 80px-120px vertical
Card gaps: 24px-32px
Component padding: 16px-32px
```

### Border Radius
- Cards: 16px
- Buttons: 8px
- Small elements: 4px

---

## 4. Section Breakdown

### Hero
- Full viewport video background
- Brand logo top-left
- Navigation top-right (optional)
- Centered headline + subheadline
- Two CTAs side by side

### Problem Section
- Dark background (Deep Charcoal)
- 4 pain points in cards
- Icons for each problem

### Solution Section
- Light cream background
- 6 solution features in grid
- Checkmark icons

### Industries Section
- Sage green background
- 5 industry cards with icons
- Hover lift effect

### 4-Module System
- Alternating card layout
- Module letters as large design elements
- Progress/pipeline visual

### How It Works
- 4-step horizontal timeline
- Numbered circles
- Connecting lines

### Why Choose Us
- Feature grid with icons
- Statistics counter section

### Compliance Section
- Trust badges/icons
- Clean list format

### Testimonials
- Placeholder cards
- Quote design
- Company logos

### CTA Footer
- Strong headline
- Contact form or button
- Contact details

---

## 5. Accessibility
- WCAG AA contrast ratios
- Focus states on interactive elements
- Semantic HTML structure
- Alt text for all images
- Keyboard navigation support

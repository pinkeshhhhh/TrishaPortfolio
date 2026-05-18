# Trisha Pandey Portfolio — Complete Design System & Redesign Spec

---

## 1. Creative Direction & Concept

### Theme: **"Dark Couture Editorial"**
Think high-fashion magazine meets digital art studio. Deep ink blacks, electric marigold-gold accents, dusty rose blush tones, and pure white sparks. The aesthetic borrows from luxury editorial photography, underground zine culture, and premium motion design. Every transition is felt, every hover is alive, every section rewards curiosity.

**The one unforgettable thing:** A card-stack swipe interaction for the graphic design portfolio — like flipping through a physical portfolio book, but digital, tactile, and cinematic. Works both on touch (mobile swipe) and desktop (drag/keyboard).

---

## 2. Color Palette

```
--bg-void:       #080808   /* near-black base */
--bg-surface:    #111010   /* elevated surface */
--bg-card:       #181616   /* card backgrounds */
--gold:          #E8C06A   /* marigold gold — primary accent */
--gold-dim:      #B8933E   /* muted gold for text */
--blush:         #D4857A   /* dusty rose accent */
--smoke:         #3A3632   /* border / divider */
--white:         #F5F0EA   /* warm off-white for body text */
--white-bright:  #FFFFFF   /* highlights */
--overlay:       rgba(8,8,8,0.85) /* modal overlays */
```

**Gradient Meshes used for hero & section accents:**
- Gold radial glow: `radial-gradient(ellipse at 20% 50%, rgba(232,192,106,0.12) 0%, transparent 70%)`
- Blush accent: `radial-gradient(ellipse at 80% 30%, rgba(212,133,122,0.08) 0%, transparent 60%)`

---

## 3. Typography System

```
Display Font:    "Playfair Display" — italic for hero name, section titles
UI / Labels:    "DM Mono" — uppercase tracking, eyebrows, stat numbers, tool tags
Body Font:      "Instrument Sans" — readable, modern, friendly
Accent Script:  "Yeseva One" — used sparingly for the hero tagline flourish
```

**Import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700;1,900&family=DM+Mono:wght@300;400;500&family=Instrument+Sans:wght@300;400;500;600&family=Yeseva+One&display=swap" rel="stylesheet">
```

**Type Scale:**
```
Hero Name:      clamp(72px, 12vw, 140px) — Playfair Display Italic 900
Section Title:  clamp(44px, 6vw, 80px) — Playfair Display 700
Section Label:  11px, DM Mono, letter-spacing: 0.25em, uppercase, gold
Body:           17px/1.8 — Instrument Sans 300
Stats:          clamp(36px, 5vw, 56px) — DM Mono 500
Card Labels:    13px — DM Mono 400
```

---

## 4. Page Structure & Section Order (Redesigned)

Old order → New order:

```
OLD:  Hero → About → Skills → Tools → Quote → Work → Contact → Footer
NEW:  Loader → Hero → Marquee → Work (Stack) → About → Services → Tools → Reels → Contact → Footer
```

**Rationale:** Lead with identity and then immediately immerse in the work — the portfolio is the proof. About and services follow once trust is established. Reels get a dedicated cinematic section (not a sub-tab). Contact is the final CTA with maximum warmth.

---

## 5. Custom Cursor

A soft circular cursor (24px) with a trailing "blob" (8px dot). On hover over interactive elements, the large circle expands to 56px and blends in `mix-blend-mode: difference`, inverting the colors beneath it — creating a premium "lens" effect.

```js
// cursor.js — two divs: .cursor-ring and .cursor-dot
// ring follows with lerp (0.12 lag factor) for smooth trailing
// dot snaps immediately
// on hover [data-cursor="grow"]: ring scale(2.2) + mix-blend-mode difference
// on hover links: ring scale(1.5) + background rgba(232,192,106,0.15)
```

---

## 6. Page Load Sequence

**Custom Loader (1.8s):**
- Full screen `#080808` with a centered `T.` in Playfair Display Italic, gold
- The `.` expands outward like a ripple, then the whole loader slides up revealing the page beneath
- Total loader time: 1.8s, then hero animates in

```
0ms    → Logo "T." fades in
600ms  → Gold dot pulses (scale 1 → 1.4 → 1)
1200ms → "T." slides up 40px, fades out
1400ms → Panel slides off-screen (translateY -100%)
1600ms → Hero elements stagger in
```

---

## 7. Section: HEADER / NAVIGATION

**Design:**
- Fixed, full-width, `position: fixed; top: 0; z-index: 100`
- Initially transparent; after 80px scroll → `backdrop-filter: blur(20px); background: rgba(8,8,8,0.75); border-bottom: 1px solid rgba(232,192,106,0.1)`
- Logo: `Trisha.` in Playfair Display Italic — the `.` is gold and animates rotation 360° on hover
- Nav links in DM Mono 12px uppercase, 0.15em tracking, spaced with `gap: 36px`
- Active link underline: animated gold line that slides from left to right (not just `border-bottom` — a `::after` pseudo with `scaleX` transform)
- On scroll, nav link corresponding to current section gets a subtle gold tint `color: var(--gold)`
- Hamburger (mobile): 3 lines → animated into an "×" using CSS transforms (no JS needed for animation)
- Mobile nav: full-screen overlay, links centered with massive Playfair Display type, each link enters with a staggered `translateY(60px) → 0` animation

---

## 8. Section: HERO

**Layout:** Full viewport height (`100svh`). No top padding to account for fixed nav. Two zones: left text, right photo. Ratio: 55/45.

**Left Zone:**
```
[DM Mono eyebrow]  PORTFOLIO · 2025
[Playfair Display Italic 900]
Trisha
Pandey.

[Yeseva One, blush tone]
Graphic Designer & Video Editor
Visual Storyteller & Brand Builder

[CTA button]  ◉ View My Work
```

**Right Zone:**
- Photo in a **free-form blob mask** (SVG `clipPath` — organic 8-point shape)
- Blob border: 2px dashed gold, slightly rotated from the clip shape, creating a halo gap
- Blob floats: `animation: heroFloat 5s ease-in-out infinite alternate` (translateY ±16px, slight rotate ±1.5deg)
- Behind the blob: gold radial glow + blush radial glow, opacity 0.3 each
- Bottom-left of blob: `"Bringing Brands to Life"` badge — pill shape, dark bg, gold text, rotated -12deg

**Text animations on load:**
- Eyebrow: `translateY(20px) opacity 0 → 1`, delay 1.6s
- Hero name lines: each letter wraps in a span, animated with staggered `translateY(100%) → 0` (text reveal from below)
- Tagline: fade + slide, delay 2.0s
- CTA: scale(0.8) opacity 0 → 1, delay 2.2s

**Background:**
- Noise texture overlay (SVG filter or base64 PNG grain, `opacity: 0.04`) on `--bg-void`
- Subtle animated gradient blob in top-right using CSS animation `@keyframes blobPulse`

**Scroll indicator:** Bottom center — `↓` in DM Mono with a breathing opacity animation

---

## 9. Section: MARQUEE / DIVIDER

A full-width infinite-scroll marquee band (dark gold-tinted background `rgba(232,192,106,0.06)`, 1px top/bottom borders in `rgba(232,192,106,0.2)`).

```
✦  Graphic Design  ·  Video Editing  ·  Brand Identity  ·  Visual Storytelling  ·  Content Creation  ✦ [repeats]
```

- Font: DM Mono 13px uppercase, letter-spacing 0.2em
- Two tracks: top scrolls right, bottom scrolls left (bidirectional marquee)
- Speed: 25s linear infinite
- Pauses on `prefers-reduced-motion`

---

## 10. Section: WORK — GRAPHIC DESIGN (Card Stack)

**This is the hero feature of the redesign.**

### Layout
Full-width section with a fixed-height card viewport (`height: 70vh`, `max-height: 620px`). Cards are stacked absolutely on top of each other. Only the top 3 cards are visible — card 1 fully, card 2 peeking below-right by 12px, card 3 by 20px.

### Card Anatomy
```
┌─────────────────────────────────┐
│                                 │
│   [full image, object-fit cover]│
│                                 │
│   ┌─────────────────────────┐   │
│   │ NUMBER  TITLE  CATEGORY │   │  ← bottom overlay, glass morphism
│   └─────────────────────────┘   │
└─────────────────────────────────┘
```
- Card size: 360×520px on desktop, 300×440px on mobile
- Corner radius: 20px
- Card shadow: `0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(232,192,106,0.1)`
- Bottom overlay: `background: linear-gradient(to top, rgba(8,8,8,0.95) 0%, transparent 60%)`
- Overlay content: DM Mono number (like `01`), Instrument Sans title, small gold category tag

### Stack Interaction (3 modes)
**1. Drag/Swipe (Mouse + Touch):**
- User grabs top card. It follows cursor/finger with `requestAnimationFrame` lerp
- Rotation follows horizontal delta: `rotate(delta * 0.08deg)`, max ±25deg
- At 30% of card width threshold → card "commits" to the direction
- On commit left: card animates `translateX(-120%) rotate(-25deg) opacity(0)`, next card rises from stack
- On commit right: same but right
- On release before threshold: card snaps back with spring animation (`cubic-bezier(0.34, 1.56, 0.64, 1)`)

**2. Navigation Arrows:**
Two minimal arrow buttons to the left and right of the stack. On click, programmatically triggers the swipe animation in that direction.

**3. Keyboard:**
`←` / `→` arrow keys navigate when the section is in viewport. `Escape` returns card to top.

### Card Counter
Below the stack: `03 / 18` in DM Mono gold. Updates live with each swipe.

### Swipe Hint
On first load (or if no interaction after 3s), a subtle animated arrow hint appears: hand icon dragging left, then fades out after 2s.

### Work Items (all 18 pieces):
```
01  Online Course Poster       — Poster Design · Education
02  Vlog YouTube Thumbnail     — Thumbnail · Content
03  Café Open Hours Poster     — Poster Design · Brand
04  Coffee Menu Design         — Menu Design · Print
05  Kiara Advani Fan Edit      — Celebrity Design · Visual
06  Science Event Poster       — Poster Design · Education
07  Fashion Instagram Post     — Social Media · Fashion
08  Creative Digital Art 1     — Digital Art · Picsart
09  Creative Digital Art 2     — Digital Art · Picsart
10  Creative Digital Art 3     — Digital Art · Picsart
11  Creative Digital Art 4     — Digital Art · Picsart
12  Creative Digital Art 5     — Digital Art · Picsart
13  Creative Digital Art 6     — Digital Art · Picsart
14  Creative Digital Art 7     — Digital Art · Picsart
15  Creative Digital Art 8     — Digital Art · Picsart
16  Creative Digital Art 9     — Digital Art · Picsart
17  Creative Digital Art 10    — Digital Art · Picsart
18  Creative Digital Art 11    — Digital Art · Picsart
```

### After Last Card
When all cards are swiped, a "You've seen it all 🎉" state appears with a `Shuffle & Restart` button — reshuffles the array and rebuilds the stack.

---

## 11. Section: ABOUT

**Layout:** Diagonal split. Left panel: photo (rotated 2deg, with grain overlay + gold border). Right panel: text. Background: `--bg-surface` with a faint noise grain.

**Content:**
```
[DM Mono eyebrow]  01 — ABOUT

[Playfair Display Italic]
A Creative Mind
at Work.

[Instrument Sans body]
Hi, I'm Trisha Pandey — a passionate beginner in graphic design
and video editing, eager to turn creative ideas into visually
engaging designs and compelling videos. I enjoy exploring colors,
typography, and motion to create content that communicates clearly
and leaves a lasting impression.

As I continue learning and improving, I focus on attention to
detail, creativity, and delivering work that reflects both
originality and professionalism. I aim to create designs that are
modern and meaningful — always growing, always creating.
```

**Stats Row** (below bio, animated count-up on scroll enter):
```
∞   Creative Ideas
2+  Design Skills
100% Passion Driven
```
Stat numbers in DM Mono 500, values in DM Mono 300 below.

**Quality Grid (4 cards):**
Horizontal scroll on mobile, 2×2 on desktop.
Each card: dark `--bg-card`, gold top-border `2px solid gold`, number in DM Mono oversized gold, title in Playfair Display, desc in Instrument Sans 300.

```
01  Professionally Clean     balanced layouts, thoughtful color choices...
02  More Creative            turning ideas into visual stories...
03  Skill-Focused            poster design, brand design, video editing...
04  Ever Growing             sharpening skills every day...
```

Cards have a `::before` pseudo-element that creates a rising gold shimmer on hover (keyframe animation, `background: linear-gradient` that translateX from -100% to 100%).

---

## 12. Section: SERVICES / SKILLS

**Layout:** Full-width, alternating layout. Section label top-center.

**Title:**
```
[Playfair Display Italic 900]
Services &
Expertise.
```

**Service Cards — Horizontal Pill-List Layout:**
Not a grid — instead, each service is a full-width pill/row that expands on hover (accordion feel):

```
◈  Graphic Design
   [collapsed by default — hover reveals description text sliding in from right]

▶  Video Editing

✦  Brand Design

◉  Content Creation

⬡  Visual Storytelling

◇  Typography & Color
```

Each pill:
- Height collapsed: 64px; expanded: 120px
- Left: oversized symbol (48px, gold, DM Mono)
- Center: service name (Playfair Display 500, 24px)
- Right: on hover, description text appears with a `max-height` + opacity transition, plus a `→` arrow morphs into a `↓` indicator
- Bottom border: 1px `--smoke`; on hover, border color transitions to gold
- No JS needed — can be done with CSS `:hover` + `max-height` transition

---

## 13. Section: TOOLS

**Layout:** `--bg-void`. Section label + title. Then tools in a floating tag-cloud style.

**Title:**
```
[Playfair Display]
My Toolkit.
```

**Tool Tags (not boring cards):**
Each tool is a pill/chip: icon + name, styled like a badge.
```
┌────────────────────┐
│  [SVG icon]  Photoshop  │
└────────────────────┘
```
- Background: `rgba(232,192,106,0.06)`
- Border: `1px solid rgba(232,192,106,0.2)`
- On hover: `background: rgba(232,192,106,0.12)`, border gold full opacity, slight `translateY(-4px)` lift
- Tags arranged in a non-grid pattern — flex with `flex-wrap: wrap; gap: 16px; justify-content: center` but each chip has a slightly different `margin-top` to create a natural scattered look

**Tools:**
- Adobe Photoshop (real SVG icon)
- Adobe Illustrator (real SVG icon)
- Adobe After Effects (real SVG icon)
- Adobe Premiere Pro (real SVG icon)
- Canva (real SVG icon)
- Figma (real SVG icon)

**Floating Quote Block (below tools):**
```
"Design is not just what it looks like and feels like.
  Design is how it works."
                                    — Steve Jobs
```
Typeset in Playfair Display Italic, centered, with gold quotation marks at 4× size, opacity 0.15, positioned absolutely behind the text.

---

## 14. Section: VIDEO REELS (Instagram)

**This section is completely reimagined from the original grid of small cards.**

### Concept: Full-Screen Reel Viewer
A horizontal scroll track of large reel previews. On click/tap → the reel expands to fill the screen in a native-feeling modal.

### Reel Preview Cards (in track):
Each card: `320px × 560px` (9:16 ratio, like a phone screen)
- Poster image fills the card
- Bottom glass overlay: reel number, title, description
- Play button: centered circle (56px), white, semi-transparent bg
- On hover: play button scales 1.2×, card lifts `translateY(-8px)`, border appears

Cards are in a horizontal scroll container: `display: flex; gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory`. Each card: `scroll-snap-align: center`.

**On desktop:** prev/next arrows on either side of the track.

### Full-Screen Instagram Modal (on click):
- Overlay: `position: fixed; inset: 0; background: rgba(0,0,0,0.95); z-index: 1000`
- Centered iframe: `instagram.com/p/{REEL_ID}/embed/` with `max-width: 420px; max-height: 740px`
- On mobile: iframe takes full screen
- Close button: top-right `✕` (DM Mono)
- Prev/Next buttons: left/right sides of the modal for navigating between reels without closing

**Reels List:**
```
01  Mid-Form Celebrity Edit     → DT8LdexEqbJ
02  Women in Love — Reel        → DQw01UbkrWm
03  Kiara Advani — Fan Edit     → DSbuHJHkhEJ
04  Short-Form Content          → DQraUbUkie3
```

**Instagram Profile Banner (below reel track):**
```
┌──────────────────────────────────────────────────────┐
│  [IG gradient icon]   @kiaracxfilms                  │
│                       Follow for more edits          │
│                                    [Visit Profile →] │
└──────────────────────────────────────────────────────┘
```
- Background: `linear-gradient(135deg, rgba(131,58,180,0.15), rgba(253,29,29,0.08), rgba(252,176,69,0.12))`
- Border: 1px IG gradient

---

## 15. Section: CONTACT

**Layout:** Two columns on desktop (60/40), stacked on mobile.

**Left Column:**
```
[DM Mono eyebrow]   05 — CONTACT

[Playfair Display Italic]
Let's Create
Together.

[Instrument Sans body]
Have a project in mind? Whether it's a brand identity, a poster,
or a video edit — I'd love to hear about it.
```

**Contact Items (each a styled row with hover lift + redirect):**
```
@ Email
  trishapanday37@gmail.com
  [href="mailto:trishapanday37@gmail.com"] ← clickable entire row
  Opens: native mail client

☏ Phone
  +91 9954 300 971
  [href="tel:+919954300971"] ← clickable
  Opens: native phone dialer (mobile) or prompts (desktop)

IG Instagram
  @kiaracxfilms
  [href="https://www.instagram.com/kiaracxfilms"] target="_blank"
  Opens: Instagram profile

in LinkedIn
  Trisha Panday
  [href="https://linkedin.com/in/trisha-panday-4820943ba"] target="_blank"
  Opens: LinkedIn profile
```

Each contact row:
- `display: flex; align-items: center; gap: 20px; padding: 20px; border-radius: 12px`
- Icon (left): 44×44px circle `--bg-card` with border `1px solid --smoke`; icon in gold
- On hover: `background: rgba(232,192,106,0.06)`, border gold, icon circle fills gold, icon turns dark
- Label (top): `DM Mono 11px uppercase gold`
- Value (bottom): `Instrument Sans 16px --white`
- Right side: animated `→` appears on hover (slides in from left)

**Right Column — Contact Form:**
Styled with glass-morphism treatment:
```
Background:  rgba(24,22,22,0.6)
Border:      1px solid rgba(232,192,106,0.15)
Border-radius: 20px
Backdrop-filter: blur(20px)
Padding:     40px
```

Form fields:
- Label: `DM Mono 11px uppercase letter-spacing 0.15em gold` (above field)
- Input: `background: rgba(255,255,255,0.04); border: 1px solid --smoke; border-radius: 8px; padding: 14px 18px; color: --white; font: Instrument Sans 16px`
- On focus: border transitions to `rgba(232,192,106,0.6)`, subtle gold box-shadow `0 0 0 3px rgba(232,192,106,0.08)`
- Textarea: same, `min-height: 140px; resize: vertical`
- Submit button: full-width, `background: --gold; color: #080808; font: DM Mono 14px 500; letter-spacing: 0.1em; border-radius: 8px; padding: 16px`
  - On hover: `background: #fff; color: #080808`
  - After send: button text morphs to `✓ Sent — Thank you!` with success state styling
- Action: `https://formspree.io/f/mgopwryo`

---

## 16. Section: FOOTER

**Design: Dramatic, full editorial treatment**

```
Background: --bg-void
Top border: 1px solid rgba(232,192,106,0.15)
Padding: 80px 0 40px
```

**Top Block — Large Logo:**
```
Trisha Pandey.
```
In Playfair Display Italic 900, `clamp(48px, 8vw, 96px)`, centered. The `.` in gold.

**Middle Band — Links Row:**
```
About  ·  Work  ·  Services  ·  Reels  ·  Contact
```
DM Mono 12px uppercase, `gap: 40px`, smoke-colored, gold on hover.

**Social Icons Row:**
Four icon circles (48×48, bg `--bg-card`, border `--smoke`), evenly spaced:
```
[Instagram]  [LinkedIn]  [Email]  [Phone]
```
All with links as defined in Contact section. On hover: gold border, icon turns gold, `scale(1.1)`.

**Bottom Bar:**
```
© 2026 Trisha Pandey · All rights reserved
```
`DM Mono 11px`, centered, `color: rgba(245,240,234,0.3)`.

**Footer Easter Egg:**
On hover of `Trisha Pandey.` in the footer, each letter gets a staggered `color: --gold` animation (wave effect), one character at a time.

**Scroll-to-Top Button:**
Fixed bottom-right corner, appears after 300px scroll:
- 48×48px circle, `--bg-card` bg, gold border, gold `↑` arrow
- On hover: bg transitions to gold, arrow turns dark
- Smooth scroll to `#top`

---

## 17. Animations Reference

### Global Reveal (Intersection Observer)
All `.reveal` elements start at `opacity: 0; transform: translateY(40px)` and transition to `opacity: 1; transform: none` with `transition: 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)`. Delay classes `.d1`→`.d4` add `animation-delay: 100ms` increments.

### Keyframes

```css
@keyframes heroFloat {
  from { transform: translateY(0) rotate(0deg); }
  to   { transform: translateY(-18px) rotate(1.5deg); }
}

@keyframes blobPulse {
  0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.12; }
  50%       { transform: scale(1.15) rotate(15deg); opacity: 0.18; }
}

@keyframes marqueeLeft {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes marqueeRight {
  from { transform: translateX(-50%); }
  to   { transform: translateX(0); }
}

@keyframes loaderDot {
  0%   { transform: scale(1); opacity: 1; }
  50%  { transform: scale(1.8); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes shimmer {
  from { transform: translateX(-100%); }
  to   { transform: translateX(100%); }
}

@keyframes footerWave {
  /* staggered per char: color: gold → white */
}
```

---

## 18. Interaction States Summary

| Element | Default | Hover | Active/Focus |
|---|---|---|---|
| Nav links | white 70% | gold + underline slide | gold |
| CTA button | gold bg, dark text | white bg, dark text | scale(0.97) |
| Card (stack) | shadow, stacked | rises 4px | drag state |
| Contact rows | dark bg | gold border + bg tint | focus ring |
| Form inputs | smoke border | — | gold border + glow |
| Submit btn | gold | white | scale(0.97) |
| Footer social | smoke border | gold border + icon | scale(0.95) |
| Tool chips | faint gold bg | full gold border + lift | — |
| Service rows | smoke bottom border | gold border + expand | — |
| Reel cards | shadow | lift + play scale | — |
| Scroll-top btn | dark bg | gold bg | scale(0.9) |

---

## 19. Responsive Breakpoints

```
Mobile:   < 600px
Tablet:   600px – 1024px
Desktop:  > 1024px
```

**Mobile adaptations:**
- Hero: stacked (photo above text, or text above photo with photo as background at 30% opacity)
- Card stack: same interaction, but cards are narrower; hint arrow appears on first load
- Services: accordion list (same design, vertical scroll)
- Reels: horizontal scroll track (touch-native swipe)
- Contact: single column
- Footer: single column

---

## 20. File Structure

```
/
├── index.html
├── style.css       (split into logical blocks with comments)
├── script.js       (modules: loader, nav, stack, marquee, reels-modal, contact-form, cursor, scroll-reveal)
├── images/
│   ├── trisha-profile.jpg
│   ├── online-course-poster.png
│   ├── vlog-routine-thumbnail.png
│   ├── cafe-poster.png
│   ├── coffee-menu.png
│   ├── kiara-advani-design.png
│   ├── science-event-poster.png
│   ├── fashion-instagram-post.png
│   ├── picsart-1.png → picsart-11.png
│   └── picsart-7.jpg → picsart-10.jpg
```

---

## 21. Script Modules (JS Architecture)

```js
// 1. LOADER
//    - Times and removes the loader, kicks off hero animation

// 2. CUSTOM CURSOR
//    - Two div elements (.cursor-ring, .cursor-dot)
//    - mousemove handler + lerp in rAF loop
//    - Hover class on [data-cursor] elements

// 3. NAV
//    - Scroll → add .scrolled class (backdrop blur)
//    - Hamburger toggle (mobile)
//    - Intersection Observer → active link update

// 4. SCROLL REVEAL
//    - IntersectionObserver on all .reveal elements
//    - threshold: 0.15, rootMargin: 0px 0px -60px 0px

// 5. MARQUEE
//    - Pure CSS (no JS needed), but JS adds pause on hover

// 6. CARD STACK
//    - State: currentIndex, cards array
//    - Events: pointerdown, pointermove, pointerup, touchstart/end
//    - Helper: swipeCard(direction) — animates and updates stack
//    - Helper: resetStack() — reshuffles and rebuilds
//    - Keyboard: ArrowLeft, ArrowRight listeners when section in view

// 7. REEL MODAL
//    - Modal open: build iframe URL, append to modal, show overlay
//    - Modal close: remove iframe (stop video), hide overlay
//    - Prev/Next: update reel index, rebuild iframe

// 8. STATS COUNTER
//    - IntersectionObserver on stats section
//    - countUp(el, target, duration) — rAF-based count animation

// 9. CONTACT FORM
//    - Intercept submit, POST to Formspree
//    - Success: button text → "✓ Sent — Thank you!"
//    - Error: alert with fallback mailto link

// 10. SCROLL-TO-TOP
//     - Show after 300px scroll
//     - Click: window.scrollTo({ top: 0, behavior: 'smooth' })
```

---

## 22. Accessibility Notes

- All interactive elements have visible `:focus-visible` rings (gold, 2px offset)
- Images: meaningful `alt` text on all work pieces
- ARIA: `aria-label` on icon-only buttons (hamburger, scroll-top, reel nav)
- Reduced motion: `@media (prefers-reduced-motion: reduce)` disables parallax, float, and marquee animations; card swipe still works, just without spring bounce
- Color contrast: gold `#E8C06A` on `#080808` = 8.6:1 (AAA), white on dark = 18:1
- Focus trap in modals (reel modal, mobile nav overlay)
- Tab order logical and sequential

---

*End of Design Spec — Ready for implementation in `index.html`, `style.css`, and `script.js`.*

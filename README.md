# Aurelia Interiors — Dynamic Business Website

A complete, responsive, multi-page business website built with **HTML5, CSS3 and vanilla
JavaScript** (no frameworks, no build step, no dependencies).

**Business:** *Aurelia Interiors* — a fictional interior design and turnkey fit-out studio
based at 24-C, MM Alam Road, Gulberg III, Lahore, Pakistan. Founded 2013.

---

## How to run

Open `index.html` in any modern browser — everything works from the file system.

For the Google Map and Google Fonts to load you need an internet connection. All photographs,
the logo and the icons are stored locally in `assets/`, so the site still looks complete offline.

Optionally, serve it locally:

```bash
python3 -m http.server 8000     # then open http://localhost:8000
```

---

## File structure

```
hamzaUniAssignment/
├── index.html          Home      — hero slider, stats, services, projects, testimonials
├── about.html          About Us  — story, values, milestones, team, awards table
├── services.html       Services  — 8 services, pricing table, estimate calculator, products, FAQ
├── portfolio.html      Portfolio — filterable gallery, search, lightbox, project details
├── contact.html        Contact   — booking form with validation, contact cards, Google Map
├── css/
│   └── style.css       Complete design system and all responsive rules
├── js/
│   ├── data.js         All site content as JavaScript data (services, projects, team, FAQs…)
│   └── main.js         All interactivity (20 modules, commented by section)
├── assets/
│   ├── logo.svg        Business logo (arch motif + wordmark)
│   ├── favicon.svg     Browser tab icon
│   └── img/            33 photographs used across the site
└── README.md
```

---

## Requirement checklist

### 1. HTML
Semantic structure throughout: `<header> <nav> <main> <section> <article> <aside> <footer>`,
headings `h1`–`h5`, paragraphs, unordered lists, **ordered lists** (About milestones, Contact
"what happens next"), **tables** (Awards on About; package comparison on Services; project
specification inside each portfolio modal), images, internal + external links, and forms.
Accessibility: skip link, ARIA labels, `aria-expanded`, `aria-pressed`, `role="alert"`,
`<caption>` and `scope` on every table, alt text on every image.

### 2. CSS
- A single design system built on CSS custom properties (colour, type, spacing, radius, shadow).
- Consistent visual theme: espresso `#14100D`, bone `#F7F3ED`, brass `#A87C36`.
- Typography pairing: **Playfair Display** (headings) + **Inter** (interface).
- Components: navigation bar, buttons (5 variants), cards, project cards, tables, forms,
  accordion, modals, lightbox, toasts, footer.
- Layout with CSS Grid and Flexbox; transitions and keyframe animations throughout.
- **Bonus:** a full dark theme, honoured by every component and saved between visits.

### 3. JavaScript events
| Type | Where it is used |
|---|---|
| **DOM manipulation** | Every card, project, table row, testimonial, FAQ and team member is built in JS from the arrays in `data.js` |
| **Mouse events** | `click` (filters, accordion, slider, modals, hearts, theme, copy) · `mouseenter` / `mouseleave` (pauses both carousels) · `mousemove` (3-D tilt on service cards) |
| **Keyboard events** | `keydown` — `Esc` closes menu / modal / lightbox, `←` `→` move the hero slider and lightbox, `/` focuses portfolio search, `Enter` / `Space` opens a focused project card, `Ctrl`+`Enter` submits the form · `keyup` — live portfolio search and the message character counter |
| **Form events** | `submit`, `input`, `change`, `blur` for real-time validation |
| **Scroll / observer** | Sticky header, reading-progress bar, back-to-top, scroll reveal, animated counters |

### 4. Dynamic website
Page content is data-driven: `js/data.js` holds the business record, 8 services, 16 projects,
4 packages, 4 products, 4 team members, 3 testimonials, 6 FAQs, 5 milestones and 5 awards.
`js/main.js` reads those arrays and renders the DOM, so content changes in one place only.
The shortlist, chosen theme and submitted enquiries persist in `localStorage`.

### 5. Multiple interconnected pages
Home · About Us · Services · Portfolio · Contact Us — linked from the header, the mobile
drawer, the footer and in-page calls to action. The current page is highlighted automatically.

### 6. Business content
Full studio profile: services with detail, published per-square-foot pricing, 16 case studies
with location / year / area / duration / value, team biographies, awards, opening hours,
two phone numbers, two email addresses and a street address.

### 7. Pictures
33 photographs, arranged as a hero slider, an overlapping collage, project cards, product
cards, team portraits and testimonial avatars. All are locally stored and lazy-loaded.

### 8. Logo
Custom SVG logo — an architectural arch that also reads as an "A" — used in the header,
the footer, the preloader and as the favicon. It recolours itself for light and dark themes.

### 9. Functionality
Every link, button, filter, slider, accordion, modal and form control works. Verified with
automated browser tests: no console errors on any page.

### 10. Responsive design
Fluid layouts using `clamp()`, CSS Grid and Flexbox, with breakpoints at 1080px, 900px, 640px.
Verified free of horizontal overflow at 1440 / 1024 / 820 / 640 / 390 px. Below 900px the
navigation becomes a full-screen drawer. Also honours `prefers-reduced-motion` and has a
print stylesheet.

### 11. WhatsApp & social media
A floating WhatsApp button on every page, plus WhatsApp calls to action in the hero, footer,
contact sidebar and product cards — each opens a `wa.me` link with a message already written.
The estimate calculator sends your actual figures through to the chat. Four social platforms
are linked in the footer, on team cards and in the contact sidebar: **Facebook, Instagram,
LinkedIn and YouTube**.

### 12. Online form
A consultation booking form with eleven fields and full JavaScript validation — no HTML5
validation is relied on (`novalidate` is set). Rules include a name pattern, an email pattern,
a Pakistani mobile pattern (`03XXXXXXXXX` / `+923XXXXXXXXX`), a numeric area range, a
no-past-dates check, a minimum message length and a required consent box. Errors appear
inline as you leave each field and clear as you correct them; on submit the first invalid
field is scrolled to and focused. A valid submission shows a confirmation modal with a
reference number and is saved to `localStorage`. The footer newsletter is validated too.

### 13. Google Maps
An embedded Google Map of the studio location on the Contact page, with an "Open in Google
Maps" link beneath it. The map is tinted to match the site and inverts for the dark theme.

---

## Extra features beyond the brief

- Light / dark theme toggle, remembered across visits
- Project shortlist — saved in the browser and carried into the enquiry form automatically
- Instant estimate calculator (area slider, property type, package and add-ons)
- Live portfolio search with a `/` keyboard shortcut and an empty state
- Full-screen lightbox with keyboard navigation
- Animated statistics counters and scroll-reveal animations
- Reading-progress bar, branded preloader, toast notifications and copy-to-clipboard buttons

---

## Credits

Photographs from [Unsplash](https://unsplash.com), free to use under the Unsplash licence.
Fonts from Google Fonts. Icons hand-drawn as inline SVG. Logo designed for this project.

*Aurelia Interiors is a fictional business created for an academic web development project.*

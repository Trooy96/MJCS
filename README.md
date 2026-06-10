# MJCS — Static Site

Multi-page static build of Mass Junior Contractors & Suppliers.

## Structure
- `index.html`, `about.html`, `services.html`, `portfolio.html`, `events.html`, `contact.html`, `404.html`
- `css/styles.css` — full design system (light + dark)
- `js/main.js` — nav scroll, theme toggle, mobile menu, reveal-on-scroll, toast
- `js/animations.js` — anime.js dot grid + draw-on-scroll lines (CDN)
- `js/portfolio.js`, `js/about.js`, `js/contact.js` — page-specific
- `assets/` — logo
- `images/` — all photos
- `downloads/` — PDF documents (View / Download)
- `vercel.json` — clean URLs + 404 handling

## Deploy on Vercel
Just drag-and-drop or `vercel --prod`. The included `vercel.json` rewrites
`/about`, `/services`, etc. to their `.html` files so deep links never 404.

## Local preview
Open `index.html` directly, or run any static server, e.g.:
```
npx serve .
```

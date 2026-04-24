# Arthur Chequer — Portfolio

Personal portfolio site for Arthur Chequer (Data Scientist & AI Specialist).
Single-page, static, bilingual (EN / PT-BR), responsive.

**Live:** https://0x4rthur.github.io/arthur-portifolio/

## Stack

- HTML5 (semantic, accessible)
- CSS3 (custom design system with CSS variables)
- Tailwind CSS (via CDN — pin a compiled build before production)
- Vanilla JavaScript (no framework, no build step)
- SF Pro Display (Apple) via CDN fonts

## Project structure

```
.
├── index.html              # Entry point
├── css/
│   └── styles.css          # Main stylesheet (design tokens, components, sections)
├── js/
│   ├── main.js             # Navigation, reveal, i18n, interactions
│   └── cursor-followers.js # Cursor-following tooltips and certificate preview
├── images/
│   ├── certs/              # Certificate images
│   ├── logos/              # Company / school logos
│   └── cursor/             # Custom cursor asset
├── README.md
├── LICENSE
└── .gitignore
```

## Run locally

No build step. Any static server works:

```bash
# Python
python -m http.server 8080

# Node
npx serve .
```

Then open http://localhost:8080.

## Deploy

### GitHub Pages
Settings → Pages → Source: `main` / root. The site publishes at the URL above.

### Vercel / Netlify
Connect the repo; no build command needed; output directory `.`.

## Recommended follow-ups

- Replace Tailwind CDN with a compiled build (`npx tailwindcss -o css/tailwind.css --minify`) to cut ~3 MB of unused CSS in production.
- Convert PNGs under `images/certs/` to WebP/AVIF (current `dale_carnegie_physical.png` alone is ~4.5 MB).
- Shrink `images/cursor/cursor.png` (currently ~1.8 MB — a cursor should be under 10 KB at 32×32).
- Add an Open Graph preview image at `images/og-cover.png` (1200×630) and reference it in the `<meta property="og:image">` tag.
- Wire a real `resume.pdf` to the "Resume" nav button.

## License

MIT — see [LICENSE](LICENSE).

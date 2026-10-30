# Peeya Nadia · Portfolio

A bilingual (English / 日本語) 3D portfolio site with a sakura-and-washi theme.

- **No build step.** Plain HTML/CSS/JS; three.js is loaded from a CDN.
- Opens by double-clicking `index.html`, or serve it with `python -m http.server`.

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Page skeleton and sections |
| `css/style.css` | Theme, layout, responsive rules |
| `js/content.js` | **All text (EN + JA)**: edit here to update the content |
| `js/scene.js` | three.js backdrop: one 3D vignette per section, plus falling petals |
| `js/main.js` | Language switch, rendering, scroll ↔ camera sync, HUD, form |

## Language

The toggle is in the nav. The initial language comes from `?lang=en|ja`, then the
last choice (localStorage), then the browser language.

## Deploy to GitHub Pages

1. Push this folder to a repo, e.g. `<username>.github.io`.
2. Settings → Pages → Deploy from branch → `main` / root.

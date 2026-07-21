# ✨ Ashutosh Palhare — Digital Business Card

A premium, single-page digital identity card — inspired by **Linktree Pro** and **Bento.me** — built with vanilla HTML, CSS, and JavaScript. No frameworks, no build step, no dependencies to install. Just open it in a browser.

**Live demo:** [ashutoshpalhare.github.io/BioLinksV2](https://ashutoshpalhare.github.io/BioLinksV2/)

![Made with HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![Made with CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![Made with JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)
![No build step](https://img.shields.io/badge/Build%20step-none-success)
![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

---

## 🖼️ Preview

A centered glassmorphic card floating over an animated aurora background — avatar with a verified badge, name, bio, social icons, and a stack of premium interactive link cards.
<img width="588" height="877" alt="SS1" src="https://github.com/user-attachments/assets/f2015f69-c7d7-4d7e-a587-40f5d5fdfd89" />

---

## 🚀 Features

- **Glassmorphic card UI** — frosted-glass panel with gradient borders, soft shadows, and depth
- **Animated aurora + particle background** — drifting gradient blobs, floating canvas particles, subtle noise and grid texture
- **Premium link cards** — icon, title, subtitle, gradient border on hover, left accent bar, shine sweep, and ripple-on-click
- **Verified profile badge & online status dot** on the avatar
- **Dark / light theme toggle** — persisted via `localStorage`, with a floating toggle button
- **Copy Link, Copy Email & native Share** — with toast notifications and clipboard fallback
- **Custom cursor + spotlight** on desktop, with mouse-parallax on the background blobs
- **3D tilt on hover** for the card and magnetic hover effect on action buttons
- **Fully responsive** — optimized layout down to small mobile screens
- **Accessible** — semantic markup, `aria-label`s, `prefers-reduced-motion` support, focus states
- **Zero dependencies to install** — GSAP and Font Awesome are loaded via CDN; everything else is plain JS

---

## 🗂️ Project structure

```
.
├── index.html      # Markup — card content, links, meta tags, JSON-LD
├── style.css       # Design tokens, layout, glassmorphism & animation styles
├── script.js       # Theme toggle, copy/share, cursor, tilt, particles, reveal animations
└── README.md
```

---

## 🛠️ Tech stack

| Purpose            | Library / Tool                                   |
|---------------------|---------------------------------------------------|
| Structure           | Semantic HTML5                                    |
| Styling             | Vanilla CSS3 (custom properties, no preprocessor)  |
| Interactivity       | Vanilla JavaScript (no framework)                  |
| Entrance animations | [GSAP](https://gsap.com/) (via CDN)                |
| Icons               | [Font Awesome 6](https://fontawesome.com/) (via CDN) |
| Fonts               | [Inter](https://fonts.google.com/specimen/Inter) & [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk) (Google Fonts) |
| Hosting             | GitHub Pages                                       |

---

## 🏁 Getting started

### Run locally

No build tools, no `npm install` — just clone and open.

```bash
git clone https://github.com/ashutoshpalhare/BioLinksV2.git
cd BioLinks
```

Then either:
- double-click `index.html` to open it directly in your browser, **or**
- serve it locally (recommended, avoids any file:// quirks):

```bash
# Python 3
python -m http.server 8000

# or with Node
npx serve .
```

Visit `http://localhost:8000`.

### Deploy to GitHub Pages

1. Push the repo to GitHub.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to `Deploy from a branch`.
4. Choose the `main` branch and `/ (root)` folder, then **Save**.
5. Your card will be live at `https://<your-username>.github.io/<repo-name>/`.

---

## 🎨 Customization

All personal details live in `index.html`, and all visual styling is token-driven in `style.css`.

**Profile info** — edit inside `<div class="idcard">`:
- Avatar image URL, name, username, bio text
- Social icons under `.idcard__social`
- Link cards under `.links` — each is a self-contained `<a class="link-card">` block with an icon, title, and subtitle
- The `data-copy` attributes on the action buttons control what gets copied for **Copy Link** and **Copy Email**

**Colors & theme** — edit the CSS custom properties at the top of `style.css`:

```css
:root {
  --violet: #8B5CF6;
  --cyan:   #06B6D4;
  --pink:   #EC4899;
  --green:  #22C55E;
  --amber:  #F59E0B;
  --bg:     #09090B;
  /* ... */
}
```

Light theme overrides live in the adjacent `[data-theme="light"]` block.

**Adding a new link card** — copy an existing `.link-card` block, update the `href`, icon class, title, and subtitle, and give it an appropriate `data-delay` for staggered entrance timing.

---

## ♿ Accessibility & performance notes

- Respects `prefers-reduced-motion` — disables entrance animations, particles, and floating effects when set
- Custom cursor, parallax, and tilt effects are automatically disabled on touch devices
- All interactive elements have descriptive `aria-label`s
- Loader has a hard 3.5s timeout so users are never stuck behind it

---

## 📄 License

Released under the [MIT License](LICENSE). Feel free to fork this and turn it into your own digital business card.

---

## 🙋 About

Built and maintained by **Ashutosh Palhare**.

- GitHub: [@ashutoshpalhare](https://github.com/ashutoshpalhare)
- LinkedIn: [ashutoshpalhare](https://www.linkedin.com/in/ashutoshpalhare)
- Twitter/X: [@ashutoshpalhare](https://twitter.com/ashutoshpalhare)

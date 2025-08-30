# The Purrrfect Marketplace 🛍️🐱

A polished React + Vite single-page app that showcases front-end engineering depth: modern UI theming, infinite scroll, typeahead search, client-side cart with persistence, and clean deployment to GitHub Pages. Built as a portfolio piece to demonstrate production-quality practices.

---

## ✨ Features

* **Clean, responsive UI** using MUI with a custom theme (Indigo + Cyan), card grid, and per-image fade-in.
* **Real data** from TheCatAPI with graceful fallbacks and placeholders.
* **Typeahead search** over **loaded** items only, with exact/partial modes and a dedicated “Search” action.
* **Infinite scroll** with intersection observer, scroll safety guards, and duplicate prevention.
* **Shopping cart** persisted via `localforage`; add/remove/clear with immediate UI feedback.
* **Performance-minded**: lazy images, small SVG logo, Vite code-split build.
* **Quality gates**: ESLint (flat config) + Prettier. Consistent formatting and import hygiene.
* **Zero PII**: optional API key stored in local `.env`; no analytics.

---

## 🧰 Tech Stack

* **Frontend:** React 18, Vite 7, Material UI (MUI)
* **State:** Redux Toolkit + React-Redux (cart), local state where simpler
* **UX:** `react-intersection-observer` (infinite scroll), MUI Popper (typeahead)
* **Data/Persistence:** TheCatAPI, `localforage`
* **Tooling:** ESLint (flat), Prettier
* **Deployment:** GitHub Pages (static `dist` on a `prod` branch)

---

## 🚀 Live Demo

> Add your link after first deploy.

* **Demo:** https\://\<username>.github.io/\<repo>/
* **Branch:** `prod` (static build)

---

## 📦 Getting Started

### Prereqs

* Node 20+ (use `nvm`):

  ```bash
  nvm install 20
  nvm use 20
  ```
* npm 9+

### Install

```bash
npm ci
```

### Environment

Create `.env.local` at the project root:

```env
# API endpoint (default is the images search)
VITE_API_URL=https://api.thecatapi.com/v1/images/search

# Optional, but recommended to avoid rate limiting
VITE_API_KEY=your_thecatapi_key_here

# Page size
VITE_API_LIMIT=20
```

### Dev

```bash
npm run dev
# http://localhost:5173
```

### Lint & Format

```bash
npm run lint
npm run format
```

### Build & Preview

```bash
npm run build
npm run preview
```

---

## 🧱 Architecture

```
src/
  Components/
    Cart/               # Cart UI + actions
    FadeImg.jsx         # Lazy image with skeleton + placeholder + fade-in
    FullScreenDialog/   # Details modal
    Gallery/            # Responsive card grid
    Header/             # AppBar + search (typeahead + Search button)
    ProductRatings/     # Breed stats rendered as stars
    SpeedDial/          # Quick links
  Layout/               # Page layout, fetch, infinite scroll, search wiring
  store/
    cart/               # Redux Toolkit slice + selectors
    index.js            # configureStore + Provider wiring
  utils/
    breedRating.js      # Derives star rating from breed attributes
  theme.js              # MUI theme (palette, typography, components)
  main.jsx, App.jsx     # Entry + providers
  index.scss, App.scss  # Styles
```

Key flows:

* **Data fetch:** paginated, prefers images with `breeds`; falls back to breed-driven fetch and synthesizes names when needed.
* **Infinite scroll:** `InView` sentinel with dev-mode guard to avoid double fetch on first mount.
* **Search:** Header controls a *typing* query and an *applied* query:

  * **Partial** mode for generic text (contains).
  * **Exact** mode when a suggestion is selected or the full breed name is typed.
  * Results filter over **loaded** items only.
* **Cart:** Redux Toolkit slice; persisted in `localforage`; avatar + quantity controls.

---

## 🎨 UI/UX Notes

* Theming with MUI `ThemeProvider`:

  * Primary `#6366F1` (Indigo 500), Secondary `#06B6D4` (Cyan 500)
  * Rounded cards, shadow tuned for readability
* **Per-image fade-in** via `<FadeImg>` using `Skeleton` while loading and a pet icon placeholder on error
* **Consistent actions:** “Add to cart” (contained + icon) and “Details” (outlined)

---

## 🔍 Search UX

* Type in **Header** → suggestions dropdown deduped from loaded breeds
* **Enter**/**Search** button applies the filter
* **Exact vs partial:**

  * Selecting a suggestion or typing an exact breed → **exact** match
  * Otherwise → **partial** contains across name, origin, temperament, id
* **Clear** resets query and results

---

## ⚙️ Scripts

```json
{
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "lint": "eslint .",
  "format": "prettier --write ."
}
```

---

## 🌐 Deployment (GitHub Pages, static `prod` branch)

> This repo uses a **static artifact branch** with only the contents of `dist`.

1. Set Vite base (project sites):

```js
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/<repo-name>/',   // e.g. '/purrr-market/'
  plugins: [react()]
});
```

2. Build on your dev branch (e.g. `main`):

```bash
npm run build
```

3. Publish **dist** to `prod` using a worktree:

```bash
git fetch origin
git worktree add -B prod ../_deploy main
rsync -av --delete --exclude '.git' dist/ ../_deploy/
cp dist/index.html ../_deploy/404.html
cd ../_deploy
git add -A && git commit -m "deploy" && git push -u origin prod -f
```

4. GitHub → **Settings → Pages** → Source: `prod` branch, Folder: `/ (root)`.

> Using React Router? Set `basename={import.meta.env.BASE_URL}`.
> Got 404s on assets? Verify `base` matches the repo name.

---

## 🧪 Testing Ideas (future work)

* Unit test `breedRating` util.
* Component tests for Gallery card interactions and Cart.
* E2E smoke against search and infinite scroll.

---

## ♿ Accessibility

* Inputs with `aria-label`s.
* Buttons have clear labels and icons.
* Keyboard support in typeahead (↑/↓, Enter, Esc).
* Color contrast checked against light theme.

---

## 🔐 Security & Privacy

* API key loaded from `.env.local` (not committed).
* No cookies or analytics trackers.
* Cart state stored locally in the browser via `localforage`.

---

## 🗺️ Roadmap

* [ ] Dark mode toggle
* [ ] Favorites list with local persistence
* [ ] Basic unit tests with Vitest
* [ ] Lighthouse CI in PRs
* [ ] Error boundary with retry UI

---

## 🧑‍💻 About the Author

Built by **Moosecodes** — full-stack engineer focusing on modern front-end systems and AI-powered UX.
Contact: \<add email/LinkedIn>

---

## 📝 License

MIT © \<Your Name>

# Gurgen Varzhapetyan — Resume

Local one-page resume site built with React, TypeScript, and Vite.

## Run locally

Use Node.js 20.19+ or 22.12+. Then install dependencies and start Vite:

```bash
pnpm install
pnpm dev
```

Open the local URL printed by Vite. To create a production build, run `pnpm build`.

## Add a portrait later

Place the image at `public/portrait.jpg`, then set `portraitSrc` to `'/portrait.jpg'` in `src/data.ts`. The existing portrait component will display it in the current layout.

The CV download is served from `public/Gurgen-Varzhapetyan-CV.pdf`.

## Deploy to GitHub Pages

This repository is named `alienforhumans.github.io`, so GitHub Pages serves it at
[`https://alienforhumans.github.io/`](https://alienforhumans.github.io/). Vite is
configured with the root path for that URL.

The workflow in `.github/workflows/deploy.yml` builds the site and publishes it
whenever a commit is pushed to `main`. It can also be started manually from the
repository's **Actions** tab.

To publish for the first time:

1. In GitHub, open **Settings → Pages** and set **Build and deployment → Source**
   to **GitHub Actions**.
2. From this project folder, commit and push the website to `main`:

   ```sh
   git add .
   git commit -m "Add resume website"
   git push -u origin main
   ```

3. Open the repository's **Actions** tab and wait for **Deploy to GitHub Pages**
   to finish. The site will then be available at `https://alienforhumans.github.io/`.

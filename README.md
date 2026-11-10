# Akhilesh Mourya — Portfolio

A frontend-only portfolio built with Next.js, TypeScript, local Inter Tight/Geist fonts,
and an editable Remotion project reel. Burgundy, Misty Blue, porcelain, and ink form
the light/dark design system.

## Run

Use Node.js 22.19 or newer. The site uses Next.js 16, React 19, and Remotion 4.

```bash
npm install
npm run dev
```

Open the address Next.js prints. To choose a port: `npm run dev -- --port 3100`.

```bash
npm run build
npm start
```

## Edit

- `data/portfolio.ts`: factual profile, contributions, experience, capabilities.
- `components/`: page sections and small client components.
- `app/globals.css`: all tokens and responsive styling; no override chain.
- `design-system/MASTER.md`: palette, typography, interactions, and motion rules.
- `public/resume.pdf`: supplied resume, unchanged.
- `docs/asset-sources.json`: exact official App Store sources and font sources.
- `public/profile/akhilesh-mourya.png`: your supplied portrait, copied unchanged.
- `app/case-studies/natty-hatty/page.tsx`: the detailed mobile leadership case study.
- `data/site.ts`: confirmed production URL, canonical metadata, and sitemap origin.

Project previews open in a native dialog. Arrow keys browse screenshots; Escape closes
the viewer and returns focus to its trigger. Public project destinations include verified
App Store and Google Play links where available.

The production URL is `https://akhilesh-mourya-profile.vercel.app`. An optional
`NEXT_PUBLIC_SITE_URL` override is documented in `.env.example`. The site generates a
portrait-based social image, sitemap, robots file, and Person/WebSite structured data.

Screenshots are product references. App Store product claims and promotional copy are
not presented as personal achievements. OpenPath AI uses a text entry because no
verified screenshot was obtained. Its original website returned HTTP 403 to automated
requests; the original resume URL is retained.

## Motion

```bash
npm run motion:studio
```

Studio runs on port 3002. Select `PortfolioReel` for the full 14-second sequence, or a
scene inside `Scenes`. Source lives in `motion/`, independent of the page layout.
The site loads the Player only after a visitor chooses Play. It provides pause,
fullscreen, keyboard controls, replay, and a return-to-poster action. Reduced motion
keeps a static preview. No video export or render service is needed.

## Verify

```bash
npm run typecheck
npm run lint
npm run build
npm run audit:contrast
PORTFOLIO_URL=http://127.0.0.1:3100 npm run audit:ui
npm run audit:links
PORTFOLIO_BUILD_DIR=.next-production npm run build
PORTFOLIO_BUILD_DIR=.next-production npm start -- --port 3101
# In another terminal:
PORTFOLIO_URL=http://localhost:3101 npm run audit:performance
```

The browser audit requires Google Chrome and a running site. It creates screenshots,
checks mobile overflow and theme contrast with axe, tests menu/keyboard behavior,
resume/email links, reduced motion, and the real Player. The zoom check is a 200%
desktop-layout equivalent, not a claim about browser toolbar zoom automation.
Lighthouse reports use simulated mobile throttling against a local production build;
they do not replace checking the deployed site on a physical phone. Results and limits
are recorded in `docs/IMPROVEMENTS.md`.

The scoped `minimatch` override updates the TypeScript lint tooling's vulnerable glob
parser while retaining the current Next.js ESLint configuration.

No backend, credentials, deployment, or publishing is required. Contact uses mailto.

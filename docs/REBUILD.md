# Rebuild handoff — 6 November 2026

## What changed

The presentation layer was rebuilt around Burgundy × Misty Blue, with porcelain reading
surfaces and a coordinated dark theme. New navigation, introduction, project showcases,
background/capabilities, experience, contact, and footer replace the former device stage,
ticker, numbered bento sections, and chained CSS overrides.

Content is separated from components in `data/portfolio.ts`. The resume remains unchanged.
All authored source is formatted. The homepage is statically prerendered, with client
components limited to navigation, theme behavior, and the optional reel.

## Product evidence

Official Apple lookup responses verified the identities of Natty Hatty, Amori, SwiftSku,
and Arzooo. The downloaded screenshots were visually inspected before use. Arzooo's
marketplace image is used instead of its login screenshot. Exact sources and font
licenses are recorded in `asset-sources.json` and `public/fonts/`.

OpenPath AI uses an honest text entry. A verified screenshot is still unavailable.
The original resume website URL is retained; automated requests encountered HTTP 403.

## Motion

`motion/` contains the editable 14-second Remotion reel and separate scene compositions.
Studio previews and on-page playback were checked. The first frame remains readable.
Project scenes use real screenshots and role captions from the supplied resume.

The optional transition package's ESM output referenced React 19 internals, incompatible
with the existing React 18 production build. It was removed. Core Remotion sequences
and frame-driven crossfades provide the same transition design without bundler shims.

The on-page Player loads after a click, supports play/pause, fullscreen, native replay,
an explicitly labeled keyboard-accessible seek slider, offscreen/hidden-tab pause,
return to poster, and a failure fallback. Reduced motion keeps the static poster.

## Verification evidence

- TypeScript: passed.
- ESLint: passed, no warnings.
- Optimized production build: passed; homepage statically prerendered.
- Homepage first-load JavaScript: 97.8 kB reported by Next.js.
- Semantic contrast: all 48 checked pairs passed (`contrast-report.json`).
- Browser audit: 10 theme/viewport combinations, zero axe violations and no horizontal
  overflow (`ui-audit.json`). Scenarios: 375px, 768px, 1280×720, 1440px, mobile landscape.
- Keyboard skip link, menu Escape/focus/selection, reduced-motion behavior, resume
  response, email link, and actual Player scene seeking were exercised.
- The 200% zoom check uses an equivalent 640×360 CSS viewport at 2× device scale.
  This does not claim automation of Chrome's toolbar zoom control.
- Screenshots include complete pages, individual hero captures, selected work, reel
  frames, and the editable Remotion Studio timeline. Captures were visually inspected.

These automated checks are scoped checks, not a complete screen-reader certification
or a Lighthouse/Core Web Vitals performance claim.

## Run and edit

Use `npm run dev` for the site and `npm run motion:studio` for the motion editor.
Use `npm run typecheck`, `npm run lint`, `npm run build`, `npm run audit:contrast`,
and `PORTFOLIO_URL=<local-address> npm run audit:ui` for repeatable verification.

The original source is preserved in `.rebuild-backups/2026-11-06-before-redesign.tar.gz`.
The previous three override stylesheets are also archived in the backup folder.
Extract the archive into a separate directory to inspect or recover the original.

No backend, media rendering service, deployment, or publishing was added.

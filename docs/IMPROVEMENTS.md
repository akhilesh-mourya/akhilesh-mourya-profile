# Portfolio improvements — 6 November 2026

The approved Burgundy × Misty Blue layout is retained. This pass adds personal
identity, deeper project evidence, accessible image browsing, deployment metadata,
and dependency updates.

## Changes

- Imported the supplied portrait unchanged. A small portrait appears beside the
  introduction; a larger one appears in About. Next.js serves optimized display sizes.
- Downloaded higher-resolution official App Store previews for the images in use.
  Screenshot buttons open a native modal dialog with keyboard browsing, Escape,
  background scroll locking, and focus restoration.
- Added `/case-studies/natty-hatty`, describing the documented team leadership,
  technical planning, integration, release, and maintenance responsibilities.
  Public product imagery is distinguished from personal engineering contributions.
- Corrected section tracking so Work is not active at the top of the home page.
  Header and footer links also work from the case-study page.
- Added verified App Store/Google Play destinations. The link report distinguishes
  reachable URLs from sites that reject automated requests.
- Added contribution captions to the three product scenes in the 14-second reel.
  The player remains optional and supports reduced motion and keyboard seeking.
- Configured the confirmed production origin:
  `https://akhilesh-mourya-profile.vercel.app`.
- Added canonical links, sitemap, robots metadata, Person/WebSite structured data,
  and a generated 1200 × 630 social image using the supplied portrait.
- Upgraded Next.js to 16.4.5, React to 19.3.1, Remotion packages to 4.0.541,
  sharp to 0.35.5, and PostCSS to 8.5.32. Migrated ESLint to flat configuration.
  A scoped minimatch override patches the lint tool's vulnerable glob parser.

## Validation

- Production build, TypeScript, and ESLint.
- Final npm dependency audit: zero known vulnerabilities, including development tools.
- 48 semantic color combinations pass the contrast checker.
- Homepage checked in both themes at 375 × 812, 768 × 1024, 1280 × 720,
  1440 × 900, and 812 × 375: no horizontal overflow or axe WCAG A/AA violations.
- Case study checked at 375px and 1440px: no overflow or axe violations.
- Keyboard checks cover the skip link, mobile navigation, active section reset,
  image viewer navigation/close/focus restoration, and reel seeking.
- Metadata checks cover the confirmed canonical, sitemap, robots, structured data,
  and successfully generated PNG social image.
- Lighthouse simulated mobile: Performance 100, Accessibility 100,
  Best Practices 100, SEO 100. FCP/LCP 0.8s, total blocking time 10ms,
  cumulative layout shift 0. See `performance-summary.json` and the full HTML report.

## Limits

Lighthouse uses a local production build with simulated mobile throttling. These are
lab results, not deployed field data or a physical-phone test. Automated accessibility
checks are supplemented by the listed keyboard checks; they do not certify full
accessibility compliance. The 200% check is a desktop layout equivalent.

All app-store destinations and GitHub returned HTTP 200. LinkedIn returned 429 and
OpenPath AI returned 403 to automated requests; their original links are retained.
The confirmed production address is configured in source. This task does not publish
the website.

Machine-readable results: `ui-audit.json`, `contrast-report.json`, `link-audit.json`,
`dependency-audit.json`, and `performance-summary.json`. Visual evidence is in
`screenshots/`.

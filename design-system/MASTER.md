# Akhilesh Mourya — Burgundy × Misty Blue

## Visual direction

A personal engineering portfolio with the pace of a publication: a clear introduction,
large examples of shipped work, readable career history, and a direct contact route.
Porcelain reading surfaces, burgundy feature areas, mist-blue supporting panels.
Product screenshots retain their original colors. A coordinated dark theme changes
the reading surfaces while preserving the product imagery and burgundy features.

UI/UX Pro Max's broad design-system match suggested purple bento cards and testimonials.
That does not fit the supplied brief or evidence. The focused `minimalism swiss editorial`
style match is applicable: purposeful space, clear hierarchy, restrained decoration,
readable contrast. Focus-not-obscured, contrast, and Next.js component/image guidance
inform the implementation. The palette is an explicit brand constraint, not an
automatically selected palette.

## Brand primitives

| Primitive      | Value   |
| -------------- | ------- |
| Burgundy       | #650D2A |
| Misty Blue     | #A4B5C4 |
| Midnight Ink   | #10151C |
| Warm Porcelain | #EDE9E7 |

## Semantic color tokens

| Role                | Light   | Dark    |
| ------------------- | ------- | ------- |
| Background          | #EDE9E7 | #10151C |
| Surface             | #F7F4F1 | #19212A |
| Elevated surface    | #FFFFFF | #25313D |
| Primary text        | #10151C | #EDE9E7 |
| Secondary text      | #4D565F | #BBC5CD |
| Muted text          | #5E646A | #A4B5C4 |
| Accent text         | #650D2A | #E8B5C5 |
| Primary action      | #650D2A | #A4B5C4 |
| Text on action      | #FFFFFF | #10151C |
| Action hover        | #4C0920 | #C2D0DB |
| Action pressed      | #3B0618 | #91A5B6 |
| Disabled background | #D9D3D0 | #303E4C |
| Disabled text       | #62615F | #A4B5C4 |
| Control border      | #7A828A | #83929E |
| Decorative rule     | #C7C1BD | #394650 |
| Focus ring          | #650D2A | #C2D0DB |

Fixed feature regions:

- Burgundy background: porcelain primary text, #E4CED6 secondary, porcelain focus.
- Mist-blue panel #D7E0E6: ink primary text, #37434E secondary, burgundy focus.
- Screenshot panels: neutral #E1E3E0 and #C8D8E5, original product imagery.

Run `npm run audit:contrast` for measured pairs in `docs/contrast-report.json`.
Required normal text contrast: 4.5:1. Large text and meaningful control/focus boundaries:
3:1. Disabled controls are exempt; decorative rules do not communicate control state.

## Typography and spacing

- Inter Tight 400/500: headings; Geist 400/500/600: body; Geist Mono: limited metadata.
- All font files are local and licensed. next/font/local supplies fallbacks and swap.
- Body: 16–18px, comfortable leading. Labels and credits: 12–14px.
- Main headline: 42–80px, 1.035–1.06 leading. Section headings: 34–52px.
- Space scale: 4, 8, 12, 16, 24, 32, 48, 64, 80, 104px.
- Maximum width: 1200px. Mobile gutter: 20px. Mostly square panels; 4–6px radii.
- No glow, gradient lettering, decorative grids, repeated status dots, or keyword ticker.

## Components and interaction

- Solid sticky masthead with semantic section links; mobile disclosure closes on
  selection, Escape, outside click, focus departure, and desktop resize.
- One primary hero action. Real product preview with descriptive alternative text.
- One featured project, two medium showcases, and two compact supporting entries.
- Work history and capabilities have distinct compositions rather than repeated cards.
- Anchors offset the masthead. Visible 3px focus rings. Aim for 44px targets.
- Short hover transitions; content stays visible without animation or JavaScript.
- Reduced motion disables optional page movement and keeps the reel as a static poster.

## Remotion

Editable 14-second composition at 30fps and 1280×720. Introduction, Natty Hatty,
Amori, SwiftSku, closing. Separate registered scene compositions. Timings are authored
on explicit sequence nodes, animation comes from frames, and project imagery is verified.
The Player mounts only after a click. Native play/pause, keyboard controls, fullscreen,
end-of-reel replay, return to poster, offscreen pause, and error fallback are provided.

## Verification

Desktop (1440px), laptop (1280×720), tablet (768px), mobile (375px), landscape,
and a 200% desktop zoom layout equivalent. Both themes, keyboard, menu, reduced
motion, successful image loads, resume download, email, and reel playback.
Reports and captures are in docs; do not infer visual completion from type checks.

import { readFile, mkdir, writeFile } from "node:fs/promises";
const css = await readFile("app/globals.css", "utf8");
function tokens(block) {
  return Object.fromEntries(
    [...block.matchAll(/--([\w-]+):\s*(#[a-fA-F0-9]{6})/g)].map((m) => [
      m[1],
      m[2],
    ]),
  );
}
const light = tokens(css.match(/:root\s*\{([\s\S]*?)\}/)[1]);
const dark = {
  ...light,
  ...tokens(css.match(/\[data-theme="dark"\]\s*\{([\s\S]*?)\}/)[1]),
};
const lum = (hex) => {
  const rgb = hex
    .match(/\w\w/g)
    .map((s) => parseInt(s, 16) / 255)
    .map((c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4));
  return rgb[0] * 0.2126 + rgb[1] * 0.7152 + rgb[2] * 0.0722;
};
const ratio = (a, b) => {
  const x = lum(a.replace("#", ""));
  const y = lum(b.replace("#", ""));
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};
const checks = [];
for (const [theme, t] of [
  ["light", light],
  ["dark", dark],
]) {
  for (const bg of ["background", "surface", "elevated"]) {
    for (const fg of ["text", "secondary", "muted", "accent"])
      checks.push({
        theme,
        role: `${fg} on ${bg}`,
        foreground: t[fg],
        background: t[bg],
        minimum: 4.5,
      });
    for (const fg of ["control-border", "focus"])
      checks.push({
        theme,
        role: `${fg} on ${bg}`,
        foreground: t[fg],
        background: t[bg],
        minimum: 3,
      });
  }
  for (const bg of ["action", "action-hover", "action-pressed"])
    checks.push({
      theme,
      role: `action text on ${bg}`,
      foreground: t["on-action"],
      background: t[bg],
      minimum: 4.5,
    });
}
for (const [fg, bg] of [
  ["#EDE9E7", "#650D2A"],
  ["#E4CED6", "#650D2A"],
  ["#10151C", "#D7E0E6"],
  ["#37434E", "#D7E0E6"],
  ["#37434E", "#E1E3E0"],
  ["#37434E", "#C8D8E5"],
])
  checks.push({
    theme: "fixed feature",
    role: "feature text",
    foreground: fg,
    background: bg,
    minimum: 4.5,
  });
const measured = checks.map((c) => {
  const result = ratio(c.foreground, c.background);
  return { ...c, ratio: Number(result.toFixed(2)), pass: result >= c.minimum };
});
await mkdir("docs", { recursive: true });
await writeFile(
  "docs/contrast-report.json",
  JSON.stringify(measured, null, 2) + "\n",
);
const failed = measured.filter((c) => !c.pass);
console.log(JSON.stringify({ checked: measured.length, failed }, null, 2));
if (failed.length) process.exitCode = 1;

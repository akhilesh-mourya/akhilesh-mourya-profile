import { writeFile } from "node:fs/promises";
import { createServer } from "node:net";
import { chromium } from "playwright";
import lighthouse from "lighthouse";

// Use a free debugging port; never attach to a user's existing browser.
const server = createServer();
await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
const port = server.address().port;
await new Promise((resolve) => server.close(resolve));
const browser = await chromium.launch({
  channel: "chrome",
  headless: true,
  args: [`--remote-debugging-port=${port}`],
});
try {
  const result = await lighthouse(
    process.env.PORTFOLIO_URL ?? "http://127.0.0.1:3101",
    {
      port,
      hostname: "127.0.0.1",
      logLevel: "error",
      output: ["json", "html"],
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      formFactor: "mobile",
    },
  );
  await writeFile("docs/lighthouse-mobile.json", result.report[0]);
  await writeFile("docs/lighthouse-mobile.html", result.report[1]);
  const summary = {
    checkedAt: new Date().toISOString(),
    url: result.lhr.finalDisplayedUrl,
    method:
      "Lighthouse simulated mobile on a local production build; not a physical-device measurement.",
    scores: Object.fromEntries(
      Object.entries(result.lhr.categories).map(([key, value]) => [
        key,
        Math.round(value.score * 100),
      ]),
    ),
    metrics: Object.fromEntries(
      [
        "first-contentful-paint",
        "largest-contentful-paint",
        "total-blocking-time",
        "cumulative-layout-shift",
        "speed-index",
      ].map((key) => [key, result.lhr.audits[key].displayValue]),
    ),
    warnings: result.lhr.runWarnings,
  };
  await writeFile(
    "docs/performance-summary.json",
    JSON.stringify(summary, null, 2) + "\n",
  );
  console.log(JSON.stringify(summary, null, 2));
} finally {
  await browser.close();
}

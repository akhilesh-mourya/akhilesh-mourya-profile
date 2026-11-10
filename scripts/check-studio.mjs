import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 960 } });
const errors = [];
page.on("pageerror", (error) => errors.push(error.message));
await page.goto(
  `${process.env.REMOTION_STUDIO_URL ?? "http://localhost:3002"}/${process.argv[2] ?? ""}`,
  {
    waitUntil: "networkidle",
    timeout: 90000,
  },
);
await mkdir("docs/screenshots", { recursive: true });
await page.screenshot({
  path: `docs/screenshots/studio-${process.argv[2] ?? "initial"}.png`,
});
console.log(
  JSON.stringify(
    {
      url: page.url(),
      title: await page.title(),
      errors,
      body: (await page.locator("body").innerText()).slice(0, 1300),
    },
    null,
    2,
  ),
);
await browser.close();

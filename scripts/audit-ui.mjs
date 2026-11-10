import assert from "node:assert/strict";
import { mkdir, writeFile } from "node:fs/promises";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.env.PORTFOLIO_URL ?? "http://127.0.0.1:3100";
await mkdir("docs/screenshots", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = {
  base,
  checkedAt: new Date().toISOString(),
  pages: [],
  interactions: {},
  errors: [],
};
const sizes = [
  { name: "375", width: 375, height: 812 },
  { name: "768", width: 768, height: 1024 },
  { name: "laptop", width: 1280, height: 720 },
  { name: "desktop", width: 1440, height: 900 },
  { name: "landscape", width: 812, height: 375 },
];
try {
  for (const size of sizes) {
    const context = await browser.newContext({
      viewport: { width: size.width, height: size.height },
    });
    const page = await context.newPage();
    page.on("pageerror", (error) => report.errors.push(error.message));
    await page.goto(base, { waitUntil: "networkidle", timeout: 90000 });
    await page.evaluate(() => document.fonts.ready);
    for (const image of await page.locator("main img").all())
      await image.scrollIntoViewIfNeeded();
    await page.waitForFunction(() =>
      Array.from(document.querySelectorAll("main img")).every(
        (img) => img.complete && img.naturalWidth > 0,
      ),
    );
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    for (const theme of ["light", "dark"]) {
      await page.evaluate(() =>
        window.scrollTo({ top: 0, behavior: "instant" }),
      );
      if (theme === "dark") {
        await page
          .getByRole("button", { name: "Switch to dark theme" })
          .click();
        await page.waitForFunction(
          () => document.documentElement.dataset.theme === "dark",
        );
      }
      const overflow = await page.evaluate(() => ({
        viewport: innerWidth,
        document: document.documentElement.scrollWidth,
      }));
      assert.ok(
        overflow.document <= overflow.viewport,
        `${theme}/${size.name}: horizontal overflow`,
      );
      assert.equal(await page.locator("h1").count(), 1);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      const issues = results.violations.map((v) => ({
        id: v.id,
        impact: v.impact,
        help: v.help,
        nodes: v.nodes.map((n) => n.target),
      }));
      report.pages.push({
        size: size.name,
        theme,
        overflow,
        violations: issues,
      });
      await page.screenshot({
        path: `docs/screenshots/${theme}-${size.name}.png`,
        fullPage: true,
      });
      if (["375", "desktop", "laptop"].includes(size.name))
        await page.screenshot({
          path: `docs/screenshots/${theme}-${size.name}-hero.png`,
        });
      if (theme === "light" && size.name === "desktop")
        await page
          .locator("#work")
          .screenshot({ path: "docs/screenshots/selected-work.png" });
    }
    if (size.name === "375") {
      await page.getByRole("button", { name: "Open navigation" }).click();
      assert.equal(
        await page
          .getByRole("button", { name: "Close navigation" })
          .getAttribute("aria-expanded"),
        "true",
      );
      await page.keyboard.press("Escape");
      assert.equal(
        await page
          .getByRole("button", { name: "Open navigation" })
          .getAttribute("aria-expanded"),
        "false",
      );
      assert.equal(
        await page
          .getByRole("button", { name: "Open navigation" })
          .evaluate((el) => el === document.activeElement),
        true,
      );
      await page.getByRole("button", { name: "Open navigation" }).click();
      await page.locator('#primary-navigation a[href="/#work"]').click();
      assert.equal(
        await page
          .getByRole("button", { name: "Open navigation" })
          .getAttribute("aria-expanded"),
        "false",
      );
      report.interactions.mobileMenu =
        "Escape returns focus; section selection closes menu";
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.waitForFunction(() => !document.querySelector(".play-reel"));
      assert.equal(await page.locator("[data-reel-player]").count(), 0);
      report.interactions.reducedMotion = "Static poster; player not mounted";
    }
    await context.close();
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();
  page.on("pageerror", (error) => report.errors.push(error.message));
  await page.goto(base, { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");
  assert.equal(
    await page
      .locator(".skip-link")
      .evaluate((el) => el === document.activeElement),
    true,
  );
  await page.keyboard.press("Enter");
  assert.equal(
    await page
      .locator("#main-content")
      .evaluate((el) => el === document.activeElement),
    true,
  );
  report.interactions.skipLink = "Keyboard link moves focus to main content";
  assert.ok((await page.request.get(`${base}/resume.pdf`)).ok());
  assert.match(
    await page.locator(".contact-email").getAttribute("href"),
    /^mailto:/,
  );
  report.interactions.contact =
    "Resume responds successfully; email is a mailto link";
  await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForFunction(
    () => !document.querySelector("#primary-navigation [aria-current]"),
  );
  await page.locator('#primary-navigation a[href="/#work"]').click();
  await page.waitForFunction(
    () =>
      document
        .querySelector('#primary-navigation a[href="/#work"]')
        .getAttribute("aria-current") === "location",
  );
  await page.locator(".identity").click();
  await page.waitForFunction(
    () => !document.querySelector("#primary-navigation [aria-current]"),
  );
  await page.locator('#primary-navigation a[href="/#contact"]').click();
  await page.waitForFunction(
    () =>
      document
        .querySelector('#primary-navigation a[href="/#contact"]')
        .getAttribute("aria-current") === "location",
  );
  report.interactions.navigation =
    "Home clears the active section; Work and Contact track the visible section";
  const trigger = page.getByRole("button", {
    name: "Enlarge Natty Hatty screenshot 1 of 2",
  });
  await trigger.click();
  const viewer = page.getByRole("dialog");
  await viewer.waitFor();
  await page.keyboard.press("ArrowRight");
  await viewer.getByText("Screenshot 2 of 2").waitFor();
  const galleryIssues = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  assert.equal(
    galleryIssues.violations.length,
    0,
    JSON.stringify(
      galleryIssues.violations.map((issue) => ({
        id: issue.id,
        nodes: issue.nodes.map((node) => node.target),
      })),
    ),
  );
  await page.keyboard.press("Escape");
  await viewer.waitFor({ state: "hidden" });
  assert.ok(
    await trigger.evaluate((element) => element === document.activeElement),
  );
  report.interactions.imageViewer =
    "Arrow keys browse, Escape closes, focus returns to opener; axe passed";
  assert.equal(
    new URL(await page.locator('link[rel="canonical"]').getAttribute("href"))
      .href,
    "https://akhilesh-mourya-profile.vercel.app/",
  );
  assert.match(
    await (await page.request.get(`${base}/sitemap.xml`)).text(),
    /https:\/\/akhilesh-mourya-profile\.vercel\.app\/case-studies\/natty-hatty/,
  );
  assert.match(
    await (await page.request.get(`${base}/robots.txt`)).text(),
    /Sitemap: https:\/\/akhilesh-mourya-profile\.vercel\.app\/sitemap.xml/,
  );
  const structured = JSON.parse(
    await page.locator('script[type="application/ld+json"]').textContent(),
  );
  assert.equal(structured["@graph"][0]["@type"], "Person");
  const image = await page.request.get(`${base}/opengraph-image`);
  assert.ok(image.ok());
  assert.match(image.headers()["content-type"], /image\/png/);
  report.interactions.metadata =
    "Confirmed production canonical, sitemap, robots, Person schema, and generated social image";
  assert.equal(await page.locator("[data-reel-player]").count(), 0);
  await page.getByRole("button", { name: /Play the reel/ }).click();
  await page.locator("[data-reel-player]").waitFor();
  await page.getByRole("button", { name: "Pause video", exact: true }).click();
  const seek = page.getByRole("slider", { name: "Reel position" });
  await seek.focus();
  await seek.press("Home");
  await page.waitForFunction(
    () => Number(document.querySelector("#reel-position").value) === 0,
  );
  await seek.press("ArrowRight");
  await page.waitForFunction(
    () => Number(document.querySelector("#reel-position").value) === 1,
  );
  for (const [frame, name] of [
    [100, "natty-hatty"],
    [205, "amori"],
    [295, "swiftsku"],
    [390, "closing"],
  ]) {
    await seek.evaluate((input, value) => {
      const setter = Object.getOwnPropertyDescriptor(
        HTMLInputElement.prototype,
        "value",
      ).set;
      setter.call(input, String(value));
      input.dispatchEvent(new Event("input", { bubbles: true }));
      input.dispatchEvent(new Event("change", { bubbles: true }));
    }, frame);
    await page.waitForFunction(
      (value) =>
        Number(document.querySelector("#reel-position").value) === value,
      frame,
    );
    await page
      .locator(".showcase-frame")
      .screenshot({ path: `docs/screenshots/reel-${name}.png` });
  }
  const reelIssues = await new AxeBuilder({ page })
    .include(".showcase-section")
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  report.interactions.reel = {
    loadedAfterClick: true,
    scenes: ["Natty Hatty", "Amori", "SwiftSku"],
    violations: reelIssues.violations.map((v) => ({
      id: v.id,
      nodes: v.nodes.map((n) => n.target),
    })),
  };
  await page.getByRole("button", { name: "Back to poster" }).click();
  assert.equal(await page.locator("[data-reel-player]").count(), 0);
  await context.close();
  for (const width of [375, 1440]) {
    const studyContext = await browser.newContext({
      viewport: { width, height: 900 },
    });
    const study = await studyContext.newPage();
    study.on("pageerror", (error) => report.errors.push(error.message));
    await study.goto(`${base}/case-studies/natty-hatty`, {
      waitUntil: "networkidle",
    });
    assert.equal(await study.locator("h1").count(), 1);
    assert.ok(
      await study.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    );
    assert.match(
      await study.locator('link[rel="canonical"]').getAttribute("href"),
      /\/case-studies\/natty-hatty$/,
    );
    const results = await new AxeBuilder({ page: study })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    assert.equal(
      results.violations.length,
      0,
      JSON.stringify(results.violations.map((issue) => issue.id)),
    );
    await study.screenshot({
      path: `docs/screenshots/case-study-${width}.png`,
      fullPage: true,
    });
    await studyContext.close();
  }
  report.interactions.caseStudy =
    "375px and 1440px layouts pass axe and overflow checks";
  const zoomContext = await browser.newContext({
    viewport: { width: 640, height: 360 },
    deviceScaleFactor: 2,
  });
  const zoom = await zoomContext.newPage();
  await zoom.goto(base, { waitUntil: "networkidle" });
  assert.ok(
    await zoom.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  );
  await zoom.screenshot({
    path: "docs/screenshots/zoom-200-percent-layout.png",
    fullPage: true,
  });
  report.interactions.zoom =
    "200% desktop layout equivalent: 640×360 CSS viewport at 2× scale, no horizontal overflow";
  await zoomContext.close();
} catch (error) {
  report.errors.push(error.stack ?? String(error));
} finally {
  await browser.close();
  await writeFile("docs/ui-audit.json", JSON.stringify(report, null, 2) + "\n");
}
const violations = report.pages.reduce(
  (sum, p) => sum + p.violations.length,
  0,
);
console.log(
  JSON.stringify(
    {
      pages: report.pages.length,
      violations,
      interactions: report.interactions,
      errors: report.errors,
    },
    null,
    2,
  ),
);
if (violations || report.errors.length) process.exitCode = 1;

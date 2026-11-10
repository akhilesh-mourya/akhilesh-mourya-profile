import { readFile, writeFile } from "node:fs/promises";
const source = await readFile("data/portfolio.ts", "utf8");
const urls = [...new Set(source.match(/https:\/\/[^\s"'<>]+/g))];
const results = await Promise.all(
  urls.map(async (url) => {
    try {
      const response = await fetch(url, {
        redirect: "follow",
        signal: AbortSignal.timeout(25000),
        headers: {
          "User-Agent": "Mozilla/5.0 (compatible; PortfolioLinkCheck/1.0)",
        },
      });
      const html = await response.text();
      return {
        url,
        status: response.status,
        finalUrl: response.url,
        title:
          html
            .match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]
            ?.replace(/\s+/g, " ")
            .trim() ?? null,
        result: response.ok
          ? "reachable"
          : [403, 429, 999].includes(response.status)
            ? "automated access blocked"
            : "needs review",
      };
    } catch (error) {
      return { url, result: "could not verify", error: error.message };
    }
  }),
);
const report = {
  checkedAt: new Date().toISOString(),
  method:
    "HTTP GET with redirects. Reachability does not prove ownership or every app-store region.",
  results,
};
await writeFile("docs/link-audit.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
if (results.some((result) => result.result === "needs review"))
  process.exitCode = 1;

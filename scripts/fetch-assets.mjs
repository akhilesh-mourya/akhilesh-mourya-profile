import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
async function download(url, relative) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status}: ${url}`);
  const file = path.join(root, relative);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, Buffer.from(await response.arrayBuffer()));
  return { file: relative, source: url };
}
const apps = [
  { slug: "natty-hatty", id: 1671750048, country: "us", count: 3 },
  { slug: "amori", id: 1552334356, country: "us", count: 2 },
  { slug: "swiftsku", id: 1515815242, country: "us", count: 3 },
  { slug: "arzooo", id: 1497133088, country: "in", count: 2 },
];
const sources = [];
for (const app of apps) {
  const lookup = `https://itunes.apple.com/lookup?id=${app.id}&country=${app.country}`;
  const response = await fetch(lookup, { signal: AbortSignal.timeout(30000) });
  const { results } = await response.json();
  const product = results.find((item) => item.trackId === app.id);
  if (!product) throw new Error(`Product verification failed: ${app.slug}`);
  const images = [];
  for (const [index, url] of product.screenshotUrls
    .slice(0, app.count)
    .entries()) {
    images.push(
      await download(
        url,
        `public/projects/${app.slug}-${index + 1}.${url.endsWith("png") ? "png" : "jpg"}`,
      ),
    );
  }
  images.push(
    await download(
      product.artworkUrl512,
      `public/projects/${app.slug}-icon.jpg`,
    ),
  );
  sources.push({
    product: product.trackName,
    id: app.id,
    lookup,
    page: product.trackViewUrl,
    verifiedAt: "2026-11-06",
    images,
  });
  console.log(`Verified ${product.trackName}: ${images.length} assets`);
}
const fonts = [
  [
    "geist-regular.ttf",
    "https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RnOM4nQ.ttf",
  ],
  [
    "geist-medium.ttf",
    "https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RruM4nQ.ttf",
  ],
  [
    "geist-semibold.ttf",
    "https://fonts.gstatic.com/s/geist/v5/gyBhhwUxId8gMGYQMKR3pzfaWI_RQuQ4nQ.ttf",
  ],
  [
    "inter-tight-regular.ttf",
    "https://fonts.gstatic.com/s/intertight/v9/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjDw-qXA.ttf",
  ],
  [
    "inter-tight-medium.ttf",
    "https://fonts.gstatic.com/s/intertight/v9/NGSnv5HMAFg6IuGlBNMjxJEL2VmU3NS7Z2mjPQ-qXA.ttf",
  ],
  [
    "geist-mono.ttf",
    "https://fonts.gstatic.com/s/geistmono/v6/or3yQ6H-1_WfwkMZI_qYPLs1a-t7PU0AbeE9KJ5T.ttf",
  ],
];
for (const [file, url] of fonts) await download(url, `public/fonts/${file}`);
for (const family of ["geist", "geistmono", "intertight"])
  await download(
    `https://raw.githubusercontent.com/google/fonts/main/ofl/${family}/OFL.txt`,
    `public/fonts/${family}-LICENSE.txt`,
  );
await mkdir(path.join(root, "docs"), { recursive: true });
await writeFile(
  path.join(root, "docs/asset-sources.json"),
  JSON.stringify(
    {
      projects: sources,
      fonts: fonts.map(([file, source]) => ({ file, source })),
    },
    null,
    2,
  ) + "\n",
);

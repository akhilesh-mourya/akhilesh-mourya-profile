import { profile } from "./portfolio";

// Public deployment address confirmed by the portfolio owner.
const productionUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  "https://akhilesh-mourya-profile.vercel.app";
export const siteOrigin = new URL(productionUrl).origin;
export const site = {
  name: profile.name,
  title: "Akhilesh Mourya — Mobile Lead & Full-Stack Engineer",
  description:
    "13+ years building iOS, Android, and web applications. Selected work and engineering experience from Akhilesh Mourya, based in Indore, India.",
  url: siteOrigin,
};

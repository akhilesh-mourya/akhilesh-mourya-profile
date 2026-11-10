import { loadFont } from "@remotion/fonts";
import { staticFile } from "remotion";

// These modules are used only in Studio and the lazily loaded browser Player.
if (typeof document !== "undefined") {
  void Promise.all([
    loadFont({
      family: "ReelGeist",
      url: staticFile("fonts/geist-regular.ttf"),
      weight: "400",
      display: "swap",
    }),
    loadFont({
      family: "ReelGeist",
      url: staticFile("fonts/geist-medium.ttf"),
      weight: "500",
      display: "swap",
    }),
    loadFont({
      family: "ReelInter",
      url: staticFile("fonts/inter-tight-medium.ttf"),
      weight: "500",
      display: "swap",
    }),
  ]).catch((error) => console.warn("Reel font loading failed:", error));
}
export const reelFonts = {
  body: "ReelGeist, Arial, sans-serif",
  heading: "ReelInter, Arial, sans-serif",
};

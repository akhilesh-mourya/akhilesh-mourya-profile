import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { site } from "@/data/site";

export const runtime = "nodejs";
export const alt = "Akhilesh Mourya — Mobile lead & full-stack engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function SocialImage() {
  const [heading, body, portrait] = await Promise.all([
    readFile(path.join(process.cwd(), "public/fonts/inter-tight-medium.ttf")),
    readFile(path.join(process.cwd(), "public/fonts/geist-regular.ttf")),
    sharp(path.join(process.cwd(), "public/profile/akhilesh-mourya.png"))
      .resize(360, 450, { fit: "cover" })
      .png()
      .toBuffer(),
  ]);
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        background: "#EDE9E7",
        color: "#10151C",
        fontFamily: "Geist",
        padding: 56,
        gap: 54,
      }}
    >
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#650D2A" }}>
          Akhilesh Mourya
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter Tight",
              fontSize: 70,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
            }}
          >
            I build the app.
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "Inter Tight",
              fontSize: 70,
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#650D2A",
            }}
          >
            And lead the team.
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: 25,
              lineHeight: 1.4,
              marginTop: 8,
            }}
          >
            <div style={{ display: "flex" }}>
              Mobile lead & full-stack engineer
            </div>
            <div style={{ display: "flex" }}>13+ years / Indore, India</div>
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 21, color: "#4D565F" }}>
          {new URL(site.url).host}
        </div>
      </div>
      <div
        style={{
          display: "flex",
          width: 332,
          background: "#A4B5C4",
          alignItems: "center",
          justifyContent: "center",
          padding: 18,
        }}
      >
        {/* ImageResponse renders HTML image elements, not Next.js image components. */}
        <img
          src={`data:image/png;base64,${portrait.toString("base64")}`}
          alt=""
          width={296}
          height={370}
          style={{ objectFit: "cover" }}
        />
      </div>
    </div>,
    {
      ...size,
      fonts: [
        { name: "Inter Tight", data: heading, weight: 500 },
        { name: "Geist", data: body, weight: 400 },
      ],
    },
  );
}

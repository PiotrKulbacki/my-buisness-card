import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

/** Canonical share URL for crawlers (WhatsApp) is `public/og.jpg` (rendered from this route) - see `brandShareImage()`. */

export const alt = `${siteConfig.name} - ${siteConfig.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function OpenGraphImage({ params }: Props) {
  await params;

  const lockupData = await readFile(
    join(process.cwd(), "public", "brand", "ui-lockup-horizontal.png"),
  );
  const lockupSrc = `data:image/png;base64,${lockupData.toString("base64")}`;
  const portraitData = await readFile(join(process.cwd(), "public", siteConfig.portraitSrc));
  const portraitSrc = `data:image/png;base64,${portraitData.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#050505",
        padding: "64px 72px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      {/* Portrait on the right, blended into the background like the home hero. */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: 540,
          height: 630,
          display: "flex",
        }}
      >
        <img
          src={portraitSrc}
          alt=""
          width={540}
          height={630}
          style={{ width: 540, height: 630, objectFit: "cover", objectPosition: "50% 0%" }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 220,
            height: 630,
            backgroundImage: "linear-gradient(to right, #050505, rgba(5,5,5,0))",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            bottom: 0,
            width: 540,
            height: 160,
            backgroundImage: "linear-gradient(to top, #050505, rgba(5,5,5,0))",
          }}
        />
      </div>

      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={lockupSrc}
          alt=""
          width={420}
          height={107}
          style={{ width: 420, height: 107, objectFit: "contain" }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 700,
            color: "#f5f5f5",
            letterSpacing: "-0.04em",
            maxWidth: 620,
          }}
        >
          {siteConfig.role}
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 28,
            color: "#9a9a9a",
            maxWidth: 600,
            lineHeight: 1.35,
          }}
        >
          <span>Websites, apps, SaaS and automations.</span>
          <span>On-site IT support in Berlin.</span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: 560,
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 28,
          color: "#c8f542",
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        <span style={{ color: "#ff6a3d" }}>Berlin · Remote EU</span>
      </div>
    </div>,
    { ...size },
  );
}

import { ImageResponse } from "next/og";
import { siteConfig } from "@/config/site";
import { routing } from "@/i18n/routing";

export const alt = `${siteConfig.name} — ${siteConfig.role}`;
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

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: "#050505",
        padding: "64px 72px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#c8f542",
            color: "#0a0a0a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "-0.04em",
          }}
        >
          PK
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#f5f5f5",
            fontWeight: 600,
            letterSpacing: "-0.02em",
          }}
        >
          {siteConfig.name}
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div
          style={{
            fontSize: 72,
            lineHeight: 1.05,
            fontWeight: 700,
            color: "#f5f5f5",
            letterSpacing: "-0.04em",
            maxWidth: 920,
          }}
        >
          Software Engineer
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#9a9a9a",
            maxWidth: 820,
            lineHeight: 1.35,
          }}
        >
          Digital products, websites and apps — from concept to production.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(255,255,255,0.12)",
          paddingTop: 28,
          color: "#c8f542",
          fontSize: 24,
          fontWeight: 600,
        }}
      >
        <span>{siteConfig.url.replace(/^https?:\/\//, "")}</span>
        <span style={{ color: "#ff6a3d" }}>Remote · Berlin / EU</span>
      </div>
    </div>,
    { ...size },
  );
}

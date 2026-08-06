import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#F5F5F5",
        color: "#050505",
        fontSize: 84,
        fontWeight: 700,
        borderRadius: 36,
      }}
    >
      P
    </div>,
    size,
  );
}

import { ImageResponse } from "next/og";

export const runtime = "edge";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 100%)",
          borderRadius: 8,
        }}
      >
        <div
          style={{
            fontSize: 18,
            fontWeight: 700,
            background: "linear-gradient(90deg, #00d4ff, #a855f7)",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          KS
        </div>
      </div>
    ),
    { ...size }
  );
}

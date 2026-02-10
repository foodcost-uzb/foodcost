import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "FOODCOST — Консалтинг для ресторанного бизнеса";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1a1a2e 0%, #5838a8 60%, #c04880 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            FOODCOST
          </div>
          <div
            style={{
              fontSize: 28,
              color: "rgba(255,255,255,0.85)",
              maxWidth: 700,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Консалтинг для ресторанного бизнеса
          </div>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "16px",
            }}
          >
            {["Аудит", "Настройка", "Внедрение", "Обучение"].map((item) => (
              <div
                key={item}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  borderRadius: "12px",
                  padding: "8px 20px",
                  color: "white",
                  fontSize: 18,
                }}
              >
                {item}
              </div>
            ))}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.6)",
              marginTop: "24px",
            }}
          >
            foodcost.uz
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

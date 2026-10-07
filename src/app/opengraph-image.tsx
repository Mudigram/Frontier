import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Frontier ($FRNT) — Chapter Wars • On-Chain 3D Observability";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
          backgroundColor: "#070a12",
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(212, 168, 83, 0.18) 0%, transparent 50%), radial-gradient(circle at 20% 80%, rgba(14, 165, 233, 0.12) 0%, transparent 50%)",
          color: "#f1f5f9",
          fontFamily: "system-ui, sans-serif",
          border: "2px solid #1e293b",
        }}
      >
        {/* Top Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            {/* Hexagonal Gold Emblem */}
            <div
              style={{
                width: "48px",
                height: "48px",
                borderRadius: "14px",
                border: "2px solid rgba(212, 168, 83, 0.8)",
                backgroundColor: "#0f172a",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 0 20px rgba(212, 168, 83, 0.3)",
              }}
            >
              <div
                style={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: "#d4a853",
                  transform: "rotate(45deg)",
                }}
              />
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span
                style={{
                  fontSize: "26px",
                  fontWeight: 900,
                  letterSpacing: "0.05em",
                  color: "#ffffff",
                }}
              >
                FRONTIER
              </span>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.2em",
                  color: "#d4a853",
                }}
              >
                CHAPTER WARS
              </span>
            </div>
          </div>

          {/* Token-2022 Badge */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "999px",
              backgroundColor: "#0f172a",
              border: "1px solid #334155",
              fontSize: "14px",
              fontWeight: 700,
              color: "#38bdf8",
            }}
          >
            <div
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "999px",
                backgroundColor: "#10b981",
              }}
            />
            SOLANA TOKEN-2022
          </div>
        </div>

        {/* Central Core Title & Tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginTop: "20px" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 900,
              letterSpacing: "-0.02em",
              lineHeight: 1.05,
              color: "#ffffff",
            }}
          >
            THE WORLD EXPANDS BY CHAPTER
          </div>
          <div
            style={{
              fontSize: "22px",
              fontWeight: 500,
              color: "#94a3b8",
              maxWidth: "850px",
              lineHeight: 1.4,
            }}
          >
            On-chain observability and interactive 3D world for Frontier ($FRNT).
            Governed by active Token-2022 transfer hooks and live volume milestones.
          </div>
        </div>

        {/* Bottom Feature Badges */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingTop: "24px",
            borderTop: "1px solid #1e293b",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>
                ACTIVE STAGE
              </span>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#f59e0b" }}>
                CHAPTER II • SETTLEMENT
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>
                HOOK WALLET CEILING
              </span>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#10b981" }}>
                4.00% MAX HOLDING
              </span>
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <span style={{ fontSize: "11px", color: "#64748b", fontWeight: 700 }}>
                EXPANSION ENGINE
              </span>
              <span style={{ fontSize: "18px", fontWeight: 800, color: "#38bdf8" }}>
                3D ARCHIPELAGO
              </span>
            </div>
          </div>

          <div
            style={{
              fontSize: "14px",
              fontWeight: 700,
              color: "#d4a853",
              letterSpacing: "0.05em",
            }}
          >
            $FRNT • VERIFIED OBSERVABILITY
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

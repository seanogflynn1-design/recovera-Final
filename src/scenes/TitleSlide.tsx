import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { BRAND, FONT_INTER } from "../brand";
import { RecoveraMark } from "../RecoveraMark";

export const TitleSlide: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeMs = 500;
  const fadeFrames = (fadeMs / 1000) * fps;
  const opacity = interpolate(frame, [0, fadeFrames], [0, 1], {
    extrapolateRight: "clamp",
  });

  const markSize = 140;
  const wordSize = 96;

  return (
    <AbsoluteFill
      style={{
        background: BRAND.bg,
        fontFamily: FONT_INTER,
        color: BRAND.ink,
        opacity,
      }}
    >
      <AbsoluteFill
        style={{
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: markSize * (12 / 140),
          }}
        >
          <RecoveraMark size={markSize} />
          <div
            style={{
              fontSize: wordSize,
              fontWeight: 600,
              letterSpacing: -2.4,
              lineHeight: 1,
            }}
          >
            Recovera
          </div>
        </div>
        <div
          style={{
            marginTop: 80,
            fontSize: 13,
            fontWeight: 500,
            letterSpacing: "0.3em",
            color: BRAND.ink3,
            textTransform: "uppercase",
          }}
        >
          NovaUCD 2026 · Application
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

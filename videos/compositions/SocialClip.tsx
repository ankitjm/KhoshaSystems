import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from "remotion";
import { BRAND } from "../theme";

interface Stat {
  value: string;
  label: string;
}

interface SocialClipProps {
  productName: string;
  headline: string;
  painPoints: string[];
  solution: string;
  stats: Stat[];
  ctaText: string;
}

const HookScene: React.FC<{ headline: string }> = ({ headline }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 10, mass: 0.8 } });
  const shakeX =
    frame < 15
      ? interpolate(frame, [5, 8, 11, 14], [0, -4, 4, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        })
      : 0;

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${BRAND.colors.stone900} 0%, #2a1f14 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          transform: `scale(${scale}) translateX(${shakeX}px)`,
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: 52,
            fontWeight: 700,
            color: "white",
            fontFamily: BRAND.fonts.heading,
            lineHeight: 1.2,
            maxWidth: 900,
          }}
        >
          {headline}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const PainPointsScene: React.FC<{ painPoints: string[] }> = ({
  painPoints,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #1a0a0a 0%, ${BRAND.colors.stone900} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 28,
          color: BRAND.colors.stone400,
          fontFamily: BRAND.fonts.body,
          marginBottom: 40,
          textAlign: "center",
        }}
      >
        Sound familiar?
      </div>
      {painPoints.map((point, i) => {
        const delay = i * 15;
        const slideIn = spring({
          frame: frame - delay,
          fps,
          config: { damping: 14 },
        });
        const opacity = interpolate(frame - delay, [0, 10], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });
        return (
          <div
            key={i}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              marginBottom: 28,
              opacity,
              transform: `translateX(${interpolate(slideIn, [0, 1], [-60, 0])}px)`,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: "#ff4444" + "20",
                border: "1px solid #ff444440",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 24,
                flexShrink: 0,
              }}
            >
              ✕
            </div>
            <div
              style={{
                fontSize: 28,
                color: BRAND.colors.stone200,
                fontFamily: BRAND.fonts.body,
              }}
            >
              {point}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};

const SolutionScene: React.FC<{
  solution: string;
  productName: string;
  stats: Stat[];
}> = ({ solution, productName, stats }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleScale = spring({ frame, fps, config: { damping: 12 } });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, ${BRAND.colors.stone900} 0%, #2a1f14 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      {/* Background glow */}
      <div
        style={{
          position: "absolute",
          width: 600,
          height: 600,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.colors.bronze500}15, transparent 70%)`,
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      <div style={{ textAlign: "center", zIndex: 1 }}>
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${BRAND.colors.bronze500}, ${BRAND.colors.bronze600})`,
            margin: "0 auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 36,
            fontWeight: 700,
            color: "white",
            fontFamily: BRAND.fonts.heading,
            transform: `scale(${titleScale})`,
          }}
        >
          K
        </div>
        <div
          style={{
            fontSize: 40,
            fontWeight: 700,
            color: BRAND.colors.bronze400,
            fontFamily: BRAND.fonts.heading,
            marginBottom: 16,
            transform: `scale(${titleScale})`,
          }}
        >
          {productName}
        </div>
        <div
          style={{
            fontSize: 32,
            color: "white",
            fontFamily: BRAND.fonts.body,
            marginBottom: 48,
          }}
        >
          {solution}
        </div>

        <div
          style={{
            display: "flex",
            gap: 24,
            justifyContent: "center",
          }}
        >
          {stats.map((stat, i) => {
            const delay = 15 + i * 10;
            const scale = spring({
              frame: frame - delay,
              fps,
              config: { damping: 10 },
            });
            return (
              <div
                key={i}
                style={{
                  background: `${BRAND.colors.bronze500}15`,
                  border: `1px solid ${BRAND.colors.bronze500}30`,
                  borderRadius: 16,
                  padding: "24px 32px",
                  transform: `scale(${Math.max(0, scale)})`,
                }}
              >
                <div
                  style={{
                    fontSize: 40,
                    fontWeight: 700,
                    color: BRAND.colors.bronze400,
                    fontFamily: BRAND.fonts.heading,
                  }}
                >
                  {stat.value}
                </div>
                <div
                  style={{
                    fontSize: 16,
                    color: BRAND.colors.stone300,
                    fontFamily: BRAND.fonts.body,
                    marginTop: 4,
                  }}
                >
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const CTAScene: React.FC<{ ctaText: string }> = ({ ctaText }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulse =
    1 + 0.02 * Math.sin((frame / fps) * Math.PI * 2);
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(180deg, #2a1f14 0%, ${BRAND.colors.stone900} 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
        opacity: fadeIn,
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            display: "inline-block",
            background: `linear-gradient(135deg, ${BRAND.colors.bronze500}, ${BRAND.colors.bronze600})`,
            padding: "20px 48px",
            borderRadius: 16,
            fontSize: 32,
            fontWeight: 700,
            color: "white",
            fontFamily: BRAND.fonts.heading,
            transform: `scale(${pulse})`,
          }}
        >
          {ctaText}
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 18,
            color: BRAND.colors.stone400,
            fontFamily: BRAND.fonts.body,
          }}
        >
          khoshà SYSTEMS
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const SocialClip: React.FC<SocialClipProps> = ({
  productName,
  headline,
  painPoints,
  solution,
  stats,
  ctaText,
}) => {
  // 30 seconds at 30fps = 900 frames
  const hookDuration = 120; // 4s — attention grab
  const painDuration = 300; // 10s — pain points
  const solutionDuration = 300; // 10s — solution + stats
  const ctaDuration = 180; // 6s — CTA

  return (
    <AbsoluteFill>
      <Sequence durationInFrames={hookDuration}>
        <HookScene headline={headline} />
      </Sequence>

      <Sequence from={hookDuration} durationInFrames={painDuration}>
        <PainPointsScene painPoints={painPoints} />
      </Sequence>

      <Sequence
        from={hookDuration + painDuration}
        durationInFrames={solutionDuration}
      >
        <SolutionScene
          solution={solution}
          productName={productName}
          stats={stats}
        />
      </Sequence>

      <Sequence
        from={hookDuration + painDuration + solutionDuration}
        durationInFrames={ctaDuration}
      >
        <CTAScene ctaText={ctaText} />
      </Sequence>
    </AbsoluteFill>
  );
};

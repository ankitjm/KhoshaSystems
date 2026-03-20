import React from "react";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Easing,
} from "remotion";
import { BRAND } from "../theme";

interface Feature {
  icon: string;
  title: string;
  description: string;
  stat: string;
}

interface Stat {
  value: string;
  label: string;
}

interface ProductDemoProps {
  productName: string;
  tagline: string;
  features: Feature[];
  stats: Stat[];
  ctaText: string;
}

const IntroScene: React.FC<{ productName: string; tagline: string }> = ({
  productName,
  tagline,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, config: { damping: 12 } });
  const taglineOpacity = interpolate(frame, [20, 40], [0, 1], {
    extrapolateRight: "clamp",
  });
  const taglineY = interpolate(frame, [20, 40], [30, 0], {
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BRAND.colors.stone900} 0%, #2a1f14 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Grid pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(${BRAND.colors.bronze500}10 1px, transparent 1px), linear-gradient(90deg, ${BRAND.colors.bronze500}10 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div style={{ textAlign: "center", transform: `scale(${logoScale})` }}>
        {/* K mark */}
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 16,
            background: `linear-gradient(135deg, ${BRAND.colors.bronze500}, ${BRAND.colors.bronze600})`,
            margin: "0 auto 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 40,
            fontWeight: 700,
            color: "white",
            fontFamily: BRAND.fonts.heading,
          }}
        >
          K
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            fontFamily: BRAND.fonts.heading,
            marginBottom: 16,
          }}
        >
          {productName}
        </div>
        <div
          style={{
            fontSize: 24,
            color: BRAND.colors.bronze400,
            fontFamily: BRAND.fonts.body,
            opacity: taglineOpacity,
            transform: `translateY(${taglineY}px)`,
            maxWidth: 600,
          }}
        >
          {tagline}
        </div>
      </div>
    </AbsoluteFill>
  );
};

const FeatureScene: React.FC<{ feature: Feature; index: number }> = ({
  feature,
  index,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slideIn = spring({ frame, fps, config: { damping: 14 } });
  const statScale = spring({
    frame: frame - 20,
    fps,
    config: { damping: 10 },
  });

  const iconMap: Record<string, string> = {
    barcode: "📊",
    receipt: "🧾",
    tag: "🏷️",
    warehouse: "🏪",
    chart: "📈",
    shield: "🛡️",
  };

  return (
    <AbsoluteFill
      style={{
        background:
          index % 2 === 0
            ? `linear-gradient(135deg, ${BRAND.colors.stone900} 0%, #1a1510 100%)`
            : `linear-gradient(135deg, #1a1510 0%, ${BRAND.colors.stone900} 100%)`,
        padding: 60,
        justifyContent: "center",
      }}
    >
      <div
        style={{
          display: "flex",
          gap: 60,
          alignItems: "center",
          transform: `translateX(${interpolate(slideIn, [0, 1], [-100, 0])}px)`,
          opacity: slideIn,
        }}
      >
        {/* Feature icon */}
        <div
          style={{
            width: 120,
            height: 120,
            borderRadius: 24,
            background: `linear-gradient(135deg, ${BRAND.colors.bronze500}20, ${BRAND.colors.bronze600}30)`,
            border: `2px solid ${BRAND.colors.bronze500}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
            flexShrink: 0,
          }}
        >
          {iconMap[feature.icon] || "⚡"}
        </div>

        <div style={{ flex: 1 }}>
          <div
            style={{
              fontSize: 36,
              fontWeight: 700,
              color: "white",
              fontFamily: BRAND.fonts.heading,
              marginBottom: 12,
            }}
          >
            {feature.title}
          </div>
          <div
            style={{
              fontSize: 22,
              color: BRAND.colors.stone300,
              fontFamily: BRAND.fonts.body,
              marginBottom: 24,
              lineHeight: 1.4,
            }}
          >
            {feature.description}
          </div>
          <div
            style={{
              display: "inline-block",
              background: `linear-gradient(135deg, ${BRAND.colors.bronze500}, ${BRAND.colors.bronze600})`,
              padding: "8px 24px",
              borderRadius: 8,
              transform: `scale(${Math.max(0, statScale)})`,
            }}
          >
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                color: "white",
                fontFamily: BRAND.fonts.heading,
              }}
            >
              {feature.stat}
            </span>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

const StatsScene: React.FC<{ stats: Stat[] }> = ({ stats }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BRAND.colors.stone900} 0%, #2a1f14 100%)`,
        justifyContent: "center",
        alignItems: "center",
        padding: 60,
      }}
    >
      <div
        style={{
          fontSize: 36,
          fontWeight: 700,
          color: "white",
          fontFamily: BRAND.fonts.heading,
          marginBottom: 48,
          textAlign: "center",
        }}
      >
        Results That Speak
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 32,
          maxWidth: 800,
          width: "100%",
        }}
      >
        {stats.map((stat, i) => {
          const delay = i * 8;
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
                padding: "32px 24px",
                textAlign: "center",
                transform: `scale(${Math.max(0, scale)})`,
              }}
            >
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 700,
                  color: BRAND.colors.bronze400,
                  fontFamily: BRAND.fonts.heading,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontSize: 18,
                  color: BRAND.colors.stone300,
                  fontFamily: BRAND.fonts.body,
                }}
              >
                {stat.label}
              </div>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

const CTAScene: React.FC<{ ctaText: string; productName: string }> = ({
  ctaText,
  productName,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 12 } });
  const glowOpacity = interpolate(
    frame,
    [0, 30, 60],
    [0, 0.6, 0.3],
    { extrapolateRight: "clamp" },
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${BRAND.colors.stone900} 0%, #2a1f14 100%)`,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {/* Bronze glow */}
      <div
        style={{
          position: "absolute",
          width: 400,
          height: 400,
          borderRadius: "50%",
          background: `radial-gradient(circle, ${BRAND.colors.bronze500}40, transparent 70%)`,
          opacity: glowOpacity,
        }}
      />

      <div
        style={{
          textAlign: "center",
          transform: `scale(${scale})`,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            color: "white",
            fontFamily: BRAND.fonts.heading,
            marginBottom: 24,
          }}
        >
          Ready to transform your store?
        </div>
        <div
          style={{
            display: "inline-block",
            background: `linear-gradient(135deg, ${BRAND.colors.bronze500}, ${BRAND.colors.bronze600})`,
            padding: "16px 48px",
            borderRadius: 12,
            fontSize: 28,
            fontWeight: 600,
            color: "white",
            fontFamily: BRAND.fonts.body,
          }}
        >
          {ctaText}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 16,
            color: BRAND.colors.stone400,
            fontFamily: BRAND.fonts.body,
          }}
        >
          khoshà SYSTEMS • Precision-Engineered Business Solutions
        </div>
      </div>
    </AbsoluteFill>
  );
};

export const ProductDemo: React.FC<ProductDemoProps> = ({
  productName,
  tagline,
  features,
  stats,
  ctaText,
}) => {
  const featureDuration = 50; // frames per feature
  const introDuration = 60;
  const statsDuration = 60;
  const ctaDuration = 70; // ~2.3s for CTA

  return (
    <AbsoluteFill>
      <Sequence durationInFrames={introDuration}>
        <IntroScene productName={productName} tagline={tagline} />
      </Sequence>

      {features.map((feature, i) => (
        <Sequence
          key={i}
          from={introDuration + i * featureDuration}
          durationInFrames={featureDuration}
        >
          <FeatureScene feature={feature} index={i} />
        </Sequence>
      ))}

      <Sequence
        from={introDuration + features.length * featureDuration}
        durationInFrames={statsDuration}
      >
        <StatsScene stats={stats} />
      </Sequence>

      <Sequence
        from={introDuration + features.length * featureDuration + statsDuration}
        durationInFrames={ctaDuration}
      >
        <CTAScene ctaText={ctaText} productName={productName} />
      </Sequence>
    </AbsoluteFill>
  );
};

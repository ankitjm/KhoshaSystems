import { Composition } from "remotion";
import { ProductDemo } from "./compositions/ProductDemo";
import { SocialClip } from "./compositions/SocialClip";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ProductDemo"
        component={ProductDemo}
        durationInFrames={300}
        fps={30}
        width={1280}
        height={720}
        defaultProps={{
          productName: "RetailerOS",
          tagline: "The Operating System for Telecom & Electronics Retail",
          features: [
            {
              icon: "barcode",
              title: "IMEI/Serial Tracking",
              description: "Full audit trail with barcode & camera capture",
              stat: "<0.5% shrinkage",
            },
            {
              icon: "receipt",
              title: "GST-Compliant Billing",
              description: "HSN mapping, e-invoicing, auto tax calculation",
              stat: "40% faster checkout",
            },
            {
              icon: "tag",
              title: "Brand Scheme Management",
              description: "Auto-loads schemes from Samsung, Vivo, Oppo & more",
              stat: "₹2-4L monthly recovery",
            },
            {
              icon: "warehouse",
              title: "Multi-Store Inventory",
              description: "Real-time sync across all locations",
              stat: "3x accuracy",
            },
          ],
          stats: [
            { value: "40%", label: "Faster Checkout" },
            { value: "3x", label: "Inventory Accuracy" },
            { value: "60%", label: "Less Manual Work" },
            { value: "30-day", label: "ROI" },
          ],
          ctaText: "Start Free Trial → retaileros.in",
        }}
      />
      <Composition
        id="SocialClip"
        component={SocialClip}
        durationInFrames={900}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          productName: "RetailerOS",
          headline: "Still using Excel to run your mobile shop?",
          painPoints: [
            "Missing brand scheme payouts",
            "Manual IMEI tracking errors",
            "GST filing nightmares",
          ],
          solution: "RetailerOS automates it all.",
          stats: [
            { value: "40%", label: "Faster Checkout" },
            { value: "₹2-4L", label: "Monthly Recovery" },
          ],
          ctaText: "Try free → retaileros.in",
        }}
      />
    </>
  );
};

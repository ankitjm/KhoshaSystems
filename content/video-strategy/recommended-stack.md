# Recommended Video Stack for Khosha Systems

*March 2026*

---

## Recommended Stack

### Tier 1 — Core (Start Immediately)

| Tool | Role | Monthly Cost | Why |
|---|---|---|---|
| **HeyGen Pro** | AI avatar product demos & explainers | $99/mo | Fastest path to professional product videos. Script → video in minutes. Custom avatar, 40+ languages, API for automation. Ideal for RetailerOS/CRM/VMS explainers and multilingual content for Indian markets. |
| **ffmpeg** | Post-production automation | Free | Subtitle burning, watermarking, multi-format export (YouTube 16:9, LinkedIn 4:5, Instagram 9:16), thumbnail generation, compression. Essential pipeline infrastructure. |
| **OBS Studio + Loom** | Screen recording | Free / $15/mo | Capture actual product UI walkthroughs. OBS for polished recordings, Loom for quick personalized sales outreach clips. |

### Tier 2 — Scale (Month 2-3)

| Tool | Role | Monthly Cost | Why |
|---|---|---|---|
| **Remotion** | Programmatic templated video | ~$150/mo (license + 2 dev seats) | Build reusable video templates driven by data. Once templates exist: generate personalized demos per prospect, localized versions, weekly metrics videos — all automated. Our React team can adopt in 1-2 days. |
| **Pictory** | Blog-to-video repurposing | $29/mo | Feed existing blog posts, case studies, and one-pagers into Pictory for auto-generated LinkedIn/website clips. Maximizes ROI on written content we already produce. |

### Tier 3 — Premium (Month 4+, as budget allows)

| Tool | Role | Monthly Cost | Why |
|---|---|---|---|
| **Kling AI or Runway** | Cinematic B-roll | $7-15/mo | Generate atmospheric footage (telecom store, real estate office, front desk) as backgrounds and intros. Layer HeyGen presenter over cinematic B-roll for premium look. |
| **Google Veo 3.1** | High-fidelity brand videos with audio | $7.99-$15/mo | When brand video quality needs to step up. Vertex AI route for enterprise compliance if needed. |

### Watch List (Not Yet Cost-Justified)

| Tool | When to Revisit |
|---|---|
| **Tavus** | When/if we want embedded interactive AI video agents inside RetailerOS |
| **D-ID** | When ABM outbound scales to 100+ personalized prospect videos/month |
| **Synthesia** | If we need SCORM/LMS integration for customer training programs |

---

## Total Monthly Cost Projection

| Phase | Tools | Monthly Cost |
|---|---|---|
| **Month 1** (MVP) | HeyGen Pro + ffmpeg + OBS/Loom | ~$99-$114 |
| **Month 2-3** (Scale) | + Remotion + Pictory | ~$278-$293 |
| **Month 4+** (Premium) | + Kling/Runway + Veo | ~$293-$323 |

**Annual projection: ~$3,000-$4,000/year** for a complete B2B video production capability — less than the cost of a single agency-produced explainer video.

---

## Rationale

### Why HeyGen over Synthesia?
- HeyGen's Avatar IV offers the highest realism at a lower price point ($99 vs Synthesia's $64 Creator which lacks key features)
- HeyGen's API is more accessible for our automation needs
- Synthesia's Studio Avatars add $1,000/year — a hidden cost that closes the price gap
- Synthesia is better for enterprise L&D, which isn't our primary need right now

### Why Remotion over other programmatic tools?
- We have React developers — Remotion's learning curve is near-zero for them
- Lambda rendering at ~$0.02/video makes scale economics excellent
- No other tool offers the same "video as code" paradigm with full React ecosystem access
- Can reuse our existing design system components inside video frames

### Why not just AI avatar tools?
- AI avatars can't show actual software UI — they present a talking head
- Product demos need screen recordings + annotations + branded templates
- Remotion fills the "show the product" gap that avatar tools can't
- The combination of HeyGen (presenter) + Remotion (product UI) + ffmpeg (assembly) covers all bases

### Why ffmpeg is non-negotiable
- Every video needs multi-format export (YouTube, LinkedIn, Instagram have different specs)
- Subtitle burning is required for social (most viewers watch muted)
- Watermarking/branding is a per-video cost if done manually, zero-cost if automated
- The ffmpeg pipeline pays for itself after the first 5 videos

---

## Distribution Strategy (Tied to Stack)

| Channel | Format | Tool Used |
|---|---|---|
| **Website** (product pages) | 60-90s explainer per product | HeyGen + ffmpeg |
| **YouTube** | Tutorials, demos, thought leadership | OBS (screen record) + Remotion (templates) + ffmpeg (post) |
| **LinkedIn** | 60s native video clips, founder insights | HeyGen shorts + ffmpeg (4:5 crop) |
| **Instagram Reels** | 30-60s product tips, behind-the-scenes | ffmpeg (9:16 crop from YouTube content) |
| **Email outreach** | Personalized Loom-style clips | Loom or Remotion (personalized) |
| **Blog repurposing** | Auto-generated video from articles | Pictory |

---

*This recommendation is designed to start lean and scale as video proves ROI. Month 1 investment is under $115/mo — less than most SaaS tools we already use.*

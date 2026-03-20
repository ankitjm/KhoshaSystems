# Implementation Estimate — Video Production Capability

*Khosha Systems | March 2026*

This document outlines what the engineering/CTO team would need to build to support the video strategy, broken into phases.

---

## Phase 1: Immediate (Week 1) — No Engineering Required

**Owner:** CMO / Marketing

These items require zero engineering effort. Marketing can start producing videos immediately.

| Item | Action | Tools | Time |
|---|---|---|---|
| HeyGen account setup | Sign up for Pro plan ($99/mo), create custom avatar | HeyGen web UI | 1 hour |
| ffmpeg pipeline scripts | Write bash scripts for: subtitle burning, watermarking, multi-format export (16:9, 4:5, 9:16), thumbnail generation | ffmpeg CLI | 4-6 hours |
| OBS Studio setup | Install, configure screen recording profiles for each product | OBS | 1 hour |
| YouTube channel setup | Create channel, configure branding, create playlists per product | YouTube Studio | 2 hours |
| First 2 videos | RetailerOS explainer + founder thought leadership | HeyGen + OBS + ffmpeg | 1 day |

**Total Phase 1 effort:** ~2 days of marketing time, 0 engineering time

---

## Phase 2: Automation Pipeline (Week 2-4) — Light Engineering

**Owner:** CTO/Engineering with CMO input

| Item | Description | Engineering Effort | Priority |
|---|---|---|---|
| **ffmpeg automation service** | A Node.js or Python service that accepts a raw video file + config (subtitle file, logo, output formats) and runs the ffmpeg pipeline. Could be a simple CLI tool or a lightweight API. | 2-3 days | High |
| **Whisper integration** | Auto-generate subtitles from video audio using OpenAI Whisper. Output SRT file → feed into ffmpeg pipeline. Eliminates manual subtitle creation. | 1 day | High |
| **Video asset storage** | S3 bucket (or equivalent) for storing raw footage, processed videos, thumbnails. Organized by product/date. | 0.5 days | Medium |
| **Thumbnail generator** | ffmpeg script that extracts best frame + overlays title text using `drawtext` filter. Batch-generate thumbnails for all videos. | 0.5 days | Medium |

**Total Phase 2 effort:** ~4-5 engineering days

---

## Phase 3: Remotion Setup (Month 2) — Medium Engineering

**Owner:** Engineering (React developers)

| Item | Description | Engineering Effort | Priority |
|---|---|---|---|
| **Remotion project setup** | Initialize Remotion project, integrate with existing design system (fonts, colors, components). | 1 day | High |
| **Product demo template** | Reusable Remotion composition: branded intro → screenshot sequence with animated callouts → feature highlights → CTA outro. Accept props: product name, screenshots[], features[], CTA text. | 3-4 days | High |
| **Social clip template** | 9:16 and 1:1 Remotion compositions for Instagram/LinkedIn. Accept: headline, product screenshot, stat/quote, CTA. | 1-2 days | Medium |
| **Data-driven metrics template** | Composition that accepts numerical data and renders animated charts/counters. Use for: monthly marketing reports, customer success metrics, ROI videos. | 2 days | Medium |
| **Rendering infrastructure** | Option A: Local rendering via `npx remotion render` in CI/CD (free, slower). Option B: Remotion Lambda on AWS (~$0.02/video, faster, scales). Recommend starting with local, moving to Lambda when volume exceeds 10 videos/week. | 1-2 days (local) / 2-3 days (Lambda) | Medium |
| **Template admin UI** (optional) | Simple internal web form where marketing can fill in props (title, screenshots, text) and trigger a Remotion render. Eliminates need for marketing to touch code. | 3-5 days | Low (defer) |

**Total Phase 3 effort:** ~8-13 engineering days (without admin UI: ~8-10 days)

---

## Phase 4: Advanced Automation (Month 3+) — Optional

| Item | Description | Engineering Effort | Priority |
|---|---|---|---|
| **HeyGen API integration** | Programmatically generate avatar videos from scripts via API. Enable: batch video generation, A/B testing different scripts, multilingual auto-generation. | 2-3 days | Low |
| **Content pipeline orchestration** | End-to-end: CMS/form submission → HeyGen API (avatar) + Remotion (product UI) → ffmpeg (assembly) → S3 upload → social media scheduling API. Full automation. | 5-7 days | Low |
| **Personalized sales videos** | Remotion template that accepts prospect name, company, vertical → generates personalized demo video. Integrate with CRM for automated outreach. | 3-4 days | Low |

**Total Phase 4 effort:** ~10-14 engineering days (entirely optional, pursue only if video ROI is proven)

---

## Summary: Engineering Investment

| Phase | Timeline | Engineering Days | Monthly Cost Added |
|---|---|---|---|
| Phase 1 (Immediate) | Week 1 | 0 | $99/mo (HeyGen) |
| Phase 2 (Automation) | Week 2-4 | 4-5 days | ~$5/mo (S3 storage) |
| Phase 3 (Remotion) | Month 2 | 8-10 days | ~$150/mo (Remotion license) |
| Phase 4 (Advanced) | Month 3+ | 10-14 days (optional) | Variable |

**Critical path: Phases 1-2 require ~5 engineering days total and unlock 80% of the video capability.** Phase 3 (Remotion) is the major investment but can be deferred until video production cadence is established.

---

## Technical Prerequisites

| Requirement | Status | Notes |
|---|---|---|
| Node.js 16+ | Likely available | For Remotion |
| ffmpeg installed on dev/CI machines | Needs verification | `apt install ffmpeg` or brew |
| AWS account (for Remotion Lambda) | Likely available | Only needed for Phase 3 Lambda option |
| S3 bucket for video assets | Needs creation | Phase 2 |
| React developer availability | 1 dev, part-time | Phase 3 only |

---

## Risk Factors

| Risk | Mitigation |
|---|---|
| No one on the team has video production experience | HeyGen and Remotion are designed for developers, not video editors. Phase 1 tools require zero video experience. |
| Remotion templates take longer than estimated | Start with simple templates. The product demo template alone covers 60% of video needs. |
| Video doesn't drive measurable leads | Track with UTM parameters on all video CTAs. Phase 1 investment is only $99/mo — low risk to test. |
| ffmpeg scripts become fragile | Wrap in a proper Node.js/Python service in Phase 2 rather than raw bash scripts. |
| Customer unwilling to film testimonial | Offer to film at their location, keep it short (5 minutes of their time), offer a discount/credit as incentive. |

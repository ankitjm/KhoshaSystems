# Email Campaign Performance Tracking Framework

**Campaign:** RetailerOS Cold Outreach — Redington DMS Retailers
**Launch:** March 20, 2026, 9:00 AM IST
**Platform:** Brevo
**Audience:** 100 validated Redington DMS retailers (test batch: 10)

---

## 1. KPI Definitions

### Email Engagement Metrics

| Metric | Definition | How to Track |
|--------|-----------|--------------|
| **Open Rate** | Unique opens / delivered emails × 100 | Brevo dashboard → Campaign → Statistics |
| **Click Rate (CTR)** | Unique clicks / delivered emails × 100 | Brevo dashboard → Campaign → Link tracking |
| **Click-to-Open Rate (CTOR)** | Unique clicks / unique opens × 100 | Calculated: CTR / Open Rate |
| **Bounce Rate** | Bounced / sent × 100 (hard + soft) | Brevo → Logs → Bounces |
| **Unsubscribe Rate** | Unsubscribes / delivered × 100 | Brevo → Campaign → Unsubscribes |
| **Spam Complaint Rate** | Complaints / delivered × 100 | Brevo → Campaign → Complaints |
| **Delivery Rate** | Delivered / sent × 100 | Brevo → Campaign → Overview |

### Website Traffic Metrics (from Email UTMs)

| Metric | Definition | How to Track |
|--------|-----------|--------------|
| **Email-sourced Sessions** | Sessions with `utm_source=brevo&utm_medium=email` | Google Analytics → Acquisition → Campaigns |
| **Pages per Session** | Avg pages viewed per email-sourced visit | GA → Campaign report → Behavior |
| **Avg Session Duration** | Time spent on site from email traffic | GA → Campaign report |
| **Bounce Rate (Web)** | Single-page sessions from email traffic | GA → Campaign report |

### Lead Conversion Metrics

| Metric | Definition | How to Track |
|--------|-----------|--------------|
| **Form Submission Rate** | Contact form submits / email clicks × 100 | GA Goals or Brevo conversion tracking |
| **Demo Booking Rate** | Demo requests / total delivered × 100 | CRM + Brevo contact attributes (`demo_booked`) |
| **Lead-to-Demo Rate** | Demo bookings / total engaged leads × 100 | CRM tracking |
| **Cost per Lead (CPL)** | Total campaign cost / leads generated | Manual calculation |

### Landing Page Engagement

| Metric | Definition | How to Track |
|--------|-----------|--------------|
| **Landing Page Views** | Pageviews on campaign destination URLs | GA → Behavior → Site Content |
| **CTA Click Rate** | CTA button clicks / landing page views × 100 | GA Events or heatmap tool |
| **ROI Calculator Usage** | Completions on `/tools/roi-calculator` | GA Events |
| **Time on Page** | Avg time on landing pages from email traffic | GA → Behavior |

---

## 2. Industry Benchmarks — B2B SaaS Cold Outreach

Source: Mailchimp, HubSpot, Brevo, and Woodpecker industry reports (2025-2026)

| Metric | Industry Average | Good | Excellent | Our Target |
|--------|-----------------|------|-----------|------------|
| **Open Rate** | 15-25% | 25-35% | 35%+ | 25% |
| **Click Rate** | 2-3% | 3-5% | 5%+ | 3% |
| **Click-to-Open Rate** | 10-15% | 15-20% | 20%+ | 15% |
| **Bounce Rate** | <5% | <2% | <1% | <3% |
| **Unsubscribe Rate** | <0.5% | <0.3% | <0.1% | <0.5% |
| **Spam Complaint Rate** | <0.1% | <0.05% | <0.02% | <0.1% |
| **Demo Booking Rate** | 1-2% | 2-4% | 4%+ | 3% |
| **Email-to-Website Bounce** | 50-70% | 40-50% | <40% | <50% |

### India-Specific B2B Notes
- Open rates in India tend to be 5-10% higher than global averages for niche B2B
- Mobile open rates are 60-70% — all emails must be mobile-optimized
- Best send times: 10-11 AM IST (Tue-Thu) for B2B decision makers
- Hindi/regional language subject lines can boost opens 15-20% for SMB segment

---

## 3. Campaign Tracking Structure

### UTM Parameter Convention

All campaign links must use this format:

```
https://khoshasystems.com/{page}?utm_source=brevo&utm_medium=email&utm_campaign={campaign-name}&utm_content={email-identifier}
```

| Parameter | Value | Example |
|-----------|-------|---------|
| `utm_source` | `brevo` (always) | `brevo` |
| `utm_medium` | `email` (always) | `email` |
| `utm_campaign` | `{type}-{month}{year}` | `cold-outreach-mar2026` |
| `utm_content` | `{email-number}-{cta-type}` | `email-1-demo-cta`, `followup-day2-roi` |

### Campaign-Specific UTM Values

| Email | utm_campaign | utm_content |
|-------|-------------|-------------|
| Campaign 1 (Mar 20) | `cold-outreach-mar2026` | `email-1-main-cta` |
| Campaign 2 (Mar 23) | `cold-outreach-mar2026` | `email-2-feature-cta` |
| Campaign 3 (Mar 27) | `cold-outreach-mar2026` | `email-3-urgency-cta` |
| Follow-up Day 2 | `cold-followup-mar2026` | `day2-opener-noclik` |
| Follow-up Day 3 | `cold-followup-mar2026` | `day3-clicker-noconv` |
| Follow-up Day 4 | `cold-followup-mar2026` | `day4-resend-newsubj` |
| Follow-up Day 5 | `cold-followup-mar2026` | `day5-value-add` |

### Brevo Contact Attributes to Track

| Attribute | Type | Values |
|-----------|------|--------|
| `vertical` | string | `retaileros` |
| `lead_source` | string | `cold_outreach` |
| `campaign_batch` | string | `redington-dms-mar2026` |
| `nurture_stage` | number | 1-5 |
| `demo_booked` | boolean | true/false |
| `last_engaged` | date | auto-updated on open/click |

---

## 4. Tracking Cadence & Reporting

### Daily (Campaign Days 1-7)

- [ ] Check Brevo dashboard for delivery, opens, clicks
- [ ] Monitor bounce/complaint rates — pause if complaint rate > 0.1%
- [ ] Log metrics in the tracking table below
- [ ] Trigger appropriate follow-up sequence based on engagement

### Weekly (Ongoing)

- [ ] Compile GA traffic from email UTMs
- [ ] Review form submissions and demo bookings
- [ ] Calculate conversion rates and CPL
- [ ] Compare against benchmarks
- [ ] Report to CEO with recommendations

### Monthly

- [ ] Full funnel analysis: sent → delivered → opened → clicked → converted → demo booked
- [ ] A/B test results review (subject lines, CTAs, send times)
- [ ] Update benchmarks based on our own data
- [ ] Plan next campaign iteration

---

## 5. Performance Tracking Table

### Campaign 1 — Cold Outreach (Mar 20-27, 2026)

| Metric | Day 1 (Mar 20) | Day 2 | Day 3 | Day 7 | Day 14 | Total |
|--------|----------------|-------|-------|-------|--------|-------|
| Sent | | | | | | |
| Delivered | | | | | | |
| Opens (unique) | | | | | | |
| Open Rate % | | | | | | |
| Clicks (unique) | | | | | | |
| Click Rate % | | | | | | |
| Bounces | | | | | | |
| Unsubscribes | | | | | | |
| Complaints | | | | | | |
| Form Submissions | | | | | | |
| Demo Bookings | | | | | | |

### Follow-Up Sequence Performance

| Follow-Up | Sent | Delivered | Opens | Open Rate | Clicks | CTR | Conversions |
|-----------|------|-----------|-------|-----------|--------|-----|-------------|
| Day 2: Openers no-click | | | | | | | |
| Day 3: Clickers no-convert | | | | | | | |
| Day 4: Non-openers resend | | | | | | | |
| Day 5: Value-add all engaged | | | | | | | |

---

## 6. Alert Thresholds

| Condition | Action |
|-----------|--------|
| Bounce rate > 5% | Pause campaign, clean list |
| Spam complaints > 0.1% | Pause immediately, review content |
| Open rate < 10% | Review subject lines, check deliverability |
| Unsubscribe rate > 1% | Review targeting and content relevance |
| Zero clicks after 48h | A/B test new CTA copy |
| Demo booking rate > 5% | Scale to full 100-contact list |

---

## 7. Tools & Access

| Tool | Purpose | Access |
|------|---------|--------|
| Brevo | Email sending, automation, contact management | hello@khoshasystems.com |
| Google Analytics | Website traffic, UTM tracking, goals | GA property for khoshasystems.com |
| Google Search Console | Organic search monitoring | khoshasystems.com verified |
| CRM / Contact DB | Lead tracking, demo bookings | Internal |
| ROI Calculator | Lead capture tool | khoshasystems.com/tools/roi-calculator |

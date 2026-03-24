# Welcome Nurture Sequence — 5-Email Series

**Trigger:** New lead captured via contact form, ROI calculator, or lead magnet download.
**Cadence:** Day 0, Day 2, Day 5, Day 8, Day 12
**From:** Ankit Mehta, Founder & Chief Architect — Khosha Systems <hello@khoshasystems.com>
**Personalization:** Four vertical variants — RetailerOS, Real Estate CRM, VMS. Default to "General" if vertical is unknown.

## Email Branding (All Emails)

All emails in this sequence MUST use the shared branded HTML template (`server/email-template.js`). This ensures:

- **Logo header**: Khosha Systems logo (`https://khoshasystems.com/logo.png`) linked to homepage
- **Product links footer**: Clickable links to RetailerOS, Real Estate CRM, and VMS product pages
- **Company footer**: Address, website, contact, LinkedIn links
- **UTM tracking**: All links include `utm_source=email&utm_medium=campaign&utm_campaign=welcome-nurture-mar2026`

### Brevo Template Variables (for logo/links)

These params are automatically passed to Brevo templates via `brevo.js`:

| Variable | Value |
|----------|-------|
| `{{params.LOGO_URL}}` | `https://khoshasystems.com/logo.png` |
| `{{params.SITE_URL}}` | `https://khoshasystems.com` |
| `{{params.RETAILEROS_URL}}` | `https://khoshasystems.com/retaileros` |
| `{{params.CRM_URL}}` | `https://khoshasystems.com/realestate-crm` |
| `{{params.VMS_URL}}` | `https://khoshasystems.com/vms` |
| `{{params.CONTACT_URL}}` | `https://khoshasystems.com/contact` |
| `{{params.LINKEDIN_URL}}` | `https://www.linkedin.com/company/khoshasystems` |
| `{{params.COMPANY_NAME}}` | `Khosha Systems` |
| `{{params.COMPANY_TAGLINE}}` | `Purpose-built software for Indian businesses` |

**Action required:** Update Brevo templates 11, 12, 13 in the Brevo dashboard to use these variables for logo header and footer links.

---

## Email 1 — Welcome + Product Overview (Day 0)

### Subject Lines (A/B test)
- **RetailerOS:** "Your store deserves better than Tally — here's proof"
- **CRM:** "Your real estate leads are slipping through the cracks"
- **VMS:** "Paper visitor registers are costing you 8+ hours a week"
- **General:** "Thanks for reaching out — here's what we're building"

### Preview Text
- **RetailerOS:** "IMEI tracking, scheme management, and GST billing — built for Indian retailers"
- **CRM:** "Auto-capture from 99acres, MagicBricks, and Housing.com"
- **VMS:** "QR check-in, instant alerts, visitor analytics — under ₹5,000/month"
- **General:** "Purpose-built software for Indian businesses"

### Body

---

#### RetailerOS Variant

Hi {{first_name}},

Thanks for reaching out to Khosha Systems. I'm Ankit — I've spent 15 years building software for businesses across India and North America, and RetailerOS is the product I wish existed when I started working with telecom retailers.

Here's what I've seen: most retailers run their stores on Tally, Gofrugal, or spreadsheets. None of these were built for IMEI-level tracking, brand scheme management, or multi-store inventory sync. The result? 3-5% shrinkage, 10-15% scheme revenue leakage, and 2-3 hours daily lost to manual reconciliation.

RetailerOS was built from the ground up to fix this — not adapted from a generic POS.

**What you get:**
- IMEI/serial-level tracking on every device
- Automated brand scheme & cashback management (no more manual claim tracking)
- Real-time multi-store inventory sync
- GST-compliant billing with barcode scanning

{{#if downloaded_asset}}
Here's the resource you downloaded: [{{asset_name}}]({{asset_link}})
{{/if}}

If you'd like to see how RetailerOS fits your specific setup, I'd love to walk you through it.

[Book a 15-Minute Demo →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-1-retaileros)

Warm regards,
Ankit Mehta
Founder & Chief Architect, Khosha Systems
Kumara Park West, Bangalore

---

#### Real Estate CRM Variant

Hi {{first_name}},

Thanks for reaching out. I'm Ankit, founder of Khosha Systems — we build purpose-built software for Indian businesses, and our Real Estate CRM is one of the products I'm most proud of.

Here's the problem I keep seeing: real estate teams use Salesforce, Zoho, or spreadsheets to manage leads. None of them understand 99acres integrations, RERA compliance, channel partner commissions, or site visit scheduling. Leads fall through the cracks. Follow-ups are inconsistent. The pipeline is invisible to management.

Our CRM was built specifically for Indian real estate — not adapted from a generic platform.

**What you get:**
- Auto-capture leads from 99acres, MagicBricks, Housing.com, Facebook & Google Ads
- Automated follow-up sequences via WhatsApp, SMS, and email
- Channel partner portal with deal tracking and commission visibility
- RERA-compliant document vault

{{#if downloaded_asset}}
Here's the resource you downloaded: [{{asset_name}}]({{asset_link}})
{{/if}}

Want to see how it works for your projects? I'll walk you through it — takes 15 minutes.

[Book a Demo →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-1-crm)

Warm regards,
Ankit Mehta
Founder & Chief Architect, Khosha Systems
Kumara Park West, Bangalore

---

#### VMS Variant

Hi {{first_name}},

Thanks for reaching out. I'm Ankit — founder of Khosha Systems, where we build purpose-built software for Indian businesses.

If your office or site still uses a paper visitor register, you're not alone. But here's what it's costing you: 3-5 minutes per check-in, zero audit trail, no visitor analytics, and 8-12 hours of admin time per week. For real estate sites, you're also missing the connection between visitor footfall and conversions.

Our Visitor Management System replaces paper registers with digital QR/tablet check-in — and gives you analytics that actually drive decisions.

**What you get:**
- QR code and tablet-based check-in (90% faster)
- Instant host notifications via SMS and WhatsApp
- Visitor analytics — footfall, peak hours, conversion rates
- RERA-compliant digital logs with photo ID capture
- Multi-location dashboard

{{#if downloaded_asset}}
Here's the resource you downloaded: [{{asset_name}}]({{asset_link}})
{{/if}}

I'd love to show you a quick demo — takes 15 minutes.

[Book a Demo →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-1-vms)

Warm regards,
Ankit Mehta
Founder & Chief Architect, Khosha Systems
Kumara Park West, Bangalore

---

#### General Variant

Hi {{first_name}},

Thanks for reaching out to Khosha Systems. I'm Ankit — I've spent 15 years building software products across India and North America.

We work with businesses that have outgrown spreadsheets and generic tools but aren't ready for enterprise-scale complexity. Whether it's retail operations, real estate sales, visitor management, or a custom product — we build purpose-built solutions that solve the actual problem.

**What we're known for:**
- RetailerOS — IMEI-level tracking & scheme management for telecom/electronics retailers
- Real Estate CRM — purpose-built for Indian developers and brokers
- VMS — digital visitor management with analytics
- Custom software & AI services — full-stack product development

{{#if downloaded_asset}}
Here's the resource you downloaded: [{{asset_name}}]({{asset_link}})
{{/if}}

Want to explore which solution fits your needs? Let's talk — takes 15 minutes.

[Book a Call →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-1-general)

Warm regards,
Ankit Mehta
Founder & Chief Architect, Khosha Systems
Kumara Park West, Bangalore

---

## Email 2 — Problem/Solution: Why You Need Purpose-Built Software (Day 2)

### Subject Lines
- **RetailerOS:** "How one retailer lost ₹15 lakh in scheme revenue last year"
- **CRM:** "Why 60% of real estate leads never get a second follow-up"
- **VMS:** "The hidden cost of paper visitor registers"
- **General:** "Most Indian businesses run on duct tape — here's the fix"

### Preview Text
- **RetailerOS:** "Spreadsheets can't track 50 brand schemes across 200+ SKUs"
- **CRM:** "Generic CRMs don't understand 99acres, RERA, or channel partners"
- **VMS:** "3-5 min per check-in adds up to 8-12 hours/week of lost productivity"
- **General:** "Tally + spreadsheets + WhatsApp groups = invisible pipeline"

### Body

---

#### RetailerOS Variant

Hi {{first_name}},

I want to share something I've seen across dozens of mobile phone retailers in India.

The average multi-brand retailer manages 30-50 concurrent brand schemes — Samsung cashbacks, Vivo exchange offers, Realme loyalty points. Each brand has different claim windows, eligibility rules, and payout structures.

Most retailers track these in spreadsheets or not at all. The result? **10-15% of scheme revenue goes unclaimed.** For a store doing ₹1 crore in monthly sales, that's ₹10-15 lakh left on the table every year.

It gets worse. Without IMEI-level tracking, shrinkage runs at 3-5%. For high-value devices, that's real money disappearing.

**This is what RetailerOS automates:**
- Every scheme mapped and tracked per device
- Claims flagged before expiry windows close
- IMEI reconciliation catches discrepancies in real time

We wrote about this in detail:
[Why Telecom Retailers in India Need Purpose-Built Software →](https://khoshasystems.com/blog/retail-management-software-telecom-electronics-india?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-2-retaileros-blog)

If any of this sounds familiar, a demo might save you more than you'd expect.

[See RetailerOS in Action →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-2-retaileros)

— Ankit

---

#### CRM Variant

Hi {{first_name}},

Here's a stat that should bother every real estate developer: **the average sales team follows up with less than 40% of inbound leads within 24 hours.** The rest? They sit in a spreadsheet, a forwarded email, or worse — a paper register at the site office.

When you're pulling leads from 99acres, MagicBricks, Housing.com, Facebook Ads, and walk-ins simultaneously, leads get lost. It's not that your sales team is lazy — it's that generic CRMs don't understand the Indian real estate workflow.

They don't know what a channel partner commission structure looks like. They don't auto-capture from property portals. They don't schedule site visits. They don't track RERA documents.

**What changes with a purpose-built CRM:**
- Every lead auto-captured and deduplicated across all sources
- Automated follow-up sequences — WhatsApp, SMS, email — triggered by lead behavior
- Site visit scheduling with automated reminders
- 85% follow-up rate (vs. industry average of 40%)

We wrote a full guide on choosing the right CRM for Indian real estate:
[How to Choose the Right Real Estate CRM in India →](https://khoshasystems.com/blog/how-to-choose-real-estate-crm-india?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-2-crm-blog)

Worth a read — even if you don't end up choosing us.

— Ankit

---

#### VMS Variant

Hi {{first_name}},

A quick question: if you needed to pull up every visitor who entered your office last Tuesday between 2-4 PM, how long would it take?

With a paper register, the answer is usually "20 minutes of flipping pages" — if the handwriting is legible. With no register at all, the answer is "we can't."

Here's what a paper-based system actually costs:

- **Time:** 3-5 minutes per check-in, multiplied across every visitor
- **Admin overhead:** 8-12 hours/week managing registers, compiling reports
- **Compliance risk:** RERA and corporate audit requirements demand searchable, timestamped records
- **Missed insights:** For real estate sites, you can't connect visitor footfall to conversions

Our VMS clients see **90% faster check-in** and go from zero visitor analytics to full dashboards within the first week.

The real value isn't the time saved at reception — it's the data you start collecting. Which properties get the most visits? What's the conversion rate from site visit to booking? Which days have peak footfall?

[See How It Works →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-2-vms)

— Ankit

---

#### General Variant

Hi {{first_name}},

Here's something I've noticed after 15 years of building software for businesses: most companies run their operations on duct tape.

A spreadsheet here. A WhatsApp group there. Tally for billing. A paper register for visitors. Zoho CRM bolted on top. None of it talks to each other. Everyone complains, but nobody has time to fix it.

The cost isn't always obvious — it shows up as:
- 2-3 hours daily lost to manual reconciliation
- 3-5% inventory shrinkage from lack of tracking
- Leads going cold because follow-ups are manual
- Compliance scrambles before every audit

**The alternative isn't a massive ERP rollout.** It's a purpose-built tool that solves the specific problem. That's what we build at Khosha — focused, industry-specific software that replaces the duct tape.

We've written about how businesses are making this shift:
[Legacy Modernization Checklist for Indian Enterprises →](https://khoshasystems.com/blog/legacy-modernization-checklist-indian-enterprises?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-2-general-blog)

Worth a read if any of this sounds familiar.

— Ankit

---

## Email 3 — Feature Deep-Dive: The Engine Under the Hood (Day 5)

### Subject Lines
- **RetailerOS:** "How RetailerOS tracks every IMEI from purchase to sale"
- **CRM:** "Inside our CRM: auto-capture, WhatsApp sequences, and pipeline dashboards"
- **VMS:** "From QR scan to analytics dashboard — how our VMS works"
- **General:** "A closer look at how we build software for Indian businesses"

### Preview Text
- **RetailerOS:** "Inventory, schemes, billing, and analytics — one connected system"
- **CRM:** "Lead capture → follow-up → site visit → closing — fully automated"
- **VMS:** "30-second check-in, instant host alerts, and footfall analytics"
- **General:** "Purpose-built tools, not generic platforms retrofitted for India"

### Body

---

#### RetailerOS Variant

Hi {{first_name}},

Today I want to show you what's actually under the hood of RetailerOS — because features lists don't tell the full story.

**Inventory Management — IMEI-level precision**

Every device in your store gets tracked by its unique IMEI or serial number from the moment it enters your warehouse to the moment a customer walks out with it. This isn't batch-level inventory — it's device-level. If an iPhone 15 Pro Max (IMEI: 35291012345xxxx) moved from your Jayanagar store to your Koramangala store on Tuesday, RetailerOS knows.

- Automatic stock alerts when any SKU drops below reorder threshold
- Inter-store transfer tracking with full audit trail
- Shrinkage detection — reconcile physical stock against system records in minutes, not hours

**Analytics That Drive Decisions**

Most retailers have data scattered across Tally, spreadsheets, and WhatsApp messages. RetailerOS consolidates everything into dashboards built for store owners:

- **Sales velocity:** Which brands/models are moving fastest? Which stores are outperforming?
- **Scheme performance:** Which brand schemes are most profitable? Which ones are you missing claims on?
- **Demand forecasting:** AI-powered predictions for what to reorder and when — based on your own sales patterns, seasonal trends, and local demand signals
- **Margin analysis:** Real-time gross margin per device, per brand, per store

**GST-Compliant Billing**

Barcode scan → auto-populate HSN code, GST rate, device details → generate e-invoice → done. No manual entry. Supports B2B and B2C invoicing, credit notes, and return processing.

This is what "purpose-built" means — every screen and workflow was designed for the way Indian telecom retailers actually work.

[See These Features Live — Book a Demo →](https://retaileros.in?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-3-retaileros)

— Ankit

---

#### CRM Variant

Hi {{first_name}},

I want to walk you through what makes our Real Estate CRM different from Zoho or Salesforce — not just in features, but in how it works day-to-day.

**Lead Capture — Truly Automatic**

When a buyer inquires on 99acres at 11 PM, the lead auto-creates in your CRM within seconds. Same for MagicBricks, Housing.com, Facebook lead forms, Google Ads, and your website. No CSV imports. No manual data entry. No leads sitting in an inbox until Monday morning.

- Smart deduplication: the same buyer inquiring on 99acres and Housing.com becomes one lead, not two
- Source attribution: know exactly which platform, campaign, and ad brought each lead
- Instant first response: automated WhatsApp acknowledgment fires within 60 seconds

**Follow-Up Sequences — WhatsApp-First**

India's buyers live on WhatsApp. Our CRM uses it as the primary communication channel:

- Pre-built sequences: enquiry acknowledgment → brochure share → site visit invite → post-visit follow-up
- Template messages approved by WhatsApp Business API (no risk of bans)
- Automatic escalation: if a lead doesn't respond in 48 hours, the sequence adapts

**Pipeline Visibility**

Your management dashboard shows the complete funnel — from enquiry to site visit to booking to registration. Filter by project, sales agent, source, or date range. Spot bottlenecks before they cost you deals.

**Channel Partner Portal**

Brokers and channel partners get their own login. They submit leads, track deal status, and see commission calculations — all self-serve. No more "where's my payment?" calls.

[See the Full CRM in Action →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-3-crm)

— Ankit

---

#### VMS Variant

Hi {{first_name}},

Let me walk you through exactly how our VMS works — from the moment a visitor arrives to the insights you see on your dashboard.

**Check-In — Under 30 Seconds**

1. Visitor scans a QR code at the entrance (or receptionist uses a tablet)
2. First-time visitors enter name, phone, purpose of visit, and photo (ID verification optional)
3. Returning visitors are auto-recognized — one tap to check in
4. Host gets an instant WhatsApp + SMS notification: "Your visitor [Name] has arrived"

That's it. No paper. No illegible handwriting. No "please sign the register."

**Security & Compliance**

- Photo capture for every visitor (stored securely, GDPR-compliant retention policies)
- ID verification for sensitive locations (IT parks, construction sites)
- RERA-compliant timestamped digital logs — audit-ready at any moment
- Blocklist management: flag and alert on restricted visitors

**Analytics Dashboard**

This is where the VMS becomes more than a digital register:

- **Footfall patterns:** Peak days, peak hours, average visit duration per location
- **Conversion tracking (real estate):** Link visitor check-ins to sales pipeline — which site visits became bookings?
- **Host analytics:** Which team members receive the most visitors? Average wait times?
- **Multi-location view:** All sites on one dashboard, compare performance across locations

Works on affordable Android tablets (₹8,000-12,000) — no need for expensive kiosks.

[See the Full VMS in Action →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-3-vms)

— Ankit

---

#### General Variant

Hi {{first_name}},

I want to show you how we approach building software at Khosha — because our process matters as much as the product.

**We Don't Build Generic Software**

Every product we've built started with a specific industry problem. RetailerOS exists because telecom retailers needed IMEI-level tracking that Tally couldn't provide. Our Real Estate CRM exists because Salesforce doesn't understand 99acres lead capture or RERA compliance. Our VMS exists because paper registers at construction sites were a compliance nightmare.

**What "Purpose-Built" Means in Practice**

- **Industry-specific workflows:** Not customized templates — native screens built for how your industry works
- **Indian compliance built in:** GST, RERA, TDS, HSN codes — not add-ons, core features
- **Integration with Indian platforms:** 99acres, MagicBricks, WhatsApp Business API, UPI, GSTN
- **Runs on affordable hardware:** Android tablets, basic laptops — no enterprise infrastructure needed

**Our Tech Stack**

We build with modern, scalable technology:
- Cloud-native architecture — your data is always available, always backed up
- Mobile-first design — because your team works from phones and tablets
- API-first — integrates with your existing tools (Tally, WhatsApp, payment gateways)
- AI/ML capabilities — demand forecasting, lead scoring, anomaly detection

**What a Typical Engagement Looks Like**

1. **Discovery call** (30 min) — we understand your operations and pain points
2. **Solution design** (1-2 weeks) — wireframes, architecture, scope
3. **Build + iterate** (4-12 weeks depending on scope) — you see working software every sprint
4. **Launch + support** — we don't disappear after deployment

[Let's Start with a Conversation →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-3-general)

— Ankit

---

## Email 4 — Social Proof: Real Results from Real Businesses (Day 8)

### Subject Lines
- **RetailerOS:** "How Arrowhead cut costs 60% by unifying 12 systems"
- **CRM:** "Prestige Constructions doubled their lead conversion — here's how"
- **VMS:** "Prestige went from paper registers to 85% faster check-in"
- **General:** "15+ years of building software. Here's what our clients say."

### Preview Text
- **RetailerOS:** "12 disconnected systems → 1 unified dashboard, 60% cost reduction"
- **CRM:** "From scattered spreadsheets to 2x conversion rate in 60 days"
- **VMS:** "Paper registers to digital check-in across multiple real estate sites"
- **General:** "Arrowhead, Prestige, Unhive, Phygital — and their results"

### Body

---

#### RetailerOS Variant

Hi {{first_name}},

I want to share a story that shows exactly what RetailerOS was built to solve.

**Arrowhead Communications** is a telecom company that was running 12 separate systems — billing, inventory, CRM, reporting, all disconnected. Their team spent more time reconciling data than running the business. Sound familiar?

We built them a unified operations platform. The result:
- **60% cost reduction** in operational overhead
- **12 systems → 1 dashboard** with real-time data
- **Real-time visibility** across the entire operation — no more end-of-day surprises

RetailerOS was born from this kind of work. Every feature exists because a real retailer needed it — not because it looked good on a feature list.

**What Indian retailers are seeing with RetailerOS:**

| Metric | Before | After |
|--------|--------|-------|
| Checkout speed | 5-8 min/transaction | 2-3 min (40% faster) |
| Inventory accuracy | 60-70% (batch-level) | 99%+ (IMEI-level) |
| Scheme claim rate | 85-90% | 98%+ |
| Daily manual work | 2-3 hours | Under 30 minutes |
| Shrinkage | 3-5% | Under 0.5% |

These aren't projections — they're measurements from live deployments.

If you manage even 2-3 stores with 100+ SKUs, the ROI typically pays for RetailerOS within the first quarter.

[Calculate Your ROI →](https://retaileros.in?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-4-retaileros-roi) | [Book a Demo →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-4-retaileros)

— Ankit

---

#### CRM Variant

Hi {{first_name}},

Quick results story from one of our real estate clients.

**Prestige Constructions** came to us with a common problem: leads from multiple sources, inconsistent follow-ups, and a pipeline that was invisible to management. Their site visits were managed on paper. Their follow-up process was "call when you remember."

Here's what changed after we built their CRM + VMS:
- **2x lead conversion rate** — structured follow-ups and lead scoring
- **85% faster site visit check-in** — digital QR-based system
- **Full pipeline visibility** — management could finally see what was working

In their words: *"Khosha Systems didn't just build software. They understood our real estate operations inside-out."*

**What real estate teams see with our CRM:**

| Metric | Before | After |
|--------|--------|-------|
| Lead follow-up rate | 40% | 85% |
| Response time (first contact) | 4-6 hours | Under 5 minutes |
| Lead-to-site-visit conversion | 8-12% | 20-25% |
| Pipeline visibility | Spreadsheets/guesswork | Real-time dashboard |
| Time to close | 45-60 days | 25-35 days |

The CRM pays for itself when it converts even 2-3 extra leads per month that would have otherwise gone cold.

[Book Your Demo →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-4-crm)

— Ankit

---

#### VMS Variant

Hi {{first_name}},

One of our clients, **Prestige Constructions**, was managing visitor check-in across multiple real estate sites with paper registers. Each site had its own process. No central dashboard. No analytics.

We deployed our VMS across their sites. The results:
- **85% faster check-in** — QR code and tablet-based, under 30 seconds
- **100% digital records** — every visit logged, timestamped, searchable
- **2x lead conversion** — because they could finally track which visitors became buyers

The check-in speed was nice. The data was the real game-changer.

*"They understood our real estate operations inside-out and delivered a visitor management system that transformed how we run our sites."*
— Prestige Constructions team

**What VMS clients typically see:**

| Metric | Before | After |
|--------|--------|-------|
| Check-in time | 3-5 minutes | Under 30 seconds |
| Visitor records | Paper (unsearchable) | Digital (instant search) |
| Admin time/week | 8-12 hours | Under 1 hour |
| Compliance readiness | Scramble before audits | Always audit-ready |
| Visitor-to-buyer tracking | Impossible | Automated |

Works on a ₹10,000 Android tablet. No expensive kiosks, no complex setup.

[See It in Action →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-4-vms)

— Ankit

---

#### General Variant

Hi {{first_name}},

Let me let our work speak for itself.

**Results from recent projects:**

| Client | What We Built | Result |
|--------|--------------|--------|
| Prestige Constructions | CRM + Visitor Management | 2x lead conversion, 85% faster check-in |
| Arrowhead Communications | Unified Operations Dashboard | 60% cost reduction, 12 systems → 1 |
| Unhive Ventures | AI-Powered Investment Platform | 4x faster analysis, 200% efficiency gain |
| Phygital Studio | Full Digital Transformation | 3x team productivity, 40% faster delivery |

**What our clients say:**

*"Honest, direct, and deeply technical."* — Phygital Studio

*"They understood our operations inside-out."* — Prestige Constructions

*"Khosha delivered exactly what we needed — no feature bloat, no scope creep."* — Unhive Ventures

We've been doing this for 15 years, building software for Indian businesses. Whether you need a product built, a system modernized, or AI integrated into your workflow — we build things that work.

[Let's Talk About Your Project →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-4-general)

— Ankit

---

## Email 5 — Final CTA: Book a Demo / Start Trial (Day 12)

### Subject Lines
- **RetailerOS:** "{{first_name}}, ready to see RetailerOS in action?"
- **CRM:** "{{first_name}}, 15 minutes to see how we handle real estate leads"
- **VMS:** "{{first_name}}, want to digitize your visitor management this week?"
- **General:** "{{first_name}}, let's find 15 minutes to talk"

### Preview Text
- **RetailerOS:** "Live demo with your actual SKUs and brand schemes — no slideshow"
- **CRM:** "See auto-capture, WhatsApp sequences, and pipeline dashboards live"
- **VMS:** "We'll set up a working demo on your existing tablet"
- **General:** "No pitch deck — just a conversation about what you need"

### Body

---

#### RetailerOS Variant

Hi {{first_name}},

This is the last email in this series — I've kept it short.

Over the past two weeks, I've shared:
- Why generic POS tools cost telecom retailers ₹10-15 lakh/year in missed schemes alone
- How RetailerOS tracks every IMEI, automates scheme claims, and gives you real-time analytics
- Real results: faster checkout, improved inventory accuracy, reduced shrinkage

**Here's what I'd like to do next:** show you RetailerOS running with data that looks like your store.

The demo takes 15 minutes. I'll walk through IMEI tracking, scheme management, and the analytics dashboard. No slideshow. No sales pitch. Just the product.

If it's not the right fit, I'll tell you — honestly.

[Pick a Time That Works →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-5-retaileros)

Or just reply to this email and I'll set it up.

**P.S.** If timing isn't right, no problem. I'll check in again in a few weeks. And you can always reach us at hello@khoshasystems.com whenever you're ready.

— Ankit Mehta
Founder & Chief Architect, Khosha Systems

---

#### CRM Variant

Hi {{first_name}},

Last email in this series.

Here's what I've covered:
- Why generic CRMs fail Indian real estate teams — no 99acres integration, no RERA compliance, no channel partner support
- How our CRM auto-captures and deduplicates leads, automates WhatsApp follow-ups, and gives management full pipeline visibility
- Real results: 2x conversion rate, 85% follow-up rate, 50% faster closings

**What I'd like to show you:** the CRM running with a pipeline that looks like yours.

15 minutes. I'll walk through lead capture from your actual portals, WhatsApp sequences, and the management dashboard. You'll see exactly how leads flow from enquiry to booking.

If our CRM isn't the right fit for your projects, I'll say so.

[Book Your Demo →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-5-crm)

Or reply here — I'll send you a calendar link.

**P.S.** Not the right time? No worries. We're here when you need us — hello@khoshasystems.com.

— Ankit Mehta
Founder & Chief Architect, Khosha Systems

---

#### VMS Variant

Hi {{first_name}},

Last email from me (for now).

Here's the quick recap:
- Paper visitor registers cost 8-12 hours/week in admin time and leave you with zero analytics
- Our VMS gives you 30-second QR check-in, instant host alerts, and a visitor analytics dashboard
- Real results: 90% faster check-in, 100% digital records, 2x lead conversion for real estate sites

**What I'd like to show you:** a live demo of the VMS — ideally on a tablet you already have.

15 minutes. I'll walk through check-in, host notifications, and the analytics dashboard. You'll see how it works for your specific use case — whether that's a corporate office, IT park, or real estate site.

Setup typically takes less than a day. No special hardware needed.

[Book a Quick Demo →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-5-vms)

Or reply to this email — I'll make it easy.

**P.S.** Whenever you're ready, we're at hello@khoshasystems.com.

— Ankit Mehta
Founder & Chief Architect, Khosha Systems

---

#### General Variant

Hi {{first_name}},

This is the last email in this series. I want to be respectful of your inbox.

Over the past two weeks, I've shared what we do at Khosha: purpose-built software for Indian businesses — retail operations, real estate sales, visitor management, and custom products.

**If any of it resonated, here's what happens next:**

1. We have a 15-minute call — no pitch deck, just a conversation about what you need
2. If there's a fit, we'll sketch out a solution and timeline
3. If there isn't a fit, I'll point you in the right direction

15 years of building software for Indian businesses. We know what works because we've built it.

[Let's Find 15 Minutes →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=welcome-nurture-mar2026&utm_content=email-5-general)

Or just reply with what you're looking for — I read every email.

**P.S.** If the timing isn't right, that's perfectly fine. Bookmark hello@khoshasystems.com and reach out whenever you're ready. We'll be here.

— Ankit Mehta
Founder & Chief Architect, Khosha Systems

---

## Implementation Notes

### Personalization Variables
- `{{first_name}}` — Lead's first name
- `{{company_name}}` — Lead's company (from form submission)
- `{{downloaded_asset}}` — Boolean, whether they downloaded a lead magnet
- `{{asset_name}}` — Name of downloaded resource
- `{{asset_link}}` — URL to the downloaded resource

### Vertical Detection Logic
1. **ROI Calculator leads** → RetailerOS variant
2. **Contact form "Product Demo (RetailerOS / CRM)"** → Parse selection for variant
3. **Blog post origin:**
   - Telecom/IMEI/retail posts → RetailerOS
   - Real estate/CRM/RERA posts → CRM
   - Visitor management posts → VMS
4. **Fallback** → General variant

### Recommended Brevo Automation Setup

**Welcome Sequence Automation:**
- **Automation name:** `Welcome Nurture — [Vertical]` (create one automation per vertical)
- **Entry trigger:** Contact added to list "New Leads" + attribute `vertical` matches variant
- **Entry condition:** Contact attribute `email_verified` = true
- **Exit condition:** Contact replies to any email OR books a demo (tracked via webhook from calendly/contact form)

**Step-by-step Brevo flow:**
1. **Step 1:** Send Email 1 (Welcome) — immediately on entry
2. **Step 2:** Wait 2 days
3. **Step 3:** Condition — Has contact opened Email 1?
   - Yes → Send Email 2 (Problem/Solution)
   - No → Send Email 2 anyway (subject line variant B for non-openers)
4. **Step 4:** Wait 3 days
5. **Step 5:** Send Email 3 (Feature Deep-Dive)
6. **Step 6:** Wait 3 days
7. **Step 7:** Condition — Has contact clicked any link in Emails 1-3?
   - Yes → Send Email 4 (Social Proof) with stronger CTA
   - No → Send Email 4 (Social Proof) standard version
8. **Step 8:** Wait 4 days
9. **Step 9:** Send Email 5 (Final CTA)
10. **Step 10:** Wait 2 days → Move non-converters to "Warm Leads" list for future campaigns

**Brevo contact attributes to create:**
- `vertical` (text): retaileros, crm, vms, general
- `lead_source` (text): roi_calculator, contact_form, blog, lead_magnet
- `downloaded_asset` (boolean)
- `asset_name` (text)
- `asset_link` (text)
- `nurture_stage` (number): 1-5, updated by automation
- `demo_booked` (boolean): set via webhook when demo is scheduled

### Email Platform Settings
- **Sender:** hello@khoshasystems.com (with "Ankit Mehta — Khosha Systems" as display name)
- **Reply-to:** hello@khoshasystems.com
- **Unsubscribe:** Required — one-click unsubscribe in footer
- **Tracking:** Open tracking + link click tracking enabled
- **A/B testing:** Test subject lines on Email 1 (split 50/50, pick winner after 100 sends)

### Success Metrics to Track

| Email | Open Rate Target | Click Rate Target | Key Metric |
|-------|-----------------|-------------------|------------|
| Email 1 (Welcome) | >40% | >5% | Asset download, reply rate |
| Email 2 (Problem/Solution) | >35% | >8% | Blog link clicks |
| Email 3 (Feature Deep-Dive) | >30% | >6% | Product page visits |
| Email 4 (Social Proof) | >30% | >10% | Demo CTA clicks |
| Email 5 (Final CTA) | >25% | >12% | Demo bookings |
| **Sequence total** | — | — | **>3% demo booking rate** |

# Cold Outreach Follow-Up Emails — Day 2 to Day 5

**Campaign:** RetailerOS Cold Outreach — Redington DMS Retailers
**Parent Campaign:** `cold-outreach-mar2026`
**Follow-up Campaign:** `cold-followup-mar2026`
**Sender:** Ankit Mehta — Khosha Systems (hello@khoshasystems.com)
**Platform:** Brevo

---

## Email 1 — Day 2: Openers Who Didn't Click

**Trigger:** Opened Campaign 1 but did not click any link
**Send timing:** 48 hours after Campaign 1 (Mar 22, 9:00 AM IST)
**Segment:** Brevo filter → opened Campaign 1 AND clicks = 0

### Subject Line Options (A/B test)

- **A:** "Quick question about your billing workflow"
- **B:** "Most retailers lose ₹2-3L/year on scheme claims — here's why"

### Preview Text

"Takes 2 minutes to see if this applies to your store"

### Body

```
Hi {{contact.FIRSTNAME}},

I noticed you opened my last email — thanks for taking a look.

I'll keep this short. I wanted to share one specific thing RetailerOS does that retailers tell us saves them the most money:

**Automatic scheme claim recovery.**

Most multi-brand retailers we talk to are recovering only 70-80% of the schemes they're entitled to from companies like Samsung, Vivo, and Xiaomi. The rest slips through because tracking is manual.

RetailerOS catches every eligible scheme automatically. Our retailers typically recover ₹2-3L extra per year — money that was always theirs but got lost in spreadsheets.

Here's a 2-minute walkthrough showing how it works:
👉 [See Scheme Recovery in Action](https://khoshasystems.com/retaileros?utm_source=brevo&utm_medium=email&utm_campaign=cold-followup-mar2026&utm_content=day2-opener-noclick-scheme)

If scheme tracking isn't your biggest headache, just reply with what is — I'll show you how we solve that instead.

Best,
Ankit Mehta
Founder, Khosha Systems
```

### CTA

Primary: "See Scheme Recovery in Action" → `https://khoshasystems.com/retaileros?utm_source=brevo&utm_medium=email&utm_campaign=cold-followup-mar2026&utm_content=day2-opener-noclick-scheme`

Secondary (reply): Reply with biggest pain point

### Brevo Setup

- Segment: Campaign 1 openers with 0 clicks
- Template variable: `{{contact.FIRSTNAME}}`
- Schedule: Mar 22, 9:00 AM IST
- Update attribute: `nurture_stage` = 2

---

## Email 2 — Day 3: Clickers Who Didn't Convert

**Trigger:** Clicked a link in Campaign 1 or Day 2 email but did not submit contact form or book demo
**Send timing:** 72 hours after Campaign 1 (Mar 23, 9:00 AM IST)
**Segment:** Brevo filter → clicked any link in Campaign 1 OR Day 2 email AND `demo_booked` = false AND no form submission

### Subject Line Options (A/B test)

- **A:** "Your free ROI estimate for {{contact.COMPANY}} is ready"
- **B:** "See what ₹15,000/month gets you vs. your current setup"

### Preview Text

"Personalized savings estimate — no call needed"

### Body

```
Hi {{contact.FIRSTNAME}},

You checked out RetailerOS — I appreciate your interest.

Rather than a generic pitch, I thought I'd offer something specific: a quick ROI estimate tailored to a store like yours.

**Try our ROI calculator** — plug in your store count and monthly revenue, and see exactly where RetailerOS saves you money:

👉 [Calculate Your ROI in 60 Seconds](https://khoshasystems.com/tools/roi-calculator?utm_source=brevo&utm_medium=email&utm_campaign=cold-followup-mar2026&utm_content=day3-clicker-roi-calc)

Here's what retailers your size typically see:

| Area | Before RetailerOS | After RetailerOS |
|------|-------------------|------------------|
| Checkout speed | 4-5 min/bill | 2-3 min/bill |
| Inventory accuracy | 80-85% | 99%+ |
| Scheme claim rate | 70-80% | 98%+ |
| Monthly shrinkage | ₹15-30K | < ₹2K |

**No demo needed** — the calculator shows you real numbers. But if you'd like a 15-minute walkthrough with your actual store data, just reply "demo" and I'll set it up.

Best,
Ankit Mehta
Founder, Khosha Systems

P.S. RetailerOS also handles Sanchar Saathi IMEI compliance automatically — no more manual uploads to the DoT portal.
```

### CTA

Primary: "Calculate Your ROI in 60 Seconds" → `https://khoshasystems.com/tools/roi-calculator?utm_source=brevo&utm_medium=email&utm_campaign=cold-followup-mar2026&utm_content=day3-clicker-roi-calc`

Secondary: Reply "demo" for personalized walkthrough

### Brevo Setup

- Segment: Clickers from Campaign 1 or Day 2, `demo_booked` = false
- Template variables: `{{contact.FIRSTNAME}}`, `{{contact.COMPANY}}`
- Schedule: Mar 23, 9:00 AM IST
- Update attribute: `nurture_stage` = 3

---

## Email 3 — Day 4: Non-Openers Re-Send with New Subject Line

**Trigger:** Did not open Campaign 1 or any follow-up
**Send timing:** 96 hours after Campaign 1 (Mar 24, 10:30 AM IST — shifted time slot for variety)
**Segment:** Brevo filter → Campaign 1 opens = 0 AND Day 2 opens = 0

### Subject Line Options (A/B test)

- **A:** "Sanchar Saathi IMEI deadline — is your store ready?"
- **B:** "How {{contact.COMPANY}} can save 3+ hours daily on billing"

### Preview Text

"Compliance deadline approaching — free check included"

### Body

```
Hi {{contact.FIRSTNAME}},

I know inboxes get busy, so I'll be brief.

Two things happening right now that affect retailers like {{contact.COMPANY}}:

**1. Sanchar Saathi IMEI compliance is getting stricter.**
The DoT is tightening enforcement on IMEI registration for every device sold. Manual uploads to the portal are time-consuming and error-prone. RetailerOS automates this completely — scan, sell, and the IMEI registration happens automatically.

**2. Scheme money is being left on the table.**
We've found that the average multi-brand telecom retailer loses ₹2-3L per year in unclaimed schemes. RetailerOS tracks every scheme from every brand and ensures you claim 98%+ of what you're owed.

I built RetailerOS specifically for retailers running on Redington DMS and similar systems. It works alongside what you already have — no rip-and-replace needed.

Want to see if it fits your store? Two options:

→ [Check your ROI in 60 seconds](https://khoshasystems.com/tools/roi-calculator?utm_source=brevo&utm_medium=email&utm_campaign=cold-followup-mar2026&utm_content=day4-resend-roi)
→ Reply "interested" and I'll send a 2-minute video walkthrough

No pressure — just trying to help retailers keep more of what they earn.

Best,
Ankit Mehta
Founder, Khosha Systems
```

### CTA

Primary: "Check your ROI in 60 seconds" → `https://khoshasystems.com/tools/roi-calculator?utm_source=brevo&utm_medium=email&utm_campaign=cold-followup-mar2026&utm_content=day4-resend-roi`

Secondary: Reply "interested" for video walkthrough

### Brevo Setup

- Segment: Non-openers from Campaign 1 AND Day 2
- Template variables: `{{contact.FIRSTNAME}}`, `{{contact.COMPANY}}`
- Schedule: Mar 24, 10:30 AM IST (different time from previous sends)
- Update attribute: `nurture_stage` = 2 (still early stage for these contacts)

### Notes

- Completely different subject line angle (compliance urgency vs. value proposition)
- Shifted send time to 10:30 AM to test if earlier emails were hitting at wrong time
- Shorter, more scannable format since these contacts haven't engaged yet
- Lower-commitment CTAs (ROI calculator, reply for video — no "book a demo")

---

## Email 4 — Day 5: Value-Add Content for All Engaged Leads

**Trigger:** Opened OR clicked any email in the sequence (Campaign 1, Day 2, Day 3, or Day 4)
**Send timing:** 120 hours after Campaign 1 (Mar 25, 9:00 AM IST)
**Segment:** Brevo filter → opened OR clicked any campaign email AND `demo_booked` = false

### Subject Line Options (A/B test)

- **A:** "How Indian retailers are beating MRP erosion in 2026"
- **B:** "The billing mistake costing multi-brand stores ₹50K+/month"

### Preview Text

"3 trends reshaping telecom retail — and what to do about them"

### Body

```
Hi {{contact.FIRSTNAME}},

No pitch today — just sharing something useful.

I've been working with telecom and electronics retailers across India for the past year, and I keep seeing the same three patterns that separate thriving stores from struggling ones:

---

**1. Scheme management is the #1 profit lever**

Brands like Samsung, Vivo, Xiaomi, and Oppo run 20-30 schemes per quarter. The retailers capturing 95%+ of these schemes are making ₹3-5L more per year than those at 70-80%. The difference isn't effort — it's system. Manual tracking simply can't keep up.

**2. IMEI compliance is becoming a cost center**

With Sanchar Saathi enforcement tightening, retailers spending 1-2 hours daily on manual IMEI uploads are losing productive selling time. The ones who automated this freed up their staff to actually sell.

**3. Inventory accuracy drives customer trust**

Customers who check stock online and find it matches in-store come back 3x more. Retailers running at 99%+ inventory accuracy (vs. the typical 80-85%) see measurably higher repeat business.

---

We built RetailerOS to solve exactly these three problems. But whether you use our software or not, these trends are worth paying attention to.

If you want to see how your store stacks up, our ROI calculator gives you a quick benchmark:

👉 [Benchmark Your Store](https://khoshasystems.com/tools/roi-calculator?utm_source=brevo&utm_medium=email&utm_campaign=cold-followup-mar2026&utm_content=day5-value-add-benchmark)

Or if you'd like to chat about any of this — even if it's just to compare notes — reply to this email. Happy to help.

Best,
Ankit Mehta
Founder, Khosha Systems

P.S. If this isn't relevant to you, no worries — just reply "stop" and I won't email again. I respect your inbox.
```

### CTA

Primary: "Benchmark Your Store" → `https://khoshasystems.com/tools/roi-calculator?utm_source=brevo&utm_medium=email&utm_campaign=cold-followup-mar2026&utm_content=day5-value-add-benchmark`

Secondary: Reply to chat / Reply "stop" to unsubscribe

### Brevo Setup

- Segment: Anyone who engaged (opened or clicked) across all campaign emails, excluding `demo_booked` = true
- Template variables: `{{contact.FIRSTNAME}}`
- Schedule: Mar 25, 9:00 AM IST
- Update attribute: `nurture_stage` = 4
- Tag engaged non-converters for warm lead follow-up sequence handoff

### Notes

- Pure value-add positioning — no hard sell
- Establishes authority and industry knowledge
- Soft CTA (benchmark tool, reply to chat)
- Explicit opt-out respect builds trust
- Feeds into warm lead follow-up sequence for contacts who engage but don't convert

---

## Follow-Up Sequence Flow Summary

```
Campaign 1 (Mar 20)
├── Opened, no click → Day 2 Email (Mar 22)
│   └── If clicked → Day 3 Email (Mar 23)
│       └── If still no conversion → Day 5 Email (Mar 25)
├── Clicked, no conversion → Day 3 Email (Mar 23)
│   └── Day 5 Email (Mar 25)
├── No open → Day 4 Re-send (Mar 24)
│   └── If opens/clicks → Day 5 Email (Mar 25)
└── Converted (demo booked) → Exit sequence, enter welcome nurture
```

## Brevo Automation Checklist

- [ ] Create segments for each trigger condition
- [ ] Set up automation workflow with branching logic
- [ ] Configure A/B tests for subject lines (50/50 split, 24h winner selection)
- [ ] Set `nurture_stage` updates at each step
- [ ] Add suppression: exclude `demo_booked` = true from all follow-ups
- [ ] Add suppression: exclude unsubscribes and bounces
- [ ] Test with internal email addresses before activating
- [ ] Set automation to activate Mar 22, 8:00 AM IST (1 hour before first send)

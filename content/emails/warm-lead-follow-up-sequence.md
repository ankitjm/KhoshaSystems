# Warm Lead Follow-Up Email Templates

**Trigger:** Lead engages with campaign emails (Email 1 sent Mar 20, 2026).
**Audience:** RetailerOS prospects — telecom/electronics store owners in India.
**From:** Ankit Mehta, Founder & Chief Architect — Khosha Systems <hello@khoshasystems.com>
**Primary hook:** Sanchar Saathi IMEI compliance deadline.
**Tone:** Professional, direct, urgent (compliance angle). Founder-led — not salesy.

---

## Email 1 — Demo Request Follow-Up

**Trigger:** Contact clicks demo/trial CTA in campaign email.
**Send:** Within 2 hours of click.

### Subject Lines (A/B test)
- A: "Your demo is ready — here's what we'll cover in 15 minutes"
- B: "{{first_name}}, let's get your IMEI tracking sorted before the deadline"

### Preview Text
"See how RetailerOS handles IMEI compliance, scheme recovery, and GST billing — built for your store size."

### Body

Hi {{first_name}},

You clicked through to learn more about RetailerOS — so let me cut straight to what matters for a store like yours.

I'm Ankit, founder of Khosha Systems. I've spent the last 15 years building software for businesses across India and North America. RetailerOS exists because I watched retailers lose lakhs every month to problems that Tally and spreadsheets were never designed to solve.

**In your 15-minute demo, I'll show you three things:**

1. **IMEI-level tracking that satisfies Sanchar Saathi.** Every device tracked from purchase to sale — barcode, camera, or manual entry. Full audit trail. No more end-of-day Excel reconciliation.

2. **Scheme recovery that pays for itself.** Our retailers recover 10-15% more in brand scheme payouts. For a ₹50 lakh/month store, that's ₹40,000-₹75,000 per month you're currently leaving on the table. Samsung, Vivo, Oppo schemes — auto-loaded, auto-applied at billing, with expiry alerts.

3. **GST billing that actually works.** HSN codes, tax invoicing, e-invoicing — built in, not bolted on. No more wrong codes or missed invoices during audits.

**One real example:** Rajesh at Digi World Electronics in Hyderabad recovered ₹4.7 lakh in scheme payouts in his first 6 months. His shrinkage dropped 92%. He stopped spending Sundays reconciling stock across his 3 stores.

Pick a time that works for you:

[Book Your 15-Minute Demo →]({{calendar_link}})

No pitch deck, no pressure. If RetailerOS isn't the right fit for your setup, I'll tell you honestly.

Warm regards,
Ankit Mehta
Founder & Chief Architect, Khosha Systems
Indiranagar, Bangalore

P.S. With Sanchar Saathi enforcement tightening, retailers without proper IMEI tracking are facing real compliance risk. Worth a 15-minute conversation to see where you stand.

---

## Email 2 — Soft Follow-Up

**Trigger:** Contact opens campaign email but does NOT click CTA.
**Send:** 48 hours after open (if no click occurred).

### Subject Lines (A/B test)
- A: "₹75,000/month in missed scheme payouts — sound familiar?"
- B: "Quick question about your IMEI tracking setup"

### Preview Text
"Most retailers we talk to don't realize how much they're losing to missed brand schemes."

### Body

Hi {{first_name}},

I noticed you opened our email about RetailerOS — so I wanted to share one stat that surprises most store owners I talk to.

**The average ₹50 lakh/month telecom retailer loses ₹25,000-₹75,000 per month in unclaimed brand scheme payouts.** Samsung, Vivo, Oppo — they all run overlapping schemes with short claim windows. If you're tracking them manually, you're missing 30-40% of what you're owed.

Here's what one retailer told us:

> "I was losing more money to missed schemes every quarter than RetailerOS costs me in a year."
> — Rajesh R., Digi World Electronics, Hyderabad (3 stores, ₹4.7L recovered in 6 months)

That's separate from IMEI shrinkage, which typically runs 3-5% of inventory value. For most stores, that's another ₹1.5-2.5 lakh per month walking out the door.

I'm not trying to sell you a demo. But if any of this sounds like your store, I'd be happy to answer questions — just reply to this email. Or if you want to see the numbers for your specific setup:

[Use Our Free ROI Calculator →](https://khoshasystems.com/tools/roi-calculator)

Takes 2 minutes. No signup required.

Warm regards,
Ankit Mehta
Founder & Chief Architect, Khosha Systems

---

## Email 3 — Re-Engagement

**Trigger:** Contact opened Email 1 of the campaign but did NOT open Emails 2 or 3.
**Send:** 5 days after last unopened email.

### Subject Lines (A/B test)
- A: "Sanchar Saathi compliance deadline — is your store ready?"
- B: "The IMEI tracking requirement most retailers are ignoring"

### Preview Text
"Retailers without proper IMEI tracking are already facing scrutiny. Here's what's changing."

### Body

Hi {{first_name}},

I'll keep this short — I know your inbox is busy.

The Sanchar Saathi framework is tightening IMEI compliance requirements for telecom retailers. If you're still tracking devices in spreadsheets or relying on Tally, there are three things worth knowing:

**1. The compliance bar is rising.**
Regulators are moving toward mandatory IMEI-level tracking for every handset sold. Retailers without a proper audit trail — purchase to sale, with timestamps — are exposed.

**2. Manual tracking won't cut it.**
Excel sheets and paper logs don't produce the kind of verifiable records that compliance audits require. One missing IMEI during an inspection can trigger a broader investigation.

**3. The fix is simpler than you think.**
RetailerOS gives you IMEI-level tracking with a full audit trail — barcode scan at purchase, tracked through transfer and sale. Go live in 48 hours. It's what 200+ stores across India already use to stay compliant.

And the compliance benefit is just the starting point. Most retailers find the scheme recovery and shrinkage reduction more than cover the ₹1,999/month cost.

If compliance is on your radar, I'd suggest a quick look:

[See How RetailerOS Handles IMEI Compliance →](https://khoshasystems.com/retaileros)

Or reply to this email with any questions — I read every reply personally.

Warm regards,
Ankit Mehta
Founder & Chief Architect, Khosha Systems

P.S. We offer a 14-day free trial — no credit card, no commitment. If you'd rather just try it: [Start Free Trial →](https://khoshasystems.com/contact?utm_source=brevo&utm_medium=email&utm_campaign=warm-followup-mar2026&utm_content=trial-cta)

---

## Brevo Automation Notes

### Segmentation
- **Email 1 (Demo follow-up):** Trigger on `campaign_cta_clicked = true` for campaign emails. Send within 2 hours.
- **Email 2 (Soft follow-up):** Trigger on `campaign_opened = true AND campaign_cta_clicked = false`. Send 48 hours after open. Suppress if contact books a demo or enters trial.
- **Email 3 (Re-engagement):** Trigger on `campaign_1_opened = true AND campaign_2_opened = false AND campaign_3_opened = false`. Send 5 days after last send. Suppress if contact is already in demo/trial/nurture flow.

### Suppression Rules
- Suppress all follow-ups if contact converts (demo booked, trial started, or purchase).
- Suppress Email 2 and 3 if contact clicks CTA in Email 1 (they enter the demo follow-up flow instead).
- Do not send more than 1 email per 48-hour window to any contact.

### Tracking
- UTM parameters: `utm_source=brevo&utm_medium=email&utm_campaign=warm-followup-mar2026`
- Track: opens, clicks, replies, demo bookings, trial signups.

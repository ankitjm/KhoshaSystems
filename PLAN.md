# Khoshà Systems — Complete Website Overhaul Plan

## PHASE 1: Font & Global Visual Consistency

### 1A. Font Switch (Sans-Serif)
- **Remove**: Playfair Display (serif)
- **Add**: `Inter` for body (keep), `Plus Jakarta Sans` for headings (modern, premium sans-serif)
- Update `index.html` font import and CSS rules
- Update all `.font-serif` references across ALL components to use the new heading font

### 1B. Apply Home Page Visual Treatment to ALL Pages
Every page hero gets a background image + dark overlay + parallax, matching the homepage hero:

| Page | Background Image Theme |
|------|----------------------|
| ServicesPage | Software development workspace |
| ProductsPage | Modern office/tech devices |
| WorkPage | Team collaboration |
| PhilosophyPage | Bangalore cityscape |
| ContactPage | Office meeting room |
| BlogPage | Writing/workspace |
| RetailerOSPage | Retail store interior |
| RealEstateCRMPage | Luxury apartment/building |
| VisitorManagementPage | Corporate lobby/reception |
| BlogPostPage | Minimal workspace |

Each page hero will have:
- Full-width background image with dark gradient overlay
- White text on dark
- Diagonal pattern overlay
- Parallax scroll effect (via CSS background-attachment: fixed)

### 1C. Replace Empty Placeholder Images on Product Pages
- RetailerOSPage: Replace gradient box with retail dashboard stock image
- RealEstateCRMPage: Replace gradient box with real estate/building image
- VisitorManagementPage: Replace gradient box with corporate lobby image

### 1D. Add Stock Images to ServicesPage "Why Work With Us" Section
- Replace the "15+ Years" gradient placeholder with a real team/office image

---

## PHASE 2: Email System (Internal + Customer Auto-Reply)

### 2A. Internal Email to ankit@khoshasystems.com
The existing EmailJS setup sends notifications. Update the email utility to:
- Send to `ankit@khoshasystems.com` (verify template configuration)
- Include all form data: name, company, email, goal, source

### 2B. Customer Auto-Reply Email
- Create a **second EmailJS template** call for customer confirmation
- Template content: "Hi {name}, we've received your inquiry about {goal}. Our team will connect with you over a call within 24 hours. — Khoshà Systems"
- Add `sendCustomerConfirmation()` function in `utils/email.ts`
- Call it from Contact.tsx and ExitPopup.tsx after successful form submit

### 2C. Database — Save ALL Form Submissions
- Already saving to `leads` table via `saveLead()` — this works
- Add a `phone` field to the leads table and form (optional field)
- Add `page_source` tracking (which page the form was submitted from)

---

## PHASE 3: Cookie Consent Banner

### 3A. Create CookieConsent Component
- GDPR/India DPDPA compliant cookie banner
- Appears at bottom of screen on first visit
- Options: "Accept All" (primary), "Manage Preferences" (secondary)
- Stores consent in localStorage (`khosha_cookie_consent`)
- Auto-dismisses once accepted
- Includes link to privacy policy page
- Non-blocking (doesn't prevent page use)

### 3B. Cookie Categories
- **Essential**: Always on (session, preferences)
- **Analytics**: User tracking (Phase 4)
- **Marketing**: Future ad tracking pixels

---

## PHASE 4: User Tracking & Analytics

### 4A. Database Schema Update
Create new `visitors` table:
```sql
CREATE TABLE IF NOT EXISTS visitors (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  session_id TEXT,
  ip_address TEXT,
  user_agent TEXT,
  referrer TEXT,
  pages_viewed TEXT,
  page_count INTEGER DEFAULT 1,
  first_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_seen DATETIME DEFAULT CURRENT_TIMESTAMP,
  time_on_site INTEGER DEFAULT 0,
  qualified INTEGER DEFAULT 0
)
```

### 4B. Visitor Tracking Hook (useVisitorTracking)
- Generate unique session ID (stored in sessionStorage)
- Fetch approximate IP via free API (ipapi.co or similar public endpoint)
- Track pages viewed (array stored in sessionStorage, synced to DB)
- Track time on site (heartbeat every 30s)
- Mark as "qualified" when:
  - Time on site > 90 seconds (1.5 min) AND
  - Pages viewed > 1
- Sync to Turso DB on page unload (sendBeacon) and on heartbeat

### 4C. Track All Page Navigations
- Hook into React Router's location changes
- Append each pathname to the pages_viewed array
- Increment page_count
- Update last_seen timestamp

### 4D. Qualified Visitor Detection
When a visitor becomes qualified (>90s, >1 page):
- Save to DB with qualified=1
- This data is available for review in the Turso dashboard

---

## PHASE 5: Web Push Notifications

### 5A. Push Notification Permission
- After a visitor has been on the site for 30 seconds, show a subtle in-app prompt:
  "Get notified about new products and insights from Khoshà Systems"
- NOT the browser native prompt first — show a custom UI first
- Only trigger browser permission if they click "Yes"
- Store permission status in localStorage

### 5B. Trigger Points
Push notifications permission prompt on:
- After 30s on site (first visit only)
- After form submission success (thank you screen)
- After reading a blog post (scroll to bottom)

### 5C. Implementation
- Use the native Notification API (no third-party service needed for basic web push)
- For form submissions: Show browser notification confirming receipt
- Store subscriber status in a `push_subscribers` table if needed later for server-sent pushes

---

## PHASE 6: Conversion Optimization & SEO

### 6A. Sticky CTA Bar (Mobile)
- Fixed bottom bar on mobile: "Get a Free Consultation" with phone icon + form link
- Only shows after 5 seconds on page
- Dismissible

### 6B. Social Proof Notification
- Small toast popup (bottom-left) showing:
  "Someone from [City] just requested a consultation"
  "15 people viewed RetailerOS this week"
- Appears every 20-30 seconds, cycles through 3-4 messages
- Creates urgency and social proof

### 6C. Lead Magnet / Incentive
- "Free System Architecture Blueprint" (already in ExitPopup)
- Add inline lead magnets on product pages:
  - RetailerOS: "Download Free Retail Operations Checklist"
  - Real Estate CRM: "Free CRM Buyer's Guide for Indian Real Estate"
  - Visitor Management: "Free Visitor Management ROI Calculator"
- These are email-gated — captures leads in exchange for content

### 6D. SEO Enhancements
- All existing JSON-LD schemas preserved
- Add `rel="noopener noreferrer"` to all external links (already done mostly)
- Ensure all images have descriptive alt text
- Add more internal links between pages (cross-linking)
- Blog posts already target long-tail keywords — keep intact

### 6E. Convincing Content Upgrades
- Add "Limited spots available this quarter" messaging on Contact pages
- Add urgency timers: "We take on 3 new projects per month"
- Add trust signals: "100% of projects delivered on time"
- Add "As featured in" or "Technologies we use" sections

---

## PHASE 7: Technical Polish

### 7A. Form Enhancements
- Add phone number field (optional) to Contact form
- Add "How did you hear about us?" dropdown
- Better form validation with inline error messages
- Loading spinner on submit

### 7B. Performance
- All images use `loading="lazy"` (already done)
- Ensure CSS patterns don't cause layout shift

---

## File Change Summary

### New Files:
1. `components/CookieConsent.tsx` — Cookie banner
2. `components/StickyMobileCTA.tsx` — Mobile bottom CTA bar
3. `components/SocialProof.tsx` — Social proof toast notifications
4. `components/PushPrompt.tsx` — Push notification prompt
5. `hooks/useVisitorTracking.tsx` — Visitor analytics hook
6. `db/visitors.ts` — Visitor tracking DB functions

### Modified Files:
1. `index.html` — Font swap, new CSS
2. `App.tsx` — Add CookieConsent, StickyMobileCTA, SocialProof, PushPrompt, visitor tracking
3. `utils/email.ts` — Add customer confirmation email function
4. `db/turso.ts` — Add visitors table init, visitor tracking functions
5. `components/Contact.tsx` — Enhanced form, customer email, page source tracking
6. `components/ExitPopup.tsx` — Customer email on submit
7. ALL 10 page files — Dark hero sections with background images
8. `components/Navbar.tsx` — Minor font class updates
9. `components/Services.tsx` — Font class updates
10. `components/Testimonials.tsx` — Font class updates
11. `components/Founder.tsx` — Font class updates
12. `components/CTAStrip.tsx` — Font class updates

### Estimated: ~25 files touched, ~6 new files created

# Content Deployment Inventory

Last updated: 2026-03-20

This document maps all marketing content created by CMO to website pages, publication status, and deployment priority.

---

## Priority Tiers

- **Tier 1 (Deploy First):** Pages that support active sales campaigns — landing pages, pricing, features, getting started
- **Tier 2 (Deploy Next):** SEO content — blog posts, comparison pages, vertical pages
- **Tier 3 (Supporting):** Internal collateral, email templates, social media, directory listings

---

## Tier 1: Sales-Critical Pages (Live on Website)

These TSX pages are routed in App.tsx, prerendered, and live.

| File Path | Content Type | Target URL | Status | Quality Issues |
|-----------|-------------|------------|--------|----------------|
| `pages/PricingPage.tsx` | Pricing page | `/pricing` | **Live** (routed, prerendered) | None detected |
| `pages/FeaturesPage.tsx` | Features overview | `/features` | **Live** (routed, prerendered) | None detected |
| `pages/GettingStartedPage.tsx` | Onboarding guide | `/getting-started` | **Live** (routed, prerendered) | None detected |
| `pages/UseCasesPage.tsx` | Use cases | `/use-cases` | **Live** (routed, prerendered) | None detected |
| `pages/RetailerOSPage.tsx` | Product page | `/products/retaileros` | **Live** (routed, prerendered) | None detected |
| `pages/RealEstateCRMPage.tsx` | Product page | `/products/real-estate-crm` | **Live** (routed, prerendered) | None detected |
| `pages/VisitorManagementPage.tsx` | Product page | `/products/visitor-management` | **Live** (routed, prerendered) | None detected |
| `pages/ROICalculatorPage.tsx` | Interactive tool | `/tools/roi-calculator` | **Live** (routed, prerendered) | None detected |
| `pages/SuccessStoriesPage.tsx` | Social proof | `/success-stories` | **Live** (routed, prerendered) | None detected |

### Tier 1 Content Files (Not Yet Deployed to Website)

| File Path | Content Type | Target URL | Status | Quality Issues |
|-----------|-------------|------------|--------|----------------|
| `content/landing-pages/retaileros-landing-page.md` | Landing page copy | Intended for `/products/retaileros` integration | **In repo, not deployed** | **Placeholder testimonials** (line 157); **placeholder brand logos** (line 177); **pricing needs CEO confirmation** (line 247) |
| `content/landing-pages/retaileros-use-cases.md` | Use case narratives | Intended for `/use-cases` integration | **In repo, not deployed** | **Broken URLs:** links to `/trial` and `/demo` which don't exist — should use `/contact` or `/products/retaileros` |
| `content/landing-pages/retaileros-feature-walkthroughs.md` | Feature walkthrough | Intended for `/features` integration | **In repo, not deployed** | None detected |
| `content/landing-pages/onboarding-guide.md` | Onboarding guide | Intended for `/getting-started` integration | **In repo, not deployed** | None detected |
| `content/website/retaileros-pricing-page.md` | Pricing copy | Intended for `/pricing` integration | **In repo, not deployed** | None detected |

---

## Tier 2: SEO Content (Comparison Pages & Blog Posts)

### Comparison Pages (Live)

| File Path | Content Type | Target URL | Status | Quality Issues |
|-----------|-------------|------------|--------|----------------|
| `pages/RetailerOSvsIQmetrixPage.tsx` | Comparison | `/compare/retaileros-vs-iqmetrix` | **Live** (routed, prerendered) | None detected |
| `pages/RetailerOSvsShopifyPage.tsx` | Comparison | `/compare/retaileros-vs-shopify` | **Live** (routed, prerendered) | None detected |
| `pages/RetailerOSvsLightspeedPage.tsx` | Comparison | `/compare/retaileros-vs-lightspeed` | **Live** (routed, prerendered) | None detected |
| `pages/RetailerOSvsSquarePage.tsx` | Comparison | `/compare/retaileros-vs-square` | **Live** (routed, prerendered) | None detected |
| `pages/CRMvsSellDoPage.tsx` | Comparison | `/compare/real-estate-crm-vs-selldo` | **Live** (routed, prerendered) | None detected |

### Vertical Landing Pages (Live)

| File Path | Content Type | Target URL | Status | Quality Issues |
|-----------|-------------|------------|--------|----------------|
| `pages/ElectronicsRetailPage.tsx` | Vertical page | `/solutions/electronics` | **Live** (routed, prerendered) | None detected |
| `pages/FashionRetailPage.tsx` | Vertical page | `/solutions/fashion-retail` | **Live** (routed, prerendered) | None detected |
| `pages/GroceryRetailPage.tsx` | Vertical page | `/solutions/grocery` | **Live** (routed, prerendered) | None detected |

### Blog Posts (Live via `data/blogPosts.ts`)

All blog posts are defined in `data/blogPosts.ts` and rendered via the `/blog/:slug` route. All are prerendered.

| Blog Slug | Target URL | Status |
|-----------|------------|--------|
| `retail-management-software-telecom-electronics-india` | `/blog/retail-management-software-telecom-electronics-india` | **Live** |
| `how-to-choose-real-estate-crm-india` | `/blog/how-to-choose-real-estate-crm-india` | **Live** |
| `legacy-modernization-checklist-indian-enterprises` | `/blog/legacy-modernization-checklist-indian-enterprises` | **Live** |
| `ai-integration-guide-mid-size-companies-india` | `/blog/ai-integration-guide-mid-size-companies-india` | **Live** |
| `why-vancouver-startups-partner-with-bangalore-teams` | `/blog/why-vancouver-startups-partner-with-bangalore-teams` | **Live** |
| `imei-tracking-reduces-shrinkage-telecom-retail` | `/blog/imei-tracking-reduces-shrinkage-telecom-retail` | **Live** |
| `5-signs-real-estate-business-needs-crm` | `/blog/5-signs-real-estate-business-needs-crm` | **Live** |
| `indian-telecom-retailers-switching-digital-billing` | `/blog/indian-telecom-retailers-switching-digital-billing` | **Live** |
| `digital-visitor-management-roi-indian-corporates` | `/blog/digital-visitor-management-roi-indian-corporates` | **Live** |
| `retaileros-vs-manual-billing-comparison` | `/blog/retaileros-vs-manual-billing-comparison` | **Live** |
| `scheme-management-simple-telecom-retailers` | `/blog/scheme-management-simple-telecom-retailers` | **Live** |
| `case-study-pune-retailer-saved-40-percent-billing-time` | `/blog/case-study-pune-retailer-saved-40-percent-billing-time` | **Live** |

### Blog Post Content Files (Not Yet Integrated into `blogPosts.ts`)

| File Path | Content Type | Target URL | Status | Quality Issues |
|-----------|-------------|------------|--------|----------------|
| `content/website/blog/how-to-choose-retail-management-software.md` | Blog post draft | `/blog/how-to-choose-retail-management-software` | **In repo, not in blogPosts.ts** | Internal links use relative paths (`/compare/...`, `/products/...`) — correct for website |
| `content/website/blog/retaileros-vs-traditional-pos-modern-retailers.md` | Blog post draft | `/blog/retaileros-vs-traditional-pos-modern-retailers` | **In repo, not in blogPosts.ts** | Internal links correct |
| `content/website/blog/best-pos-systems-small-retailers-2026.md` | Blog post draft | `/blog/best-pos-systems-small-retailers-2026` | **In repo, not in blogPosts.ts** | Link to `/products/retaileros` as "14-day free trial" — should verify trial CTA exists on that page |

> **Note:** These 3 blog slugs appear in the prerender list, suggesting they may have been added to `blogPosts.ts` already. Frontend Eng should verify.

---

## Tier 3: Supporting Content (Internal / Off-Site)

### Email Campaign Templates

| File Path | Content Type | Purpose | Status | Quality Issues |
|-----------|-------------|---------|--------|----------------|
| `content/emails/welcome-nurture-sequence.md` | Email sequence (5 emails) | Welcome/onboarding nurture | **Ready for Brevo** | None — UTM params properly set |
| `content/emails/cold-outreach-followup-day2-5.md` | Email sequence (4 emails) | Cold outreach follow-up | **Ready for Brevo** | **Broken URL:** `/retaileros` should be `/products/retaileros` (line 42, 53) |
| `content/emails/warm-lead-follow-up-sequence.md` | Email sequence (3 emails) | Warm lead nurture | **Ready for Brevo** | **Broken URL:** `khoshasystems.com/retaileros` should be `/products/retaileros` (line 128) |
| `content/emails/re-engagement-sequence.md` | Email sequence (3 emails) | Re-engage inactive leads | **Ready for Brevo** | None — links correct |
| `content/emails/marketing-metrics.md` | KPI framework | Internal reference | **Internal doc** | N/A |

### Sales Collateral

| File Path | Content Type | Purpose | Status | Quality Issues |
|-----------|-------------|---------|--------|----------------|
| `content/sales/retaileros-competitive-analysis.md` | Competitive analysis | Sales enablement | **Internal doc** | None detected |
| `content/sales/retaileros-objection-handling-faq.md` | Objection handlers | Sales playbook | **Internal doc** | None detected |
| `content/sales/retaileros-one-pager-general-trade.md` | One-pager | Print/PDF sales asset | **Internal doc** | None detected |
| `content/sales/retaileros-one-pager-multi-store.md` | One-pager | Print/PDF sales asset | **Internal doc** | None detected |
| `content/sales/retaileros-roi-one-pager.md` | ROI one-pager | Print/PDF sales asset | **Internal doc** | None detected |
| `content/sales/retaileros-roi-talking-points.md` | Talking points | Sales training | **Internal doc** | None detected |

### Social Media Content

| File Path | Content Type | Purpose | Status | Quality Issues |
|-----------|-------------|---------|--------|----------------|
| `content/social/social-media-posts.md` | 10+ social posts | LinkedIn & Twitter | **Ready to publish** | **Incorrect URLs:** `khoshasystems.com/real-estate-crm` should be `khoshasystems.com/products/real-estate-crm`; `khoshasystems.com/vms` should be `khoshasystems.com/products/visitor-management` |
| `content/social/linkedin-article-1-retail-tech-india.md` | LinkedIn article | Thought leadership | **Ready to publish** | None detected |
| `content/social/linkedin-article-2-real-estate-crm-india.md` | LinkedIn article | Thought leadership | **Ready to publish** | **Incorrect URL:** `khoshasystems.com/real-estate-crm` should be `/products/real-estate-crm` |
| `content/social/hashtag-strategy.md` | Strategy doc | Internal reference | **Internal doc** | N/A |
| `content/social/posting-schedule.md` | Calendar | Internal reference | **Internal doc** | N/A |

### Directory & Community Listings

| File Path | Content Type | Purpose | Status | Quality Issues |
|-----------|-------------|---------|--------|----------------|
| `content/directories/g2-capterra-getapp.md` | Directory listings | G2, Capterra, GetApp submissions | **Ready to submit** | None detected |
| `content/directories/google-business-profile.md` | GBP optimization | Google Business Profile | **Ready to submit** | None detected |
| `content/directories/indian-saas-directories.md` | SaaS directory listings | Indian SaaS platforms | **Ready to submit** | None detected |
| `content/directories/product-hunt-launch.md` | Launch content | Product Hunt | **Ready to submit** | None detected |
| `content/directories/quora-reddit-answers.md` | Q&A content | Quora & Reddit | **Ready to post** | None detected |

---

## Quality Issues Summary

### Critical (Fix Before Deployment)

1. **`content/landing-pages/retaileros-landing-page.md`** — Placeholder testimonials and brand logos. Pricing values (Rs 1,999-2,999) need CEO confirmation.
2. **`content/landing-pages/retaileros-use-cases.md`** — Links to `/trial` and `/demo` which are non-existent routes. Should use `/contact` or `/products/retaileros`.

### High (Fix Before Publishing)

3. **`content/emails/cold-outreach-followup-day2-5.md`** — URL `khoshasystems.com/retaileros` should be `khoshasystems.com/products/retaileros`.
4. **`content/emails/warm-lead-follow-up-sequence.md`** — Same broken URL: `/retaileros` instead of `/products/retaileros`.
5. **`content/social/social-media-posts.md`** — Multiple incorrect product URLs missing `/products/` prefix.
6. **`content/social/linkedin-article-2-real-estate-crm-india.md`** — URL missing `/products/` prefix.

### Low (Informational)

7. Three blog post markdown files in `content/website/blog/` appear in the prerender list but are separate from `data/blogPosts.ts`. Verify whether they've been integrated or need to be added.

---

## Summary Statistics

| Category | Total Files | Live on Website | Ready (Not Deployed) | Internal Only |
|----------|-------------|-----------------|---------------------|---------------|
| Product/Landing Pages | 12 | 9 (TSX routed) | 5 (content files) | 0 |
| Comparison Pages | 5 | 5 | 0 | 0 |
| Vertical Pages | 3 | 3 | 0 | 0 |
| Blog Posts | 15 | 12 (in blogPosts.ts) | 3 (content files) | 0 |
| Email Templates | 5 | 0 | 4 (ready for Brevo) | 1 (metrics doc) |
| Sales Collateral | 6 | 0 | 0 | 6 |
| Social Media | 5 | 0 | 3 (ready to publish) | 2 (strategy docs) |
| Directory Listings | 5 | 0 | 5 (ready to submit) | 0 |
| **Total** | **56** | **29** | **20** | **9** |

import puppeteer from 'puppeteer';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '../public/system-architecture-blueprint.pdf');

const gold = '#B8860B';
const goldLight = '#D4A843';
const darkBg = '#1a1d23';
const darkBg2 = '#22252d';
const textColor = '#e0ddd8';
const mutedText = '#9a968e';
const borderColor = '#333840';
const cardBg = '#272b33';
const greenAccent = '#4ade80';

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:wght@400;500;600;700&display=swap');

  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    font-family: 'Inter', -apple-system, sans-serif;
    color: ${textColor};
    background: ${darkBg};
    font-size: 11.5px;
    line-height: 1.7;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  .page {
    width: 210mm;
    min-height: 297mm;
    padding: 20mm 24mm;
    page-break-after: always;
    position: relative;
    background: ${darkBg};
  }
  .page:last-child { page-break-after: avoid; }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 1px solid ${borderColor};
    margin-bottom: 24px;
    font-size: 9px;
    color: ${mutedText};
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }
  .page-header .brand { color: ${gold}; font-weight: 600; }

  h1 { font-family: 'Playfair Display', serif; font-size: 34px; font-weight: 700; line-height: 1.2; color: #fff; }
  h2 { font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 600; margin-bottom: 16px; color: #fff; }
  h3 { font-size: 14px; font-weight: 600; margin-bottom: 8px; color: #fff; }
  .label { font-size: 10px; font-weight: 600; color: ${gold}; text-transform: uppercase; letter-spacing: 1.2px; margin-bottom: 10px; }

  p { margin-bottom: 12px; color: ${mutedText}; line-height: 1.75; }
  .white { color: #fff; }
  .accent { color: ${gold}; }
  .green { color: ${greenAccent}; }

  /* Cover */
  .cover {
    display: flex;
    flex-direction: column;
    justify-content: center;
    min-height: 297mm;
    padding: 30mm 28mm;
    background: linear-gradient(160deg, ${darkBg} 0%, #13151a 50%, #0f1015 100%);
  }
  .cover-badge {
    display: inline-block;
    background: rgba(184, 134, 11, 0.15);
    color: ${gold};
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 8px 16px;
    border-radius: 4px;
    border: 1px solid rgba(184, 134, 11, 0.3);
    margin-bottom: 30px;
  }
  .cover h1 {
    font-size: 44px;
    margin-bottom: 16px;
    line-height: 1.15;
    max-width: 440px;
  }
  .cover .subtitle {
    font-size: 16px;
    color: ${mutedText};
    font-weight: 300;
    margin-bottom: 50px;
    max-width: 400px;
    line-height: 1.6;
  }
  .cover .brand-block {
    border-top: 1px solid ${borderColor};
    padding-top: 20px;
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .cover .brand-block .logo {
    width: 36px; height: 36px;
    background: ${gold};
    border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif;
    font-size: 20px; font-weight: 700; color: #fff;
  }
  .cover .brand-block .info { font-size: 10px; color: ${mutedText}; }
  .cover .brand-block .info strong { color: #fff; font-size: 12px; display: block; margin-bottom: 2px; }

  /* Cards */
  .card {
    background: ${cardBg};
    border: 1px solid ${borderColor};
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 14px;
  }
  .card-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 14px;
    margin-bottom: 14px;
  }
  .card-grid .card { margin-bottom: 0; }

  .step-num {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 28px; height: 28px;
    background: rgba(184, 134, 11, 0.15);
    color: ${gold};
    font-weight: 700;
    font-size: 13px;
    border-radius: 50%;
    margin-bottom: 10px;
  }

  .check-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 10px;
    font-size: 11.5px;
  }
  .check-icon {
    width: 20px; height: 20px;
    background: rgba(74, 222, 128, 0.12);
    color: ${greenAccent};
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 11px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .pain-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 12px;
  }
  .pain-icon {
    width: 20px; height: 20px;
    background: rgba(239, 68, 68, 0.12);
    color: #ef4444;
    border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 12px;
    flex-shrink: 0;
    margin-top: 2px;
  }

  .highlight-box {
    background: rgba(184, 134, 11, 0.08);
    border: 1px solid rgba(184, 134, 11, 0.2);
    border-radius: 8px;
    padding: 18px 20px;
    margin: 16px 0;
  }

  .quote {
    border-left: 3px solid ${gold};
    padding: 14px 18px;
    margin: 16px 0;
    background: rgba(184, 134, 11, 0.05);
    border-radius: 0 6px 6px 0;
    font-style: italic;
    color: ${textColor};
    font-size: 12.5px;
    line-height: 1.6;
  }

  .stat-row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 14px;
    margin: 16px 0;
  }
  .stat-box {
    text-align: center;
    background: ${cardBg};
    border: 1px solid ${borderColor};
    border-radius: 8px;
    padding: 18px 12px;
  }
  .stat-box .number {
    font-size: 28px;
    font-weight: 800;
    color: ${gold};
    display: block;
    margin-bottom: 4px;
  }
  .stat-box .label-sm {
    font-size: 9.5px;
    color: ${mutedText};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .timeline-item {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
  }
  .timeline-dot {
    width: 12px; height: 12px;
    background: ${gold};
    border-radius: 50%;
    margin-top: 4px;
    flex-shrink: 0;
  }
  .timeline-line {
    position: relative;
  }
  .timeline-line::before {
    content: '';
    position: absolute;
    left: 5.5px;
    top: 16px;
    bottom: -20px;
    width: 1px;
    background: ${borderColor};
  }
  .timeline-item:last-child .timeline-line::before { display: none; }

  .cta-section {
    text-align: center;
    padding: 40px 30px;
    margin-top: 20px;
  }
  .cta-button {
    display: inline-block;
    background: ${gold};
    color: #fff;
    font-size: 13px;
    font-weight: 600;
    padding: 14px 36px;
    border-radius: 6px;
    text-decoration: none;
    letter-spacing: 0.5px;
    text-transform: uppercase;
  }

  .footer-note {
    position: absolute;
    bottom: 16mm;
    left: 24mm;
    right: 24mm;
    text-align: center;
    font-size: 8.5px;
    color: ${mutedText};
    border-top: 1px solid ${borderColor};
    padding-top: 10px;
  }
</style>
</head>
<body>

<!-- ==================== PAGE 1: COVER ==================== -->
<div class="cover page">
  <div class="cover-badge">Free Framework Guide</div>
  <h1>The Business Owner's <span class="accent">Blueprint</span> for Modern Systems</h1>
  <p class="subtitle">A simple, step-by-step framework to modernize your business operations — without the tech headaches.</p>
  <div class="brand-block">
    <div class="logo">K</div>
    <div class="info">
      <strong>Khoshà Systems</strong>
      Precision-Engineered Business Solutions
    </div>
  </div>
  <div class="footer-note">
    khoshasystems.com &nbsp;·&nbsp; Confidential &nbsp;·&nbsp; 2026 Edition
  </div>
</div>

<!-- ==================== PAGE 2: THE PROBLEM ==================== -->
<div class="page">
  <div class="page-header">
    <span class="brand">Khoshà Systems</span>
    <span>The Business Owner's Blueprint</span>
  </div>

  <div class="label">The Challenge</div>
  <h2>Running a Business Shouldn't Feel Like Fighting Your Own Systems</h2>

  <p style="color: ${textColor}; font-size: 12px; margin-bottom: 20px;">
    If any of these sound familiar, you're not alone. Most growing businesses hit these walls — and most don't know there's a better way.
  </p>

  <div class="pain-item">
    <div class="pain-icon">✕</div>
    <div>
      <h3>Spreadsheet Chaos</h3>
      <p style="margin-bottom: 0;">Your business runs on dozens of spreadsheets. Finding the right number takes 20 minutes. Nobody trusts the data because there are 5 versions of the same file.</p>
    </div>
  </div>

  <div class="pain-item">
    <div class="pain-icon">✕</div>
    <div>
      <h3>Disconnected Tools</h3>
      <p style="margin-bottom: 0;">Your billing software doesn't talk to your inventory. Your CRM doesn't sync with your accounts. You end up entering the same data three times.</p>
    </div>
  </div>

  <div class="pain-item">
    <div class="pain-icon">✕</div>
    <div>
      <h3>Software That Doesn't Fit</h3>
      <p style="margin-bottom: 0;">You tried off-the-shelf software, but it forces you to change how you work. It either does too much (confusing) or too little (useless).</p>
    </div>
  </div>

  <div class="pain-item">
    <div class="pain-icon">✕</div>
    <div>
      <h3>Vendor Lock-In & Hidden Costs</h3>
      <p style="margin-bottom: 0;">Your current provider charges for every small change. Adding a new report costs ₹50,000. You feel stuck and dependent.</p>
    </div>
  </div>

  <div class="pain-item">
    <div class="pain-icon">✕</div>
    <div>
      <h3>Growth Without Visibility</h3>
      <p style="margin-bottom: 0;">Your business is growing, but you can't see the numbers that matter. Decisions are based on gut feeling because real-time data isn't available.</p>
    </div>
  </div>

  <div class="highlight-box">
    <p style="margin: 0; color: ${textColor}; font-size: 12px; text-align: center;">
      <strong class="accent">The real cost?</strong> &nbsp;Not just money — it's the <strong class="white">hours you lose every week</strong> on manual work, the <strong class="white">opportunities you miss</strong> because you can't see your data, and the <strong class="white">stress of not knowing</strong> where your business truly stands.
    </p>
  </div>
</div>

<!-- ==================== PAGE 3: WHAT IF ==================== -->
<div class="page">
  <div class="page-header">
    <span class="brand">Khoshà Systems</span>
    <span>The Business Owner's Blueprint</span>
  </div>

  <div class="label">The Opportunity</div>
  <h2>What Your Business Looks Like After Modernization</h2>

  <p style="color: ${textColor}; font-size: 12px; margin-bottom: 24px;">
    Imagine logging in on a Monday morning and seeing <em>everything</em> — your sales, inventory, receivables, team performance — all in one place, updated in real time.
  </p>

  <div class="card-grid">
    <div class="card">
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <h3>One Dashboard for Everything</h3>
          <p style="margin: 0;">Sales, inventory, expenses, staff — all visible from your phone. No more calling the office to ask "how much did we sell today?"</p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <h3>Zero Double Entry</h3>
          <p style="margin: 0;">Enter data once, and it flows everywhere. A sale automatically updates inventory, accounting, GST reports, and customer records.</p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <h3>Built Around How You Work</h3>
          <p style="margin: 0;">Your system adapts to your business — not the other way around. Custom workflows that match exactly how your team operates today.</p>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="check-item">
        <div class="check-icon">✓</div>
        <div>
          <h3>Decisions Backed by Data</h3>
          <p style="margin: 0;">Know which products sell best, which customers are most valuable, and where you're losing money — with actual numbers, not guesses.</p>
        </div>
      </div>
    </div>
  </div>

  <div class="stat-row">
    <div class="stat-box">
      <span class="number">40%</span>
      <span class="label-sm">Less Time on Admin Work</span>
    </div>
    <div class="stat-box">
      <span class="number">3x</span>
      <span class="label-sm">Faster Decision Making</span>
    </div>
    <div class="stat-box">
      <span class="number">100%</span>
      <span class="label-sm">Data You Can Trust</span>
    </div>
  </div>

  <div class="quote">
    "We used to close our books at the end of every month. Now we see our P&L in real time. That alone changed how we run the business."
    <br><span style="font-style: normal; font-size: 10px; color: ${mutedText};">— Retail business owner, Khosha client</span>
  </div>
</div>

<!-- ==================== PAGE 4: THE FRAMEWORK ==================== -->
<div class="page">
  <div class="page-header">
    <span class="brand">Khoshà Systems</span>
    <span>The Business Owner's Blueprint</span>
  </div>

  <div class="label">Our Framework</div>
  <h2>The 5-Step Modernization Framework</h2>

  <p style="color: ${textColor}; font-size: 12px; margin-bottom: 24px;">
    This is the exact process we follow with every client. No jargon, no surprises — just a clear path from where you are now to where you want to be.
  </p>

  <div class="timeline-item">
    <div class="timeline-line">
      <div class="timeline-dot"></div>
    </div>
    <div>
      <div class="step-num">1</div>
      <h3>Discovery — Understanding Your Business</h3>
      <p>We sit with you and your team. We watch how you work, what tools you use, where time is wasted. No technical talk — just a conversation about your business.</p>
      <p style="color: ${gold}; font-size: 10.5px; margin: 0;"><strong>Duration: 1–2 weeks &nbsp;·&nbsp; Your involvement: 3–4 hours total</strong></p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-line">
      <div class="timeline-dot"></div>
    </div>
    <div>
      <div class="step-num">2</div>
      <h3>Blueprint — Your Custom Roadmap</h3>
      <p>We create a visual plan that shows exactly what your new system will look like, what it will do, and how it connects. You review it, suggest changes, and approve before any work begins.</p>
      <p style="color: ${gold}; font-size: 10.5px; margin: 0;"><strong>Duration: 1 week &nbsp;·&nbsp; Your involvement: 1–2 review sessions</strong></p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-line">
      <div class="timeline-dot"></div>
    </div>
    <div>
      <div class="step-num">3</div>
      <h3>Build — We Handle the Tech</h3>
      <p>Our engineers build your system. You get weekly demos so nothing is a surprise. Each module goes live one at a time — billing first, then inventory, then reports, and so on.</p>
      <p style="color: ${gold}; font-size: 10.5px; margin: 0;"><strong>Duration: 4–8 weeks &nbsp;·&nbsp; Your involvement: 30 min/week demo</strong></p>
    </div>
  </div>

  <div class="timeline-item">
    <div class="timeline-line">
      <div class="timeline-dot"></div>
    </div>
    <div>
      <div class="step-num">4</div>
      <h3>Launch — Go Live with Confidence</h3>
      <p>We train your team, migrate your data, and go live together. We run both old and new systems side-by-side until everyone is comfortable. Zero disruption to your daily business.</p>
      <p style="color: ${gold}; font-size: 10.5px; margin: 0;"><strong>Duration: 1–2 weeks &nbsp;·&nbsp; We're on-site or on-call</strong></p>
    </div>
  </div>

  <div class="timeline-item">
    <div>
      <div class="timeline-dot" style="margin-top: 4px;"></div>
    </div>
    <div>
      <div class="step-num">5</div>
      <h3>Grow — Ongoing Support & Evolution</h3>
      <p>Your business changes. Your system should too. We provide ongoing support, add new features as you need them, and ensure everything keeps running smoothly.</p>
      <p style="color: ${gold}; font-size: 10.5px; margin: 0;"><strong>Ongoing &nbsp;·&nbsp; Priority support included</strong></p>
    </div>
  </div>
</div>

<!-- ==================== PAGE 5: WHAT WE BUILD ==================== -->
<div class="page">
  <div class="page-header">
    <span class="brand">Khoshà Systems</span>
    <span>The Business Owner's Blueprint</span>
  </div>

  <div class="label">What You Get</div>
  <h2>Systems That Work As Hard As You Do</h2>

  <p style="color: ${textColor}; font-size: 12px; margin-bottom: 20px;">
    Every solution is custom-built for your business. Here are the common modules our clients use — pick what you need, skip what you don't.
  </p>

  <div class="card-grid">
    <div class="card">
      <h3 style="color: ${gold};">Billing & Invoicing</h3>
      <p style="margin: 0;">Generate GST-compliant invoices in seconds. Automatic tax calculations, payment tracking, and customer statement generation.</p>
    </div>
    <div class="card">
      <h3 style="color: ${gold};">Inventory Management</h3>
      <p style="margin: 0;">Know exactly what's in stock, what's running low, and what to reorder. Set auto-alerts so you never miss a sale due to stockouts.</p>
    </div>
    <div class="card">
      <h3 style="color: ${gold};">Customer Management (CRM)</h3>
      <p style="margin: 0;">Every customer interaction in one place. Purchase history, preferences, follow-up reminders, and automated thank-you messages.</p>
    </div>
    <div class="card">
      <h3 style="color: ${gold};">Reports & Analytics</h3>
      <p style="margin: 0;">Daily sales, monthly P&L, top products, staff performance — all auto-generated. View on your phone, share via WhatsApp.</p>
    </div>
    <div class="card">
      <h3 style="color: ${gold};">Staff & Operations</h3>
      <p style="margin: 0;">Attendance, task assignment, performance tracking. Know who's doing what, and reward your top performers with data to back it up.</p>
    </div>
    <div class="card">
      <h3 style="color: ${gold};">Scheme & Offer Engine</h3>
      <p style="margin: 0;">Manage brand schemes, cashbacks, and promotions without spreadsheets. Track claims, margins, and profitability per offer automatically.</p>
    </div>
  </div>

  <div class="highlight-box">
    <p style="margin: 0; color: ${textColor}; font-size: 12px;">
      <strong class="accent">You don't need all of these on day one.</strong> &nbsp;Most clients start with 2–3 modules and add more as their team gets comfortable. We move at <em>your</em> pace.
    </p>
  </div>
</div>

<!-- ==================== PAGE 6: HOW WE'RE DIFFERENT ==================== -->
<div class="page">
  <div class="page-header">
    <span class="brand">Khoshà Systems</span>
    <span>The Business Owner's Blueprint</span>
  </div>

  <div class="label">Why Khoshà</div>
  <h2>We're Not Another Software Company</h2>

  <p style="color: ${textColor}; font-size: 12px; margin-bottom: 24px;">
    There are thousands of software vendors. Here's what makes working with us different.
  </p>

  <div class="card" style="margin-bottom: 16px;">
    <h3>We Speak Business, Not Code</h3>
    <p style="margin: 0;">You'll never hear us say "API" or "database migration." We talk in terms you care about — sales, margins, GST, customers, time saved. Our job is to understand your world, not make you learn ours.</p>
  </div>

  <div class="card" style="margin-bottom: 16px;">
    <h3>Your System, Your Rules</h3>
    <p style="margin: 0;">Unlike off-the-shelf products, your system is built around your exact processes. If you have a unique way of handling returns or calculating commissions, we build for that — not force you into a generic template.</p>
  </div>

  <div class="card" style="margin-bottom: 16px;">
    <h3>Transparent, Fixed Pricing</h3>
    <p style="margin: 0;">We agree on the scope and price upfront. No surprise bills, no hidden charges for "change requests." If we underestimated something, that's on us — not on your invoice.</p>
  </div>

  <div class="card" style="margin-bottom: 16px;">
    <h3>You Own Everything</h3>
    <p style="margin: 0;">The system we build is yours. The data is yours. If you ever want to move to a different provider, we'll hand over everything — code, data, documentation. No lock-in, no hostage situations.</p>
  </div>

  <div class="card">
    <h3>We Stay After Launch</h3>
    <p style="margin: 0;">Most vendors disappear after delivery. We provide ongoing support, regular check-ins, and continuous improvements. As your business grows, your system grows with it.</p>
  </div>
</div>

<!-- ==================== PAGE 7: REAL RESULTS ==================== -->
<div class="page">
  <div class="page-header">
    <span class="brand">Khoshà Systems</span>
    <span>The Business Owner's Blueprint</span>
  </div>

  <div class="label">Real Results</div>
  <h2>What Modernization Looks Like in Practice</h2>

  <div class="card" style="margin-bottom: 20px;">
    <div class="label" style="font-size: 9px; margin-bottom: 6px;">Case Study — Retail</div>
    <h3>Multi-Store Electronics Retailer</h3>
    <p><strong class="white">Before:</strong> Managing 3 stores with Tally and WhatsApp groups. Stock transfers done manually. End-of-day reports took 45 minutes per store. No visibility into which products were profitable after brand schemes.</p>
    <p><strong class="white">After:</strong> Centralized dashboard showing all 3 stores in real time. Automated stock alerts, instant transfer tracking, and brand scheme profitability calculated automatically.</p>
    <div class="stat-row" style="margin-top: 12px;">
      <div class="stat-box">
        <span class="number" style="font-size: 22px;">2hrs</span>
        <span class="label-sm">Saved Daily on Admin</span>
      </div>
      <div class="stat-box">
        <span class="number" style="font-size: 22px;">₹4.5L</span>
        <span class="label-sm">Recovered from Scheme Leaks</span>
      </div>
      <div class="stat-box">
        <span class="number" style="font-size: 22px;">15 days</span>
        <span class="label-sm">From Start to Go-Live</span>
      </div>
    </div>
  </div>

  <div class="card" style="margin-bottom: 20px;">
    <div class="label" style="font-size: 9px; margin-bottom: 6px;">Case Study — Services</div>
    <h3>Property Management Firm</h3>
    <p><strong class="white">Before:</strong> Tracking 200+ properties across Excel sheets. Tenant follow-ups done from personal phones. Rent collection status unknown until month-end.</p>
    <p><strong class="white">After:</strong> Every property, tenant, and payment in one system. Automated rent reminders via WhatsApp. Dashboard shows collection status in real time.</p>
    <div class="stat-row" style="margin-top: 12px;">
      <div class="stat-box">
        <span class="number" style="font-size: 22px;">98%</span>
        <span class="label-sm">On-Time Collections</span>
      </div>
      <div class="stat-box">
        <span class="number" style="font-size: 22px;">Zero</span>
        <span class="label-sm">Missed Follow-Ups</span>
      </div>
      <div class="stat-box">
        <span class="number" style="font-size: 22px;">10 days</span>
        <span class="label-sm">From Start to Go-Live</span>
      </div>
    </div>
  </div>

  <div class="quote">
    "I used to spend my Sundays doing inventory counts and reconciling spreadsheets. Now I check my phone over coffee and everything is there. I wish I'd done this two years ago."
    <br><span style="font-style: normal; font-size: 10px; color: ${mutedText};">— Consumer electronics retailer, Khosha client</span>
  </div>
</div>

<!-- ==================== PAGE 8: YOUR READINESS CHECKLIST ==================== -->
<div class="page">
  <div class="page-header">
    <span class="brand">Khoshà Systems</span>
    <span>The Business Owner's Blueprint</span>
  </div>

  <div class="label">Self-Assessment</div>
  <h2>Is Your Business Ready to Modernize?</h2>

  <p style="color: ${textColor}; font-size: 12px; margin-bottom: 20px;">
    Answer these honestly. If you check 3 or more, you're ready — and you're probably overdue.
  </p>

  <div class="card" style="padding: 24px;">
    <div class="check-item">
      <div style="width: 18px; height: 18px; border: 2px solid ${borderColor}; border-radius: 3px; flex-shrink: 0; margin-top: 1px;"></div>
      <p style="margin: 0; color: ${textColor};">You spend more than <strong class="white">2 hours a week</strong> on data entry, reporting, or reconciliation</p>
    </div>
    <div class="check-item">
      <div style="width: 18px; height: 18px; border: 2px solid ${borderColor}; border-radius: 3px; flex-shrink: 0; margin-top: 1px;"></div>
      <p style="margin: 0; color: ${textColor};">You can't answer <strong class="white">"what are my top 5 products this month?"</strong> in under 30 seconds</p>
    </div>
    <div class="check-item">
      <div style="width: 18px; height: 18px; border: 2px solid ${borderColor}; border-radius: 3px; flex-shrink: 0; margin-top: 1px;"></div>
      <p style="margin: 0; color: ${textColor};">Your team enters the <strong class="white">same information in multiple places</strong></p>
    </div>
    <div class="check-item">
      <div style="width: 18px; height: 18px; border: 2px solid ${borderColor}; border-radius: 3px; flex-shrink: 0; margin-top: 1px;"></div>
      <p style="margin: 0; color: ${textColor};">You've had a <strong class="white">stock discrepancy, missed payment, or billing error</strong> in the last month</p>
    </div>
    <div class="check-item">
      <div style="width: 18px; height: 18px; border: 2px solid ${borderColor}; border-radius: 3px; flex-shrink: 0; margin-top: 1px;"></div>
      <p style="margin: 0; color: ${textColor};">Your business has grown but your <strong class="white">systems haven't kept up</strong></p>
    </div>
    <div class="check-item">
      <div style="width: 18px; height: 18px; border: 2px solid ${borderColor}; border-radius: 3px; flex-shrink: 0; margin-top: 1px;"></div>
      <p style="margin: 0; color: ${textColor};">You rely on <strong class="white">one person</strong> who "knows where everything is" — and you worry about what happens if they leave</p>
    </div>
    <div class="check-item" style="margin-bottom: 0;">
      <div style="width: 18px; height: 18px; border: 2px solid ${borderColor}; border-radius: 3px; flex-shrink: 0; margin-top: 1px;"></div>
      <p style="margin: 0; color: ${textColor};">You want to <strong class="white">open a new location or expand</strong> but your current process can't scale</p>
    </div>
  </div>

  <div class="highlight-box" style="margin-top: 20px;">
    <h3 style="margin-bottom: 8px; text-align: center;">How to Read Your Score</h3>
    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; margin-top: 12px;">
      <div style="text-align: center;">
        <div style="font-size: 18px; font-weight: 700; color: ${greenAccent};">1–2 Checks</div>
        <p style="margin: 6px 0 0; font-size: 10.5px;">You're managing well. Keep this blueprint for when you're ready to level up.</p>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 18px; font-weight: 700; color: ${goldLight};">3–4 Checks</div>
        <p style="margin: 6px 0 0; font-size: 10.5px;">You're ready. A focused project can transform your daily operations.</p>
      </div>
      <div style="text-align: center;">
        <div style="font-size: 18px; font-weight: 700; color: #ef4444;">5+ Checks</div>
        <p style="margin: 6px 0 0; font-size: 10.5px;">You're overdue. Every week you wait costs you time and money.</p>
      </div>
    </div>
  </div>
</div>

<!-- ==================== PAGE 9: INVESTMENT & FAQ ==================== -->
<div class="page">
  <div class="page-header">
    <span class="brand">Khoshà Systems</span>
    <span>The Business Owner's Blueprint</span>
  </div>

  <div class="label">Common Questions</div>
  <h2>Straight Answers to Real Concerns</h2>

  <div class="card" style="margin-bottom: 12px;">
    <h3>"How much does this cost?"</h3>
    <p style="margin: 0;">Every project is different, but we're transparent from day one. After our free Discovery call, we give you a fixed quote — no hourly billing, no surprise invoices. Most small-to-mid businesses invest between ₹1–5 lakhs for a complete system.</p>
  </div>

  <div class="card" style="margin-bottom: 12px;">
    <h3>"My team isn't tech-savvy. Will they be able to use it?"</h3>
    <p style="margin: 0;">That's exactly who we design for. If your team can use WhatsApp, they can use our systems. We design simple, clean interfaces and provide hands-on training until everyone is comfortable.</p>
  </div>

  <div class="card" style="margin-bottom: 12px;">
    <h3>"What if it doesn't work for us?"</h3>
    <p style="margin: 0;">Because we build custom (not off-the-shelf), this almost never happens. But if something doesn't feel right during the build, we adjust — that's the whole point of weekly demos. You see progress every week and can course-correct early.</p>
  </div>

  <div class="card" style="margin-bottom: 12px;">
    <h3>"How long until we see results?"</h3>
    <p style="margin: 0;">Most clients see immediate impact in the first module (usually billing or inventory) within 2–3 weeks. The full system typically takes 6–8 weeks. You'll wonder how you managed without it.</p>
  </div>

  <div class="card" style="margin-bottom: 12px;">
    <h3>"Will my data be safe?"</h3>
    <p style="margin: 0;">Absolutely. Your data is encrypted, backed up daily, and accessible only to authorized users. We follow industry-standard security practices, and you own your data completely — always.</p>
  </div>

  <div class="card">
    <h3>"Can I start small and expand later?"</h3>
    <p style="margin: 0;">That's exactly how we recommend it. Start with the one thing that causes you the most pain, see the results, and then add more modules when you're ready. No pressure, no rush.</p>
  </div>
</div>

<!-- ==================== PAGE 10: CTA ==================== -->
<div class="page" style="display: flex; flex-direction: column; justify-content: center;">
  <div class="page-header" style="position: absolute; top: 20mm; left: 24mm; right: 24mm;">
    <span class="brand">Khoshà Systems</span>
    <span>The Business Owner's Blueprint</span>
  </div>

  <div class="cta-section">
    <div class="cover-badge" style="margin-bottom: 24px;">Your Next Step</div>
    <h1 style="font-size: 36px; margin-bottom: 16px;">Ready to Stop<br>Fighting Your Systems?</h1>
    <p style="font-size: 14px; max-width: 420px; margin: 0 auto 32px; line-height: 1.6;">
      Book a free, no-pressure Discovery call. We'll listen to your challenges, show you what's possible, and give you an honest recommendation — even if it's "you don't need us yet."
    </p>

    <div class="cta-button" style="margin-bottom: 40px;">
      BOOK YOUR FREE DISCOVERY CALL
    </div>

    <div style="max-width: 380px; margin: 0 auto;">
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; text-align: left; margin-bottom: 32px;">
        <div>
          <div class="check-item" style="margin-bottom: 6px;">
            <div class="check-icon" style="width: 16px; height: 16px; font-size: 9px;">✓</div>
            <span style="font-size: 11px; color: ${textColor};">30-minute call</span>
          </div>
          <div class="check-item" style="margin-bottom: 6px;">
            <div class="check-icon" style="width: 16px; height: 16px; font-size: 9px;">✓</div>
            <span style="font-size: 11px; color: ${textColor};">No technical jargon</span>
          </div>
          <div class="check-item" style="margin-bottom: 0;">
            <div class="check-icon" style="width: 16px; height: 16px; font-size: 9px;">✓</div>
            <span style="font-size: 11px; color: ${textColor};">Actionable advice</span>
          </div>
        </div>
        <div>
          <div class="check-item" style="margin-bottom: 6px;">
            <div class="check-icon" style="width: 16px; height: 16px; font-size: 9px;">✓</div>
            <span style="font-size: 11px; color: ${textColor};">No commitment required</span>
          </div>
          <div class="check-item" style="margin-bottom: 6px;">
            <div class="check-icon" style="width: 16px; height: 16px; font-size: 9px;">✓</div>
            <span style="font-size: 11px; color: ${textColor};">Honest recommendation</span>
          </div>
          <div class="check-item" style="margin-bottom: 0;">
            <div class="check-icon" style="width: 16px; height: 16px; font-size: 9px;">✓</div>
            <span style="font-size: 11px; color: ${textColor};">Custom roadmap included</span>
          </div>
        </div>
      </div>
    </div>

    <div style="border-top: 1px solid ${borderColor}; padding-top: 24px; margin-top: 8px;">
      <p style="font-size: 11px; margin-bottom: 6px; color: ${textColor};">
        <strong class="white">Visit:</strong> <span class="accent">khoshasystems.com/contact</span>
      </p>
      <p style="font-size: 11px; margin-bottom: 6px; color: ${textColor};">
        <strong class="white">WhatsApp:</strong> <span class="accent">Direct chat available on our website</span>
      </p>
      <p style="font-size: 11px; margin-bottom: 0; color: ${textColor};">
        <strong class="white">Email:</strong> <span class="accent">hello@khoshasystems.com</span>
      </p>
    </div>
  </div>

  <div class="footer-note">
    © 2026 Khoshà Systems &nbsp;·&nbsp; khoshasystems.com &nbsp;·&nbsp; Precision-Engineered Business Solutions
  </div>
</div>

</body>
</html>`;

(async () => {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  });

  const page = await browser.newPage();
  await page.setContent(html, { waitUntil: 'networkidle0', timeout: 30000 });

  // Wait for fonts to load
  await page.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 1000));

  await page.pdf({
    path: outputPath,
    format: 'A4',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: 0, right: 0, bottom: 0, left: 0 },
  });

  await browser.close();
  console.log(`PDF generated: ${outputPath}`);
})();

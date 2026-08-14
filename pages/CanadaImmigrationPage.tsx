import React from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { FAQSection } from '../components/FAQSection';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Users, Shield, BarChart3, Wallet, Calendar, Database } from 'lucide-react';

const chaosTools = [
  "WhatsApp threads", "Excel trackers", "Drive folders", "Gmail search",
  "Job posting screenshots", "Wall calendars", "Word retainer templates",
  "Separate invoice books", "Sticky notes", "“Ask the office manager”",
];

const layers = [
  { n: "CLIENT-FACING", title: "Intake, uploads, signatures", desc: "Status, document uploads, e-signatures, and payments — reachable through a secure link, no account required." },
  { n: "UNIFIED RECORD", title: "Profile, documents, eligibility", desc: "One client record holds the profile, documents, eligibility screening, and full case timeline." },
  { n: "PRACTICE WORKSPACE", title: "Owner, admin, case worker", desc: "Role-based workspaces so the whole firm works from the same truth, with firm-level isolation." },
];

const pillars = [
  { icon: Users, title: "One Client Record", desc: "Nothing typed twice. Every action logged, every document signed and audited.", bullets: ["Role-based access (owner, admin, case worker, read-only)", "Firm-level isolation & full audit trail", "Offline functionality"] },
  { icon: Shield, title: "Recruitment Evidence", desc: "LMIAs fail on advertising records, not forms. The 56-day Job Bank clock runs on-screen.", bullets: ["Three-source recruitment tracking", "Applicant log & recruitment summary generation", "Wage line & threshold pre-filing checks"] },
  { icon: Database, title: "Client Portal", desc: "One secure link. No account, no password — nothing for the client to install or lose.", bullets: ["Passport auto-scanning (MRZ extraction)", "Proof-of-funds requests", "Live case status & revocable access"] },
  { icon: Wallet, title: "Billing", desc: "The money lives on the same record as the work — not a separate invoice book.", bullets: ["1, 2, or 3-instalment schedules", "GST/HST per instalment", "Government fee passthrough"] },
  { icon: Calendar, title: "Critical Dates", desc: "Nothing filed late — every deadline across every open file, on one screen.", bullets: ["Job Bank expiry & biometrics tracking", "ESDC response windows", "Work permit & PR portal deadlines"] },
  { icon: BarChart3, title: "Data Integrity", desc: "Every government rule has a source, a date, and a signature — one place, not twelve.", bullets: ["canada.ca source URL per constant", "Effective-date tracking, human-verified", "41 CMAs of ESDC unemployment data"] },
];

const steps = [
  { n: "01", title: "Enquiry & Intake", desc: "Employer enquiry or worker referral arrives through a secure link; passport auto-fills the file." },
  { n: "02", title: "Record & Retainer", desc: "Employer and worker records created, screening completed, retainer signed electronically." },
  { n: "03", title: "LMIA Eligibility", desc: "File measured against wage, region, and threshold rules before work begins — refusal risk flagged pre-filing." },
  { n: "04", title: "Recruitment", desc: "Every posting and applicant logged, with the advertising clock running on-screen." },
  { n: "05", title: "LMIA Application", desc: "Stream, positions, named workers, and supporting documents assembled from existing file data." },
  { n: "06", title: "ESDC Assessment", desc: "Application filed and tracked through officer review and further-information requests to decision." },
  { n: "07", title: "LMIA Decision", desc: "Positive outcome continues to permit; negative outcome reviewed, corrected, refiled." },
  { n: "08", title: "Work Permit", desc: "Permit application built from the existing file — offer, evidence, biometrics, decision." },
  { n: "09", title: "Arrival & Employer Compliance", desc: "Post-arrival obligations recorded for employer evidence." },
  { n: "10", title: "PR Pathway", desc: "Route to permanent residence assessed and tracked from the same client record." },
];

const pipelines = [
  "NOC Assessment", "Express Entry", "Canadian Experience Class", "Federal Skilled Worker",
  "Provincial Nominee Program", "PR e-APR", "LMIA", "Work Permit", "Study Permit",
  "Spousal Sponsorship", "Citizenship",
];

const faqs = [
  { question: "Where does my client data live, and who can see it?", answer: "In a PostgreSQL database with firm-level isolation — one practice cannot read another's records. Documents are stored outside the web root and never served as static files. Access is role-based, credentials are encrypted at rest, and backups run nightly with retention." },
  { question: "What happens when the rules change?", answer: "One file changes. Every regulatory constant lives in a single rules module, each carrying its canada.ca source URL, effective date, and a verified flag. Nothing else in the product is permitted to hard-code a threshold — which is what keeps a rule change from being a hunt through the codebase." },
  { question: "Do my clients need an account or a password?", answer: "No. Clients reach their intake form, uploads, case status, and signing through a secure link you issue and can revoke. Nothing to install, no password to lose." },
  { question: "We already run a general CRM. Why change?", answer: "A general CRM will store a client and a note. It will not count an 8-consecutive-week Job Bank clock, block a filing into a CMA without checking exemptions, or produce a recruitment summary you can hand over. The compliance chain is the product, not an add-on." },
  { question: "Does it replace my professional judgment?", answer: "No, and it's built not to pretend otherwise. PASSAGE is a record, evidence, and workflow system. It surfaces the rule, shows the source, and flags the risk — the RCIC decides. Where it doesn't have enough information to be sure, it says so rather than guessing." },
  { question: "How much work is it to move our files in?", answer: "Start with the live files, not the archive. Most practices set up the firm, licence details, and rate card in an afternoon, then bring open cases in as they touch them." },
  { question: "Can my team use it on a phone?", answer: "Yes. It installs like an app, the sidebar becomes a bottom dock, tables restack into readable cards, and it keeps working through a dead connection." },
  { question: "Who builds it, and will it still be here next year?", answer: "PASSAGE is built and maintained by Khoshà Systems, and it's in daily production use in a licensed RCIC practice — not a prototype looking for its first user. You get a named contact with the people who write the code, and your data is exportable at any time, without asking." },
];

export const CanadaImmigrationPage: React.FC = () => {
  return (
    <div>
      <PageHero
        backLink={{ label: "All Products", href: "/products" }}
        label="Canada Immigration — PASSAGE"
        title={<>From First Enquiry to <span className="bronze-gradient-text">Permanent Residence</span>, in One File.</>}
        subtitle="PASSAGE is the practice operating system for RCIC-licensed immigration consultancies. The client portal, the case work, the LMIA recruitment evidence, the signed retainer, and the invoice all hang off one client record."
        backgroundImage="/images/work-immigration.png"
      >
        <div className="flex flex-wrap gap-3">
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-bronze-600 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-500 transition-colors rounded group">
            Book a Walkthrough <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <a href="#system" className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white text-sm font-medium uppercase tracking-wider hover:bg-white/10 transition-colors rounded group">
            See How It Works
          </a>
        </div>
      </PageHero>

      {/* GEO: Entity definition block */}
      <Section className="bg-white border-b border-stone-100">
        <div className="max-w-3xl mx-auto text-center" data-speakable="true">
          <p className="text-lg sm:text-xl text-stone-700 leading-relaxed">
            <strong>PASSAGE</strong> is a practice-management platform by Khoshà Systems for Canadian RCIC-licensed immigration consultancies. It unifies client records, 11 case-type pipelines, LMIA recruitment evidence, billing, and regulatory compliance tracking into one system — in daily production use at a licensed RCIC practice.
          </p>
        </div>
      </Section>

      {/* The Problem */}
      <Section className="bg-stone-50">
        <div className="max-w-3xl mx-auto">
          <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">The Problem</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-5">Your practice already runs on ten systems. None of them talk.</h2>
          <p className="text-stone-500 leading-relaxed mb-8">
            WhatsApp threads for one thing, an Excel tracker for another, a Drive folder for documents, Gmail search for history, job posting screenshots, a wall calendar for deadlines, a Word retainer template, a separate invoice book, sticky notes — and when none of that works, asking the office manager.
          </p>
          <div className="flex flex-wrap gap-2.5">
            {chaosTools.map((tool) => (
              <span key={tool} className="text-xs sm:text-sm text-stone-600 bg-white border border-stone-200 px-3.5 py-2 rounded-full">{tool}</span>
            ))}
          </div>
        </div>
      </Section>

      {/* One Record */}
      <Section className="bg-stone-900 relative overflow-hidden" id="system">
        <div className="absolute inset-0 pattern-diagonal z-0 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-bronze-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <span className="text-bronze-400 font-semibold tracking-widest uppercase text-sm block mb-3">The Solution</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-5">One record. Every fact attached to it.</h2>
          <p className="text-white/60 leading-relaxed mb-10 max-w-2xl">
            Client, employer, case, evidence, and money all live on the same record — one-click file location, staff transitions without losing history, system-held deadlines, and pre-assembled regulatory documentation.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 border border-white/10 rounded-lg overflow-hidden">
            {layers.map((layer) => (
              <div key={layer.n} className="bg-stone-800 p-6 sm:p-7">
                <div className="text-[11px] text-bronze-400 font-semibold tracking-widest uppercase mb-3">{layer.n}</div>
                <h3 className="text-white font-serif text-lg font-bold mb-2">{layer.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{layer.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Feature Pillars */}
      <Section className="bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="max-w-2xl mb-12">
            <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">What's Actually In It</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">Six systems, one record.</h2>
            <p className="text-stone-500">Not a feature list — the parts of running a practice that currently live in someone's head or a spreadsheet.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((pillar) => (
              <motion.div key={pillar.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="p-6 border border-stone-200 rounded-lg hover:border-bronze-300 hover:shadow-sm transition-all">
                <div className="w-10 h-10 rounded-lg bg-bronze-50 flex items-center justify-center text-bronze-600 mb-4">
                  <pillar.icon size={20} />
                </div>
                <h3 className="font-serif font-bold text-stone-900 mb-2">{pillar.title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed mb-4">{pillar.desc}</p>
                <ul className="space-y-1.5">
                  {pillar.bullets.map((b) => (
                    <li key={b} className="text-xs text-stone-500 flex items-start gap-2">
                      <span className="w-1 h-1 rounded-full bg-bronze-400 mt-1.5 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* 10-Step Process */}
      <Section className="bg-stone-900">
        <div className="max-w-4xl mx-auto">
          <span className="text-bronze-400 font-semibold tracking-widest uppercase text-sm block mb-3">How It Actually Runs</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white mb-4">Ten steps, enquiry to permanent residence.</h2>
          <p className="text-white/60 mb-10 max-w-2xl">The same client record moves through every stage — nothing re-entered, nothing re-explained.</p>
          <div className="border-t border-white/10">
            {steps.map((step) => (
              <div key={step.n} className="grid grid-cols-[48px_1fr] gap-4 py-4 border-b border-white/10">
                <div className="text-bronze-400 text-sm font-mono pt-0.5">{step.n}</div>
                <div>
                  <h4 className="text-white text-sm font-semibold mb-1">{step.title}</h4>
                  <p className="text-white/50 text-xs leading-relaxed max-w-xl">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Pipelines */}
      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <span className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3">Case Types</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-4">Eleven pipelines, each its own workflow.</h2>
          <p className="text-stone-500 mb-8 max-w-2xl">Not one generic "case" object stretched to fit — each type gets the fields, rules, and steps it actually needs.</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {pipelines.map((p, i) => (
              <div key={p} className="flex items-center gap-2 bg-white border border-stone-200 rounded-lg px-3.5 py-3 text-sm font-medium text-stone-700">
                <span className="text-[10px] font-mono text-bronze-600">{String(i + 1).padStart(2, '0')}</span>
                {p}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <FAQSection
        faqs={faqs}
        title="Before You Book a Call"
        subtitle="Straight answers, including the ones software pages usually dodge."
      />

      {/* Legal */}
      <Section className="bg-stone-50 border-t border-stone-100">
        <div className="max-w-3xl mx-auto space-y-3">
          <p className="text-stone-500 text-xs leading-relaxed">
            <strong className="text-stone-700">PASSAGE is practice-management software, not an immigration consultancy.</strong> It does not provide immigration advice or representation. Advice and representation in Canada may only be given by an authorised representative — an RCIC in good standing with the CICC, a member of a Canadian provincial or territorial law society, or a Chambre des notaires du Québec notary. The licensed consultant remains responsible for every assessment, decision, and filing made using this software.
          </p>
          <p className="text-stone-500 text-xs leading-relaxed">
            Regulatory constants and case examples referenced on this page are illustrative of how the product stores and displays data, and are not a statement of current law. Always verify against canada.ca. Permanent residence is eligibility-dependent and is not guaranteed by an LMIA, a work permit, or by using this software.
          </p>
        </div>
      </Section>

      {/* Closing CTA */}
      <Section className="bg-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">See It On Your Own Files.</h2>
          <p className="text-stone-500 mb-8">Thirty minutes. No obligation, no card. We'll walk through your actual files and tell you honestly what moving in looks like for your practice.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
            Book a Walkthrough <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>

      <Contact />
    </div>
  );
};

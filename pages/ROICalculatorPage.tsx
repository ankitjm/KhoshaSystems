import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { PageHero } from '../components/PageHero';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { SEOHead } from '../components/SEOHead';
import { saveLead } from '../db/turso';
import { sendNotificationEmail, sendCustomerConfirmation } from '../utils/email';
import {
  Calculator, TrendingUp, Clock, ShieldCheck, ArrowRight,
  Store, Users, CreditCard, CheckCircle, AlertCircle, Download
} from 'lucide-react';

// --- ROI calculation constants (based on industry benchmarks for telecom retail) ---
const HOURS_SAVED_PER_STORE_PER_MONTH = 42; // manual billing, inventory, reporting
const ERROR_RATE_MANUAL = 0.08; // 8% error rate with manual processes
const ERROR_RATE_WITH_RETAILEROS = 0.005; // 0.5% with RetailerOS
const AVG_COST_PER_ERROR_INR = 850; // avg cost per billing/inventory error
const HOURLY_LABOR_COST_INR = 250; // avg employee cost per hour
const RETAILEROS_MONTHLY_PER_STORE_INR = 4999; // RetailerOS pricing estimate
const SCHEME_LEAKAGE_RECOVERY_PCT = 0.03; // 3% revenue recovered from scheme tracking
const AVG_TRANSACTION_VALUE_INR = 1200;

function formatINR(value: number): string {
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(1)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return `₹${Math.round(value)}`;
}

function formatNumber(value: number): string {
  return value.toLocaleString('en-IN');
}

interface ROIResults {
  hoursSavedMonthly: number;
  hoursSavedYearly: number;
  laborSavingsMonthly: number;
  laborSavingsYearly: number;
  errorReductionPct: number;
  errorCostSavedMonthly: number;
  errorCostSavedYearly: number;
  schemeSavingsMonthly: number;
  schemeSavingsYearly: number;
  totalSavingsMonthly: number;
  totalSavingsYearly: number;
  retailerosCostMonthly: number;
  retailerosCostYearly: number;
  netROIMonthly: number;
  netROIYearly: number;
  roiMultiplier: number;
  paybackDays: number;
}

function calculateROI(stores: number, employees: number, transactions: number): ROIResults {
  const hoursSavedMonthly = stores * HOURS_SAVED_PER_STORE_PER_MONTH;
  const laborSavingsMonthly = hoursSavedMonthly * HOURLY_LABOR_COST_INR;

  const manualErrors = transactions * ERROR_RATE_MANUAL;
  const retailerosErrors = transactions * ERROR_RATE_WITH_RETAILEROS;
  const errorsAvoided = manualErrors - retailerosErrors;
  const errorCostSavedMonthly = errorsAvoided * AVG_COST_PER_ERROR_INR;
  const errorReductionPct = ((ERROR_RATE_MANUAL - ERROR_RATE_WITH_RETAILEROS) / ERROR_RATE_MANUAL) * 100;

  const monthlyRevenue = transactions * AVG_TRANSACTION_VALUE_INR;
  const schemeSavingsMonthly = monthlyRevenue * SCHEME_LEAKAGE_RECOVERY_PCT;

  const totalSavingsMonthly = laborSavingsMonthly + errorCostSavedMonthly + schemeSavingsMonthly;
  const retailerosCostMonthly = stores * RETAILEROS_MONTHLY_PER_STORE_INR;
  const netROIMonthly = totalSavingsMonthly - retailerosCostMonthly;
  const roiMultiplier = retailerosCostMonthly > 0 ? totalSavingsMonthly / retailerosCostMonthly : 0;
  const paybackDays = netROIMonthly > 0 ? Math.ceil((retailerosCostMonthly / netROIMonthly) * 30) : 999;

  return {
    hoursSavedMonthly,
    hoursSavedYearly: hoursSavedMonthly * 12,
    laborSavingsMonthly,
    laborSavingsYearly: laborSavingsMonthly * 12,
    errorReductionPct,
    errorCostSavedMonthly,
    errorCostSavedYearly: errorCostSavedMonthly * 12,
    schemeSavingsMonthly,
    schemeSavingsYearly: schemeSavingsMonthly * 12,
    totalSavingsMonthly,
    totalSavingsYearly: totalSavingsMonthly * 12,
    retailerosCostMonthly,
    retailerosCostYearly: retailerosCostMonthly * 12,
    netROIMonthly,
    netROIYearly: netROIMonthly * 12,
    roiMultiplier,
    paybackDays,
  };
}

// Slider input component
const SliderInput: React.FC<{
  label: string;
  icon: React.ReactNode;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  suffix?: string;
}> = ({ label, icon, value, min, max, step, onChange, suffix = '' }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <label className="text-sm font-medium text-stone-300 flex items-center gap-2">
        {icon} {label}
      </label>
      <span className="text-lg font-bold text-white tabular-nums">
        {formatNumber(value)}{suffix}
      </span>
    </div>
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full h-2 bg-stone-700 rounded-full appearance-none cursor-pointer accent-bronze-500
        [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
        [&::-webkit-slider-thumb]:bg-bronze-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:shadow-lg
        [&::-webkit-slider-thumb]:hover:bg-bronze-400 [&::-webkit-slider-thumb]:transition-colors"
    />
    <div className="flex justify-between text-[10px] text-stone-600">
      <span>{formatNumber(min)}</span>
      <span>{formatNumber(max)}{suffix}</span>
    </div>
  </div>
);

// Result card component
const ResultCard: React.FC<{
  icon: React.ReactNode;
  label: string;
  monthly: string;
  yearly: string;
  highlight?: boolean;
}> = ({ icon, label, monthly, yearly, highlight }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`p-5 rounded-lg border ${
      highlight
        ? 'bg-bronze-900/30 border-bronze-600/40'
        : 'bg-stone-800/50 border-stone-700/50'
    }`}
  >
    <div className="flex items-center gap-2 mb-3">
      <div className={`p-1.5 rounded-md ${highlight ? 'bg-bronze-600/20 text-bronze-400' : 'bg-stone-700/50 text-stone-400'}`}>
        {icon}
      </div>
      <span className="text-xs uppercase tracking-widest text-stone-500 font-medium">{label}</span>
    </div>
    <div className="text-2xl font-bold text-white mb-1">{monthly}</div>
    <div className="text-xs text-stone-500">{yearly} / year</div>
  </motion.div>
);

export const ROICalculatorPage: React.FC = () => {
  const [stores, setStores] = useState(5);
  const [employees, setEmployees] = useState(15);
  const [transactions, setTransactions] = useState(5000);

  // Email gate state
  const [showEmailGate, setShowEmailGate] = useState(false);
  const [emailForm, setEmailForm] = useState({ name: '', email: '', company: '' });
  const [emailStatus, setEmailStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const results = useMemo(
    () => calculateROI(stores, employees, transactions),
    [stores, employees, transactions]
  );

  const handleReportRequest = () => {
    setShowEmailGate(true);
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'roi_report_click', {
        event_category: 'lead_generation',
        event_label: 'ROI Calculator',
        value: 1,
      });
    }
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEmailStatus('SUBMITTING');

    const dbResult = await saveLead({
      name: emailForm.name,
      company: emailForm.company,
      email: emailForm.email,
      goal: 'ROI Calculator Report',
      source: 'ROI Calculator',
    });

    await sendNotificationEmail({
      to_name: emailForm.name,
      to_email: emailForm.email,
      from_company: emailForm.company,
      goal: 'ROI Calculator Report',
      message: `ROI Calculator lead — ${stores} stores, ${employees} employees, ${formatNumber(transactions)} txns/mo. Est. annual savings: ${formatINR(results.totalSavingsYearly)}. ROI: ${results.roiMultiplier.toFixed(1)}x.`,
    });

    await sendCustomerConfirmation({
      name: emailForm.name,
      email: emailForm.email,
      goal: 'RetailerOS ROI Report',
    });

    if (dbResult.success) {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'lead_generation',
          event_label: 'ROI Calculator Report',
          value: 1,
        });
      }
      setEmailStatus('SUCCESS');
    } else {
      setEmailStatus('ERROR');
    }
  };

  return (
    <>
      <SEOHead
        title="RetailerOS ROI Calculator — Estimate Your Savings | Khosha Systems"
        description="Calculate how much time and money RetailerOS can save your telecom retail business. Interactive ROI calculator with instant results."
        canonical="/tools/roi-calculator"
      />

      <PageHero
        label="Free Tool"
        title={<>RetailerOS <br className="hidden sm:block" />ROI Calculator</>}
        subtitle="See exactly how much time, money, and errors RetailerOS eliminates for your telecom retail operation. Adjust the sliders and get instant results."
        backgroundImage="/images/retaileros-page-hero.jpg"
      />

      {/* Calculator Section */}
      <Section className="bg-stone-900">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14">
            {/* Input Panel */}
            <div>
              <div className="inline-block px-3 py-1 bg-bronze-900/20 border border-bronze-700/30 rounded-full mb-5">
                <span className="text-[10px] uppercase tracking-widest text-bronze-400 font-medium">Your Business</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">
                Tell us about your operation
              </h2>

              <div className="space-y-8 bg-stone-800/40 border border-stone-700/40 rounded-lg p-6 sm:p-8">
                <SliderInput
                  label="Number of Stores"
                  icon={<Store size={16} />}
                  value={stores}
                  min={1}
                  max={100}
                  step={1}
                  onChange={setStores}
                />
                <SliderInput
                  label="Total Employees"
                  icon={<Users size={16} />}
                  value={employees}
                  min={1}
                  max={500}
                  step={1}
                  onChange={setEmployees}
                />
                <SliderInput
                  label="Monthly Transactions"
                  icon={<CreditCard size={16} />}
                  value={transactions}
                  min={100}
                  max={100000}
                  step={100}
                  onChange={setTransactions}
                />
              </div>
            </div>

            {/* Results Panel */}
            <div>
              <div className="inline-block px-3 py-1 bg-bronze-900/20 border border-bronze-700/30 rounded-full mb-5">
                <span className="text-[10px] uppercase tracking-widest text-bronze-400 font-medium">Your Savings</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-6">
                Estimated ROI with RetailerOS
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <ResultCard
                  icon={<Clock size={16} />}
                  label="Time Saved"
                  monthly={`${formatNumber(results.hoursSavedMonthly)} hrs`}
                  yearly={`${formatNumber(results.hoursSavedYearly)} hrs`}
                />
                <ResultCard
                  icon={<TrendingUp size={16} />}
                  label="Labor Savings"
                  monthly={formatINR(results.laborSavingsMonthly)}
                  yearly={formatINR(results.laborSavingsYearly)}
                />
                <ResultCard
                  icon={<ShieldCheck size={16} />}
                  label="Error Reduction"
                  monthly={formatINR(results.errorCostSavedMonthly)}
                  yearly={formatINR(results.errorCostSavedYearly)}
                />
                <ResultCard
                  icon={<Calculator size={16} />}
                  label="Scheme Recovery"
                  monthly={formatINR(results.schemeSavingsMonthly)}
                  yearly={formatINR(results.schemeSavingsYearly)}
                />
              </div>

              {/* Total ROI highlight */}
              <motion.div
                key={`${stores}-${employees}-${transactions}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-bronze-900/40 to-bronze-800/20 border border-bronze-600/30 rounded-lg p-6"
              >
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs uppercase tracking-widest text-bronze-400 font-medium">Net Annual ROI</span>
                    <div className="text-3xl sm:text-4xl font-bold text-white mt-1">
                      {formatINR(results.netROIYearly)}
                    </div>
                    <div className="text-sm text-stone-400 mt-1">
                      {formatINR(results.netROIMonthly)}/mo after RetailerOS cost
                    </div>
                  </div>
                  <div className="flex gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-bronze-400">{results.roiMultiplier.toFixed(1)}x</div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500">ROI</div>
                    </div>
                    <div className="w-px bg-stone-700" />
                    <div>
                      <div className="text-2xl font-bold text-bronze-400">{results.paybackDays}d</div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500">Payback</div>
                    </div>
                    <div className="w-px bg-stone-700" />
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">{Math.round(results.errorReductionPct)}%</div>
                      <div className="text-[10px] uppercase tracking-widest text-stone-500">Less Errors</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </Section>

      {/* Email Gate / Report Download Section */}
      <Section className="bg-stone-800">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-3 py-1 bg-bronze-900/20 border border-bronze-700/30 rounded-full mb-5">
              <span className="text-[10px] uppercase tracking-widest text-bronze-400 font-medium">Detailed Report</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-4">
              Get Your Custom ROI Report
            </h2>
            <p className="text-stone-400 text-base sm:text-lg mb-8 max-w-xl mx-auto">
              Receive a detailed PDF breakdown with store-by-store analysis, implementation timeline, and personalized recommendations for your {stores}-store operation.
            </p>

            {emailStatus === 'SUCCESS' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-900/20 border border-emerald-800/50 p-8 rounded-lg max-w-md mx-auto"
              >
                <CheckCircle className="mx-auto text-emerald-400 mb-4" size={40} />
                <h4 className="text-white text-lg font-serif mb-2">Report Requested!</h4>
                <p className="text-stone-400 text-sm mb-4">
                  Our team will prepare your custom ROI report and send it to <span className="text-white">{emailForm.email}</span> within 24 hours.
                </p>
                <p className="text-stone-500 text-xs">
                  We'll also reach out to discuss how RetailerOS fits your specific needs.
                </p>
              </motion.div>
            ) : !showEmailGate ? (
              <button
                onClick={handleReportRequest}
                className="inline-flex items-center gap-2 bg-bronze-600 text-white font-medium uppercase tracking-widest px-8 py-4 hover:bg-bronze-500 transition-colors group rounded-md text-sm"
              >
                <Download size={18} />
                Get Detailed PDF Report
                <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            ) : (
              <motion.form
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                onSubmit={handleEmailSubmit}
                className="bg-stone-900/60 border border-stone-700/50 p-6 sm:p-8 rounded-lg max-w-md mx-auto text-left"
              >
                <h3 className="text-lg font-semibold text-white mb-4 uppercase tracking-wider text-center">
                  Where should we send it?
                </h3>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-stone-500">Name</label>
                    <input
                      type="text"
                      required
                      value={emailForm.name}
                      onChange={(e) => setEmailForm({ ...emailForm, name: e.target.value })}
                      className="w-full bg-stone-900/80 border border-stone-700 p-3 text-white text-sm rounded-md focus:outline-none focus:border-bronze-500 transition-colors placeholder:text-stone-600"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-stone-500">Company</label>
                    <input
                      type="text"
                      required
                      value={emailForm.company}
                      onChange={(e) => setEmailForm({ ...emailForm, company: e.target.value })}
                      className="w-full bg-stone-900/80 border border-stone-700 p-3 text-white text-sm rounded-md focus:outline-none focus:border-bronze-500 transition-colors placeholder:text-stone-600"
                      placeholder="Company name"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[11px] uppercase tracking-widest text-stone-500">Work Email</label>
                    <input
                      type="email"
                      required
                      value={emailForm.email}
                      onChange={(e) => setEmailForm({ ...emailForm, email: e.target.value })}
                      className="w-full bg-stone-900/80 border border-stone-700 p-3 text-white text-sm rounded-md focus:outline-none focus:border-bronze-500 transition-colors placeholder:text-stone-600"
                      placeholder="you@company.com"
                    />
                  </div>
                  {emailStatus === 'ERROR' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} /><span>Something went wrong. Please try again.</span>
                    </div>
                  )}
                  <button
                    type="submit"
                    disabled={emailStatus === 'SUBMITTING'}
                    className="w-full bg-bronze-600 text-white font-medium uppercase tracking-widest py-3.5 hover:bg-bronze-500 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 rounded-md text-sm"
                  >
                    {emailStatus === 'SUBMITTING' ? 'Sending...' : 'Send My Report'}
                    {emailStatus !== 'SUBMITTING' && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
                  </button>
                  <p className="text-stone-600 text-[10px] text-center">
                    We respect your privacy. No spam, ever.
                  </p>
                </div>
              </motion.form>
            )}
          </motion.div>
        </div>
      </Section>

      {/* Social Proof / Trust Indicators */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-3">
              Why Telecom Retailers Choose RetailerOS
            </h2>
            <p className="text-stone-500 max-w-2xl mx-auto">
              Built specifically for Indian telecom retail — not a generic POS adapted to fit.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                title: 'IMEI-Level Tracking',
                desc: 'Track every device from purchase to sale. Eliminate shrinkage and reconcile inventory in real-time across all stores.',
              },
              {
                title: 'Scheme Management',
                desc: 'Automatically apply carrier schemes, track commissions, and recover leakage that manual processes miss.',
              },
              {
                title: 'Multi-Store Dashboard',
                desc: 'One view across all locations. Real-time sales, inventory, and employee performance at your fingertips.',
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-stone-200 rounded-lg p-6"
              >
                <h3 className="text-base font-semibold text-stone-900 mb-2">{item.title}</h3>
                <p className="text-sm text-stone-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      <Contact />
    </>
  );
};

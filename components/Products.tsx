import React, { useRef } from 'react';
import { Section } from './Section';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Building2, Users, ArrowRight, Zap, Shield, BarChart3, Globe, Bot, Plane, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    name: "RetailerOS",
    slug: "/products/retaileros",
    tagline: "Built for Telecom & Electronics Retail",
    description: "A retail management platform for mobile phone retailers, consumer electronics stores, and telecom distributors. IMEI tracking, scheme management, brand analytics, and GST billing — all unified in one intelligent system.",
    icon: ShoppingCart,
    color: "bronze",
    logo: {
      src: "/images/Retailerosimg/logo-retaileros.png",
      alt: "RetailerOS",
    },
    features: [
      { icon: BarChart3, label: "Real-Time Analytics", desc: "Live sales, IMEI tracking, and brand-wise margin analysis" },
      { icon: Shield, label: "Scheme Management", desc: "Brand schemes, cashbacks, exchange offers — tracked automatically" },
      { icon: Zap, label: "AI-Powered Insights", desc: "Demand forecasting and slow-moving SKU alerts" },
      { icon: Cloud, label: "Cloud-Native", desc: "Scale from 1 store to 100 without infrastructure headaches" },
    ],
    stats: [
      { value: "40%", label: "Faster Checkout" },
      { value: "3x", label: "Inventory Accuracy" },
      { value: "60%", label: "Less Manual Work" },
    ]
  },
  {
    name: "Real Desk",
    slug: "/products/real-desk",
    tagline: "The Connected Sales Suite",
    description: "A connected sales suite for real estate developers and brokers. Nine products — landing pages, lead capture, sales presentation, bookings, and post-sales — all writing to one CRM, from first enquiry to possession.",
    icon: Building2,
    color: "stone",
    logo: {
      src: "/images/realdesk/logo-realdesk.png",
      alt: "RealDesk — The Connected Sales Suite",
    },
    features: [
      { icon: Globe, label: "Multi-Channel Capture", desc: "Web enquiries, QR scans, walk-ins, EOI forms, and channel partners — five capture points" },
      { icon: Users, label: "One CRM, Nine Products", desc: "Every product writes to the CRM; the CRM writes to none of them" },
      { icon: BarChart3, label: "Connected Sales Journey", desc: "From first enquiry through presentation, booking, and handover" },
      { icon: Shield, label: "Real-Time Handoffs", desc: "The thing that moves — an enquiry, a scan, a booked unit — passes automatically" },
    ],
    stats: [
      { value: "09", label: "Connected Products" },
      { value: "05", label: "Lead Capture Points" },
      { value: "01", label: "Source of Truth" },
    ]
  },
  {
    name: "AI Automation",
    slug: "/services",
    tagline: "AI That Works While You Don't",
    description: "Custom AI automation for business operations — workflow automation, AI-powered support tooling, and document processing, built around the systems you already use. It's designed to fit into your existing workflow, not force you into a new one.",
    icon: Bot,
    color: "bronze",
    logo: null,
    features: [
      { icon: Zap, label: "Workflow Automation", desc: "Automate repetitive operational tasks end-to-end" },
      { icon: Bot, label: "AI Agents", desc: "Custom agents for support, data entry, and internal tooling" },
      { icon: Shield, label: "Human-in-the-Loop", desc: "Automation with review checkpoints where it matters" },
      { icon: Cloud, label: "Integrates With Your Stack", desc: "Works alongside your existing tools, not instead of them" },
    ],
    stats: [
      { value: "Custom", label: "Built Around Your Workflow" },
      { value: "24/7", label: "Always-On Automation" },
      { value: "Any Stack", label: "Works With What You Have" },
    ]
  },
  {
    name: "Canada Immigration",
    slug: "/contact",
    tagline: "Case Management for Canada Immigration Consultants",
    description: "A case-management platform built for Canada-focused immigration consultancies and agents. Track applicants, manage documentation, and stay on top of every case stage from one dashboard.",
    icon: Plane,
    color: "stone",
    logo: null,
    features: [
      { icon: Users, label: "Applicant Tracking", desc: "Manage every case and applicant from a single pipeline" },
      { icon: Shield, label: "Document Vault", desc: "Secure storage for passports, visas, and supporting documents" },
      { icon: BarChart3, label: "Case Pipeline", desc: "Visual stage-based tracking from consultation to approval" },
      { icon: Globe, label: "Visa Category Tracking", desc: "Track cases across study, work, and permanent residency streams" },
    ],
    stats: [
      { value: "Custom", label: "Built for Your Practice" },
      { value: "Secure", label: "Document Handling" },
      { value: "Unified", label: "Case Dashboard" },
    ]
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const Products: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  return (
    <Section id="products" className="bg-white relative overflow-hidden">
      <motion.div
        style={{ y: backgroundY }}
        className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-bl from-bronze-100/20 to-transparent rounded-full blur-[120px] pointer-events-none"
      />

      <div ref={sectionRef} className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16 sm:mb-20">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-4"
          >
            Our Products
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-6"
          >
            SaaS Products That <span className="bronze-gradient-text">Ship Results.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 text-base sm:text-lg max-w-2xl mx-auto"
          >
            Battle-tested SaaS products built from real-world problems. Ready to deploy, designed to scale.
          </motion.p>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start"
        >
          {products.map((product) => (
            <motion.div
              key={product.name}
              variants={itemVariants}
              className="grid grid-cols-1 sm:grid-cols-[1.1fr_1fr] gap-6 bg-white border border-stone-200 rounded-xl p-6 hover:border-bronze-300 hover:shadow-md transition-all duration-300"
            >
              <div className="min-w-0">
                {product.logo ? (
                  <div className="h-9 sm:h-10 flex items-center mb-3">
                    <img src={product.logo.src} alt={product.logo.alt} className="max-h-8 sm:max-h-9 max-w-[150px] w-auto" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      product.color === 'bronze' ? 'bg-bronze-50 text-bronze-600 border border-bronze-200' : 'bg-stone-100 text-stone-700 border border-stone-200'
                    }`}>
                      <product.icon size={18} />
                    </div>
                    <h3 className="text-lg font-serif text-stone-900">{product.name}</h3>
                  </div>
                )}
                <p className="text-bronze-600 font-medium text-[11px] uppercase tracking-wider mb-2">{product.tagline}</p>
                <p className="text-stone-500 text-sm leading-relaxed">{product.description}</p>
              </div>

              <div className="sm:border-l sm:border-stone-100 sm:pl-6 flex flex-col justify-center items-center text-center">
                <div className="flex gap-3 mb-4">
                  {product.stats.map((stat, i) => (
                    <div key={i} className="flex-1 min-w-0 text-center">
                      <div className="text-sm sm:text-base font-bold text-stone-900 leading-tight">{stat.value}</div>
                      <div className="text-[9px] text-stone-400 uppercase tracking-wider leading-tight">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2">
                  <Link
                    to="/contact"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-stone-900 text-white text-xs font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded-md group"
                  >
                    Get a Demo <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to={product.slug}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-stone-300 text-stone-700 text-xs font-medium uppercase tracking-wider hover:border-bronze-400 hover:text-bronze-700 transition-colors rounded-md group"
                  >
                    Explore {product.name} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 sm:mt-28 text-center p-8 sm:p-12 border border-dashed border-stone-300 rounded-lg bg-stone-50/50"
        >
          <span className="text-[11px] sm:text-xs font-semibold text-bronze-600 uppercase tracking-widest block mb-3">More Products Coming Soon</span>
          <h3 className="text-xl sm:text-2xl font-serif text-stone-900 mb-4">We're Building More.</h3>
          <p className="text-stone-500 text-sm sm:text-base max-w-lg mx-auto mb-6">
            New products are in development across logistics, healthcare, and education verticals.
            Want early access?
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 text-bronze-600 hover:text-bronze-700 font-medium text-sm group"
          >
            Join the waitlist <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </Section>
  );
};

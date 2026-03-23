import React, { useRef } from 'react';
import { Section } from './Section';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { ShoppingCart, Building2, Users, ArrowRight, Zap, Shield, BarChart3, Globe, Smartphone, Cloud } from 'lucide-react';
import { Link } from 'react-router-dom';

const products = [
  {
    name: "RetailerOS",
    slug: "/products/retaileros",
    tagline: "Built for Telecom & Electronics Retail",
    description: "A full-stack retail management platform for mobile phone retailers, consumer electronics stores, and telecom distributors. IMEI tracking, scheme management, brand analytics, and GST billing — unified in one intelligent system.",
    icon: ShoppingCart,
    color: "bronze",
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
    name: "Real Estate CRM",
    slug: "/products/real-estate-crm",
    tagline: "Close Deals Faster. Manage Smarter.",
    description: "Purpose-built for Indian real estate developers and brokers. Manage leads, track site visits, automate follow-ups, and close deals — all from one platform designed for how real estate actually works in India.",
    icon: Building2,
    color: "stone",
    features: [
      { icon: Users, label: "Lead Management", desc: "Capture from 99acres, MagicBricks, Housing.com automatically" },
      { icon: Globe, label: "Channel Partner Portal", desc: "Give your brokers their own dashboard and deal tracking" },
      { icon: Shield, label: "Document Vault", desc: "Secure storage for agreements, KYC, and project docs" },
      { icon: BarChart3, label: "Sales Pipeline", desc: "Visual pipeline with stage-based conversion tracking" },
    ],
    stats: [
      { value: "2x", label: "Lead Conversion" },
      { value: "85%", label: "Follow-up Rate" },
      { value: "50%", label: "Faster Closings" },
    ]
  },
  {
    name: "Visitor Management System",
    slug: "/products/visitor-management",
    tagline: "First Impressions, Digitized.",
    description: "A modern visitor management platform for real estate sites, corporate offices, and co-working spaces. Digital check-ins, automated notifications, visitor analytics, and compliance — replacing outdated paper registers with intelligent visitor tracking.",
    icon: Users,
    color: "bronze",
    features: [
      { icon: Smartphone, label: "Digital Check-In", desc: "QR code and tablet-based visitor registration" },
      { icon: Zap, label: "Instant Alerts", desc: "SMS and WhatsApp notifications to hosts on arrival" },
      { icon: BarChart3, label: "Visitor Analytics", desc: "Track footfall patterns, peak hours, and conversion" },
      { icon: Shield, label: "Compliance Ready", desc: "RERA-compliant visitor logs with photo capture" },
    ],
    stats: [
      { value: "90%", label: "Faster Check-In" },
      { value: "100%", label: "Digital Records" },
      { value: "35%", label: "Better Conversion" },
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

interface AnimatedCounterProps {
  value: string;
  label: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ value, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="text-2xl sm:text-3xl font-bold text-stone-900"
      >
        {value}
      </motion.div>
      <div className="text-[11px] sm:text-xs text-stone-500 uppercase tracking-wider mt-1">{label}</div>
    </div>
  );
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

      <div ref={sectionRef} className="max-w-7xl mx-auto relative z-10">
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
          className="space-y-20 sm:space-y-28"
        >
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              variants={itemVariants}
              className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${index % 2 === 1 ? 'lg:[direction:rtl]' : ''}`}
            >
              {/* Product Info */}
              <div className={index % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                    product.color === 'bronze' ? 'bg-bronze-50 text-bronze-600 border border-bronze-200' : 'bg-stone-100 text-stone-700 border border-stone-200'
                  }`}>
                    <product.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900">{product.name}</h3>
                  </div>
                </div>
                <p className="text-bronze-600 font-medium text-sm uppercase tracking-wider mb-4">{product.tagline}</p>
                <p className="text-stone-500 text-base sm:text-lg leading-relaxed mb-8">{product.description}</p>

                {/* Stats */}
                <div className="flex gap-8 sm:gap-12 mb-8 pb-8 border-b border-stone-200">
                  {product.stats.map((stat, i) => (
                    <AnimatedCounter key={i} value={stat.value} label={stat.label} />
                  ))}
                </div>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded-md group"
                  >
                    Get a Demo <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <Link
                    to={product.slug}
                    className="inline-flex items-center gap-2 px-6 py-3 border border-stone-300 text-stone-700 text-sm font-medium uppercase tracking-wider hover:border-bronze-400 hover:text-bronze-700 transition-colors rounded-md group"
                  >
                    Explore {product.name} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Feature Grid */}
              <div className={index % 2 === 1 ? 'lg:[direction:ltr]' : ''}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 + i * 0.1 }}
                      className="group p-5 sm:p-6 bg-stone-50 border border-stone-200 rounded-lg hover:border-bronze-300 hover:shadow-sm transition-all duration-300"
                    >
                      <feature.icon size={20} className="text-bronze-500 mb-3 group-hover:scale-110 transition-transform" />
                      <h4 className="text-stone-900 font-medium mb-1 text-sm">{feature.label}</h4>
                      <p className="text-stone-500 text-xs leading-relaxed">{feature.desc}</p>
                    </motion.div>
                  ))}
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

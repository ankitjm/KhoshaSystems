import React from 'react';
import { Layers, Bot, TrendingUp, Globe, Smartphone, Palette } from 'lucide-react';
import { ServiceItem } from '../types';
import { motion } from 'framer-motion';

const pillars: ServiceItem[] = [
  {
    title: "Web Applications",
    subtitle: "Full-Stack Development",
    description: "Custom web apps built with modern frameworks — React, Next.js, Node.js. From MVPs to enterprise platforms, we ship production-ready applications that perform.",
    icon: Globe,
    details: ["SaaS Platforms", "Admin Dashboards", "Customer Portals", "API Development"]
  },
  {
    title: "Websites & Landing Pages",
    subtitle: "Design That Converts",
    description: "High-converting websites and landing pages with stunning design, blazing performance, and SEO built in. We manage your entire web presence from concept to analytics.",
    icon: Palette,
    details: ["Corporate Websites", "Landing Page Funnels", "E-Commerce", "CMS & Content Strategy"]
  },
  {
    title: "AI Transformation",
    subtitle: "Intelligence at Scale",
    description: "We integrate AI into your existing workflows — from intelligent chatbots and document processing to predictive analytics and automation pipelines that eliminate manual work.",
    icon: Bot,
    details: ["AI Agent Development", "Workflow Automation", "Intelligent Data Pipelines", "LLM Integration"]
  },
  {
    title: "Mobile Applications",
    subtitle: "iOS & Android",
    description: "Cross-platform and native mobile apps that deliver exceptional user experiences. From consumer-facing apps to enterprise mobility solutions.",
    icon: Smartphone,
    details: ["React Native Apps", "Progressive Web Apps", "Enterprise Mobile", "App Store Optimization"]
  },
  {
    title: "System Architecture",
    subtitle: "Design & Strategy",
    description: "We map your operational landscape, identify friction points, and design scalable architectures that align technology with business objectives.",
    icon: Layers,
    details: ["Enterprise System Design", "Cloud-Native Architecture", "Integration Strategy", "Technical Audits"]
  },
  {
    title: "Digital Transformation",
    subtitle: "End-to-End Modernization",
    description: "Legacy system modernization, cloud migration, and process digitization. We transform outdated infrastructure into competitive advantage.",
    icon: TrendingUp,
    details: ["Legacy Modernization", "Cloud Migration", "Process Automation", "Data Strategy"]
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const Services: React.FC = () => {
  return (
    <section id="architecture" className="relative overflow-hidden">
      {/* Background image with dark overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source srcSet="/images/services-network.webp" type="image/webp" />
          <img
            src="/images/services-network.jpg"
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </picture>
        <div className="absolute inset-0 overlay-bronze" />
      </div>
      <div className="absolute inset-0 pattern-diagonal z-[1] pointer-events-none" />

      <div className="relative z-10 py-14 sm:py-16 md:py-20 px-5 sm:px-6 md:px-12 lg:px-24">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="max-w-7xl mx-auto mb-12 sm:mb-16">
            <div className="text-center mb-12 sm:mb-16">
              <motion.span
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-sm font-semibold tracking-[0.2em] text-bronze-400 uppercase mb-3 sm:mb-4 block"
              >
                What We Do
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-white mb-5 sm:mb-6"
              >
                Services & Capabilities
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-white/50 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
              >
                From idea to production — we design, build, and scale digital products and services
                that drive real business outcomes.
              </motion.p>
            </div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  className="group relative p-6 sm:p-8 bg-white/5 border border-white/10 hover:border-bronze-400/40 transition-all duration-500 overflow-hidden rounded-lg backdrop-blur-sm"
                  whileHover={{ y: -4, transition: { duration: 0.3 } }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-bronze-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10">
                    <div className="w-11 h-11 sm:w-12 sm:h-12 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center mb-5 sm:mb-6 group-hover:border-bronze-400/40 group-hover:text-bronze-400 transition-all duration-300 text-white/70 group-hover:scale-110">
                      <pillar.icon size={22} />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-serif font-bold text-white mb-2 group-hover:text-bronze-300 transition-colors">{pillar.title}</h3>
                    <p className="text-[11px] sm:text-sm uppercase tracking-widest text-white/30 mb-4 sm:mb-6">{pillar.subtitle}</p>
                    <p className="text-white/50 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base min-h-[72px] sm:min-h-[80px]">
                      {pillar.description}
                    </p>
                    <ul className="space-y-2.5 sm:space-y-3 border-t border-white/10 pt-5 sm:pt-6">
                      {pillar.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-white/60">
                          <motion.span
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + idx * 0.05 }}
                            className="w-1.5 h-1.5 bg-bronze-500 rounded-full shrink-0"
                          />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

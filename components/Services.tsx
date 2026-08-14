import React from 'react';
import { Layers, Bot, TrendingUp, Globe, Smartphone, Palette, LucideIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface Capability {
  title: string;
  tagline: string;
  icon: LucideIcon;
  details: string[];
}

interface Group {
  label: string;
  items: Capability[];
}

const groups: Group[] = [
  {
    label: 'What We Build',
    items: [
      {
        title: "Web Applications",
        tagline: "Custom apps built with modern frameworks — React, Next.js, Node.js. From MVPs to enterprise platforms.",
        icon: Globe,
        details: ["SaaS Platforms", "Admin Dashboards", "API Development"]
      },
      {
        title: "Websites & Landing Pages",
        tagline: "High-converting sites with performance and SEO built in from the start.",
        icon: Palette,
        details: ["Corporate Sites", "Landing Funnels", "CMS & Content"]
      },
      {
        title: "Mobile Applications",
        tagline: "Cross-platform and native apps for iOS and Android.",
        icon: Smartphone,
        details: ["React Native", "Progressive Web Apps", "App Store Optimization"]
      },
    ]
  },
  {
    label: 'What We Transform',
    items: [
      {
        title: "AI Transformation",
        tagline: "AI integrated into existing workflows — chatbots, document processing, predictive analytics.",
        icon: Bot,
        details: ["Agent Development", "Workflow Automation", "LLM Integration"]
      },
      {
        title: "System Architecture",
        tagline: "We map the operational landscape and design for where you're headed, not just where you are.",
        icon: Layers,
        details: ["Enterprise Design", "Cloud-Native", "Integration Strategy"]
      },
      {
        title: "Digital Transformation",
        tagline: "Legacy modernization, cloud migration, and process digitization.",
        icon: TrendingUp,
        details: ["Legacy Modernization", "Cloud Migration", "Process Automation"]
      },
    ]
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } }
};

const rowVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

export const Services: React.FC = () => {
  return (
    <section id="architecture" className="bg-stone-50 py-14 sm:py-16 md:py-20 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-2xl mb-12 sm:mb-16">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-sm font-semibold tracking-[0.2em] text-bronze-600 uppercase mb-3 sm:mb-4 block"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-6xl font-serif font-bold text-stone-900 mb-5 sm:mb-6"
          >
            Two ways we work with you.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-stone-500 text-base sm:text-lg leading-relaxed"
          >
            Some engagements start from a blank page. Others start with a system that already exists and needs to work harder. We're set up for both.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14">
          {groups.map((group) => (
            <div key={group.label}>
              <div className="flex items-center gap-2.5 mb-5 sm:mb-6">
                <span className="w-5 h-0.5 bg-bronze-500" />
                <span className="text-[11px] sm:text-xs font-bold tracking-widest uppercase text-stone-700">{group.label}</span>
              </div>
              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
              >
                {group.items.map((item, idx) => (
                  <motion.div
                    key={item.title}
                    variants={rowVariants}
                    className={`flex gap-4 py-5 sm:py-6 border-t border-stone-200 ${idx === group.items.length - 1 ? 'border-b' : ''}`}
                  >
                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-stone-100 flex items-center justify-center flex-shrink-0 text-bronze-600">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 mb-1">{item.title}</h3>
                      <p className="text-stone-500 text-xs sm:text-sm leading-relaxed mb-2.5">{item.tagline}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.details.map((detail) => (
                          <span key={detail} className="text-[10px] sm:text-[11px] font-semibold text-stone-700 bg-stone-100 px-2.5 py-1 rounded-full">
                            {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

import React from 'react';
import { Section } from './Section';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const projects = [
  {
    id: 1,
    client: "Prestige Constructions",
    category: "Real Estate",
    title: "Visitor Management & CRM Platform",
    description: "Built a comprehensive visitor management system and CRM for one of India's leading real estate developers. Digital check-ins, automated broker notifications, lead tracking, and real-time site visit analytics — replacing manual registers with intelligent visitor intelligence.",
    stats: ["85%", "Faster Check-In", "2x", "Lead Conversion"],
    image: "/images/case-prestige.jpg",
  },
  {
    id: 2,
    client: "Arrowhead Communications",
    category: "Telecom",
    title: "Enterprise Operations Dashboard",
    description: "Designed and built a unified operations platform that consolidated legacy telecom systems into one intelligent dashboard. Real-time network monitoring, automated ticket routing, and AI-powered anomaly detection — reducing operational overhead significantly.",
    stats: ["60%", "Cost Reduction", "12", "Systems Unified"],
    image: "/images/case-arrowhead.jpg",
  },
  {
    id: 3,
    client: "Unhive Ventures",
    category: "Technology",
    title: "AI-Powered Investment Platform",
    description: "Developed a modern investment analytics platform with AI-driven deal scoring, portfolio management, and automated due diligence workflows. From fund tracking to investor reporting — built for the speed of venture capital.",
    stats: ["4x", "Faster Analysis", "200%", "Efficiency Gain"],
    image: "/images/case-unhive.jpg",
  },
  {
    id: 4,
    client: "Phygital Studio",
    category: "Digital Agency",
    title: "Full Digital Transformation Suite",
    description: "End-to-end digital transformation — from brand website and client portal to project management automation and integrated analytics. Built a cohesive digital ecosystem that streamlined operations across creative, sales, and delivery teams.",
    stats: ["3x", "Team Productivity", "40%", "Faster Delivery"],
    image: "/images/case-phygital.jpg",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export const Work: React.FC = () => {
  return (
    <Section id="work" className="bg-stone-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block"
            >
              Selected Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-6xl font-serif text-stone-900 mt-3 sm:mt-4"
            >
              Proven Results.
            </motion.h2>
          </div>
          <Link to="/contact" className="flex items-center gap-2 text-stone-500 hover:text-bronze-600 transition-colors text-sm">
            Start your project <ArrowUpRight size={16} />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-8 sm:gap-12"
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              className={`group flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-6 lg:gap-12 items-center border-b border-stone-200 pb-8 sm:pb-12 last:border-0`}
            >
              <div className="w-full lg:w-1/2 relative overflow-hidden rounded-lg h-[220px] sm:h-[280px] lg:h-[360px]">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.5 }}
                  className="w-full h-full relative rounded-lg overflow-hidden"
                >
                  <picture>
                    <source srcSet={project.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                    <img
                      src={project.image}
                      alt={`${project.client} - ${project.title}`}
                      className="w-full h-full object-cover img-zoom"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-900/60 via-stone-900/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 z-10">
                    <div className="text-white/90 text-xs uppercase tracking-widest font-medium">{project.client}</div>
                  </div>
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-bronze-400 to-bronze-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </motion.div>
              </div>

              <div className="w-full lg:w-1/2 space-y-4 sm:space-y-5">
                 <div className="flex flex-wrap items-center gap-3">
                   <span className="text-[11px] sm:text-xs font-semibold px-2.5 py-1 bg-stone-100 border border-stone-200 text-stone-500 uppercase tracking-wider rounded">
                     {project.category}
                   </span>
                   <span className="text-[11px] sm:text-xs text-stone-500 uppercase tracking-widest">{project.client}</span>
                 </div>
                 <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif text-stone-900 group-hover:text-bronze-700 transition-colors duration-300">{project.title}</h3>
                 <p className="text-stone-500 leading-relaxed text-sm sm:text-base md:text-lg">{project.description}</p>
                 <div className="flex gap-6 sm:gap-8 pt-2 sm:pt-4">
                   <div>
                     <motion.div
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 1 }}
                       viewport={{ once: true }}
                       className="text-stone-900 font-bold text-lg sm:text-xl"
                     >
                       {project.stats[0]}
                     </motion.div>
                     <div className="text-[11px] sm:text-xs text-stone-500 uppercase tracking-wider">{project.stats[1]}</div>
                   </div>
                   <div>
                     <motion.div
                       initial={{ opacity: 0 }}
                       whileInView={{ opacity: 1 }}
                       viewport={{ once: true }}
                       transition={{ delay: 0.1 }}
                       className="text-stone-900 font-bold text-lg sm:text-xl"
                     >
                       {project.stats[2]}
                     </motion.div>
                     <div className="text-[11px] sm:text-xs text-stone-500 uppercase tracking-wider">{project.stats[3]}</div>
                   </div>
                 </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </Section>
  );
};

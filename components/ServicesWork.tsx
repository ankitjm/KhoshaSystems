import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    client: "Arrowhead Communications",
    category: "Telecom",
    title: "Enterprise Operations Dashboard",
    image: "/images/case-arrowhead.jpg",
    stats: [
      { value: "60%", label: "Cost Reduction" },
      { value: "12", label: "Systems Unified" },
    ],
  },
  {
    client: "Unhive Ventures",
    category: "Technology",
    title: "AI-Powered Investment Platform",
    image: "/images/case-unhive.jpg",
    stats: [
      { value: "4x", label: "Faster Analysis" },
      { value: "200%", label: "Efficiency Gain" },
    ],
  },
  {
    client: "Phygital Studio",
    category: "Digital Agency",
    title: "Full Digital Transformation Suite",
    image: "/images/case-phygital.jpg",
    stats: [
      { value: "3x", label: "Team Productivity" },
      { value: "40%", label: "Faster Delivery" },
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

export const ServicesWork: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-20 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10 sm:mb-14">
          <div>
            <motion.span
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3"
            >
              Recent Work
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900"
            >
              Proof, not promises.
            </motion.h2>
          </div>
          <Link to="/work" className="inline-flex items-center gap-2 text-sm font-medium text-bronze-600 hover:text-bronze-700 transition-colors group shrink-0">
            See all work
            <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {projects.map((project) => (
            <motion.div
              key={project.client}
              variants={cardVariants}
              className="group border border-stone-200 rounded-lg overflow-hidden hover:border-bronze-300 hover:shadow-md transition-all"
            >
              <div className="relative h-40 overflow-hidden">
                <picture>
                  <source srcSet={project.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                  <img
                    src={project.image}
                    alt={`${project.client} — ${project.title}`}
                    className="w-full h-full object-cover img-zoom"
                    loading="lazy"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-stone-900/70 via-stone-900/10 to-transparent" />
                <div className="absolute bottom-3 left-4 z-10">
                  <span className="text-[10px] uppercase tracking-widest text-white/80 font-medium">{project.category}</span>
                </div>
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-widest text-stone-500 mb-1">{project.client}</div>
                <h3 className="text-base font-serif font-bold text-stone-900 mb-4 group-hover:text-bronze-700 transition-colors">{project.title}</h3>
                <div className="flex gap-6 pt-4 border-t border-stone-100">
                  {project.stats.map((stat) => (
                    <div key={stat.label}>
                      <div className="text-lg font-serif font-bold text-stone-900">{stat.value}</div>
                      <div className="text-[10px] text-stone-500 uppercase tracking-wider">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

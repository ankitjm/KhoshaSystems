import React from 'react';
import { motion, useReducedMotion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const projects = [
  {
    client: "Leading Real Estate Developer",
    category: "Real Desk",
    title: "Visitor Management & CRM Platform",
    image: "/images/case-prestige.jpg",
    productSlug: "/products/real-desk",
    stats: [
      { value: "85%", label: "Faster Check-In" },
      { value: "2x", label: "Lead Conversion" },
    ],
  },
  {
    client: "RetailerOS",
    category: "Telecom",
    title: "Enterprise Operations Dashboard",
    image: "/images/case-arrowhead.jpg",
    productSlug: "/products/retaileros",
    stats: [
      { value: "60%", label: "Cost Reduction" },
      { value: "12", label: "Systems Unified" },
    ],
  },
  {
    client: "RetailerOS",
    category: "Telecom Retail",
    title: "Automated Billing & WhatsApp Receipts",
    image: "/images/work-billgenration.png",
    productSlug: "/products/retaileros",
    stats: [
      { value: "100%", label: "Receipts Delivered" },
      { value: "9 Mo", label: "Zero Complaints" },
    ],
  },
  {
    client: "PASSAGE",
    category: "Canada Immigration",
    title: "Immigration Practice Operating System",
    image: "/images/work-immigration.png",
    productSlug: "/products/canada-immigration",
    stats: [
      { value: "11", label: "Case Pipelines" },
      { value: "56-Day", label: "Job Bank Tracking" },
    ],
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export const ServicesWork: React.FC = () => {
  const reduce = useReducedMotion();

  const fadeUp = (delay: number, distance = 16, duration = 0.5): Variants =>
    reduce
      ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
      : { hidden: { opacity: 0, y: distance }, visible: { opacity: 1, y: 0, transition: { duration, ease: EASE, delay } } };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: reduce ? 0 : 0.07 } }
  };

  const cardVariants: Variants = reduce
    ? { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.25 } } }
    : { hidden: { opacity: 0, y: 14 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } } };

  return (
    <section className="bg-white py-20 sm:py-24 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 sm:mb-16">
          <div>
            <motion.span
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(0, 10, 0.45)}
              className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3"
            >
              Recent Work
            </motion.span>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(0.08, 16, 0.5)}
              className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900 mb-3"
            >
              Proof, not promises.
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp(0.14, 16, 0.5)}
              className="text-stone-500 text-sm sm:text-base max-w-md"
            >
              Real transformations for real businesses — from established enterprises to early-stage startups.
            </motion.p>
          </div>
          <Link to="/work" className="group inline-flex items-center gap-2 text-sm font-medium text-bronze-600 hover:text-bronze-700 transition-colors shrink-0">
            <span className="relative">
              See all work
              <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-bronze-400 transition-[width] duration-300 ease-out group-hover:w-full" />
            </span>
            <ArrowRight size={15} className="transition-transform duration-300 motion-safe:group-hover:translate-x-1.5" />
          </Link>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch"
        >
          {projects.map((project) => (
            <motion.div
              key={project.client + project.title}
              variants={cardVariants}
              className="group h-full bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm transition duration-300 motion-safe:hover:-translate-y-[2px] hover:border-bronze-300 hover:shadow-md motion-reduce:transition-none"
            >
              <Link to={project.productSlug} className="flex flex-col h-full">
                <div className="relative h-44 overflow-hidden">
                  <picture>
                    <source srcSet={project.image.replace(/\.(jpg|jpeg|png)$/i, '.webp')} type="image/webp" />
                    <img
                      src={project.image}
                      alt={`${project.client} — ${project.title}`}
                      className="w-full h-full object-cover transition-transform duration-[600ms] ease-out motion-safe:group-hover:scale-[1.03]"
                      loading="lazy"
                    />
                  </picture>
                  <div className="absolute inset-0 bg-stone-900/0 group-hover:bg-stone-900/8 transition-colors duration-500 motion-reduce:transition-none" />
                </div>

                <div className="flex flex-col flex-1 p-5 sm:p-6">
                  <div className="mb-3">
                    <div className="text-xs font-semibold text-bronze-600 mb-0.5">{project.category}</div>
                    <div className="text-xs text-stone-400">{project.client}</div>
                  </div>
                  <h3 className="text-base sm:text-lg font-serif font-bold text-stone-900 leading-snug mb-5 transition-colors duration-300 group-hover:text-bronze-700">
                    {project.title}
                  </h3>

                  <div className="mt-auto">
                    <div className="flex gap-6 sm:gap-8 pt-4 border-t border-stone-100 mb-4">
                      {project.stats.map((stat) => (
                        <div key={stat.label}>
                          <div className="text-xl sm:text-2xl font-serif font-bold leading-none text-stone-900 transition-colors duration-300 group-hover:text-stone-950">
                            {stat.value}
                          </div>
                          <div className="text-[10px] text-stone-500 uppercase tracking-wider mt-1.5">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="inline-flex items-center gap-1.5 text-xs font-medium text-bronze-600 transition-colors duration-300 group-hover:text-bronze-700">
                      <span className="relative">
                        View case study
                        <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-bronze-400 transition-[width] duration-300 ease-out group-hover:w-full" />
                      </span>
                      <ArrowRight size={13} className="transition-transform duration-300 motion-safe:group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

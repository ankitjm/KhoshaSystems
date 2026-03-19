import React from 'react';
import { Section } from '../components/Section';
import { Philosophy } from '../components/Philosophy';
import { Contact } from '../components/Contact';
import { Alchemy } from '../components/Alchemy';
import { Founder } from '../components/Founder';
import { PageHero } from '../components/PageHero';
import { Brain, Network, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const values = [
  {
    icon: Brain,
    title: "Systems Thinking",
    description: "Businesses are interconnected systems. We optimize the whole, not just the parts — ensuring every component contributes to the larger objective."
  },
  {
    icon: Network,
    title: "Intelligent Integration",
    description: "We compress operational layers through AI and automation. Less friction means faster execution and lower cost per outcome."
  },
  {
    icon: Zap,
    title: "Lasting Impact",
    description: "We build systems designed to compound in value. The architecture adapts, the automation learns, and the platform grows with you."
  }
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export const PhilosophyPage: React.FC = () => {
  return (
    <div>
      <PageHero
        title={<>About <span className="text-bronze-400">Khoshà Systems</span></>}
        subtitle="Born in Bangalore (Bengaluru). Built across continents. 15+ years of engineering products, platforms, and systems that drive real transformation."
        backgroundImage="/images/philosophy-hero.jpg"
      />

      <Section className="bg-white">
        <Alchemy />
      </Section>

      <Philosophy />

      <Section className="bg-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 md:gap-12"
        >
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={cardVariants}
              whileHover={{ y: -4 }}
              className="p-5 sm:p-6 border border-stone-200 bg-stone-50 rounded-lg hover:border-bronze-300 transition-colors"
            >
              <v.icon className="text-bronze-600 mb-3 sm:mb-4" size={28} />
              <h3 className="text-lg sm:text-xl text-stone-900 font-serif mb-2">{v.title}</h3>
              <p className="text-stone-500 text-sm">{v.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <Founder />
      <Contact />
    </div>
  );
};

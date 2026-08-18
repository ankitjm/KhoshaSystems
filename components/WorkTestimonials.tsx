import React from 'react';
import { motion } from 'framer-motion';
import { Quote, Star } from 'lucide-react';

const testimonials = [
  {
    quote: "Khosha Systems didn't just build software. They understood our real estate operations inside-out and delivered a visitor management system that transformed how we run our sites.",
    author: "Senior Director",
    role: "Leading Real Estate Developer",
  },
  {
    quote: "Shrinkage dropped by 92%. We recovered ₹4.7 lakh in brand scheme payouts in 6 months — that's 26x what we pay for RetailerOS annually.",
    author: "Rajesh Reddy",
    role: "Owner, Digi World Electronics, Hyderabad",
  },
  {
    quote: "We claimed ₹1.8 lakh in additional scheme payouts in just 4 months. Billing time went from 7 minutes to 2.5 minutes per sale.",
    author: "Priya Kulkarni",
    role: "Owner, Mobile Junction, Pune",
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

export const WorkTestimonials: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-20 px-5 sm:px-6 md:px-12 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-14">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-bronze-600 font-semibold tracking-widest uppercase text-sm block mb-3"
          >
            In Their Words
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-stone-900"
          >
            What the numbers felt like.
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6"
        >
          {testimonials.map((t) => (
            <motion.div
              key={t.author}
              variants={cardVariants}
              className="relative bg-stone-50 p-6 sm:p-7 border border-stone-200 rounded-lg hover:border-bronze-300 transition-colors"
            >
              <Quote size={24} className="text-bronze-200 absolute top-5 right-5" />
              <div className="flex gap-1 text-bronze-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={13} fill="currentColor" />
                ))}
              </div>
              <p className="text-stone-600 text-sm leading-relaxed italic mb-5 pr-4">"{t.quote}"</p>
              <div className="border-t border-stone-100 pt-4">
                <div className="text-stone-900 font-serif text-sm font-medium">{t.author}</div>
                <div className="text-bronze-600 text-xs uppercase tracking-widest">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

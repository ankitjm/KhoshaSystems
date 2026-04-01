import React from 'react';
import { Section } from '../components/Section';
import { PageHero } from '../components/PageHero';
import { Link } from 'react-router-dom';
import { ArrowRight, Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';
import { motion } from 'framer-motion';

export const BlogPage: React.FC = () => {
  return (
    <div>
      <PageHero
        label="Insights"
        title={<>The Khoshà <span className="bronze-gradient-text">Blog</span></>}
        subtitle="Practical insights on software development, AI transformation, and building technology for Indian businesses."
        backgroundImage="/images/blog-hero.jpg"
      />

      <Section className="bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link
                  to={`/blog/${post.slug}`}
                  className="flex flex-col h-full border border-stone-200 rounded-lg hover:border-bronze-300 hover:shadow-sm transition-all bg-white overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.coverAlt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading={i < 3 ? "eager" : "lazy"}
                    />
                  </div>
                  <div className="flex flex-col flex-1 p-5">
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="text-[11px] font-semibold text-bronze-600 uppercase tracking-widest bg-bronze-50 px-3 py-1 rounded-full">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-stone-400 uppercase tracking-widest">
                        <Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-stone-400 uppercase tracking-widest">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>
                    <h2 className="text-lg font-serif text-stone-900 mb-2 group-hover:text-bronze-700 transition-colors">
                      {post.title}
                    </h2>
                    <p className="text-stone-500 text-sm leading-relaxed mb-4 flex-1">
                      {post.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-bronze-600 text-sm font-medium group-hover:gap-3 transition-all">
                      Read Article <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </Section>

      <Section className="bg-stone-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-serif text-stone-900 mb-4">Have a Project in Mind?</h2>
          <p className="text-stone-500 mb-8">Whether it's AI integration, legacy modernization, or building a new SaaS product — we'd love to hear about your challenge.</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded group">
            Get in Touch <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </Section>
    </div>
  );
};

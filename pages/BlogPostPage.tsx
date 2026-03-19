import React, { useEffect } from 'react';
import { Section } from '../components/Section';
import { Contact } from '../components/Contact';
import { PageHero } from '../components/PageHero';
import { motion } from 'framer-motion';
import { Link, useParams, Navigate } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  useEffect(() => {
    if (post) {
      document.title = `${post.title} | Khoshà Systems Blog`;
      const updateMeta = (name: string, content: string, property = false) => {
        const attr = property ? 'property' : 'name';
        let meta = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
        if (meta) { meta.content = content; }
        else { meta = document.createElement('meta'); meta.setAttribute(attr, name); meta.content = content; document.head.appendChild(meta); }
      };
      updateMeta('description', post.description);
      updateMeta('keywords', post.keywords);
      updateMeta('og:title', post.title, true);
      updateMeta('og:description', post.description, true);
      updateMeta('og:url', `https://www.khoshasystems.com/blog/${post.slug}`, true);
      updateMeta('og:type', 'article', true);
      updateMeta('article:published_time', post.date, true);
      updateMeta('twitter:title', post.title);
      updateMeta('twitter:description', post.description);
    }
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const renderContent = (block: string) => {
    if (block.startsWith('### ')) return <h3 className="text-xl font-serif text-stone-900 mt-8 mb-3">{block.replace('### ', '')}</h3>;
    if (block.startsWith('## ')) return <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-10 mb-4">{block.replace('## ', '')}</h2>;
    if (block.includes('\n\n')) {
      return (
        <div className="space-y-4">
          {block.split('\n\n').map((para, i) => {
            const isBold = para.startsWith('**') && para.includes('.**');
            if (isBold) { const boldEnd = para.indexOf('.**') + 2; return <p key={i} className="text-stone-600 text-base leading-relaxed"><strong className="text-stone-800">{para.substring(2, boldEnd - 1)}</strong>{para.substring(boldEnd + 1)}</p>; }
            return <p key={i} className="text-stone-600 text-base leading-relaxed">{para}</p>;
          })}
        </div>
      );
    }
    if (block.startsWith('**')) {
      const boldEnd = block.indexOf('.**') + 2;
      if (boldEnd > 1) return <p className="text-stone-600 text-base leading-relaxed"><strong className="text-stone-800">{block.substring(2, boldEnd - 1)}</strong>{block.substring(boldEnd + 1)}</p>;
    }
    return <p className="text-stone-600 text-base leading-relaxed">{block}</p>;
  };

  return (
    <div>
      <PageHero
        backLink={{ label: "All Articles", href: "/blog" }}
        title={post.title}
        subtitle={post.description}
        backgroundImage={post.coverImage}
      >
        <div className="flex flex-wrap gap-3">
          <span className="text-[11px] font-semibold text-bronze-400 uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full">{post.category}</span>
          <span className="flex items-center gap-1 text-[11px] text-white/50 uppercase tracking-widest"><Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <span className="flex items-center gap-1 text-[11px] text-white/50 uppercase tracking-widest"><Clock size={12} /> {post.readTime}</span>
        </div>
      </PageHero>

      <Section className="bg-white">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="max-w-3xl mx-auto">
          <div className="space-y-4">
            {post.content.map((block, i) => <React.Fragment key={i}>{renderContent(block)}</React.Fragment>)}
          </div>
          <div className="mt-16 pt-8 border-t border-stone-200">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-bronze-100 flex items-center justify-center text-bronze-600 font-serif text-lg">K</div>
              <div>
                <div className="text-stone-900 font-medium">Khoshà Systems</div>
                <div className="text-stone-400 text-sm">Software Development & AI Transformation | Bangalore</div>
              </div>
            </div>
          </div>
        </motion.div>
      </Section>

      <Section className="bg-stone-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mb-8 text-center">More from Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {blogPosts.filter(p => p.slug !== slug).slice(0, 2).map((related) => (
              <Link key={related.slug} to={`/blog/${related.slug}`} className="group block border border-stone-200 rounded-lg hover:border-bronze-300 hover:shadow-sm transition-all bg-white overflow-hidden">
                <div className="aspect-[21/9] overflow-hidden">
                  <img src={related.coverImage} alt={related.coverAlt} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                </div>
                <div className="p-6">
                  <span className="text-[11px] font-semibold text-bronze-600 uppercase tracking-widest">{related.category}</span>
                  <h3 className="text-lg font-serif text-stone-900 mt-2 mb-2 group-hover:text-bronze-700 transition-colors">{related.title}</h3>
                  <p className="text-stone-500 text-sm line-clamp-2">{related.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      <Contact />
    </div>
  );
};

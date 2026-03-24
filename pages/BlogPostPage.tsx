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
      updateMeta('og:url', `https://khoshasystems.com/blog/${post.slug}`, true);
      updateMeta('og:type', 'article', true);
      updateMeta('article:published_time', post.date, true);
      updateMeta('twitter:title', post.title);
      updateMeta('twitter:description', post.description);

      // Update canonical URL for this blog post
      const canonicalUrl = `https://khoshasystems.com/blog/${post.slug}`;
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (canonical) {
        canonical.href = canonicalUrl;
      } else {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        canonical.href = canonicalUrl;
        document.head.appendChild(canonical);
      }
    }
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  const renderInline = (text: string): React.ReactNode[] => {
    const parts: React.ReactNode[] = [];
    const regex = /\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|\*([^*]+)\*/g;
    let lastIndex = 0;
    let match;
    let key = 0;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
      if (match[1] && match[2]) {
        parts.push(<a key={key++} href={match[2]} className="text-bronze-600 underline hover:text-bronze-800 transition-colors">{match[1]}</a>);
      } else if (match[3]) {
        parts.push(<strong key={key++} className="text-stone-800">{match[3]}</strong>);
      } else if (match[4]) {
        parts.push(<em key={key++}>{match[4]}</em>);
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) parts.push(text.slice(lastIndex));
    return parts;
  };

  const renderParagraph = (para: string, key: number) => {
    const trimmed = para.trim();

    // Bullet list
    const bulletLines = trimmed.split('\n').filter(l => l.trim().startsWith('- '));
    if (bulletLines.length > 0 && bulletLines.length === trimmed.split('\n').filter(l => l.trim()).length) {
      return (
        <ul key={key} className="list-disc list-inside space-y-2 text-stone-600 text-base leading-relaxed">
          {bulletLines.map((line, j) => <li key={j}>{renderInline(line.trim().replace(/^- /, ''))}</li>)}
        </ul>
      );
    }

    // Numbered list
    const numberedLines = trimmed.split('\n').filter(l => /^\d+\.\s/.test(l.trim()));
    if (numberedLines.length > 0 && numberedLines.length === trimmed.split('\n').filter(l => l.trim()).length) {
      return (
        <ol key={key} className="list-decimal list-inside space-y-2 text-stone-600 text-base leading-relaxed">
          {numberedLines.map((line, j) => <li key={j}>{renderInline(line.trim().replace(/^\d+\.\s/, ''))}</li>)}
        </ol>
      );
    }

    // Table
    if (trimmed.includes('|') && trimmed.split('\n').length >= 2) {
      const rows = trimmed.split('\n').filter(l => l.trim().startsWith('|'));
      if (rows.length >= 2) {
        const parseRow = (row: string) => row.split('|').slice(1, -1).map(c => c.trim());
        const isSeparator = (row: string) => /^\|[\s\-:|]+\|$/.test(row.trim());
        const headerRow = parseRow(rows[0]);
        const dataRows = rows.filter(r => !isSeparator(r)).slice(1);
        return (
          <div key={key} className="overflow-x-auto my-4">
            <table className="w-full text-sm text-stone-600 border-collapse">
              <thead>
                <tr className="border-b-2 border-stone-300">
                  {headerRow.map((cell, j) => <th key={j} className="text-left py-2 px-3 font-semibold text-stone-800">{renderInline(cell)}</th>)}
                </tr>
              </thead>
              <tbody>
                {dataRows.map((row, j) => (
                  <tr key={j} className="border-b border-stone-200">
                    {parseRow(row).map((cell, k) => <td key={k} className="py-2 px-3">{renderInline(cell)}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      }
    }

    return <p key={key} className="text-stone-600 text-base leading-relaxed">{renderInline(trimmed)}</p>;
  };

  const renderContent = (block: string) => {
    if (block.startsWith('### ')) return <h3 className="text-xl font-serif text-stone-900 mt-8 mb-3">{renderInline(block.replace('### ', ''))}</h3>;
    if (block.startsWith('## ')) return <h2 className="text-2xl sm:text-3xl font-serif text-stone-900 mt-10 mb-4">{renderInline(block.replace('## ', ''))}</h2>;
    if (block.includes('\n\n')) {
      return (
        <div className="space-y-4">
          {block.split('\n\n').map((para, i) => renderParagraph(para, i))}
        </div>
      );
    }
    return renderParagraph(block, 0);
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

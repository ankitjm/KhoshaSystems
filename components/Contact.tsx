import React, { useState } from 'react';
import { Section } from './Section';
import { ArrowRight, Mail, MapPin, CheckCircle, AlertCircle, Bell, Phone } from 'lucide-react';
import { saveLead } from '../db/turso';
import { sendNotificationEmail, sendCustomerConfirmation } from '../utils/email';
import { registerPushSubscription } from '../utils/pushSubscription';
import { motion } from 'framer-motion';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '', company: '', email: '', goal: 'Web Application', message: ''
  });
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS' | 'ERROR'>('IDLE');
  const [pushStatus, setPushStatus] = useState<'IDLE' | 'GRANTED' | 'DENIED' | 'UNSUPPORTED'>(() => {
    if (typeof window === 'undefined') return 'IDLE';
    if (!('Notification' in window) || !('serviceWorker' in navigator)) return 'UNSUPPORTED';
    if (Notification.permission === 'granted') return 'GRANTED';
    if (Notification.permission === 'denied') return 'DENIED';
    return 'IDLE';
  });

  const enablePush = async () => {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        await registerPushSubscription();
        setPushStatus('GRANTED');
      } else {
        setPushStatus('DENIED');
      }
    } catch (err) {
      console.error('Push error:', err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    const dbResult = await saveLead({ name: formData.name, company: formData.company, email: formData.email, goal: formData.goal, message: formData.message, source: 'Contact Page Form' });
    await sendNotificationEmail({
      to_name: formData.name, to_email: formData.email,
      from_company: formData.company, goal: formData.goal, message: "New Discovery Call Request",
    });
    // Send auto-reply to customer
    await sendCustomerConfirmation({ name: formData.name, email: formData.email, goal: formData.goal });
    if (dbResult.success) {
      // Fire GA4 form_submit event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'form_submit', {
          event_category: 'lead_generation',
          event_label: formData.goal,
          value: 1,
        });
      }
      setStatus('SUCCESS');
      setFormData({ name: '', company: '', email: '', goal: 'Web Application', message: '' });
    } else {
      setStatus('ERROR');
    }
  };

  return (
    <footer id="contact" className="bg-stone-900 relative">
      <Section className="pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block px-3 py-1 bg-bronze-900/20 border border-bronze-700/30 rounded-full mb-5 sm:mb-6">
                <span className="text-[10px] sm:text-[11px] uppercase tracking-widest text-bronze-400 font-medium">Bangalore, India</span>
              </div>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white mb-5 sm:mb-6">
                Let's Build <br/> Something Great.
              </h2>
              <p className="text-stone-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-md">
                Whether you need a web app, a SaaS product, AI integration, or a complete digital transformation — we're ready to build with you.
              </p>
              <div className="space-y-4 sm:space-y-5 mb-8 sm:mb-12">
                <a href="tel:+918884972272" className="flex items-center gap-3 sm:gap-4 text-stone-300 group">
                  <div className="p-2.5 sm:p-3 bg-stone-800 rounded-full group-hover:bg-bronze-600 group-hover:text-white transition-colors">
                    <Phone size={18} />
                  </div>
                  <span className="text-sm sm:text-base hover:text-white transition-colors">+91 888 497 2272</span>
                </a>
                <a href="https://wa.me/918884972272?text=Hi%20Khosha%20Systems%2C%20I%27d%20like%20to%20know%20more%20about%20your%20services." target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 sm:gap-4 text-stone-300 group">
                  <div className="p-2.5 sm:p-3 bg-stone-800 rounded-full group-hover:bg-[#128C7E] group-hover:text-white transition-colors">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </div>
                  <span className="text-sm sm:text-base hover:text-white transition-colors">WhatsApp Us</span>
                </a>
                <a href="mailto:hello@khoshasystems.com" className="flex items-center gap-3 sm:gap-4 text-stone-300 group">
                  <div className="p-2.5 sm:p-3 bg-stone-800 rounded-full group-hover:bg-bronze-600 group-hover:text-white transition-colors">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm sm:text-base hover:text-white transition-colors">hello@khoshasystems.com</span>
                </a>
                <div className="flex items-center gap-3 sm:gap-4 text-stone-300">
                  <div className="p-2.5 sm:p-3 bg-stone-800 rounded-full"><MapPin size={18} /></div>
                  <span className="text-sm sm:text-base">Indiranagar, Bangalore (Bengaluru), Karnataka</span>
                </div>
              </div>

              {pushStatus !== 'UNSUPPORTED' && (
                <div className="mt-6 sm:mt-8">
                  {pushStatus === 'GRANTED' ? (
                    <div className="flex items-center gap-3 text-emerald-400 text-sm">
                      <div className="p-2.5 sm:p-3 bg-emerald-900/30 rounded-full"><Bell size={18} /></div>
                      <span>Push notifications enabled</span>
                    </div>
                  ) : pushStatus === 'DENIED' ? (
                    <div className="flex items-center gap-3 text-stone-500 text-sm">
                      <div className="p-2.5 sm:p-3 bg-stone-800 rounded-full"><Bell size={18} /></div>
                      <span>Notifications blocked — enable in browser settings</span>
                    </div>
                  ) : (
                    <button onClick={enablePush} className="flex items-center gap-3 text-stone-300 group cursor-pointer">
                      <div className="p-2.5 sm:p-3 bg-stone-800 rounded-full group-hover:bg-bronze-600 group-hover:text-white transition-colors">
                        <Bell size={18} />
                      </div>
                      <div>
                        <span className="text-sm sm:text-base group-hover:text-white transition-colors block">Enable Push Notifications</span>
                        <span className="text-xs text-stone-500">Get updates on new products & insights</span>
                      </div>
                    </button>
                  )}
                </div>
              )}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-stone-800/50 p-6 sm:p-8 md:p-10 border border-stone-700/50 rounded-lg"
            >
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-5 sm:mb-6 uppercase tracking-wider">Schedule a Conversation</h3>
              {status === 'SUCCESS' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-900/20 border border-emerald-800/50 p-6 text-center rounded-lg"
                >
                  <CheckCircle className="mx-auto text-emerald-400 mb-4" size={40} />
                  <h4 className="text-white text-lg font-serif mb-2">Thank You</h4>
                  <p className="text-stone-400 text-sm">We'll review your inquiry and respond within 24 hours.</p>
                  <button onClick={() => setStatus('IDLE')} className="mt-4 text-bronze-400 text-sm hover:underline">Send another request</button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-[11px] sm:text-xs uppercase tracking-widest text-stone-500">Name</label>
                      <input id="name" type="text" name="name" required value={formData.name} onChange={handleChange}
                        className="w-full bg-stone-900/80 border border-stone-700 p-3 text-white text-sm rounded-md focus:outline-none focus:border-bronze-500 transition-colors placeholder:text-stone-600"
                        placeholder="Your name" />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="company" className="text-[11px] sm:text-xs uppercase tracking-widest text-stone-500">Company</label>
                      <input id="company" type="text" name="company" required value={formData.company} onChange={handleChange}
                        className="w-full bg-stone-900/80 border border-stone-700 p-3 text-white text-sm rounded-md focus:outline-none focus:border-bronze-500 transition-colors placeholder:text-stone-600"
                        placeholder="Company name" />
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-[11px] sm:text-xs uppercase tracking-widest text-stone-500">Email</label>
                    <input id="email" type="email" name="email" required value={formData.email} onChange={handleChange}
                      className="w-full bg-stone-900/80 border border-stone-700 p-3 text-white text-sm rounded-md focus:outline-none focus:border-bronze-500 transition-colors placeholder:text-stone-600"
                      placeholder="you@company.com" />
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="goal" className="text-[11px] sm:text-xs uppercase tracking-widest text-stone-500">How can we help?</label>
                    <select id="goal" name="goal" value={formData.goal} onChange={handleChange}
                      className="w-full bg-stone-900/80 border border-stone-700 p-3 text-white text-sm rounded-md focus:outline-none focus:border-bronze-500 transition-colors">
                      <option>Web Application</option>
                      <option>Website & Landing Page</option>
                      <option>SaaS Product</option>
                      <option>AI & Automation</option>
                      <option>Mobile Application</option>
                      <option>Digital Transformation</option>
                      <option>Product Demo (RetailerOS / CRM)</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-[11px] sm:text-xs uppercase tracking-widest text-stone-500">Message</label>
                    <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange}
                      className="w-full bg-stone-900/80 border border-stone-700 p-3 text-white text-sm rounded-md focus:outline-none focus:border-bronze-500 transition-colors placeholder:text-stone-600 resize-none"
                      placeholder="Tell us about your project..." />
                  </div>
                  {status === 'ERROR' && (
                    <div className="flex items-center gap-2 text-red-400 text-sm">
                      <AlertCircle size={16} /><span>Something went wrong. Please try again or email us directly.</span>
                    </div>
                  )}
                  <button type="submit" disabled={status === 'SUBMITTING'}
                    className="w-full bg-bronze-600 text-white font-medium uppercase tracking-widest py-3.5 hover:bg-bronze-500 transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 rounded-md text-sm">
                    {status === 'SUBMITTING' ? 'Sending...' : 'Send Inquiry'}
                    {status !== 'SUBMITTING' && <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />}
                  </button>
                </form>
              )}
            </motion.div>
          </div>

          {/* Enhanced Footer */}
          <div className="mt-14 sm:mt-16 pt-8 border-t border-stone-800">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 mb-8">
              <div>
                <h4 className="text-white text-[11px] uppercase tracking-widest font-semibold mb-3">Products</h4>
                <div className="space-y-2">
                  <a href="/products/retaileros" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">RetailerOS</a>
                  <a href="/products/real-estate-crm" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">Real Estate CRM</a>
                  <a href="/products/visitor-management" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">Visitor Management</a>
                  <a href="/tools/roi-calculator" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">ROI Calculator</a>
                </div>
              </div>
              <div>
                <h4 className="text-white text-[11px] uppercase tracking-widest font-semibold mb-3">Services</h4>
                <div className="space-y-2">
                  <a href="/services" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">Web Applications</a>
                  <a href="/services" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">AI Transformation</a>
                  <a href="/services" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">Mobile Development</a>
                  <a href="/services" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">Digital Transformation</a>
                </div>
              </div>
              <div>
                <h4 className="text-white text-[11px] uppercase tracking-widest font-semibold mb-3">Company</h4>
                <div className="space-y-2">
                  <a href="/philosophy" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">About Us</a>
                  <a href="/work" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">Our Work</a>
                  <a href="/blog" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">Blog</a>
                  <a href="/contact" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">Contact</a>
                </div>
              </div>
              <div>
                <h4 className="text-white text-[11px] uppercase tracking-widest font-semibold mb-3">Connect</h4>
                <div className="space-y-2">
                  <a href="tel:+918884972272" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">+91 888 497 2272</a>
                  <a href="https://wa.me/918884972272" target="_blank" rel="noopener noreferrer" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">WhatsApp</a>
                  <a href="mailto:hello@khoshasystems.com" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">Email Us</a>
                  <a href="https://www.linkedin.com/company/khoshasystems" target="_blank" rel="noopener noreferrer" className="block text-stone-500 hover:text-stone-300 text-xs transition-colors">LinkedIn</a>
                  <span className="block text-stone-600 text-xs">Indiranagar, Bangalore</span>
                  <span className="block text-stone-600 text-xs">Karnataka 560038</span>
                </div>
              </div>
            </div>
            <div className="pt-5 border-t border-stone-800 flex flex-col sm:flex-row justify-between items-center text-stone-600 text-[10px] sm:text-[11px] uppercase tracking-wider gap-2">
              <p>&copy; {new Date().getFullYear()} Khoshà Systems. All rights reserved.</p>
              <div className="flex gap-4 sm:gap-6">
                <a href="/sitemap.xml" className="hover:text-stone-400 transition-colors">Sitemap</a>
                <span className="text-stone-700">Software Company, Bangalore (Bengaluru)</span>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </footer>
  );
};

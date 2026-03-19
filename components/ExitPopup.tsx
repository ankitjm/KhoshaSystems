import React, { useState } from 'react';
import { Modal } from './Modal';
import { useExitIntent } from '../hooks/useExitIntent';
import { saveLead } from '../db/turso';
import { sendNotificationEmail, sendCustomerConfirmation } from '../utils/email';
import { ArrowRight, Download, FileText } from 'lucide-react';

export const ExitPopup: React.FC = () => {
  const { isVisible, setIsVisible } = useExitIntent();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'IDLE' | 'SUBMITTING' | 'SUCCESS'>('IDLE');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('SUBMITTING');
    await saveLead({
      name: 'Exit Intent User', company: 'Unknown',
      email: email, goal: 'Download Blueprint', source: 'Exit Popup'
    });
    await sendNotificationEmail({
      to_email: email, message: "Blueprint Download Requested", source: "Exit Intent"
    });
    await sendCustomerConfirmation({
      name: 'there', email: email, goal: 'Blueprint Download'
    });
    setStatus('SUCCESS');
  };

  return (
    <Modal isOpen={isVisible} onClose={() => setIsVisible(false)}>
      {status === 'SUCCESS' ? (
        <div className="text-center py-6 sm:py-8">
          <div className="w-14 h-14 sm:w-16 sm:h-16 bg-bronze-50 rounded-full flex items-center justify-center mx-auto mb-5 sm:mb-6 text-bronze-600">
            <Download size={28} />
          </div>
          <h3 className="text-xl sm:text-2xl font-serif text-stone-900 mb-2">Your Blueprint Is Ready</h3>
          <p className="text-stone-500 text-sm mb-6">Click below to download. We've also sent a copy to your inbox.</p>
          <a
            href="/system-architecture-blueprint.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-sm font-medium uppercase tracking-wider hover:bg-bronze-600 transition-colors rounded-md"
          >
            <FileText size={16} /> Download PDF
          </a>
        </div>
      ) : (
        <div className="text-center">
          <span className="text-[11px] sm:text-xs font-semibold text-bronze-600 uppercase tracking-widest mb-2 block">Before you go</span>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-stone-900 mb-3 sm:mb-4">Get Our Framework</h3>
          <p className="text-stone-500 mb-6 sm:mb-8 text-sm leading-relaxed">
            Download our <span className="text-stone-800 font-medium">"System Architecture Blueprint"</span>—the
            exact methodology we use to modernize enterprise platforms.
          </p>
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full bg-stone-50 border border-stone-200 p-3 text-center text-stone-800 text-sm focus:border-bronze-400 focus:outline-none transition-colors rounded-md placeholder:text-stone-400"
            />
            <button
              type="submit"
              disabled={status === 'SUBMITTING'}
              className="w-full bg-stone-900 text-white font-medium uppercase tracking-widest py-3 hover:bg-bronze-600 transition-colors flex items-center justify-center gap-2 rounded-md text-sm"
            >
              {status === 'SUBMITTING' ? 'Processing...' : 'Download Free'}
              {status === 'IDLE' && <ArrowRight size={14} />}
            </button>
          </form>
        </div>
      )}
    </Modal>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Phone, Mail, CheckCircle2, Sparkles, MessageSquare } from 'lucide-react';
import { ProfileData } from '../types';

interface HireModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileData;
}

export const HireModal: React.FC<HireModalProps> = ({ isOpen, onClose, profile }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectType, setProjectType] = useState('Short-Form Video (Reels/TikTok)');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Open mailto fallback
    const subject = encodeURIComponent(`Project Inquiry: ${projectType} from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nProject Type: ${projectType}\n\nMessage:\n${message}`);
    window.open(`mailto:${profile.email}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-lg w-full bg-[#121316] text-white border border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-neutral-400 hover:text-white p-2 rounded-full hover:bg-neutral-800 transition-colors"
          >
            <X size={18} />
          </button>

          {!isSubmitted ? (
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 text-amber-400 text-xs font-mono mb-1">
                  <Sparkles size={13} />
                  <span>START A COLLABORATION</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-display tracking-tight">
                  Work With Anurag Pal
                </h3>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Available for freelance projects, retainer contracts, and full-time creative roles.
                </p>
              </div>

              {/* Direct Quick Channels */}
              <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                <a
                  href={profile.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 flex items-center justify-center gap-2 transition-colors font-bold"
                >
                  <MessageSquare size={14} />
                  <span>WhatsApp Chat</span>
                </a>

                <a
                  href={`tel:${profile.phone}`}
                  className="p-3 rounded-xl bg-blue-600/20 border border-blue-500/40 text-blue-300 hover:bg-blue-600/30 flex items-center justify-center gap-2 transition-colors font-bold"
                >
                  <Phone size={14} />
                  <span>Direct Call</span>
                </a>
              </div>

              <div className="relative flex items-center justify-center">
                <div className="border-t border-neutral-800 w-full"></div>
                <span className="bg-[#121316] px-3 text-[10px] font-mono text-neutral-500 uppercase tracking-widest absolute">
                  or send an email
                </span>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-3.5 font-mono text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1">Your Name / Company</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan (Studio X)"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex@company.com"
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-amber-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Project Scope</label>
                  <select
                    value={projectType}
                    onChange={(e) => setProjectType(e.target.value)}
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-amber-400 transition-colors"
                  >
                    <option>Short-Form Video (Reels/TikTok)</option>
                    <option>Commercial Campaign Video</option>
                    <option>Motion Graphics & Explainer</option>
                    <option>UI/UX & Web Design</option>
                    <option>Color Grading & Post-Production</option>
                    <option>Full-time Creative Direction Role</option>
                  </select>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1">Message / Timeline</label>
                  <textarea
                    rows={3}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Briefly describe your goals, budget or timeline..."
                    className="w-full px-3 py-2.5 rounded-xl bg-neutral-900 border border-neutral-700 text-white focus:outline-none focus:border-amber-400 transition-colors resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-white text-black font-bold font-mono text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 shadow-lg"
                >
                  <Send size={13} />
                  <span>Submit Inquiry</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 size={48} className="text-emerald-400 mx-auto animate-bounce" />
              <h4 className="text-2xl font-bold font-display text-white">Inquiry Ready!</h4>
              <p className="text-xs text-neutral-300 font-mono max-w-xs mx-auto">
                Your email client has been prepared. You can also message Anurag directly on WhatsApp at any time.
              </p>
              <div className="pt-4 flex justify-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 rounded-xl bg-neutral-800 text-xs font-mono text-neutral-300 hover:text-white"
                >
                  Send Another
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-white text-black text-xs font-mono font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

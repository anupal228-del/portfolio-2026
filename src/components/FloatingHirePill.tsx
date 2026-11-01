import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Phone, X, Check } from 'lucide-react';
import { ProfileData } from '../types';
import { getAssetUrl } from '../utils/assets';

interface FloatingHirePillProps {
  profile: ProfileData;
  onOpenHire: () => void;
}

export const FloatingHirePill: React.FC<FloatingHirePillProps> = ({ profile, onOpenHire }) => {
  const [closed, setClosed] = useState(false);
  const [copied, setCopied] = useState(false);

  if (closed) return null;

  const handleSaveContact = () => {
    navigator.clipboard.writeText(`${profile.name} - ${profile.title}\nEmail: ${profile.email}\nPhone: ${profile.phone}\nWhatsApp: ${profile.whatsapp}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-lg w-[92%] sm:w-auto"
      >
        <div className="bg-[#1A1A1A] text-white px-4 py-2.5 rounded-full shadow-2xl border border-neutral-700/80 flex items-center justify-between gap-3 sm:gap-6 backdrop-blur-xl">
          
          {/* Creator Avatar & Availability */}
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <img
                src={getAssetUrl(profile.photoUrl)}
                alt={profile.name}
                className="w-8 h-8 rounded-full object-cover border border-white/20"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80';
                }}
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-black rounded-full animate-pulse"></span>
            </div>
            
            <div className="text-left font-mono">
              <span className="text-xs font-bold text-white block leading-tight">
                Anurag is available for hire
              </span>
              <span className="text-[10px] text-neutral-400 hidden sm:block">
                Freelance & Full-time 2026
              </span>
            </div>
          </div>

          {/* Action Buttons matching screenshot pill */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenHire}
              className="px-3.5 py-1.5 rounded-full bg-white text-black text-xs font-bold font-mono hover:bg-neutral-200 transition-colors shadow-sm flex items-center gap-1"
            >
              <Sparkles size={11} className="text-amber-600" />
              <span>Hire Me</span>
            </button>

            <button
              onClick={handleSaveContact}
              title="Copy contact card to clipboard"
              className="px-3 py-1.5 rounded-full bg-neutral-800 text-neutral-300 hover:text-white hover:bg-neutral-700 text-xs font-mono transition-colors border border-neutral-700 flex items-center gap-1"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Phone size={11} />}
              <span className="hidden sm:inline">{copied ? 'Saved!' : 'Save'}</span>
            </button>

            <button
              onClick={() => setClosed(true)}
              aria-label="Dismiss pill"
              className="p-1 rounded-full text-neutral-400 hover:text-white transition-colors"
            >
              <X size={14} />
            </button>
          </div>

        </div>
      </motion.div>
    </AnimatePresence>
  );
};

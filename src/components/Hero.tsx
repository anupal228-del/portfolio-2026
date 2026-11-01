import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, ExternalLink, MapPin, Award } from 'lucide-react';
import { ProfileData } from '../types';
import { getAssetUrl } from '../utils/assets';

const InstagramIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const LinkedinIcon: React.FC<{ size?: number; className?: string }> = ({ size = 14, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

interface HeroProps {
  profile: ProfileData;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section id="about" className="relative w-full py-16 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Creator Cutout Portrait matching reference Screenshot 1 */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-5 flex justify-center lg:justify-start"
        >
          <div className="relative group max-w-xs md:max-w-sm">
            {/* Soft Ambient Halo */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-amber-200/30 via-orange-100/20 to-neutral-200/10 dark:from-neutral-800/40 dark:to-neutral-900/10 rounded-full blur-2xl opacity-70 group-hover:opacity-100 transition-opacity"></div>
            
            {/* Cutout Portrait Container */}
            <div className="relative rounded-3xl overflow-hidden border border-[#DCDAD0] dark:border-[#2A2B30] bg-[#ECEAE3] dark:bg-[#16171B] shadow-2xl p-3">
              <img
                src={getAssetUrl(profile.photoUrl)}
                alt={profile.name}
                className="w-full h-auto max-h-[460px] object-cover rounded-2xl filter saturate-[1.05] contrast-[1.02] transition-transform duration-700 group-hover:scale-105"
                onError={(e) => {
                  // Fallback if media path needs fallback
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80';
                }}
              />
              
              {/* Creator Status Tag Overlay */}
              <div className="absolute bottom-6 left-6 right-6 px-3.5 py-2 rounded-xl bg-white/90 dark:bg-[#121316]/90 backdrop-blur-md border border-neutral-200/80 dark:border-neutral-700/80 flex items-center justify-between text-xs font-mono">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  Active / Open for Work
                </span>
                <span className="text-neutral-500 text-[10px]">2026 REEL</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Column: Editorial About Me matching reference Screenshot 1 */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-7 flex flex-col justify-center space-y-6"
        >
          {/* Tag matching `(2) About me` */}
          <div className="flex items-center gap-2">
            <span className="text-sm font-mono text-[#8C887E] dark:text-[#7A7870] font-medium">
              {profile.aboutSectionNumber || '(2) About me'}
            </span>
          </div>

          {/* Huge Display Name */}
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.05em] leading-[0.9] text-[#121316] dark:text-white uppercase font-display">
            {profile.name}
          </h2>

          {/* Bio text matching reference tone and typography */}
          <p className="text-[#3F4045] dark:text-[#B6B5B0] text-sm md:text-base leading-relaxed max-w-xl font-normal">
            {profile.bio}
          </p>

          {/* Metadata Grid matching reference */}
          <div className="pt-4 border-t border-[#DEDBD2] dark:border-[#28292E] grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div>
              <span className="text-[#8E8B82] dark:text-[#6C6A63] block uppercase tracking-wider text-[10px] mb-1">
                Education
              </span>
              <span className="text-[#121316] dark:text-[#E8E8E6] font-medium">
                {profile.education}
              </span>
            </div>

            <div>
              <span className="text-[#8E8B82] dark:text-[#6C6A63] block uppercase tracking-wider text-[10px] mb-1">
                Specialization
              </span>
              <span className="text-[#121316] dark:text-[#E8E8E6] font-medium">
                {profile.specialization}
              </span>
            </div>

            <div>
              <span className="text-[#8E8B82] dark:text-[#6C6A63] block uppercase tracking-wider text-[10px] mb-1">
                Location
              </span>
              <span className="text-[#121316] dark:text-[#E8E8E6] font-medium flex items-center gap-1">
                <MapPin size={12} className="text-neutral-500" />
                {profile.location}
              </span>
            </div>

            <div>
              <span className="text-[#8E8B82] dark:text-[#6C6A63] block uppercase tracking-wider text-[10px] mb-1">
                Direct Contact
              </span>
              <a 
                href={`mailto:${profile.email}`}
                className="text-[#121316] dark:text-[#E8E8E6] font-medium hover:underline block truncate"
              >
                {profile.email}
              </a>
            </div>
          </div>

          {/* Social Links Row */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D5D2C7] dark:border-[#303138] text-xs font-mono text-[#3F4045] dark:text-[#C5C4BE] hover:bg-[#E7E5DC] dark:hover:bg-[#1C1D22] transition-colors"
            >
              <InstagramIcon size={13} />
              <span>Instagram</span>
              <ExternalLink size={10} className="opacity-50" />
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#D5D2C7] dark:border-[#303138] text-xs font-mono text-[#3F4045] dark:text-[#C5C4BE] hover:bg-[#E7E5DC] dark:hover:bg-[#1C1D22] transition-colors"
            >
              <LinkedinIcon size={13} />
              <span>LinkedIn</span>
              <ExternalLink size={10} className="opacity-50" />
            </a>

            <a
              href={profile.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#121316] text-[#F4F3EE] dark:bg-white dark:text-[#0C0D0E] text-xs font-mono font-medium hover:opacity-90 transition-opacity"
            >
              <Phone size={12} />
              <span>WhatsApp Direct</span>
            </a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

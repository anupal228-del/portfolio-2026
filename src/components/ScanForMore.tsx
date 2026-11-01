import React from 'react';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { Sparkles, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PortfolioContent } from '../types';

interface ScanForMoreProps {
  data: PortfolioContent;
  onHire: () => void;
}

export const ScanForMore: React.FC<ScanForMoreProps> = ({ data, onHire }) => {
  const currentUrl = typeof window !== 'undefined' ? window.location.href : 'https://anuragpal.com';

  return (
    <footer className="relative w-full pt-20 pb-28 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#DEDBD2] dark:border-[#26282E]">
      {/* Top Block: Scan for More + QR Code matching reference Screenshot 5 */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center mb-20">
        
        {/* Left Side: Giant Display "Scan for More." */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="md:col-span-7"
        >
          <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.06em] leading-[0.88] text-[#121316] dark:text-white uppercase font-display">
            Scan<br />for<br />More.
          </h2>
          <p className="mt-4 text-xs font-mono text-[#7C7970] dark:text-[#8E8C84] uppercase tracking-widest">
            Mobile Experience • Direct Contact • 2026 Reel
          </p>
        </motion.div>

        {/* Right Side: QR Code Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="md:col-span-5 flex flex-col items-center md:items-end justify-center"
        >
          <div className="p-5 rounded-3xl bg-white dark:bg-[#16171B] border-2 border-[#121316] dark:border-neutral-600 shadow-2xl flex flex-col items-center gap-3">
            <div className="p-2 bg-white rounded-xl">
              <QRCodeSVG
                value={data.profile.whatsapp || currentUrl}
                size={160}
                level="H"
                fgColor="#121316"
                bgColor="#FFFFFF"
              />
            </div>
            <div className="text-center font-mono">
              <span className="text-[11px] font-bold text-[#121316] dark:text-white block uppercase tracking-wider">
                Scan via Smartphone
              </span>
              <span className="text-[9px] text-[#78756C] dark:text-[#908F87]">
                Instant WhatsApp & Portfolio Link
              </span>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Tools & Software Badges matching reference Screenshot 5 */}
      <div className="space-y-12 pt-8 border-t border-[#DEDBD2] dark:border-[#24252A]">
        
        {/* Tools Section */}
        <div>
          <span className="text-xs font-mono text-[#8C887E] dark:text-[#7A7870] uppercase tracking-wider block mb-4">
            Production Tools & Daily Software
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3">
            {data.tools.map((tool) => (
              <div
                key={tool.name}
                className="p-3 rounded-xl bg-[#EAE8DF] dark:bg-[#16171B] border border-[#DDD9CE] dark:border-[#282930] flex flex-col justify-between group hover:border-[#121316] dark:hover:border-white transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-[#121316] dark:bg-white text-white dark:text-black font-black text-xs font-mono flex items-center justify-center mb-2 shadow">
                  {tool.icon}
                </div>
                <div>
                  <h6 className="text-xs font-bold text-[#121316] dark:text-white leading-tight">
                    {tool.name}
                  </h6>
                  <p className="text-[9px] font-mono text-[#6A6861] dark:text-[#8C8A82] mt-0.5">
                    {tool.level}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Creative Fields Badges */}
        <div>
          <span className="text-xs font-mono text-[#8C887E] dark:text-[#7A7870] uppercase tracking-wider block mb-4">
            Creative Disciplines
          </span>
          <div className="flex flex-wrap gap-2.5">
            {data.creativeFields.map((field) => (
              <span
                key={field}
                className="px-4 py-2 rounded-xl bg-[#121316] text-[#F4F3EE] dark:bg-white dark:text-[#0C0D0E] font-bold text-xs tracking-tight shadow-sm"
              >
                {field}
              </span>
            ))}
          </div>
        </div>

        {/* Industry Tags Cloud matching Screenshot 5 */}
        <div>
          <span className="text-xs font-mono text-[#8C887E] dark:text-[#7A7870] uppercase tracking-wider block mb-4">
            Key Competencies & Keywords
          </span>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full border border-[#D5D2C7] dark:border-[#2E2F36] text-[11px] font-mono text-[#4C4D52] dark:text-[#A8A7A0] hover:bg-[#EAE8E0] dark:hover:bg-[#1B1C22] transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

      </div>

      {/* Bottom Copyright & Rights */}
      <div className="mt-16 pt-8 border-t border-[#DEDBD2] dark:border-[#222328] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#78756C] dark:text-[#7C7A72]">
        <p>© 2026 Anurag Pal. All Rights Reserved. Rebuilt inside existing project.</p>
        <div className="flex items-center gap-4">
          <a href="#about" className="hover:underline">Back to Top ↑</a>
          <span>•</span>
          <button onClick={onHire} className="hover:underline font-bold text-[#121316] dark:text-white">
            Available for Hire
          </button>
        </div>
      </div>
    </footer>
  );
};

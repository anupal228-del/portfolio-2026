import React, { useEffect, useState } from 'react';
import { Sun, Moon, Settings, Video, Sparkles, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
  openAdmin: () => void;
  openHire: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  darkMode,
  setDarkMode,
  openAdmin,
  openHire
}) => {
  const [timecode, setTimecode] = useState('00:00:00:00');

  useEffect(() => {
    const updateTimecode = () => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, '0');
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const f = String(Math.floor((now.getMilliseconds() / 1000) * 60)).padStart(2, '0');
      setTimecode(`${h}:${m}:${s}:${f}`);
    };
    const timer = setInterval(updateTimecode, 40);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="relative w-full pt-6 pb-16 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Decorative Corner Marks from Reference */}
      <div className="absolute top-4 left-6 text-xl text-[#8E8B82] dark:text-[#6A6965] select-none font-mono">
        ✻
      </div>
      <div className="absolute top-4 right-6 text-xl text-[#8E8B82] dark:text-[#6A6965] select-none font-mono">
        +
      </div>

      {/* Top Utility Bar */}
      <div className="flex items-center justify-between text-xs font-mono tracking-wider text-[#66645E] dark:text-[#9A9892] mb-12">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span>REC</span>
          <span className="text-[#121316] dark:text-[#FFFFFF] font-bold">{timecode}</span>
          <span className="hidden sm:inline text-neutral-400">| 60 FPS 4K</span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            className="p-2 rounded-full border border-[#D5D3CA] dark:border-[#2D2E33] hover:bg-[#EAE8E1] dark:hover:bg-[#1A1B20] transition-colors"
          >
            {darkMode ? <Sun size={14} className="text-amber-400" /> : <Moon size={14} className="text-[#121316]" />}
          </button>

          <button
            onClick={openAdmin}
            aria-label="Admin CMS settings"
            title="Open Content CMS Editor"
            className="p-2 rounded-full border border-[#D5D3CA] dark:border-[#2D2E33] hover:bg-[#EAE8E1] dark:hover:bg-[#1A1B20] transition-colors"
          >
            <Settings size={14} className="text-[#66645E] dark:text-[#A09E96]" />
          </button>

          <button
            onClick={openHire}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#121316] text-[#F4F3EE] dark:bg-white dark:text-[#0C0D0E] font-medium text-xs tracking-tight hover:opacity-90 transition-opacity"
          >
            <Sparkles size={12} />
            <span>Hire Me</span>
          </button>
        </div>
      </div>

      {/* Centerpiece Hero Title from Reference Screenshot 1 */}
      <div className="flex flex-col items-center justify-center text-center mt-4">
        {/* Monogram Graphic Logo and Title Lockup */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col md:flex-row items-center gap-4 md:gap-7"
        >
          {/* Custom geometric monogram mark matching the reference */}
          <div className="flex items-center select-none">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#121316] dark:bg-white rounded-l-full rounded-r-[40%] flex items-center justify-center text-[#F4F3EE] dark:text-[#0C0D0E] font-black text-2xl tracking-tighter shadow-md">
              A
            </div>
            <div className="w-16 h-16 md:w-20 md:h-20 bg-[#121316] dark:bg-white rounded-r-full rounded-l-[20%] flex items-center justify-center text-[#F4F3EE] dark:text-[#0C0D0E] font-black text-2xl tracking-tighter -ml-2 border-l border-[#F4F3EE]/20 shadow-md">
              P
            </div>
          </div>

          {/* Large Editorial Headline */}
          <div className="text-left">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-[-0.06em] leading-[0.88] text-[#121316] dark:text-white uppercase font-display">
              Creative<br />Portfolio.
            </h1>
          </div>
        </motion.div>

        {/* Subtitle matching reference */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 text-xs md:text-sm font-mono text-[#6A6861] dark:text-[#9E9B93] tracking-wide"
        >
          a showcase of <span className="text-[#121316] dark:text-white font-bold underline decoration-1 underline-offset-4">Anurag Pal</span>'s selected works
        </motion.p>

        {/* Soft Scroll Down Arrow */}
        <motion.a
          href="#about"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, repeat: Infinity, repeatType: 'reverse', duration: 1.2 }}
          className="mt-12 text-[#9A978E] dark:text-[#6E6C64] hover:text-[#121316] dark:hover:text-white transition-colors"
          aria-label="Scroll to About section"
        >
          <ChevronDown size={22} />
        </motion.a>
      </div>

      {/* Floating Right Edge Tab from Reference Screenshot 1 */}
      <div className="hidden lg:flex fixed right-0 top-1/2 -translate-y-1/2 z-40 flex-col items-center">
        <a
          href="#short-content"
          className="bg-[#121316] dark:bg-neutral-900 text-white dark:text-neutral-200 px-2 py-4 rounded-l-md flex flex-col items-center gap-2 shadow-2xl border-l border-t border-b border-neutral-700/50 hover:pl-3 transition-all"
        >
          <span className="text-xs">✻</span>
          <span className="text-[10px] uppercase font-mono tracking-widest writing-mode-vertical rotate-180">
            Showreel 2026
          </span>
        </a>
      </div>
    </header>
  );
};

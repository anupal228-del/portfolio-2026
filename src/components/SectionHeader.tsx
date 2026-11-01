import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  tag?: string;
  id?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ title, tag, id }) => {
  return (
    <div id={id} className="relative w-full pt-24 pb-12 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden">
      {/* Decorative Asterisk & Cross Marks flanking the title */}
      <div className="flex items-center justify-between text-[#8E8B82] dark:text-[#64635E] select-none text-xl mb-4 font-mono">
        <motion.span 
          initial={{ rotate: 0 }}
          whileInView={{ rotate: 90 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          ✻
        </motion.span>
        {tag && (
          <span className="text-[11px] uppercase tracking-widest font-mono text-[#827E74] dark:text-[#76756F]">
            {tag}
          </span>
        )}
        <motion.span 
          initial={{ scale: 0.8 }}
          whileInView={{ scale: 1.2 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          +
        </motion.span>
      </div>

      {/* Giant stylized Category Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center"
      >
        <h2 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.06em] leading-[0.88] text-[#121316] dark:text-white uppercase font-display select-none">
          {title}
        </h2>
      </motion.div>
    </div>
  );
};

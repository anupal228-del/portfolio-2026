import React from 'react';
import { motion } from 'framer-motion';
import { WorkExperienceItem } from '../types';

interface WorkExperienceProps {
  experiences: WorkExperienceItem[];
}

export const WorkExperience: React.FC<WorkExperienceProps> = ({ experiences }) => {
  return (
    <section className="relative w-full py-20 px-6 md:px-12 max-w-7xl mx-auto border-t border-[#DEDBD2] dark:border-[#26282E]">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
        
        {/* Left Side: Large Display Headline matching reference Screenshot 1 */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 lg:sticky lg:top-28"
        >
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.05em] leading-[0.88] text-[#121316] dark:text-white uppercase font-display">
            Work<br />Experience
          </h2>
          <p className="mt-4 text-xs font-mono text-[#827E74] dark:text-[#7A7870] uppercase tracking-widest">
            Timeline / 2022 — 2026
          </p>
        </motion.div>

        {/* Right Side: Numbered Experience Timeline Items */}
        <div className="lg:col-span-7 space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={exp.number + exp.company}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group relative pl-0 pb-10 border-b border-[#E2DFD6] dark:border-[#23242A] last:border-0"
            >
              {/* Number and Company Title */}
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-xs font-mono text-[#8C887E] dark:text-[#6C6A63] font-bold">
                  {exp.number}
                </span>
                <h3 className="text-xl md:text-2xl font-black tracking-tight text-[#121316] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {exp.company}
                </h3>
              </div>

              {/* Role & Date Range */}
              <div className="text-xs font-mono text-[#6A6861] dark:text-[#9A9890] mb-3 flex flex-wrap items-center gap-2">
                <span className="font-semibold text-[#121316] dark:text-neutral-200">{exp.role}</span>
                <span>•</span>
                <span>{exp.dateRange}</span>
              </div>

              {/* Description */}
              <p className="text-sm text-[#44454B] dark:text-[#B0AFA9] leading-relaxed mb-4">
                {exp.description}
              </p>

              {/* Bullet highlights */}
              {exp.highlights && exp.highlights.length > 0 && (
                <ul className="space-y-1.5 pl-3 border-l-2 border-[#D3D0C6] dark:border-[#2F3038]">
                  {exp.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="text-xs text-[#5C5B55] dark:text-[#989791] leading-normal font-mono">
                      — {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

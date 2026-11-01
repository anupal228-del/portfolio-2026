import React from 'react';
import { motion } from 'framer-motion';
import { FileText, ExternalLink, Download, Layers } from 'lucide-react';
import { ProjectItem } from '../types';
import { getAssetUrl } from '../utils/assets';

interface GraphicDesignSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const GraphicDesignSection: React.FC<GraphicDesignSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const graphicProjects = projects.filter((p) => p.category === 'graphic-design');

  return (
    <section className="relative w-full py-12 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Intro Block matching reference Screenshot 4 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        
        {/* Left Side: Statement */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 space-y-5"
        >
          <h3 className="text-4xl md:text-6xl font-black tracking-[-0.05em] leading-[0.92] text-[#121316] dark:text-white uppercase font-display">
            Graphic<br />Design.
          </h3>
          <p className="text-sm md:text-base text-[#47484E] dark:text-[#B6B5AF] leading-relaxed max-w-lg font-normal">
            Designed visual assets, brand identity books, enterprise UI/UX design systems, and viral social carousels with a rigorous focus on typographic hierarchy, grid systems, and brand consistency across digital and print touchpoints.
          </p>
          <div className="flex items-center gap-3 text-xs font-mono text-[#8C887E] dark:text-[#7A7870]">
            <span className="px-2.5 py-1 rounded-md bg-[#E8E6DE] dark:bg-[#1D1E24] text-[#121316] dark:text-neutral-200">
              Figma & Adobe Suite
            </span>
            <span>•</span>
            <span>Design Systems & Brand Identity</span>
          </div>
        </motion.div>

        {/* Right Side: Layered Poster Stack matching reference Screenshot 4 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-6 flex justify-center lg:justify-end"
        >
          <div className="relative group max-w-sm w-full p-4">
            {/* Stacked Layer Cards */}
            <div className="absolute top-0 left-8 right-8 h-32 bg-[#E11D48]/30 dark:bg-[#E11D48]/20 rounded-2xl transform -rotate-3 transition-transform group-hover:-rotate-6"></div>
            <div className="absolute top-2 left-6 right-6 h-32 bg-[#2563EB]/40 dark:bg-[#2563EB]/30 rounded-2xl transform rotate-2 transition-transform group-hover:rotate-4"></div>
            
            {/* Main Featured Showcase Card */}
            <div className="relative z-10 rounded-2xl overflow-hidden bg-white dark:bg-[#181920] border border-[#DDD9CE] dark:border-[#2C2D35] p-4 shadow-2xl">
              <img
                src={getAssetUrl('/media/photos/IMG_2247.JPG')}
                alt="Kanak Design Identity"
                className="w-full h-56 object-cover rounded-xl mb-3"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-mono text-rose-600 dark:text-rose-400 font-bold uppercase">
                    Featured Publication
                  </span>
                  <h4 className="text-base font-bold text-[#121316] dark:text-white">
                    Kanak Brand Book
                  </h4>
                </div>
                <a
                  href={getAssetUrl('/media/Graphic/Kanak.pdf')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-[#121316] text-white dark:bg-white dark:text-black text-xs font-mono flex items-center gap-1.5 hover:opacity-90 transition-opacity"
                >
                  <FileText size={12} />
                  <span>PDF Book</span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Grid of Graphic Design Projects */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {graphicProjects.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group rounded-2xl overflow-hidden bg-[#ECE9E0] dark:bg-[#16171B] border border-[#DDD9CE] dark:border-[#282930] shadow-sm hover:shadow-xl transition-all duration-400 p-4 flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-video rounded-xl overflow-hidden bg-neutral-200 dark:bg-neutral-800 mb-4">
                <img
                  src={getAssetUrl(item.mediaUrl)}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80';
                  }}
                />
                <div className="absolute top-2 left-2">
                  <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-white">
                    {item.badge}
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 font-bold uppercase tracking-wider block">
                  {item.client}
                </span>
                <h4 className="text-lg font-bold text-[#121316] dark:text-white leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-[#525359] dark:text-[#9E9D96] leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#DEDBD2] dark:border-[#24252B] flex items-center justify-between">
              <div className="flex gap-1.5">
                {item.tools.map((tool) => (
                  <span key={tool} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#DDD9CE] dark:bg-[#25262D] text-[#3A3B40] dark:text-[#B6B5B0]">
                    {tool}
                  </span>
                ))}
              </div>

              {item.pdfUrl && (
                <a
                  href={getAssetUrl(item.pdfUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-medium text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <FileText size={12} />
                  <span>View Doc</span>
                  <ExternalLink size={10} />
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

import React from 'react';
import { motion } from 'framer-motion';
import { Play, Sparkles, Layers, Cpu } from 'lucide-react';
import { ProjectItem } from '../types';
import { getAssetUrl } from '../utils/assets';

interface MotionGraphicSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const MotionGraphicSection: React.FC<MotionGraphicSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const motionProjects = projects.filter((p) => p.category === 'motion-graphics');
  const featured = motionProjects[0] || projects[0];

  return (
    <section className="relative w-full py-12 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Intro Block matching reference Screenshot 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        
        {/* Left Side: Editorial Typography & Statement */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 space-y-5"
        >
          <h3 className="text-4xl md:text-6xl font-black tracking-[-0.05em] leading-[0.92] text-[#121316] dark:text-white uppercase font-display">
            Motion<br />Graphic.
          </h3>
          <p className="text-sm md:text-base text-[#47484E] dark:text-[#B6B5AF] leading-relaxed max-w-lg font-normal">
            Created engaging motion visuals for enterprise tech, B2B campaigns, and sports commercials. Combining dynamic kinetic typography, fluid shape animation, technical diagram simplification, and cinematic sound engineering to deliver clear, commanding brand stories.
          </p>
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-[#E8E6DE] dark:bg-[#1D1E24] text-[#121316] dark:text-neutral-200">
              After Effects & Premiere
            </span>
            <span className="px-2.5 py-1 rounded-md bg-[#E8E6DE] dark:bg-[#1D1E24] text-[#121316] dark:text-neutral-200">
              Corporate Keynotes & B2B
            </span>
          </div>
        </motion.div>

        {/* Right Side: Featured Artistic Visual Card from Screenshot 2 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-6 flex justify-center lg:justify-end"
        >
          <div
            onClick={() => onSelectProject(featured)}
            data-cursor="video"
            className="relative cursor-pointer group max-w-sm w-full rounded-3xl overflow-hidden bg-[#181920] border border-[#DDD9CE] dark:border-[#2C2D35] p-3 shadow-2xl"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-black">
              <video
                src={getAssetUrl(featured.mediaUrl)}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 p-4 flex flex-col justify-between">
                <span className="self-start px-2 py-0.5 rounded-full bg-blue-600/80 backdrop-blur-md text-[10px] font-mono text-white tracking-wider">
                  ENTERPRISE TECH
                </span>
                <div>
                  <h4 className="text-base font-bold text-white leading-tight">
                    {featured.title}
                  </h4>
                  <p className="text-xs text-neutral-300 font-mono mt-1">
                    {featured.client} • {featured.role}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Grid of Motion & Commercial Works */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {motionProjects.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onClick={() => onSelectProject(item)}
            data-cursor="video"
            className="group cursor-pointer rounded-2xl overflow-hidden bg-[#ECE9E0] dark:bg-[#16171B] border border-[#DDD9CE] dark:border-[#282930] shadow-sm hover:shadow-xl transition-all duration-400 hover:-translate-y-1 p-3 flex flex-col justify-between"
          >
            {/* Media Container */}
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black mb-3">
              <video
                src={getAssetUrl(item.mediaUrl)}
                loop
                muted
                playsInline
                onMouseEnter={(e) => (e.target as HTMLVideoElement).play().catch(() => {})}
                onMouseLeave={(e) => (e.target as HTMLVideoElement).pause()}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-transparent transition-colors"></div>
              
              <div className="absolute top-2 left-2">
                <span className="px-2 py-0.5 rounded bg-black/60 backdrop-blur-md text-[10px] font-mono text-white">
                  {item.badge}
                </span>
              </div>

              <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Play size={12} className="fill-black ml-0.5" />
              </div>
            </div>

            {/* Info */}
            <div className="space-y-1.5 px-1">
              <span className="text-[10px] font-mono text-blue-600 dark:text-blue-400 font-bold uppercase tracking-wider block">
                {item.client}
              </span>
              <h4 className="text-base font-bold text-[#121316] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors leading-snug">
                {item.title}
              </h4>
              <p className="text-xs text-[#525359] dark:text-[#9E9D96] line-clamp-2">
                {item.description}
              </p>
              <div className="pt-2 flex flex-wrap gap-1.5">
                {item.tools.map((tool) => (
                  <span key={tool} className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#DDD9CE] dark:bg-[#25262D] text-[#3A3B40] dark:text-[#B6B5B0]">
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Volume2, VolumeX, Sparkles, Eye } from 'lucide-react';
import { ProjectItem } from '../types';
import { getAssetUrl } from '../utils/assets';

interface ShortContentSectionProps {
  projects: ProjectItem[];
  onSelectProject: (project: ProjectItem) => void;
}

export const ShortContentSection: React.FC<ShortContentSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const shortContentProjects = projects.filter((p) => p.category === 'short-content');
  const featured = shortContentProjects[0] || projects[0];

  return (
    <section className="relative w-full py-12 px-6 md:px-12 max-w-7xl mx-auto">
      {/* Intro Block matching reference Screenshot 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center mb-16">
        
        {/* Left Side: Editorial Typography & Statement */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-6 space-y-5"
        >
          <h3 className="text-4xl md:text-6xl font-black tracking-[-0.05em] leading-[0.92] text-[#121316] dark:text-white uppercase font-display">
            Short<br />Content.
          </h3>
          <p className="text-sm md:text-base text-[#47484E] dark:text-[#B6B5AF] leading-relaxed max-w-lg font-normal">
            Specializing in high-retention short-form video for Instagram Reels, TikTok, and YouTube Shorts. From instant 3-second visual hooks to rhythmic beat-synced cuts, dynamic kinetic typography, and surgical audio mastering engineered to captivate modern audiences.
          </p>
          <div className="flex items-center gap-3 text-xs font-mono text-[#8C887E] dark:text-[#7A7870]">
            <span className="px-2.5 py-1 rounded-md bg-[#E8E6DE] dark:bg-[#1D1E24] text-[#121316] dark:text-neutral-200">
              9:16 Vertical Ratio
            </span>
            <span>•</span>
            <span>Micro-Pacing & Sound Design</span>
          </div>
        </motion.div>

        {/* Right Side: Stacked Phone Mockup with Live Reel Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="lg:col-span-6 flex justify-center lg:justify-end"
        >
          <div 
            onClick={() => onSelectProject(featured)}
            data-cursor="video"
            className="relative cursor-pointer group max-w-[280px] w-full"
          >
            {/* Layered Stacked Effect from Reference */}
            <div className="absolute -top-3 left-4 right-4 h-12 bg-[#8C5E3C] dark:bg-[#684124] rounded-2xl opacity-60 transform -rotate-1 transition-transform group-hover:-top-4"></div>
            <div className="absolute -top-1.5 left-2 right-2 h-12 bg-[#121316] dark:bg-[#22242C] rounded-2xl opacity-80 transform rotate-1 transition-transform group-hover:-top-2"></div>
            
            {/* Phone Card Frame */}
            <div className="relative z-10 aspect-[9/16] rounded-3xl overflow-hidden bg-black shadow-2xl border-2 border-[#121316] dark:border-neutral-700">
              <video
                src={getAssetUrl(featured.mediaUrl)}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay Gradient & Info */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-5 flex flex-col justify-between">
                <div className="flex justify-between items-center text-white/90 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[10px]">
                    FEATURED REEL
                  </span>
                  <Play size={16} className="fill-white" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-amber-400 font-semibold tracking-wider uppercase block">
                    {featured.client || 'Culinary Series'}
                  </span>
                  <h4 className="text-lg font-bold text-white tracking-tight leading-snug">
                    {featured.title}
                  </h4>
                  <p className="text-xs text-neutral-300 font-mono mt-1">
                    {featured.metrics}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>

      {/* Reel Gallery Grid matching reference layout */}
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-[#DEDBD2] dark:border-[#26282E] pb-3 text-xs font-mono">
          <span className="text-[#848076] dark:text-[#7A7870] uppercase tracking-wider">
            Selected Short-Form Works (9:16)
          </span>
          <span className="text-[#121316] dark:text-neutral-300">
            Hover to Preview • Click to Open Theater
          </span>
        </div>

        {/* 5-Column Responsive Vertical Grid matching reference Screenshot 2 & 3 */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {shortContentProjects.map((item, index) => (
            <VideoCard
              key={item.id}
              project={item}
              index={index}
              onSelect={() => onSelectProject(item)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface VideoCardProps {
  project: ProjectItem;
  index: number;
  onSelect: () => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ project, index, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      onClick={onSelect}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="video"
      className="group relative cursor-pointer rounded-2xl overflow-hidden aspect-[9/16] bg-neutral-900 border border-[#DDD9CE] dark:border-[#2A2B32] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1.5"
    >
      {/* Video Element */}
      <video
        ref={videoRef}
        src={getAssetUrl(project.mediaUrl)}
        loop
        muted
        playsInline
        preload="metadata"
        className="w-full h-full object-cover filter brightness-[0.92] group-hover:brightness-100 transition-all duration-500 group-hover:scale-105"
      />

      {/* Ambient Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 pointer-events-none group-hover:from-black/90 transition-opacity"></div>

      {/* Top Tag */}
      <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between items-center pointer-events-none">
        {project.badge && (
          <span className="px-2 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] font-mono text-white tracking-wider uppercase">
            {project.badge}
          </span>
        )}
        <div className="w-6 h-6 rounded-full bg-black/40 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
          <Play size={10} className="fill-white ml-0.5" />
        </div>
      </div>

      {/* Bottom Content Metadata */}
      <div className="absolute bottom-3 left-3 right-3 pointer-events-none space-y-1">
        <p className="text-[10px] font-mono text-amber-300 font-semibold uppercase tracking-wider truncate">
          {project.client || 'Reel Cut'}
        </p>
        <h5 className="text-xs font-bold text-white leading-tight line-clamp-2">
          {project.title}
        </h5>
        {project.metrics && (
          <p className="text-[9px] font-mono text-neutral-300">
            {project.metrics}
          </p>
        )}
      </div>

      {/* Progress Line on Hover */}
      {isHovered && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 4, ease: 'linear' }}
          className="absolute bottom-0 left-0 right-0 h-1 bg-amber-400 origin-left"
        />
      )}
    </motion.div>
  );
};

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, X, Camera } from 'lucide-react';
import { ProjectItem } from '../types';
import { getAssetUrl } from '../utils/assets';

interface PhotographySectionProps {
  projects: ProjectItem[];
}

export const PhotographySection: React.FC<PhotographySectionProps> = ({ projects }) => {
  const photoProjects = projects.filter((p) => p.category === 'photography');
  const [selectedImage, setSelectedImage] = useState<ProjectItem | null>(null);

  return (
    <section className="relative w-full py-12 px-6 md:px-12 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8 border-b border-[#DEDBD2] dark:border-[#26282E] pb-3 text-xs font-mono">
        <span className="text-[#848076] dark:text-[#7A7870] uppercase tracking-wider flex items-center gap-2">
          <Camera size={14} />
          Editorial & Visual Still Stills
        </span>
        <span className="text-[#121316] dark:text-neutral-300">
          Natural Light • Color Harmonies
        </span>
      </div>

      {/* Grid of Photography matching reference Screenshot 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {photoProjects.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.08 }}
            onClick={() => setSelectedImage(item)}
            className="group relative cursor-pointer rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-900 border border-[#DDD9CE] dark:border-[#26282E] shadow-sm hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
          >
            <img
              src={getAssetUrl(item.mediaUrl)}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter saturate-[1.02]"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=800&q=80';
              }}
            />
            {/* Ambient Dark Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-90 transition-opacity"></div>

            {/* Corner Zoom Icon */}
            <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
              <Maximize2 size={12} />
            </div>

            {/* Info */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <span className="text-[10px] font-mono text-amber-300 uppercase tracking-wider block">
                {item.badge}
              </span>
              <h5 className="text-sm font-bold tracking-tight">
                {item.title}
              </h5>
              <p className="text-[10px] text-neutral-300 font-mono mt-0.5">
                {item.subtitle}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 text-sm font-mono flex items-center gap-1"
              >
                <X size={18} />
                <span>CLOSE</span>
              </button>
              <img
                src={getAssetUrl(selectedImage.mediaUrl)}
                alt={selectedImage.title}
                className="max-h-[80vh] w-auto object-contain rounded-xl shadow-2xl"
              />
              <div className="mt-4 text-center text-white font-mono">
                <h4 className="text-base font-bold">{selectedImage.title}</h4>
                <p className="text-xs text-neutral-400">{selectedImage.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Play, Pause, Volume2, VolumeX, Maximize2, 
  RotateCcw, Sparkles, Layers, Tag, ExternalLink 
} from 'lucide-react';
import { ProjectItem } from '../types';
import { getAssetUrl } from '../utils/assets';

interface CinemaPlayerModalProps {
  project: ProjectItem | null;
  onClose: () => void;
  onHire: () => void;
}

export const CinemaPlayerModal: React.FC<CinemaPlayerModalProps> = ({
  project,
  onClose,
  onHire,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === ' ') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    const dur = videoRef.current.duration || 1;
    setCurrentTime(cur);
    setDuration(dur);
    setProgress((cur / dur) * 100);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!videoRef.current) return;
    const seekTime = (parseFloat(e.target.value) / 100) * (videoRef.current.duration || 1);
    videoRef.current.currentTime = seekTime;
    setProgress(parseFloat(e.target.value));
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const isVertical = project.aspectRatio === '9:16';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative max-w-6xl w-full bg-[#121316] border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col lg:flex-row my-auto max-h-[92vh]"
        >
          {/* Top Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-white text-white hover:text-black flex items-center justify-center backdrop-blur-md transition-colors"
          >
            <X size={20} />
          </button>

          {/* Video Player Side */}
          <div className={`relative flex items-center justify-center bg-black ${isVertical ? 'lg:w-[46%] p-4' : 'lg:w-[65%]'}`}>
            <div className={`relative w-full ${isVertical ? 'max-w-xs aspect-[9/16] rounded-2xl overflow-hidden' : 'aspect-video'}`}>
              <video
                ref={videoRef}
                src={getAssetUrl(project.mediaUrl)}
                autoPlay
                loop
                muted={isMuted}
                playsInline
                onTimeUpdate={handleTimeUpdate}
                onClick={togglePlay}
                className="w-full h-full object-contain cursor-pointer"
              />

              {/* Center Play Overlay when paused */}
              {!isPlaying && (
                <div 
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                >
                  <div className="w-16 h-16 rounded-full bg-white/90 text-black flex items-center justify-center shadow-xl">
                    <Play size={28} className="fill-black ml-1" />
                  </div>
                </div>
              )}

              {/* Bottom Custom Playback Controls */}
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col gap-2 font-mono text-xs text-white">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={progress || 0}
                  onChange={handleSeek}
                  className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
                />
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="hover:text-amber-400 transition-colors">
                      {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <button onClick={toggleMute} className="hover:text-amber-400 transition-colors">
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <span className="text-[11px] text-neutral-300">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <span className="text-[10px] text-neutral-400 tracking-wider">
                    {project.aspectRatio} • 4K ULTRA HD
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Details Drawer */}
          <div className="p-6 md:p-8 lg:w-[35%] flex flex-col justify-between overflow-y-auto space-y-6 border-t lg:border-t-0 lg:border-l border-neutral-800">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono uppercase tracking-wider">
                  {project.badge || project.category}
                </span>
                {project.client && (
                  <span className="text-xs font-mono text-neutral-400">
                    Client: {project.client}
                  </span>
                )}
              </div>

              <h3 className="text-2xl md:text-3xl font-black text-white leading-tight font-display">
                {project.title}
              </h3>

              <div className="text-xs font-mono text-neutral-400">
                <span className="text-white font-bold">Role:</span> {project.role}
              </div>

              <p className="text-sm text-neutral-300 leading-relaxed">
                {project.description}
              </p>

              {project.metrics && (
                <div className="p-3 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between font-mono">
                  <span className="text-xs text-neutral-400">Performance / Metrics</span>
                  <span className="text-xs font-bold text-amber-400">{project.metrics}</span>
                </div>
              )}

              {/* Tools Badges */}
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-2">
                  Software & Gear
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-2 py-1 rounded bg-neutral-800 text-neutral-300 text-[11px] font-mono"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-wider block mb-2">
                  Tags
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono text-neutral-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Actions in Modal */}
            <div className="pt-4 border-t border-neutral-800 flex gap-3">
              <button
                onClick={onHire}
                className="flex-1 py-3 rounded-xl bg-white text-black font-bold text-xs font-mono hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles size={13} className="text-amber-600" />
                <span>Inquire About This Work</span>
              </button>
            </div>
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

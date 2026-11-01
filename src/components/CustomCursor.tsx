import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorText, setCursorText] = useState<string>('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'video'>('default');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 280, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device has fine pointer (mouse), not touch
    const hasPointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasPointer) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveVideo = target.closest('[data-cursor="video"]');
      const interactiveLink = target.closest('a, button, [data-cursor="hover"]');

      if (interactiveVideo) {
        setCursorVariant('video');
        setCursorText('PLAY');
      } else if (interactiveLink) {
        setCursorVariant('hover');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center font-bold font-mono text-[10px] tracking-wider uppercase text-white"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      >
        <motion.div
          animate={{
            width: cursorVariant === 'video' ? 64 : cursorVariant === 'hover' ? 38 : 10,
            height: cursorVariant === 'video' ? 64 : cursorVariant === 'hover' ? 38 : 10,
            backgroundColor: cursorVariant === 'video' ? '#121316' : cursorVariant === 'hover' ? 'rgba(18, 19, 22, 0.15)' : '#121316',
            borderColor: cursorVariant === 'video' ? '#ffffff' : cursorVariant === 'hover' ? '#121316' : 'transparent',
            borderWidth: cursorVariant === 'video' ? 1.5 : cursorVariant === 'hover' ? 1.5 : 0,
          }}
          transition={{ type: 'spring', damping: 20, stiffness: 300 }}
          className="rounded-full flex items-center justify-center shadow-lg backdrop-blur-[2px]"
        >
          {cursorVariant === 'video' && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-[11px] font-black tracking-widest text-white"
            >
              {cursorText}
            </motion.span>
          )}
        </motion.div>
      </motion.div>
    </>
  );
};

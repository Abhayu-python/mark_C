import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({ x: -100, y: -100 });
  const [isPointer, setIsPointer] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Only activate cursor on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement;
      const clickable = !!target?.closest('button, a, input, select, textarea, [role="button"], .cursor-pointer');
      setIsPointer(clickable);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer soft glowing aura */}
      <motion.div
        className="pointer-events-none fixed z-50 rounded-full mix-blend-screen"
        animate={{
          x: mousePosition.x - (isPointer ? 24 : 16),
          y: mousePosition.y - (isPointer ? 24 : 16),
          width: isPointer ? 48 : 32,
          height: isPointer ? 48 : 32,
          backgroundColor: isPointer ? 'rgba(255, 179, 0, 0.25)' : 'rgba(0, 229, 255, 0.18)',
          borderColor: isPointer ? 'rgba(255, 213, 79, 0.6)' : 'rgba(100, 181, 246, 0.4)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.2 }}
        style={{
          borderWidth: '1.5px',
          borderStyle: 'solid',
        }}
        aria-hidden="true"
      />
      {/* Center pinpoint sparkle */}
      <motion.div
        className="pointer-events-none fixed z-50 h-2 w-2 rounded-full bg-amber-300 shadow-[0_0_8px_#fde047]"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isPointer ? 1.4 : 1,
        }}
        transition={{ type: 'spring', stiffness: 900, damping: 35 }}
        aria-hidden="true"
      />
    </>
  );
};

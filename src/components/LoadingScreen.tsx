import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Film, Compass } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState<'black' | 'logo' | 'soundwave' | 'complete'>('black');

  useEffect(() => {
    // Stage 1: Reveal logo
    const t1 = setTimeout(() => {
      setStage('logo');
      soundManager.playIntroFanfare();
    }, 400);

    // Stage 2: Soundwave active
    const t2 = setTimeout(() => {
      setStage('soundwave');
    }, 1200);

    // Progress counter animation
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(100, prev + step);
      });
    }, 80);

    // Stage 3: Complete transition
    const t3 = setTimeout(() => {
      setStage('complete');
      setTimeout(onComplete, 900);
    }, 2800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      {stage !== 'complete' && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070b14] text-white select-none overflow-hidden"
        >
          {/* Subtle cinematic golden sunbeam in center */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,179,0,0.15)_0%,_transparent_60%)] pointer-events-none" />

          {/* Animated background rings */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: [0.8, 1.2, 1], opacity: [0, 0.3, 0.15] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute h-96 w-96 rounded-full border border-amber-400/20 pointer-events-none"
          />
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: [0.6, 1.4, 0.8], opacity: [0, 0.2, 0.1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
            className="absolute h-[500px] w-[500px] rounded-full border border-sky-400/15 pointer-events-none"
          />

          {/* Content Box */}
          <div className="relative z-10 flex flex-col items-center text-center px-6">
            {/* Top decorative badge */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-400/30 text-amber-300 text-xs font-semibold uppercase tracking-widest mb-6"
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
              <span>Animated Cinematic Universe</span>
              <Film className="w-3.5 h-3.5" />
            </motion.div>

            {/* Main Logo Reveal */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
              animate={{ scale: 1, opacity: 1, filter: 'blur(0px)' }}
              transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-1 mb-8"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-display">
                <span className="text-white drop-shadow-[0_4px_24px_rgba(255,255,255,0.25)]">MRK </span>
                <span className="text-shimmer drop-shadow-[0_4px_30px_rgba(255,179,0,0.5)]">C_COLLECTIONS</span>
              </h1>
              <p className="text-sm sm:text-base text-slate-300 tracking-wider font-light flex items-center justify-center gap-2">
                <span>Collecting Characters</span>
                <span className="text-amber-400">•</span>
                <span>Preserving Memories</span>
                <span className="text-amber-400">•</span>
                <span>Creating Worlds</span>
              </p>
            </motion.div>

            {/* Soundwave Visualizer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="flex items-center gap-1.5 h-12 mb-8"
            >
              {[18, 36, 24, 48, 30, 52, 22, 42, 28, 46, 20, 38, 50, 26, 32].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{
                    height: [8, h, 12, h * 0.8, 8],
                    backgroundColor: [
                      '#38bdf8',
                      '#fbbf24',
                      '#f43f5e',
                      '#38bdf8'
                    ]
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.07,
                    ease: 'easeInOut'
                  }}
                  className="w-1.5 rounded-full opacity-85"
                />
              ))}
            </motion.div>

            {/* Progress Bar & percentage */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="w-64 sm:w-80 flex flex-col items-center gap-2"
            >
              <div className="w-full h-1.5 rounded-full bg-slate-800/80 overflow-hidden border border-slate-700/50">
                <motion.div
                  className="h-full bg-gradient-to-r from-sky-400 via-amber-400 to-rose-400 rounded-full"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: 'easeOut' }}
                />
              </div>
              <div className="flex justify-between w-full text-[11px] text-slate-400 font-mono tracking-wider">
                <span className="flex items-center gap-1">
                  <Compass className="w-3 h-3 animate-spin" style={{ animationDuration: '6s' }} />
                  ENTERING WORLD...
                </span>
                <span className="text-amber-300 font-semibold">{progress}%</span>
              </div>
            </motion.div>
          </div>

          {/* Bottom cinematic subtitle */}
          <div className="absolute bottom-8 text-[11px] text-slate-400 tracking-widest font-mono">
            POWERED BY MRK ANIMATION ENGINE 4.0
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

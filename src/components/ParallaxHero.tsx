import React, { useEffect, useState } from 'react';
import { motion, Variants } from 'framer-motion';
import { Compass, Sparkles, ChevronDown } from 'lucide-react';
import { AmbienceMood, CharacterItem } from '../types';
import { soundManager } from '../utils/audio';

interface ParallaxHeroProps {
  mood: AmbienceMood;
  featuredCharacters: CharacterItem[];
  onExplore: () => void;
  onSelectCharacter: (char: CharacterItem) => void;
}

/* ── Letter-by-letter animated text ─────────────────────── */
const AnimatedLetters: React.FC<{
  text: string;
  delay?: number;
  className?: string;
}> = ({ text, delay = 0, className = '' }) => {
  const letterVariants: Variants = {
    hidden: { y: 60, opacity: 0, rotateX: -40 },
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        delay: delay + i * 0.05,
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <span
      className={`inline-flex overflow-hidden ${className}`}
      style={{ perspective: '600px' }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          custom={i}
          variants={letterVariants}
          initial="hidden"
          animate="visible"
          className="inline-block"
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </span>
  );
};

/* ── Typewriter effect ───────────────────────────────────── */
const Typewriter: React.FC<{
  text: string;
  startDelay?: number;
  className?: string;
}> = ({ text, startDelay = 0, className = '' }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 38);
      return () => clearInterval(interval);
    }, startDelay * 1000);
    return () => clearTimeout(timeout);
  }, [text, startDelay]);

  return (
    <span className={className}>
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-[2px] h-[0.9em] bg-amber-300 ml-0.5 align-middle rounded-sm"
      />
    </span>
  );
};

/* ─────────────────────────────────────────────────────────── */

const CHARACTERS = [
  'Tom & Jerry',
  'Motu Patlu',
  'Oggy',
  'Po the Dragon Warrior',
  'Shinchan & Shiro',
];

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  onExplore,
}) => {
  return (
    <section
      id="intro"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 select-none"
    >
      {/* ============================================================ */}
      {/* VIBRANT WALLPAPER HERO PRESENTATION */}
      {/* ============================================================ */}



      {/* Center Grand Title & Hero Overlay Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl p-6 sm:p-8 rounded-3xl bg-slate-950/75 border border-white/25 shadow-2xl backdrop-blur-xl space-y-4"
        >
          {/* Animated badge pill */}
          <motion.div
            initial={{ scale: 0.75, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-mono font-bold"
          >
            <motion.span
              animate={{ rotate: [0, 18, -18, 0] }}
              transition={{ repeat: Infinity, duration: 2.6, ease: 'easeInOut' }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </motion.span>
            <span>THE LIVING CARTOON UNIVERSE</span>
          </motion.div>

          {/* Letter-by-letter title */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight leading-none">
            <span className="text-white block">
              <AnimatedLetters text="MRK" delay={0.55} />
            </span>
            <motion.span
              className="text-shimmer drop-shadow-[0_4px_30px_rgba(255,179,0,0.6)] block"
              whileHover={{
                filter: 'brightness(1.3)',
                textShadow: '0 0 50px rgba(251,191,36,1)',
                transition: { duration: 0.25 },
              }}
            >
              <AnimatedLetters text="C_COLLECTIONS" delay={0.78} />
            </motion.span>
          </h1>

          {/* Typewriter tagline */}
          <p className="text-sm sm:text-base font-light max-w-xl mx-auto leading-relaxed">
            <Typewriter
              text='"Collecting Characters. Preserving Memories. Creating Worlds."'
              startDelay={2.1}
              className="text-slate-200"
            />
          </p>

          {/* Staggered character pills */}
          <motion.div
            className="flex flex-wrap justify-center gap-x-2 gap-y-1"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.13, delayChildren: 3.4 },
              },
            }}
          >
            {CHARACTERS.map((name, idx) => (
              <React.Fragment key={name}>
                <motion.span
                  variants={{
                    hidden: { y: 10, opacity: 0 },
                    visible: {
                      y: 0,
                      opacity: 1,
                      transition: { duration: 0.4, ease: 'easeOut' },
                    },
                  }}
                  className="text-xs text-sky-300 font-mono"
                >
                  {name}
                </motion.span>
                {idx < CHARACTERS.length - 1 && (
                  <motion.span
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: { duration: 0.3 },
                      },
                    }}
                    className="text-xs text-slate-500 font-mono"
                  >
                    •
                  </motion.span>
                )}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Action Button — slide up after character pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <motion.button
              initial={{ y: 22, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 4.2, duration: 0.5, ease: 'easeOut' }}
              whileHover={{
                scale: 1.06,
                boxShadow: '0 0 44px rgba(251,191,36,0.85)',
              }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                soundManager.playPop();
                onExplore();
              }}
              className="px-7 py-3.5 rounded-full font-display font-black text-xs tracking-wider text-slate-950 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] flex items-center gap-2.5 cursor-pointer"
            >
              <Compass className="w-4 h-4" />
              <span>EXPLORE ALL CARTOONS</span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Bottom Scroll Down Banner */}
      <div
        className="relative z-20 flex flex-col items-center justify-center text-center cursor-pointer pt-4"
        onClick={() => {
          soundManager.playPop();
          onExplore();
        }}
      >
        <div className="px-4 py-1.5 rounded-full bg-slate-950/80 border border-white/15 backdrop-blur-md flex items-center gap-2 text-[11px] font-mono tracking-widest text-slate-300 hover:text-amber-300 transition-colors shadow-lg">
          <span>SCROLL DOWN TO VIEW COLLECTION</span>
          <ChevronDown className="w-4 h-4 text-amber-400 animate-bounce" />
        </div>
      </div>
    </section>
  );
};

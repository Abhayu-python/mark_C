import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ChevronDown, Play, Download } from 'lucide-react';
import { AmbienceMood, CharacterItem } from '../types';
import { soundManager } from '../utils/audio';

interface ParallaxHeroProps {
  mood: AmbienceMood;
  featuredCharacters: CharacterItem[];
  onExplore: () => void;
  onDiscoverWorld: () => void;
  onSelectCharacter: (char: CharacterItem) => void;
}

export const ParallaxHero: React.FC<ParallaxHeroProps> = ({
  onExplore,
  onDiscoverWorld,
}) => {
  return (
    <section
      id="intro"
      className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-8 select-none"
    >
      {/* ============================================================ */}
      {/* VIBRANT WALLPAPER HERO PRESENTATION */}
      {/* ============================================================ */}
      
      {/* Top Floating Glass Badge */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex justify-between items-center">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 border border-amber-400/50 shadow-2xl backdrop-blur-md text-amber-300 text-xs font-bold font-mono tracking-wider"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>CINEMATIC ANIMATED UNIVERSE</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-200">MRK C_COLLECTIONS</span>
        </motion.div>

        <motion.a
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          href="/ui.mp4"
          download="MRK_C_Collections_Scene.mp4"
          className="hidden sm:inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-950/80 hover:bg-slate-900 border border-white/20 hover:border-amber-400 text-slate-200 hover:text-amber-300 text-xs font-mono transition-all backdrop-blur-md shadow-xl cursor-pointer"
          title="Download Background Animation"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Save Video</span>
        </motion.a>
      </div>

      {/* Center Grand Title & Hero Overlay Bar */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full my-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-3xl p-6 sm:p-8 rounded-3xl bg-slate-950/75 border border-white/25 shadow-2xl backdrop-blur-xl space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>THE LIVING CARTOON UNIVERSE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-black font-display tracking-tight text-white leading-none">
            MRK <span className="text-shimmer drop-shadow-[0_4px_30px_rgba(255,179,0,0.6)]">C_COLLECTIONS</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-200 font-light max-w-xl mx-auto leading-relaxed">
            "Collecting Characters. Preserving Memories. Creating Worlds."
            <br />
            <span className="text-xs text-sky-300 font-mono">
              Tom & Jerry • Motu Patlu • Oggy • Po the Dragon Warrior • Shinchan & Shiro
            </span>
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
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

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                soundManager.playChime();
                onDiscoverWorld();
              }}
              className="px-6 py-3.5 rounded-full font-display font-bold text-xs tracking-wider text-white bg-slate-900/90 hover:bg-slate-800 border border-white/20 hover:border-amber-400 shadow-xl backdrop-blur-md flex items-center gap-2 transition-colors cursor-pointer"
            >
              <Play className="w-3.5 h-3.5 text-amber-400" />
              <span>DISCOVER WORLD MAP</span>
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

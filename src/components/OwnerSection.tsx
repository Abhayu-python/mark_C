import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Award, Film, Rocket, Heart, Star, Palette } from 'lucide-react';
import { CREATOR_TIMELINE } from '../data/characters';
import { soundManager } from '../utils/audio';

export const OwnerSection: React.FC = () => {
  const getTimelineIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-amber-400" />;
      case 'Film':
        return <Film className="w-5 h-5 text-sky-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-emerald-400" />;
      case 'Rocket':
      default:
        return <Rocket className="w-5 h-5 text-rose-400" />;
    }
  };

  return (
    <section
      id="owner"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none overflow-hidden"
    >
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 right-10 w-96 h-96 rounded-full bg-amber-500/10 blur-[130px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-widest font-mono"
        >
          <Award className="w-3.5 h-3.5" />
          <span>CHAPTER 04 : THE CURATOR</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white"
        >
          MEET THE <span className="text-shimmer">CREATOR</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 font-light leading-relaxed"
        >
          The imagination, creative philosophy, and evolving roadmap behind MRK C_COLLECTIONS.
        </motion.p>
      </div>

      {/* Profile & Manifesto 2-Column Banner */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-24">
        
        {/* Left: Cinematic Creator Portrait Box */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 relative"
        >
          <div className="relative rounded-3xl overflow-hidden glass-card border border-white/20 p-4 shadow-2xl bg-gradient-to-b from-slate-900 via-slate-900/80 to-slate-950">
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 bg-gradient-to-tr from-amber-500/20 via-sky-500/10 to-transparent blur-xl pointer-events-none" />

            {/* Stylized Visual Portrait Frame */}
            <div className="relative aspect-[4/4.5] w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/10 flex items-center justify-center">
              {/* Creator Stylized Graphic Avatar */}
              <div className="w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/30 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-8 text-center relative">
                
                {/* Decorative glowing initial badge */}
                <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-400 via-orange-400 to-yellow-300 p-1 shadow-[0_0_40px_rgba(251,191,36,0.5)] mb-4">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center text-4xl font-black font-display text-white">
                    MK
                  </div>
                </div>

                <h3 className="text-2xl font-black font-display text-white">
                  MARK C.
                </h3>
                <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase mt-1">
                  Lead Animator & World Architect
                </span>
                
                <p className="text-xs text-slate-300 font-light mt-3 max-w-xs">
                  "Every frame is a canvas for nostalgia, and every character holds a forgotten memory waiting to spark."
                </p>

                {/* Bottom Signature Prop Badges */}
                <div className="mt-4 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-white/10 text-[10px] font-mono text-slate-300">
                    ★ Visual Direction
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-slate-800/80 border border-white/10 text-[10px] font-mono text-slate-300">
                    ★ 3D Worldbuilding
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Quick Metric Card */}
            <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/10 text-center">
              <div className="p-2 rounded-xl bg-slate-950/60">
                <span className="block text-lg font-black text-amber-400 font-display">8+</span>
                <span className="text-[10px] text-slate-400 font-mono">Years Crafting</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60">
                <span className="block text-lg font-black text-sky-400 font-display">500+</span>
                <span className="text-[10px] text-slate-400 font-mono">Concept Art</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-950/60">
                <span className="block text-lg font-black text-emerald-400 font-display">11</span>
                <span className="text-[10px] text-slate-400 font-mono">Masterpieces</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right: Creator Manifesto & Vision */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 space-y-6"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
              <Heart className="w-3.5 h-3.5 fill-amber-400" />
              <span>THE VISION & ORIGIN STORY</span>
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-white leading-tight">
              Building a Sanctuary for Animated Imagination
            </h3>
          </div>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            Growing up mesmerized by classic animated features, stop-motion shorts, and hand-drawn Saturday morning cartoons, I realized that true cartoon artistry is more than entertainment—it is a visual language of boundless joy and uninhibited optimism.
          </p>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed">
            <strong className="text-amber-300 font-semibold">MRK C_COLLECTIONS</strong> was created to honor those feelings. By merging cinematic lighting, layered parallax depth, and tactile digital interactions, this website serves as a permanent digital museum where every character lives, breathes, and invites you into their world.
          </p>

          {/* Philosophy Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-sky-400 font-bold font-display text-sm">
                <Palette className="w-4 h-4" />
                <span>Playful Sincerity</span>
              </div>
              <p className="text-xs text-slate-300 font-light">
                No cynical shortcuts—every silhouette, color palette, and backstory is poured with genuine love for the medium.
              </p>
            </div>

            <div className="p-4 rounded-2xl glass-card border border-white/10 space-y-1">
              <div className="flex items-center gap-2 text-amber-400 font-bold font-display text-sm">
                <Star className="w-4 h-4" />
                <span>Cinematic Immersion</span>
              </div>
              <p className="text-xs text-slate-300 font-light">
                Transforming traditional flat image galleries into living 3D environments with dynamic sunlight and sound.
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ============================================================ */}
      {/* ANIMATED CREATOR TIMELINE (THE IDEA -> THE FUTURE) */}
      {/* ============================================================ */}
      <div className="space-y-12">
        <div className="text-center space-y-2">
          <span className="text-xs font-mono font-bold text-sky-400 tracking-wider uppercase">
            THE CHRONOLOGICAL SAGA
          </span>
          <h3 className="text-3xl sm:text-4xl font-black font-display text-white">
            THE JOURNEY FROM INK TO UNIVERSE
          </h3>
        </div>

        {/* Timeline Path Container */}
        <div className="relative">
          {/* Vertical Glowing Line on Desktop */}
          <div className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-1 bg-gradient-to-b from-amber-400 via-sky-400 to-rose-400 opacity-30" />

          <div className="space-y-10 md:space-y-16">
            {CREATOR_TIMELINE.map((milestone, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative flex flex-col md:flex-row items-center ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Content Card Side */}
                  <div className="w-full md:w-1/2 p-2 sm:p-4">
                    <div
                      className={`glass-card rounded-3xl p-6 sm:p-8 border border-white/15 hover:border-amber-400/40 transition-all shadow-xl space-y-3 ${
                        isEven ? 'md:ml-auto md:text-left' : 'md:mr-auto md:text-left'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-400/30 text-[10px] font-bold font-mono tracking-wider">
                          {milestone.phase}
                        </span>
                        <span className="text-xs font-mono text-slate-400 font-bold">
                          {milestone.year}
                        </span>
                      </div>

                      <h4 className="text-xl sm:text-2xl font-black font-display text-white">
                        {milestone.title}
                      </h4>

                      <p className="text-xs sm:text-sm text-slate-300 font-light leading-relaxed">
                        {milestone.description}
                      </p>

                      <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs text-amber-300 font-mono">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                        <span className="italic">{milestone.highlight}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Node Indicator */}
                  <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-slate-950 border-2 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.6)] items-center justify-center z-10">
                    {getTimelineIcon(milestone.iconName)}
                  </div>

                  {/* Empty Spacer Side */}
                  <div className="hidden md:block w-1/2" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

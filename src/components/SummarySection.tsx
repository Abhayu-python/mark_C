import React from 'react';
import { motion } from 'framer-motion';
import { Film, Sparkles, Heart, Compass, Palette, Smile } from 'lucide-react';
import { soundManager } from '../utils/audio';

export const SummarySection: React.FC = () => {
  const storyPillars = [
    {
      icon: <Palette className="w-6 h-6 text-amber-400" />,
      title: 'Cinematic 3D Animation',
      subtitle: 'Living Environments',
      description: 'Every scene is crafted with dynamic sunlight, layered atmospheric depth, and playful physics that celebrate traditional cartoon heritage.',
      gradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
      border: 'border-amber-400/30'
    },
    {
      icon: <Smile className="w-6 h-6 text-sky-400" />,
      title: 'Original Character Lore',
      subtitle: 'Personalities with Heart',
      description: 'Beyond visual designs, each character features distinct traits, backstories, quirks, and quotes—from mischievous street explorers to celestial dreamweavers.',
      gradient: 'from-sky-500/20 via-blue-500/10 to-transparent',
      border: 'border-sky-400/30'
    },
    {
      icon: <Film className="w-6 h-6 text-rose-400" />,
      title: 'Timeless Cartoon Nostalgia',
      subtitle: 'Preserving Memories',
      description: 'A dedicated sanctuary honoring the golden eras of Saturday morning cartoons, rubberhose animations, anime epics, and modern CGI masterpieces.',
      gradient: 'from-rose-500/20 via-pink-500/10 to-transparent',
      border: 'border-rose-400/30'
    },
    {
      icon: <Compass className="w-6 h-6 text-emerald-400" />,
      title: 'Interactive Worldbuilding',
      subtitle: 'Endless Exploration',
      description: 'Explore the village pathways, clock towers, and enchanted forests through dynamic day/night cycles, responsive cards, and soundscapes.',
      gradient: 'from-emerald-500/20 via-teal-500/10 to-transparent',
      border: 'border-emerald-400/30'
    }
  ];

  return (
    <section
      id="summary"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none overflow-hidden"
    >
      {/* Background Decorative Glow Blobs */}
      <div className="absolute top-1/3 left-10 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl pointer-events-none -z-10" />

      {/* Header Section */}
      <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-widest font-mono"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>CHAPTER 01 : THE MANIFESTO</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white"
        >
          THE WORLD OF <br className="hidden sm:inline" />
          <span className="text-shimmer">MRK C_COLLECTIONS</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-xl text-slate-300 font-light leading-relaxed pt-2"
        >
          An interactive sanctuary born from the magic of hand-drawn sketches, cinematic lighting, and a lifelong devotion to animated storytelling.
        </motion.p>
      </div>

      {/* Main Story Narrative Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16 items-stretch">
        
        {/* Large Feature Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-7 glass-card rounded-3xl p-8 sm:p-10 border border-white/15 bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-slate-950/90 flex flex-col justify-between relative overflow-hidden"
        >
          {/* Subtle warm sun gradient accent in corner */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-amber-400 tracking-wider">
              <Heart className="w-4 h-4 fill-amber-400 text-amber-400" />
              <span>THE CREATIVE PHILOSOPHY</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold font-display text-white leading-snug">
              What if an animated film opening wasn’t just watched, but explored?
            </h3>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed font-light">
              MRK C_COLLECTIONS is more than a digital gallery. It represents the living intersection where vibrant 3D rendering meets nostalgic 2D whimsy. Here, every character possesses an origin, an era, and a playful heartbeat designed to spark childlike wonder.
            </p>
          </div>

          <div className="pt-8 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono border-t border-white/10 mt-8">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>Dynamic Camera Parallax</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <span>Procedural Soundscapes</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Living Sunlight Cycles</span>
            </div>
          </div>
        </motion.div>

        {/* Small Feature Card: Stats Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="lg:col-span-5 glass-card rounded-3xl p-8 sm:p-10 border border-white/15 bg-gradient-to-bl from-slate-900/90 to-slate-950/90 flex flex-col justify-between"
        >
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold text-sky-400 tracking-wider uppercase">
              GALLERY DIMENSIONS
            </span>
            <h4 className="text-2xl font-bold font-display text-white">
              Curated Across Decades of Style
            </h4>
            <p className="text-slate-300 text-sm font-light leading-relaxed">
              From retro rubberhose jazz slapstick to futuristic cyberpunk anime champions, discover diverse silhouettes united in one cinematic village.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-white/10">
            <div className="p-3 rounded-2xl bg-slate-800/50 border border-white/5">
              <div className="text-2xl font-black text-amber-400 font-display">8+</div>
              <div className="text-[11px] text-slate-400 font-mono">Artistic Genres</div>
            </div>
            <div className="p-3 rounded-2xl bg-slate-800/50 border border-white/5">
              <div className="text-2xl font-black text-sky-400 font-display">44+</div>
              <div className="text-[11px] text-slate-400 font-mono">Character Quirks</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* 4 Story Pillars Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {storyPillars.map((pillar, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            onMouseEnter={() => soundManager.playHover()}
            className={`glass-card rounded-3xl p-6 border ${pillar.border} bg-gradient-to-b ${pillar.gradient} hover:-translate-y-1.5 transition-all flex flex-col justify-between`}
          >
            <div>
              <div className="w-12 h-12 rounded-2xl bg-slate-800/90 border border-white/10 flex items-center justify-center mb-4 shadow-lg">
                {pillar.icon}
              </div>
              <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block mb-1">
                {pillar.subtitle}
              </span>
              <h4 className="text-lg font-bold font-display text-white mb-2">
                {pillar.title}
              </h4>
              <p className="text-xs text-slate-300 font-light leading-relaxed">
                {pillar.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>PILLAR 0{idx + 1}</span>
              <span className="text-amber-400">✦</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

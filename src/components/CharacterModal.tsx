import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Sparkles, Volume2, Shield, Zap, Smile, Brain, ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { CharacterItem } from '../types';
import { soundManager } from '../utils/audio';

interface CharacterModalProps {
  character: CharacterItem | null;
  allCharacters: CharacterItem[];
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onClose: () => void;
  onSelectCharacter: (char: CharacterItem) => void;
}

export const CharacterModal: React.FC<CharacterModalProps> = ({
  character,
  allCharacters,
  isFavorite,
  onToggleFavorite,
  onClose,
  onSelectCharacter,
}) => {
  // Handle escape key and body overflow
  useEffect(() => {
    if (!character) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [character, allCharacters]);

  if (!character) return null;

  const currentIndex = allCharacters.findIndex((c) => c.id === character.id);
  const handlePrev = () => {
    soundManager.playSwoosh();
    const prevIdx = (currentIndex - 1 + allCharacters.length) % allCharacters.length;
    onSelectCharacter(allCharacters[prevIdx]);
  };
  const handleNext = () => {
    soundManager.playSwoosh();
    const nextIdx = (currentIndex + 1) % allCharacters.length;
    onSelectCharacter(allCharacters[nextIdx]);
  };

  const statConfig = [
    { label: 'Energy', value: character.stats.energy, icon: <Zap className="w-3.5 h-3.5 text-amber-400" />, color: 'from-amber-400 to-yellow-500' },
    { label: 'Charm', value: character.stats.charm, icon: <Smile className="w-3.5 h-3.5 text-rose-400" />, color: 'from-rose-400 to-pink-500' },
    { label: 'Wit', value: character.stats.wit, icon: <Brain className="w-3.5 h-3.5 text-sky-400" />, color: 'from-sky-400 to-cyan-500' },
    { label: 'Bravery', value: character.stats.bravery, icon: <Shield className="w-3.5 h-3.5 text-emerald-400" />, color: 'from-emerald-400 to-teal-500' },
  ];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-8 select-none">
        
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-xl"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-3xl bg-slate-900 border border-white/20 shadow-2xl p-4 sm:p-8 flex flex-col glass-card"
        >
          {/* Top Floating Controls */}
          <div className="flex items-center justify-between pb-4 sm:pb-6 border-b border-white/10">
            {/* Prev / Next Character Nav */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-white/10 transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
                title="Previous character (Left arrow)"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">PREV</span>
              </button>
              <button
                onClick={handleNext}
                className="p-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-200 hover:text-white border border-white/10 transition-colors flex items-center gap-1 text-xs font-mono cursor-pointer"
                title="Next character (Right arrow)"
              >
                <span className="hidden sm:inline">NEXT</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Favorite & Close Action */}
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => onToggleFavorite(character.id, e)}
                className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                  isFavorite
                    ? 'bg-rose-500/90 border-rose-300 text-white shadow-[0_0_15px_rgba(244,63,94,0.5)]'
                    : 'bg-slate-800/80 border-white/10 text-slate-300 hover:text-white'
                }`}
                title={isFavorite ? 'Saved to Favorites' : 'Add to Favorites'}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
              </button>

              <button
                onClick={onClose}
                className="p-2.5 rounded-full bg-slate-800/80 hover:bg-rose-500/20 text-slate-300 hover:text-rose-300 border border-white/10 hover:border-rose-400/40 transition-colors cursor-pointer"
                title="Close modal (Esc)"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body: 2 Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 pt-6 items-start">
            
            {/* Left Column: Big Artwork & Voice Line */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/5] bg-slate-950 border border-white/15 shadow-2xl group">
                <img
                  src={character.image}
                  alt={character.name}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />

                {/* Accent Tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className="px-3.5 py-1 rounded-full text-xs font-bold font-mono uppercase text-white shadow-lg backdrop-blur-md border border-white/20"
                    style={{ backgroundColor: `${character.accentColor}CC` }}
                  >
                    {character.category}
                  </span>
                </div>

                {/* Origin Pin */}
                <div className="absolute bottom-4 inset-x-4">
                  <div className="text-[11px] font-mono text-amber-300 font-semibold uppercase tracking-wider flex items-center gap-1.5 mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>LORE LOCATION</span>
                  </div>
                  <p className="text-xs text-slate-200 font-medium truncate">
                    {character.loreOrigin}
                  </p>
                </div>
              </div>

              {/* Interactive Voice Line Player Simulation */}
              <div className="p-4 rounded-2xl bg-slate-950/70 border border-amber-400/30 flex items-center gap-3">
                <button
                  onClick={() => soundManager.playChime()}
                  className="p-3 rounded-xl bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-400/40 transition-colors flex-shrink-0 cursor-pointer"
                  title="Play Character Voice Sound Effect"
                >
                  <Volume2 className="w-5 h-5 animate-pulse" />
                </button>
                <div className="text-xs italic text-amber-200/90 font-light leading-snug">
                  {character.voiceLine}
                </div>
              </div>
            </div>

            {/* Right Column: Character Details, Lore, Stats & Trivia */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Header Title & Era */}
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mb-1">
                  <span>{character.era}</span>
                  {character.year && <span className="text-amber-400">• {character.year}</span>}
                  {character.signatureProp && (
                    <span className="text-sky-300 hidden sm:inline">• Item: {character.signatureProp}</span>
                  )}
                </div>
                <h2 className="text-3xl sm:text-4xl font-black font-display text-white">
                  {character.name}
                </h2>
                <p className="text-sm font-bold text-sky-300 font-display">
                  {character.alias}
                </p>
              </div>

              {/* Personality Tags */}
              <div className="flex flex-wrap gap-1.5">
                {character.personalityTraits.map((trait, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/90 border border-white/10 text-slate-200 font-mono"
                  >
                    ★ {trait}
                  </span>
                ))}
              </div>

              {/* Story Section */}
              <div className="space-y-2">
                <h3 className="text-xs font-mono font-bold text-amber-400 tracking-wider uppercase flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>CHARACTER CHRONICLE</span>
                </h3>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {character.story}
                </p>
              </div>

              {/* Stats Progress Bars */}
              <div className="space-y-3 p-4 rounded-2xl bg-slate-950/60 border border-white/10">
                <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                  HERO ATTRIBUTES & POWER METRICS
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {statConfig.map((stat, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between text-xs font-mono text-slate-300">
                        <span className="flex items-center gap-1.5">
                          {stat.icon}
                          <span>{stat.label}</span>
                        </span>
                        <span className="font-bold text-white">{stat.value}%</span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${stat.value}%` }}
                          transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: 'easeOut' }}
                          className={`h-full rounded-full bg-gradient-to-r ${stat.color}`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interesting Facts Bullet Points */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-mono font-bold text-sky-400 tracking-wider uppercase">
                  UNSOLVED SECRETS & TRIVIA
                </h4>
                <ul className="space-y-2">
                  {character.interestingFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 font-light leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 flex-shrink-0" />
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

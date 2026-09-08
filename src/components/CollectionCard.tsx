import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight, Eye, Star } from 'lucide-react';
import { CharacterItem } from '../types';
import { soundManager } from '../utils/audio';

interface CollectionCardProps {
  character: CharacterItem;
  isFavorite: boolean;
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelect: (character: CharacterItem) => void;
}

export const CollectionCard: React.FC<CollectionCardProps> = ({
  character,
  isFavorite,
  onToggleFavorite,
  onSelect,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rX = ((y - centerY) / centerY) * -8;
    const rY = ((x - centerX) / centerX) * 8;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseEnter = () => {
    soundManager.playHover();
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className="perspective-1000 h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={() => {
          soundManager.playPop();
          onSelect(character);
        }}
        style={{
          transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: 'preserve-3d',
        }}
        className="relative group rounded-3xl overflow-hidden glass-card border border-white/20 p-4 sm:p-5 cursor-pointer transition-all duration-300 ease-out hover:border-amber-400/60 hover:shadow-glow-card flex flex-col justify-between h-full bg-slate-950/80 backdrop-blur-xl"
      >
        {/* Dynamic ambient color glow beneath card */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-500 rounded-3xl pointer-events-none blur-xl -z-10"
          style={{ backgroundColor: character.accentColor }}
        />

        {/* Artwork Container (Large & Cinematic) */}
        <div className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-slate-950 mb-4 border border-white/10">
          <img
            src={character.image}
            alt={character.name}
            loading="lazy"
            className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-600 ease-out"
          />

          {/* Cinematic Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-85 group-hover:opacity-65 transition-opacity duration-300" />

          {/* Top Badges */}
          <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
            {/* Category Tag */}
            <span
              className="px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-bold tracking-wider font-mono uppercase backdrop-blur-md border border-white/20 shadow-lg text-white"
              style={{ backgroundColor: `${character.accentColor}E6` }}
            >
              {character.category}
            </span>

            {/* Favorite Heart Button */}
            <button
              onClick={(e) => onToggleFavorite(character.id, e)}
              className={`p-2 rounded-full backdrop-blur-md border transition-all duration-300 hover:scale-115 shadow-lg ${
                isFavorite
                  ? 'bg-rose-500 text-white border-rose-300 shadow-[0_0_15px_rgba(244,63,94,0.7)]'
                  : 'bg-slate-900/80 border-white/20 text-slate-300 hover:text-white hover:bg-slate-900'
              }`}
              title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
              aria-label={`Favorite ${character.name}`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white' : ''}`} />
            </button>
          </div>

          {/* Featured Badge */}
          {character.featured && (
            <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-[10px] font-black font-mono tracking-wider shadow-lg">
              <Star className="w-3 h-3 fill-slate-950 text-slate-950" />
              <span>SPOTLIGHT</span>
            </div>
          )}

          {/* Quick Hover Inspect Overlay */}
          <div className="absolute inset-0 z-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-slate-950/40 backdrop-blur-[2px]">
            <span className="px-4 py-2 rounded-full bg-white text-slate-950 text-xs font-black font-display tracking-wider flex items-center gap-2 shadow-2xl transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <Eye className="w-3.5 h-3.5" />
              <span>EXPLORE LORE</span>
            </span>
          </div>
        </div>

        {/* Card Content */}
        <div className="space-y-2.5 px-1 flex-1 flex flex-col justify-between">
          <div>
            {/* Era / Year */}
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-1">
              <span className="truncate max-w-[150px]">{character.era}</span>
              {character.year && <span className="text-amber-400 font-bold">{character.year}</span>}
            </div>

            {/* Name & Alias */}
            <h3 className="text-xl sm:text-2xl font-black font-display text-white group-hover:text-amber-300 transition-colors line-clamp-1">
              {character.name}
            </h3>
            <p className="text-xs sm:text-sm text-sky-300/90 font-semibold line-clamp-1 mt-0.5">
              {character.alias}
            </p>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300/90 font-light line-clamp-2 leading-relaxed mt-2">
              {character.description}
            </p>
          </div>

          {/* Footer of Card: Tags & Explore Action */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs mt-3">
            <div className="flex items-center gap-1.5 overflow-hidden">
              {character.tags.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="px-2.5 py-0.5 rounded-md bg-slate-800/90 text-[10px] text-slate-300 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 text-amber-400 font-bold font-display group-hover:translate-x-1 transition-transform">
              <span className="text-xs uppercase tracking-wider">VIEW LORE</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

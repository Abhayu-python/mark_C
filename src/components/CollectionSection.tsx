import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Sparkles, Heart, SlidersHorizontal } from 'lucide-react';
import { CharacterItem } from '../types';
import { CATEGORIES } from '../data/characters';
import { CollectionCard } from './CollectionCard';
import { soundManager } from '../utils/audio';

interface CollectionSectionProps {
  characters: CharacterItem[];
  favorites: string[];
  onToggleFavorite: (id: string, e: React.MouseEvent) => void;
  onSelectCharacter: (character: CharacterItem) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({
  characters,
  favorites,
  onToggleFavorite,
  onSelectCharacter,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'name' | 'energy' | 'bravery'>('featured');
  const [onlyFavorites, setOnlyFavorites] = useState<boolean>(false);

  // Filter and sort items
  const filteredCharacters = useMemo(() => {
    return characters
      .filter((char) => {
        // Category filter (checks category, tags, and era for smooth matching)
        if (selectedCategory !== 'ALL') {
          const cat = selectedCategory.toLowerCase();
          const matchCat = char.category.toLowerCase() === cat;
          const matchTag = char.tags.some((t) => t.toLowerCase() === cat);
          const matchEra = char.era.toLowerCase().includes(cat);
          if (!matchCat && !matchTag && !matchEra) {
            return false;
          }
        }
        // Favorites only filter
        if (onlyFavorites && !favorites.includes(char.id)) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = char.name.toLowerCase().includes(query);
          const matchAlias = char.alias.toLowerCase().includes(query);
          const matchDesc = char.description.toLowerCase().includes(query);
          const matchTag = char.tags.some((t) => t.toLowerCase().includes(query));
          return matchName || matchAlias || matchDesc || matchTag;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'name') return a.name.localeCompare(b.name);
        if (sortBy === 'energy') return b.stats.energy - a.stats.energy;
        if (sortBy === 'bravery') return b.stats.bravery - a.stats.bravery;
        // Default: featured first, then original order
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
        return 0;
      });
  }, [characters, selectedCategory, onlyFavorites, favorites, searchQuery, sortBy]);

  const handleCategoryClick = (catId: string) => {
    soundManager.playPop();
    setSelectedCategory(catId);
    if (catId === 'FAVORITES') {
      setOnlyFavorites(true);
    } else {
      setOnlyFavorites(false);
    }
  };

  return (
    <section
      id="collection"
      className="relative py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none"
    >
      {/* Background Decorative glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-amber-500/5 blur-[120px] pointer-events-none -z-10" />

      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-slate-900/85 border border-amber-400/40 text-amber-300 text-xs font-bold tracking-widest font-mono shadow-lg"
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>CHAPTER 02 : THE VAULT</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white"
        >
          THE <span className="text-shimmer">COLLECTION</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 font-light leading-relaxed"
        >
          Explore the iconic cartoon legends. Click any character to enter their world and discover full stories, facts, and voice quotes.
        </motion.p>
      </div>

      {/* Control Bar: Large Category Tabs, Search, and Sort */}
      <div className="space-y-6 mb-14">
        {/* LARGE PROMINENT CATEGORY TABS */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 overflow-x-auto py-2 px-1 scrollbar-none scroll-smooth">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat.id && !onlyFavorites;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                onMouseEnter={() => soundManager.playHover()}
                className={`relative px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-extrabold font-display tracking-wider whitespace-nowrap transition-all duration-300 shadow-lg cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 shadow-[0_0_25px_rgba(251,191,36,0.5)] scale-105 border-2 border-amber-300'
                    : 'bg-slate-900/90 border border-white/20 text-slate-200 hover:text-white hover:bg-slate-800/95 hover:border-amber-400/50 hover:scale-102'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}

          {/* Favorites Tab Button */}
          <button
            onClick={() => {
              soundManager.playPop();
              setOnlyFavorites(!onlyFavorites);
            }}
            className={`flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-2xl text-sm sm:text-base font-extrabold font-display border transition-all cursor-pointer whitespace-nowrap shadow-lg ${
              onlyFavorites
                ? 'bg-rose-500 text-white border-rose-300 shadow-[0_0_25px_rgba(244,63,94,0.5)] scale-105'
                : 'bg-slate-900/90 border-white/20 text-slate-200 hover:text-white hover:border-rose-400/50'
            }`}
          >
            <Heart className={`w-4 h-4 ${onlyFavorites ? 'fill-white text-white' : 'text-rose-400'}`} />
            <span>Favorites ({favorites.length})</span>
          </button>
        </div>

        {/* Secondary Control Bar: Search & Sort Dropdown */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-3.5 rounded-2xl glass-card border border-white/15">
          {/* Search Box */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by character, alias, or tag..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-950/80 border border-white/15 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 transition-colors"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 bg-slate-950/80 px-4 py-2.5 rounded-xl border border-white/15 text-xs sm:text-sm text-slate-300 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span className="font-mono text-slate-400">Sort by:</span>
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-transparent text-white font-display font-semibold focus:outline-none cursor-pointer"
            >
              <option value="featured" className="bg-slate-900 text-white">Featured</option>
              <option value="name" className="bg-slate-900 text-white">Name (A-Z)</option>
              <option value="energy" className="bg-slate-900 text-white">Highest Energy</option>
              <option value="bravery" className="bg-slate-900 text-white">Highest Bravery</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count Banner */}
      <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-slate-400 mb-8 px-1">
        <span>SHOWING {filteredCharacters.length} OF {characters.length} CHARACTERS</span>
        {searchQuery && <span>FILTERED BY: "{searchQuery}"</span>}
      </div>

      {/* 3 CARDS IN ROW 1, AND 3 CARDS DIRECTLY AFTER IN ROW 2 */}
      {filteredCharacters.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9 items-stretch"
        >
          <AnimatePresence>
            {filteredCharacters.map((char) => (
              <CollectionCard
                key={char.id}
                character={char}
                isFavorite={favorites.includes(char.id)}
                onToggleFavorite={onToggleFavorite}
                onSelect={onSelectCharacter}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="py-16 text-center rounded-3xl glass-card border border-white/10 p-8 space-y-4 max-w-md mx-auto"
        >
          <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center mx-auto text-amber-400">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold font-display text-white">No Characters Found</h3>
          <p className="text-sm text-slate-300 font-light">
            Try adjusting your search query or switching category filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('ALL');
              setOnlyFavorites(false);
            }}
            className="px-6 py-2.5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs font-display tracking-wider cursor-pointer shadow-lg"
          >
            Reset Filters
          </button>
        </motion.div>
      )}
    </section>
  );
};

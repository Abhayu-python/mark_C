import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Sparkles, Sun, Sunset, Moon, Info, Compass, ArrowRight } from 'lucide-react';
import { AmbienceMood } from '../types';
import { soundManager } from '../utils/audio';

interface Hotspot {
  id: string;
  name: string;
  tag: string;
  x: number; // percentage
  y: number; // percentage
  description: string;
  lore: string;
  associatedHero: string;
  weatherEffect: string;
}

const VILLAGE_HOTSPOTS: Hotspot[] = [
  {
    id: 'clocktower',
    name: 'The Golden Clocktower & Village Square',
    tag: 'TOWN CENTER',
    x: 50,
    y: 35,
    description: 'The towering heart of Sunnybrook that chimes melodic cartoon tunes every hour on the hour.',
    lore: 'Constructed by legendary cartoon architects using sun-charged bronze gears. The clock chime can awaken sleepy flowers across the entire valley.',
    associatedHero: 'Sparky & The Village Crew',
    weatherEffect: 'Warm Sunshine & Golden Rays'
  },
  {
    id: 'tinkerlane',
    name: 'Tinker’s Lane & Inventor Alley',
    tag: 'INNOVATION DISTRICT',
    x: 22,
    y: 52,
    description: 'A bustling workshop lane where mechanical gears, bouncy springs, and steam inventions fill the air.',
    lore: 'Home to Professor Nutbolt and Pip & Barnaby. Every door handle in this alley has a 50% chance of dispensing fresh bubblegum.',
    associatedHero: 'Professor Gizmo Nutbolt',
    weatherEffect: 'Steam Puffs & Cogwheel Sparks'
  },
  {
    id: 'zephyrdock',
    name: 'Zephyr Airship Sky-Docks',
    tag: 'SKY HARBOR',
    x: 78,
    y: 28,
    description: 'Floating wooden moorings where cloud-sailing ships anchor before venturing beyond the horizon.',
    lore: 'Where Captain Oliver Quill launches his legendary skyward expeditions into uncharted rainbow squalls.',
    associatedHero: 'Captain Oliver Quill',
    weatherEffect: 'Gentle Cloud Mist'
  },
  {
    id: 'starlightpier',
    name: 'Starlight Canopy Pier',
    tag: 'MYSTIC GROVE',
    x: 82,
    y: 68,
    description: 'An enchanted wooden walkway suspended above glowing lotus ponds where constellation weavers gather.',
    lore: 'Under starlight, the waters reflect constellations that have not yet appeared in the mortal night sky.',
    associatedHero: 'Aria of the Starlight Isles',
    weatherEffect: 'Iridescent Luminescence'
  },
  {
    id: 'bakerybistro',
    name: 'The Sizzling Skillet Bistro',
    tag: 'GOURMET CORNER',
    x: 32,
    y: 72,
    description: 'A cozy cobblestone corner bistro where magical stews cause joyful laughter and levitation.',
    lore: 'Chef Gumbo tests his latest dessert inventions here. The aroma of cinnamon stars can be smelled from 3 miles away.',
    associatedHero: 'Chef Gumbo & The Flavor Sprites',
    weatherEffect: 'Cinnamon Aroma Spores'
  }
];

interface WorldExplorerProps {
  mood: AmbienceMood;
  onSelectMood: (mood: AmbienceMood) => void;
  onOpenCharacterByName: (name: string) => void;
}

export const WorldExplorer: React.FC<WorldExplorerProps> = ({
  mood,
  onSelectMood,
  onOpenCharacterByName,
}) => {
  const [activeHotspot, setActiveHotspot] = useState<Hotspot>(VILLAGE_HOTSPOTS[0]);

  const handleHotspotClick = (spot: Hotspot) => {
    soundManager.playPop();
    setActiveHotspot(spot);
  };

  const getMoodSkyGradient = () => {
    switch (mood) {
      case 'sunset':
        return 'from-[#2b0c3d] via-[#b83b5e] to-[#f08a5d]';
      case 'night':
        return 'from-[#030712] via-[#0b132b] to-[#1c2541]';
      case 'day':
      default:
        return 'from-[#0284c7] via-[#38bdf8] to-[#fde047]';
    }
  };

  return (
    <section
      id="explorer"
      className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto select-none overflow-hidden"
    >
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/80 border border-amber-400/30 text-amber-300 text-xs font-semibold tracking-widest font-mono"
        >
          <Compass className="w-3.5 h-3.5" />
          <span>CHAPTER 03 : INTERACTIVE MAP</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-4xl sm:text-6xl font-black font-display tracking-tight text-white"
        >
          DISCOVER THE <span className="text-shimmer">WORLD</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-base sm:text-lg text-slate-300 font-light leading-relaxed"
        >
          The living cartoon valley is divided into storied districts. Click the glowing pins on the village panorama to inspect historical hotspots.
        </motion.p>
      </div>

      {/* Main Interactive Stage */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Column: Interactive Map Canvas View */}
        <div className="lg:col-span-8 relative rounded-3xl overflow-hidden glass-card border border-white/20 shadow-2xl min-h-[420px] sm:min-h-[500px] flex flex-col justify-between p-6">
          
          {/* Background Animated Sky Canvas for Map */}
          <div className={`absolute inset-0 bg-gradient-to-b ${getMoodSkyGradient()} transition-colors duration-1000 -z-20`} />
          <div className="absolute inset-0 sun-rays opacity-50 -z-15 pointer-events-none" />

          {/* Stylized Village Silhouette on Map */}
          <div className="absolute bottom-0 inset-x-0 h-48 opacity-40 pointer-events-none -z-10">
            <svg viewBox="0 0 800 200" className="w-full h-full" preserveAspectRatio="none">
              <polygon points="0,200 120,120 250,160 400,90 550,170 700,110 800,200" fill="#0f172a" />
              <circle cx="400" cy="90" r="18" fill="#fbbf24" opacity="0.6" />
            </svg>
          </div>

          {/* Top Bar on Map: Atmosphere Switcher */}
          <div className="relative z-10 flex items-center justify-between flex-wrap gap-2 pb-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/70 border border-white/15 text-xs font-mono text-white backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>SUNNYBROOK VALLEY OVERVIEW</span>
            </div>

            {/* Atmosphere Mood Selector Pills */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-950/80 border border-white/15 backdrop-blur-md">
              <button
                onClick={() => {
                  soundManager.playChime();
                  onSelectMood('day');
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  mood === 'day'
                    ? 'bg-amber-400 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sun className="w-3.5 h-3.5" />
                <span>Day</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playChime();
                  onSelectMood('sunset');
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  mood === 'sunset'
                    ? 'bg-orange-500 text-white shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Sunset className="w-3.5 h-3.5" />
                <span>Sunset</span>
              </button>
              <button
                onClick={() => {
                  soundManager.playChime();
                  onSelectMood('night');
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer ${
                  mood === 'night'
                    ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>Night</span>
              </button>
            </div>
          </div>

          {/* Hotspots on Map Container */}
          <div className="relative flex-1 w-full my-4">
            {VILLAGE_HOTSPOTS.map((spot) => {
              const isSelected = activeHotspot.id === spot.id;
              return (
                <div
                  key={spot.id}
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                  }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <motion.button
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleHotspotClick(spot)}
                    className={`relative p-2.5 sm:p-3 rounded-full shadow-2xl transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-300/40 shadow-[0_0_25px_#f59e0b]'
                        : 'bg-slate-900/90 text-amber-300 border border-amber-400/40 hover:bg-slate-800'
                    }`}
                    aria-label={spot.name}
                  >
                    <MapPin className={`w-4 h-4 sm:w-5 sm:h-5 ${isSelected ? 'animate-bounce' : ''}`} />

                    {/* Pulse wave ring */}
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full bg-amber-400 animate-ping opacity-40 -z-10" />
                    )}
                  </motion.button>

                  {/* Hotspot Floating Label */}
                  <div
                    className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 whitespace-nowrap px-2.5 py-1 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider backdrop-blur-md border pointer-events-none transition-all ${
                      isSelected
                        ? 'bg-amber-400 text-slate-950 border-amber-300 opacity-100 shadow-md scale-105'
                        : 'bg-slate-950/80 text-slate-300 border-white/10 opacity-70'
                    }`}
                  >
                    {spot.tag}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom Hint */}
          <div className="relative z-10 text-[11px] font-mono text-slate-300/80 flex items-center gap-1.5">
            <Info className="w-3.5 h-3.5 text-amber-400" />
            <span>Select any pinpoint above to inspect district lore and notable inhabitants.</span>
          </div>
        </div>

        {/* Right Column: Hotspot Lore Detail Panel */}
        <div className="lg:col-span-4 glass-card rounded-3xl p-6 sm:p-8 border border-white/20 flex flex-col justify-between relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35 }}
              className="space-y-6"
            >
              <div>
                <span className="px-3 py-1 rounded-full text-[10px] font-bold font-mono tracking-wider bg-amber-500/20 text-amber-300 border border-amber-400/30">
                  {activeHotspot.tag}
                </span>
                <h3 className="text-2xl font-extrabold font-display text-white mt-3">
                  {activeHotspot.name}
                </h3>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
                  DISTRICT SUMMARY
                </h4>
                <p className="text-sm text-slate-300 font-light leading-relaxed">
                  {activeHotspot.description}
                </p>
              </div>

              <div className="space-y-2 p-4 rounded-2xl bg-slate-950/60 border border-white/10">
                <h4 className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>LOCAL ANCIENT LORE</span>
                </h4>
                <p className="text-xs text-slate-300 font-light leading-relaxed">
                  {activeHotspot.lore}
                </p>
              </div>

              <div className="space-y-2 border-t border-white/10 pt-4 text-xs">
                <div className="flex items-center justify-between text-slate-400 font-mono">
                  <span>ASSOCIATED HERO:</span>
                  <span className="text-amber-300 font-bold">{activeHotspot.associatedHero}</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 font-mono">
                  <span>ATMOSPHERE:</span>
                  <span className="text-sky-300">{activeHotspot.weatherEffect}</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => {
                  soundManager.playPop();
                  onOpenCharacterByName(activeHotspot.associatedHero);
                }}
                className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-bold font-display text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <span>EXPLORE HERO PROFILE</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

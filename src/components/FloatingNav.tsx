import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX, Sun, Sunset, Moon, Menu, X, Sparkles } from 'lucide-react';
import { AmbienceMood } from '../types';
import { soundManager } from '../utils/audio';

interface FloatingNavProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  mood: AmbienceMood;
  onToggleMood: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

interface NavItem {
  id: string;
  label: string;
  number: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'intro', label: 'INTRO', number: '01' },
  { id: 'summary', label: 'SUMMARY', number: '02' },
  { id: 'collection', label: 'LIST', number: '03' },
  { id: 'explorer', label: 'WORLD', number: '04' },
  { id: 'contact', label: 'CONTACT', number: '05' },
];

export const FloatingNav: React.FC<FloatingNavProps> = ({
  activeSection,
  onNavigate,
  mood,
  onToggleMood,
  isMuted,
  onToggleMute,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    soundManager.playPop();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const getMoodIcon = () => {
    switch (mood) {
      case 'sunset':
        return <Sunset className="w-4 h-4 text-orange-400" />;
      case 'night':
        return <Moon className="w-4 h-4 text-cyan-300" />;
      case 'day':
      default:
        return <Sun className="w-4 h-4 text-amber-400" />;
    }
  };

  const getMoodLabel = () => {
    switch (mood) {
      case 'sunset':
        return 'Sunset';
      case 'night':
        return 'Starlight';
      case 'day':
      default:
        return 'Sunny Day';
    }
  };

  return (
    <>
      {/* Desktop Floating Capsule - Positioned in the upper-middle / center area */}
      <header
        className={`fixed z-40 transition-all duration-500 ease-out left-1/2 -translate-x-1/2 ${
          isScrolled 
            ? 'top-4' 
            : 'top-7 sm:top-10 md:top-12'
        } hidden md:block w-auto max-w-5xl`}
      >
        <motion.nav
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="glass-capsule rounded-full px-5 sm:px-6 py-3 sm:py-3.5 flex items-center gap-2 sm:gap-3 border border-white/25 shadow-2xl backdrop-blur-2xl bg-slate-950/80"
          role="navigation"
          aria-label="Main Navigation"
        >
          {/* Brand mini icon badge */}
          <button
            onClick={() => handleItemClick('intro')}
            className="flex items-center gap-2.5 pl-2 pr-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/10 border border-amber-400/40 text-amber-300 hover:text-amber-200 transition-colors group cursor-pointer"
            title="MRK C_COLLECTIONS Home"
          >
            <div className="w-6 h-6 rounded-full bg-amber-400 flex items-center justify-center text-xs font-black text-slate-950 shadow-[0_0_12px_#f59e0b] group-hover:scale-110 transition-transform">
              M
            </div>
            <span className="text-xs sm:text-sm font-extrabold font-display tracking-wider text-slate-200 group-hover:text-white hidden lg:inline">
              MRK C
            </span>
          </button>

          {/* Navigation Items list */}
          <div className="flex items-center gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  onMouseEnter={() => soundManager.playHover()}
                  className={`relative px-4 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider font-display transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                    isActive
                      ? 'text-white'
                      : 'text-slate-300 hover:text-white hover:-translate-y-0.5'
                  }`}
                >
                  {/* Active highlight capsule background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 shadow-[0_0_22px_rgba(245,158,11,0.55)] -z-10"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}

                  {/* Hover background */}
                  {!isActive && (
                    <div className="absolute inset-0 rounded-full bg-white/0 hover:bg-white/10 transition-colors -z-10" />
                  )}

                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="h-5 w-px bg-white/20 mx-1" />

          {/* Ambience Mood Toggle Button */}
          <button
            onClick={() => {
              soundManager.playChime();
              onToggleMood();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-800/90 hover:bg-slate-700 border border-white/15 text-xs sm:text-sm font-semibold text-slate-200 hover:text-white transition-all hover:scale-105 cursor-pointer shadow-sm"
            title={`Current Lighting: ${getMoodLabel()} (Click to cycle)`}
          >
            {getMoodIcon()}
            <span className="hidden xl:inline text-xs font-mono capitalize">{mood}</span>
          </button>

          {/* Sound Mute/Unmute Toggle */}
          <button
            onClick={() => {
              onToggleMute();
            }}
            onMouseEnter={() => soundManager.playHover()}
            className={`p-2.5 rounded-full border transition-all hover:scale-105 cursor-pointer ${
              isMuted
                ? 'bg-slate-800/70 border-slate-700 text-slate-400 hover:text-slate-200'
                : 'bg-amber-500/20 border-amber-400/40 text-amber-300 hover:bg-amber-500/30 shadow-[0_0_15px_rgba(251,191,36,0.35)]'
            }`}
            title={isMuted ? 'Unmute Cartoon Sounds' : 'Mute Sound Effects'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        </motion.nav>
      </header>

      {/* Mobile Floating Button & Menu */}
      <div className="md:hidden fixed top-4 right-4 z-40">
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-3.5 rounded-full bg-slate-900/90 border border-amber-400/40 text-amber-300 shadow-xl backdrop-blur-md flex items-center justify-center cursor-pointer hover:scale-105 transition-transform"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden fixed inset-x-4 top-18 z-40 p-5 rounded-3xl bg-slate-950/95 border border-white/20 backdrop-blur-2xl shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <span className="font-display font-bold text-white tracking-wider">MRK C_COLLECTIONS</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={onToggleMood}
                  className="p-2 rounded-full bg-slate-800 text-slate-200 border border-white/10"
                >
                  {getMoodIcon()}
                </button>
                <button
                  onClick={onToggleMute}
                  className="p-2 rounded-full bg-slate-800 text-slate-200 border border-white/10"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-amber-400" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center justify-between p-3 rounded-2xl text-xs font-bold font-display tracking-wider transition-all ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 shadow-lg'
                      : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] opacity-60 font-mono">{item.number}</span>
                </button>
              ))}
            </div>

            <div className="text-center pt-2">
              <span className="text-[11px] text-amber-300/80 font-mono flex items-center justify-center gap-1">
                <Sparkles className="w-3 h-3" />
                Living Cartoon Universe
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

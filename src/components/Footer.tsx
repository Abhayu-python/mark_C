import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, Heart } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollToTop = () => {
    soundManager.playPop();
    onNavigate('intro');
  };

  const navLinks = [
    { label: 'Intro', id: 'intro' },
    { label: 'Summary', id: 'summary' },
    { label: 'Collection', id: 'collection' },
    { label: 'World Map', id: 'explorer' },
    { label: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="relative border-t border-white/10 bg-slate-950/90 pt-16 pb-12 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="space-y-2 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-400 to-orange-400 flex items-center justify-center text-slate-950 font-black font-display text-sm shadow-[0_0_15px_#f59e0b]">
                M
              </div>
              <h2 className="text-xl sm:text-2xl font-black font-display tracking-tight text-white">
                MRK <span className="text-shimmer">C_COLLECTIONS</span>
              </h2>
            </div>
            <p className="text-xs text-slate-400 font-light max-w-sm">
              "Collecting characters. Preserving memories. Creating worlds."
            </p>
          </div>

          {/* Quick Nav Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  soundManager.playPop();
                  onNavigate(link.id);
                }}
                className="text-slate-400 hover:text-amber-300 transition-colors uppercase tracking-wider cursor-pointer"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Back to Top Floating Button */}
          <div>
            <motion.button
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={scrollToTop}
              className="p-3 rounded-full bg-slate-900 hover:bg-amber-400 hover:text-slate-950 text-amber-400 border border-amber-400/30 transition-all shadow-lg flex items-center gap-2 text-xs font-mono cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">TOP</span>
            </motion.button>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
          <div>
            © 2026 MRK C_COLLECTIONS. All rights reserved.
          </div>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
            <span>for cartoon lovers worldwide.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

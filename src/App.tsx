import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { LoadingScreen } from './components/LoadingScreen';
import { FloatingNav } from './components/FloatingNav';
import { ParallaxHero } from './components/ParallaxHero';
import { SummarySection } from './components/SummarySection';
import { CollectionSection } from './components/CollectionSection';
import { WorldExplorer } from './components/WorldExplorer';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { CharacterModal } from './components/CharacterModal';
import { CustomCursor } from './components/CustomCursor';
import { CHARACTERS_DATA } from './data/characters';
import { AmbienceMood, CharacterItem } from './types';
import { soundManager } from './utils/audio';

export const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState('intro');
  const [mood, setMood] = useState<AmbienceMood>('day');
  const [isMuted, setIsMuted] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterItem | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis for buttery-smooth cinematic scrolling
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  // Favorites state persisted in localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('mrk_c_favorites');
      return saved ? JSON.parse(saved) : ['c1', 'c2', 'c4'];
    } catch {
      return ['c1', 'c2', 'c4'];
    }
  });

  const handleToggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playChime();
    setFavorites((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem('mrk_c_favorites', JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  };

  const handleToggleMood = () => {
    setMood((prev) => {
      if (prev === 'day') return 'sunset';
      if (prev === 'sunset') return 'night';
      return 'day';
    });
  };

  const handleToggleMute = () => {
    const nextMuted = soundManager.toggleMute();
    setIsMuted(nextMuted);
  };

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(el, { offset: -20, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleOpenCharacterByName = (name: string) => {
    const found = CHARACTERS_DATA.find((c) => c.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(c.name.toLowerCase()));
    if (found) {
      setSelectedCharacter(found);
    }
  };

  // Scroll spy for active navbar section
  useEffect(() => {
    const sectionIds = ['intro', 'summary', 'collection', 'explorer', 'contact'];
    
    const handleScroll = () => {
      const scrollY = window.scrollY + 250;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const section = document.getElementById(sectionIds[i]);
        if (section && section.offsetTop <= scrollY) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#070b14] text-slate-100 overflow-x-hidden">
      {/* ============================================================ */}
      {/* CINEMATIC VIDEO BACKGROUND (ui.mp4) */}
      {/* ============================================================ */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-center filter brightness-[0.85] contrast-[1.05]"
        >
          <source src="/ui.mp4" type="video/mp4" />
        </video>

        {/* Soft atmospheric overlay for reading contrast and theme mood */}
        <div className={`absolute inset-0 transition-colors duration-700 ${
          mood === 'sunset' 
            ? 'bg-gradient-to-b from-[#2b0c3d]/45 via-[#070b14]/60 to-[#070b14]/85' 
            : mood === 'night'
            ? 'bg-gradient-to-b from-[#030712]/65 via-[#070b14]/70 to-[#070b14]/90'
            : 'bg-gradient-to-b from-[#070b14]/25 via-[#070b14]/50 to-[#070b14]/80'
        }`} />
        
        {/* Soft edge vignette */}
        <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.7)]" />
      </div>

      {/* Cinematic Initial Loading Screen */}
      {isLoading && (
        <LoadingScreen onComplete={() => setIsLoading(false)} />
      )}

      {/* Custom Spring Cursor (Desktop) */}
      <CustomCursor />

      {/* Floating Glass Capsule Navigation Bar */}
      <FloatingNav
        activeSection={activeSection}
        onNavigate={handleNavigate}
        mood={mood}
        onToggleMood={handleToggleMood}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main Page Layout */}
      <main className="relative z-10 flex flex-col w-full">
        {/* Hero Section */}
        <ParallaxHero
          mood={mood}
          featuredCharacters={CHARACTERS_DATA}
          onExplore={() => handleNavigate('collection')}
          onDiscoverWorld={() => handleNavigate('explorer')}
          onSelectCharacter={(char) => setSelectedCharacter(char)}
        />

        {/* Summary Story Section */}
        <SummarySection />

        {/* Main Collection Gallery Section */}
        <CollectionSection
          characters={CHARACTERS_DATA}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectCharacter={(char) => setSelectedCharacter(char)}
        />

        {/* Interactive World Explorer Panorama */}
        <WorldExplorer
          mood={mood}
          onSelectMood={(newMood) => setMood(newMood)}
          onOpenCharacterByName={handleOpenCharacterByName}
        />

        {/* Contact Section & Social Media */}
        <ContactSection />
      </main>

      {/* Cinematic Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Full-screen Character Detail Spotlight Modal */}
      <CharacterModal
        character={selectedCharacter}
        allCharacters={CHARACTERS_DATA}
        isFavorite={selectedCharacter ? favorites.includes(selectedCharacter.id) : false}
        onToggleFavorite={handleToggleFavorite}
        onClose={() => setSelectedCharacter(null)}
        onSelectCharacter={(char) => setSelectedCharacter(char)}
      />
    </div>
  );
};

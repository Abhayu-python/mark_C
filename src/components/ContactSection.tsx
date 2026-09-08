import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, Instagram, Youtube, Twitter, Github, Linkedin, MessageSquare, Mail, User, Phone, MapPin, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SOCIAL_LINKS } from '../data/characters';
import { soundManager } from '../utils/audio';
import { ArtworkUploadCard } from './ArtworkUploadCard';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    soundManager.playPop();

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      soundManager.playIntroFanfare();

      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#fbbf24', '#38bdf8', '#f43f5e', '#4ade80']
      });

      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          message: '',
        });
        setIsSubmitted(false);
      }, 5000);
    }, 800);
  };

  const getSocialIcon = (iconName: string) => {
    switch (iconName) {
      case 'Instagram':
        return <Instagram className="w-5 h-5" />;
      case 'Youtube':
        return <Youtube className="w-5 h-5" />;
      case 'Twitter':
        return <Twitter className="w-5 h-5" />;
      case 'Github':
        return <Github className="w-5 h-5" />;
      case 'Linkedin':
        return <Linkedin className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section
      id="contact"
      className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto select-none"
    >
      {/* Soft Bright Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-r from-amber-300/15 via-sky-300/15 to-rose-300/15 blur-[100px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-bold font-mono tracking-wider">
          <Mail className="w-3.5 h-3.5 text-amber-400" />
          <span>GET IN TOUCH</span>
        </div>

        <h2 className="text-3xl sm:text-5xl font-black font-display text-white tracking-tight">
          Contact <span className="text-shimmer">Abhay Pratap</span>
        </h2>

        <p className="text-sm sm:text-base text-slate-300 font-light">
          Have a question, feedback, or a cartoon story to share? Reach out below.
        </p>
      </div>

      {/* Light Bright Normal Contact Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl overflow-hidden bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 border border-white/20 shadow-2xl backdrop-blur-xl p-6 sm:p-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

          {/* Left: Quick Info Card with Bright Accents */}
          <div className="md:col-span-5 rounded-2xl bg-gradient-to-br from-amber-400 via-yellow-400 to-amber-500 p-6 text-slate-950 shadow-xl flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <div>
                <span className="text-[11px] font-mono font-black uppercase tracking-wider text-slate-900/80">
                  CARTOON STUDIO
                </span>
                <h3 className="text-2xl font-black font-display text-slate-950 mt-1">
                  Abhay Pratap
                </h3>
                <p className="text-xs text-slate-900/90 font-medium leading-relaxed mt-2">
                  Preserving timeless cartoon moments and creating living animated worlds.
                </p>
              </div>

              {/* Contact Info Items */}
              <div className="space-y-3 pt-2 text-xs font-medium text-slate-900">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-950/15 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-slate-950" />
                  </div>
                  <a href="mailto:pratapabhay8256@gmail.com" className="font-mono hover:underline">
                    pratapabhay8256@gmail.com
                  </a>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-950/15 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-slate-950" />
                  </div>
                  <span>Haridwar, UK</span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-950/15 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-slate-950" />
                  </div>
                  <a href="tel:+917088205958" className="font-mono hover:underline">
                    +91 7088205958
                  </a>
                </div>
              </div>
            </div>

            {/* Social Icons Bar */}
            <div className="pt-4 border-t border-slate-950/15">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block mb-2 text-slate-900/80">
                Connect Online:
              </span>
              <div className="flex items-center gap-2">
                {SOCIAL_LINKS.slice(0, 4).map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-950 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-md"
                    title={link.platform}
                  >
                    {getSocialIcon(link.icon)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Clean Bright Form */}
          <div className="md:col-span-7">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/40 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold font-display text-white">Message Sent Successfully!</h3>
                <p className="text-xs text-slate-300 font-light max-w-xs mx-auto">
                  Thank you! We've received your note and will reply shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-amber-400" />
                    <span>Your Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-white/15 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-sky-400" />
                    <span>Your Email</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-white/15 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-sky-400 focus:ring-1 focus:ring-sky-400 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono font-bold text-slate-200 flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Your Message</span>
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Type your message here..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-800/80 border border-white/15 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-slate-950 font-black font-display text-xs tracking-wider flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>SEND MESSAGE</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

        </div>
      </motion.div>

      {/* Share Your Cartoon Art Feature Card */}
      <ArtworkUploadCard />
    </section>
  );
};

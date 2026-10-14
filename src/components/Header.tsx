import React, { useState, useEffect } from 'react';
import { Menu, X, Linkedin, Github, Calendar } from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface HeaderProps {
  onScheduleClick: () => void;
  onWhatsAppClick: (customText?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onScheduleClick, onWhatsAppClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Diagnóstico IA', href: '#diagnostico-ia' },
    { label: 'Servicios', href: '#servicios' },
    { label: 'Topología', href: '#topologia' },
    { label: 'Tech Specs', href: '#tech-specs' },
    { label: 'Metodología', href: '#metodologia' },
    { label: 'Casos', href: '#casos' },
    { label: 'Configurador', href: '#configurador' },
    { label: 'Contacto', href: '#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4F4F4]/85 backdrop-blur-2xl border-b border-blue-900/10 shadow-sm py-3'
          : 'bg-[#F4F4F4]/60 backdrop-blur-xl border-b border-blue-900/5 py-4'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-6">
          {/* Zone 1: Apple-style Minimalist Wordmark in Blue */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-blue-950 whitespace-nowrap shrink-0 group"
          >
            <span className="w-7 h-7 rounded-lg bg-blue-900 flex items-center justify-center font-mono font-medium text-xs text-white shadow-sm shadow-blue-900/20 group-hover:bg-blue-800 transition-colors">
              GB
            </span>
            <span className="text-blue-950 font-bold group-hover:text-blue-700 transition-colors">
              Gastón Barea
            </span>
          </a>

          {/* Zone 2: Navigation Links in Blue */}
          <nav className="hidden lg:flex items-center gap-6 text-[13px] font-medium text-blue-900/75">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="hover:text-blue-600 transition-colors whitespace-nowrap shrink-0"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Social Icons + Apple style CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            {/* Social icons */}
            <div className="flex items-center gap-1.5 pr-1 border-r border-blue-200/80">
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-blue-900/70 hover:text-blue-600 hover:bg-blue-100/50 rounded-full transition-colors"
                title="LinkedIn Profesional de Gastón Barea"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-blue-900/70 hover:text-blue-600 hover:bg-blue-100/50 rounded-full transition-colors"
                title="GitHub de Gastón Barea (@xpatagonia)"
                aria-label="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>

            <button
              onClick={() => onWhatsAppClick()}
              type="button"
              className="px-3.5 py-1.5 text-xs font-semibold text-blue-900 bg-white hover:bg-blue-50/60 border border-blue-200/80 rounded-full transition-all whitespace-nowrap shadow-xs"
            >
              WhatsApp
            </button>

            <button
              onClick={onScheduleClick}
              type="button"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-full transition-all whitespace-nowrap shadow-sm shadow-blue-600/25 flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar Consulta</span>
            </button>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onScheduleClick}
              type="button"
              className="sm:hidden px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full flex items-center gap-1"
            >
              <Calendar className="w-3 h-3" />
              <span>Agendar</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-1.5 text-blue-900 hover:text-blue-600 rounded-lg"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F4F4F4]/98 backdrop-blur-2xl border-b border-blue-200/80 px-6 pt-4 pb-6 mt-3 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-semibold text-blue-900 hover:text-blue-600"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="pt-4 border-t border-blue-200/60 space-y-3">
            <div className="flex items-center gap-3 text-xs font-mono text-blue-800">
              <span>Perfiles oficiales:</span>
              <a
                href={SITE_CONFIG.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-blue-900 hover:text-blue-600 bg-white border border-blue-200 rounded-lg flex items-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-blue-900 hover:text-blue-600 bg-white border border-blue-200 rounded-lg flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5" />
                <span>GitHub</span>
              </a>
            </div>

            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onWhatsAppClick();
                }}
                className="w-full py-2 text-xs font-semibold text-blue-900 bg-white border border-blue-200 rounded-full"
              >
                WhatsApp Directo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScheduleClick();
                }}
                className="w-full py-2 text-xs font-semibold text-white bg-blue-600 rounded-full flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar Consulta (30 min)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

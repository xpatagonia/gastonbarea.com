import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

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
        <div className="flex items-center justify-between gap-8">
          
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
          <nav className="hidden md:flex items-center gap-7 text-[13px] font-medium text-blue-900/75">
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

          {/* Zone 3: Apple style CTAs */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
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
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-full transition-all whitespace-nowrap shadow-sm shadow-blue-600/25"
            >
              Agendar Consulta
            </button>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onScheduleClick}
              type="button"
              className="sm:hidden px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full"
            >
              Agendar
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
        <div className="md:hidden bg-[#F4F4F4]/98 backdrop-blur-2xl border-b border-blue-200/80 px-6 pt-4 pb-6 mt-3 space-y-4">
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
          <div className="pt-4 border-t border-blue-200/60 flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onWhatsAppClick();
              }}
              className="w-full py-2 text-xs font-semibold text-blue-900 bg-white border border-blue-200 rounded-full"
            >
              WhatsApp
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScheduleClick();
              }}
              className="w-full py-2 text-xs font-semibold text-white bg-blue-600 rounded-full"
            >
              Agendar Consulta
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

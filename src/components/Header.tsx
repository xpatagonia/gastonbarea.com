import React, { useState, useEffect, useRef } from 'react';
import {
  Menu,
  X,
  Linkedin,
  Github,
  Calendar,
  Sparkles,
  TrendingUp,
  FolderGit2,
  Cpu,
  ChevronDown,
  Layers,
  Brain,
  Sliders,
  Server
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface HeaderProps {
  onScheduleClick: () => void;
  onWhatsAppClick: (customText?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onScheduleClick, onWhatsAppClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [technicalDropdownOpen, setTechnicalDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setTechnicalDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    setTechnicalDropdownOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const technicalItems = [
    {
      label: 'Modern Tech Stack',
      desc: 'Vercel Edge, Supabase & React 19',
      href: '#tech-specs',
      icon: Cpu,
    },
    {
      label: 'Diagnóstico Interactivo con IA',
      desc: 'Simulador de soluciones personalizadas',
      href: '#diagnostico-ia',
      icon: Brain,
    },
    {
      label: 'Topología de Servidores',
      desc: 'Infraestructura Linux, Docker & VPN',
      href: '#topologia',
      icon: Server,
    },
    {
      label: 'Configurador de Arquitectura',
      desc: 'Estimador de tiempos y stack óptimo',
      href: '#configurador',
      icon: Sliders,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#F4F4F4]/90 backdrop-blur-2xl border-b border-blue-900/10 shadow-sm py-2.5'
          : 'bg-[#F4F4F4]/70 backdrop-blur-xl border-b border-blue-900/5 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* Brand Wordmark */}
          <a
            href="#"
            className="flex items-center gap-2.5 text-sm font-semibold tracking-tight text-blue-950 whitespace-nowrap shrink-0 group"
          >
            <span className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-900 via-indigo-900 to-blue-700 flex items-center justify-center font-mono font-bold text-xs text-white shadow-sm shadow-blue-900/20 group-hover:scale-105 transition-all">
              GB
            </span>
            <div className="flex flex-col">
              <span className="text-blue-950 font-bold group-hover:text-blue-700 transition-colors leading-tight">
                Gastón Barea
              </span>
              <span className="text-[10px] font-mono text-blue-600 font-medium">
                Business & Tech Architecture
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-2 xl:gap-3 text-[13px] font-medium text-blue-900/85">
            
            {/* BOTÓN INNOVACIÓN DESTACADO (3 Pilares) */}
            <a
              href="#innovacion"
              onClick={(e) => handleNavClick(e, '#innovacion')}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold text-blue-700 bg-blue-100/80 hover:bg-blue-600 hover:text-white border border-blue-200 shadow-2xs transition-all active:scale-95"
            >
              <TrendingUp className="w-3.5 h-3.5 text-blue-600 group-hover:text-white" />
              <span>INNOVACIÓN</span>
            </a>

            {/* PROYECTOS */}
            <a
              href="#proyectos"
              onClick={(e) => handleNavClick(e, '#proyectos')}
              className="px-3 py-1.5 rounded-lg text-blue-950 hover:text-blue-600 hover:bg-blue-50/70 font-semibold tracking-wide transition-all inline-flex items-center gap-1.5"
            >
              <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
              <span>PROYECTOS</span>
            </a>

            {/* MENÚ DESPLEGABLE: PARTE TÉCNICA */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setTechnicalDropdownOpen(!technicalDropdownOpen)}
                className={`px-3 py-1.5 rounded-lg transition-all inline-flex items-center gap-1.5 font-semibold text-blue-950 hover:text-blue-600 hover:bg-blue-50/70 cursor-pointer ${
                  technicalDropdownOpen ? 'bg-blue-50 text-blue-600' : ''
                }`}
              >
                <Cpu className="w-3.5 h-3.5 text-indigo-600" />
                <span>PARTE TÉCNICA</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 text-blue-500 transition-transform duration-200 ${
                    technicalDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {/* Technical Submenu Dropdown Card */}
              {technicalDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl border border-blue-900/15 shadow-xl shadow-blue-950/10 p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-2 border-b border-slate-100 mb-1">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-600 font-bold">
                      Arquitectura & Herramientas Técnicas
                    </span>
                  </div>
                  <div className="space-y-1">
                    {technicalItems.map((item) => {
                      const Icon = item.icon;
                      return (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={(e) => handleNavClick(e, item.href)}
                          className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-blue-50/80 transition-colors group"
                        >
                          <span className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            <Icon className="w-4 h-4" />
                          </span>
                          <div>
                            <div className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {item.label}
                            </div>
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {item.desc}
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* SERVICIOS */}
            <a
              href="#servicios"
              onClick={(e) => handleNavClick(e, '#servicios')}
              className="px-3 py-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 transition-all"
            >
              Servicios
            </a>

            {/* CONTACTO */}
            <a
              href="#contacto"
              onClick={(e) => handleNavClick(e, '#contacto')}
              className="px-3 py-1.5 rounded-lg text-slate-700 hover:text-blue-600 hover:bg-blue-50/60 transition-all"
            >
              Contacto
            </a>

          </nav>

          {/* Social Icons + Schedule CTAs */}
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {/* Social icons */}
            <div className="flex items-center gap-1 pr-1.5 border-r border-blue-200/80">
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
              className="px-3 py-1.5 text-xs font-semibold text-blue-900 bg-white hover:bg-blue-50/70 border border-blue-200/80 rounded-full transition-all whitespace-nowrap shadow-2xs cursor-pointer"
            >
              WhatsApp
            </button>

            <button
              onClick={onScheduleClick}
              type="button"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-full transition-all whitespace-nowrap shadow-sm shadow-blue-600/25 flex items-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>Agendar (30m)</span>
            </button>
          </div>

          {/* Mobile menu hamburger button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onScheduleClick}
              type="button"
              className="sm:hidden px-3 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full flex items-center gap-1 cursor-pointer"
            >
              <Calendar className="w-3 h-3" />
              <span>Agendar</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              type="button"
              className="p-1.5 text-blue-900 hover:text-blue-600 rounded-lg cursor-pointer"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F4F4F4]/98 backdrop-blur-2xl border-b border-blue-200/80 px-6 pt-4 pb-6 mt-3 space-y-4 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col space-y-2">
            
            {/* Mobile INNOVACIÓN Button */}
            <a
              href="#innovacion"
              onClick={(e) => handleNavClick(e, '#innovacion')}
              className="flex items-center gap-2 py-2 px-3 rounded-xl bg-blue-100/90 text-blue-700 font-bold text-sm border border-blue-300"
            >
              <TrendingUp className="w-4 h-4 text-blue-600" />
              <span>INNOVACIÓN (3 Pilares)</span>
            </a>

            {/* Mobile PROYECTOS */}
            <a
              href="#proyectos"
              onClick={(e) => handleNavClick(e, '#proyectos')}
              className="flex items-center gap-2 py-2 px-3 rounded-xl hover:bg-blue-50 text-blue-950 font-bold text-sm"
            >
              <FolderGit2 className="w-4 h-4 text-blue-600" />
              <span>PROYECTOS & CASOS DE IMPACTO</span>
            </a>

            {/* Mobile PARTE TÉCNICA Section */}
            <div className="pt-2 pb-1">
              <span className="text-[10px] font-mono tracking-wider uppercase text-blue-600 font-bold px-3">
                PARTE TÉCNICA
              </span>
              <div className="mt-1 space-y-1 pl-2">
                {technicalItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <a
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="flex items-center gap-2.5 py-1.5 px-3 rounded-lg text-xs font-medium text-slate-800 hover:text-blue-600 hover:bg-blue-50"
                    >
                      <Icon className="w-3.5 h-3.5 text-slate-500" />
                      <span>{item.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="pt-1 space-y-1 border-t border-slate-200">
              <a
                href="#servicios"
                onClick={(e) => handleNavClick(e, '#servicios')}
                className="block py-1.5 px-3 text-sm font-semibold text-slate-800 hover:text-blue-600"
              >
                Servicios
              </a>
              <a
                href="#contacto"
                onClick={(e) => handleNavClick(e, '#contacto')}
                className="block py-1.5 px-3 text-sm font-semibold text-slate-800 hover:text-blue-600"
              >
                Contacto Directo
              </a>
            </div>
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
                <Linkedin className="w-3.5 h-3.5 text-blue-700" />
                <span>LinkedIn</span>
              </a>
              <a
                href={SITE_CONFIG.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-blue-900 hover:text-blue-600 bg-white border border-blue-200 rounded-lg flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5 text-slate-800" />
                <span>GitHub</span>
              </a>
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onWhatsAppClick();
                }}
                className="w-full py-2.5 text-xs font-semibold text-blue-900 bg-white border border-blue-200 rounded-full"
              >
                WhatsApp Directo
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onScheduleClick();
                }}
                className="w-full py-2.5 text-xs font-semibold text-white bg-blue-600 rounded-full flex items-center justify-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Agendar Consulta Técnica (30 min)</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

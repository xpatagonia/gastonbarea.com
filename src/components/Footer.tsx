import React from 'react';
import { ArrowUp, Mail, MessageSquare, ExternalLink } from 'lucide-react';

interface FooterProps {
  onWhatsAppClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onWhatsAppClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#F4F4F4] border-t border-blue-900/10 text-blue-900/80 text-xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-blue-900/10">
          
          {/* Brand info (5 cols) */}
          <div className="lg:col-span-5 space-y-3.5">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-blue-900 flex items-center justify-center font-mono font-medium text-xs text-white shadow-xs">
                GB
              </div>
              <span className="text-sm font-semibold text-blue-950 tracking-tight">
                Gastón Barea
              </span>
            </div>

            <p className="text-xs text-blue-900/75 leading-relaxed max-w-sm font-normal">
              Consultoría tecnológica, arquitectura de software, Business Intelligence (BI) y administración de infraestructura Linux/Docker para organizaciones con altos requerimientos operativos.
            </p>

            <div className="text-[11px] font-mono text-blue-600 font-medium pt-1">
              Chubut, Patagonia Argentina · Proyectos Remotos Globales
            </div>
          </div>

          {/* Navigation (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-950 font-bold">
              Navegación
            </div>
            <ul className="space-y-2 text-xs font-medium text-blue-900/80">
              <li>
                <a href="#" className="hover:text-blue-600 transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#servicios" className="hover:text-blue-600 transition-colors">Servicios</a>
              </li>
              <li>
                <a href="#topologia" className="hover:text-blue-600 transition-colors">Topología</a>
              </li>
              <li>
                <a href="#tech-specs" className="hover:text-blue-600 transition-colors">Tech Specs</a>
              </li>
              <li>
                <a href="#metodologia" className="hover:text-blue-600 transition-colors">Metodología</a>
              </li>
              <li>
                <a href="#casos" className="hover:text-blue-600 transition-colors">Casos de Estudio</a>
              </li>
              <li>
                <a href="#configurador" className="hover:text-blue-600 transition-colors">Configurador</a>
              </li>
            </ul>
          </div>

          {/* Contact (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-xs font-mono uppercase tracking-widest text-blue-950 font-bold">
              Atención Directa
            </div>
            <p className="text-xs text-blue-900/75 leading-relaxed font-normal">
              Atención técnica directa para directores, gerentes de sistemas y líderes de proyectos.
            </p>

            <div className="space-y-2 pt-1 font-mono text-xs">
              <a 
                href="mailto:gastonbarea.com@gmail.com" 
                className="flex items-center gap-2 text-blue-900/80 hover:text-blue-600 transition-colors font-medium"
              >
                <Mail className="w-3.5 h-3.5 text-blue-600" />
                <span>gastonbarea.com@gmail.com</span>
              </a>

              <button
                type="button"
                onClick={onWhatsAppClick}
                className="flex items-center gap-2 text-blue-900/80 hover:text-blue-600 transition-colors font-medium text-left"
              >
                <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                <span>Canal de WhatsApp</span>
              </button>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-900/80 hover:text-blue-600 transition-colors font-medium"
              >
                <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                <span>LinkedIn Profesional</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-blue-900/60 font-mono">
          <div>
            © 2026 Gastón Barea. Dominio registrado: <strong className="text-blue-950 font-semibold">gastonbarea.com.ar</strong>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-blue-900/70 hover:text-blue-950 transition-colors py-1 font-medium"
          >
            <span>Volver arriba</span>
            <ArrowUp className="w-3.5 h-3.5 text-blue-600" />
          </button>
        </div>

      </div>
    </footer>
  );
};

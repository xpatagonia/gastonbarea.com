import React from 'react';
import { 
  ShieldCheck, 
  MapPin, 
  ExternalLink, 
  Check, 
  ArrowRight 
} from 'lucide-react';

interface AboutProfileSectionProps {
  onScheduleClick: () => void;
}

export const AboutProfileSection: React.FC<AboutProfileSectionProps> = ({ onScheduleClick }) => {
  return (
    <section className="py-24 md:py-32 bg-[#F4F4F4] relative border-b border-blue-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Bio (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="text-[11px] font-mono tracking-widest uppercase text-blue-600 font-semibold">
              PERFIL PROFESIONAL
            </div>

            <h2 className="text-3xl sm:text-5xl font-bold text-blue-950 tracking-tight leading-tight">
              Ingeniería pragmática orientada a la economía real.
            </h2>

            <div className="space-y-4 text-base text-blue-900/85 leading-relaxed font-normal">
              <p>
                Soy <strong className="text-blue-950 font-bold">Gastón Barea</strong>, consultor tecnológico y arquitecto de sistemas. A lo largo de más de diez años de trayectoria profesional, he diseñado soluciones de software, modernizado centros de datos con Linux y desplegado sistemas de Business Intelligence para empresas corporativas, cooperativas de servicios públicos y organizaciones en constante evolución.
              </p>
              <p>
                Mi premisa es simple: la tecnología no debe ser un laberinto de costos ni una fuente de fragilidad operativa. Hablo tanto el lenguaje de la estrategia directiva como el de la terminal de servidores, garantizando arquitecturas sólidas, escalables y con un retorno tangible sobre la inversión.
              </p>
            </div>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="p-5 rounded-2xl bg-white border border-blue-900/10 shadow-xs">
                <div className="text-sm font-bold text-blue-950 mb-1">
                  Infraestructura & Contenedores
                </div>
                <p className="text-xs text-blue-900/80 leading-relaxed font-normal">
                  Servidores Linux Ubuntu, Docker Compose, hardening y continuidad operativa 24/7.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-blue-900/10 shadow-xs">
                <div className="text-sm font-bold text-blue-950 mb-1">
                  Business Intelligence & BI
                </div>
                <p className="text-xs text-blue-900/80 leading-relaxed font-normal">
                  Data Warehouses en PostgreSQL y dashboards ejecutivos en tiempo real.
                </p>
              </div>
            </div>

            {/* Principles */}
            <div className="pt-6 border-t border-blue-100 space-y-3">
              <div className="text-xs font-mono uppercase tracking-wider text-blue-700 font-semibold">
                Principios Rectores:
              </div>
              <ul className="space-y-2.5 text-xs text-blue-900">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong className="text-blue-950 font-bold">Visión Sistémica:</strong> Entendimiento del modelo de negocio detrás de cada línea de código.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong className="text-blue-950 font-bold">Enfoque Pragmático:</strong> Soluciones robustas y directas al grano, sin modas pasajeras.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span><strong className="text-blue-950 font-bold">Soberanía de Datos:</strong> Código abierto y estándares auditables sin vendor lock-in.</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Identity Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white border border-blue-900/10 p-8 sm:p-10 shadow-lg shadow-blue-950/[0.04] relative">
              
              <div className="flex items-center gap-4 pb-6 border-b border-blue-100">
                <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center font-mono font-bold text-lg shadow-sm">
                  GB
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-blue-950">Gastón Barea</h3>
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <p className="text-xs font-mono text-blue-700 font-semibold">gastonbarea.com.ar</p>
                  <p className="text-xs text-blue-900/70 flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-blue-600" />
                    <span>Chubut, Argentina</span>
                  </p>
                </div>
              </div>

              <div className="py-6 space-y-3.5 text-xs text-blue-900/80">
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Rol Principal:</span>
                  <span className="text-blue-950 font-bold">Arquitecto de Software</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Especialidad:</span>
                  <span className="text-blue-950 font-bold">Linux, Docker, PostgreSQL, BI</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Modalidad:</span>
                  <span className="text-blue-950 font-bold">Remota Global</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Disponibilidad:</span>
                  <span className="text-emerald-700 font-bold">Abierto a proyectos</span>
                </div>
              </div>

              <div className="pt-6 border-t border-blue-100 space-y-3">
                <button
                  onClick={onScheduleClick}
                  type="button"
                  className="w-full py-3 px-4 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  <span>Agendar Consulta</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <a
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-blue-900 hover:text-blue-950 bg-blue-50/70 hover:bg-blue-100/70 rounded-full border border-blue-200 transition-colors flex items-center justify-center gap-2"
                >
                  <span>Conectar en LinkedIn</span>
                  <ExternalLink className="w-3.5 h-3.5 text-blue-500" />
                </a>

                <div className="text-center pt-1">
                  <a
                    href="mailto:gastonbarea.com@gmail.com"
                    className="text-xs font-mono text-blue-700 hover:text-blue-950 transition-colors font-medium"
                  >
                    gastonbarea.com@gmail.com
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

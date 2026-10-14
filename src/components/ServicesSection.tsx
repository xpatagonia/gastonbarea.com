import React, { useState } from 'react';
import { 
  ArrowRight, 
  Check, 
  X, 
  AlertTriangle,
  ChevronRight
} from 'lucide-react';
import { SERVICES_DATA, ServiceItem } from '../data/content';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
  onRequestAudit: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onRequestAudit,
}) => {
  const [selectedServiceModal, setSelectedServiceModal] = useState<ServiceItem | null>(null);

  return (
    <section id="servicios" className="py-24 md:py-32 bg-[#F4F4F4] relative border-b border-blue-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header in Blue */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono tracking-widest uppercase text-blue-600 mb-3 font-semibold">
            CAPACIDADES Y SERVICIOS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-blue-950 leading-tight">
            Arquitectura de software diseñada para resistir el crecimiento del negocio.
          </h2>
          <p className="text-base sm:text-lg text-blue-900/80 mt-4 leading-relaxed font-normal">
            Sin plantillas prefabricadas ni dependencias artificiales. Soluciones concebidas para optimizar el rendimiento, proteger los datos y garantizar continuidad operativa.
          </p>
        </div>

        {/* 4 Apple Bento Cards (2x2 grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="apple-card p-8 sm:p-10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-blue-100">
                  <span className="text-2xl font-mono font-bold text-blue-400 group-hover:text-blue-600 transition-colors">
                    {service.number}
                  </span>
                  <span className="text-[11px] font-mono text-blue-600 uppercase tracking-wider font-semibold">
                    Producción Continua
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-blue-950 tracking-tight">
                    {service.title}
                  </h3>
                  <p className="text-xs font-mono text-blue-700 font-semibold mt-1.5">
                    {service.subtitle}
                  </p>
                  <p className="text-sm text-blue-900/80 mt-4 leading-relaxed font-normal">
                    {service.description}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-blue-100">
                  <div className="text-xs font-mono text-blue-800 uppercase tracking-wider mb-3 font-semibold">
                    Entregables Principales:
                  </div>
                  <ul className="space-y-2.5">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-blue-950 font-medium">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-5 border-t border-blue-100">
                  <div className="text-[11px] font-mono text-blue-600 uppercase tracking-wider mb-2.5 font-semibold">
                    Tecnologías:
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {service.technologies.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-mono text-blue-900 bg-blue-50/80 px-2.5 py-1 rounded-full border border-blue-200/80 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-blue-100 flex items-center justify-between gap-4">
                <button
                  onClick={() => setSelectedServiceModal(service)}
                  type="button"
                  className="text-xs font-semibold text-blue-700 hover:text-blue-950 transition-colors inline-flex items-center gap-1 group/btn"
                >
                  <span>Ver alcance completo</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>

                <button
                  onClick={() => onSelectService(service.title)}
                  type="button"
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-full transition-all inline-flex items-center gap-1.5 shadow-sm shadow-blue-600/20"
                >
                  <span>Solicitar Servicio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Emergency Diagnostic Callout in Blue Navy */}
        <div className="mt-12 rounded-3xl bg-blue-950 text-white p-8 sm:p-10 relative overflow-hidden shadow-xl">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <div className="text-[11px] font-mono text-blue-300 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-300" />
                <span>AUDITORÍA & CONTINGENCIA CRÍTICA</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                ¿Tenés una infraestructura crítica con fallas recurrentes o lentitud?
              </h3>
              <p className="text-sm text-blue-200 leading-relaxed font-normal">
                Realizo diagnósticos técnicos de emergencia para servidores caídos, cuellos de botella en bases de datos PostgreSQL o planes de migración sin interrupción operativa.
              </p>
            </div>

            <div className="shrink-0 w-full sm:w-auto">
              <button
                onClick={onRequestAudit}
                type="button"
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-blue-950 bg-white hover:bg-blue-50 rounded-full transition-all inline-flex items-center justify-center gap-2 whitespace-nowrap shadow-md"
              >
                <span>Solicitar Diagnóstico</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Scope Modal */}
      {selectedServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-blue-950/60 backdrop-blur-xl animate-fade-in">
          <div className="relative w-full max-w-2xl bg-white border border-blue-200 rounded-3xl p-8 sm:p-10 shadow-2xl max-h-[90vh] overflow-y-auto">
            
            <button
              onClick={() => setSelectedServiceModal(null)}
              type="button"
              className="absolute top-6 right-6 p-2 text-blue-600 hover:text-blue-950 rounded-full hover:bg-blue-50 transition-colors"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-mono text-blue-600 uppercase tracking-widest font-semibold">
                  Servicio {selectedServiceModal.number}
                </span>
                <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 mt-1 tracking-tight">
                  {selectedServiceModal.title}
                </h3>
                <p className="text-sm font-mono text-blue-700 mt-1 font-medium">
                  {selectedServiceModal.subtitle}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200/80 text-sm text-blue-950 leading-relaxed">
                {selectedServiceModal.fullScope.overview}
              </div>

              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-blue-700 mb-3 font-semibold">
                  Objetivos Principales:
                </h4>
                <ul className="space-y-2">
                  {selectedServiceModal.fullScope.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-2.5 text-xs text-blue-900 font-medium">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{obj}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-100">
                  <div className="text-[10px] font-mono uppercase text-blue-600 font-semibold">
                    Plazo Típico Estimado:
                  </div>
                  <div className="text-xs font-bold text-blue-950 mt-1">
                    {selectedServiceModal.fullScope.typicalTimeline}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-100">
                  <div className="text-[10px] font-mono uppercase text-blue-600 font-semibold">
                    Garantía Técnica:
                  </div>
                  <div className="text-xs font-bold text-blue-950 mt-1">
                    Código documentado + acompañamiento
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-blue-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedServiceModal(null)}
                  type="button"
                  className="px-4 py-2 text-xs font-semibold text-blue-800 hover:text-blue-950 rounded-full"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    const title = selectedServiceModal.title;
                    setSelectedServiceModal(null);
                    onSelectService(title);
                  }}
                  type="button"
                  className="px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full inline-flex items-center gap-1.5 shadow-sm"
                >
                  <span>Solicitar este Servicio</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

          </div>
        </div>
      )}
    </section>
  );
};

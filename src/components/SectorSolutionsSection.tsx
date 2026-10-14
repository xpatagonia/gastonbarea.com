import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { SECTOR_SOLUTIONS } from '../data/content';

interface SectorSolutionsSectionProps {
  onSectorSelect: (sectorName: string) => void;
}

export const SectorSolutionsSection: React.FC<SectorSolutionsSectionProps> = ({ onSectorSelect }) => {
  return (
    <section className="py-24 md:py-32 bg-[#F4F4F4] relative border-b border-blue-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header in Blue */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono tracking-widest uppercase text-blue-600 mb-3 font-semibold">
            PROPUESTA DE VALOR SECTORIAL
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-blue-950 leading-tight">
            Innovación que escala para organizaciones reales.
          </h2>
          <p className="text-base sm:text-lg text-blue-900/80 mt-4 leading-relaxed font-normal">
            La tecnología no es un departamento de soporte aislado: es el núcleo del modelo operativo. Soluciones arquitectónicas diseñadas para tres verticales estratégicos.
          </p>
        </div>

        {/* 3 Apple Bento Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SECTOR_SOLUTIONS.map((sector) => (
            <div
              key={sector.number}
              className="apple-card p-8 sm:p-10 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-blue-100">
                  <span className="text-2xl font-mono font-bold text-blue-400 group-hover:text-blue-600 transition-colors">
                    {sector.number}
                  </span>
                  <span className="text-[11px] font-mono text-blue-600 uppercase tracking-widest font-semibold">
                    Vertical
                  </span>
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-bold text-blue-950 tracking-tight">
                    {sector.title}
                  </h3>
                  <p className="text-xs font-mono text-blue-700 font-medium mt-1.5">
                    {sector.subtitle}
                  </p>
                </div>

                <div className="mt-8 space-y-5">
                  {sector.pillars.map((pillar, pIdx) => (
                    <div key={pIdx} className="space-y-1">
                      <div className="flex items-center gap-2 text-xs font-bold text-blue-950">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{pillar.title}</span>
                      </div>
                      <p className="text-xs text-blue-900/80 leading-relaxed pl-5 font-normal">
                        {pillar.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-10 pt-6 border-t border-blue-100">
                <button
                  onClick={() => onSectorSelect(sector.title)}
                  type="button"
                  className="w-full py-2.5 text-xs font-semibold text-blue-900 hover:text-white bg-blue-50/70 hover:bg-blue-600 rounded-full border border-blue-200 transition-all inline-flex items-center justify-center gap-2"
                >
                  <span>Consultar para este sector</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

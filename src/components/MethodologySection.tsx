import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Check, FileText } from 'lucide-react';
import { METHODOLOGY_PHASES } from '../data/content';

export const MethodologySection: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState<number>(0);
  const currentPhase = METHODOLOGY_PHASES[activePhaseIndex];

  const handlePrev = () => {
    setActivePhaseIndex((prev) => (prev > 0 ? prev - 1 : METHODOLOGY_PHASES.length - 1));
  };

  const handleNext = () => {
    setActivePhaseIndex((prev) => (prev < METHODOLOGY_PHASES.length - 1 ? prev + 1 : 0));
  };

  return (
    <section id="metodologia" className="py-24 md:py-32 bg-[#F4F4F4] relative border-b border-blue-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header in Blue */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono tracking-widest uppercase text-blue-600 mb-3 font-semibold">
            METODOLOGÍA DE INGENIERÍA
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-blue-950 leading-tight">
            Un proceso riguroso que transforma requerimientos en producción.
          </h2>
          <p className="text-base sm:text-lg text-blue-900/80 mt-4 leading-relaxed font-normal">
            Eliminamos la improvisación mediante cuatro fases secuenciales con entregables documentados, validaciones de arquitectura y soporte continuo.
          </p>
        </div>

        {/* 4 Stage Pills */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {METHODOLOGY_PHASES.map((phase, idx) => {
            const isSelected = activePhaseIndex === idx;

            return (
              <button
                key={phase.number}
                type="button"
                onClick={() => setActivePhaseIndex(idx)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500/20'
                    : 'bg-white border-blue-900/8 hover:border-blue-300 hover:bg-blue-50/30'
                }`}
              >
                <div className="text-xs font-mono font-bold text-blue-600 mb-2">
                  FASE {phase.number}
                </div>
                <div className={`text-sm font-bold leading-snug ${isSelected ? 'text-blue-950' : 'text-blue-900'}`}>
                  {phase.title}
                </div>
                <div className="text-[11px] text-blue-700/80 mt-1 font-medium">
                  {phase.phaseName}
                </div>
              </button>
            );
          })}
        </div>

        {/* Spotlight Card */}
        <div className="rounded-3xl bg-white border border-blue-900/10 p-8 sm:p-12 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b border-blue-100 gap-4">
            <div>
              <div className="text-xs font-mono text-blue-600 uppercase tracking-widest font-semibold">
                Fase {currentPhase.number} · {currentPhase.phaseName}
              </div>
              <h3 className="text-2xl sm:text-4xl font-bold text-blue-950 mt-1.5 tracking-tight">
                {currentPhase.title}
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                className="p-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors"
                aria-label="Fase anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="p-2.5 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800 transition-colors"
                aria-label="Siguiente fase"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="mt-8 space-y-8">
            <p className="text-base text-blue-900/90 leading-relaxed max-w-3xl font-normal">
              {currentPhase.summary}
            </p>

            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-700 mb-4 font-semibold">
                Actividades Técnicas Ejecutadas:
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {currentPhase.activities.map((act, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-xl bg-[#F8FAFC] border border-blue-900/6">
                    <Check className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <span className="text-xs text-blue-950 leading-relaxed font-medium">
                      {act}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Formal Deliverable */}
            <div className="p-5 rounded-2xl bg-blue-50/80 border border-blue-200/80 flex items-start gap-3.5">
              <FileText className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
              <div>
                <div className="text-[11px] font-mono text-blue-600 uppercase tracking-widest font-semibold">
                  Entregable Formal de la Etapa:
                </div>
                <div className="text-sm font-bold text-blue-950 mt-1">
                  {currentPhase.formalDeliverable}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

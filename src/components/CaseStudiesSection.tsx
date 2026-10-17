import React, { useState } from 'react';
import { ArrowRight, Building2, ShieldCheck } from 'lucide-react';
import { CASE_STUDIES_DATA } from '../data/content';

interface CaseStudiesSectionProps {
  onSimilarCaseClick: (caseTitle: string) => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onSimilarCaseClick }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES_DATA[0].id);

  const activeCase = CASE_STUDIES_DATA.find((c) => c.id === selectedCaseId) || CASE_STUDIES_DATA[0];

  return (
    <section id="proyectos" className="py-24 md:py-32 bg-[#F4F4F4] relative border-b border-blue-900/10">
      <div id="casos" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono tracking-widest uppercase text-blue-600 mb-3 font-semibold">
            PROYECTOS & CASOS DE IMPACTO
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-blue-950 leading-tight">
            Resultados medibles en entornos de alta exigencia.
          </h2>
          <p className="text-base sm:text-lg text-blue-900/80 mt-4 leading-relaxed font-normal">
            Casos reales documentados en cooperativas de servicios públicos, distribuidoras y empresas industriales. Menor gasto en infraestructura, disponibilidad total y toma de decisiones basada en datos.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {CASE_STUDIES_DATA.map((item) => {
            const isSelected = selectedCaseId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedCaseId(item.id)}
                className={`p-5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500/20'
                    : 'bg-white border-blue-900/8 hover:border-blue-300 hover:bg-blue-50/30'
                }`}
              >
                <div className="text-[11px] font-mono text-blue-600 mb-1 font-semibold">
                  {item.category}
                </div>
                <div className={`text-xs font-bold leading-snug line-clamp-2 ${isSelected ? 'text-blue-950' : 'text-blue-900'}`}>
                  {item.title}
                </div>
                <div className="text-[11px] text-blue-700/80 mt-2 flex items-center gap-1.5 font-medium">
                  <Building2 className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span className="truncate">{item.organization}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Apple Case Spotlight Card */}
        <div className="rounded-3xl bg-white border border-blue-900/10 p-8 sm:p-12 shadow-sm">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between pb-8 border-b border-blue-100 gap-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-semibold">
                {activeCase.category}
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 mt-1.5 tracking-tight">
                {activeCase.title}
              </h3>
              <p className="text-sm text-blue-900/80 mt-1">
                Organización: <strong className="text-blue-950 font-bold">{activeCase.organization}</strong>
              </p>
            </div>

            <button
              onClick={() => onSimilarCaseClick(activeCase.title)}
              type="button"
              className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full inline-flex items-center gap-2 transition-all self-start lg:self-auto shadow-sm shadow-blue-500/20"
            >
              <span>Plantear un caso similar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mt-8">
            {/* Challenge & Solution (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-blue-900/6">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-700 mb-2 font-semibold">
                  EL DESAFÍO TÉCNICO INICIAL:
                </div>
                <p className="text-sm text-blue-950 leading-relaxed font-normal">
                  {activeCase.challenge}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-[#F8FAFC] border border-blue-900/6">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-700 mb-2 font-semibold">
                  ARQUITECTURA & SOLUCIÓN IMPLEMENTADA:
                </div>
                <p className="text-sm text-blue-950 leading-relaxed font-normal">
                  {activeCase.solution}
                </p>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-blue-700 mb-3 font-semibold">
                  Tecnologías Desplegadas:
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {activeCase.technologies.map((t, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80 font-medium"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Metrics (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
              <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-semibold">
                IMPACTO CUANTIFICABLE
              </div>

              <div className="space-y-3">
                {activeCase.metrics.map((metric, i) => (
                  <div key={i} className="p-5 rounded-2xl bg-[#F8FAFC] border border-blue-900/6">
                    <div className="text-3xl font-bold text-blue-950 font-mono tabular-nums tracking-tight">
                      {metric.value}
                    </div>
                    <div className="text-xs font-bold text-blue-900 mt-1">
                      {metric.label}
                    </div>
                    <div className="text-[11px] text-blue-700/80 mt-0.5">
                      {metric.detail}
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200/80 flex items-center gap-2.5 text-xs text-blue-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span className="font-medium">{activeCase.verificationNote}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

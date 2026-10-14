import React, { useState } from 'react';
import {
  TrendingUp,
  Brain,
  Cpu,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  BarChart3,
  Layers,
  Database,
  Rocket,
  Activity,
  Globe,
  Sliders,
  Check
} from 'lucide-react';
import { STRATEGIC_PILLARS, StrategicPillar } from '../data/pillarsData';

interface ThreePillarsSectionProps {
  onScheduleClick: (context?: string) => void;
  onDiagnosticoClick: () => void;
  onSelectPillarTopic?: (topic: string) => void;
}

export const ThreePillarsSection: React.FC<ThreePillarsSectionProps> = ({
  onScheduleClick,
  onDiagnosticoClick,
  onSelectPillarTopic,
}) => {
  const [activePillarId, setActivePillarId] = useState<string>('business-innovation');
  
  // Synergy simulator state
  const [businessMaturity, setBusinessMaturity] = useState<number>(65);
  const [aiIntelligence, setAiIntelligence] = useState<number>(75);
  const [stackModernity, setStackModernity] = useState<number>(85);

  const activePillar = STRATEGIC_PILLARS.find((p) => p.id === activePillarId) || STRATEGIC_PILLARS[0];

  // Dynamic calculated scores from the 3 pillars synergy
  const synergyScore = Math.round((businessMaturity * 0.35) + (aiIntelligence * 0.35) + (stackModernity * 0.30));
  const estimatedMargin = Math.round(40 + (synergyScore * 0.45));
  const timeToMarketWeeks = Math.max(2, Math.round(18 - (synergyScore * 0.14)));
  const scaleMultiplier = (1 + (synergyScore / 25)).toFixed(1);

  const getPillarIcon = (id: string, className = 'w-5 h-5') => {
    switch (id) {
      case 'business-innovation':
        return <TrendingUp className={className} />;
      case 'smart-business':
        return <Brain className={className} />;
      case 'tech-stack':
        return <Cpu className={className} />;
      default:
        return <Layers className={className} />;
    }
  };

  return (
    <section id="tres-pilares" className="relative py-24 md:py-32 overflow-hidden bg-[#F4F4F4]">
      {/* Dynamic Fluid Animated Background Mesh */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Floating Organic Orbs */}
        <div 
          className="absolute -top-24 -left-20 w-[450px] h-[450px] rounded-full bg-gradient-to-tr from-blue-400/15 to-indigo-300/10 blur-3xl animate-float"
        />
        <div 
          className="absolute top-1/3 -right-24 w-[500px] h-[500px] rounded-full bg-gradient-to-br from-purple-400/15 via-blue-300/10 to-transparent blur-3xl animate-float-delayed"
        />
        <div 
          className="absolute -bottom-20 left-1/3 w-[600px] h-[400px] rounded-full bg-gradient-to-t from-sky-400/15 to-blue-200/10 blur-3xl animate-float-slow"
        />

        {/* Dynamic Curved Vector Flow Lines */}
        <svg className="absolute w-full h-full opacity-30" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M-100 250 C 300 150, 600 450, 1000 200 C 1200 80, 1400 350, 1600 220" 
            stroke="url(#lineGradient1)" 
            strokeWidth="2" 
            strokeDasharray="8 8"
            className="animate-flow-line"
          />
          <path 
            d="M-50 600 C 350 750, 700 500, 1100 700 C 1300 800, 1500 650, 1650 720" 
            stroke="url(#lineGradient2)" 
            strokeWidth="2.5" 
            strokeDasharray="6 6"
            className="animate-flow-line"
          />
          <defs>
            <linearGradient id="lineGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2563eb" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.1" />
            </linearGradient>
            <linearGradient id="lineGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#2563eb" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Section Header with Fluid Organic Styling */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blue-900/10 shadow-xs text-xs font-mono font-semibold text-blue-950">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>NUEVA ARQUITECTURA DE VALOR</span>
            <span className="text-blue-300">·</span>
            <span className="text-blue-600">3 PILARES ESTRATÉGICOS</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-blue-950 leading-[1.12] [text-wrap:balance]">
            Innovación de Negocios, Inteligencia Autónoma y{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-600">
              el Stack Técnico de Alto Rendimiento.
            </span>
          </h2>

          <p className="text-base sm:text-lg text-blue-900/80 leading-relaxed font-normal [text-wrap:balance]">
            Una propuesta integral diseñada para eliminar la rigidez tradicional. Fusionamos nuevos modelos de negocio digitales con agentes de IA autónomos y una infraestructura cloud moderna lista para escalar.
          </p>
        </div>

        {/* 1. Dynamic Interactive Pillar Tabs (Fluid Wave Switch) */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {STRATEGIC_PILLARS.map((pillar) => {
            const isActive = activePillarId === pillar.id;
            return (
              <button
                key={pillar.id}
                type="button"
                onClick={() => setActivePillarId(pillar.id)}
                className={`relative px-5 py-3.5 rounded-2xl text-left transition-all duration-300 flex items-center gap-3 border ${
                  isActive
                    ? 'bg-white shadow-xl shadow-blue-950/[0.08] border-blue-600 scale-[1.02] ring-2 ring-blue-500/20'
                    : 'bg-white/70 hover:bg-white backdrop-blur-md border-blue-900/10 shadow-xs hover:border-blue-300 text-blue-900/80'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                      : 'bg-blue-50 text-blue-700'
                  }`}
                >
                  {getPillarIcon(pillar.id)}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-mono font-bold tracking-wider text-blue-500">
                      PILAR {pillar.number}
                    </span>
                    {isActive && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping" />
                    )}
                  </div>
                  <div className="text-sm font-bold text-blue-950 whitespace-nowrap">
                    {pillar.title.split('&')[0].trim()}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* 2. Dynamic Pillar Deep-Dive Showcase (Fluid, Asymmetric Liquid Card) */}
        <div className="relative rounded-3xl bg-white/90 backdrop-blur-xl border border-blue-900/10 p-6 sm:p-10 shadow-xl shadow-blue-950/[0.05] overflow-hidden transition-all duration-500">
          
          {/* Subtle Ambient Corner Accent */}
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl pointer-events-none opacity-20 transition-all duration-700"
            style={{ backgroundColor: activePillar.colorScheme.primary }}
          />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
            
            {/* Left Column: Pillar Manifesto & Real Impact (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60">
                  Pilar {activePillar.number} · {activePillar.title}
                </span>
                <span className="text-xs font-medium text-blue-800/70">
                  {activePillar.subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-blue-950 leading-snug">
                {activePillar.tagline}
              </h3>

              <p className="text-sm sm:text-base text-blue-900/85 leading-relaxed">
                {activePillar.overview}
              </p>

              {/* Real World Transformation Story (Antes vs Después) */}
              <div className="rounded-2xl bg-[#F8FAFC] border border-blue-900/8 p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-950 uppercase">
                  <Activity className="w-3.5 h-3.5 text-blue-600" />
                  <span>Caso Real de Transformación</span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-white border border-rose-200/70 space-y-1">
                    <span className="font-bold text-rose-700 flex items-center gap-1">
                      <span>✕</span> Modelo Anterior
                    </span>
                    <p className="text-slate-600 leading-relaxed">
                      {activePillar.realWorldScenario.before}
                    </p>
                  </div>

                  <div className="p-3 rounded-xl bg-white border border-emerald-200/70 space-y-1">
                    <span className="font-bold text-emerald-700 flex items-center gap-1">
                      <span>✓</span> Con los 3 Pilares
                    </span>
                    <p className="text-slate-700 leading-relaxed">
                      {activePillar.realWorldScenario.after}
                    </p>
                  </div>
                </div>
              </div>

              {/* Key Drivers List */}
              <div className="space-y-2.5">
                <div className="text-xs font-mono uppercase tracking-wider text-blue-900 font-bold">
                  Vectores Clave de Ejecución:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activePillar.keyDrivers.map((driver, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-white border border-blue-900/6 text-xs text-blue-950 hover:border-blue-300 transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <span className="leading-snug">{driver}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Technologies / Methodologies Tags */}
              <div className="pt-2">
                <div className="text-[11px] font-mono text-blue-800/80 mb-2">
                  Herramientas y Metodologías aplicadas en este pilar:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activePillar.technologiesOrMethodologies.map((item, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-blue-50/80 text-blue-900 border border-blue-200/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic KPIs & Direct Action Card (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              
              {/* Quantifiable KPIs in Motion */}
              <div className="rounded-2xl bg-gradient-to-br from-blue-950 via-slate-900 to-indigo-950 text-white p-6 shadow-lg shadow-blue-950/20 space-y-5">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-xs font-mono tracking-wider text-blue-300 uppercase font-semibold">
                    Métricas de Impacto Medible
                  </span>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4">
                  {activePillar.kpis.map((kpi, idx) => (
                    <div 
                      key={idx}
                      className="p-3.5 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                    >
                      <div className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-sky-300 to-white">
                        {kpi.value}
                      </div>
                      <div className="text-xs font-bold text-white mt-0.5">
                        {kpi.label}
                      </div>
                      <div className="text-[11px] text-blue-200/70 mt-1 leading-relaxed">
                        {kpi.description}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Direct Action inside KPI card */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onScheduleClick(`Consulta Técnica sobre Pilar ${activePillar.number}: ${activePillar.title}`)}
                    className="w-full py-3 px-4 rounded-xl text-xs font-bold bg-white text-blue-950 hover:bg-blue-50 transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-[0.99]"
                  >
                    <span>Agendar Llamada de 30 min sobre este Pilar</span>
                    <ArrowRight className="w-4 h-4 text-blue-600" />
                  </button>
                </div>
              </div>

              {/* Pillar Specific Deliverable Cards */}
              <div className="space-y-2.5">
                {activePillar.features.slice(0, 3).map((feat, i) => (
                  <div
                    key={i}
                    className="p-3.5 rounded-xl bg-white border border-blue-900/8 hover:border-blue-400/50 shadow-xs hover:shadow-md transition-all flex items-center justify-between gap-3 group"
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-blue-950 group-hover:text-blue-600 transition-colors">
                          {feat.title}
                        </span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-semibold border border-blue-200/60">
                          {feat.badge}
                        </span>
                      </div>
                      <p className="text-[11px] text-blue-800/80 leading-relaxed">
                        {feat.description}
                      </p>
                    </div>
                    <span className="text-xs font-bold font-mono text-emerald-600 shrink-0 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200/60">
                      {feat.impactMetric}
                    </span>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

        {/* 3. SIMULADOR DE SINERGIA TRIANGULAR (Movimiento, Interactividad y Proyección en Vivo) */}
        <div className="relative rounded-3xl bg-gradient-to-br from-white via-blue-50/40 to-indigo-50/30 border border-blue-900/10 p-6 sm:p-10 shadow-lg shadow-blue-950/[0.04]">
          <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 text-blue-800 text-xs font-mono font-semibold">
              <Sliders className="w-3.5 h-3.5 text-blue-600" />
              <span>SIMULADOR DE SINERGIA EN TIEMPO REAL</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-blue-950">
              ¿Cómo interactúan los 3 Pilares en tu Organización?
            </h3>
            <p className="text-xs sm:text-sm text-blue-900/80 max-w-2xl mx-auto">
              Ajustá las palancas según el estado actual de tu empresa para simular el impacto en márgenes operativos, velocidad de salida al mercado y escala sin fricciones.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Sliders (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Slider 1: Business Innovation */}
              <div className="p-4 rounded-2xl bg-white border border-blue-900/8 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-blue-950">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span>Innovación de Negocios & Modelos Digitales</span>
                  </div>
                  <span className="font-mono text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                    {businessMaturity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={businessMaturity}
                  onChange={(e) => setBusinessMaturity(parseInt(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Servicios Tradicionales</span>
                  <span>Plataformas B2B & SaaS</span>
                </div>
              </div>

              {/* Slider 2: Smart Business / AI */}
              <div className="p-4 rounded-2xl bg-white border border-blue-900/8 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-blue-950">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span>Negocios Inteligentes & Operaciones con IA</span>
                  </div>
                  <span className="font-mono text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-200">
                    {aiIntelligence}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={aiIntelligence}
                  onChange={(e) => setAiIntelligence(parseInt(e.target.value))}
                  className="w-full accent-purple-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Reportes en Excel / Manual</span>
                  <span>Agentes Autónomos & Live BI</span>
                </div>
              </div>

              {/* Slider 3: Tech Stack */}
              <div className="p-4 rounded-2xl bg-white border border-blue-900/8 shadow-xs space-y-2">
                <div className="flex items-center justify-between text-xs font-bold text-blue-950">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span>Modernidad del Stack Técnico & Resiliencia</span>
                  </div>
                  <span className="font-mono text-sky-600 bg-sky-50 px-2 py-0.5 rounded-md border border-sky-200">
                    {stackModernity}%
                  </span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={stackModernity}
                  onChange={(e) => setStackModernity(parseInt(e.target.value))}
                  className="w-full accent-sky-600 cursor-pointer h-2 bg-slate-100 rounded-lg"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>Monolito Lento / On-premise</span>
                  <span>Edge + Supabase + React 19</span>
                </div>
              </div>

            </div>

            {/* Results & Visual Projection Gauge (6 cols) */}
            <div className="lg:col-span-6">
              <div className="p-6 rounded-3xl bg-white border border-blue-900/10 shadow-lg space-y-6 relative overflow-hidden">
                
                {/* Visual synergy score pill */}
                <div className="flex items-center justify-between">
                  <div className="text-xs font-mono font-bold uppercase text-blue-900">
                    Índice de Aceleración Estratégica
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-black text-blue-600 font-mono">
                      {synergyScore}/100
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {synergyScore > 75 ? 'Óptimo' : synergyScore > 50 ? 'Acelerado' : 'Básico'}
                    </span>
                  </div>
                </div>

                {/* Progress bar with gradient in motion */}
                <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
                  <div 
                    className="h-full rounded-full bg-gradient-to-r from-blue-600 via-purple-600 to-sky-500 transition-all duration-300"
                    style={{ width: `${synergyScore}%` }}
                  />
                </div>

                {/* 4 Projected Metrics Grid */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-blue-900/6 space-y-1">
                    <div className="text-[11px] text-blue-800/80 font-medium">Margen Operativo Estimado</div>
                    <div className="text-2xl font-extrabold text-blue-950 font-mono">
                      {estimatedMargin}%
                    </div>
                    <div className="text-[10px] text-emerald-600 font-bold">
                      +{Math.round(estimatedMargin * 0.4)}% vs tradicional
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-blue-900/6 space-y-1">
                    <div className="text-[11px] text-blue-800/80 font-medium">Time-to-Market</div>
                    <div className="text-2xl font-extrabold text-blue-950 font-mono">
                      {timeToMarketWeeks} sem
                    </div>
                    <div className="text-[10px] text-blue-600 font-bold">
                      Despliegue ágil continuo
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-blue-900/6 space-y-1">
                    <div className="text-[11px] text-blue-800/80 font-medium">Multiplicador de Escala</div>
                    <div className="text-2xl font-extrabold text-blue-950 font-mono">
                      {scaleMultiplier}x
                    </div>
                    <div className="text-[10px] text-indigo-600 font-bold">
                      Capacidad sin contratar más personal
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#F8FAFC] border border-blue-900/6 space-y-1">
                    <div className="text-[11px] text-blue-800/80 font-medium">Carga Operativa Manual</div>
                    <div className="text-2xl font-extrabold text-rose-600 font-mono">
                      -{Math.round(synergyScore * 0.7)}%
                    </div>
                    <div className="text-[10px] text-slate-500 font-bold">
                      Automatizado por Agentes & Stack
                    </div>
                  </div>
                </div>

                {/* CTAs from the Simulator */}
                <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                  <button
                    type="button"
                    onClick={() => onScheduleClick(`Evaluación de Sinergia 3 Pilares: Score ${synergyScore}/100 (Negocio: ${businessMaturity}%, IA: ${aiIntelligence}%, Stack: ${stackModernity}%)`)}
                    className="flex-1 py-3 px-4 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all flex items-center justify-center gap-2 shadow-md shadow-blue-500/20"
                  >
                    <span>Validar esta Proyección con Gastón</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button
                    type="button"
                    onClick={onDiagnosticoClick}
                    className="py-3 px-4 rounded-xl text-xs font-bold text-blue-950 bg-white hover:bg-blue-50 border border-blue-200 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>Diagnóstico con IA</span>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

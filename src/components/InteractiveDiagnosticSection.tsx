import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Server, 
  Database, 
  Layers, 
  ShieldCheck, 
  Clock, 
  Send, 
  Copy, 
  MessageSquare, 
  RefreshCw, 
  ChevronRight,
  HelpCircle,
  Building2,
  AlertTriangle,
  FileText
} from 'lucide-react';
import { saveProposalLead } from '../lib/supabase';

interface ArchitectureProposal {
  architectureTitle: string;
  diagnosticSummary: string;
  estimatedTimeline: string;
  recommendedStack: string[];
  keyComponents: { name: string; detail: string }[];
  workPhases: { phase: string; duration: string; deliverable: string }[];
  tangibleBenefits: string[];
  executiveMessage: string;
  isAiGenerated?: boolean;
}

interface DiagnosticSectionProps {
  onScheduleWithProposal: (proposalSummary: string, serviceTitle: string) => void;
  onWhatsAppWithProposal: (proposalSummary: string) => void;
}

export const InteractiveDiagnosticSection: React.FC<DiagnosticSectionProps> = ({
  onScheduleWithProposal,
  onWhatsAppWithProposal,
}) => {
  // Wizard state
  const [step, setStep] = useState<number>(1);
  const [organizationType, setOrganizationType] = useState<string>('Empresa Privada / PyME');
  const [primaryChallenge, setPrimaryChallenge] = useState<string>('Inestabilidad o caídas recurrentes de servidores');
  const [currentStack, setCurrentStack] = useState<string[]>(['Linux Ubuntu', 'PostgreSQL']);
  const [urgency, setUrgency] = useState<string>('Alta (Próximos 30 días)');
  const [customContext, setCustomContext] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');

  // Results state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [proposal, setProposal] = useState<ArchitectureProposal | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'stack' | 'phases' | 'benefits'>('stack');

  // Interactive follow-up Q&A state
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [qaLoading, setQaLoading] = useState<boolean>(false);
  const [qaAnswers, setQaAnswers] = useState<{ question: string; answer: string }[]>([]);

  const orgTypes = [
    { id: 'pyme', label: 'Empresa Privada / PyME', desc: 'Comercio, servicios, logística' },
    { id: 'coop', label: 'Cooperativa de Servicios', desc: 'Energía, agua, telecomunicaciones' },
    { id: 'agro', label: 'Agroindustria / Planta', desc: 'Producción, trazabilidad, control' },
    { id: 'public', label: 'Sector Público / Municipio', desc: 'Organismos, portales de gestión' },
    { id: 'startup', label: 'Empresa Tecnológica / SaaS', desc: 'Escalabilidad, microservicios' },
  ];

  const challenges = [
    {
      id: 'crash',
      label: 'Inestabilidad o caídas de servidores',
      desc: 'El sistema colapsa en picos de demanda o facturación',
      icon: AlertTriangle,
    },
    {
      id: 'bi',
      label: 'Datos dispersos en Excel / Falta de BI',
      desc: 'Múltiples planillas sin métricas ni tableros en tiempo real',
      icon: Database,
    },
    {
      id: 'odoo',
      label: 'Implementación o ajuste de ERP Odoo',
      desc: 'Unificar ventas, facturación, stock y contabilidad',
      icon: Layers,
    },
    {
      id: 'legacy',
      label: 'Modernización de sistema antiguo / PostgreSQL',
      desc: 'Migrar software legacy a contenedores Docker y Linux',
      icon: Server,
    },
  ];

  const techOptions = [
    'Linux Ubuntu',
    'Windows Server',
    'Docker Compose',
    'PostgreSQL',
    'MySQL / MariaDB',
    'Excel / Google Sheets',
    'Odoo ERP',
    'Python',
    'Node.js / React',
    'CyberPanel / Nginx',
  ];

  const handleToggleTech = (tech: string) => {
    if (currentStack.includes(tech)) {
      setCurrentStack(currentStack.filter((t) => t !== tech));
    } else {
      setCurrentStack([...currentStack, tech]);
    }
  };

  const handleApplyPreset = (presetText: string, challengeLabel: string) => {
    setCustomContext(presetText);
    setPrimaryChallenge(challengeLabel);
  };

  const handleGenerateProposal = async () => {
    setIsLoading(true);
    setProposal(null);
    setQaAnswers([]);

    try {
      const response = await fetch('/api/architecture-proposal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationType,
          primaryChallenge,
          currentStack,
          urgency,
          customContext,
          contactName: companyName,
        }),
      });

      if (!response.ok) {
        throw new Error('Error al generar propuesta');
      }

      const data = await response.json();
      setProposal(data);

      // Persist lead to Supabase (if configured)
      saveProposalLead({
        organizationType,
        companyName,
        primaryChallenge,
        currentStack,
        urgency,
        architectureTitle: data.architectureTitle,
        diagnosticSummary: data.diagnosticSummary,
        estimatedTimeline: data.estimatedTimeline,
        recommendedStack: data.recommendedStack,
        executiveMessage: data.executiveMessage,
      }).catch((err) => console.debug('Supabase auto-save skipped:', err));
    } catch (error) {
      console.error('Error fetching proposal:', error);
      // Fallback proposal if request fails
      setProposal({
        architectureTitle: 'Topología Modular de Alta Disponibilidad & Docker',
        diagnosticSummary:
          'Se detecta riesgo de sobrecarga por falta de aislamiento de procesos en la infraestructura actual. La solución requiere contenedorización con Docker y optimización de base de datos PostgreSQL.',
        estimatedTimeline: '4 a 6 semanas',
        recommendedStack: ['Linux Ubuntu LTS', 'Docker Compose', 'Nginx Reverse Proxy', 'PostgreSQL 16'],
        keyComponents: [
          { name: 'Aislamiento Docker', detail: 'Servicios desacoplados con límites estrictos de memoria y CPU.' },
          { name: 'Persistencia ACID', detail: 'Base de datos PostgreSQL con políticas de copias de seguridad automáticas.' },
          { name: 'Seguridad Perimetral', detail: 'Hardening de firewall UFW y acceso encriptado TLS 1.3.' },
        ],
        workPhases: [
          { phase: 'Fase 1: Diagnóstico', duration: 'Semana 1', deliverable: 'Auditoría de cuellos de botella y diagrama.' },
          { phase: 'Fase 2: Staging', duration: 'Semanas 2-3', deliverable: 'Entorno de prueba idéntico a producción.' },
          { phase: 'Fase 3: Puesta en Producción', duration: 'Semana 4', deliverable: 'Migración con cero tiempo de inactividad.' },
        ],
        tangibleBenefits: [
          '99.9% de disponibilidad operativa',
          'Aislamiento de fallos para que un error no tire abajo todo el sistema',
          'Copias de seguridad cifradas diarias',
        ],
        executiveMessage:
          'Podemos analizar estos puntos en una sesión técnica breve de 25 minutos para dimensionar los requerimientos de tu equipo.',
        isAiGenerated: false,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleAskQuestion = async (customQ?: string) => {
    const qToSend = customQ || userQuestion;
    if (!qToSend.trim() || !proposal) return;

    setQaLoading(true);
    try {
      const response = await fetch('/api/architecture-qa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: qToSend,
          proposalContext: proposal,
        }),
      });

      const data = await response.json();
      setQaAnswers((prev) => [...prev, { question: qToSend, answer: data.answer }]);
      setUserQuestion('');
    } catch (err) {
      console.error('Error in QA:', err);
      setQaAnswers((prev) => [
        ...prev,
        {
          question: qToSend,
          answer:
            'En las implementaciones que lidero con Gastón Barea, todo cambio se prueba primero en un servidor espejo de staging. De esta forma, garantizamos que la operación diaria continúe sin interrupciones.',
        },
      ]);
    } finally {
      setQaLoading(false);
    }
  };

  const getProposalSummaryText = () => {
    if (!proposal) return '';
    return `PROPUESTA PRELIMINAR - GASTÓN BAREA (gastonbarea.com.ar)
Organización: ${organizationType}
Desafío: ${primaryChallenge}
Arquitectura recomendada: ${proposal.architectureTitle}
Plazo estimado: ${proposal.estimatedTimeline}
Stack sugerido: ${proposal.recommendedStack.join(', ')}

Diagnóstico:
${proposal.diagnosticSummary}

Entregables clave:
${proposal.workPhases.map((p) => `- ${p.phase} (${p.duration}): ${p.deliverable}`).join('\n')}

Beneficios:
${proposal.tangibleBenefits.map((b) => `✓ ${b}`).join('\n')}

Mensaje de Gastón:
"${proposal.executiveMessage}"`;
  };

  const handleCopyProposal = () => {
    const text = getProposalSummaryText();
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSendToWhatsApp = () => {
    if (!proposal) return;
    const msg = `Hola Gastón, utilicé el Generador de Arquitectura con IA en tu sitio (gastonbarea.com.ar) para ${companyName || 'mi empresa'}:
- Organización: ${organizationType}
- Problema: ${primaryChallenge}
- Solución propuesta: ${proposal.architectureTitle} (${proposal.estimatedTimeline})
- Stack: ${proposal.recommendedStack.join(', ')}

Me gustaría agendar una llamada de 20 minutos para evaluar la viabilidad técnica y presupuesto.`;
    onWhatsAppWithProposal(msg);
  };

  const handleScheduleCall = () => {
    if (!proposal) return;
    const summary = getProposalSummaryText();
    onScheduleWithProposal(summary, proposal.architectureTitle);
  };

  return (
    <section id="diagnostico-ia" className="py-24 md:py-32 bg-[#F4F4F4] relative border-b border-blue-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Eyebrow & Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100/80 border border-blue-200/90 text-[11px] font-mono tracking-wider uppercase text-blue-800 font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Motor de Arquitectura & Diagnóstico con IA</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-blue-950 leading-tight">
            Descubrí la solución técnica exacta antes de contratar.
          </h2>
          <p className="text-base sm:text-lg text-blue-900/80 mt-4 leading-relaxed font-normal">
            Interactuá con nuestro motor de ingeniería. Seleccioná el estado de tus servidores o datos y recibí una aproximación de arquitectura pragmática, fases de implementación y mitigación de riesgos con el criterio técnico de Gastón Barea.
          </p>
        </div>

        {/* Main Interactive Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Interactive Input Wizard (6 cols or full if no proposal) */}
          <div className={proposal ? 'lg:col-span-5' : 'lg:col-span-12'}>
            <div className="bg-white rounded-3xl border border-blue-900/10 p-6 sm:p-8 shadow-sm">
              
              <div className="flex items-center justify-between pb-6 border-b border-blue-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xs border border-blue-200">
                    {step}
                  </div>
                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
                      Paso {step} de 3
                    </span>
                    <h3 className="text-sm font-bold text-blue-950">
                      {step === 1 && 'Identificación de Organización'}
                      {step === 2 && 'Desafío Crítico o Cuello de Botella'}
                      {step === 3 && 'Stack Actual & Síntomas Específicos'}
                    </h3>
                  </div>
                </div>

                <div className="flex gap-1.5">
                  {[1, 2, 3].map((s) => (
                    <button
                      key={s}
                      onClick={() => setStep(s)}
                      type="button"
                      className={`w-7 h-2 rounded-full transition-all ${
                        step === s ? 'bg-blue-600' : 'bg-blue-100 hover:bg-blue-200'
                      }`}
                      aria-label={`Ir al paso ${s}`}
                    />
                  ))}
                </div>
              </div>

              {/* Step 1: Organization Type */}
              {step === 1 && (
                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-blue-900 font-semibold mb-2">
                      Nombre de la Empresa u Organización (Opcional)
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Ej: Cooperativa Eléctrica, Logística Patagónica..."
                      className="w-full bg-[#F8FAFC] border border-blue-200/80 rounded-xl px-4 py-2.5 text-xs text-blue-950 placeholder:text-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-blue-900 font-semibold mb-2.5">
                      Tipo de Organización
                    </label>
                    <div className="space-y-2">
                      {orgTypes.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setOrganizationType(type.label)}
                          className={`w-full p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                            organizationType === type.label
                              ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                              : 'bg-white border-blue-900/10 hover:border-blue-300 hover:bg-blue-50/30'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-blue-950">{type.label}</div>
                            <div className="text-[11px] text-blue-700/80 mt-0.5">{type.desc}</div>
                          </div>
                          {organizationType === type.label && (
                            <Check className="w-4 h-4 text-blue-600 shrink-0" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>Siguiente: Desafío</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Primary Challenge */}
              {step === 2 && (
                <div className="mt-6 space-y-4">
                  <label className="block text-xs font-mono uppercase tracking-wider text-blue-900 font-semibold">
                    ¿Cuál es el problema que necesitás resolver?
                  </label>
                  <div className="space-y-2.5">
                    {challenges.map((c) => {
                      const Icon = c.icon;
                      const isSelected = primaryChallenge === c.label;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => setPrimaryChallenge(c.label)}
                          className={`w-full p-4 rounded-xl border text-left transition-all flex items-start gap-3 ${
                            isSelected
                              ? 'bg-blue-50/80 border-blue-500 shadow-xs ring-1 ring-blue-500/20'
                              : 'bg-white border-blue-900/10 hover:border-blue-300 hover:bg-blue-50/30'
                          }`}
                        >
                          <div className={`p-2 rounded-lg shrink-0 ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100/70 text-blue-800'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <div className="text-xs font-bold text-blue-950">{c.label}</div>
                            <div className="text-[11px] text-blue-700/80 mt-0.5 leading-relaxed">{c.desc}</div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-blue-600 shrink-0 mt-1" />}
                        </button>
                      );
                    })}
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-blue-900 font-semibold mb-2">
                      Nivel de Urgencia / Criticidad
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        'Crítica (Inmediata)',
                        'Alta (Próximos 30 días)',
                        'Estratégica (Trimestral)',
                      ].map((urg) => (
                        <button
                          key={urg}
                          type="button"
                          onClick={() => setUrgency(urg)}
                          className={`p-2 rounded-xl text-center text-[11px] font-semibold border transition-all ${
                            urgency === urg
                              ? 'bg-blue-900 text-white border-blue-900'
                              : 'bg-[#F8FAFC] border-blue-200/80 text-blue-900 hover:bg-blue-50'
                          }`}
                        >
                          {urg}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2 text-xs font-semibold text-blue-800 hover:text-blue-950 transition-colors"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-xs font-semibold inline-flex items-center gap-1.5 transition-all shadow-xs"
                    >
                      <span>Siguiente: Stack & Síntomas</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Current Stack & Custom Context */}
              {step === 3 && (
                <div className="mt-6 space-y-5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-blue-900 font-semibold mb-2">
                      ¿Qué tecnologías o herramientas tienen hoy? (Opcional)
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {techOptions.map((tech) => {
                        const isSelected = currentStack.includes(tech);
                        return (
                          <button
                            key={tech}
                            type="button"
                            onClick={() => handleToggleTech(tech)}
                            className={`text-xs px-3 py-1.5 rounded-full border transition-all font-mono font-medium ${
                              isSelected
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-[#F8FAFC] text-blue-900 border-blue-200/80 hover:bg-blue-50'
                            }`}
                          >
                            {isSelected ? '✓ ' : '+ '}
                            {tech}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Preset quick buttons */}
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-blue-700 font-semibold mb-2">
                      Casos frecuentes de clientes (clic para cargar síntoma):
                    </label>
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          handleApplyPreset(
                            'El servidor se satura y se cuelga a fin de mes cuando más de 35 usuarios emiten facturas simultáneamente.',
                            'Inestabilidad o caídas de servidores'
                          )
                        }
                        className="w-full text-left text-[11px] p-2 rounded-lg bg-blue-50/60 hover:bg-blue-100/70 text-blue-900 border border-blue-200/60 transition-colors"
                      >
                        ⚡ "El servidor colapsa cuando facturan más de 30 personas a fin de mes"
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleApplyPreset(
                            'Tenemos planillas de cálculo dispersas entre compras, tesorería y depósitos. Cada reporte tarda días y tiene inconsistencias.',
                            'Datos dispersos en Excel / Falta de BI'
                          )
                        }
                        className="w-full text-left text-[11px] p-2 rounded-lg bg-blue-50/60 hover:bg-blue-100/70 text-blue-900 border border-blue-200/60 transition-colors"
                      >
                        📊 "Tenemos 15 archivos Excel distintos y tardamos 4 días en sacar un balance"
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleApplyPreset(
                            'Necesitamos migrar un sistema legado monolítico a contenedores Docker en Linux Ubuntu con copias de seguridad cifradas fuera de sitio.',
                            'Modernización de sistema antiguo / PostgreSQL'
                          )
                        }
                        className="w-full text-left text-[11px] p-2 rounded-lg bg-blue-50/60 hover:bg-blue-100/70 text-blue-900 border border-blue-200/60 transition-colors"
                      >
                        🔒 "Queremos contenerizar con Docker y asegurar backups cifrados sin vendor lock-in"
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-blue-900 font-semibold mb-1.5">
                      Detalle adicional del síntoma o meta (Tus palabras):
                    </label>
                    <textarea
                      rows={2}
                      value={customContext}
                      onChange={(e) => setCustomContext(e.target.value)}
                      placeholder="Ej: Queremos dejar de depender de licencias privativas y tener alta disponibilidad..."
                      className="w-full bg-[#F8FAFC] border border-blue-200/80 rounded-xl p-3 text-xs text-blue-950 placeholder:text-blue-400 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    />
                  </div>

                  <div className="pt-3 flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2 text-xs font-semibold text-blue-800 hover:text-blue-950 transition-colors"
                    >
                      Atrás
                    </button>
                    <button
                      type="button"
                      disabled={isLoading}
                      onClick={handleGenerateProposal}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white rounded-full text-xs font-bold inline-flex items-center gap-2 transition-all shadow-md shadow-blue-500/25 active:scale-95"
                    >
                      {isLoading ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Calculando Solución con IA...</span>
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                          <span>Generar Propuesta de Arquitectura</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* Right Column: AI Architecture Proposal Output (7 cols) */}
          {proposal && (
            <div className="lg:col-span-7 space-y-6 animate-fade-in">
              <div className="bg-white rounded-3xl border border-blue-900/10 p-6 sm:p-9 shadow-lg shadow-blue-950/[0.04] relative">
                
                {/* Header of proposal */}
                <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-blue-100">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
                      Propuesta Preliminar Generada
                    </span>
                    {proposal.isAiGenerated && (
                      <span className="text-[10px] font-mono bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                        Gemini 3.8 Flash
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-700">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Plazo: <strong className="text-blue-950">{proposal.estimatedTimeline}</strong></span>
                  </div>
                </div>

                {/* Proposal Title & Diagnostic */}
                <div className="mt-6">
                  <h3 className="text-2xl font-bold text-blue-950 tracking-tight leading-tight">
                    {proposal.architectureTitle}
                  </h3>
                  <div className="mt-3.5 p-4 rounded-2xl bg-blue-50/60 border border-blue-200/70 text-xs text-blue-900/90 leading-relaxed">
                    <strong className="text-blue-950 font-semibold block mb-1">
                      Diagnóstico de Causa Raíz:
                    </strong>
                    {proposal.diagnosticSummary}
                  </div>
                </div>

                {/* Sub-tabs */}
                <div className="mt-6 flex items-center gap-1 border-b border-blue-100 pb-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('stack')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'stack'
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-blue-700/80 hover:text-blue-950'
                    }`}
                  >
                    Topología & Stack
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('phases')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'phases'
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-blue-700/80 hover:text-blue-950'
                    }`}
                  >
                    Fases & Cronograma
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('benefits')}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      activeTab === 'benefits'
                        ? 'bg-blue-100 text-blue-900'
                        : 'text-blue-700/80 hover:text-blue-950'
                    }`}
                  >
                    Impacto & Beneficios
                  </button>
                </div>

                {/* Tab 1: Stack & Components */}
                {activeTab === 'stack' && (
                  <div className="mt-6 space-y-5">
                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-semibold mb-2">
                        Stack Técnico Recomendado:
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {proposal.recommendedStack.map((st, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-[#F8FAFC] border border-blue-200/90 text-blue-900"
                          >
                            {st}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-semibold mb-2">
                        Componentes Arquitectónicos Desacoplados:
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {proposal.keyComponents.map((kc, i) => (
                          <div key={i} className="p-3.5 rounded-xl border border-blue-900/10 bg-[#F8FAFC]">
                            <div className="text-xs font-bold text-blue-950 flex items-center gap-1.5">
                              <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                              <span>{kc.name}</span>
                            </div>
                            <div className="text-[11px] text-blue-900/80 mt-1 pl-5 leading-relaxed">
                              {kc.detail}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* Tab 2: Phases */}
                {activeTab === 'phases' && (
                  <div className="mt-6 space-y-3">
                    {proposal.workPhases.map((wp, i) => (
                      <div key={i} className="p-4 rounded-xl border border-blue-900/10 bg-[#F8FAFC] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <div className="text-xs font-bold text-blue-950">{wp.phase}</div>
                          <div className="text-[11px] text-blue-800 mt-0.5">{wp.deliverable}</div>
                        </div>
                        <span className="text-[11px] font-mono text-blue-700 bg-blue-100 px-2.5 py-1 rounded-full shrink-0 font-medium self-start sm:self-center">
                          {wp.duration}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tab 3: Benefits */}
                {activeTab === 'benefits' && (
                  <div className="mt-6 space-y-3">
                    {proposal.tangibleBenefits.map((ben, i) => (
                      <div key={i} className="flex items-start gap-3 p-3.5 rounded-xl bg-blue-50/50 border border-blue-200/60">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span className="text-xs text-blue-950 font-medium leading-relaxed">{ben}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Gastón's Executive Note */}
                <div className="mt-6 p-4 rounded-2xl bg-blue-900 text-white space-y-1.5">
                  <div className="flex items-center gap-2 text-xs font-mono text-blue-200 uppercase tracking-wider font-semibold">
                    <span>Mensaje de Gastón Barea</span>
                    <span>·</span>
                    <span>Chubut, Patagonia</span>
                  </div>
                  <p className="text-xs text-blue-100 leading-relaxed italic">
                    "{proposal.executiveMessage}"
                  </p>
                </div>

                {/* Conversion Actions (High-Impact!) */}
                <div className="mt-8 pt-6 border-t border-blue-100 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleSendToWhatsApp}
                    className="flex-1 min-w-[200px] py-3 px-5 rounded-full bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold inline-flex items-center justify-center gap-2 shadow-md shadow-blue-500/20 active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Enviar a Gastón por WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleScheduleCall}
                    className="flex-1 min-w-[200px] py-3 px-5 rounded-full bg-white hover:bg-blue-50 text-blue-950 border border-blue-300 text-xs font-bold inline-flex items-center justify-center gap-2 shadow-xs active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4 text-blue-600" />
                    <span>Agendar Consulta sobre esta Propuesta</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopyProposal}
                    className="p-3 rounded-full bg-[#F8FAFC] hover:bg-blue-100 text-blue-800 border border-blue-200/80 transition-colors"
                    title="Copiar resumen ejecutivo"
                    aria-label="Copiar resumen ejecutivo"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Interactive Technical Q&A */}
                <div className="mt-8 pt-6 border-t border-blue-100 space-y-4">
                  <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-blue-600" />
                    <h4 className="text-xs font-mono uppercase tracking-wider text-blue-900 font-semibold">
                      ¿Dudas sobre esta solución? Consultale al Asistente Técnico:
                    </h4>
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      '¿Requiere frenar la operación para migrar?',
                      '¿Por qué PostgreSQL y no MySQL?',
                      '¿Qué servidor mínimo necesitamos?',
                    ].map((q) => (
                      <button
                        key={q}
                        type="button"
                        onClick={() => handleAskQuestion(q)}
                        disabled={qaLoading}
                        className="text-[11px] px-3 py-1 rounded-full bg-blue-50 hover:bg-blue-100 text-blue-800 border border-blue-200 transition-colors"
                      >
                        {q}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={userQuestion}
                      onChange={(e) => setUserQuestion(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && handleAskQuestion()}
                      placeholder="Escribí una duda técnica puntual sobre la propuesta..."
                      className="flex-1 bg-[#F8FAFC] border border-blue-200/80 rounded-xl px-4 py-2 text-xs text-blue-950 placeholder:text-blue-400 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button
                      type="button"
                      disabled={qaLoading || !userQuestion.trim()}
                      onClick={() => handleAskQuestion()}
                      className="px-4 py-2 bg-blue-900 hover:bg-blue-800 disabled:opacity-40 text-white rounded-xl text-xs font-semibold transition-colors shrink-0"
                    >
                      {qaLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Preguntar'}
                    </button>
                  </div>

                  {qaAnswers.length > 0 && (
                    <div className="space-y-3 pt-2">
                      {qaAnswers.map((item, idx) => (
                        <div key={idx} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-blue-200/80 space-y-1.5">
                          <div className="text-[11px] font-bold text-blue-950 flex items-center gap-1.5">
                            <span className="text-blue-600">Q:</span>
                            <span>{item.question}</span>
                          </div>
                          <div className="text-xs text-blue-900/85 leading-relaxed pl-4 border-l-2 border-blue-500">
                            {item.answer}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

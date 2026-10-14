import React, { useState, useMemo } from 'react';
import { 
  Check, 
  Clock, 
  Send, 
  Copy, 
  Server, 
  Database, 
  Globe, 
  Compass,
  MessageSquare
} from 'lucide-react';

interface ConfiguratorProps {
  onSendScopeToContact: (scopeData: {
    objective: string;
    startingPoint: string;
    timeline: string;
    recommendedStack: string[];
    summary: string;
  }) => void;
  onWhatsAppWithScope: (scopeMessage: string) => void;
}

export const ArchitectureConfigurator: React.FC<ConfiguratorProps> = ({
  onSendScopeToContact,
  onWhatsAppWithScope,
}) => {
  const [objective, setObjective] = useState<string>('infra');
  const [startingPoint, setStartingPoint] = useState<string>('legacy');
  const [timeline, setTimeline] = useState<string>('standard');
  const [copied, setCopied] = useState<boolean>(false);

  const objectives = [
    {
      id: 'infra',
      title: 'Infraestructura & Servidores',
      desc: 'Linux, Docker, caídas o lentitud',
      icon: Server,
    },
    {
      id: 'bi',
      title: 'Business Intelligence & BI',
      desc: 'Dashboards y unificación de datos',
      icon: Database,
    },
    {
      id: 'web',
      title: 'Software Web a Medida',
      desc: 'Next.js, ERP y portales internos',
      icon: Globe,
    },
    {
      id: 'cto',
      title: 'Dirección Técnica / CTO',
      desc: 'Consultoría y liderazgo estratégico',
      icon: Compass,
    },
  ];

  const startingPoints = [
    { id: 'legacy', title: 'Sistema Legacy Antiguo', note: 'Migración cuidadosa' },
    { id: 'instability', title: 'Inestabilidad / Caídas', note: 'Urgencia de estabilización' },
    { id: 'greenfield', title: 'Nuevo desde Cero', note: 'Arquitectura limpia' },
    { id: 'scale', title: 'Escalar Existente', note: 'Eliminar cuellos de botella' },
  ];

  const timelines = [
    { id: 'fast', title: 'Fast-Track', range: '< 30 días' },
    { id: 'standard', title: 'Estándar', range: '6 - 8 semanas' },
    { id: 'continuous', title: 'Mensual', range: 'Continuo' },
  ];

  const recommendedSpec = useMemo(() => {
    let title = 'Modernización de Servidores & Dockerización';
    let summary = 'Entorno de producción 99.9% uptime, documentación de despliegue y scripts de automatización.';
    let estimatedTime = '6 - 8 semanas';
    let stack = ['Linux Ubuntu', 'Docker Compose', 'Nginx Proxy', 'PostgreSQL', 'Backups Cifrados'];
    let phases = [
      'Auditoría de hardware y servicios actuales',
      'Contenedorización en entorno staging aislado',
      'Migración de datos y conmutación con cero downtime',
      'Monitoreo proactivo y plan de contingencia'
    ];

    if (objective === 'infra') {
      if (startingPoint === 'instability') {
        title = 'Diagnóstico Crítico & Hardening de Servidores';
        summary = 'Estabilización inmediata de infraestructura, mitigación de fallas y blindaje perimetral.';
        estimatedTime = timeline === 'fast' ? '2 a 3 semanas (Fast-Track)' : '4 semanas';
        stack = ['Ubuntu Server', 'Docker', 'UFW / Fail2ban', 'Nginx', 'PostgreSQL Tuning'];
        phases = [
          'Diagnóstico de cuellos de botella y logs en caliente',
          'Aislamiento de procesos conflictivos en contenedores',
          'Hardening de firewall, puertos y SSH',
          'Verificación de backups automáticos y failover'
        ];
      } else {
        title = 'Modernización de Servidores & Dockerización';
        summary = 'Migración a arquitectura Linux robusta con contenedores Docker y copias de seguridad continuas.';
        estimatedTime = timeline === 'fast' ? '< 30 días' : timeline === 'continuous' ? 'Abono mensual continuo' : '6 - 8 semanas';
        stack = ['Linux Ubuntu LTS', 'Docker Compose', 'PostgreSQL', 'CyberPanel', 'Backups Offsite'];
        phases = [
          'Auditoría técnica de sistemas y bases de datos',
          'Orquestación de servicios en Docker Compose',
          'Migración de bases transaccionales sin pérdida',
          'Documentación y transferencia técnica'
        ];
      }
    } else if (objective === 'bi') {
      title = 'Data Warehouse & Tableros Ejecutivos de BI';
      summary = 'Consolidación de fuentes dispersas en PostgreSQL y tableros interactivos para toma de decisiones.';
      estimatedTime = timeline === 'fast' ? '< 4 semanas' : timeline === 'continuous' ? 'Soporte analítico continuo' : '6 semanas';
      stack = ['PostgreSQL', 'Metabase', 'Python ETL', 'SQL Avanzado', 'Power BI'];
      phases = [
        'Relevamiento de fuentes de datos (ERPs, planillas, bases operativas)',
        'Diseño del modelo dimensional (Star Schema)',
        'Construcción y automatización de pipelines ETL',
        'Publicación de tableros ejecutivos con alertas automáticas'
      ];
    } else if (objective === 'web') {
      title = 'Plataforma Web a Medida & Integración ERP';
      summary = 'Desarrollo frontend en Next.js integrado con Odoo ERP y bases de datos seguras.';
      estimatedTime = timeline === 'fast' ? '4 a 5 semanas (MVP)' : timeline === 'continuous' ? 'Evolutivo continuo' : '8 a 10 semanas';
      stack = ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Odoo ERP', 'Supabase / PostgreSQL'];
      phases = [
        'Diseño de flujos y prototipado UI/UX en Figma',
        'Desarrollo modular frontend y servicios backend',
        'Integración bidireccional con Odoo ERP o APIs',
        'Despliegue en producción con PWA y optimización SEO'
      ];
    } else if (objective === 'cto') {
      title = 'Dirección Tecnológica & Consultoría Estratégica (CTO Fraccional)';
      summary = 'Acompañamiento directivo continuo para selección de stacks, auditoría de proveedores y gobierno técnico.';
      estimatedTime = 'Abono mensual continuo (horas dedicadas)';
      stack = ['Arquitectura Hexagonal', 'Clean Code', 'Scrum / Agile', 'Auditoría de Deuda Técnica'];
      phases = [
        'Auditoría integral inicial de arquitectura y equipo',
        'Plan maestro tecnológico alineado al modelo de negocio',
        'Reuniones semanales de revisión técnica y selección de herramientas',
        'Acompañamiento en contrataciones clave y negociaciones de software'
      ];
    }

    return { title, summary, estimatedTime, stack, phases };
  }, [objective, startingPoint, timeline]);

  const activeObjectiveObj = objectives.find((o) => o.id === objective);
  const activeStartingObj = startingPoints.find((s) => s.id === startingPoint);

  const proposalText = `PROPUESTA DE ALCANCE - GASTÓN BAREA (gastonbarea.com.ar)
------------------------------------------------------
Objetivo: ${activeObjectiveObj?.title}
Punto de partida: ${activeStartingObj?.title}
Plazo estimado: ${recommendedSpec.estimatedTime}

Solución: ${recommendedSpec.title}
${recommendedSpec.summary}

Stack Recomendado:
${recommendedSpec.stack.join(', ')}

Fases de Ejecución:
${recommendedSpec.phases.map((p, i) => `${i + 1}. ${p}`).join('\n')}
------------------------------------------------------`;

  const handleCopyProposal = () => {
    navigator.clipboard.writeText(proposalText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsAppClick = () => {
    const text = `Hola Gastón, estuve utilizando el configurador en gastonbarea.com.ar para "${activeObjectiveObj?.title}" (Punto de partida: ${activeStartingObj?.title}, Plazo: ${recommendedSpec.estimatedTime}). Me interesa la solución: "${recommendedSpec.title}". ¿Podemos coordinar una consulta técnica?`;
    onWhatsAppWithScope(text);
  };

  const handleSendToContact = () => {
    onSendScopeToContact({
      objective: activeObjectiveObj?.title || '',
      startingPoint: activeStartingObj?.title || '',
      timeline: recommendedSpec.estimatedTime,
      recommendedStack: recommendedSpec.stack,
      summary: `${recommendedSpec.title}: ${recommendedSpec.summary}`,
    });
  };

  return (
    <section id="configurador" className="py-24 md:py-32 bg-[#F4F4F4] relative border-b border-blue-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header in Blue */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono tracking-widest uppercase text-blue-600 mb-3 font-semibold">
            CONFIGURADOR DE ARQUITECTURA
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-blue-950 leading-tight">
            Calculá el alcance y la topología para tu empresa.
          </h2>
          <p className="text-base sm:text-lg text-blue-900/80 mt-4 leading-relaxed font-normal">
            Elegí tus prioridades operativas para obtener una propuesta técnica con tecnologías recomendadas y plazos de ejecución estimados.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Selectors Column (7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Step 1 */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-700 mb-3 font-semibold">
                1. ¿Qué objetivo tecnológico prioriza tu organización?
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {objectives.map((obj) => {
                  const Icon = obj.icon;
                  const isSelected = objective === obj.id;

                  return (
                    <button
                      key={obj.id}
                      type="button"
                      onClick={() => setObjective(obj.id)}
                      className={`p-5 rounded-2xl border text-left transition-all ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-500 shadow-sm ring-1 ring-blue-500/20'
                          : 'bg-white border-blue-900/8 hover:border-blue-300 hover:bg-blue-50/30'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 mb-2">
                        <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-600' : 'text-blue-400'}`} />
                        <span className={`text-xs font-bold ${isSelected ? 'text-blue-950' : 'text-blue-900'}`}>
                          {obj.title}
                        </span>
                      </div>
                      <p className="text-[11px] text-blue-800/80">
                        {obj.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2 */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-700 mb-3 font-semibold">
                2. ¿Cuál es el punto de partida técnico?
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {startingPoints.map((sp) => {
                  const isSelected = startingPoint === sp.id;

                  return (
                    <button
                      key={sp.id}
                      type="button"
                      onClick={() => setStartingPoint(sp.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-500 shadow-sm'
                          : 'bg-white border-blue-900/8 hover:border-blue-300'
                      }`}
                    >
                      <div className={`text-xs font-bold leading-tight ${isSelected ? 'text-blue-950' : 'text-blue-900'}`}>
                        {sp.title}
                      </div>
                      <div className="text-[10px] text-blue-600 mt-1 font-medium">
                        {sp.note}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3 */}
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-blue-700 mb-3 font-semibold">
                3. Plazo estimado o prioridad de entrega:
              </div>
              <div className="grid grid-cols-3 gap-3">
                {timelines.map((tl) => {
                  const isSelected = timeline === tl.id;

                  return (
                    <button
                      key={tl.id}
                      type="button"
                      onClick={() => setTimeline(tl.id)}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'bg-blue-50/80 border-blue-500 shadow-sm'
                          : 'bg-white border-blue-900/8 hover:border-blue-300'
                      }`}
                    >
                      <div className={`text-xs font-semibold mb-1 ${isSelected ? 'text-blue-950 font-bold' : 'text-blue-800'}`}>
                        {tl.title}
                      </div>
                      <div className="text-xs font-mono font-bold text-blue-950">
                        {tl.range}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Output Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl bg-white border border-blue-900/10 p-8 shadow-sm space-y-6">
              
              <div className="flex items-center justify-between pb-5 border-b border-blue-100">
                <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-semibold">
                  Especificación Recomendada
                </div>
                <div className="text-xs font-mono text-blue-900 font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  <span>{recommendedSpec.estimatedTime}</span>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-blue-950 leading-snug tracking-tight">
                  {recommendedSpec.title}
                </h3>
                <p className="text-xs text-blue-900/80 mt-2 leading-relaxed font-normal">
                  {recommendedSpec.summary}
                </p>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-blue-700 mb-2.5 font-semibold">
                  Stack Aconsejado:
                </div>
                <div className="flex flex-wrap items-center gap-1.5">
                  {recommendedSpec.stack.map((item, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-mono text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200/80 font-medium"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-blue-700 mb-2.5 font-semibold">
                  Fases de Trabajo:
                </div>
                <ul className="space-y-2">
                  {recommendedSpec.phases.map((ph, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-blue-950 font-medium">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                      <span>{ph}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-6 border-t border-blue-100 space-y-2.5">
                <button
                  onClick={handleSendToContact}
                  type="button"
                  className="w-full py-3 px-5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-full transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Enviar Consulta con este Alcance</span>
                </button>

                <button
                  onClick={handleWhatsAppClick}
                  type="button"
                  className="w-full py-2.5 px-4 text-xs font-semibold text-blue-900 bg-white hover:bg-blue-50 border border-blue-200 rounded-full transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-blue-600" />
                  <span>Hablar por WhatsApp con esta Especificación</span>
                </button>

                <button
                  onClick={handleCopyProposal}
                  type="button"
                  className="w-full py-2 px-3 text-[11px] font-mono text-blue-700 hover:text-blue-950 transition-colors flex items-center justify-center gap-1.5 font-medium"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold">Propuesta copiada al portapapeles</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar resumen técnico de propuesta</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

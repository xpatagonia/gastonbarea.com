import React, { useState } from 'react';
import { 
  Globe, 
  Cpu, 
  Database, 
  Server, 
  ShieldCheck
} from 'lucide-react';

export const TopologySection: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(0);

  const layers = [
    {
      id: 0,
      title: 'Frontend & Experiencia UI/UX',
      tag: 'Edge / SSR',
      icon: Globe,
      techs: 'Next.js · React · Tailwind CSS · PWA',
      role: 'Presentación responsiva, Server-Side Rendering (SSR) y aplicaciones web progresivas (PWA) de carga instantánea.',
      specs: [
        { label: 'Renderizado', value: 'Edge Delivery & Server-Side Rendering' },
        { label: 'Norma de Diseño', value: 'Mobile-First, WCAG 2.1 AA, cero dependencias pesadas' },
        { label: 'Seguridad', value: 'JWT Bearer, validación Zod y sanitización en cliente' },
        { label: 'Tolerancia', value: 'Caché offline y service workers integrados' }
      ]
    },
    {
      id: 1,
      title: 'Capa de Servicios & Integraciones',
      tag: 'Alta Concurrencia',
      icon: Cpu,
      techs: 'APIs REST · Odoo ERP · Microservicios Node / Python',
      role: 'Orquestación de lógica de negocio, módulos de gestión corporativa en Odoo y APIs desacopladas.',
      specs: [
        { label: 'Plataforma Core', value: 'Odoo ERP (Ventas, Facturación, Inventario y CRM)' },
        { label: 'Microservicios', value: 'Node.js y Python FastAPI asíncrono' },
        { label: 'Integración', value: 'REST JSON, Webhooks y RPC sobre TLS 1.3' },
        { label: 'Arquitectura', value: 'Procesos modulares desacoplados en contenedores' }
      ]
    },
    {
      id: 2,
      title: 'Bases de Datos & Persistencia ACID',
      tag: 'Cero Pérdida',
      icon: Database,
      techs: 'PostgreSQL · Supabase · Backups Cifrados Diarios',
      role: 'Almacenamiento transaccional de máxima integridad relacional, modelos analíticos y replicación.',
      specs: [
        { label: 'Motor Relacional', value: 'PostgreSQL 16+ empresarial con indexación avanzada' },
        { label: 'Aislamiento', value: 'Row Level Security (RLS) y esquemas segregados' },
        { label: 'Copias de Seguridad', value: 'Volcado diario cifrado AES-256 con retención offsite' },
        { label: 'Cumplimiento', value: 'ACID estricto, transacciones atómicas seguras' }
      ]
    },
    {
      id: 3,
      title: 'Infraestructura Host & Seguridad Perimetral',
      tag: '99.9% Uptime',
      icon: Server,
      techs: 'Linux Ubuntu Server · Docker Compose · Nginx · WireGuard VPN',
      role: 'Entorno de ejecución aislado en hardware dedicado o VPS con defensas perimetrales activas.',
      specs: [
        { label: 'Sistema Base', value: 'Ubuntu Server LTS con kernel optimizado' },
        { label: 'Contenedores', value: 'Docker & Docker Compose con cuotas de recursos' },
        { label: 'Reverse Proxy', value: 'Nginx con compresión Brotli y HTTP/2 & HTTP/3' },
        { label: 'Defensa de Red', value: 'UFW Firewall, llaves ED25519 y VPN WireGuard' }
      ]
    }
  ];

  return (
    <section id="topologia" className="py-24 md:py-32 bg-[#F4F4F4] relative border-b border-blue-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header in Blue */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono tracking-widest uppercase text-blue-600 mb-3 font-semibold">
            TOPOLOGÍA DE SISTEMAS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-blue-950 leading-tight">
            Ingeniería para Producción Continua
          </h2>
          <p className="text-base sm:text-lg text-blue-900/80 mt-4 leading-relaxed font-normal">
            Arquitectura multicapa desacoplada para sistemas corporativos, transacciones seguras y tolerancia a fallos.
          </p>
        </div>

        {/* Apple Bento Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Stack list (6 cols) */}
          <div className="lg:col-span-6 space-y-3">
            {layers.map((layer) => {
              const Icon = layer.icon;
              const isSelected = activeLayer === layer.id;

              return (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  type="button"
                  className={`w-full text-left p-6 rounded-2xl border transition-all duration-200 relative group ${
                    isSelected
                      ? 'bg-blue-50/80 border-blue-500 shadow-md shadow-blue-500/10 ring-1 ring-blue-500/20'
                      : 'bg-white border-blue-900/10 hover:border-blue-400/50 hover:bg-blue-50/30'
                  }`}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100/70 text-blue-900 group-hover:bg-blue-200/80'
                      }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className={`text-sm sm:text-base font-bold ${
                          isSelected ? 'text-blue-950' : 'text-blue-900'
                        }`}>
                          {layer.title}
                        </h3>
                        <p className="text-xs font-mono text-blue-700/80 mt-0.5">
                          {layer.techs}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[11px] font-mono px-2.5 py-1 rounded-full border shrink-0 font-medium ${
                      isSelected
                        ? 'text-blue-700 bg-blue-100 border-blue-300'
                        : 'text-blue-800 bg-[#F8FAFC] border-blue-200/60'
                    }`}>
                      {layer.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep inspection card (6 cols) */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl bg-white border border-blue-900/10 p-7 sm:p-9 shadow-lg shadow-blue-950/[0.04] relative">
              
              <div className="flex items-center justify-between pb-5 border-b border-blue-100">
                <div className="text-xs font-mono tracking-wider text-blue-600 uppercase font-semibold">
                  Inspección de Capa
                </div>
                <div className="flex items-center gap-1.5 text-xs text-blue-900 font-mono font-medium">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Verificado en Producción</span>
                </div>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <h4 className="text-xl font-bold text-blue-950 tracking-tight">
                    {layers[activeLayer].title}
                  </h4>
                  <p className="text-sm text-blue-900/80 mt-2 leading-relaxed">
                    {layers[activeLayer].role}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <div className="text-xs font-mono uppercase tracking-wider text-blue-600 font-semibold">
                    Protocolos & Especificaciones:
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {layers[activeLayer].specs.map((spec, i) => (
                      <div key={i} className="p-3.5 rounded-xl bg-[#F8FAFC] border border-blue-900/8">
                        <div className="text-[10px] font-mono uppercase text-blue-600 font-medium">
                          {spec.label}
                        </div>
                        <div className="text-xs font-semibold text-blue-950 mt-1">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/60 text-xs text-blue-900 leading-relaxed">
                  <span className="text-blue-950 font-bold">Invariante de Arquitectura:</span> Todo componente es desplegado mediante infraestructura como código reproducible, con volúmenes de persistencia aislados y recuperación con cero downtime.
                </div>

              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

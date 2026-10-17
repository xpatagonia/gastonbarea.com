import React, { useState, useRef } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Camera, 
  ChevronRight, 
  Sparkles, 
  Play, 
  Pause, 
  Video, 
  EyeOff, 
  Sliders, 
  X, 
  TrendingUp, 
  Brain, 
  Cpu, 
  Layers, 
  ArrowUpRight, 
  CheckCircle2, 
  Calendar, 
  MessageSquare 
} from 'lucide-react';
import { PresentationVideo } from './PresentationVideo';

interface HeroProps {
  onExploreServices: () => void;
  onScheduleClick: () => void;
  onWhatsAppClick: () => void;
  onDiagnosticoClick: () => void;
  onExplorePillars?: () => void;
}

interface VideoPreset {
  id: string;
  name: string;
  url: string;
  desc: string;
}

const VIDEO_PRESETS: VideoPreset[] = [
  {
    id: 'network',
    name: 'Redes & Conectividad Global',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-network-connections-31912-large.mp4',
    desc: 'Topología de red, nodos desacoplados y flujos de datos',
  },
  {
    id: 'bi-data',
    name: 'Business Intelligence & Algoritmos',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4',
    desc: 'Ingeniería de datos, métricas transaccionales y analytics',
  },
  {
    id: 'servers',
    name: 'Datacenter & Servidores Linux',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-server-room-rack-lights-42562-large.mp4',
    desc: 'Racks de infraestructura, alta disponibilidad y producción continua',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onScheduleClick,
  onWhatsAppClick,
  onDiagnosticoClick,
  onExplorePillars,
}) => {
  const [profileImg, setProfileImg] = useState<string | null>(null);

  // Background Video State
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('network');
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('');
  const [videoOpacity, setVideoOpacity] = useState<number>(0.22);
  const [showVideoSettings, setShowVideoSettings] = useState<boolean>(false);
  const [videoLoadError, setVideoLoadError] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const activeVideoUrl = customVideoUrl.trim() 
    ? customVideoUrl 
    : (VIDEO_PRESETS.find((p) => p.id === selectedPresetId)?.url || VIDEO_PRESETS[0].url);

  const handleCustomPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileImg(url);
    }
  };

  const togglePlayPause = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-36 md:pb-24 overflow-hidden border-b border-blue-900/10 bg-[#F4F4F4]">
      
      {/* 1. BACKGROUND AMBIENT VIDEO LAYER */}
      {videoEnabled && !videoLoadError && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <video
            ref={videoRef}
            key={activeVideoUrl}
            autoPlay
            loop
            muted
            playsInline
            onError={() => setVideoLoadError(true)}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700"
            style={{ opacity: videoOpacity }}
          >
            <source src={activeVideoUrl} type="video/mp4" />
          </video>
          {/* Frosted canvas blend overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#F4F4F4]/85 via-[#F4F4F4]/80 to-[#F4F4F4] backdrop-blur-[1px]" 
            aria-hidden="true"
          />
        </div>
      )}

      {/* Subtle Integrated Ambient Light (Grounded, No Floating Motion) */}
      <div 
        className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[350px] bg-gradient-to-b from-blue-300/15 via-indigo-200/10 to-transparent blur-3xl pointer-events-none rounded-full z-0"
        aria-hidden="true"
      />

      {/* 2. DOCKED VIDEO CONTROL */}
      <div className="absolute top-20 right-4 sm:right-8 z-20 flex items-center gap-1.5">
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-900/10 shadow-xs text-xs font-mono text-blue-900">
          <button
            type="button"
            onClick={() => setVideoEnabled(!videoEnabled)}
            className="flex items-center gap-1 text-[11px] font-semibold hover:text-blue-600 transition-colors px-1 cursor-pointer"
            title={videoEnabled ? 'Ocultar video de fondo' : 'Activar video de fondo'}
          >
            {videoEnabled ? (
              <>
                <Video className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Ambiente Activo</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Ambiente Pausado</span>
              </>
            )}
          </button>

          {videoEnabled && !videoLoadError && (
            <>
              <span className="text-blue-200">|</span>
              <button
                type="button"
                onClick={togglePlayPause}
                className="p-1 hover:text-blue-600 transition-colors cursor-pointer"
                title={isPlaying ? 'Pausar video' : 'Reproducir video'}
              >
                {isPlaying ? <Pause className="w-3 h-3 text-blue-700" /> : <Play className="w-3 h-3 text-blue-700" />}
              </button>
              <span className="text-blue-200">|</span>
              <button
                type="button"
                onClick={() => setShowVideoSettings(!showVideoSettings)}
                className="p-1 hover:text-blue-600 transition-colors cursor-pointer"
                title="Configuración de video de fondo"
              >
                <Sliders className="w-3 h-3 text-blue-700" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Video Settings Popover */}
      {showVideoSettings && videoEnabled && (
        <div className="absolute top-32 right-4 sm:right-8 z-30 w-80 p-5 rounded-2xl bg-white border border-blue-900/10 shadow-xl text-left space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-blue-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950">
              <Video className="w-3.5 h-3.5 text-blue-600" />
              <span>Ambiente Tecnológico Dinámico</span>
            </div>
            <button
              type="button"
              onClick={() => setShowVideoSettings(false)}
              className="p-1 text-blue-400 hover:text-blue-950 rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div>
            <label className="block text-[11px] font-mono uppercase text-blue-700 font-semibold mb-2">
              Preset de Fondo:
            </label>
            <div className="space-y-1.5">
              {VIDEO_PRESETS.map((preset) => (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => {
                    setSelectedPresetId(preset.id);
                    setCustomVideoUrl('');
                    setVideoLoadError(false);
                  }}
                  className={`w-full p-2.5 rounded-xl text-left text-xs border transition-all cursor-pointer ${
                    selectedPresetId === preset.id && !customVideoUrl
                      ? 'bg-blue-50/80 border-blue-500 font-bold text-blue-950'
                      : 'bg-[#F8FAFC] border-blue-200/70 text-blue-900 hover:bg-blue-50/50'
                  }`}
                >
                  <div className="font-semibold text-xs">{preset.name}</div>
                  <div className="text-[10px] text-blue-700/80 mt-0.5">{preset.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-blue-800 font-semibold mb-1">
              <span>Opacidad:</span>
              <span>{Math.round(videoOpacity * 100)}%</span>
            </div>
            <input
              type="range"
              min="0.10"
              max="0.45"
              step="0.05"
              value={videoOpacity}
              onChange={(e) => setVideoOpacity(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* 3. HERO CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-900/10 shadow-xs text-xs font-mono font-semibold text-blue-950">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-blue-900 font-bold">Gastón Barea</span>
          <span className="text-blue-300">·</span>
          <span className="text-blue-600">Business Innovación · Negocios Inteligentes · Modern Stack</span>
        </div>

        {/* Hero Headline */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-blue-950 leading-[1.05] [text-wrap:balance]">
          Nuevos Modelos de Negocio Digitales impulsados por{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-sky-500">
            Inteligencia y Stack Moderno.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-blue-900/85 leading-relaxed max-w-3xl mx-auto font-normal [text-wrap:balance]">
          No construimos software estático. Diseñamos plataformas escalables, agentes autónomos y arquitecturas resilientes que transforman organizaciones tradicionales en negocios ágiles de alto margen.
        </p>

        {/* Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onDiagnosticoClick}
            type="button"
            className="px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 active:scale-[0.98] rounded-xl transition-all shadow-md shadow-blue-500/20 inline-flex items-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
            <span>Simular Solución con IA</span>
          </button>

          <button
            onClick={onScheduleClick}
            type="button"
            className="px-6 py-3.5 text-sm font-semibold text-blue-950 bg-white hover:bg-blue-50/80 border border-blue-200/90 rounded-xl transition-all shadow-xs inline-flex items-center gap-2 active:scale-[0.98] cursor-pointer"
          >
            <span>Agendar Consulta Técnica</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>

          <button
            onClick={onWhatsAppClick}
            type="button"
            className="px-5 py-3.5 text-sm font-semibold text-blue-900 hover:text-blue-950 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <span>WhatsApp Directo</span>
            <ChevronRight className="w-4 h-4 text-blue-500" />
          </button>
        </div>

        {/* Location & Trust */}
        <div className="text-xs font-medium text-blue-800/70 flex items-center justify-center gap-1.5 pt-1">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>Patagonia Argentina · Consultoría Estratégica & Arquitectura Remota Global</span>
        </div>

        {/* Video de Presentación Ejecutiva YouTube: Nuevos Modelos de Negocio Digitales */}
        <PresentationVideo
          onScheduleClick={onScheduleClick}
          onDiagnosticoClick={onDiagnosticoClick}
        />

        {/* 4. MASTER INTEGRATED EXECUTIVE ARCHITECTURE CONSOLE (No Floating Cards, Fully Integrated Structure) */}
        <div className="pt-2 max-w-5xl mx-auto text-left">
          <div className="rounded-2xl bg-white border border-blue-900/15 shadow-sm overflow-hidden">
            
            {/* Top Bar: Profile & Real-Time Availability (Integrated Header) */}
            <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-50 via-white to-blue-50/30 border-b border-slate-200/80 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="relative shrink-0">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-blue-900 text-white flex items-center justify-center font-black text-lg shadow-xs overflow-hidden border border-blue-950/20">
                    {profileImg ? (
                      <img 
                        src={profileImg} 
                        alt="Gastón Barea" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>GB</span>
                    )}
                  </div>
                  <label 
                    className="absolute -bottom-1 -right-1 bg-white hover:bg-blue-50 border border-slate-200 p-1 rounded-full cursor-pointer shadow-xs transition-colors"
                    title="Subir foto personalizada"
                  >
                    <Camera className="w-3 h-3 text-blue-700" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleCustomPhotoUpload}
                    />
                  </label>
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-base font-bold text-blue-950">Gastón Barea</span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-blue-100/80 text-blue-800">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      Senior Consultant
                    </span>
                  </div>
                  <div className="text-xs text-blue-900/80 mt-0.5 font-medium">
                    Consultor en Innovación de Negocios & Arquitecto de Software
                  </div>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                    <span>10+ años en sistemas de misión crítica</span>
                    <span>·</span>
                    <span>Patagonia & Remoto Global</span>
                  </div>
                </div>
              </div>

              {/* Status and Action Pills */}
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200/80 text-emerald-800 font-mono text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>Proyectos Activos Q4/2026</span>
                </div>
                <button
                  type="button"
                  onClick={onScheduleClick}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Agendar 30m</span>
                </button>
              </div>
            </div>

            {/* Middle Section: Integrated 3-Column Pillars Matrix (Seamless grid, no detached floating elements) */}
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 bg-white">
              
              {/* Pilar 1 Column */}
              <div 
                onClick={onExplorePillars}
                className="p-5 sm:p-6 hover:bg-blue-50/30 transition-colors cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-700 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-blue-600">
                      PILAR 01
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-blue-950 group-hover:text-blue-600 transition-colors flex items-center justify-between">
                    <span>Business Innovación</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-blue-600" />
                  </h3>
                  <div className="text-[11px] font-semibold text-blue-700/80 mb-2">
                    Nuevos Modelos de Negocio
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Transformación de servicios manuales a plataformas SaaS escalables, monetización recurrente y ecosistemas B2B con alto apalancamiento.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-semibold">
                  <span className="text-slate-500">Métricas:</span>
                  <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200/60">+65% Margen · 3x Time-to-Market</span>
                </div>
              </div>

              {/* Pilar 2 Column */}
              <div 
                onClick={onExplorePillars}
                className="p-5 sm:p-6 hover:bg-purple-50/30 transition-colors cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-purple-100/70 text-purple-700 flex items-center justify-center group-hover:bg-purple-600 group-hover:text-white transition-colors">
                      <Brain className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-purple-600">
                      PILAR 02
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-blue-950 group-hover:text-purple-600 transition-colors flex items-center justify-between">
                    <span>Negocios Inteligentes</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-purple-600" />
                  </h3>
                  <div className="text-[11px] font-semibold text-purple-700/80 mb-2">
                    Operaciones & Agentes IA
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Agentes autónomos para triage, diagnóstico y analítica predictiva en tiempo real sin fricción operativa. Operación continua 24/7.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-semibold">
                  <span className="text-slate-500">Métricas:</span>
                  <span className="text-purple-700 bg-purple-50 px-2 py-0.5 rounded border border-purple-200/60">-72% Tareas manuales · 24/7 SLA</span>
                </div>
              </div>

              {/* Pilar 3 Column */}
              <div 
                onClick={onExplorePillars}
                className="p-5 sm:p-6 hover:bg-sky-50/30 transition-colors cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-8 h-8 rounded-lg bg-sky-100/70 text-sky-700 flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white transition-colors">
                      <Cpu className="w-4 h-4" />
                    </div>
                    <span className="text-[11px] font-mono font-bold text-sky-600">
                      PILAR 03
                    </span>
                  </div>

                  <h3 className="text-sm font-bold text-blue-950 group-hover:text-sky-600 transition-colors flex items-center justify-between">
                    <span>Modern Tech Stack</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-sky-600" />
                  </h3>
                  <div className="text-[11px] font-semibold text-sky-700/80 mb-2">
                    Vercel Edge + Supabase
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Infraestructura desacoplada con despliegue en Vercel Edge, bases de datos PostgreSQL en Supabase, React 19 y Gemini AI con alta disponibilidad.
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-semibold">
                  <span className="text-slate-500">Métricas:</span>
                  <span className="text-sky-700 bg-sky-50 px-2 py-0.5 rounded border border-sky-200/60">&lt;45ms Latencia · 99.9% Uptime</span>
                </div>
              </div>

            </div>

            {/* Bottom Bar: Unified Architectural Data Rail (Connecting the 3 Pillars) */}
            <div className="p-3.5 sm:p-4 bg-[#F8FAFC] border-t border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  <strong>Sinergia de los 3 Ejes:</strong> El Modelo de Negocio genera valor, los Agentes IA automatizan la entrega y el Stack Técnico asegura escala global sin caídas.
                </span>
              </div>
              <button
                type="button"
                onClick={onExplorePillars}
                className="shrink-0 font-bold text-blue-600 hover:text-blue-800 transition-colors flex items-center gap-1 cursor-pointer whitespace-nowrap"
              >
                <span>Explorar Arquitectura y Simular Sinergia</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

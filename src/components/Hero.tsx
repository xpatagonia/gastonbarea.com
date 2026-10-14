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
  Eye,
  EyeOff,
  Sliders,
  X,
  TrendingUp,
  Brain,
  Cpu,
  Layers,
  Activity,
  ArrowUpRight
} from 'lucide-react';

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
  const [videoOpacity, setVideoOpacity] = useState<number>(0.26);
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
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden border-b border-blue-900/10 bg-[#F4F4F4]">
      
      {/* 1. BACKGROUND VIDEO LAYER & FLUID AMBIENT MOTION */}
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
          {/* Frosted glass & canvas blend overlay */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#F4F4F4]/80 via-[#F4F4F4]/70 to-[#F4F4F4] backdrop-blur-[1px]" 
            aria-hidden="true"
          />
        </div>
      )}

      {/* Floating Organic Aura Orbs (Movement & Depth) */}
      <div 
        className="absolute top-10 left-1/4 -translate-x-1/2 w-[550px] h-[350px] bg-gradient-to-br from-blue-400/20 via-indigo-300/15 to-transparent blur-3xl pointer-events-none rounded-full z-0 animate-float"
        aria-hidden="true"
      />
      <div 
        className="absolute top-1/3 right-10 w-[500px] h-[400px] bg-gradient-to-bl from-purple-400/15 via-sky-300/15 to-transparent blur-3xl pointer-events-none rounded-full z-0 animate-float-delayed"
        aria-hidden="true"
      />

      {/* 2. FLOATING VIDEO CONTROL DOCK */}
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
              max="0.55"
              step="0.05"
              value={videoOpacity}
              onChange={(e) => setVideoOpacity(parseFloat(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
          </div>
        </div>
      )}

      {/* 3. HERO MAIN CONTENT WITH KINETIC TYPOGRAPHY */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7">
        
        {/* Dynamic Eyebrow with pulsating live indicator */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-blue-900/10 shadow-xs text-xs font-mono font-semibold text-blue-950">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
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
            className="px-6 py-3.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 active:scale-[0.98] rounded-full transition-all shadow-lg shadow-blue-500/25 inline-flex items-center gap-2 group cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
            <span>Simular Solución con IA</span>
          </button>

          <button
            onClick={onScheduleClick}
            type="button"
            className="px-6 py-3.5 text-sm font-semibold text-blue-950 bg-white hover:bg-blue-50 border border-blue-200/90 rounded-full transition-all shadow-xs inline-flex items-center gap-2 active:scale-[0.98] cursor-pointer"
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

        {/* 4. THREE PILLARS KINETIC FLOATING SHOWCASE (Non-structured, fluid motion) */}
        <div className="pt-8 max-w-4xl mx-auto">
          <div className="text-[11px] font-mono tracking-widest text-blue-700/80 uppercase font-bold text-center mb-4">
            — LOS TRES PILARES ESTRATÉGICOS DE TRANSFORMACIÓN —
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left">
            
            {/* Pilar 1 Floating Card */}
            <div 
              onClick={onExplorePillars}
              className="group cursor-pointer rounded-2xl bg-white/90 backdrop-blur-md p-5 border border-blue-200/80 shadow-md shadow-blue-950/[0.03] hover:shadow-xl hover:border-blue-500/60 hover:-translate-y-1.5 transition-all duration-300 animate-float"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center border border-blue-200/70 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-blue-500">
                  PILAR 01
                </span>
              </div>
              <h3 className="text-sm font-bold text-blue-950 group-hover:text-blue-600 transition-colors flex items-center gap-1">
                <span>Business Innovación</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-blue-900/75 mt-1.5 leading-relaxed">
                Nuevos modelos de negocio digitales, plataformas B2B, SaaS y monetización recurrente.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-semibold text-emerald-600">
                <span>Margen Escalable</span>
                <span>+65% ROI</span>
              </div>
            </div>

            {/* Pilar 2 Floating Card (Delayed float) */}
            <div 
              onClick={onExplorePillars}
              className="group cursor-pointer rounded-2xl bg-white/90 backdrop-blur-md p-5 border border-purple-200/80 shadow-md shadow-blue-950/[0.03] hover:shadow-xl hover:border-purple-500/60 hover:-translate-y-1.5 transition-all duration-300 animate-float-delayed"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center border border-purple-200/70 group-hover:bg-purple-600 group-hover:text-white transition-colors">
                  <Brain className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-purple-500">
                  PILAR 02
                </span>
              </div>
              <h3 className="text-sm font-bold text-blue-950 group-hover:text-purple-600 transition-colors flex items-center gap-1">
                <span>Negocios Inteligentes</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-blue-900/75 mt-1.5 leading-relaxed">
                Agentes autónomos de IA, analítica predictiva en tiempo real y automatización cero-fricción.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-semibold text-purple-600">
                <span>Operación 24/7</span>
                <span>-72% Tareas</span>
              </div>
            </div>

            {/* Pilar 3 Floating Card (Slow float) */}
            <div 
              onClick={onExplorePillars}
              className="group cursor-pointer rounded-2xl bg-white/90 backdrop-blur-md p-5 border border-sky-200/80 shadow-md shadow-blue-950/[0.03] hover:shadow-xl hover:border-sky-500/60 hover:-translate-y-1.5 transition-all duration-300 animate-float-slow"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center border border-sky-200/70 group-hover:bg-sky-600 group-hover:text-white transition-colors">
                  <Cpu className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold text-sky-500">
                  PILAR 03
                </span>
              </div>
              <h3 className="text-sm font-bold text-blue-950 group-hover:text-sky-600 transition-colors flex items-center gap-1">
                <span>Modern Tech Stack</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-xs text-blue-900/75 mt-1.5 leading-relaxed">
                Vercel Edge, Supabase/PostgreSQL, React 19, Gemini AI API y contenedores Docker.
              </p>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-mono font-semibold text-sky-600">
                <span>Latencia Edge</span>
                <span>&lt;45ms · 99.9%</span>
              </div>
            </div>

          </div>
        </div>

        {/* 5. GASTÓN BAREA PROFILE BADGE & DIRECT CONTACT CARD */}
        <div className="pt-6 max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-white/95 backdrop-blur-xl border border-blue-900/10 p-6 sm:p-8 shadow-xl shadow-blue-950/[0.04] text-left overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
              
              {/* Profile Slot */}
              <div className="md:col-span-5 flex items-center gap-4">
                <div className="relative group shrink-0">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-blue-100 via-indigo-50 to-sky-100 border border-blue-200 overflow-hidden flex items-center justify-center shadow-xs">
                    {profileImg ? (
                      <img 
                        src={profileImg} 
                        alt="Gastón Barea" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-center p-2">
                        <span className="text-xl font-black text-blue-900 tracking-tight">GB</span>
                        <span className="text-[9px] font-mono font-semibold text-blue-600 uppercase tracking-wider">Patagonia</span>
                      </div>
                    )}
                  </div>
                  <label 
                    className="absolute -bottom-1 -right-1 bg-white hover:bg-blue-50 border border-blue-200 p-1.5 rounded-full cursor-pointer shadow-xs transition-colors"
                    title="Subir foto personalizada"
                  >
                    <Camera className="w-3.5 h-3.5 text-blue-700" />
                    <input 
                      type="file" 
                      accept="image/*" 
                      className="hidden" 
                      onChange={handleCustomPhotoUpload}
                    />
                  </label>
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-bold text-blue-950">Gastón Barea</span>
                    <ShieldCheck className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-xs font-semibold text-blue-700">
                    Consultor en Innovación & Arquitecto de Software
                  </div>
                  <div className="text-[11px] text-blue-900/70 mt-0.5">
                    10+ años liderando transformación digital y sistemas de misión crítica
                  </div>
                </div>
              </div>

              {/* Pillars Snapshot metrics */}
              <div className="md:col-span-7 grid grid-cols-3 gap-2.5 pt-3 md:pt-0 border-t md:border-t-0 md:border-l border-blue-100 md:pl-6 text-center sm:text-left">
                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-blue-900/6">
                  <div className="text-xs font-mono text-blue-700 font-bold">PILAR 1</div>
                  <div className="text-sm font-extrabold text-blue-950">Modelos B2B</div>
                  <div className="text-[10px] text-slate-500">SaaS & Plataformas</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-blue-900/6">
                  <div className="text-xs font-mono text-purple-700 font-bold">PILAR 2</div>
                  <div className="text-sm font-extrabold text-blue-950">Agentes IA</div>
                  <div className="text-[10px] text-slate-500">Operación Autónoma</div>
                </div>

                <div className="p-2.5 rounded-xl bg-[#F8FAFC] border border-blue-900/6">
                  <div className="text-xs font-mono text-sky-700 font-bold">PILAR 3</div>
                  <div className="text-sm font-extrabold text-blue-950">Vercel & Supabase</div>
                  <div className="text-[10px] text-slate-500">Edge + Postgres</div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

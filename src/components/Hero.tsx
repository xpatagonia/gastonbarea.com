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
  Settings,
  X,
  Sliders
} from 'lucide-react';

interface HeroProps {
  onExploreServices: () => void;
  onScheduleClick: () => void;
  onWhatsAppClick: () => void;
  onDiagnosticoClick: () => void;
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
    id: 'servers',
    name: 'Datacenter & Servidores Linux',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-server-room-rack-lights-42562-large.mp4',
    desc: 'Racks de infraestructura, alta disponibilidad y producción continua',
  },
  {
    id: 'bi-data',
    name: 'Business Intelligence & Algoritmos',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-with-graphs-and-data-31913-large.mp4',
    desc: 'Ingeniería de datos, métricas transaccionales y analytics',
  },
];

export const Hero: React.FC<HeroProps> = ({
  onExploreServices,
  onScheduleClick,
  onWhatsAppClick,
  onDiagnosticoClick,
}) => {
  const [profileImg, setProfileImg] = useState<string | null>(null);

  // Background Video State
  const [videoEnabled, setVideoEnabled] = useState<boolean>(true);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedPresetId, setSelectedPresetId] = useState<string>('network');
  const [customVideoUrl, setCustomVideoUrl] = useState<string>('');
  const [videoOpacity, setVideoOpacity] = useState<number>(0.28); // 0.15 to 0.50
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
    <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden border-b border-blue-900/10 bg-[#F4F4F4]">
      
      {/* 1. BACKGROUND VIDEO LAYER (Apple Minimalist Ambient Integration) */}
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

          {/* Frosted glass & canvas blend overlay so #F4F4F4 canvas and blue typography retain perfect contrast */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#F4F4F4]/85 via-[#F4F4F4]/75 to-[#F4F4F4] backdrop-blur-[1px]" 
            aria-hidden="true"
          />
        </div>
      )}

      {/* Atmospheric ambient glow in subtle blue */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[360px] bg-gradient-to-b from-blue-300/20 via-blue-100/10 to-transparent blur-3xl pointer-events-none rounded-full z-0"
        aria-hidden="true"
      />

      {/* 2. FLOATING VIDEO CONTROL DOCK (Apple Minimalist Pill) */}
      <div className="absolute top-20 right-4 sm:right-8 z-20 flex items-center gap-1.5">
        <div className="flex items-center gap-1 px-2.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-blue-900/10 shadow-xs text-xs font-mono text-blue-900">
          <button
            type="button"
            onClick={() => setVideoEnabled(!videoEnabled)}
            className="flex items-center gap-1 text-[11px] font-semibold hover:text-blue-600 transition-colors px-1"
            title={videoEnabled ? 'Ocultar video de fondo' : 'Activar video de fondo'}
          >
            {videoEnabled ? (
              <>
                <Video className="w-3.5 h-3.5 text-blue-600" />
                <span className="hidden sm:inline">Video Activo</span>
              </>
            ) : (
              <>
                <EyeOff className="w-3.5 h-3.5 text-slate-400" />
                <span className="hidden sm:inline">Video Pausado</span>
              </>
            )}
          </button>

          {videoEnabled && !videoLoadError && (
            <>
              <span className="text-blue-200">|</span>
              <button
                type="button"
                onClick={togglePlayPause}
                className="p-1 hover:text-blue-600 transition-colors"
                title={isPlaying ? 'Pausar video' : 'Reproducir video'}
              >
                {isPlaying ? <Pause className="w-3 h-3 text-blue-700" /> : <Play className="w-3 h-3 text-blue-700" />}
              </button>

              <span className="text-blue-200">|</span>
              <button
                type="button"
                onClick={() => setShowVideoSettings(!showVideoSettings)}
                className="p-1 hover:text-blue-600 transition-colors"
                title="Configuración de video de fondo"
              >
                <Sliders className="w-3 h-3 text-blue-700" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Video Settings Popover (Apple Clean Card) */}
      {showVideoSettings && videoEnabled && (
        <div className="absolute top-32 right-4 sm:right-8 z-30 w-80 p-5 rounded-2xl bg-white border border-blue-900/10 shadow-xl text-left space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-blue-100">
            <div className="flex items-center gap-1.5 text-xs font-bold text-blue-950">
              <Video className="w-3.5 h-3.5 text-blue-600" />
              <span>Video de Fondo</span>
            </div>
            <button
              type="button"
              onClick={() => setShowVideoSettings(false)}
              className="p-1 text-blue-400 hover:text-blue-950 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Presets */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-blue-700 font-semibold mb-2">
              Seleccionar Ambiente:
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
                  className={`w-full p-2.5 rounded-xl text-left text-xs border transition-all ${
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

          {/* Custom URL */}
          <div>
            <label className="block text-[11px] font-mono uppercase text-blue-700 font-semibold mb-1.5">
              O ingresar enlace MP4 propio:
            </label>
            <input
              type="text"
              value={customVideoUrl}
              onChange={(e) => {
                setCustomVideoUrl(e.target.value);
                setVideoLoadError(false);
              }}
              placeholder="https://.../video.mp4"
              className="w-full bg-[#F8FAFC] border border-blue-200/80 rounded-xl px-3 py-1.5 text-xs text-blue-950 placeholder:text-blue-400 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Opacity slider */}
          <div>
            <div className="flex items-center justify-between text-[11px] font-mono text-blue-800 font-semibold mb-1">
              <span>Intensidad de fondo:</span>
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

      {/* 3. HERO CONTENT */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
        
        {/* Apple quiet eyebrow in blue */}
        <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-widest text-blue-600 uppercase font-semibold">
          <span className="text-blue-900">Gastón Barea</span>
          <span className="text-blue-400">·</span>
          <span>Consultor Tecnológico & Arquitecto de Software</span>
        </div>

        {/* Hero Headline in deep blue */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-blue-950 leading-[1.06] [text-wrap:balance]">
          Complejidad reducida a la{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800">
            mínima expresión.
          </span>
        </h1>

        {/* Subtitle in blue */}
        <p className="text-base sm:text-xl text-blue-900/80 leading-relaxed max-w-3xl mx-auto font-normal [text-wrap:balance]">
          Arquitectura de sistemas escalables, Business Intelligence (BI), infraestructura Linux con Docker y dirección técnica para organizaciones que exigen alta disponibilidad.
        </p>

        {/* Apple CTAs in Blue with AI Simulation */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={onDiagnosticoClick}
            type="button"
            className="px-6 py-3 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-full transition-all shadow-md shadow-blue-500/25 inline-flex items-center gap-2 group"
          >
            <Sparkles className="w-4 h-4 text-blue-200 group-hover:rotate-12 transition-transform" />
            <span>Simular Solución con IA</span>
          </button>

          <button
            onClick={onScheduleClick}
            type="button"
            className="px-6 py-3 text-sm font-medium text-blue-950 bg-white hover:bg-blue-50/80 border border-blue-200/80 rounded-full transition-all shadow-xs inline-flex items-center gap-2"
          >
            <span>Agendar Consulta</span>
            <ArrowRight className="w-4 h-4 text-blue-600" />
          </button>

          <button
            onClick={onWhatsAppClick}
            type="button"
            className="px-5 py-3 text-sm font-medium text-blue-800 hover:text-blue-950 transition-colors inline-flex items-center gap-1 group"
          >
            <span>WhatsApp</span>
            <ChevronRight className="w-4 h-4 text-blue-500 group-hover:text-blue-950 group-hover:translate-x-0.5 transition-all" />
          </button>
        </div>

        {/* Location trust indicator */}
        <div className="pt-2 text-xs font-medium text-blue-800/70 flex items-center justify-center gap-1.5">
          <MapPin className="w-3.5 h-3.5 text-blue-600" />
          <span>Chubut, Patagonia Argentina · Consultoría Remota Global</span>
        </div>

        {/* Bento Card Hero Feature Showcase (Apple clean white card on #F4F4F4) */}
        <div className="pt-12 max-w-4xl mx-auto">
          <div className="relative rounded-3xl bg-white border border-blue-900/10 p-6 sm:p-10 shadow-lg shadow-blue-950/[0.04] text-left overflow-hidden">
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              
              {/* Profile Avatar / Identity Slot (4 cols) */}
              <div className="md:col-span-5 flex flex-col items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="relative group shrink-0">
                    <div className="w-20 h-20 rounded-2xl bg-blue-50 border border-blue-200 overflow-hidden flex items-center justify-center shadow-xs">
                      {profileImg ? (
                        <img 
                          src={profileImg} 
                          alt="Gastón Barea" 
                          className="w-full h-full object-cover" 
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-blue-100 to-blue-50 flex flex-col items-center justify-center p-2 text-center">
                          <span className="font-mono font-bold text-lg text-blue-950">GB</span>
                          <span className="text-[9px] font-mono text-blue-600 mt-0.5">gastonperfil1</span>
                        </div>
                      )}
                    </div>

                    <label 
                      className="absolute -bottom-1 -right-1 p-1.5 bg-white hover:bg-blue-50 text-blue-700 border border-blue-200 rounded-full cursor-pointer shadow-sm transition-colors"
                      title="Cargar foto gastonperfil1.png"
                    >
                      <Camera className="w-3 h-3" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleCustomPhotoUpload}
                        className="hidden" 
                      />
                    </label>
                  </div>

                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-blue-950 tracking-tight">Gastón Barea</h3>
                      <ShieldCheck className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-xs font-mono text-blue-700 font-semibold">gastonbarea.com.ar</p>
                    <p className="text-[11px] text-blue-900/70 mt-0.5">
                      Consultor Tecnológico Senior
                    </p>
                  </div>
                </div>

                <div className="text-xs text-blue-900/80 leading-relaxed pt-2 border-t border-blue-100 w-full">
                  Ingeniería pragmática orientada a la economía real. Más de 10 años en producción continua en organizaciones exigentes.
                </div>
              </div>

              {/* 3 Metric Panels */}
              <div className="md:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-900/8 flex flex-col justify-between">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-950 tracking-tight font-mono tabular-nums">
                    99.9%
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-bold text-blue-900">Uptime TI</div>
                    <div className="text-[11px] text-blue-800/70 mt-0.5">Disponibilidad Linux & Docker</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-900/8 flex flex-col justify-between">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-950 tracking-tight font-mono tabular-nums">
                    +10
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-bold text-blue-900">Años Exp.</div>
                    <div className="text-[11px] text-blue-800/70 mt-0.5">Trayectoria en producción</div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-900/8 flex flex-col justify-between">
                  <div className="text-2xl sm:text-3xl font-bold text-blue-950 tracking-tight font-mono tabular-nums">
                    +45
                  </div>
                  <div className="mt-3">
                    <div className="text-xs font-bold text-blue-900">Sistemas</div>
                    <div className="text-[11px] text-blue-800/70 mt-0.5">Desplegados y activos</div>
                  </div>
                </div>

              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

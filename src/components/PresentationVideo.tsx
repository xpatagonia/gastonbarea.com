import React, { useState } from 'react';
import {
  Play,
  Sparkles,
  ExternalLink,
  Edit3,
  Check,
  RotateCcw,
  Clock,
  Layers,
  ShieldCheck,
  Video,
  X,
  Volume2
} from 'lucide-react';
import { SITE_CONFIG } from '../data/siteConfig';

interface PresentationVideoProps {
  onScheduleClick?: () => void;
  onDiagnosticoClick?: () => void;
}

export const PresentationVideo: React.FC<PresentationVideoProps> = ({
  onScheduleClick,
  onDiagnosticoClick,
}) => {
  // Default YouTube Video ID from config or realistic fallback
  const defaultVideoId =
    SITE_CONFIG.presentationVideo?.youtubeId || 'L_LUpnjgPso';

  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentVideoId, setCurrentVideoId] = useState<string>(() => {
    return localStorage.getItem('gb_presentation_video_id') || defaultVideoId;
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [customInput, setCustomInput] = useState<string>('');

  // Extract YouTube ID from full URL or return raw ID
  const extractYouTubeId = (input: string): string => {
    const trimmed = input.trim();
    if (!trimmed) return defaultVideoId;

    // Matches youtu.be/<id> or youtube.com/watch?v=<id> or embed/<id>
    const regExp = /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/;
    const match = trimmed.match(regExp);
    if (match && match[1]) {
      return match[1];
    }
    // If it's already an 11-char ID
    if (trimmed.length === 11 && !trimmed.includes('/')) {
      return trimmed;
    }
    return trimmed;
  };

  const handleSaveCustomVideo = () => {
    if (customInput.trim()) {
      const parsedId = extractYouTubeId(customInput);
      setCurrentVideoId(parsedId);
      localStorage.setItem('gb_presentation_video_id', parsedId);
      setIsEditing(false);
      setIsPlaying(true);
    }
  };

  const handleResetDefault = () => {
    setCurrentVideoId(defaultVideoId);
    localStorage.removeItem('gb_presentation_video_id');
    setCustomInput('');
    setIsEditing(false);
  };

  return (
    <section className="relative my-8 sm:my-10 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Background ambient lighting */}
      <div
        className="absolute -inset-2 bg-gradient-to-r from-blue-600/15 via-indigo-600/15 to-sky-500/15 rounded-3xl blur-2xl -z-10 opacity-70"
        aria-hidden="true"
      />

      <div className="relative rounded-2xl sm:rounded-3xl bg-white/95 backdrop-blur-xl border border-blue-900/15 shadow-xl shadow-blue-950/5 overflow-hidden">
        
        {/* Top Header Bar of Video Module */}
        <div className="px-5 py-4 sm:px-7 sm:py-5 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-800/40">
          <div className="flex items-center gap-3">
            <span className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-300">
              <Video className="w-5 h-5 text-sky-400" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider uppercase text-sky-300 bg-sky-500/15 px-2 py-0.5 rounded-md border border-sky-400/20">
                  Presentación Ejecutiva
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[11px] font-mono text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Streaming HD
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white tracking-tight mt-0.5">
                Visión Estratégica: Transformación con IA y Stack Moderno
              </h3>
            </div>
          </div>

          {/* Right Action: Edit Video ID / URL Button */}
          <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
            <button
              type="button"
              onClick={() => setIsEditing(!isEditing)}
              className="text-xs font-mono px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-blue-100 border border-white/15 transition-all flex items-center gap-1.5 cursor-pointer"
              title="Cambiar URL o ID de YouTube del video de presentación"
            >
              <Edit3 className="w-3.5 h-3.5 text-sky-300" />
              <span>{isEditing ? 'Cerrar' : 'Configurar Video'}</span>
            </button>
          </div>
        </div>

        {/* Video Config Drawer (if active) */}
        {isEditing && (
          <div className="bg-slate-100 p-4 border-b border-slate-200 text-slate-800 text-xs transition-all">
            <div className="max-w-2xl mx-auto space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-slate-900">
                  Pega el enlace o ID de tu video de YouTube:
                </span>
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 underline text-[11px]"
                >
                  <RotateCcw className="w-3 h-3" /> Restaurar predeterminado
                </button>
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Ej: https://www.youtube.com/watch?v=... o código de 11 caracteres"
                  className="flex-1 px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 font-mono text-xs focus:outline-hidden focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleSaveCustomVideo}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Aplicar</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                El video se reproducirá directamente en el reproductor embebido de alta resolución sin salir de la página.
              </p>
            </div>
          </div>
        )}

        {/* Video Display Area: 16:9 Aspect Ratio Container */}
        <div className="relative aspect-video w-full bg-slate-950 overflow-hidden group">
          {isPlaying ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${currentVideoId}?autoplay=1&rel=0&modestbranding=1&enablejsapi=1`}
              title="Gastón Barea - Presentación Ejecutiva de Arquitectura de Software & Business Innovación"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-10 cursor-pointer overflow-hidden" onClick={() => setIsPlaying(true)}>
              {/* Dark aesthetic backdrop with high-tech grid & glowing node */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-40 mix-blend-luminosity"
                style={{
                  backgroundImage: `url('https://img.youtube.com/vi/${currentVideoId}/maxresdefault.jpg'), url('https://img.youtube.com/vi/${currentVideoId}/hqdefault.jpg')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-blue-950/40" />

              {/* Subtle top metadata */}
              <div className="relative z-10 flex items-center justify-between text-white/90">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-mono font-medium tracking-wide">
                    YOUTUBE PRESENTATION
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs font-mono text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-sky-400" />
                  <span>04:20 min</span>
                </div>
              </div>

              {/* Big Center Play Button with Pulsing Wave */}
              <div className="relative z-10 flex flex-col items-center justify-center my-auto text-center space-y-4">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full bg-blue-500/30 blur-md group-hover:bg-blue-400/50 group-hover:scale-125 transition-all duration-300 animate-pulse" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-sky-500 text-white flex items-center justify-center shadow-xl shadow-blue-500/40 group-hover:scale-110 transition-transform">
                    <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-white translate-x-0.5" />
                  </div>
                </div>
                <div>
                  <h4 className="text-lg sm:text-2xl font-extrabold text-white tracking-tight drop-shadow-md">
                    Reproducir Presentación de Arquitectura
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mt-1 font-normal">
                    Conoce cómo articulamos los 3 Pilares Estratégicos para escalar tu modelo digital con costo predecible.
                  </p>
                </div>
              </div>

              {/* Bottom Video Feature Strip */}
              <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-blue-600/30 border border-blue-400/30 flex items-center justify-center font-bold text-[10px] text-sky-300">
                    GB
                  </div>
                  <span className="font-medium text-white">Gastón Barea</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-300">Patagonia Argentina & Remoto</span>
                </div>
                <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
                  <span>Full HD 1080p</span>
                  <span>Audio Español</span>
                  <span className="text-sky-400 hover:text-sky-300 flex items-center gap-1 underline">
                    Click para ver video
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video Key Takeaways & Interactive Chapters */}
        <div className="p-5 sm:p-7 bg-slate-50/70 border-t border-slate-200/80">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-600">
                <Layers className="w-4 h-4 text-blue-600" />
                <span>01. MODELO DE NEGOCIO</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                Plataformas B2B & Monetización
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Dejamos atrás sistemas estáticos para abrir ecosistemas de suscripción y servicios digitales de alto margen.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-indigo-600">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span>02. INTELIGENCIA OPERACIONAL</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                Agentes Autónomos & BI
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Automatización de decisiones complejas, reconciliación de datos y asistencia inteligente a clientes.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-emerald-600">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>03. MODERN TECH STACK</span>
              </div>
              <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                Resiliencia Vercel + Supabase
              </h5>
              <p className="text-xs text-slate-600 leading-relaxed">
                Arquitectura desacoplada, Edge computing y PostgreSQL con RLS para 99.9% de uptime y costos controlados.
              </p>
            </div>

          </div>

          {/* Quick Action below video */}
          <div className="mt-5 pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-slate-600">
              ¿Listo para analizar cómo aplicar estos 3 pilares a tu organización?
            </span>
            <div className="flex items-center gap-2">
              {onDiagnosticoClick && (
                <button
                  type="button"
                  onClick={onDiagnosticoClick}
                  className="px-3.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                >
                  Simular con IA
                </button>
              )}
              {onScheduleClick && (
                <button
                  type="button"
                  onClick={onScheduleClick}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>Agendar Consulta de 30m</span>
                </button>
              )}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

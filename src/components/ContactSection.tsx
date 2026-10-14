import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Mail, 
  MessageSquare,
  Calendar,
  Linkedin,
  Github,
  ExternalLink
} from 'lucide-react';
import { FAQS_DATA } from '../data/content';
import { SITE_CONFIG } from '../data/siteConfig';
import { saveContactInquiry } from '../lib/supabase';

interface ContactSectionProps {
  initialService?: string;
  initialMessage?: string;
  onWhatsAppClick: (customMessage?: string) => void;
  onScheduleClick?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService,
  initialMessage,
  onWhatsAppClick,
  onScheduleClick,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [serviceArea, setServiceArea] = useState(initialService || 'Consultoría en Arquitectura de Software');
  const [requirements, setRequirements] = useState(initialMessage || '');
  
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [submitted, setSubmitted] = useState(false);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    if (initialService) {
      setServiceArea(initialService);
    }
    if (initialMessage) {
      setRequirements(initialMessage);
    }
  }, [initialService, initialMessage]);

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = 'El nombre es obligatorio';
    if (!email.trim()) {
      errors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Formato de correo electrónico no válido';
    }
    if (!company.trim()) errors.company = 'La organización o empresa es obligatoria';
    if (!requirements.trim()) errors.requirements = 'Por favor detallá el requerimiento técnico';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Send to Supabase if configured, otherwise persist smoothly
    await saveContactInquiry({
      name,
      email,
      company,
      serviceArea,
      requirements,
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-[#F4F4F4] relative border-b border-blue-900/10 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-16 space-y-3">
          <div className="text-[11px] font-mono tracking-widest uppercase text-blue-600 font-semibold">
            CONTACTO & AGENDAMIENTO TÉCNICO
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-blue-950 tracking-tight">
            Iniciemos una conversación directa de ingeniería.
          </h2>
          <p className="text-base text-blue-900/80 leading-relaxed font-normal">
            Elegí coordinar una llamada de 30 minutos vía Calendly / Cal.com, enviar un requerimiento detallado por formulario o conectar por WhatsApp y LinkedIn.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Main Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-blue-900/10 p-8 sm:p-10 shadow-lg shadow-blue-950/[0.04]">
              
              <div className="flex items-center justify-between pb-6 border-b border-blue-100 mb-6">
                <div>
                  <h3 className="text-lg font-bold text-blue-950">Formulario de Requerimiento Técnico</h3>
                  <p className="text-xs text-blue-800/70">Respuesta técnica garantizada en menos de 24 horas hábiles.</p>
                </div>
                {onScheduleClick && (
                  <button
                    type="button"
                    onClick={onScheduleClick}
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200/60 transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5 text-blue-600" />
                    <span>¿Preferís agendar?</span>
                  </button>
                )}
              </div>

              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-blue-100 text-blue-700 mx-auto flex items-center justify-center">
                    <Check className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-blue-950">¡Requerimiento Recibido con Éxito!</h4>
                  <p className="text-xs text-blue-900/80 max-w-md mx-auto leading-relaxed">
                    Gastón Barea revisará los detalles técnicos de tu solicitud y te responderá a <strong className="text-blue-950 font-semibold">{email}</strong> a la brevedad.
                  </p>
                  
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    {onScheduleClick && (
                      <button
                        onClick={onScheduleClick}
                        type="button"
                        className="py-2.5 px-5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-all shadow-md shadow-blue-500/20 flex items-center gap-2"
                      >
                        <Calendar className="w-3.5 h-3.5" />
                        <span>Agendar también llamada (30 min)</span>
                      </button>
                    )}
                    <button
                      onClick={() => setSubmitted(false)}
                      type="button"
                      className="text-xs font-mono text-blue-700 hover:text-blue-950 underline py-2"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-left">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-blue-800 mb-2 font-semibold">
                        Tu Nombre Completo <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Ing. Martín Rodríguez"
                        className={`w-full bg-[#F8FAFC] border text-blue-950 px-4 py-3 text-xs rounded-xl focus:outline-none transition-colors ${
                          formErrors.name ? 'border-rose-500' : 'border-blue-200 focus:border-blue-600'
                        }`}
                      />
                      {formErrors.name && (
                        <p className="text-[11px] text-rose-600 mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-blue-800 mb-2 font-semibold">
                        Correo Corporativo <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nombre@empresa.com"
                        className={`w-full bg-[#F8FAFC] border text-blue-950 px-4 py-3 text-xs rounded-xl focus:outline-none transition-colors ${
                          formErrors.email ? 'border-rose-500' : 'border-blue-200 focus:border-blue-600'
                        }`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] text-rose-600 mt-1">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-blue-800 mb-2 font-semibold">
                        Empresa u Organización <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ej. Cooperativa / Fintech / Salud"
                        className={`w-full bg-[#F8FAFC] border text-blue-950 px-4 py-3 text-xs rounded-xl focus:outline-none transition-colors ${
                          formErrors.company ? 'border-rose-500' : 'border-blue-200 focus:border-blue-600'
                        }`}
                      />
                      {formErrors.company && (
                        <p className="text-[11px] text-rose-600 mt-1">{formErrors.company}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-blue-800 mb-2 font-semibold">
                        Área de Interés
                      </label>
                      <select
                        value={serviceArea}
                        onChange={(e) => setServiceArea(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-blue-200 text-blue-950 px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition-colors font-medium"
                      >
                        <option value="Consultoría en Arquitectura de Software">
                          Consultoría en Arquitectura de Software
                        </option>
                        <option value="Business Intelligence & Data Analytics">
                          Business Intelligence & Data Analytics
                        </option>
                        <option value="Infraestructura Linux & Docker">
                          Infraestructura Linux & Docker
                        </option>
                        <option value="Desarrollo Web & Integración ERP (Odoo)">
                          Desarrollo Web & Integración ERP (Odoo)
                        </option>
                        <option value="Auditoría Crítica & Contingencia">
                          Auditoría Crítica & Contingencia
                        </option>
                        <option value="Dirección Tecnológica (CTO Fraccional)">
                          Dirección Tecnológica (CTO Fraccional)
                        </option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-blue-800 mb-2 font-semibold">
                      Detalle del Requerimiento <span className="text-blue-600">*</span>
                    </label>
                    <textarea
                      rows={5}
                      value={requirements}
                      onChange={(e) => setRequirements(e.target.value)}
                      placeholder="Describí brevemente los desafíos técnicos, la infraestructura actual o el objetivo del proyecto..."
                      className={`w-full bg-[#F8FAFC] border text-blue-950 p-4 text-xs rounded-xl focus:outline-none transition-colors leading-relaxed ${
                        formErrors.requirements ? 'border-rose-500' : 'border-blue-200 focus:border-blue-600'
                      }`}
                    />
                    {formErrors.requirements && (
                      <p className="text-[11px] text-rose-600 mt-1">{formErrors.requirements}</p>
                    )}
                  </div>

                  <div className="pt-3">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-full transition-all shadow-md shadow-blue-500/20 flex items-center justify-center gap-2"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Enviar Mensaje a Gastón Barea</span>
                    </button>
                    <p className="text-[11px] text-blue-800/70 text-center mt-3 font-mono">
                      Garantía estricta de confidencialidad y respuesta directa de ingeniería.
                    </p>
                  </div>
                </form>
              )}

            </div>
          </div>

          {/* Direct channels & FAQ (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="rounded-3xl bg-white border border-blue-900/10 p-7 space-y-4 shadow-sm">
              <div className="text-xs font-mono uppercase tracking-widest text-blue-600 font-semibold">
                Canales Directos & Agenda
              </div>

              {/* Calendly / Cal.com Quick Booking Card */}
              {onScheduleClick && (
                <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-blue-950">Agendar Llamada de 30 min</div>
                      <div className="text-[11px] text-blue-800/80">Calendly / Cal.com en tiempo real</div>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={onScheduleClick}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full transition-colors shrink-0 shadow-xs"
                  >
                    Agendar
                  </button>
                </div>
              )}

              {/* WhatsApp */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-950">Canal de WhatsApp</div>
                    <div className="text-[11px] text-blue-800/70">Coordinación ágil directa</div>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => onWhatsAppClick()}
                  className="px-3.5 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-full transition-colors"
                >
                  Chatear
                </button>
              </div>

              {/* Email */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-950">Correo Electrónico</div>
                    <div className="text-[11px] font-mono text-blue-700 font-medium">{SITE_CONFIG.email}</div>
                  </div>
                </div>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="px-3.5 py-1.5 text-xs font-semibold text-blue-800 hover:text-blue-950 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 rounded-full transition-colors"
                >
                  Escribir
                </a>
              </div>

              {/* LinkedIn & GitHub Direct */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                <a
                  href={SITE_CONFIG.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#F8FAFC] border border-blue-100 hover:border-blue-300 transition-all flex items-center gap-2 group"
                >
                  <Linkedin className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-blue-950">LinkedIn</div>
                    <div className="text-[10px] text-blue-700 flex items-center gap-0.5">
                      <span>Ver perfil</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </a>

                <a
                  href={SITE_CONFIG.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-2xl bg-[#F8FAFC] border border-blue-100 hover:border-blue-300 transition-all flex items-center gap-2 group"
                >
                  <Github className="w-4 h-4 text-blue-800 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <div className="text-[11px] font-bold text-blue-950">GitHub</div>
                    <div className="text-[10px] text-blue-700 flex items-center gap-0.5">
                      <span>@xpatagonia</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </div>
                  </div>
                </a>
              </div>

              {/* Base */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-950">Base Operativa</div>
                  <div className="text-[11px] text-blue-800/70">{SITE_CONFIG.location}</div>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="rounded-3xl bg-white border border-blue-900/10 p-7 space-y-3 shadow-sm">
              <div className="text-xs font-mono uppercase tracking-widest text-blue-600 mb-2 font-semibold">
                Preguntas Frecuentes
              </div>
              <div className="space-y-2">
                {FAQS_DATA.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div
                      key={idx}
                      className="rounded-2xl border border-blue-100 bg-[#F8FAFC] overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => toggleFaq(idx)}
                        className="w-full p-4 text-left flex items-center justify-between gap-3 text-xs font-bold text-blue-950 hover:text-blue-700 transition-colors"
                      >
                        <span>{faq.question}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-blue-600 shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="px-4 pb-4 text-xs text-blue-900/80 leading-relaxed font-normal border-t border-blue-100/60 pt-3">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

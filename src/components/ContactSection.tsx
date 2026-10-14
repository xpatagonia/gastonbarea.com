import React, { useState, useEffect } from 'react';
import { 
  Send, 
  Check, 
  ChevronDown, 
  ChevronUp, 
  MapPin, 
  Mail, 
  MessageSquare
} from 'lucide-react';
import { FAQS_DATA } from '../data/content';
import { saveContactInquiry } from '../lib/supabase';

interface ContactSectionProps {
  initialService?: string;
  initialMessage?: string;
  onWhatsAppClick: (customMessage?: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialService,
  initialMessage,
  onWhatsAppClick,
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
    if (!name.trim()) errors.name = 'Por favor ingresá tu nombre y apellido';
    if (!email.trim()) {
      errors.email = 'Por favor ingresá tu correo electrónico corporativo';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.email = 'Ingresá un formato de email válido';
    }
    if (!requirements.trim()) errors.requirements = 'Por favor detallá brevemente tu requerimiento';
    return errors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setFormErrors({});
    setSubmitted(true);

    // Persist contact message to Supabase (if configured)
    saveContactInquiry({
      name,
      email,
      company,
      serviceArea,
      requirements,
    }).catch((err) => console.debug('Supabase contact save skipped:', err));
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="contacto" className="py-24 md:py-32 bg-[#F4F4F4] relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header in Blue */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono tracking-widest uppercase text-blue-600 mb-3 font-semibold">
            CONTACTO DIRECTO
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-blue-950 leading-tight">
            Iniciemos una conversación sobre el futuro técnico de tu empresa.
          </h2>
          <p className="text-base sm:text-lg text-blue-900/80 mt-4 leading-relaxed font-normal">
            Diagnósticos de arquitectura, desarrollo a medida o auditorías de infraestructura. Respuesta técnica directa en menos de 24 horas hábiles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-white border border-blue-900/10 p-8 sm:p-10 shadow-sm">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto border border-blue-200">
                    <Check className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-950 tracking-tight">
                    Mensaje Recibido
                  </h3>
                  <p className="text-sm text-blue-900/80 max-w-md mx-auto leading-relaxed">
                    Gracias, <strong className="text-blue-950 font-bold">{name}</strong>. Revisaré personalmente los requerimientos de <strong className="text-blue-950 font-bold">{company || 'tu empresa'}</strong> y te responderé a <strong className="text-blue-700 font-bold">{email}</strong> en menos de 24 horas.
                  </p>
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        const whatsappMsg = `Hola Gastón, te envié un formulario desde ${company || 'mi empresa'}. Soy ${name}. Quería avisarte por este canal para coordinar.`;
                        onWhatsAppClick(whatsappMsg);
                      }}
                      className="px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-full inline-flex items-center gap-2 shadow-sm"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Notificar por WhatsApp</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmitted(false)}
                      className="text-xs text-blue-700 hover:text-blue-950 underline pt-1 sm:pt-0 font-medium"
                    >
                      Enviar otra consulta
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-blue-800 mb-2 font-semibold">
                        Nombre y Apellido <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Ej. Roberto Sánchez"
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
                        Email Corporativo <span className="text-blue-600">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="roberto@tuempresa.com"
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
                        Empresa u Organización
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ej. Cooperativa / Empresa S.A."
                        className="w-full bg-[#F8FAFC] border border-blue-200 text-blue-950 px-4 py-3 text-xs rounded-xl focus:outline-none focus:border-blue-600 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-blue-800 mb-2 font-semibold">
                        Área de Servicio
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
                Canales Directos
              </div>

              {/* WhatsApp */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-blue-950">Canal de WhatsApp</div>
                    <div className="text-[11px] text-blue-800/70">Respuesta ágil directa</div>
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
                    <div className="text-[11px] font-mono text-blue-700 font-medium">gastonbarea.com@gmail.com</div>
                  </div>
                </div>
                <a
                  href="mailto:gastonbarea.com@gmail.com"
                  className="px-3.5 py-1.5 text-xs font-semibold text-blue-800 hover:text-blue-950 bg-blue-50/70 hover:bg-blue-100/70 border border-blue-200 rounded-full transition-colors"
                >
                  Escribir
                </a>
              </div>

              {/* Base */}
              <div className="p-4 rounded-2xl bg-[#F8FAFC] border border-blue-100 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 border border-blue-200">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-blue-950">Base Operativa</div>
                  <div className="text-[11px] text-blue-800/70">Chubut, Argentina · Consultoría Remota Global</div>
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

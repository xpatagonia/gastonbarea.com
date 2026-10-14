/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ThreePillarsSection } from './components/ThreePillarsSection';
import { InteractiveDiagnosticSection } from './components/InteractiveDiagnosticSection';
import { TopologySection } from './components/TopologySection';
import { ServicesSection } from './components/ServicesSection';
import { TechSpecsSection } from './components/TechSpecsSection';
import { MethodologySection } from './components/MethodologySection';
import { CaseStudiesSection } from './components/CaseStudiesSection';
import { ArchitectureConfigurator } from './components/ArchitectureConfigurator';
import { SectorSolutionsSection } from './components/SectorSolutionsSection';
import { AboutProfileSection } from './components/AboutProfileSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ScheduleModal } from './components/ScheduleModal';
import { SITE_CONFIG } from './data/siteConfig';

export default function App() {
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('');
  const [customMessageForContact, setCustomMessageForContact] = useState<string>('');
  
  // State for Calendly / Cal.com scheduling modal
  const [isScheduleOpen, setIsScheduleOpen] = useState<boolean>(false);
  const [scheduleContext, setScheduleContext] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const openScheduleModal = (context?: string) => {
    setScheduleContext(context || '');
    setIsScheduleOpen(true);
  };

  const handleOpenWhatsApp = (customText?: string) => {
    const defaultText = SITE_CONFIG.whatsapp.defaultMessage;
    const textToSend = customText || defaultText;
    const phone = SITE_CONFIG.whatsapp.phoneNumber;
    const whatsappUrl = phone
      ? `https://wa.me/${phone}?text=${encodeURIComponent(textToSend)}`
      : `https://wa.me/?text=${encodeURIComponent(textToSend)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForContact(serviceName);
    setCustomMessageForContact(
      `Hola Gastón, me pongo en contacto para consultar sobre el servicio "${serviceName}". Buscamos evaluar los alcances para nuestra organización.`
    );
    scrollToSection('contacto');
  };

  const handleRequestEmergencyAudit = () => {
    setSelectedServiceForContact('Auditoría Crítica & Contingencia');
    setCustomMessageForContact(
      'DIAGNÓSTICO CRÍTICO DE EMERGENCIA: Tenemos una infraestructura con caídas recurrentes / lentitud extrema y necesitamos un diagnóstico y plan de acción inmediato.'
    );
    scrollToSection('contacto');
  };

  const handleSelectSector = (sectorTitle: string) => {
    setSelectedServiceForContact('Consultoría en Innovación de Negocios & Arquitectura');
    setCustomMessageForContact(
      `Hola Gastón, nos interesa una solución enfocada en "${sectorTitle}". Queremos coordinar una reunión técnica para relevar necesidades.`
    );
    scrollToSection('contacto');
  };

  const handleSimilarCaseClick = (caseTitle: string) => {
    setSelectedServiceForContact('Consultoría en Innovación de Negocios & Arquitectura');
    setCustomMessageForContact(
      `Hola Gastón, leí el caso de estudio "${caseTitle}" en tu sitio web y nuestra organización tiene un desafío estratégico y técnico muy similar.`
    );
    scrollToSection('contacto');
  };

  const handleSendScopeFromConfigurator = (scopeData: {
    objective: string;
    startingPoint: string;
    timeline: string;
    recommendedStack: string[];
    summary: string;
  }) => {
    const detail = `[ESPECIFICACIÓN CALCULADA DESDE CONFIGURADOR]
Objetivo: ${scopeData.objective}
Punto de partida: ${scopeData.startingPoint}
Plazo estimado: ${scopeData.timeline}
Stack aconsejado: ${scopeData.recommendedStack.join(', ')}
Detalle: ${scopeData.summary}
Quisiéramos coordinar una llamada de diagnóstico técnico para evaluar la viabilidad y presupuesto.`;

    setSelectedServiceForContact('Consultoría en Innovación de Negocios & Arquitectura');
    setCustomMessageForContact(detail);
    scrollToSection('contacto');
  };

  const handleScheduleWithAiProposal = (proposalSummary: string, serviceTitle: string) => {
    const contextText = `[PROPUESTA GENERADA CON EL MOTOR DE IA]\nServicio: ${serviceTitle}\n${proposalSummary}`;
    setSelectedServiceForContact(serviceTitle || 'Consultoría en Innovación de Negocios & Arquitectura');
    setCustomMessageForContact(contextText);
    openScheduleModal(contextText);
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-[#0f2442] flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-950 antialiased">
      {/* Top Navigation with Social & Schedule Modal Trigger */}
      <Header
        onScheduleClick={() => openScheduleModal()}
        onWhatsAppClick={handleOpenWhatsApp}
      />

      <main className="flex-1">
        {/* 1. Hero Section & Identity Badge (Fluid motion, ambient video & 3 pillars float) */}
        <Hero
          onExploreServices={() => scrollToSection('servicios')}
          onScheduleClick={() => openScheduleModal()}
          onWhatsAppClick={() => handleOpenWhatsApp()}
          onDiagnosticoClick={() => scrollToSection('diagnostico-ia')}
          onExplorePillars={() => scrollToSection('tres-pilares')}
        />

        {/* 2. LOS 3 PILARES ESTRATÉGICOS: Innovación de Negocios, Negocios Inteligentes & Modern Stack */}
        <ThreePillarsSection
          onScheduleClick={openScheduleModal}
          onDiagnosticoClick={() => scrollToSection('diagnostico-ia')}
        />

        {/* 3. Motor Interactivo de Diagnóstico & Solución de Arquitectura con IA */}
        <InteractiveDiagnosticSection
          onScheduleWithProposal={handleScheduleWithAiProposal}
          onWhatsAppWithProposal={handleOpenWhatsApp}
        />

        {/* 4. Topología de Sistemas Multicapa */}
        <TopologySection />

        {/* 5. Capacidades y Servicios (01 - 04) + Auditoría */}
        <ServicesSection
          onSelectService={handleSelectService}
          onRequestAudit={handleRequestEmergencyAudit}
        />

        {/* 6. Especificaciones Técnicas (Modern Stack + Filtro + Búsqueda) */}
        <TechSpecsSection
          onAuditStackClick={() => {
            setSelectedServiceForContact('Auditoría Crítica & Contingencia');
            setCustomMessageForContact(
              'Hola Gastón, quisiera solicitar una auditoría técnica de nuestro stack tecnológico actual para detectar cuellos de botella y vulnerabilidades.'
            );
            scrollToSection('contacto');
          }}
        />

        {/* 7. Metodología de Ingeniería (4 Fases con Stepper) */}
        <MethodologySection />

        {/* 8. Casos de Estudio con Métricas Cuantificables */}
        <CaseStudiesSection onSimilarCaseClick={handleSimilarCaseClick} />

        {/* 9. Configurador Interactivo de Arquitectura */}
        <ArchitectureConfigurator
          onSendScopeToContact={handleSendScopeFromConfigurator}
          onWhatsAppWithScope={handleOpenWhatsApp}
        />

        {/* 10. Propuesta de Valor Sectorial */}
        <SectorSolutionsSection onSectorSelect={handleSelectSector} />

        {/* 11. Perfil Profesional */}
        <AboutProfileSection onScheduleClick={() => openScheduleModal()} />

        {/* 12. Contacto Directo, Formulario, Calendly & FAQs */}
        <ContactSection
          initialService={selectedServiceForContact}
          initialMessage={customMessageForContact}
          onWhatsAppClick={handleOpenWhatsApp}
          onScheduleClick={() => openScheduleModal()}
        />
      </main>

      {/* Footer */}
      <Footer 
        onWhatsAppClick={() => handleOpenWhatsApp()} 
        onScheduleClick={() => openScheduleModal()} 
      />

      {/* Interactive 30-min Technical Meeting Scheduling Modal (Calendly / Cal.com / WhatsApp) */}
      <ScheduleModal
        isOpen={isScheduleOpen}
        onClose={() => setIsScheduleOpen(false)}
        proposalContext={scheduleContext}
        onNavigateToForm={() => scrollToSection('contacto')}
        onWhatsAppClick={handleOpenWhatsApp}
      />
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
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

export default function App() {
  const [selectedServiceForContact, setSelectedServiceForContact] = useState<string>('');
  const [customMessageForContact, setCustomMessageForContact] = useState<string>('');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenWhatsApp = (customText?: string) => {
    const defaultText =
      'Hola Gastón, estuve viendo tu sitio web (gastonbarea.com.ar) y me gustaría coordinar una consulta sobre arquitectura de software e infraestructura para mi empresa.';
    const textToSend = customText || defaultText;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(textToSend)}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSelectService = (serviceName: string) => {
    setSelectedServiceForContact(serviceName);
    setCustomMessageForContact(
      `Hola Gastón, me pongo en contacto para consultar sobre el servicio "${serviceName}". Buscamos evaluar los alcances para nuestra infraestructura actual.`
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
    setSelectedServiceForContact('Consultoría en Arquitectura de Software');
    setCustomMessageForContact(
      `Hola Gastón, nos interesa una solución enfocada en "${sectorTitle}". Queremos coordinar una reunión técnica para relevar necesidades.`
    );
    scrollToSection('contacto');
  };

  const handleSimilarCaseClick = (caseTitle: string) => {
    setSelectedServiceForContact('Consultoría en Arquitectura de Software');
    setCustomMessageForContact(
      `Hola Gastón, leí el caso de estudio "${caseTitle}" en tu sitio web y nuestra organización tiene un desafío con requerimientos técnicos muy similares.`
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
    setSelectedServiceForContact('Consultoría en Arquitectura de Software');
    setCustomMessageForContact(
      `[ESPECIFICACIÓN CALCULADA DESDE CONFIGURADOR]
Objetivo: ${scopeData.objective}
Punto de partida: ${scopeData.startingPoint}
Plazo estimado: ${scopeData.timeline}
Stack aconsejado: ${scopeData.recommendedStack.join(', ')}

Detalle: ${scopeData.summary}
Quisiéramos coordinar una llamada de diagnóstico técnico para evaluar la viabilidad y presupuesto.`
    );
    scrollToSection('contacto');
  };

  const handleScheduleWithAiProposal = (proposalSummary: string, serviceTitle: string) => {
    setSelectedServiceForContact(serviceTitle || 'Consultoría en Arquitectura de Software');
    setCustomMessageForContact(
      `[PROPUESTA GENERADA CON EL MOTOR DE IA DE GASTÓN BAREA]

${proposalSummary}

Solicito coordinar una sesión técnica de diagnóstico para avanzar con la implementación y costos.`
    );
    scrollToSection('contacto');
  };

  return (
    <div className="min-h-screen bg-[#F4F4F4] text-[#0f2442] flex flex-col font-sans selection:bg-blue-500/20 selection:text-blue-950 antialiased">
      {/* Top Navigation */}
      <Header
        onScheduleClick={() => scrollToSection('contacto')}
        onWhatsAppClick={handleOpenWhatsApp}
      />

      <main className="flex-1">
        {/* 1. Hero Section & Identity Badge */}
        <Hero
          onExploreServices={() => scrollToSection('servicios')}
          onScheduleClick={() => scrollToSection('contacto')}
          onWhatsAppClick={() => handleOpenWhatsApp()}
          onDiagnosticoClick={() => scrollToSection('diagnostico-ia')}
        />

        {/* 2. Motor Interactivo de Diagnóstico & Solución de Arquitectura con IA */}
        <InteractiveDiagnosticSection
          onScheduleWithProposal={handleScheduleWithAiProposal}
          onWhatsAppWithProposal={handleOpenWhatsApp}
        />

        {/* 3. Topología de Sistemas Multicapa */}
        <TopologySection />

        {/* 3. Capacidades y Servicios (01 - 04) + Auditoría */}
        <ServicesSection
          onSelectService={handleSelectService}
          onRequestAudit={handleRequestEmergencyAudit}
        />

        {/* 4. Especificaciones Técnicas (20 Techs + Filtro + Búsqueda) */}
        <TechSpecsSection
          onAuditStackClick={() => {
            setSelectedServiceForContact('Auditoría Crítica & Contingencia');
            setCustomMessageForContact('Hola Gastón, quisiera solicitar una auditoría técnica de nuestro stack tecnológico actual para detectar cuellos de botella y vulnerabilidades.');
            scrollToSection('contacto');
          }}
        />

        {/* 5. Metodología de Ingeniería (4 Fases con Stepper) */}
        <MethodologySection />

        {/* 6. Casos de Estudio con Métricas Cuantificables */}
        <CaseStudiesSection onSimilarCaseClick={handleSimilarCaseClick} />

        {/* 7. Configurador Interactivo de Arquitectura */}
        <ArchitectureConfigurator
          onSendScopeToContact={handleSendScopeFromConfigurator}
          onWhatsAppWithScope={handleOpenWhatsApp}
        />

        {/* 8. Propuesta de Valor Sectorial */}
        <SectorSolutionsSection onSectorSelect={handleSelectSector} />

        {/* 9. Perfil Profesional */}
        <AboutProfileSection onScheduleClick={() => scrollToSection('contacto')} />

        {/* 10. Contacto Directo, Formulario & FAQs */}
        <ContactSection
          initialService={selectedServiceForContact}
          initialMessage={customMessageForContact}
          onWhatsAppClick={handleOpenWhatsApp}
        />
      </main>

      {/* Footer */}
      <Footer onWhatsAppClick={() => handleOpenWhatsApp()} />
    </div>
  );
}

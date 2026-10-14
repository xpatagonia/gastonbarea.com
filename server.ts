import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;
if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback generator for realistic architecture proposals if API key is missing or calls fail
function generateRuleBasedProposal(payload: {
  organizationType: string;
  primaryChallenge: string;
  currentStack: string[];
  urgency: string;
  description?: string;
}) {
  const { organizationType, primaryChallenge, currentStack, urgency, description } = payload;

  let title = 'Arquitectura Modular de Alta Disponibilidad & Continuidad Operativa';
  let stack = ['Linux Ubuntu 24.04 LTS', 'Docker Compose', 'Nginx Reverse Proxy', 'PostgreSQL 16', 'WireGuard VPN'];
  let time = '4 a 6 semanas';
  let diag = `La infraestructura actual presenta riesgos de cuello de botella y fragilidad operativa. Al carecer de aislamiento de servicios y orquestación reproducible, cualquier pico de carga o fallo no controlado impacta en la continuidad del negocio.`;
  
  if (primaryChallenge.includes('Caídas') || primaryChallenge.includes('inestabilidad') || primaryChallenge.includes('Servidor')) {
    title = 'Topología de Servidores Blindada & Contenedorización con Docker';
    stack = ['Ubuntu Server LTS', 'Docker Compose', 'Fail2ban & UFW', 'PostgreSQL con WAL-G', 'Nginx SSL HTTP/2'];
    time = urgency === 'Crítica (Inmediata)' ? '2 a 3 semanas (Fast-Track)' : '4 semanas';
    diag = `Los síntomas reportados indican sobrecarga en memoria y procesos monolíticos compitiendo por recursos I/O sin cuotas asignadas. Se requiere migración a contenedores aislados con reinicio autónomo y monitoreo de métricas de hardware.`;
  } else if (primaryChallenge.includes('BI') || primaryChallenge.includes('Datos') || primaryChallenge.includes('Excel')) {
    title = 'Data Warehouse Centralizado & Pipeline ETL para Business Intelligence';
    stack = ['PostgreSQL Data Warehouse', 'Python ETL (Pandas/Async)', 'Metabase / Power BI', 'Docker Compose', 'Backups Automáticos'];
    time = '4 a 5 semanas';
    diag = `La dispersión de información en hojas de cálculo y silos desconectados genera reportes desactualizados y pérdida de horas hombre. El diseño implementará un repositorio único con ingesta automatizada y tableros ejecutivos en tiempo real.`;
  } else if (primaryChallenge.includes('Odoo') || primaryChallenge.includes('ERP')) {
    title = 'Despliegue & Optimización de Odoo ERP Corporativo en Linux';
    stack = ['Odoo ERP Community/Enterprise', 'PostgreSQL Tuning', 'Docker Compose', 'Nginx con SSL', 'Backups Cifrados Diarios'];
    time = '6 a 8 semanas';
    diag = `La integración de módulos de ventas, inventario, facturación y compras requiere una base relacional optimizada con pooling de conexiones y entornos de staging para pruebas antes de producción.`;
  } else if (primaryChallenge.includes('Desarrollo') || primaryChallenge.includes('Web') || primaryChallenge.includes('Medida')) {
    title = 'Sistema Web Progresivo a Medida con Arquitectura Desacoplada';
    stack = ['Next.js / React', 'Tailwind CSS', 'FastAPI / Node.js Backend', 'PostgreSQL', 'Docker Hosting'];
    time = '6 a 10 semanas';
    diag = `Para soportar las reglas de negocio de ${organizationType || 'la organización'}, se aconseja una arquitectura desacoplada Frontend Edge con APIs REST seguras y base de datos con integridad referencial estricta.`;
  }

  return {
    architectureTitle: title,
    diagnosticSummary: diag,
    estimatedTimeline: time,
    recommendedStack: stack,
    keyComponents: [
      {
        name: 'Capa de Seguridad & Red',
        detail: 'Firewall UFW, túnel WireGuard VPN para administración segura y certificados SSL TLS 1.3 automáticos.',
      },
      {
        name: 'Capa de Ejecución (Contenedores)',
        detail: 'Servicios aislados mediante Docker Compose con límites de memoria y reinicio supervisado.',
      },
      {
        name: 'Capa de Persistencia & Datos',
        detail: 'PostgreSQL con esquemas normalizados, índices optimizados y esquema de volcado cifrado diario fuera de sitio.',
      },
      {
        name: 'Supervisión & Monitoreo',
        detail: 'Alertas tempranas de uso de disco y carga de CPU antes de que afecten la facturación o la atención al cliente.',
      },
    ],
    workPhases: [
      {
        phase: 'Fase 1: Diagnóstico & Relevamiento In Situ / Remoto',
        duration: 'Semana 1',
        deliverable: 'Informe de auditoría técnica, cuellos de botella detectados y diagrama de topología propuesto.',
      },
      {
        phase: 'Fase 2: Aprovisionamiento en Entorno Staging',
        duration: 'Semana 2 a 3',
        deliverable: 'Configuración de servidores de prueba, scripts de migración de datos y validación de integridad.',
      },
      {
        phase: 'Fase 3: Migración a Producción con Cero Pérdida',
        duration: 'Semana 4',
        deliverable: 'Puesta en marcha programada en ventana de bajo tráfico y verificación transaccional.',
      },
      {
        phase: 'Fase 4: Documentación Técnica & Acompañamiento',
        duration: 'Soporte Continuo',
        deliverable: 'Manuales de procedimiento de desastre (DRP) y canales de soporte directo con Gastón Barea.',
      },
    ],
    tangibleBenefits: [
      'Disponibilidad del 99.9% asegurada mediante contenedores aislados',
      'Cero dependencia de proveedores externos con costos en dólares impredecibles',
      'Copias de seguridad automáticas cifradas con restauración probada',
      'Visibilidad ejecutiva de métricas críticas en tiempo real',
    ],
    executiveMessage: `Estimado equipo de ${organizationType || 'la organización'}: este esquema preliminar ataca de raíz el problema de ${primaryChallenge || 'continuidad operativa'} sin añadir capas innecesarias de complejidad. Podemos revisar esta arquitectura en una llamada técnica de 25 minutos.`,
    isAiGenerated: false,
  };
}

// Interactive Architecture Assessment & AI Proposal Route
app.post('/api/architecture-proposal', async (req, res) => {
  try {
    const {
      organizationType = 'Empresa Privada',
      primaryChallenge = 'Caídas o lentitud de infraestructura',
      currentStack = [],
      urgency = 'Media',
      customContext = '',
      contactName = '',
    } = req.body;

    // If Gemini client is available, generate custom proposal
    if (ai) {
      const prompt = `
Actúa como Gastón Barea, Consultor Tecnológico Senior y Arquitecto de Software (gastonbarea.com.ar) radicado en Chubut, Patagonia Argentina.
Eres conocido por tu lema: "Complejidad reducida a la mínima expresión. Ingeniería pragmática orientada a la economía real".
Priorizas software de código abierto (Linux Ubuntu, Docker Compose, PostgreSQL, Odoo ERP, Next.js, Python), alta disponibilidad (99.9% uptime), cero ataduras a proveedores (no vendor lock-in) y protección estricta de datos.

Un potencial cliente ha completado el formulario de diagnóstico interactivo con los siguientes datos:
- Organización / Sector: ${organizationType}
- Desafío principal: ${primaryChallenge}
- Tecnologías o stack actual que usan: ${currentStack.join(', ') || 'No especificado'}
- Nivel de urgencia / Criticidad: ${urgency}
- Contexto adicional o síntomas descritos por el cliente: "${customContext || 'Sin detalles adicionales'}"
- Nombre del solicitante: ${contactName || 'Responsable de Tecnología / Gerencia'}

Genera una propuesta técnica interactiva y pragmática en formato JSON estructurado exacto.
El JSON debe responder a las siguientes propiedades:
{
  "architectureTitle": "Título técnico claro y ejecutivo de la solución (ej: Arquitectura Contenedorizada de Alta Disponibilidad)",
  "diagnosticSummary": "Diagnóstico conciso de 2 o 3 oraciones sobre por qué sucede el problema y cuál es la causa raíz técnica.",
  "estimatedTimeline": "Tiempo estimado de implementación (ej: 4 a 6 semanas)",
  "recommendedStack": ["Lista de 4 a 6 tecnologías concretas recomendadas, ej: Ubuntu Server LTS, Docker Compose, PostgreSQL 16, etc."],
  "keyComponents": [
    { "name": "Nombre del componente o capa", "detail": "Explicación breve de 1 frase del rol de este componente" }
  ],
  "workPhases": [
    { "phase": "Nombre de la fase", "duration": "ej: Semana 1-2", "deliverable": "Entregable concreto de Gastón" }
  ],
  "tangibleBenefits": [
    "Beneficio 1 medible (ej: 99.9% de disponibilidad)",
    "Beneficio 2 medible",
    "Beneficio 3 medible",
    "Beneficio 4 medible"
  ],
  "executiveMessage": "Breve mensaje personalizado directo de Gastón para el cliente invitándolo a coordinar los detalles en una consulta técnica sin cargo."
}
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction:
            'Eres el Arquitecto de Software Gastón Barea. Responde siempre en español formal, técnico y pragmático. Devuelve únicamente el objeto JSON válido.',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              architectureTitle: { type: Type.STRING },
              diagnosticSummary: { type: Type.STRING },
              estimatedTimeline: { type: Type.STRING },
              recommendedStack: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              keyComponents: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    name: { type: Type.STRING },
                    detail: { type: Type.STRING },
                  },
                  required: ['name', 'detail'],
                },
              },
              workPhases: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    phase: { type: Type.STRING },
                    duration: { type: Type.STRING },
                    deliverable: { type: Type.STRING },
                  },
                  required: ['phase', 'duration', 'deliverable'],
                },
              },
              tangibleBenefits: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              executiveMessage: { type: Type.STRING },
            },
            required: [
              'architectureTitle',
              'diagnosticSummary',
              'estimatedTimeline',
              'recommendedStack',
              'keyComponents',
              'workPhases',
              'tangibleBenefits',
              'executiveMessage',
            ],
          },
        },
      });

      const responseText = response.text;
      if (responseText) {
        const parsed = JSON.parse(responseText);
        return res.json({
          ...parsed,
          isAiGenerated: true,
        });
      }
    }

    // Fallback if AI key is missing or call didn't produce text
    const fallback = generateRuleBasedProposal({
      organizationType,
      primaryChallenge,
      currentStack,
      urgency,
      description: customContext,
    });
    return res.json(fallback);
  } catch (error) {
    console.error('Error in /api/architecture-proposal:', error);
    // Graceful fallback so client UI never breaks
    const fallback = generateRuleBasedProposal({
      organizationType: req.body?.organizationType || 'Empresa',
      primaryChallenge: req.body?.primaryChallenge || 'Infraestructura',
      currentStack: req.body?.currentStack || [],
      urgency: req.body?.urgency || 'Media',
      description: req.body?.customContext || '',
    });
    return res.json(fallback);
  }
});

// Interactive AI Q&A endpoint: client can ask a follow-up question about the proposal
app.post('/api/architecture-qa', async (req, res) => {
  try {
    const { question, proposalContext } = req.body;
    if (!question) {
      return res.status(400).json({ error: 'Pregunta requerida' });
    }

    if (ai) {
      const prompt = `
Actúa como Gastón Barea, Arquitecto de Software Senior y Consultor Tecnológico.
El cliente está revisando la siguiente propuesta de arquitectura técnica preliminar:
"${JSON.stringify(proposalContext || {})}"

El cliente tiene la siguiente consulta específica sobre la solución:
"${question}"

Responde con precisión de ingeniero pragmático en 2 o 3 párrafos concisos:
1. Responde técnicamente a la inquietud sin rodeos.
2. Explica cómo protege los datos o reduce costos operativos.
3. Menciona cómo se validaría esto durante la auditoría o llamada inicial.
Mantén el tono profesional, claro, seguro y accesible para gerentes.
`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'Eres Gastón Barea, arquitecto de software de Patagonia Argentina. Respuestas técnicas, claras, pragmáticas.',
        },
      });

      return res.json({ answer: response.text });
    }

    // Rule-based answer fallback
    return res.json({
      answer: `Con respecto a tu consulta ("${question}"): En la arquitectura que diseño para producción, todo componente se implementa de manera desacoplada en contenedores Docker y con validación de persistencia en PostgreSQL. Esto permite que cualquier ajuste o módulo adicional se pruebe en un entorno de staging idéntico al productivo sin riesgo para la operación diaria. En nuestra llamada inicial revisaremos las particularidades de tu entorno para garantizar cero downtime.`,
    });
  } catch (error) {
    console.error('Error in /api/architecture-qa:', error);
    return res.json({
      answer: `Buena consulta. Toda decisión de arquitectura en mis proyectos se fundamenta en pruebas de carga previas y estándares abiertos para evitar costos ocultos. En nuestra reunión de diagnóstico técnico profundizaremos exactamente en este punto.`,
    });
  }
});

async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

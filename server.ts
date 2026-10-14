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

  let title = 'Arquitectura de Transformación: Nuevos Modelos Digitales & Operaciones con IA';
  let stack = ['Vercel Edge Platform', 'Supabase (PostgreSQL 16 RLS)', 'Google Gemini AI API', 'React 19 + TypeScript', 'Docker Compose'];
  let time = '4 a 6 semanas';
  let diag = `La organización requiere transicionar de procesos manuales a un modelo digital escalable. Conectaremos nuevos canales de monetización mediante un stack resiliente y agentes inteligentes de asistencia.`;

  if (primaryChallenge.includes('Modelo') || primaryChallenge.includes('Innovación') || primaryChallenge.includes('SaaS') || primaryChallenge.includes('Plataforma')) {
    title = 'Pilar 1: Plataforma B2B & Ecosistema de Monetización Recurrente';
    stack = ['React 19 + TypeScript', 'Vercel Edge Network', 'Supabase PostgreSQL RLS', 'Stripe Billing / Lemonsqueezy', 'Google Gemini AI'];
    time = '4 a 6 semanas';
    diag = `El modelo actual depende de horas manuales o intermediación costosa. Diseñaremos un portal digital de autoservicio B2B que empaquete el know-how corporativo en activos digitales con márgenes brutos superiores al 70%.`;
  } else if (primaryChallenge.includes('Inteligente') || primaryChallenge.includes('IA') || primaryChallenge.includes('Agente') || primaryChallenge.includes('BI') || primaryChallenge.includes('Datos')) {
    title = 'Pilar 2: Negocio Inteligente con Agentes Autónomos & Real-Time BI';
    stack = ['Google Gemini AI API', 'PostgreSQL pgvector & Supabase', 'LangChain Workflows', 'React 19 Streaming UI', 'Docker Pipelines'];
    time = '3 a 5 semanas';
    diag = `La dispersión de información y la lentitud en la toma de decisiones consumen hasta un 70% de horas en tareas repetitivas. Implementaremos agentes autónomos y un pipeline de BI predictivo en tiempo real.`;
  } else if (primaryChallenge.includes('Stack') || primaryChallenge.includes('Servidor') || primaryChallenge.includes('Caídas') || primaryChallenge.includes('inestabilidad')) {
    title = 'Pilar 3: Modern Tech Stack de Alta Disponibilidad & Resiliencia Cloud';
    stack = ['Ubuntu Server 24.04 LTS', 'Docker Compose', 'Vercel Edge', 'Supabase PostgreSQL', 'Nginx Reverse Proxy con SSL'];
    time = urgency === 'Crítica (Inmediata)' ? '2 a 3 semanas (Fast-Track)' : '4 semanas';
    diag = `La infraestructura presenta riesgos críticos de cuello de botella por monolitos sin aislamiento. Migraremos a topología contenerizada de alta disponibilidad con failover y monitoreo proactivo 24/7.`;
  }

  return {
    architectureTitle: title,
    diagnosticSummary: diag,
    estimatedTimeline: time,
    recommendedStack: stack,
    keyComponents: [
      {
        name: 'Capa de Innovación & Modelos Digitales',
        detail: 'Portal de autoservicio para clientes con suscripción, onboarding en 5 minutos y monetización automatizada.',
      },
      {
        name: 'Capa de Inteligencia & Agentes IA',
        detail: 'Modelos de lenguaje multimodales Gemini y búsqueda vectorial para resolver consultas y orquestar flujos operativos.',
      },
      {
        name: 'Capa de Infraestructura & Modern Stack',
        detail: 'Despliegues en el Edge con Vercel, persistencia segura con Supabase/PostgreSQL y contenedores Linux Docker.',
      },
      {
        name: 'Observabilidad & Business Intelligence',
        detail: 'Monitoreo de métricas clave de negocio (márgenes, tiempo de respuesta, LTV) en tiempo real.',
      },
    ],
    workPhases: [
      {
        phase: 'Fase 1: Diagnóstico de Pilares & Relevamiento de Modelo',
        duration: 'Semana 1',
        deliverable: 'Auditoría del modelo comercial, matriz de datos y especificación técnica de la arquitectura.',
      },
      {
        phase: 'Fase 2: Prototipado Rápido & Staging Funcional',
        duration: 'Semana 2 a 3',
        deliverable: 'MVP funcional en Vercel y Supabase con agentes de IA integrados y base de datos con RLS.',
      },
      {
        phase: 'Fase 3: Despliegue en Producción & Cero Fricción',
        duration: 'Semana 4',
        deliverable: 'Puesta en marcha con alta disponibilidad, DNS configurado, SSL y monitoreo en vivo.',
      },
      {
        phase: 'Fase 4: Acompañamiento Estratégico & Evolución Continua',
        duration: 'Soporte Continuo',
        deliverable: 'Reuniones de evolución de producto, optimización de ROI y soporte directo con Gastón Barea.',
      },
    ],
    tangibleBenefits: [
      'Multiplicador de LTV y creación de activos digitales de propiedad intelectual',
      'Reducción de hasta un 70% en tareas operativas manuales mediante agentes IA',
      'Infraestructura serverless de alta disponibilidad con latencia menor a 50ms',
      'Cero dependencia de costos de servidores ociosos gracias al Edge Computing',
    ],
    executiveMessage: `Estimado equipo de ${organizationType || 'la organización'}: esta arquitectura articula de forma directa los 3 pilares estratégicos (Innovación de Negocios, Agentes Inteligentes y Modern Stack). Podemos profundizar la viabilidad técnica en una reunión de 30 minutos sin compromiso.`,
    isAiGenerated: false,
  };
}

// Interactive Architecture Assessment & AI Proposal Route
app.post('/api/architecture-proposal', async (req, res) => {
  try {
    const {
      organizationType = 'Empresa Privada',
      primaryChallenge = 'Innovación de Negocios y Nuevos Modelos Digitales',
      currentStack = [],
      urgency = 'Media',
      customContext = '',
      contactName = '',
    } = req.body;

    // If Gemini client is available, generate custom proposal
    if (ai) {
      const prompt = `Actúa como Gastón Barea, Consultor Estratégico en Innovación de Negocios y Arquitecto de Software Senior (gastonbarea.com.ar).
Tu enfoque profesional descansa sobre 3 Pilares Fundamentales:
1. Business Innovación & Nuevos Modelos Digitales (Plataformas B2B, SaaS, monetización recurrente, productización de servicios expertos).
2. Negocios Inteligentes & Operaciones Autónomas con IA (Agentes autónomos de IA, analítica predictiva en tiempo real, BI en vivo).
3. Stack Técnico de Próxima Generación (Vercel Edge, Supabase / PostgreSQL con RLS, React 19, TypeScript, Docker Compose).

El cliente ha completado el formulario de diagnóstico interactivo:
- Organización / Sector: ${organizationType}
- Desafío principal: ${primaryChallenge}
- Tecnologías o stack actual que usan: ${currentStack.join(', ') || 'No especificado'}
- Nivel de urgencia / Criticidad: ${urgency}
- Contexto adicional descrito: "${customContext || 'Sin detalles adicionales'}"
- Nombre del solicitante: ${contactName || 'Responsable de Tecnología / Gerencia'}

Genera una propuesta técnica interactiva y pragmática en formato JSON estructurado exacto que integre los 3 pilares.
El JSON debe responder a las siguientes propiedades:
{
  "architectureTitle": "Título técnico claro y ejecutivo que mencione los pilares aplicables",
  "diagnosticSummary": "Diagnóstico conciso de 2 o 3 oraciones sobre por qué sucede el problema y cuál es la oportunidad de negocio y técnica.",
  "estimatedTimeline": "Tiempo estimado de implementación (ej: 4 a 6 semanas)",
  "recommendedStack": ["Lista de 4 a 6 tecnologías concretas recomendadas, ej: Vercel Edge, Supabase PostgreSQL RLS, React 19, Gemini AI API, Docker"],
  "keyComponents": [
    { "name": "Nombre del componente o capa", "detail": "Explicación breve de 1 frase del rol de este componente" }
  ],
  "workPhases": [
    { "phase": "Nombre de la fase", "duration": "ej: Semana 1-2", "deliverable": "Entregable concreto de Gastón" }
  ],
  "tangibleBenefits": [
    "Beneficio 1 medible de negocio o ingresos",
    "Beneficio 2 medible de automatización/eficiencia",
    "Beneficio 3 medible de rendimiento técnico",
    "Beneficio 4 medible"
  ],
  "executiveMessage": "Breve mensaje personalizado directo de Gastón para el cliente invitándolo a coordinar los detalles en una consulta técnica de 30 minutos sin cargo."
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          systemInstruction:
            'Eres Gastón Barea, consultor de innovación de negocios y arquitecto de software de Patagonia Argentina. Responde siempre en español formal, técnico y pragmático. Devuelve únicamente el objeto JSON válido.',
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
      const prompt = `Actúa como Gastón Barea, Consultor en Innovación de Negocios y Arquitecto de Software Senior.
El cliente está revisando la siguiente propuesta de arquitectura técnica preliminar:
"${JSON.stringify(proposalContext || {})}"

El cliente tiene la siguiente consulta específica sobre la solución:
"${question}"

Responde con precisión de ingeniero pragmático y estratega de negocio en 2 o 3 párrafos concisos:
1. Responde a la inquietud explicando el impacto en su modelo de negocio y en su stack técnico.
2. Explica cómo protege los datos, reduce costos operativos o multiplica márgenes.
3. Menciona cómo se validaría esto durante la reunión de 30 minutos.
Mantén el tono profesional, claro, seguro y accesible.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction:
            'Eres Gastón Barea, consultor de negocios digitales y arquitecto de software de Patagonia Argentina. Respuestas técnicas, claras, pragmáticas.',
        },
      });

      return res.json({ answer: response.text });
    }

    // Rule-based answer fallback
    return res.json({
      answer: `Con respecto a tu consulta ("${question}"): Al implementar una arquitectura basada en nuestros 3 Pilares (Innovación de Negocios, Operaciones Inteligentes y Modern Stack), cualquier módulo o nuevo modelo digital se prueba en entornos de staging en Vercel y Supabase sin afectar la operación diaria. En nuestra reunión técnica de 30 minutos revisaremos este aspecto en detalle para tu caso concreto.`,
    });
  } catch (error) {
    console.error('Error in /api/architecture-qa:', error);
    return res.json({
      answer: `Buena consulta. Toda decisión de arquitectura en mis proyectos se fundamenta en pruebas de carga previas y estándares abiertos para evitar costos ocultos. En nuestra reunión técnica profundizaremos exactamente en este punto.`,
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

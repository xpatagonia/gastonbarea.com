/**
 * Configuración centralizada de perfiles, canales de contacto y agenda técnica
 * Todos estos valores pueden ser sobreescritos fácilmente mediante variables de entorno (Vercel o .env)
 */

export interface SiteConfig {
  name: string;
  role: string;
  location: string;
  domain: string;
  email: string;
  social: {
    linkedin: string;
    github: string;
    twitter?: string;
  };
  booking: {
    // Si tenés Calendly o Cal.com podés configurarlo aquí o en Vercel como VITE_CALENDLY_URL o VITE_CAL_COM_URL
    calendlyUrl: string;
    calComUrl: string;
    defaultDuration: string;
    meetingTitle: string;
  };
  whatsapp: {
    phoneNumber: string; // Formato internacional sin símbolos, ej: 5492804xxxxxx
    defaultMessage: string;
  };
}

export const SITE_CONFIG: SiteConfig = {
  name: 'Gastón Barea',
  role: 'Arquitecto de Software & Consultor Tecnológico',
  location: 'Chubut, Patagonia Argentina · Proyectos Remotos Globales',
  domain: 'gastonbarea.com.ar',
  email: 'gastonbarea.com@gmail.com',

  social: {
    linkedin:
      (import.meta.env.VITE_LINKEDIN_URL as string) ||
      'https://www.linkedin.com/in/gastonbarea',
    github:
      (import.meta.env.VITE_GITHUB_URL as string) ||
      'https://github.com/xpatagonia',
    twitter:
      (import.meta.env.VITE_TWITTER_URL as string) ||
      'https://x.com/gastonbarea',
  },

  booking: {
    calendlyUrl:
      (import.meta.env.VITE_CALENDLY_URL as string) ||
      'https://calendly.com/gastonbarea/30min',
    calComUrl:
      (import.meta.env.VITE_CAL_COM_URL as string) ||
      'https://cal.com/gastonbarea/30min',
    defaultDuration: '30 minutos',
    meetingTitle: 'Diagnóstico Técnico & Arquitectura de Software',
  },

  whatsapp: {
    phoneNumber:
      (import.meta.env.VITE_WHATSAPP_PHONE as string) ||
      '', // Si está vacío, se usa wa.me/?text=... para que el usuario elija contacto o se complete con número de Gastón
    defaultMessage:
      'Hola Gastón, estuve viendo tu sitio web (gastonbarea.com.ar) y me gustaría coordinar una reunión de diagnóstico técnico para mi organización.',
  },
};

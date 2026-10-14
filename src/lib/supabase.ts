import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  !supabaseUrl.includes('your-project-id')
);

export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Helpers to save leads and proposals
export async function saveProposalLead(proposalData: {
  organizationType: string;
  companyName?: string;
  primaryChallenge: string;
  currentStack: string[];
  urgency: string;
  architectureTitle: string;
  diagnosticSummary: string;
  estimatedTimeline: string;
  recommendedStack: string[];
  executiveMessage: string;
}) {
  if (!supabase) {
    console.info('Supabase no configurado aún en Vercel. Guardado local simulado.');
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await supabase.from('proposals').insert([
      {
        organization_type: proposalData.organizationType,
        company_name: proposalData.companyName || null,
        primary_challenge: proposalData.primaryChallenge,
        current_stack: proposalData.currentStack,
        urgency: proposalData.urgency,
        architecture_title: proposalData.architectureTitle,
        diagnostic_summary: proposalData.diagnosticSummary,
        estimated_timeline: proposalData.estimatedTimeline,
        recommended_stack: proposalData.recommendedStack,
        executive_message: proposalData.executiveMessage,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Error al guardar en Supabase:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Excepción al conectar con Supabase:', err);
    return { success: false, error: err };
  }
}

export async function saveContactInquiry(inquiryData: {
  name: string;
  email: string;
  company?: string;
  serviceArea: string;
  requirements: string;
  createdAt?: string;
}) {
  if (!supabase) {
    console.info('Supabase no configurado aún en Vercel. Guardado local simulado.');
    return { success: true, mocked: true };
  }

  try {
    const { data, error } = await supabase.from('contact_inquiries').insert([
      {
        name: inquiryData.name,
        email: inquiryData.email,
        company: inquiryData.company || null,
        service_area: inquiryData.serviceArea,
        requirements: inquiryData.requirements,
        created_at: inquiryData.createdAt || new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Error al guardar consulta en Supabase:', error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (err) {
    console.error('Excepción en Supabase:', err);
    return { success: false, error: err };
  }
}

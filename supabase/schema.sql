-- ==============================================================================
-- GASTÓN BAREA - SCHEMA DE PRODUCCIÓN PARA SUPABASE (POSTGRESQL 16+)
-- Sitio: gastonbarea.com / gastonbarea.com.ar
-- ==============================================================================

-- 1. EXTENSIONES
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. TABLA: PROSPECTOS Y PROPUESTAS GENERADAS CON IA (MOTOR DE ARQUITECTURA)
CREATE TABLE IF NOT EXISTS public.proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    company_name TEXT,
    organization_type TEXT NOT NULL,
    primary_challenge TEXT NOT NULL,
    current_stack TEXT[] DEFAULT '{}',
    urgency TEXT,
    architecture_title TEXT NOT NULL,
    diagnostic_summary TEXT,
    estimated_timeline TEXT,
    recommended_stack TEXT[] DEFAULT '{}',
    executive_message TEXT,
    status TEXT DEFAULT 'nuevo' CHECK (status IN ('nuevo', 'contactado', 'en_evaluacion', 'reunion_agendada', 'archivado'))
);

-- Índices para búsqueda rápida
CREATE INDEX IF NOT EXISTS idx_proposals_created_at ON public.proposals (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_proposals_status ON public.proposals (status);
CREATE INDEX IF NOT EXISTS idx_proposals_company ON public.proposals (company_name);

-- 3. TABLA: MENSAJES Y CONSULTAS DEL FORMULARIO DE CONTACTO
CREATE TABLE IF NOT EXISTS public.contact_inquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    company TEXT,
    service_area TEXT NOT NULL,
    requirements TEXT NOT NULL,
    status TEXT DEFAULT 'pendiente' CHECK (status IN ('pendiente', 'respondido', 'en_seguimiento', 'cerrado'))
);

-- Índices
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON public.contact_inquiries (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_email ON public.contact_inquiries (email);

-- 4. POLÍTICAS DE SEGURIDAD (ROW LEVEL SECURITY - RLS)
ALTER TABLE public.proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_inquiries ENABLE ROW LEVEL SECURITY;

-- Permitir a los visitantes anónimos de la web insertar sus propuestas y consultas (Ingreso de prospectos)
CREATE POLICY "Permitir inserción anónima de propuestas" 
ON public.proposals 
FOR INSERT 
TO anon 
WITH CHECK (true);

CREATE POLICY "Permitir inserción anónima de consultas de contacto" 
ON public.contact_inquiries 
FOR INSERT 
TO anon 
WITH CHECK (true);

-- Permitir lectura y modificación únicamente al rol autenticado (Gastón Barea en Supabase Dashboard o con sesión)
CREATE POLICY "Permitir gestión completa a usuarios autenticados" 
ON public.proposals 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

CREATE POLICY "Permitir gestión de consultas a usuarios autenticados" 
ON public.contact_inquiries 
FOR ALL 
TO authenticated 
USING (true)
WITH CHECK (true);

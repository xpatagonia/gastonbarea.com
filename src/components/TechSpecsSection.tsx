import React, { useState, useMemo } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { TECH_SPECS_DATA } from '../data/content';

interface TechSpecsSectionProps {
  onAuditStackClick: () => void;
}

export const TechSpecsSection: React.FC<TechSpecsSectionProps> = ({ onAuditStackClick }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { label: 'Todos (20)', value: 'Todos' },
    { label: 'Frontend & UI', value: 'Frontend & UI' },
    { label: 'Backend & DB', value: 'Backend & DB' },
    { label: 'Infraestructura & OS', value: 'Infraestructura & OS' },
    { label: 'Data & AI', value: 'Data & AI' },
  ];

  const filteredSpecs = useMemo(() => {
    return TECH_SPECS_DATA.filter((tech) => {
      const matchesCategory = selectedCategory === 'Todos' || tech.category === selectedCategory;
      const matchesQuery =
        searchQuery === '' ||
        tech.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tech.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <section id="tech-specs" className="py-24 md:py-32 bg-[#F4F4F4] relative border-b border-blue-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Apple Section Header in Blue */}
        <div className="max-w-3xl mb-16">
          <div className="text-[11px] font-mono tracking-widest uppercase text-blue-600 mb-3 font-semibold">
            ESPECIFICACIONES TÉCNICAS & HERRAMIENTAS
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-blue-950 leading-tight">
            Tecnologías probadas en producción. Cero ataduras.
          </h2>
          <p className="text-base sm:text-lg text-blue-900/80 mt-4 leading-relaxed font-normal">
            Priorizamos software de código abierto y estándares de la industria que garantizan autonomía técnica, bajo costo de licenciamiento y longevidad a 10 años.
          </p>
        </div>

        {/* Filter Bar & Search */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 mb-10">
          
          {/* Segmented Filter Tabs in Blue */}
          <div className="flex flex-wrap items-center gap-1 p-1 bg-white border border-blue-200/80 rounded-full shadow-xs">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all whitespace-nowrap ${
                  selectedCategory === cat.value
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'text-blue-900/70 hover:text-blue-950 hover:bg-blue-50/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[280px]">
            <Search className="w-4 h-4 text-blue-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar tecnología o herramienta..."
              className="w-full bg-white border border-blue-200/80 text-blue-950 pl-11 pr-4 py-2 text-xs rounded-full placeholder:text-blue-400 focus:outline-none focus:border-blue-500 shadow-xs transition-colors"
            />
          </div>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredSpecs.map((tech) => (
            <div
              key={tech.id}
              className="p-6 rounded-2xl bg-white border border-blue-900/8 hover:border-blue-400 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base font-bold text-blue-950 tracking-tight">
                    {tech.name}
                  </h3>
                  <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100 font-semibold">
                    {tech.type}
                  </span>
                </div>

                <p className="text-xs text-blue-900/80 leading-relaxed mt-2 font-normal">
                  {tech.description}
                </p>
              </div>

              <div className="mt-6 pt-3.5 border-t border-blue-100 flex items-center justify-between text-[11px] font-mono">
                <span className="text-blue-500 font-medium">Nivel de Dominio:</span>
                <span className="text-blue-900 font-bold">
                  {tech.level}
                </span>
              </div>
            </div>
          ))}

          {filteredSpecs.length === 0 && (
            <div className="col-span-full py-16 text-center text-blue-600 text-sm">
              No se encontraron tecnologías que coincidan con &ldquo;{searchQuery}&rdquo;.
            </div>
          )}
        </div>

        {/* Apple Manifesto Philosophy Card */}
        <div className="mt-16 rounded-3xl bg-white border border-blue-200 p-8 sm:p-12 shadow-sm">
          <div className="max-w-3xl space-y-4">
            <div className="text-[11px] font-mono tracking-widest uppercase text-blue-600 font-semibold">
              FILOSOFÍA DE ARQUITECTURA TECNOLÓGICA
            </div>
            <h3 className="text-2xl sm:text-4xl font-bold text-blue-950 tracking-tight leading-snug">
              ¿Por qué elegimos Linux, PostgreSQL y Docker?
            </h3>
            <p className="text-base text-blue-900/80 leading-relaxed font-normal">
              Porque tu empresa debe tener el control total de sus datos y su código. Plataformas propietarias costosas aumentan la deuda técnica y limitan la innovación. Diseñamos con cimientos abiertos que permiten migrar entre servidores propios o cualquier proveedor en cuestión de minutos.
            </p>
            <div className="pt-4">
              <button
                onClick={onAuditStackClick}
                type="button"
                className="px-6 py-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-[0.98] rounded-full inline-flex items-center gap-2 transition-all shadow-md shadow-blue-500/20"
              >
                <span>Auditar tu stack actual</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

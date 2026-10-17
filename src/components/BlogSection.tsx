import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Search,
  PlusCircle,
  Video,
  Music,
  Headphones,
  Image as ImageIcon,
  ArrowRight,
  Sparkles,
  Calendar,
  Clock,
  Edit,
  Trash2,
  Lock,
  Tag
} from 'lucide-react';
import { BlogPost, BlogCategory } from '../types/blog';
import { INITIAL_BLOG_POSTS } from '../data/blogData';
import { PostEditorModal } from './blog/PostEditorModal';
import { ArticleReaderModal } from './blog/ArticleReaderModal';

interface BlogSectionProps {
  onScheduleClick: () => void;
  onWhatsAppClick: (customText?: string) => void;
}

const CATEGORIES: ('Todos' | BlogCategory)[] = [
  'Todos',
  'Innovación & Negocios',
  'Operaciones con IA',
  'Modern Tech Stack',
  'Infraestructura & Linux',
];

export const BlogSection: React.FC<BlogSectionProps> = ({
  onScheduleClick,
  onWhatsAppClick,
}) => {
  const [posts, setPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem('gb_blog_posts');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // fallback
    }
    return INITIAL_BLOG_POSTS;
  });

  const [activeCategory, setActiveCategory] = useState<'Todos' | BlogCategory>('Todos');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Modals state
  const [selectedPostForReading, setSelectedPostForReading] = useState<BlogPost | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [postToEdit, setPostToEdit] = useState<BlogPost | null>(null);

  // Sync to localStorage
  const savePosts = (newPosts: BlogPost[]) => {
    setPosts(newPosts);
    try {
      localStorage.setItem('gb_blog_posts', JSON.stringify(newPosts));
    } catch (e) {
      console.error(e);
    }
  };

  const handleSavePost = (newPost: BlogPost) => {
    const existingIndex = posts.findIndex((p) => p.id === newPost.id);
    let updated: BlogPost[];
    if (existingIndex >= 0) {
      updated = [...posts];
      updated[existingIndex] = newPost;
    } else {
      updated = [newPost, ...posts];
    }
    savePosts(updated);
  };

  const handleDeletePost = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('¿Deseas eliminar este artículo permanentemente?')) {
      const updated = posts.filter((p) => p.id !== id);
      savePosts(updated);
    }
  };

  const handleOpenEdit = (post: BlogPost, e: React.MouseEvent) => {
    e.stopPropagation();
    setPostToEdit(post);
    setIsEditorOpen(true);
  };

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = activeCategory === 'Todos' || post.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(query)));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-24 md:py-32 bg-[#F4F4F4] relative border-b border-blue-900/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-mono font-bold uppercase mb-3 border border-blue-200">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span>PUBLICACIONES & ANÁLISIS TÉCNICOS</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-blue-950 leading-tight">
              Ingeniería, Negocios y Arquitectura Digital.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 font-normal">
              Análisis pragmáticos, podcasts en Spotify, videos de arquitectura y notas técnicas redactadas exclusivamente por Gastón Barea.
            </p>
          </div>

          {/* Author Publishing CTA Button */}
          <div className="shrink-0 flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setPostToEdit(null);
                setIsEditorOpen(true);
              }}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs flex items-center gap-2 shadow-sm shadow-blue-500/25 cursor-pointer transition-all active:scale-95"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Publicar Artículo (Autor)</span>
            </button>
          </div>
        </div>

        {/* Filters and Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-200">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-blue-600 text-white font-bold shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar por tema o tecnología..."
              className="w-full pl-9 pr-4 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
            />
          </div>

        </div>

        {/* Articles Grid */}
        {filteredPosts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
            <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800">No se encontraron artículos</h3>
            <p className="text-xs text-slate-500 mt-1">Prueba con otra palabra clave o selecciona otra categoría.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => {
              // Detect what media types exist in this post
              const hasVideo = post.blocks.some((b) => b.type === 'youtube');
              const hasSpotify = post.blocks.some((b) => b.type === 'spotify');
              const hasAudio = post.blocks.some((b) => b.type === 'audio');
              const hasImages = post.blocks.some((b) => b.type === 'image');

              return (
                <article
                  key={post.id}
                  onClick={() => setSelectedPostForReading(post)}
                  className="rounded-3xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400/80 transition-all duration-300 overflow-hidden flex flex-col cursor-pointer group"
                >
                  {/* Card Cover */}
                  <div className="relative aspect-[16/9] w-full bg-slate-900 overflow-hidden">
                    {post.coverImage ? (
                      <img
                        src={post.coverImage}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-blue-950 flex items-center justify-center text-slate-500">
                        <BookOpen className="w-12 h-12" />
                      </div>
                    )}
                    
                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-md bg-white/95 backdrop-blur-md text-[11px] font-mono font-bold text-blue-900 shadow-xs">
                        {post.category}
                      </span>
                    </div>

                    {/* Multimedia Badges Overlay */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5">
                      {hasVideo && (
                        <span className="p-1 rounded bg-black/60 backdrop-blur-md text-red-400" title="Incluye Video YouTube">
                          <Video className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {hasSpotify && (
                        <span className="p-1 rounded bg-black/60 backdrop-blur-md text-emerald-400" title="Incluye Podcast Spotify">
                          <Music className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {hasAudio && (
                        <span className="p-1 rounded bg-black/60 backdrop-blur-md text-sky-400" title="Incluye Nota de Audio">
                          <Headphones className="w-3.5 h-3.5" />
                        </span>
                      )}
                      {hasImages && (
                        <span className="p-1 rounded bg-black/60 backdrop-blur-md text-violet-300" title="Incluye Diagramas / Fotos">
                          <ImageIcon className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </div>

                    {/* Author management controls (hover) */}
                    <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        type="button"
                        onClick={(e) => handleOpenEdit(post, e)}
                        className="p-1.5 rounded-lg bg-black/70 hover:bg-blue-600 text-white transition-colors cursor-pointer"
                        title="Editar post"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => handleDeletePost(post.id, e)}
                        className="p-1.5 rounded-lg bg-black/70 hover:bg-rose-600 text-white transition-colors cursor-pointer"
                        title="Eliminar post"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      {/* Date & read time */}
                      <div className="flex items-center gap-2 text-[11px] font-mono text-slate-500">
                        <span>{post.publishedAt}</span>
                        <span>·</span>
                        <span>{post.readTime}</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-blue-950 group-hover:text-blue-600 transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Footer strip: Author and Read CTA */}
                    <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-blue-600 text-white flex items-center justify-center font-bold font-mono text-[10px]">
                          GB
                        </div>
                        <span className="text-xs font-semibold text-slate-800">Gastón Barea</span>
                      </div>
                      <span className="text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>Leer</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>

                  </div>
                </article>
              );
            })}
          </div>
        )}

      </div>

      {/* Reader Modal */}
      <ArticleReaderModal
        post={selectedPostForReading}
        onClose={() => setSelectedPostForReading(null)}
        onScheduleClick={onScheduleClick}
        onWhatsAppClick={onWhatsAppClick}
      />

      {/* Post Editor Modal (Only Gastón) */}
      <PostEditorModal
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setPostToEdit(null);
        }}
        onSavePost={handleSavePost}
        postToEdit={postToEdit}
      />
    </section>
  );
};

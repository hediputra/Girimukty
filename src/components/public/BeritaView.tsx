import React, { useState, useEffect } from 'react';
import { Search, Eye, Calendar, User, ArrowLeft, Share2, Tag, Check } from 'lucide-react';
import { NewsItem } from '../../types';
import { StorageService } from '../../services/storage';

interface BeritaViewProps {
  initialSlug?: string;
  onNavigateSlug?: (slug: string) => void;
}

export const BeritaView: React.FC<BeritaViewProps> = ({ initialSlug, onNavigateSlug }) => {
  const [selectedSlug, setSelectedSlug] = useState<string | null>(initialSlug || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [copied, setCopied] = useState(false);

  const newsList = StorageService.getNews().filter(n => n.status === 'terbit');

  useEffect(() => {
    if (initialSlug) {
      setSelectedSlug(initialSlug);
      StorageService.incrementNewsViews(initialSlug);
    }
  }, [initialSlug]);

  const activeArticle = selectedSlug ? newsList.find(n => n.slug === selectedSlug) : null;

  const categories = ['Semua', 'Pemerintahan', 'Pembangunan', 'Kemasyarakatan', 'Pertanian'];

  const filteredNews = newsList.filter(item => {
    const matchCat = selectedCategory === 'Semua' || item.kategori === selectedCategory;
    const matchSearch = searchQuery === '' || 
      item.judul.toLowerCase().includes(searchQuery.toLowerCase()) || 
      item.ringkasan.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleOpenDetail = (slug: string) => {
    setSelectedSlug(slug);
    StorageService.incrementNewsViews(slug);
    if (onNavigateSlug) onNavigateSlug(slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* If reading detailed article */}
      {activeArticle ? (
        <article className="max-w-3xl mx-auto bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 space-y-6 shadow-xs">
          
          <button
            onClick={() => setSelectedSlug(null)}
            className="text-xs font-semibold text-[#1E6BB8] hover:text-[#0B3D6E] inline-flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Kembali ke Daftar Berita</span>
          </button>

          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span className="text-[#1E6BB8] font-bold uppercase tracking-wider">{activeArticle.kategori}</span>
              <span>·</span>
              <span>{activeArticle.tanggalPublikasi}</span>
              <span>·</span>
              <span className="flex items-center gap-1 font-mono">
                <Eye className="w-3.5 h-3.5" />
                <span>{activeArticle.views} Dibaca</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight leading-snug">
              {activeArticle.judul}
            </h1>

            <div className="flex items-center justify-between text-xs text-slate-600 border-y border-slate-100 py-3">
              <span className="flex items-center gap-2">
                <User className="w-4 h-4 text-slate-400" />
                <span>Oleh: <strong>{activeArticle.penulis}</strong></span>
              </span>

              <button
                onClick={handleShare}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copied ? 'Tautan Disalin!' : 'Bagikan Berita'}</span>
              </button>
            </div>
          </div>

          {/* Hero Article Image */}
          <div className="aspect-16/10 rounded-xl overflow-hidden border border-slate-200 shadow-xs">
            <img
              src={activeArticle.gambarUrl}
              alt={activeArticle.judul}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Article Body */}
          <div className="text-slate-800 text-sm sm:text-base leading-relaxed space-y-4 pt-2">
            {activeArticle.konten.split('\n\n').map((paragraph, pIdx) => (
              <p key={pIdx}>{paragraph}</p>
            ))}
          </div>

          {/* Tags */}
          <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <Tag className="w-4 h-4 text-slate-400" />
            {activeArticle.tags.map((t, idx) => (
              <span key={idx} className="text-xs bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md">
                #{t}
              </span>
            ))}
          </div>

        </article>
      ) : (
        /* News List View */
        <div className="space-y-8">
          
          {/* Header & Search */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6BB8] mb-1">
                Publikasi & Informasi Terkini
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Kabar Berita Desa Girimukti
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Informasi resmi seputar penyelenggaraan pemerintahan, pembangunan fisik, dan kegiatan warga Girimukti.
              </p>
            </div>

            <div className="w-full md:w-72">
              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari judul berita..."
                  className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                />
              </div>
            </div>
          </div>

          {/* Category Filter */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-[#0B3D6E] text-white'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredNews.map((item) => (
              <article
                key={item.id}
                onClick={() => handleOpenDetail(item.slug)}
                className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col justify-between group"
              >
                <div>
                  <div className="aspect-16/10 overflow-hidden bg-slate-100">
                    <img
                      src={item.gambarUrl}
                      alt={item.judul}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <span className="text-[#1E6BB8] font-bold">{item.kategori}</span>
                      <span>·</span>
                      <span>{item.tanggalPublikasi}</span>
                    </div>
                    <h2 className="text-base font-bold text-slate-900 group-hover:text-[#1E6BB8] transition-colors line-clamp-2">
                      {item.judul}
                    </h2>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {item.ringkasan}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                  <span className="truncate max-w-[150px]">{item.penulis}</span>
                  <span className="flex items-center gap-1 font-mono">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{item.views}</span>
                  </span>
                </div>
              </article>
            ))}
          </div>

        </div>
      )}

    </div>
  );
};

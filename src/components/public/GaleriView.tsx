import React, { useState } from 'react';
import { Camera, Video, X, Maximize2 } from 'lucide-react';
import { GalleryItem } from '../../types';
import { StorageService } from '../../services/storage';

export const GaleriView: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'semua' | 'foto' | 'video'>('semua');
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

  const gallery = StorageService.getGallery();

  const filtered = gallery.filter(item => {
    if (activeFilter === 'semua') return true;
    return item.tipe === activeFilter;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6BB8] mb-1">
          Pusat Dokumentasi Kegiatan & Potensi
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Galeri Foto & Video Desa Girimukti
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Dokumentasi visual pembangunan fisik, panen raya pertanian, musyawarah warga, dan keindahan alam perdesaan Girimukti.
        </p>

        {/* Filter */}
        <div className="flex items-center gap-2 mt-6">
          <button
            onClick={() => setActiveFilter('semua')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
              activeFilter === 'semua' ? 'bg-[#0B3D6E] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Semua Dokumentasi
          </button>
          <button
            onClick={() => setActiveFilter('foto')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'foto' ? 'bg-[#0B3D6E] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Foto Kegiatan</span>
          </button>
          <button
            onClick={() => setActiveFilter('video')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer flex items-center gap-1.5 ${
              activeFilter === 'video' ? 'bg-[#0B3D6E] text-white' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Video Dokumentasi</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedItem(item)}
            className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
              <img
                src={item.mediaUrl}
                alt={item.judul}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute top-3 right-3 bg-slate-900/60 backdrop-blur-xs text-white p-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-4 h-4" />
              </div>
            </div>

            <div className="p-4 space-y-1.5">
              <div className="flex items-center justify-between text-[11px] text-slate-500">
                <span className="text-[#1E6BB8] font-semibold">{item.kategori}</span>
                <span>{item.tanggal}</span>
              </div>
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-[#1E6BB8] transition-colors line-clamp-1">
                {item.judul}
              </h3>
              <p className="text-xs text-slate-500 line-clamp-2">
                {item.deskripsi}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedItem && (
        <div 
          onClick={() => setSelectedItem(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl relative"
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-slate-900/60 hover:bg-slate-900 text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 bg-black">
              <img
                src={selectedItem.mediaUrl}
                alt={selectedItem.judul}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span className="font-semibold text-[#1E6BB8]">{selectedItem.kategori}</span>
                <span>·</span>
                <span>{selectedItem.tanggal}</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">{selectedItem.judul}</h2>
              <p className="text-xs text-slate-600 leading-relaxed">{selectedItem.deskripsi}</p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

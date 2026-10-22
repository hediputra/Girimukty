import React, { useState } from 'react';
import { Search, X, FileText, Bell, Calendar, TrendingUp, ArrowRight } from 'lucide-react';
import { StorageService } from '../../services/storage';

interface SearchViewProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: string, param?: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({ isOpen, onClose, onNavigate }) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const news = StorageService.getNews();
  const announcements = StorageService.getAnnouncements();
  const agendas = StorageService.getAgendas();
  const docs = StorageService.getPublicDocuments();

  const cleanQ = query.trim().toLowerCase();

  const matchedNews = cleanQ ? news.filter(n => n.judul.toLowerCase().includes(cleanQ) || n.ringkasan.toLowerCase().includes(cleanQ)) : [];
  const matchedAnnouncements = cleanQ ? announcements.filter(a => a.judul.toLowerCase().includes(cleanQ) || a.isi.toLowerCase().includes(cleanQ)) : [];
  const matchedAgendas = cleanQ ? agendas.filter(ag => ag.judul.toLowerCase().includes(cleanQ) || ag.lokasi.toLowerCase().includes(cleanQ)) : [];
  const matchedDocs = cleanQ ? docs.filter(d => d.judul.toLowerCase().includes(cleanQ) || d.nomorDokumen.toLowerCase().includes(cleanQ)) : [];

  const totalMatches = matchedNews.length + matchedAnnouncements.length + matchedAgendas.length + matchedDocs.length;

  const handleSelect = (tab: string, param?: string) => {
    onNavigate(tab, param);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-16 px-4">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[80vh]">
        
        {/* Search Input Bar */}
        <div className="p-4 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ketik kata kunci pencarian (misal: musrenbang, jalan, bansos, pbb, surat)..."
            className="flex-1 text-sm bg-transparent border-0 focus:outline-hidden text-slate-900 placeholder-slate-400"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="overflow-y-auto p-4 space-y-6">
          {!cleanQ ? (
            <div className="text-center py-8 text-xs text-slate-400 space-y-2">
              <Search className="w-8 h-8 text-slate-300 mx-auto" />
              <p>Mencari berita, pengumuman, agenda, atau dokumen publik Desa Girimukti...</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Surat Keterangan Usaha', 'APBDes 2026', 'Jalan Usaha Tani', 'Gula Aren', 'Perekaman KTP'].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => setQuery(kw)}
                    className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-md text-[11px] cursor-pointer"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          ) : totalMatches === 0 ? (
            <div className="text-center py-8 text-xs text-slate-400">
              Tidak ditemukan hasil untuk "{query}". Coba kata kunci yang lain.
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Matched News */}
              {matchedNews.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Berita Desa ({matchedNews.length})
                  </span>
                  {matchedNews.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => handleSelect('berita', n.slug)}
                      className="p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                    >
                      <h4 className="text-xs font-bold text-slate-900">{n.judul}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{n.ringkasan}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Announcements */}
              {matchedAnnouncements.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Pengumuman ({matchedAnnouncements.length})
                  </span>
                  {matchedAnnouncements.map((a) => (
                    <div
                      key={a.id}
                      onClick={() => handleSelect('pengumuman')}
                      className="p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                    >
                      <h4 className="text-xs font-bold text-slate-900">{a.judul}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">{a.isi}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Agendas */}
              {matchedAgendas.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Agenda ({matchedAgendas.length})
                  </span>
                  {matchedAgendas.map((ag) => (
                    <div
                      key={ag.id}
                      onClick={() => handleSelect('agenda')}
                      className="p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                    >
                      <h4 className="text-xs font-bold text-slate-900">{ag.judul}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">{ag.tanggalMulai} · {ag.lokasi}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Docs */}
              {matchedDocs.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Dokumen Publik & PPID ({matchedDocs.length})
                  </span>
                  {matchedDocs.map((d) => (
                    <div
                      key={d.id}
                      onClick={() => handleSelect('ppid')}
                      className="p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                    >
                      <h4 className="text-xs font-bold text-slate-900">{d.judul}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5 font-mono">{d.nomorDokumen} · {d.kategori}</p>
                    </div>
                  ))}
                </div>
              )}

            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-400 text-center">
          Tekan ESC atau klik di luar untuk menutup pencarian.
        </div>
      </div>
    </div>
  );
};

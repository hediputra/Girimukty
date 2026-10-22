import React from 'react';
import { Bell, Calendar, Download, AlertCircle, FileText } from 'lucide-react';
import { StorageService } from '../../services/storage';

export const PengumumanView: React.FC = () => {
  const announcements = StorageService.getAnnouncements();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6BB8] mb-1">
          Pemberitahuan Resmi Pemerintah Desa
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pengumuman & Surat Edaran Desa Girimukti
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Informasi penting mengenai layanan, program pemerintah, dan jadwal pelayanan warga.
        </p>
      </div>

      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-xl border p-6 shadow-xs space-y-3 transition-colors ${
              item.isPenting ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {item.isPenting && (
                  <span className="text-[10px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded uppercase tracking-wider">
                    Penting
                  </span>
                )}
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  item.status === 'aktif' ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 bg-slate-100'
                }`}>
                  Status: {item.status === 'aktif' ? 'Aktif' : 'Kedaluwarsa'}
                </span>
              </div>

              <div className="text-xs text-slate-400 flex items-center gap-2">
                <span>Diterbitkan: {item.tanggalTerbit}</span>
                <span>·</span>
                <span>Berlaku hingga: {item.berlakuSampai}</span>
              </div>
            </div>

            <h2 className="text-base sm:text-lg font-bold text-slate-900">
              {item.judul}
            </h2>

            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              {item.isi}
            </p>

            {item.lampiranNama && (
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#1E6BB8]" />
                  <span>Lampiran: {item.lampiranNama}</span>
                </span>
                <button
                  onClick={() => alert(`Mengunduh berkas: ${item.lampiranNama}`)}
                  className="px-3 py-1.5 text-xs font-semibold text-[#1E6BB8] bg-blue-50 hover:bg-blue-100 rounded-lg inline-flex items-center gap-1 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Surat Edaran</span>
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

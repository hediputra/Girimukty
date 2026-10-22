import React from 'react';
import { Calendar, Clock, MapPin, Users, CheckCircle2 } from 'lucide-react';
import { StorageService } from '../../services/storage';

export const AgendaView: React.FC = () => {
  const agendas = StorageService.getAgendas();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6BB8] mb-1">
          Jadwal Kegiatan & Musyawarah
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Agenda Kegiatan Desa Girimukti
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Kalender kegiatan posyandu, musyawarah desa, penyuluhan pertanian, dan kerja bakti masyarakat.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agendas.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1E6BB8] bg-blue-50 px-2.5 py-1 rounded">
                  {item.tanggalMulai}
                </span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded capitalize">
                  {item.status}
                </span>
              </div>

              <h2 className="text-base font-bold text-slate-900 leading-snug">
                {item.judul}
              </h2>

              <p className="text-xs text-slate-600 leading-relaxed">
                {item.deskripsi}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{item.waktuMulai}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{item.lokasi}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="truncate">{item.penyelenggara}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};

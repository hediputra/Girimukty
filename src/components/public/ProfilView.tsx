import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  MapPin, 
  Target, 
  Compass, 
  Layers, 
  Award, 
  Phone, 
  Mail,
  ExternalLink
} from 'lucide-react';
import { VillageInfo, VillageOfficial, VillageInstitution } from '../../types';

interface ProfilViewProps {
  villageInfo: VillageInfo;
  officials: VillageOfficial[];
  institutions: VillageInstitution[];
  initialSubTab?: string;
}

export const ProfilView: React.FC<ProfilViewProps> = ({
  villageInfo,
  officials,
  institutions,
  initialSubTab = 'visi-misi'
}) => {
  const [activeSubTab, setActiveSubTab] = useState(initialSubTab);

  const subTabs = [
    { id: 'visi-misi', label: 'Visi & Misi' },
    { id: 'sejarah', label: 'Sejarah Desa' },
    { id: 'pemerintahan', label: 'Perangkat Desa' },
    { id: 'lembaga', label: 'Lembaga Desa' },
    { id: 'geografis', label: 'Geografis & Demografi' },
    { id: 'peta', label: 'Peta Wilayah' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title & Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6BB8] mb-1">
          Pemerintah Desa Girimukti
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Profil dan Struktur Pemerintahan Desa
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Kecamatan Cimarga, Kabupaten Lebak, Provinsi Banten
        </p>

        {/* Sub Navigation Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pt-6 pb-1">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
                activeSubTab === tab.id
                  ? 'bg-[#0B3D6E] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Subtab 1: Visi & Misi */}
      {activeSubTab === 'visi-misi' && (
        <div className="space-y-8">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#0B3D6E] flex items-center justify-center">
                <Target className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Visi Desa Girimukti</h2>
                <p className="text-xs text-slate-500">Arah pembangunan periode 2022 - 2028</p>
              </div>
            </div>

            <div className="p-5 bg-blue-50/70 border border-blue-100 rounded-xl text-slate-900 font-medium text-base sm:text-lg leading-relaxed text-center sm:text-left italic">
              "{villageInfo.visi}"
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Misi Desa Girimukti</h2>
                <p className="text-xs text-slate-500">Langkah nyata pencapaian visi desa</p>
              </div>
            </div>

            <div className="space-y-4">
              {villageInfo.misi.map((m, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="w-7 h-7 rounded-full bg-[#0B3D6E] text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <p className="text-sm text-slate-700 leading-relaxed font-normal">
                    {m}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Subtab 2: Sejarah */}
      {activeSubTab === 'sejarah' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="max-w-3xl space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Sejarah Singkat Desa Girimukti</h2>
            <p className="text-sm text-slate-700 leading-relaxed">
              {villageInfo.sejarahSingkat}
            </p>
            <p className="text-sm text-slate-700 leading-relaxed">
              Wilayah Desa Girimukti secara turun temurun memiliki kearifan lokal yang kuat dalam menjaga sumber mata air dan kelestarian hutan tanaman aren. Dari masa ke masa, masyarakat Girimukti senantiasa mengedepankan musyawarah mufakat (rembug desa) dalam setiap pengambilan keputusan penting kemasyarakatan.
            </p>
            <div className="pt-4 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-lg">
                <span className="text-xs font-semibold text-slate-500 uppercase">Arti Kata Giri</span>
                <p className="text-sm text-slate-800 font-medium mt-1">
                  Bukit atau dataran tinggi yang asri dan berhawa sejuk.
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <span className="text-xs font-semibold text-slate-500 uppercase">Arti Kata Mukti</span>
                <p className="text-sm text-slate-800 font-medium mt-1">
                  Kemakmuran, keberkahan, dan ketentraman lahir dan batin.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 3: Perangkat Desa */}
      {activeSubTab === 'pemerintahan' && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-900">Struktur Organisasi Pemerintah Desa</h2>
            <p className="text-xs text-slate-500">Susunan Kepala Desa, Sekretaris Desa, Kepala Urusan (Kaur), dan Kepala Seksi (Kasi)</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {officials.map((off) => (
              <div key={off.id} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3 shadow-xs">
                <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 text-[#0B3D6E] flex items-center justify-center font-bold text-lg mx-auto">
                  {off.nama.charAt(0)}
                </div>
                <div className="text-center space-y-1">
                  <h3 className="text-sm font-bold text-slate-900">{off.nama}</h3>
                  <p className="text-xs font-semibold text-[#1E6BB8]">{off.jabatan}</p>
                  <p className="text-[11px] text-slate-500">{off.bidang}</p>
                  {off.nip && off.nip !== '-' && (
                    <p className="text-[10px] text-slate-400 font-mono">NIP: {off.nip}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 4: Lembaga Desa */}
      {activeSubTab === 'lembaga' && (
        <div className="space-y-6">
          <div className="border-b border-slate-200 pb-3">
            <h2 className="text-xl font-bold text-slate-900">Lembaga Kemasyarakatan Desa</h2>
            <p className="text-xs text-slate-500">Mitra kerja pemerintah desa dalam pemberdayaan dan pembangunan masyarakat</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {institutions.map((inst) => (
              <div key={inst.id} className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#1E6BB8] bg-blue-50 px-2.5 py-1 rounded">
                    {inst.singkatan}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">
                    {inst.jumlahAnggota} Anggota
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{inst.nama}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{inst.deskripsi}</p>
                <div className="pt-3 border-t border-slate-100 text-xs text-slate-700">
                  <span className="text-slate-400">Ketua: </span>
                  <span className="font-semibold">{inst.ketua}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Subtab 5: Geografis & Demografi */}
      {activeSubTab === 'geografis' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <h2 className="text-xl font-bold text-slate-900">Informasi Geografis & Batas Wilayah</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Batas Wilayah Desa</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                    <span className="font-semibold text-slate-700">Sebelah Utara</span>
                    <span className="text-slate-600">Desa Intenjaya</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                    <span className="font-semibold text-slate-700">Sebelah Selatan</span>
                    <span className="text-slate-600">Desa Cimarga</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                    <span className="font-semibold text-slate-700">Sebelah Timur</span>
                    <span className="text-slate-600">Kecamatan Leuwidamar</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                    <span className="font-semibold text-slate-700">Sebelah Barat</span>
                    <span className="text-slate-600">Desa Jayamanik</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">Data Kewilayahan</h3>
                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                    <span className="font-semibold text-slate-700">Total Luas Wilayah</span>
                    <span className="text-slate-900 font-mono font-bold">{villageInfo.luasWilayah}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                    <span className="font-semibold text-slate-700">Jumlah Dusun</span>
                    <span className="text-slate-900 font-mono font-bold">{villageInfo.jumlahDusun} Dusun</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                    <span className="font-semibold text-slate-700">Rukun Warga (RW)</span>
                    <span className="text-slate-900 font-mono font-bold">{villageInfo.jumlahRW} RW</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-lg flex justify-between">
                    <span className="font-semibold text-slate-700">Rukun Tetangga (RT)</span>
                    <span className="text-slate-900 font-mono font-bold">{villageInfo.jumlahRT} RT</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <h2 className="text-xl font-bold text-slate-900">Demografi Kependudukan Terverifikasi</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100 text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase">Jumlah Penduduk</span>
                <div className="text-3xl font-extrabold text-[#0B3D6E] font-mono tabular-nums mt-1">
                  {villageInfo.jumlahPenduduk.toLocaleString('id-ID')}
                </div>
                <span className="text-xs text-slate-600 mt-1 block">Jiwa (Laki-laki & Perempuan)</span>
              </div>
              <div className="p-5 bg-emerald-50/50 rounded-xl border border-emerald-100 text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase">Jumlah Kepala Keluarga</span>
                <div className="text-3xl font-extrabold text-emerald-800 font-mono tabular-nums mt-1">
                  {villageInfo.jumlahKK.toLocaleString('id-ID')}
                </div>
                <span className="text-xs text-slate-600 mt-1 block">Kepala Keluarga (KK)</span>
              </div>
              <div className="p-5 bg-amber-50/50 rounded-xl border border-amber-100 text-center">
                <span className="text-xs font-semibold text-slate-500 uppercase">Mata Pencaharian Utama</span>
                <div className="text-lg font-bold text-amber-900 mt-2">
                  Petani Padi & Perajin Aren
                </div>
                <span className="text-xs text-slate-600 mt-1 block">Komoditas Unggulan Cimarga</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subtab 6: Peta Wilayah */}
      {activeSubTab === 'peta' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Peta Digital Lokasi Desa Girimukti</h2>
              <p className="text-xs text-slate-500">Koordinat Kantor Balai Desa: -6.4428, 106.2319</p>
            </div>
            <a
              href="https://maps.google.com/?q=-6.4428,106.2319"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-lg transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
            >
              <span>Buka di Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Interactive Map Embed */}
          <div className="aspect-16/9 w-full rounded-xl overflow-hidden border border-slate-200 shadow-inner bg-slate-100">
            <iframe
              title="Peta Desa Girimukti Cimarga Lebak"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31720.58416629987!2d106.21!3d-6.44!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e423ef8cfeb59b5%3A0x6b9d628794bcff7b!2sCimarga%2C%20Lebak%20Regency%2C%20Banten!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg text-xs text-slate-600 flex items-start gap-2.5">
            <MapPin className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-800">Alamat Kantor Desa: </strong>
              {villageInfo.alamatKantor} (Kode Pos: {villageInfo.kodePos}). Kantor desa dapat diakses via jalur utama Cimarga - Leuwidamar.
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

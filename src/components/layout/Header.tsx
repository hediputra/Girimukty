import React, { useState } from 'react';
import { 
  Building2, 
  Menu, 
  X, 
  FileText, 
  ShieldCheck, 
  Search, 
  Clock, 
  Phone, 
  Lock,
  ChevronDown,
  Volume2,
  Calendar,
  Layers,
  HelpCircle,
  TrendingUp,
  Image as ImageIcon,
  BookOpen
} from 'lucide-react';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string, param?: string) => void;
  onOpenSearch: () => void;
  isAdminLoggedIn: boolean;
  onOpenAdmin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  onOpenSearch,
  isAdminLoggedIn,
  onOpenAdmin
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profilDropdown, setProfilDropdown] = useState(false);
  const [layananDropdown, setLayananDropdown] = useState(false);
  const [transparansiDropdown, setTransparansiDropdown] = useState(false);
  const [informasiDropdown, setInformasiDropdown] = useState(false);

  const handleNav = (tab: string, param?: string) => {
    onNavigate(tab, param);
    setMobileMenuOpen(false);
    setProfilDropdown(false);
    setLayananDropdown(false);
    setTransparansiDropdown(false);
    setInformasiDropdown(false);
  };

  const todayDateStr = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <header className="z-40 bg-white border-b border-slate-200">
      
      {/* 1. Top Utility & Running Announcement Bar (DeNava / OpenSID signature style) */}
      <div className="bg-[#0B3D6E] text-white text-xs border-b border-blue-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex flex-col md:flex-row items-center justify-between gap-2">
          
          {/* Running Announcement Marquee */}
          <div className="flex items-center gap-2 w-full md:w-auto overflow-hidden">
            <span className="bg-[#1E6BB8] text-white px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider shrink-0 flex items-center gap-1">
              <Volume2 className="w-3 h-3" />
              <span>Info Terkini</span>
            </span>
            <div className="overflow-hidden whitespace-nowrap text-xs text-blue-100 flex-1 max-w-2xl">
              <div className="animate-marquee cursor-pointer gap-8">
                <span>Pelayanan Perekaman KTP-el Keliling Disdukcapil di Balai Desa Girimukti · Penyaluran Bantuan Beras CPP Tahap IV di Aula Desa · Layanan Pengajuan Surat Online Mandiri aktif 24 Jam · Pembayaran PBB-P2 Kabupaten Lebak TA 2026 dapat dikonsultasikan melalui portal desa.</span>
                <span>Pelayanan Perekaman KTP-el Keliling Disdukcapil di Balai Desa Girimukti · Penyaluran Bantuan Beras CPP Tahap IV di Aula Desa · Layanan Pengajuan Surat Online Mandiri aktif 24 Jam · Pembayaran PBB-P2 Kabupaten Lebak TA 2026 dapat dikonsultasikan melalui portal desa.</span>
              </div>
            </div>
          </div>

          {/* Date, Office hours & Admin Login */}
          <div className="hidden lg:flex items-center gap-4 text-xs text-slate-200 shrink-0">
            <span className="flex items-center gap-1.5 font-medium">
              <Calendar className="w-3.5 h-3.5 text-blue-300" />
              <span>{todayDateStr}</span>
            </span>
            <span className="text-slate-400">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-300" />
              <span>08.00 - 15.30 WIB</span>
            </span>
            <span className="text-slate-400">·</span>
            <button
              onClick={() => handleNav('validasi')}
              className="text-xs hover:text-white flex items-center gap-1 text-blue-200 transition-colors cursor-pointer"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Validasi QR</span>
            </button>
            <span className="text-slate-400">·</span>
            <button
              onClick={onOpenAdmin}
              className="text-xs hover:text-white flex items-center gap-1 font-semibold text-amber-300 transition-colors cursor-pointer"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminLoggedIn ? 'Panel Admin' : 'Login Staf'}</span>
            </button>
          </div>

        </div>
      </div>

      {/* 2. Main Branding Header Bar (Natai Baru Logo & Identity Layout) */}
      <div className="bg-gradient-to-r from-slate-50 via-white to-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 flex items-center justify-between gap-4">
          
          {/* Logo & Village Identity Lockup */}
          <div 
            onClick={() => handleNav('beranda')}
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            {/* Seal / Emblem Badge */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-[#0B3D6E] to-[#1E6BB8] text-white flex items-center justify-center shadow-md p-2 shrink-0 group-hover:scale-105 transition-transform">
              <Building2 className="w-8 h-8 text-white" />
            </div>

            <div className="space-y-0.5">
              <div className="text-[10px] sm:text-xs font-bold tracking-wider text-slate-500 uppercase">
                Pemerintah Kabupaten Lebak
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-[#0B3D6E] tracking-tight leading-none group-hover:text-[#1E6BB8] transition-colors">
                DESA GIRIMUKTI
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                Kecamatan Cimarga, Kabupaten Lebak, Provinsi Banten (42361)
              </p>
            </div>
          </div>

          {/* Quick Search & Emergency Contact */}
          <div className="hidden md:flex items-center gap-4">
            <div className="text-right text-xs hidden xl:block">
              <span className="text-slate-400 block text-[11px]">Hotline WhatsApp Pelayanan</span>
              <span className="font-bold text-[#0B3D6E] font-mono text-sm">0813-8822-4190</span>
            </div>

            <button
              onClick={onOpenSearch}
              className="flex items-center gap-2 px-3.5 py-2 text-xs bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-lg transition-colors cursor-pointer border border-slate-200"
            >
              <Search className="w-4 h-4 text-slate-500" />
              <span>Cari data & informasi...</span>
              <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-white rounded border border-slate-300 text-slate-400">Ctrl K</kbd>
            </button>

            <button
              onClick={() => handleNav('surat')}
              className="px-4 py-2 text-xs font-bold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-lg shadow-sm transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Layanan Mandiri</span>
            </button>
          </div>

          {/* Mobile Action Controls */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-slate-900 rounded-lg bg-slate-100 cursor-pointer"
              aria-label="Cari"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-white bg-[#0B3D6E] hover:bg-blue-900 rounded-lg cursor-pointer"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* 3. Primary Horizontal Navbar (DeNava royal blue bar) */}
      <nav className="hidden lg:block bg-[#0B3D6E] text-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          <div className="flex items-center gap-1 text-xs font-semibold">
            
            {/* Beranda */}
            <button
              onClick={() => handleNav('beranda')}
              className={`px-4 py-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentTab === 'beranda' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200 hover:bg-blue-900 hover:text-white'
              }`}
            >
              <span>Beranda</span>
            </button>

            {/* Profil Desa Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setProfilDropdown(true)}
              onMouseLeave={() => setProfilDropdown(false)}
            >
              <button
                onClick={() => handleNav('profil')}
                className={`px-4 py-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  currentTab === 'profil' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <span>Profil Desa</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {profilDropdown && (
                <div className="absolute left-0 w-52 bg-white text-slate-800 rounded-b-lg shadow-xl border border-slate-200 py-1.5 z-50">
                  <button
                    onClick={() => handleNav('profil', 'visi-misi')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    Visi & Misi Desa
                  </button>
                  <button
                    onClick={() => handleNav('profil', 'sejarah')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    Sejarah Desa
                  </button>
                  <button
                    onClick={() => handleNav('profil', 'pemerintahan')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    Struktur Perangkat Desa
                  </button>
                  <button
                    onClick={() => handleNav('profil', 'lembaga')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    Lembaga Desa (BPD, LPM, PKK)
                  </button>
                  <button
                    onClick={() => handleNav('profil', 'geografis')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    Geografis & Demografi
                  </button>
                  <button
                    onClick={() => handleNav('profil', 'peta')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    Peta Wilayah Girimukti
                  </button>
                </div>
              )}
            </div>

            {/* Layanan Mandiri Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setLayananDropdown(true)}
              onMouseLeave={() => setLayananDropdown(false)}
            >
              <button
                onClick={() => handleNav('surat')}
                className={`px-4 py-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  ['surat', 'bansos', 'pbb', 'pengaduan', 'validasi'].includes(currentTab)
                    ? 'bg-[#1E6BB8] text-white'
                    : 'text-slate-200 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <span>Layanan Mandiri</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {layananDropdown && (
                <div className="absolute left-0 w-60 bg-white text-slate-800 rounded-b-lg shadow-xl border border-slate-200 py-1.5 z-50">
                  <button
                    onClick={() => handleNav('surat')}
                    className="w-full text-left px-4 py-2.5 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs flex items-center justify-between cursor-pointer"
                  >
                    <span>Layanan Surat Online</span>
                    <span className="text-[10px] bg-blue-100 text-[#0B3D6E] px-1.5 py-0.5 rounded font-bold">Utama</span>
                  </button>
                  <button
                    onClick={() => handleNav('surat', 'lacak')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    Lacak Status Berkas Surat
                  </button>
                  <button
                    onClick={() => handleNav('bansos')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    Pengecekan Bantuan Sosial (Bansos)
                  </button>
                  <button
                    onClick={() => handleNav('pbb')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    Konsultasi Pajak PBB-P2
                  </button>
                  <button
                    onClick={() => handleNav('pengaduan')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    Layanan Pengaduan Warga
                  </button>
                  <div className="border-t border-slate-100 my-1"></div>
                  <button
                    onClick={() => handleNav('validasi')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer flex items-center gap-1.5"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Verifikasi Surat (Scan QR)</span>
                  </button>
                </div>
              )}
            </div>

            {/* Transparansi APBDes & PPID */}
            <div 
              className="relative"
              onMouseEnter={() => setTransparansiDropdown(true)}
              onMouseLeave={() => setTransparansiDropdown(false)}
            >
              <button
                onClick={() => handleNav('transparansi')}
                className={`px-4 py-3 transition-colors cursor-pointer flex items-center gap-1.5 ${
                  ['transparansi', 'ppid'].includes(currentTab)
                    ? 'bg-[#1E6BB8] text-white'
                    : 'text-slate-200 hover:bg-blue-900 hover:text-white'
                }`}
              >
                <span>Transparansi</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {transparansiDropdown && (
                <div className="absolute left-0 w-56 bg-white text-slate-800 rounded-b-lg shadow-xl border border-slate-200 py-1.5 z-50">
                  <button
                    onClick={() => handleNav('transparansi')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    APBDes & Realisasi Anggaran
                  </button>
                  <button
                    onClick={() => handleNav('ppid')}
                    className="w-full text-left px-4 py-2 hover:bg-blue-50 hover:text-[#0B3D6E] text-xs cursor-pointer"
                  >
                    PPID & Keterbukaan Informasi
                  </button>
                </div>
              )}
            </div>

            {/* Berita & Publikasi */}
            <button
              onClick={() => handleNav('berita')}
              className={`px-4 py-3 transition-colors cursor-pointer ${
                currentTab === 'berita' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200 hover:bg-blue-900 hover:text-white'
              }`}
            >
              Berita Desa
            </button>

            {/* Pengumuman */}
            <button
              onClick={() => handleNav('pengumuman')}
              className={`px-4 py-3 transition-colors cursor-pointer ${
                currentTab === 'pengumuman' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200 hover:bg-blue-900 hover:text-white'
              }`}
            >
              Pengumuman
            </button>

            {/* Agenda */}
            <button
              onClick={() => handleNav('agenda')}
              className={`px-4 py-3 transition-colors cursor-pointer ${
                currentTab === 'agenda' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200 hover:bg-blue-900 hover:text-white'
              }`}
            >
              Agenda Kegiatan
            </button>

            {/* Galeri */}
            <button
              onClick={() => handleNav('galeri')}
              className={`px-4 py-3 transition-colors cursor-pointer ${
                currentTab === 'galeri' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200 hover:bg-blue-900 hover:text-white'
              }`}
            >
              Galeri
            </button>

          </div>

          {/* Quick link to admin */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="text-xs bg-white/10 hover:bg-white/20 text-blue-100 hover:text-white px-3 py-1.5 rounded transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-amber-300" />
              <span>Sistem Desa (Admin)</span>
            </button>
          </div>

        </div>
      </nav>

      {/* 4. Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 text-white px-4 pt-3 pb-6 space-y-1 shadow-2xl">
          <button
            onClick={() => handleNav('beranda')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'beranda' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Beranda
          </button>
          <button
            onClick={() => handleNav('profil')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'profil' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Profil Desa
          </button>
          <button
            onClick={() => handleNav('surat')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'surat' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Layanan Surat Online Mandiri
          </button>
          <button
            onClick={() => handleNav('transparansi')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'transparansi' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Transparansi APBDes 2026
          </button>
          <button
            onClick={() => handleNav('bansos')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'bansos' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Cek Bantuan Sosial
          </button>
          <button
            onClick={() => handleNav('pbb')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'pbb' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Konsultasi PBB-P2
          </button>
          <button
            onClick={() => handleNav('pengaduan')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'pengaduan' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Layanan Pengaduan Warga
          </button>
          <button
            onClick={() => handleNav('ppid')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'ppid' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Portal PPID Desa
          </button>
          <button
            onClick={() => handleNav('berita')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'berita' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Berita & Warta Desa
          </button>
          <button
            onClick={() => handleNav('pengumuman')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'pengumuman' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Pengumuman
          </button>
          <button
            onClick={() => handleNav('agenda')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'agenda' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Agenda Kegiatan
          </button>
          <button
            onClick={() => handleNav('galeri')}
            className={`w-full text-left px-3 py-2.5 rounded-md text-xs font-semibold ${
              currentTab === 'galeri' ? 'bg-[#1E6BB8] text-white' : 'text-slate-200'
            }`}
          >
            Galeri Dokumentasi
          </button>

          <div className="pt-3 border-t border-slate-700 space-y-2">
            <button
              onClick={() => handleNav('validasi')}
              className="w-full py-2.5 px-3 text-xs font-semibold bg-emerald-700 text-white rounded-lg flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Verifikasi Keabsahan Surat (QR)</span>
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 px-3 text-xs font-semibold bg-amber-500 hover:bg-amber-600 text-slate-900 rounded-lg flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Panel Internal Aparatur Desa</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};

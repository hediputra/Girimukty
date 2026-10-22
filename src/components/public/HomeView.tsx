import React, { useState, useEffect } from 'react';
import { 
  FileText, 
  ShieldCheck, 
  Search, 
  ArrowRight, 
  TrendingUp, 
  Users, 
  MapPin, 
  Calendar, 
  Bell, 
  Eye, 
  HelpCircle, 
  AlertCircle,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  PhoneCall,
  Activity,
  Globe,
  Award,
  ExternalLink,
  Building2,
  Clock
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

import { 
  VillageInfo, 
  NewsItem, 
  AnnouncementItem, 
  AgendaItem, 
  APBDesSummary, 
  BudgetEntry 
} from '../../types';

interface HomeViewProps {
  villageInfo: VillageInfo;
  news: NewsItem[];
  announcements: AnnouncementItem[];
  agendas: AgendaItem[];
  apbdesSummary: APBDesSummary;
  budgetEntries: BudgetEntry[];
  onNavigate: (tab: string, param?: string) => void;
  onOpenSearch: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  villageInfo,
  news,
  announcements,
  agendas,
  apbdesSummary,
  budgetEntries,
  onNavigate,
  onOpenSearch
}) => {
  // Slider State (DeNava Featured Headline Carousel)
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('Semua');
  const [quickTrackInput, setQuickTrackInput] = useState('');

  const slides = [
    {
      id: 'slide-1',
      title: 'Musrenbangdes Girimukti: Penetapan RKPDes 2026 Prioritaskan Jalan Usaha Tani',
      category: 'Pembangunan',
      date: '18 Oktober 2026',
      image: '/src/assets/images/hero_desa_girimukti_1792455333620.jpg',
      slug: 'musrenbangdes-girimukti-penetapan-rkpdes-2026',
      summary: 'Musyawarah perencanaan desa menetapkan fokus peningkatan jalan tani 1,8 km dan penguatan ketahanan pangan perdesaan.'
    },
    {
      id: 'slide-2',
      title: 'Panen Raya Padi Organik dan Pelatihan Modernisasi Kemasan Produk Gula Aren Cimarga',
      category: 'Pertanian',
      date: '12 Oktober 2026',
      image: '/src/assets/images/potensi_desa_pertanian_1792455334010.jpg',
      slug: 'panen-raya-padi-organik-dan-pelatihan-kemasan-gula-aren-lebak',
      summary: 'Kelompok Tani Mukti Mandiri sukses menggelar panen raya musim tanam kedua di hamparan sawah 45 hektare.'
    },
    {
      id: 'slide-3',
      title: 'Pencanangan Layanan Pengajuan Surat Online Mandiri bagi Seluruh Warga Desa',
      category: 'Pemerintahan',
      date: '05 Oktober 2026',
      image: '/src/assets/images/kantor_desa_girimukti_1792455334615.jpg',
      slug: 'pencanangan-layanan-surat-digital-mandiri-desa-girimukti',
      summary: 'Masyarakat kini dapat membuat Surat Keterangan Usaha, Domisili, dan SKTM langsung dari ponsel dengan verifikasi QR resmi.'
    }
  ];

  // Auto-advance slides every 6s
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Bar Chart Data
  const comparisonData = [
    {
      kategori: 'Pendapatan',
      Anggaran: Math.round(apbdesSummary.pendapatan.anggaran / 1000000),
      Realisasi: Math.round(apbdesSummary.pendapatan.realisasi / 1000000)
    },
    {
      kategori: 'Belanja',
      Anggaran: Math.round(apbdesSummary.belanja.anggaran / 1000000),
      Realisasi: Math.round(apbdesSummary.belanja.realisasi / 1000000)
    }
  ];

  // Pie Chart Data (5 Bidang Belanja Permendagri)
  const belanjaEntries = budgetEntries.filter(e => e.kategori === 'Belanja');
  const pieColors = ['#0B3D6E', '#1E6BB8', '#0D9488', '#D97706', '#E11D48'];
  const pieData = belanjaEntries.map((b) => ({
    name: b.bidang.replace('Bidang ', ''),
    value: Math.round(b.realisasi / 1000000),
    nominal: b.realisasi,
    persen: b.persentase
  }));

  const filteredNews = news.filter((item) => {
    if (selectedCategory === 'Semua') return true;
    return item.kategori === selectedCategory;
  });

  const handleQuickTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickTrackInput.trim()) {
      onNavigate('surat', 'lacak');
    }
  };

  return (
    <div className="bg-[#F8FAFC] pb-16 space-y-8">
      
      {/* 1. Hero Featured Slider (DeNava / OpenSID Style Banner) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="relative rounded-2xl overflow-hidden shadow-xl bg-slate-900 aspect-21/9 min-h-[380px] sm:min-h-[460px] flex items-end">
          
          {/* Slide Images */}
          {slides.map((s, idx) => (
            <div
              key={s.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img
                src={s.image}
                alt={s.title}
                className="w-full h-full object-cover filter brightness-[0.80]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />
            </div>
          ))}

          {/* Slider Caption Overlay */}
          <div className="relative z-20 p-6 sm:p-10 max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-[#1E6BB8] text-white px-2.5 py-1 rounded text-xs font-bold uppercase tracking-wider">
              <span>{slides[currentSlide].category}</span>
              <span>·</span>
              <span className="font-normal">{slides[currentSlide].date}</span>
            </div>

            <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight drop-shadow-sm">
              {slides[currentSlide].title}
            </h2>

            <p className="text-xs sm:text-sm text-slate-200 line-clamp-2 leading-relaxed">
              {slides[currentSlide].summary}
            </p>

            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={() => onNavigate('berita', slides[currentSlide].slug)}
                className="px-4 py-2 text-xs font-bold text-white bg-[#0B3D6E] hover:bg-[#1E6BB8] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <span>Baca Berita Selengkapnya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Slider Navigation Arrows & Dots */}
          <div className="absolute top-4 right-4 z-20 flex items-center gap-2">
            <button
              onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
              className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
              className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-xs transition-colors cursor-pointer"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="absolute bottom-4 right-6 z-20 hidden sm:flex items-center gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentSlide(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentSlide ? 'w-6 bg-[#1E6BB8]' : 'w-2 bg-white/50 hover:bg-white'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 2. DeNava Quick Service Strip (Layanan Mandiri Grid) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 sm:p-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#1E6BB8]"></span>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Layanan Mandiri Warga Desa Girimukti
              </h3>
            </div>
            <span className="text-xs text-slate-400 hidden sm:inline">Pelayanan Cepat & Akuntabel</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            
            {/* 1: Surat Online */}
            <button
              onClick={() => onNavigate('surat')}
              className="p-4 rounded-xl border border-blue-100 bg-blue-50/40 hover:bg-blue-100/60 transition-all text-center group cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-[#0B3D6E] text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-[#0B3D6E] block">Surat Online</span>
                <span className="text-[10px] text-slate-500">SKU, SKD, SKTM</span>
              </div>
            </button>

            {/* 2: Cek Bansos */}
            <button
              onClick={() => onNavigate('bansos')}
              className="p-4 rounded-xl border border-emerald-100 bg-emerald-50/40 hover:bg-emerald-100/60 transition-all text-center group cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-700 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 block">Cek Bansos</span>
                <span className="text-[10px] text-slate-500">Data DTKS & BLT</span>
              </div>
            </button>

            {/* 3: Cek PBB */}
            <button
              onClick={() => onNavigate('pbb')}
              className="p-4 rounded-xl border border-amber-100 bg-amber-50/40 hover:bg-amber-100/60 transition-all text-center group cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                <FileSpreadsheet className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-amber-700 block">Pajak PBB-P2</span>
                <span className="text-[10px] text-slate-500">Info Bapenda Lebak</span>
              </div>
            </button>

            {/* 4: APBDes */}
            <button
              onClick={() => onNavigate('transparansi')}
              className="p-4 rounded-xl border border-indigo-100 bg-indigo-50/40 hover:bg-indigo-100/60 transition-all text-center group cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-indigo-700 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                <TrendingUp className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-indigo-700 block">APBDes 2026</span>
                <span className="text-[10px] text-slate-500">Realisasi Anggaran</span>
              </div>
            </button>

            {/* 5: Pengaduan */}
            <button
              onClick={() => onNavigate('pengaduan')}
              className="p-4 rounded-xl border border-rose-100 bg-rose-50/40 hover:bg-rose-100/60 transition-all text-center group cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-rose-600 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                <HelpCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-rose-700 block">Pengaduan</span>
                <span className="text-[10px] text-slate-500">Aspirasi Warga</span>
              </div>
            </button>

            {/* 6: Validasi Dokumen */}
            <button
              onClick={() => onNavigate('validasi')}
              className="p-4 rounded-xl border border-purple-100 bg-purple-50/40 hover:bg-purple-100/60 transition-all text-center group cursor-pointer flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded-xl bg-purple-700 text-white flex items-center justify-center mb-2 shadow-xs group-hover:scale-105 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-purple-700 block">Validasi QR</span>
                <span className="text-[10px] text-slate-500">Cek Keaslian Surat</span>
              </div>
            </button>

          </div>
        </div>
      </section>

      {/* 3. The Classic 2-Column Village Portal Structure (8 Kolom Konten + 4 Kolom Sidebar Widgets) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 8 COLUMNS: KONTEN UTAMA */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* SECTION A: WARTA & BERITA DESA */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0B3D6E]"></span>
                    <span>Warta & Berita Desa Girimukti</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">Kabar pembangunan, pemerintahan, dan kegiatan kemasyarakatan</p>
                </div>

                {/* Category Tabs */}
                <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs font-medium">
                  {['Semua', 'Pemerintahan', 'Pembangunan', 'Pertanian'].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-md transition-colors cursor-pointer whitespace-nowrap ${
                        selectedCategory === cat
                          ? 'bg-[#0B3D6E] text-white font-semibold'
                          : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* News Items Grid */}
              <div className="space-y-4">
                {filteredNews.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => onNavigate('berita', item.slug)}
                    className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-slate-50/60 transition-all cursor-pointer group"
                  >
                    <div className="sm:w-48 aspect-16/10 rounded-lg overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={item.gambarUrl}
                        alt={item.judul}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <div className="flex-1 flex flex-col justify-between space-y-2">
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span className="text-[#1E6BB8] font-bold">{item.kategori}</span>
                          <span>·</span>
                          <span>{item.tanggalPublikasi}</span>
                          <span>·</span>
                          <span className="flex items-center gap-1 font-mono text-[11px]">
                            <Eye className="w-3.5 h-3.5" />
                            <span>{item.views}</span>
                          </span>
                        </div>

                        <h4 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#1E6BB8] transition-colors line-clamp-2 leading-snug">
                          {item.judul}
                        </h4>

                        <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                          {item.ringkasan}
                        </p>
                      </div>

                      <div className="text-[11px] text-slate-400 flex items-center justify-between pt-1">
                        <span>Oleh: {item.penulis}</span>
                        <span className="text-[#1E6BB8] font-semibold group-hover:underline">Baca Selengkapnya →</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              <div className="pt-2 text-center border-t border-slate-100">
                <button
                  onClick={() => onNavigate('berita')}
                  className="px-5 py-2 text-xs font-semibold text-[#0B3D6E] hover:text-[#1E6BB8] bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>Lihat Seluruh Arsip Berita Desa</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* SECTION B: INFOGRAFIS TRANSPARANSI APBDES (Recharts) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-7 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 tracking-tight flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                    <span>Infografis APBDes Girimukti TA {apbdesSummary.tahun}</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Transparansi pengelolaan keuangan desa berbasis Permendagri No. 20/2018
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('transparansi')}
                  className="px-3.5 py-1.5 text-xs font-semibold text-[#1E6BB8] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer inline-flex items-center gap-1 self-start sm:self-auto"
                >
                  <span>Rincian Lengkap</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 3 Summary Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Total Pendapatan</span>
                  <div className="text-lg sm:text-xl font-bold text-[#0B3D6E] font-mono tabular-nums">
                    {formatRupiah(apbdesSummary.pendapatan.anggaran)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Realisasi: <strong className="text-emerald-700">{formatRupiah(apbdesSummary.pendapatan.realisasi)}</strong> ({apbdesSummary.pendapatan.persen}%)
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Total Belanja</span>
                  <div className="text-lg sm:text-xl font-bold text-[#0B3D6E] font-mono tabular-nums">
                    {formatRupiah(apbdesSummary.belanja.anggaran)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Terserap: <strong className="text-blue-700">{formatRupiah(apbdesSummary.belanja.realisasi)}</strong> ({apbdesSummary.belanja.persen}%)
                  </div>
                </div>

                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                  <span className="text-[11px] font-bold text-slate-500 uppercase">Pembiayaan Netto</span>
                  <div className="text-lg sm:text-xl font-bold text-[#0B3D6E] font-mono tabular-nums">
                    {formatRupiah(apbdesSummary.pembiayaan.netto)}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    SiLPA Tahun Lalu: {formatRupiah(apbdesSummary.pembiayaan.penerimaan)}
                  </div>
                </div>
              </div>

              {/* Visual Split Recharts */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
                
                {/* Bar Comparison (7 cols) */}
                <div className="md:col-span-7 space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase">
                    Anggaran vs Realisasi (Juta Rupiah)
                  </h4>
                  <div className="h-56 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={comparisonData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                        <XAxis dataKey="kategori" tick={{ fill: '#475569', fontSize: 11 }} />
                        <YAxis tick={{ fill: '#475569', fontSize: 10 }} />
                        <Tooltip formatter={(value: any) => [`Rp ${value} Juta`, '']} />
                        <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '6px' }} />
                        <Bar dataKey="Anggaran" fill="#1E6BB8" radius={[4, 4, 0, 0]} name="Pagu" />
                        <Bar dataKey="Realisasi" fill="#0B3D6E" radius={[4, 4, 0, 0]} name="Realisasi" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Pie Chart Belanja Realisasi (5 cols) */}
                <div className="md:col-span-5 space-y-2">
                  <h4 className="text-xs font-bold text-slate-700 uppercase">
                    Porsi Realisasi 5 Bidang Belanja
                  </h4>
                  <div className="h-56 w-full flex items-center justify-center">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          outerRadius={68}
                          innerRadius={36}
                          dataKey="value"
                          label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                        >
                          {pieData.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value: any, name: any) => [`Rp ${value} Juta`, name]} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

              </div>
            </div>

            {/* SECTION C: POTENSI DESA GIRIMUKTI */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8 space-y-4">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-blue-300 uppercase tracking-wider">
                    Potensi & Produk Unggulan
                  </span>
                  <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                    Gula Aren Khas Cimarga & Pertanian Padi Girimukti
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed max-w-xl">
                    Kekayaan pohon aren alami dan persawahan terasering subur menjadi penopang ekonomi utama masyarakat Desa Girimukti, didukung hilirisasi produk kemasan melalui BUMDes Mukti Mandiri.
                  </p>
                </div>
                <button
                  onClick={() => onNavigate('profil', 'potensi')}
                  className="px-4 py-2 text-xs font-bold text-[#0B3D6E] bg-white hover:bg-slate-100 rounded-lg transition-colors cursor-pointer whitespace-nowrap self-start sm:self-auto"
                >
                  Lihat Potensi Desa
                </button>
              </div>
            </div>

          </div>

          {/* RIGHT 4 COLUMNS: THE DENAVA SIDEBAR WIDGETS */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* WIDGET 1: PROFIL KEPALA DESA (DeNava Featured Head of Village) */}
            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs">
              <div className="bg-[#0B3D6E] text-white px-4 py-3 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider">Kepala Desa Girimukti</span>
                <Award className="w-4 h-4 text-amber-300" />
              </div>

              <div className="p-5 text-center space-y-3">
                <div className="w-24 h-24 rounded-full overflow-hidden mx-auto border-4 border-blue-50 shadow-md bg-slate-100">
                  <img
                    src="/src/assets/images/kantor_desa_girimukti_1792455334615.jpg"
                    alt={villageInfo.namaKepalaDesa}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900">{villageInfo.namaKepalaDesa}</h4>
                  <p className="text-xs text-[#1E6BB8] font-semibold">Kepala Desa Periode 2022 - 2028</p>
                </div>

                <p className="text-xs text-slate-600 italic line-clamp-3 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                  "{villageInfo.sambutanKades}"
                </p>

                <button
                  onClick={() => onNavigate('profil', 'visi-misi')}
                  className="w-full py-2 text-xs font-semibold text-[#0B3D6E] bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors cursor-pointer"
                >
                  Lihat Sambutan & Profil Lengkap
                </button>
              </div>
            </div>

            {/* WIDGET 2: LACAK SURAT CEPAT MANDIRI */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <FileText className="w-4 h-4 text-[#1E6BB8]" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Layanan Mandiri Warga
                </h4>
              </div>

              <p className="text-xs text-slate-500">
                Lacak proses permohonan surat kependudukan menggunakan nomor registrasi berkas:
              </p>

              <form onSubmit={handleQuickTrack} className="space-y-2">
                <input
                  type="text"
                  value={quickTrackInput}
                  onChange={(e) => setQuickTrackInput(e.target.value)}
                  placeholder="Contoh: REG-2026-SKU-..."
                  className="w-full px-3 py-2 text-xs font-mono uppercase border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                />
                <button
                  type="submit"
                  className="w-full py-2 text-xs font-semibold text-white bg-[#0B3D6E] hover:bg-blue-900 rounded-lg transition-colors cursor-pointer"
                >
                  Lacak Berkas Surat
                </button>
              </form>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                <button
                  onClick={() => onNavigate('surat')}
                  className="text-[#1E6BB8] font-semibold hover:underline cursor-pointer"
                >
                  + Buat Permohonan Baru
                </button>
                <button
                  onClick={() => onNavigate('validasi')}
                  className="text-slate-500 hover:text-slate-800 flex items-center gap-1 cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Scan QR</span>
                </button>
              </div>
            </div>

            {/* WIDGET 3: PENGUMUMAN DESA TERBARU */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Bell className="w-4 h-4 text-amber-600" />
                  <span>Pengumuman Terbaru</span>
                </h4>
                <button
                  onClick={() => onNavigate('pengumuman')}
                  className="text-[11px] text-[#1E6BB8] hover:underline cursor-pointer"
                >
                  Semua
                </button>
              </div>

              <div className="space-y-2.5">
                {announcements.slice(0, 3).map((ann) => (
                  <div
                    key={ann.id}
                    onClick={() => onNavigate('pengumuman')}
                    className="p-2.5 rounded-lg border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-colors cursor-pointer space-y-1"
                  >
                    <div className="flex items-center justify-between text-[10px]">
                      <span className="font-bold text-rose-700 bg-rose-50 px-1.5 py-0.5 rounded">
                        PENTING
                      </span>
                      <span className="text-slate-400">{ann.tanggalTerbit}</span>
                    </div>
                    <h5 className="text-xs font-bold text-slate-800 leading-snug line-clamp-2">
                      {ann.judul}
                    </h5>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 4: AGENDA KEGIATAN DESA */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#1E6BB8]" />
                  <span>Agenda Kegiatan</span>
                </h4>
                <button
                  onClick={() => onNavigate('agenda')}
                  className="text-[11px] text-[#1E6BB8] hover:underline cursor-pointer"
                >
                  Semua
                </button>
              </div>

              <div className="space-y-2.5">
                {agendas.slice(0, 3).map((agd) => (
                  <div
                    key={agd.id}
                    onClick={() => onNavigate('agenda')}
                    className="flex gap-3 p-2.5 rounded-lg border border-slate-100 hover:border-blue-200 transition-colors cursor-pointer items-center"
                  >
                    <div className="w-12 h-12 rounded-lg bg-blue-50 text-[#0B3D6E] flex flex-col items-center justify-center shrink-0 border border-blue-100">
                      <span className="text-[10px] uppercase font-bold text-blue-500">Okt</span>
                      <span className="text-base font-black leading-none">{agd.tanggalMulai.split(' ')[0]}</span>
                    </div>
                    <div className="space-y-0.5 flex-1 min-w-0">
                      <h5 className="text-xs font-bold text-slate-800 truncate">{agd.judul}</h5>
                      <div className="text-[11px] text-slate-500 truncate flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span>{agd.lokasi}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* WIDGET 5: STATISTIK KEPENDUDUKAN */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-[#1E6BB8]" />
                  <span>Statistik Penduduk</span>
                </h4>
                <span className="text-[11px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                  Terverifikasi
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                  <span className="text-slate-600">Total Penduduk:</span>
                  <span className="font-mono font-bold text-[#0B3D6E]">{villageInfo.jumlahPenduduk.toLocaleString('id-ID')} Jiwa</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                  <span className="text-slate-600">Jumlah Kepala Keluarga:</span>
                  <span className="font-mono font-bold text-slate-800">{villageInfo.jumlahKK.toLocaleString('id-ID')} KK</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                  <span className="text-slate-600">Wilayah Dusun:</span>
                  <span className="font-mono font-bold text-slate-800">{villageInfo.jumlahDusun} Dusun</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-slate-50 rounded">
                  <span className="text-slate-600">Rukun Warga / RT:</span>
                  <span className="font-mono font-bold text-slate-800">{villageInfo.jumlahRW} RW / {villageInfo.jumlahRT} RT</span>
                </div>
              </div>
            </div>

            {/* WIDGET 6: PETA LOKASI BALAI DESA */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-rose-600" />
                  <span>Lokasi Kantor Desa</span>
                </h4>
                <a
                  href="https://maps.google.com/?q=-6.4428,106.2319"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-[#1E6BB8] hover:underline flex items-center gap-1"
                >
                  <span>Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              <div className="aspect-16/9 rounded-lg overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  title="Peta Balai Desa Girimukti"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31720.58416629987!2d106.21!3d-6.44!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e423ef8cfeb59b5%3A0x6b9d628794bcff7b!2sCimarga%2C%20Lebak%20Regency%2C%20Banten!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Jl. Raya Cimarga - Leuwidamar Km. 4, Girimukti, Kec. Cimarga, Kab. Lebak (42361).
              </p>
            </div>

            {/* WIDGET 7: STATISTIK PENGUNJUNG WEBSITE (DeNava Visitor Counter) */}
            <div className="bg-white rounded-2xl border border-slate-200 p-5 space-y-3 shadow-xs">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                <Activity className="w-4 h-4 text-[#0B3D6E]" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wide">
                  Statistik Pengunjung
                </h4>
              </div>

              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Pengunjung Hari Ini:</span>
                  <span className="font-mono font-bold text-[#0B3D6E]">142</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Pengunjung Kemarin:</span>
                  <span className="font-mono font-bold text-slate-700">388</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span>Total Pengunjung:</span>
                  <span className="font-mono font-bold text-emerald-700">12.845</span>
                </div>
                <div className="flex justify-between py-1">
                  <span>Sistem Online:</span>
                  <span className="text-[11px] font-semibold text-emerald-600 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Aktif 24 Jam</span>
                  </span>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  TrendingUp, 
  Download, 
  FileSpreadsheet, 
  FileText, 
  CheckCircle2, 
  Calendar,
  Layers
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
import { APBDesSummary, BudgetEntry } from '../../types';
import { StorageService } from '../../services/storage';

interface TransparansiViewProps {
  onNavigatePpid: () => void;
}

export const TransparansiView: React.FC<TransparansiViewProps> = ({ onNavigatePpid }) => {
  const [selectedYear, setSelectedYear] = useState<number>(2026);
  const summary = StorageService.getBudgetSummary(selectedYear);
  const entries = StorageService.getBudgetEntries(selectedYear);

  const formatRupiah = (num: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(num);
  };

  // Bar chart data
  const comparisonData = [
    {
      kategori: 'Pendapatan',
      Anggaran: Math.round(summary.pendapatan.anggaran / 1000000),
      Realisasi: Math.round(summary.pendapatan.realisasi / 1000000)
    },
    {
      kategori: 'Belanja',
      Anggaran: Math.round(summary.belanja.anggaran / 1000000),
      Realisasi: Math.round(summary.belanja.realisasi / 1000000)
    }
  ];

  // Expenditure distribution data (Bidang Belanja)
  const [pieMode, setPieMode] = useState<'realisasi' | 'anggaran'>('realisasi');
  const belanjaEntries = entries.filter(e => e.kategori === 'Belanja');
  const pieColors = ['#0B3D6E', '#1E6BB8', '#0D9488', '#D97706', '#E11D48'];

  const totalRealisasiBelanja = belanjaEntries.reduce((acc, curr) => acc + curr.realisasi, 0);
  const totalAnggaranBelanja = belanjaEntries.reduce((acc, curr) => acc + curr.anggaran, 0);

  const pieData = belanjaEntries.map((b) => {
    const isRealisasi = pieMode === 'realisasi';
    const activeValue = isRealisasi ? b.realisasi : b.anggaran;
    const totalRef = isRealisasi ? totalRealisasiBelanja : totalAnggaranBelanja;
    const sharePercent = totalRef > 0 ? (activeValue / totalRef) * 100 : 0;

    return {
      name: b.bidang.replace('Bidang ', ''),
      fullName: b.bidang,
      value: Math.round(activeValue / 1000000),
      nominalAktif: activeValue,
      nominalAnggaran: b.anggaran,
      nominalRealisasi: b.realisasi,
      persenCapaian: b.persentase,
      sharePercent: Number(sharePercent.toFixed(1))
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header & Year Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6BB8] mb-1">
            Transparansi Keuangan Desa
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Informasi APBDes & Realisasi Anggaran
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Berdasarkan Permendagri No. 20 Tahun 2018 tentang Pengelolaan Keuangan Desa
          </p>
        </div>

        {/* Year Filter Buttons */}
        <div className="flex items-center gap-2 bg-slate-100 p-1 rounded-lg self-start sm:self-auto">
          {[2026, 2025].map((yr) => (
            <button
              key={yr}
              onClick={() => setSelectedYear(yr)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                selectedYear === yr
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tahun Anggaran {yr}
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Pendapatan */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pendapatan Desa
            </span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              {summary.pendapatan.persen}% Realisasi
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {formatRupiah(summary.pendapatan.anggaran)}
          </div>
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 flex justify-between">
            <span>Realisasi Diterima:</span>
            <span className="font-mono font-bold text-slate-800">{formatRupiah(summary.pendapatan.realisasi)}</span>
          </div>
        </div>

        {/* Belanja */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Belanja Desa
            </span>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              {summary.belanja.persen}% Terealisasi
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {formatRupiah(summary.belanja.anggaran)}
          </div>
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 flex justify-between">
            <span>Realisasi Terserap:</span>
            <span className="font-mono font-bold text-slate-800">{formatRupiah(summary.belanja.realisasi)}</span>
          </div>
        </div>

        {/* Pembiayaan */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Pembiayaan Netto
            </span>
            <span className="text-xs font-medium text-slate-400">
              SiLPA Tahun Lalu
            </span>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono tabular-nums">
            {formatRupiah(summary.pembiayaan.netto)}
          </div>
          <div className="pt-2 border-t border-slate-100 text-xs text-slate-600 flex justify-between">
            <span>Penerimaan Pembiayaan:</span>
            <span className="font-mono font-bold text-slate-800">{formatRupiah(summary.pembiayaan.penerimaan)}</span>
          </div>
        </div>

      </div>

      {/* Visual Analytics Split (Recharts) */}
      <div className="space-y-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Bar Chart Comparison */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="border-b border-slate-100 pb-3">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Perbandingan Anggaran vs Realisasi (Juta Rupiah)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Evaluasi penyerapan pendapatan & belanja desa tahun anggaran {selectedYear}
              </p>
            </div>
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData} margin={{ top: 20, right: 20, left: 0, bottom: 5 }}>
                  <XAxis dataKey="kategori" tick={{ fill: '#475569', fontSize: 12 }} />
                  <YAxis tick={{ fill: '#475569', fontSize: 11 }} />
                  <Tooltip 
                    formatter={(value: any) => [`Rp ${value} Juta`, '']}
                    contentStyle={{ borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '12px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                  <Bar dataKey="Anggaran" fill="#1E6BB8" radius={[4, 4, 0, 0]} name="Pagu Anggaran" />
                  <Bar dataKey="Realisasi" fill="#0B3D6E" radius={[4, 4, 0, 0]} name="Realisasi Anggaran" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Pie Chart Belanja Realization Comparison per Field */}
          <div className="lg:col-span-6 bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                  Grafik Pie Perbandingan {pieMode === 'realisasi' ? 'Realisasi' : 'Pagu'} per Bidang
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Distribusi penyerapan dana pada 5 bidang resmi belanja desa
                </p>
              </div>

              {/* Mode Toggle */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg self-start sm:self-auto shrink-0">
                <button
                  type="button"
                  onClick={() => setPieMode('realisasi')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    pieMode === 'realisasi'
                      ? 'bg-white text-[#0B3D6E] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Realisasi
                </button>
                <button
                  type="button"
                  onClick={() => setPieMode('anggaran')}
                  className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                    pieMode === 'anggaran'
                      ? 'bg-white text-[#0B3D6E] shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Pagu Anggaran
                </button>
              </div>
            </div>

            <div className="h-72 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={85}
                    innerRadius={45}
                    dataKey="value"
                    label={({ percent }) => `${((percent ?? 0) * 100).toFixed(0)}%`}
                  >
                    {pieData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data: any = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-lg shadow-lg text-xs space-y-1.5 border border-slate-700 max-w-xs z-50">
                            <p className="font-bold text-blue-200">{data.fullName}</p>
                            <div className="space-y-1 pt-1 border-t border-slate-700 text-[11px]">
                              <div className="flex justify-between gap-4">
                                <span className="text-slate-300">Realisasi Terserap:</span>
                                <span className="font-mono font-semibold text-emerald-400">{formatRupiah(data.nominalRealisasi)}</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-slate-300">Pagu Anggaran:</span>
                                <span className="font-mono text-slate-200">{formatRupiah(data.nominalAnggaran)}</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-slate-300">Tingkat Capaian:</span>
                                <span className="font-mono font-bold text-amber-300">{data.persenCapaian}%</span>
                              </div>
                              <div className="flex justify-between gap-4">
                                <span className="text-slate-300">Porsi terhadap Belanja:</span>
                                <span className="font-mono text-blue-300">{data.sharePercent}%</span>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="space-y-1.5 text-xs pt-1 border-t border-slate-100">
              {pieData.map((d, i) => (
                <div key={i} className="flex items-center justify-between text-slate-600">
                  <span className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: pieColors[i % pieColors.length] }}></span>
                    <span className="truncate max-w-[220px]" title={d.fullName}>{d.name}</span>
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-slate-900">{formatRupiah(d.nominalAktif)}</span>
                    <span className="text-[11px] font-mono text-slate-400">({d.sharePercent}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Comparative Realization Progress Cards per Field */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                Perbandingan Realisasi terhadap Pagu per Bidang (Tingkat Kinerja)
              </h3>
              <p className="text-xs text-slate-500">
                Persentase capaian penyerapan anggaran pada masing-masing bidang kegiatan APBDes
              </p>
            </div>
            <div className="text-xs text-slate-600">
              Rata-rata Penyerapan Belanja: <span className="font-mono font-bold text-[#0B3D6E]">{summary.belanja.persen}%</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {pieData.map((d, i) => (
              <div key={i} className="p-3.5 bg-slate-50 rounded-lg border border-slate-200/80 space-y-2.5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: pieColors[i % pieColors.length] }}></span>
                    <span className="text-[11px] font-bold text-slate-800 line-clamp-1" title={d.fullName}>
                      {d.name}
                    </span>
                  </div>
                  <div className="space-y-0.5">
                    <div className="flex items-baseline justify-between text-xs">
                      <span className="font-mono font-bold text-slate-900">{formatRupiah(d.nominalRealisasi)}</span>
                      <span className={`text-[11px] font-mono font-bold ${d.persenCapaian >= 95 ? 'text-emerald-700' : 'text-blue-700'}`}>
                        {d.persenCapaian}%
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      Pagu: {formatRupiah(d.nominalAnggaran)}
                    </div>
                  </div>
                </div>

                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500" 
                    style={{ 
                      width: `${Math.min(d.persenCapaian, 100)}%`, 
                      backgroundColor: pieColors[i % pieColors.length] 
                    }} 
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Detailed Hierarchy Account Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Tabel Rincian Akun Anggaran & Realisasi TA {selectedYear}
            </h3>
            <p className="text-xs text-slate-500">Klasifikasi hierarki akun berdasarkan penetapan resmi Peraturan Desa</p>
          </div>

          <div className="text-xs text-slate-400">
            Sumber: {summary.sumberData}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Kode Rekening</th>
                <th className="py-2.5 px-3">Klasifikasi & Uraian</th>
                <th className="py-2.5 px-3 text-right">Anggaran</th>
                <th className="py-2.5 px-3 text-right">Realisasi</th>
                <th className="py-2.5 px-3 text-right">Persen</th>
                <th className="py-2.5 px-3">Keterangan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {entries.map((item) => (
                <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-3 font-mono font-semibold text-[#0B3D6E]">
                    {item.kodeRekening}
                  </td>
                  <td className="py-3 px-3">
                    <div className="font-semibold text-slate-800">{item.bidang}</div>
                    <div className="text-slate-500 text-[11px] mt-0.5">{item.uraian}</div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums text-slate-900">
                    {formatRupiah(item.anggaran)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                    {formatRupiah(item.realisasi)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      item.persentase >= 95 ? 'text-emerald-700 bg-emerald-50' : 'text-blue-700 bg-blue-50'
                    }`}>
                      {item.persentase}%
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-[11px]">
                    {item.keterangan || '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* PPID & Public Documents CTA */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="text-sm font-bold text-[#0B3D6E]">
            Mencari Salinan Dokumen DPA atau Laporan Pertanggungjawaban Resmi?
          </h4>
          <p className="text-xs text-slate-600">
            Akses portal PPID Desa Girimukti untuk mengunduh dokumen publik atau mengajukan permohonan informasi publik sesuai UU KIP No. 14 Tahun 2008.
          </p>
        </div>
        <button
          onClick={onNavigatePpid}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0B3D6E] hover:bg-blue-900 rounded-lg transition-colors cursor-pointer whitespace-nowrap"
        >
          Buka Portal PPID Desa
        </button>
      </div>

    </div>
  );
};

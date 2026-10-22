import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Camera, 
  ShieldCheck, 
  Lock,
  ArrowRight
} from 'lucide-react';
import { Complaint } from '../../types';
import { StorageService } from '../../services/storage';

export const PengaduanView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kirim' | 'lacak'>('kirim');
  
  // Submission Form State
  const [kategori, setKategori] = useState<Complaint['kategori']>('Infrastruktur Jalan');
  const [judul, setJudul] = useState('');
  const [deskripsi, setDeskripsi] = useState('');
  const [lokasi, setLokasi] = useState('');
  const [namaPelapor, setNamaPelapor] = useState('');
  const [telepon, setTelepon] = useState('');
  const [isRahasia, setIsRahasia] = useState(true);
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  // Tracking State
  const [trackingTicket, setTrackingTicket] = useState('');
  const [trackedComplaint, setTrackedComplaint] = useState<Complaint | null>(null);
  const [trackingError, setTrackingError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!judul.trim() || !deskripsi.trim() || !lokasi.trim() || !namaPelapor.trim()) {
      setFormError('Semua kolom bertanda bintang (*) wajib diisi.');
      return;
    }

    setFormError('');

    // Mask name e.g. "Asep Sunandar" -> "A*** S*******"
    const maskedName = namaPelapor.split(' ').map(w => w.charAt(0) + '*'.repeat(Math.max(1, w.length - 1))).join(' ');

    const newComplaint = StorageService.submitComplaint({
      kategori,
      judul: judul.trim(),
      deskripsi: deskripsi.trim(),
      lokasi: lokasi.trim(),
      namaPelaporMasked: maskedName,
      teleponPelapor: telepon.trim() || undefined,
      isRahasia
    });

    setSubmittedTicket(newComplaint.nomorTiket);
  };

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingError('');
    setTrackedComplaint(null);

    if (!trackingTicket.trim()) {
      setTrackingError('Masukkan nomor tiket pengaduan.');
      return;
    }

    const found = StorageService.getComplaintByTicket(trackingTicket.trim());
    if (!found) {
      setTrackingError('Tiket pengaduan tidak ditemukan. Mohon periksa kembali nomor tiket Anda.');
      return;
    }

    setTrackedComplaint(found);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6BB8] mb-1">
          Layanan Aspirasi & Pengaduan Warga
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Pengaduan Masyarakat Desa Girimukti
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Sampaikan aspirasi, laporan jalan rusak, keluhan pelayanan, atau masukan pembangunan desa. Setiap laporan ditindaklanjuti secara resmi oleh tim perangkat desa.
        </p>

        {/* Tab Selector */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab('kirim')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'kirim'
                ? 'bg-[#0B3D6E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Tulis Pengaduan Baru
          </button>
          <button
            onClick={() => setActiveTab('lacak')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'lacak'
                ? 'bg-[#0B3D6E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lacak Status Tiket Aduan
          </button>
        </div>
      </div>

      {/* TAB 1: FORM PENGADUAN */}
      {activeTab === 'kirim' && (
        <div>
          {submittedTicket ? (
            <div className="bg-white rounded-xl border border-emerald-200 p-8 text-center space-y-4 shadow-md">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h2 className="text-xl font-bold text-slate-900">Laporan Anda Telah Terkirim!</h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Terima kasih atas kepedulian Anda dalam membangun Desa Girimukti. Nomor tiket aduan Anda adalah:
              </p>
              <div className="text-2xl font-extrabold text-[#0B3D6E] font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg inline-block">
                {submittedTicket}
              </div>
              <p className="text-xs text-slate-500">
                Gunakan nomor tiket ini untuk memantau tanggapan dan tindakan yang diambil pemerintah desa.
              </p>
              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => {
                    setActiveTab('lacak');
                    setTrackingTicket(submittedTicket);
                    setTrackedComplaint(StorageService.getComplaintByTicket(submittedTicket) || null);
                  }}
                  className="px-5 py-2 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-lg transition-colors cursor-pointer"
                >
                  Lacak Tiket Sekarang
                </button>
                <button
                  onClick={() => setSubmittedTicket(null)}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Buat Laporan Baru
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              
              <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg flex items-center gap-2 text-xs text-[#0B3D6E]">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Identitas Anda dilindungi secara privat dan dapat disamarkan ke publik.</span>
              </div>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kategori Pengaduan <span className="text-rose-600">*</span>
                    </label>
                    <select
                      value={kategori}
                      onChange={(e) => setKategori(e.target.value as Complaint['kategori'])}
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                    >
                      <option value="Infrastruktur Jalan">Infrastruktur Jalan / Jembatan</option>
                      <option value="Pelayanan Administrasi">Pelayanan Administrasi Kantor Desa</option>
                      <option value="Penyaluran Bantuan">Penyaluran Bantuan Sosial / BLT</option>
                      <option value="Kebersihan & Lingkungan">Kebersihan, Drainase & Lingkungan</option>
                      <option value="Ketertiban Umum">Ketertiban & Keamanan Warga</option>
                      <option value="Lainnya">Lain-lain / Aspirasi Umum</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Lokasi Kejadian / RT-RW <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={lokasi}
                      onChange={(e) => setLokasi(e.target.value)}
                      placeholder="Contoh: Kp. Girimekar RT 03/01 dekat jembatan"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Judul Laporan / Pokok Permasalahan <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={judul}
                      onChange={(e) => setJudul(e.target.value)}
                      placeholder="Ringkas dan jelas..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Uraian Pengaduan Lengkap <span className="text-rose-600">*</span>
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={deskripsi}
                      onChange={(e) => setDeskripsi(e.target.value)}
                      placeholder="Ceritakan secara kronologis kejadian atau aspirasi yang ingin disampaikan..."
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Pelapor <span className="text-rose-600">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={namaPelapor}
                      onChange={(e) => setNamaPelapor(e.target.value)}
                      placeholder="Nama asli Anda"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor Telepon / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={telepon}
                      onChange={(e) => setTelepon(e.target.value)}
                      placeholder="Untuk konfirmasi tindak lanjut"
                      className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
                    <input
                      type="checkbox"
                      checked={isRahasia}
                      onChange={(e) => setIsRahasia(e.target.checked)}
                      className="rounded text-[#1E6BB8] focus:ring-[#1E6BB8]"
                    />
                    <span>Sembunyikan nama saya dari publik (Hanya terbaca oleh petugas balai desa)</span>
                  </label>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-md transition-colors cursor-pointer"
                  >
                    Kirimkan Pengaduan
                  </button>
                </div>

              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LACAK TIKET PENGADUAN */}
      {activeTab === 'lacak' && (
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Periksa Perkembangan Laporan Pengaduan</h2>
            <form onSubmit={handleTrack} className="flex gap-2">
              <input
                type="text"
                value={trackingTicket}
                onChange={(e) => setTrackingTicket(e.target.value)}
                placeholder="Contoh: PGD-2026-0042"
                className="flex-1 px-4 py-2 text-xs font-mono uppercase border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
              />
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#0B3D6E] hover:bg-blue-900 rounded-md transition-colors cursor-pointer"
              >
                Cari Tiket
              </button>
            </form>
            {trackingError && (
              <p className="text-xs text-rose-600 font-medium">{trackingError}</p>
            )}
          </div>

          {trackedComplaint && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold font-mono text-[#1E6BB8]">
                    {trackedComplaint.nomorTiket}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    {trackedComplaint.judul}
                  </h3>
                  <div className="text-xs text-slate-500 mt-1 flex items-center gap-2">
                    <span>{trackedComplaint.kategori}</span>
                    <span>·</span>
                    <span>{trackedComplaint.lokasi}</span>
                    <span>·</span>
                    <span>{trackedComplaint.tanggal}</span>
                  </div>
                </div>

                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    trackedComplaint.status === 'Selesai'
                      ? 'bg-emerald-100 text-emerald-800'
                      : trackedComplaint.status === 'Diproses'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {trackedComplaint.status}
                  </span>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg space-y-2 text-xs text-slate-700">
                <span className="font-semibold block text-slate-900">Uraian Laporan:</span>
                <p className="leading-relaxed">{trackedComplaint.deskripsi}</p>
                <div className="pt-2 text-slate-400 text-[11px]">
                  Pelapor: {trackedComplaint.namaPelaporMasked}
                </div>
              </div>

              {trackedComplaint.tanggapanPetugas ? (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg space-y-2 text-xs text-emerald-950">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Tindak Lanjut Perangkat Desa Girimukti:</span>
                  </div>
                  <p className="leading-relaxed">{trackedComplaint.tanggapanPetugas}</p>
                  {trackedComplaint.tanggalSelesai && (
                    <div className="text-[11px] text-emerald-700">
                      Diselesaikan pada: {trackedComplaint.tanggalSelesai}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-700 shrink-0" />
                  <span>Laporan sedang dalam antrean peninjauan petugas lapangan balai desa.</span>
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

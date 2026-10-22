import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ExternalLink, 
  AlertCircle, 
  Search, 
  HelpCircle, 
  CheckCircle2, 
  Clock, 
  Lock,
  UserCheck
} from 'lucide-react';
import { StorageService } from '../../services/storage';

export const CekBansosView: React.FC = () => {
  const [activeMekanisme, setActiveMekanisme] = useState<'eksternal' | 'desa'>('eksternal');
  
  // Village Consultation Form State
  const [namaWarga, setNamaWarga] = useState('');
  const [nikWarga, setNikWarga] = useState('');
  const [teleponWarga, setTeleponWarga] = useState('');
  const [jenisBantuan, setJenisBantuan] = useState('PKH / BPNT (Kemensos)');
  const [keluhan, setKeluhan] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaWarga.trim() || !nikWarga.trim() || !teleponWarga.trim()) {
      setFormError('Nama, NIK, dan Nomor Kontak wajib diisi.');
      return;
    }

    if (nikWarga.trim().length !== 16) {
      setFormError('NIK harus 16 digit sesuai KTP/KK.');
      return;
    }

    setFormError('');
    
    // Mask name e.g. "Siti Fatimah" -> "S*** F******"
    const maskedName = namaWarga.split(' ').map(w => w.charAt(0) + '*'.repeat(Math.max(1, w.length - 1))).join(' ');

    const newTicket = StorageService.submitComplaint({
      kategori: 'Penyaluran Bantuan',
      judul: `Konsultasi Bansos: ${jenisBantuan}`,
      deskripsi: `Permohonan verifikasi kepesertaan bansos (${jenisBantuan}). Catatan: ${keluhan || 'Pengecekan status kepesertaan DTKS'}`,
      lokasi: 'Desa Girimukti',
      namaPelaporMasked: maskedName,
      teleponPelapor: teleponWarga,
      isRahasia: true
    });

    setSubmittedTicket(newTicket.nomorTiket);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6BB8] mb-1">
          Layanan Perlindungan Sosial
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Informasi & Pengecekan Bantuan Sosial
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Layanan pengecekan status bantuan sosial (PKH, BPNT, BLT-DD, Bantuan Beras) dengan standar ketat pelindungan data pribadi (UU No. 27/2022).
        </p>

        {/* Mechanism Switcher */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => setActiveMekanisme('eksternal')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeMekanisme === 'eksternal'
                ? 'bg-[#0B3D6E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Mekanisme A: Portal Resmi Kemensos RI
          </button>
          <button
            onClick={() => setActiveMekanisme('desa')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeMekanisme === 'desa'
                ? 'bg-[#0B3D6E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Mekanisme B: Konsultasi Terlindung Desa
          </button>
        </div>
      </div>

      {/* Security notice */}
      <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-3 text-xs text-amber-900">
        <Lock className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-semibold block">Prinsip Pelindungan Data Pribadi:</strong>
          <p>
            Pemerintah Desa Girimukti tidak pernah mempublikasikan daftar terbuka NIK atau data pribadi keluarga penerima manfaat ke ruang publik tanpa persetujuan sah dan dasar hukum yang berlaku. Informasi bantuan diberikan secara privat dan bertanggung jawab.
          </p>
        </div>
      </div>

      {/* MEKANISME A: PANDUAN RESMI KEMENSOS RI */}
      {activeMekanisme === 'eksternal' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Pengecekan Mandiri via Data Terpadu Kemensos RI</h2>
              <p className="text-xs text-slate-500">Penyaluran Program Keluarga Harapan (PKH) & Bantuan Pangan Non Tunai (BPNT)</p>
            </div>
            <a
              href="https://cekbansos.kemensos.go.id"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-lg transition-colors inline-flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <span>Buka cekbansos.kemensos.go.id</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="space-y-4">
            <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
              Langkah-langkah Pengecekan Resmi:
            </h3>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <span className="w-6 h-6 rounded-full bg-[#0B3D6E] text-white flex items-center justify-center font-bold shrink-0">1</span>
                <div>
                  <strong className="block font-semibold text-slate-900">Pilih Wilayah Domisili</strong>
                  Pilih Provinsi: <strong>BANTEN</strong>, Kabupaten: <strong>LEBAK</strong>, Kecamatan: <strong>CIMARGA</strong>, dan Desa: <strong>GIRIMUKTI</strong>.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <span className="w-6 h-6 rounded-full bg-[#0B3D6E] text-white flex items-center justify-center font-bold shrink-0">2</span>
                <div>
                  <strong className="block font-semibold text-slate-900">Masukkan Nama Penerima Manfaat</strong>
                  Ketik nama lengkap sesuai KTP (Kartu Tanda Penduduk) kepala keluarga atau anggota keluarga.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <span className="w-6 h-6 rounded-full bg-[#0B3D6E] text-white flex items-center justify-center font-bold shrink-0">3</span>
                <div>
                  <strong className="block font-semibold text-slate-900">Ketik Kode Keamanan (Captcha)</strong>
                  Ketikkan huruf kode yang tertera pada kotak captcha sistem Kemensos.
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                <span className="w-6 h-6 rounded-full bg-[#0B3D6E] text-white flex items-center justify-center font-bold shrink-0">4</span>
                <div>
                  <strong className="block font-semibold text-slate-900">Klik Cari Data</strong>
                  Sistem Kemensos akan menampilkan status apakah nama Anda terdaftar sebagai penerima bansos aktif, periode penyaluran, dan status pencairan.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MEKANISME B: KONSULTASI DESA */}
      {activeMekanisme === 'desa' && (
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Pengajuan Konsultasi & Pengecekan Bansos Desa</h2>
            <p className="text-xs text-slate-500">
              Kirimkan permohonan konsultasi bansos secara rahasia kepada Kasi Kesejahteraan Pemerintah Desa Girimukti.
            </p>
          </div>

          {submittedTicket ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-lg font-bold text-slate-900">Permohonan Konsultasi Diterima!</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Nomor Tiket Anda: <strong className="font-mono text-[#0B3D6E] text-sm">{submittedTicket}</strong>. Petugas Kesejahteraan Desa akan memeriksa buku registrasi DTKS desa dan menghubungi Anda melalui nomor telepon yang dicantumkan.
              </p>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="mt-3 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Kirim Konsultasi Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleConsultationSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Lengkap Kepala Keluarga <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={namaWarga}
                    onChange={(e) => setNamaWarga(e.target.value)}
                    placeholder="Sesuai KTP / KK"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    NIK (16 Digit) <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={16}
                    required
                    value={nikWarga}
                    onChange={(e) => setNikWarga(e.target.value)}
                    placeholder="360214..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white font-mono focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nomor WhatsApp / Telepon <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={teleponWarga}
                    onChange={(e) => setTeleponWarga(e.target.value)}
                    placeholder="08123456789"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Jenis Bantuan yang Ingin Ditanyakan
                  </label>
                  <select
                    value={jenisBantuan}
                    onChange={(e) => setJenisBantuan(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  >
                    <option value="PKH / BPNT (Kemensos)">PKH / BPNT (Kemensos)</option>
                    <option value="Bantuan Langsung Tunai Dana Desa (BLT-DD)">BLT Dana Desa (BLT-DD)</option>
                    <option value="Bantuan Beras Cadangan Pangan (CPP)">Bantuan Beras Cadangan Pangan (CPP)</option>
                    <option value="Pendaftaran DTKS Baru">Pendaftaran Usulan DTKS Baru</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Pertanyaan atau Keluhan Spesifik
                  </label>
                  <textarea
                    rows={3}
                    value={keluhan}
                    onChange={(e) => setKeluhan(e.target.value)}
                    placeholder="Contoh: Sebelumnya terdaftar menerima bantuan beras CPP, namun pada tahap IV ini nama tidak muncul di undangan..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-md transition-colors cursor-pointer"
                >
                  Kirim Permintaan Konsultasi
                </button>
              </div>
            </form>
          )}
        </div>
      )}

    </div>
  );
};

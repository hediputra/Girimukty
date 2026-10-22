import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  ExternalLink, 
  CreditCard, 
  Building2, 
  CheckCircle2, 
  AlertCircle, 
  Search,
  Lock,
  Phone
} from 'lucide-react';
import { StorageService } from '../../services/storage';

export const CekPbbView: React.FC = () => {
  const [nopInput, setNopInput] = useState('');
  const [namaWajibPajak, setNamaWajibPajak] = useState('');
  const [telepon, setTelepon] = useState('');
  const [lokasiObjek, setLokasiObjek] = useState('');
  const [catatan, setCatatan] = useState('');
  const [submittedTicket, setSubmittedTicket] = useState<string | null>(null);
  const [formError, setFormError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nopInput.trim() || !namaWajibPajak.trim() || !telepon.trim()) {
      setFormError('Nomor Objek Pajak (NOP), Nama Wajib Pajak, dan Nomor Telepon wajib diisi.');
      return;
    }

    setFormError('');
    
    // Mask name
    const maskedName = namaWajibPajak.split(' ').map(w => w.charAt(0) + '*'.repeat(Math.max(1, w.length - 1))).join(' ');

    const newTicket = StorageService.submitComplaint({
      kategori: 'Pelayanan Administrasi',
      judul: `Konsultasi PBB-P2 NOP: ${nopInput}`,
      deskripsi: `Permohonan konfirmasi tagihan/status bayar SPPT PBB-P2 NOP ${nopInput}. Objek: ${lokasiObjek || 'Desa Girimukti'}. Catatan: ${catatan || 'Cek status pembayaran SPPT'}`,
      lokasi: lokasiObjek || 'Desa Girimukti',
      namaPelaporMasked: maskedName,
      teleponPelapor: telepon,
      isRahasia: true
    });

    setSubmittedTicket(newTicket.nomorTiket);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6BB8] mb-1">
          Layanan Pajak Daerah & PBB-P2
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Layanan Informasi PBB-P2 Desa Girimukti
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Pajak Bumi dan Bangunan Perdesaan dan Perkotaan (PBB-P2) dikelola oleh Badan Pendapatan Daerah (Bapenda) Kabupaten Lebak.
        </p>
      </div>

      {/* Info Notice */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-start gap-3 text-xs text-blue-900">
        <Lock className="w-5 h-5 text-[#0B3D6E] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="font-semibold block">Kebijakan Keamanan Data Objek Pajak:</strong>
          <p>
            Sesuai regulasi kerahasiaan wajib pajak daerah, pencarian massal NOP publik dinonaktifkan guna mencegah penyalahgunaan data kepemilikan tanah warga. Warga dapat mengajukan konfirmasi status SPPT secara resmi atau membayar langsung melalui kanal pembayaran resmi perbankan.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left: Official Channels & Payment Guide */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-[#1E6BB8]" />
              <span>Kanal Pembayaran Resmi PBB Lebak</span>
            </h3>

            <p className="text-xs text-slate-600">
              Warga Desa Girimukti dapat membayar tagihan SPPT PBB-P2 melalui:
            </p>

            <ul className="space-y-2 text-xs text-slate-700">
              <li className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between">
                <span className="font-semibold">Bank BJB & Bank Banten</span>
                <span className="text-slate-500">ATM / Mobile Banking</span>
              </li>
              <li className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between">
                <span className="font-semibold">Kantor Pos Indonesia</span>
                <span className="text-slate-500">Loket Semua Cabang</span>
              </li>
              <li className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between">
                <span className="font-semibold">Indomaret & Alfamart</span>
                <span className="text-slate-500">Kasir dengan NOP</span>
              </li>
              <li className="p-2.5 bg-slate-50 rounded-lg flex items-center justify-between">
                <span className="font-semibold">QRIS & Tokopedia</span>
                <span className="text-slate-500">Menu Pajak Daerah PBB</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="https://bapenda.lebakkab.go.id"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-semibold text-[#1E6BB8] hover:underline flex items-center gap-1.5"
              >
                <span>Kunjungi Portal Resmi Bapenda Kab. Lebak</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-3 shadow-xs">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2">
              <Phone className="w-4 h-4 text-[#1E6BB8]" />
              <span>Petugas Pemungut PBB Desa</span>
            </h3>
            <p className="text-xs text-slate-600">
              Bagi warga yang ingin membayar langsung atau belum menerima lembar SPPT PBB tahun berjalan, silakan berkoordinasi dengan Ketua RT setempat atau Kaur Keuangan di Kantor Balai Desa Girimukti.
            </p>
          </div>
        </div>

        {/* Right: Form Konsultasi Status SPPT */}
        <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
          <div>
            <h3 className="text-base font-bold text-slate-900">Formulir Konfirmasi SPPT PBB</h3>
            <p className="text-xs text-slate-500">
              Kirimkan permohonan pengecekan status ketetapan pajak objek Anda di Girimukti.
            </p>
          </div>

          {submittedTicket ? (
            <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-base font-bold text-slate-900">Permohonan Terkirim</h4>
              <p className="text-xs text-slate-600">
                Nomor Tiket Anda: <strong className="font-mono text-[#0B3D6E]">{submittedTicket}</strong>. Petugas desa akan memverifikasi di buku DHKP desa dan memberikan status resmi kepada Anda.
              </p>
              <button
                onClick={() => setSubmittedTicket(null)}
                className="mt-2 px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 cursor-pointer"
              >
                Kirim Permintaan Baru
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Objek Pajak (NOP) <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={nopInput}
                  onChange={(e) => setNopInput(e.target.value)}
                  placeholder="36.02.140.xxx.xxx-xxxx.x"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white font-mono focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nama Wajib Pajak Sesuai SPPT <span className="text-rose-600">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={namaWajibPajak}
                  onChange={(e) => setNamaWajibPajak(e.target.value)}
                  placeholder="Nama pemilik atau pembayar pajak"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Nomor Telepon / WhatsApp <span className="text-rose-600">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={telepon}
                  onChange={(e) => setTelepon(e.target.value)}
                  placeholder="08123456789"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Lokasi Objek Tanah / Bangunan
                </label>
                <input
                  type="text"
                  value={lokasiObjek}
                  onChange={(e) => setLokasiObjek(e.target.value)}
                  placeholder="Kp. Girimekar RT 02/01"
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Kebutuhan Informasi / Keluhan
                </label>
                <textarea
                  rows={2}
                  value={catatan}
                  onChange={(e) => setCatatan(e.target.value)}
                  placeholder="Contoh: Belum menerima lembar SPPT tahun 2026 atau konfirmasi pelunasan..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-md transition-colors cursor-pointer"
                >
                  Kirim Permohonan Konfirmasi
                </button>
              </div>
            </form>
          )}

        </div>

      </div>

    </div>
  );
};

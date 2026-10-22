import React, { useState } from 'react';
import { 
  Building2, 
  FileText, 
  Download, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  ShieldCheck,
  Send
} from 'lucide-react';
import { PublicDocument, PpidRequest } from '../../types';
import { StorageService } from '../../services/storage';

export const PpidView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dokumen' | 'permohonan' | 'lacak'>('dokumen');
  const [filterKategori, setFilterKategori] = useState<string>('Semua');
  const [docSearch, setDocSearch] = useState('');

  const documents = StorageService.getPublicDocuments();

  // Permohonan form state
  const [namaPemohon, setNamaPemohon] = useState('');
  const [rincianInformasi, setRincianInformasi] = useState('');
  const [tujuanPenggunaan, setTujuanPenggunaan] = useState('');
  const [caraMemperoleh, setCaraMemperoleh] = useState<PpidRequest['caraMemperoleh']>('Salinan Softcopy');
  const [submittedPpid, setSubmittedPpid] = useState<PpidRequest | null>(null);
  const [formError, setFormError] = useState('');

  // Lacak state
  const [trackingReg, setTrackingReg] = useState('');
  const [trackedRequest, setTrackedRequest] = useState<PpidRequest | null>(null);
  const [trackingError, setTrackingError] = useState('');

  const filteredDocs = documents.filter(d => {
    const matchCat = filterKategori === 'Semua' || d.kategori === filterKategori;
    const matchSearch = docSearch === '' || d.judul.toLowerCase().includes(docSearch.toLowerCase()) || d.nomorDokumen.toLowerCase().includes(docSearch.toLowerCase());
    return matchCat && matchSearch;
  });

  const handlePpidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!namaPemohon.trim() || !rincianInformasi.trim() || !tujuanPenggunaan.trim()) {
      setFormError('Semua formulir wajib diisi.');
      return;
    }

    setFormError('');
    const newReq = StorageService.submitPpidRequest({
      namaPemohon: namaPemohon.trim(),
      rincianInformasi: rincianInformasi.trim(),
      tujuanPenggunaan: tujuanPenggunaan.trim(),
      caraMemperoleh
    });

    setSubmittedPpid(newReq);
  };

  const handleTrackPpid = (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingError('');
    setTrackedRequest(null);

    if (!trackingReg.trim()) {
      setTrackingError('Masukkan nomor registrasi PPID.');
      return;
    }

    const all = StorageService.getPpidRequests();
    const found = all.find(r => r.nomorRegistrasi.toUpperCase() === trackingReg.trim().toUpperCase());
    if (!found) {
      setTrackingError('Permohonan informasi tidak ditemukan. Mohon periksa kembali.');
      return;
    }

    setTrackedRequest(found);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6BB8] mb-1">
          Pejabat Pengelola Informasi dan Dokumentasi (PPID)
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Portal Keterbukaan Informasi Publik Desa Girimukti
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Berdasarkan Undang-Undang Nomor 14 Tahun 2008 tentang Keterbukaan Informasi Publik (KIP).
        </p>

        {/* Tab Selector */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab('dokumen')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'dokumen'
                ? 'bg-[#0B3D6E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Daftar Informasi Publik (DIP)
          </button>
          <button
            onClick={() => setActiveTab('permohonan')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'permohonan'
                ? 'bg-[#0B3D6E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Permohonan Informasi Publik
          </button>
          <button
            onClick={() => setActiveTab('lacak')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'lacak'
                ? 'bg-[#0B3D6E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lacak Permohonan
          </button>
        </div>
      </div>

      {/* Maklumat PPID Box */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 text-xs text-slate-700 space-y-1.5">
        <strong className="text-slate-900 block font-semibold">Maklumat Pelayanan Informasi Publik:</strong>
        <p>
          "Pemerintah Desa Girimukti berkomitmen memberikan pelayanan informasi publik secara cepat, tepat waktu, biaya ringan/proporsional, dan dengan cara sederhana sesuai standar perundang-undangan keterbukaan informasi publik." Jangka waktu tanggapan resmi maksimal 10 (sepuluh) hari kerja.
        </p>
      </div>

      {/* TAB 1: DOKUMEN PUBLIK (DIP) */}
      {activeTab === 'dokumen' && (
        <div className="space-y-6">
          
          {/* Filter Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              {['Semua', 'Berkala', 'Serta Merta', 'Setiap Saat'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setFilterKategori(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                    filterKategori === cat
                      ? 'bg-[#0B3D6E] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="w-full sm:w-64">
              <input
                type="text"
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                placeholder="Cari nama dokumen..."
                className="w-full px-3 py-1.5 text-xs border border-slate-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
              />
            </div>
          </div>

          {/* Document List */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs divide-y divide-slate-100">
            {filteredDocs.map((doc) => (
              <div key={doc.id} className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-50 transition-colors">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-slate-400 font-semibold">{doc.nomorDokumen}</span>
                    <span>·</span>
                    <span className="text-[#1E6BB8] font-medium">{doc.kategori}</span>
                    <span>·</span>
                    <span className="text-slate-500">Tahun {doc.tahun}</span>
                  </div>
                  <h3 className="text-sm font-bold text-slate-900">{doc.judul}</h3>
                  <p className="text-[11px] text-slate-400">
                    Diunggah: {doc.tanggalUnggah} · Ukuran: {doc.ukuranFile} · Format: PDF
                  </p>
                </div>

                <a
                  href={doc.fileUrl}
                  onClick={(e) => {
                    e.preventDefault();
                    alert(`Mengunduh dokumen resmi: ${doc.judul}`);
                  }}
                  className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Unduh Dokumen</span>
                </a>
              </div>
            ))}
          </div>

        </div>
      )}

      {/* TAB 2: FORM PERMOHONAN INFORMASI */}
      {activeTab === 'permohonan' && (
        <div className="max-w-2xl mx-auto">
          {submittedPpid ? (
            <div className="bg-white rounded-xl border border-emerald-200 p-8 text-center space-y-4 shadow-md">
              <CheckCircle2 className="w-14 h-14 text-emerald-600 mx-auto" />
              <h2 className="text-xl font-bold text-slate-900">Permohonan Informasi Berhasil Didaftarkan!</h2>
              <p className="text-xs text-slate-600">
                Nomor Registrasi PPID Anda:
              </p>
              <div className="text-2xl font-extrabold text-[#0B3D6E] font-mono p-3 bg-slate-50 border border-slate-200 rounded-lg inline-block">
                {submittedPpid.nomorRegistrasi}
              </div>
              <p className="text-xs text-slate-500">
                Sesuai UU KIP, petugas PPID Desa Girimukti akan memproses dan memberikan keputusan tanggapan dalam waktu maksimal 10 hari kerja.
              </p>
              <button
                onClick={() => {
                  setActiveTab('lacak');
                  setTrackingReg(submittedPpid.nomorRegistrasi);
                  setTrackedRequest(submittedPpid);
                }}
                className="px-5 py-2 text-xs font-semibold text-white bg-[#1E6BB8] rounded-lg cursor-pointer"
              >
                Lacak Status Permohonan
              </button>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
              <h2 className="text-base font-bold text-slate-900">Formulir Permohonan Informasi Publik Resmi</h2>
              <p className="text-xs text-slate-500">
                Isi data permohonan informasi publik yang Anda butuhkan secara lengkap dan jelas.
              </p>

              {formError && (
                <div className="p-3 bg-rose-50 border border-rose-200 rounded-md text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handlePpidSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Nama Pemohon / Lembaga <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={namaPemohon}
                    onChange={(e) => setNamaPemohon(e.target.value)}
                    placeholder="Nama perorangan atau nama organisasi/LSM"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Rincian Informasi yang Dibutuhkan <span className="text-rose-600">*</span>
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={rincianInformasi}
                    onChange={(e) => setRincianInformasi(e.target.value)}
                    placeholder="Sebutkan jenis dokumen atau informasi spesifik yang dimohonkan..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tujuan Penggunaan Informasi <span className="text-rose-600">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={tujuanPenggunaan}
                    onChange={(e) => setTujuanPenggunaan(e.target.value)}
                    placeholder="Contoh: Penelitian skripsi / Kajian kebijakan perdesaan"
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Cara Memperoleh Informasi
                  </label>
                  <select
                    value={caraMemperoleh}
                    onChange={(e) => setCaraMemperoleh(e.target.value as any)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  >
                    <option value="Salinan Softcopy">Salinan Softcopy (Email / File PDF)</option>
                    <option value="Melihat/Membaca">Melihat / Membaca di Balai Desa</option>
                    <option value="Salinan Hardcopy">Salinan Hardcopy (Fotokopi Cetak)</option>
                  </select>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-md transition-colors cursor-pointer"
                  >
                    Kirim Permohonan PPID
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: LACAK PPID */}
      {activeTab === 'lacak' && (
        <div className="max-w-2xl mx-auto space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-slate-900">Periksa Status Permohonan PPID</h2>
            <form onSubmit={handleTrackPpid} className="flex gap-2">
              <input
                type="text"
                value={trackingReg}
                onChange={(e) => setTrackingReg(e.target.value)}
                placeholder="Contoh: PPID-2026-0008"
                className="flex-1 px-4 py-2 text-xs font-mono uppercase border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
              />
              <button
                type="submit"
                className="px-5 py-2 text-xs font-semibold text-white bg-[#0B3D6E] hover:bg-blue-900 rounded-md transition-colors cursor-pointer"
              >
                Cari
              </button>
            </form>
            {trackingError && (
              <p className="text-xs text-rose-600 font-medium">{trackingError}</p>
            )}
          </div>

          {trackedRequest && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-mono font-bold text-[#1E6BB8]">
                  {trackedRequest.nomorRegistrasi}
                </span>
                <span className={`text-xs font-bold px-2.5 py-0.5 rounded ${
                  trackedRequest.status === 'Dikabulkan'
                    ? 'text-emerald-700 bg-emerald-50'
                    : 'text-amber-700 bg-amber-50'
                }`}>
                  {trackedRequest.status}
                </span>
              </div>

              <div className="space-y-2 text-xs text-slate-700">
                <div>
                  <span className="text-slate-400 block">Pemohon:</span>
                  <span className="font-semibold text-slate-800">{trackedRequest.namaPemohon}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Informasi Dimohonkan:</span>
                  <span className="text-slate-800">{trackedRequest.rincianInformasi}</span>
                </div>
                <div>
                  <span className="text-slate-400 block">Tanggal Pengajuan:</span>
                  <span className="text-slate-800">{trackedRequest.tanggalPengajuan}</span>
                </div>
              </div>

              {trackedRequest.jawaban && (
                <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950 space-y-1">
                  <span className="font-bold block">Tanggapan Resmi PPID Desa:</span>
                  <p>{trackedRequest.jawaban}</p>
                  {trackedRequest.tanggalRespon && (
                    <span className="text-[11px] text-emerald-700 block mt-1">
                      Tanggal tanggapan: {trackedRequest.tanggalRespon}
                    </span>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </div>
  );
};

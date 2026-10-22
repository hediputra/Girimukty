import React, { useState, useEffect } from 'react';
import { ShieldCheck, AlertCircle, CheckCircle2, Search, Building2, Calendar, UserCheck } from 'lucide-react';
import { StorageService } from '../../services/storage';
import { DocumentVerificationData } from '../../types';

interface ValidasiSuratViewProps {
  initialToken?: string;
}

export const ValidasiSuratView: React.FC<ValidasiSuratViewProps> = ({ initialToken = '' }) => {
  const [tokenInput, setTokenInput] = useState(initialToken);
  const [verificationResult, setVerificationResult] = useState<DocumentVerificationData | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialToken) {
      setTokenInput(initialToken);
      performCheck(initialToken);
    }
  }, [initialToken]);

  const performCheck = (token: string) => {
    setHasSearched(true);
    const result = StorageService.verifyDocumentToken(token);
    setVerificationResult(result);
  };

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) return;
    performCheck(tokenInput.trim());
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Title */}
      <div className="text-center space-y-2 border-b border-slate-200 pb-6">
        <div className="inline-flex p-3 rounded-2xl bg-blue-50 text-[#0B3D6E] mb-2">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Layanan Verifikasi Keabsahan Dokumen Resmi
        </h1>
        <p className="text-sm text-slate-600 max-w-xl mx-auto">
          Pemerintah Desa Girimukti menyediakan portal verifikasi publik untuk membuktikan keaslian dokumen surat yang diterbitkan secara sah oleh Kepala Desa.
        </p>
      </div>

      {/* Token Search Box */}
      <div className="max-w-xl mx-auto bg-white rounded-xl border border-slate-200 p-6 shadow-xs space-y-3">
        <label className="block text-xs font-semibold text-slate-700">
          Masukkan Kode Token Verifikasi Dokumen / Scan QR Code
        </label>
        <form onSubmit={handleVerify} className="flex gap-2">
          <input
            type="text"
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="Contoh: v-tok-78f921a"
            className="flex-1 px-4 py-2.5 text-xs font-mono border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
          />
          <button
            type="submit"
            className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0B3D6E] hover:bg-blue-900 rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Search className="w-4 h-4" />
            <span>Periksa</span>
          </button>
        </form>
        <p className="text-[11px] text-slate-400">
          Kode token dapat ditemukan di bagian bawah surat atau melalui pemindaian QR Code pada lembar cetak surat resmi.
        </p>
      </div>

      {/* Verification Result */}
      {hasSearched && (
        <div className="max-w-2xl mx-auto">
          {verificationResult ? (
            <div className="bg-white rounded-2xl border-2 border-emerald-500 overflow-hidden shadow-lg">
              
              {/* Header Status */}
              <div className="bg-emerald-600 text-white p-6 text-center space-y-1">
                <div className="w-12 h-12 rounded-full bg-white text-emerald-600 flex items-center justify-center mx-auto mb-2">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-xl font-black uppercase tracking-wide">
                  DOKUMEN ASLI DAN SAH TERDAFTAR
                </h2>
                <p className="text-xs text-emerald-100">
                  Surat ini tercatat resmi dalam Buku Register Administrasi Desa Girimukti
                </p>
              </div>

              {/* Verified Details with Data Privacy Protection */}
              <div className="p-6 sm:p-8 space-y-6">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  
                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 block mb-0.5">Nomor Surat Resmi:</span>
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {verificationResult.nomorSurat}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 block mb-0.5">Jenis Dokumen:</span>
                    <span className="font-bold text-slate-900">
                      {verificationResult.namaJenisSurat}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 block mb-0.5">Nama Pemohon (Tersamar):</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {verificationResult.namaPemohonMasked}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 block mb-0.5">NIK Pemohon (Tersamar):</span>
                    <span className="font-mono font-semibold text-slate-800">
                      {verificationResult.nikMasked}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 block mb-0.5">Tanggal Penerbitan:</span>
                    <span className="font-medium text-slate-800">
                      {verificationResult.tanggalDiterbitkan}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-400 block mb-0.5">Pejabat Penandatangan:</span>
                    <span className="font-bold text-slate-900">
                      {verificationResult.penandatanganNama}
                    </span>
                    <span className="text-[11px] text-slate-500 block">
                      ({verificationResult.penandatanganJabatan})
                    </span>
                  </div>

                </div>

                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl flex items-start gap-3 text-xs text-blue-900">
                  <Building2 className="w-5 h-5 text-[#0B3D6E] shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Pemerintah Desa Girimukti</strong>
                    <span>Kecamatan Cimarga, Kabupaten Lebak, Provinsi Banten. Token: </span>
                    <span className="font-mono font-bold text-[#0B3D6E]">{verificationResult.token}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 text-center">
                  * Nama dan NIK disamarkan sesuai Undang-Undang Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (PDP).
                </p>

              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-rose-200 p-8 text-center space-y-4 shadow-sm">
              <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertCircle className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Dokumen Tidak Terdaftar atau Kode Token Tidak Valid
              </h2>
              <p className="text-xs text-slate-600 max-w-md mx-auto">
                Kode token verifikasi yang Anda masukkan tidak cocok dengan dokumen resmi yang terdaftar pada sistem informasi Desa Girimukti. Mohon periksa kembali karakter token atau hubungi petugas balai desa.
              </p>
            </div>
          )}
        </div>
      )}

    </div>
  );
};

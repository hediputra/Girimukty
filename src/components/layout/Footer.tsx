import React from 'react';
import { Building2, MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string, param?: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmin }) => {
  return (
    <footer className="bg-[#0B3D6E] text-slate-300 text-sm mt-auto border-t border-blue-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Col 1: Government Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Pemerintah Desa Girimukti</h3>
                <p className="text-xs text-blue-200">Kec. Cimarga, Kab. Lebak, Banten</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Portal resmi pelayanan administrasi kependudukan mandiri, transparansi anggaran APBDes, dan pusat dokumentasi kegiatan masyarakat Desa Girimukti.
            </p>
            <div className="pt-2 text-xs text-blue-200 space-y-1">
              <div>Kode Wilayah: <span className="font-mono text-white">36.02.14.2008</span></div>
              <div>Kode Pos: <span className="font-mono text-white">42361</span></div>
            </div>
          </div>

          {/* Col 2: Kontak & Pelayanan */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Kontak Kantor Desa</h4>
            <ul className="space-y-2.5 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
                <span>Jl. Raya Cimarga - Leuwidamar Km. 4, Desa Girimukti, Kec. Cimarga, Kab. Lebak, Banten 42361</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-blue-300 shrink-0" />
                <span>(0252) 280142 / WA: 0813-8822-4190</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-blue-300 shrink-0" />
                <span>pemdes.girimukti@lebakkab.go.id</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-blue-300 shrink-0" />
                <span>Senin - Jumat: 08.00 - 15.30 WIB</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Cepat Warga */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Layanan Cepat</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('surat')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pengajuan Surat Online Mandiri
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('validasi')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Verifikasi Keaslian Dokumen (QR)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('transparansi')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Informasi APBDes & Realisasi Anggaran
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('bansos')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pengecekan Bantuan Sosial Terlindung
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pbb')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Konsultasi & Cek PBB-P2
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('pengaduan')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Aspirasi & Pengaduan Warga
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('ppid')}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Permohonan Informasi Publik (PPID)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Tautan Resmi & Keamanan */}
          <div className="space-y-3">
            <h4 className="text-white font-semibold text-sm tracking-wide uppercase">Tautan Resmi Pemerintah</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a 
                  href="https://lebakkab.go.id" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Pemerintah Kabupaten Lebak</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://bantenprov.go.id" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Pemerintah Provinsi Banten</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://kemendesa.go.id" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Kementerian Desa dan PDTT</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
              <li>
                <a 
                  href="https://cekbansos.kemensos.go.id" 
                  target="_blank" 
                  rel="noreferrer"
                  className="hover:text-white flex items-center gap-1.5 transition-colors"
                >
                  <span>Portal Cek Bansos Kemensos RI</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" />
                </a>
              </li>
            </ul>

            <div className="pt-3 border-t border-white/10">
              <button
                onClick={onOpenAdmin}
                className="text-xs text-blue-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
              >
                <span>Akses Internal Perangkat Desa</span>
              </button>
            </div>
          </div>

        </div>

        {/* Regulatory Compliance & Copyright Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="text-center md:text-left space-y-1">
            <p>
              © 2026 Pemerintah Desa Girimukti, Kecamatan Cimarga, Kabupaten Lebak, Provinsi Banten. Hak Cipta Dilindungi Undang-Undang.
            </p>
            <p className="text-[11px] text-slate-400">
              Kepatuhan terhadap UU No. 6/2014 & UU No. 3/2024 tentang Desa · UU No. 14/2008 Keterbukaan Informasi Publik · UU No. 27/2022 Pelindungan Data Pribadi · Permendagri No. 20/2018.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-slate-300">
            <span>Server: Asia/Jakarta (WIB)</span>
            <span>·</span>
            <span>Enkripsi TLS 1.3</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

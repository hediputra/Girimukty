/**
 * Type Definitions for Website dan Sistem Informasi Desa Girimukti
 * Desa Girimukti, Kecamatan Cimarga, Kabupaten Lebak, Provinsi Banten
 */

export type UserRole = 
  | 'admin_sistem'      // Administrator Sistem
  | 'operator_desa'     // Operator Desa
  | 'petugas_pelayanan' // Petugas Pelayanan
  | 'pengelola_keuangan'// Pengelola Keuangan
  | 'pejabat_penyetuju' // Pejabat Penyetuju (Kades/Sekdes)
  | 'auditor';          // Auditor/Pemeriksa

export interface User {
  id: string;
  name: string;
  username: string;
  role: UserRole;
  roleLabel: string;
  avatar?: string;
}

// Site Settings & Village Identity
export interface VillageInfo {
  namaDesa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  kodePos: string;
  kodeWilayah: string;
  alamatKantor: string;
  telepon: string;
  whatsapp: string;
  email: string;
  jamPelayanan: string;
  namaKepalaDesa: string;
  namaSekretarisDesa: string;
  koordinat: {
    lat: number;
    lng: number;
  };
  luasWilayah: string;
  jumlahPenduduk: number;
  jumlahKK: number;
  jumlahRT: number;
  jumlahRW: number;
  jumlahDusun: number;
  visi: string;
  misi: string[];
  sejarahSingkat: string;
  sambutanKades: string;
}

// Perangkat & Lembaga Desa
export interface VillageOfficial {
  id: string;
  nama: string;
  jabatan: string;
  nip?: string;
  bidang: string;
  urutan: number;
  fotoUrl?: string;
  status: 'aktif' | 'nonaktif';
}

export interface VillageInstitution {
  id: string;
  nama: string;
  singkatan: string;
  ketua: string;
  deskripsi: string;
  jumlahAnggota: number;
  alamat: string;
}

// Berita & Pengumuman
export interface NewsItem {
  id: string;
  slug: string;
  judul: string;
  ringkasan: string;
  konten: string;
  kategori: 'Pemerintahan' | 'Pembangunan' | 'Kemasyarakatan' | 'Pertanian' | 'Kesehatan' | 'Ekonomi';
  tags: string[];
  gambarUrl: string;
  penulis: string;
  tanggalPublikasi: string;
  views: number;
  status: 'terbit' | 'draft' | 'arsip';
}

export interface AnnouncementItem {
  id: string;
  judul: string;
  isi: string;
  tanggalTerbit: string;
  berlakuSampai: string;
  isPenting: boolean;
  lampiranNama?: string;
  lampiranUrl?: string;
  status: 'aktif' | 'kedaluwarsa';
}

export interface AgendaItem {
  id: string;
  judul: string;
  deskripsi: string;
  tanggalMulai: string;
  waktuMulai: string;
  lokasi: string;
  penyelenggara: string;
  status: 'mendatang' | 'berlangsung' | 'selesai';
}

export interface GalleryItem {
  id: string;
  judul: string;
  kategori: 'Kegiatan Desa' | 'Pembangunan' | 'Budaya & Tradisi' | 'Pertanian';
  tipe: 'foto' | 'video';
  mediaUrl: string;
  thumbnailUrl: string;
  tanggal: string;
  deskripsi: string;
}

// APBDes & Realisasi Anggaran
export interface BudgetEntry {
  id: string;
  tahunAnggaran: number;
  kategori: 'Pendapatan' | 'Belanja' | 'Pembiayaan';
  kodeRekening: string;
  bidang: string;
  subBidang?: string;
  uraian: string;
  anggaran: number;
  realisasi: number;
  persentase: number;
  keterangan?: string;
}

export interface APBDesSummary {
  tahun: number;
  pendapatan: {
    anggaran: number;
    realisasi: number;
    persen: number;
  };
  belanja: {
    anggaran: number;
    realisasi: number;
    persen: number;
  };
  pembiayaan: {
    penerimaan: number;
    pengeluaran: number;
    netto: number;
  };
  sumberData: string;
  tanggalUpdate: string;
  dokumenDpaUrl?: string;
}

// Template Surat Online & Generator
export type FieldDataType = 'text' | 'number' | 'date' | 'textarea' | 'select';

export interface LetterTemplateField {
  placeholder: string;       // e.g. "{{nama}}"
  label: string;             // e.g. "Nama Lengkap"
  dataType: FieldDataType;
  required: boolean;
  options?: string[];        // For select type
  helpText?: string;
  placeholderText?: string;
  isSensitive?: boolean;     // e.g. NIK
}

export interface LetterTemplate {
  id: string;
  kodeSurat: string;         // e.g. "SKU"
  nama: string;              // e.g. "Surat Keterangan Usaha"
  deskripsi: string;
  persyaratan: string[];
  formatNomor: string;       // e.g. "503/{seq}/Ds-Grm/{month}/{year}"
  isActive: boolean;
  isPublic: boolean;
  fields: LetterTemplateField[];
  templateContentText: string;
  lastUpdated: string;
}

export type ApplicationStatus = 
  | 'diajukan'
  | 'menunggu_verifikasi'
  | 'perlu_perbaikan'
  | 'sedang_diproses'
  | 'disetujui'
  | 'selesai'
  | 'ditolak';

export interface LetterApplication {
  id: string;
  nomorRegistrasi: string;    // Unique tracking code e.g. "REG-2026-SKU-0042"
  templateId: string;
  namaSurat: string;
  kodeSurat: string;
  pemohonNama: string;
  pemohonNik: string;        // Stored safely
  pemohonTelepon: string;
  pemohonAlamat: string;
  formData: Record<string, string>;
  lampiranFiles: { nama: string; url: string }[];
  status: ApplicationStatus;
  catatanPetugas?: string;
  tanggalPengajuan: string;
  tanggalSelesai?: string;
  nomorSuratResmi?: string;  // e.g. "503/024/Ds-Grm/III/2026"
  verificationToken?: string; // Token for QR validation
  pejabatPenandatangan?: {
    nama: string;
    jabatan: string;
  };
}

// Validated Official Document Token Verification
export interface DocumentVerificationData {
  isValid: boolean;
  token: string;
  nomorSurat: string;
  namaJenisSurat: string;
  namaPemohonMasked: string; // e.g. "B*** S******"
  nikMasked: string;         // e.g. "360214******0001"
  tanggalDiterbitkan: string;
  penandatanganJabatan: string;
  penandatanganNama: string;
  statusDokumen: 'SAH' | 'DICABUT' | 'KADALUWARSA';
  desa: string;
  kecamatan: string;
  kabupaten: string;
}

// Layanan Pengaduan Warga
export interface Complaint {
  id: string;
  nomorTiket: string;        // e.g. "PGD-2026-0081"
  kategori: 'Infrastruktur Jalan' | 'Pelayanan Administrasi' | 'Penyaluran Bantuan' | 'Kebersihan & Lingkungan' | 'Ketertiban Umum' | 'Lainnya';
  judul: string;
  deskripsi: string;
  lokasi: string;
  namaPelaporMasked: string; // Protected privacy
  teleponPelapor?: string;
  isRahasia: boolean;
  tanggal: string;
  status: 'Diterima' | 'Diverifikasi' | 'Diproses' | 'Selesai' | 'Ditolak';
  tanggapanPetugas?: string;
  tanggalSelesai?: string;
}

// PPID & Permohonan Informasi Publik
export interface PublicDocument {
  id: string;
  nomorDokumen: string;
  judul: string;
  kategori: 'Berkala' | 'Serta Merta' | 'Setiap Saat';
  tahun: number;
  ukuranFile: string;
  fileUrl: string;
  tanggalUnggah: string;
}

export interface PpidRequest {
  id: string;
  nomorRegistrasi: string;   // e.g. "PPID-2026-0015"
  namaPemohon: string;
  rincianInformasi: string;
  tujuanPenggunaan: string;
  caraMemperoleh: 'Melihat/Membaca' | 'Salinan Softcopy' | 'Salinan Hardcopy';
  tanggalPengajuan: string;
  status: 'Menunggu Verifikasi' | 'Diproses' | 'Dikabulkan' | 'Ditolak';
  jawaban?: string;
  tanggalRespon?: string;
}

// Audit Logs
export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  details: string;
  ipAddress: string;
}

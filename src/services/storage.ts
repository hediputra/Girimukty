/**
 * Unified Storage & State Service with LocalStorage persistence,
 * transactional letter numbering, and audit logging.
 */

import {
  VillageInfo,
  VillageOfficial,
  VillageInstitution,
  NewsItem,
  AnnouncementItem,
  AgendaItem,
  GalleryItem,
  BudgetEntry,
  APBDesSummary,
  LetterTemplate,
  LetterApplication,
  Complaint,
  PublicDocument,
  PpidRequest,
  AuditLog,
  User,
  DocumentVerificationData
} from '../types';

import {
  initialVillageInfo,
  initialOfficials,
  initialInstitutions,
  initialNews,
  initialAnnouncements,
  initialAgendas,
  initialGallery,
  initialBudgetEntries,
  initialAPBDesSummary2026,
  initialLetterTemplates,
  initialLetterApplications,
  initialComplaints,
  initialPublicDocuments,
  initialPpidRequests,
  initialAuditLogs
} from '../data/initialData';

const STORAGE_KEYS = {
  VILLAGE_INFO: 'grm_village_info',
  OFFICIALS: 'grm_officials',
  INSTITUTIONS: 'grm_institutions',
  NEWS: 'grm_news',
  ANNOUNCEMENTS: 'grm_announcements',
  AGENDAS: 'grm_agendas',
  GALLERY: 'grm_gallery',
  BUDGET_ENTRIES: 'grm_budget_entries',
  BUDGET_SUMMARY: 'grm_budget_summary',
  LETTER_TEMPLATES: 'grm_letter_templates',
  LETTER_APPLICATIONS: 'grm_letter_applications',
  COMPLAINTS: 'grm_complaints',
  PUBLIC_DOCS: 'grm_public_docs',
  PPID_REQUESTS: 'grm_ppid_requests',
  AUDIT_LOGS: 'grm_audit_logs',
  CURRENT_USER: 'grm_current_user',
  NUMBER_SEQUENCES: 'grm_number_sequences'
};

function getStorageItem<T>(key: string, defaultValue: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return defaultValue;
    return JSON.parse(raw);
  } catch (e) {
    console.error(`Failed to read ${key} from localStorage:`, e);
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Failed to write ${key} to localStorage:`, e);
  }
}

// Initial Admin User
export const defaultUsers: User[] = [
  {
    id: 'usr-1',
    name: 'Ahmad Fauzi, S.AP',
    username: 'sekdes',
    role: 'pejabat_penyetuju',
    roleLabel: 'Pejabat Penyetuju (Sekretaris Desa)'
  },
  {
    id: 'usr-2',
    name: 'Dedi Kusnadi, S.Kom',
    username: 'operator',
    role: 'operator_desa',
    roleLabel: 'Operator Desa & Pengelola Konten'
  },
  {
    id: 'usr-3',
    name: 'Encep Ridwan',
    username: 'pelayanan',
    role: 'petugas_pelayanan',
    roleLabel: 'Petugas Pelayanan Surat & Pengaduan'
  },
  {
    id: 'usr-4',
    name: 'Siti Rahmawati, S.E',
    username: 'keuangan',
    role: 'pengelola_keuangan',
    roleLabel: 'Pengelola Keuangan & APBDes'
  },
  {
    id: 'usr-5',
    name: 'Administrator TI',
    username: 'admin',
    role: 'admin_sistem',
    roleLabel: 'Administrator Sistem'
  }
];

export const StorageService = {
  // Village Info
  getVillageInfo: (): VillageInfo => getStorageItem(STORAGE_KEYS.VILLAGE_INFO, initialVillageInfo),
  updateVillageInfo: (info: VillageInfo): void => {
    setStorageItem(STORAGE_KEYS.VILLAGE_INFO, info);
    StorageService.addAuditLog('Pembaruan Identitas Desa', 'Memperbarui profil/identitas resmi desa');
  },

  // Officials & Institutions
  getOfficials: (): VillageOfficial[] => getStorageItem(STORAGE_KEYS.OFFICIALS, initialOfficials),
  saveOfficials: (list: VillageOfficial[]): void => setStorageItem(STORAGE_KEYS.OFFICIALS, list),
  getInstitutions: (): VillageInstitution[] => getStorageItem(STORAGE_KEYS.INSTITUTIONS, initialInstitutions),
  saveInstitutions: (list: VillageInstitution[]): void => setStorageItem(STORAGE_KEYS.INSTITUTIONS, list),

  // News
  getNews: (): NewsItem[] => getStorageItem(STORAGE_KEYS.NEWS, initialNews),
  getNewsBySlug: (slug: string): NewsItem | undefined => {
    const list = StorageService.getNews();
    return list.find(n => n.slug === slug);
  },
  saveNewsItem: (item: NewsItem): void => {
    const list = StorageService.getNews();
    const idx = list.findIndex(n => n.id === item.id);
    if (idx >= 0) {
      list[idx] = item;
    } else {
      list.unshift(item);
    }
    setStorageItem(STORAGE_KEYS.NEWS, list);
    StorageService.addAuditLog('Simpan Berita', `Berita: "${item.judul}"`);
  },
  deleteNewsItem: (id: string): void => {
    const list = StorageService.getNews().filter(n => n.id !== id);
    setStorageItem(STORAGE_KEYS.NEWS, list);
    StorageService.addAuditLog('Hapus Berita', `ID: ${id}`);
  },
  incrementNewsViews: (slug: string): void => {
    const list = StorageService.getNews();
    const item = list.find(n => n.slug === slug);
    if (item) {
      item.views = (item.views || 0) + 1;
      setStorageItem(STORAGE_KEYS.NEWS, list);
    }
  },

  // Announcements
  getAnnouncements: (): AnnouncementItem[] => getStorageItem(STORAGE_KEYS.ANNOUNCEMENTS, initialAnnouncements),
  saveAnnouncement: (item: AnnouncementItem): void => {
    const list = StorageService.getAnnouncements();
    const idx = list.findIndex(a => a.id === item.id);
    if (idx >= 0) list[idx] = item;
    else list.unshift(item);
    setStorageItem(STORAGE_KEYS.ANNOUNCEMENTS, list);
    StorageService.addAuditLog('Simpan Pengumuman', `Pengumuman: "${item.judul}"`);
  },
  deleteAnnouncement: (id: string): void => {
    const list = StorageService.getAnnouncements().filter(a => a.id !== id);
    setStorageItem(STORAGE_KEYS.ANNOUNCEMENTS, list);
    StorageService.addAuditLog('Hapus Pengumuman', `ID: ${id}`);
  },

  // Agendas
  getAgendas: (): AgendaItem[] => getStorageItem(STORAGE_KEYS.AGENDAS, initialAgendas),
  saveAgenda: (item: AgendaItem): void => {
    const list = StorageService.getAgendas();
    const idx = list.findIndex(a => a.id === item.id);
    if (idx >= 0) list[idx] = item;
    else list.unshift(item);
    setStorageItem(STORAGE_KEYS.AGENDAS, list);
    StorageService.addAuditLog('Simpan Agenda', `Agenda: "${item.judul}"`);
  },
  deleteAgenda: (id: string): void => {
    const list = StorageService.getAgendas().filter(a => a.id !== id);
    setStorageItem(STORAGE_KEYS.AGENDAS, list);
    StorageService.addAuditLog('Hapus Agenda', `ID: ${id}`);
  },

  // Gallery
  getGallery: (): GalleryItem[] => getStorageItem(STORAGE_KEYS.GALLERY, initialGallery),
  saveGalleryItem: (item: GalleryItem): void => {
    const list = StorageService.getGallery();
    const idx = list.findIndex(g => g.id === item.id);
    if (idx >= 0) list[idx] = item;
    else list.unshift(item);
    setStorageItem(STORAGE_KEYS.GALLERY, list);
    StorageService.addAuditLog('Simpan Galeri', `Media: "${item.judul}"`);
  },
  deleteGalleryItem: (id: string): void => {
    const list = StorageService.getGallery().filter(g => g.id !== id);
    setStorageItem(STORAGE_KEYS.GALLERY, list);
    StorageService.addAuditLog('Hapus Galeri', `ID: ${id}`);
  },

  // APBDes & Budget
  getBudgetEntries: (tahun?: number): BudgetEntry[] => {
    const all = getStorageItem(STORAGE_KEYS.BUDGET_ENTRIES, initialBudgetEntries);
    if (tahun) return all.filter(b => b.tahunAnggaran === tahun);
    return all;
  },
  saveBudgetEntries: (entries: BudgetEntry[]): void => {
    setStorageItem(STORAGE_KEYS.BUDGET_ENTRIES, entries);
    StorageService.addAuditLog('Pembaruan APBDes', 'Memperbarui rincian akun APBDes');
  },
  getBudgetSummary: (tahun: number = 2026): APBDesSummary => {
    const defaultSummary = tahun === 2026 ? initialAPBDesSummary2026 : {
      ...initialAPBDesSummary2026,
      tahun: 2025,
      pendapatan: { anggaran: 1410000000, realisasi: 1405000000, persen: 99.6 },
      belanja: { anggaran: 1390000000, realisasi: 1382000000, persen: 99.4 }
    };
    return getStorageItem(`${STORAGE_KEYS.BUDGET_SUMMARY}_${tahun}`, defaultSummary);
  },
  saveBudgetSummary: (summary: APBDesSummary): void => {
    setStorageItem(`${STORAGE_KEYS.BUDGET_SUMMARY}_${summary.tahun}`, summary);
    StorageService.addAuditLog('Simpan Ringkasan APBDes', `Tahun Anggaran ${summary.tahun}`);
  },

  // Letter Templates
  getLetterTemplates: (): LetterTemplate[] => getStorageItem(STORAGE_KEYS.LETTER_TEMPLATES, initialLetterTemplates),
  saveLetterTemplate: (template: LetterTemplate): void => {
    const list = StorageService.getLetterTemplates();
    const idx = list.findIndex(t => t.id === template.id);
    if (idx >= 0) list[idx] = template;
    else list.unshift(template);
    setStorageItem(STORAGE_KEYS.LETTER_TEMPLATES, list);
    StorageService.addAuditLog('Simpan Template Surat', `Template: ${template.nama} (${template.kodeSurat})`);
  },
  deleteLetterTemplate: (id: string): void => {
    const list = StorageService.getLetterTemplates().filter(t => t.id !== id);
    setStorageItem(STORAGE_KEYS.LETTER_TEMPLATES, list);
    StorageService.addAuditLog('Hapus Template Surat', `ID: ${id}`);
  },

  // Letter Applications & Tracking
  getLetterApplications: (): LetterApplication[] => getStorageItem(STORAGE_KEYS.LETTER_APPLICATIONS, initialLetterApplications),
  getApplicationByRegNumber: (regNumber: string): LetterApplication | undefined => {
    const list = StorageService.getLetterApplications();
    const cleanSearch = regNumber.trim().toUpperCase();
    return list.find(a => a.nomorRegistrasi.toUpperCase() === cleanSearch);
  },
  submitLetterApplication: (data: Omit<LetterApplication, 'id' | 'nomorRegistrasi' | 'status' | 'tanggalPengajuan'>): LetterApplication => {
    const list = StorageService.getLetterApplications();
    const year = new Date().getFullYear();
    const randomSeq = Math.floor(1000 + Math.random() * 9000);
    const regNumber = `REG-${year}-${data.kodeSurat}-${randomSeq}`;

    const newApp: LetterApplication = {
      ...data,
      id: `app-${Date.now()}`,
      nomorRegistrasi: regNumber,
      status: 'diajukan',
      tanggalPengajuan: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    list.unshift(newApp);
    setStorageItem(STORAGE_KEYS.LETTER_APPLICATIONS, list);
    StorageService.addAuditLog('Pengajuan Surat Warga', `Pemohon: ${data.pemohonNama}, No. Reg: ${regNumber}`);
    return newApp;
  },
  updateLetterApplication: (app: LetterApplication): void => {
    const list = StorageService.getLetterApplications();
    const idx = list.findIndex(a => a.id === app.id);
    if (idx >= 0) list[idx] = app;
    setStorageItem(STORAGE_KEYS.LETTER_APPLICATIONS, list);
    StorageService.addAuditLog('Pembaruan Status Surat', `No. Reg: ${app.nomorRegistrasi}, Status: ${app.status}`);
  },

  // Auto Numbering Transactional Generator
  generateNextOfficialLetterNumber: (template: LetterTemplate): { officialNumber: string; verificationToken: string } => {
    const sequences = getStorageItem<Record<string, number>>(STORAGE_KEYS.NUMBER_SEQUENCES, {});
    const year = new Date().getFullYear();
    const key = `${template.kodeSurat}_${year}`;
    const nextSeq = (sequences[key] || 24) + 1;
    sequences[key] = nextSeq;
    setStorageItem(STORAGE_KEYS.NUMBER_SEQUENCES, sequences);

    const padSeq = String(nextSeq).padStart(3, '0');
    const romanMonths = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    const currentMonthRoman = romanMonths[new Date().getMonth()];

    // Format e.g. "503/025/Ds-Grm/X/2026"
    const officialNumber = template.formatNomor
      .replace('{seq}', padSeq)
      .replace('{month}', currentMonthRoman)
      .replace('{year}', String(year));

    // Generate unique verification token
    const token = 'v-tok-' + Math.random().toString(36).substring(2, 9);

    return { officialNumber, verificationToken: token };
  },

  // Verification Portal Lookup
  verifyDocumentToken: (token: string): DocumentVerificationData | null => {
    const cleanToken = token.trim();
    const apps = StorageService.getLetterApplications();
    const matched = apps.find(a => a.verificationToken === cleanToken && a.status === 'selesai');

    if (!matched) return null;

    // Mask name e.g. "Budi Santoso" -> "B*** S******"
    const maskName = (name: string) => {
      return name.split(' ').map(w => w.charAt(0) + '*'.repeat(Math.max(1, w.length - 1))).join(' ');
    };

    // Mask NIK e.g. "3602141508820002" -> "360214******0002"
    const maskNik = (nik: string) => {
      if (nik.length < 10) return '******';
      return nik.substring(0, 6) + '******' + nik.substring(nik.length - 4);
    };

    const village = StorageService.getVillageInfo();

    return {
      isValid: true,
      token: matched.verificationToken || token,
      nomorSurat: matched.nomorSuratResmi || '503/024/Ds-Grm/X/2026',
      namaJenisSurat: matched.namaSurat,
      namaPemohonMasked: maskName(matched.pemohonNama),
      nikMasked: maskNik(matched.pemohonNik),
      tanggalDiterbitkan: matched.tanggalSelesai || matched.tanggalPengajuan,
      penandatanganJabatan: matched.pejabatPenandatangan?.jabatan || 'Kepala Desa Girimukti',
      penandatanganNama: matched.pejabatPenandatangan?.nama || village.namaKepalaDesa,
      statusDokumen: 'SAH',
      desa: village.namaDesa,
      kecamatan: village.kecamatan,
      kabupaten: village.kabupaten
    };
  },

  // Complaints / Pengaduan Warga
  getComplaints: (): Complaint[] => getStorageItem(STORAGE_KEYS.COMPLAINTS, initialComplaints),
  getComplaintByTicket: (ticket: string): Complaint | undefined => {
    const list = StorageService.getComplaints();
    return list.find(c => c.nomorTiket.toUpperCase() === ticket.trim().toUpperCase());
  },
  submitComplaint: (data: Omit<Complaint, 'id' | 'nomorTiket' | 'tanggal' | 'status'>): Complaint => {
    const list = StorageService.getComplaints();
    const year = new Date().getFullYear();
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const nomorTiket = `PGD-${year}-${randomNum}`;

    const newComplaint: Complaint = {
      ...data,
      id: `pgd-${Date.now()}`,
      nomorTiket,
      tanggal: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'Diterima'
    };

    list.unshift(newComplaint);
    setStorageItem(STORAGE_KEYS.COMPLAINTS, list);
    StorageService.addAuditLog('Pengaduan Warga Masuk', `Tiket: ${nomorTiket}, Kategori: ${data.kategori}`);
    return newComplaint;
  },
  updateComplaint: (complaint: Complaint): void => {
    const list = StorageService.getComplaints();
    const idx = list.findIndex(c => c.id === complaint.id);
    if (idx >= 0) list[idx] = complaint;
    setStorageItem(STORAGE_KEYS.COMPLAINTS, list);
    StorageService.addAuditLog('Pembaruan Pengaduan', `Tiket: ${complaint.nomorTiket}, Status: ${complaint.status}`);
  },

  // PPID Documents & Requests
  getPublicDocuments: (): PublicDocument[] => getStorageItem(STORAGE_KEYS.PUBLIC_DOCS, initialPublicDocuments),
  savePublicDocument: (doc: PublicDocument): void => {
    const list = StorageService.getPublicDocuments();
    const idx = list.findIndex(d => d.id === doc.id);
    if (idx >= 0) list[idx] = doc;
    else list.unshift(doc);
    setStorageItem(STORAGE_KEYS.PUBLIC_DOCS, list);
    StorageService.addAuditLog('Simpan Dokumen PPID', doc.judul);
  },
  deletePublicDocument: (id: string): void => {
    const list = StorageService.getPublicDocuments().filter(d => d.id !== id);
    setStorageItem(STORAGE_KEYS.PUBLIC_DOCS, list);
    StorageService.addAuditLog('Hapus Dokumen PPID', `ID: ${id}`);
  },
  getPpidRequests: (): PpidRequest[] => getStorageItem(STORAGE_KEYS.PPID_REQUESTS, initialPpidRequests),
  submitPpidRequest: (data: Omit<PpidRequest, 'id' | 'nomorRegistrasi' | 'tanggalPengajuan' | 'status'>): PpidRequest => {
    const list = StorageService.getPpidRequests();
    const year = new Date().getFullYear();
    const randomNum = Math.floor(100 + Math.random() * 900);
    const nomorRegistrasi = `PPID-${year}-${randomNum}`;

    const newReq: PpidRequest = {
      ...data,
      id: `ppid-${Date.now()}`,
      nomorRegistrasi,
      tanggalPengajuan: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      status: 'Menunggu Verifikasi'
    };

    list.unshift(newReq);
    setStorageItem(STORAGE_KEYS.PPID_REQUESTS, list);
    StorageService.addAuditLog('Permohonan Informasi PPID', `No: ${nomorRegistrasi}, Pemohon: ${data.namaPemohon}`);
    return newReq;
  },
  updatePpidRequest: (req: PpidRequest): void => {
    const list = StorageService.getPpidRequests();
    const idx = list.findIndex(r => r.id === req.id);
    if (idx >= 0) list[idx] = req;
    setStorageItem(STORAGE_KEYS.PPID_REQUESTS, list);
    StorageService.addAuditLog('Pembaruan Permohonan PPID', `No: ${req.nomorRegistrasi}, Status: ${req.status}`);
  },

  // Audit Logs
  getAuditLogs: (): AuditLog[] => getStorageItem(STORAGE_KEYS.AUDIT_LOGS, initialAuditLogs),
  addAuditLog: (action: string, details: string): void => {
    const user = StorageService.getCurrentUser();
    const logs = StorageService.getAuditLogs();
    const newLog: AuditLog = {
      id: `log-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toLocaleString('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      userName: user ? user.name : 'Sistem / Publik',
      userRole: user ? user.roleLabel : 'Publik',
      action,
      details,
      ipAddress: '192.168.1.10'
    };
    logs.unshift(newLog);
    // Keep max 200 logs
    if (logs.length > 200) logs.pop();
    setStorageItem(STORAGE_KEYS.AUDIT_LOGS, logs);
  },

  // User Auth & Session
  getCurrentUser: (): User | null => getStorageItem(STORAGE_KEYS.CURRENT_USER, defaultUsers[0]),
  setCurrentUser: (user: User | null): void => {
    setStorageItem(STORAGE_KEYS.CURRENT_USER, user);
    if (user) {
      StorageService.addAuditLog('Login Pengguna', `User: ${user.name} (${user.role})`);
    } else {
      StorageService.addAuditLog('Logout Pengguna', 'Sesi diakhiri');
    }
  },

  // Reset to initial clean state
  resetAllData: (): void => {
    Object.values(STORAGE_KEYS).forEach(key => localStorage.removeItem(key));
    window.location.reload();
  }
};

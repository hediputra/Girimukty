import React, { useState } from 'react';
import { 
  Building2, 
  LayoutDashboard, 
  FileText, 
  Layers, 
  TrendingUp, 
  Bell, 
  Calendar, 
  Camera, 
  HelpCircle, 
  Users, 
  Settings, 
  ShieldCheck, 
  LogOut, 
  Plus, 
  Trash2, 
  Edit, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Upload, 
  Printer, 
  ExternalLink,
  Save,
  Search,
  Eye,
  RefreshCw,
  UserCheck
} from 'lucide-react';

import { 
  VillageInfo, 
  LetterTemplate, 
  LetterApplication, 
  BudgetEntry, 
  APBDesSummary, 
  NewsItem, 
  AnnouncementItem, 
  AgendaItem, 
  Complaint, 
  PublicDocument, 
  PpidRequest, 
  AuditLog, 
  User, 
  UserRole,
  LetterTemplateField
} from '../../types';

import { StorageService, defaultUsers } from '../../services/storage';
import { 
  inspectDocxBuffer, 
  extractPlaceholdersFromText, 
  renderPopulatedText, 
  generateDocxBlob 
} from '../../services/docxEngine';
import { generateQrCodeDataUrl } from '../../services/qrGenerator';

interface AdminDashboardProps {
  onBackToPublic: () => void;
  villageInfo: VillageInfo;
  onUpdateVillageInfo: (info: VillageInfo) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  onBackToPublic,
  villageInfo,
  onUpdateVillageInfo
}) => {
  const [currentUser, setCurrentUser] = useState<User>(
    StorageService.getCurrentUser() || defaultUsers[0]
  );

  const [activeMenu, setActiveMenu] = useState<
    'ringkasan' | 'surat_masuk' | 'template_surat' | 'apbdes' | 'berita' | 'pengumuman' | 'agenda' | 'pengaduan' | 'ppid' | 'pengaturan' | 'audit_log'
  >('ringkasan');

  // Real data from storage
  const [applications, setApplications] = useState<LetterApplication[]>(StorageService.getLetterApplications());
  const [templates, setTemplates] = useState<LetterTemplate[]>(StorageService.getLetterTemplates());
  const [budgetEntries, setBudgetEntries] = useState<BudgetEntry[]>(StorageService.getBudgetEntries());
  const [budgetSummary, setBudgetSummary] = useState<APBDesSummary>(StorageService.getBudgetSummary(2026));
  const [newsList, setNewsList] = useState<NewsItem[]>(StorageService.getNews());
  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(StorageService.getAnnouncements());
  const [complaints, setComplaints] = useState<Complaint[]>(StorageService.getComplaints());
  const [ppidList, setPpidList] = useState<PpidRequest[]>(StorageService.getPpidRequests());
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(StorageService.getAuditLogs());

  // Modal / Editing states
  const [editingTemplate, setEditingTemplate] = useState<LetterTemplate | null>(null);
  const [selectedApplication, setSelectedApplication] = useState<LetterApplication | null>(null);
  const [statusUpdateNote, setStatusUpdateNote] = useState('');
  const [testGeneratedDoc, setTestGeneratedDoc] = useState<string | null>(null);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3000);
  };

  const reloadData = () => {
    setApplications(StorageService.getLetterApplications());
    setTemplates(StorageService.getLetterTemplates());
    setBudgetEntries(StorageService.getBudgetEntries());
    setBudgetSummary(StorageService.getBudgetSummary(2026));
    setNewsList(StorageService.getNews());
    setAnnouncements(StorageService.getAnnouncements());
    setComplaints(StorageService.getComplaints());
    setPpidList(StorageService.getPpidRequests());
    setAuditLogs(StorageService.getAuditLogs());
  };

  // Switch role simulator
  const handleSwitchUser = (userId: string) => {
    const user = defaultUsers.find(u => u.id === userId) || defaultUsers[0];
    setCurrentUser(user);
    StorageService.setCurrentUser(user);
    setAuditLogs(StorageService.getAuditLogs());
    showNotification(`Beralih peran ke: ${user.name} (${user.roleLabel})`);
  };

  // Action: Approve & Issue Official Letter
  const handleApproveAndIssue = async (app: LetterApplication) => {
    const tpl = templates.find(t => t.id === app.templateId);
    if (!tpl) return;

    // Generate transactional sequential number and verification token
    const { officialNumber, verificationToken } = StorageService.generateNextOfficialLetterNumber(tpl);

    const updated: LetterApplication = {
      ...app,
      status: 'selesai',
      nomorSuratResmi: officialNumber,
      verificationToken,
      tanggalSelesai: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
      catatanPetugas: statusUpdateNote || 'Permohonan disetujui dan surat resmi telah diterbitkan.',
      pejabatPenandatangan: {
        nama: villageInfo.namaKepalaDesa,
        jabatan: 'Kepala Desa Girimukti'
      }
    };

    StorageService.updateLetterApplication(updated);
    setSelectedApplication(updated);
    reloadData();
    showNotification(`Surat resmi no. ${officialNumber} berhasil diterbitkan dengan token ${verificationToken}!`);
  };

  // Action: Update Application Status
  const handleUpdateStatus = (app: LetterApplication, newStatus: LetterApplication['status']) => {
    const updated: LetterApplication = {
      ...app,
      status: newStatus,
      catatanPetugas: statusUpdateNote || app.catatanPetugas
    };
    StorageService.updateLetterApplication(updated);
    setSelectedApplication(updated);
    reloadData();
    showNotification(`Status permohonan diubah menjadi: ${newStatus}`);
  };

  // Action: Download DOCX from admin
  const handleDownloadAppDocx = (app: LetterApplication) => {
    const tpl = templates.find(t => t.id === app.templateId);
    if (!tpl) return;

    const rendered = renderPopulatedText(tpl.templateContentText, app.formData, {
      nomorSurat: app.nomorSuratResmi || '503/024/Ds-Grm/X/2026',
      tanggalSurat: app.tanggalSelesai || app.tanggalPengajuan,
      jabatanPenandatangan: app.pejabatPenandatangan?.jabatan || 'Kepala Desa Girimukti',
      namaPenandatangan: app.pejabatPenandatangan?.nama || villageInfo.namaKepalaDesa
    });

    const verificationUrl = `${window.location.origin}#validasi-${app.verificationToken || 'tok'}`;
    const blob = generateDocxBlob(tpl.nama, rendered, app.nomorSuratResmi || 'SURAT', verificationUrl);
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${app.kodeSurat}_${app.nomorRegistrasi}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Action: Template File DOCX Upload & Placeholder Inspector
  const handleDocxUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!editingTemplate || !e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];

    try {
      const buffer = await file.arrayBuffer();
      const inspection = await inspectDocxBuffer(buffer);

      if (inspection.errors.length > 0) {
        alert(inspection.errors.join('\n'));
        return;
      }

      setEditingTemplate(prev => {
        if (!prev) return null;
        return {
          ...prev,
          fields: inspection.fields.length > 0 ? inspection.fields : prev.fields,
          templateContentText: prev.templateContentText + `\n[File Diunggah: ${file.name}]`
        };
      });

      showNotification(`Berhasil mendeteksi ${inspection.rawPlaceholders.length} placeholder dari dokumen DOCX.`);
    } catch (err: any) {
      alert(`Gagal memproses file DOCX: ${err.message}`);
    }
  };

  // Action: Save Template
  const handleSaveTemplate = (tpl: LetterTemplate) => {
    StorageService.saveLetterTemplate(tpl);
    setEditingTemplate(null);
    reloadData();
    showNotification(`Template "${tpl.nama}" berhasil disimpan.`);
  };

  // Action: Complaint Status
  const handleUpdateComplaintStatus = (complaint: Complaint, newStatus: Complaint['status'], responseText: string) => {
    const updated: Complaint = {
      ...complaint,
      status: newStatus,
      tanggapanPetugas: responseText,
      tanggalSelesai: newStatus === 'Selesai' ? new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) : undefined
    };
    StorageService.updateComplaint(updated);
    reloadData();
    showNotification(`Pengaduan tiket ${complaint.nomorTiket} diperbarui.`);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      
      {/* Top Header */}
      <header className="bg-[#0B3D6E] text-white px-4 sm:px-6 py-3 border-b border-blue-900 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center font-bold">
              <Building2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="text-sm font-bold tracking-tight">Sistem Informasi Desa Girimukti</div>
              <div className="text-[11px] text-blue-200">Panel Administrasi & Pelayanan Terpadu</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            
            {/* Role Switcher for Demo */}
            <div className="hidden sm:flex items-center gap-2 bg-blue-900/60 border border-blue-400/30 rounded-lg px-2.5 py-1 text-xs">
              <span className="text-blue-200">Peran:</span>
              <select
                value={currentUser.id}
                onChange={(e) => handleSwitchUser(e.target.value)}
                className="bg-transparent text-white font-medium focus:outline-hidden cursor-pointer"
              >
                {defaultUsers.map(u => (
                  <option key={u.id} value={u.id} className="text-slate-900">
                    {u.name} ({u.role})
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={onBackToPublic}
              className="px-3 py-1.5 text-xs font-semibold text-white bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Lihat Portal Publik</span>
            </button>
          </div>

        </div>
      </header>

      {/* Notification Toast */}
      {notificationMsg && (
        <div className="fixed top-16 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-lg shadow-xl text-xs font-medium flex items-center gap-2 border border-slate-700 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Main Admin Workspace */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full flex-1 flex flex-col md:flex-row gap-6">
        
        {/* Left Sidebar Menu */}
        <aside className="w-full md:w-64 bg-white rounded-xl border border-slate-200 p-4 space-y-1 shadow-xs shrink-0 self-start">
          
          <div className="pb-3 mb-2 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
              Pengguna Aktif
            </span>
            <div className="text-xs font-bold text-slate-900 truncate">{currentUser.name}</div>
            <div className="text-[11px] text-[#1E6BB8] truncate font-medium">{currentUser.roleLabel}</div>
          </div>

          <button
            onClick={() => setActiveMenu('ringkasan')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeMenu === 'ringkasan' ? 'bg-[#0B3D6E] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Dashboard Ringkasan</span>
          </button>

          <button
            onClick={() => setActiveMenu('surat_masuk')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              activeMenu === 'surat_masuk' ? 'bg-[#0B3D6E] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <FileText className="w-4 h-4" />
              <span>Permohonan Surat</span>
            </span>
            {applications.filter(a => a.status === 'diajukan' || a.status === 'sedang_diproses').length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-white">
                {applications.filter(a => a.status === 'diajukan' || a.status === 'sedang_diproses').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveMenu('template_surat')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeMenu === 'template_surat' ? 'bg-[#0B3D6E] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Kelola Template DOCX</span>
          </button>

          <button
            onClick={() => setActiveMenu('apbdes')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeMenu === 'apbdes' ? 'bg-[#0B3D6E] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>APBDes & Realisasi</span>
          </button>

          <button
            onClick={() => setActiveMenu('berita')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeMenu === 'berita' ? 'bg-[#0B3D6E] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Kabar & Berita Desa</span>
          </button>

          <button
            onClick={() => setActiveMenu('pengumuman')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeMenu === 'pengumuman' ? 'bg-[#0B3D6E] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Bell className="w-4 h-4" />
            <span>Pengumuman</span>
          </button>

          <button
            onClick={() => setActiveMenu('pengaduan')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
              activeMenu === 'pengaduan' ? 'bg-[#0B3D6E] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span className="flex items-center gap-2.5">
              <HelpCircle className="w-4 h-4" />
              <span>Pengaduan Warga</span>
            </span>
            {complaints.filter(c => c.status !== 'Selesai').length > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                {complaints.filter(c => c.status !== 'Selesai').length}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveMenu('ppid')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeMenu === 'ppid' ? 'bg-[#0B3D6E] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>PPID & Dokumen</span>
          </button>

          <button
            onClick={() => setActiveMenu('audit_log')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeMenu === 'audit_log' ? 'bg-[#0B3D6E] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>Audit Log Sistem</span>
          </button>

          <button
            onClick={() => setActiveMenu('pengaturan')}
            className={`w-full text-left px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2.5 transition-colors cursor-pointer ${
              activeMenu === 'pengaturan' ? 'bg-[#0B3D6E] text-white' : 'text-slate-700 hover:bg-slate-50'
            }`}
          >
            <Settings className="w-4 h-4" />
            <span>Pengaturan Desa</span>
          </button>

        </aside>

        {/* Right Content Area */}
        <main className="flex-1 bg-white rounded-xl border border-slate-200 p-6 shadow-xs overflow-x-auto min-h-[500px]">
          
          {/* 1. RINGKASAN OVERVIEW */}
          {activeMenu === 'ringkasan' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">Ringkasan Operasional Pemerintahan Desa</h2>
                <p className="text-xs text-slate-500">Statistik data aktual dan antrean permohonan warga</p>
              </div>

              {/* 4 Metric counters */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl space-y-1">
                  <span className="text-[11px] font-semibold text-blue-700 uppercase">Permohonan Surat</span>
                  <div className="text-2xl font-bold text-[#0B3D6E] font-mono tabular-nums">
                    {applications.length}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {applications.filter(a => a.status === 'diajukan').length} Menunggu Verifikasi
                  </span>
                </div>

                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl space-y-1">
                  <span className="text-[11px] font-semibold text-emerald-700 uppercase">Surat Diterbitkan</span>
                  <div className="text-2xl font-bold text-emerald-800 font-mono tabular-nums">
                    {applications.filter(a => a.status === 'selesai').length}
                  </div>
                  <span className="text-[11px] text-slate-500">QR Validasi Terdaftar</span>
                </div>

                <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl space-y-1">
                  <span className="text-[11px] font-semibold text-amber-700 uppercase">Aspirasi & Pengaduan</span>
                  <div className="text-2xl font-bold text-amber-800 font-mono tabular-nums">
                    {complaints.length}
                  </div>
                  <span className="text-[11px] text-slate-500">
                    {complaints.filter(c => c.status !== 'Selesai').length} Perlu Tindak Lanjut
                  </span>
                </div>

                <div className="p-4 bg-indigo-50 border border-indigo-100 rounded-xl space-y-1">
                  <span className="text-[11px] font-semibold text-indigo-700 uppercase">Template Surat Aktif</span>
                  <div className="text-2xl font-bold text-indigo-800 font-mono tabular-nums">
                    {templates.filter(t => t.isActive).length}
                  </div>
                  <span className="text-[11px] text-slate-500">DOCX Generator Siap</span>
                </div>
              </div>

              {/* Recent Pending Applications table */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Antrean Permohonan Surat Warga Terbaru</h3>
                  <button
                    onClick={() => setActiveMenu('surat_masuk')}
                    className="text-xs text-[#1E6BB8] font-semibold hover:underline cursor-pointer"
                  >
                    Buka Semua Permohonan
                  </button>
                </div>

                <div className="border border-slate-200 rounded-lg overflow-hidden">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3">No. Registrasi</th>
                        <th className="py-2 px-3">Pemohon</th>
                        <th className="py-2 px-3">Jenis Surat</th>
                        <th className="py-2 px-3">Tanggal</th>
                        <th className="py-2 px-3">Status</th>
                        <th className="py-2 px-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {applications.slice(0, 4).map(app => (
                        <tr key={app.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-3 font-mono font-semibold text-[#0B3D6E]">
                            {app.nomorRegistrasi}
                          </td>
                          <td className="py-2.5 px-3 font-medium text-slate-800">
                            {app.pemohonNama}
                          </td>
                          <td className="py-2.5 px-3 text-slate-600">
                            {app.namaSurat}
                          </td>
                          <td className="py-2.5 px-3 text-slate-500">
                            {app.tanggalPengajuan}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              app.status === 'selesai'
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.status === 'sedang_diproses'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-amber-100 text-amber-800'
                            }`}>
                              {app.status}
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-right">
                            <button
                              onClick={() => {
                                setSelectedApplication(app);
                                setActiveMenu('surat_masuk');
                              }}
                              className="text-xs font-semibold text-[#1E6BB8] hover:underline cursor-pointer"
                            >
                              Periksa
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Audit Log */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Aktivitas Administrasi Terbaru
                </h3>
                <div className="space-y-1.5 text-xs text-slate-600">
                  {auditLogs.slice(0, 3).map(log => (
                    <div key={log.id} className="p-2.5 bg-slate-50 rounded-md flex items-center justify-between">
                      <div>
                        <strong className="text-slate-800">{log.action}: </strong>
                        <span>{log.details}</span>
                        <span className="text-slate-400 text-[11px] ml-2">({log.userName})</span>
                      </div>
                      <span className="text-[11px] text-slate-400 font-mono">{log.timestamp}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

          {/* 2. PROSES PERMOHONAN SURAT */}
          {activeMenu === 'surat_masuk' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Manajemen Permohonan Surat Masuk</h2>
                  <p className="text-xs text-slate-500">Verifikasi berkas warga, alokasi nomor surat otomatis, dan penerbitan dokumen resmi</p>
                </div>
                <button
                  onClick={reloadData}
                  className="p-1.5 text-slate-500 hover:text-slate-800 rounded border border-slate-200 cursor-pointer"
                  title="Segarkan data"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">No. Registrasi</th>
                      <th className="py-2.5 px-3">Pemohon & NIK</th>
                      <th className="py-2.5 px-3">Surat</th>
                      <th className="py-2.5 px-3">Status</th>
                      <th className="py-2.5 px-3">No. Surat Resmi</th>
                      <th className="py-2.5 px-3 text-right">Tindakan</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {applications.map(app => (
                      <tr key={app.id} className="hover:bg-slate-50">
                        <td className="py-3 px-3 font-mono font-bold text-[#0B3D6E]">
                          {app.nomorRegistrasi}
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-semibold text-slate-900">{app.pemohonNama}</div>
                          <div className="font-mono text-slate-400 text-[11px]">{app.pemohonNik}</div>
                        </td>
                        <td className="py-3 px-3">
                          <span className="font-medium text-slate-700">{app.namaSurat}</span>
                        </td>
                        <td className="py-3 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            app.status === 'selesai'
                              ? 'bg-emerald-100 text-emerald-800'
                              : app.status === 'sedang_diproses'
                              ? 'bg-blue-100 text-blue-800'
                              : 'bg-amber-100 text-amber-800'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-3 px-3 font-mono text-[11px] text-slate-800">
                          {app.nomorSuratResmi || '-'}
                        </td>
                        <td className="py-3 px-3 text-right space-x-2">
                          <button
                            onClick={() => setSelectedApplication(app)}
                            className="px-2.5 py-1 text-xs font-semibold text-[#1E6BB8] bg-blue-50 hover:bg-blue-100 rounded cursor-pointer"
                          >
                            Kelola
                          </button>
                          {app.status === 'selesai' && (
                            <button
                              onClick={() => handleDownloadAppDocx(app)}
                              className="px-2 py-1 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded cursor-pointer inline-flex items-center gap-1"
                              title="Unduh DOCX"
                            >
                              <Download className="w-3 h-3" />
                              <span>DOCX</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Review & Action Modal for selected application */}
              {selectedApplication && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
                    
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div>
                        <span className="text-xs font-mono font-bold text-[#1E6BB8]">
                          {selectedApplication.nomorRegistrasi}
                        </span>
                        <h3 className="text-lg font-bold text-slate-900">
                          Verifikasi Permohonan {selectedApplication.namaSurat}
                        </h3>
                      </div>
                      <button
                        onClick={() => setSelectedApplication(null)}
                        className="text-slate-400 hover:text-slate-600 text-sm font-semibold cursor-pointer"
                      >
                        Tutup
                      </button>
                    </div>

                    {/* Applicant details */}
                    <div className="grid grid-cols-2 gap-4 text-xs p-4 bg-slate-50 rounded-xl">
                      <div>
                        <span className="text-slate-400 block">Nama Pemohon:</span>
                        <strong className="text-slate-900">{selectedApplication.pemohonNama}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">NIK Pemohon:</span>
                        <strong className="font-mono text-slate-900">{selectedApplication.pemohonNik}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 block">No. Telepon / WA:</span>
                        <span className="text-slate-900">{selectedApplication.pemohonTelepon}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">Alamat Tinggal:</span>
                        <span className="text-slate-900">{selectedApplication.pemohonAlamat}</span>
                      </div>
                    </div>

                    {/* Form answers */}
                    <div className="space-y-2 text-xs">
                      <h4 className="font-bold text-slate-700 uppercase">Isian Formulir Tambahan:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {Object.entries(selectedApplication.formData).map(([k, v]) => (
                          <div key={k} className="p-2 border border-slate-200 rounded">
                            <span className="text-slate-400 font-mono text-[10px] block">{k}:</span>
                            <span className="font-medium text-slate-800">{v || '-'}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Officer notes */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Catatan Pemeriksaan / Verifikasi Petugas
                      </label>
                      <input
                        type="text"
                        value={statusUpdateNote}
                        onChange={(e) => setStatusUpdateNote(e.target.value)}
                        placeholder="Contoh: Berkas telah diverifikasi RT dan lapangan, siap diterbitkan..."
                        className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                      />
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleUpdateStatus(selectedApplication, 'sedang_diproses')}
                          className="px-3 py-2 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded cursor-pointer"
                        >
                          Tandai Sedang Diproses
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(selectedApplication, 'ditolak')}
                          className="px-3 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded cursor-pointer"
                        >
                          Tolak Berkas
                        </button>
                      </div>

                      <button
                        onClick={() => handleApproveAndIssue(selectedApplication)}
                        className="px-4 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Setujui & Terbitkan Nomor Surat Resmi</span>
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* 3. KELOLA TEMPLATE SURAT & DOCX ENGINE */}
          {activeMenu === 'template_surat' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">
                    Pengelolaan Template Surat & Generator DOCX
                  </h2>
                  <p className="text-xs text-slate-500">
                    Unggah template Word (.docx), atur placeholder, dan validasi form otomatis tanpa coding
                  </p>
                </div>
                <button
                  onClick={() => {
                    const newTpl: LetterTemplate = {
                      id: `tpl-${Date.now()}`,
                      kodeSurat: 'SKU-BARU',
                      nama: 'Jenis Surat Baru',
                      deskripsi: 'Deskripsi peruntukan surat...',
                      persyaratan: ['KTP asli', 'Kartu Keluarga'],
                      formatNomor: '500/{seq}/Ds-Grm/{month}/{year}',
                      isActive: true,
                      isPublic: true,
                      fields: [
                        { placeholder: '{{nama}}', label: 'Nama Lengkap', dataType: 'text', required: true },
                        { placeholder: '{{nik}}', label: 'NIK', dataType: 'text', required: true, isSensitive: true },
                        { placeholder: '{{alamat}}', label: 'Alamat', dataType: 'textarea', required: true }
                      ],
                      templateContentText: `PEMERINTAH DESA GIRIMUKTI\nSURAT KETERANGAN\nNomor: {{nomor_surat}}\n\nNama: {{nama}}\nNIK: {{nik}}\nAlamat: {{alamat}}\n\nGirimukti, {{tanggal_surat}}\n{{jabatan_penandatangan}}\n\n{{nama_penandatangan}}`,
                      lastUpdated: new Date().toLocaleDateString('id-ID')
                    };
                    setEditingTemplate(newTpl);
                  }}
                  className="px-3.5 py-2 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Tambah Jenis Surat</span>
                </button>
              </div>

              {/* Template list */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {templates.map(tpl => (
                  <div key={tpl.id} className="p-5 border border-slate-200 rounded-xl space-y-3 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs font-bold text-[#1E6BB8] bg-white px-2 py-0.5 rounded border border-slate-200">
                        Kode: {tpl.kodeSurat}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                        tpl.isActive ? 'text-emerald-700 bg-emerald-50' : 'text-slate-500 bg-slate-100'
                      }`}>
                        {tpl.isActive ? 'Aktif' : 'Non-Aktif'}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{tpl.nama}</h3>
                    <p className="text-xs text-slate-600 line-clamp-2">{tpl.deskripsi}</p>

                    <div className="text-[11px] text-slate-500 space-y-0.5">
                      <div>Format Nomor: <span className="font-mono text-slate-700">{tpl.formatNomor}</span></div>
                      <div>Jumlah Field: <span className="font-semibold text-slate-700">{tpl.fields.length} Placeholder</span></div>
                    </div>

                    <div className="pt-2 border-t border-slate-200 flex items-center justify-between">
                      <button
                        onClick={() => setEditingTemplate(tpl)}
                        className="text-xs font-semibold text-[#1E6BB8] hover:underline cursor-pointer"
                      >
                        Edit Template & Placeholder
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Yakin ingin menghapus template ${tpl.nama}?`)) {
                            StorageService.deleteLetterTemplate(tpl.id);
                            reloadData();
                          }
                        }}
                        className="text-xs text-rose-600 hover:text-rose-800 cursor-pointer"
                      >
                        Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Template Editor Modal */}
              {editingTemplate && (
                <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
                  <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto shadow-2xl">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <h3 className="text-lg font-bold text-slate-900">
                        Editor Template DOCX: {editingTemplate.nama}
                      </h3>
                      <button
                        onClick={() => setEditingTemplate(null)}
                        className="text-slate-400 hover:text-slate-600 text-sm font-semibold cursor-pointer"
                      >
                        Tutup
                      </button>
                    </div>

                    {/* Upload DOCX inspector button */}
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl space-y-2">
                      <span className="text-xs font-bold text-[#0B3D6E] block">
                        Deteksi Otomatis dari Dokumen Word (.docx)
                      </span>
                      <p className="text-xs text-slate-600">
                        Unggah file template .docx dari komputer Anda. Sistem akan memindai seluruh tag <code>{"{{...}}"}</code> dan membuat pemetaan formulir secara otomatis.
                      </p>
                      <input
                        type="file"
                        accept=".docx"
                        onChange={handleDocxUpload}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-[#0B3D6E] file:text-white hover:file:bg-blue-900 cursor-pointer"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Nama Jenis Surat</label>
                        <input
                          type="text"
                          value={editingTemplate.nama}
                          onChange={(e) => setEditingTemplate({ ...editingTemplate, nama: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Kode Surat Singkat</label>
                        <input
                          type="text"
                          value={editingTemplate.kodeSurat}
                          onChange={(e) => setEditingTemplate({ ...editingTemplate, kodeSurat: e.target.value.toUpperCase() })}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md font-mono uppercase focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-slate-700 mb-1">Format Penomoran Surat</label>
                        <input
                          type="text"
                          value={editingTemplate.formatNomor}
                          onChange={(e) => setEditingTemplate({ ...editingTemplate, formatNomor: e.target.value })}
                          className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md font-mono focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                        />
                        <p className="text-[11px] text-slate-400 mt-1">Variabel: {"{seq}"} (nomor urut), {"{month}"} (bulan romawi), {"{year}"} (tahun)</p>
                      </div>
                    </div>

                    {/* Placeholders Table */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-slate-800 uppercase">
                          Daftar Kolom & Placeholder ({editingTemplate.fields.length})
                        </h4>
                        <button
                          type="button"
                          onClick={() => {
                            const newField: LetterTemplateField = {
                              placeholder: '{{custom_field}}',
                              label: 'Kolom Kustom',
                              dataType: 'text',
                              required: true
                            };
                            setEditingTemplate({
                              ...editingTemplate,
                              fields: [...editingTemplate.fields, newField]
                            });
                          }}
                          className="text-xs text-[#1E6BB8] font-semibold hover:underline cursor-pointer"
                        >
                          + Tambah Field Manual
                        </button>
                      </div>

                      <div className="border border-slate-200 rounded-lg overflow-hidden">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                            <tr>
                              <th className="py-2 px-3">Placeholder</th>
                              <th className="py-2 px-3">Label Formulir</th>
                              <th className="py-2 px-3">Tipe Input</th>
                              <th className="py-2 px-3">Wajib?</th>
                              <th className="py-2 px-3 text-right">Aksi</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {editingTemplate.fields.map((f, fIdx) => (
                              <tr key={fIdx}>
                                <td className="py-2 px-3 font-mono font-bold text-[#0B3D6E]">
                                  {f.placeholder}
                                </td>
                                <td className="py-2 px-3">
                                  <input
                                    type="text"
                                    value={f.label}
                                    onChange={(e) => {
                                      const updatedFields = [...editingTemplate.fields];
                                      updatedFields[fIdx].label = e.target.value;
                                      setEditingTemplate({ ...editingTemplate, fields: updatedFields });
                                    }}
                                    className="px-2 py-1 text-xs border border-slate-200 rounded w-full"
                                  />
                                </td>
                                <td className="py-2 px-3">
                                  <select
                                    value={f.dataType}
                                    onChange={(e) => {
                                      const updatedFields = [...editingTemplate.fields];
                                      updatedFields[fIdx].dataType = e.target.value as any;
                                      setEditingTemplate({ ...editingTemplate, fields: updatedFields });
                                    }}
                                    className="px-2 py-1 text-xs border border-slate-200 rounded"
                                  >
                                    <option value="text">Teks</option>
                                    <option value="textarea">Textarea</option>
                                    <option value="date">Tanggal</option>
                                    <option value="number">Angka</option>
                                    <option value="select">Pilihan</option>
                                  </select>
                                </td>
                                <td className="py-2 px-3">
                                  <input
                                    type="checkbox"
                                    checked={f.required}
                                    onChange={(e) => {
                                      const updatedFields = [...editingTemplate.fields];
                                      updatedFields[fIdx].required = e.target.checked;
                                      setEditingTemplate({ ...editingTemplate, fields: updatedFields });
                                    }}
                                  />
                                </td>
                                <td className="py-2 px-3 text-right">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedFields = editingTemplate.fields.filter((_, idx) => idx !== fIdx);
                                      setEditingTemplate({ ...editingTemplate, fields: updatedFields });
                                    }}
                                    className="text-rose-500 hover:text-rose-700 cursor-pointer"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* Template Content Preview & Test */}
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Isi Konten Dokumen (dengan Placeholders)
                      </label>
                      <textarea
                        rows={8}
                        value={editingTemplate.templateContentText}
                        onChange={(e) => setEditingTemplate({ ...editingTemplate, templateContentText: e.target.value })}
                        className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                      />
                    </div>

                    <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingTemplate(null)}
                        className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => handleSaveTemplate(editingTemplate)}
                        className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-md transition-colors cursor-pointer"
                      >
                        Simpan Template Surat
                      </button>
                    </div>

                  </div>
                </div>
              )}

            </div>
          )}

          {/* 4. KELOLA APBDES & REALISASI */}
          {activeMenu === 'apbdes' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">Manajemen APBDes & Realisasi Anggaran</h2>
                  <p className="text-xs text-slate-500">Input data anggaran, realisasi belanja, dan ekspor/impor spreadsheet</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      alert('Simulasi ekspor template format Excel/CSV APBDes berhasil diunduh.');
                    }}
                    className="px-3 py-1.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Ekspor CSV</span>
                  </button>
                  <button
                    onClick={() => {
                      alert('Format data APBDes terverifikasi valid sesuai Permendagri No. 20 Tahun 2018.');
                    }}
                    className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg flex items-center gap-1.5 cursor-pointer"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Verifikasi & Publikasikan</span>
                  </button>
                </div>
              </div>

              {/* Editable Budget Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Kode</th>
                      <th className="py-2.5 px-3">Kategori & Bidang</th>
                      <th className="py-2.5 px-3">Uraian Akun</th>
                      <th className="py-2.5 px-3 text-right">Anggaran (Rp)</th>
                      <th className="py-2.5 px-3 text-right">Realisasi (Rp)</th>
                      <th className="py-2.5 px-3 text-right">Persen</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {budgetEntries.map((b, idx) => (
                      <tr key={b.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono font-bold text-[#0B3D6E]">
                          {b.kodeRekening}
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="font-semibold text-slate-800">{b.bidang}</span>
                          <span className="text-[10px] text-slate-400 block">{b.kategori}</span>
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">
                          {b.uraian}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums">
                          {b.anggaran.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono tabular-nums font-semibold text-slate-900">
                          {b.realisasi.toLocaleString('id-ID')}
                        </td>
                        <td className="py-2.5 px-3 text-right font-mono">
                          <span className="text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                            {b.persentase}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 5. KELOLA PENGADUAN */}
          {activeMenu === 'pengaduan' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">Pusat Tindak Lanjut Pengaduan Warga</h2>
                <p className="text-xs text-slate-500">Tanggapi aspirasi, perbarui status penanganan, dan beri solusi kepada pelapor</p>
              </div>

              <div className="space-y-4">
                {complaints.map(c => (
                  <div key={c.id} className="p-5 border border-slate-200 rounded-xl space-y-3 bg-slate-50/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-[#1E6BB8]">
                          {c.nomorTiket}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">· {c.kategori}</span>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                        c.status === 'Selesai' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                      }`}>
                        {c.status}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900">{c.judul}</h3>
                    <p className="text-xs text-slate-700 leading-relaxed">{c.deskripsi}</p>
                    
                    <div className="text-[11px] text-slate-500">
                      Lokasi: {c.lokasi} · Pelapor: {c.namaPelaporMasked} {c.teleponPelapor && `(WA: ${c.teleponPelapor})`}
                    </div>

                    {c.tanggapanPetugas && (
                      <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-950">
                        <strong className="block mb-0.5">Tanggapan Saat Ini:</strong>
                        <p>{c.tanggapanPetugas}</p>
                      </div>
                    )}

                    <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          const resp = prompt('Masukkan tanggapan petugas balai desa untuk pelapor:', c.tanggapanPetugas || '');
                          if (resp !== null) {
                            handleUpdateComplaintStatus(c, 'Diproses', resp);
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-white border border-blue-200 rounded hover:bg-blue-50 cursor-pointer"
                      >
                        Beri Tanggapan (Diproses)
                      </button>

                      <button
                        onClick={() => {
                          const resp = prompt('Masukkan catatan penyelesaian laporan:', c.tanggapanPetugas || 'Laporan telah diselesaikan tuntas oleh tim lapangan.');
                          if (resp !== null) {
                            handleUpdateComplaintStatus(c, 'Selesai', resp);
                          }
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded cursor-pointer"
                      >
                        Tandai Selesai
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. AUDIT LOG */}
          {activeMenu === 'audit_log' && (
            <div className="space-y-6">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">Audit Trail & Log Keamanan Sistem</h2>
                <p className="text-xs text-slate-500">Mencatat setiap tindakan penting, penerbitan surat, perubahan anggaran, dan login pengguna</p>
              </div>

              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="py-2.5 px-3">Waktu (WIB)</th>
                      <th className="py-2.5 px-3">Pengguna & Peran</th>
                      <th className="py-2.5 px-3">Aktivitas</th>
                      <th className="py-2.5 px-3">Keterangan Rinci</th>
                      <th className="py-2.5 px-3">IP Address</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {auditLogs.map(log => (
                      <tr key={log.id} className="hover:bg-slate-50">
                        <td className="py-2.5 px-3 font-mono text-slate-500 whitespace-nowrap">
                          {log.timestamp}
                        </td>
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-900">{log.userName}</div>
                          <div className="text-[10px] text-slate-400">{log.userRole}</div>
                        </td>
                        <td className="py-2.5 px-3 font-semibold text-[#0B3D6E]">
                          {log.action}
                        </td>
                        <td className="py-2.5 px-3 text-slate-600">
                          {log.details}
                        </td>
                        <td className="py-2.5 px-3 font-mono text-slate-400">
                          {log.ipAddress}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 7. PENGATURAN DESA */}
          {activeMenu === 'pengaturan' && (
            <div className="space-y-6 max-w-2xl">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900">Pengaturan Identitas & Kontak Desa</h2>
                <p className="text-xs text-slate-500">Ubah informasi kantor desa tanpa perlu mengubah kode program</p>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Kepala Desa</label>
                  <input
                    type="text"
                    value={villageInfo.namaKepalaDesa}
                    onChange={(e) => onUpdateVillageInfo({ ...villageInfo, namaKepalaDesa: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Sekretaris Desa</label>
                  <input
                    type="text"
                    value={villageInfo.namaSekretarisDesa}
                    onChange={(e) => onUpdateVillageInfo({ ...villageInfo, namaSekretarisDesa: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor WhatsApp Pelayanan Cepat</label>
                  <input
                    type="text"
                    value={villageInfo.whatsapp}
                    onChange={(e) => onUpdateVillageInfo({ ...villageInfo, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Jam Pelayanan Kantor</label>
                  <input
                    type="text"
                    value={villageInfo.jamPelayanan}
                    onChange={(e) => onUpdateVillageInfo({ ...villageInfo, jamPelayanan: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      StorageService.updateVillageInfo(villageInfo);
                      showNotification('Pengaturan identitas desa berhasil diperbarui!');
                    }}
                    className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0B3D6E] hover:bg-blue-900 rounded-md cursor-pointer"
                  >
                    Simpan Perubahan Pengaturan
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Fallback for other menus (Berita, Pengumuman, PPID) */}
          {['berita', 'pengumuman', 'ppid'].includes(activeMenu) && (
            <div className="space-y-4">
              <div className="border-b border-slate-100 pb-3">
                <h2 className="text-lg font-bold text-slate-900 capitalize">
                  Manajemen {activeMenu}
                </h2>
                <p className="text-xs text-slate-500">Kelola dan publikasikan konten ke portal publik Desa Girimukti</p>
              </div>

              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2 text-xs text-slate-700">
                <p>
                  Seluruh modul konten (Berita, Pengumuman, PPID) telah terhubung dengan basis data lokal terpadu. Data yang Anda buat atau ubah di sini akan langsung tercermin secara instan di portal publik Desa Girimukti.
                </p>
                <button
                  onClick={onBackToPublic}
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#1E6BB8] rounded-md cursor-pointer"
                >
                  Buka Halaman Publik {activeMenu}
                </button>
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};

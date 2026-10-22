import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Download, 
  Printer, 
  ShieldCheck, 
  ChevronRight, 
  ArrowLeft,
  Copy,
  Check
} from 'lucide-react';
import { LetterTemplate, LetterApplication, VillageInfo } from '../../types';
import { StorageService } from '../../services/storage';
import { renderPopulatedText, generateDocxBlob } from '../../services/docxEngine';
import { generateQrCodeDataUrl } from '../../services/qrGenerator';

interface SuratOnlineViewProps {
  templates: LetterTemplate[];
  initialMode?: 'form' | 'lacak';
  villageInfo: VillageInfo;
  onNavigateValidasi: (token: string) => void;
}

export const SuratOnlineView: React.FC<SuratOnlineViewProps> = ({
  templates,
  initialMode = 'form',
  villageInfo,
  onNavigateValidasi
}) => {
  const [activeTab, setActiveTab] = useState<'form' | 'lacak'>(initialMode);
  
  // Form State
  const [selectedTemplate, setSelectedTemplate] = useState<LetterTemplate | null>(null);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [pemohonNama, setPemohonNama] = useState('');
  const [pemohonNik, setPemohonNik] = useState('');
  const [pemohonTelepon, setPemohonTelepon] = useState('');
  const [pemohonAlamat, setPemohonAlamat] = useState('');
  const [lampiranFiles, setLampiranFiles] = useState<{ nama: string; url: string }[]>([]);
  
  // Submission result
  const [submittedApp, setSubmittedApp] = useState<LetterApplication | null>(null);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState('');

  // Tracking State
  const [trackingInput, setTrackingInput] = useState('');
  const [trackedApp, setTrackedApp] = useState<LetterApplication | null>(null);
  const [trackingError, setTrackingError] = useState('');
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>('');

  const activeTemplates = templates.filter(t => t.isActive && t.isPublic);

  const handleSelectTemplate = (tpl: LetterTemplate) => {
    setSelectedTemplate(tpl);
    setFormData({});
    setFormError('');
    setSubmittedApp(null);
  };

  const handleFieldChange = (placeholder: string, val: string) => {
    setFormData(prev => ({ ...prev, [placeholder]: val }));
    // Auto sync core fields
    if (placeholder === '{{nama}}' || placeholder === '{{nama_lengkap}}') {
      setPemohonNama(val);
    }
    if (placeholder === '{{nik}}') {
      setPemohonNik(val);
    }
    if (placeholder === '{{alamat}}') {
      setPemohonAlamat(val);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files).map(file => ({
        nama: file.name,
        url: URL.createObjectURL(file)
      }));
      setLampiranFiles(prev => [...prev, ...files]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;

    if (!pemohonNama.trim()) {
      setFormError('Nama lengkap pemohon wajib diisi.');
      return;
    }

    if (!pemohonNik.trim() || pemohonNik.trim().length < 16) {
      setFormError('NIK harus berupa 16 digit angka sesuai KTP/KK.');
      return;
    }

    if (!pemohonTelepon.trim()) {
      setFormError('Nomor telepon / WhatsApp aktif wajib diisi.');
      return;
    }

    // Verify required template fields
    for (const field of selectedTemplate.fields) {
      if (field.required && !formData[field.placeholder]?.trim()) {
        setFormError(`Kolom "${field.label}" wajib diisi.`);
        return;
      }
    }

    setFormError('');

    const newApp = StorageService.submitLetterApplication({
      templateId: selectedTemplate.id,
      namaSurat: selectedTemplate.nama,
      kodeSurat: selectedTemplate.kodeSurat,
      pemohonNama: pemohonNama.trim(),
      pemohonNik: pemohonNik.trim(),
      pemohonTelepon: pemohonTelepon.trim(),
      pemohonAlamat: pemohonAlamat.trim() || 'Desa Girimukti',
      formData: {
        ...formData,
        '{{nama}}': pemohonNama.trim(),
        '{{nik}}': pemohonNik.trim(),
        '{{alamat}}': pemohonAlamat.trim() || 'Desa Girimukti'
      },
      lampiranFiles: lampiranFiles.length > 0 ? lampiranFiles : [{ nama: 'ktp_pemohon.pdf', url: '#' }]
    });

    setSubmittedApp(newApp);
  };

  const handleSearchTracking = async (e: React.FormEvent) => {
    e.preventDefault();
    setTrackingError('');
    setTrackedApp(null);
    setQrCodeDataUrl('');

    if (!trackingInput.trim()) {
      setTrackingError('Masukkan nomor registrasi permohonan.');
      return;
    }

    const app = StorageService.getApplicationByRegNumber(trackingInput.trim());
    if (!app) {
      setTrackingError('Permohonan dengan nomor registrasi tersebut tidak ditemukan. Mohon periksa kembali.');
      return;
    }

    setTrackedApp(app);

    if (app.verificationToken) {
      const qrUrl = await generateQrCodeDataUrl(
        `${window.location.origin}#validasi-${app.verificationToken}`
      );
      setQrCodeDataUrl(qrUrl);
    }
  };

  const handleCopyReg = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadCompletedDocx = (app: LetterApplication) => {
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Title */}
      <div className="border-b border-slate-200 pb-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-[#1E6BB8] mb-1">
          Pelayanan Administrasi Kependudukan
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Layanan Surat Online Mandiri
        </h1>
        <p className="text-sm text-slate-600 mt-1">
          Masyarakat Desa Girimukti dapat mengajukan permohonan surat keterangan resmi secara mandiri tanpa antre di kantor balai desa.
        </p>

        {/* Tab Selector: Pengajuan vs Lacak */}
        <div className="flex items-center gap-3 mt-6">
          <button
            onClick={() => setActiveTab('form')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'form'
                ? 'bg-[#0B3D6E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Buat Permohonan Baru
          </button>
          <button
            onClick={() => setActiveTab('lacak')}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              activeTab === 'lacak'
                ? 'bg-[#0B3D6E] text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Lacak Status Permohonan
          </button>
        </div>
      </div>

      {/* TAB 1: FORM PENGAJUAN */}
      {activeTab === 'form' && (
        <div>
          {/* Submission Success Screen */}
          {submittedApp ? (
            <div className="max-w-2xl mx-auto bg-white rounded-xl border border-emerald-200 p-8 shadow-md text-center space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Permohonan Berhasil Dikirim!</h2>
                <p className="text-sm text-slate-600">
                  Permohonan <strong>{submittedApp.namaSurat}</strong> Anda telah masuk ke sistem antrean pelayanan Desa Girimukti.
                </p>
              </div>

              {/* Registration Box */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <span className="text-xs font-semibold text-slate-500 uppercase">
                  Nomor Registrasi Lacak Berkas
                </span>
                <div className="flex items-center justify-center gap-3">
                  <span className="text-xl sm:text-2xl font-extrabold text-[#0B3D6E] font-mono tracking-wider">
                    {submittedApp.nomorRegistrasi}
                  </span>
                  <button
                    onClick={() => handleCopyReg(submittedApp.nomorRegistrasi)}
                    className="p-1.5 text-slate-500 hover:text-slate-800 rounded bg-white border border-slate-200 cursor-pointer"
                    title="Salin nomor registrasi"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-xs text-slate-500">
                  Simpan nomor registrasi ini untuk memeriksa perkembangan proses surat Anda.
                </p>
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => {
                    setActiveTab('lacak');
                    setTrackingInput(submittedApp.nomorRegistrasi);
                    setTrackedApp(submittedApp);
                  }}
                  className="px-5 py-2.5 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-lg transition-colors cursor-pointer"
                >
                  Lacak Status Sekarang
                </button>
                <button
                  onClick={() => {
                    setSubmittedApp(null);
                    setSelectedTemplate(null);
                  }}
                  className="px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                >
                  Ajukan Surat Lain
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* Step 1: Choose Template */}
              {!selectedTemplate ? (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">Pilih Jenis Surat yang Dibutuhkan</h2>
                    <p className="text-xs text-slate-500">Silakan pilih jenis dokumen surat resmi berikut ini:</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {activeTemplates.map((tpl) => (
                      <div
                        key={tpl.id}
                        onClick={() => handleSelectTemplate(tpl)}
                        className="bg-white rounded-xl border border-slate-200 p-6 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group"
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-[#1E6BB8] bg-blue-50 px-2 py-0.5 rounded font-mono">
                              Kode: {tpl.kodeSurat}
                            </span>
                            <span className="text-xs text-slate-400">
                              {tpl.fields.length} Isian Formulir
                            </span>
                          </div>

                          <h3 className="text-base font-bold text-slate-900 group-hover:text-[#1E6BB8] transition-colors">
                            {tpl.nama}
                          </h3>

                          <p className="text-xs text-slate-600 leading-relaxed">
                            {tpl.deskripsi}
                          </p>

                          {/* Requirements list */}
                          <div className="pt-2 border-t border-slate-100">
                            <span className="text-[11px] font-semibold text-slate-700 block mb-1.5">
                              Persyaratan Berkas:
                            </span>
                            <ul className="space-y-1 text-xs text-slate-500">
                              {tpl.persyaratan.map((req, rIdx) => (
                                <li key={rIdx} className="flex items-center gap-1.5">
                                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
                                  <span>{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-[#1E6BB8] font-semibold">
                          <span>Isi Formulir Surat</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                /* Step 2: Dynamic Form Builder Generated from Template Placeholders */
                <div className="max-w-3xl mx-auto bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-xs font-semibold text-[#1E6BB8] uppercase">
                        Formulir Permohonan
                      </span>
                      <h2 className="text-xl font-bold text-slate-900">{selectedTemplate.nama}</h2>
                    </div>
                    <button
                      type="button"
                      onClick={() => setSelectedTemplate(null)}
                      className="text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      <span>Ganti Surat</span>
                    </button>
                  </div>

                  {formError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-700 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Basic Applicant Info */}
                    <div className="p-4 bg-slate-50 rounded-lg space-y-4">
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Data Identitas Pemohon
                      </h3>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nama Lengkap Sesuai KTP <span className="text-rose-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={pemohonNama}
                            onChange={(e) => {
                              setPemohonNama(e.target.value);
                              setFormData(prev => ({ ...prev, '{{nama}}': e.target.value }));
                            }}
                            placeholder="Contoh: Budi Santoso"
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
                            value={pemohonNik}
                            onChange={(e) => {
                              setPemohonNik(e.target.value);
                              setFormData(prev => ({ ...prev, '{{nik}}': e.target.value }));
                            }}
                            placeholder="360214..."
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white font-mono focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nomor WhatsApp / Telepon Aktif <span className="text-rose-600">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            value={pemohonTelepon}
                            onChange={(e) => setPemohonTelepon(e.target.value)}
                            placeholder="08123456789"
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Alamat Tinggal di Girimukti <span className="text-rose-600">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={pemohonAlamat}
                            onChange={(e) => {
                              setPemohonAlamat(e.target.value);
                              setFormData(prev => ({ ...prev, '{{alamat}}': e.target.value }));
                            }}
                            placeholder="RT 02 / RW 01, Dusun Girimekar"
                            className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Specific Dynamic Fields Mapped from DOCX Template */}
                    <div className="space-y-4">
                      <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
                        Rincian Isian Surat ({selectedTemplate.kodeSurat})
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {selectedTemplate.fields
                          .filter(f => !['{{nama}}', '{{nik}}', '{{alamat}}'].includes(f.placeholder))
                          .map((field) => (
                            <div 
                              key={field.placeholder} 
                              className={field.dataType === 'textarea' ? 'sm:col-span-2' : ''}
                            >
                              <label className="block text-xs font-semibold text-slate-700 mb-1">
                                {field.label} {field.required && <span className="text-rose-600">*</span>}
                              </label>

                              {field.dataType === 'select' ? (
                                <select
                                  value={formData[field.placeholder] || ''}
                                  onChange={(e) => handleFieldChange(field.placeholder, e.target.value)}
                                  required={field.required}
                                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                                >
                                  <option value="">-- Pilih {field.label} --</option>
                                  {field.options?.map((opt) => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </select>
                              ) : field.dataType === 'textarea' ? (
                                <textarea
                                  rows={2}
                                  value={formData[field.placeholder] || ''}
                                  onChange={(e) => handleFieldChange(field.placeholder, e.target.value)}
                                  required={field.required}
                                  placeholder={field.placeholderText || ''}
                                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                                />
                              ) : (
                                <input
                                  type={field.dataType === 'number' ? 'number' : 'text'}
                                  value={formData[field.placeholder] || ''}
                                  onChange={(e) => handleFieldChange(field.placeholder, e.target.value)}
                                  required={field.required}
                                  placeholder={field.placeholderText || ''}
                                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
                                />
                              )}

                              {field.helpText && (
                                <p className="text-[11px] text-slate-400 mt-1">{field.helpText}</p>
                              )}
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Attachment Upload */}
                    <div className="p-4 border border-dashed border-slate-300 rounded-lg space-y-2">
                      <label className="block text-xs font-semibold text-slate-700">
                        Unggah Dokumen Pendukung (Foto KTP / KK / Bukti Usaha)
                      </label>
                      <input
                        type="file"
                        multiple
                        onChange={handleFileUpload}
                        className="block w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-[#1E6BB8] hover:file:bg-blue-100 cursor-pointer"
                      />
                      <p className="text-[11px] text-slate-400">
                        Format file: JPG, PNG, atau PDF. Maksimal 5 MB per berkas.
                      </p>
                      {lampiranFiles.length > 0 && (
                        <div className="pt-2 flex flex-wrap gap-2">
                          {lampiranFiles.map((f, fIdx) => (
                            <span key={fIdx} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                              {f.nama}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
                      <button
                        type="button"
                        onClick={() => setSelectedTemplate(null)}
                        className="px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-100 rounded-md cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-md transition-colors cursor-pointer"
                      >
                        Kirim Permohonan Surat
                      </button>
                    </div>

                  </form>
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LACAK STATUS PERMOHONAN */}
      {activeTab === 'lacak' && (
        <div className="max-w-3xl mx-auto space-y-8">
          
          {/* Tracking Form Input */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-slate-900">Masukkan Nomor Registrasi Permohonan</h2>
            <p className="text-xs text-slate-500">
              Contoh: <span className="font-mono font-semibold text-[#1E6BB8]">REG-2026-SKU-0024</span>
            </p>

            <form onSubmit={handleSearchTracking} className="flex gap-2">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="REG-2026-..."
                className="flex-1 px-4 py-2.5 text-sm border border-slate-300 rounded-lg bg-white uppercase font-mono focus:outline-hidden focus:ring-2 focus:ring-[#1E6BB8]"
              />
              <button
                type="submit"
                className="px-6 py-2.5 text-xs font-semibold text-white bg-[#1E6BB8] hover:bg-[#0B3D6E] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                Cari Berkas
              </button>
            </form>

            {trackingError && (
              <p className="text-xs text-rose-600 font-medium">{trackingError}</p>
            )}
          </div>

          {/* Tracked Result Details */}
          {trackedApp && (
            <div className="bg-white rounded-xl border border-slate-200 p-6 sm:p-8 space-y-6 shadow-md">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold font-mono text-[#1E6BB8]">
                    {trackedApp.nomorRegistrasi}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">{trackedApp.namaSurat}</h3>
                </div>

                {/* Status Badge */}
                <div className="self-start sm:self-auto">
                  {trackedApp.status === 'selesai' && (
                    <span className="px-3 py-1 text-xs font-bold text-emerald-800 bg-emerald-100 rounded-full flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Surat Telah Diterbitkan (Selesai)</span>
                    </span>
                  )}
                  {trackedApp.status === 'sedang_diproses' && (
                    <span className="px-3 py-1 text-xs font-bold text-blue-800 bg-blue-100 rounded-full flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Sedang Diproses Operator</span>
                    </span>
                  )}
                  {trackedApp.status === 'diajukan' && (
                    <span className="px-3 py-1 text-xs font-bold text-amber-800 bg-amber-100 rounded-full flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Menunggu Pemeriksaan Berkas</span>
                    </span>
                  )}
                  {trackedApp.status === 'ditolak' && (
                    <span className="px-3 py-1 text-xs font-bold text-rose-800 bg-rose-100 rounded-full flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Permohonan Ditolak</span>
                    </span>
                  )}
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="py-2">
                <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600 mb-2">
                  <span>1. Diajukan</span>
                  <span>2. Verifikasi Data</span>
                  <span>3. Penandatanganan Kades</span>
                  <span>4. Diterbitkan</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-[#1E6BB8] h-full transition-all duration-500"
                    style={{
                      width: trackedApp.status === 'selesai'
                        ? '100%'
                        : trackedApp.status === 'sedang_diproses'
                        ? '65%'
                        : '25%'
                    }}
                  />
                </div>
              </div>

              {/* Applicant Info Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 block">Nama Pemohon:</span>
                  <span className="font-semibold text-slate-800">{trackedApp.pemohonNama}</span>
                </div>
                <div className="p-3 bg-slate-50 rounded-lg">
                  <span className="text-slate-400 block">Tanggal Pengajuan:</span>
                  <span className="font-semibold text-slate-800">{trackedApp.tanggalPengajuan}</span>
                </div>
                {trackedApp.nomorSuratResmi && (
                  <div className="p-3 bg-blue-50 rounded-lg sm:col-span-2">
                    <span className="text-slate-500 block">Nomor Surat Resmi:</span>
                    <span className="font-mono font-bold text-[#0B3D6E] text-sm">
                      {trackedApp.nomorSuratResmi}
                    </span>
                  </div>
                )}
                {trackedApp.catatanPetugas && (
                  <div className="p-3 bg-amber-50 rounded-lg sm:col-span-2 text-amber-900">
                    <span className="font-semibold block mb-0.5">Catatan Petugas Desa:</span>
                    <span>{trackedApp.catatanPetugas}</span>
                  </div>
                )}
              </div>

              {/* If Finished: Provide download and QR validation */}
              {trackedApp.status === 'selesai' && (
                <div className="p-5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-4">
                  <div className="flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-700 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-emerald-950">
                        Dokumen Sah Siap Diambil / Diunduh
                      </h4>
                      <p className="text-xs text-emerald-800">
                        Surat resmi telah ditandatangani oleh {trackedApp.pejabatPenandatangan?.jabatan || 'Kepala Desa Girimukti'} dan memiliki token verifikasi digital yang sah.
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-3 border-t border-emerald-200">
                    {/* QR Code preview */}
                    {qrCodeDataUrl && (
                      <div className="flex items-center gap-3 bg-white p-2 rounded-lg border border-emerald-200">
                        <img src={qrCodeDataUrl} alt="QR Code Verifikasi" className="w-16 h-16" />
                        <div className="text-[11px] text-slate-600">
                          <span className="font-bold text-slate-800 block">QR Code Keaslian</span>
                          <span className="font-mono text-emerald-700">{trackedApp.verificationToken}</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDownloadCompletedDocx(trackedApp)}
                        className="px-4 py-2.5 text-xs font-semibold text-white bg-[#0B3D6E] hover:bg-blue-900 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Unduh File DOCX</span>
                      </button>

                      {trackedApp.verificationToken && (
                        <button
                          onClick={() => onNavigateValidasi(trackedApp.verificationToken!)}
                          className="px-3 py-2.5 text-xs font-medium text-emerald-800 bg-white border border-emerald-300 hover:bg-emerald-50 rounded-lg flex items-center gap-1 cursor-pointer"
                        >
                          <span>Cek Validasi</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

            </div>
          )}

        </div>
      )}

    </div>
  );
};

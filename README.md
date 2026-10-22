# Website dan Sistem Informasi Desa Girimukti

Portal Resmi dan Sistem Informasi Terpadu Pemerintah Desa Girimukti, Kecamatan Cimarga, Kabupaten Lebak, Provinsi Banten.

Aplikasi ini dibangun untuk menyajikan transparansi penyelenggaraan pemerintahan desa, mempermudah masyarakat dalam memperoleh pelayanan administrasi surat mandiri secara online, mempublikasikan keterbukaan APBDes secara akuntabel, serta memberikan kemudahan bagi perangkat desa dalam pengelolaan konten dan pelayanan administrasi.

---

## 🏛 Identitas Pemerintahan
- **Desa**: Girimukti
- **Kecamatan**: Cimarga
- **Kabupaten**: Lebak
- **Provinsi**: Banten
- **Negara**: Indonesia
- **Kode Wilayah**: 36.02.14.2008
- **Kode Pos**: 42361
- **Zona Waktu**: Asia/Jakarta (WIB)
- **Mata Uang**: Rupiah (IDR)

---

## 🚀 Fitur Unggulan

### 1. Portal Publik Desa
- **Beranda Resmi**: Foto lanskap otentik Desa Girimukti, sambutan Kepala Desa, statistik penduduk terverifikasi, warta terkini, agenda, dan potensi komoditas (padi sawah & gula aren Lebak).
- **Profil Desa Lengkap**: Sejarah asal-usul kata Giri-Mukti, Visi & Misi 2022-2028, struktur perangkat desa, kelembagaan (BPD, LPMD, PKK, Karang Taruna), geografis, dan peta digital interaktif.
- **Warta & Publikasi**: Berita kegiatan desa dengan kategori, waktu baca, penayangan, tombol bagikan, pengumuman surat edaran resmi dengan status aktif/kedaluwarsa, dan agenda kegiatan.
- **Pusat Dokumentasi Galeri**: Dokumentasi foto kegiatan dan video pembangunan desa dilengkapi penampil lightbox.
- **Transparansi APBDes**: Grafik perbandingan pendapatan dan realisasi belanja per bidang resmi (Permendagri No. 20/2018), tabel hierarki kode rekening, dan dokumen pelaksanaan anggaran.
- **Layanan Pengaduan Warga**: Formulir aspirasi dan pengaduan dengan nomor tiket tracking otomatis (`PGD-2026-XXXX`), opsi privasi pelapor, dan riwayat tanggapan petugas desa.
- **PPID (Keterbukaan Informasi Publik)**: Daftar Informasi Publik (Berkala, Serta Merta, Setiap Saat) dan formulir permohonan informasi publik (UU KIP No. 14/2008).
- **Pengecekan Bantuan Sosial Terlindung**: Dua mekanisme pengecekan bansos sesuai UU PDP No. 27/2022 (Tautan resmi Kemensos RI & konsultasi terlindung desa).
- **Pengecekan & Konsultasi PBB-P2**: Panduan pembayaran pajak daerah Bapenda Kab. Lebak dan formulir konfirmasi ketetapan SPPT PBB desa.
- **Pencarian Global Instan**: Menemukan berita, pengumuman, agenda, dan dokumen publik secara cepat.

### 2. Generator Surat Online Berbasis DOCX (Fitur Marquee)
- **Pengajuan Mandiri Warga**: Warga memilih jenis surat (SKU, SKD, SKTM, Pengantar SKCK), mengisi formulir dinamis yang otomatis dibentuk dari placeholder dokumen, mengunggah kartu identitas, dan menerima Nomor Registrasi unik (`REG-2026-XXXX`).
- **Pelacakan Status Berkas**: Warga dapat memantau proses secara transparan dari status *Diajukan* $\rightarrow$ *Verifikasi* $\rightarrow$ *Penandatanganan Kades* $\rightarrow$ *Selesai*.
- **Penerbitan Dokumen Otomatis**: Operator desa menetapkan nomor surat resmi berurutan secara transaksional (`503/024/Ds-Grm/X/2026`), menyetujui, dan mengunduh berkas `.docx` yang telah terisi lengkap.
- **Validasi Keaslian Surat (QR Code)**: Setiap surat resmi yang diterbitkan memiliki Token Verifikasi unik dan QR Code. Siapa pun dapat memindai QR code atau memasukkan token di portal `/validasi/[token]` untuk membuktikan keaslian dokumen tanpa membocorkan NIK dan data rahasia warga.

### 3. Dashboard Administrasi Terpadu (`/admin`)
- **Autentikasi & Multi-Role RBAC**: Mendukung peran Administrator Sistem, Operator Desa, Petugas Pelayanan, Pengelola Keuangan, dan Pejabat Penyetuju (Sekdes/Kades).
- **Pengelolaan Template Surat**: Unggah file `.docx` baru, inspeksi placeholder otomatis (`{{nama}}`, `{{nik}}`, `{{alamat}}`), atur jenis isian formulir, dan lakukan uji cetak langsung.
- **Pengelolaan APBDes**: Input anggaran pendapatan, belanja 5 bidang, pembiayaan, verifikasi persentase realisasi, dan simulasi ekspor/impor CSV.
- **Pusat Tindak Lanjut Aduan**: Tanggapi laporan masyarakat dan ubah status penanganan.
- **Audit Trail & Log Keamanan**: Mencatat setiap aktivitas penting sistem beserta stempel waktu dan identitas pelaksana.
- **Pengaturan Desa Tanpa Koding**: Mengubah nama pejabat, kontak WhatsApp pelayanan, jam kerja kantor, dan identitas desa secara dinamis.

---

## 🛠 Teknologi yang Digunakan
- **Frontend**: React 19, TypeScript, Tailwind CSS v4, Lucide Icons, Recharts, PizZip, Docxtemplater, QRCode.
- **Backend / Runtime**: Node.js, Express, TSX, Vite.
- **Database Architecture**: Relational schema (PostgreSQL ready), transactional sequence allocations, and local persistent state.
- **Design System**: Government Clean Minimalist, WCAG AA contrast compliance, responsive mobile-first.

---

## 📜 Kepatuhan Regulasi Pemerintahan
1. **UU No. 6 Tahun 2014 & UU No. 3 Tahun 2024** tentang Desa.
2. **UU No. 14 Tahun 2008** tentang Keterbukaan Informasi Publik.
3. **UU No. 27 Tahun 2022** tentang Pelindungan Data Pribadi (PDP).
4. **Permendagri No. 20 Tahun 2018** tentang Pengelolaan Keuangan Desa.
5. **Perpres No. 95 Tahun 2018** tentang Sistem Pemerintahan Berbasis Elektronik (SPBE).

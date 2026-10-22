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
  AuditLog
} from '../types';

export const initialVillageInfo: VillageInfo = {
  namaDesa: 'Girimukti',
  kecamatan: 'Cimarga',
  kabupaten: 'Lebak',
  provinsi: 'Banten',
  kodePos: '42361',
  kodeWilayah: '36.02.14.2008',
  alamatKantor: 'Jl. Raya Cimarga - Leuwidamar Km. 4, Desa Girimukti, Kec. Cimarga, Kab. Lebak, Banten 42361',
  telepon: '(0252) 280142',
  whatsapp: '0813-8822-4190',
  email: 'pemdes.girimukti@lebakkab.go.id',
  jamPelayanan: 'Senin - Jumat: 08.00 - 15.30 WIB',
  namaKepalaDesa: 'H. Asep Mulyana',
  namaSekretarisDesa: 'Ahmad Fauzi, S.AP',
  koordinat: {
    lat: -6.4428,
    lng: 106.2319
  },
  luasWilayah: '1.248,50 Ha',
  jumlahPenduduk: 4382,
  jumlahKK: 1294,
  jumlahRT: 16,
  jumlahRW: 4,
  jumlahDusun: 4,
  visi: 'Terwujudnya Desa Girimukti yang Maju, Mandiri, Agamis, Sejahtera, dan Berkeadilan Berbasis Pertanian dan Kearifan Lokal',
  misi: [
    'Meningkatkan tata kelola pemerintahan desa yang bersih, transparan, akuntabel, dan berbasis teknologi informasi.',
    'Meningkatkan kualitas pelayanan publik dan administrasi kependudukan yang cepat, tepat, dan ramah masyarakat.',
    'Meningkatkan pembangunan infrastruktur perdesaan, jalan usaha tani, dan fasilitas umum yang merata dan berkelanjutan.',
    'Mengembangkan potensi ekonomi desa melalui penguatan sektor pertanian, perkebunan aren, peternakan, dan UMKM desa.',
    'Mewujudkan kehidupan masyarakat yang agamis, berbudaya, sehat, cerdas, dan menjunjung tinggi gotong royong.'
  ],
  sejarahSingkat: 'Desa Girimukti merupakan salah satu desa di Kecamatan Cimarga, Kabupaten Lebak, Banten. Nama Girimukti berasal dari kata "Giri" yang bermakna bukit atau dataran tinggi yang asri, dan "Mukti" yang bermakna kemakmuran dan keberkahan hidup. Sejak berdiri, masyarakat Girimukti dikenal gigih dalam mengolah lahan pertanian padi dan komoditas unggulan seperti gula aren khas Cimarga, serta menjunjung tinggi musyawarah dan gotong royong.',
  sambutanKades: 'Puji dan syukur kita panjatkan ke hadirat Allah SWT atas rahmat dan karunia-Nya. Selamat datang di Website Resmi dan Sistem Informasi Desa Girimukti, Kecamatan Cimarga, Kabupaten Lebak. Portal ini hadir sebagai wujud nyata komitmen kami terhadap keterbukaan informasi publik (KIP), transparansi pengelolaan APBDes, serta kemudahan pelayanan administrasi surat menyurat secara mandiri dan cepat bagi seluruh warga masyarakat Desa Girimukti. Mari bersama kita bangun desa kita tercinta dengan kejujuran, semangat gotong royong, dan kemajuan yang bermartabat.'
};

export const initialOfficials: VillageOfficial[] = [
  {
    id: 'off-1',
    nama: 'H. Asep Mulyana',
    jabatan: 'Kepala Desa',
    nip: '-',
    bidang: 'Pimpinan Pemerintahan Desa',
    urutan: 1,
    status: 'aktif'
  },
  {
    id: 'off-2',
    nama: 'Ahmad Fauzi, S.AP',
    jabatan: 'Sekretaris Desa',
    nip: '19840512 201001 1 018',
    bidang: 'Sekretariat & Administrasi Umum',
    urutan: 2,
    status: 'aktif'
  },
  {
    id: 'off-3',
    nama: 'Dedi Kusnadi, S.Kom',
    jabatan: 'Kaur Perencanaan & TI',
    bidang: 'Perencanaan Pembangunan & Data',
    urutan: 3,
    status: 'aktif'
  },
  {
    id: 'off-4',
    nama: 'Siti Rahmawati, S.E',
    jabatan: 'Kaur Keuangan (Bendahara Desa)',
    bidang: 'Pengelolaan Keuangan & APBDes',
    urutan: 4,
    status: 'aktif'
  },
  {
    id: 'off-5',
    nama: 'Nana Suryana',
    jabatan: 'Kaur Tata Usaha & Umum',
    bidang: 'Surat Menyurat & Arsip',
    urutan: 5,
    status: 'aktif'
  },
  {
    id: 'off-6',
    nama: 'Jaka Permana',
    jabatan: 'Kasi Pemerintahan',
    bidang: 'Kependudukan & Pertanahan',
    urutan: 6,
    status: 'aktif'
  },
  {
    id: 'off-7',
    nama: 'Hendra Suhendar',
    jabatan: 'Kasi Kesejahteraan',
    bidang: 'Sosial, Pertanian & Pemberdayaan',
    urutan: 7,
    status: 'aktif'
  },
  {
    id: 'off-8',
    nama: 'Encep Ridwan',
    jabatan: 'Kasi Pelayanan',
    bidang: 'Pelayanan Publik & Pembinaan',
    urutan: 8,
    status: 'aktif'
  }
];

export const initialInstitutions: VillageInstitution[] = [
  {
    id: 'inst-1',
    nama: 'Badan Permusyawaratan Desa',
    singkatan: 'BPD',
    ketua: 'Drs. H. Maman Sulaeman',
    deskripsi: 'Lembaga perwujudan demokrasi dalam penyelenggaraan pemerintahan desa, menampung aspirasi masyarakat dan mengawasi jalannya pemerintahan desa.',
    jumlahAnggota: 7,
    alamat: 'Ruang BPD Balai Desa Girimukti'
  },
  {
    id: 'inst-2',
    nama: 'Lembaga Pemberdayaan Masyarakat',
    singkatan: 'LPMD',
    ketua: 'Rahmat Hidayat',
    deskripsi: 'Wadah yang dibentuk atas prakarsa masyarakat untuk membantu pemerintah desa dalam perencanaan dan pelaksanaan pembangunan.',
    jumlahAnggota: 12,
    alamat: 'Sekretariat LPM Desa Girimukti'
  },
  {
    id: 'inst-3',
    nama: 'Tim Penggerak PKK Desa Girimukti',
    singkatan: 'TP-PKK',
    ketua: 'Hj. Nani Maryani',
    deskripsi: 'Gerakan pembangunan masyarakat yang tumbuh dari bawah dengan wanita sebagai penggeraknya menuju terwujudnya keluarga bahagia dan sejahtera.',
    jumlahAnggota: 24,
    alamat: 'Gedung PKK Desa Girimukti'
  },
  {
    id: 'inst-4',
    nama: 'Karang Taruna Tunas Girimukti',
    singkatan: 'Karang Taruna',
    ketua: 'Fajar Nugraha',
    deskripsi: 'Organisasi kepemudaan desa pembina generasi muda dalam mengembangkan kreativitas, olahraga, kebudayaan, dan kepedulian sosial.',
    jumlahAnggota: 35,
    alamat: 'Pusat Kreativitas Pemuda Girimukti'
  }
];

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    slug: 'musrenbangdes-girimukti-penetapan-rkpdes-2026',
    judul: 'Musrenbangdes Girimukti: Penetapan RKPDes 2026 Prioritaskan Jalan Usaha Tani dan Irigasi',
    ringkasan: 'Pemerintah Desa Girimukti bersama BPD, tokoh masyarakat, dan unsur perwakilan perempuan sukses menggelar Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes).',
    konten: `Musyawarah Perencanaan Pembangunan Desa (Musrenbangdes) tahun anggaran 2026 Desa Girimukti berlangsung tertib dan khidmat di Balai Pertemuan Desa Girimukti, Kecamatan Cimarga, Kabupaten Lebak.\n\nDalam musyawarah tersebut, Kepala Desa Girimukti, H. Asep Mulyana, memaparkan fokus penganggaran yang diarahkan pada peningkatan akses jalan usaha tani sepanjang 1,8 kilometer di Dusun Girimekar, revitalisasi saluran irigasi tersier persawahan warga, dan optimalisasi sarana digital desa untuk pelayanan masyarakat.\n\n"Pembangunan infrastruktur pertanian adalah kunci kemakmuran warga Girimukti yang mayoritas merupakan petani padi dan perajin aren. Kami berterima kasih atas seluruh masukan aspirasi RT, RW, dan BPD," ujar H. Asep Mulyana.\n\nKegiatan ini dihadiri langsung oleh Tim Pendamping Desa Kecamatan Cimarga, perwakilan Bapenda Lebak, Babinsa, Bhabinkamtibmas, serta segenap pengurus kelembagaan desa. Seluruh rincian hasil penetapan akan dipublikasikan secara terbuka di portal transparansi website desa.`,
    kategori: 'Pembangunan',
    tags: ['Musrenbangdes', 'RKPDes 2026', 'Jalan Usaha Tani', 'Cimarga Lebak'],
    gambarUrl: '/src/assets/images/kantor_desa_girimukti_1792455334615.jpg',
    penulis: 'Dedi Kusnadi (Kaur Perencanaan)',
    tanggalPublikasi: '18 Oktober 2026',
    views: 342,
    status: 'terbit'
  },
  {
    id: 'news-2',
    slug: 'panen-raya-padi-organik-dan-pelatihan-kemasan-gula-aren-lebak',
    judul: 'Panen Raya Padi Organik dan Pelatihan Modernisasi Kemasan Produk Gula Aren Cimarga',
    ringkasan: 'Kelompok Tani Mukti Mandiri bersama PKK Desa Girimukti menggelar panen raya padi sawah dan meluncurkan kemasan baru gula aren batok dan semut bernilai jual tinggi.',
    konten: `Desa Girimukti kembali membuktikan ketahanan pangan desa dengan terselenggaranya Panen Raya Padi Organik musim tanam kedua di hamparan sawah Dusun Girijaya seluas 45 hektare.\n\nSelain padi, potensi unggulan getah nira aren khas Cimarga mendapatkan sentuhan modern melalui pelatihan pengemasan higienis dan sertifikasi pangan industri rumah tangga (PIRT). Melalui bantuan pembinaan BUMDes Mukti Mandiri, gula aren Girimukti kini dikemas dengan merek desa dan barcode lacak asal produksi.\n\nKetua TP-PKK Hj. Nani Maryani menyatakan bahwa program hilirisasi ini menambah nilai tambah ekonomi keluarga petani hingga 30 persen dibanding penjualan mentah ke tengkulak.`,
    kategori: 'Pertanian',
    tags: ['Panen Raya', 'Gula Aren Lebak', 'Ketahanan Pangan', 'BUMDes'],
    gambarUrl: '/src/assets/images/potensi_desa_pertanian_1792455334010.jpg',
    penulis: 'Hendra Suhendar (Kasi Kesejahteraan)',
    tanggalPublikasi: '12 Oktober 2026',
    views: 489,
    status: 'terbit'
  },
  {
    id: 'news-3',
    slug: 'pencanangan-layanan-surat-digital-mandiri-desa-girimukti',
    judul: 'Pencanangan Layanan Pengajuan Surat Online Mandiri untuk Seluruh Warga Desa Girimukti',
    ringkasan: 'Masyarakat kini dapat mengajukan Surat Keterangan Usaha, Domisili, dan Pengantar lainnya langsung melalui ponsel tanpa antre panjang di kantor desa.',
    konten: `Langkah maju diambil Pemerintah Desa Girimukti dalam modernisasi pelayanan publik desa. Mulai Oktober 2026, sistem layanan surat online resmi dibuka untuk masyarakat umum.\n\nDengan sistem berbasis template terstandar, warga cukup memilih jenis surat, mengisi identitas yang diperlukan, dan mengunggah kartu identitas. Operator desa akan langsung memeriksa dan mencetak nomor surat resmi serta QR Code validasi keaslian dokumen.\n\nWarga dapat melacak status secara langsung menggunakan Nomor Registrasi yang diterbitkan. Bagi warga lansia atau yang membutuhkan bantuan, pos pelayanan mandiri di balai desa tetap menyediakan petugas pendamping.`,
    kategori: 'Pemerintahan',
    tags: ['Surat Online', 'Digitalisasi Desa', 'Pelayanan Cepat', 'Keterbukaan Publik'],
    gambarUrl: '/src/assets/images/hero_desa_girimukti_1792455333620.jpg',
    penulis: 'Ahmad Fauzi, S.AP (Sekretaris Desa)',
    tanggalPublikasi: '05 Oktober 2026',
    views: 615,
    status: 'terbit'
  }
];

export const initialAnnouncements: AnnouncementItem[] = [
  {
    id: 'ann-1',
    judul: 'Pelayanan Perekaman KTP Elektronik & Aktivasi IKD Keliling Disdukcapil di Balai Desa Girimukti',
    isi: 'Diberitahukan kepada seluruh warga Desa Girimukti bahwa tim Disdukcapil Kabupaten Lebak akan mengadakan jemput bola perekaman KTP-el pemula dan aktivasi Identitas Kependudukan Digital (IKD) pada hari Rabu, 28 Oktober 2026 di Aula Kantor Balai Desa Girimukti mulai pukul 08.30 WIB.',
    tanggalTerbit: '19 Oktober 2026',
    berlakuSampai: '28 Oktober 2026',
    isPenting: true,
    lampiranNama: 'Jadwal_IKD_Disdukcapil_Girimukti.pdf',
    lampiranUrl: '#',
    status: 'aktif'
  },
  {
    id: 'ann-2',
    judul: 'Jadwal Penyaluran Bantuan Pangan Beras Cadangan Pangan Pemerintah (CPP) Tahap IV',
    isi: 'Penyaluran beras bantuan pangan CPP alokasi tahap IV bagi Keluarga Penerima Manfaat (KPM) terdaftar akan dibagikan pada hari Jumat, 24 Oktober 2026. Harap membawa Surat Undangan barcode resmi dan KTP asli/fotokopi KK.',
    tanggalTerbit: '15 Oktober 2026',
    berlakuSampai: '25 Oktober 2026',
    isPenting: true,
    lampiranNama: 'Daftar_Jadwal_Pengambilan_CPP.pdf',
    lampiranUrl: '#',
    status: 'aktif'
  },
  {
    id: 'ann-3',
    judul: 'Batas Akhir Konfirmasi Pembayaran dan Konsultasi SPPT PBB-P2 Tahun 2026',
    isi: 'Mengingatkan warga wajib pajak PBB di wilayah Desa Girimukti bahwa masa jatuh tempo pembayaran PBB-P2 Kabupaten Lebak tahun 2026 semakin dekat. Silakan berkonsultasi dengan kolektor pajak RT/RW atau petugas di kantor desa.',
    tanggalTerbit: '01 Oktober 2026',
    berlakuSampai: '30 November 2026',
    isPenting: false,
    lampiranNama: 'Edaran_PBB_P2_Kecamatan_Cimarga.pdf',
    lampiranUrl: '#',
    status: 'aktif'
  }
];

export const initialAgendas: AgendaItem[] = [
  {
    id: 'agd-1',
    judul: 'Penyuluhan Pertanian & Pengendalian Hama Wereng Terpadu',
    deskripsi: 'Pertemuan bulanan gabungan kelompok tani (Gapoktan) bersama Penyuluh Pertanian Lapangan (PPL) BPP Cimarga.',
    tanggalMulai: '22 Oktober 2026',
    waktuMulai: '09:00 - 12:00 WIB',
    lokasi: 'Balai Pertemuan Kelompok Tani Girimekar',
    penyelenggara: 'Kasi Kesejahteraan & BPP Cimarga',
    status: 'mendatang'
  },
  {
    id: 'agd-2',
    judul: 'Kegiatan Posyandu Balita & Lansia "Melati Indah"',
    deskripsi: 'Pemeriksaan kesehatan rutin, penimbangan berat badan, imunisasi balita, dan pemberian makanan tambahan (PMT) bergizi.',
    tanggalMulai: '25 Oktober 2026',
    waktuMulai: '08:30 - 11:30 WIB',
    lokasi: 'Posyandu Dusun 2 Desa Girimukti',
    penyelenggara: 'Bidan Desa & Kader Posyandu PKK',
    status: 'mendatang'
  },
  {
    id: 'agd-3',
    judul: 'Gotong Royong Kebersihan Saluran Air & Drainase Lingkungan',
    deskripsi: 'Kerja bakti serentak warga dalam rangka antisipasi musim hujan dan pencegahan genangan air di bahu jalan desa.',
    tanggalMulai: '01 November 2026',
    waktuMulai: '07:00 - 10:00 WIB',
    lokasi: 'Seluruh Wilayah RT/RW Desa Girimukti',
    penyelenggara: 'Pemerintah Desa & Karang Taruna',
    status: 'mendatang'
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    judul: 'Pemandangan Lanskap Persawahan dan Perbukitan Asri Desa Girimukti',
    kategori: 'Kegiatan Desa',
    tipe: 'foto',
    mediaUrl: '/src/assets/images/hero_desa_girimukti_1792455333620.jpg',
    thumbnailUrl: '/src/assets/images/hero_desa_girimukti_1792455333620.jpg',
    tanggal: 'Oktober 2026',
    deskripsi: 'Keindahan alam pedesaan Girimukti dengan kontur persawahan bertingkat dan keramahan warga tani.'
  },
  {
    id: 'gal-2',
    judul: 'Gedung Pelayanan Kantor Balai Desa Girimukti yang Tertata Rapi',
    kategori: 'Kegiatan Desa',
    tipe: 'foto',
    mediaUrl: '/src/assets/images/kantor_desa_girimukti_1792455334615.jpg',
    thumbnailUrl: '/src/assets/images/kantor_desa_girimukti_1792455334615.jpg',
    tanggal: 'Oktober 2026',
    deskripsi: 'Suasana halaman dan kantor balai desa siap melayani seluruh kebutuhan administrasi masyarakat.'
  },
  {
    id: 'gal-3',
    judul: 'Aktivitas Petani Mengolah Pertanian Padi Organik Unggulan',
    kategori: 'Pertanian',
    tipe: 'foto',
    mediaUrl: '/src/assets/images/potensi_desa_pertanian_1792455334010.jpg',
    thumbnailUrl: '/src/assets/images/potensi_desa_pertanian_1792455334010.jpg',
    tanggal: 'September 2026',
    deskripsi: 'Ketekunan kelompok tani dalam menjaga ketahanan pangan dan kelestarian pertanian desa.'
  }
];

// APBDes 2026 & 2025 based on Permendagri 20/2018
export const initialBudgetEntries: BudgetEntry[] = [
  // Pendapatan 2026
  {
    id: 'bgt-1',
    tahunAnggaran: 2026,
    kategori: 'Pendapatan',
    kodeRekening: '4.1',
    bidang: 'Pendapatan Asli Desa (PADes)',
    subBidang: 'Hasil Usaha & Aset Desa',
    uraian: 'Pendapatan Asli Desa (Hasil BUMDes & Tanah Kas Desa)',
    anggaran: 42000000,
    realisasi: 38500000,
    persentase: 91.6,
    keterangan: 'PADes dari penyewaan aset dan deviden BUMDes Mukti Mandiri'
  },
  {
    id: 'bgt-2',
    tahunAnggaran: 2026,
    kategori: 'Pendapatan',
    kodeRekening: '4.2.1',
    bidang: 'Pendapatan Transfer',
    subBidang: 'Dana Desa (APBN)',
    uraian: 'Dana Desa (DD) APBN Tahun Anggaran 2026',
    anggaran: 894500000,
    realisasi: 894500000,
    persentase: 100.0,
    keterangan: 'Tersalurkan 100% tahap I, II, dan III'
  },
  {
    id: 'bgt-3',
    tahunAnggaran: 2026,
    kategori: 'Pendapatan',
    kodeRekening: '4.2.2',
    bidang: 'Pendapatan Transfer',
    subBidang: 'Alokasi Dana Desa (ADD APBD Kab)',
    uraian: 'Alokasi Dana Desa (ADD) Kabupaten Lebak',
    anggaran: 445200000,
    realisasi: 422000000,
    persentase: 94.7,
    keterangan: 'Siltap dan operasional pemerintah desa'
  },
  {
    id: 'bgt-4',
    tahunAnggaran: 2026,
    kategori: 'Pendapatan',
    kodeRekening: '4.2.3',
    bidang: 'Pendapatan Transfer',
    subBidang: 'Bagi Hasil Pajak & Retribusi',
    uraian: 'Bagi Hasil Pajak Daerah dan Retribusi Daerah (BHPR)',
    anggaran: 38700000,
    realisasi: 35100000,
    persentase: 90.6,
    keterangan: 'Bagi hasil PBB dan retribusi Kab. Lebak'
  },
  {
    id: 'bgt-5',
    tahunAnggaran: 2026,
    kategori: 'Pendapatan',
    kodeRekening: '4.2.4',
    bidang: 'Pendapatan Transfer',
    subBidang: 'Bantuan Keuangan Provinsi',
    uraian: 'Bantuan Keuangan Khusus Provinsi Banten',
    anggaran: 100000000,
    realisasi: 100000000,
    persentase: 100.0,
    keterangan: 'Alokasi penguatan sarana posyandu & internet perdesaan'
  },

  // Belanja 2026 (5 Bidang Resmi Permendagri 20/2018)
  {
    id: 'bgt-6',
    tahunAnggaran: 2026,
    kategori: 'Belanja',
    kodeRekening: '5.1',
    bidang: 'Bidang Penyelenggaraan Pemerintahan Desa',
    subBidang: 'Penghasilan Tetap, Tunjangan & Operasional',
    uraian: 'Siltap Kades, Perangkat, Operasional BPD, RT/RW dan Kantor Desa',
    anggaran: 485000000,
    realisasi: 472500000,
    persentase: 97.4,
    keterangan: 'Kelancaran pelayanan harian'
  },
  {
    id: 'bgt-7',
    tahunAnggaran: 2026,
    kategori: 'Belanja',
    kodeRekening: '5.2',
    bidang: 'Bidang Pelaksanaan Pembangunan Desa',
    subBidang: 'Infrastruktur Jalan, Irigasi & Sanitasi',
    uraian: 'Pavingisasi Jalan Usaha Tani Dusun 2, Perbaikan Drainase & Sumur Air Bersih',
    anggaran: 585000000,
    realisasi: 560000000,
    persentase: 95.7,
    keterangan: 'Fisik pembangunan selesai 100%'
  },
  {
    id: 'bgt-8',
    tahunAnggaran: 2026,
    kategori: 'Belanja',
    kodeRekening: '5.3',
    bidang: 'Bidang Pembinaan Kemasyarakatan',
    subBidang: 'Kepemudaan, Budaya & Keagamaan',
    uraian: 'Pembinaan Karang Taruna, Peringatan PHBI, Pelestarian Kesenian Tradisional Lebak',
    anggaran: 78000000,
    realisasi: 72500000,
    persentase: 92.9,
    keterangan: 'Kegiatan pembinaan pemuda'
  },
  {
    id: 'bgt-9',
    tahunAnggaran: 2026,
    kategori: 'Belanja',
    kodeRekening: '5.4',
    bidang: 'Bidang Pemberdayaan Masyarakat',
    subBidang: 'Pertanian, Peternakan & BUMDes',
    uraian: 'Pelatihan Kemasan Aren, Bantuan Bibit Unggul Padi, Penyertaan Modal BUMDes',
    anggaran: 195000000,
    realisasi: 188000000,
    persentase: 96.4,
    keterangan: 'Penguatan ekonomi keluarga petani'
  },
  {
    id: 'bgt-10',
    tahunAnggaran: 2026,
    kategori: 'Belanja',
    kodeRekening: '5.5',
    bidang: 'Bidang Penanggulangan Bencana & Mendesak',
    subBidang: 'Bencana Alam & Bantuan Langsung',
    uraian: 'Bantuan Langsung Tunai Dana Desa (BLT-DD) & Cadangan Tanggap Bencana',
    anggaran: 154000000,
    realisasi: 154000000,
    persentase: 100.0,
    keterangan: 'Tersalurkan tuntas kepada KPM terverifikasi'
  },

  // Pembiayaan 2026
  {
    id: 'bgt-11',
    tahunAnggaran: 2026,
    kategori: 'Pembiayaan',
    kodeRekening: '6.1',
    bidang: 'Penerimaan Pembiayaan',
    subBidang: 'SILPA Tahun Sebelumnya',
    uraian: 'Sisa Lebih Perhitungan Anggaran (SiLPA) Tahun 2025',
    anggaran: 23600000,
    realisasi: 23600000,
    persentase: 100.0,
    keterangan: 'Telah dimasukkan dalam penetapan APBDes 2026'
  }
];

export const initialAPBDesSummary2026: APBDesSummary = {
  tahun: 2026,
  pendapatan: {
    anggaran: 1520400000,
    realisasi: 1490100000,
    persen: 98.0
  },
  belanja: {
    anggaran: 1497000000,
    realisasi: 1447000000,
    persen: 96.6
  },
  pembiayaan: {
    penerimaan: 23600000,
    pengeluaran: 47000000,
    netto: -23400000
  },
  sumberData: 'Peraturan Desa Girimukti Nomor 02 Tahun 2026 tentang Laporan Realisasi APBDes',
  tanggalUpdate: '18 Oktober 2026',
  dokumenDpaUrl: '#'
};

// Initial Letter Templates
export const initialLetterTemplates: LetterTemplate[] = [
  {
    id: 'tpl-sku',
    kodeSurat: 'SKU',
    nama: 'Surat Keterangan Usaha (SKU)',
    deskripsi: 'Surat resmi keterangan memiliki usaha aktif di wilayah Desa Girimukti untuk perbankan, KUR, atau perizinan.',
    persyaratan: [
      'KTP Pemohon asli atau fotokopi jelas',
      'Kartu Keluarga (KK) yang masih berlaku',
      'Foto lokasi usaha atau bukti kegiatan usaha',
      'Surat Pengantar RT/RW setempat'
    ],
    formatNomor: '503/{seq}/Ds-Grm/{month}/{year}',
    isActive: true,
    isPublic: true,
    lastUpdated: '18 Oktober 2026',
    fields: [
      { placeholder: '{{nama}}', label: 'Nama Lengkap Sesuai KTP', dataType: 'text', required: true, helpText: 'Isi nama lengkap tanpa gelar' },
      { placeholder: '{{nik}}', label: 'Nomor Induk Kependudukan (NIK)', dataType: 'text', required: true, isSensitive: true, helpText: '16 digit angka pada KTP/KK' },
      { placeholder: '{{tempat_tanggal_lahir}}', label: 'Tempat, Tanggal Lahir', dataType: 'text', required: true, placeholderText: 'Contoh: Lebak, 14 Mei 1990' },
      { placeholder: '{{jenis_kelamin}}', label: 'Jenis Kelamin', dataType: 'select', required: true, options: ['Laki-laki', 'Perempuan'] },
      { placeholder: '{{pekerjaan}}', label: 'Pekerjaan', dataType: 'text', required: true, placeholderText: 'Wiraswasta / Petani / Pedagang' },
      { placeholder: '{{alamat}}', label: 'Alamat Tempat Tinggal', dataType: 'textarea', required: true, placeholderText: 'Kp. Girimekar RT 02 / RW 01, Desa Girimukti' },
      { placeholder: '{{nama_usaha}}', label: 'Nama Usaha / Toko', dataType: 'text', required: true, placeholderText: 'Contoh: Usaha Pengolahan Gula Aren Mukti' },
      { placeholder: '{{jenis_usaha}}', label: 'Bidang / Jenis Usaha', dataType: 'text', required: true, placeholderText: 'Contoh: Pengolahan Hasil Perkebunan & Perdagangan' },
      { placeholder: '{{alamat_usaha}}', label: 'Lokasi Tempat Usaha', dataType: 'text', required: true, placeholderText: 'Dusun Girijaya RT 03/01, Desa Girimukti' },
      { placeholder: '{{tujuan_surat}}', label: 'Keperluan / Tujuan Surat', dataType: 'text', required: true, placeholderText: 'Persyaratan Pengajuan KUR BRI / Perizinan Usaha' }
    ],
    templateContentText: `PEMERINTAH KABUPATEN LEBAK
KECAMATAN CIMARGA
KANTOR KEPALA DESA GIRIMUKTI
Alamat: Jl. Raya Cimarga - Leuwidamar Km. 4, Girimukti 42361
========================================================================

SURAT KETERANGAN USAHA
Nomor: {{nomor_surat}}

Yang bertanda tangan di bawah ini, Kepala Desa Girimukti, Kecamatan Cimarga, Kabupaten Lebak, Provinsi Banten, menerangkan dengan sebenarnya bahwa:

Nama Lengkap          : {{nama}}
NIK                   : {{nik}}
Tempat/Tanggal Lahir  : {{tempat_tanggal_lahir}}
Jenis Kelamin         : {{jenis_kelamin}}
Pekerjaan             : {{pekerjaan}}
Alamat                : {{alamat}}

Berdasarkan pemeriksaan dan sepengetahuan kami, nama tersebut di atas benar memiliki kegiatan usaha sebagai berikut:

Nama Usaha            : {{nama_usaha}}
Jenis / Bidang Usaha  : {{jenis_usaha}}
Alamat Usaha          : {{alamat_usaha}}

Surat keterangan ini dibuat dengan sesungguhnya atas permohonan yang bersangkutan untuk keperluan:
{{tujuan_surat}}

Demikian Surat Keterangan Usaha ini dibuat untuk dapat dipergunakan sebagaimana mestinya.

Dikeluarkan di : Girimukti
Pada tanggal   : {{tanggal_surat}}

{{jabatan_penandatangan}},


{{nama_penandatangan}}`
  },
  {
    id: 'tpl-skd',
    kodeSurat: 'SKD',
    nama: 'Surat Keterangan Domisili (SKD)',
    deskripsi: 'Keterangan berdomisili atau bertempat tinggal sah di wilayah administrasi Desa Girimukti.',
    persyaratan: [
      'KTP dan KK pemohon',
      'Pengantar dari RT dan RW setempat',
      'Surat pindah datang (jika warga pendatang baru)'
    ],
    formatNomor: '470/{seq}/Ds-Grm/{month}/{year}',
    isActive: true,
    isPublic: true,
    lastUpdated: '18 Oktober 2026',
    fields: [
      { placeholder: '{{nama}}', label: 'Nama Lengkap', dataType: 'text', required: true },
      { placeholder: '{{nik}}', label: 'NIK (16 Digit)', dataType: 'text', required: true, isSensitive: true },
      { placeholder: '{{tempat_tanggal_lahir}}', label: 'Tempat, Tanggal Lahir', dataType: 'text', required: true },
      { placeholder: '{{jenis_kelamin}}', label: 'Jenis Kelamin', dataType: 'select', required: true, options: ['Laki-laki', 'Perempuan'] },
      { placeholder: '{{agama}}', label: 'Agama', dataType: 'select', required: true, options: ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu'] },
      { placeholder: '{{status_kawin}}', label: 'Status Perkawinan', dataType: 'select', required: true, options: ['Belum Kawin', 'Kawin', 'Cerai Hidup', 'Cerai Mati'] },
      { placeholder: '{{pekerjaan}}', label: 'Pekerjaan', dataType: 'text', required: true },
      { placeholder: '{{alamat}}', label: 'Alamat Domisili di Girimukti', dataType: 'textarea', required: true },
      { placeholder: '{{tujuan_surat}}', label: 'Keperluan Pembuatan Surat', dataType: 'text', required: true, placeholderText: 'Melamar Pekerjaan / Persyaratan Administrasi' }
    ],
    templateContentText: `PEMERINTAH KABUPATEN LEBAK
KECAMATAN CIMARGA
KANTOR KEPALA DESA GIRIMUKTI
Alamat: Jl. Raya Cimarga - Leuwidamar Km. 4, Girimukti 42361
========================================================================

SURAT KETERANGAN DOMISILI
Nomor: {{nomor_surat}}

Yang bertanda tangan di bawah ini, Kepala Desa Girimukti, Kecamatan Cimarga, Kabupaten Lebak, Provinsi Banten, dengan ini menerangkan bahwa:

Nama Lengkap          : {{nama}}
NIK                   : {{nik}}
Tempat/Tanggal Lahir  : {{tempat_tanggal_lahir}}
Jenis Kelamin         : {{jenis_kelamin}}
Agama                 : {{agama}}
Status Perkawinan     : {{status_kawin}}
Pekerjaan             : {{pekerjaan}}
Alamat Tempat Tinggal : {{alamat}}

Bahwa orang tersebut di atas adalah benar-benar warga yang saat ini berdomisili dan bertempat tinggal di alamat tersebut dalam wilayah Desa Girimukti, Kecamatan Cimarga, Kabupaten Lebak.

Surat keterangan ini diberikan untuk keperluan: {{tujuan_surat}}.

Demikian Surat Keterangan Domisili ini dibuat dengan sebenarnya agar yang berkepentingan maklum adanya.

Girimukti, {{tanggal_surat}}
{{jabatan_penandatangan}},

{{nama_penandatangan}}`
  },
  {
    id: 'tpl-sktm',
    kodeSurat: 'SKTM',
    nama: 'Surat Keterangan Tidak Mampu (SKTM)',
    deskripsi: 'Keterangan kondisi ekonomi tidak mampu untuk beasiswa sekolah, KIP kuliah, atau keringanan biaya pengobatan.',
    persyaratan: [
      'KTP & Kartu Keluarga pemohon',
      'Surat Pengantar RT/RW yang menyatakan kondisi ekonomi keluarga',
      'Surat pernyataan tidak mampu bermaterai (jika diminta instansi tujuan)'
    ],
    formatNomor: '401/{seq}/Ds-Grm/{month}/{year}',
    isActive: true,
    isPublic: true,
    lastUpdated: '18 Oktober 2026',
    fields: [
      { placeholder: '{{nama_kepala_keluarga}}', label: 'Nama Kepala Keluarga / Orang Tua', dataType: 'text', required: true },
      { placeholder: '{{nik}}', label: 'NIK Kepala Keluarga', dataType: 'text', required: true, isSensitive: true },
      { placeholder: '{{pekerjaan}}', label: 'Pekerjaan Kepala Keluarga', dataType: 'text', required: true },
      { placeholder: '{{alamat}}', label: 'Alamat Keluarga', dataType: 'textarea', required: true },
      { placeholder: '{{nama_anak}}', label: 'Nama Anak / Yang Bersangkutan', dataType: 'text', required: true },
      { placeholder: '{{sekolah_tujuan}}', label: 'Nama Sekolah / Universitas / RS Tujuan', dataType: 'text', required: true },
      { placeholder: '{{keperluan}}', label: 'Tujuan Penggunaan', dataType: 'text', required: true, placeholderText: 'Pengajuan Beasiswa KIP Kuliah / Keringanan Biaya' }
    ],
    templateContentText: `PEMERINTAH KABUPATEN LEBAK
KECAMATAN CIMARGA
KANTOR KEPALA DESA GIRIMUKTI
Alamat: Jl. Raya Cimarga - Leuwidamar Km. 4, Girimukti 42361
========================================================================

SURAT KETERANGAN TIDAK MAMPU
Nomor: {{nomor_surat}}

Yang bertanda tangan di bawah ini, Kepala Desa Girimukti, Kecamatan Cimarga, Kabupaten Lebak, menerangkan bahwa:

Nama Orang Tua/Wali   : {{nama_kepala_keluarga}}
NIK                   : {{nik}}
Pekerjaan             : {{pekerjaan}}
Alamat                : {{alamat}}

Adalah benar orang tua/wali dari:
Nama Siswa/Mahasiswa  : {{nama_anak}}
Tujuan Instansi       : {{sekolah_tujuan}}

Sepanjang pengetahuan kami dan berdasarkan data yang ada, keadaan ekonomi keluarga tersebut di atas tergolong dalam kategori KELUARGA KURANG MAMPU / PRA-SEJAHTERA di lingkungan Desa Girimukti.

Surat Keterangan Tidak Mampu ini diterbitkan khusus untuk:
{{keperluan}}

Demikian surat ini dibuat dengan sebenarnya untuk dipergunakan sebagaimana mestinya.

Girimukti, {{tanggal_surat}}
{{jabatan_penandatangan}},

{{nama_penandatangan}}`
  },
  {
    id: 'tpl-pengantar',
    kodeSurat: 'SP-SKCK',
    nama: 'Surat Pengantar SKCK / Kepolisian',
    deskripsi: 'Surat rekomendasi pengantar catatan kepolisian ke Polsek Cimarga atau Polres Lebak.',
    persyaratan: [
      'KTP asli & KK',
      'Pasfoto 4x6 latar merah (3 lembar)',
      'Pengantar RT/RW'
    ],
    formatNomor: '300/{seq}/Ds-Grm/{month}/{year}',
    isActive: true,
    isPublic: true,
    lastUpdated: '18 Oktober 2026',
    fields: [
      { placeholder: '{{nama}}', label: 'Nama Lengkap', dataType: 'text', required: true },
      { placeholder: '{{nik}}', label: 'NIK Pemohon', dataType: 'text', required: true, isSensitive: true },
      { placeholder: '{{tempat_tanggal_lahir}}', label: 'Tempat, Tanggal Lahir', dataType: 'text', required: true },
      { placeholder: '{{alamat}}', label: 'Alamat Tinggal', dataType: 'textarea', required: true },
      { placeholder: '{{keperluan}}', label: 'Keperluan Pembuatan SKCK', dataType: 'text', required: true, placeholderText: 'Melamar Pekerjaan BUMN / CPNS / Swasta' }
    ],
    templateContentText: `PEMERINTAH KABUPATEN LEBAK
KECAMATAN CIMARGA
KANTOR KEPALA DESA GIRIMUKTI
========================================================================

SURAT PENGANTAR CATATAN KEPOLISIAN
Nomor: {{nomor_surat}}

Kepala Desa Girimukti, Kecamatan Cimarga, Kabupaten Lebak, menerangkan bahwa:

Nama                  : {{nama}}
NIK                   : {{nik}}
Tempat/Tanggal Lahir  : {{tempat_tanggal_lahir}}
Alamat                : {{alamat}}

Orang tersebut di atas berkelakuan baik dalam kehidupan bermasyarakat dan belum pernah tersangkut tindak pidana.
Surat pengantar ini diberikan untuk permohonan SKCK di Polsek Cimarga dengan keperluan:
{{keperluan}}

Girimukti, {{tanggal_surat}}
{{jabatan_penandatangan}},

{{nama_penandatangan}}`
  }
];

// Pre-seeded letter applications for demonstrative workflow
export const initialLetterApplications: LetterApplication[] = [
  {
    id: 'app-001',
    nomorRegistrasi: 'REG-2026-SKU-0024',
    templateId: 'tpl-sku',
    namaSurat: 'Surat Keterangan Usaha (SKU)',
    kodeSurat: 'SKU',
    pemohonNama: 'Budi Santoso',
    pemohonNik: '3602141508820002',
    pemohonTelepon: '081299881122',
    pemohonAlamat: 'Kp. Girimekar RT 02 / RW 01 Desa Girimukti',
    formData: {
      '{{nama}}': 'Budi Santoso',
      '{{nik}}': '3602141508820002',
      '{{tempat_tanggal_lahir}}': 'Lebak, 15 Agustus 1982',
      '{{jenis_kelamin}}': 'Laki-laki',
      '{{pekerjaan}}': 'Wiraswasta',
      '{{alamat}}': 'Kp. Girimekar RT 02 / RW 01 Desa Girimukti',
      '{{nama_usaha}}': 'Sentra Pengolahan Aren Mukti',
      '{{jenis_usaha}}': 'Produksi Gula Aren Cetak & Semut',
      '{{alamat_usaha}}': 'Dusun 1 Girimekar, Girimukti',
      '{{tujuan_surat}}': 'Pengajuan Kredit Usaha Rakyat (KUR) BRI Unit Cimarga'
    },
    lampiranFiles: [{ nama: 'ktp_budi.jpg', url: '#' }, { nama: 'foto_usaha.jpg', url: '#' }],
    status: 'selesai',
    catatanPetugas: 'Berkas lengkap dan telah diverifikasi lapangan. Surat disetujui.',
    tanggalPengajuan: '14 Oktober 2026',
    tanggalSelesai: '15 Oktober 2026',
    nomorSuratResmi: '503/024/Ds-Grm/X/2026',
    verificationToken: 'v-tok-78f921a',
    pejabatPenandatangan: {
      nama: 'H. Asep Mulyana',
      jabatan: 'Kepala Desa Girimukti'
    }
  },
  {
    id: 'app-002',
    nomorRegistrasi: 'REG-2026-SKD-0025',
    templateId: 'tpl-skd',
    namaSurat: 'Surat Keterangan Domisili (SKD)',
    kodeSurat: 'SKD',
    pemohonNama: 'Siti Maryam',
    pemohonNik: '3602145203950001',
    pemohonTelepon: '085711223344',
    pemohonAlamat: 'Dusun Girijaya RT 04 / RW 02 Desa Girimukti',
    formData: {
      '{{nama}}': 'Siti Maryam',
      '{{nik}}': '3602145203950001',
      '{{tempat_tanggal_lahir}}': 'Lebak, 12 Maret 1995',
      '{{jenis_kelamin}}': 'Perempuan',
      '{{agama}}': 'Islam',
      '{{status_kawin}}': 'Kawin',
      '{{pekerjaan}}': 'Karyawan Swasta',
      '{{alamat}}': 'Dusun Girijaya RT 04 / RW 02 Desa Girimukti',
      '{{tujuan_surat}}': 'Pembukaan Rekening Bank Banten'
    },
    lampiranFiles: [{ nama: 'ktp_siti.jpg', url: '#' }],
    status: 'sedang_diproses',
    catatanPetugas: 'Pengecekan NIK dengan data register kependudukan RT 04.',
    tanggalPengajuan: '18 Oktober 2026'
  },
  {
    id: 'app-003',
    nomorRegistrasi: 'REG-2026-SKTM-0026',
    templateId: 'tpl-sktm',
    namaSurat: 'Surat Keterangan Tidak Mampu (SKTM)',
    kodeSurat: 'SKTM',
    pemohonNama: 'Rahmat Hidayat',
    pemohonNik: '3602141006780003',
    pemohonTelepon: '081377889900',
    pemohonAlamat: 'Kp. Pasir Salam RT 08 / RW 03 Desa Girimukti',
    formData: {
      '{{nama_kepala_keluarga}}': 'Rahmat Hidayat',
      '{{nik}}': '3602141006780003',
      '{{pekerjaan}}': 'Buruh Tani',
      '{{alamat}}': 'Kp. Pasir Salam RT 08 / RW 03 Desa Girimukti',
      '{{nama_anak}}': 'Ilham Ramadhan',
      '{{sekolah_tujuan}}': 'SMKN 1 Rangkasbitung',
      '{{keperluan}}': 'Keringanan Biaya Pendidikan dan PIP'
    },
    lampiranFiles: [{ nama: 'kk_rahmat.jpg', url: '#' }],
    status: 'diajukan',
    tanggalPengajuan: '19 Oktober 2026'
  }
];

// Initial Complaints (Pengaduan Warga)
export const initialComplaints: Complaint[] = [
  {
    id: 'pgd-01',
    nomorTiket: 'PGD-2026-0042',
    kategori: 'Infrastruktur Jalan',
    judul: 'Lampu Penerangan Jalan Umum Mati di Dekat Jembatan Girimekar',
    deskripsi: 'Dua titik lampu penerangan jalan di turunan jembatan Girimekar sudah tiga hari padam, sehingga sangat gelap pada malam hari dan membahayakan pengendara motor.',
    lokasi: 'Dekat Jembatan Girimekar RT 03/01',
    namaPelaporMasked: 'A*** S*******',
    teleponPelapor: '0812****8899',
    isRahasia: true,
    tanggal: '16 Oktober 2026',
    status: 'Diproses',
    tanggapanPetugas: 'Laporan telah diterima. Petugas PLN Cimarga bersama Kaur Umum Pemdes Girimukti dijadwalkan memeriksa kabel jaringan pada hari Selasa.'
  },
  {
    id: 'pgd-02',
    nomorTiket: 'PGD-2026-0039',
    kategori: 'Kebersihan & Lingkungan',
    judul: 'Tumpukan Sampah Liar di Saluran Pembuangan Air Batas Desa',
    deskripsi: 'Ada warga luar yang membuang sampah kantong plastik ke semak saluran batas desa sehingga berbau dan berpotensi menyumbat saat hujan.',
    lokasi: 'Batas Desa Girimukti - Intenjaya',
    namaPelaporMasked: 'M*** F*****',
    isRahasia: false,
    tanggal: '11 Oktober 2026',
    status: 'Selesai',
    tanggapanPetugas: 'Kerja bakti pembersihan sampah telah dilaksanakan bersama warga RT 10 pada 13 Oktober 2026 dan papan larangan buang sampah telah dipasang.',
    tanggalSelesai: '13 Oktober 2026'
  }
];

// Initial PPID Public Documents
export const initialPublicDocuments: PublicDocument[] = [
  {
    id: 'doc-1',
    nomorDokumen: 'Perdes-02/2026',
    judul: 'Peraturan Desa Girimukti tentang Laporan Pertanggungjawaban Realisasi APBDes 2025',
    kategori: 'Berkala',
    tahun: 2026,
    ukuranFile: '2.4 MB',
    fileUrl: '#',
    tanggalUnggah: '10 Februari 2026'
  },
  {
    id: 'doc-2',
    nomorDokumen: 'DPA-2026/Grm',
    judul: 'Dokumen Pelaksanaan Anggaran (DPA) Desa Girimukti Tahun Anggaran 2026',
    kategori: 'Berkala',
    tahun: 2026,
    ukuranFile: '4.1 MB',
    fileUrl: '#',
    tanggalUnggah: '15 Januari 2026'
  },
  {
    id: 'doc-3',
    nomorDokumen: 'SK-Kades-14/2026',
    judul: 'Surat Keputusan Kepala Desa tentang Penetapan Tim Siaga Bencana Desa Girimukti',
    kategori: 'Serta Merta',
    tahun: 2026,
    ukuranFile: '1.2 MB',
    fileUrl: '#',
    tanggalUnggah: '02 Mei 2026'
  },
  {
    id: 'doc-4',
    nomorDokumen: 'Perdes-01/2025',
    judul: 'Rencana Pembangunan Jangka Menengah Desa (RPJMDes) Girimukti Periode 2022-2028',
    kategori: 'Setiap Saat',
    tahun: 2025,
    ukuranFile: '6.8 MB',
    fileUrl: '#',
    tanggalUnggah: '12 Maret 2025'
  }
];

export const initialPpidRequests: PpidRequest[] = [
  {
    id: 'ppid-01',
    nomorRegistrasi: 'PPID-2026-0008',
    namaPemohon: 'Lembaga Swadaya Masyarakat Lebak Madani',
    rincianInformasi: 'Salinan rekapitulasi realisasi belanja fisik jalan desa tahun anggaran 2025.',
    tujuanPenggunaan: 'Kajian transparansi pembangunan desa di wilayah Lebak.',
    caraMemperoleh: 'Salinan Softcopy',
    tanggalPengajuan: '08 Oktober 2026',
    status: 'Dikabulkan',
    jawaban: 'Dokumen DPA dan LPJ realisasi fisik telah diberikan dalam format PDF melalui surat elektronik pemohon.',
    tanggalRespon: '14 Oktober 2026'
  }
];

// Initial Audit Logs
export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '19 Okt 2026 09:15:22',
    userName: 'Ahmad Fauzi (Sekdes)',
    userRole: 'Pejabat Penyetuju',
    action: 'Penerbitan Surat Resmi',
    details: 'Menerbitkan SKU no. 503/024/Ds-Grm/X/2026 untuk Budi Santoso',
    ipAddress: '192.168.1.14'
  },
  {
    id: 'log-2',
    timestamp: '18 Okt 2026 14:30:10',
    userName: 'Siti Rahmawati (Kaur Keu)',
    userRole: 'Pengelola Keuangan',
    action: 'Pembaruan Data Realisasi APBDes',
    details: 'Memperbarui realisasi belanja bidang pembangunan tahap II TA 2026',
    ipAddress: '192.168.1.18'
  },
  {
    id: 'log-3',
    timestamp: '18 Okt 2026 10:05:44',
    userName: 'Dedi Kusnadi',
    userRole: 'Operator Desa',
    action: 'Publikasi Berita Desa',
    details: 'Mempublikasikan artikel: Musrenbangdes RKPDes 2026',
    ipAddress: '192.168.1.12'
  }
];

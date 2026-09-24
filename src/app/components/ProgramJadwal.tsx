import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Clock, Users, Sparkles, Target, Lightbulb, X, Hand, Heart, Trash2, ChevronLeft, ChevronRight, Search, ChevronUp, ChevronDown, ChevronsUpDown, Monitor, Wrench, Globe, Shield, Hotel, Scissors, BookOpen, Shirt } from 'lucide-react';
import PageHeader from './PageHeader';

export default function ProgramJadwal() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  type JadwalKey = 'program' | 'pendaftaran' | 'seleksi' | 'pengumuman' | 'daftarUlang' | 'pelatihan' | 'uji' | 'kuota';
  const [jadwalSort, setJadwalSort] = useState<{ key: JadwalKey; dir: 'asc' | 'desc' }>({ key: 'program', dir: 'asc' });

  const handleJadwalSort = (key: JadwalKey) => {
    setJadwalSort(prev => prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' });
  };

  const JadwalSortIcon = ({ col }: { col: JadwalKey }) => {
    if (jadwalSort.key !== col) return <ChevronsUpDown className="w-3 h-3 text-gray-400 inline ml-1" />;
    return jadwalSort.dir === 'asc'
      ? <ChevronUp className="w-3 h-3 text-blue-600 inline ml-1" />
      : <ChevronDown className="w-3 h-3 text-blue-600 inline ml-1" />;
  };
  const programsScrollRef = useRef<HTMLDivElement>(null);
  const isProgramsDragging = useRef(false);
  const programsStartX = useRef(0);
  const programsScrollLeft = useRef(0);

  const useDragScroll = (
    ref: React.RefObject<HTMLDivElement>,
    dragging: React.MutableRefObject<boolean>,
    startXRef: React.MutableRefObject<number>,
    scrollLeftRef: React.MutableRefObject<number>
  ) => ({
    onMouseDown: (e: React.MouseEvent) => {
      dragging.current = true;
      startXRef.current = e.pageX - (ref.current?.offsetLeft ?? 0);
      scrollLeftRef.current = ref.current?.scrollLeft ?? 0;
    },
    onMouseMove: (e: React.MouseEvent) => {
      if (!dragging.current || !ref.current) return;
      e.preventDefault();
      const x = e.pageX - ref.current.offsetLeft;
      ref.current.scrollLeft = scrollLeftRef.current - (x - startXRef.current) * 1.2;
    },
    onMouseUp: () => { dragging.current = false; },
    onMouseLeave: () => { dragging.current = false; },
  });

  const programsDragHandlers = useDragScroll(
    programsScrollRef,
    isProgramsDragging,
    programsStartX,
    programsScrollLeft
  );

  // Detail modal state
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);

  const [showAll, setShowAll] = useState(false);

  // Keranjang favorit state
  const [savedPrograms, setSavedPrograms] = useState<string[]>([]);
  const [basketOpen, setBasketOpen] = useState(false);
  const [isDraggingActive, setIsDraggingActive] = useState(false);
  const [dropZoneActive, setDropZoneActive] = useState(false);
  const draggingProgram = useRef<string>('');

  const handleDragStart = (programName: string) => {
    draggingProgram.current = programName;
    setIsDraggingActive(true);
  };

  const handleDragEnd = () => {
    setIsDraggingActive(false);
    setDropZoneActive(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDropZoneActive(false);
    setIsDraggingActive(false);
    const name = draggingProgram.current;
    if (name && !savedPrograms.includes(name)) {
      setSavedPrograms(prev => [...prev, name]);
      setBasketOpen(true);
    }
  };

  const removeFromSaved = (name: string) => {
    setSavedPrograms(prev => prev.filter(n => n !== name));
  };

  type Program = {
    name: string; durasi: string; jadwal: string; kuota: number; terisi: number;
    kategori: string; difficulty: string; jobProspect: string;
    deskripsi: string; modul: string[]; syarat: string[]; fasilitas: string[];
  };

  const programs: Program[] = [
    {
      name: 'Barista',
      durasi: '1 Bulan',
      jadwal: 'Senin - Jumat, 08:00 - 14:00',
      kuota: 15, terisi: 13,
      kategori: 'kuliner',
      difficulty: 'Pemula',
      jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan barista profesional yang mencakup teknik penyeduhan kopi, latte art, dan manajemen kedai kopi. Peserta akan langsung berlatih menggunakan mesin espresso standar industri.',
      modul: ['Pengenalan biji kopi & metode seduh', 'Pengoperasian mesin espresso', 'Latte art dasar & menengah', 'Hygiene & sanitasi alat', 'Pelayanan pelanggan & kasir'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani', 'Tidak buta warna'],
      fasilitas: ['Mesin espresso profesional', 'Bahan praktik ditanggung', 'Seragam peserta', 'Sertifikat kelulusan', 'Modul belajar gratis'],
    },
    {
      name: 'Pastry & Bakery',
      durasi: '2 Bulan',
      jadwal: 'Senin - Jumat, 08:00 - 15:00',
      kuota: 20, terisi: 12,
      kategori: 'kuliner',
      difficulty: 'Pemula',
      jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan pembuatan roti, kue, dan pastri berbasis teknik modern maupun tradisional. Cocok bagi yang ingin membuka usaha bakery atau bekerja di industri hospitality.',
      modul: ['Dasar-dasar baking & pastry', 'Teknik pembuatan roti tawar & manis', 'Kue kering & basah tradisional', 'Dekorasi kue & fondant', 'Pengemasan & pemasaran produk'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani'],
      fasilitas: ['Oven & mixer profesional', 'Bahan praktik ditanggung', 'Seragam & celemek', 'Sertifikat kelulusan', 'Resep & modul gratis'],
    },
    {
      name: 'Tata Boga',
      durasi: '3 Bulan',
      jadwal: 'Senin - Jumat, 08:00 - 16:00',
      kuota: 20, terisi: 8,
      kategori: 'kuliner',
      difficulty: 'Pemula',
      jobProspect: 'Sangat Tinggi',
      deskripsi: 'Program tata boga komprehensif yang meliputi memasak masakan Indonesia dan internasional, manajemen dapur, serta perencanaan menu. Dirancang untuk calon chef profesional.',
      modul: ['Pengenalan dapur & peralatan masak', 'Teknik dasar memasak (cutting, sautéing, dll)', 'Masakan Indonesia & daerah', 'Masakan continental & oriental', 'Manajemen dapur & food costing'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani', 'Tidak memiliki alergi parah'],
      fasilitas: ['Dapur praktek lengkap', 'Bahan praktik ditanggung', 'Seragam chef', 'Sertifikat kelulusan', 'Kunjungan industri hotel/restoran'],
    },
    {
      name: 'Pengolahan Makanan Sehat',
      durasi: '2 Bulan',
      jadwal: 'Senin - Jumat, 08:00 - 14:00',
      kuota: 15, terisi: 6,
      kategori: 'kuliner',
      difficulty: 'Pemula',
      jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan pengolahan makanan bergizi untuk catering sehat, meal prep, dan usaha makanan diet. Peserta belajar prinsip gizi seimbang dan teknik memasak rendah kalori.',
      modul: ['Prinsip gizi & label nutrisi', 'Teknik memasak rendah lemak & gula', 'Meal prep & food storage', 'Menu diet & vegetarian', 'Pengemasan & pemasaran catering sehat'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani'],
      fasilitas: ['Peralatan masak modern', 'Bahan praktik ditanggung', 'Modul nutrisi gratis', 'Sertifikat kelulusan'],
    },
    {
      name: 'Digital Marketing',
      durasi: '2 Bulan',
      jadwal: 'Senin - Jumat, 09:00 - 15:00',
      kuota: 25, terisi: 22,
      kategori: 'teknologi',
      difficulty: 'Pemula',
      jobProspect: 'Sangat Tinggi',
      deskripsi: 'Pelatihan pemasaran digital yang mencakup media sosial, iklan berbayar, SEO, dan analitik. Cocok untuk yang ingin berkarir sebagai digital marketer atau mengembangkan bisnis online.',
      modul: ['Dasar-dasar digital marketing', 'Social media marketing (Instagram, TikTok)', 'Google Ads & Meta Ads', 'SEO & content marketing', 'Analitik data & laporan kampanye'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMA/sederajat', 'Memiliki smartphone/laptop', 'Kemampuan dasar internet'],
      fasilitas: ['Lab komputer ber-AC', 'Akses tools premium (Canva, Google Analytics)', 'Sertifikat kelulusan', 'Portofolio proyek nyata'],
    },
    {
      name: 'Data Analysis',
      durasi: '3 Bulan',
      jadwal: 'Senin - Jumat, 09:00 - 16:00',
      kuota: 20, terisi: 9,
      kategori: 'teknologi',
      difficulty: 'Menengah',
      jobProspect: 'Sangat Tinggi',
      deskripsi: 'Program analisis data menggunakan tools industri seperti Excel, Python, dan Tableau. Peserta akan belajar mengolah data nyata dan mempresentasikan insight secara visual.',
      modul: ['Dasar statistik & probabilitas', 'Excel & Google Sheets lanjutan', 'Python untuk data (Pandas, NumPy)', 'Visualisasi data dengan Tableau', 'Studi kasus & proyek akhir'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMA/sederajat', 'Memiliki laptop', 'Kemampuan matematika dasar'],
      fasilitas: ['Lab komputer ber-AC', 'Lisensi software gratis', 'Dataset latihan nyata', 'Sertifikat kelulusan', 'Portofolio GitHub'],
    },
    {
      name: 'Web Development',
      durasi: '3 Bulan',
      jadwal: 'Senin - Jumat, 09:00 - 16:00',
      kuota: 20, terisi: 7,
      kategori: 'teknologi',
      difficulty: 'Menengah',
      jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan pengembangan web dari dasar hingga mampu membuat aplikasi web dinamis. Mencakup HTML, CSS, JavaScript, dan framework modern yang digunakan di industri.',
      modul: ['HTML & CSS dasar hingga lanjutan', 'JavaScript & DOM manipulation', 'Framework React.js', 'Backend dasar dengan Node.js', 'Deploy & hosting aplikasi web'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMA/sederajat', 'Memiliki laptop', 'Kemampuan logika dasar'],
      fasilitas: ['Lab komputer ber-AC', 'Akses GitHub & tools developer', 'Proyek portofolio nyata', 'Sertifikat kelulusan', 'Mentoring instruktur berpengalaman'],
    },
    {
      name: 'Desain UI/UX',
      durasi: '2 Bulan',
      jadwal: 'Senin - Jumat, 09:00 - 15:00',
      kuota: 20, terisi: 16,
      kategori: 'teknologi',
      difficulty: 'Pemula',
      jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan desain antarmuka dan pengalaman pengguna menggunakan Figma. Peserta belajar riset pengguna, wireframing, prototyping, hingga handoff ke developer.',
      modul: ['Prinsip desain & tipografi', 'Riset pengguna & user persona', 'Wireframe & mockup dengan Figma', 'Prototyping interaktif', 'Usability testing & iterasi desain'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMA/sederajat', 'Memiliki laptop', 'Tidak buta warna'],
      fasilitas: ['Lab komputer ber-AC', 'Akses Figma Professional', 'Portofolio proyek nyata', 'Sertifikat kelulusan'],
    },
    {
      name: 'Desain Grafis',
      durasi: '2 Bulan',
      jadwal: 'Senin - Jumat, 09:00 - 16:00',
      kuota: 25, terisi: 20,
      kategori: 'kreatif',
      difficulty: 'Pemula',
      jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan desain grafis menggunakan software profesional seperti Adobe Photoshop dan Illustrator. Peserta akan membuat portofolio desain siap kerja di akhir program.',
      modul: ['Prinsip desain & komposisi', 'Adobe Photoshop (foto editing & manipulasi)', 'Adobe Illustrator (desain vektor & logo)', 'Desain poster, banner & media sosial', 'Portofolio & persiapan kerja'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMA/sederajat', 'Memiliki laptop (spek minimal i5/RAM 8GB)', 'Tidak buta warna'],
      fasilitas: ['Lab komputer ber-AC', 'Lisensi Adobe CC gratis selama pelatihan', 'Portofolio profesional', 'Sertifikat kelulusan'],
    },
    {
      name: 'Fotografi & Videografi',
      durasi: '2 Bulan',
      jadwal: 'Senin - Jumat, 09:00 - 15:00',
      kuota: 15, terisi: 5,
      kategori: 'kreatif',
      difficulty: 'Pemula',
      jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan fotografi dan videografi untuk konten digital, event, dan produk. Peserta belajar teknik pengambilan gambar, pencahayaan, dan editing menggunakan Adobe Lightroom & Premiere.',
      modul: ['Dasar kamera & komposisi foto', 'Teknik pencahayaan (natural & studio)', 'Fotografi produk & portrait', 'Dasar videografi & sinematografi', 'Editing foto & video profesional'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMA/sederajat', 'Memiliki kamera/smartphone kamera baik', 'Tidak buta warna'],
      fasilitas: ['Kamera DSLR untuk praktik', 'Studio foto mini', 'Software editing gratis', 'Sertifikat kelulusan', 'Portofolio digital'],
    },
    {
      name: 'Animasi Digital',
      durasi: '3 Bulan',
      jadwal: 'Senin - Jumat, 09:00 - 16:00',
      kuota: 15, terisi: 11,
      kategori: 'kreatif',
      difficulty: 'Menengah',
      jobProspect: 'Tinggi',
      deskripsi: 'Program animasi digital mencakup pembuatan animasi 2D dan motion graphics untuk konten digital, iklan, dan media sosial menggunakan Adobe Animate dan After Effects.',
      modul: ['Prinsip animasi (12 prinsip dasar)', 'Animasi 2D dengan Adobe Animate', 'Motion graphics dengan After Effects', 'Character rigging & lip sync', 'Render & export untuk berbagai platform'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMA/sederajat', 'Memiliki laptop (spek minimal i5/RAM 8GB)', 'Kemampuan menggambar dasar (diutamakan)'],
      fasilitas: ['Lab komputer ber-AC', 'Lisensi Adobe CC gratis', 'Drawing tablet untuk praktik', 'Sertifikat kelulusan', 'Portofolio animasi'],
    },
    {
      name: 'Bahasa Inggris',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 08:00 - 14:00',
      kuota: 25, terisi: 10, kategori: 'bahasa', difficulty: 'Pemula', jobProspect: 'Sangat Tinggi',
      deskripsi: 'Pelatihan Bahasa Inggris komunikatif yang mencakup speaking, listening, reading, dan writing untuk kebutuhan dunia kerja dan sehari-hari.',
      modul: ['Tata bahasa dasar (grammar)', 'Percakapan sehari-hari & dunia kerja', 'Listening & pronunciation', 'Reading & writing skills', 'Simulasi wawancara kerja berbahasa Inggris'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani'],
      fasilitas: ['Ruang kelas ber-AC', 'Modul & kamus gratis', 'Lab bahasa', 'Sertifikat kelulusan'],
    },
    {
      name: 'Bahasa Jepang',
      durasi: '3 Bulan', jadwal: 'Senin - Jumat, 08:00 - 14:00',
      kuota: 20, terisi: 8, kategori: 'bahasa', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan Bahasa Jepang tingkat dasar hingga menengah mencakup hiragana, katakana, kosakata, dan percakapan untuk persiapan kerja di perusahaan Jepang.',
      modul: ['Huruf Hiragana & Katakana', 'Kosakata & kalimat dasar', 'Percakapan sehari-hari (Nihongo)', 'Budaya kerja Jepang', 'Simulasi ujian JLPT N5'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMA/sederajat', 'Sehat jasmani dan rohani'],
      fasilitas: ['Ruang kelas ber-AC', 'Modul & kartu belajar gratis', 'Lab bahasa', 'Sertifikat kelulusan'],
    },
    {
      name: 'Petugas Keamanan',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 07:00 - 14:00',
      kuota: 30, terisi: 20, kategori: 'keamanan', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan petugas keamanan profesional yang mencakup teknik pengamanan, prosedur darurat, dan etika profesi untuk bekerja di gedung, mall, atau kawasan industri.',
      modul: ['Dasar-dasar keamanan & hukum', 'Teknik patroli & pengamanan aset', 'Pertolongan pertama (P3K)', 'Penanganan situasi darurat', 'Etika & komunikasi profesional'],
      syarat: ['Usia 18–35 tahun', 'Pendidikan minimal SMA/sederajat', 'Tinggi badan minimal 165 cm (pria)', 'Sehat jasmani dan rohani', 'Tidak memiliki catatan kriminal'],
      fasilitas: ['Lapangan latihan', 'Seragam pelatihan', 'P3K kit', 'Sertifikat kelulusan', 'Rekomendasi kerja'],
    },
    {
      name: 'Las Plat',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 07:00 - 15:00',
      kuota: 20, terisi: 14, kategori: 'teknik', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan pengelasan plat logam menggunakan mesin las SMAW dan MIG untuk fabrikasi rangka, bodi kendaraan, dan konstruksi baja ringan.',
      modul: ['Keselamatan kerja & APD las', 'Pengenalan peralatan & mesin las', 'Teknik las SMAW dasar', 'Teknik las MIG/MAG', 'Pemeriksaan kualitas sambungan las'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani', 'Tidak buta warna'],
      fasilitas: ['Workshop las lengkap', 'APD (helm, sarung tangan, dll)', 'Material las ditanggung', 'Sertifikat kelulusan BNSP'],
    },
    {
      name: 'Las Pipa',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 07:00 - 15:00',
      kuota: 15, terisi: 9, kategori: 'teknik', difficulty: 'Menengah', jobProspect: 'Sangat Tinggi',
      deskripsi: 'Pelatihan pengelasan pipa untuk instalasi minyak, gas, dan air menggunakan teknik GTAW dan SMAW posisi 1G hingga 6G sesuai standar industri.',
      modul: ['K3 pengelasan pipa & gas berbahaya', 'Teknik las pipa posisi 1G & 2G', 'Teknik las pipa posisi 5G & 6G', 'Inspeksi visual & uji NDT dasar', 'Standar kualifikasi welder AWS/ASME'],
      syarat: ['Usia minimal 18 tahun', 'Pendidikan minimal SMP/sederajat', 'Pengalaman las dasar diutamakan', 'Sehat jasmani dan rohani'],
      fasilitas: ['Workshop las pipa', 'APD lengkap', 'Material pipa & kawat las ditanggung', 'Sertifikat welder'],
    },
    {
      name: 'Sistem Injeksi',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 08:00 - 15:00',
      kuota: 20, terisi: 12, kategori: 'teknik', difficulty: 'Menengah', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan diagnosis dan perbaikan sistem bahan bakar injeksi (EFI) pada kendaraan modern menggunakan scan tool dan alat ukur elektronik.',
      modul: ['Dasar elektronika otomotif', 'Cara kerja sistem EFI', 'Penggunaan scanner & multimeter', 'Diagnosis kerusakan sensor & aktuator', 'Kalibrasi & reset ECU'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Pengetahuan dasar otomotif diutamakan', 'Sehat jasmani dan rohani'],
      fasilitas: ['Bengkel otomotif', 'Scan tool & alat ukur', 'Unit kendaraan praktik', 'Sertifikat kelulusan'],
    },
    {
      name: 'Service Sepeda Motor',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 08:00 - 15:00',
      kuota: 25, terisi: 18, kategori: 'teknik', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan teknik perawatan dan perbaikan sepeda motor konvensional maupun injeksi, termasuk tune-up, rem, transmisi, dan kelistrikan.',
      modul: ['Komponen & cara kerja mesin motor', 'Tune-up & perawatan berkala', 'Sistem rem & suspensi', 'Sistem kelistrikan & baterai', 'Service injeksi & karburator'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani'],
      fasilitas: ['Bengkel motor lengkap', 'Alat tangan & special tool', 'Unit motor praktik', 'Seragam mekanik', 'Sertifikat kelulusan'],
    },
    {
      name: 'Mechanical Electrical',
      durasi: '3 Bulan', jadwal: 'Senin - Jumat, 07:00 - 15:00',
      kuota: 20, terisi: 7, kategori: 'teknik', difficulty: 'Menengah', jobProspect: 'Sangat Tinggi',
      deskripsi: 'Pelatihan teknik mekanikal dan elektrikal untuk instalasi, perawatan, dan perbaikan sistem listrik industri dan gedung, meliputi panel listrik, motor listrik, dan PLC.',
      modul: ['Kelistrikan dasar & K3 listrik', 'Instalasi panel listrik 3 fase', 'Motor listrik & sistem kontrol', 'Pengantar PLC (Programmable Logic Controller)', 'Perawatan & troubleshooting mekanikal'],
      syarat: ['Usia minimal 18 tahun', 'Pendidikan minimal SMA/sederajat (IPA/Teknik diutamakan)', 'Sehat jasmani dan rohani', 'Tidak buta warna'],
      fasilitas: ['Lab listrik & mekanikal', 'Alat ukur & APD listrik', 'Panel & modul PLC praktik', 'Sertifikat kelulusan'],
    },
    {
      name: 'Housekeeping',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 08:00 - 15:00',
      kuota: 20, terisi: 11, kategori: 'hospitality', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan tata graha (housekeeping) hotel yang mencakup pembersihan kamar, laundry, turndown service, dan standar kebersihan internasional.',
      modul: ['Pengenalan industri perhotelan', 'Teknik membersihkan & merapikan kamar', 'Penanganan linen & laundry', 'Penggunaan bahan kimia pembersih yang aman', 'Standar layanan & komunikasi tamu'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani', 'Berpenampilan rapi & bersih'],
      fasilitas: ['Ruang simulasi kamar hotel', 'Perlengkapan housekeeping', 'Seragam peserta', 'Sertifikat kelulusan', 'Link magang hotel'],
    },
    {
      name: 'Food and Beverage Service',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 08:00 - 15:00',
      kuota: 20, terisi: 9, kategori: 'hospitality', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan pelayanan makanan dan minuman (F&B Service) di restoran dan hotel bintang, mencakup table manner, teknik serving, dan standar layanan internasional.',
      modul: ['Pengenalan F&B service & etika profesi', 'Table set-up & napkin folding', 'Teknik serving makanan & minuman', 'Penanganan keluhan tamu', 'Pengantar wine & beverage service'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani', 'Berpenampilan rapi & komunikatif'],
      fasilitas: ['Restoran simulasi', 'Peralatan makan & minum', 'Seragam & atribut', 'Sertifikat kelulusan', 'Link magang restoran/hotel'],
    },
    {
      name: 'Perawatan Kecantikan',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 08:00 - 15:00',
      kuota: 20, terisi: 16, kategori: 'kecantikan', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan perawatan kecantikan kulit wajah dan tubuh yang mencakup facial, perawatan kulit, dan penanganan masalah kulit menggunakan produk dan alat profesional.',
      modul: ['Anatomi kulit & jenis-jenis kulit', 'Teknik facial & cleansing', 'Perawatan kulit bermasalah (jerawat, flek)', 'Body treatment & scrub', 'Higiene & sterilisasi alat kecantikan'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani', 'Tidak alergi produk kecantikan'],
      fasilitas: ['Ruang perawatan kecantikan', 'Produk & alat praktik ditanggung', 'Seragam & perlengkapan', 'Sertifikat kelulusan BNSP'],
    },
    {
      name: 'Make Up Artist',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 09:00 - 15:00',
      kuota: 20, terisi: 18, kategori: 'kecantikan', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan tata rias wajah profesional untuk berbagai kesempatan — pernikahan, wisuda, fashion, dan event — menggunakan teknik dan produk makeup terkini.',
      modul: ['Dasar makeup & teori warna', 'Teknik koreksi wajah (contouring & highlighting)', 'Makeup pengantin tradisional & modern', 'Makeup editorial & fashion', 'Teknik airbrush makeup'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani', 'Tidak buta warna'],
      fasilitas: ['Ruang makeup ber-AC', 'Produk makeup profesional untuk praktik', 'Kit makeup peserta', 'Sertifikat kelulusan', 'Portofolio foto profesional'],
    },
    {
      name: 'Terapis Spa',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 08:00 - 15:00',
      kuota: 15, terisi: 10, kategori: 'kecantikan', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan terapis spa profesional mencakup berbagai teknik pijat relaksasi, body treatment, dan aromaterapi untuk bekerja di spa hotel, klinik kecantikan, atau membuka usaha sendiri.',
      modul: ['Anatomi tubuh & titik pijat', 'Teknik Swedish massage', 'Teknik pijat relaksasi & refleksi', 'Body scrub & wrap treatment', 'Aromaterapi & penggunaan essential oil'],
      syarat: ['Usia minimal 18 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani', 'Tidak memiliki gangguan muskuloskeletal'],
      fasilitas: ['Ruang spa & treatment', 'Perlengkapan & produk spa ditanggung', 'Seragam terapis', 'Sertifikat kelulusan BNSP', 'Link magang hotel spa'],
    },
    {
      name: 'Perias Rambut',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 08:00 - 15:00',
      kuota: 20, terisi: 14, kategori: 'kecantikan', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan tata rambut profesional mencakup teknik potong, pewarnaan, pelurusan, pengeritingan, dan perawatan rambut sesuai standar salon profesional.',
      modul: ['Pengenalan jenis rambut & kulit kepala', 'Teknik potong dasar & lanjutan', 'Teknik pewarnaan (coloring & highlighting)', 'Pelurusan & pengeritingan kimia', 'Perawatan rambut & scalp treatment'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani', 'Tidak alergi bahan kimia rambut'],
      fasilitas: ['Salon praktik lengkap', 'Produk & alat rambut ditanggung', 'Mannequin head untuk latihan', 'Sertifikat kelulusan', 'Magang di salon rekanan'],
    },
    {
      name: 'Administrasi Perkantoran',
      durasi: '2 Bulan', jadwal: 'Senin - Jumat, 09:00 - 15:00',
      kuota: 25, terisi: 13, kategori: 'bisnis', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan administrasi perkantoran modern yang mencakup penggunaan Microsoft Office, manajemen arsip, korespondensi bisnis, dan pelayanan prima untuk siap bekerja di kantor.',
      modul: ['Microsoft Word, Excel & PowerPoint lanjutan', 'Manajemen surat & arsip (filing system)', 'Korespondensi bisnis & email resmi', 'Pelayanan prima & etika kantor', 'Penggunaan alat kantor & sistem digital'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMA/sederajat', 'Kemampuan dasar komputer', 'Sehat jasmani dan rohani'],
      fasilitas: ['Lab komputer ber-AC', 'Akses Microsoft Office', 'Modul & ATK', 'Sertifikat kelulusan', 'Simulasi lingkungan kantor'],
    },
    {
      name: 'Penjahit Busana',
      durasi: '3 Bulan', jadwal: 'Senin - Jumat, 08:00 - 15:00',
      kuota: 20, terisi: 12, kategori: 'fashion', difficulty: 'Pemula', jobProspect: 'Tinggi',
      deskripsi: 'Pelatihan menjahit busana wanita dan pria dari dasar hingga mampu membuat pakaian ready-to-wear. Mencakup pengukuran, pembuatan pola, pemotongan, dan jahit finishing.',
      modul: ['Pengenalan mesin jahit & alat', 'Pengambilan ukuran & pembuatan pola dasar', 'Teknik memotong bahan', 'Menjahit busana wanita (blus, rok, gaun)', 'Finishing & quality control'],
      syarat: ['Usia minimal 17 tahun', 'Pendidikan minimal SMP/sederajat', 'Sehat jasmani dan rohani', 'Ketekunan & ketelitian tinggi'],
      fasilitas: ['Mesin jahit industri per peserta', 'Bahan & pola praktik ditanggung', 'Alat jahit set', 'Sertifikat kelulusan BNSP', 'Portofolio hasil karya'],
    },
  ];

  const filteredPrograms = searchQuery.trim()
    ? programs.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.kategori.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.durasi.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : programs;

  // Calendar state
  const today = new Date();
  const [calendarDate, setCalendarDate] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDay, setSelectedDay] = useState<number | null>(null);

  const monthNames = ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'];
  const dayNames = ['Min','Sen','Sel','Rab','Kam','Jum','Sab'];

  const year = calendarDate.getFullYear();
  const month = calendarDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const prevMonth = () => { setCalendarDate(new Date(year, month - 1, 1)); setSelectedDay(null); };
  const nextMonth = () => { setCalendarDate(new Date(year, month + 1, 1)); setSelectedDay(null); };

  // Periode kalender — berulang tiap bulan
  const calendarPeriods = [
    {
      name: 'Pendaftaran',
      desc: 'Periode penerimaan berkas dan formulir pendaftaran peserta baru.',
      startDay: 1, endDay: 7,
      cell: 'bg-green-100 text-green-800 hover:bg-green-200',
      badge: 'bg-green-500',
      legend: 'bg-green-400',
      tag: 'text-green-700 bg-green-100',
    },
    {
      name: 'Seleksi & Tes',
      desc: 'Peserta mengikuti tes online dan seleksi administrasi.',
      startDay: 8, endDay: 12,
      cell: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200',
      badge: 'bg-yellow-400',
      legend: 'bg-yellow-400',
      tag: 'text-yellow-700 bg-yellow-100',
    },
    {
      name: 'Pengumuman',
      desc: 'Pengumuman hasil seleksi peserta yang diterima.',
      startDay: 13, endDay: 15,
      cell: 'bg-purple-100 text-purple-800 hover:bg-purple-200',
      badge: 'bg-purple-500',
      legend: 'bg-purple-400',
      tag: 'text-purple-700 bg-purple-100',
    },
    {
      name: 'Orientasi',
      desc: 'Pengenalan lingkungan pelatihan dan peraturan bagi peserta baru.',
      startDay: 16, endDay: 17,
      cell: 'bg-orange-100 text-orange-800 hover:bg-orange-200',
      badge: 'bg-orange-400',
      legend: 'bg-orange-400',
      tag: 'text-orange-700 bg-orange-100',
    },
    {
      name: 'Pelatihan',
      desc: 'Kegiatan pelatihan berjalan sesuai program yang dipilih.',
      startDay: 18, endDay: 31,
      cell: 'bg-blue-100 text-blue-800 hover:bg-blue-200',
      badge: 'bg-blue-500',
      legend: 'bg-blue-400',
      tag: 'text-blue-700 bg-blue-100',
    },
  ];

  const getPeriodForDay = (day: number) =>
    calendarPeriods.find(p => day >= p.startDay && day <= p.endDay) ?? null;

  const selectedPeriod = selectedDay ? getPeriodForDay(selectedDay) : null;
  const selectedDayPrograms = selectedDay ? (() => {
    const dow = new Date(year, month, selectedDay).getDay();
    if (dow === 0 || dow === 6) return [];
    if (!selectedPeriod || selectedPeriod.name !== 'Pelatihan') return [];
    return programs;
  })() : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        crumbs={[{ label: 'Pelatihan' }, { label: 'Program & Jadwal' }]}
        title="Program & Jadwal"
        subtitle="Temukan program pelatihan yang sesuai dengan minat dan kebutuhan Anda"
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* All Programs */}
          <div className="mb-4">
            <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-2">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Semua Program Pelatihan</h2>
                <p className="text-gray-600 text-sm mt-1">Seret ikon tangan ke favorit untuk menyimpan program favoritmu</p>
              </div>
              <div className="relative sm:ml-auto w-full sm:w-72">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Cari program pelatihan..."
                  className="w-full pl-9 pr-9 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            {searchQuery && (
              <p className="text-sm text-gray-500 mt-1">
                Menampilkan <span className="font-semibold text-blue-600">{filteredPrograms.length}</span> hasil untuk "{searchQuery}"
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
            {filteredPrograms.length === 0 ? (
              <div className="col-span-full py-16 text-center text-gray-400">
                <Search className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                <p className="text-sm">Tidak ada program yang cocok dengan pencarian "<span className="font-medium">{searchQuery}</span>"</p>
              </div>
            ) : null}
            {(searchQuery ? filteredPrograms : showAll ? filteredPrograms : filteredPrograms.slice(0, 8)).map((program, index) => {
              const isSaved = savedPrograms.includes(program.name);

              return (
                <div
                  key={index}
                  className={`flex flex-col bg-white rounded-xl shadow-md p-5 hover:shadow-xl transition-all relative ${isSaved ? 'ring-2 ring-blue-400' : ''}`}
                >
                  {/* Drag handle — hand icon */}
                  <div
                    draggable
                    onDragStart={() => handleDragStart(program.name)}
                    onDragEnd={handleDragEnd}
                    title="Seret ke keranjang untuk menyimpan"
                    className={`absolute top-3 right-3 p-1 rounded cursor-grab active:cursor-grabbing transition-colors ${
                      isSaved ? 'text-blue-500' : 'text-gray-300 hover:text-blue-400'
                    }`}
                  >
                    <Hand className="w-5 h-5" />
                  </div>

                  <h3 className="text-base font-bold text-gray-900 mb-3 pr-6 leading-snug">{program.name}</h3>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-xs">Durasi: {program.durasi}</span>
                    </div>
                    <div className="flex items-start gap-2 text-gray-600">
                      <Clock className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-xs leading-snug">{program.jadwal}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="w-4 h-4 text-blue-600 flex-shrink-0" />
                      <span className="text-xs">Kuota: {program.kuota} peserta</span>
                    </div>
                  </div>

                  {/* Indikator Kuota Ekspresif */}
                  {(() => {
                    const sisa = program.kuota - program.terisi;
                    const pct = Math.round((sisa / program.kuota) * 100);
                    const kritis = pct <= 20;
                    const sedang = pct > 20 && pct <= 50;
                    const barColor = kritis ? 'bg-red-500' : sedang ? 'bg-yellow-400' : 'bg-green-500';
                    const label = kritis ? `Sisa ${sisa} tempat!` : sedang ? `Sisa ${sisa} tempat` : `${sisa} tempat tersedia`;
                    return (
                      <div className="mt-3">
                        <div className="flex justify-between items-center mb-1">
                          <span className={`text-xs font-semibold ${kritis ? 'text-red-600 animate-pulse' : sedang ? 'text-yellow-600' : 'text-green-600'}`}>
                            {label}
                          </span>
                          <span className="text-xs text-gray-400">{program.terisi}/{program.kuota}</span>
                        </div>
                        <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${barColor} ${kritis ? 'animate-pulse' : ''}`}
                            style={{ width: `${(program.terisi / program.kuota) * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })()}

                  <button
                    onClick={() => setSelectedProgram(program)}
                    className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                  >
                    Lihat Detail
                  </button>
                </div>
              );
            })}
          </div>
          {!searchQuery && filteredPrograms.length > 8 && (
            <div className="text-center mb-12">
              <button
                onClick={() => setShowAll(prev => !prev)}
                className="px-8 py-2.5 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-medium text-sm transition-colors"
              >
                {showAll ? 'Tampilkan Lebih Sedikit' : `Lihat Semua Program (${filteredPrograms.length})`}
              </button>
            </div>
          )}

          {/* Tabel Jadwal Lengkap */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Jadwal Pelaksanaan Program</h2>
            <p className="text-gray-600 mb-4">Jadwal resmi seluruh program pelatihan periode Oktober – Desember 2026</p>
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-bold text-gray-500 whitespace-nowrap">No</th>
                      {([
                        { label: 'Program',              key: 'program'      },
                        { label: 'Tgl. Pendaftaran',     key: 'pendaftaran'  },
                        { label: 'Tgl. Seleksi Tulis',   key: 'seleksi'      },
                        { label: 'Pengumuman Seleksi',   key: 'pengumuman'   },
                        { label: 'Tgl. Daftar Ulang',    key: 'daftarUlang'  },
                        { label: 'Tgl. Pelatihan',       key: 'pelatihan'    },
                        { label: 'Tgl. Uji Kompetensi',  key: 'uji'          },
                        { label: 'Kuota',                key: 'kuota'        },
                      ] as { label: string; key: JadwalKey }[]).map(col => (
                        <th
                          key={col.key}
                          onClick={() => handleJadwalSort(col.key)}
                          className="px-4 py-3 text-left text-xs font-bold text-gray-700 whitespace-nowrap cursor-pointer hover:bg-gray-100 transition-colors select-none"
                        >
                          {col.label}<JadwalSortIcon col={col.key} />
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {([
                      { program: 'Barista',                  pendaftaran: '1–7 Okt 2026',  seleksi: '9 Okt 2026',  pengumuman: '13 Okt 2026', daftarUlang: '14–15 Okt 2026', pelatihan: '18 Okt – 18 Nov 2026',  uji: '20 Nov 2026',  kuota: 15 },
                      { program: 'Pastry & Bakery',          pendaftaran: '1–7 Okt 2026',  seleksi: '9 Okt 2026',  pengumuman: '13 Okt 2026', daftarUlang: '14–15 Okt 2026', pelatihan: '18 Okt – 18 Des 2026',  uji: '20 Des 2026',  kuota: 20 },
                      { program: 'Tata Boga',                pendaftaran: '1–7 Okt 2026',  seleksi: '10 Okt 2026', pengumuman: '14 Okt 2026', daftarUlang: '15–16 Okt 2026', pelatihan: '19 Okt – 19 Jan 2027',  uji: '21 Jan 2027',  kuota: 20 },
                      { program: 'Pengolahan Makanan Sehat', pendaftaran: '1–7 Okt 2026',  seleksi: '10 Okt 2026', pengumuman: '14 Okt 2026', daftarUlang: '15–16 Okt 2026', pelatihan: '19 Okt – 19 Des 2026',  uji: '22 Des 2026',  kuota: 15 },
                      { program: 'Digital Marketing',        pendaftaran: '1–7 Okt 2026',  seleksi: '8 Okt 2026',  pengumuman: '12 Okt 2026', daftarUlang: '13–14 Okt 2026', pelatihan: '17 Okt – 17 Des 2026',  uji: '19 Des 2026',  kuota: 25 },
                      { program: 'Data Analysis',            pendaftaran: '1–7 Okt 2026',  seleksi: '8 Okt 2026',  pengumuman: '12 Okt 2026', daftarUlang: '13–14 Okt 2026', pelatihan: '17 Okt – 17 Jan 2027',  uji: '20 Jan 2027',  kuota: 20 },
                      { program: 'Web Development',          pendaftaran: '1–7 Okt 2026',  seleksi: '8 Okt 2026',  pengumuman: '12 Okt 2026', daftarUlang: '13–14 Okt 2026', pelatihan: '17 Okt – 17 Jan 2027',  uji: '21 Jan 2027',  kuota: 20 },
                      { program: 'Desain UI/UX',             pendaftaran: '1–7 Okt 2026',  seleksi: '9 Okt 2026',  pengumuman: '13 Okt 2026', daftarUlang: '14–15 Okt 2026', pelatihan: '18 Okt – 18 Des 2026',  uji: '21 Des 2026',  kuota: 20 },
                      { program: 'Desain Grafis',            pendaftaran: '1–7 Okt 2026',  seleksi: '9 Okt 2026',  pengumuman: '13 Okt 2026', daftarUlang: '14–15 Okt 2026', pelatihan: '18 Okt – 18 Des 2026',  uji: '22 Des 2026',  kuota: 25 },
                      { program: 'Fotografi & Videografi',   pendaftaran: '1–7 Okt 2026',  seleksi: '10 Okt 2026', pengumuman: '14 Okt 2026', daftarUlang: '15–16 Okt 2026', pelatihan: '19 Okt – 19 Des 2026',  uji: '23 Des 2026',  kuota: 15 },
                      { program: 'Animasi Digital',          pendaftaran: '1–7 Okt 2026',  seleksi: '10 Okt 2026', pengumuman: '14 Okt 2026', daftarUlang: '15–16 Okt 2026', pelatihan: '19 Okt – 19 Jan 2027',  uji: '22 Jan 2027',  kuota: 15 },
                      { program: 'Bahasa Inggris',           pendaftaran: '1–7 Nov 2026',  seleksi: '9 Nov 2026',  pengumuman: '13 Nov 2026', daftarUlang: '14–15 Nov 2026', pelatihan: '18 Nov – 18 Jan 2027', uji: '20 Jan 2027', kuota: 25 },
                      { program: 'Bahasa Jepang',            pendaftaran: '1–7 Nov 2026',  seleksi: '9 Nov 2026',  pengumuman: '13 Nov 2026', daftarUlang: '14–15 Nov 2026', pelatihan: '18 Nov – 18 Feb 2027', uji: '21 Feb 2027', kuota: 20 },
                      { program: 'Petugas Keamanan',         pendaftaran: '1–7 Nov 2026',  seleksi: '10 Nov 2026', pengumuman: '14 Nov 2026', daftarUlang: '15–16 Nov 2026', pelatihan: '19 Nov – 19 Jan 2027', uji: '22 Jan 2027', kuota: 30 },
                      { program: 'Las Plat',                 pendaftaran: '1–7 Nov 2026',  seleksi: '10 Nov 2026', pengumuman: '14 Nov 2026', daftarUlang: '15–16 Nov 2026', pelatihan: '19 Nov – 19 Jan 2027', uji: '21 Jan 2027', kuota: 20 },
                      { program: 'Las Pipa',                 pendaftaran: '1–7 Nov 2026',  seleksi: '11 Nov 2026', pengumuman: '15 Nov 2026', daftarUlang: '16–17 Nov 2026', pelatihan: '20 Nov – 20 Jan 2027', uji: '22 Jan 2027', kuota: 15 },
                      { program: 'Sistem Injeksi',           pendaftaran: '1–7 Nov 2026',  seleksi: '11 Nov 2026', pengumuman: '15 Nov 2026', daftarUlang: '16–17 Nov 2026', pelatihan: '20 Nov – 20 Jan 2027', uji: '23 Jan 2027', kuota: 20 },
                      { program: 'Service Sepeda Motor',     pendaftaran: '1–7 Nov 2026',  seleksi: '12 Nov 2026', pengumuman: '16 Nov 2026', daftarUlang: '17–18 Nov 2026', pelatihan: '21 Nov – 21 Jan 2027', uji: '24 Jan 2027', kuota: 25 },
                      { program: 'Mechanical Electrical',   pendaftaran: '1–7 Nov 2026',  seleksi: '12 Nov 2026', pengumuman: '16 Nov 2026', daftarUlang: '17–18 Nov 2026', pelatihan: '21 Nov – 21 Feb 2027', uji: '25 Feb 2027', kuota: 20 },
                      { program: 'Housekeeping',             pendaftaran: '1–7 Nov 2026',  seleksi: '9 Nov 2026',  pengumuman: '13 Nov 2026', daftarUlang: '14–15 Nov 2026', pelatihan: '18 Nov – 18 Jan 2027', uji: '20 Jan 2027', kuota: 20 },
                      { program: 'Food and Beverage Service',pendaftaran: '1–7 Nov 2026',  seleksi: '9 Nov 2026',  pengumuman: '13 Nov 2026', daftarUlang: '14–15 Nov 2026', pelatihan: '18 Nov – 18 Jan 2027', uji: '21 Jan 2027', kuota: 20 },
                      { program: 'Perawatan Kecantikan',     pendaftaran: '1–7 Nov 2026',  seleksi: '10 Nov 2026', pengumuman: '14 Nov 2026', daftarUlang: '15–16 Nov 2026', pelatihan: '19 Nov – 19 Jan 2027', uji: '22 Jan 2027', kuota: 20 },
                      { program: 'Make Up Artist',           pendaftaran: '1–7 Nov 2026',  seleksi: '10 Nov 2026', pengumuman: '14 Nov 2026', daftarUlang: '15–16 Nov 2026', pelatihan: '19 Nov – 19 Jan 2027', uji: '23 Jan 2027', kuota: 20 },
                      { program: 'Terapis Spa',              pendaftaran: '1–7 Nov 2026',  seleksi: '11 Nov 2026', pengumuman: '15 Nov 2026', daftarUlang: '16–17 Nov 2026', pelatihan: '20 Nov – 20 Jan 2027', uji: '22 Jan 2027', kuota: 15 },
                      { program: 'Perias Rambut',            pendaftaran: '1–7 Nov 2026',  seleksi: '11 Nov 2026', pengumuman: '15 Nov 2026', daftarUlang: '16–17 Nov 2026', pelatihan: '20 Nov – 20 Jan 2027', uji: '24 Jan 2027', kuota: 20 },
                      { program: 'Administrasi Perkantoran', pendaftaran: '1–7 Nov 2026',  seleksi: '12 Nov 2026', pengumuman: '16 Nov 2026', daftarUlang: '17–18 Nov 2026', pelatihan: '21 Nov – 21 Jan 2027', uji: '23 Jan 2027', kuota: 25 },
                      { program: 'Penjahit Busana',          pendaftaran: '1–7 Nov 2026',  seleksi: '12 Nov 2026', pengumuman: '16 Nov 2026', daftarUlang: '17–18 Nov 2026', pelatihan: '21 Nov – 21 Feb 2027', uji: '25 Feb 2027', kuota: 20 },
                    ] as { program: string; pendaftaran: string; seleksi: string; pengumuman: string; daftarUlang: string; pelatihan: string; uji: string; kuota: number }[])
                      .sort((a, b) => {
                        const va = a[jadwalSort.key];
                        const vb = b[jadwalSort.key];
                        if (typeof va === 'number' && typeof vb === 'number') {
                          return jadwalSort.dir === 'asc' ? va - vb : vb - va;
                        }
                        return jadwalSort.dir === 'asc'
                          ? String(va).localeCompare(String(vb))
                          : String(vb).localeCompare(String(va));
                      })
                      .map((row, i) => (
                      <tr key={i} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-gray-400 text-center text-xs">{i + 1}</td>
                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap">{row.program}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.pendaftaran}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.seleksi}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.pengumuman}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.daftarUlang}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.pelatihan}</td>
                        <td className="px-4 py-3 text-gray-600 whitespace-nowrap">{row.uji}</td>
                        <td className="px-4 py-3 text-center">
                          <span className="font-semibold text-gray-900">{row.kuota}</span>
                          <span className="text-gray-400 text-xs ml-1">org</span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Kalender Jadwal */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Kalender Jadwal Pelatihan</h2>
            <p className="text-gray-600 mb-4">Klik tanggal untuk melihat periode dan program yang berjalan</p>

            {/* Legenda periode */}
            <div className="flex flex-wrap gap-3 mb-6">
              {calendarPeriods.map(p => (
                <div key={p.name} className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className={`w-3 h-3 rounded-sm inline-block ${p.legend}`} />
                  {p.icon} {p.name}
                </div>
              ))}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Grid Kalender */}
              <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center justify-between mb-5">
                  <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <h3 className="text-lg font-bold text-gray-900">{monthNames[month]} {year}</h3>
                  <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <ChevronRight className="w-5 h-5 text-gray-600" />
                  </button>
                </div>

                {/* Nama hari */}
                <div className="grid grid-cols-7 mb-1">
                  {dayNames.map(d => (
                    <div key={d} className={`text-center text-xs font-semibold py-1 ${d === 'Min' || d === 'Sab' ? 'text-gray-300' : 'text-gray-500'}`}>
                      {d}
                    </div>
                  ))}
                </div>

                {/* Tanggal */}
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dow = new Date(year, month, day).getDay();
                    const isWeekend = dow === 0 || dow === 6;
                    const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();
                    const isSelected = selectedDay === day;
                    const period = getPeriodForDay(day);

                    return (
                      <button
                        key={day}
                        onClick={() => !isWeekend && setSelectedDay(isSelected ? null : day)}
                        disabled={isWeekend}
                        className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium transition-all
                          ${isWeekend ? 'text-gray-200 cursor-default' : 'cursor-pointer'}
                          ${isSelected ? 'ring-2 ring-offset-1 ring-gray-700 font-bold' : ''}
                          ${isToday ? 'ring-2 ring-gray-900' : ''}
                          ${!isWeekend && period ? period.cell : ''}
                        `}
                      >
                        {day}
                      </button>
                    );
                  })}
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex gap-4 text-xs text-gray-400">
                  <span className="flex items-center gap-1"><span className="w-4 h-4 rounded ring-2 ring-gray-900 inline-block" /> Hari ini</span>
                  <span className="flex items-center gap-1"><span className="w-4 h-4 rounded ring-2 ring-offset-1 ring-gray-700 inline-block bg-blue-100" /> Dipilih</span>
                </div>
              </div>

              {/* Panel detail */}
              <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
                {selectedDay ? (
                  <>
                    <p className="text-xs text-gray-400 mb-1">
                      {dayNames[new Date(year, month, selectedDay).getDay()]}, {selectedDay} {monthNames[month]} {year}
                    </p>

                    {selectedPeriod ? (
                      <div className={`rounded-lg px-4 py-3 mb-4 ${selectedPeriod.tag}`}>
                        <div className="text-lg mb-0.5">{selectedPeriod.icon}</div>
                        <div className="font-bold text-sm">{selectedPeriod.name}</div>
                        <div className="text-xs mt-1 opacity-80">{selectedPeriod.desc}</div>
                      </div>
                    ) : null}

                    {selectedDayPrograms.length > 0 && (
                      <>
                        <p className="text-xs font-semibold text-gray-500 mb-2">Program aktif hari ini:</p>
                        <ul className="space-y-1.5 overflow-y-auto">
                          {selectedDayPrograms.map((p, i) => (
                            <li key={i} className="flex items-center gap-2 px-3 py-2 bg-blue-50 rounded-lg text-xs font-medium text-blue-800">
                              <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                              {p.name}
                            </li>
                          ))}
                        </ul>
                      </>
                    )}

                    {new Date(year, month, selectedDay).getDay() === 0 ||
                     new Date(year, month, selectedDay).getDay() === 6 ? (
                      <p className="text-sm text-gray-400 mt-2">Hari libur — tidak ada kegiatan.</p>
                    ) : null}
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-gray-400">
                    <Calendar className="w-10 h-10 mb-3 text-gray-200" />
                    <p className="text-sm">Pilih tanggal untuk melihat periode dan kegiatan</p>
                    <div className="mt-6 w-full space-y-2 text-left">
                      {calendarPeriods.map(p => (
                        <div key={p.name} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${p.tag}`}>
                          <span>{p.icon}</span>
                          <span className="font-semibold">{p.name}</span>
                          <span className="ml-auto opacity-60">tgl {p.startDay}–{p.endDay}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Info Tambahan */}
          <div className="bg-blue-50 rounded-xl px-6 py-4">
            <h2 className="text-xl mb-2 font-bold text-gray-900 mb-4">Informasi Penting</h2>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Jadwal dapat berubah sewaktu-waktu sesuai kebijakan lembaga</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Pendaftaran dibuka setiap bulan dengan kuota terbatas - daftar sekarang agar tidak kehabisan!</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Peserta wajib hadir minimal 80% dari total pertemuan untuk mendapatkan sertifikat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Sertifikat akan diberikan setelah menyelesaikan seluruh program pelatihan dan lulus ujian</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600">•</span>
                <span>Gratis! Semua program pelatihan tidak dipungut biaya apapun</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Modal Detail Program */}
      {selectedProgram && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-end"
          onClick={() => setSelectedProgram(null)}
        >
          <div
            className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-2xl flex flex-col"
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                  selectedProgram.kategori === 'teknologi' ? 'bg-blue-100 text-blue-700' :
                  selectedProgram.kategori === 'kuliner' ? 'bg-orange-100 text-orange-700' :
                  selectedProgram.kategori === 'kreatif' ? 'bg-purple-100 text-purple-700' :
                  selectedProgram.kategori === 'teknik' ? 'bg-yellow-100 text-yellow-700' :
                  selectedProgram.kategori === 'hospitality' ? 'bg-teal-100 text-teal-700' :
                  selectedProgram.kategori === 'kecantikan' ? 'bg-pink-100 text-pink-700' :
                  selectedProgram.kategori === 'bahasa' ? 'bg-green-100 text-green-700' :
                  selectedProgram.kategori === 'bisnis' ? 'bg-indigo-100 text-indigo-700' :
                  selectedProgram.kategori === 'fashion' ? 'bg-rose-100 text-rose-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {selectedProgram.kategori === 'teknologi' ? 'Teknologi & Digital' :
                   selectedProgram.kategori === 'kuliner' ? 'Kuliner & F&B' :
                   selectedProgram.kategori === 'kreatif' ? 'Kreatif & Desain' :
                   selectedProgram.kategori === 'teknik' ? 'Teknik & Mesin' :
                   selectedProgram.kategori === 'hospitality' ? 'Hospitality' :
                   selectedProgram.kategori === 'kecantikan' ? 'Kecantikan & Spa' :
                   selectedProgram.kategori === 'bahasa' ? 'Bahasa & Komunikasi' :
                   selectedProgram.kategori === 'bisnis' ? 'Bisnis & Administrasi' :
                   selectedProgram.kategori === 'fashion' ? 'Mode & Busana' :
                   selectedProgram.kategori === 'keamanan' ? 'Keamanan' : selectedProgram.kategori}
                </span>
                <h2 className="text-xl font-bold text-gray-900 mt-1">{selectedProgram.name}</h2>
              </div>
              <button
                onClick={() => setSelectedProgram(null)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 px-6 py-5 space-y-6">
              {/* Deskripsi */}
              <p className="text-gray-600 text-sm leading-relaxed">{selectedProgram.deskripsi}</p>

              {/* Info singkat */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <Clock className="w-4 h-4 text-blue-500" />, label: 'Durasi', value: selectedProgram.durasi },
                  { icon: <Calendar className="w-4 h-4 text-blue-500" />, label: 'Jadwal', value: selectedProgram.jadwal },
                  { icon: <Users className="w-4 h-4 text-blue-500" />, label: 'Kuota', value: `${selectedProgram.kuota} peserta` },
                  { icon: <Target className="w-4 h-4 text-blue-500" />, label: 'Level', value: selectedProgram.difficulty },
                ].map(item => (
                  <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                    <div className="flex items-center gap-1.5 mb-1">{item.icon}<span className="text-xs text-gray-400">{item.label}</span></div>
                    <p className="text-sm font-semibold text-gray-800">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Kuota bar */}
              {(() => {
                const sisa = selectedProgram.kuota - selectedProgram.terisi;
                const pct = Math.round((selectedProgram.terisi / selectedProgram.kuota) * 100);
                const kritis = sisa / selectedProgram.kuota <= 0.2;
                return (
                  <div className="bg-gray-50 rounded-xl p-4">
                    <div className="flex justify-between text-xs mb-2">
                      <span className={`font-semibold ${kritis ? 'text-red-600' : 'text-gray-600'}`}>
                        {kritis ? `Sisa ${sisa} tempat!` : `Tersisa ${sisa} tempat`}
                      </span>
                      <span className="text-gray-400">{selectedProgram.terisi}/{selectedProgram.kuota} terisi</span>
                    </div>
                    <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${kritis ? 'bg-red-500' : pct > 50 ? 'bg-yellow-400' : 'bg-green-500'}`} style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })()}

              {/* Prospek karir */}
              <div>
                <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-500" /> Prospek Karir
                </h3>
                <span className={`inline-flex text-sm font-semibold px-3 py-1 rounded-full ${
                  selectedProgram.jobProspect === 'Sangat Tinggi' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                }`}>
                  {selectedProgram.jobProspect}
                </span>
              </div>

              {/* Modul */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-500" /> Materi yang Dipelajari
                </h3>
                <ul className="space-y-2">
                  {selectedProgram.modul.map((m, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                      {m}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Syarat */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-500" /> Persyaratan Pendaftaran
                </h3>
                <ul className="space-y-1.5">
                  {selectedProgram.syarat.map((s, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                      <span className="text-green-500 mt-0.5">✓</span> {s}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fasilitas */}
              <div>
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-orange-500" /> Fasilitas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {selectedProgram.fasilitas.map((f, i) => (
                    <span key={i} className="text-xs bg-orange-50 text-orange-700 border border-orange-200 px-3 py-1 rounded-full">{f}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* CTA footer */}
            <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex gap-3">
              <button
                onClick={() => { handleDragStart(selectedProgram.name); setSelectedProgram(null); }}
                className="flex-1 border border-blue-600 text-blue-600 hover:bg-blue-50 py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                + Simpan ke Favorit
              </button>
              <button
                onClick={() => navigate('/register')}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-medium transition-colors"
              >
                Daftar Sekarang
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating basket */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-2">

        {/* Panel isi keranjang */}
        {basketOpen && (
          <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 w-72 overflow-hidden">
            <div className="bg-blue-600 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-white font-bold">
                <Heart className="w-5 h-5" />
                <span>Program Favoritku</span>
              </div>
              <button onClick={() => setBasketOpen(false)} className="text-blue-200 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              {savedPrograms.length === 0 ? (
                <p className="text-gray-400 text-sm text-center py-4">Belum ada program favorit</p>
              ) : (
                <ul className="space-y-2">
                  {savedPrograms.map(name => (
                    <li key={name} className="flex items-center justify-between bg-blue-50 rounded-lg px-3 py-2">
                      <span className="text-sm font-medium text-gray-800">{name}</span>
                      <button
                        onClick={() => removeFromSaved(name)}
                        className="text-gray-300 hover:text-red-400 transition-colors ml-2 flex-shrink-0"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {savedPrograms.length > 0 && (
                <button
                  onClick={() => navigate('/register')}
                  className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  Daftar Sekarang
                </button>
              )}
            </div>
          </div>
        )}

        {/* Tombol keranjang + drop zone */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDropZoneActive(true); }}
          onDragLeave={() => setDropZoneActive(false)}
          onDrop={handleDrop}
        >
          <button
            onClick={() => setBasketOpen(prev => !prev)}
            className={`relative flex items-center gap-2 px-4 py-3 rounded-2xl shadow-xl font-medium text-sm transition-all duration-200 ${
              dropZoneActive
                ? 'bg-green-500 text-white scale-110 shadow-green-300'
                : isDraggingActive
                  ? 'bg-blue-500 text-white scale-105 shadow-blue-300 animate-pulse'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            <Heart className="w-5 h-5" />
            <span>{isDraggingActive && !dropZoneActive ? 'Lepas di sini!' : 'Program Favorit'}</span>
            {savedPrograms.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                {savedPrograms.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

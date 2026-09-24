import { BookOpen, Calendar, Clock, MapPin, User, FileText, CheckCircle, Bell, Download } from 'lucide-react';

interface Registration {
  email: string;
  program: string;
  tanggal: string;
  status: string;
  nama?: string;
}

const PROGRAM_DETAILS: Record<string, {
  instruktur: string;
  ruang: string;
  durasi: string;
  jadwal: { hari: string; jam: string }[];
  deskripsi: string;
  materi: string[];
}> = {
  'Barista': {
    instruktur: 'Budi Santoso, S.Par.',
    ruang: 'Lab Barista – Lantai 2',
    durasi: '3 bulan (120 JP)',
    jadwal: [
      { hari: 'Senin', jam: '08.00 – 12.00' },
      { hari: 'Rabu', jam: '08.00 – 12.00' },
      { hari: "Jum'at", jam: '08.00 – 11.00' },
    ],
    deskripsi: 'Pelatihan teknik penyeduhan kopi espresso, manual brew, latte art, dan manajemen kafe.',
    materi: ['Pengenalan biji kopi & roasting', 'Teknik espresso', 'Manual brew (V60, Chemex)', 'Latte art dasar & lanjutan', 'Higienitas & K3 dapur'],
  },
  'Pastry & Bakery': {
    instruktur: 'Dewi Kusuma, A.Md.',
    ruang: 'Lab Kuliner – Lantai 1',
    durasi: '3 bulan (120 JP)',
    jadwal: [
      { hari: 'Selasa', jam: '08.00 – 12.00' },
      { hari: 'Kamis', jam: '08.00 – 12.00' },
      { hari: 'Sabtu', jam: '08.00 – 11.00' },
    ],
    deskripsi: 'Pelatihan pembuatan roti, kue kering, cake, dan pastri dengan standar industri.',
    materi: ['Dasar pembuatan roti', 'Cake & dekorasi', 'Pastri internasional', 'Manajemen bahan baku', 'Higienitas & K3'],
  },
  'Digital Marketing': {
    instruktur: 'Rina Maharani, S.Kom.',
    ruang: 'Lab Komputer A – Lantai 3',
    durasi: '2 bulan (80 JP)',
    jadwal: [
      { hari: 'Senin', jam: '13.00 – 17.00' },
      { hari: 'Rabu', jam: '13.00 – 17.00' },
    ],
    deskripsi: 'Pelatihan strategi pemasaran digital mulai dari media sosial, SEO, hingga iklan berbayar.',
    materi: ['Strategi konten media sosial', 'SEO & SEM dasar', 'Google Ads & Meta Ads', 'Email marketing', 'Analitik & pelaporan'],
  },
  'Web Development': {
    instruktur: 'Ahmad Fauzi, S.T.',
    ruang: 'Lab Komputer B – Lantai 3',
    durasi: '3 bulan (120 JP)',
    jadwal: [
      { hari: 'Selasa', jam: '13.00 – 17.00' },
      { hari: 'Kamis', jam: '13.00 – 17.00' },
      { hari: 'Sabtu', jam: '09.00 – 12.00' },
    ],
    deskripsi: 'Pelatihan pembuatan website profesional menggunakan HTML, CSS, JavaScript, dan framework modern.',
    materi: ['HTML5 & CSS3', 'JavaScript dasar', 'React.js', 'Backend dengan Node.js', 'Deploy & hosting'],
  },
  'Data Analysis': {
    instruktur: 'Sari Wulandari, S.Si.',
    ruang: 'Lab Komputer A – Lantai 3',
    durasi: '2 bulan (80 JP)',
    jadwal: [
      { hari: 'Senin', jam: '08.00 – 12.00' },
      { hari: 'Kamis', jam: '08.00 – 12.00' },
    ],
    deskripsi: 'Pelatihan analisis data menggunakan Excel, Python, dan visualisasi data untuk kebutuhan industri.',
    materi: ['Excel lanjutan & pivot', 'Python dasar untuk data', 'Pandas & NumPy', 'Visualisasi dengan Matplotlib', 'Dashboard dengan Tableau'],
  },
  'Desain UI/UX': {
    instruktur: 'Kevin Pratama, S.Ds.',
    ruang: 'Lab Desain – Lantai 2',
    durasi: '3 bulan (120 JP)',
    jadwal: [
      { hari: 'Selasa', jam: '08.00 – 12.00' },
      { hari: "Jum'at", jam: '08.00 – 12.00' },
    ],
    deskripsi: 'Pelatihan desain antarmuka dan pengalaman pengguna menggunakan Figma dan prinsip desain modern.',
    materi: ['Prinsip desain UI/UX', 'Wireframing & prototyping', 'Figma lanjutan', 'Usability testing', 'Portofolio & presentasi'],
  },
};

const FALLBACK_DETAIL = {
  instruktur: 'Instruktur PPKD',
  ruang: 'Ruang Pelatihan – Lantai 1',
  durasi: '2–3 bulan',
  jadwal: [
    { hari: 'Senin', jam: '08.00 – 12.00' },
    { hari: 'Rabu', jam: '08.00 – 12.00' },
  ],
  deskripsi: 'Program pelatihan berbasis kompetensi sesuai standar SKKNI.',
  materi: ['Teori dasar', 'Praktik lapangan', 'Evaluasi kompetensi', 'Sertifikasi BNSP'],
};

const PENGUMUMAN = [
  { tanggal: '20 Okt 2025', isi: 'Pertemuan perdana dilaksanakan sesuai jadwal. Harap hadir tepat waktu dan membawa alat tulis.' },
  { tanggal: '15 Okt 2025', isi: 'Selamat datang! Materi modul pelatihan dapat diunduh melalui tautan di bawah.' },
];

export default function KelasSaya() {
  const reg: Registration | null = (() => {
    try {
      const list = JSON.parse(localStorage.getItem('ppkd_registrations') || '[]');
      return list.find((r: Registration) => r.status === 'selesai') || null;
    } catch { return null; }
  })();

  const detail = reg ? (PROGRAM_DETAILS[reg.program] ?? FALLBACK_DETAIL) : FALLBACK_DETAIL;
  const tanggalMulai = reg
    ? new Date(new Date(reg.tanggal).getTime() + 7 * 24 * 60 * 60 * 1000)
        .toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
    : '–';

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Welcome card */}
        <div className="bg-gradient-to-r from-blue-700 to-blue-500 rounded-2xl p-7 text-white shadow-lg flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-blue-200 text-sm font-medium mb-1">Program yang diikuti</p>
            <h1 className="text-2xl font-bold leading-tight">{reg?.program ?? 'Program Pelatihan'}</h1>
            <p className="text-blue-200 text-sm mt-1">Pendaftaran disetujui · Mulai {tanggalMulai}</p>
          </div>
          <div className="bg-white/20 rounded-xl px-4 py-3 text-center flex-shrink-0">
            <p className="text-xs text-blue-200">Status</p>
            <p className="font-bold text-sm flex items-center gap-1.5 mt-0.5">
              <CheckCircle className="w-4 h-4" /> Aktif
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Jadwal */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Jadwal Kelas</h2>
              </div>
              <div className="space-y-3">
                {detail.jadwal.map((j, i) => (
                  <div key={i} className="flex items-center justify-between bg-blue-50 rounded-xl px-4 py-3">
                    <span className="font-semibold text-gray-800 text-sm w-24">{j.hari}</span>
                    <div className="flex items-center gap-1.5 text-blue-700 text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      {j.jam}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-4">* Jadwal dapat berubah sewaktu-waktu. Pantau pengumuman untuk info terkini.</p>
            </div>

            {/* Materi */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-purple-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Materi Pelatihan</h2>
              </div>
              <ul className="space-y-2.5">
                {detail.materi.map((m, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700">{m}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 hover:bg-gray-100 text-sm font-medium text-gray-600 transition-colors">
                <Download className="w-4 h-4" />
                Unduh Modul Pelatihan (PDF)
              </button>
            </div>

            {/* Pengumuman */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-yellow-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Pengumuman</h2>
              </div>
              <div className="space-y-3">
                {PENGUMUMAN.map((p, i) => (
                  <div key={i} className="bg-yellow-50 border border-yellow-100 rounded-xl px-4 py-3">
                    <p className="text-xs text-yellow-600 font-medium mb-1">{p.tanggal}</p>
                    <p className="text-sm text-gray-700">{p.isi}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar info kelas */}
          <div className="space-y-5">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 space-y-5">
              <h2 className="text-lg font-bold text-gray-900">Info Kelas</h2>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Instruktur</p>
                  <p className="text-sm font-semibold text-gray-800">{detail.instruktur}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-orange-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Ruang Kelas</p>
                  <p className="text-sm font-semibold text-gray-800">{detail.ruang}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Clock className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Durasi</p>
                  <p className="text-sm font-semibold text-gray-800">{detail.durasi}</p>
                </div>
              </div>

              <div className="border-t border-gray-100 pt-4">
                <p className="text-xs text-gray-500 leading-relaxed">{detail.deskripsi}</p>
              </div>
            </div>

            {/* Kontak instruktur */}
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-100 rounded-2xl p-5 text-center">
              <p className="text-xs text-gray-500 mb-2">Ada pertanyaan?</p>
              <p className="text-sm font-semibold text-gray-800 mb-3">Hubungi instruktur atau admin PPKD</p>
              <a
                href="https://wa.me/6221"
                className="inline-flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                WhatsApp Admin
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

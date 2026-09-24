import { BookOpen, Calendar, Clock, MapPin, User, FileText, CheckCircle, Bell, Download, ClipboardList } from 'lucide-react';
import { Link } from 'react-router';
import PageHeader from './PageHeader';

interface Registration {
  email: string;
  program: string;
  tanggal: string;
  status: string;
  nama?: string;
  testCompleted?: boolean;
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

  // Gate: belum menyelesaikan online test
  if (reg && !reg.testCompleted) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          crumbs={[{ label: 'Beranda' }, { label: 'Kelas Saya' }]}
          title="Kelas Saya"
          subtitle="Informasi dan jadwal kelas pelatihan Anda"
        />
        <div className="flex items-center justify-center py-24 px-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <ClipboardList className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Selesaikan Online Test Terlebih Dahulu</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Pendaftaran Anda untuk program <span className="font-semibold text-gray-700">{reg.program}</span> telah disetujui. Silakan selesaikan online test seleksi sebelum mengakses materi kelas.
            </p>
            <Link
              to="/online-test"
              className="w-full inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold transition-colors text-sm"
            >
              Kerjakan Online Test Sekarang
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        crumbs={[{ label: 'Beranda' }, { label: 'Kelas Saya' }]}
        title="Kelas Saya"
        subtitle="Informasi dan jadwal kelas pelatihan Anda"
      />
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-8 py-10">

        {/* Welcome card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 border-l-4 border-l-blue-600 p-6 flex flex-col sm:flex-row sm:items-center gap-5">
          <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center flex-shrink-0">
            <BookOpen className="w-7 h-7 text-blue-600" />
          </div>
 
          <div className="flex-1 min-w-0">
            <p className="text-sm text-gray-500 mb-0.5">Program yang diikuti</p>
            <h1 className="text-2xl font-bold text-gray-900 leading-tight">
              {reg?.program ?? 'Program Pelatihan'}
            </h1>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 mt-2 text-sm text-gray-500">
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-green-600" />
                Pendaftaran disetujui
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600" />
                Mulai {tanggalMulai}
              </span>
            </div>
          </div>
 
          <div className="bg-green-50 border border-green-100 rounded-xl px-5 py-3 text-center flex-shrink-0 self-start sm:self-center">
            <p className="text-xs text-green-600">Status</p>
            <p className="font-bold text-green-700 mt-0.5">Aktif</p>
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
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                  <FileText className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Materi Pelatihan</h2>
              </div>
              <ul className="space-y-2.5">
                {detail.materi.map((m, i) => (
                  <li key={i} className="flex items-center gap-3">
                    <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-sm text-gray-700">{m}</span>
                  </li>
                ))}
              </ul>
              <button className="mt-5 w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 text-sm font-medium transition-colors">
                <Download className="w-4 h-4" />
                Unduh Modul Pelatihan (PDF)
              </button>
            </div>

            {/* Pengumuman */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-9 h-9 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-bold text-gray-900">Pengumuman</h2>
              </div>
              <div className="space-y-3">
                {PENGUMUMAN.map((p, i) => (
                  <div key={i} className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
                    <p className="text-xs text-blue-500 font-medium mb-1">{p.tanggal}</p>
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
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Instruktur</p>
                  <p className="text-sm font-semibold text-gray-800">{detail.instruktur}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4 text-blue-600" />
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
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">
              <p className="text-xs text-gray-500 mb-2">Ada pertanyaan?</p>
              <p className="text-sm font-semibold text-gray-800 mb-3">Hubungi instruktur atau admin PPKD</p>
              <a
                href="https://wa.me/6221"
               target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                Hubungi Admin
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

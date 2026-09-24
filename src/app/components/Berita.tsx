import { useState } from 'react';
import { Calendar, Tag, ChevronRight, Search, Clock } from 'lucide-react';
import PageHeader from './PageHeader';
import img13 from '../../imports/image-13.png';
import img14 from '../../imports/image-14.png';
import img15 from '../../imports/image-15.png';
import img16 from '../../imports/image-16.png';

interface ArtikelBerita {
  id: number;
  judul: string;
  tanggal: string;
  kategori: 'Kegiatan' | 'Informasi' | 'Pengumuman' | 'Prestasi';
  ringkasan: string;
  foto: string;
  menit: number;
}

const BERITA: ArtikelBerita[] = [
  {
    id: 1,
    judul: 'Jumat Sehat Semangat Luar Biasa: Senam Bugar Bersama Sebagai Langkah Membangun SDM Sehat, Disiplin, & Siap Kerja',
    tanggal: '28 Agustus 2026',
    kategori: 'Kegiatan',
    ringkasan: 'PPKD Jakarta Timur menggelar kegiatan senam bugar setiap Jumat pagi sebagai upaya membangun budaya hidup sehat di lingkungan pelatihan. Kegiatan ini diikuti oleh seluruh peserta pelatihan, instruktur, dan staf dengan penuh semangat.',
    foto: img13,
    menit: 4,
  },
  {
    id: 2,
    judul: 'PPKD Jakarta Timur Terima Kunjungan Delegasi DPI Korea untuk Penguatan Inklusi Disabilitas',
    tanggal: '26 Agustus 2026',
    kategori: 'Kegiatan',
    ringkasan: 'Delegasi dari Disability Person International (DPI) Korea melakukan kunjungan ke PPKD Jakarta Timur dalam rangka studi banding program pelatihan inklusif bagi penyandang disabilitas.',
    foto: img15,
    menit: 3,
  },
  {
    id: 3,
    judul: 'Perdana! Resmi Dibuka Pelatihan Mengemudi SIM A Angkatan I Tahun 2026',
    tanggal: '26 Agustus 2026',
    kategori: 'Informasi',
    ringkasan: 'PPKD Jakarta Timur secara resmi membuka program pelatihan mengemudi SIM A angkatan pertama tahun 2026. Program ini merupakan hasil kolaborasi dengan Satuan Lalu Lintas Polres Jakarta Timur.',
    foto: img14,
    menit: 3,
  },
  {
    id: 4,
    judul: 'PPKD Jakarta Timur Gelar Tes Seleksi OJT The Grove Suites by Grand Aston Jakarta',
    tanggal: '26 Agustus 2026',
    kategori: 'Kegiatan',
    ringkasan: 'Sebanyak 40 peserta mengikuti tes seleksi On the Job Training (OJT) yang diselenggarakan bersama The Grove Suites by Grand Aston Jakarta. Seleksi meliputi tes tertulis, wawancara, dan uji keterampilan.',
    foto: img16,
    menit: 3,
  },
  {
    id: 5,
    judul: 'Gladi Resik dan Persiapan Pembukaan Pelatihan Menuju Profesionalisme Keamanan',
    tanggal: '26 Agustus 2026',
    kategori: 'Kegiatan',
    ringkasan: 'Tim instruktur dan peserta program Satpam melaksanakan gladi resik sebagai persiapan pembukaan resmi pelatihan profesionalisme keamanan angkatan baru.',
    foto: img13,
    menit: 2,
  },
  {
    id: 6,
    judul: 'Motivasi PPKD Jakarta Timur: Siketenagakerjaan, Warga Jakarta Siap Meraih Kemandirian',
    tanggal: '20 Agustus 2026',
    kategori: 'Informasi',
    ringkasan: 'Sesi motivasi dan pembekalan mental wirausaha diberikan kepada peserta pelatihan untuk mempersiapkan mereka menghadapi dunia kerja yang kompetitif.',
    foto: img15,
    menit: 4,
  },
  {
    id: 7,
    judul: 'Hari Praktik Perdana Program Perhotelan: Review Kompetensi Berwawasan Dunia Industri',
    tanggal: '20 Agustus 2026',
    kategori: 'Kegiatan',
    ringkasan: 'Peserta program Perhotelan memulai hari praktik perdana dengan fokus pada review kompetensi dasar pelayanan hotel berkelas internasional.',
    foto: img14,
    menit: 3,
  },
  {
    id: 8,
    judul: 'Pengumuman: Hasil Tes Seleksi Calon Peserta Pelatihan Mengemudi SIM A dan Petugas Keamanan Angkatan III',
    tanggal: '18 Agustus 2026',
    kategori: 'Pengumuman',
    ringkasan: 'Berikut diumumkan hasil tes seleksi calon peserta pelatihan mengemudi SIM A dan Petugas Keamanan angkatan III tahun 2026. Peserta yang lulus seleksi agar segera melakukan registrasi ulang.',
    foto: img16,
    menit: 2,
  },
  {
    id: 9,
    judul: '60 Peserta MTU di Kelurahan Angkatan III Siap Menuju Uji Kompetensi',
    tanggal: '14 Agustus 2026',
    kategori: 'Prestasi',
    ringkasan: 'Sebanyak 60 peserta Mobile Training Unit (MTU) yang tersebar di beberapa kelurahan di Jakarta Timur kini siap menghadapi uji kompetensi akhir program.',
    foto: img13,
    menit: 3,
  },
];

const KATEGORI_COLOR: Record<string, string> = {
  Kegiatan:   'bg-blue-600 text-white',
  Informasi:  'bg-blue-100 text-blue-700',
  Pengumuman: 'bg-yellow-100 text-yellow-700',
  Prestasi:   'bg-green-100 text-green-700',
};

const SEMUA_KATEGORI = ['Semua', 'Kegiatan', 'Informasi', 'Pengumuman', 'Prestasi'] as const;

function NewsImage({ src, alt, className }: { src: string; alt: string; className?: string }) {
  return (
    <img src={src} alt={alt} className={`object-cover ${className ?? ''}`} />
  );
}

function KategoriBadge({ kategori }: { kategori: string }) {
  return (
    <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full ${KATEGORI_COLOR[kategori] ?? 'bg-gray-100 text-gray-600'}`}>
      {kategori}
    </span>
  );
}

export default function Berita() {
  const [cari, setCari] = useState('');
  const [filterKat, setFilterKat] = useState<string>('Semua');

  const featured = BERITA[0];
  const lainnya = BERITA.slice(1);

  const filtered = lainnya.filter(b => {
    const cocokKat = filterKat === 'Semua' || b.kategori === filterKat;
    const cocokCari = b.judul.toLowerCase().includes(cari.toLowerCase());
    return cocokKat && cocokCari;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      <PageHeader
        crumbs={[{ label: 'Pusat Informasi' }, { label: 'Berita' }]}
        title="Berita Terbaru"
        subtitle="Informasi dan kegiatan terkini PPKD Jakarta Timur"
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-8">

          {/* ── Kiri: featured + grid ── */}
          <div className="flex-1 min-w-0 space-y-8">

            {/* Featured article */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="grid md:grid-cols-2">
                <NewsImage src={featured.foto} alt={featured.judul} className="w-full min-h-64 md:h-full" />
                <div className="p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <KategoriBadge kategori={featured.kategori} />
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />{featured.menit} menit baca
                      </span>
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 leading-snug mb-3 hover:text-blue-600 transition-colors cursor-pointer">
                      {featured.judul}
                    </h2>
                    <p className="text-sm text-gray-500 leading-relaxed mb-4">{featured.ringkasan}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-400 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />{featured.tanggal}
                    </span>
                    <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                      Baca selengkapnya <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter kategori */}
            <div className="flex flex-wrap gap-2">
              {SEMUA_KATEGORI.map(k => (
                <button
                  key={k}
                  onClick={() => setFilterKat(k)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                    filterKat === k
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            {/* News grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(b => (
                <article key={b.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
                  <div className="relative">
                    <NewsImage src={b.foto} alt={b.judul} className="h-44 w-full" />
                    <div className="absolute bottom-3 left-3">
                      <KategoriBadge kategori={b.kategori} />
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="text-sm font-bold text-gray-900 leading-snug mb-2 line-clamp-3 group-hover:text-blue-600 transition-colors">
                      {b.judul}
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{b.ringkasan}</p>
                    <div className="flex items-center justify-between text-xs text-gray-400">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{b.tanggal}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{b.menit} mnt</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <Tag className="w-10 h-10 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Tidak ada berita yang cocok dengan pencarian.</p>
              </div>
            )}
          </div>

          {/* ── Kanan: sidebar ── */}
          <aside className="w-full lg:w-72 flex-shrink-0 space-y-6">

            {/* Search */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Cari Berita</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Ketik kata kunci..."
                  value={cari}
                  onChange={e => setCari(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Recent posts */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Berita Terbaru</h3>
              <div className="space-y-4">
                {BERITA.slice(0, 5).map(b => (
                  <div key={b.id} className="flex gap-3 group cursor-pointer">
                    <NewsImage src={b.foto} alt={b.judul} className="w-14 h-14 rounded-xl flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-800 leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {b.judul}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-1 flex items-center gap-1">
                        <Calendar className="w-3 h-3" />{b.tanggal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Kategori */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Kategori</h3>
              <div className="space-y-2">
                {SEMUA_KATEGORI.filter(k => k !== 'Semua').map(k => {
                  const count = BERITA.filter(b => b.kategori === k).length;
                  return (
                    <button
                      key={k}
                      onClick={() => setFilterKat(k)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-colors ${
                        filterKat === k
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5" />{k}
                      </span>
                      <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

          </aside>
        </div>
      </div>
    </div>
  );
}

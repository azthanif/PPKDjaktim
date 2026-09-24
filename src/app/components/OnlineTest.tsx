import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { FileText, Clock, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Home, Trophy, XCircle, ChevronRight as Arrow, Smartphone, BarChart2, Monitor, Coffee, ChefHat, UtensilsCrossed, Leaf, Palette, PenTool, Camera, Film, Globe, Shield, Wrench, Zap, Hotel, Sparkles, Heart, Scissors, BookOpen, Shirt } from 'lucide-react';
import PageHeader from './PageHeader';
import { useAuth } from '../context/AuthContext';

type Kategori =
  | 'Semua'
  | 'Teknologi & Digital'
  | 'Kuliner & F&B'
  | 'Kreatif & Desain'
  | 'Teknik & Mesin'
  | 'Hospitality'
  | 'Kecantikan & Spa'
  | 'Bahasa & Komunikasi'
  | 'Bisnis & Administrasi'
  | 'Mode & Busana'
  | 'Keamanan';

interface Program {
  nama: string;
  kategori: Kategori;
  durasi: string;
  difficulty: 'Pemula' | 'Menengah';
  Icon: React.ComponentType<{ className?: string }>;
  iconBg: string;
  iconColor: string;
}

const PROGRAMS: Program[] = [
  // Teknologi & Digital
  { nama: 'Digital Marketing',        kategori: 'Teknologi & Digital',   durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Smartphone,    iconBg: 'bg-blue-100',   iconColor: 'text-blue-600' },
  { nama: 'Data Analysis',            kategori: 'Teknologi & Digital',   durasi: '3 Bulan', difficulty: 'Menengah', Icon: BarChart2,     iconBg: 'bg-blue-100',   iconColor: 'text-blue-600' },
  { nama: 'Web Development',          kategori: 'Teknologi & Digital',   durasi: '3 Bulan', difficulty: 'Menengah', Icon: Monitor,       iconBg: 'bg-blue-100',   iconColor: 'text-blue-600' },
  { nama: 'Desain UI/UX',             kategori: 'Teknologi & Digital',   durasi: '2 Bulan', difficulty: 'Menengah', Icon: Palette,       iconBg: 'bg-blue-100',   iconColor: 'text-blue-600' },
  // Kuliner & F&B
  { nama: 'Barista',                  kategori: 'Kuliner & F&B',         durasi: '1 Bulan', difficulty: 'Pemula',   Icon: Coffee,        iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { nama: 'Pastry & Bakery',          kategori: 'Kuliner & F&B',         durasi: '2 Bulan', difficulty: 'Pemula',   Icon: ChefHat,       iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { nama: 'Tata Boga',                kategori: 'Kuliner & F&B',         durasi: '3 Bulan', difficulty: 'Pemula',   Icon: UtensilsCrossed, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { nama: 'Pengolahan Makanan Sehat', kategori: 'Kuliner & F&B',         durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Leaf,          iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  // Kreatif & Desain
  { nama: 'Desain Grafis',            kategori: 'Kreatif & Desain',      durasi: '2 Bulan', difficulty: 'Pemula',   Icon: PenTool,       iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { nama: 'Fotografi & Videografi',   kategori: 'Kreatif & Desain',      durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Camera,        iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { nama: 'Animasi Digital',          kategori: 'Kreatif & Desain',      durasi: '3 Bulan', difficulty: 'Menengah', Icon: Film,          iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  // Teknik & Mesin
  { nama: 'Las Plat',                 kategori: 'Teknik & Mesin',        durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Wrench,        iconBg: 'bg-amber-100',  iconColor: 'text-amber-700' },
  { nama: 'Las Pipa',                 kategori: 'Teknik & Mesin',        durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Wrench,        iconBg: 'bg-amber-100',  iconColor: 'text-amber-700' },
  { nama: 'Sistem Injeksi',           kategori: 'Teknik & Mesin',        durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Zap,           iconBg: 'bg-amber-100',  iconColor: 'text-amber-700' },
  { nama: 'Service Sepeda Motor',     kategori: 'Teknik & Mesin',        durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Wrench,        iconBg: 'bg-amber-100',  iconColor: 'text-amber-700' },
  { nama: 'Mechanical Electrical',    kategori: 'Teknik & Mesin',        durasi: '3 Bulan', difficulty: 'Menengah', Icon: Zap,           iconBg: 'bg-amber-100',  iconColor: 'text-amber-700' },
  // Hospitality
  { nama: 'Housekeeping',             kategori: 'Hospitality',           durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Hotel,         iconBg: 'bg-teal-100',   iconColor: 'text-teal-600' },
  { nama: 'Food and Beverage Service',kategori: 'Hospitality',           durasi: '2 Bulan', difficulty: 'Pemula',   Icon: UtensilsCrossed, iconBg: 'bg-teal-100', iconColor: 'text-teal-600' },
  // Kecantikan & Spa
  { nama: 'Perawatan Kecantikan',     kategori: 'Kecantikan & Spa',      durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Sparkles,      iconBg: 'bg-pink-100',   iconColor: 'text-pink-600' },
  { nama: 'Make Up Artist',           kategori: 'Kecantikan & Spa',      durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Heart,         iconBg: 'bg-pink-100',   iconColor: 'text-pink-600' },
  { nama: 'Terapis Spa',              kategori: 'Kecantikan & Spa',      durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Heart,         iconBg: 'bg-pink-100',   iconColor: 'text-pink-600' },
  { nama: 'Perias Rambut',            kategori: 'Kecantikan & Spa',      durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Scissors,      iconBg: 'bg-pink-100',   iconColor: 'text-pink-600' },
  // Bahasa & Komunikasi
  { nama: 'Bahasa Inggris',           kategori: 'Bahasa & Komunikasi',   durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Globe,         iconBg: 'bg-sky-100',    iconColor: 'text-sky-600' },
  { nama: 'Bahasa Jepang',            kategori: 'Bahasa & Komunikasi',   durasi: '3 Bulan', difficulty: 'Pemula',   Icon: Globe,         iconBg: 'bg-sky-100',    iconColor: 'text-sky-600' },
  // Bisnis & Administrasi
  { nama: 'Administrasi Perkantoran', kategori: 'Bisnis & Administrasi', durasi: '2 Bulan', difficulty: 'Pemula',   Icon: BookOpen,      iconBg: 'bg-slate-100',  iconColor: 'text-slate-600' },
  // Mode & Busana
  { nama: 'Penjahit Busana',          kategori: 'Mode & Busana',         durasi: '3 Bulan', difficulty: 'Pemula',   Icon: Shirt,         iconBg: 'bg-rose-100',   iconColor: 'text-rose-600' },
  // Keamanan
  { nama: 'Petugas Keamanan',         kategori: 'Keamanan',              durasi: '2 Bulan', difficulty: 'Pemula',   Icon: Shield,        iconBg: 'bg-gray-100',   iconColor: 'text-gray-600' },
];

const KATEGORI_TABS: Kategori[] = [
  'Semua',
  'Teknologi & Digital',
  'Kuliner & F&B',
  'Kreatif & Desain',
  'Teknik & Mesin',
  'Hospitality',
  'Kecantikan & Spa',
  'Bahasa & Komunikasi',
  'Bisnis & Administrasi',
  'Mode & Busana',
  'Keamanan',
];

const KATEGORI_COLOR: Record<Kategori, string> = {
  'Semua':               'bg-gray-100 text-gray-600',
  'Teknologi & Digital': 'bg-blue-50 text-blue-700',
  'Kuliner & F&B':       'bg-orange-50 text-orange-700',
  'Kreatif & Desain':    'bg-purple-50 text-purple-700',
  'Teknik & Mesin':      'bg-amber-50 text-amber-700',
  'Hospitality':         'bg-teal-50 text-teal-700',
  'Kecantikan & Spa':    'bg-pink-50 text-pink-700',
  'Bahasa & Komunikasi': 'bg-sky-50 text-sky-700',
  'Bisnis & Administrasi':'bg-slate-100 text-slate-600',
  'Mode & Busana':       'bg-rose-50 text-rose-700',
  'Keamanan':            'bg-gray-100 text-gray-600',
};

const SOAL = [
  {
    pertanyaan: 'Lembaga PPKD (Pusat Pelatihan Kerja Daerah) berada di bawah naungan dinas apa?',
    pilihan: ['Dinas Pendidikan', 'Dinas Tenaga Kerja dan Transmigrasi', 'Dinas Sosial', 'Dinas Perindustrian'],
    jawaban: 1,
  },
  {
    pertanyaan: 'Apa kepanjangan dari BNSP?',
    pilihan: ['Badan Nasional Standarisasi Profesi', 'Badan Nasional Sertifikasi Profesi', 'Badan Negara Sertifikasi Pelatihan', 'Biro Nasional Sertifikasi Profesi'],
    jawaban: 1,
  },
  {
    pertanyaan: 'Sebuah toko membeli barang seharga Rp 80.000 dan menjualnya dengan keuntungan 25%. Berapa harga jual barang tersebut?',
    pilihan: ['Rp 95.000', 'Rp 100.000', 'Rp 105.000', 'Rp 110.000'],
    jawaban: 1,
  },
  {
    pertanyaan: 'Kata yang penulisannya TIDAK baku adalah...',
    pilihan: ['Apotek', 'Fotokopi', 'Ijazah', 'Praktek'],
    jawaban: 3,
  },
  {
    pertanyaan: 'Jika A lebih tua dari B, dan C lebih muda dari B, maka urutan dari yang termuda adalah...',
    pilihan: ['A, B, C', 'B, C, A', 'C, B, A', 'C, A, B'],
    jawaban: 2,
  },
  {
    pertanyaan: 'Dalam dunia kuliner, teknik "sauté" adalah teknik memasak dengan cara...',
    pilihan: ['Menggoreng dalam minyak banyak', 'Menumis dengan sedikit minyak api besar', 'Merebus dalam air mendidih', 'Memanggang di oven'],
    jawaban: 1,
  },
  {
    pertanyaan: 'Berapa nilai dari 15% × 240?',
    pilihan: ['32', '34', '36', '38'],
    jawaban: 2,
  },
  {
    pertanyaan: 'Dalam desain grafis, RGB adalah singkatan dari...',
    pilihan: ['Red, Green, Blue', 'Red, Gray, Black', 'Ratio, Gradient, Brightness', 'Resolution, Graphic, Bitmap'],
    jawaban: 0,
  },
  {
    pertanyaan: 'Apa yang dimaksud dengan K3 dalam dunia kerja?',
    pilihan: ['Kualitas, Kuantitas, Kecepatan', 'Keselamatan dan Kesehatan Kerja', 'Kreativitas, Kompetensi, Karir', 'Koordinasi, Komunikasi, Kerja sama'],
    jawaban: 1,
  },
  {
    pertanyaan: 'Sebuah proyek dikerjakan oleh 6 orang selama 10 hari. Jika hanya ada 4 orang, berapa hari yang dibutuhkan?',
    pilihan: ['12 hari', '13 hari', '15 hari', '18 hari'],
    jawaban: 2,
  },
  {
    pertanyaan: 'Dalam digital marketing, SEO adalah singkatan dari...',
    pilihan: ['Social Engagement Optimization', 'Search Engine Optimization', 'Site Exposure Online', 'Sales and Engagement Online'],
    jawaban: 1,
  },
  {
    pertanyaan: 'Manakah yang merupakan contoh soft skill?',
    pilihan: ['Kemampuan mengoperasikan mesin las', 'Kemampuan menggunakan Microsoft Excel', 'Kemampuan berkomunikasi secara efektif', 'Kemampuan membuat kue'],
    jawaban: 2,
  },
  {
    pertanyaan: 'Deret berikut: 2, 6, 18, 54, ... Bilangan selanjutnya adalah...',
    pilihan: ['108', '144', '162', '216'],
    jawaban: 2,
  },
  {
    pertanyaan: 'Kata "efisien" memiliki makna yang paling dekat dengan...',
    pilihan: ['Hemat dan tepat guna', 'Cepat dan sembrono', 'Mahal namun berkualitas', 'Lambat namun teliti'],
    jawaban: 0,
  },
  {
    pertanyaan: 'Dalam fotografi, istilah "depth of field" mengacu pada...',
    pilihan: ['Kecepatan rana kamera', 'Rentang area yang tampak tajam dalam foto', 'Tingkat kecerahan gambar', 'Ukuran sensor kamera'],
    jawaban: 1,
  },
  {
    pertanyaan: 'Manakah contoh perilaku profesional di tempat kerja?',
    pilihan: ['Datang terlambat tetapi bekerja keras', 'Memakai seragam dan datang tepat waktu', 'Mengobrol saat jam kerja berlangsung', 'Mengabaikan arahan atasan'],
    jawaban: 1,
  },
  {
    pertanyaan: 'Jika harga sebuah barang naik dari Rp 40.000 menjadi Rp 50.000, berapa persen kenaikannya?',
    pilihan: ['20%', '25%', '30%', '35%'],
    jawaban: 1,
  },
  {
    pertanyaan: 'Dalam animasi, "frame rate" (FPS) yang umum digunakan untuk tampilan yang halus adalah...',
    pilihan: ['12 FPS', '18 FPS', '24 FPS', '30 FPS'],
    jawaban: 3,
  },
  {
    pertanyaan: 'Tujuan utama dari sertifikasi kompetensi adalah...',
    pilihan: ['Mendapatkan gaji lebih tinggi', 'Membuktikan kemampuan kerja secara resmi dan terstandar', 'Syarat masuk perguruan tinggi', 'Menggantikan ijazah sekolah'],
    jawaban: 1,
  },
  {
    pertanyaan: 'Manakah sikap yang mencerminkan etos kerja yang baik?',
    pilihan: ['Menunggu diperintah sebelum bekerja', 'Berinisiatif menyelesaikan tugas tanpa diminta', 'Menghindari pekerjaan yang sulit', 'Memprioritaskan kepentingan pribadi'],
    jawaban: 1,
  },
];

const DURASI = 60 * 60; // 60 menit dalam detik

function formatWaktu(detik: number) {
  const m = Math.floor(detik / 60).toString().padStart(2, '0');
  const s = (detik % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function HalamanUjian({ onSelesai, namaProgram }: { onSelesai: (nilai: number, jawaban: number[]) => void; namaProgram: string }) {
  const [soalAktif, setSoalAktif] = useState(0);
  const [jawaban, setJawaban] = useState<number[]>(Array(SOAL.length).fill(-1));
  const [sisa, setSisa] = useState(DURASI);
  const [showKonfirmasi, setShowKonfirmasi] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setSisa(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current!);
          hitungNilai(jawaban);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current!);
  }, []);

  // Blokir navigasi browser saat ujian berlangsung
  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = '';
    };
    window.addEventListener('beforeunload', handler);
    return () => window.removeEventListener('beforeunload', handler);
  }, []);

  const hitungNilai = (jwb: number[]) => {
    const benar = jwb.filter((j, i) => j === SOAL[i].jawaban).length;
    const nilai = Math.round((benar / SOAL.length) * 100);
    onSelesai(nilai, jwb);
  };

  const pilihJawaban = (idx: number) => {
    setJawaban(prev => { const next = [...prev]; next[soalAktif] = idx; return next; });
  };

  const sudahDijawab = jawaban.filter(j => j !== -1).length;
  const persen = sisa / DURASI;
  const timerKritis = sisa < 300;

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-100 flex flex-col overflow-hidden">
      {/* Header */}
      <div className={`flex items-center justify-between px-6 py-3 shadow-md flex-shrink-0 ${timerKritis ? 'bg-red-600' : 'bg-blue-700'} text-white transition-colors`}>
        <div className="font-bold text-lg">Ujian Seleksi — {namaProgram}</div>
        <div className={`flex items-center gap-2 font-mono text-2xl font-bold ${timerKritis ? 'animate-pulse' : ''}`}>
          <Clock className="w-5 h-5" />
          {formatWaktu(sisa)}
        </div>
        <div className="text-sm text-white/80">{sudahDijawab}/{SOAL.length} terjawab</div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-gray-200 flex-shrink-0">
        <div
          className={`h-full transition-all duration-1000 ${timerKritis ? 'bg-red-500' : 'bg-blue-500'}`}
          style={{ width: `${persen * 100}%` }}
        />
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Panel soal */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-3xl mx-auto">
            <p className="text-xs text-gray-400 mb-2 font-medium">Soal {soalAktif + 1} dari {SOAL.length}</p>
            <h2 className="text-xl font-bold text-gray-900 mb-6 leading-relaxed">{SOAL[soalAktif].pertanyaan}</h2>
            <div className="space-y-3">
              {SOAL[soalAktif].pilihan.map((p, i) => {
                const dipilih = jawaban[soalAktif] === i;
                return (
                  <button
                    key={i}
                    onClick={() => pilihJawaban(i)}
                    className={`w-full text-left px-5 py-4 rounded-xl border-2 transition-all flex items-center gap-3 ${
                      dipilih
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-50/50'
                    }`}
                  >
                    <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                      dipilih ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {String.fromCharCode(65 + i)}
                    </span>
                    {p}
                  </button>
                );
              })}
            </div>

            {/* Navigasi soal */}
            <div className="flex items-center justify-between mt-8">
              <button
                onClick={() => setSoalAktif(s => Math.max(0, s - 1))}
                disabled={soalAktif === 0}
                className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Sebelumnya
              </button>
              {soalAktif < SOAL.length - 1 ? (
                <button
                  onClick={() => setSoalAktif(s => Math.min(SOAL.length - 1, s + 1))}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                >
                  Berikutnya <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => setShowKonfirmasi(true)}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-green-600 text-white hover:bg-green-700 font-bold transition-colors"
                >
                  <CheckCircle className="w-4 h-4" /> Selesai & Submit
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Panel navigasi soal */}
        <div className="w-64 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0 p-4">
          <p className="text-xs font-semibold text-gray-500 mb-3 uppercase tracking-wide">Navigasi Soal</p>
          <div className="grid grid-cols-5 gap-1.5 mb-6">
            {SOAL.map((_, i) => (
              <button
                key={i}
                onClick={() => setSoalAktif(i)}
                className={`aspect-square rounded-lg text-xs font-bold transition-all ${
                  i === soalAktif
                    ? 'bg-blue-600 text-white ring-2 ring-blue-300'
                    : jawaban[i] !== -1
                      ? 'bg-green-100 text-green-700 border border-green-300'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2"><span className="w-5 h-5 rounded bg-green-100 border border-green-300 inline-block" /> Sudah dijawab</div>
            <div className="flex items-center gap-2"><span className="w-5 h-5 rounded bg-gray-100 inline-block" /> Belum dijawab</div>
            <div className="flex items-center gap-2"><span className="w-5 h-5 rounded bg-blue-600 inline-block" /> Soal aktif</div>
          </div>
          <button
            onClick={() => setShowKonfirmasi(true)}
            className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-bold transition-colors"
          >
            Submit Ujian
          </button>
        </div>
      </div>

      {/* Modal konfirmasi submit */}
      {showKonfirmasi && (
        <div className="fixed inset-0 bg-black/50 z-[10000] flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Yakin ingin submit?</h3>
            <p className="text-sm text-gray-600 mb-1">
              Soal terjawab: <span className="font-semibold text-blue-600">{sudahDijawab}</span> dari {SOAL.length}
            </p>
            {sudahDijawab < SOAL.length && (
              <p className="text-sm text-yellow-600 mb-4">
                ⚠️ Masih ada <b>{SOAL.length - sudahDijawab}</b> soal yang belum dijawab.
              </p>
            )}
            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowKonfirmasi(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Lanjut Kerjakan
              </button>
              <button
                onClick={() => { clearInterval(intervalRef.current!); hitungNilai(jawaban); }}
                className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2.5 rounded-lg text-sm font-bold transition-colors"
              >
                Ya, Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function HalamanHasil({ nilai, jawaban, onKembali }: { nilai: number; jawaban: number[]; onKembali: () => void }) {
  const lulus = nilai >= 70;
  const benar = jawaban.filter((j, i) => j === SOAL[i].jawaban).length;

  return (
    <div className="fixed inset-0 z-[9999] bg-gray-100 flex flex-col overflow-y-auto">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-2xl w-full">
          {/* Hasil utama */}
          <div className={`rounded-2xl p-8 text-center mb-6 ${lulus ? 'bg-green-50 border-2 border-green-200' : 'bg-red-50 border-2 border-red-200'}`}>
            <div className={`w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center ${lulus ? 'bg-green-100' : 'bg-red-100'}`}>
              {lulus
                ? <Trophy className="w-10 h-10 text-green-600" />
                : <XCircle className="w-10 h-10 text-red-500" />
              }
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-1">{lulus ? 'Selamat! Anda Lulus' : 'Belum Lulus'}</h2>
            <p className="text-gray-500 mb-6">{lulus ? 'Anda memenuhi syarat untuk mengikuti pelatihan' : 'Nilai Anda belum memenuhi batas minimum kelulusan'}</p>
            <div className="text-7xl font-black mb-2" style={{ color: lulus ? '#16a34a' : '#dc2626' }}>{nilai}</div>
            <p className="text-sm text-gray-500">Nilai minimum kelulusan: 70</p>
          </div>

          {/* Ringkasan */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-green-600">{benar}</p>
              <p className="text-xs text-gray-500 mt-1">Jawaban Benar</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-red-500">{SOAL.length - benar}</p>
              <p className="text-xs text-gray-500 mt-1">Jawaban Salah</p>
            </div>
            <div className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100">
              <p className="text-2xl font-bold text-gray-900">{SOAL.length}</p>
              <p className="text-xs text-gray-500 mt-1">Total Soal</p>
            </div>
          </div>

          {/* Kembali ke beranda */}
          <button
            onClick={onKembali}
            className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-bold text-base transition-colors shadow-md"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OnlineTest() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [fase, setFase] = useState<'info' | 'ujian' | 'hasil'>('info');
  const [hasil, setHasil] = useState<{ nilai: number; jawaban: number[] } | null>(null);

  // Baca registrasi dari localStorage — sama dengan pola KelasSaya
  const reg = (() => {
    try {
      const list = JSON.parse(localStorage.getItem('ppkd_registrations') || '[]');
      return (user
        ? list.find((r: { email: string }) => r.email === user.email)
        : list[0]) ?? null;
    } catch { return null; }
  })();

  // Temukan objek Program yang cocok dengan program yang didaftarkan
  const registeredProgram = reg
    ? PROGRAMS.find(p => p.nama === reg.program) ?? null
    : null;

  const handleSelesai = (nilai: number, jawaban: number[]) => {
    // Simpan hasil test ke registrasi di localStorage
    try {
      const list = JSON.parse(localStorage.getItem('ppkd_registrations') || '[]');
      const updated = list.map((r: { email: string }) =>
        r.email === (user?.email ?? '') ? { ...r, testCompleted: true, testNilai: nilai } : r
      );
      localStorage.setItem('ppkd_registrations', JSON.stringify(updated));
    } catch { /* ignore */ }
    setHasil({ nilai, jawaban });
    setFase('hasil');
  };

  if (fase === 'ujian') return (
    <HalamanUjian onSelesai={handleSelesai} namaProgram={registeredProgram?.nama ?? ''} />
  );
  if (fase === 'hasil' && hasil) return (
    <HalamanHasil nilai={hasil.nilai} jawaban={hasil.jawaban} onKembali={() => navigate('/')} />
  );

  // ── Gate: belum login ──
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          crumbs={[{ label: 'Pelatihan' }, { label: 'Online Test' }]}
          title="Online Test"
          subtitle="Uji kompetensi seleksi masuk program pelatihan"
        />
        <div className="flex items-center justify-center py-24 px-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-7 h-7 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Login Terlebih Dahulu</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Anda perlu login untuk mengakses Online Test.
            </p>
            <button
              onClick={() => navigate('/login')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold transition-colors"
            >
              Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Gate: belum mendaftar ──
  if (!reg) {
    return (
      <div className="min-h-screen bg-gray-50">
        <PageHeader
          crumbs={[{ label: 'Pelatihan' }, { label: 'Online Test' }]}
          title="Online Test"
          subtitle="Uji kompetensi seleksi masuk program pelatihan"
        />
        <div className="flex items-center justify-center py-24 px-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-10 max-w-md w-full text-center">
            <div className="w-14 h-14 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-5">
              <AlertCircle className="w-7 h-7 text-yellow-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Belum Mendaftar</h2>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Online Test hanya tersedia untuk pendaftar yang telah mengisi formulir pendaftaran. Daftar terlebih dahulu untuk mengakses fitur ini.
            </p>
            <button
              onClick={() => navigate('/pendaftaran')}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-full font-semibold transition-colors mb-3"
            >
              Daftar Sekarang
            </button>
            <button
              onClick={() => navigate('/program-jadwal')}
              className="w-full border border-gray-200 text-gray-600 hover:text-gray-900 py-3 rounded-full font-semibold transition-colors text-sm"
            >
              Lihat Program Pelatihan
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Halaman utama: program terkunci sesuai pendaftaran ──
  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        crumbs={[{ label: 'Pelatihan' }, { label: 'Online Test' }]}
        title="Online Test"
        subtitle="Uji kompetensi seleksi masuk program pelatihan"
      />
      <section className="py-12">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 space-y-6">

          {/* Program terdaftar — terkunci */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Program Anda</p>
            <div className="flex items-center gap-4">
              {registeredProgram && (
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${registeredProgram.iconBg}`}>
                  <registeredProgram.Icon className={`w-6 h-6 ${registeredProgram.iconColor}`} />
                </div>
              )}
              <div>
                <h2 className="text-xl font-bold text-gray-900">{reg.program}</h2>
                {registeredProgram && (
                  <p className="text-sm text-gray-400 mt-0.5">
                    {registeredProgram.kategori} · {registeredProgram.durasi} · {registeredProgram.difficulty}
                  </p>
                )}
              </div>
              <span className="ml-auto text-xs bg-blue-50 text-blue-600 font-semibold px-3 py-1 rounded-full">Terdaftar</span>
            </div>
          </div>

          {/* Info test */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { Icon: FileText, label: `${SOAL.length} Soal`, sub: 'Pilihan ganda' },
              { Icon: Clock,    label: '60 Menit',             sub: 'Waktu pengerjaan' },
              { Icon: CheckCircle, label: 'Min. 70',           sub: 'Nilai kelulusan' },
            ].map(({ Icon, label, sub }) => (
              <div key={label} className="bg-white rounded-xl p-5 text-center border border-gray-100 shadow-sm">
                <Icon className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="font-bold text-gray-900">{label}</p>
                <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
              </div>
            ))}
          </div>

          {/* Petunjuk */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-900 mb-4">Petunjuk Pengerjaan</h3>
            <div className="space-y-3">
              {[
                'Pastikan koneksi internet Anda stabil sebelum memulai test',
                'Baca setiap soal dengan teliti sebelum menjawab',
                'Anda dapat mengubah jawaban selama waktu pengerjaan belum habis',
                'Klik tombol "Submit" setelah selesai mengerjakan semua soal',
                'Hasil test akan langsung ditampilkan setelah submit',
              ].map((item, i) => (
                <div key={i} className="flex gap-3">
                  <span className="w-5 h-5 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">{i + 1}</span>
                  <span className="text-sm text-gray-600 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Perhatian */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-5 flex gap-3">
            <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 mb-1.5 text-sm">Perhatian</p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>· Test hanya dapat dikerjakan satu kali</li>
                <li>· Jangan menutup browser atau refresh halaman saat mengerjakan test</li>
                <li>· Jika terjadi gangguan teknis, segera hubungi administrator</li>
              </ul>
            </div>
          </div>

          {/* Tombol mulai */}
          <button
            onClick={() => setFase('ujian')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold text-base transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            Mulai Online Test — {reg.program}
            <Arrow className="w-5 h-5" />
          </button>

        </div>
      </section>
    </div>
  );
}

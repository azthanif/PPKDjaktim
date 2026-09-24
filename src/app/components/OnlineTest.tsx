import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import { FileText, Clock, CheckCircle, AlertCircle, ChevronLeft, ChevronRight, Home, Trophy, XCircle, ChevronRight as Arrow, Smartphone, BarChart2, Monitor, Coffee, ChefHat, UtensilsCrossed, Leaf, Palette, PenTool, Camera, Film } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

type Kategori = 'Semua' | 'Teknologi & Digital' | 'Kuliner & F&B' | 'Kreatif & Desain';

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
  { nama: 'Digital Marketing', kategori: 'Teknologi & Digital', durasi: '3 Bulan', difficulty: 'Pemula', Icon: Smartphone, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { nama: 'Data Analysis', kategori: 'Teknologi & Digital', durasi: '3 Bulan', difficulty: 'Menengah', Icon: BarChart2, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { nama: 'Web Development', kategori: 'Teknologi & Digital', durasi: '4 Bulan', difficulty: 'Menengah', Icon: Monitor, iconBg: 'bg-blue-100', iconColor: 'text-blue-600' },
  { nama: 'Barista', kategori: 'Kuliner & F&B', durasi: '2 Bulan', difficulty: 'Pemula', Icon: Coffee, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { nama: 'Pastry & Bakery', kategori: 'Kuliner & F&B', durasi: '2 Bulan', difficulty: 'Pemula', Icon: ChefHat, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { nama: 'Tata Boga', kategori: 'Kuliner & F&B', durasi: '3 Bulan', difficulty: 'Pemula', Icon: UtensilsCrossed, iconBg: 'bg-orange-100', iconColor: 'text-orange-600' },
  { nama: 'Pengolahan Makanan Sehat', kategori: 'Kuliner & F&B', durasi: '2 Bulan', difficulty: 'Pemula', Icon: Leaf, iconBg: 'bg-green-100', iconColor: 'text-green-600' },
  { nama: 'Desain UI/UX', kategori: 'Kreatif & Desain', durasi: '3 Bulan', difficulty: 'Menengah', Icon: Palette, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { nama: 'Desain Grafis', kategori: 'Kreatif & Desain', durasi: '3 Bulan', difficulty: 'Pemula', Icon: PenTool, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { nama: 'Fotografi & Videografi', kategori: 'Kreatif & Desain', durasi: '3 Bulan', difficulty: 'Pemula', Icon: Camera, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
  { nama: 'Animasi Digital', kategori: 'Kreatif & Desain', durasi: '4 Bulan', difficulty: 'Menengah', Icon: Film, iconBg: 'bg-purple-100', iconColor: 'text-purple-600' },
];

const KATEGORI_TABS: Kategori[] = ['Semua', 'Teknologi & Digital', 'Kuliner & F&B', 'Kreatif & Desain'];

const KATEGORI_COLOR: Record<Kategori, string> = {
  'Semua': 'bg-gray-100 text-gray-600',
  'Teknologi & Digital': 'bg-blue-50 text-blue-700',
  'Kuliner & F&B': 'bg-orange-50 text-orange-700',
  'Kreatif & Desain': 'bg-purple-50 text-purple-700',
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
  const [showLoginMsg, setShowLoginMsg] = useState(false);
  const [fase, setFase] = useState<'info' | 'ujian' | 'hasil'>('info');
  const [hasil, setHasil] = useState<{ nilai: number; jawaban: number[] } | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [activeKategori, setActiveKategori] = useState<Kategori>('Semua');

  const filteredPrograms = activeKategori === 'Semua'
    ? PROGRAMS
    : PROGRAMS.filter(p => p.kategori === activeKategori);

  const handleMulaiTest = () => {
    if (!user) { setShowLoginMsg(true); return; }
    if (!selectedProgram) return;
    setShowLoginMsg(false);
    setFase('ujian');
  };

  const handleSelesai = (nilai: number, jawaban: number[]) => {
    setHasil({ nilai, jawaban });
    setFase('hasil');
  };

  const handleKembali = () => {
    navigate('/');
  };

  if (fase === 'ujian') return <HalamanUjian onSelesai={handleSelesai} namaProgram={selectedProgram?.nama ?? ''} />;
  if (fase === 'hasil' && hasil) return <HalamanHasil nilai={hasil.nilai} jawaban={hasil.jawaban} onKembali={handleKembali} />;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-10">

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Tentang Online Test</h2>
            <p className="text-gray-600 mb-8">
              Online test merupakan tahap seleksi awal untuk mengukur kemampuan dasar dan kesiapan calon peserta pelatihan. Test ini dirancang untuk memastikan peserta memiliki pemahaman yang cukup untuk mengikuti program pelatihan yang dipilih.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <FileText className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-gray-900">{SOAL.length} Soal</h3>
                  <p className="text-sm text-gray-500">Pilihan ganda</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Clock className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-gray-900">60 Menit</h3>
                  <p className="text-sm text-gray-500">Waktu pengerjaan</p>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 flex items-center gap-4 shadow-sm border border-gray-100">
                <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-bold text-2xl text-gray-900">Nilai Min. 70</h3>
                  <p className="text-sm text-gray-500">Untuk lulus seleksi</p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Petunjuk Pengerjaan</h2>
            <div className="flex flex-col gap-3">
              {[
                'Pastikan koneksi internet Anda stabil sebelum memulai test',
                'Baca setiap soal dengan teliti sebelum menjawab',
                'Anda dapat mengubah jawaban selama waktu pengerjaan belum habis',
                'Klik tombol "Submit" setelah selesai mengerjakan semua soal',
                'Hasil test akan langsung ditampilkan setelah submit',
              ].map((item, i) => (
                <div key={i} className="flex gap-3 bg-white rounded-xl px-5 py-4 shadow-sm border border-gray-100">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">{i + 1}</span>
                  <span className="text-gray-700 text-base">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex gap-3">
              <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-900 mb-2">Perhatian!</h3>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  <li>• Test hanya dapat dikerjakan satu kali</li>
                  <li>• Jangan menutup browser atau refresh halaman saat mengerjakan test</li>
                  <li>• Jika terjadi gangguan teknis, segera hubungi administrator</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Pilih Program */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Pilih Program Pelatihan</h2>
            <p className="text-gray-500 mb-6">Pilih salah satu program di bawah untuk mengikuti test seleksi.</p>

            {/* Tab kategori */}
            <div className="flex flex-wrap gap-2 mb-5">
              {KATEGORI_TABS.map(k => (
                <button
                  key={k}
                  onClick={() => setActiveKategori(k)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                    activeKategori === k
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-white text-gray-500 border-gray-200 hover:border-blue-300'
                  }`}
                >
                  {k}
                </button>
              ))}
            </div>

            {/* Grid card program */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPrograms.map(program => {
                const isSelected = selectedProgram?.nama === program.nama;
                return (
                  <button
                    key={program.nama}
                    onClick={() => setSelectedProgram(isSelected ? null : program)}
                    className={`text-left rounded-2xl border-2 p-5 transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50 shadow-md shadow-blue-100'
                        : 'border-gray-100 bg-white hover:border-blue-300 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-blue-200' : program.iconBg}`}>
                        <program.Icon className={`w-5 h-5 ${isSelected ? 'text-blue-700' : program.iconColor}`} />
                      </div>
                      {isSelected && (
                        <span className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </span>
                      )}
                    </div>
                    <h3 className={`font-bold text-base mb-2 ${isSelected ? 'text-blue-800' : 'text-gray-900'}`}>
                      {program.nama}
                    </h3>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${KATEGORI_COLOR[program.kategori]}`}>
                        {program.kategori}
                      </span>
                      <span className="text-xs text-gray-400">{program.durasi}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        program.difficulty === 'Pemula' ? 'bg-green-50 text-green-600' : 'bg-yellow-50 text-yellow-600'
                      }`}>{program.difficulty}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Selected program banner + Mulai Test */}
          <div className={`sticky bottom-4 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg border transition-all ${
            selectedProgram
              ? 'bg-blue-700 border-blue-700'
              : 'bg-white border-gray-200'
          }`}>
            <div>
              {selectedProgram ? (
                <>
                  <p className="text-xs text-blue-200 mb-0.5">Program dipilih</p>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center flex-shrink-0">
                      <selectedProgram.Icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="font-bold text-white text-lg">{selectedProgram.nama}</p>
                  </div>
                </>
              ) : (
                <p className="text-gray-400 text-sm font-medium">Pilih program pelatihan terlebih dahulu untuk memulai test</p>
              )}
            </div>
            <div className="flex flex-col items-center sm:items-end gap-1 flex-shrink-0">
              <button
                onClick={handleMulaiTest}
                disabled={!selectedProgram}
                className={`px-8 py-3 rounded-xl font-bold text-base transition-all flex items-center gap-2 ${
                  selectedProgram
                    ? 'bg-white text-blue-700 hover:bg-blue-50 shadow-sm'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                MULAI TEST
                <Arrow className="w-4 h-4" />
              </button>
              {showLoginMsg && (
                <p className="text-xs text-red-300 font-medium">Login untuk mengerjakan test</p>
              )}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

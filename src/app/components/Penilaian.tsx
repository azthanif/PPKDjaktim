import { useState, useEffect } from 'react';
import { Star, MessageSquare, ThumbsUp, Send, User } from 'lucide-react';
import PageHeader from './PageHeader';
import { useAuth } from '../context/AuthContext';

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
  likedBy: string[];
}

const STORAGE_KEY = 'ppkd_reviews';

const SEED_REVIEWS: Review[] = [
  {
    id: 'seed-1',
    name: 'Andi Prasetyo',
    rating: 5,
    comment: 'Website PPKD Jakarta Timur sangat informatif dan mudah digunakan. Saya bisa dengan mudah menemukan informasi program pelatihan yang saya cari. Tampilan yang bersih dan navigasi yang intuitif.',
    date: '2026-09-15T08:30:00.000Z',
    likes: 12,
    likedBy: [],
  },
  {
    id: 'seed-2',
    name: 'Siti Rahayu',
    rating: 4,
    comment: 'Informasi lengkap dan up-to-date. Fitur pencarian program pelatihan sangat membantu saya menentukan pilihan. Semoga ke depannya bisa ditambahkan fitur tracking status pendaftaran secara real-time.',
    date: '2026-09-20T14:15:00.000Z',
    likes: 7,
    likedBy: [],
  },
  {
    id: 'seed-3',
    name: 'Budi Santoso',
    rating: 5,
    comment: 'Luar biasa! Semua informasi yang saya butuhkan tersedia dengan jelas. Proses pendaftaran online sangat memudahkan, tidak perlu antri panjang. Terima kasih PPKD!',
    date: '2026-09-25T10:00:00.000Z',
    likes: 15,
    likedBy: [],
  },
  {
    id: 'seed-4',
    name: 'Dewi Anggraini',
    rating: 4,
    comment: 'Website sudah bagus dan informatif. Saran saya agar ditambahkan galeri foto kegiatan pelatihan agar calon peserta bisa melihat suasana belajar di PPKD.',
    date: '2026-10-01T09:45:00.000Z',
    likes: 5,
    likedBy: [],
  },
  {
    id: 'seed-5',
    name: 'Riko Hermawan',
    rating: 3,
    comment: 'Secara keseluruhan website cukup baik. Namun loading halaman kadang sedikit lambat di koneksi yang tidak stabil. Konten informasinya sangat lengkap dan membantu.',
    date: '2026-10-02T16:20:00.000Z',
    likes: 3,
    likedBy: [],
  },
];

function StarDisplay({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'lg' }) {
  const s = size === 'lg' ? 'w-6 h-6' : 'w-4 h-4';
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          className={`${s} ${i <= rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200 fill-gray-200'}`}
        />
      ))}
    </div>
  );
}

function StarInput({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(i => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform hover:scale-110 focus:outline-none"
          aria-label={`Beri ${i} bintang`}
        >
          <Star
            className={`w-8 h-8 transition-colors ${
              i <= (hovered || value)
                ? 'fill-amber-400 text-amber-400'
                : 'text-gray-300 fill-gray-100'
            }`}
          />
        </button>
      ))}
    </div>
  );
}

function ratingLabel(r: number) {
  if (r === 5) return 'Sangat Puas';
  if (r === 4) return 'Puas';
  if (r === 3) return 'Cukup';
  if (r === 2) return 'Kurang';
  return 'Sangat Kurang';
}

export default function Penilaian() {
  const { user } = useAuth();

  const loadReviews = (): Review[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    localStorage.setItem(STORAGE_KEY, JSON.stringify(SEED_REVIEWS));
    return SEED_REVIEWS;
  };

  const [reviews, setReviews] = useState<Review[]>(loadReviews);
  const [form, setForm] = useState({ name: user?.fullName || '', rating: 0, comment: '' });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState<'terbaru' | 'tertinggi' | 'terpopuler'>('terbaru');
  const [filterStar, setFilterStar] = useState<number | null>(null);

  // Keep name in sync if user logs in after mounting
  useEffect(() => {
    if (user?.fullName && !form.name) setForm(f => ({ ...f, name: user.fullName }));
  }, [user]);

  const save = (updated: Review[]) => {
    setReviews(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) { setError('Nama tidak boleh kosong.'); return; }
    if (form.rating === 0) { setError('Pilih bintang terlebih dahulu.'); return; }
    if (form.comment.trim().length < 10) { setError('Komentar minimal 10 karakter.'); return; }
    setError('');
    const newReview: Review = {
      id: Date.now().toString(),
      name: form.name.trim(),
      rating: form.rating,
      comment: form.comment.trim(),
      date: new Date().toISOString(),
      likes: 0,
      likedBy: [],
    };
    save([newReview, ...reviews]);
    setForm({ name: user?.fullName || '', rating: 0, comment: '' });
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const handleLike = (id: string) => {
    const key = user?.email || 'guest-' + (navigator.userAgent.slice(0, 10));
    const updated = reviews.map(r => {
      if (r.id !== id) return r;
      const alreadyLiked = r.likedBy.includes(key);
      return {
        ...r,
        likes: alreadyLiked ? r.likes - 1 : r.likes + 1,
        likedBy: alreadyLiked ? r.likedBy.filter(x => x !== key) : [...r.likedBy, key],
      };
    });
    save(updated);
  };

  // Stats
  const total = reviews.length;
  const avgRating = total ? reviews.reduce((s, r) => s + r.rating, 0) / total : 0;
  const dist = [5, 4, 3, 2, 1].map(star => ({
    star,
    count: reviews.filter(r => r.rating === star).length,
    pct: total ? Math.round((reviews.filter(r => r.rating === star).length / total) * 100) : 0,
  }));

  // Sorted + filtered list
  const displayed = [...reviews]
    .filter(r => filterStar === null || r.rating === filterStar)
    .sort((a, b) => {
      if (sortBy === 'tertinggi') return b.rating - a.rating;
      if (sortBy === 'terpopuler') return b.likes - a.likes;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  const userKey = user?.email || '';

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        crumbs={[{ label: 'Penilaian' }]}
        title="Penilaian Website"
        subtitle="Berikan penilaian dan masukan Anda untuk membantu kami meningkatkan layanan"
      />

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-10">

          {/* ── Summary ─────────────────────────────────────── */}
          <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row gap-8 items-start">
              {/* Average score */}
              <div className="flex flex-col items-center justify-center min-w-[120px]">
                <span className="text-6xl font-extrabold text-gray-900 leading-none">
                  {avgRating.toFixed(1)}
                </span>
                <StarDisplay rating={Math.round(avgRating)} size="lg" />
                <span className="text-sm text-gray-500 mt-1">{total} ulasan</span>
              </div>

              {/* Distribution */}
              <div className="flex-1 space-y-2 w-full">
                {dist.map(d => (
                  <button
                    key={d.star}
                    onClick={() => setFilterStar(filterStar === d.star ? null : d.star)}
                    className={`w-full flex items-center gap-2 group rounded-lg px-2 py-1 transition-colors ${filterStar === d.star ? 'bg-amber-50' : 'hover:bg-gray-50'}`}
                  >
                    <span className="text-xs text-gray-500 w-4 text-right flex-shrink-0">{d.star}</span>
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400 flex-shrink-0" />
                    <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-500"
                        style={{ width: `${d.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500 w-8 text-right flex-shrink-0">{d.count}</span>
                  </button>
                ))}
              </div>
            </div>
            {filterStar !== null && (
              <div className="mt-4 flex items-center gap-2">
                <span className="text-sm text-gray-500">Filter aktif:</span>
                <button
                  onClick={() => setFilterStar(null)}
                  className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 px-2.5 py-1 rounded-full hover:bg-amber-200 transition-colors"
                >
                  <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
                  {filterStar} bintang
                  <span className="ml-1 font-bold">×</span>
                </button>
              </div>
            )}
          </div>

          <div className="grid lg:grid-cols-5 gap-8">
            {/* ── Form ──────────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-md p-6 sticky top-24">
                <div className="flex items-center gap-2 mb-5">
                  <MessageSquare className="w-5 h-5 text-blue-600" />
                  <h2 className="text-lg font-bold text-gray-900">Tulis Penilaian</h2>
                </div>

                {submitted && (
                  <div className="mb-4 bg-green-50 border border-green-200 text-green-700 rounded-xl px-4 py-3 text-sm font-medium">
                    Terima kasih! Penilaian Anda telah dikirim.
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nama</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        placeholder="Nama Anda"
                        className="w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Stars */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <StarInput value={form.rating} onChange={v => setForm(f => ({ ...f, rating: v }))} />
                    {form.rating > 0 && (
                      <span className="text-xs text-amber-600 font-medium mt-1 block">{ratingLabel(form.rating)}</span>
                    )}
                  </div>

                  {/* Comment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Komentar</label>
                    <textarea
                      value={form.comment}
                      onChange={e => setForm(f => ({ ...f, comment: e.target.value }))}
                      placeholder="Bagikan pengalaman Anda menggunakan website ini..."
                      rows={4}
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                    />
                    <span className="text-xs text-gray-400">{form.comment.length} karakter (min. 10)</span>
                  </div>

                  {error && <p className="text-sm text-red-600">{error}</p>}

                  <button
                    type="submit"
                    className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-xl text-sm font-semibold transition-colors shadow-sm"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Penilaian
                  </button>
                </form>
              </div>
            </div>

            {/* ── Reviews list ─────────────────────────────── */}
            <div className="lg:col-span-3 space-y-4">
              {/* Sort controls */}
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">
                  {displayed.length} ulasan{filterStar !== null ? ` berbintang ${filterStar}` : ''}
                </p>
                <div className="flex gap-1">
                  {(['terbaru', 'tertinggi', 'terpopuler'] as const).map(opt => (
                    <button
                      key={opt}
                      onClick={() => setSortBy(opt)}
                      className={`text-xs px-3 py-1.5 rounded-lg capitalize transition-colors ${
                        sortBy === opt
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {displayed.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-md py-16 text-center text-gray-400">
                  <Star className="w-10 h-10 mx-auto mb-3 text-gray-200" />
                  <p className="text-sm">Belum ada ulasan untuk rating ini.</p>
                </div>
              ) : (
                displayed.map(r => {
                  const liked = r.likedBy.includes(userKey);
                  return (
                    <div key={r.id} className="bg-white rounded-2xl shadow-md p-5">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                            {r.name.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{r.name}</p>
                            <p className="text-xs text-gray-400">
                              {new Date(r.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                        </div>
                        <StarDisplay rating={r.rating} />
                      </div>

                      <p className="text-sm text-gray-700 leading-relaxed mt-3">{r.comment}</p>

                      <div className="flex items-center gap-2 mt-3 pt-3 border-t border-gray-100">
                        <button
                          onClick={() => handleLike(r.id)}
                          className={`flex items-center gap-1.5 text-xs px-3 py-1 rounded-full transition-colors ${
                            liked
                              ? 'bg-blue-100 text-blue-700'
                              : 'bg-gray-100 text-gray-500 hover:bg-blue-50 hover:text-blue-600'
                          }`}
                        >
                          <ThumbsUp className={`w-3.5 h-3.5 ${liked ? 'fill-blue-600' : ''}`} />
                          {r.likes > 0 ? r.likes : ''} Membantu
                        </button>
                        <span className={`ml-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                          r.rating >= 4 ? 'bg-green-100 text-green-700'
                          : r.rating === 3 ? 'bg-amber-100 text-amber-700'
                          : 'bg-red-100 text-red-700'
                        }`}>
                          {ratingLabel(r.rating)}
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

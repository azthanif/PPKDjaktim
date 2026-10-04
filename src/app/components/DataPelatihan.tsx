import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Award, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import PageHeader from './PageHeader';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

type SortKey = 'program' | 'peserta' | 'lulus' | 'kelulusan' | 'tahun';
type SortDir = 'asc' | 'desc';
type Kategori =
  | 'Semua'
  | 'Teknologi & Digital'
  | 'Kuliner & F&B'
  | 'Kreatif & Desain'
  | 'Bahasa'
  | 'Keamanan'
  | 'Teknik & Mekanik'
  | 'Hospitality'
  | 'Kecantikan'
  | 'Bisnis & Administrasi'
  | 'Fashion';

const CAT_COLORS: Record<string, string> = {
  'Teknologi & Digital':  '#2563EB',
  'Kuliner & F&B':        '#EA580C',
  'Kreatif & Desain':     '#7C3AED',
  'Bahasa':               '#0891B2',
  'Keamanan':             '#DC2626',
  'Teknik & Mekanik':     '#D97706',
  'Hospitality':          '#059669',
  'Kecantikan':           '#DB2777',
  'Bisnis & Administrasi':'#4F46E5',
  'Fashion':              '#9333EA',
};

const rawData = [
  // Teknologi & Digital (4)
  { program: 'Digital Marketing',        kategori: 'Teknologi & Digital',  peserta: 112, lulus: 108, tahun: 2026 },
  { program: 'Data Analysis',            kategori: 'Teknologi & Digital',  peserta: 89,  lulus: 82,  tahun: 2026 },
  { program: 'Web Development',          kategori: 'Teknologi & Digital',  peserta: 95,  lulus: 88,  tahun: 2026 },
  { program: 'Desain UI/UX',             kategori: 'Teknologi & Digital',  peserta: 78,  lulus: 74,  tahun: 2026 },
  // Kuliner & F&B (4)
  { program: 'Barista',                  kategori: 'Kuliner & F&B',        peserta: 60,  lulus: 57,  tahun: 2026 },
  { program: 'Pastry & Bakery',          kategori: 'Kuliner & F&B',        peserta: 72,  lulus: 68,  tahun: 2026 },
  { program: 'Tata Boga',                kategori: 'Kuliner & F&B',        peserta: 85,  lulus: 80,  tahun: 2026 },
  { program: 'Pengolahan Makanan Sehat', kategori: 'Kuliner & F&B',        peserta: 55,  lulus: 51,  tahun: 2026 },
  // Kreatif & Desain (3)
  { program: 'Desain Grafis',            kategori: 'Kreatif & Desain',     peserta: 98,  lulus: 91,  tahun: 2026 },
  { program: 'Fotografi & Videografi',   kategori: 'Kreatif & Desain',     peserta: 65,  lulus: 60,  tahun: 2026 },
  { program: 'Animasi Digital',          kategori: 'Kreatif & Desain',     peserta: 70,  lulus: 64,  tahun: 2026 },
  // Bahasa (2)
  { program: 'Bahasa Inggris',           kategori: 'Bahasa',               peserta: 55,  lulus: 50,  tahun: 2026 },
  { program: 'Bahasa Jepang',            kategori: 'Bahasa',               peserta: 40,  lulus: 36,  tahun: 2026 },
  // Keamanan (1)
  { program: 'Petugas Keamanan',         kategori: 'Keamanan',             peserta: 48,  lulus: 44,  tahun: 2026 },
  // Teknik & Mekanik (5)
  { program: 'Las Plat',                 kategori: 'Teknik & Mekanik',     peserta: 38,  lulus: 33,  tahun: 2026 },
  { program: 'Las Pipa',                 kategori: 'Teknik & Mekanik',     peserta: 30,  lulus: 27,  tahun: 2026 },
  { program: 'Sistem Injeksi',           kategori: 'Teknik & Mekanik',     peserta: 42,  lulus: 38,  tahun: 2026 },
  { program: 'Service Sepeda Motor',     kategori: 'Teknik & Mekanik',     peserta: 50,  lulus: 46,  tahun: 2026 },
  { program: 'Mechanical Electrical',    kategori: 'Teknik & Mekanik',     peserta: 35,  lulus: 31,  tahun: 2026 },
  // Hospitality (2)
  { program: 'Housekeeping',             kategori: 'Hospitality',          peserta: 45,  lulus: 41,  tahun: 2026 },
  { program: 'Food and Beverage Service',kategori: 'Hospitality',          peserta: 38,  lulus: 34,  tahun: 2026 },
  // Kecantikan (4)
  { program: 'Perawatan Kecantikan',     kategori: 'Kecantikan',           peserta: 52,  lulus: 48,  tahun: 2026 },
  { program: 'Make Up Artist',           kategori: 'Kecantikan',           peserta: 58,  lulus: 54,  tahun: 2026 },
  { program: 'Terapis Spa',              kategori: 'Kecantikan',           peserta: 35,  lulus: 32,  tahun: 2026 },
  { program: 'Perias Rambut',            kategori: 'Kecantikan',           peserta: 45,  lulus: 42,  tahun: 2026 },
  // Bisnis & Administrasi (1)
  { program: 'Administrasi Perkantoran', kategori: 'Bisnis & Administrasi',peserta: 60,  lulus: 55,  tahun: 2026 },
  // Fashion (1)
  { program: 'Penjahit Busana',          kategori: 'Fashion',              peserta: 40,  lulus: 36,  tahun: 2026 },
];

const ALL_CATEGORIES: Kategori[] = [
  'Teknologi & Digital', 'Kuliner & F&B', 'Kreatif & Desain',
  'Bahasa', 'Keamanan', 'Teknik & Mekanik', 'Hospitality',
  'Kecantikan', 'Bisnis & Administrasi', 'Fashion',
];

const kategoriList: Kategori[] = ['Semua', ...ALL_CATEGORIES];

const kategoriStyle: Record<Kategori, string> = {
  'Semua':                'bg-gray-800 text-white',
  'Teknologi & Digital':  'bg-blue-600 text-white',
  'Kuliner & F&B':        'bg-orange-500 text-white',
  'Kreatif & Desain':     'bg-purple-600 text-white',
  'Bahasa':               'bg-cyan-600 text-white',
  'Keamanan':             'bg-red-600 text-white',
  'Teknik & Mekanik':     'bg-amber-600 text-white',
  'Hospitality':          'bg-emerald-600 text-white',
  'Kecantikan':           'bg-pink-600 text-white',
  'Bisnis & Administrasi':'bg-indigo-600 text-white',
  'Fashion':              'bg-fuchsia-600 text-white',
};

const kategoriInactive: Record<Kategori, string> = {
  'Semua':                'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50',
  'Teknologi & Digital':  'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50',
  'Kuliner & F&B':        'bg-white text-orange-600 border border-orange-200 hover:bg-orange-50',
  'Kreatif & Desain':     'bg-white text-purple-600 border border-purple-200 hover:bg-purple-50',
  'Bahasa':               'bg-white text-cyan-600 border border-cyan-200 hover:bg-cyan-50',
  'Keamanan':             'bg-white text-red-600 border border-red-200 hover:bg-red-50',
  'Teknik & Mekanik':     'bg-white text-amber-600 border border-amber-200 hover:bg-amber-50',
  'Hospitality':          'bg-white text-emerald-600 border border-emerald-200 hover:bg-emerald-50',
  'Kecantikan':           'bg-white text-pink-600 border border-pink-200 hover:bg-pink-50',
  'Bisnis & Administrasi':'bg-white text-indigo-600 border border-indigo-200 hover:bg-indigo-50',
  'Fashion':              'bg-white text-fuchsia-600 border border-fuchsia-200 hover:bg-fuchsia-50',
};

function PieTooltipContent({ active, payload }: any) {
  if (!active || !payload?.length) return null;
  const d = payload[0];
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2.5 text-xs">
      <div className="flex items-center gap-1.5 mb-1.5">
        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.payload.fill }} />
        <span className="font-semibold text-gray-800">{d.name}</span>
      </div>
      <p className="text-gray-500">
        Peserta: <span className="font-semibold text-gray-900">{d.value}</span>
      </p>
    </div>
  );
}


export default function DataPelatihan() {
  const [sortKey, setSortKey] = useState<SortKey>('program');
  const [sortDir, setSortDir] = useState<SortDir>('asc');
  const [filterKategori, setFilterKategori] = useState<Kategori>('Semua');

  const filtered = filterKategori === 'Semua'
    ? rawData
    : rawData.filter(d => d.kategori === filterKategori);

  const statistik = filtered
    .map(d => ({ ...d, kelulusan: parseFloat(((d.lulus / d.peserta) * 100).toFixed(1)) }))
    .sort((a, b) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      if (typeof va === 'string' && typeof vb === 'string')
        return sortDir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      return sortDir === 'asc' ? (va as number) - (vb as number) : (vb as number) - (va as number);
    });

  const handleSort = (key: SortKey) => {
    if (sortKey === key) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortKey(key); setSortDir('asc'); }
  };

  const SortIcon = ({ col }: { col: SortKey }) => {
    if (sortKey !== col) return <ChevronsUpDown className="w-3.5 h-3.5 text-gray-400" />;
    return sortDir === 'asc'
      ? <ChevronUp className="w-3.5 h-3.5 text-blue-600" />
      : <ChevronDown className="w-3.5 h-3.5 text-blue-600" />;
  };

  const totalPeserta     = filtered.reduce((s, d) => s + d.peserta, 0);
  const totalLulus       = filtered.reduce((s, d) => s + d.lulus, 0);
  const tingkatKelulusan = totalPeserta ? ((totalLulus / totalPeserta) * 100).toFixed(1) : '0';

  // ── chart data ──────────────────────────────────────────────
  // Saat "Semua": rangkum per kategori agar bar tidak penuh sesak
  const barData = filterKategori === 'Semua'
    ? ALL_CATEGORIES.map(k => {
        const programs = rawData.filter(d => d.kategori === k);
        const peserta = programs.reduce((s, d) => s + d.peserta, 0);
        const lulus   = programs.reduce((s, d) => s + d.lulus,   0);
        const label   = k.length > 20 ? k.slice(0, 20) + '…' : k;
        return { name: label, Peserta: peserta, Lulus: lulus };
      })
    : statistik.map(d => ({
        name: d.program.length > 18 ? d.program.slice(0, 18) + '…' : d.program,
        Peserta: d.peserta,
        Lulus: d.lulus,
      }));

  const donutData = filterKategori === 'Semua'
    ? ALL_CATEGORIES
        .map(k => ({
          name: k,
          value: rawData.filter(d => d.kategori === k).reduce((s, d) => s + d.peserta, 0),
          fill: CAT_COLORS[k],
        }))
        .filter(d => d.value > 0)
    : statistik.map(d => ({
        name: d.program,
        value: d.peserta,
        fill: CAT_COLORS[d.kategori],
      }));

  const kelulusanData = [...statistik]
    .sort((a, b) => b.kelulusan - a.kelulusan)
    .map(d => ({
      name: d.program.length > 26 ? d.program.slice(0, 26) + '…' : d.program,
      'Kelulusan (%)': d.kelulusan,
    }));
  // ────────────────────────────────────────────────────────────

  const thClass = "px-6 py-3 text-sm font-bold text-gray-900 select-none cursor-pointer hover:bg-gray-100 transition-colors";

  return (
    <div className="min-h-screen bg-gray-50">
      <PageHeader
        crumbs={[{ label: 'Pusat Informasi' }, { label: 'Data Pelatihan' }]}
        title="Data Pelatihan"
        subtitle="Statistik dan data pelatihan PPKD Jakarta Timur"
      />
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {kategoriList.map(k => (
              <button
                key={k}
                onClick={() => setFilterKategori(k)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filterKategori === k ? kategoriStyle[k] : kategoriInactive[k]
                }`}
              >
                {k === 'Semua' ? 'Semua Kategori' : k}
              </button>
            ))}
          </div>

          {/* Summary cards */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              { Icon: Users,    color: 'blue',   value: totalPeserta,      label: 'Total Peserta 2026' },
              { Icon: Award,    color: 'green',  value: totalLulus,         label: 'Peserta Lulus' },
              { Icon: TrendingUp, color: 'purple', value: `${tingkatKelulusan}%`, label: 'Tingkat Kelulusan' },
              { Icon: BarChart3, color: 'orange', value: statistik.length,  label: 'Program Ditampilkan' },
            ].map(({ Icon, color, value, label }) => (
              <div key={label} className="bg-white rounded-xl shadow-md p-6">
                <Icon className={`w-8 h-8 text-${color}-600 mb-2`} />
                <div className="text-3xl font-bold text-gray-900">{value}</div>
                <div className="text-sm text-gray-600">{label}</div>
              </div>
            ))}
          </div>

          {/* ── Charts row 1: grouped bar + donut ── */}
          <div className="grid lg:grid-cols-5 gap-6 mb-6">

            {/* Custom CSS bar: Peserta vs Lulus */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 leading-tight">Peserta &amp; Lulus per {filterKategori === 'Semua' ? 'Kategori' : 'Program'}</h3>
              <p className="text-xs text-gray-400 mt-0.5 mb-4">
                {filterKategori === 'Semua' ? 'Pilih kategori di atas untuk melihat per program' : `Program dalam kategori ${filterKategori}`}
              </p>
              {(() => {
                const maxVal = Math.max(...barData.map(d => d.Peserta));
                return (
                  <div className="space-y-3 overflow-y-auto" style={{ maxHeight: 340 }}>
                    {barData.map((d, i) => (
                      <div key={i} className="group">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-medium text-gray-700 truncate max-w-[160px]">{d.name}</span>
                          <span className="text-xs text-gray-400 flex-shrink-0 ml-2">{d.Lulus}/{d.Peserta}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-[10px] text-gray-400 w-10 flex-shrink-0">Peserta</span>
                          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-200 rounded-full" style={{ width: `${(d.Peserta / maxVal) * 100}%` }} />
                          </div>
                          <span className="text-[10px] font-semibold text-gray-600 w-8 text-right flex-shrink-0">{d.Peserta}</span>
                        </div>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className="text-[10px] text-gray-400 w-10 flex-shrink-0">Lulus</span>
                          <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(d.Lulus / maxVal) * 100}%` }} />
                          </div>
                          <span className="text-[10px] font-semibold text-blue-700 w-8 text-right flex-shrink-0">{d.Lulus}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                );
              })()}
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-2 rounded-full bg-blue-200" />Total Peserta</div>
                <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-3 h-2 rounded-full bg-blue-600" />Lulus</div>
              </div>
            </div>

            {/* Donut: distribusi per kategori / per program */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 flex flex-col">
              <h3 className="font-semibold text-gray-900 leading-tight">
                {filterKategori === 'Semua' ? 'Distribusi per Kategori' : 'Distribusi per Program'}
              </h3>
              <p className="text-xs text-gray-400 mt-0.5 mb-4">Porsi total peserta</p>

              <div className="flex-1 flex items-center justify-center">
                <div className="relative w-full h-[200px]">
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={donutData}
                      cx="50%"
                      cy="50%"
                      innerRadius={56}
                      outerRadius={88}
                      paddingAngle={3}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      {donutData.map((entry, i) => (
                        <Cell key={`donut-cell-${i}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip content={<PieTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
                  
                {/* center label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900 leading-none">{totalPeserta}</div>
                    <div className="text-[10px] text-gray-400 mt-1 tracking-wide uppercase">Peserta</div>
                  </div>
                </div>
                </div>
              </div>

              {/* legend */}
              <div className="mt-4 space-y-2">
                {donutData.map(d => (
                  <div key={d.name} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="w-2.5 h-2.5 rounded-sm flex-shrink-0" style={{ background: d.fill }} />
                      <span className="text-gray-600 truncate">{d.name}</span>
                    </div>
                    <span className="font-semibold text-gray-800 ml-2 flex-shrink-0">
                      {d.value} <span className="text-gray-400 font-normal">({((d.value / totalPeserta) * 100).toFixed(0)}%)</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── CSS bars: Tingkat Kelulusan ── */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="font-semibold text-gray-900 leading-tight mb-4">Tingkat Kelulusan per Program</h3>
            <div className="space-y-2.5">
              {kelulusanData.map((d, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-44 flex-shrink-0 truncate">{d.name}</span>
                  <div className="flex-1 h-4 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${d['Kelulusan (%)']}%`,
                        background: d['Kelulusan (%)'] >= 93 ? '#16A34A' : d['Kelulusan (%)'] >= 88 ? '#2563EB' : '#D97706',
                      }}
                    />
                  </div>
                  <span className={`text-xs font-bold w-12 text-right flex-shrink-0 ${
                    d['Kelulusan (%)'] >= 93 ? 'text-green-600' : d['Kelulusan (%)'] >= 88 ? 'text-blue-600' : 'text-amber-600'
                  }`}>
                    {d['Kelulusan (%)']}%
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-green-600" />≥ 93%</div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-blue-600" />88–92%</div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500"><span className="w-2.5 h-2.5 rounded-full bg-amber-600" />{'< 88%'}</div>
            </div>
          </div>

          {/* ── Tabel ── */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Statistik Per Program</h2>
              <p className="text-xs text-gray-400">Klik header kolom untuk mengurutkan</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className={`${thClass} text-left`} onClick={() => handleSort('program')}>
                      <div className="flex items-center gap-1">Program <SortIcon col="program" /></div>
                    </th>
                    <th className={`${thClass} text-left`}>Kategori</th>
                    <th className={`${thClass} text-center`} onClick={() => handleSort('peserta')}>
                      <div className="flex items-center justify-center gap-1">Total Peserta <SortIcon col="peserta" /></div>
                    </th>
                    <th className={`${thClass} text-center`} onClick={() => handleSort('lulus')}>
                      <div className="flex items-center justify-center gap-1">Lulus <SortIcon col="lulus" /></div>
                    </th>
                    <th className={`${thClass} text-center`} onClick={() => handleSort('kelulusan')}>
                      <div className="flex items-center justify-center gap-1">Tingkat Kelulusan <SortIcon col="kelulusan" /></div>
                    </th>
                    <th className={`${thClass} text-center`} onClick={() => handleSort('tahun')}>
                      <div className="flex items-center justify-center gap-1">Tahun <SortIcon col="tahun" /></div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {statistik.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-900 font-medium">{item.program}</td>
                      <td className="px-6 py-4">
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium"
                          style={{
                            background: CAT_COLORS[item.kategori] + '18',
                            color: CAT_COLORS[item.kategori],
                          }}
                        >
                          {item.kategori}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-900 font-medium">{item.peserta}</td>
                      <td className="px-6 py-4 text-sm text-center text-gray-900 font-medium">{item.lulus}</td>
                      <td className="px-6 py-4 text-sm text-center">
                        <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                          item.kelulusan >= 90 ? 'bg-green-100 text-green-700' :
                          item.kelulusan >= 80 ? 'bg-blue-100 text-blue-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>
                          {item.kelulusan}%
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-center text-gray-500">{item.tahun}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}

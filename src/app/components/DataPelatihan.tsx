import { useState } from 'react';
import { BarChart3, TrendingUp, Users, Award, ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import PageHeader from './PageHeader';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
} from 'recharts';

type SortKey = 'program' | 'peserta' | 'lulus' | 'kelulusan' | 'tahun';
type SortDir = 'asc' | 'desc';
type Kategori = 'Semua' | 'Teknologi & Digital' | 'Kuliner & F&B' | 'Kreatif & Desain';

const CAT_COLORS: Record<string, string> = {
  'Teknologi & Digital': '#2563EB',
  'Kuliner & F&B':       '#EA580C',
  'Kreatif & Desain':    '#7C3AED',
};

const rawData = [
  { program: 'Digital Marketing',        kategori: 'Teknologi & Digital', peserta: 112, lulus: 108, tahun: 2024 },
  { program: 'Data Analysis',            kategori: 'Teknologi & Digital', peserta: 89,  lulus: 82,  tahun: 2024 },
  { program: 'Web Development',          kategori: 'Teknologi & Digital', peserta: 95,  lulus: 88,  tahun: 2024 },
  { program: 'Desain UI/UX',             kategori: 'Teknologi & Digital', peserta: 78,  lulus: 74,  tahun: 2024 },
  { program: 'Barista',                  kategori: 'Kuliner & F&B',       peserta: 60,  lulus: 57,  tahun: 2024 },
  { program: 'Pastry & Bakery',          kategori: 'Kuliner & F&B',       peserta: 72,  lulus: 68,  tahun: 2024 },
  { program: 'Tata Boga',                kategori: 'Kuliner & F&B',       peserta: 85,  lulus: 80,  tahun: 2024 },
  { program: 'Pengolahan Makanan Sehat', kategori: 'Kuliner & F&B',       peserta: 55,  lulus: 51,  tahun: 2024 },
  { program: 'Desain Grafis',            kategori: 'Kreatif & Desain',    peserta: 98,  lulus: 91,  tahun: 2024 },
  { program: 'Fotografi & Videografi',   kategori: 'Kreatif & Desain',    peserta: 65,  lulus: 60,  tahun: 2024 },
  { program: 'Animasi Digital',          kategori: 'Kreatif & Desain',    peserta: 70,  lulus: 64,  tahun: 2024 },
];

const kategoriList: Kategori[] = ['Semua', 'Teknologi & Digital', 'Kuliner & F&B', 'Kreatif & Desain'];

const kategoriStyle: Record<Kategori, string> = {
  'Semua':               'bg-gray-800 text-white',
  'Teknologi & Digital': 'bg-blue-600 text-white',
  'Kuliner & F&B':       'bg-orange-500 text-white',
  'Kreatif & Desain':    'bg-purple-600 text-white',
};

const kategoriInactive: Record<Kategori, string> = {
  'Semua':               'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50',
  'Teknologi & Digital': 'bg-white text-blue-600 border border-blue-200 hover:bg-blue-50',
  'Kuliner & F&B':       'bg-white text-orange-600 border border-orange-200 hover:bg-orange-50',
  'Kreatif & Desain':    'bg-white text-purple-600 border border-purple-200 hover:bg-purple-50',
};

function BarTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2.5 text-xs min-w-[150px]">
      <p className="font-semibold text-gray-800 mb-2 leading-tight">{label}</p>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} className="flex items-center justify-between gap-4 py-0.5">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm flex-shrink-0" style={{ background: entry.color }} />
            <span className="text-gray-500">{entry.name}</span>
          </div>
          <span className="font-semibold text-gray-900">{entry.value}</span>
        </div>
      ))}
    </div>
  );
}

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

function KelTooltipContent({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2.5 text-xs">
      <p className="font-semibold text-gray-800 mb-1.5 leading-tight">{label}</p>
      <div className="flex items-center gap-1.5">
        <span className="w-2 h-2 rounded-sm" style={{ background: '#16A34A' }} />
        <span className="text-gray-500">Tingkat Kelulusan:</span>
        <span className="font-semibold text-gray-900">{payload[0].value}%</span>
      </div>
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
  const barData = statistik.map(d => ({
    name: d.program.length > 20 ? d.program.slice(0, 20) + '…' : d.program,
    Peserta: d.peserta,
    Lulus: d.lulus,
  }));

  const donutData = filterKategori === 'Semua'
    ? (['Teknologi & Digital', 'Kuliner & F&B', 'Kreatif & Desain'] as const).map(k => ({
        name: k,
        value: rawData.filter(d => d.kategori === k).reduce((s, d) => s + d.peserta, 0),
        fill: CAT_COLORS[k],
      }))
    : statistik.map(d => ({
        name: d.program,
        value: d.peserta,
        fill: CAT_COLORS[d.kategori],
      }));

  const kelulusanData = [...statistik]
    .sort((a, b) => b.kelulusan - a.kelulusan)
    .map(d => ({
      name: d.program.length > 22 ? d.program.slice(0, 22) + '…' : d.program,
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
              { Icon: Users,    color: 'blue',   value: totalPeserta,      label: 'Total Peserta 2024' },
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

            {/* Grouped horizontal bar */}
            <div className="lg:col-span-3 bg-white rounded-xl shadow-md p-6">
              <h3 className="font-semibold text-gray-900 leading-tight">Peserta & Lulus per Program</h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={barData}
                  layout="vertical"
                  barGap={2}
                  barSize={9}
                  margin={{ top: 0, right: 12, bottom: 0, left: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fill: '#9CA3AF', fontSize: 11 }}
                    axisLine={{ stroke: '#E5E7EB' }}
                    tickLine={false}
                  />
                  <YAxis
                    type="category"
                    dataKey="name"
                    width={162}
                    tick={{ fill: '#374151', fontSize: 11 }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<BarTooltipContent />} cursor={{ fill: '#F9FAFB' }} />
                  <Bar key="bar-peserta" dataKey="Peserta" name="Peserta" fill="#93C5FD" radius={[0, 4, 4, 0]} />
                  <Bar key="bar-lulus"   dataKey="Lulus"   name="Lulus"   fill="#2563EB" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
              {/* custom legend — avoids recharts <Legend> duplicate-key bug */}
              <div className="flex items-center gap-4 mt-3">
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-sm" style={{ background: '#93C5FD' }} />
                  Peserta
                </div>
                <div className="flex items-center gap-1.5 text-xs text-gray-600">
                  <span className="w-3 h-3 rounded-sm" style={{ background: '#2563EB' }} />
                  Lulus
                </div>
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

          {/* ── Chart row 2: kelulusan rate ── */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <h3 className="font-semibold text-gray-900 leading-tight">Tingkat Kelulusan per Program</h3>
            <ResponsiveContainer width="100%" height={Math.max(200, kelulusanData.length * 34)}>
              <BarChart
                data={kelulusanData}
                layout="vertical"
                barSize={12}
                margin={{ top: 0, right: 48, bottom: 0, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#F3F4F6" horizontal={false} />
                <XAxis
                  type="number"
                  domain={[70, 100]}
                  tickFormatter={v => `${v}%`}
                  tick={{ fill: '#9CA3AF', fontSize: 11 }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={162}
                  tick={{ fill: '#374151', fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<KelTooltipContent />} cursor={{ fill: '#F9FAFB' }} />
                <Bar key="bar-kel" dataKey="Kelulusan (%)" name="Kelulusan (%)" fill="#16A34A" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
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
